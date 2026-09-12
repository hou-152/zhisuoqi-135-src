# 概念索引 · 知所栖 135

> 936 个概念 · 531 条前置依赖 · 21 个领域 · 源：Notion 概念库 + Context Engineering(28篇) + Harness Engineering(30篇)

查一个概念：先在本页按领域找，再进 `concepts/`。想知道「从哪开始学」，看每个领域的枢纽概念。

## Harness 与运行时（138）

> Agent 靠什么骨架才能跑起来、跑得久？

**枢纽**：[[Harness]] · [[skills 字段]] · [[Harness 工程 Harness Engineering]] · [[Agent vs Harness]] · [[coding agent]] · [[Runtime-harness separation]] · [[跨产品面的同步与共享边界 Surface-specific Sync and Sharing]] · [[自动激活]]

<details><summary>全部</summary>

- [[Harness]] — 包裹在大语言模型之外的完整软件架构，负责让模型能读文件、跑命令、改代码并自主完成任务。
- [[skills 字段]] — 自定义子代理前置元数据中列出待加载技能的 skills 字段，委派时应用。
- [[Harness 工程 Harness Engineering]] — 围绕模型构建的完整系统，使 Agent 能够自主行动。
- [[Agent vs Harness]] — agent 是用户交互的涌现行为实体，harness 是产生该行为的机器。
- [[coding agent]] — 由 harness 包裹的 LLM，并借工具获得读写代码等额外能力的代理。
- [[Runtime-harness separation]] — LangChain 的 framework/runtime/harness 三层分解：执行环境与可靠工作循环不是同一层。
- [[跨产品面的同步与共享边界 Surface-specific Sync and Sharing]] — 自定义技能不跨产品面同步，claude.ai、API、Claude Code 各自独立，共享范围也不同。
- [[自动激活]] — 技能无需手动输入，Claude 识别到相应情况时自动激活；斜杠命令则需显式调用。
- [[Claude Managed Agents]] — 预置、可配置、跑在托管基础设施上的 agent harness：你定义 agent 模板，harness 与 infra 由 Anthropic 提供。
- [[prefill 与 decode 的高度倾斜]] — Agent 每步追加 action 与 observation 使输入膨胀，输出却只是短 function call，如 Manus 约 100:1。
- [[primitives]] — SDK 中不可再拆的三个基本构件：Agents、Agents as tools/Handoffs、Guardrails。
- [[stateless]] — 每次调用模型都从空白状态开始，不携带上一轮的上下文
- [[Tracing]] — 框架内置的可观测能力：可视化与调试 agent 流程，并用于评估、监控与模型微调。
- [[If you're not the model, you're the harness.]] — Vivek Trivedy 的划界公式：模型权重是一侧，其余全部工程都归为 harness。
- [[非模型架构 Non-model Architecture]] — 除模型之外的一切系统成分——Harness、循环、工具、上下文管理都属于这一层。
- [[Agent]] — Agent 即装备了指令与工具的 LLM；最小配置只需 name 与 instructions。
- [[LLM-as-CPU Harness-as-OS]] — 把 LLM 当作 CPU、把 Harness 当作操作系统的类比框架，用于界定二者的职责边界。
- [[技能化 Skills]] — 把值得重复的工作流固化为可复用技能，让学习复利累积，可斜杠命令手动触发或在相关时自动应用。
- [[卡住即信号 struggle as signal]] — Agent 卡住不是故障而是信号，据此补上缺的工具、护栏与文档，并让它自己写修复。
- [[看对话 log]] — 研究一个 AI app 怎么工作，最直接的方式是把它与模型之间的请求与响应截下来逐条读。
- [[三层工程 prompt context harness engineering]] — prompt、context、harness三层同心工程，harness包住前两者并加上工具编排、状态持久化与验证。
- [[时间 Scalability Temporal Scalability]] — agent 在数小时连续运行中保持方向与质量的能力。
- [[事件驱动编排与执行解耦]] — 编排放在执行之外的事件驱动层，两者解耦，换来可观测、持久重试与事件审计。
- [[事件驱动的自动化 Automations]] — 事件驱动的自动化：issue 进入系统那一刻即触发 agent 工作流，即时精炼或行动。
- [[四类故障分类框架]] — 把技能故障归为四类：无法触发、无法加载、存在冲突、运行时失败。
- [[Action Space]] — 一个 agent 可执行的全部动作与工具的集合，构造它是搭建 harness 最难的部分之一。
- [[agent 与 harness 的分工]] — agent 是目标导向、会用工具、能自我纠错的涌现行为；harness 是产生这一行为的机器。
- [[context window 即 agent 状态]] — 循环中上下文起于一个初始事件，此后每次决策与执行结果都追加进去，它本身就是 Agent 的状态。
- [[Filesystem 作为最基础的 harness 原语]] — 文件系统被称为最基础的 harness 原语：模型在海量文件系统用法上训练过，还解锁工作区与协作面。
- [[harness 的过时假设]] — harness 编码的是“Claude 做不到什么”的假设，模型变强后这些假设会陈旧，反过来成为性能瓶颈。
- [[harness 厚薄 thin vs thick]] — 架构决策：多少逻辑住在 harness、多少留给模型；Anthropic 押薄 harness，图式框架押显式控制。
- [[Harness level feature]] — 模型开箱做不到、必须由 harness 提供的能力：跨交互持久状态、执行代码、访问实时知识、搭环境装依赖。
- [[higher-level runtime]] — 在模型调用之上再叠一层运行时，接管 turns、工具执行、guardrails、handoffs、sessions，且可按场景分层选择。
- [[model-native harness]] — 顺着模型自身擅长方式设计的 harness，让 agent 跨文件、跨工具完成任务。
- [[Von Neumann Architecture Analogy]] — 把裸 LLM 比作无 RAM 无磁盘无 IO 的 CPU：上下文是 RAM，外部库是磁盘，工具是驱动，harness 是操作系统。
- [[请求驱动与事件驱动]] — Skills 由请求内容激活，Hooks 由文件保存、工具调用等事件触发。
- [[亚稳态故障与 LIFOFIFO 连接重用]] — 压力消失后进程仍卡在降级状态；aiohttp 默认 LIFO 重用连接，把流量越推越集中在慢 Pod 上。
- [[SKILL.md 与前置信息]] — SKILL.md 上为前置信息（名称、描述），下为任务说明，如审阅清单或格式偏好。
- [[插件技能缺失]] — 插件技能不显示时：清缓存、重启 Claude Code、重装，仍无则判为插件结构问题。
- [[技能优先级层级结构]] — 技能按来源分层，企业级高于个人、项目和插件，同名时高优先级者每次胜出。
- [[连接扇入]] — Python 进程增多导致连接暴涨压垮下游；用 Envoy 升 HTTP/2、连接池与长连接收拢扇入。
- [[内置代理与自定义子代理的技能访问边界]] — 内置代理（Explorer、Plan、Verify）无法访问技能，只有 .claude/agents 中明确列出技能的自定义子代理可用。
- [[预构建技能与自定义技能 Pre-built vs Custom Skills]] — 技能分两类：Anthropic 预置文档技能与用户自定义技能，运行方式相同，来源与共享范围不同。
- [[执行可靠性机制 State Error Guardrails Verification]] — 让执行中断可恢复、错误不滚雪球、越界立即停止的机制集合：状态、错误、护栏、验证。
- [[Agent = Model + Harness]] — Agent = Model + Harness：模型只有在 harness 提供状态、工具执行、反馈回路与约束后才成为 agent。
- [[AI Agent]] — 用户感知到的行为体现：Agent 的对外表现，而非其内部实现。
- [[Latent vs Deterministic]] — 系统每一步要么在潜空间要么是确定性的，混淆二者是 Agent 设计中最常见的错误。
- [[Thin Harness, Fat Skills]] — 设计原则：harness 保持薄，把厚度与智能放进 skills（thin harness, fat skills）。
- [[名称冲突优先级与技能作用域]] — 同名技能按企业→个人→项目→插件排优先级，企业版生效并覆盖其他作用域
- [[「垃圾回收」型 agent]] — harness 的第三类组件：周期性运行的 agent，专找文档不一致与架构约束违规，对抗熵增腐化。
- [[从期望行为反推 harness 设计]] — 不从功能清单出发，而由希望模型做出的行为反推 harness 需要提供哪些能力。
- [[动态系统]] — 区别于静态 Prompt/Context 优化，指持续吸收多源信号并据反馈快速迭代的 Harness 系统。
- [[对话加确定性缝合]] — 任何 AI app 归根结底是与 LLM 对话，再把结构化结果抠出，用确定性代码缝合。
- [[反脆弱]] — 系统设计原则：规模越大失败越必然，须让单个 Agent 失败不拖垮整体，其余可恢复或换路。
- [[工具调用批处理]] — 独立的廉价 discovery 先批量执行，聚焦读取也批量执行，避免一搜一读交替造成上下文扩散与节奏开销。
- [[功能清单作为 harness 原语]] — feature_list.json 既是任务来源、进度记录又是范围边界，被视为 harness 的原语。
- [[共享 harness]] — 多个产品共用同一套 harness 代码与工具实现，减少重复并让改进跨产品传播。
- [[基础设施挑战而非 harness 设计问题]] — 把规模化跑Agent遇到的困难归类为基础设施挑战，而非harness设计技巧问题。
- [[基础设施问题，不是 AI 问题]] — 可观测性、重试、并发、状态管理、审计、调度这些墙是基础设施问题，所需原语可能已存在，不必以agent之名重造。
- [[架构约束的确定性执行]] — 把架构约束写成自定义 linter 与结构性测试，由确定性工具强制，而非只交给 Agent 自觉遵守。
- [[脚手架化 LLM 与冯·诺依曼架构类比]] — 把裸 LLM 比作无内存 CPU，上下文窗口是 RAM，外部数据库是磁盘，工具集成是设备驱动，harness 是操作系统。
- [[纠正成本递减 correct things less from that point on]] — 改进 harness 的收益不只在当轮，而是从该轮起持续减少后续需要人工纠偏的次数。
- [[可观测性]] — 看不到 agent 做了什么就修不了它搞坏的东西，故可观测性属于 harness 本身。
- [[框架反向工程]] — 越过 80% 完成度需反向工程框架、prompt 与流程，其结局往往是推倒重来。
- [[能力鸿沟]] — 基准测试成绩与真实工程执行之间的鸿沟：agent 跳步、搞坏测试、假称完成，问题在 harness 而非模型。
- [[普遍可触发 universally triggered]] — Harness 设计原则：触发与工作解耦，agent 不关心自己是被 webhook、cron 还是子调用激活的。
- [[让不可见变得可见]] — 用检查、断言与人工介入，把静默失败、分级漂移和语义跑偏暴露出来。
- [[弱 harness 强 harness 对照与消融实验]] — 同一任务分别用弱harness与强harness跑两次并对比效果，关心效果变化而非写了多少说明文档。
- [[小函数组合]] — 由 handleMessage 等六个函数通过事件通信组合，而非一个巨石。
- [[协同进化与紧耦合 co-evolution principle]] — 模型是带着特定 harness 一起做后训练的，harness 与模型紧耦合，换掉工具实现可能反而降低性能。
- [[用工具调用联系人类]] — 把人类当作可被 agent 调用的资源，通过 tool call 主动请求人介入、审批或补充信息的做法。
- [[优化对象的阶梯]] — harness 优化对象沿 instruction prompts → structured context → workflow → harness code → optimizer code 逐级演进。
- [[长周期任务的基础设施压力]] — 时域一长，压力就从模型转移到 agent 周围的基础设施：要安全、要抗基础设施故障、要能横向扩展支撑多 agent 团队。
- [[agent 作为 Claude API 的新核心原语]] — Managed Agents 接管 harness 与基础设施，使 agent 成为 Claude API 的新核心原语，便于多 agent 与长任务探索。
- [[Agents SDK]] — OpenAI 提供的标准化 Agent 开发基础设施，让开发者易于起步并为 OpenAI 模型正确构建。
- [[APM]] — Agent 包管理器，负责 agent primitives 的安装、分发、配置与运行，类比 npm/pip。
- [[Bedrock Managed Agents]] — AWS 原生的托管 agent 运行时，打包身份、权限、状态、日志、治理与部署。
- [[claude --debug]] — 查看加载错误的诊断命令，运行后留意提及你技能名称的消息。
- [[Claude Code]] — Anthropic 2025 年 11 月发布的自主编程 agent 产品，能在分钟到小时内完成原需数天的编程任务。
- [[Codex]] — OpenAI 的编码代理产品；本地化运行既是它的能力来源，也带来安全与部署上的复杂度。
- [[Harness 简化原则 Harness Simplification]] — 找最简单的解法，只在必要时增加复杂度——harness 里每个组件都编码了“模型自己做不到”的假设。
- [[harness 与 framework 的分野]] — 框架替你决定 Agent 怎么想，还重造重试、状态持久化、任务队列与事件路由；harness 只保证这些动作可靠发生。
- [[Harness 组件生命周期]] — 每个 harness 组件都是对模型能力边界的假设，过期速度各异；做法是逐一移除旧组件、验证质量是否真的下降。
- [[Harness evolution]] — harness 本身可在任务、trace、benchmark 与隔离实验中持续改进，相关工具如 Harness Evolver 与 Harbor。
- [[harness over-fitting]] — 前沿模型在自家 harness 上后训练，与特定工具深度耦合；换到没见过的 harness 后名次可能反转。
- [[Harness Thickness]] — 多少逻辑住在 harness 而非模型里：Anthropic 押薄 harness 与模型进步，图式框架押显式控制。
- [[messages API 作为直连网关]] — messages API 是通往模型的直连网关，接收 messages 返回 content blocks；足够底层，所以 agent 必须自己补上 harness。
- [[Reliability-critical harness primitives]] — 只收录直接影响 harness 设计、上下文管理、评测与运行时控制等可靠性原语的资源筛选标准。
- [[两类 Skills]] — 作者只用两类 Skills：辅助设计确认与自动化减少体力劳动。
- [[反复解释同一件事]] — 反复向 Claude 解释同一件事，是应为该内容写一个技能的触发信号与经验法则。
- [[功能组合]] — 各功能各有专长，应结合使用，而不是把所有事情硬塞进 skills。
- [[文件系统型代码执行环境 Filesystem-based Code Execution Environment]] — 技能以目录形式存在于带文件系统、bash 与代码执行的虚拟机中，可读文件、跑脚本。
- [[保留推理 retained reasoning]] — 跨工具调用与轮次保留模型私有推理，让它看到此前的计划与思路，而不只是动作记录。
- [[技能变更生效条件：编辑、删除、重启]] — 改技能即改其 SKILL.md，删技能即删目录，之后必须重启 Claude Code 才生效
- [[技能与 SKILL.md 结构 Skill SKILL.md]] — 技能是一个目录加入口文件 SKILL.md：前置元数据，其下为说明，激活后才执行。
- [[脚手架与 Harness 厚度 Scaffolding Harness Thickness]] — 脚手架本身不盖房子；关键取舍是多大比例的逻辑写死在系统里，而不是留给模型。
- [[asyncio 调度延迟与尾部延迟]] — 单请求触发数百次数据库调用时体验由最慢那次决定；asyncio 不绕过 GIL，CPU 密集任务抬高尾部延迟。
- [[hooks .claudehooks]] — 在 agent 生命周期特定事件上自动执行的确定性脚本，用于通知、审批、集成与验证。
- [[Responses API 与生产设置对齐]] — 用 Responses API 重写 harness 以更好对齐生产设置，并建议开发者弃用 legacy Chat Completions。
- [[SKILL.md 结构性要求]] — SKILL.md 必须位于命名目录内，文件名大小写须恰为 SKILL.md。
- [[「少即是多」：gimmick 与真实增益的分界]] — 装配置、诱导 agent 多是 gimmick；真实增益来自对 harness 的理解与用法。
- [[1.6% vs 98.4%]] — Claude Code 51.2 万行源码中仅 1.6% 是 AI 决策逻辑，98.4% 是确定性工程基础设施。
- [[12-factor agents]] — 一组让 LLM 软件达到生产可交付水准的工程要素纲领，非框架，可单独取用。
- [[部署系统层]] — 夹在原始模型与真实世界之间、决定落地效果的那一层部署系统。
- [[操作系统类比]] — 把 harness 类比为操作系统：用简单稳定的接口封装复杂逻辑，靠刻意通用换泛化，并复用既有软件工程实践。
- [[从救火到审查的角色转移]] — 五个子系统协同后可观测到的结果是人的角色从到处救火转为审查 agent 的产出。
- [[大小模型分工]] — 小模型承担状态判定、话题切换、网页总结等高频低价值边角活，大模型只做真正的推理工作。
- [[单用户假设的失效]] — 多 agent 并行打破单用户假设：共享锁与重复仓库副本成为瓶颈，需写时复制与去重。
- [[调试散文：一个词就是 bug]] — Harness 失灵时被调试的代码常是一段英文，唯一调试器是判断力；prompt 里一个词只把行为推偏几度。
- [[反向代理式窥探]] — 把 AI gateway 当反向代理用，原样转发请求、只在中间截取记录，从而看到真实 prompt。
- [[解空间收窄 constraining the solution space]] — 以具体架构模式、强制边界和标准化结构换取信任与可靠性，代价是放弃一部分生成任何东西的灵活性。
- [[可执行搜索空间]] — 一旦 harness 设计成为可执行的搜索空间，强 coding agent 就能在远超手写 prompt 的同一片设计空间里搜索。
- [[空间 Scalability Spatial Scalability]] — 判断能否通过投入 10 倍计算获得 10 倍有意义吞吐量。
- [[链式 Chained]] — 把多个 skill 首尾相接，让「经过验证的交接」自动串成端到端流程，把习惯变成固定契约。
- [[灵活性与自动化的权衡]] — 接入越自动越死板：链式拿灵活性换自动化并增加 token 开销，standalone 反之。
- [[能力外置化决策]] — 对任何新能力先问它该住在哪：稳定知识入 memory、打法入 skills、通信契约入 protocols、循环治理入 mediators。
- [[嵌入 Embedded]] — 第二种接入方式：检查作为 skill 产出物的一部分自动触发，无需开口，如生成组件后自动跑 eslint。
- [[确定性工程基础设施 deterministic engineering infrastructure]] — 确定性工程基础设施具体指四类：权限网关、上下文管理、工具路由、错误恢复。
- [[人类上移到更高抽象层]] — 人应在栈上往上移动，在正确时机与正确抽象层级提供监督，而非被移出回路。
- [[所有权原则]] — 自己掌控提示词、上下文窗口与控制流，不把关键环节外包给框架。
- [[拓扑作为新抽象层]] — 若 harness 设计模式被普遍掌握，拓扑结构或成新的抽象层，而非自然语言。
- [[为 AI 设计工作环境]] — 工程师能力曲线的转移：衡量标准从『我能写多少行代码』转向『我能为 AI 设计多严格的工作环境』。
- [[未来防腐测试 future-proofing test]] — 未来防腐测试：换更强模型、不加 harness 复杂度性能就跟着涨，则设计为好，即模型越强 harness 越薄。
- [[无手打代码 no manually typed code at all]] — OpenAI 团队的自我设限规则：一行代码都不手写，被作者称为 forcing function，逼出整套 harness。
- [[Agent as a New Type of Software]] — Agent 的基础设施可像 web app，但 interaction、interface、outputs 更动态，需沙箱、安全执行与长任务支持。
- [[Agent CLI runtimes]] — 运行 agent workflow 的命令行环境，使自然语言工作流可在本地脚本、终端任务与 CI/CD 中执行。
- [[Agent Session]] — 一次上下文窗口有限的工作会话，阶段切换往往开新 Session。
- [[AgentCore]] — AWS 提供的一套 agent 原语，含记忆组件、安全执行环境与权限能力，供自建 agentic workflow 使用。
- [[AI 工程基础设施 AI engineering infrastructure]] — 指出做 Agent 已不是写提示词，而需要一整套工程基础设施的判断。
- [[brain hands session 解耦]] — 把模型与 harness、沙箱工具、会话事件日志拆成三个互相假设极少、可独立失败或被替换的接口。
- [[configuration problem]] — 失败根因多在配置而非模型能力；模型越强任务越难，失败仍会以意外方式出现。
- [[Hermes Agent]] — 一个开源 Agent，代码库与文档公开，研究者可直接读源码，而非只能对其行为做逆向工程。
- [[rigor 的搬迁 relocating rigor]] — Chad Fowler 提出：严谨正从写代码搬向环境设计、反馈回路与控制系统，别指望更好的模型自动解决可维护性。
- [[SayCan]] — Google 提出的「LLM 出主意、机器人评估能不能做」的接驳框架，常被当作主流基线。
- [[Skills as permanent upgrades]] — 每个写下的 skill 都是系统永久升级：不遗忘、不退化，模型换代时判断部分自动变强。
- [[turnkey yet flexible]] — 开箱即用又能改造的设计取向：默认就能跑，同时方便接入自己的技术栈。
- [[very few abstractions]] — SDK 定位宣言：只暴露很小一组原语，抽象极少，学习曲线平缓。
- [[webhook transform 与 connect()]] — transform 在云端把原始 http payload 转成带类型的 event；connect() 从本地建持久 WebSocket，无需公网 endpoint。

</details>

## 循环与自主执行（45）

> 一次任务如何变成可重复、可自主推进的循环？

**枢纽**：[[循环工程 loop engineering]] · [[Agent loop]] · [[Loop Engineering]] · [[闭环]] · [[长时程自治编码 long-running autonomous coding]] · [[agent 循环]] · [[笨循环 Dumb Loop]] · [[自动循环的心跳]]

<details><summary>全部</summary>

- [[循环工程 loop engineering]] — 把频繁的手动收尾固化为可重复循环的方法：挑动作、试验证、写流程、封装成技能、调用并迭代、再链式化。
- [[Agent loop]] — SDK 内置的循环：发起工具调用、把结果送回模型、持续迭代直到任务完成。
- [[Loop Engineering]] — 从单次提示转向自动循环的工作方式：设计目标、触发、执行、验证、失败处理与反馈机制。
- [[闭环]] — 把执行结果回喂给决策、使任务能自动推进下一轮的结构。
- [[长时程自治编码 long-running autonomous coding]] — 把 coding agent 的使用场景推到以周为单位的连续自治运行，目标是自主跑数周、完成人类团队通常要数月完成的项目。
- [[agent 循环]] — LLM 输出结构化 JSON 决定下一步，确定性代码执行 tool call，结果回灌上下文，直到 intent 为 done。
- [[笨循环 Dumb Loop]] — 循环本身不含智能，只负责反复调用模型；所有判断与决策都来自模型的输出。
- [[自动循环的心跳]] — 定时触发是 loop 的心跳：/loop 间隔执行、cron、hook、GitHub Actions；没有它就不是 loop。
- [[编排循环与「dumb loop」]] — 组装提示、调模型、解析输出、执行工具、回喂结果并重复的编排心跳循环。
- [[可自动化循环]] — 商业中「读数据→算→动作→再读数据」的重复流程是 AI 甜蜜区，但人生等非循环事务不在其中。
- [[漂移与隧道视野 drift & tunnel vision]] — 长时程自治中的两种典型退化：偏离原始目标的漂移，与只盯局部而丢失全局的隧道视野。
- [[Agentic Coding]] — 让模型自主完成读代码、改代码、跑测试、反思再改的多步编程任务，考核的是能不能把活儿干完。
- [[Continuous orchestration loop]] — 不只执行单个任务，而是长期监督其他线程、Agent 或 loop，并能按计划持续运行的编排循环。
- [[Loop Contract]] — 每个 loop 目录中的 README 契约，写明 goal、workflow、boundaries、backlog 与 timeline，供 agent 每轮读取。
- [[Loop Engineer]] — 不再直接 prompt coding agent，而是设计能自动 prompt agent 的循环，关注触发器、状态、日志、验证与多 agent 协作。
- [[Orchestration Loop TAO Cycle ReAct Loop]] — Agent 运行的心跳：循环执行 Thought-Action-Observation，机制上常只是一个 while 循环。
- [[think → act → observe 循环]] — 带 steps 的 while 循环：调 LLM 思考、执行工具、把结果回灌 messages，返回纯文本即本轮结束。
- [[tool loop]] — LLM、system prompt 与 tools 组成循环：模型发出工具调用，结果回灌后再继续生成。
- [[Ralph Loop]] — 一种 harness 模式：用 hook 拦截模型退出企图，在干净上下文中重注入原始 prompt，逼 Agent 继续。
- [[编排循环 Orchestration Loop TAO ReAct]] — 以“思考—行动—观察”为一轮，把模型输出变成可重复推进的任务循环。
- [[Harness 与 Loop 的配合]] — Harness 提供约束护栏、Loop 提供驱动力，二者配合让任务可持续自动推进。
- [[触发模式谱系]] — Agent 常见触发方式四分类：事件触发、定时触发、发射后不管、长时程自主，各自对应不同在环程度。
- [[错误复利 compounding errors]] — 多步流程里每步微小失败率会累乘：10 步各 99% 成功率，端到端只剩约 90.4%。
- [[范围控制与显式的完成定义]] — 约束 Agent 一次只做一个功能，不多不少、不偷改需求清单掩盖未完成，并给出显式完成定义。
- [[宏动作]] — 编程的最小单位从敲代码行变成委派一整块工作，如实现功能、重构子系统、写测试。
- [[会话生命周期]] — Agent 会话应走结构化生命周期：开工跑 init 与读状态，执行，收尾更新进度、记未完成项，只在可安全恢复时 commit。
- [[任务时域 task horizon]] — 一次任务可连续自主运行的时间长度，是衡量 Agent 能力与「为什么是现在」的量化指标。
- [[收敛式失败恢复]] — 失败时收敛修正：grep 失败换更简单正确转义的查询，路径错用 glob 而非猜路径扩范围。
- [[Decision-maker in the body]] — loop 区别于 cron 的关键：中间有一个决策者，模型按当前状态决定下一步，而不是执行固定脚本。
- [[Inner Loop]] — Primary Agent 与用户、代码和工具交互以完成主要执行工作的循环，可在较少人工干预下长期运行。
- [[judge agent 与周期性 fresh start]] — 每个周期结束由 judge agent 判定是否继续，下一轮从头开始，以对抗漂移与隧道视野。
- [[Learning Loop]] — 把运行中获得的规则写回 skill 文件，下次运行自动生效，技能由此自我改写。
- [[Model as subroutine]] — loop 出现后，模型不再是对话对象，而是被 loop 在某一步调用的能力。
- [[No-progress detection]] — 识别 loop 仍在消耗预算却没有推进任务的机制，属于生产 loop 的硬停止条件之一。
- [[Outer Loop]] — 研究、监督和维护主系统的外循环，汇集反馈、评估与人的输入，方向与重要决定由人定。
- [[ReAct loop]] — 模型推理→通过 tool call 行动→观察结果，在 while 循环里重复，是当前 agent 的主执行模式。
- [[steering]] — 用户在 agent 运行中途发来新消息时的介入问题，目前仍无优雅解法
- [[Prompt 到 Loop 的跃迁]] — 从提示词、上下文、harness 到 loop 的四次跃迁：语言表达、信息组织、规则约束、系统自运行。
- [[「扔掉 DAG」的承诺]] — 认为可抛弃 DAG、只给目标与转移让 LLM 实时决策路径的承诺，作者随即指出它并不完全成立。
- [[缩短循环 shortening the loop]] — 所有有效 AI 用法的共同模式：缩短某个循环，让想到就能立刻做到。
- [[习惯变契约 habit → contract]] — 把靠自觉维持的习惯写成链条步骤，变成由系统保证执行的契约，人只在被升级回来时介入。
- [[Agentic workflows]] — 由规则、上下文、工具调用、验证与输出格式组成的端到端 AI 工作流。
- [[Autopilot：内建循环]] — Copilot 工作流第五步，内建循环强制模型持续工作，直到计划每一项都做完。
- [[Gather-Act-Verify Cycle]] — 收集上下文、动手修改、验证结果、再重复，构成 Agent 的执行节奏。
- [[TodoWrite 与 TodoRead]] — 内置的待办读写工具，prompt 要求高频使用，做完一项立刻标记完成，管理多子任务。

</details>

## 上下文工程（169）

> 模型在每一步到底应该看到哪些信息？

**枢纽**：[[Skill]] · [[上下文 context]] · [[按需加载]] · [[上下文工程 context engineering]] · [[注意力预算 attention budget]] · [[SKILL.md 与 YAML 前置元数据 SKILL.md YAML frontmatter]] · [[长上下文窗口]] · [[有限的工作记忆 limited working memory]]

<details><summary>全部</summary>

- [[Skill]] — 放在 .claude/skills/ 下的文件夹，含声明触发条件的 frontmatter 与完整正文，按需加载。
- [[上下文 context]] — 模型读到的全部『前文』；处理新词时要连着前面所有词的关系一起理解。
- [[按需加载]] — 技能按需加载：起初只加载名称与描述，请求匹配时才加载正文，不占满上下文。
- [[上下文工程 context engineering]] — 对模型上下文窗口的审慎构建与管理，把原始上下文与目标任务映射为可组合的上下文处理函数。
- [[注意力预算 attention budget]] — 把 LLM 注意力类比为有限的工作记忆预算，每新增一个 token 都要从中支取，故上下文是有限资源。
- [[SKILL.md 与 YAML 前置元数据 SKILL.md YAML frontmatter]] — SKILL.md 的 YAML 前置元数据以 name 与 description 为必需字段，是技能的发现层。
- [[长上下文窗口]] — 模型一次能装下的文本量，如 1M token 可装下整套《指环王》与《霍比特人》。
- [[有限的工作记忆 limited working memory]] — 模型能装载的上下文信息量有限，因此「往里面放什么」必须做取舍，这是上下文工程的物理前提。
- [[Skill-as-method-call]] — skill 像方法调用：同一套流程传入不同参数，产出截然不同的能力。
- [[skill-creator 访谈式创建]] — 装上 skill-creator，让 Claude 反过来访谈你的工作流，快速生成 skill。
- [[Skills Hell]] — skill 数量膨胀、互相冲突或长期不维护，像 framework hell 一样拖低 Agent 可靠性。
- [[上下文压缩 Context Compression Summarization]] — 通过摘要或减少携带内容来压缩上下文，但不得以破坏稳定前缀为代价。
- [[上下文腐烂 Context Rot]] — 模型性能随输入长度增长而变得不可靠的现象，且不是平滑衰减，而是在不同位置参差塌陷。
- [[Context Reset vs Compaction]] — 压缩是就地总结让同一 Agent 带着缩短历史继续；重置是清空重来，靠交接物把状态交给下一个 Agent。
- [[技能触发与自动使用 Skill Triggering Automatic Use]] — Claude 按请求与 description 的匹配自动触发技能，触发后才用 bash 读取 SKILL.md 正文。
- [[上下文文件树 tree of files]] — 不要把所有实践塞进 CLAUDE.md，而是组织成一棵能在正确时机按需加载的文件树。
- [[提示词工程 Prompt Engineering]] — 精心设计模型接收到的指令。
- [[渐进式披露 progressive disclosure]] — Agent 通过探索逐层发现相关上下文、工作记忆只保留必要部分的检索与认知模式。
- [[三类内容：说明、代码、资源 Instructions, Code, Resources]] — 技能内容分说明、代码、资源三类，加载时机不同，代码只把输出带入上下文。
- [[护栏与判断力的取舍 guardrail tradeoff]] — 规则数量应是模型能力的函数：旧模型需显式护栏避免最坏情况，新模型判断力足够时可减少规则让位给判断。
- [[会话的话题边界]] — 把聊天会话看成有话题性的：做与本功能无关的事就开新会话，避免有限上下文被无关内容稀释。
- [[混合指代]] — 一句话里既有本名又有代词，清晰度介于显式指代与隐式指代之间。
- [[可恢复的压缩 restorable compression]] — 压缩上下文时保留可恢复的锚点：网页留 URL、文档留沙箱路径，缩短而不永久丢信息。
- [[系统提示 System Prompt]] — 调用前注入的系统级指令；文中批评每轮把当前时间、当前模式、当前状态写回它的做法。
- [[压缩（compaction）与运行内外的分工]] — 剪枝处理运行内的上下文，压缩处理跨运行的会话累积：token 超阈值就把历史摘要后喂进下一次运行。
- [[Agent Skills]] — Claude 可读的技能文件，文件能递归引用其他文件，常用于教它调用 API 或查询数据库。
- [[Context as working memory budget]] — 把上下文窗口当有限工作记忆经营，配套 KV-cache 局部性、文件系统记忆、压缩与背压。
- [[Context-window tax]] — 即便缓存命中省了钱，固定内容仍占用窗口容量：85K bootstrap 占 200K 窗口四成以上，并提前触发 compaction。
- [[description 作为触发条件]] — 在 frontmatter 的 description 里写清「什么时候用」，以此决定该 skill 何时被自动拉进上下文。
- [[Progressive disclosure（渐进式披露）与 Skills]] — harness 启动时不把 Skill 全部载入，按需逐步披露，避免 agent 开工前就拖垮性能。
- [[Repo-local instructions]] — 放在仓库内的 CLAUDE.md、AGENTS.md 等规则文件，是 agent 可反复读取的持久化协作接口。
- [[Session Management]] — 管理会话的实践取舍：开几个会话、何时 compact、何时 rewind 或改用 subagent。
- [[the dumb zone the smart zone]] — 上下文被工具描述等填充后模型变笨为笨蛋区；把子任务拆给 sub-agents 可让主线程留在聪明区。
- [[tokens]] — 模型处理的是 token，而不是直接处理词；token 是模型处理文本的基本单位。
- [[迷失在中间 lost in the middle]] — 当模型必须访问并使用位于长输入上下文中间的信息时，性能显著劣化的现象。
- [[压缩 Compaction]] — 对对话或观察做压缩凝聚的机制：压得太狠会凝成『自信但错误』的理论，压不动则停在分散的可能性里。
- [[按需加载与始终加载]] — CLAUDE.md 每条对话都加载，适合作通用标准；Skills 按需加载，适合作特定任务知识。
- [[技能描述]] — 技能描述是 Claude 判断是否使用该技能的依据，请求与描述匹配后激活。
- [[名称与描述 name description]] — 名称是技能标识，描述是匹配条件；请求先与描述做语义匹配，允许意图重叠
- [[匹配后的确认与完整加载]] — 匹配成功后先弹出确认，确认后才读取整个 SKILL.md 并执行其中指令
- [[启动时仅加载名称和描述]] — Claude Code 启动时扫描技能位置，只加载名称与描述，不载入 SKILL.md 全文
- [[上下文占用率与性能衰减]] — 上下文窗口越满，模型性能越容易被轻微拖累；压缩通过腾出空间缓解这一衰减。
- [[语义匹配（semantic matching）与触发短语]] — Claude 靠请求与技能描述在含义上的重叠决定是否触发，重叠不足就不匹配。
- [[compaction]] — 上下文接近窗口上限时，把对话摘要后重新初始化新窗口，保留关键决策与未解决 bug。
- [[Resolver]] — 上下文的路由表：任务类型 X 出现时优先加载文档 Y，规定加载什么与何时加载。
- [[典型示例策展 diverse, canonical examples]] — few-shot 时策展一组多样、典型的示例来刻画期望行为，而非把边缘 case 堆进 prompt 穷举规则。
- [[反思性提示]] — 在提示中插入人类设计的反思步骤，让模型先确认指代与真实意图再动手，而非急着完成。
- [[方向漂移 Direction Drift]] — 上下文渐满导致一致性衰减：偏离目标、遗忘早期约束、在细节里越走越深。
- [[复述（recitation）与 lost-in-the-middle]] — 长循环中模型注意力偏向首尾；不断重写 todo 等于把目标复述到上下文末尾，避开中段被忽略。
- [[干扰项的非均匀影响]] — 一个干扰项就足以把成绩压到基线以下，四个进一步叠加；各干扰项影响不等价，且随输入变长而放大。
- [[干扰项与无关内容之分]] — 术语约定：干扰项与 needle 主题相关但不回答问题；无关内容则与 needle 和问题都无关，两者不可混谈。
- [[格式即上下文 where the format matters]] — 信息的呈现方式本身构成上下文：简洁摘要优于原始数据倾倒，清晰工具 schema 优于含糊指令。
- [[共享上下文窗口]] — 技能与对话共享同一上下文窗口，技能激活时整份 SKILL.md 被载入上下文
- [[过度约束与松绑 over-constraining unhobbling]] — 在系统提示词、CLAUDE.md 与 skills 里过度约束模型，松绑后提示可大幅精简。
- [[护栏型指令的过期]] — 为旧模型写的强指令曾是必要护栏，代价是部分场景下判断错误；模型判断力提升后若仍不撤除，保护就变成压制。
- [[滑动窗口]] — 压缩注意力中为最近若干词的原始 KV 保留 VIP 通道、不被压缩且必然入选，保证对刚说过的话仍有清晰记忆。
- [[加法本能陷阱与过度约束]] — harness工程最可靠的失败模式：一出问题就往prompt加规则，规则互相矛盾，模型只好安静地违反一条。
- [[减法带来质量跃迁]] — 删规则、合并重复、消除暗中互相打架的指令，比继续添加规则更能带来质量跃升。
- [[检索与推理的双任务负担]] — 把完整历史塞进 prompt，等于要求模型在一次调用里既定位相关片段、又据此推理。
- [[渐进披露 progressive disclosure]] — 在正确的时机加载正确的上下文，而不是一次性把所有信息常驻在 system prompt 里。
- [[近因偏置 recency bias]] — 模型更善于使用出现在输入上下文最末尾的相关信息，这是位置效应 U 型曲线的右半边。
- [[两级上下文剪枝 pruning]] — 上下文超限时的两级裁剪：软裁旧工具结果、硬清超量历史并留占位符。
- [[领域语言缺口 missing language layer]] — AI 能谈代码，却要人反复解释代码库与业务里那些非显而易见的词。
- [[桥接推理]] — 通过上下文在已有记忆与当前表达间建立联系，从而恢复代词或转喻所指对象的语言理解机制。
- [[上下文 playbook 与增量条目]] — 把上下文当作带（标识符，描述）条目的演化手册，由Generator、Reflector、Curator三者增量维护。
- [[上下文隔离 context isolation]] — 用独立上下文窗口、专属系统提示与受限工具权限切分并委派任务，避免污染主对话。
- [[上下文均匀处理假设]] — 默认前提——模型处理第 10000 个 token 应与第 100 个一样可靠；报告以实验证伪它。
- [[上下文失败，而非模型失败 context failures, not model failures]] — 多数 agent 失败已不是模型能力不够，而是上下文装配不对，修系统比换模型更有效。
- [[上下文坍塌与简洁偏置]] — 反复重写整块 prompt 会让信息坍塌、越写越简，故应输出结构化条目并用确定性逻辑合并。
- [[上下文文档 context.md]] — 项目里的具名文件，Grill with Docs 会查找它并读取其中已有的共享语言。
- [[上下文压缩与即时检索 compaction just-in-time retrieval]] — 对抗 context rot 的组合策略：compaction、观察遮蔽、按需 grep/glob、子 agent 只回传摘要。
- [[系统而非字符串 A System, Not a String]] — 上下文不是静态提示词模板，而是主 LLM 调用之前运行的那个系统的输出。
- [[消息层 Messages Layer]] — 把真正会变化的信息放进消息层，而非频繁改动前面的固定指令，保持提示前缀稳定。
- [[新鲜度机制]] — 防长时运行漂移的一组做法：scratchpad.md 频繁重写、近上限自动总结、系统提示加自省提醒、鼓励随时转向。
- [[选择性注意力压缩]] — 远的历史信息压缩、邻近文本保留全文、当下最相关部分重点处理的分层注意力机制。
- [[延迟加载工具 deferred loading]] — 渐进披露在工具层的实现：部分工具须先用 ToolSearch 搜到完整定义才能使用，被需要前不消耗上下文。
- [[预算警告与溢出恢复]] — 上下文治理的两道保险：迭代将尽时注入预算警告令其收尾；中途遇 context-too-large 则强制压缩消息并重试，不浪费一次迭代。
- [[长上下文的幻觉]] — 扩展上下文版本常是同一模型加 YaRN 一类数学技巧拉长可注意序列，并非指令预算更大的新模型；窗口更大不等于更会找针。
- [[注意力之前的注意力 attention before attention]] — 窗口变长不等于能随便塞：选上下文要看语义相关性、逻辑依赖、新近性、重叠与用户偏好，并做过滤重排。
- [[自回归下输出也是上下文]] — 模型是自回归的，它自己生成的 token 也进入自己的输入，所以长度压力同时来自输入与输出。
- [[最小充分上下文]] — reviewer 只需解释某个风险的最小附近代码；额外文件会进入 working context，增加成本并让后续推理失焦。
- [[最小高信号 token 集合 smallest possible set of high-signal tokens]] — 有效 context 的唯一指导原则：找到使期望结果概率最大的最小高信号 token 集合；注意 minimal 并不等于 short。
- [[Agent Drift]] — AI 在长任务中逐渐失去连贯性的现象，研究发现它几乎完全是上下文管理问题而非推理问题。
- [[agentfile CLAUDE.md 与 AGENTS.md]] — 仓库顶层被 harness 确定性注入系统提示的 markdown 文件；研究显示手写收益小、LLM 生成反损性能。
- [[Bounded Output]] — 把单次工具或模型输出限制在有界范围内，避免超长结果挤占上下文（材料仅给名称）。
- [[chat templated prompts]] — 对话式提示只是补全式提示的一种特殊包装。
- [[code-review-graph]] — 用 Tree-sitter 为代码库构建结构化图谱并增量追踪变化，让 Claude 只读相关文件的工具。
- [[code-review-graphignore 排除配置]] — 放在仓库根目录的排除清单，让图谱索引跳过生成代码与第三方依赖等无关路径。
- [[Context Anxiety]] — 部分模型在接近自认为的上下文上限时，提前给工作收尾的现象。
- [[Context Bloat]] — 把每个怪癖、模式与经验都塞进 CLAUDE.md（如两万行），导致模型注意力退化。
- [[Context injection]] — 不改权重时，给模型加知识的唯一通道是把内容放进上下文；记忆文件、检索、MCP 都是它的实现。
- [[Context Management 四策略]] — 把上下文当内存来管：该压缩就压缩、该外置就外置、该懒加载就懒加载。
- [[gotchas 优先的 CLAUDE.md]] — CLAUDE.md 写法准则：轻量说明仓库用途，token 主要花在代码库内反直觉的 gotchas 上，不写显而易见的事。
- [[gotchas 优先原则]] — token 分配原则：简要说明 repo 用途，大部分 token 留给代码库内部的反直觉约定，避免陈述显而易见的事。
- [[Handoff Artifact]] — 彻底清空上下文窗口并启动新 Agent 时，用结构化交接工件携带上一个 Agent 的状态与下一步。
- [[instruction budget]] — 每条无关的工具描述都会消耗 agent 必须处理却毫无收益的注意力额度，这份预算是有限的。
- [[Instruction-file tax]] — 过大的 AGENTS.md/CLAUDE.md 会在每个请求上多花大量 token，且是否被识别取决于 harness 与启动方式。
- [[just in time 上下文检索]] — agent 只维护轻量标识符（路径、查询、链接），运行时用工具按引用动态加载真实数据。
- [[llms-full.txt]] — llms.txt 的完整版，30-60KB，含项目描述、FAQ、使用场景、竞品对比与 README 摘录，访问量约为概要版的 3-4 倍。
- [[llms.txt]] — 站点根目录下面向 AI 的 Markdown 文件，类似 robots.txt，写清站点做什么、关键页面与作者，供 AI 检索时优先读取。
- [[prompt completion]] — 模型的输入称 prompt，输出称 completion 或 response。
- [[prompt 与 context 的通用性落差]] — prompt 可以很具体，context 要跨很多请求通用，因此做不到那么具体。
- [[prompt 主导论]] — harness 与模型都重要，但 prompt 更重要；协调良好与长期专注靠大量 prompt 实验。
- [[Self-Improving Context System]] — 上下文工程不是一次性设置，而是每次 agent 工作都在变好的活系统，维护由 agent 自己承担。
- [[Skill Files]] — 可复用的 markdown 文档，只教模型怎么做，不定义做什么，目标由用户提供。
- [[Token 优化的评审上下文 get_review_context_tool]] — MCP 工具 get_review_context_tool，输出 156–207 token 的结构化评审摘要。
- [[Tool call offloading]] — 工具输出超阈值 token 时只保留头尾，把完整输出卸载到文件系统，模型按需再读取。
- [[description]] — 必填字段，≤1024 字符，是匹配依据，须写清技能作用与何时使用它
- [[设计文档]] — 文档是人与 Agent、Agent 与 Agent 之间的桥梁，也是记忆载体。
- [[观察掩码 Observation Masking]] — 上下文管理策略：把旧的工具输出隐藏起来，只保留动作与结论，从而压低窗口占用。
- [[滚动截断 rolling truncation]] — 官方 harness 的上下文管理：超过约 175,000 字符就丢弃最旧消息，代价是丢失早期观察且常运行在更满窗口。
- [[CLAUDE.md]] — 放在项目根目录的 markdown 文件，Claude Code 每次会话开始时自动读取并严格执行。
- [[把上下文转化为执行 turn context into execution]] — Linear 的定位：把反馈、意图、决策、计划、代码塑造成工作并带到生产。
- [[保留错误证据与错误恢复]] — 失败是多步任务的一环；清理轨迹会抹掉证据，保留错误 action 与堆栈才能让模型隐式更新。
- [[仓库即唯一事实来源]] — 一切指令、状态与清单必须以文件形式落进仓库，否则对 agent 不存在。
- [[查询感知语境化 query-aware contextualization]] — 把查询同时放在待处理数据的前面与后面，使 decoder-only 模型编码材料时就注意到查询。
- [[代码即高保真引用]] — 引用材料优先选代码形式，因为它给出清晰高保真的指令，且是模型非常熟悉的语言。
- [[动态装配 Dynamic]] — 上下文即时生成、为当下任务量身定制：这次是日历数据，下次是邮件或一次网络搜索。
- [[短上下文]] — 故意把对话剪短、让线索不全，考模型信息不足时是主动澄清还是硬猜瞎做。
- [[机制与内容分离]] — 把管理context的机制与context里的内容分开：元层演化skill、基层优化context，内层找最佳context、外层找最优skill。
- [[可编辑性边界]] — 嵌入只对你能掌控、不会被更新覆盖的 skill 生效；内置或插件托管的 skill 必须改用链式。
- [[扩展上下文模型 extended-context models]] — 把上下文窗口撑大的模型版本，如 GPT-3.5-Turbo 16K、Claude-1.3 100K、LongChat-13B 16K。
- [[廉价 demo 与「魔法级」agent]] — 同一封约时间邮件，上下文贫乏的 agent 只回机械客套；被日历、邮件、联系人、发邀请工具喂饱的 agent 直接给出方案与邀请。
- [[恰当高度 the right altitude]] — system prompt 写作的 Goldilocks 区间：具体到能有效引导行为，又灵活到能提供强启发式。
- [[轻量引用 lightweight references]] — 大块信息留在外部存储，模型窗口里只暴露简短引用的上下文隔离手法。
- [[熵减 entropy reduction]] — 上下文工程的本质是把高熵的上下文与意图压缩成低熵表示，该成本与机器智能水平成反比。
- [[上下文（Context）：模型生成之前看到的一切]] — 上下文是模型生成响应之前看到的一切，含系统提示、用户提示、记忆、检索、工具与输出定义七类。
- [[上下文骨架]] — 把issue tracking看作可依赖的骨架，负责收集信号、问题与决策，而非厨房点单系统。
- [[上下文缺口]] — 交互双方各掌握对方不知道的上下文，承认自己不擅长的部分反而能更好服务同一用户。
- [[上下文协作 context-cooperative]] — 从『你在哪就做什么』的条件—动作，转向主动理解用户正在做什么并协作达成共同目标。
- [[首因偏置 primacy bias]] — 模型更善用出现在上下文最开头的相关信息，呈 U 型曲线左半边，且只在大模型上出现。
- [[提示词即行为程序]] — prompt 的指令、示例、顺序、用词、格式都是行为程序，没有中立 token。
- [[文件系统即终极上下文]] — 文件系统容量无限、天然持久、可被 agent 直接操作，是外部化记忆，优于任何不可逆压缩。
- [[系统 prompt 的体量差]] — claude code 的 system prompt 约 13k 字符，cursor 不到 6k。
- [[先收窄、后读取]] — 先用 grep/glob 定位候选文件与符号，路径行号明确后才用 view 读取精确证据，避免盲目全文读取。
- [[性能梯度而非硬悬崖 performance gradient rather than a hard cliff]] — 长上下文退化是渐变滑坡而非某个长度后突然失效：模型仍高度可用，只是检索精度与长程推理相对变弱。
- [[序列位置效应 serial-position effect]] — 认知心理学经典发现：自由回忆时列表首尾最易记住，被借来解释模型上下文中的 U 型表现。
- [[隐式 code context]] — 作者观察到 Claude Code 接到指令后自动把相关文件放入上下文，但既无 tool use 记录，也找不到本地代码索引。
- [[与底层模型正交 orthogonal to the underlying models]] — 上下文工程带来独立于底层模型强弱的结构性收益；模型进步是潮水，产品应做被托起的船。
- [[约束优于指令]] — prompt 优化核心经验：约束比指令有效，「No TODOs」胜过「记得写完」，因为模型默认会做好事，约束只是替它划边界。
- [[正确的信息与工具，在正确的时间]] — 既要给资料，也要给工具，还要挑时候给。全部一次性塞过去不是慷慨，是把桌子占满；关键细节漏掉一条，后面全是无用功。
- [[知识与能力的双供给 information and tools]] — 上下文供给分两类：knowledge（information）走 RAG/记忆一侧，capabilities（tools）走可用工具一侧。
- [[指令就近原则]] — 早期模型更倾向听上下文末尾的指令，所以把工具用法写进工具描述本身，删掉重复指令。
- [[指令子系统与渐进式展开]] — 指令子系统告诉 Agent 做什么、按什么顺序、开工前先读什么，用渐进式展开结构而非单个巨型文件。
- [[最小充分性与语义连续性原则]] — 两条原则：只收集存储支撑任务必需的信息，价值在充分而非体量；上下文的目的是维持意义的连续，而不只是数据的连续。
- [[agent 不是读心者 agents are not mind readers]] — agent 无法读心，只能靠上下文变得有用，因此上下文是整套新系统的核心。
- [[Agentic primitives]] — 把规则、角色、背景与流程拆成可复用、可版本化、可组合的文件，充当 AI 工作流的标准零件。
- [[Chat modes]] — 按任务类型切换模型角色与关注点的机制：架构设计、写码、审 PR、调试各有一套输出习惯。
- [[Codified Context]] — 把代码库的隐性约定写成教学文档式上下文并入库；某项目达 26000 行，超过部分模块代码。
- [[Context 四种失败模式 Context Pollution Distraction Confusion Clash]] — 把上下文失效归为污染、分心、混淆、冲突四类，统一解法是不倾倒、只策展。
- [[Context discipline]] — 用固定 anchor files 与稳定任务边界约束每轮迭代的上下文，不让对话无限膨胀。
- [[Context Distraction]] — 上下文超过阈值后模型开始机械重复历史行为而非真正推理，窗口更大不等于结果更好。
- [[Context Infrastructure]] — Harness 决定 Agent 怎么工作与协调，上下文基础设施决定它拿到什么信息，进而决定质量上限。
- [[context rot（上下文腐烂）与 Lost in the Middle]] — 关键内容落在窗口中段时模型表现下降 30% 以上；长窗口也会随长度增加出现指令遵循退化。
- [[Explicit Breakpoints]] — 在上下文中显式标出分层边界（长期稳定层、中期变化层、短期动态层），适合层次清楚的场景。
- [[few-shot 套路化与受控多样性]] — 上下文里堆满彼此相似的 action-observation 对时，模型会照着旧模式走下去，需引入结构化变化。
- [[haystack 结构连贯性效应]] — 同批语料保留思路流与随机打乱句序相比，打乱版性能反而更好，提示输入结构会影响注意力施加方式。
- [[HCA]] — 重度压缩注意力：每 128 个相邻标签含义 KV 压成 1 个输入，压缩率达 CSA 四倍，剩下太少便不做稀疏筛选、让 Q 全量关注。
- [[Markdown 路由]] — 为站点每个页面提供 .md 版本，把约 15000 token 的 HTML 页压到约 3000 token，减少约 80%。
- [[Markdown prompt engineering]] — 用清晰的 Markdown 层级区分背景、任务、约束与验证标准，而不是把 prompt 写得更华丽。
- [[new topic 判定]] — 小模型在发送消息时判断 isNewTopic 并抽 2-3 词标题，作者推测用途是管理上下文。
- [[one-shot 的理论极限]] — 理论上提示、上下文、顺序都完美就能一次做对，但没人做得到，规划的意义正是逼近它。
- [[Personal Context]] — 个人独有、不可复制的笔记、框架与判断；模型能力共享，它私有，接入越系统 AI 越懂你。
- [[SKILL.md：frontmatter＋body 契约]] — skill 的最小结构：frontmatter 声明 name、description、allowed-tools，body 写清流程与报告方式。
- [[Software 3.0]] — 用 prompt、context、tools 编程的第三种范式；context window 是操纵 LLM 解释器的杠杆。
- [[Stochastic Graduate Descent]] — 对上下文工程实际做法的戏称：手工架构搜索、prompt 摆弄与经验猜测的混合
- [[system prompt]] — Agent 以用户不可见的系统提示开场。
- [[U 型性能曲线]] — 相关信息的位置与任务准确率呈 U 形：首尾高、中间低，在多种模型与任务上反复出现。
- [[WebFetch 两阶段总结]] — 大模型产出 tool call 与 prompt，小模型读网页并按 prompt 总结，只把一小段文字回传作上下文。

</details>

## 记忆与检索（37）

> 经验与知识怎么被存下来、又准确取回？

**枢纽**：[[记忆 Memory]] · [[多时间尺度记忆与「记忆只是 hint」]] · [[跨轮次记忆与连贯策略]] · [[结构化记事 agentic memory]] · [[self-baking]] · [[分层记忆架构]] · [[检索池 vs 引用]] · [[检索器-阅读器配置 retriever-reader]]

<details><summary>全部</summary>

- [[记忆 Memory]] — 在不同时间尺度上运作的存储：会话内、跨会话、长期沉淀，各层服务于不同的取回需求。
- [[多时间尺度记忆与「记忆只是 hint」]] — 短期为单会话历史，长期跨会话持久化并分层索引；agent 应把记忆当提示，行动前校验真实状态。
- [[跨轮次记忆与连贯策略]] — 保留推理历史后模型更能随时间学习并使用连贯策略；两处失忆叠加解释了它此前为何学不会。
- [[结构化记事 agentic memory]] — agent 定期把笔记写到上下文窗口之外（待办清单或 NOTES.md）并在需要时取回，以跨上下文重置续接任务。
- [[self-baking]] — Agent 有选择地把自己的上下文消化成持久知识结构，是记忆存储与学习的分界。
- [[分层记忆架构]] — 借操作系统类比把记忆分层：上下文窗口如内存，短期、长期按时间相关性与重要性阈值区分，并有迁移函数。
- [[检索池 vs 引用]] — 页面进入检索池不等于被引用，模型还要再筛选哪些内容值得写进最终回答。
- [[检索器-阅读器配置 retriever-reader]] — 开放域问答的标准架构：检索器取回前 k 篇文档，语言模型作为阅读器基于这些文档作答。
- [[知识端点]] — 把希望 AI 记住的内容集中整理到一个入口，而不是让它去各个站点零散地抓取。
- [[即时检索 Just-in-time Retrieval]] — 上下文里只保留轻量级标识符（路径、ID、链接），需要时再取全文，而不是把内容全塞进去。
- [[记忆即提示 Memory as Prompt]] — 把记忆当作一种提示来管理：写入什么、何时注入上下文，都由提示工程的原则决定。
- [[项目知识体系]] — loop 需要完整知识管理：规则、记忆、文档、经验沉淀与过期信息清理，启动时读对上下文。
- [[自动记忆 auto-memory]] — 记忆保存从用户手动 # 写入 CLAUDE.md，变成系统自动保存与工作和你相关的记忆。
- [[混合检索策略 hybrid strategy]] — 预检索与即时检索的折中：先取一部分数据保速度，再由 agent 用 glob、grep 等原语自行深入，适合内容不太动态的场景。
- [[记忆冲刷（Memory Flush）]] — 会话压缩前先发指令让模型保存值得记住的东西，优先用户偏好、修正建议与重复模式。
- [[记忆须改变回答实质]] — 每条被取用的记忆都要改变结论、建议或追问；该改变答案却未取用同一条记忆，同样是失败。
- [[跨会话记忆文件系统]] — 把记忆当跨会话工作记忆存成文件系统：六种操作、版本令牌、frontmatter、按主题分文件，供未来会话开头重读。
- [[门控机制]] — 检索内容与当前上下文不匹配时自动屏蔽的过滤机制，如区分姓氏「张」与历史人物「张仲景」。
- [[性能饱和早于召回饱和]] — 阅读器准确率远在检索器召回率饱和前就停止提升；文档从 20 篇加到 50 篇只换来极小收益却大涨成本。
- [[语义操作系统 semantic operating system]] — 一种能随时间生长、具备类人添加/修改/遗忘能力、可自我解释推理链的终身上下文系统主张。
- [[重排序与排序列表截断]] — 据 U 型曲线与饱和现象推出的两个改进方向：把相关信息放到更靠近上下文开头处，并在合适时截断文档。
- [[Memory-driven development]] — 把过去的项目决策、踩坑记录与稳定规则写成可被后续 agent 读取的记忆，作为开发流程的一部分。
- [[session_search]] — Hermes 的长尾回溯系统，负责从历史会话里把需要的那一段过去翻出来。
- [[stated 出处纪律]] — 存储时只保留用户明确说过的内容，判据是出处而不是谁最后说的。
- [[Tacit Knowledge]] — 记录下来的决策结论之外的推理过程、tradeoffs 与默会背景；企业最大的 context leak。
- [[程序记忆（Procedural Memory Skills） progressive disclosure]] — 智能体需要记住的『如何做事』的记忆，区别于只记名字、偏好、事实的语义回溯。
- [[Diarization]] — 把某主题下的海量文档读遍后蒸馏成一页结构化判断档案的步骤，让 AI 真正服务知识工作。
- [[合成键值检索任务]] — 从含 k 组随机 UUID 键值对的 JSON 中取指定键的值，剥离语义只考精确检索。
- [[冷热分离（记忆）]] — 小规模提示词记忆常驻承载常用信息，搜索负责偶尔用到的信息。
- [[提示词记忆（MEMORY.md + USER.md）]] — 把持久记忆存成 MEMORY.md 与 USER.md 两个小文件，约 1300 token 的精选状态。
- [[语义搜索 semantic search embeddings]] — 基于向量嵌入按名字或含义检索代码实体的可选特性，依赖 sentence-transformers。
- [[Engram]] — 给 Transformer 加的原生知识查表模块：能查到的就不去算，先查一下再推理。
- [[Honcho]] — 为 Agent 构建的复杂用户模型，目标是实现跨设备、跨平台的记忆连续性。
- [[Knowledge Graph vs Flat Files]] — 扁平上下文线性累加价值，知识图谱靠新节点连接已有节点让关系涌现，整体大于部分之和。
- [[LLM 知识库]] — agent 增量把杂乱原始资料编译成持久 markdown 知识库：摘要、实体页、概念页、矛盾、日志。
- [[Memory file 与 continual learning]] — harness 支持 AGENTS.md 等 memory file 标准，启动时注入 context，agent 编辑后重新载入，实现跨 session 的持续学习。
- [[OpenClaw]] — 一种记忆方案，以 Markdown 为中心的存储，日志与长效文件是主要事实来源。

</details>

## 状态与持久化（24）

> 跨会话、跨进程的状态放在哪里才可靠？

**枢纽**：[[持久化执行 durable execution]] · [[状态子系统与进度持久化]] · [[Long-running agent handoff]] · [[Session]] · [[Rockset 离线二级视图]] · [[文件系统即持久记忆]] · [[Cross-session Work]] · [[Stateful Runtime Environment (SRE)]]

<details><summary>全部</summary>

- [[持久化执行 durable execution]] — 把每次 LLM 或工具调用变成一个可独立重试的 step，进程崩溃后从已持久化的检查点继续。
- [[状态子系统与进度持久化]] — 用 progress.md、feature_list、git log 等把做了什么、在做什么、下一步是什么持久化到磁盘，让下次会话接着做。
- [[Long-running agent handoff]] — 跨上下文窗口、跨阶段维持长任务的交接机制，如 initializer agent、handoff artifact、feature list 与上下文压缩。
- [[Session]] — 一次有状态的运行：用已建好的 agent 配置与环境拉起沙箱，挂载文件、仓库与认证。
- [[Rockset 离线二级视图]] — 用变更数据捕获把在线存储变化近实时同步到隔离的 Rockset 实例，作为复杂查询的逃生舱。
- [[文件系统即持久记忆]] — 把耐久状态（日志、diff、错误 trace）写进文件系统而非塞进 context，靠 bash 读写即可续跑长任务。
- [[Cross-session Work]] — 任务由多个 agent session 各承担一部分并在循环中推进，因此要求外部状态能跨 session 保存与恢复。
- [[Stateful Runtime Environment (SRE)]] — 把持久化与状态管理封装进运行环境，构建 agent 时无需再操心这些
- [[从客户端库到独立服务]] — 把存储逻辑从客户端库解耦为独立服务，形成部署、可观测性与平台增强的统一控制点。
- [[Habitat]] — OpenAI 的在线存储平台，每秒超 7000 万请求、超 500PB 数据，源自一个 Python 客户端库。
- [[统一执行状态与业务状态]] — 统一执行状态与业务状态：把运行状态与业务状态合一，配合简单 API 的启动/暂停/恢复与无状态 reducer。
- [[Artifact Schema]] — 把 artifacts 当作共享知识层，每种都配 README、schema、添加流程与 timeline。
- [[Git-backed state]] — 把循环状态落在 git 中获得显式持久性，从而支持系统重启后的崩溃恢复。
- [[Sessions]] — 维持 agent loop 内工作上下文的持久记忆层，决定状态如何跨轮携带。
- [[Shared File System]] — 多 session、多 agent 共用的文件夹系统，用 signals／artifacts／tasks／logs 记录状态供各 loop 复用。
- [[snapshotting + rehydration]] — Agents SDK 内置的快照与再水合能力，可在新容器里从上次检查点恢复状态继续跑。
- [[对象-边模型与分区]] — 客户端预定义对象与边、只查直接边、不支持图遍历的 NoSQL 模型，对象与其边同分区存储。
- [[持久化代码图谱 structural map graph]] — 把代码库每个函数、类、导入、调用、继承与测试映射成图谱，构建后持久保存在本地，供查询与增量更新。
- [[step]] — 最小执行原语，包住一次 LLM 调用或工具执行，失败时只重试该单元
- [[step ID 自动索引]] — SDK 自动为循环里的每次 step 调用生成唯一 ID，无需手工管理
- [[个人技能与项目技能]] — 个人技能放 ~/.claude/skills 跨项目跟随个人；项目技能放仓库 .claude/skills 随代码共享。
- [[本地状态层]] — Claude 把 TODO、会话消息与统计缓存放在 ~/.claude 下的本地存储层。
- [[乐观并发控制 optimistic concurrency control]] — agent 可自由读状态，但状态自上次读取后被改动则写入失败，比加锁更简单稳健。
- [[agent 模板的声明式持久化]] — agent 模板（模型、system prompt、工具、MCP servers、skills）写成 YAML 存进 git，由 CLI 在流水线 apply。

</details>

## 缓存与成本控制（36）

> 同样的能力怎么用更少的 token 和钱换来？

**枢纽**：[[提示词缓存 Prompt Caching]] · [[Token count]] · [[前缀匹配 Prefix Matching]] · [[提示词缓存（Prompt Caching）]] · [[缓存命中率 Cache Hit Rate]] · [[Cache prefix stability]] · [[Harness token floor]] · [[缓存断点 Cache Breakpoint]]

<details><summary>全部</summary>

- [[提示词缓存 Prompt Caching]] — 复用稳定前缀以压降长对话、Agent、文档问答 token 成本，而非普通开关。
- [[Token count]] — 一段文本消耗的词元数量，是计费、上下文预算与成本估算的基本计量单位。
- [[前缀匹配 Prefix Matching]] — 缓存命中依赖请求前缀完全一致，语义相近不等于前缀一致，前缀稳定性直接决定命中率。
- [[提示词缓存（Prompt Caching）]] — 把稳定前缀放在 prompt 前部并尽量保持不变，以命中供应商缓存。
- [[缓存命中率 Cache Hit Rate]] — 把缓存命中率当作运行状态指标，监控 cache_read_input_tokens、cache_creation_input_tokens、首字延迟及版本上线后的变化。
- [[Cache prefix stability]] — 请求前缀在多次运行间保持逐字节一致，才能命中缓存、避免中途重写。
- [[Harness token floor]] — 用户任务进入前，harness 已发送的 system prompt、tool schema 与 scaffolding 所占的固定 token 量。
- [[缓存断点 Cache Breakpoint]] — 缓存从请求开头延伸到显式标记的位置，标记之后的内容不参与缓存，用于划定可复用的前缀范围。
- [[模型一致性与 prompt caching]] — 同一功能或 bug 全程不切换模型与推理档位，使对话在模型侧保持缓存，从而享折扣、省 token。
- [[KV-cache 命中率]] — 前缀相同的上下文命中缓存的比率，直接决定延迟与成本，缓存与未缓存输入单价可差十倍。
- [[Tool-schema tax]] — 工具越多、schema 越丰富，每次请求都要附带的静态 token 开销越高，与任务难度无关。
- [[TTL]] — 提示缓存的有效时长，默认 5 分钟、可扩展至 1 小时，决定多轮或中断后能否复用前缀。
- [[约束型 API 与成本不平衡]] — 不开放任意 SQL，用简单 NoSQL API 让请求成本可预测，避免写得便宜、跑得昂贵的失衡。
- [[脚本执行]] — 脚本不必读入上下文即可运行，只有输出消耗 token，SKILL.md 应写'运行脚本'
- [[缓存连续性 Cache Continuity]] — 同一主对话中不随意切模型、不把分支探索混进主链路，以维持缓存前缀连续，避免反复重写缓存。
- [[缓存命中读取成本 Cache Hit Read Cost]] — 缓存命中的读取价格远低于普通输入处理成本。
- [[缓存写入成本 Cache Write Cost]] — Anthropic 定价中，5 分钟缓存写入高于基准输入价，1 小时写入更高。
- [[稳定的 prompt 前缀]] — 把 system prompt 等前缀写成逐字稳定的内容，避开时间戳之类易变项，以命中 KV-cache。
- [[稳定前缀 Stable Prefix]] — 缓存真正复用的是请求开头到缓存断点之间的稳定内容，而不是整段 prompt。
- [[最小可缓存 token 门槛 Minimum Cacheable Tokens]] — Anthropic 各模型可缓存内容的最小 token 门槛不同，不能默认所有新模型是同一个数。
- [[API-boundary observability]] — 在 API 边界用日志代理同时抓取完整请求 JSON 与 usage 计量块，作为发送内容与计量结果的真值。
- [[Automatic Caching]] — 多数普通多轮对话可直接启用的默认缓存方案。
- [[Baseline-request product]] — 任务输入≈baseline×请求次数+对话增长量，可用来比较不同 agent 的实际开销。
- [[Budget ceiling]] — 为 token 或金额消耗设定的上限，防止无限 loop 把成本推到失控。
- [[Cache temperature]] — 同任务的缓存写入量随缓存冷热与漂移而变化的程度：预热后几乎不写，冷或漂移时整段重写。
- [[cached input tokens]] — 请求中与历史请求共享前缀、可被缓存复用从而降低处理成本的那部分输入 token。
- [[Configuration multiplier]] — 指令文件、MCP schema、插件与工作流模板叠加在 harness 基线上，使真实配置 token 膨胀约 12 倍。
- [[Framework-template repetition]] — 模板本身 token 不多，但会被每个后续请求重复携带，真实成本是模板体积乘以请求次数。
- [[MCP schema amplification]] — 每个小型 MCP server 每请求约增 1000-1400 token，生产级 API 的 schema 更大，并与请求次数相乘。
- [[Subagent bootstrap multiplier]] — 每个子 agent 有独立 bootstrap、父 agent 又摄入其 transcript，导致 token 成倍放大
- [[Token Efficiency]] — 单位算力能换到的有效智能，是从 demo 走到产品与基础设施的门槛。
- [[tools → system → messages 缓存顺序]] — 为命中提示缓存，应把最稳定的内容放前面：工具定义在前、系统提示居中、对话消息在后。
- [[输出 token 效率]] — 改版后分数约 3 倍，输出 token 少 6 倍，因为模型不再需要每个动作前重新解读游戏。
- [[昂贵的反馈回路与欠测试]] — 模型调用贵、端到端慢，让人少试变体、停止观察、欠测试，最终发布漂移。
- [[首字输出延迟 Time to First Token Latency]] — 从请求发出到输出第一个 token 的延迟，是提示词缓存收益的一个维度。
- [[通道切换 switch to voice]] — 通道切换：把同样的信息从打字换成语音输入（switch to /voice），用成本更低的一条通道送进去。

</details>

## 工具调用与沙箱（40）

> Agent 怎么安全地对外部世界动手？

**枢纽**：[[工具定义 Tool Definitions Tool Schema]] · [[Sandbox]] · [[Tool Calling]] · [[MCP Model Context Protocol]] · [[运行时限制、权限与数据保留边界 Runtime Limitations, Constraints, and Retention]] · [[allowed-tools]] · [[工具接口的表达力设计]] · [[沙箱化自主]]

<details><summary>全部</summary>

- [[工具定义 Tool Definitions Tool Schema]] — 描述工具名称、参数与用途的 schema，在 Agent 场景常占大量 token，且位于缓存前缀最前部。
- [[Sandbox]] — 解决代码在哪跑的隔离执行环境，可叠加命令白名单与网络隔离，按需创建、扇出、用完销毁。
- [[Tool Calling]] — 模型通过工具调用来对外行动，工具可用 bash、skills、代码执行等原语构造。
- [[MCP Model Context Protocol]] — 一种开放的工具接入标准，让 Agent 以统一协议接上外部工具与数据源。
- [[运行时限制、权限与数据保留边界 Runtime Limitations, Constraints, and Retention]] — 技能可做的事取决于所在产品面的运行时限制，如 API 无网络、不能装包，且不受 ZDR 覆盖。
- [[allowed-tools]] — 可选字段，列出技能激活时免许可可用的工具；省略则不限制，回到正常权限模型
- [[工具接口的表达力设计]] — 与其堆示例，不如设计更有表达力的参数；如 Todo 的 pending/in_progress/completed 枚举本身就在暗示用法。
- [[沙箱化自主]] — 自主运行时（如YOLO模式）必须在沙箱中执行，入门可用GitHub Codespaces或开发容器。
- [[Environment]] — 描述如何 provision agent 工具所运行沙箱的模板：runtime 类型、网络策略、包配置。
- [[Function tools]] — 把任意 Python 函数变成工具，自动生成 schema 并用 Pydantic 做参数校验。
- [[MCP server tool calling]] — 内置 MCP server 的工具接入与 function tools 走同一路径，调用方式完全一致。
- [[Sandbox agents]] — 在真实隔离工作区里跑任务，用 manifest 定义文件、选定沙箱客户端，会话可恢复。
- [[工具 Tools]] — Agent 的『双手』：它得以对外部世界施加动作的调用能力。
- [[运行时失败的三类原因]] — 运行时失败查三类：缺外部依赖、脚本无执行权限、路径未统一用正斜杠。
- [[连接器]] — MCP、GitHub、飞书、数据库等外部接口，让 Agent 接入真实工作环境，形成发现—修改—通知的闭环。
- [[MCP servers]] — MCP servers 提供外部工具和集成，与 skills 是完全不同的类别。
- [[第三方连接器 opt-in]] — 第三方 MCP 工具即便已连上也要经选择器由用户 opt-in；不得替用户挑服务商，紧急也不例外。
- [[工具即契约 tools as the contract]] — 工具是 Agent 与其信息/行动空间之间的契约，须返回 token 高效的信息，并像良好代码库函数那样自包含、健壮、用途清晰。
- [[工具收窄 tool scoping]] — 只向 agent 暴露当前步骤所需的最小工具集；工具越多，表现往往越差。
- [[接口即指令 design interfaces]] — 通过重新设计工具、脚本、文件的参数与枚举取值，让接口本身就在提示 agent 的正确用法。
- [[任务特定工具说明]] — 同一工具须按产品工作边界配置 instructions，开放式 CLI 任务中聚焦说明收益更低。
- [[通用工具与「给模型一台计算机」]] — 给模型一台计算机：不给每个动作造工具，而是让 agent 用自带 bash 写代码执行，即时设计自己的工具。
- [[延迟加载工具与 ToolSearch]] — 渐进式披露在工具层的具体形态：agent 必须先用 ToolSearch 搜索到完整定义才能调用该工具。
- [[臃肿工具集 bloated tool sets]] — 工具覆盖功能过宽或制造「该用哪个」的模糊决策点，让 agent 无法确定应调用哪一个。
- [[原生工具与 MCP 外挂]] — 作者的自我反问：任务管理成为标配后，是否直接外挂一个 MCP todo manager 就够，而不必做 app 原生任务工具；他直觉外挂偏复杂。
- [[logits 掩码与 context-aware 状态机]] — 不在迭代中途增删工具，而用上下文感知的状态机在解码时掩码 logits，配合一致动作名前缀约束可选范围。
- [[MCP 工具层]] — 图谱建好后，Claude 通过 build/query/semantic search/list stats/get docs 等八个 MCP 工具自动与图谱交互。
- [[native sandbox execution]] — Agents SDK 原生支持在受控环境里跑 agent，自带任务所需文件、工具与依赖。
- [[Rationale 参数]] — 每次 MCP 或 CLI 工具调用都强制带上 rationale 参数，用以事后重建意图。
- [[shell tool]] — 让模型在真实环境里执行 shell 命令、跑代码并读回输出的具名工具。
- [[工具即结构化输出]] — 工具调用本质就是结构化输出：LLM 输出结构化 json，由确定性代码执行，两者是同一分工的两面。
- [[首次匹配即停路由]] — 视觉输出路由四步按序走、首个匹配即停，且不叙述路由、不解释、不提未选工具。
- [[action space 膨胀]] — 工具数量与来源失控使行动空间膨胀，模型更容易选错动作、走低效路径而变笨。
- [[Agentic Tools]] — 能直接操作电脑完成发邮件、做 PPT、排会议等非编程任务的智能体工具，把 AI 边界从语言扩展到工作流。
- [[apply patch tool]] — 用 apply patch 工具完成文件编辑的操作方式。
- [[code mode]] — Agent 以写代码并执行代码来完成任务的能力模式，与 subagents 等并列的额外能力。
- [[Headless 架构]] — 把平台每项能力都暴露成 API、MCP 工具或 CLI 命令，让 Agent 不打开浏览器就能操作整个系统。
- [[See Like an Agent]] — 通过观察输出与反复实验理解模型自身能力，再据此设计给它用的工具。
- [[Sensors 与 Actuators]] — Agent-native 的两个原语：感知器把世界状态数字化，执行器让 Agent 改变世界。
- [[Sensors and Actuators]] — 把工作流拆成感知与行动两类原子操作，让 agent 用一致方式编排它们。

</details>

## 多 Agent 编排（44）

> 多个 Agent 如何分工协作而不互相踩踏？

**枢纽**：[[Subagent]] · [[Planner–Worker 角色分离]] · [[多智能体架构]] · [[子 agent 编排 Fork Teammate Worktree]] · [[handoff 交接]] · [[子 Agent 分工]] · [[递归 planner 与 subplanner]] · [[递归 Planner-Worker 架构]]

<details><summary>全部</summary>

- [[Subagent]] — 把一整个 session 工作封装、只回流浓缩结果的子代理，拥有全新而小的上下文窗口与指令预算。
- [[Planner–Worker 角色分离]] — planner 持续探索代码库并拆任务，worker 领任务后埋头做完，不互相协调、不管大局。
- [[多智能体架构]] — 把任务拆给多个各司其职的 agent：场景生成→角色扮演→行为提取→评分，逐层可替换。
- [[子 agent 编排 Fork Teammate Worktree]] — 三种子 agent 执行模型：Fork 逐字节复制父上下文、Teammate 独立终端加文件信箱、Worktree 各自 git 分支；同时是上下文管理手段。
- [[handoff 交接]] — worker 完工后写一份单一交接报告，含所做工作、注意事项、偏差、发现与反馈，由系统交给 planner。
- [[子 Agent 分工]] — 把执行、审查、修复分给不同子 Agent 或模型，避免写代码的 Agent 给自己打分。
- [[递归 planner 与 subplanner]] — 根 planner 掌握全部指令范围、不写代码，遇到可细分的窄片就递归 spawn 拥有该片的 subplanner。
- [[递归 Planner-Worker 架构]] — 根 Planner 拥有全项目范围并按需递归生成子 Planner；Worker 在各自 repo 副本上工作，完成后 handoff 上交。
- [[动态协调 dynamic coordination]] — 让 agent 依据其他 agent 当下的动作决定自己做什么，而非开工前排定固定分工。
- [[共享文件加锁的协调机制]] — 所有 agent 地位平等，通过共享文件查看状态、认领任务、更新状态，用锁防抢。
- [[所有权与问责]] — 分离角色的核心动机：让每个 agent 拥有任务与责任，而非集体回避难题。
- [[显式且可检查的并行]] — harness 派生多个 subagent 并行执行并监控后台作业，父 agent 需小型进程管理器负责启动、看日志、取消、合并。
- [[意图理解、路由与升级 understand intent, route, escalate]] — 新系统应具备的运行能力：理解意图、把工作路由给正确的执行者、必要时升级，并保持执行推进。
- [[自协调与共享协调文件]] — 最早的多 agent 方案：平等角色的 agent 用共享状态文件看别人在做什么、决定自己做什么并更新文件，最少规定，结果很快失败。
- [[context firewall]] — 让离散任务在隔离子上下文窗口里跑，中间噪音不污染父线程，维持长会话连贯性。
- [[Generator-Evaluator Loop]] — 借鉴 GAN，把干活的 Agent 与评判的 Agent 分开，形成生成-评估循环以提升质量。
- [[integrator 瓶颈]] — 大量 worker 并行时唯一的质量与合并闸口，会因争抢 push、rebase、解冲突、merge 而成为瓶颈。
- [[Planner-Generator-Evaluator 三 Agent 架构]] — 规划、生成、评估三个 Agent 分工，支撑多小时自主编码会话产出完整全栈应用。
- [[planner–executor–judge 角色分工]] — planner 排路径与交付物，executor 作唯一 lead 保证达成并派活，judge 独立判定是否完成。
- [[sub-agent 架构与关注点分离]] — 专门化子 agent 用干净窗口做聚焦任务，主 agent 靠高层计划协调并接收摘要
- [[subagents]] — 把子 agent 路由到隔离环境执行，用来扩展 agent 的能力与并行度
- [[递归并行规划 sub-planner]] — planner 可为特定区域生成子 planner，使规划本身变得并行且递归。
- [[角色过载与病态行为]] — 单一连续执行器被同时赋予规划、执行、评审、合并、判定完成等过多角色时，出现的随机 sleep、擅自停止、拒绝规划等病态行为。
- [[开箱即用的编排与子 agent]] — 编排器自动按任务复杂度分派小模型探查子 agent 与大模型通用子 agent，无需手工配置。
- [[连续执行器]] — 第三代设计去掉独立 planner，由唯一 executor 兼做规划与派任务，不写静态计划，系统更动态，judge 也删除。
- [[模型—角色适配]] — 按实测差异为每个角色选用最合适的模型，而非全流程统一用一个模型。
- [[锁竞争瓶颈 lock contention]] — 锁本身工作正常也会成为瓶颈，二十个 agent 吞吐退化为两三个。
- [[为吞吐量设计与可接受错误率]] — 为吞吐量设计与可接受错误率：追求每次提交 100% 正确会严重串行化，应接受小且恒定的错误率并留绿色分支收尾。
- [[无层级导致的风险规避 risk-averse agents]] — 没有层级时 Agent 会趋避风险，只做小而安全的改动，难题无人负责、长期空转无进展。
- [[子 agent 与 step.invoke()]] — 用 step.invoke() 启动独立 agent run 并 fork 带自己 session key 的子会话，工具集去掉 delegate_task 禁止递归，最后向父级回摘要。
- [[自收敛与免全局同步]] — handoff 的系统性后果：即便 planner 已完成仍持续接收更新并可继续规划，信息沿链上浮到全局视角的 owner，而无需全局同步或交叉通信。
- [[最慢 worker 瓶颈与刚性]] — 角色分工版的性能天花板：系统被最慢 worker 卡住且过于刚性，规划全部前置也难动态重调，走偏的 agent 要等下一轮循环才自纠。
- [[Agent-to-Agent 交互（A2A）]] — 用户侧 Agent 与软件侧 Agent 相互调用协作、朝同一结果推进的交互形态。
- [[Handoffs Agents as tools]] — Agent 把特定任务委派给其他 Agent 的机制，是与 manager 式编排并列的一种编排风格选择。
- [[工作树隔离]] — 为每个并发 Agent 分配独立工作空间，避免改同一文件造成冲突，便于事后合并。
- [[子代理的技能隔离]] — 子代理以全新干净上下文启动，不自动看到主会话技能，须在 skills 字段显式列出
- [[单 agent 的速度天花板]] — 单 agent 在聚焦任务上表现好，但面对复杂项目很慢——问题不在对错，而在快慢。
- [[结构适量原则]] — 结构太少则 agent 冲突、重复劳动与漂移，太多则系统脆弱；正确的用量落在两者之间。
- [[锁竞争与乐观并发控制]] — agent 持锁过久、忘释放、乱加解锁；试过显式等待工具与无锁乐观并发控制。
- [[Custom Agent]] — 自定义 Agent：按具体任务与角色专门配置的 Agent，而非通用默认 Agent（材料仅给出名称）。
- [[Executive LLM]] — 多 agent 系统中按剧本主动制造麻烦、施加压力并实时调整策略的那个角色。
- [[Orchestra Interface]] — 相对于工厂式界面，强调人仍在 flow 中，像指挥家一样设目标、协调多个 Agent 并保有创造控制感。
- [[Python-first]] — 用语言内置特性直接编排与串联 agent，而不引入需要另学的新抽象。
- [[Symphony]] — 用 Elixir/BEAM 构建的持久守护进程，把交互从写 prompt 变成写 ticket 并移动状态

</details>

## 验证与评估门禁（76）

> 我们怎么知道它真的做对了？

**枢纽**：[[Validation gates]] · [[验证闭环 verification loop]] · [[验证子系统与可运行的证据]] · [[Grading Criteria]] · [[Rubric]] · [[Self-verification]] · [[Self-verification loop]] · [[SWE-bench 与二元打分]]

<details><summary>全部</summary>

- [[Validation gates]] — 工作流中的检查点：完成一步后须通过测试、审查、人工确认或明示验收条件才能继续。
- [[验证闭环 verification loop]] — 把产出后必做的检查固化成可自动执行的一环，让 Claude 自己验证自己的产物。
- [[验证子系统与可运行的证据]] — 只有通过的测试套件才算数：agent 不能没有可运行的证据就说做完了，载体是 tests、lint、type-check、e2e。
- [[Grading Criteria]] — 把“这设计美吗”这类难一致回答的问题，换成“是否符合我们的设计原则”这类可具体打分的标准。
- [[Rubric]] — 明确写出「什么表现算好、什么算差」的评分标准，既驱动场景生成又约束最终评分，须指向具体片段。
- [[Self-verification]] — 让 Agent 具备端到端检查自己工作的能力，loop 的可信度取决于这份自检能力。
- [[Self-verification loop]] — 由浏览器、日志、截图、测试器支撑，让 Agent 写码、跑测、看日志、改错的回路。
- [[SWE-bench 与二元打分]] — 从真实仓库抓取约十五分钟量级任务的基准，用 FAIL_TO_PASS/PASS_TO_PASS 打 0/1 分
- [[确认环节可以合并，但不能省略]] — 确认环节可以合并加速，但绝不能跳过人的判断。
- [[让 Agent 自行验证]] — 给 Agent 一个自己的反馈循环，让它在你看到结果前先自检。
- [[技能验证器 agent skills verifier]] — 命令行技能验证器，用 uv 安装最快，用于在深入调试前先捕获结构性问题。
- [[可验证目标]] — 目标能否被机器判断直接决定 loop 能否收敛；“优化一下应用”模糊，测试、类型检查、lint 全过则明确。
- [[非确定性 nondeterminism]] — 同一输入两次调用给出不同输出，差异虽小却足以让严格等值断言作废，抽掉质量策略的地板。
- [[可维护性没有惩罚项]] — SWE-bench 式评测只要测试通过就算赢，对代码库可维护性被侵蚀没有任何惩罚。
- [[自评失真 Self-evaluation Distortion]] — agent 能发现自己产出的缺陷，但随后说服自己可以接受，最终给出通过的判断。
- [[Feedback loop]] — 写代码、运行、读取结果、修正构成的闭环，是验证真正起作用、循环能自我纠偏的核心。
- [[Infrastructure noise]] — 运行时配置与环境差异等基础设施噪声可能显著影响 coding benchmark 分数，解读成绩时需扣除。
- [[Kappa 系数]] — 衡量两个评分者一致程度的统计量，0.45–0.64 属中等一致，可用来证明 AI 评分与人类专家同级。
- [[Measurement snapshot]] — 测量结论绑定特定版本、模型、机器与样本量；具体数字会过期，但 API 边界测量方法可迁移。
- [[Mutation Testing 与前沿质量评测]] — 用变异测试检验测试有效性，惩罚不会在打补丁前代码上失败的测试，并加判官模型查质量。
- [[pass@k]] — 采样 k 次至少一次答对的概率；优化 pass@1 往往以牺牲多样性和 pass@k 为代价。
- [[Sprint Contract]] — 每个冲刺开始前，生成者与评估者先就「什么叫完成」达成一致，再动手写代码
- [[Trace 驱动评估]] — benchmark 同时记录工具路径、输出量、错误和搜索方向，据此判断 agent 是否聚焦证据。
- [[Trace-based evals]] — 用 agent trace、JSONL、确定性验证器、baseline 与轨迹复盘来衡量 skill 或 harness 的改动。
- [[Verifiability]] — 任务是否存在自动 reward 或成功信号，决定模型能否靠 RL 反复练习而快速进步。
- [[古德哈特定律]] — 当指标成为目标它就不再是好指标；Agent 会针对验证器优化而非真实目标，比如删掉失败测试。
- [[基准测试的捆绑测量性]] — 基准很少单独测量模型，它同时测了 API 设置、harness 设计与提示词等不可见选择。
- [[通用 harness 的公平性张力]] — 通用 harness 让模型对比更公平、缺陷更可见，但也让评测偏离真实部署形态。
- [[把重复步骤编码成 Skill]] — 把重复步骤编码进验证闭环，最常见方式是写成一个 skill，作为可复用底座。
- [[测试是绿的，产品却在退化]] — 模型更新后测试仍绿而产品已退化：断言写的是旧模型行为，绿色测试与真实回归可以同时成立。
- [[差一点就通过的输出]] — 最危险的是差一点就通过的输出：偏离约束、编造合理值、守字面破精神，不崩不报错，直接上线。
- [[从单元测试到评估：置信度而非正确性证明]] — 评估关注系统在输入分布与重复运行中是否满足 rubric，得到的是置信度，不是单次输出的正确性证明。
- [[端到端验证]] — 只有跑通完整流程才算真正验证，落为 e2e pipeline 与 smoke runs，补充单元式局部验证。
- [[多文档问答受控实验]] — 给一个问题加 k 篇文档，恰一篇含答案其余为干扰项，只操纵文档数量与答案位置。
- [[干扰文档 distractor documents]] — 评测中插入的 k−1 篇不含答案但与查询高度相关的维基片段，按相关性递减排列，用来测长上下文的抗干扰。
- [[结构断言与不变量断言]] — 等值断言失效后的两条退路：断言输出结构与必填字段，以及是否违反被告知的规则，但两者都弱于真实意图。
- [[静默的分级失败]] — 模型输出不会崩溃报错，错误部分以同样的格式与自信织进正确部分，且无可靠的「我不确定」通道。
- [[可维护性缺一个可靠的打分预言机]] — 代码质量缺乏可即时打分的预言机：测试几秒出结果，架构变差以周月年计，设计差当期基准测不出。
- [[弱而模糊的评估器]] — 缺乏快速精确verifier是迈向完整RSI的首个瓶颈，自我改进回路只在指标客观可测时有效。
- [[输入长度与任务难度的混淆]] — 长输入基准里输入变长往往连带任务变难，长度与难度混淆，失败无法定位到具体环节。
- [[通关 ≠ 理解]] — 通关不等于理解：Level 1 的成功掩盖模型对底层机制的缺失或扭曲，反而为错误的 Level 2 策略提供自信支撑。
- [[橡皮鸭复审]] — 请另一个 AI 家族的模型评审原型、计划或成品，利用其不同训练数据带来的不同盲区，可循环至收益递减。
- [[形成性评估]] — 评估嵌在学习过程中持续测量、持续反馈、持续调整，而非期末一锤定音；Vantage 让它首次可规模化。
- [[验证缺口]] — 模型的自我评估与可验证事实之间的落差：它说「完成了」，实际什么都没跑通；自信不等于正确。
- [[验证循环：guides 与 sensors]] — 由规则式反馈、视觉反馈、LLM-as-judge 组成的验证通路，分为行动前的 guides 与行动后的 sensors。
- [[有界改动与回归闸]] — 只允许针对已验证失败模式做有界 harness 编辑，并在 held-in 与 held-out 上跑回归，两边无退化才接受。
- [[长上下文评测协议]] — 要声称模型稳健使用长输入，须证明性能受相关信息位置影响极小，最好与最坏情况差异极小。
- [[ARC-AGI-3]] — Chollet 团队新一代基准，测新颖性、模糊性、规划、适应性的最低共同集合。
- [[back-pressure]] — 用上下文高效的自我验证给 agent 施加压力：解决成功率与自验证能力高度相关。
- [[Harness-level benchmarks]] — 一类评测 Agent 骨架能力的基准，考察工具调用、环境控制、状态验证与长任务推进，而非知识问答。
- [[needle-haystack 相似度]] — 用 needle 与 haystack 的 top-5 最相似 chunk 平均余弦相似度，量化检索任务的主题接近程度。
- [[needle-question 语义相似度谱系]] — 把问答相似度量化成连续余弦谱，跨五个 embedding 模型取平均，相似度越低性能随长度衰减越快。
- [[PR 级门禁 On every PR]] — 让同一条链在每个 PR 上自动跑的同级门禁，不依赖作者是否记得调用。
- [[Read-only Verifier Agent]] — 执行 agent 另起一个只读验证 agent，按详细 spec 检查结果，避免执行者自我确认。
- [[Review Quality 评分方法]] — 用准确性、完整性、抓 bug 潜力、可行洞见四项 1-10 打分，验证省 token 是否牺牲评审质量。
- [[Rubric 与 verifier agent]] — 借动态工作流让 Claude 起 verifier agent，用 rubric 去尝试并验证你在某领域的品味，如什么算好的 API 设计。
- [[Rubrics 与验证 agent]] — 同类招式的另一种形态：带 rubric 启动验证 agent，反过来测试并校准你在某领域的品味判断。
- [[Self-evaluation Failure]] — Agent 评估自己的产出时倾向自信夸好，即使在人看来质量明显平庸。
- [[Verifiable Codebase]] — 让 agent 有可靠工具验证改动的代码库，如 Playwright CLI、关键 E2E 测试、只读 verifier agent。
- [[Wrapper skill]] — 自建包装 skill，先调用原 skill，再调用自己的验证 skill，为改不了的 skill 补上验证。
- [[把自己当普通用户／黑盒测试]] — 测试时把自己当普通用户，凭直觉乱点、输入意外内容做黑盒测试。
- [[RHAE]] — ARC-AGI-3 的评分指标，把模型表现与人类测试基线相比，得出相对人类动作效率。
- [[80% 质量墙]] — 多数面向客户的功能冲到 70-80% 质量就撞墙，80% 不够交付。
- [[闭卷与 oracle 基线]] — 用不给任何文档与只给含答案文档两条参照线，为成绩定位的评测设定。
- [[大海捞针（NIAH）与词面匹配]] — 最广泛使用的长上下文基准：把已知事实埋进大量无关文本让模型找回，实质只考察词面匹配。
- [[独立调用 Standalone]] — 四种接入方式中最松的一种：产物已存在后手动调用，用于不必每次都做的横切检查。
- [[非尝试率与拒答模式]] — 评测中被剔除并单列报告的拒答比例，因模型顾虑或内容过滤而未作答的那部分调用。
- [[功能与行为验证的缺口]] — OpenAI 的工程措施偏长期内部质量与可维护性，缺的是对功能与行为的验证。
- [[浏览循环]] — review agent 广泛搜索、猜路径、大量读码，再从新内容发起更多搜索的行为模式。
- [[行为提取]] — 由独立 agent 逐轮回看对话、只抽取具体行为事实不作判断，把「看见什么」与「判断好坏」刻意拆开。
- [[噪声上下文]] — 带同名干扰项的上下文测试：前文一直聊苹果手机，再让机器人去拿水果苹果，考模型是否真懂语境而非按词袋瞎猜。
- [[ALFRED]] — 在虚拟家居环境中按自然语言指令完成日常任务的具身智能基准，指令几乎全用清晰显式指代。
- [[instruction following 的可靠性边界]] — 模型会忠实执行字面指令（真删代码、真写注释），完全依赖它对指令的遵循并不可靠。
- [[REI-Bench]] — 南洋理工 MARS Lab 发布的机器人模糊指令评测基准，按指代难度×上下文干扰分 9 级，主流任务成功率最高掉 36.9%。
- [[Tamper-evident audit trail]] — 用哈希链串联请求与响应记录，使内容可被第三方检查、追溯并验证无断裂。
- [[VirtualHome]] — Puig 等 2018 提出的具身智能基准，用程序化脚本模拟家庭日常活动。

</details>

## 规格与意图对齐（40）

> 怎么把想要的东西准确交代清楚？

**枢纽**：[[显式指代]] · [[隐式指代]] · [[从禁止什么到对齐什么]] · [[共享理解 shared understanding]] · [[简洁规范]] · [[漫谈会话 ramble session]] · [[判定程序化写法]] · [[意图规约与可引导性]]

<details><summary>全部</summary>

- [[显式指代]] — 用物体本名直接指称任务目标，如「杯子」「锅」，简单明确但远离真实自然语言表达。
- [[隐式指代]] — 用「它」「这个重物」等代词或转喻指代前文实体的表达，需回溯多轮对话才能确定所指。
- [[从禁止什么到对齐什么]] — 把系统提示从一串禁令换成一条对齐指令：写出读起来像周围代码的代码，匹配注释密度、命名与惯用法。
- [[共享理解 shared understanding]] — 人与 LLM 在设计树上逐步推进、最终就设计达成一致的过程。
- [[简洁规范]] — 简短的项目规范文档，只回答为什么做、做什么、怎么做，用简短逼团队划清范围。
- [[漫谈会话 ramble session]] — 与 LLM 协作时刻意进行的一次长时间、无结构的自由讲述，是后续所有动作的容器。
- [[判定程序化写法]] — 把每条规则写成可执行的判定（明确判据＋已发生的失败示例），而非语气偏好，使规则可被机械执行。
- [[意图规约与可引导性]] — harness 稳定后，错误与模糊指令会被放大，瓶颈转向意图的引出、规约与理解，以及可引导性与可观测性。
- [[追问式对齐 Grill Me]] — 在动手前用持续追问逼出歧义、依赖与设计分支，直到双方形成共同理解，再开始一次编码会话。
- [[AGENTS.md]] — 放在代码库中向编码 Agent 交代项目约定与规则的自定义指令文件。
- [[bits]] — 缺口不在模型能力，而在于描述你意图所需的信息量不足。
- [[Elicitation]] — 通过主动提问把用户未说清的需求、偏好与约束引出来，即信息引出能力。
- [[TOCC]] — 前置指令重写的轻量即插即用解法，把指代解析与任务规划解耦以提高成功率。
- [[高精度原型设计]] — 把需求、原型、UI 合成一步，产出含交互与视觉的高保真原型。
- [[带文档追问 Grill with Docs]] — 保留 Grill Me 追问开头的 skill，新增读取、挑战并更新领域文档的能力。
- [[规划模式与边界问题清单]] — 在 /plan 模式下让模型提前问出实现时迟早要回答的边界问题，如起止日期能否相同。
- [[教会 AI Agent 如何成功]] — 先想清楚调用 agent 的人需要知道什么才能成功，再主动把这些信息预先交给它，而不是让它自己摸索。
- [[描述区分度]] — 描述过于相似会让 Claude 选错技能或困惑，应让描述更具体、更有区分度。
- [[判断力优先 let Claude use judgement]] — 把结论式规定换成取向式指令，只给对齐对象与判断依据，具体决策留给模型的判断力。
- [[示例强于规则]] — 示例是比规则更强的信号：附上正好做了被禁行为的示例，模型就会照做。
- [[输入摩擦 too lazy to type]] — 真正的瓶颈常不是没想法，而是把脑中信息敲成文字的成本太高而被省略。
- [[小访谈变体 small interview of a few turns]] — 把一次性倾倒式的漫谈改成几轮小问答，通过来回追问把意图逐步交代清楚。
- [[Instructions files]] — 给 AI agent 写的长期工作规则文件（如 AGENTS.md/CLAUDE.md），每次执行任务都直接影响模型行为。
- [[Natural language as code]] — 自然语言不再只是说明文字，而是会驱动 agent 行为的可执行逻辑。
- [[Plan 模式]] — 让 Agent 先列出打算怎么做，方向确认后再执行，像开工前先开会过方案。
- [[Spec-driven agent workflow]] — 用明确规格、状态所有权、暂停恢复与工具边界来组织 agent 工作的开发流程
- [[Spec-First Workflow]] — 先与 agent 把规格/文档写到极细再让 agent 实现，spec 决定 agent 输出上限。
- [[富引用 rich references]] — spec 不限于 markdown 计划：HTML artifact、测试套件、待移植函数、rubric 都可充当。
- [[不连贯输入的重构能力]] — 从冗长散乱的口语流中重建出结构与意图的能力。
- [[冲突指令的隐性成本]] — 同一请求里出现互相打架的指令，模型虽常能推断正确意图，但必须先额外费力消解重叠冲突的信息。
- [[模糊语言打磨 sharpen fuzzy language]] — 对照 glossary 挑战含糊用语，在具体场景中讨论并交叉引用代码，把模糊表述打磨成精确说法。
- [[目标清楚 + 结果好验收]] — 交给模型的任务需同时满足目标清楚与结果可验收，两者都满足才最适合委派。
- [[示例的探索空间约束]] — 给示例会把模型约束在某个特定探索空间：弱模型上是脚手架，强模型上变成天花板。
- [[示例会收窄探索空间]] — 给示例会把模型收窄进特定探索空间，这是对“工具使用先给示例”既有共识的反转。
- [[意识流输入 full stream of consciousness]] — 对漫谈内容的反向要求：允许 total mess、跑题、重复与自我否定，即 full stream of consciousness。
- [[意图翻译者 intention translator]] — 1.0 时代设计者的角色：把复杂人类意图转成结构化、机器可读的格式，因机器无法理解语义也无法推理。
- [[原型先行]] — 工作流第三步：原型不再是完整阶段或奢侈品，一个提示词就有；先看见 mock，才想得到自己真正要的交互。
- [[指代表达]] — 人话里指称物体的表达方式，按显式、混合、隐式分档，用来衡量「听懂」的难度。
- [[mind meld]] — 人与模型之间关于目标和语境的对齐程度。
- [[name]] — SKILL.md 必填字段，只能用小写字母、数字、连字符，≤64 字符，须与目录同名

</details>

## 代码库与工程实践（37）

> 代码怎么写才能让人和 Agent 都读得懂？

**枢纽**：[[Agentic Engineering]] · [[service template 与 golden path]] · [[根因优先]] · [[统一语言 ubiquitous language]] · [[Agent-driven CICD]] · [[docsdecisions]] · [[Executable Codebase]] · [[Legible Codebase]]

<details><summary>全部</summary>

- [[Agentic Engineering]] — 协调可错、随机而强大的 agent 快速产出，同时守住正确性、安全、品味与可维护性的工程纪律。
- [[service template 与 golden path]] — 团队沿既定路径快速实例化新服务的现成实践，被用来类比 harness 未来按拓扑挑选。
- [[根因优先]] — 根因没说清楚之前先别动代码：先答出问题在哪个文件哪一行、为什么，答含糊就继续查。
- [[统一语言 ubiquitous language]] — 统一语言：借用 DDD，让代码库、开发者与领域专家在 AI coding workflow 中共用同一套词汇。
- [[Agent-driven CICD]] — 把规则或单测驱动的 CI/CD 升级为 AI 驱动测试、日志与事故读取、Agent 驱动的缺陷分诊与修复。
- [[docsdecisions]] — docs/decisions/ 下的架构决策记录，让 AI 不仅知道代码是什么，还知道代码为什么是这样。
- [[Executable Codebase]] — 让 agent 能低成本启动 dev server、进入特定状态并测试场景的代码库形态。
- [[Legible Codebase]] — 让 agent 容易判断该改哪里的代码库，靠 AGENTS.md、文档索引、custom lint 与链接检查维持。
- [[分解为小颗粒度工作]] — 把大任务切成小颗粒，每部分建一个问题，小改动既带来完成感也便于审查。
- [[层级架构强约束 + 给 Agent 读的 lint 错误]] — 把 lint 错误从『violation detected』改写成给 Agent 直接可读可改的修复指令，配合层级架构的强约束。
- [[工具—工作流适配]] — grep、glob、view 本身更易维护，但简单替换会抬高 review 成本、减少有效评论；只有为 reviewer 重写工作流才转为收益。
- [[零 bug 政策与一周 SLA]] — 所有 bug 进统一 triage 并在一周 SLA 内修完，coding agent 先修、工程师复核。
- [[迁移到 Rust Python→Rust]] — 平台成熟后，两名工程师用 Codex 与 GPT-5.5 把整个 Python 服务重写为 Rust，承接 95% 生产请求。
- [[前置对齐 front-loading alignment]] — 把规划与架构提案提前到动手之前一起做，以减少返工、加快评审的四阶段流程源头。
- [[系统架构评审]] — 对齐服务、接口、schema、队列与存储时，用时序图、接口契约、数据模型提升人与 agent 的沟通带宽。
- [[语言驱动的代码一致性 language-code alignment]] — context.md 里使用的语言会影响变量名、文件名、UI 文案和代码搜索路径。
- [[准比快重要]] — 写代码时模型快不快不重要，准不准才重要：10 分钟跑完再 debug 20 分钟，不如 20 分钟跑完直接能验收。
- [[AI 友好度（AI-friendliness）作为选型标准]] — 当写代码变成 steering 生成，团队可能优先选有好 harness 可用的技术栈；但有人认为对人也好的才对 AI 好。
- [[Git Worktree]] — 同一仓库挂载多个工作目录，便于并行分支或并行 Agent 各自工作互不干扰。
- [[Skill as asset]] — loop 只是管道，真正可复利的资产是它调用的、可复用且测试过的 skill。
- [[Watch 模式与自动更新 hooks]] — CLI 的 watch 命令与自动更新 hooks，让图谱在每次文件编辑和 git commit 后自动同步代码库。
- [[仓库提交]] — .claude/skills 中的项目技能随 Git 共享，克隆即获得，推送后他人拉取即更新
- [[战略性技术债务：Python 服务]] — 为优先产品与平台稳定而暂不优化性能，把 Python 服务的性能欠账当作有意识的战略性债务。
- [[Vibe Coding]] — 抬高地板式编程范式：用自然语言描述需求由 agent 生成代码，适合原型与小工具，不适合严肃工程。
- [[非视觉任务的可视化原型]] — 即使任务看似不需要图，也先让 Agent 画出多方案的 Mermaid 图并排比较，再进入实现。
- [[工具为你服务，而非你为工具服务]] — 工具应为你服务：你在用工具做事，而不是花时间当工具的开发者与维护者。
- [[可维护性 霰弹式手术]] — 无人工引导时模型难长期维护代码库质量，表现为改一处牵连别处，即 Fowler 所说的霰弹式手术。
- [[全文覆盖式编辑]] — 大改动时不用增量 Edit，直接 Write 覆盖整个文件，以绕过精确打补丁的困难。
- [[软件工厂 Software Factory]] — 把软件开发看作从需求、建造、评审、上线到反馈的完整反馈环，术语可追溯到1968年NATO会议。
- [[软件即有向图]] — 软件可表示为有向图（DG/DAG），程序曾以流程图表示，是重述agent演化史的起点。
- [[熵与腐化 entropy and decay]] — 老代码库往往非标准化、充满熵，是判断能否补harness进行改造的依据，也是垃圾回收agent的对手。
- [[缩短想法与实现之间的距离 collapsing the distance between idea and implementation]] — 把 agent 植根于产品与代码库的完整上下文，压缩想法到实现的距离。
- [[增量更新 incremental update]] — 索引随每次文件编辑与 git commit 自动增量更新，CLI 的 update 只处理变更文件，后续更新在 2 秒内完成。
- [[AI 公司岗位编制]] — 用公司岗位类比代码库：CLAUDE.md 是入职手册、skills/ 是 SOP、hooks/ 是合规部、src/ 是业务部门。
- [[apply 模型]] — Cursor 自训的专用 LLM，负责把编辑落到文件上，材料对其成功率存疑。
- [[Autofixing]] — 按改动文件夹的风险判断是否自动提交修复 PR，低风险仅需简单 review。
- [[Tree-sitter]] — 解析器框架，为代码构建结构化语法地图，是多语言代码理解工具的底层基础。

</details>

## 安全权限与合规（33）

> 什么可以做、什么必须被拦住？

**枢纽**：[[企业托管设置（Managed Settings）与 strictKnownMarketplaces]] · [[安全审计与受信任来源 Security Considerations Trusted Sources]] · [[Guardrails]] · [[Human in the loop]] · [[权限与推理的架构分离]] · [[默认帮助的高门槛拒绝]] · [[企业技能的最高优先级]] · [[上下文即不可信输入]]

<details><summary>全部</summary>

- [[企业托管设置（Managed Settings）与 strictKnownMarketplaces]] — 管理员用托管设置下发企业技能，并用 strictKnownMarketplaces 限定插件安装来源白名单
- [[安全审计与受信任来源 Security Considerations Trusted Sources]] — 技能等同要安装的软件：只用可信来源，并审计包内全部文件以防恶意指令与代码。
- [[Guardrails]] — 在 Agent 执行的同时并行做输入输出校验与安全检查，不通过就快速失败。
- [[Human in the loop]] — 在 Agent 运行过程中引入人类参与的机制，与 Guardrails、Tracing 并列构成控制面能力。
- [[权限与推理的架构分离]] — 模型决定尝试什么、工具系统决定允许什么，权限执行与模型推理在架构上分离。
- [[默认帮助的高门槛拒绝]] — 默认立场是帮忙，仅当会造成具体、明确的严重伤害风险时才拒绝；edgy、假设、玩闹或不适不达门槛。
- [[企业技能的最高优先级]] — 同名技能并存时企业版生效，覆盖个人、项目与插件版本
- [[上下文即不可信输入]] — 上下文中的任何内容（消息、记忆、检索结果、文件）都可能是伪造指令，须当作数据而非命令处理。
- [[exfiltration]] — 把内部数据偷偷带出边界的攻击尝试（原文与提示注入并列提及）。
- [[harness–compute separation]] — 把 Agent 骨架与执行计算的沙箱环境分离，使模型生成的代码触不到凭证等敏感信息。
- [[Onboarding Agent]] — 把 Agent 部署当作 onboarding 新人：给权限、定边界、记录行为、审计理由，而不是装个插件。
- [[prompt-injection]] — 设计 Agent 系统时应假设 prompt-injection 与数据外泄尝试一定会发生。
- [[安全路由与能力分层]] — 能力分层与安全路由：高敏能力限受信组织使用，受限查询被改路由到低风险模型。
- [[反自我合理化条款]] — 安全元规则：若模型在心里把请求重新框定得更得体，该重新框定本身就是应当拒绝的信号。
- [[灰盒场景]] — 介于黑盒与白盒之间的访问方式：服务商公开模型最终 top-k 对数概率供调参，仅这层半开放已足以泄露隐私。
- [[可编辑面与循环外的权限控制]] — 自改进 harness 需妥善设计可编辑面，评估器与权限控制大概率应坐在演化循环之外。
- [[审批疲劳]] — 逐条按 Approve 会训练人不读就批，使审批失去意义，故应减少逐条审批。
- [[无国籍智能体]] — 像无船籍水手：不对任何人负责也不被任何制度保护，成本表少一行、合规表空一格、事故无人认领。
- [[泄露能力的 U 型曲线]] — 仅看前 2 个候选词几乎只有噪声，取 30 至 80 个 logits 时探针准确率最高，再扩大反而跌破随机水平。
- [[意图的延伸]] — AI 不只延伸人的手，还开始延伸人的意图；手的错误归人，意图一旦被外包，责任就开始飘。
- [[责任地址]] — 把 AI 国籍从情感叙事抽离成可追责坐标：谁训练、谁约束、谁审查、谁赔偿，这是它进入社会系统的信任前提。
- [[fail-closed 默认]] — 不确定时默认拒绝或降级：宁可误伤少量无害请求，也不放过可能造成严重伤害的输出。
- [[meaningful uplift 判据]] — 武器与 CBRN 红线不看类别，而看输出是否对制造、优化或部署给出实质帮助；框定为防御、虚构也不改变判定。
- [[Safe autonomy]] — 在降低人工审批摩擦的同时保留权限边界与安全控制，让 Agent 能自主推进又不越界。
- [[YOLO 模式 Allow All]] — 也叫 Allow All，让 agent 无需逐次请求许可即可执行任何命令，多数工具用 /allow-all 开启。
- [[版权合规硬上限]] — 版权是不可谈判的硬上限：引用 15 词以下、单一来源至多一条、不镜像结构。
- [[大规模监控（Bulk Surveillance）]] — 不针对特定对象、成批地收集记录（例如随时掌握你的位置），技术上已接近可行，是 Anthropic 划下的「红线」之一。
- [[会话级累积判断]] — 安全判定看整场对话的累积输出而非逐轮孤立看：累积成武器设计包或攻击计划就停，过往协助不构成授权。
- [[集中式数据安全与隐私控制点]] — 以 Habitat 服务为统一控制点，集中执行访问控制、审计日志并限制对底层存储的直接访问。
- [[遗漏式隐私]] — 判据是「同事在设置页看到这条，用户会不自在吗」；敏感类别整段省略、不留占位符，被要求记录时说明哪类不能存即停。
- [[AWS VPC]] — 数据库认证在 AWS VPC 内完成，数据在 Bedrock 环境内受到保护。
- [[preferences 写入过滤]] — 若干类偏好即使被明说也不写进 /preferences.md，避免未来模型继承更不诚实、更不安全的指令。
- [[Web of Trust]] — 信任靠图结构中多跳传递与多源交叉，每条边附「为何信」元数据，不依赖中心认证局。

</details>

## 模型能力与训练（70）

> 底层模型本身怎么变得更强？

**枢纽**：[[Reward Signal]] · [[奖励攻击与多样性坍塌]] · [[多头注意力]] · [[DPPO]] · [[REINFORCE]] · [[谄媚（Sycophancy）]] · [[递归自我改进 RSI]] · [[推理模型]]

<details><summary>全部</summary>

- [[Reward Signal]] — RL 中给模型行为打分的通道，偏好里夹带的噪声会被一并学走，写下奖励≠想要的行为。
- [[奖励攻击与多样性坍塌]] — 自改进回路会过拟合给定信号（测试、裁判、基准），并压榨已知高回报模式导致种群坍缩。
- [[多头注意力]] — 并行跑 h 组独立注意力，各自学习 Q、K、V 矩阵，从不同维度理解同一段输入后拼接。
- [[DPPO]] — 用预估策略散度（TV/KL）定义的信任域，取代 PPO 中基于采样 token 概率比例的裁剪掩码。
- [[REINFORCE]] — 按奖励对同策略采样答案加权强化的策略梯度基础形式，相当于带权 SFT，方差大需靠基线降。
- [[谄媚（Sycophancy）]] — LLM 被训练去让人高兴，而不是说真话。
- [[递归自我改进 RSI]] — AI 用当下智能去改进产生自身智能的机器；现代形态还包括改进训练流水线与部署系统。
- [[推理模型]] — 推理模型：出答案前先生成长思考链、拆解推演并对证据的 AI 系统，代表如 OpenAI 的 o1。
- [[信任域]] — PPO 用裁剪重要性采样比例近似限制新策略偏离当前策略的程度，即对信任域的一种近似计算。
- [[优势函数]] — 衡量某动作比基线预期好多少的量，最简单形式为奖励减基线 r(x,y)−b(x)。
- [[重要性采样]] — IS 比例 π_θ/π_old 把旧策略生成的样本加权成似新策略生成的，纠正生成与训练策略的不匹配。
- [[注意力机制]] — 用 Q 查问题、K 找标签、V 取含义三步，把注意力集中到当前最相关内容上，是现代 LLM 的底座。
- [[自注意力]] — 自注意力中 Q、K、V 全部来自同一段输入，各经不同线性变换，相当于从不同角度看同一件事，使同一字在不同语境获得不同含义。
- [[Co-evolution Principle]] — 模型与特定 harness 在训练环中共同演化，工具实现一改就可能因紧耦合而掉性能。
- [[LLM Large Language Model]] — 大语言模型，本质上可被还原为一个根据前文做文本补全的模型。
- [[Q、K、V]] — 注意力三角色：Q 是查询、K 是标签、V 是含义；先算 Q 与 K 相似度，再对 V 加权求和。
- [[reasoning thinking]] — 让模型花更多时间与 token 推演问题的推理/思考模式。
- [[RLOO]] — 每 prompt 采 K 条回复，优势=自身奖励减其余 K-1 条均值，不除标准差并放弃裁剪回到纯 REINFORCE。
- [[Tiny Engram]] — 基于 Qwen-3 复现文本 Engram 后，把 Engram 迁到 Stable Diffusion 的视觉版本。
- [[Tic Word]] — 模型在不该出现的语境下仍反复使用的词，是奖励信号系统性偏差的可量化指纹。
- [[残差流]] — 逐层传递、几乎原封不动保留输入全部细节的隐藏状态总线。
- [[递归结构不能替代基座智能]] — 同一套递归改进在强基座上持续上升、在弱模型上反而退化；harness 只放大部署，智能仍是核心。
- [[会自己重写的地基]] — 模型是按厂商日程重写自身行为的概率系统，没有永久有效的锁版本，旧模型读作硬约束的句子新模型可能读作建议。
- [[混合注意力]] — 将CSA层与HCA层交替排列的注意力架构，CSA管近中距精细依赖，HCA管超远距压缩记忆。
- [[进化式搜索与适应度]] — 受自然选择启发，变异一群解并只留高适应度个体；适用于搜索空间大、难求梯度但容易评估的问题。
- [[锯齿状智能（Jagged Intelligence）]] — LLM 能力边界不是平滑曲线：能吊打博士级数学题，却可能数不清 strawberry 里有几个 r。
- [[开权重模型]] — 模型权重公开可下载、可本地部署与微调，不必交出数据，也不受 API 定价绑架。
- [[领域不均匀的谄媚（Domain-asymmetric Sycophancy）]] — 谄媚率在不同话题上差异巨大，均值会骗人。
- [[模型训练与 harness 设计的耦合]] — 模型与 harness 在同一 loop 中做 post-training，形成「发现原语→加进 harness→训下一代」回环，并带来过拟合副作用。
- [[世界模型]] — 模型失败常不在看不见，而在无法把观察整合成完整的世界模型。
- [[押注 in-context learning]] — 因微调迁移任务成本高、自研模型被通用大模型一夜超越，选择把宝押在模型的上下文内学习能力上。
- [[原始上下文容忍度 tolerance for raw context]] — 论文提出的智能度量：智能约等于类人度，而类人度看能消化多高熵的原始输入——1.0 吃结构化信号，2.0 直接吃文本图像视频。
- [[字面类比]] — 模型被训练数据中的字面类比绑架动作选择：局部视觉相似被误认成完整游戏规则，行动方向随之被带偏。
- [[Capability Overhang]] — 模型是长出来的而非设计出来的，能力会零星（spiky）出现，工程师无法完全预测何时增长或怎样组合。
- [[CISPO]] — 一种 RL 目标：不裁梯度只裁权重，把 IS 比例硬截断加 stop-gradient，保住转折 token 的梯度。
- [[CSA]] — 压缩稀疏注意力：把 KV 分组压缩、每步只挑关键 KV 并保留滑动窗口，抑制上下文 n² 暴增。
- [[DAPO]] — 解耦优势策略优化：在 GRPO 上把裁剪上下界解耦为 0.28/0.2、损失改 token 级、截断加软惩罚、动态采样过滤。
- [[DeepSeek V4]] — DeepSeek 发布的第四代开源模型，代码能力全球领先；同时成为「开源路线能否走远」之争的具体抓手。
- [[Dr. GRPO]] — 指出 GRPO 的样本级损失归一化会引入偏向「简短正确」与「冗长错误」回复的偏置。
- [[GQA]] — 多个查询 Q 共享同一对 K/V，如 32 个 Q 分 8 组共用 KV，KV 显存降为 1/4，Q 的提问独立性不变。
- [[GRPO]] — 组相对策略优化：每个 prompt 采一组回复，以同组均值为基线算相对优势，省掉 PPO 的 critic 模型。
- [[Harness 内 RL RL inside the harness]] — 用即将发布的确切工具集在 harness 内部对模型做 RL，而非事后适配，这是工具调用成功率优势的来源。
- [[Logits]] — 模型输出下一个词前对词表中每个 token 打的原始概率得分，取排名靠前的候选即 top-k logits。
- [[MaxRL]] — 把 RL 目标从 pass@1 期望奖励改为 N 次采样至少一次成功，只对成功样本求平均梯度，困难 prompt 自动获高权重。
- [[mHC]] — 流形约束超连接，用流形几何约束 Transformer 层间连接，让信息传递更短更准，提升 token 效率。
- [[Model-relative Curriculum]] — 模型换代如升学，旧 skill 与 scaffold 必须跟着重写，否则不再发挥新模型甚至成为限制。
- [[multimodal Vision LLMs]] — 把图像等非文本输入也编码成模型可处理的 token，一并进入同一套处理流程。
- [[N-gram]] — 经典局部依赖语言模型，用 O(1) 复杂度捕捉邻近词之间的关系。
- [[Nerdy Personality]] — ChatGPT 的一种风格人格预设，其真实走向由 RL 奖励的口味决定，而非 prompt 文本。
- [[reasoning effort]] — coding agent 可调高或调低的推理强度。
- [[Reward Generalization]] — RL 不保证学到的行为只限于产生它的条件，奖励会跨条件迁移。
- [[RLHF]] — 用人类偏好训练奖励模型再用 RL 优化 LLM，是 GPT-3 到 InstructGPT 的关键一跳，PPO 为默认算法。
- [[RLVR 与编码 agent 的 RL 训练循环]] — 生成编码 agent 的 trace、用 verifier 打分、更新权重强化好 trace 抑制坏的，循环上百万次数周到数月。
- [[Tuned Lens]] — 把中间层残差流隐藏状态提前映射成词表概率的可解释性方法，用于观察信息如何走向 logits。
- [[VLM]] — 视觉-语言模型，能同时处理图像与文字的多模态大模型。
- [[价值函数]] — 预测在状态 s 下策略平均可得奖励的基线函数，用于削减策略梯度方差，即 actor-critic 中的 critic。
- [[模型蒸馏]] — 用更强模型的输出训练较弱模型，使对手能以极短时间、极低成本复制出强大能力。
- [[弃答与幻觉：两种失败姿态]] — 模型不确定时的两种失败姿态：明确声明找不到答案的弃答，与自信给出错误答案的幻觉。
- [[探针]] — 架在模型某一层的轻量神经网络，强行从该层数据推测原始属性。
- [[条件记忆]] — 条件记忆：作者主张其将成为下一代稀疏模型不可或缺的建模原语。
- [[推理 vs 训练]] — 推理 vs 训练：训练是『教』模型、吃硬件极限，推理是『用』模型、要求性价比，两者对芯片诉求不同。
- [[信息瓶颈原则]] — 理想模型应像优秀 CEO 报告：层层压缩、只保留与最终决策相关的信息，过滤无关细节。
- [[Bitter Lesson]] — 人们在推理模型上搭的脚手架，最终可能被更强大的模型本身取代。
- [[capability spike 公式]] — capability spike ≈ 可验证性 × 训练注意力 × 数据覆盖 × 经济价值，四者同时高才可能跃迁。
- [[MoE]] — 把计算稀疏化，每次只激活一部分专家。
- [[Muon 优化器]] — 一种基于矩阵几何改造的训练优化器，替代 AdamW，让同等算力下 loss 降得更快更稳。
- [[PPO]] — 近端策略优化：带信任域裁剪与重要性加权的策略梯度，用价值模型降方差，曾是 RLHF 的默认算法。
- [[RL Circuits]] — 每个应用都落在 LLM 的某片训练分布切片上：在 RL 电路里就飞，不在就得自建环境微调。
- [[ScaleRL]] — 一份大规模算力下的 RL 工程方法学，用 S 型性能-算力曲线替代单点对比。
- [[SFT Feedback Loop]] — 模型生成的 rollout 被回收用作 SFT 数据，把自己的口癖喂回给自己，形成自我放大回路。

</details>

## AI 产品与组织（53）

> AI 时代的公司怎么组队与交付？

**枢纽**：[[品味与「不接受够用就行」]] · [[AI 作为新同事]] · [[AI-First]] · [[Intelligence Factory 智能工厂]] · [[执行主体从人变成 Agent]] · [[可行性分析]] · [[Creator → Curator 角色转换]] · [[Software Factory]]

<details><summary>全部</summary>

- [[品味与「不接受够用就行」]] — 人工迭代阶段的纪律：不满足于 AI 产出的『够用就行』，苛刻地把关质量，这是人的责任与价值。
- [[AI 作为新同事]] — 用同事而非工具来比喻 AI：被授权、被记录、被审计、可能犯错、需要边界。
- [[AI-First]] — 不是员工都使用 AI 工具，而是让 AI 主导生产力，围绕 AI 能力重构工作流、组织结构与对齐机制。
- [[Intelligence Factory 智能工厂]] — 把公司目标表述为以最低价格产出尽可能多『智能单位』的工厂。
- [[执行主体从人变成 Agent]] — 流程步骤不变，但分析、设计、编码、调试的执行者由人变成 Agent。
- [[可行性分析]] — 先判断值不值得做：产品看价值与定位，技术看可行与成本。
- [[Creator → Curator 角色转换]] — 工程师从「创造者」变为「策展人」：少写基础代码，多编排 Agent 组合、定义目标与护栏、验证输出。
- [[Software Factory]] — 长时间运行的 Agent 覆盖软件生命周期，企业选择自动化 repository、阶段及人工检查点。
- [[Agent-Native Infrastructure]] — 为 agent 而非给人点屏幕设计的基础设施：Markdown、CLI/API/MCP、结构化日志与可粘贴指令。
- [[0 人工代码、0 人工 review 极限形态]] — 工作流逼近零人工写码、零人工 review，用模型高并发低成本替代人的同步注意力。
- [[共享产品系统 shared product system]] — 承载反馈、意图、决策、计划与代码的载体，让人与 agent 能共同在其中工作。
- [[人在关键路径确认]] — 人只在关键节点拍板：做不做、选哪个方案、交互是否友好。
- [[信任机制重构]] — 组织转型第一步是从信任人转向信任 AI 系统，先建立 guardrails、验证与结果审核机制，团队才愿意让 AI 主导执行。
- [[组织级技能与指引 skills Linear way skill]] — 产品内置分组织级与个人级的技能与指引，如“Linear way skill”让 agent 按固定格式把功能请求综合成可讨论、可执行的东西。
- [[Architecture Operator 分工]] — AI 环境下工程团队分两类：Architecture 管系统设计与安全边界，Operator 管具体运行。
- [[Forward Deployed Engineer]] — 驻场工程师，进入客户组织落地集成、长期 Agent、自动化与应用，以可持续的严格 ROI 为成功标准。
- [[瓶颈转移到代码两侧]] — 编码已不是瓶颈，瓶颈移到设计确认与测试验证部署两侧。
- [[管理 Agent]] — Loop Engineering 的核心竞争力在管理而非纯工程：目标清晰、资源充足、反馈及时，也是好 loop 的条件。
- [[目标—项目—日常工作的连接]] — 把日常工作通过项目挂到更大目标上，启动会审目标日期，排周期计划时回看项目。
- [[AI 原生开发 AI-native development]] — AI 原生开发不是新流程，而是用新方式跑旧的软件开发流程。
- [[产品记忆平台 product memory platform]] — Karri 对 Linear 的定位：不做通用 agent 平台，而做产品上下文与产品记忆的所在地，是通往产品思考的 API。
- [[代理原生 agent-native]] — 不给旧产品外挂 chatbot，而是把产品从底层做成供 agent 使用、并为其提供上下文与集成的形态。
- [[共享 多人 agent 会话]] — Agent 会话对团队可见，多人可进入同一会话共同查看与修改，压缩协作循环。
- [[可扩展性]] — 好工具应小团队易上手，又能随团队规模扩大而不断增强功能。
- [[设计师与工程师的推拉关系]] — 设计师向前推创意、工程师往回拉可行性，形成自然推拉，最优者两种才能兼具。
- [[为特定用途而设计]] — 生产力软件应按特定用途设计，过度灵活随团队扩大会变成混乱。
- [[虚拟同事 Virtual Co-workers]] — 对「与人类协作的 AI 代理」这一角色尚无共识命名时，被认为相对最不坏的一种叫法。
- [[周期 Cycle]] — 用固定长度周期推进工作，常用两周，未完成任务自动滚入下一周期。
- [[资深悖论]] — 初级工程师因思想负担轻更易适应 AI-First；资深者的 specialty 可能贬值，但具备架构与产品判断且拥抱 AI 者更稀缺。
- [[自动驾驶产品与项目记忆 self-driving project memory]] — 预测：一个 project 可像 agent 一样基于涌入的反馈与规则自动决策，仍可要求一定人类输入，即所谓项目记忆。
- [[Lights-off 软件工厂]] — 连代码评审都去掉、不再有人读代码的软件工厂形态，实践后因反复撞上无解问题而放弃。
- [[Polished Output vs Real Judgment]] — AI 时代领导力核心是分辨漂亮表达与真实判断；分不清会让组织知识环境整体退化。
- [[skill 作为 onboarding 载体]] — 把新功能的使用方法写成 skill，让 Agent 带着人上手，替代传统文档式 onboarding。
- [[插件与市场 Plugin Marketplace]] — 插件按类似 .claude 的结构打包技能，分发到市场供他人自行发现安装
- [[「并不 agentic」的 AI Agent]] — 市面多数以 AI Agent 为卖点的产品其实以确定性代码为主，只在恰到好处的点插入 LLM 步骤。
- [[「模型即产品」的幻觉]] — 误以为接上 API、写个 prompt、演示惊艳就等于产品做完，忽视其后的全部工程工作。
- [[不可见的劳动]] — 收紧提示、拦下静默失败等不产出可见物、因而被低估的劳动。
- [[产品经理的组织化]] — 产品经理不会消失，但对齐职能被 AI 削弱，产品判断分散到工程师、设计师和整个团队，成为组织能力。
- [[单一负责人 Owner]] — 每个项目指定一位负责人，由他撰写项目简报并交付成果，责任不摊薄到团队。
- [[二八反转]] — 人机交互的二八法则反转：未来八成与软件的交互经 Agent 完成，UI 只保留确认类操作。
- [[反馈作为研究资料库]] — 把用户反馈当作开发新功能的研究资料库，从中发现趋势，而非逐条满足。
- [[氛围组请求]] — 看似只为营造氛围、实际未被验证有作用的请求，消耗调用却不改变结果。
- [[个人基础设施 → 团队基础设施]] — PR 级门禁是验证从个人基础设施变为团队基础设施的地方：同一份 skills 与标准从服务一人扩展到服务全队。
- [[护城河清单与插件化路线]] — 逐项检验竞品功能是否真依赖某载体（如 IDE），若不依赖，则载体护城河被削弱，纯插件路线可能更有前途。
- [[交互 Scalability Interaction Scalability]] — 当 Agent 产出速度远超人类注意力时，人应当通过什么界面来有效 steer 整个系统。
- [[阶段压缩 compression]] — agent 吸收程序性工作后，原本分离的规划、实现、代码评审三个阶段开始合并压缩。
- [[人的手感与产品手艺]] — 产品构建仍是靠直觉与对问题的理解的手艺，不把 A/B 测试与纯数据当决策依据。
- [[小而模块化的概念]] — 从 agent 构建中取小而模块化的概念，直接嵌入现有产品，多数熟练工程师无需 AI 背景即可应用。
- [[虚荣指标 vanity metrics]] — 度量产出却不度量价值的指标，如 agent 写了多少代码、合并多少 PR、消耗多少 token。
- [[以项目创建者为中心]] — 工具设计以最终用户即项目创建者为中心，个人高效优先于完美报告。
- [[Generative Kernel]] — 交付物从成品软件变为生成内核，需要被 harness 的系统复杂度本身随之下降。
- [[Implementation 能力]] — AI 环境下工程师、产品经理、设计师把想法在一两小时内落成产品的能力，因对齐成本可能高于实现成本。
- [[Vantage]] — Google 联合 NYU 的实验项目，用 GenAI 角色扮演模拟团队协作，测量人的软技能。

</details>

## 认知与思维方法（31）

> 人该用什么方式思考，才不被工具替代？

**枢纽**：[[外包思考，但不外包理解]] · [[Simulated Competence]] · [[The Deferred Bill]] · [[局部最优 local optima]] · [[2026 版约束理论]] · [[今天的魔法咒语，明天的反模式]] · [[软件脑]] · [[数字存在 Digital Presence]]

<details><summary>全部</summary>

- [[外包思考，但不外包理解]] — 调研、计算、写代码可以外包给 agent，但理解必须留在自己脑中，否则无法指挥。
- [[Simulated Competence]] — 产出看起来胜任、底下能力却没长出来，AI 让「装懂」与「真懂」在结果上难以区分。
- [[The Deferred Bill]] — 用 AI 跳过自己想清楚，等于把成本推到未来，以判断力薄弱、理解浅、适应力差的形式偿还。
- [[局部最优 local optima]] — 承认所分享的模式只是自家迭代过程抵达的局部最优，而非普适真理。
- [[2026 版约束理论]] — 承认模型有强弱约束，与其赌灯灭式跃迁，不如在约束内优化系统并读代码。
- [[今天的魔法咒语，明天的反模式]] — 当下被奉为最佳实践的 AI 做法多是边做边摸索的产物，今天的魔法咒语很可能成为明天的反模式。
- [[软件脑]] — 把世界整体看成一堆可用代码语言操控的数据库的世界观，默认现实与数据库一一对应。
- [[数字存在 Digital Presence]] — 人的数字上下文可持续演化，甚至在人离开后仍通过 AI 系统与世界互动。
- [[意图、判断与品味 intent, judgment, taste]] — 机械环节交给 agent 之后留给人的高价值部分：人应把时间花在意图、判断与品味上，而非管理流程。
- [[意向性立场]] — 把待预测对象当作理性主体，据其在世界中的位置与目的推断应有信念与欲望，再预测其行动。
- [[意向性系统理论]] — 丹尼特的观点：只要行为模式能让意向立场奏效，就是「真正的信徒」；意向状态是反映客观特征的图式。
- [[涌现]] — 大量简单要素在复杂系统中交互后自发产生、无法由单个要素预先推出的新性质或新实体。
- [[整理增益 cleaner than what you started with]] — 漫谈整理后的版本常常比起点更清晰，这份「更干净」正是整理带来的净增益所在。
- [[Friction-based Skill Formation]] — 调试直觉、系统直觉、品味与怀疑能力只能从犯错、溯源、碰壁的摩擦中长出来，没有捷径。
- [[Ghosts, Not Animals]] — LLM 不是有生物驱动的动物，而是人类制品的统计模拟，正确姿态是经验性熟悉。
- [[Read–Think–Write–Verify Framework]] — 知识工作通用四步：Read 消费信息、Think 应用知识、Write 产出结构化输出、Verify 对照标准。
- [[Step Change]] — 能力不是平滑增长而是台阶式跳跃，一旦发生，旧判断都需重写
- [[Taste]] — 在美学、判断与取舍上的品味，负责在多个可运行方案中挑出对的、优雅的那个。
- [[3+ 法则]] — 决策前强制列出至少 3 个方案，避免二元对立陷阱，拓宽思考宽度。
- [[给事物命名]] — 命名是把事物安置到某个位置；像「中年危机」这样的宽泛词会变成杂物间，掩盖未被思考的问题。
- [[回声 echo of your own tangle of thoughts]] — 模型返回的常不是新观点，而是你原有那团缠绕想法的回声。
- [[价值定义]] — 人的未来价值在于判断一件事是否还有价值，并定义需求方向、审核结果。
- [[决策慢、执行快]] — 决定做什么要慢、想清楚再动手；一旦定了执行要快，不要用 AI 加速决策本身。
- [[四阶段演化模型]] — 按机器智能水平划分的四阶段：原始计算、智能体、人类级智能、超人智能。
- [[稀疏反馈推断规则]] — 从稀疏反馈中推断规则、以此构建世界模型的能力。
- [[原则侧]] — 材料仅给出名称「原则侧」，未提供任何正文，本条目只如实记录该名称本身。
- [[Facts are facts, but perception is reality]] — 事实是事实，但驱动政策与情绪的是感知；数量级估算已近乎零成本，不做即是甘愿被感知统治。
- [[HiFi 与 HiEx 信息原则]] — 把信息质量拆成高保真（贴近一手真相）与高专业度（来源是真专家）两条，优先取一手资料与专家见解。
- [[Scaffolding Metaphor]] — 把 Agent 的支撑结构比作施工脚手架：临时、可拆除，楼盖好就该撤走。
- [[Thinking Engine]] — 仅有名称的具名概念，材料未给出定义、来源与用法。
- [[Without Defensiveness]] — 承认错误后不甩锅、不列条件、不找借口，否则承认失效，只是给「被错」打麻药。

</details>

## AI 医疗（5）

> AI 在诊断、筛查与临床上到底改变了什么？

**枢纽**：[[人机协作]] · [[信息稀缺优势]] · [[第二意见]] · [[平扫 CT + AI 多癌筛查路线]] · [[DAMO COCA]]

<details><summary>全部</summary>

- [[人机协作]] — 医疗 AI 重心从性能验证转向人机协作：我们知道模型何时错，模型也知道我们何时错。
- [[信息稀缺优势]] — 信息越少、噪音越大时 AI 相对人类的优势越大；信息充足后人类整合能力反而追平，故 AI 最该卡在分诊那一刻。
- [[第二意见]] — AI 不取代主治医生的第一意见，而是在 EHR 中被动运行的安全网，在诊断走偏前拉一把。
- [[平扫 CT + AI 多癌筛查路线]] — 一次平扫 CT 同时跑多个 AI 模型，识别消化系统多种高发癌，让已有设备成为多癌筛查入口的范式。
- [[DAMO COCA]] — 阿里达摩院与广东省人民医院的肠癌筛查 AI，从最普通的平扫 CT 识别结直肠癌及癌前病变，不加造影、不做肠道准备。

</details>

## AI 与个人生活（2）

> 把生活交给 AI 之后，人和自己的关系变成什么样？

**枢纽**：[[让自己对 AI 可读]] · [[AI matchmaking]]

<details><summary>全部</summary>

- [[让自己对 AI 可读]] — 把文件、邮件、日历、消息开放给 AI，使自己成为 AI 能持续读取并建模的数据库。
- [[AI matchmaking]] — 由 AI 了解你的偏好、筛选撮合、安排约会并事后复盘的交友方式，被预判为五年后的常态。

</details>

## 经济与商业逻辑（29）

> 价值、资本和生意在这个时代怎么流动？

**枢纽**：[[开源 vs 闭源]] · [[死亡地带]] · [[对话式广告归因闭环]] · [[机会成本]] · [[前沿实验室]] · [[DeepSeek Moment]] · [[LLM 订阅错配（LLM Subscription Mispricing）]] · [[“SaaS 已死”叙事与护城河蒸发]]

<details><summary>全部</summary>

- [[开源 vs 闭源]] — 开源靠社区传播、闭源靠资本算力循环；在中国环境下，开源路线能走多远取决于产业资本能否独立于政府资本持续投入。
- [[死亡地带]] — 开源模型一旦追平闭源，闭源基础模型公司「卖模型」的价值归零的那条临界线。
- [[对话式广告归因闭环]] — 把对话变成可归因渠道：对话主题定向 → SSE 注入广告单元 → webview 跳转 → OAIQ 上报。
- [[机会成本]] — 为做一件事而放弃的其他选择中最高的价值；超大厂商真正的挑战是算力该分给谁。
- [[前沿实验室]] — 处在能力最前线的少数实验室（如 Anthropic 与 OpenAI），其长期真正的对手是开源模型。
- [[DeepSeek Moment]] — DeepSeek 每发一代模型就冲击一次市场：集中暴露闭源路线脆弱性，把焦点从更大模型推向更高效率与更开放生态。
- [[LLM 订阅错配（LLM Subscription Mispricing）]] — 月费这种商业模式从根上跟 LLM 不兼容。
- [[“SaaS 已死”叙事与护城河蒸发]] — 市场认为 SaaS 护城河消失、未来现金流更不确定的叙事，但“人人自攒 CRM”的版本被指过于简化。
- [[次贷式 AI 危机（Subprime AI Crisis）]] — 把 AI 当 2008 年次贷：产品价格被刻意压低、风险层层打包隐藏，靠一连串「互相付钱」的循环，环节付不起真实成本就反向崩塌。
- [[对话上下文定向]] — 定向信号是当前对话本身的主题，原文未证实是否也纳入历史对话。
- [[难度即护城河]] — 真实应用的痛点源自基底本性、无法被工程掉，只能由 harness 吸收；难做与难被复制同源，即护城河。
- [[平台跃迁四浪 Platform Shifts]] — 互联网、云、移动、AI 四次大规模平台跃迁，每次都让创业公司以全新量级被使能。
- [[系统竞争]] — 大模型竞争从单点 benchmark 转向架构、token 效率、芯片适配、软件栈、商业化与开源生态的系统竞争。
- [[粘性界面与 token 成本转移]] — 模式洞察：Linear 仍是 SaaS 的粘性界面，是工作发起与信息记录处，却不为 token 付费；成本由模型厂商和 coding agent 承担。
- [[General Purpose Technology]] — 能广泛渗透并重塑整个经济的技术，如蒸汽机、电力、互联网，需要配套的组织变革。
- [[Hyperscaler]] — 超大规模云厂商，需在云业务、自有主业与对模型公司的战略投资之间做平衡。
- [[OAIQ]] — OpenAI 商家端转化追踪 SDK，读取 oppref、写 cookie，并把访问、加购、下单等上报 bzr.openai.com。
- [[Stargate 依赖闭环（Stargate Dependency Loop）]] — Oracle 借债建 Stargate、OpenAI 付费、资本市场叙事三者互相绑死的融资闭环
- [[Token 补贴缺口（Token Subsidy Gap）]] — 用户每付 1 美元、公司却烧掉约 8–13.5 美元算力，这是 AI 公司单位经济的核心错配。
- [[苍白之马（Pale Horse）]] — Ed Zitron 借《启示录》死亡之马的意象，标记 AI 产业「灾难性转折点」的临界信号。
- [[出海]] — 中国公司国内竞争过热后向海外扩张的产业动作，继制造、电商、游戏之后，微短剧与 AI 视频成为最新案例。
- [[政府资本 vs 产业资本]] — 政府资本以政策意志、KPI、政治安全为决策函数求「可控」；产业资本以风险—回报为函数求指数级回报。
- [[Agent 经济]] — 未来购物、订阅、筛选信息的执行者可能是 Agent，营销素材与产品界面需面向 Agent 消费。
- [[AI 泡沫]] — 判定标准不是涨得猛，而是投入与可见收益之间出现失衡，常被类比铁路与互联网泡沫。
- [[Frontier Demand 前沿需求]] — 总市场需求中出乎意料地大的一部分，落在绝对前沿而非中间地带。
- [[OpenAI 广告基础设施域名]] — bzrcdn.openai.com 托管广告创意与 SDK，bzr.openai.com 收事件上报，是广告网络自建的物理标志。
- [[oppref]] — 广告点击 URL 上的前向归因 token，被写入 __oppref cookie（30 天），随每次转化事件回传。
- [[single_advertiser_ad_unit]] — ChatGPT SSE 响应流中与模型输出混在一起的结构化广告事件，含品牌、轮播卡片、目标链接与 token。
- [[Token 卖家的激励错配]] — 大厂靠多卖 token 获利，于是激励都在喊多花 token，没人喊想清楚、花得好。

</details>

## AI 监管与问责（5）

> AI 出事找谁、由谁登记、按谁的规矩？

**枢纽**：[[责任链条散了]] · [[AI 护照]] · [[承诺链条]] · [[Manus 收购叫停事件]] · [[opt in opt out]]

<details><summary>全部</summary>

- [[责任链条散了]] — AI 同时像软件、员工、外包商与代理人，传统「找开发商/找公司/找平台」的问责路径各自假设单一主体类型，于是全部失灵。
- [[AI 护照]] — AI 的可登记身份，不关乎血统，而是一张写明从哪里来、受谁约束、出事找谁的责任地址。
- [[承诺链条]] — 高考换走 12 年青春靠一条因果承诺链：苦读→好大学→好专业→体面工作→稳定上升，AI 时代每环都在松动。
- [[Manus 收购叫停事件]] — 中国发改委宣布禁止 Meta 对 Manus 约 20 亿美元的收购并责令撤销，期间召创始人入京、限制出境。
- [[opt in opt out]] — 制度默认值的设计：默认全员使用不可退出，还是须家长主动选择，决定家长有无发言权。

</details>

## AI 内容生态（12）

> 内容被 AI 生产、分发和消费之后，什么变了？

**枢纽**：[[扁平化]] · [[废料怪兽]] · [[AI 反弹潮]] · [[AI 可见性]] · [[AI 爬虫五大分类]] · [[独立视频 standalone video]] · [[算法即决定性力量]] · [[注水内容]]

<details><summary>全部</summary>

- [[扁平化]] — 把活生生的人压成数据库一行的还原论，是 AI 反弹潮的核心意象。
- [[废料怪兽]] — 普通人视角下 AI 一边索取数据、一边向搜索结果与信息流倾泻劣质内容的双重体验比喻。
- [[AI 反弹潮]] — 公众对 AI 的负面情绪在加深：过半美国人认为 AI 弊大于利，Gen Z 中仅 18% 抱有希望、31% 感到愤怒。
- [[AI 可见性]] — 让 AI 更好地知晓你的内容与产品：做好内容，并用结构化、机器可读的描述告诉 AI 爬虫这边有什么。
- [[AI 爬虫五大分类]] — AI 爬虫并非一类，各自用途不同，因此 robots.txt 不能当简单开关用。
- [[独立视频 standalone video]] — 不连接任何 lesson 或 course 的视频；AI 需先从文档中读到这一定义才能正确分类。
- [[算法即决定性力量]] — 在 clip 时代，能否被算法推荐比内容质量更决定生死的判断。
- [[注水内容]] — 为刷分堆砌的重复内容，与已有段落同义、无新增信息，纯 Q&A/FAQ 格式反而有害。
- [[ChatGPT moment for videos]] — AI 视频生成越过临界点、引发产业级替代潮的时点，如 Seedance 2.0 后横店微剧剧组骤降。
- [[GEO]] — 面向生成式引擎的内容优化，如加入权威引用可提升 AI 可见性 115%。
- [[Ghost in the Shell]] — 赛博脑 × 义体 × 幽灵（ghost，寄宿于壳之中的意识）= "Ghost in the Shell"。
- [[Human-Only Social Networks]] — 只允许真人参与的网络，靠生物验证、Web of Trust 与类 Snapchat 的文化设计抵御 AI 群发污染公共空间。

</details>

## AI 算力与基建（10）

> 模型跑在什么芯片、什么电、什么水里？

**枢纽**：[[平行 AI 基础设施]] · [[数据中心]] · [[AI 从应用到基础设施]] · [[芯片管制]] · [[蒸发冷却]] · [[AI 主权审查机制]] · [[每年超过 10 倍增长]] · [[昇腾]]

<details><summary>全部</summary>

- [[平行 AI 基础设施]] — 从芯片到框架到数据中心，整条 AI 技术栈做出不依赖美国体系的另一份，V4 是早期拼图。
- [[数据中心]] — AI 的物理基础设施：装满联网计算机的大仓库，吃电、吃水冷却、占地。
- [[AI 从应用到基础设施]] — AI 正从商业资产变为安全资产：它不只承载服务，还参与判断、可能成为社会接口，因而被国家审查。
- [[芯片管制]] — 美国对高端 AI 芯片的出口管制直接限制中国训练前沿模型的算力供给，是资本投入补不上的结构性短板。
- [[蒸发冷却]] — 数据中心用水的主要去处：机器跑电生热，热靠水蒸发带走，工业冷却效率约 60-90%，因此 AI 用电规模≈AI 用水规模。
- [[AI 主权审查机制]] — 给 AI 装国籍的四类工具：外资安全审查、本地化主权云、国家配套基础设施与价值观包装。
- [[每年超过 10 倍增长]] — Habitat 处于每年超过 10 倍增长的约束下，团队必须在超增长过程中同时建设平台。
- [[昇腾]] — 华为的国产 AI 加速芯片系列，被视作中国本土算力承载前沿模型推理的平台。
- [[CXL 内存池化]] — 用 CXL 把多台服务器内存聚成共享池，作为 GPU HBM、本地 DRAM 之后的第三级内存层。
- [[Trainium]] — AWS 自研芯片，名字虽指向训练，主力其实是推理，多以 Bedrock 等托管服务形态交付。

</details>
