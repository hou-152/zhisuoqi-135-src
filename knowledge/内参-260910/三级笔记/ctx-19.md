# Claude Code 在读提示词前为何已发送 3.3 万 Token

## 一句话主旨
Agent 成本由固定底座、请求次数与配置乘数决定，须在 API 边界审计。

## 作者试图回答的问题
为什么 Claude Code 在用户提示词前已发送约 3.3 万 token，而 OpenCode 约 7 千？同一模型、同一机器和同一任务下，不同 Coding Agent 的 token 成本、延迟和可用上下文为何差异巨大？总消耗由哪些层次决定，怎样可靠测量而非依赖体感或产品标签？

## 三级论证骨架

### 一、测量立场：在 API 边界重建请求，而非看体感
#### 1.1 Token overhead 同时是成本、延迟和上下文预算
- 固定底座不是只发一次；每轮请求都要重新发送或从缓存读取。
  - 初始差异会被多轮工具循环持续放大；每个 harness token 都挤占本可用于代码和任务信息的 working context。
- 生产 Agent 需回答“系统到底发送了什么”，不能靠 folklore。
  - EU AI Act Article 12 要求记录和理解系统行为；请求重建能力本身是治理基础。
#### 1.2 Logging proxy 同时抓 payload 与 usage
- 插在 harness 与模型 endpoint 之间，逐请求记录完整 JSON payload，以及 API 返回的 input、cache write、cache read、output usage。
  - Payload capture 回答“发送了什么”，usage block 回答“计费了什么”；两者结合才能把成本拆回 system prompt、tool schema、scaffolding、用户输入和会话增长。
  - 作者比喻为“不要只看电费账单，也要在电表前记录每台设备何时开启”。

### 二、实验设计：先隔离固定底座，再逐层加变量
#### 2.1 版本、模型与基线
- 对比 Claude Code 2.1.207 与 OpenCode 1.17.18，固定 claude-sonnet-4-5，时间快照是 2026 年 7 月。
  - Baseline 使用全新配置目录、无 MCP、无用户设置、无 memory、无 instruction file 的空 workspace，并绕过权限；之后每条 multiplier lane 一次只增加一个变量。
#### 2.2 任务与校准
- T1 只要求回复 OK，隔离固定开销；T2 读取已放置文件并摘要；T3 对 FizzBuzz 与检查脚本执行 write-run-test-fix 循环。
  - Zero-tools 变体关闭全部工具，把 system prompt 本体与 tool schema 权重分开。
  - 本地 gateway 每请求附加约 6,200 token 固定 envelope，用 bare calibration request 测出并扣除；payload 原始值不受 gateway 影响。
  - 组件 token 估算按各 harness 冷缓存 anchor 推导出 4.1 到 4.4 characters per token 的实测比例。

### 三、固定底座：Claude Code 主要重在工具 schema
#### 3.1 首轮底座差距近 4.8 倍
- 22 字符任务，Claude Code 首轮 calibrated payload 约 32,800 token，OpenCode 约 6,900 token。
  - Claude Code system prompt 为 27,344 字符、3 个 block；OpenCode 为 9,324 字符、1 个 block。
  - Claude Code 携带 27 个工具、99,778 字符 schema；OpenCode 携带 10 个工具、20,856 字符。约 24,000 个 Claude Code 底座 token 来自工具定义，OpenCode 对应约 4,800。
  - 作者比喻为“像打车的起步价，车还没走就已经计费”；Agent 的起步价不仅占钱，也占上下文座位。
#### 3.2 Claude Code 还注入首条消息脚手架与平台工具
- 实际用户提示词前注入 7,997 字符的三个 <system-reminder>：delegation agent catalogue、available skills catalogue 与 user context；OpenCode 没有对应首条消息脚手架。
  - 工具不只是基础编码能力，还包含 CronCreate、Monitor、Task family、worktree 管理与 push notification 等后台 Agent 和编排套件；32.8K 是平台 bootstrap，而非用户任务本身。
#### 3.3 关闭工具后仍有纯 harness prompt 差距
- Claude Code 仍有 26,891 字符、约 6.5K token；OpenCode 为 8,811 字符、约 2.0K token。
  - 残余差距来自语气、安全、任务管理和环境说明等 behavioural doctrine。

### 四、任务级成本：小任务放大底座，多步任务可能被批处理反转
#### 4.1 公式与 T2
- 总输入近似为 baseline × request count + conversation growth。
  - T2 中两个 harness 都给出正确结果；Claude Code 发 6 次 HTTP request，累计 metered input 约 199K；OpenCode 发 4 次，累计约 41K，另有一次用于会话标题的 Haiku side call。
  - 即使 cache read 只按 input price 十分之一计费，首轮 cache write、每轮 cache read 和 context-window consumption 仍随 payload 或请求次数增长。
  - 33K 底座意味着在任何代码进入对话前，每轮已占用 200K context window 约六分之一。
#### 4.2 T3 反转：批处理改变结论
- T3 中 Claude Code 用 3 次模型请求完成，累计输入约 121K；OpenCode 用 9 次请求加 1 次标题调用，累计约 132K。
  - Claude Code 把两次文件写入和两次脚本执行压进一个 parallel tool round trip；OpenCode 每轮只调用一个工具，反复支付较小的约 7K 底座。
  - 大底座但积极批处理，可能战胜小底座但严格串行；“首轮谁更轻”不能直接推出“整项任务谁更省”。
  - 作者比喻为单程车票便宜不代表整趟行程便宜；来回九次可能比贵票但只跑三次花得更多。
#### 4.3 scaffolding 随轮次增长
- Claude Code 首轮 3 个 <system-reminder>，第一次工具往返后增至 4 个。
  - OpenCode 每轮新增的约 400 到 2,200 字符主要是纯会话内容。

### 五、配置乘数：instruction、MCP、workflow、subagent 叠加
#### 5.1 Instruction file 是对两种 harness 都对称的大乘数
- 在 workspace 放入真实生产仓库的 72KB 指令文件后，两个 harness 每请求都增加略高于 20K token。
  - OpenCode metered total 从 13,152 增至 33,336；Claude Code 从 39,005 增至 59,243；对原本 lean 的 harness，单个重指令文件几乎把底座放大到四倍。
  - 加载机制不同：Claude Code 2.1.207 忽略 AGENTS.md，只有改名为 CLAUDE.md 才摄入，并把内容注入首条 user message；OpenCode 同时识别两个文件名，注入 system prompt。
  - Instruction file 是否生效可能静默失败；需在请求边界确认真正进入 payload 的文件名与内容。
  - 它不是一次性启动费，而是“文件大小 × 请求次数”的持续税。
#### 5.2 MCP 与工作流模板把静态说明扩展成重复载荷
- 小型、公开且无凭据的 MCP server，每个每请求增加约 1,000 到 1,400 token；两种 harness 承担的 tax 近似相同。
  - 五个 server 使 Claude Code payload 增加约 4,900 token，OpenCode metered 增加 6,967 token；工具数分别从 27 增至 69、从 10 增至 52。
  - 生产 MCP 的 API 更丰富，schema 往往比小型 server 大数倍。
  - Claude Code 在 print mode 下还会静默忽略 project-scoped .mcp.json，除非显式传入 --mcp-config；再次说明“已配置”不等于“已附加”。
- Story-driven workflow framework 会把 slash command 展开为 persona、protocol 与 checklist。
  - 代表模板 8,405 字符，约 2,100 token；进入 conversation history 后，后续每个请求都会携带；一个 9-request session 会重发 9 次。
  - 真实成本不是模板本身大小，而是 template size × request count，并继续叠加在 harness、instruction 与 MCP 底座上。
#### 5.3 Subagent 是实验中最大的 token 乘数
- 同一小任务直接执行时，Claude Code 累计约 121K token；扇出到两个并行 subagent 后达到 513K，是 4.2 倍。
  - 并行版本共 9 次模型请求，分属三种 request class：完整约 33K 底座的主会话，以及 5 个 subagent call。
  - 每个 Claude Code subagent 都携带自己的 3,554 字符 agent system prompt 和 27 个工具中的 24 个，形成独立 bootstrap；subagent transcript 返回后，又被 parent 纳入上下文。
  - OpenCode 的 subagent profile 更精简，只含 1,379 字符 system prompt 和 5 个工具；但其 subagent lane 在 gateway 下未完整运行，文章只报告设计差异，不给出不可验证的总量。
  - Delegation 成本包含两次放大：每个 worker 复制底座，parent 再摄入结果；它可能是正确工程选择，却是重会话 token 异常时首先应检查的地方。

### 六、真实配置与缓存：配置决定账单，缓存不消除物理占用
#### 6.1 真实配置可在用户输入前占掉 7.5 万到 9 万 token
- OpenCode 真实工作配置包含 11 个 MCP server、72KB instruction file、179 个工具与 277KB schema；首次冷缓存请求 metered 90,817 token，用户尚未输入任何任务。
  - Claude Code 使用 4 个 MCP server、已安装 plugin 和同一 instruction file，payload 达 311KB、约 75K token，并携带 118 个工具。
  - 对 OpenCode 而言，相当于从约 7K floor 放大约 12 倍；harness 决定 floor，configuration 决定 bill。
- 85K bootstrap 会占用 200K context window 的 40% 以上。
  - 即使大部分是 cache read，它仍真实占据上下文，压缩可放入代码和任务历史的空间，并更早触发 compaction。
  - Extended thinking 的 output 以约输入价格五倍计费，reasoning block 还会进入后续历史；由于 gateway 的 thinking policy 使开关是否生效无法验证，研究者拒绝发布具体数值，但保留这一机制性风险。
#### 6.2 Prompt cache 降低价格，却不消除三类真实成本
- 两个 harness 都正确设置 cache breakpoint；5 分钟 TTL 下，首次写入按基础价 1.25 倍计费，后续读取按 input price 十分之一计费。
  - 第一类残余成本是 cache write：停顿超过 TTL，例如思考五分钟、开会或午餐，就要以 write rate 重新预热完整栈。
  - 第二类是 cache read 乘以 request count：Serial tool loop 和 subagent fan-out 会快速增加读取次数。
  - 第三类是 context-window consumption：完全不受缓存折扣影响；大底座每轮都占窗口，促使 compaction 更早发生，而摘要过程本身又消耗 token。
  - 缓存改变的是计费单价，不改变 payload 大小、请求拓扑和上下文物理占用；不能用“已经命中缓存”否定底座过重的问题。
#### 6.3 Cache prefix 稳定性决定缓存是否真的生效
- 团队对每个请求的 tools array 和 system block 做 hash。
  - OpenCode 在所有请求和所有 run 中都发出 byte-identical prefix；三个独立 T1 session 的 tools、system 与 message bytes 都一致，重复运行写入 0 个 cache token；9-request T3 也保持同一稳定前缀。
  - Claude Code 每个 session 至少出现三种 request class：warmup probe、主会话和 subagent call；每类有不同 prefix 与 cache entry；其 system bytes 在同一 workspace 的不同 session 间也会变化，首条消息 scaffolding 同样漂移。
- 相同文件摘要任务中，Claude Code 五次请求累计写入 53,839 个 cache token，包含一次约 43K 的整段中途重写；OpenCode 只写 1,003。
  - 重跑后，大额中途写入再次出现：首轮 43,342，第二轮 36,899；第三轮面对刚预热的缓存则几乎不写。OpenCode 在所有可干净计量的 session 中都没有中途重写。
  - 根据 cache temperature，Claude Code 同任务的 cache-write volume 是 OpenCode 的 5.9 到 54 倍。写入按 5 分钟 tier 的 1.25 倍或 1 小时 tier 的 2 倍计费，因此 prefix drift 能直接解释 usage meter 的跳升。
  - Gateway eviction 也可能造成单次 miss，但跨 run 重现的大额写入、以及在 gateway 前已捕获的 prefix instability，使系统性 harness 行为成为更可能的解释。
  - 作者比喻为缓存像按文件指纹找副本；哪怕内容意思一样，只要字节变化，系统就会当成新文件重新存一次。

### 七、审计与可迁移结论：方法比快照更持久
#### 7.1 审计链让 benchmark 成为可复核的生产日志
- 全部 150 条 request/response record 写入 tamper-evident 的 SHA-256 hash-chained audit trail，并验证链条端到端无断裂。
  - 同一机制来自开源库 @systima/aiact-audit-log，可支持 EU AI Act Article 12 所需的结构化日志、完整性证明和第三方重建。
  - Token benchmark 是低风险应用；信用决策等高风险 Agent 更需要回答“某天到底向模型发送了什么、收到了什么”。
  - 复现实验只需约 200 行 Node 的 HTTP proxy：转发请求、保存 request body 与 response usage，并把每一对追加到 audit chain。
  - 稳健流程是从 fresh config 与空 workspace 测 floor，再依次加入 instruction、MCP 和 workflow；如有 gateway，先测其 envelope，并核对最终实际响应的模型版本。
#### 7.2 数字是快照，方法才是可迁移结论
- 实验只覆盖一台机器、一对版本、一个模型家族和较小样本；harness prompt 频繁变化，因此数值是 2026 年 7 月快照。
  - Gateway 会影响 metered usage，也曾静默替换研究者指定的模型 snapshot；组件数值来自其无法改变的捕获 payload；warm-run 归因不可靠，因此只引用 cold anchor。
  - T3 的总量收敛只代表一种可并行任务形态；严格串行任务会提高 Claude Code 请求次数，重新放大其大底座。
  - 最持久的成果不是“某 harness 永远更省”，而是测量公式：固定底座、请求次数、会话增长、配置层、subagent 拓扑与 prefix 稳定性必须共同审计。
  - 作者比喻为天气读数只代表测量那一刻，温度计的使用方法却能长期复用。

## 作者边界、反例与不确定性
- 实验只覆盖一台机器、一对版本、一个模型家族和较小样本；harness prompt 频繁变化，所有具体数字是 2026 年 7 月快照，不能当作长期产品排名。
- Gateway 会影响 metered usage，并曾静默替换研究者指定的模型 snapshot；warm-run 归因不可靠，作者只引用 cold anchor。
- OpenCode 的 subagent lane 在 gateway 下未完整运行，因此只报告设计差异，不给出不可验证的总量。
- Extended thinking 的开关是否生效无法验证，作者拒绝发布具体数值，只保留其机制性风险。
- T3 的总量收敛只代表一种可并行任务形态；严格串行任务会提高 Claude Code 请求次数，重新放大其大底座。
- Instruction file 是否生效、MCP 是否附加可能静默失败；“已配置”不等于“已附加”，需在请求边界确认。
