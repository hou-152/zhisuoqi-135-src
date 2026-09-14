# Claude Code 在读提示词前为何已发送 3.3 万 Token

- 标题：Claude Code 在读提示词前为何已发送 3.3 万 Token
- 来源：systima.ai
- 原文：https://systima.ai/blog/claude-code-vs-opencode-token-overhead
- 作者：systima.ai
- 类型：主题特刊
- 摘要：对比日志显示，不同 Coding Agent 的基础上下文与缓存策略会造成巨大固定开销。评估工具效率时，必须把 harness、系统提示与工具定义一并纳入，而不能只看最终输出。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：11772
- 策展人按：这篇是前两篇的实测账单。看完，你对「这个 agent 好像有点贵」的直觉会有个数。

---

- 原文标题：Claude Code sends 33k tokens before reading the prompt; OpenCode sends 7k
- 作者：systima.ai
- 内参日期：2026-07-14
- 来源类型：blog
- 原文：https://systima.ai/blog/claude-code-vs-opencode-token-overhead
- 标签：Anthropic, agent skills

对比日志显示，不同 Coding Agent 的基础上下文与缓存策略会造成巨大固定开销。评估工具效率时，必须把 harness、系统提示与工具定义一并纳入，而不能只看最终输出。

## 导读

不同 agent 的运作差异

## 核心观点

在同一模型、同一机器和同一任务下，Agent harness 本身就会显著改变 token 成本、延迟和可用上下文。Claude Code 的首轮固定底座约 32,800 token，OpenCode 约 6,900 token；但整项任务的总消耗并不由底座单独决定，而是由“固定底座 × 模型请求次数 + 对话增长”共同决定。指令文件、MCP schema、工作流模板、subagent 和 reasoning 会继续叠加乘数；prompt cache 只能降低部分计费，无法消除重写、请求次数和上下文占用。真正可靠的判断来自 API boundary 的请求 payload 与 usage 记录，而不是使用体感或产品标签。

## 为什么要在 API 边界测量 Agent 开销

- Token overhead 同时是三件事：真实成本、交互延迟和上下文预算。每个 harness token 都会挤占本可用于代码和任务信息的 working context。
- 固定底座并非只发送一次；每轮请求都要重新发送或从缓存读取。因此一个看似不大的初始差异，会被多轮工具循环持续放大。
- 对生产 Agent 而言，“系统到底发送了什么”不应靠 folklore 回答。尤其在 EU AI Act Article 12 要求记录和理解系统行为的背景下，请求重建能力本身就是治理基础。
- 研究团队把 logging proxy 插在 harness 与模型 endpoint 之间，逐请求记录两类 ground truth：完整 JSON payload，以及 API 返回的 input、cache write、cache read、output usage。
- Payload capture 回答“发送了什么”，usage block 回答“计费了什么”。只有两者结合，才能把模型成本拆回 system prompt、tool schema、scaffolding、用户输入和会话增长。

## 实验设计先隔离固定底座，再逐层增加变量

- 对比版本为 Claude Code 2.1.207 与 OpenCode 1.17.18，二者固定使用 claude-sonnet-4-5，时间快照是 2026 年 7 月。
- Baseline 使用全新配置目录、无 MCP、无用户设置、无 memory、无 instruction file 的空 workspace，并绕过权限；之后每条 multiplier lane 一次只增加一个变量。
- T1 只要求回复 OK，用来隔离固定开销；T2 读取一份已放置文件并摘要；T3 对 FizzBuzz 与检查脚本执行 write-run-test-fix 循环。
- Zero-tools 变体关闭全部工具，把 system prompt 本体与 tool schema 权重分开。
- 本地 gateway 会为每个请求附加约 6,200 token 的固定 envelope。研究者用 bare calibration request 测出并从 metered figure 中扣除；payload 原始值不受 gateway 影响。
- 组件 token 估算没有套用通用启发式，而是根据各 harness 的冷缓存 anchor 推导出 4.1 到 4.4 characters per token 的实测比例。

## Claude Code 的固定底座主要重在工具 schema

- 对一个仅 22 字符的任务，Claude Code 首轮 calibrated payload 约 32,800 token，OpenCode 约 6,900 token，前者接近后者的 4.8 倍。
- Claude Code 的 system prompt 为 27,344 字符、3 个 block；OpenCode 为 9,324 字符、1 个 block。
- Claude Code 携带 27 个工具、99,778 字符的 schema；OpenCode 携带 10 个工具、20,856 字符。约 24,000 个 Claude Code 底座 token 来自工具定义，OpenCode 对应约 4,800。
- Claude Code 在实际用户提示词前还注入 7,997 字符的三个 <system-reminder>：delegation agent catalogue、available skills catalogue 与 user context；OpenCode 没有对应首条消息脚手架。
- Claude Code 的工具不只是基础编码能力，还包含 CronCreate、Monitor、Task family、worktree 管理与 push notification 等后台 Agent 和编排套件。32.8K 是平台 bootstrap，而非用户任务本身。
- 关闭工具后，Claude Code 仍有 26,891 字符、约 6.5K token 的纯 harness prompt；OpenCode 为 8,811 字符、约 2.0K token。残余差距来自语气、安全、任务管理和环境说明等 behavioural doctrine。

## 小任务放大底座差距，多步任务却可能由工具批处理反转

- T2 读取文件并摘要，两个 harness 都给出正确结果。Claude Code 发出 6 次 HTTP request，累计 metered input 约 199K；OpenCode 发出 4 次，累计约 41K，另有一次用于会话标题的 Haiku side call。
- 即使 cache read 只按 input price 的十分之一计费，首轮 cache write、每轮 cache read 和 context-window consumption 仍随 payload 或请求次数增长。
- 33K 底座意味着在任何代码进入对话前，每轮已经占用 200K context window 的约六分之一。
- T3 的 write-run-test-fix 任务却出现相反结果：Claude Code 用 3 次模型请求完成，累计输入约 121K；OpenCode 用 9 次请求加 1 次标题调用，累计约 132K。
- Claude Code 把两次文件写入和两次脚本执行压进一个 parallel tool round trip；OpenCode 每轮只调用一个工具，因此反复支付较小的约 7K 底座。
- 整体输入可近似理解为 baseline × request count + conversation growth。大底座但积极批处理，可能战胜小底座但严格串行；“首轮谁更轻”不能直接推出“整项任务谁更省”。
- Claude Code 的 scaffolding 会随轮次增长：首轮 3 个 <system-reminder>，第一次工具往返后增至 4 个。OpenCode 每轮新增的约 400 到 2,200 字符则主要是纯会话内容。

## Instruction file 是对两种 harness 都对称的大乘数

- 在 workspace 放入真实生产仓库的 72KB 指令文件后，两个 harness 每个请求都增加略高于 20K token。
- OpenCode metered total 从 13,152 增至 33,336；Claude Code 从 39,005 增至 59,243。对于原本 lean 的 harness，单个重指令文件几乎把底座放大到四倍。
- 两者加载机制不同：Claude Code 2.1.207 忽略 AGENTS.md，只有改名为 CLAUDE.md 才摄入，并把内容注入首条 user message；OpenCode 同时识别两个文件名，注入 system prompt。
- Instruction file 是否生效可能静默失败，因此不能只看文件是否存在；需要在请求边界确认真正进入 payload 的文件名与内容。
- 指令文件会搭乘仓库中每个 session 的每个请求。它不是一次性启动费，而是“文件大小 × 请求次数”的持续税。

## MCP 与工作流模板把静态说明扩展成重复载荷

- 小型、公开且无凭据的 MCP server，每个每请求增加约 1,000 到 1,400 token；因为 schema 相同，两种 harness 承担的 tax 近似相同。
- 五个 server 使 Claude Code payload 增加约 4,900 token，OpenCode metered 增加 6,967 token；工具数分别从 27 增至 69、从 10 增至 52。
- 生产 MCP 的 API 更丰富，schema 往往比小型 server 大数倍。Claude Code 在 print mode 下还会静默忽略 project-scoped .mcp.json，除非显式传入 --mcp-config，再次说明“已配置”不等于“已附加”。
- Story-driven workflow framework 会把 slash command 展开为 persona、protocol 与 checklist。实验中的代表性模板为 8,405 字符，约 2,100 token。
- 模板一旦进入 conversation history，后续每个请求都会携带；一个 9-request session 会重发 9 次。其真实成本不是模板本身大小，而是 template size × request count，并继续叠加在 harness、instruction 与 MCP 底座上。

## Subagent 是实验中最大的 token 乘数

- 同一小任务直接执行时，Claude Code 累计约 121K token；扇出到两个并行 subagent 后达到 513K，是 4.2 倍。
- 并行版本共 9 次模型请求，分属三种 request class：完整约 33K 底座的主会话，以及 5 个 subagent call。
- 每个 Claude Code subagent 都携带自己的 3,554 字符 agent system prompt 和 27 个工具中的 24 个，形成独立 bootstrap；subagent transcript 返回后，又被 parent 纳入上下文。
- OpenCode 的 subagent profile 更精简，只含 1,379 字符 system prompt 和 5 个工具。但其 subagent lane 在 gateway 下未完整运行，文章只报告设计差异，不给出不可验证的总量。
- Delegation 的成本结构包含两次放大：每个 worker 复制底座，parent 再摄入结果。它可能是正确的工程选择，却是重会话 token 异常时首先应检查的地方。

## 真实配置可在用户输入前占掉 7.5 万到 9 万 Token

- OpenCode 的真实工作配置包含 11 个 MCP server、72KB instruction file、179 个工具与 277KB schema；首次冷缓存请求 metered 90,817 token，用户尚未输入任何任务。
- Claude Code 使用 4 个 MCP server、已安装 plugin 和同一 instruction file，payload 达 311KB、约 75K token，并携带 118 个工具。
- 对 OpenCode 而言，这相当于从约 7K floor 放大约 12 倍。harness 决定 floor，configuration 决定 bill。
- 85K bootstrap 会占用 200K context window 的 40% 以上。即使大部分是 cache read，它仍真实占据上下文，压缩可放入代码和任务历史的空间，并更早触发 compaction。
- Extended thinking 的 output 以约输入价格五倍计费，reasoning block 还会进入后续历史。由于 gateway 的 thinking policy 使开关是否生效无法验证，研究者拒绝发布具体数值，但保留了这一机制性风险。

## Prompt cache 降低价格，却不消除三类真实成本

- 两个 harness 都正确设置 cache breakpoint。5 分钟 TTL 下，首次写入按基础价的 1.25 倍计费，后续读取按 input price 的十分之一计费。
- 第一类残余成本是 cache write：只要停顿超过 TTL，例如思考五分钟、开会或午餐，就要以 write rate 重新预热完整栈。
- 第二类是 cache read 乘以 request count。Serial tool loop 和 subagent fan-out 会快速增加读取次数，即使单次读取便宜，总量仍会增长。
- 第三类是 context-window consumption，它完全不受缓存折扣影响。大底座每轮都占窗口，促使 compaction 更早发生，而摘要过程本身又消耗 token。
- 因此，缓存改变的是计费单价，不改变 payload 大小、请求拓扑和上下文物理占用。不能用“已经命中缓存”否定底座过重的问题。

## Cache prefix 稳定性决定缓存是否真的生效

- 团队对每个请求的 tools array 和 system block 做 hash。OpenCode 在所有请求和所有 run 中都发出 byte-identical prefix；三个独立 T1 session 的 tools、system 与 message bytes 都一致，重复运行写入 0 个 cache token。
- OpenCode 的 9-request T3 也保持同一稳定前缀。稳定性让一次写入能在整段会话内持续复用。
- Claude Code 每个 session 至少出现三种 request class：warmup probe、主会话和 subagent call；每类有不同 prefix 与 cache entry。其 system bytes 在同一 workspace 的不同 session 间也会变化，首条消息 scaffolding 同样漂移。
- 在相同文件摘要任务中，Claude Code 五次请求累计写入 53,839 个 cache token，包含一次约 43K 的整段中途重写；OpenCode 只写 1,003。
- 重跑后，大额中途写入再次出现：首轮 43,342，第二轮 36,899；第三轮面对刚预热的缓存则几乎不写。OpenCode 在所有可干净计量的 session 中都没有中途重写。
- 根据 cache temperature，Claude Code 同任务的 cache-write volume 是 OpenCode 的 5.9 到 54 倍。写入按 5 分钟 tier 的 1.25 倍或 1 小时 tier 的 2 倍计费，因此 prefix drift 能直接解释 usage meter 的跳升。
- Gateway eviction 也可能造成单次 miss，但跨 run 重现的大额写入、以及在 gateway 前已捕获的 prefix instability，使系统性 harness 行为成为更可能的解释。

## 审计链让 Benchmark 成为可复核的生产日志

- 实验把全部 150 条 request/response record 写入 tamper-evident 的 SHA-256 hash-chained audit trail，并验证链条端到端无断裂。
- 同一机制来自开源库 @systima/aiact-audit-log，可支持 EU AI Act Article 12 所需的结构化日志、完整性证明和第三方重建。
- Token benchmark 是低风险应用；信用决策等高风险 Agent 更需要回答“某天到底向模型发送了什么、收到了什么”。
- 复现实验只需约 200 行 Node 的 HTTP proxy：转发请求、保存 request body 与 response usage，并把每一对追加到 audit chain。
- 稳健流程是从 fresh config 与空 workspace 测 floor，再依次加入 instruction、MCP 和 workflow；如有 gateway，先测其 envelope，并核对最终实际响应的模型版本。

## 数字是快照，方法才是可迁移结论

- 实验只覆盖一台机器、一对版本、一个模型家族和较小样本；harness prompt 频繁变化，因此数值是 2026 年 7 月快照。
- Gateway 会影响 metered usage，也曾静默替换研究者指定的模型 snapshot。组件数值来自其无法改变的捕获 payload；warm-run 归因不可靠，因此只引用 cold anchor。
- T3 的总量收敛只代表一种可并行任务形态。严格串行任务会提高 Claude Code 请求次数，重新放大其大底座。
- 最持久的成果不是“某 harness 永远更省”，而是测量公式：固定底座、请求次数、会话增长、配置层、subagent 拓扑与 prefix 稳定性必须共同审计。

## 概念网络

### 关键概念

### Harness token floor

**context**：在用户任务进入前，Agent harness 已经发送 system prompt、tool schema 和 scaffolding。实验中 Claude Code floor 约 32.8K token，OpenCode 约 6.9K。

**费曼一下**：像打车的起步价，车还没走就已经计费。Agent 的起步价不仅占钱，也占上下文座位。

### API-boundary observability

**context**：Logging proxy 同时捕获完整请求 JSON 和 API usage block，分别作为“实际发送内容”和“实际计量结果”的 ground truth。

**费曼一下**：不要只看电费账单，也要在电表前记录每台设备何时开启。两份数据合在一起，才能知道钱花在哪里。

### Tool-schema tax

**context**：Claude Code 27 个工具的 schema 约 99,778 字符，贡献约 24K token；OpenCode 10 个工具约 20,856 字符、4.8K token。工具越多、接口越丰富，静态税越高。

**费曼一下**：每次请模型做事前，都先附上一本“所有工具说明书”。工具越多，模型在读用户问题前要先背的说明书越厚。

### Baseline-request product

**context**：整项任务输入近似等于 baseline × request count + conversation growth。T3 中 Claude Code 虽底座大，却用 3 次请求完成；OpenCode 以小底座请求 9 次，累计反而略高。

**费曼一下**：单程车票便宜不代表整趟行程便宜；如果要来回九次，可能比贵票但只跑三次花得更多。

### Configuration multiplier

**context**：Instruction file、MCP schema、plugin 与 workflow template 会叠加在 harness floor 上。真实 OpenCode 配置从约 7K floor 增至 90,817 token，约 12 倍。

**费曼一下**：软件出厂重量只是底盘；装上工具箱、行李架和货物后，真正上路的重量可能完全不同。

### Instruction-file tax

**context**：72KB AGENTS.md 或 CLAUDE.md 为两种 harness 每个请求增加约 20K token，而且文件是否被识别取决于 harness 与启动方式。

**费曼一下**：仓库说明不是只在开工前读一次，而是每次和模型说话都重新夹带一份。文件越长、轮次越多，重复成本越大。

### MCP schema amplification

**context**：小型 MCP server 每个每请求约增加 1,000 到 1,400 token；生产级丰富 API 的 schema 可能更大，并与请求次数相乘。

**费曼一下**：每接入一个外部系统，就要给模型多发一份接口手册。连接越多，每封信的附件越厚。

### Framework-template repetition

**context**：8,405 字符的 workflow template 约 2,100 token，但进入会话后会被每个后续请求重带；真实成本是 template size 乘以请求次数。

**费曼一下**：会议议程只有两页，但每次发言前都要重新朗读一遍。发言次数一多，两页也会变成大开销。

### Subagent bootstrap multiplier

**context**：两个 Claude Code subagent 使同一任务从 121K 增至 513K、放大 4.2 倍，因为每个 worker 有独立 bootstrap，parent 还会摄入其 transcript。

**费曼一下**：分工不只是多请两个人；每个人都要重新培训、配工具，最后主管还要把所有人的完整报告再读一遍。

### Cache prefix stability

**context**：OpenCode 的 tools、system 与 message prefix 在 run 间 byte-identical；Claude Code 的 request class、system bytes 和 scaffolding 会变化，导致新的 cache entry 与中途重写。

**费曼一下**：缓存像按文件指纹找副本。哪怕内容意思一样，只要字节变化，系统就会当成新文件重新存一次。

### Cache temperature

**context**：Claude Code 同任务的 cache-write volume 随缓存冷热从 OpenCode 的 5.9 倍到 54 倍；刚预热的第三轮几乎不写，冷或漂移时会整段重写。

**费曼一下**：刚烧热的炉子做饭省燃料，冷炉子要重新点火。比较成本时，如果一边是热炉、一边是冷炉，结论会严重偏斜。

### Context-window tax

**context**：Cache hit 只降低计费，不减少上下文占用。85K bootstrap 仍占 200K window 的 40% 以上，并提前触发 compaction。

**费曼一下**：一本书打折不代表它变薄了。即使读取便宜，厚书仍占满书包，留给代码和对话的空间就更少。

### Tamper-evident audit trail

**context**：150 条请求与响应被写入 SHA-256 hash chain，并验证无断裂，使 benchmark 数据能被第三方检查、追溯和重建。

**费曼一下**：每条记录都盖上前一条记录的指纹。中间改掉一页，后面所有指纹都会对不上，因此篡改会留下证据。

### Measurement snapshot

**context**：文章的版本、模型、机器和样本量都限定在 2026 年 7 月；prompt 会变化，具体数字会过期，但 API 边界测量方法可迁移。

**费曼一下**：天气读数只代表测量那一刻，温度计的使用方法却能长期复用。不要把一次读数当成永恒气候。

### 概念网络

![这张图是由Codex依据相关文字内容整理出的概念网络图，用于呈现Claude Code相关成本逻辑的概念关联关系。图中明确标注了工具架构（Tool Schema）、指令（Instructions）、MCP、子智能体（Subagent）等核心概念，这些概念共同指向“基线放大”节点。“Harness Floor”（承载底价）、“Baseline × 请求数”（基线×请求数）是重要的中间计算节点，后续关联出缓存稳定性、上下文窗口税（Context Window Tax）、API边界观测等内容，最终指向“实际计价”与“验证真实开销”，清晰展现了从概念项到实际开销的传导逻辑。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Zjk1MTc4YWMzNDBlOGIxNzZhZWI0YjE4NDFhMTU0MGVfMzgwMGRiOGYzYjk0MmI0YjQ3ZDMyNjhlMDIzNzU1YWRfSUQ6NzY2OTUxNjYxMzc1Mzc4NTMwNV8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

**Harness token floor** 决定每轮请求的起步负担，其中 **tool-schema tax** 是 Claude Code 固定底座的主项；整项任务成本则由 **baseline-request product** 决定，所以批量工具调用可能抵消大底座，串行循环也可能放大小底座。随后，**instruction-file tax**、**MCP schema amplification** 与 **framework-template repetition** 共同形成 **configuration multiplier**，而 **subagent bootstrap multiplier** 又把底座复制到多个执行分支并回流 parent。

Prompt cache 只改变部分计价：**cache prefix stability** 决定旧条目能否复用，**cache temperature** 决定何时重新支付写入溢价；无论是否命中，**context-window tax** 始终存在。于是 Agent 经济性不能只看 dashboard 或首轮 payload，而要由 **API-boundary observability** 同时连接 payload 与 usage。

最后，**tamper-evident audit trail** 为观测数据提供完整性，让系统可以重建“实际发送了什么”；**measurement snapshot** 则约束解释边界，提醒具体产品排名会随版本变化，真正可长期复用的是分层测量、逐项加变量和验证请求边界的方法。

---
