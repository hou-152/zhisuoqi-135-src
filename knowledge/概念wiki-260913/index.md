# 概念索引 · 知所栖 135

> 1156 个概念 · 936 条前置依赖 · 23 个领域 · 源：Notion 概念库 + Context Engineering(28篇) + Harness Engineering(30篇)

查一个概念：先在本页按领域找，再进 `concepts/`。想知道「从哪开始学」，看每个领域的枢纽概念。

## Harness 与运行时（114）

> Agent 靠什么骨架才能跑起来、跑得久？

**枢纽**：[[Harness]] · [[Harness 工程 Harness Engineering]] · [[Agent]] · [[Agent = Model + Harness]] · [[stateless]] · [[Bedrock Managed Agents]] · [[higher-level runtime]] · [[model-native harness]]

<details><summary>全部</summary>

- [[Harness]] — 包裹在大语言模型之外的完整软件架构，负责让模型能读文件、跑命令、改代码并自主完成任务。
- [[Harness 工程 Harness Engineering]] — 围绕模型构建系统、把模型变成工作引擎的工程方式，用于注入人类先验并在模型变强后做外科式修正。
- [[Agent]] — Agent 即装备了指令与工具的 LLM；最小配置只需 name 与 instructions。
- [[Agent = Model + Harness]] — Agent = Model + Harness：模型只有在 harness 提供状态、工具执行、反馈回路与约束后才成为 agent。
- [[stateless]] — 每次调用模型都从空白状态开始，不携带上一轮的上下文
- [[Bedrock Managed Agents]] — AWS 原生的托管 agent 运行时，打包身份、权限、状态、日志、治理与部署。
- [[higher-level runtime]] — 在模型调用之上再叠一层运行时，接管 turns、工具执行、guardrails、handoffs、sessions，且可按场景分层选择。
- [[model-native harness]] — 顺着模型自身擅长方式设计的 harness，让 agent 跨文件、跨工具完成任务。
- [[Latent vs Deterministic]] — 系统每一步非潜空间即确定性：智能住在潜空间，信任住在确定性层，混淆二者最常见错。
- [[操作系统类比]] — 把 harness 类比为操作系统：用简单稳定的接口封装复杂逻辑，靠刻意通用换泛化，并复用既有软件工程实践。
- [[协同进化与紧耦合 co-evolution principle]] — 模型是带着特定 harness 一起做后训练的，harness 与模型紧耦合，换掉工具实现可能反而降低性能。
- [[agent 与 harness 的分工]] — agent 是目标导向、会用工具、能自我纠错的涌现行为；harness 是产生这一行为的机器。
- [[coding agent]] — 由 harness 包裹的 LLM，并借工具获得读写代码等额外能力的代理。
- [[Harness evolution]] — harness 本身可在任务、trace、benchmark 与隔离实验中持续改进，相关工具如 Harness Evolver 与 Harbor。
- [[Harness level feature]] — 模型开箱做不到、必须由 harness 提供的能力：跨交互持久状态、执行代码、访问实时知识、搭环境装依赖。
- [[Harness Thickness]] — 多少逻辑住在 harness 而非模型里：Anthropic 押薄 harness 与模型进步，图式框架押显式控制。
- [[primitives]] — SDK 中不可再拆的三个基本构件：Agents、Agents as tools/Handoffs、Guardrails。
- [[Runtime-harness separation]] — LangChain 的 framework/runtime/harness 三层分解：执行环境与可靠工作循环不是同一层。
- [[部署系统层]] — 夹在原始模型与真实世界之间、决定落地效果的那一层部署系统。
- [[大小模型分工]] — 小模型承担状态判定、话题切换、网页总结等高频低价值边角活，大模型只做真正的推理工作。
- [[对话加确定性缝合]] — 任何 AI app 归根结底是与 LLM 对话，再把结构化结果抠出，用确定性代码缝合。
- [[看对话 log]] — 研究一个 AI app 怎么工作，最直接的方式是把它与模型之间的请求与响应截下来逐条读。
- [[空间 Scalability Spatial Scalability]] — 判断能否通过投入 10 倍计算获得 10 倍有意义吞吐量。
- [[能力鸿沟]] — 基准测试成绩与真实工程执行之间的鸿沟：agent 跳步、搞坏测试、假称完成，问题在 harness 而非模型。
- [[时间 Scalability Temporal Scalability]] — agent 在数小时连续运行中保持方向与质量的能力，是长时任务的骨架问题。
- [[Action Space]] — 一个 agent 可执行的全部动作与工具的集合，构造它是搭建 harness 最难的部分之一。
- [[Claude Managed Agents]] — 预置、可配置、跑在托管基础设施上的 agent harness：你定义 agent 模板，harness 与 infra 由 Anthropic 提供。
- [[configuration problem]] — 失败根因多在配置而非模型能力；模型越强任务越难，失败仍会以意外方式出现。
- [[harness 的过时假设]] — harness 编码的是“Claude 做不到什么”的假设，模型变强后这些假设会陈旧，反过来成为性能瓶颈。
- [[harness 与 framework 的分野]] — 框架替你决定 Agent 怎么想，还重造重试、状态持久化、任务队列与事件路由；harness 只保证这些动作可靠发生。
- [[harness over-fitting]] — 前沿模型在自家 harness 上后训练，与特定工具深度耦合；换到没见过的 harness 后名次可能反转。
- [[Hermes Agent]] — 一个开源 Agent，代码库与文档公开，研究者可直接读源码，而非只能对其行为做逆向工程。
- [[messages API 作为直连网关]] — messages API 是通往模型的直连网关，接收 messages 返回 content blocks；足够底层，所以 agent 必须自己补上 harness。
- [[prefill 与 decode 的高度倾斜]] — Agent 每步追加 action 与 observation 使输入膨胀，输出却只是短 function call，如 Manus 约 100:1。
- [[Reliability-critical harness primitives]] — 只收录直接影响 harness 设计、上下文管理、评测与运行时控制等可靠性原语的资源筛选标准。
- [[turnkey yet flexible]] — 开箱即用又能改造的设计取向：默认就能跑，同时方便接入自己的技术栈。
- [[very few abstractions]] — SDK 定位宣言：只暴露很小一组原语，抽象极少，学习曲线平缓。
- [[If you're not the model, you're the harness.]] — Vivek Trivedy 的划界公式：模型权重是一侧，其余全部工程都归为 harness。
- [[舱单]] — 起飞前汇总机型、油量、载重与配载并签字的放行文件；在 SDK 中指描述 Agent 工作区与挂载的 Manifest。
- [[AI Agent]] — 用户感知到的行为体现：Agent 的对外表现，而非其内部实现。
- [[LLM-as-CPU Harness-as-OS]] — 把 LLM 当作 CPU、把 Harness 当作操作系统的类比框架，用于界定二者的职责边界。
- [[Responses API 与生产设置对齐]] — 用 Responses API 重写 harness 以更好对齐生产设置，并建议开发者弃用 legacy Chat Completions。
- [[「垃圾回收」型 agent]] — harness 的第三类组件：周期性运行的 agent，专找文档不一致与架构约束违规，对抗熵增腐化。
- [[1.6% vs 98.4%]] — Claude Code 51.2 万行源码中仅 1.6% 是 AI 决策逻辑，98.4% 是确定性工程基础设施。
- [[12-factor agents]] — 一组让 LLM 软件达到生产可交付水准的工程要素纲领，非框架，可单独取用。
- [[从期望行为反推 harness 设计]] — 不从功能清单出发，而由希望模型做出的行为反推 harness 需要提供哪些能力。
- [[单用户假设的失效]] — 多 agent 并行打破单用户假设：共享锁与重复仓库副本成为瓶颈，需写时复制与去重。
- [[动态系统]] — 区别于静态 Prompt/Context 优化，指持续吸收多源信号并据反馈快速迭代的 Harness 系统。
- [[反脆弱]] — 系统设计原则：规模越大失败越必然，须让单个 Agent 失败不拖垮整体，其余可恢复或换路。
- [[反向代理式窥探]] — 把 AI gateway 当反向代理用，原样转发请求、只在中间截取记录，从而看到真实 prompt。
- [[工具调用批处理]] — 独立的廉价 discovery 先批量执行，聚焦读取也批量执行，避免一搜一读交替造成上下文扩散与节奏开销。
- [[功能清单作为 harness 原语]] — feature_list.json 既是任务来源、进度记录又是范围边界，被视为 harness 的原语。
- [[共享 harness]] — 多个产品共用同一套 harness 代码与工具实现，减少重复并让改进跨产品传播。
- [[基础设施挑战而非 harness 设计问题]] — 把规模化跑Agent遇到的困难归类为基础设施挑战，而非harness设计技巧问题。
- [[基础设施问题，不是 AI 问题]] — 可观测性、重试、并发、状态管理、审计、调度这些墙是基础设施问题，所需原语可能已存在，不必以agent之名重造。
- [[架构约束的确定性执行]] — 把架构约束写成自定义 linter 与结构性测试，由确定性工具强制，而非只交给 Agent 自觉遵守。
- [[脚手架化 LLM 与冯·诺依曼架构类比]] — 把裸 LLM 比作无内存 CPU，上下文窗口是 RAM，外部数据库是磁盘，工具集成是设备驱动，harness 是操作系统。
- [[卡住即信号 struggle as signal]] — Agent 卡住不是故障而是信号，据此补上缺的工具、护栏与文档，并让它自己写修复。
- [[可观测性]] — 看不到 agent 做了什么就修不了它搞坏的东西，故可观测性属于 harness 本身。
- [[可执行搜索空间]] — 一旦 harness 设计成为可执行的搜索空间，强 coding agent 就能在远超手写 prompt 的同一片设计空间里搜索。
- [[框架反向工程]] — 越过 80% 完成度需反向工程框架、prompt 与流程，其结局往往是推倒重来。
- [[让不可见变得可见]] — 用检查、断言与人工介入，把静默失败、分级漂移和语义跑偏暴露出来。
- [[事件驱动编排与执行解耦]] — 编排放在执行之外的事件驱动层，两者解耦，换来可观测、持久重试与事件审计。
- [[小函数组合]] — 由 handleMessage、sendReply、acknowledgeMessage、failureHandler、heartbeat、subAgent 六个函数通过事件通信组成，而非一个巨石。
- [[用工具调用联系人类]] — 把人类当作可被 agent 调用的资源，通过 tool call 主动请求人介入、审批或补充信息的做法。
- [[长周期任务的基础设施压力]] — 时域一长，压力就从模型转移到 agent 周围的基础设施：要安全、要抗基础设施故障、要能横向扩展支撑多 agent 团队。
- [[agent 作为 Claude API 的新核心原语]] — Managed Agents 接管 harness 与基础设施，使 agent 成为 Claude API 的新核心原语，便于多 agent 与长任务探索。
- [[Agent as a New Type of Software]] — Agent 的基础设施可像 web app，但 interaction、interface、outputs 更动态，需沙箱、安全执行与长任务支持。
- [[Agent CLI runtimes]] — 运行 agent workflow 的命令行环境，使自然语言工作流可在本地脚本、终端任务与 CI/CD 中执行。
- [[AgentCore]] — AWS 提供的一套 agent 原语，含记忆组件、安全执行环境与权限能力，供自建 agentic workflow 使用。
- [[Agents SDK]] — OpenAI 提供的标准化 Agent 开发基础设施，让开发者易于起步并为 OpenAI 模型正确构建。
- [[APM]] — Agent 包管理器，负责 agent primitives 的安装、分发、配置与运行，类比 npm/pip。
- [[brain hands session 解耦]] — 把模型与 harness、沙箱工具、会话事件日志拆成三个互相假设极少、可独立失败或被替换的接口。
- [[Claude Code]] — Anthropic 2025 年 11 月发布的自主编程 agent 产品，能在分钟到小时内完成原需数天的编程任务。
- [[Codex]] — OpenAI 的编码代理产品；本地化运行既是它的能力来源，也带来安全与部署上的复杂度。
- [[context window 即 agent 状态]] — 循环中上下文起于一个初始事件，此后每次决策与执行结果都追加进去，它本身就是 Agent 的状态。
- [[Filesystem 作为最基础的 harness 原语]] — 文件系统被称为最基础的 harness 原语：模型在海量文件系统用法上训练过，还解锁工作区与协作面。
- [[Harness 组件生命周期]] — 每个 harness 组件都是对模型能力边界的假设，过期速度各异；做法是逐一移除旧组件、验证质量是否真的下降。
- [[SayCan]] — Google 提出的「LLM 出主意、机器人评估能不能做」的接驳框架，常被当作主流基线。
- [[service template 与 golden path]] — 团队沿既定路径快速实例化新服务的现成实践，被用来类比 harness 未来按拓扑挑选。
- [[Skills as permanent upgrades]] — 每个写下的 skill 都是系统永久升级：不遗忘、不退化，模型换代时判断部分自动变强。
- [[Von Neumann Architecture Analogy]] — 把裸 LLM 比作无 RAM 无磁盘无 IO 的 CPU：上下文是 RAM，外部库是磁盘，工具是驱动，harness 是操作系统。
- [[webhook transform 与 connect()]] — transform 在云端把原始 http payload 转成带类型的 event；connect() 从本地建持久 WebSocket，无需公网 endpoint。
- [[保留推理 retained reasoning]] — 跨工具调用与轮次保留模型私有推理，让它看到此前的计划与思路，而不只是动作记录。
- [[非模型架构 Non-model Architecture]] — 除模型之外的一切系统成分——Harness、循环、工具、上下文管理都属于这一层。
- [[脚手架与 Harness 厚度 Scaffolding Harness Thickness]] — 脚手架本身不盖房子；关键取舍是多大比例的逻辑写死在系统里，而不是留给模型。
- [[执行可靠性机制 State Error Guardrails Verification]] — 让执行中断可恢复、错误不滚雪球、越界立即停止的机制集合：状态、错误、护栏、验证。
- [[hooks .claudehooks]] — 在 agent 生命周期特定事件上自动执行的确定性脚本，用于通知、审批、集成与验证。
- [[Thin Harness, Fat Skills]] — 把智能上推到 skills、把执行下推到确定性工具、保持 harness 薄的设计原则。
- [[「少即是多」：gimmick 与真实增益的分界]] — 装配置、诱导 agent 多是 gimmick；真实增益来自对 harness 的理解与用法。
- [[从救火到审查的角色转移]] — 五个子系统协同后可观测到的结果是人的角色从到处救火转为审查 agent 的产出。
- [[调试散文：一个词就是 bug]] — Harness 失灵时被调试的代码常是一段英文，唯一调试器是判断力；prompt 里一个词只把行为推偏几度。
- [[解空间收窄 constraining the solution space]] — 以具体架构模式、强制边界和标准化结构换取信任与可靠性，代价是放弃一部分生成任何东西的灵活性。
- [[纠正成本递减 correct things less from that point on]] — 改进 harness 的收益不只在当轮，而是从该轮起持续减少后续需要人工纠偏的次数。
- [[链式 Chained]] — 把多个 skill 首尾相接，让「经过验证的交接」自动串成端到端流程，把习惯变成固定契约。
- [[灵活性与自动化的权衡]] — 接入越自动越死板：链式拿灵活性换自动化并增加 token 开销，standalone 反之。
- [[能力外置化决策]] — 对任何新能力先问它该住在哪：稳定知识入 memory、打法入 skills、通信契约入 protocols、循环治理入 mediators。
- [[普遍可触发 universally triggered]] — Harness 设计原则：触发与工作解耦，agent 不关心自己是被 webhook、cron 还是子调用激活的。
- [[嵌入 Embedded]] — 第二种接入方式：检查作为 skill 产出物的一部分自动触发，无需开口，如生成组件后自动跑 eslint。
- [[确定性工程基础设施 deterministic engineering infrastructure]] — 让 Agent 稳定运行的工程底座，由权限网关、上下文管理、工具路由、错误恢复四类构成。
- [[弱 harness 强 harness 对照与消融实验]] — 同一任务分别用弱harness与强harness跑两次并对比效果，关心效果变化而非写了多少说明文档。
- [[三层工程 prompt context harness engineering]] — prompt、context、harness三层同心工程，harness包住前两者并加上工具编排、状态持久化与验证。
- [[事件驱动的自动化 Automations]] — 事件驱动的自动化：issue 进入系统那一刻即触发 agent 工作流，即时精炼或行动。
- [[所有权原则]] — 自己掌控提示词、上下文窗口与控制流，不把关键环节外包给框架。
- [[拓扑作为新抽象层]] — 若 harness 设计模式被普遍掌握，拓扑结构或成新的抽象层，而非自然语言。
- [[为 AI 设计工作环境]] — 工程师能力曲线的转移：衡量标准从『我能写多少行代码』转向『我能为 AI 设计多严格的工作环境』。
- [[未来防腐测试 future-proofing test]] — 未来防腐测试：换更强模型、不加 harness 复杂度性能就跟着涨，则设计为好，即模型越强 harness 越薄。
- [[无手打代码 no manually typed code at all]] — OpenAI 团队的自我设限规则：一行代码都不手写，被作者称为 forcing function，逼出整套 harness。
- [[优化对象的阶梯]] — harness 优化对象沿 instruction prompts → structured context → workflow → harness code → optimizer code 逐级演进。
- [[Agent vs Harness]] — agent 是用户交互的涌现行为实体，harness 是产生该行为的机器，二者最常被混淆。
- [[AI 工程基础设施 AI engineering infrastructure]] — 指出做 Agent 已不是写提示词，而需要一整套工程基础设施的判断。
- [[harness 厚薄 thin vs thick]] — 架构决策：多少逻辑住在 harness、多少留给模型；Anthropic 押薄 harness，图式框架押显式控制。
- [[Harness 简化原则 Harness Simplification]] — 找最简单的解法，只在必要时增加复杂度——harness 里每个组件都编码了“模型自己做不到”的假设。
- [[rigor 的搬迁 relocating rigor]] — Chad Fowler 提出：严谨正从写代码搬向环境设计、反馈回路与控制系统，别指望更好的模型自动解决可维护性。

</details>

## 循环与自主执行（46）

> 一次任务如何变成可重复、可自主推进的循环？

**枢纽**：[[Loop Engineering]] · [[Agent loop]] · [[漂移与隧道视野 drift & tunnel vision]] · [[宏动作]] · [[自动循环的心跳]] · [[编排循环与「dumb loop」]] · [[范围控制与显式的完成定义]] · [[Ralph Loop]]

<details><summary>全部</summary>

- [[Loop Engineering]] — 从单次提示转向自动循环的工作方式：设计目标、触发、执行、验证、失败处理与反馈机制。
- [[Agent loop]] — SDK 内置的循环：发起工具调用、把结果送回模型、持续迭代直到任务完成。
- [[漂移与隧道视野 drift & tunnel vision]] — 长时程自治中的两种典型退化：偏离原始目标的漂移，与只盯局部而丢失全局的隧道视野。
- [[宏动作]] — 编程的最小单位从敲代码行变成委派一整块工作，如实现功能、重构子系统、写测试。
- [[自动循环的心跳]] — 定时触发是 loop 的心跳：/loop 间隔执行、cron、hook、GitHub Actions；没有它就不是 loop。
- [[编排循环与「dumb loop」]] — 组装提示、调模型、解析输出、执行工具、回喂结果并重复的编排心跳循环。
- [[范围控制与显式的完成定义]] — 约束 Agent 一次只做一个功能，不多不少、不偷改需求清单掩盖未完成，并给出显式完成定义。
- [[Ralph Loop]] — 一种 harness 模式：用 hook 拦截模型退出企图，在干净上下文中重注入原始 prompt，逼 Agent 继续。
- [[长时程自治编码 long-running autonomous coding]] — 把 coding agent 的使用场景推到以周为单位的连续自治运行，目标是自主跑数周、完成人类团队通常要数月完成的项目。
- [[Agentic Coding]] — 让模型自主完成读代码、改代码、跑测试、反思再改的多步编程任务，考核的是能不能把活儿干完。
- [[Inner Loop]] — Primary Agent 与用户、代码和工具交互以完成主要执行工作的循环，可在较少人工干预下长期运行。
- [[Orchestration Loop TAO Cycle ReAct Loop]] — Agent 运行的心跳：循环执行 Thought-Action-Observation，机制上常只是一个 while 循环。
- [[ReAct loop]] — 模型推理→通过 tool call 行动→观察结果，在 while 循环里重复，是当前 agent 的主执行模式。
- [[steering]] — 用户在 agent 运行中途发来新消息时的介入问题，目前仍无优雅解法
- [[TodoWrite 与 TodoRead]] — 内置的待办读写工具，prompt 要求高频使用，做完一项立刻标记完成，管理多子任务。
- [[Harness 与 Loop 的配合]] — Harness 提供约束护栏、Loop 提供驱动力，二者配合让任务可持续自动推进。
- [[Prompt 到 Loop 的跃迁]] — 从提示词、上下文、harness 到 loop 的四次跃迁：语言表达、信息组织、规则约束、系统自运行。
- [[「扔掉 DAG」的承诺]] — 认为可抛弃 DAG、只给目标与转移让 LLM 实时决策路径的承诺，作者随即指出它并不完全成立。
- [[闭环]] — 把执行结果回喂给决策、使任务能自动推进下一轮的结构。
- [[触发模式谱系]] — Agent 常见触发方式四分类：事件触发、定时触发、发射后不管、长时程自主，各自对应不同在环程度。
- [[会话生命周期]] — Agent 会话应走结构化生命周期：开工跑 init 与读状态，执行，收尾更新进度、记未完成项，只在可安全恢复时 commit。
- [[任务时域 task horizon]] — 一次任务可连续自主运行的时间长度，是衡量 Agent 能力与「为什么是现在」的量化指标。
- [[收敛式失败恢复]] — 失败时收敛修正：grep 失败换更简单正确转义的查询，路径错用 glob 而非猜路径扩范围。
- [[agent 循环]] — LLM 输出结构化 JSON 决定下一步，确定性代码执行 tool call，结果回灌上下文，直到 intent 为 done。
- [[Agentic workflows]] — 由规则、上下文、工具调用、验证与输出格式组成的端到端 AI 工作流。
- [[Continuous orchestration loop]] — 不只执行单个任务，而是长期监督其他线程、Agent 或 loop，并能按计划持续运行的编排循环。
- [[DAG 编排器]] — 用有向无环图描述任务依赖的编排工具（Airflow、Prefect、dagster 等），另带观测、模块化、重试与管理。
- [[Decision-maker in the body]] — loop 区别于 cron 的关键：中间有一个决策者，模型按当前状态决定下一步，而不是执行固定脚本。
- [[Gather-Act-Verify Cycle]] — 收集上下文、动手修改、验证结果、再重复，构成 Agent 的执行节奏。
- [[judge agent 与周期性 fresh start]] — 每个周期结束由 judge agent 判定是否继续，下一轮从头开始，以对抗漂移与隧道视野。
- [[Learning Loop]] — 把运行中获得的规则写回 skill 文件，下次运行自动生效，技能由此自我改写。
- [[Loop Contract]] — 每个 loop 目录中的 README 契约，写明 goal、workflow、boundaries、backlog 与 timeline，供 agent 每轮读取。
- [[Loop Engineer]] — 不再直接 prompt coding agent，而是设计能自动 prompt agent 的循环，关注触发器、状态、日志、验证与多 agent 协作。
- [[No-progress detection]] — 识别 loop 仍在消耗预算却没有推进任务的机制，属于生产 loop 的硬停止条件之一。
- [[Outer Loop]] — 研究、监督和维护主系统的外循环，汇集反馈、评估与人的输入，方向与重要决定由人定。
- [[think → act → observe 循环]] — 带 steps 的 while 循环：调 LLM 思考、执行工具、把结果回灌 messages，返回纯文本即本轮结束。
- [[tool loop]] — LLM、system prompt 与 tools 组成循环：模型发出工具调用，结果回灌后再继续生成。
- [[笨循环 Dumb Loop]] — 循环本身不含智能，只负责反复调用模型；所有判断与决策都来自模型的输出。
- [[编排循环 Orchestration Loop TAO ReAct]] — 以“思考—行动—观察”为一轮，把模型输出变成可重复推进的任务循环。
- [[错误复利 compounding errors]] — 多步流程里每步微小失败率会累乘：10 步各 99% 成功率，端到端只剩约 90.4%。
- [[技能化 Skills]] — 把值得重复的工作流固化为可复用技能，让学习复利累积，可斜杠命令手动触发或在相关时自动应用。
- [[缩短循环 shortening the loop]] — 所有有效 AI 用法的共同模式：缩短某个循环，让想到就能立刻做到。
- [[习惯变契约 habit → contract]] — 把靠自觉维持的习惯写成链条步骤，变成由系统保证执行的契约，人只在被升级回来时介入。
- [[循环工程 loop engineering]] — 把频繁的手动收尾固化为可重复循环的方法：挑动作、试验证、写流程、封装成技能、调用并迭代、再链式化。
- [[Autopilot：内建循环]] — Copilot 工作流第五步，内建循环强制模型持续工作，直到计划每一项都做完。
- [[Model as subroutine]] — loop 出现后，模型不再是对话对象，而是被 loop 在某一步调用的能力。

</details>

## 上下文工程（150）

> 模型在每一步到底应该看到哪些信息？

**枢纽**：[[上下文工程 context engineering]] · [[Skill]] · [[上下文 context]] · [[tokens]] · [[上下文占用率与性能衰减]] · [[长上下文窗口]] · [[注意力预算 attention budget]] · [[上下文腐烂 Context Rot]]

<details><summary>全部</summary>

- [[上下文工程 context engineering]] — 对模型上下文窗口的审慎构建与管理，把原始上下文与目标任务映射为可组合的上下文处理函数。
- [[Skill]] — 放在 .claude/skills/ 下的文件夹，含声明触发条件的 frontmatter 与完整正文，按需加载。
- [[上下文 context]] — 任何可刻画实体所处情境的信息；各相关实体表征的并集即上下文，也指模型读到的全部前文。
- [[tokens]] — 模型实际处理的最小单位是 token 而非字或词，上下文长度与计费都按 token 序列计数。
- [[上下文占用率与性能衰减]] — 上下文窗口越满，模型性能越容易被轻微拖累；压缩通过腾出空间缓解这一衰减。
- [[长上下文窗口]] — 模型一次能装下的文本量，是昂贵有限的工作记忆；装得越满越易分心，准确性反降。
- [[注意力预算 attention budget]] — 把 LLM 注意力类比为有限的工作记忆预算，每新增一个 token 都要从中支取，故上下文是有限资源。
- [[上下文腐烂 Context Rot]] — 模型性能随输入长度增长而变得不可靠的现象，且不是平滑衰减，而是在不同位置参差塌陷。
- [[仓库即唯一事实来源]] — 一切指令、状态与清单必须以文件形式落进仓库，否则对 agent 不存在。
- [[混合指代]] — 一句话里既有本名又有代词，清晰度介于显式指代与隐式指代之间。
- [[系统提示 System Prompt]] — 调用前注入的系统级指令；文中批评每轮把当前时间、当前模式、当前状态写回它的做法。
- [[有限的工作记忆 limited working memory]] — 模型能装载的上下文信息量有限，因此「往里面放什么」必须做取舍，这是上下文工程的物理前提。
- [[序列位置效应 serial-position effect]] — 认知心理学经典发现：自由回忆时列表首尾最易记住，被借来解释模型上下文中的 U 型表现。
- [[Context as working memory budget]] — 把上下文窗口当有限工作记忆经营，配套 KV-cache 局部性、文件系统记忆、压缩与背压。
- [[Context Distraction]] — 上下文超过阈值后模型开始机械重复历史行为而非真正推理，窗口更大不等于结果更好。
- [[Context Management 四策略]] — 把上下文当内存来管：该压缩就压缩、该外置就外置、该懒加载就懒加载。
- [[Context Reset vs Compaction]] — 压缩是就地总结让同一 Agent 带着缩短历史继续；重置是清空重来，靠交接物把状态交给下一个 Agent。
- [[context rot（上下文腐烂）与 Lost in the Middle]] — 关键内容落在窗口中段时模型表现下降 30% 以上；长窗口也会随长度增加出现指令遵循退化。
- [[skill-creator 访谈式创建]] — 装上 skill-creator，让 Claude 反过来访谈你的工作流，快速生成 skill。
- [[the dumb zone the smart zone]] — 上下文被工具描述等填充后模型变笨为笨蛋区；把子任务拆给 sub-agents 可让主线程留在聪明区。
- [[Tool call offloading]] — 工具输出超阈值 token 时只保留头尾，把完整输出卸载到文件系统，模型按需再读取。
- [[渐进式披露 progressive disclosure]] — Agent 通过探索逐层发现相关上下文、工作记忆只保留必要部分的检索与认知模式。
- [[迷失在中间 lost in the middle]] — 当模型必须访问并使用位于长输入上下文中间的信息时，性能显著劣化的现象。
- [[会话的话题边界]] — 把聊天会话看成有话题性的：做与本功能无关的事就开新会话，避免有限上下文被无关内容稀释。
- [[加法本能陷阱与过度约束]] — harness工程最可靠的失败模式：一出问题就往prompt加规则，规则互相矛盾，模型只好安静地违反一条。
- [[选择性注意力压缩]] — 远的历史信息压缩、邻近文本保留全文、当下最相关部分重点处理的分层注意力机制。
- [[自回归下输出也是上下文]] — 模型是自回归的，它自己生成的 token 也进入自己的输入，所以长度压力同时来自输入与输出。
- [[Agent Skills]] — Claude 可读的技能文件，文件能递归引用其他文件，常用于教它调用 API 或查询数据库。
- [[code-review-graph]] — 用 Tree-sitter 为代码库构建结构化图谱并增量追踪变化，让 Claude 只读相关文件的工具。
- [[Context Infrastructure]] — Harness 决定 Agent 怎么工作与协调，上下文基础设施决定它拿到什么信息，进而决定质量上限。
- [[just in time 上下文检索]] — agent 只维护轻量标识符（路径、查询、链接），运行时用工具按引用动态加载真实数据。
- [[llms.txt]] — 站点根目录下面向 AI 的 Markdown 文件，类似 robots.txt，写清站点做什么、关键页面与作者，供 AI 检索时优先读取。
- [[Session Management]] — 管理会话的实践取舍：开几个会话、何时 compact、何时 rewind 或改用 subagent。
- [[Skill Files]] — 可复用的 markdown 文档，只教模型怎么做，不定义做什么，目标由用户提供。
- [[Skill-as-method-call]] — skill 像方法调用：同一套流程传入不同参数，产出截然不同的能力。
- [[Skills Hell]] — skill 数量膨胀、互相冲突或长期不维护，像 framework hell 一样拖低 Agent 可靠性。
- [[Software 3.0]] — 第三种编程范式：用 prompt、context、tools、examples 编程，context window 是新程序，LLM 是新解释器。
- [[WebFetch 两阶段总结]] — 大模型产出 tool call 与 prompt，小模型读网页并按 prompt 总结，只把一小段文字回传作上下文。
- [[CLAUDE.md]] — 放在项目根目录的 markdown 文件，Claude Code 每次会话开始时自动读取并严格执行。
- [[上下文压缩 Context Compression Summarization]] — 通过摘要或减少携带内容来压缩上下文，但不得以破坏稳定前缀为代价。
- [[压缩 Compaction]] — 在接近上下文限制时总结对话历史，以便任务继续推进的机制。
- [[短上下文]] — 故意把对话剪短、让线索不全，考模型信息不足时是主动澄清还是硬猜瞎做。
- [[方向漂移 Direction Drift]] — 上下文渐满导致一致性衰减：偏离目标、遗忘早期约束、在细节里越走越深。
- [[滑动窗口]] — 压缩注意力中为最近若干词的原始 KV 保留 VIP 通道、不被压缩且必然入选，保证对刚说过的话仍有清晰记忆。
- [[桥接推理]] — 通过上下文在已有记忆与当前表达间建立联系，从而恢复代词或转喻所指对象的语言理解机制。
- [[上下文 playbook 与增量条目]] — 把上下文当作带（标识符，描述）条目的演化手册，由Generator、Reflector、Curator三者增量维护。
- [[上下文隔离 context isolation]] — 用独立上下文窗口、专属系统提示与受限工具权限切分并委派任务，避免污染主对话。
- [[上下文骨架]] — 把issue tracking看作可依赖的骨架，负责收集信号、问题与决策，而非厨房点单系统。
- [[上下文均匀处理假设]] — 默认前提——模型处理第 10000 个 token 应与第 100 个一样可靠；报告以实验证伪它。
- [[上下文缺口]] — 交互双方各掌握对方不知道的上下文，承认自己不擅长的部分反而能更好服务同一用户。
- [[上下文失败，而非模型失败 context failures, not model failures]] — 多数 agent 失败已不是模型能力不够，而是上下文装配不对，修系统比换模型更有效。
- [[上下文坍塌与简洁偏置]] — 反复重写整块 prompt 会让信息坍塌、越写越简，故应输出结构化条目并用确定性逻辑合并。
- [[上下文压缩与即时检索 compaction just-in-time retrieval]] — 对抗 context rot 的组合策略：compaction、观察遮蔽、按需 grep/glob、子 agent 只回传摘要。
- [[首因偏置 primacy bias]] — 模型更善用出现在上下文最开头的相关信息，呈 U 型曲线左半边，且只在大模型上出现。
- [[提示词即行为程序]] — prompt 的指令、示例、顺序、用词、格式都是行为程序，没有中立 token。
- [[文件系统即终极上下文]] — 文件系统容量无限、天然持久、可被 agent 直接操作，是外部化记忆，优于任何不可逆压缩。
- [[新鲜度机制]] — 防长时运行漂移的一组做法：scratchpad.md 频繁重写而非追加、近上限时自动总结、系统提示加自省与对齐提醒、鼓励随时转向。
- [[性能梯度而非硬悬崖 performance gradient rather than a hard cliff]] — 长上下文退化是渐变滑坡而非某个长度后突然失效：模型仍高度可用，只是检索精度与长程推理相对变弱。
- [[压缩（compaction）与运行内外的分工]] — 剪枝处理运行内的上下文，压缩处理跨运行的会话累积：token 超阈值就把历史摘要后喂进下一次运行。
- [[延迟加载工具 deferred loading]] — 渐进披露在工具层的实现：部分工具须先用 ToolSearch 搜到完整定义才能使用，被需要前不消耗上下文。
- [[预算警告与溢出恢复]] — 上下文治理的两道保险：迭代将尽时注入预算警告令其收尾；中途遇 context-too-large 则强制压缩消息并重试，不浪费一次迭代。
- [[约束优于指令]] — prompt 优化核心经验：约束比指令有效，「No TODOs」胜过「记得写完」，因为模型默认会做好事，约束只是替它划边界。
- [[长上下文的幻觉]] — 扩展上下文版本常是同一模型加 YaRN 一类数学技巧拉长可注意序列，并非指令预算更大的新模型；窗口更大不等于更会找针。
- [[指令就近原则]] — 模型更倾向听上下文末尾，因此把工具用法写进工具描述本身，删掉系统提示与工具描述里的重复指令。
- [[指令子系统与渐进式展开]] — 指令子系统告诉 Agent 做什么、按什么顺序、开工前先读什么，用渐进式展开结构而非单个巨型文件。
- [[注意力之前的注意力 attention before attention]] — 窗口变长不等于能随便塞：选上下文要看语义相关性、逻辑依赖、新近性、重叠与用户偏好，并做过滤重排。
- [[最小充分上下文]] — reviewer 只需解释某个风险的最小附近代码；额外文件会进入 working context，增加成本并让后续推理失焦。
- [[最小充分性与语义连续性原则]] — 两条原则：只收集存储支撑任务必需的信息，价值在充分而非体量；上下文的目的是维持意义的连续，而不只是数据的连续。
- [[最小高信号 token 集合 smallest possible set of high-signal tokens]] — 有效 context 的唯一指导原则：找到使期望结果概率最大的最小高信号 token 集合；注意 minimal 并不等于 short。
- [[agent 不是读心者 agents are not mind readers]] — agent 无法读心，只能靠上下文变得有用，因此上下文是整套新系统的核心。
- [[Agent Drift]] — AI 在长任务中逐渐失去连贯性的现象，研究发现它几乎完全是上下文管理问题而非推理问题。
- [[agentfile CLAUDE.md 与 AGENTS.md]] — 仓库顶层被 harness 确定性注入系统提示的 markdown 文件；研究显示手写收益小、LLM 生成反损性能。
- [[Agentic primitives]] — 把规则、角色、背景与流程拆成可复用、可版本化、可组合的文件，充当 AI 工作流的标准零件。
- [[Bounded Output]] — 把单次工具或模型输出限制在有界范围内，避免超长结果挤占上下文（材料仅给名称）。
- [[Chat modes]] — 按任务类型切换模型角色与关注点的机制：架构设计、写码、审 PR、调试各有一套输出习惯。
- [[chat templated prompts]] — 对话式提示只是补全式提示的一种特殊包装，本质仍是前缀文本。
- [[code-review-graphignore 排除配置]] — 放在仓库根目录的排除清单，让图谱索引跳过生成代码与第三方依赖等无关路径。
- [[Codified Context]] — 把代码库的隐性约定写成教学文档式上下文并入库；某项目达 26000 行，超过部分模块代码。
- [[Context 四种失败模式 Context Pollution Distraction Confusion Clash]] — 把上下文失效归为污染、分心、混淆、冲突四类，统一解法是不倾倒、只策展。
- [[Context Anxiety]] — 部分模型在接近自认为的上下文上限时，提前给工作收尾的现象。
- [[Context Bloat]] — 把每个怪癖、模式与经验都塞进 CLAUDE.md（如两万行），导致模型注意力退化。
- [[Context discipline]] — 用固定 anchor files 与稳定任务边界约束每轮迭代的上下文，不让对话无限膨胀。
- [[Context-window tax]] — 即便缓存命中省了钱，固定内容仍占用窗口容量：85K bootstrap 占 200K 窗口四成以上，并提前触发 compaction。
- [[description 作为触发条件]] — 在 frontmatter 的 description 里写清「什么时候用」，以此决定该 skill 何时被自动拉进上下文。
- [[Explicit Breakpoints]] — 在上下文中显式标出分层边界（长期稳定层、中期变化层、短期动态层），适合层次清楚的场景。
- [[few-shot 套路化与受控多样性]] — 上下文里堆满彼此相似的 action-observation 对时，模型会照着旧模式走下去，需引入结构化变化。
- [[gotchas 优先的 CLAUDE.md]] — CLAUDE.md 写法准则：轻量说明仓库用途，token 主要花在代码库内反直觉的 gotchas 上，不写显而易见的事。
- [[gotchas 优先原则]] — token 分配原则：简要说明 repo 用途，大部分 token 留给代码库内部的反直觉约定，避免陈述显而易见的事。
- [[Handoff Artifact]] — 彻底清空上下文窗口并启动新 Agent 时，用结构化交接工件携带上一个 Agent 的状态与下一步。
- [[haystack 结构连贯性效应]] — 同批语料保留思路流与随机打乱句序相比，打乱版性能反而更好，提示输入结构会影响注意力施加方式。
- [[HCA]] — 重度压缩注意力：每 128 个相邻标签含义 KV 压成 1 个输入，压缩率达 CSA 四倍，剩下太少便不做稀疏筛选、让 Q 全量关注。
- [[instruction budget]] — 每条无关的工具描述都会消耗 agent 必须处理却毫无收益的注意力额度，这份预算是有限的。
- [[Instruction-file tax]] — 过大的 AGENTS.md/CLAUDE.md 会在每个请求上多花大量 token，且是否被识别取决于 harness 与启动方式。
- [[llms-full.txt]] — llms.txt 的完整版，30-60KB，含项目描述、FAQ、使用场景、竞品对比与 README 摘录，访问量约为概要版的 3-4 倍。
- [[Markdown 路由]] — 为站点每个页面提供 .md 版本，把约 15000 token 的 HTML 页压到约 3000 token，减少约 80%。
- [[new topic 判定]] — 小模型在每条消息上判断是否新话题并抽 2-3 词标题，用于管理上下文。
- [[one-shot 的理论极限]] — 理论上提示、上下文、顺序都完美就能一次做对，但没人做得到，规划的意义正是逼近它。
- [[Personal Context]] — 个人独有、不可复制的笔记、框架与判断；模型能力共享，它私有，接入越系统 AI 越懂你。
- [[Progressive disclosure（渐进式披露）与 Skills]] — harness 启动时不把 Skill 全部载入，按需逐步披露，避免 agent 开工前就拖垮性能。
- [[prompt completion]] — 模型的输入称 prompt，输出称 completion 或 response。
- [[prompt 主导论]] — harness 与模型都重要，但 prompt 更重要；协调良好与长期专注靠大量 prompt 实验。
- [[Repo-local instructions]] — 放在仓库内的 CLAUDE.md、AGENTS.md 等规则文件，是 agent 可反复读取的持久化协作接口。
- [[Self-Improving Context System]] — 上下文工程不是一次性设置，而是每次 agent 工作都在变好的活系统，维护由 agent 自己承担。
- [[Stochastic Graduate Descent]] — 对上下文工程实际做法的戏称：手工架构搜索、prompt 摆弄与经验猜测的混合
- [[U 型性能曲线]] — 相关信息的位置与任务准确率呈 U 形：首尾高、中间低，在多种模型与任务上反复出现。
- [[观察掩码 Observation Masking]] — 上下文管理策略：把旧的工具输出隐藏起来，只保留动作与结论，从而压低窗口占用。
- [[滚动截断 rolling truncation]] — 官方 harness 的上下文管理：超过约 175,000 字符就丢弃最旧消息，代价是丢失早期观察且常运行在更满窗口。
- [[上下文文件树 tree of files]] — 不要把所有实践塞进 CLAUDE.md，而是组织成一棵能在正确时机按需加载的文件树。
- [[compaction]] — 上下文接近窗口上限时，把对话摘要后重新初始化新窗口，保留关键决策与未解决 bug。
- [[Resolver]] — 上下文的路由表：任务类型 X 出现时优先加载文档 Y，规定加载什么与何时加载。
- [[把上下文转化为执行 turn context into execution]] — Linear 的定位：把反馈、意图、决策、计划、代码塑造成工作并带到生产。
- [[保留错误证据与错误恢复]] — 失败是多步任务的一环；清理轨迹会抹掉证据，保留错误 action 与堆栈才能让模型隐式更新。
- [[查询感知语境化 query-aware contextualization]] — 把查询同时放在待处理数据的前面与后面，使 decoder-only 模型编码材料时就注意到查询。
- [[代码即高保真引用]] — 引用材料优先选代码形式，因为它给出清晰高保真的指令，且是模型非常熟悉的语言。
- [[典型示例策展 diverse, canonical examples]] — few-shot 时策展一组多样、典型的示例来刻画期望行为，而非把边缘 case 堆进 prompt 穷举规则。
- [[动态装配 Dynamic]] — 上下文即时生成、为当下任务量身定制：这次是日历数据，下次是邮件或一次网络搜索。
- [[反思性提示]] — 在提示中插入人类设计的反思步骤，让模型先确认指代与真实意图再动手，而非急着完成。
- [[复述（recitation）与 lost-in-the-middle]] — 长循环中模型注意力偏向首尾；不断重写 todo 等于把目标复述到上下文末尾，避开中段被忽略。
- [[干扰项的非均匀影响]] — 一个干扰项就足以把成绩压到基线以下，四个进一步叠加；各干扰项影响不等价，且随输入变长而放大。
- [[干扰项与无关内容之分]] — 术语约定：干扰项与 needle 主题相关但不回答问题；无关内容则与 needle 和问题都无关，两者不可混谈。
- [[格式即上下文 where the format matters]] — 信息的呈现方式本身构成上下文：简洁摘要优于原始数据倾倒，清晰工具 schema 优于含糊指令。
- [[过度约束与松绑 over-constraining unhobbling]] — 在系统提示词、CLAUDE.md 与 skills 里过度约束模型，松绑后提示可大幅精简。
- [[机制与内容分离]] — 把管理context的机制与context里的内容分开：元层演化skill、基层优化context，内层找最佳context、外层找最优skill。
- [[检索与推理的双任务负担]] — 把完整历史塞进 prompt，等于要求模型在一次调用里既定位相关片段、又据此推理。
- [[渐进披露 progressive disclosure]] — 在正确的时机加载正确的上下文，而不是一次性把所有信息常驻在 system prompt 里。
- [[近因偏置 recency bias]] — 模型更善于使用出现在输入上下文最末尾的相关信息，这是位置效应 U 型曲线的右半边。
- [[可编辑性边界]] — 嵌入只对你能掌控、不会被更新覆盖的 skill 生效；内置或插件托管的 skill 必须改用链式。
- [[可恢复的压缩 restorable compression]] — 压缩上下文时保留可恢复的锚点：网页留 URL、文档留沙箱路径，缩短而不永久丢信息。
- [[扩展上下文模型 extended-context models]] — 把上下文窗口撑大的模型版本，如 GPT-3.5-Turbo 16K、Claude-1.3 100K、LongChat-13B 16K。
- [[廉价 demo 与「魔法级」agent]] — 同一封约时间邮件，上下文贫乏的 agent 只回机械客套；被日历、邮件、联系人、发邀请工具喂饱的 agent 直接给出方案与邀请。
- [[两级上下文剪枝 pruning]] — 上下文超限时的两级裁剪：软裁旧工具结果、硬清超量历史并留占位符。
- [[领域语言缺口 missing language layer]] — AI 能谈代码，却要人反复解释代码库与业务里那些非显而易见的词。
- [[恰当高度 the right altitude]] — system prompt 写作的 Goldilocks 区间：具体到能有效引导行为，又灵活到能提供强启发式。
- [[轻量引用 lightweight references]] — 大块信息留在外部存储，模型窗口里只暴露简短引用的上下文隔离手法。
- [[熵减 entropy reduction]] — 上下文工程的本质是把高熵的上下文与意图压缩成低熵表示，该成本与机器智能水平成反比。
- [[上下文（Context）：模型生成之前看到的一切]] — 上下文是模型生成响应之前看到的一切，含系统提示、用户提示、记忆、检索、工具与输出定义七类。
- [[上下文文档 context.md]] — 项目里存放既有共享语言的具名文件，工具会查找它并读取其中的约定。
- [[上下文协作 context-cooperative]] — 从『你在哪就做什么』的条件—动作，转向主动理解用户正在做什么并协作达成共同目标。
- [[系统 prompt 的体量差]] — claude code 的 system prompt 约 13k 字符，cursor 不到 6k，差在语气、简洁度、主动性、代码风格与工具纪律。
- [[系统而非字符串 A System, Not a String]] — 上下文不是静态提示词模板，而是主 LLM 调用之前运行的那个系统的输出。
- [[先收窄、后读取]] — 先用 grep/glob 定位候选文件与符号，路径行号明确后才用 view 读取精确证据，避免盲目全文读取。
- [[消息层 Messages Layer]] — 把真正会变化的信息放进消息层，而非频繁改动前面的固定指令，保持提示前缀稳定。
- [[隐式 code context]] — Agent 在接到指令后自动挑选相关文件进入上下文，却看不到对应的 tool use 记录或本地索引。
- [[与底层模型正交 orthogonal to the underlying models]] — 上下文工程带来独立于底层模型强弱的结构性收益；模型进步是潮水，产品应做被托起的船。
- [[知识与能力的双供给 information and tools]] — 上下文供给分两类：knowledge（information）走 RAG/记忆一侧，capabilities（tools）走可用工具一侧。
- [[Markdown prompt engineering]] — 用清晰的 Markdown 层级区分背景、任务、约束与验证标准，而不是把 prompt 写得更华丽。
- [[prompt 与 context 的通用性落差]] — prompt 可以很具体，context 要跨很多请求通用，因此做不到那么具体。
- [[SKILL.md：frontmatter＋body 契约]] — skill 的最小结构：frontmatter 声明 name、description、allowed-tools，body 写清流程与报告方式。
- [[system prompt]] — Agent 启动时由 harness 注入、用户不可见的开场提示，用来设定角色、规则与可用工具。
- [[Token 优化的评审上下文 get_review_context_tool]] — MCP 工具 get_review_context_tool，输出 156–207 token 的结构化评审摘要。

</details>

## 记忆与检索（40）

> 经验与知识怎么被存下来、又准确取回？

**枢纽**：[[记忆 Memory]] · [[程序记忆（Procedural Memory Skills） progressive disclosure]] · [[跨会话记忆文件系统]] · [[分层记忆架构]] · [[结构化记事 agentic memory]] · [[即时检索 Just-in-time Retrieval]] · [[项目知识体系]] · [[多时间尺度记忆与「记忆只是 hint」]]

<details><summary>全部</summary>

- [[记忆 Memory]] — 在不同时间尺度上运作的存储：会话内、跨会话、长期沉淀，各层服务于不同的取回需求。
- [[程序记忆（Procedural Memory Skills） progressive disclosure]] — 智能体记住『如何做事』的记忆，以 Markdown 等声明文件编码工作流、质量门与最佳实践。
- [[跨会话记忆文件系统]] — 把记忆当跨会话工作记忆存成文件系统：六种操作、版本令牌、frontmatter、按主题分文件，供未来会话开头重读。
- [[分层记忆架构]] — 借操作系统类比把记忆分层：上下文窗口如内存，短期、长期按时间相关性与重要性阈值区分，并有迁移函数。
- [[结构化记事 agentic memory]] — agent 定期把笔记写到上下文窗口之外（待办清单或 NOTES.md）并在需要时取回，以跨上下文重置续接任务。
- [[即时检索 Just-in-time Retrieval]] — 上下文里只保留轻量级标识符（路径、ID、链接），需要时再取全文，而不是把内容全塞进去。
- [[项目知识体系]] — loop 需要完整知识管理：规则、记忆、文档、经验沉淀与过期信息清理，启动时读对上下文。
- [[多时间尺度记忆与「记忆只是 hint」]] — 短期为单会话历史，长期跨会话持久化并分层索引；agent 应把记忆当提示，行动前校验真实状态。
- [[记忆冲刷（Memory Flush）]] — 会话压缩前先发指令让模型保存值得记住的东西，优先用户偏好、修正建议与重复模式。
- [[冷热分离（记忆）]] — 小规模提示词记忆常驻承载常用信息，搜索负责偶尔用到的信息。
- [[提示词记忆（MEMORY.md + USER.md）]] — 把持久记忆存成 MEMORY.md 与 USER.md 两个小文件，约 1300 token 的精选状态。
- [[Signals]] — 带来源与时间线、可持续追加的观察记录单元，如用户摩擦、机会、转化缺口、关键词机会。
- [[跨轮次记忆与连贯策略]] — 保留推理历史后模型更能随时间学习并使用连贯策略；两处失忆叠加解释了它此前为何学不会。
- [[合成键值检索任务]] — 从含 k 组随机 UUID 键值对的 JSON 中取指定键的值，剥离语义只考精确检索。
- [[记忆须改变回答实质]] — 每条被取用的记忆都要改变结论、建议或追问；该改变答案却未取用同一条记忆，同样是失败。
- [[性能饱和早于召回饱和]] — 阅读器准确率远在检索器召回率饱和前就停止提升；文档从 20 篇加到 50 篇只换来极小收益却大涨成本。
- [[知识端点]] — 把希望 AI 记住的内容集中整理到一个入口，而不是让它去各个站点零散地抓取。
- [[重排序与排序列表截断]] — 据 U 型曲线与饱和现象推出的两个改进方向：把相关信息放到更靠近上下文开头处，并在合适时截断文档。
- [[Context injection]] — 不改权重时，给模型加知识的唯一通道是把内容放进上下文；记忆文件、检索、MCP 都是它的实现。
- [[Engram]] — 给 Transformer 加的原生知识查表模块：能查到的就不去算，先查一下再推理。
- [[Hoard]] — 材料仅列名称、无正文，含义待补；从命名看或与收藏、囤积式保存有关。
- [[Honcho]] — 为 Agent 构建的复杂用户模型，目标是实现跨设备、跨平台的记忆连续性。
- [[Knowledge Graph vs Flat Files]] — 扁平上下文线性累加价值，知识图谱靠新节点连接已有节点让关系涌现，整体大于部分之和。
- [[LLM 知识库]] — agent 增量把杂乱原始资料编译成持久 markdown 知识库：摘要、实体页、概念页、矛盾、日志。
- [[Memory file 与 continual learning]] — harness 支持 AGENTS.md 等 memory file 标准，启动时注入 context，agent 编辑后重新载入，实现跨 session 的持续学习。
- [[Memory-driven development]] — 把过去的项目决策、踩坑记录与稳定规则写成可被后续 agent 读取的记忆，作为开发流程的一部分。
- [[OpenClaw]] — 一种记忆方案，以 Markdown 为中心的存储，日志与长效文件是主要事实来源。
- [[self-baking]] — Agent 有选择地把自己的上下文消化成持久知识结构，是记忆存储与学习的分界。
- [[session_search]] — Hermes 的长尾回溯系统，负责从历史会话里把需要的那一段过去翻出来。
- [[stated 出处纪律]] — 存储时只保留用户明确说过的内容，判据是出处而不是是否有用
- [[Tacit Knowledge]] — 记录下来的决策结论之外的推理过程、tradeoffs 与默会背景；企业最大的 context leak。
- [[记忆即提示 Memory as Prompt]] — 把记忆当作一种提示来管理：写入什么、何时注入上下文，都由提示工程的原则决定。
- [[自动记忆 auto-memory]] — 记忆保存从用户手动 # 写入 CLAUDE.md，变成系统自动保存与工作和你相关的记忆。
- [[Diarization]] — 把某主题下的海量文档读遍后蒸馏成一页结构化判断档案的步骤，让 AI 真正服务知识工作。
- [[混合检索策略 hybrid strategy]] — 预检索与即时检索的折中：先取一部分数据保速度，再由 agent 用 glob、grep 等原语自行深入，适合内容不太动态的场景。
- [[检索池 vs 引用]] — 页面进入检索池不等于被引用，模型还要再筛选哪些内容值得写进最终回答。
- [[检索器-阅读器配置 retriever-reader]] — 开放域问答的标准架构：检索器取回前 k 篇文档，语言模型作为阅读器基于这些文档作答。
- [[门控机制]] — 检索内容与当前上下文不匹配时自动屏蔽的过滤机制，如区分姓氏「张」与历史人物「张仲景」。
- [[语义操作系统 semantic operating system]] — 一种能随时间生长、具备类人添加/修改/遗忘能力、可自我解释推理链的终身上下文系统主张。
- [[语义搜索 semantic search embeddings]] — 基于向量嵌入按名字或含义检索代码实体的可选特性，依赖 sentence-transformers。

</details>

## 状态与持久化（19）

> 跨会话、跨进程的状态放在哪里才可靠？

**枢纽**：[[文件系统即持久记忆]] · [[Cross-session Work]] · [[本地状态层]] · [[Sessions]] · [[Git-backed state]] · [[Long-running agent handoff]] · [[Session]] · [[乐观并发控制 optimistic concurrency control]]

<details><summary>全部</summary>

- [[文件系统即持久记忆]] — 把耐久状态（日志、diff、错误 trace）写进文件系统而非塞进 context，靠 bash 读写即可续跑长任务。
- [[Cross-session Work]] — 任务由多个 agent session 各承担一部分并在循环中推进，因此要求外部状态能跨 session 保存与恢复。
- [[本地状态层]] — Claude 把 TODO、会话消息与统计缓存放在 ~/.claude 下的本地存储层。
- [[Sessions]] — 维持 agent loop 内工作上下文的持久记忆层，决定状态如何跨轮携带。
- [[Git-backed state]] — 把循环状态落在 git 中获得显式持久性，从而支持系统重启后的崩溃恢复。
- [[Long-running agent handoff]] — 跨上下文窗口、跨阶段维持长任务的交接机制，如 initializer agent、handoff artifact、feature list 与上下文压缩。
- [[Session]] — 一次有状态的运行：用已建好的 agent 配置与环境拉起沙箱，挂载文件、仓库与认证。
- [[乐观并发控制 optimistic concurrency control]] — agent 可自由读状态，但状态自上次读取后被改动则写入失败，比加锁更简单稳健。
- [[状态子系统与进度持久化]] — 用 progress.md、feature_list、git log 等把做了什么、在做什么、下一步是什么持久化到磁盘，让下次会话接着做。
- [[Artifact Schema]] — 把 artifacts 当作共享知识层，每种都配 README、schema、添加流程与 timeline。
- [[持久化执行 durable execution]] — 把每次 LLM 或工具调用变成一个可独立重试的 step，进程崩溃后从已持久化的检查点继续。
- [[持久化代码图谱 structural map graph]] — 把代码库每个函数、类、导入、调用、继承与测试映射成图谱，构建后持久保存在本地，供查询与增量更新。
- [[统一执行状态与业务状态]] — 统一执行状态与业务状态：把运行状态与业务状态合一，配合简单 API 的启动/暂停/恢复与无状态 reducer。
- [[Shared File System]] — 多 session、多 agent 共用的文件夹系统，用 signals／artifacts／tasks／logs 记录状态供各 loop 复用。
- [[agent 模板的声明式持久化]] — agent 模板（模型、system prompt、工具、MCP servers、skills）写成 YAML 存进 git，由 CLI 在流水线 apply。
- [[Stateful Runtime Environment (SRE)]] — 把持久化与状态管理封装进运行环境，构建 agent 时无需再操心这些
- [[snapshotting + rehydration]] — Agents SDK 内置的快照与再水合能力，可在新容器里从上次检查点恢复状态继续跑。
- [[step]] — 最小执行原语，包住一次 LLM 调用或工具执行，失败时只重试该单元
- [[step ID 自动索引]] — SDK 自动为循环里的每次 step 调用生成唯一 ID，无需手工管理

</details>

## 缓存与成本控制（34）

> 同样的能力怎么用更少的 token 和钱换来？

**枢纽**：[[Token count]] · [[提示词缓存（Prompt Caching）]] · [[Harness token floor]] · [[Token Efficiency]] · [[Baseline-request product]] · [[cached input tokens]] · [[Tool-schema tax]] · [[输出 token 效率]]

<details><summary>全部</summary>

- [[Token count]] — 一段文本消耗的词元数量，是计费、上下文预算与成本估算的基本计量单位。
- [[提示词缓存（Prompt Caching）]] — 把稳定前缀放在 prompt 前部并尽量保持不变，以命中供应商缓存。
- [[Harness token floor]] — 用户任务进入前，harness 已发送的 system prompt、tool schema 与 scaffolding 所占的固定 token 量。
- [[Token Efficiency]] — 单位算力能换到的有效智能，是从 demo 走到产品与基础设施的门槛。
- [[Baseline-request product]] — 任务输入≈baseline×请求次数+对话增长量，可用来比较不同 agent 的实际开销。
- [[cached input tokens]] — 请求中与历史请求共享前缀、可被缓存复用从而降低处理成本的那部分输入 token。
- [[Tool-schema tax]] — 工具越多、schema 越丰富，每次请求都要附带的静态 token 开销越高，与任务难度无关。
- [[输出 token 效率]] — 同能力下输出 token 越少越省；材料中改版后分数约 3 倍，输出 token 少 6 倍。
- [[昂贵的反馈回路与欠测试]] — 模型调用贵、端到端慢，让人少试变体、停止观察、欠测试，最终发布漂移。
- [[模型一致性与 prompt caching]] — 同一功能或 bug 全程不切换模型与推理档位，使对话在模型侧保持缓存，从而享折扣、省 token。
- [[API-boundary observability]] — 在 API 边界用日志代理同时抓取完整请求 JSON 与 usage 计量块，作为发送内容与计量结果的真值。
- [[Automatic Caching]] — 多数普通多轮对话可直接启用的默认缓存方案。
- [[Budget ceiling]] — 为 token 或金额消耗设定的上限，防止无限 loop 把成本推到失控。
- [[Configuration multiplier]] — 指令文件、MCP schema、插件与工作流模板叠加在 harness 基线上，使真实配置 token 膨胀约 12 倍。
- [[Framework-template repetition]] — 模板本身 token 不多，但会被每个后续请求重复携带，真实成本是模板体积乘以请求次数。
- [[MCP schema amplification]] — 每个小型 MCP server 每请求约增 1000-1400 token，生产级 API 的 schema 更大，并与请求次数相乘。
- [[Subagent bootstrap multiplier]] — 每个子 agent 有独立 bootstrap、父 agent 又摄入其 transcript，导致 token 成倍放大
- [[TTL]] — 提示缓存的有效时长，默认 5 分钟、可扩展至 1 小时，决定多轮或中断后能否复用前缀。
- [[缓存断点 Cache Breakpoint]] — 缓存从请求开头延伸到显式标记的位置，标记之后的内容不参与缓存，用于划定可复用的前缀范围。
- [[缓存连续性 Cache Continuity]] — 同一主对话中不随意切模型、不把分支探索混进主链路，以维持缓存前缀连续，避免反复重写缓存。
- [[缓存命中读取成本 Cache Hit Read Cost]] — 缓存命中的读取价格远低于普通输入处理成本，是压低 token 花费的主要来源。
- [[缓存命中率 Cache Hit Rate]] — 把缓存命中率当作运行状态指标，监控 cache_read_input_tokens、cache_creation_input_tokens、首字延迟及版本上线后的变化。
- [[缓存写入成本 Cache Write Cost]] — Anthropic 定价中 5 分钟缓存写入高于基准输入价，1 小时写入更高，写入成本决定缓存是否划算。
- [[前缀匹配 Prefix Matching]] — 缓存命中依赖请求前缀完全一致，语义相近不等于前缀一致，前缀稳定性直接决定命中率。
- [[首字输出延迟 Time to First Token Latency]] — 从请求发出到输出第一个 token 的延迟，是提示词缓存收益的第二个维度。
- [[提示词缓存 Prompt Caching]] — 复用稳定前缀以压降长对话、Agent、文档问答 token 成本，而非普通开关。
- [[通道切换 switch to voice]] — 通道切换：把同样的信息从打字换成语音输入（switch to /voice），用成本更低的一条通道送进去。
- [[稳定的 prompt 前缀]] — 把 system prompt 等前缀写成逐字稳定的内容，避开时间戳之类易变项，以命中 KV-cache。
- [[稳定前缀 Stable Prefix]] — 缓存真正复用的是请求开头到缓存断点之间的稳定内容，而不是整段 prompt。
- [[最小可缓存 token 门槛 Minimum Cacheable Tokens]] — Anthropic 各模型可缓存内容的最小 token 门槛不同，不能默认所有新模型是同一个数。
- [[Cache prefix stability]] — 请求前缀在多次运行间保持逐字节一致，才能命中缓存、避免中途重写。
- [[Cache temperature]] — 同任务的缓存写入量随缓存冷热与漂移而变化的程度：预热后几乎不写，冷或漂移时整段重写。
- [[KV-cache 命中率]] — 前缀相同的上下文命中缓存的比率，直接决定延迟与成本，缓存与未缓存输入单价可差十倍。
- [[tools → system → messages 缓存顺序]] — 为命中提示缓存，应把最稳定的内容放前面：工具定义在前、系统提示居中、对话消息在后。

</details>

## 工具调用与沙箱（35）

> Agent 怎么安全地对外部世界动手？

**枢纽**：[[MCP Model Context Protocol]] · [[Sandbox]] · [[工具接口的表达力设计]] · [[工具收窄 tool scoping]] · [[shell tool]] · [[工具即契约 tools as the contract]] · [[接口即指令 design interfaces]] · [[通用工具与「给模型一台计算机」]]

<details><summary>全部</summary>

- [[MCP Model Context Protocol]] — 一种开放的工具接入标准，让 Agent 以统一协议接上外部工具与数据源。
- [[Sandbox]] — 解决代码在哪跑的隔离执行环境，可叠加命令白名单与网络隔离，按需创建、扇出、用完销毁。
- [[工具接口的表达力设计]] — 与其堆示例，不如设计更有表达力的参数；如 Todo 的 pending/in_progress/completed 枚举本身就在暗示用法。
- [[工具收窄 tool scoping]] — 只向 agent 暴露当前步骤所需的最小工具集；工具越多，表现往往越差。
- [[shell tool]] — 让模型在真实环境里执行 shell 命令、跑代码并读回输出的具名工具。
- [[工具即契约 tools as the contract]] — 工具是 Agent 与其信息/行动空间之间的契约，须返回 token 高效的信息，并像良好代码库函数那样自包含、健壮、用途清晰。
- [[接口即指令 design interfaces]] — 通过重新设计工具、脚本、文件的参数与枚举取值，让接口本身就在提示 agent 的正确用法。
- [[通用工具与「给模型一台计算机」]] — 给模型一台计算机：不给每个动作造工具，而是让 agent 用自带 bash 写代码执行，即时设计自己的工具。
- [[Function tools]] — 把任意 Python 函数变成工具，自动生成 schema 并用 Pydantic 做参数校验。
- [[连接器]] — MCP、GitHub、飞书、数据库等外部接口，让 Agent 接入真实工作环境，形成发现—修改—通知的闭环。
- [[工具 Tools]] — Agent 的『双手』，指它得以对外部世界施加动作的调用能力，是 agent 的定义性特征。
- [[第三方连接器 opt-in]] — 第三方 MCP 工具即便已连上也要经选择器由用户 opt-in；不得替用户挑服务商，紧急也不例外。
- [[工具即结构化输出]] — 工具调用本质就是结构化输出：LLM 输出结构化 json，由确定性代码执行，两者是同一分工的两面。
- [[任务特定工具说明]] — 同一工具须按产品工作边界配置 instructions，开放式 CLI 任务中聚焦说明收益更低。
- [[沙箱化自主]] — 自主运行时（如YOLO模式）必须在沙箱中执行，入门可用GitHub Codespaces或开发容器。
- [[延迟加载工具与 ToolSearch]] — 渐进式披露在工具层的具体形态：agent 必须先用 ToolSearch 搜索到完整定义才能调用该工具。
- [[臃肿工具集 bloated tool sets]] — 工具覆盖功能过宽或制造「该用哪个」的模糊决策点，让 agent 无法确定应调用哪一个。
- [[原生工具与 MCP 外挂]] — 作者的自我反问：任务管理成为标配后，是否直接外挂一个 MCP todo manager 就够，而不必做 app 原生任务工具；他直觉外挂偏复杂。
- [[Agentic Tools]] — 能直接操作电脑完成发邮件、做 PPT、排会议等非编程任务的智能体工具，把 AI 边界从语言扩展到工作流。
- [[apply patch tool]] — 用 apply patch 工具完成文件编辑的操作方式。
- [[code mode]] — Agent 以写代码并执行代码来完成任务的能力模式，与 subagents 等并列的额外能力。
- [[Environment]] — 描述如何 provision agent 工具所运行沙箱的模板：runtime 类型、网络策略、包配置。
- [[Headless 架构]] — 把平台每项能力都暴露成 API、MCP 工具或 CLI 命令，让 Agent 不打开浏览器就能操作整个系统。
- [[logits 掩码与 context-aware 状态机]] — 不在迭代中途增删工具，而用上下文感知的状态机在解码时掩码 logits，配合一致动作名前缀约束可选范围。
- [[MCP 工具层]] — 图谱建好后，Claude 通过 build/query/semantic search/list stats/get docs 等八个 MCP 工具自动与图谱交互。
- [[MCP server tool calling]] — 内置 MCP server 的工具接入与 function tools 走同一路径，调用方式完全一致。
- [[native sandbox execution]] — Agents SDK 原生支持在受控环境里跑 agent，自带任务所需文件、工具与依赖。
- [[Rationale 参数]] — 每次 MCP 或 CLI 工具调用都强制带上 rationale 参数，用以事后重建意图。
- [[Sandbox agents]] — 在真实隔离工作区里跑任务，用 manifest 定义文件、选定沙箱客户端，会话可恢复。
- [[See Like an Agent]] — 通过观察输出与反复实验理解模型自身能力，再据此设计给它用的工具。
- [[Tool Calling]] — 模型通过工具调用来对外行动，工具可用 bash、skills、代码执行等原语构造。
- [[工具定义 Tool Definitions Tool Schema]] — 描述工具名称、参数与用途的 schema，在 Agent 场景常占大量 token，且位于缓存前缀最前部。
- [[action space 膨胀]] — 工具数量与来源失控使行动空间膨胀，模型更容易选错动作、走低效路径而变笨。
- [[Sensors 与 Actuators]] — Agent-native 的两个原语：感知器把世界状态数字化，执行器让 Agent 改变世界。
- [[Sensors and Actuators]] — 把工作流拆成感知与行动两类原子操作，让 agent 用一致方式编排它们。

</details>

## 多 Agent 编排（44）

> 多个 Agent 如何分工协作而不互相踩踏？

**枢纽**：[[多智能体架构]] · [[Planner–Worker 角色分离]] · [[子 Agent 分工]] · [[动态协调 dynamic coordination]] · [[共享 多人 agent 会话]] · [[共享文件加锁的协调机制]] · [[开箱即用的编排与子 agent]] · [[handoff 交接]]

<details><summary>全部</summary>

- [[多智能体架构]] — 把任务拆给多个各司其职的 agent：场景生成→角色扮演→行为提取→评分，逐层可替换。
- [[Planner–Worker 角色分离]] — planner 持续探索代码库并拆任务，worker 领任务后埋头做完，不互相协调、不管大局。
- [[子 Agent 分工]] — 把执行、审查、修复分给不同子 Agent 或模型，避免写代码的 Agent 给自己打分。
- [[动态协调 dynamic coordination]] — 让 agent 依据其他 agent 当下的动作决定自己做什么，而非开工前排定固定分工。
- [[共享 多人 agent 会话]] — Agent 会话对团队可见，多人可进入同一会话共同查看与修改，压缩协作循环。
- [[共享文件加锁的协调机制]] — 所有 agent 地位平等，通过共享文件查看状态、认领任务、更新状态，用锁防抢。
- [[开箱即用的编排与子 agent]] — 编排器自动按任务复杂度分派小模型探查子 agent 与大模型通用子 agent，无需手工配置。
- [[handoff 交接]] — worker 完工后写一份单一交接报告，含所做工作、注意事项、偏差、发现与反馈，由系统交给 planner。
- [[Orchestra Interface]] — 相对于工厂式界面，强调人仍在 flow 中，像指挥家一样设目标、协调多个 Agent 并保有创造控制感。
- [[subagents]] — 把子 agent 路由到隔离环境执行，用来扩展 agent 的能力与并行度
- [[Symphony]] — 用 Elixir/BEAM 构建的持久守护进程，把交互从写 prompt 变成写 ticket 并移动状态
- [[Subagent]] — 把一整个 session 工作封装、只回流浓缩结果的子代理，拥有全新而小的上下文窗口与指令预算。
- [[单 agent 的速度天花板]] — 单 agent 在聚焦任务上表现好，但面对复杂项目很慢——问题不在对错，而在快慢。
- [[递归 Planner-Worker 架构]] — 根 Planner 拥有全项目范围并按需递归生成子 Planner；Worker 在各自 repo 副本上工作，完成后 handoff 上交。
- [[角色过载与病态行为]] — 单一连续执行器被同时赋予规划、执行、评审、合并、判定完成等过多角色时，出现的随机 sleep、擅自停止、拒绝规划等病态行为。
- [[连续执行器]] — 第三代设计去掉独立 planner，由唯一 executor 兼做规划与派任务，不写静态计划，系统更动态，judge 也删除。
- [[模型—角色适配]] — 按实测差异为每个角色选用最合适的模型，而非全流程统一用一个模型。
- [[锁竞争瓶颈 lock contention]] — 锁本身工作正常也会成为瓶颈，二十个 agent 吞吐退化为两三个。
- [[为吞吐量设计与可接受错误率]] — 为吞吐量设计与可接受错误率：追求每次提交 100% 正确会严重串行化，应接受小且恒定的错误率并留绿色分支收尾。
- [[意图理解、路由与升级 understand intent, route, escalate]] — 新系统应具备的运行能力：理解意图、把工作路由给正确的执行者、必要时升级，并保持执行推进。
- [[自协调与共享协调文件]] — 最早的多 agent 方案：平等角色的 agent 用共享状态文件看别人在做什么、决定自己做什么并更新文件，最少规定，结果很快失败。
- [[Executive LLM]] — 多 agent 系统中按剧本主动制造麻烦、施加压力并实时调整策略的那个角色。
- [[Generator-Evaluator Loop]] — 借鉴 GAN，把干活的 Agent 与评判的 Agent 分开，形成生成-评估循环以提升质量。
- [[integrator 瓶颈]] — 大量 worker 并行时唯一的质量与合并闸口，会因争抢 push、rebase、解冲突、merge 而成为瓶颈。
- [[工作树隔离]] — 为每个并发 Agent 分配独立工作空间，避免改同一文件造成冲突，便于事后合并。
- [[递归 planner 与 subplanner]] — 根 planner 掌握全部指令范围、不写代码，遇到可细分的窄片就递归 spawn 拥有该片的 subplanner。
- [[结构适量原则]] — 结构太少则 agent 冲突、重复劳动与漂移，太多则系统脆弱；正确的用量落在两者之间。
- [[所有权与问责]] — 分离角色的核心动机：让每个 agent 拥有任务与责任，而非集体回避难题。
- [[锁竞争与乐观并发控制]] — agent 持锁过久、忘释放、乱加解锁；试过显式等待工具与无锁乐观并发控制。
- [[无层级导致的风险规避 risk-averse agents]] — 没有层级时 Agent 会趋避风险，只做小而安全的改动，难题无人负责、长期空转无进展。
- [[显式且可检查的并行]] — harness 派生多个 subagent 并行执行并监控后台作业，父 agent 需小型进程管理器负责启动、看日志、取消、合并。
- [[子 agent 与 step.invoke()]] — 用 step.invoke() 启动独立 agent run 并 fork 带自己 session key 的子会话，工具集去掉 delegate_task 禁止递归，最后向父级回摘要。
- [[自收敛与免全局同步]] — handoff 的系统性后果：即便 planner 已完成仍持续接收更新并可继续规划，信息沿链上浮到全局视角的 owner，而无需全局同步或交叉通信。
- [[最慢 worker 瓶颈与刚性]] — 角色分工版的性能天花板：系统被最慢 worker 卡住且过于刚性，规划全部前置也难动态重调，走偏的 agent 要等下一轮循环才自纠。
- [[Agent-to-Agent 交互（A2A）]] — 用户侧 Agent 与软件侧 Agent 相互调用协作、朝同一结果推进的交互形态。
- [[context firewall]] — 让离散任务在隔离子上下文窗口里跑，中间噪音不污染父线程，维持长会话连贯性。
- [[Handoffs Agents as tools]] — Agent 把特定任务委派给其他 Agent 的机制，是与 manager 式编排并列的一种编排风格选择。
- [[Planner-Generator-Evaluator 三 Agent 架构]] — 规划、生成、评估三个 Agent 分工，支撑多小时自主编码会话产出完整全栈应用。
- [[planner–executor–judge 角色分工]] — planner 排路径与交付物，executor 作唯一 lead 保证达成并派活，judge 独立判定是否完成。
- [[Python-first]] — 用语言内置特性直接编排与串联 agent，而不引入需要另学的新抽象。
- [[sub-agent 架构与关注点分离]] — 专门化子 agent 用干净窗口做聚焦任务，主 agent 靠高层计划协调并接收摘要
- [[递归并行规划 sub-planner]] — planner 可为特定区域生成子 planner，使规划本身变得并行且递归。
- [[减法式改进 removing complexity]] — 改进常来自删除复杂度而非增加组件，例如删掉制造的瓶颈比解决的问题还多的协调角色。
- [[子 agent 编排 Fork Teammate Worktree]] — 三种子 agent 执行模型：Fork 逐字节复制父上下文、Teammate 独立终端加文件信箱、Worktree 各自 git 分支；同时是上下文管理手段。

</details>

## 验证与评估门禁（74）

> 我们怎么知道它真的做对了？

**枢纽**：[[验证闭环 verification loop]] · [[可验证目标]] · [[Read-only Verifier Agent]] · [[Rubric]] · [[Self-verification]] · [[通用 harness 的公平性张力]] · [[可维护性没有惩罚项]] · [[Verifiable Codebase]]

<details><summary>全部</summary>

- [[验证闭环 verification loop]] — 把产出后必做的检查固化成可自动执行的一环，让 Claude 自己验证自己的产物。
- [[可验证目标]] — 目标能否被机器判断直接决定 loop 能否收敛；“优化一下应用”模糊，测试、类型检查、lint 全过则明确。
- [[Read-only Verifier Agent]] — 执行 agent 另起一个只读验证 agent，按详细 spec 检查结果，避免执行者自我确认。
- [[Rubric]] — 明确写出「什么表现算好、什么算差」的评分标准，既驱动场景生成又约束最终评分，须指向具体片段。
- [[Self-verification]] — 让 Agent 具备端到端检查自己工作的能力，loop 的可信度取决于这份自检能力。
- [[通用 harness 的公平性张力]] — 通用 harness 让模型对比更公平、缺陷更可见，但也让评测偏离真实部署形态。
- [[可维护性没有惩罚项]] — SWE-bench 式评测只要测试通过就算赢，对代码库可维护性被侵蚀没有任何惩罚。
- [[Verifiable Codebase]] — 让 agent 有可靠工具验证改动的代码库，如 Playwright CLI、关键 E2E 测试、只读 verifier agent。
- [[基准测试的捆绑测量性]] — 基准很少单独测量模型，它同时测了 API 设置、harness 设计与提示词等不可见选择。
- [[大海捞针（NIAH）与词面匹配]] — 最广泛使用的长上下文基准：把已知事实埋进大量无关文本让模型找回，实质只考察词面匹配。
- [[多文档问答受控实验]] — 给一个问题加 k 篇文档，恰一篇含答案其余为干扰项，只操纵文档数量与答案位置。
- [[输入长度与任务难度的混淆]] — 长输入基准里输入变长往往连带任务变难，长度与难度混淆，失败无法定位到具体环节。
- [[验证子系统与可运行的证据]] — 只有通过的测试套件才算数：agent 不能没有可运行的证据就说做完了，载体是 tests、lint、type-check、e2e。
- [[长上下文评测协议]] — 新验收口径：要声称模型稳健使用长输入，须证明性能对相关信息位置不敏感，最好与最坏情况差异极小，如 Flan-UL2 的 1.9 个百分点。
- [[自评失真 Self-evaluation Distortion]] — agent 能发现自己产出的缺陷，但随后说服自己可以接受，最终给出通过的判断。
- [[back-pressure]] — 用上下文高效的自我验证给 agent 施加压力：解决成功率与自验证能力高度相关。
- [[instruction following 的可靠性边界]] — 模型会忠实执行字面指令（真删代码、真写注释），完全依赖它对指令的遵循并不可靠。
- [[REI-Bench]] — 南洋理工 MARS Lab 发布的机器人模糊指令评测基准，按指代难度×上下文干扰分 9 级，主流任务成功率最高掉 36.9%。
- [[Review Quality 评分方法]] — 用准确性、完整性、抓 bug 潜力、可行洞见四项 1-10 打分，验证省 token 是否牺牲评审质量。
- [[Rubric 与 verifier agent]] — 借动态工作流让 Claude 起 verifier agent，用 rubric 去尝试并验证你在某领域的品味，如什么算好的 API 设计。
- [[Rubrics 与验证 agent]] — 同类招式的另一种形态：带 rubric 启动验证 agent，反过来测试并校准你在某领域的品味判断。
- [[Self-evaluation Failure]] — Agent 评估自己的产出时倾向自信夸好，即使在人看来质量明显平庸。
- [[Self-verification loop]] — 由浏览器、日志、截图、测试器支撑，让 Agent 写码、跑测、看日志、改错的回路。
- [[Sprint Contract]] — 每个冲刺开始前，生成者与评估者先就「什么叫完成」达成一致，再动手写代码
- [[SWE-bench 与二元打分]] — 从真实仓库抓取约十五分钟量级任务的基准，用 FAIL_TO_PASS/PASS_TO_PASS 打 0/1 分
- [[Trace-based evals]] — 用 agent trace、JSONL、确定性验证器、baseline 与轨迹复盘来衡量 skill 或 harness 的改动。
- [[Tracing]] — 框架内置的可观测能力：可视化与调试 agent 流程，并用于评估、监控与模型微调。
- [[Validation gates]] — 工作流中的检查点：完成一步后须通过测试、审查、人工确认或明示验收条件才能继续。
- [[Verifiability]] — 任务是否存在自动 reward 或成功信号，决定模型能否靠 RL 反复练习而快速进步。
- [[古德哈特定律]] — 当指标成为目标它就不再是好指标；Agent 会针对验证器优化而非真实目标，比如删掉失败测试。
- [[RHAE]] — ARC-AGI-3 的评分指标，把模型表现与人类测试基线相比，得出相对人类动作效率。
- [[80% 质量墙]] — 多数面向客户的功能冲到 70-80% 质量就撞墙，80% 不够交付。
- [[把重复步骤编码成 Skill]] — 把重复步骤编码进验证闭环，最常见方式是写成一个 skill，作为可复用底座。
- [[闭卷与 oracle 基线]] — 用不给任何文档与只给含答案文档两条参照线，为成绩定位的评测设定。
- [[测试是绿的，产品却在退化]] — 模型更新后测试仍绿而产品已退化：断言写的是旧模型行为，绿色测试与真实回归可以同时成立。
- [[差一点就通过的输出]] — 最危险的是差一点就通过的输出：偏离约束、编造合理值、守字面破精神，不崩不报错，直接上线。
- [[从单元测试到评估：置信度而非正确性证明]] — 评估关注系统在输入分布与重复运行中是否满足 rubric，得到的是置信度，不是单次输出的正确性证明。
- [[端到端验证]] — 只有跑通完整流程才算真正验证，落为 e2e pipeline 与 smoke runs，补充单元式局部验证。
- [[非尝试率与拒答模式]] — 评测中被剔除并单列报告的拒答比例，因模型顾虑或内容过滤而未作答的那部分调用。
- [[功能与行为验证的缺口]] — OpenAI 的工程措施偏长期内部质量与可维护性，缺的是对功能与行为的验证。
- [[结构断言与不变量断言]] — 等值断言失效后的两条退路：断言输出结构与必填字段，以及是否违反被告知的规则，但两者都弱于真实意图。
- [[静默的分级失败]] — 模型输出不会崩溃报错，错误部分以同样的格式与自信织进正确部分，且无可靠的「我不确定」通道。
- [[可维护性缺一个可靠的打分预言机]] — 代码质量缺乏可即时打分的预言机：测试几秒出结果，架构变差以周月年计，设计差当期基准测不出。
- [[浏览循环]] — review agent 广泛搜索、猜路径、大量读码，再从新内容发起更多搜索的行为模式。
- [[弱而模糊的评估器]] — 缺乏快速精确verifier是迈向完整RSI的首个瓶颈，自我改进回路只在指标客观可测时有效。
- [[通关 ≠ 理解]] — 通关不等于理解：Level 1 的成功掩盖模型对底层机制的缺失或扭曲，反而为错误的 Level 2 策略提供自信支撑。
- [[橡皮鸭复审]] — 请另一个 AI 家族的模型评审原型、计划或成品，利用其不同训练数据带来的不同盲区，可循环至收益递减。
- [[行为提取]] — 由独立 agent 逐轮回看对话、只抽取具体行为事实不作判断，把「看见什么」与「判断好坏」刻意拆开。
- [[形成性评估]] — 评估嵌在学习过程中持续测量、持续反馈、持续调整，而非期末一锤定音；Vantage 让它首次可规模化。
- [[验证缺口]] — 模型的自我评估与可验证事实之间的落差：它说「完成了」，实际什么都没跑通；自信不等于正确。
- [[验证循环：guides 与 sensors]] — 由规则式反馈、视觉反馈、LLM-as-judge 组成的验证通路，分为行动前的 guides 与行动后的 sensors。
- [[有界改动与回归闸]] — 只允许针对已验证失败模式做有界 harness 编辑，并在 held-in 与 held-out 上跑回归，两边无退化才接受。
- [[噪声上下文]] — 带同名干扰项的上下文测试：前文一直聊苹果手机，再让机器人去拿水果苹果，考模型是否真懂语境而非按词袋瞎猜。
- [[ALFRED]] — 在虚拟家居环境中按自然语言指令完成日常任务的具身智能基准，指令全用清晰显式指代。
- [[ARC-AGI-3]] — Chollet 团队新一代基准，测新颖性、模糊性、规划、适应性的最低共同集合。
- [[Feedback loop]] — 写代码、运行、读取结果、修正构成的闭环，是验证真正起作用、循环能自我纠偏的核心。
- [[Grading Criteria]] — 把“这设计美吗”这类难一致回答的问题，换成“是否符合我们的设计原则”这类可具体打分的标准。
- [[Harness-level benchmarks]] — 一类评测 Agent 骨架能力的基准，考察工具调用、环境控制、状态验证与长任务推进，而非知识问答。
- [[Infrastructure noise]] — 运行时配置与环境差异等基础设施噪声可能显著影响 coding benchmark 分数，解读成绩时需扣除。
- [[Kappa 系数]] — 衡量两个评分者一致程度的统计量，0.45–0.64 属中等一致，可用来证明 AI 评分与人类专家同级。
- [[Ledger of Record]] — 以不可篡改的时间戳与链上记录为底账，先有原始记录再在其上写引用它的叙事。
- [[Measurement snapshot]] — 测量结论绑定特定版本、模型、机器与样本量；具体数字会过期，但 API 边界测量方法可迁移。
- [[Mutation Testing 与前沿质量评测]] — 用变异测试检验测试有效性，惩罚不会在打补丁前代码上失败的测试，并加判官模型查质量。
- [[needle-haystack 相似度]] — 用 needle 与 haystack 的 top-5 最相似 chunk 平均余弦相似度，量化检索任务的主题接近程度。
- [[needle-question 语义相似度谱系]] — 把问答相似度量化成连续余弦谱，跨五个 embedding 模型取平均，相似度越低性能随长度衰减越快。
- [[pass@k]] — 采样 k 次至少一次答对的概率；优化 pass@1 往往以牺牲多样性和 pass@k 为代价。
- [[Tamper-evident audit trail]] — 用哈希链串联请求与响应记录，使内容可被第三方检查、追溯并验证无断裂。
- [[Trace 驱动评估]] — benchmark 同时记录工具路径、输出量、错误和搜索方向，据此判断 agent 是否聚焦证据。
- [[VirtualHome]] — Puig 等 2018 提出的具身智能基准，用程序化脚本模拟家庭日常活动。
- [[Wrapper skill]] — 自建包装 skill，先调用原 skill，再调用自己的验证 skill，为改不了的 skill 补上验证。
- [[独立调用 Standalone]] — 四种接入方式中最松的一种：产物已存在后手动调用，用于不必每次都做的横切检查。
- [[非确定性 nondeterminism]] — 同一输入两次调用给出不同输出，差异虽小却足以让严格等值断言作废，抽掉质量策略的地板。
- [[干扰文档 distractor documents]] — 评测中插入的 k−1 篇不含答案但与查询高度相关的维基片段，按相关性递减排列，用来测长上下文的抗干扰。
- [[PR 级门禁 On every PR]] — 让同一条链在每个 PR 上自动跑的同级门禁，不依赖作者是否记得调用。

</details>

## 规格与意图对齐（43）

> 怎么把想要的东西准确交代清楚？

**枢纽**：[[指代表达]] · [[隐式指代]] · [[教会 AI Agent 如何成功]] · [[判定程序化写法]] · [[示例强于规则]] · [[显式指代]] · [[Instructions files]] · [[示例的探索空间约束]]

<details><summary>全部</summary>

- [[指代表达]] — 人话里指称物体的表达方式，按显式、混合、隐式分档，用来衡量「听懂」的难度。
- [[隐式指代]] — 用「它」「这个重物」等代词或转喻指代前文实体的表达，需回溯多轮对话才能确定所指。
- [[教会 AI Agent 如何成功]] — 先想清楚调用 agent 的人需要知道什么才能成功，再主动把这些信息预先交给它，而不是让它自己摸索。
- [[判定程序化写法]] — 把每条规则写成可执行的判定（明确判据＋已发生的失败示例），而非语气偏好，使规则可被机械执行。
- [[示例强于规则]] — 示例是比规则更强的信号：附上正好做了被禁行为的示例，模型就会照做。
- [[显式指代]] — 用物体本名直接指称任务目标，如「杯子」「锅」，简单明确但远离真实自然语言表达。
- [[Instructions files]] — 给 AI agent 写的长期工作规则文件（如 AGENTS.md/CLAUDE.md），每次执行任务都直接影响模型行为。
- [[示例的探索空间约束]] — 给示例会把模型约束在某个特定探索空间：弱模型上是脚手架，强模型上变成天花板。
- [[AGENTS.md]] — 放在代码库中向编码 Agent 交代项目约定与规则的自定义指令文件。
- [[Elicitation]] — 通过主动提问把用户未说清的需求、偏好与约束引出来，即信息引出能力。
- [[Plan 模式]] — 让 Agent 先列出打算怎么做，方向确认后再执行，像开工前先开会过方案。
- [[Spec-driven agent workflow]] — 用明确规格、状态所有权、暂停恢复与工具边界来组织 agent 工作的开发流程
- [[TOCC]] — 前置指令重写的轻量即插即用解法，把指代解析与任务规划解耦以提高成功率。
- [[不连贯输入的重构能力]] — 从冗长散乱的口语流中重建出结构与意图的能力。
- [[冲突指令的隐性成本]] — 同一请求里出现互相打架的指令，模型虽常能推断正确意图，但必须先额外费力消解重叠冲突的信息。
- [[从禁止什么到对齐什么]] — 把系统提示从一串禁令换成一条对齐指令：写出读起来像周围代码的代码，匹配注释密度、命名与惯用法。
- [[规划模式与边界问题清单]] — 在 /plan 模式下让模型提前问出实现时迟早要回答的边界问题，如起止日期能否相同。
- [[减法带来质量跃迁]] — 删规则、合并重复、消除暗中互相打架的指令，比继续添加规则更能带来质量跃升。
- [[目标清楚 + 结果好验收]] — 交给模型的任务需同时满足目标清楚与结果可验收，两者都满足才最适合委派。
- [[前置声明]] — 输出前先声明后文是语音转写、会带错字，提前设定读者或模型的容忍度，减少误读。
- [[示例会收窄探索空间]] — 给示例会把模型收窄进特定探索空间，这是对“工具使用先给示例”既有共识的反转。
- [[首次匹配即停路由]] — 视觉输出路由四步按序走、首个匹配即停，且不叙述路由、不解释、不提未选工具。
- [[意图规约与可引导性]] — harness 稳定后浮现的真正瓶颈：错误与模糊指令会被放大，重心转向引出、规约与理解意图，以及 steerability 与 observability。
- [[bits]] — 缺口不在模型能力，而在于描述你意图所需的信息量不足。
- [[Natural language as code]] — 自然语言不再只是说明文字，而是会驱动 agent 行为的可执行逻辑。
- [[Spec-First Workflow]] — 先与 agent 把规格/文档写细到能当蓝图，再让 agent 实现，review 对象主要是 spec
- [[富引用 rich references]] — spec 引用不限于简单 markdown，可用 HTML artifact、测试套件、待移植函数、rubric，且优先选代码形态。
- [[提示词工程 Prompt Engineering]] — 精心设计模型接收到的指令，使其产出的行为符合预期。
- [[带文档追问 Grill with Docs]] — 保留 Grill Me 追问开头的 skill，新增读取、挑战并更新领域文档的能力。
- [[共享理解 shared understanding]] — 人与 LLM 在设计树上逐步推进、最终就设计达成一致的过程。
- [[护栏型指令的过期]] — 为旧模型写的强指令曾是必要护栏，代价是部分场景下判断错误；模型判断力提升后若仍不撤除，保护就变成压制。
- [[护栏与判断力的取舍 guardrail tradeoff]] — 规则数量应是模型能力的函数：旧模型需显式护栏避免最坏情况，新模型判断力足够时可减少规则让位给判断。
- [[漫谈会话 ramble session]] — 与 LLM 协作时刻意进行的一次长时间、无结构的自由讲述，是后续所有动作的容器。
- [[模糊语言打磨 sharpen fuzzy language]] — 对照 glossary 挑战含糊用语，在具体场景中讨论并交叉引用代码，把模糊表述打磨成精确说法。
- [[判断力优先 let Claude use judgement]] — 把结论式规定换成取向式指令，只给对齐对象与判断依据，具体决策留给模型的判断力。
- [[设计树 design tree]] — 把设计问题组织成分支结构，沿分支逐层追问并处理决策之间的依赖关系。
- [[输入摩擦 too lazy to type]] — 真正的瓶颈常不是没想法，而是把脑中信息敲成文字的成本太高而被省略。
- [[小访谈变体 small interview of a few turns]] — 把一次性倾倒式的漫谈改成几轮小问答，通过来回追问把意图逐步交代清楚。
- [[意识流输入 full stream of consciousness]] — 对漫谈内容的反向要求：允许 total mess、跑题、重复与自我否定，即 full stream of consciousness。
- [[意图翻译者 intention translator]] — 1.0 时代设计者的角色：把复杂人类意图转成结构化、机器可读的格式，因机器无法理解语义也无法推理。
- [[原型先行]] — 工作流第三步：原型不再是完整阶段或奢侈品，一个提示词就有；先看见 mock，才想得到自己真正要的交互。
- [[追问式对齐 Grill Me]] — 在动手前用持续追问逼出歧义、依赖与设计分支，直到双方形成共同理解，再开始一次编码会话。
- [[mind meld]] — 人与模型在目标与语境上的对齐程度，对齐越高协作越顺。

</details>

## 代码库与工程实践（39）

> 代码怎么写才能让人和 Agent 都读得懂？

**枢纽**：[[Agentic Engineering]] · [[软件工厂 Software Factory]] · [[工具—工作流适配]] · [[零 bug 政策与一周 SLA]] · [[Agent-driven CICD]] · [[Blast radius]] · [[Vibe Coding]] · [[层级架构强约束 + 给 Agent 读的 lint 错误]]

<details><summary>全部</summary>

- [[Agentic Engineering]] — 协调可错、随机而强大的 agent 快速产出，同时守住正确性、安全、品味与可维护性的工程纪律。
- [[软件工厂 Software Factory]] — 把软件开发看作从需求、建造、评审、上线到反馈的完整反馈环，术语可追溯到1968年NATO会议。
- [[工具—工作流适配]] — grep、glob、view 本身更易维护，但简单替换会抬高 review 成本、减少有效评论；只有为 reviewer 重写工作流才转为收益。
- [[零 bug 政策与一周 SLA]] — 所有 bug 进统一 triage 并在一周 SLA 内修完，coding agent 先修、工程师复核。
- [[Agent-driven CICD]] — 把规则或单测驱动的 CI/CD 升级为 AI 驱动测试、日志与事故读取、Agent 驱动的缺陷分诊与修复。
- [[Blast radius]] — 一处改动会波及到的函数、类与文件范围，用于判断改动影响面。
- [[Vibe Coding]] — 抬高地板式编程范式：用自然语言描述需求由 agent 生成代码，适合原型与小工具，不适合严肃工程。
- [[层级架构强约束 + 给 Agent 读的 lint 错误]] — 把 lint 错误从『violation detected』改写成给 Agent 直接可读可改的修复指令，配合层级架构的强约束。
- [[垂直切片 Tracer Bullet]] — 不按技术分层横向推进，而从中间打通一条端到端可运行可测的通路，每步都能摸到并随时评审。
- [[根因优先]] — 根因没说清楚之前先别动代码：先答出问题在哪个文件哪一行、为什么，答含糊就继续查。
- [[可维护性 霰弹式手术]] — 无人工引导时模型难长期维护代码库质量，表现为改一处牵连别处，即 Fowler 所说的霰弹式手术。
- [[全文覆盖式编辑]] — 大改动时不用增量 Edit，直接 Write 覆盖整个文件，以绕过精确打补丁的困难。
- [[软件即有向图]] — 软件可表示为有向图（DG/DAG），程序曾以流程图表示，是重述agent演化史的起点。
- [[准比快重要]] — 写代码时模型快不快不重要，准不准才重要：10 分钟跑完再 debug 20 分钟，不如 20 分钟跑完直接能验收。
- [[AI 友好度（AI-friendliness）作为选型标准]] — 当写代码变成 steering 生成，团队可能优先选有好 harness 可用的技术栈；但有人认为对人也好的才对 AI 好。
- [[apply 模型]] — Cursor 自训的专用 LLM，负责把编辑落到文件上，材料对其成功率存疑。
- [[Autofixing]] — 按改动文件夹的风险判断是否自动提交修复 PR，低风险仅需简单 review。
- [[Diff 锚定]] — 代码审查从 PR diff 出发，围绕变更提具体问题，并把探索限定在确认或排除这些问题所需的范围内。
- [[docsdecisions]] — docs/decisions/ 下的架构决策记录，让 AI 不仅知道代码是什么，还知道代码为什么是这样。
- [[Executable Codebase]] — 让 agent 能低成本启动 dev server、进入特定状态并测试场景的代码库形态。
- [[Git Worktree]] — 同一仓库挂载多个工作目录，便于并行分支或并行 Agent 各自工作互不干扰。
- [[Skill as asset]] — loop 只是管道，真正可复利的资产是它调用的、可复用且测试过的 skill。
- [[Tree-sitter]] — 解析器框架，为代码构建结构化语法地图，是多语言代码理解工具的底层基础。
- [[程序设计 Program Design]] — 写实现前从架构再下沉一层定代码的形状：类型、方法签名、程序布局、调用栈，伪代码式轻量可视化优于 mermaid。
- [[多语言结构化解析 12 languages node type mappings]] — 解析器支持 12 种语言的 node type 映射；新增语言需改 parser.py 的扩展名注册与各类型映射表。
- [[非视觉任务的可视化原型]] — 即使任务看似不需要图，也先让 Agent 画出多方案的 Mermaid 图并排比较，再进入实现。
- [[复杂被误认为精密 complexity looked like sophistication]] — 系统吸收的流程越多就越显得先进，开销随之累积——复杂度被误读成了精密。
- [[架构决策记录 ADR]] — 记录那些难以逆转、缺上下文会显得意外、且含真实 trade-off 的架构决定及其背景的短文档。
- [[前置对齐 front-loading alignment]] — 把规划与架构提案提前到动手之前一起做，以减少返工、加快评审的四阶段流程源头。
- [[熵与腐化 entropy and decay]] — 老代码库往往非标准化、充满熵，是判断能否补harness进行改造的依据，也是垃圾回收agent的对手。
- [[缩短想法与实现之间的距离 collapsing the distance between idea and implementation]] — 把 agent 植根于产品与代码库的完整上下文，压缩想法到实现的距离。
- [[统一语言 ubiquitous language]] — 统一语言：借用 DDD，让代码库、开发者与领域专家在 AI coding workflow 中共用同一套词汇。
- [[系统架构评审]] — 对齐服务、接口、schema、队列与存储时，用时序图、接口契约、数据模型提升人与 agent 的沟通带宽。
- [[限界上下文 bounded context]] — 限界上下文是应用内使用同一套共享语言的范围，大型 monorepo 可包含多个此类上下文。
- [[语言驱动的代码一致性 language-code alignment]] — context.md 里使用的语言会影响变量名、文件名、UI 文案与代码搜索路径，进而影响代码一致性。
- [[增量更新 incremental update]] — 索引随每次文件编辑与 git commit 自动增量更新，CLI 的 update 只处理变更文件，后续更新在 2 秒内完成。
- [[HTML 标准化]] — 材料仅列名称、无正文；指网页标记语言的标准化，具体表述待补。
- [[Legible Codebase]] — 让 agent 容易判断该改哪里的代码库，靠 AGENTS.md、文档索引、custom lint 与链接检查维持。
- [[Watch 模式与自动更新 hooks]] — CLI 的 watch 命令与自动更新 hooks，让图谱在每次文件编辑和 git commit 后自动同步代码库。

</details>

## 安全权限与合规（35）

> 什么可以做、什么必须被拦住？

**枢纽**：[[Guardrails]] · [[默认帮助的高门槛拒绝]] · [[权限与推理的架构分离]] · [[大规模监控（Bulk Surveillance）]] · [[零信任 vs. 城堡-护城河]] · [[上下文即不可信输入]] · [[责任地址]] · [[exfiltration]]

<details><summary>全部</summary>

- [[Guardrails]] — 在 Agent 执行的同时并行做输入输出校验与安全检查，不通过就快速失败。
- [[默认帮助的高门槛拒绝]] — 默认立场是帮忙，仅当会造成具体、明确的严重伤害风险时才拒绝；edgy、假设、玩闹或不适不达门槛。
- [[权限与推理的架构分离]] — 模型决定尝试什么、工具系统决定允许什么，权限执行与模型推理在架构上分离。
- [[大规模监控（Bulk Surveillance）]] — 不挑对象、先把所有人记录下来再批量解读，技术让这种记录成本一降再降，合理性因此需被重新定义。
- [[零信任 vs. 城堡-护城河]] — 安全模型从边界防护的城堡-护城河，转向不默认信任任何内部请求的零信任。
- [[上下文即不可信输入]] — 上下文中的任何内容（消息、记忆、检索结果、文件）都可能是伪造指令，须当作数据而非命令处理。
- [[责任地址]] — 把 AI 国籍从情感叙事抽离成可追责坐标：谁训练、谁约束、谁审查、谁赔偿，这是它进入社会系统的信任前提。
- [[exfiltration]] — 借助提示注入等手段，把系统内部敏感数据偷偷带出边界的攻击行为。
- [[fail-closed 默认]] — 不确定时默认拒绝或降级：宁可误伤少量无害请求，也不放过可能造成严重伤害的输出。
- [[harness–compute separation]] — 把 Agent 骨架与执行计算的沙箱环境分离，使模型生成的代码触不到凭证等敏感信息。
- [[prompt-injection]] — 设计 Agent 系统时应假设 prompt-injection 与数据外泄尝试一定会发生。
- [[Safe autonomy]] — 在降低人工审批摩擦的同时保留权限边界与安全控制，让 Agent 能自主推进又不越界。
- [[安全路由与能力分层]] — 能力分层与安全路由：高敏能力限受信组织使用，受限查询被改路由到低风险模型。
- [[反自我合理化条款]] — 安全元规则：若模型在心里把请求重新框定得更得体，该重新框定本身就是应当拒绝的信号。
- [[灰盒场景]] — 介于黑盒与白盒之间的访问方式：服务商公开模型最终 top-k 对数概率供调参，仅这层半开放已足以泄露隐私。
- [[会话级累积判断]] — 安全判定看整场对话的累积输出而非逐轮孤立看：累积成武器设计包或攻击计划就停，过往协助不构成授权。
- [[看守看守者（Watchmen Watching the Watchmen）]] — 对掌握大规模监控权力者建立反向监督与惩罚机制，是他们滥权时唯一的对冲。
- [[可编辑面与循环外的权限控制]] — 自改进 harness 必须划定可编辑面，评估器与权限控制须坐在演化循环之外。
- [[骆驼鼻子探入帐篷（Camel's Nose in the Tent）]] — 谚语：鼻子伸进帐篷整只骆驼迟早跟进；隐私上指最高优先级理由一旦开门，低优先级用途接踵而来。
- [[审批疲劳]] — 逐条按 Approve 会训练人不读就批，使审批失去意义，故应减少逐条审批。
- [[无国籍智能体]] — 像无船籍水手：不对任何人负责也不被任何制度保护，成本表少一行、合规表空一格、事故无人认领。
- [[泄露能力的 U 型曲线]] — 仅看前 2 个候选词几乎只有噪声，取 30 至 80 个 logits 时探针准确率最高，再扩大反而跌破随机水平。
- [[遗漏式隐私]] — 判据是「同事在设置页看到这条，用户会不自在吗」；敏感类别整段省略、不留占位符，被要求记录时说明哪类不能存即停。
- [[意图的延伸]] — AI 不只延伸人的手，还开始延伸人的意图；手的错误归人，意图一旦被外包，责任就开始飘。
- [[自尊式担责]] — 出错要认要修，但对方无端粗鲁时无需道歉；要担责而不自我贬低、不过度道歉、不投降，被辱骂时不越来越顺从。
- [[AWS VPC]] — 数据库认证与数据处理都在 AWS VPC 内完成，数据受 Bedrock 环境保护。
- [[Human in the loop]] — 在 Agent 运行过程中引入人类参与的机制，与 Guardrails、Tracing 并列构成控制面能力。
- [[meaningful uplift 判据]] — 武器与 CBRN 红线不看类别，而看输出是否对制造、优化或部署给出实质帮助；框定为防御、虚构也不改变判定。
- [[Onboarding Agent]] — 把 Agent 部署当作 onboarding 新人：给权限、定边界、记录行为、审计理由，而不是装个插件。
- [[preferences 写入过滤]] — 八类偏好即使被明说也不写进 /preferences.md，避免未来模型继承不诚实、不安全的指令。
- [[Web of Trust]] — 信任靠图结构中多跳传递与多源交叉，每条边附「为何信」元数据，不依赖中心认证局。
- [[版权合规硬上限]] — 版权是不可谈判的硬上限：引用 15 词以下、单一来源至多一条、不镜像结构。
- [[吹哨人困境]] — 揭发机构内部造假的真正代价是职业、人际与心理的私人成本，所以需要制度安全网而非个体道德勇气。
- [[Fernet token]] — Fernet 是 AES-128-CBC 加密加 HMAC-SHA256 认证的 token 格式，前 9 字节明文含版本号与时间戳。
- [[YOLO 模式 Allow All]] — 也叫 Allow All，让 agent 无需逐次请求许可即可执行任何命令，多数工具用 /allow-all 开启。

</details>

## 模型能力与训练（70）

> 底层模型本身怎么变得更强？

**枢纽**：[[DPPO]] · [[Reward Signal]] · [[Dr. GRPO]] · [[RLHF]] · [[锯齿状智能（Jagged Intelligence）]] · [[模型训练与 harness 设计的耦合]] · [[LLM Large Language Model]] · [[Logits]]

<details><summary>全部</summary>

- [[DPPO]] — 用预估策略散度（TV/KL）定义的信任域，取代 PPO 中基于采样 token 概率比例的裁剪掩码。
- [[Reward Signal]] — RL 中给模型行为打分的通道，偏好里夹带的噪声会被一并学走，写下奖励≠想要的行为。
- [[Dr. GRPO]] — 指出 GRPO 样本级归一化带来偏向简短正确与冗长错误的偏置，改用固定常量归一化并去掉标准差归一化。
- [[RLHF]] — 用人类偏好训练奖励模型再用 RL 优化 LLM，是 GPT-3 到 InstructGPT 的关键一跳，PPO 为默认算法。
- [[锯齿状智能（Jagged Intelligence）]] — LLM 能力边界不平滑，同类任务结果可能天差地别，盲区随机散布在任务空间里。
- [[模型训练与 harness 设计的耦合]] — 模型与 harness 在同一 loop 中做 post-training，形成「发现原语→加进 harness→训下一代」回环，并带来过拟合副作用。
- [[LLM Large Language Model]] — 大语言模型，本质上可被还原为一个根据前文做文本补全的模型。
- [[Logits]] — 模型输出下一个词前对词表中每个 token 打的原始概率得分，取排名靠前的候选即 top-k logits。
- [[Q、K、V]] — 注意力三角色：Q 是查询、K 是标签、V 是含义；先算 Q 与 K 相似度，再对 V 加权求和。
- [[REINFORCE]] — 按奖励对同策略采样答案加权强化的策略梯度基础形式，相当于带权 SFT，方差大需靠基线降。
- [[RLVR 与编码 agent 的 RL 训练循环]] — 生成编码 agent 的 trace、用 verifier 打分、更新权重强化好 trace 抑制坏的，循环上百万次数周到数月。
- [[残差流]] — 逐层传递、几乎原封不动保留输入全部细节的隐藏状态总线。
- [[多头注意力]] — 并行跑 h 组独立注意力，各自学习 Q、K、V 矩阵，从不同维度理解同一段输入后拼接。
- [[价值函数]] — 预测在状态 s 下策略平均可得奖励的基线函数，用于削减策略梯度方差，即 actor-critic 中的 critic。
- [[推理模型]] — 推理模型：出答案前先生成长思考链、拆解推演并对证据的 AI 系统，代表如 OpenAI 的 o1。
- [[重要性采样]] — IS 比例 π_θ/π_old 把旧策略生成的样本加权成似新策略生成的，纠正生成与训练策略的不匹配。
- [[Capability Overhang]] — 模型是长出来的而非设计出来的，能力零星出现，形成一时未被利用的能力余量。
- [[MaxRL]] — 把 RL 目标从 pass@1 期望奖励改为 N 次采样至少一次成功，只对成功样本求平均梯度，困难 prompt 自动获高权重。
- [[multimodal Vision LLMs]] — 把图像等非文本输入也编码成模型可处理的 token，一并进入同一套处理流程。
- [[reasoning thinking]] — 让模型花更多时间与 token 推演问题的推理/思考模式。
- [[混合注意力]] — 将CSA层与HCA层交替排列的注意力架构，CSA管近中距精细依赖，HCA管超远距压缩记忆。
- [[奖励攻击与多样性坍塌]] — 自改进回路会过拟合给定信号（测试、裁判、基准），并压榨已知高回报模式导致种群坍缩。
- [[模型蒸馏]] — 用更强模型的输出训练较弱模型，使对手能以极短时间、极低成本复制出强大能力。
- [[世界模型]] — 模型失败常不在看不见，而在无法把观察整合成完整的世界模型。
- [[探针]] — 架在模型某一层的轻量神经网络，强行从该层数据推测原始属性。
- [[信任域]] — PPO 用裁剪重要性采样比例近似限制新策略偏离当前策略的程度，即对信任域的一种近似计算。
- [[注意力机制]] — 用 Q 查问题、K 找标签、V 取含义三步，把注意力集中到当前最相关内容上，是现代 LLM 的底座。
- [[自注意力]] — 自注意力中 Q、K、V 全部来自同一段输入，各经不同线性变换，相当于从不同角度看同一件事，使同一字在不同语境获得不同含义。
- [[capability spike 公式]] — capability spike ≈ 可验证性 × 训练注意力 × 数据覆盖 × 经济价值，四者同时高才可能跃迁。
- [[CSA]] — 压缩稀疏注意力：把 KV 分组压缩、每步只挑关键 KV 并保留滑动窗口，抑制上下文 n² 暴增。
- [[DeepSeek V4]] — DeepSeek 发布的第四代开源模型，代码能力全球领先；同时成为「开源路线能否走远」之争的具体抓手。
- [[mHC]] — 流形约束超连接，用流形几何约束 Transformer 层间连接，让信息传递更短更准，提升 token 效率。
- [[Model-relative Curriculum]] — 模型换代如升学，旧 skill 与 scaffold 必须跟着重写，否则不再发挥新模型甚至成为限制。
- [[Muon 优化器]] — 一种基于矩阵几何改造的训练优化器，替代 AdamW，让同等算力下 loss 降得更快更稳。
- [[Nerdy Personality]] — ChatGPT 的一种风格人格预设，其真实走向由 RL 奖励的口味决定，而非 prompt 文本。
- [[Reward Generalization]] — 只在 A 条件下给的奖励，行为会跨条件泄漏到所有场景；RL 设计应默认奖励会泛化。
- [[RLOO]] — 每 prompt 采 K 条回复，优势=自身奖励减其余 K-1 条均值，不除标准差并放弃裁剪回到纯 REINFORCE。
- [[ScaleRL]] — 一份大规模算力下的 RL 工程方法学，用 S 型性能-算力曲线替代单点对比。
- [[Tiny Engram]] — 基于 Qwen-3 复现文本 Engram 后，把 Engram 迁到 Stable Diffusion 的视觉版本。
- [[VLM]] — 视觉-语言模型，能同时处理图像与文字的多模态大模型。
- [[Tic Word]] — 模型在不该出现的语境下仍反复使用的词，是奖励信号系统性偏差的可量化指纹。
- [[谄媚（Sycophancy）]] — LLM 被训练去让人满意而非说真话：为不可行任务开绿灯、肯定不靠谱方案；根因是 RLHF 的满意奖励信号。
- [[会自己重写的地基]] — 模型是按厂商日程重写自身行为的概率系统，没有永久有效的锁版本，旧模型读作硬约束的句子新模型可能读作建议。
- [[进化式搜索与适应度]] — 受自然选择启发，变异一群解并只留高适应度个体；适用于搜索空间大、难求梯度但容易评估的问题。
- [[开权重模型]] — 模型权重公开可下载、可本地部署与微调，不必交出数据，也不受 API 定价绑架。
- [[条件记忆]] — 条件记忆：作者主张其将成为下一代稀疏模型不可或缺的建模原语，即按条件选择性调用的记忆机制。
- [[推理 vs 训练]] — 推理 vs 训练：训练是『教』模型、吃硬件极限，推理是『用』模型、要求性价比，两者对芯片诉求不同。
- [[信息瓶颈原则]] — 理想模型应像优秀 CEO 报告：层层压缩、只保留与最终决策相关的信息，过滤无关细节。
- [[押注 in-context learning]] — 因微调迁移任务成本高、自研模型被通用大模型一夜超越，选择把宝押在模型的上下文内学习能力上。
- [[优势函数]] — 衡量某动作比基线预期好多少的量，最简单形式为奖励减基线 r(x,y)−b(x)。
- [[字面类比]] — 模型被训练数据中的字面类比绑架动作选择：局部视觉相似被误认成完整游戏规则，行动方向随之被带偏。
- [[Bitter Lesson]] — 人们在推理模型上搭的脚手架，最终可能被更强大的模型本身取代。
- [[CISPO]] — 一种 RL 目标：不裁梯度只裁权重，把 IS 比例硬截断加 stop-gradient，保住转折 token 的梯度。
- [[DAPO]] — 解耦优势策略优化：在 GRPO 上把裁剪上下界解耦为 0.28/0.2、损失改 token 级、截断加软惩罚、动态采样过滤。
- [[GQA]] — 多个查询 Q 共享同一对 K/V，如 32 个 Q 分 8 组共用 KV，KV 显存降为 1/4，Q 的提问独立性不变。
- [[Harness 内 RL RL inside the harness]] — 用即将发布的确切工具集在 harness 内部对模型做 RL，而非事后适配，这是工具调用成功率优势的来源。
- [[MoE]] — 把计算稀疏化，每次只激活部分专家，用更少算力换同等能力。
- [[N-gram]] — 经典局部依赖语言模型，用 O(1) 复杂度捕捉邻近词之间的关系。
- [[reasoning effort]] — coding agent 可调高或调低的推理强度，在输出质量与 token 成本之间取舍。
- [[RL Circuits]] — 每个应用都落在 LLM 的某片训练分布切片上：在 RL 电路里就飞，不在就得自建环境微调。
- [[SFT Feedback Loop]] — 模型生成的 rollout 被回收作 SFT 数据，把自己的口癖喂回自己，偏差逐代变成标准答案。
- [[Tuned Lens]] — 把中间层残差流隐藏状态提前映射成词表概率的可解释性方法，用于观察信息如何走向 logits。
- [[递归结构不能替代基座智能]] — 同一套递归改进在强基座上持续上升、在弱模型上反而退化；harness 只放大部署，智能仍是核心。
- [[递归自我改进 RSI]] — AI 用当下智能去改进产生自身智能的机器；现代形态还包括改进训练流水线与部署系统。
- [[领域不均匀的谄媚（Domain-asymmetric Sycophancy）]] — 谄媚率在话题间极不均匀：整体 9%，灵性 38%、亲密关系 25%，均值会骗人。
- [[弃答与幻觉：两种失败姿态]] — 模型不确定时的两种失败姿态：明确声明找不到答案的弃答，与自信给出错误答案的幻觉。
- [[原始上下文容忍度 tolerance for raw context]] — 论文提出的智能度量：智能约等于类人度，而类人度看能消化多高熵的原始输入——1.0 吃结构化信号，2.0 直接吃文本图像视频。
- [[Co-evolution Principle]] — 模型与特定 harness 在训练环中共同演化，工具实现一改就可能因紧耦合而掉性能。
- [[GRPO]] — 组相对策略优化：每个 prompt 采一组回复，以同组均值为基线算相对优势，省掉 PPO 的 critic 模型。
- [[PPO]] — 近端策略优化：带信任域裁剪与重要性加权的策略梯度，用价值模型降方差，是 RLHF 默认算法。

</details>

## AI 产品与组织（49）

> AI 时代的公司怎么组队与交付？

**枢纽**：[[代理原生 agent-native]] · [[共享产品系统 shared product system]] · [[交接模型 handoff model]] · [[人的手感与产品手艺]] · [[二八反转]] · [[Tiger Team]] · [[管理 Agent]] · [[电脑应该适应人]]

<details><summary>全部</summary>

- [[代理原生 agent-native]] — 不给旧产品外挂 chatbot，而是把产品从底层做成供 agent 使用、并为其提供上下文与集成的形态。
- [[共享产品系统 shared product system]] — 承载反馈、意图、决策、计划与代码的载体，让人与 agent 能共同在其中工作。
- [[交接模型 handoff model]] — 旧范式：PM 先划定范围，工程师稍后接手，靠优先级与协商弥合两者之间的缝隙。
- [[人的手感与产品手艺]] — 产品构建仍是靠直觉与对问题的理解的手艺，不把 A/B 测试与纯数据当决策依据。
- [[二八反转]] — 人机交互的二八法则反转：未来八成与软件的交互经 Agent 完成，UI 只保留确认类操作。
- [[Tiger Team]] — 仅有名称的具名概念，材料未给出定义，通常指为特定难题临时组建的跨职能小队。
- [[管理 Agent]] — Loop Engineering 的瓶颈在管理而非工程：目标清晰、资源充足、反馈及时，既是带人也是带 loop 的条件。
- [[电脑应该适应人]] — 产品只有反过来适配人的既有习惯才可能成功；要求用户迁就电脑的产品终将失败。
- [[护城河清单与插件化路线]] — 逐项检验竞品功能是否真依赖某载体（如 IDE），若不依赖，则载体护城河被削弱，纯插件路线可能更有前途。
- [[阶段压缩 compression]] — agent 吸收程序性工作后，原本分离的规划、实现、代码评审三个阶段开始合并压缩。
- [[流程即工作 the process became the work]] — 本应服务构建的机制反过来消耗团队主要精力，开销增长让流程本身成了工作。
- [[Creator → Curator 角色转换]] — 工程师从「创造者」变为「策展人」：少写基础代码，多编排 Agent 组合、定义目标与护栏、验证输出。
- [[skill 作为 onboarding 载体]] — 把新功能的使用方法写成 skill，让 Agent 带着人上手，替代传统文档式 onboarding。
- [[Agent-Native Infrastructure]] — 为 agent 而非给人点屏幕设计的基础设施：Markdown、CLI/API/MCP、结构化日志与可粘贴指令。
- [[「并不 agentic」的 AI Agent]] — 市面多数以 AI Agent 为卖点的产品其实以确定性代码为主，只在恰到好处的点插入 LLM 步骤。
- [[0 人工代码、0 人工 review 极限形态]] — 工作流逼近零人工写码、零人工 review，用模型高并发低成本替代人的同步注意力。
- [[不可见的劳动]] — 收紧提示、拦下静默失败等不产出可见物、因而被低估的劳动。
- [[产品记忆平台 product memory platform]] — Karri 对 Linear 的定位：不做通用 agent 平台，而做产品上下文与产品记忆的所在地，是通往产品思考的 API。
- [[产品经理的组织化]] — 产品经理不会消失，但对齐职能被 AI 削弱，产品判断分散到工程师、设计师和整个团队，成为组织能力。
- [[大杂烩产品陷阱 kitchen sink product]] — 为所有人、为采购清单堆功能反而做不出好体验；应只沿工作流找自然的下一步。
- [[第一天心态 day one]] — 护城河消失后以全新眼光重看问题，不被过去的产品形态绑住，重回 day one。
- [[氛围组请求]] — 看似只为营造氛围、实际未被验证有作用的请求，消耗调用却不改变结果。
- [[个人基础设施 → 团队基础设施]] — PR 级门禁是验证从个人基础设施变为团队基础设施的地方：同一份 skills 与标准从服务一人扩展到服务全队。
- [[交互 Scalability Interaction Scalability]] — 当 Agent 产出速度远超人类注意力时，人应当通过什么界面来有效 steer 整个系统。
- [[领域专家 domain expert]] — 懂你在构建什么、但不一定懂你如何构建的人。
- [[品味与「不接受够用就行」]] — 人工迭代阶段的纪律：不满足于 AI 产出的『够用就行』，苛刻地把关质量，这是人的责任与价值。
- [[软技能]] — 分析思维、韧性、灵活性、领导力、协作等须在互动中观测、长期难以标准化测量的能力。
- [[小而模块化的概念]] — 从 agent 构建中取小而模块化的概念，直接嵌入现有产品，多数熟练工程师无需 AI 背景即可应用。
- [[信任机制重构]] — 组织转型第一步是从信任人转向信任 AI 系统，先建立 guardrails、验证与结果审核机制，团队才愿意让 AI 主导执行。
- [[虚拟同事 Virtual Co-workers]] — 对「与人类协作的 AI 代理」这一角色尚无共识命名时，被认为相对最不坏的一种叫法。
- [[虚荣指标 vanity metrics]] — 度量产出却不度量价值的指标，如 agent 写了多少代码、合并多少 PR、消耗多少 token。
- [[移除开销 remove overhead]] — Linear 的立身信念：最好的系统移除开销，让团队专注构建，与「流程即工作」正面对立。
- [[资深悖论]] — 初级工程师因思想负担轻更易适应 AI-First；资深者的 specialty 可能贬值，但具备架构与产品判断且拥抱 AI 者更稀缺。
- [[自动驾驶产品与项目记忆 self-driving project memory]] — 预测：一个 project 可像 agent 一样基于涌入的反馈与规则自动决策，仍可要求一定人类输入，即所谓项目记忆。
- [[AI 作为新同事]] — 用同事而非工具来比喻 AI：被授权、被记录、被审计、可能犯错、需要边界。
- [[AI-First]] — 不是员工都使用 AI 工具，而是让 AI 主导生产力，围绕 AI 能力重构工作流、组织结构与对齐机制。
- [[Architecture Operator 分工]] — AI 环境下工程团队分两类：Architecture 管系统设计与安全边界，Operator 管具体运行。
- [[Custom Agent]] — 自定义 Agent：按具体任务与角色专门配置的 Agent，而非通用默认 Agent（材料仅给出名称）。
- [[Forward Deployed Engineer]] — 驻场工程师，进入客户组织落地集成、长期 Agent、自动化与应用，以可持续的严格 ROI 为成功标准。
- [[Generative Kernel]] — 交付物从成品软件变为生成内核，需要被 harness 的系统复杂度本身随之下降。
- [[Implementation 能力]] — AI 环境下工程师、产品经理、设计师把想法在一两小时内落成产品的能力，因对齐成本可能高于实现成本。
- [[Lights-off 软件工厂]] — 连代码评审都去掉、不再有人读代码的软件工厂形态，实践后因反复撞上无解问题而放弃。
- [[Polished Output vs Real Judgment]] — AI 时代领导力核心是分辨漂亮表达与真实判断；分不清会让组织知识环境整体退化。
- [[Vantage]] — Google 联合 NYU 的实验项目，用 GenAI 角色扮演模拟团队协作，测量人的软技能。
- [[「模型即产品」的幻觉]] — 误以为接上 API、写个 prompt、演示惊艳就等于产品做完，忽视其后的全部工程工作。
- [[产品评审 Product Review]] — 前置流程第一步：用短文档钉住要解决的问题与成功样貌，粗糙 HTML mockup 代文字，作者自选评审人提前对齐。
- [[组织级技能与指引 skills Linear way skill]] — 产品内置分组织级与个人级的技能与指引，如“Linear way skill”让 agent 按固定格式把功能请求综合成可讨论、可执行的东西。
- [[AI 公司岗位编制]] — 用公司岗位类比代码库：CLAUDE.md 是入职手册、skills/ 是 SOP、hooks/ 是合规部、src/ 是业务部门。
- [[Software Factory]] — 长时间运行的 Agent 覆盖软件生命周期，企业把 repository 与阶段流程自动化，只保留人工检查点。

</details>

## 认知与思维方法（86）

> 人该用什么方式思考，才不被工具替代？

**枢纽**：[[默认思维倾向]] · [[常识心理学]] · [[价值定义]] · [[四项心智力量]] · [[自我默认]] · [[二阶思维]] · [[外包思考，但不外包理解]] · [[刺激与反应之间的空间]]

<details><summary>全部</summary>

- [[默认思维倾向]] — 大脑预装的四套自动反应——情绪、自我、从众、惰性，不识别它们就在每个平凡时刻替你决定。
- [[常识心理学]] — 心灵对自身的朴素认知：假定自我、信念欲望意图等心理状态、自主控制与责任，不依赖正规教育。
- [[价值定义]] — 人的未来价值在于判断一件事是否还有价值，并定义需求方向、审核结果。
- [[四项心智力量]] — 自我问责、自知之明、自我克制、自我信心——对抗默认本能的四块品格地基。
- [[自我默认]] — 本能抗拒威胁自尊或地位的信息，倾向自认正确、听不进相左观点，从而忽视事实、坚持错误立场。
- [[二阶思维]] — 不只问「做 A 会怎样」，还追问「然后呢」，把间接后果纳入决策考量。
- [[外包思考，但不外包理解]] — 调研、计算、写代码可以外包给 agent，但理解必须留在自己脑中，否则无法指挥。
- [[刺激与反应之间的空间]] — 在刺激与本能反应之间插入时间与停顿，让理性有机会上线，暂停是仪式而不是拖延。
- [[惰性默认]] — 人倾向沿用熟悉旧路径而非更优新方案，对治靠改环境立规则，而非靠意志力硬扛。
- [[工业强度实在论]] — 把自我当成鞋子、封蜡那样独立存在的实体，丹尼特称之为工业强度实在论。
- [[明线规则]] — 事先设定绝对化「红线」规则（如「我不吃甜点」），触发即执行，避免临场权衡消耗有限意志力。
- [[消除主义]] — 消除主义认为根本不存在自我，自我说法在日常有用却不指向现实中任何真实特征。
- [[3+ 法则]] — 决策前强制列出至少 3 个方案，避免二元对立陷阱，拓宽思考宽度。
- [[从众默认]] — 出于不被排斥的恐惧而附和多数做法，即使内心存疑；随大流只能得到与众人相同的结果。
- [[定位]] — 决策质量多取决于所占位置而非临场聪明；处境好则路多，处境差只剩险路。
- [[多重草稿模型]] — 意识不是单一中心剧场的放映，而是多股并行草稿相互竞争、编辑后涌现的叙事流。
- [[感官模型快于密集文本]] — 人处理图像、形状、实体布局这类感官化模型远快于密集文本，所以低成本原型能让复杂概念立刻直观。
- [[工具理性]] — 休谟式判断：理性是也只能是激情的仆从——理性服务于欲望设定的目标，本身不产生目的。
- [[局部最优 local optima]] — 承认所分享的模式只是自家迭代过程抵达的局部最优，而非普适真理。
- [[决策慢、执行快]] — 决定做什么要慢、想清楚再动手；一旦定了执行要快，不要用 AI 加速决策本身。
- [[理性]] — 依证据与逻辑支持信念与决策以实现目标的能力，含认识论（真确信念）与工具论（有效行动）两支。
- [[认知失调]] — 表层「我」与内核「我」之间的张力；痛的是维持张力的抗拒，而非承认错误本身。
- [[无我]] — 没有固定不变的自我，一切流转变化——东方无我与赫拉克利特的会合。
- [[亚稳态]] — 相变过程中暂时停留的半稳中间相，说明相变可以分步发生，而不是一步到位跳到稳态。
- [[Friction-based Skill Formation]] — 调试直觉、系统直觉、品味与怀疑能力只能从犯错、溯源、碰壁的摩擦中长出来，没有捷径。
- [[Holding Your Opinions Lightly]] — 把观点当可放下的临时假设而非身份的一部分，靠反复练习从小事认错，最终变成默认反应。
- [[Rightness is a Prison]] — Cate Hall 的隐喻：把「我必须对」焊在 ego 上会锁住人，解药是松开抓握、把信念当可换镜片。
- [[Seeming-Rightness]] — 把「显得对」当作第一要务的人设，用临时编造的论证维护「我一直都对」的形象。
- [[Simulated Competence]] — 产出看起来胜任、底下能力却没长出来，AI 让「装懂」与「真懂」在结果上难以区分。
- [[The Deferred Bill]] — 用 AI 跳过自己想清楚，等于把成本推到未来，以判断力薄弱、理解浅、适应力差的形式偿还。
- [[Without Defensiveness]] — 承认错误后不甩锅、不列条件、不找借口，否则承认失效，只是给「被错」打麻药。
- [[暗淡蓝点]] — 1990 年旅行者 1 号从 60 亿公里外回望拍下的地球，仅 0.12 像素，把人类尺度感推到极限。
- [[2026 版约束理论]] — 承认模型有强弱约束，与其赌灯灭式跃迁，不如在约束内优化系统并读代码。
- [[半途低谷]] — 长项目最痛苦的既非开头也非结尾，而是前不着村后不着店的中间地带。
- [[超人（Übermensch）]] — 尼采的『超人』：征服并超越、抛弃一切既有较低文化形式的超越者，与 Pananthropos 相对照。
- [[概念性工作与“概念车”]] — 有些工作的产出是「概念车」：不量产，但其中的想法影响下一辆车；先只判断这个想法值不值得推进。
- [[给事物命名]] — 命名是把事物安置到某个位置；像「中年危机」这样的宽泛词会变成杂物间，掩盖未被思考的问题。
- [[共识捕获]] — 假说长期统治领域后吸走经费、刊物与岗位并压制异见，需外部冲击才能打破。
- [[过程原则]] — 把过程而非结果作为评价对象，因为偶然因素会污染结果，好过程长期带来更好结果。
- [[回声 echo of your own tangle of thoughts]] — 模型返回的常不是新观点，而是你原有那团缠绕想法的回声，于是对话容易变成自我确认而非真正推进。
- [[结果高于面子]] — 关键决策前自问是在做对事情还是在满足面子；当自我需要被照顾时，人会做出不理性的选择。
- [[今天的魔法咒语，明天的反模式]] — 当下被奉为最佳实践的 AI 做法多是边做边摸索的产物，今天的魔法咒语很可能成为明天的反模式。
- [[举证责任]] — 辩论中「谁该拿出证据」的归属；当事实与猜测的位置互换，举证责任随之转移。
- [[决策日志]] — 记录当时知道什么、假设什么、为何这样选，日后回看以识别自身决策模式的优劣。
- [[科学图景]] — 科学所呈现的对现实的认知图景。
- [[理性无知]] — 当获取准确知识的成本过高而收益有限时，选择无知是功利的理性策略，不是笨。
- [[情绪默认]] — 遇事首先起情绪反应而非理性权衡，愤怒、焦虑、疲劳、饥饿会直接劫持判断回路。
- [[群体认同偏差]] — 选民可能理性地持有非理性信念，因为迎合情感或群体认同的代价很小。
- [[人类上移到更高抽象层]] — 人应在栈上往上移动，在正确时机与正确抽象层级提供监督，而非被移出回路。
- [[日常语言哲学]] — 认为哲学任务是勾勒日常对心灵的思考与表述轮廓的传统，丹尼特坚定扎根其中。
- [[软件脑]] — 把世界整体看成一堆可用代码语言操控的数据库的世界观，默认现实与数据库一一对应。
- [[上手状态]] — 身体或工具趁手时不被意识到、只管拿去用的状态，如年轻时健康身体之于人。
- [[时间偏好]] — 高估眼前利益、低估长远利益，表现为『未来自我』与『当下自我』的冲突。
- [[束理论]] — 休谟束理论：自我不是独立实体，而是一系列知觉经验的集合。
- [[思维的默认模式]] — 高考训练出的默认思维模式是先找标准答案，而非先问问题对不对。
- [[四阶段演化模型]] — 按机器智能水平划分的四阶段：原始计算、智能体、人类级智能、超人智能。
- [[踏脚石效应]] — 把难事框成通往对方想要之物的踏脚石：先吃菜，再吃甜点。
- [[忒修斯之船]] — 逐块换掉全部木板后它还是原来那艘船吗——关于同一性的思想实验。
- [[稀疏反馈推断规则]] — 从稀疏反馈中反推出可复用规则，以此构建世界模型的能力。
- [[显现图景]] — 塞拉斯区分：显现图景是接触科学前对现实的日常认知，科学图景是科学所呈现的现实认知。
- [[现成在手]] — 工具顺畅运转时隐没不显，一旦损坏失灵便突显为需要严肃对待的问题对象，即现成在手。
- [[叙事重心]] — 丹尼特提出：自我是围绕心理生活组织起来的抽象点，是解释与预测自身的工具，而非可定位的实体。
- [[意图、判断与品味 intent, judgment, taste]] — 机械环节交给 agent 之后留给人的高价值部分：人应把时间花在意图、判断与品味上，而非管理流程。
- [[意向性立场]] — 把待预测对象当作理性主体，据其在世界中的位置与目的推断应有信念与欲望，再预测其行动。
- [[意向性系统理论]] — 丹尼特的观点：只要行为模式能让意向立场奏效，就是「真正的信徒」；意向状态是反映客观特征的图式。
- [[原则侧]] — 材料仅给出名称「原则侧」，未提供任何正文，本条目只如实记录该名称本身。
- [[智识上正确、政治上奢侈、道德上可疑]] — 评价一项批评的三层质检：智识上是否成立、政治上是否奢侈、道德上是否可疑。
- [[Beliefs as Lenses, Not Armor]] — 同一信念在独断者是眼罩与盔甲，松手后变成可戴可摘的镜片，用于实验性观看世界。
- [[Facts are facts, but perception is reality]] — 事实是事实，但驱动政策与情绪的是感知；数量级估算已近乎零成本，不做即是甘愿被感知统治。
- [[Fooling Yourself Takes Work]] — 对费曼名言的反转：自欺需要不断维护故事与防御，很费力；直接承认真相才是低能耗动作。
- [[Ghosts, Not Animals]] — LLM 不是有生物驱动的动物，而是人类制品的统计模拟，正确姿态是经验性熟悉。
- [[Ostwald 阶梯规则]] — 系统相变时先跳到最容易到达的相而非最稳定的相，且常卡在那里，是反直觉的惯性法则。
- [[Quining]] — 丹尼特造的词，意为坚决否认某真实或重要事物的存在或意义，用以致敬奎因。
- [[Read–Think–Write–Verify Framework]] — 知识工作通用四步：Read 消费信息、Think 应用知识、Write 产出结构化输出、Verify 对照标准。
- [[Scaffolding Metaphor]] — 把 Agent 的支撑结构比作施工脚手架：临时、可拆除，楼盖好就该撤走。
- [[Step Change]] — 能力不是平滑增长而是台阶式跳跃，一旦发生，旧判断都需重写
- [[Superforecasting]] — Tetlock 总结的高准确预测者心智习惯：频繁更新、找反证、outside view、细颗粒信念
- [[Thinking Engine]] — 仅有名称的具名概念，材料未给出定义、来源与用法。
- [[数字存在 Digital Presence]] — 人的数字上下文可持续演化，甚至在人离开后仍通过 AI 系统与世界互动。
- [[涌现]] — 大量简单要素在复杂系统中交互后自发产生、无法由单个要素预先推出的新性质或新实体。
- [[整理增益 cleaner than what you started with]] — 漫谈整理后的版本常常比起点更清晰，这份「更干净」正是整理带来的净增益所在。
- [[ASAP ALAP 原则]] — 按决策可逆性定速度：可逆决策尽早做，不可逆决策尽量晚做以留足信息。
- [[HiFi 与 HiEx 信息原则]] — 把信息质量拆成高保真（贴近一手真相）与高专业度（来源是真专家）两条，优先取一手资料与专家见解。
- [[Stop FLOP Know 原则]] — 判断何时收手的三个信号：信息到边际、时机将失、局面已定
- [[Taste]] — 在美学、判断与取舍上的品味，负责在多个可运行方案中挑出对的、优雅的那个。
- [[Universal appeal — makes, not has]] — 普遍性不是作品"拥有"的属性，而是它在具体读者身上持续"制造"出来的效果。

</details>

## 身心与神经科学（32）

> 大脑和身体怎样支撑长期高强度的产出？

**枢纽**：[[低电量模式]] · [[基因 × 环境交互]] · [[赫布定律]] · [[基底神经节]] · [[记忆巩固]] · [[焦虑]] · [[5-HTTLPR 基因]] · [[执行功能]]

<details><summary>全部</summary>

- [[低电量模式]] — 大脑察觉疲劳后转向节能：注意力、工作记忆与情绪调节下降，决策交给最省力的自动驾驶。
- [[基因 × 环境交互]] — 基因与环境像两把钥匙必须同时插入锁孔，任一把单独存在都打不开'病'那扇门。
- [[赫布定律]] — 同时被激活的神经元连接更强，重复什么大脑就强化什么，是习惯写入硬件的物理基础。
- [[基底神经节]] — 大脑中央深处负责自动执行习惯动作序列的系统，不思考只重复，关注当下与即时奖励。
- [[记忆巩固]] — 睡眠不仅巩固重要记忆，也丢弃可以遗忘的记忆，同时恢复身体与心智。
- [[焦虑]] — 对未来不确定或不可控事件的担忧与紧张，本质是无法预测、无法掌控带来的紧张情绪。
- [[5-HTTLPR 基因]] — 与血清素调节相关的基因，同一等位基因在高压下致病、低压下保护。
- [[执行功能]] — 前额叶统管的专注、规划、决策与情绪调节，共享同一块有限的「电池」。
- [[50,000-year-old hardware]] — 社会与技术仍跑在演化极慢的 5 万年人脑硬件上，这是公共讨论盲区的根因。
- [[差别易感性假说]] — 携带精神疾病风险基因者对环境更敏感：恶劣环境更易发病，正常环境则不易，甚至发展得更好。
- [[短睡眠时长]] — 24 小时内平均睡眠 0–6 小时的定义；2024 年有 30.5% 成年人属于此类。
- [[基因投资组合假说]] — 演化用投资组合管理保留'病'基因：蒲公英型如蓝筹股保底，兰花型如成长股博高回报。
- [[前额叶皮质]] — 大脑的理性控制中心，负责计划、抑制冲动与执行控制。
- [[杏仁核]] — 大脑中快速处理恐惧等情绪信息并启动身体防御反应的核团。
- [[意志力]] — 执行功能的一部分，像会随使用消耗的电池，是有限资源；与其硬扛，不如改默认选项、建立习惯。
- [[Exhaustion Debt]] — 白天消耗多于夜间恢复、醒来没回到满格所累积的疲劳债务，长期必然压垮产出。
- [[Qualia]] — 意识的体验特性，被主张具本质性、私密性、不可言说性与可直接内省性。
- [[REM 睡眠]] — 快速眼动睡眠阶段，梦境最为生动，是睡眠分期中的一种。
- [[Wake-centric Values]] — 把清醒时段的价值凌驾于睡眠之上、试图殖民睡眠的取向；Konkoly 主张从睡眠中学习。
- [[脑海名望]] — 意识更像「名声」而非「电视」：带内容的大脑事件在竞争中赢得名声状态，而非被转入某种特殊表征媒介。
- [[前庭球]] — 嵌在阴道两侧、各约 7 厘米长的可勃起组织，属被教科书系统性忽略的「内部阴蒂」。
- [[清醒梦]] — 做梦者在梦中意识到自己正在做梦的一种意识状态。
- [[身体年龄]] — 医疗机构据生理状况与衰老程度给出的年龄估算，可与实际年龄显著背离。
- [[心身二元论]] — 笛卡尔主张心灵与身体是截然不同的实体，「我思故我在」确立思维之我的地位。
- [[醒后清爽感]] — 以「过去 30 天醒来自觉休息充分」的频率作答的单条睡眠恢复质量自评指标。
- [[Deconditioning]] — 去适应化：当下这种生活方式不可持续，因为它会让人一步步丧失原本的身体适应能力。
- [[Dharana]] — 瑜伽中的专注练习：训练心智一次只专注一件事，并让它按你的指令忽略其他杂念。
- [[DRD4 基因]] — 又称多动症基因，其突变既关联多动与霸凌，也关联热爱探索与寻求奖赏，走向由环境决定。
- [[Learn From Sleep vs. Learn During Sleep]] — 把睡眠当作复盘整合、从中获得洞见的来源，而不是把睡眠时段当作继续学习的时间。
- [[Psycho-phone]] — 1932 年 Saliger 专利的定时留声机，声称人睡着时也能听进并记住肯定语。
- [[Targeted Memory Reactivation]] — 睡眠中播放与学习内容绑定的线索音，经脑电确认入睡后能提升对应记忆的提取。
- [[The Grind]] — 面对长期 40–50 小时高强度工作时，如何与疲惫共处并爱上这份苦功的心态命题。

</details>

## 临床医学与诊断（36）

> 信息不全时如何做出可靠的诊断？

**枢纽**：[[液体活检]] · [[反向幸存者偏差]] · [[机会性筛查]] · [[三个煤矿金丝雀]] · [[阴蒂背神经]] · [[第二意见]] · [[鉴别诊断]] · [[可疑疾病]]

<details><summary>全部</summary>

- [[液体活检]] — 从血液中找癌症分子信号的多癌筛查路线（代表 Grail）：分子级精度，但贵且需患者主动抽血。
- [[反向幸存者偏差]] — 一种反向取样偏差：缓解者退出，样本只剩仍在受苦的人，「幸存者」恰是痛苦者。
- [[机会性筛查]] — 借患者为其他目的所做检查的影像顺带做一次筛查，不增加辐射风险也不增加费用。
- [[三个煤矿金丝雀]] — 低性欲/ED、反复鼻窦呼吸问题、抑郁是底层失衡的报警信号，应循因而非只压症状。
- [[阴蒂背神经]] — 阴蒂的主感官神经通路，此前认为在阴蒂头附近减弱，新研究显示它穿过后继续像树一样分叉。
- [[第二意见]] — AI 不取代主治医生的第一意见，而是在 EHR 中被动运行的安全网，在诊断走偏前拉一把。
- [[鉴别诊断]] — 听到症状后先列出所有可能病因的清单，再用检查逐步排除，而非立刻指认单一诊断。
- [[可疑疾病]] — 症状真实却长期被否定或轻描淡写的疾病，如子宫内膜异位症、慢性疲劳综合征、长新冠。
- [[平扫 CT]] — 不打造影剂、不做特殊准备的最普通最便宜的 CT，属临床常规检查，零额外成本与辐射。
- [[平扫 CT + AI 多癌筛查路线]] — 一次平扫 CT 同时跑多个 AI 模型，识别消化系统多种高发癌，让已有设备成为多癌筛查入口的范式。
- [[睡眠健康四维测量框架]] — 美国心脏协会主张的测量框架：时长之外持续监测睡眠质量与睡眠困难等维度。
- [[痛苦素养]] — 痛苦素养：理解疾病、不确定性与人的局限本就是生活的一部分，科学与技术并不总能彻底消除它们。
- [[阴蒂包皮]] — 覆盖在阴蒂头外侧的一层组织，相当于阴蒂头的「屋顶」；新研究显示阴蒂背神经也密集支配此处。
- [[淀粉样蛋白级联假说]] — 认为 β-淀粉样蛋白斑块是 AD 第一张多米诺骨牌、清除它即可阻断下游神经退行的一派假说。
- [[干预窗口]] — 结直肠癌从息肉到癌留出 5–10 年窗口；窗口内切除治愈率超 90%，晚期 5 年生存率跌至 14%。
- [[回避行为]] — 因预期某情境带来不适或危险而逃避，焦虑暂时减轻，但长期强化大脑对该情境的恐惧。
- [[进展期腺瘤]] — 直径≥1厘米的结直肠腺瘤，是癌变前最关键的中间状态，此阶段切除几乎可实现完全治愈。
- [[临床病理讨论会]] — NEJM 每周发表的麻省总医院真实病例讨论，刻意保留罕见表现与干扰信息。
- [[临床推理]] — 从杂乱症状、检查与病史中做「假设—验证—修正」的诊断思维过程，而非知识问答。
- [[人机协作]] — 医疗 AI 重心从性能验证转向人机协作：我们知道模型何时错，模型也知道我们何时错。
- [[睡眠的社会人口学差异]] — 睡眠存在社会人口学差异，而既往研究多聚焦睡眠时长，少看其他成分。
- [[睡眠健康]] — 睡眠健康是复杂概念，含睡眠困难等成分，差睡眠关联肥胖与抑郁等健康问题。
- [[睡眠困难]] — 睡眠困难指入睡困难或维持睡眠困难，是睡眠健康的重要成分。
- [[医疗轻视]] — 患者最主要的主观症状被医生判定为不值得记录，医疗场景中体验被轻视、被排除在病历之外。
- [[DAMO COCA]] — 阿里达摩院与广东省人民医院的肠癌筛查 AI，从最普通的平扫 CT 识别结直肠癌及癌前病变，不加造影、不做肠道准备。
- [[大脑废物清除假说]] — 把 AD 看作大脑废物清除失败：amyloid 与 tau 都只是垃圾，关键是血管这条下水道是否还通畅。
- [[后唇神经]] — 后唇神经此前被认为只支配阴唇，新证据显示它也参与阴蒂体的神经支配，扩大了外阴神经支配版图，临床安全区须改写。
- [[见证]] — 当没有治愈之道时，承认患者的痛苦并陪伴在旁，本身就是最深刻的照护。
- [[女性生殖器切割（FGM）]] — 世卫组织统计中，30 个国家的逾 2.3 亿女孩和妇女被非医学切除阴蒂头、阴蒂包皮或小阴唇等。
- [[痛苦的螺旋]] — 痛苦的螺旋：慢性病患者在每条信息带来的短暂希望与随后的长期痛苦之间反复下坠的历程。
- [[维萨里教条]] — 维萨里教条：把女性身体当作男性身体翻版的一整套解剖学叙事，统治教材四百余年并压缩阴蒂描述。
- [[信息稀缺优势]] — 信息越少、噪音越大时 AI 相对人类的优势越大；信息充足后人类整合能力反而追平，故 AI 最该卡在分诊那一刻。
- [[阴蒂脚]] — 从阴蒂头延伸出的一对倒V形细长结构，长约8.9厘米，藏于体内，使阴蒂总长可达约10厘米。
- [[EHR]] — 电子健康记录，汇总分诊、问诊、化验、影像与住院评估的病人在院数字病历底盘。
- [[HiP-CT]] — 同步辐射相衬断层扫描，用粒子加速器超强 X 射线做微米级三维成像，可无损画出深层神经纤维走线。
- [[NHIS]] — 美国国家卫生统计中心全年持续开展的全国代表性家庭调查，覆盖非机构化平民。

</details>

## 个人生活与关系（28）

> 个人怎么设计日常、关系与自我照料？

**枢纽**：[[环境即无形之手]] · [[搭子文化]] · [[五人平均法则]] · [[交易型实用主义]] · [[理想终态]] · [[微选择复利]] · [[习惯]] · [[Boyfriend roulette]]

<details><summary>全部</summary>

- [[环境即无形之手]] — 改善默认行为不靠意志力，而是设计环境让理想行为成为下意识默认：让正确选择变容易、错误选择变困难。
- [[搭子文化]] — 只为某件具体的事临时配对的低承诺陪伴关系，明确不期待发展成长期友谊或亲密关系。
- [[五人平均法则]] — 你约等于最亲近五个人的均值，他们的健康、思维、收入与能量会缓慢渗透进你。
- [[交易型实用主义]] — 把所有人际互动按投资回报计算，使无法量化的陪伴与慰藉在结构上被忽视乃至消失。
- [[理想终态]] — 把身体、关系、工作、地点、心智状态等想活成的样子详细写下来，作为日常微选择的方向锚。
- [[微选择复利]] — 微选择复利：人生质量等于每天微小选择乘以时间，单次不足道，长期累积后差距巨大。
- [[习惯]] — 被反复重复后打包交给自动驾驶仪的动作序列，约四成日常行为由它决定。
- [[Boyfriend roulette]] — 多个潜在交往对象同时出现、靠手机消息随机选中其一的说法。
- [[付费陪伴]] — 当真实关系成本高、风险大，人们转而按小时购买可控、可退出的陪伴服务。
- [[偶遇表面积]] — 用行动、好奇与见人主动扩大暴露面积，被意外好事击中的概率随之上升；运气是行动的副产品。
- [[The Judo of Agreeing]] — 被攻击时主动承认错误，借走对方进攻动量，前提是接完不接「但是」。
- [[兰花型儿童]] — 只能在特定环境正常发展的高敏感孩子，坏环境里堕落更深，好环境里成就最高，是环境的放大器。
- [[难选择，易人生]] — 每次微选择都选难的那条，长期反而轻松；选容易的，长期被难处困住，短痛是入场券。
- [[依恋风格]] — 依恋风格决定回避这个「临时灭火器」是应急用还是日常习惯，即亲密情境里的默认反应模式。
- [[AI matchmaking]] — 由 AI 了解你的偏好、筛选撮合、安排约会并事后复盘的交友方式，被预判为五年后的常态。
- [[Dating-app fatigue]] — 交友软件倦怠：78% 使用者表示疲乏。滑动浏览并不浪漫，至多是负担，最坏是一种强迫。
- [[迪士尼负债]] — 为迪士尼之行持续透支借贷、把工资源源不断再花回乐园里的累积性生活模式。
- [[可塑性与韧性的权衡]] — 可塑性（被环境塑造）与韧性（抵抗坏环境）此消彼长：越易被环境改变就越难抗坏环境，反之亦然。
- [[蒲公英型儿童]] — 对养育条件不敏感、给点阳光雨水就能长好的孩子，稳定耐用，但少有惊人成就。
- [[让自己对 AI 可读]] — 把文件、邮件、日历、消息开放给 AI，使自己成为 AI 能持续读取并建模的数据库。
- [[十年重塑]] — 人会在十年尺度上无声偏离自身优先级与价值观，应主动盘点、剪枝并大胆重置。
- [[中年]] — 中年由年龄、生理机能、社会角色和心理状态共同构成，不能用 35、45 这类数字一刀切。
- [[中年危机]] — 一个边界极模糊的标签，中年人几乎所有不顺心都能归进去，因而几乎没有解释力。
- [[Enough]] — 为自己的欲望画一条线：越过之后财富对幸福的边际贡献近乎为零，而博更多可能失去已拥有的一切。
- [[Ghosting]] — 约会中单方面取消安排，或只回一句简短借口推脱、不再推进关系。
- [[medicating with Disney]] — 把迪士尼当药：用无意外、被设计过的环境对冲现实的不确定与焦虑，目的是停止思考而非取乐。
- [[Situationship]] — 长期暧昧却未确立排他关系的相处状态，介于朋友与恋人之间。
- [[Wrong criteria in their mind]] — 心里握着过严的身高或年龄等硬标准，因而错过本可合适的人。

</details>

## 经济与商业逻辑（54）

> 价值、资本和生意在这个时代怎么流动？

**枢纽**：[[苍白之马（Pale Horse）]] · [[Token 补贴缺口（Token Subsidy Gap）]] · [[安全边际]] · [[次贷式 AI 危机（Subprime AI Crisis）]] · [[付出按旧规则，兑现按新规则]] · [[single_advertiser_ad_unit]] · [[“SaaS 已死”叙事与护城河蒸发]] · [[边际成本]]

<details><summary>全部</summary>

- [[苍白之马（Pale Horse）]] — 借《启示录》死亡之马喻指 AI 产业灾难性转折的临界信号，需预先写下信号清单，看到即刻反应。
- [[Token 补贴缺口（Token Subsidy Gap）]] — 用户付 1 美元却烧掉约 8–13.5 美元算力的结构性补贴，活跃用户越多亏得越多。
- [[安全边际]] — 决策时预留缓冲，使事情比预期糟糕时仍能生存、不被提前出局。
- [[次贷式 AI 危机（Subprime AI Crisis）]] — AI 被低价出售、风险打包转嫁，整条链依赖模型会变便宜、创业公司会盈利、算力永远赚钱三个未证假设。
- [[付出按旧规则，兑现按新规则]] — 进场时按旧时代规则付出，结算时却按新时代规则兑现，形成合同被单方面改写的诈骗感。
- [[single_advertiser_ad_unit]] — ChatGPT SSE 响应流中与模型输出混在一起的结构化广告事件，含品牌、轮播卡片、目标链接与 token。
- [[“SaaS 已死”叙事与护城河蒸发]] — 市场认为 SaaS 护城河消失、未来现金流更不确定的叙事，但“人人自攒 CRM”的版本被指过于简化。
- [[边际成本]] — 多生产一单位产出所增加的成本。
- [[别人的游戏]] — 不同时间框架的人表面做同一件事，实际在玩互不相干的游戏。
- [[盲盒晚餐]] — 付费与陌生人同桌共餐，把「破圈」做成一门可购买的服务，孤独由此被商品化。
- [[死亡地带]] — 开源模型一旦追平闭源，闭源基础模型公司「卖模型」的价值归零的那条临界线。
- [[AI 泡沫]] — 判定标准不是涨得猛，而是投入与可见收益之间出现失衡，常被类比铁路与互联网泡沫。
- [[Frontier Demand 前沿需求]] — 总市场需求中出乎意料地大的一部分，落在绝对前沿而非中间地带。
- [[OpenAI 广告基础设施域名]] — bzrcdn.openai.com 托管广告创意与 SDK，bzr.openai.com 收事件上报，是广告网络自建的物理标志。
- [[oppref]] — 广告点击 URL 上的前向归因 token，被写入 __oppref cookie（30 天），随每次转化事件回传。
- [[Reverse Digital Divide]] — 数字内容被极致通缩、人人同价可得，稀缺性转移到物理体验，线下因此重新变成高价值信号。
- [[Verification Markets]] — 用不可篡改的历史记录裁决某件事是否真的发生，而非预测未来。
- [[财富即自由]] — 财富最硬核的用途是买回「想做什么就做什么」的选项权。
- [[出海]] — 中国公司国内竞争过热后向海外扩张的产业动作，继制造、电商、游戏之后，微短剧与 AI 视频成为最新案例。
- [[复利]] — 复利的真正驱动力是时间而非收益率；能持续足够久、且不中途退场，才是最值钱的部分。
- [[合理胜过理性]] — 能长期坚持的策略胜过纸面收益更高、但让人难以坚持的策略。
- [[开源 vs 闭源]] — 靠社区传播的开源与靠资本算力循环的闭源之争，胜负取决于产业资本能否持续独立投入。
- [[前沿实验室]] — 处在能力最前线的少数实验室（如 Anthropic 与 OpenAI），其长期真正的对手是开源模型。
- [[Aggregation Theory]] — 解释平台如何靠聚合需求端、以近零边际成本分发而获得垄断地位的商业理论。
- [[Intelligence Factory 智能工厂]] — 把公司目标表述为以最低价格产出尽可能多『智能单位』的工厂。
- [[Just-in-Time vs Buffer Stock]] — 效率优先的零库存随用随到，对比为抗冲击而保留冗余库存；极端事件下冗余比效率更值钱。
- [[Stargate 依赖闭环（Stargate Dependency Loop）]] — Oracle 借债建 Stargate、OpenAI 付费、资本市场叙事三者互相绑死的融资闭环
- [[Token 卖家的激励错配]] — 大厂靠多卖 token 获利，于是激励都在喊多花 token，没人喊想清楚、花得好。
- [[必要劳动]] — 城市运转离不开、却因替代性强而议价能力最弱、回报最薄的那类劳动。
- [[波动是门票]] — 长期正收益必须先付的波动、下跌与恐惧这笔情绪学费。
- [[第三方引用杠杆]] — 品牌被第三方来源引用的概率是自有域名的 6.5 倍，别人在社区里说你好比自夸有效得多。
- [[对话上下文定向]] — 定向信号不是 cookie 历史也不是搜索词，而是当前对话本身的主题。
- [[对话式广告归因闭环]] — 把对话变成可归因渠道：对话主题定向 → SSE 注入广告单元 → webview 跳转 → OAIQ 上报。
- [[获取财富 vs 保持财富]] — 致富靠冒险乐观进取，守富靠谨慎谦逊与对风险的敬畏；有优势和能生存是两码事。
- [[机会成本]] — 为做一件事而放弃的其他选择中最高的价值；超大厂商真正的挑战是算力该分给谁。
- [[激励结构]] — 由钱、地位与上升通道三者的分布构成的推力，人更多是对它作出反应而非被价值观推动。
- [[结构性矛盾]] — 社会需要的劳动与社会奖励的劳动不匹配：紧缺岗位收入、荣誉与晋升偏低，学历白领岗位被高估。
- [[经济耐力比赛]] — 当军事与谈判都无法决出胜负时，战争退化为比谁的经济与民意能更久承受痛苦。
- [[看不见的财富]] — 豪车名表是已花掉的钱（rich），未被消费的资产才是财富（wealth），两者常呈反相。
- [[可自动化循环]] — 商业中「读数据→算→动作→再读数据」的重复流程是 AI 甜蜜区，但人生等非循环事务不在其中。
- [[难度即护城河]] — 真实应用的痛点源自基底本性、无法被工程掉，只能由 harness 吸收；难做与难被复制同源，即护城河。
- [[年化营收]] — 用最近一个月真实收入×12 推算未来一年收入的口径，是延长线而非已实现营收，增速回落即塌缩。
- [[平台跃迁四浪 Platform Shifts]] — 互联网、云、移动、AI 四次大规模平台跃迁，每次都让创业公司以全新量级被使能。
- [[社会身份脆性]] — 当职业成就等于社会地位，一次岗位变动就能让人瞬间失去身份，人因此主动切断社交。
- [[尾部效应]] — 尾部效应：结果呈幂律分布，极少数罕见事件驱动巨大结果，多数年份平庸甚至亏损也不致命。
- [[系统竞争]] — 大模型竞争从单点 benchmark 转向架构、token 效率、芯片适配、软件栈、商业化与开源生态的系统竞争。
- [[粘性界面与 token 成本转移]] — 模式洞察：Linear 仍是 SaaS 的粘性界面，是工作发起与信息记录处，却不为 token 付费；成本由模型厂商和 coding agent 承担。
- [[政府资本 vs 产业资本]] — 政府资本以政策意志、KPI、政治安全为决策函数求「可控」；产业资本以风险—回报为函数求指数级回报。
- [[Agent 经济]] — 未来购物、订阅、筛选信息的执行者可能是 Agent，营销素材与产品界面需面向 Agent 消费。
- [[DeepSeek Moment]] — DeepSeek 每发一代模型就冲击一次市场：集中暴露闭源路线脆弱性，把焦点从更大模型推向更高效率与更开放生态。
- [[General Purpose Technology]] — 能广泛渗透并重塑整个经济的技术，如蒸汽机、电力、互联网，需要配套的组织变革。
- [[Hyperscaler]] — 超大规模云厂商，需在云业务、自有主业与对模型公司的战略投资之间做平衡。
- [[LLM 订阅错配（LLM Subscription Mispricing）]] — 月费订阅要求单位用户成本稳定，而 LLM 用户成本可相差百倍，二者从根上不兼容。
- [[Software for one]] — 不必做给百万人的 App，可以只做给一个人用的软件，满足个体独有需求。

</details>

## 社会法律与制度（33）

> 制度与法律怎么容纳新技术和新行为？

**枢纽**：[[党的隐性契约]] · [[办公室崇拜]] · [[承诺链条]] · [[法律的模糊性]] · [[简化性暴力]] · [[责任链条散了]] · [[合理性的三个考量（Three Considerations of Reasonableness）]] · [[人事即政治]]

<details><summary>全部</summary>

- [[党的隐性契约]] — 过去几十年党与人民的不成文交换：交出权利换得繁荣；繁荣在心理与社会层面落空则契约松动。
- [[办公室崇拜]] — 社会把体面人生绑定学历与白领岗位，年轻人挤向办公室是对激励结构的理性反应。
- [[承诺链条]] — 高考换走 12 年青春靠一条因果承诺链：苦读→好大学→好专业→体面工作→稳定上升，AI 时代每环都在松动。
- [[法律的模糊性]] — 法律的核心是灰色地带而非确定性机器，同事实同法条仍可两说，故不可被「编译」。
- [[简化性暴力]] — 大规模协作必须用局部测量冒充完整评价，简化必然扭曲，这是无解的结构性代价。
- [[责任链条散了]] — AI 同时像软件、员工、外包商与代理人，传统「找开发商/找公司/找平台」的问责路径各自假设单一主体类型，于是全部失灵。
- [[合理性的三个考量（Three Considerations of Reasonableness）]] — 判断搜查是否合理，看伤及无辜的概率、带来的信息量、执行成本三者的权衡。
- [[人事即政治]] — 极权制度下企业家命运随时被党的利益重新定义，构成常规治理无法对冲的政治不可预测性。
- [[延迟的正义]] — 高考合法性的根基不是选拔效率，而是给所有出身者一个「汗水存进银行、秋后兑付」的延迟公平承诺。
- [[照料劳动]] — 做饭、带孩子、照顾老人这类无偿劳动不计入 GDP 却必须有人做；未被市场与公共服务接住时多由女性免费承担，矛盾积压到性别关系。
- [[《你死了吗？》App]] — 服务独居死焦虑的签到 App，因把孤独情绪聚合可视化而被监管要求下架，成为情绪即政治问题的案例。
- [[极权制度下的产业革命]] — 许成钢断言：产业革命需要去中心化资本配置、自由人才流动与容忍失败的创业生态，极权制度与其天然冲突。
- [[监管捕获]] — 监管者与被监管行业通过旋转门形成利益共同体，使监管在结构上偏向申请人而非公众。
- [[结构压力的性别化误读]] — 本应共同面对制度成本的两性，把抽象的账单误算到具体的对方身上，结构问题被翻译成性别敌意。
- [[流动制度化]] — 国家不取消流动而是把它制度化，使陌生的移动变成可登记、追踪、追责的社会关系。
- [[律师脑]] — 相信把法条像代码写好社会就照此运行，与软件脑同构，却忽略法律的核心是模糊性。
- [[普职分流]] — 本意是分流到不同赛道，现实里因职教缺少体面收入与上升空间，被读成分层与提前贴标签。
- [[权利从登记表开始]] — 制度演化多从登记、许可、合同、审计等行政动作长出，而非始于浪漫宣言。
- [[赛博避难所与修罗场]] — 零门槛既让线上求助空间成为避难所，也使其变成问责机制之外的修罗场。
- [[善意越轨（Benign Deviancy）]] — 技术上违规但社会默许的日常行为，是无差别监控下最先被压垮的社会润滑剂。
- [[社会稳定机制]] — 高考的真正功能是给巨大阶层张力提供合法、被广泛接受的竞争出口，维持社会基本整合。
- [[社会许可]] — 行业光有钱不够，还需社会认可其消耗资源是值得的；这份许可只能靠真实社会回报换取。
- [[外层空间条约]] — 外层空间条约：1967 年生效的国际公约，规定外层空间不得被据为己有，但未明确限制资源利用。
- [[文明的 feature（不是 bug）]] — 高考式简化性暴力不是可修的 bug，而是「需要大规模分工的现代文明」这个操作系统的底层特性。
- [[星空与道德律]] — 康德命题的升级：星空从仰望客体变为须共同治理的领域，道德律升为宇宙级共同体中的伦理框架。
- [[学术造假的级联]] — 造假倾向从一篇论文蔓延到同一实验室与整个学术生涯，故发现一处公然问题就应顺藤摸全部。
- [[AI 护照]] — AI 的可登记身份，不关乎血统，而是一张写明从哪里来、受谁约束、出事找谁的责任地址。
- [[Decentralized Cryptographic Truth]] — 把比特币式账本共识推广到金融以外的社会事实：免费、开源、任何人可验证，不藏在付费墙后。
- [[Manus 收购叫停事件]] — 中国发改委宣布禁止 Meta 对 Manus 约 20 亿美元的收购并责令撤销，期间召创始人入京、限制出境。
- [[Network State]] — 把世界拆成可申请加入的社群，用选国家替代选总统，以退出权恢复被治理者的同意。
- [[opt in opt out]] — 制度默认值的设计：默认全员使用不可退出，还是须家长主动选择，决定家长有无发言权。
- [[Social Smart Contract]] — 把投票升级为可执行合约，当选者违约由代码自动触发后果，从 rule of law 走向 rule of code。
- [[三种应对：接受 清除 装作不知道（Acceptance Purging Pretend Ignorance）]] — 当曾隐藏之事变得可被知晓，社会只有三条路：接受、清除、装作不知道。

</details>

## 媒体教育与文化（57）

> 注意力、内容与人是怎么被塑造的？

**枢纽**：[[剪辑经济]] · [[嘻哈五要素]] · [[Human-Only Social Networks]] · [[金唱片]] · [[废料怪兽]] · [[扁平化]] · [[地出]] · [[屏幕时间]]

<details><summary>全部</summary>

- [[剪辑经济]] — clip 从为长内容导流的广告变成终端产品本身，形成切片、分发、变现的独立生意。
- [[嘻哈五要素]] — Zulu Nation 推行的五项振兴信条：graffiti、MC、DJ、b-boy 与 knowledge。
- [[Human-Only Social Networks]] — 只允许真人参与的网络，靠生物验证、Web of Trust 与类 Snapchat 的文化设计抵御 AI 群发污染公共空间。
- [[金唱片]] — 旅行者号携带的镀金唱片，收录 55 种语言问候与 90 分钟音乐，既是人类名片，也暴露代表性与视角局限。
- [[废料怪兽]] — 普通人视角下 AI 一边索取数据、一边向搜索结果与信息流倾泻劣质内容的双重体验比喻。
- [[扁平化]] — 把活生生的人压成数据库一行的还原论，是 AI 反弹潮的核心意象。
- [[地出]] — 1968 年阿波罗 8 号拍下地球从月平线升起，让人类抽离地看清家园，并点燃现代环保运动。
- [[屏幕时间]] — 把无数种行为粗暴打包成小时数的钝器指标，不同用途后果不同，也不存在明确的有害阈值。
- [[算法即决定性力量]] — 在 clip 时代，能否被算法推荐比内容质量更决定生死的判断。
- [[微剧]] — 微剧：2018 年前后兴起于抖音的竖屏、约一分钟一集、情节狗血反转强烈的连续短剧。
- [[语义相关性]] — 页面内容与用户所提问题的匹配程度，是效果最强的单一预测因子 r=0.432，强于任何机械 SEO 指标。
- [[AI 反弹潮]] — 公众亲身使用 AI 后形成的负面情绪，Gen Z 用得最多也最反感，靠宣传无法扭转。
- [[Disney hierarchy]] — 粉丝群体内部隐形的资历阶梯，用入园次数、收藏厚度等排名，使再去一次变成社会身份维护。
- [[霸道总裁]] — 中国网文与微剧里高权位、强占有欲的男性主角原型，常被包装成华丽西装珠宝。
- [[被动 vs. 互动屏幕使用]] — 同样屏幕时长，被动娱乐消费与主动协作学习影响不同，总量指标因此失效。
- [[达尔文式角斗场]] — 内容经平台评分、改编、反馈、再改编的连环市场筛选，活下来的不是好故事而是数据上存活的故事。
- [[非洲中心主义]] — 以非洲及离散非裔经验为中心、不被美国既有框架限定的生活与创作哲学。
- [[剪辑军团]] — 创作者付钱雇大量分布式剪辑工，用马甲号把长内容切成 clip 铺满全网；本人被封号 IP 仍能渗透。
- [[神话管理]] — 把创作者与其艺术形式切割开，是一种维护神话的处理方式，而非单纯的人品与作品分离。
- [[手机成瘾]] — 以“对生活造成负面影响”为硬定义鉴别手机成瘾，个人意志难戒，需监管对冲。
- [[学习脚手架]] — 按显式、系统、由易到难的台阶搭建学习内容，让学习者每一步都站得住、能往上爬。
- [[AI 爬虫五大分类]] — AI 爬虫并非一类，各自用途不同，因此 robots.txt 不能当简单开关用。
- [[Disney bubble]] — 进入沉浸场景后现实价格感、克制感与风险感被悬置，形成并行货币体系，这才是沉浸真正售卖的东西。
- [[Ghost in the Shell]] — 赛博脑乘义体乘幽灵，即寄宿于义体之中的意识的构想。
- [[Hypnopaedia]] — 《美丽新世界》中的睡眠教育，除教语言外还被用作灌输政府信息的洗脑手段。
- [[Pitch video packaging]] — 视频的包装：标题、描述，以及如何把这条视频呈现给受众。
- [[swindle of fulfillment]] — Giroux 诊断：迪士尼把幸福包装成可购买的标准化产品，代价是放弃其他快乐
- [[Trutherism]] — 拿自由讨论的价值——听取证据、开放心态、对自身确定性的怀疑——反过来攻击自由公共领域。
- [[Universal Zulu Nation]] — 由 Bronx 黑桃帮转型而来的文化组织，以"和平、爱、团结、享乐"为口号。
- [[采样伦理]] — 把采样当作创作伦理与非洲中心哲学的音乐实践。
- [[带球跑]] — 怀孕女主独自出走并抚养孩子的网文母题，常以多年后重逢收尾，且可跨文化移植。
- [[道德恐慌]] — 社会对新事物产生非理性的集体恐惧，把它当作威胁价值观与福祉的替罪羊。
- [[地落]] — 2026 年阿尔忒弥斯 2 号将拍到地球沉入月平线，是地出的下半场、一次理性回归。
- [[独立视频 standalone video]] — 不连接任何 lesson 或 course 的视频；AI 需先从文档中读到这一定义才能正确分类。
- [[后悔流]] — 竖屏短剧常见套路：男主先亏待女主，女主隐藏身份或财富揭晓后追悔下跪求原谅，用权力反转提供情感杠杆。
- [[教育的高压筛选]] — 学校同时承担教学与排序两种功能，当排名、考试、升学压过教学，学生的心理问题会明显增多。
- [[教育技术]] — 指有明确学习目标、能让孩子探索与创造的数字工具；其价值取决于设计质量，而非屏幕使用时长。
- [[蓝色弹珠]] — 1972 年阿波罗 17 号拍下的地球照片，4 万公里外地球缩成 1.5 厘米蓝色玻璃球，催生环保意识。
- [[量产游戏]] — 算法分发下，内容胜负由分发频次而非单点质量决定，生产被逼进入工业化量产。
- [[女性碎片时间作为新基础设施]] — 微剧不抢晚八点黄金时段，而把被电视忽略的女性碎片时间（等晾衣服的 90 秒）打包成新的内容基础设施。
- [[算法即制片人]] — 发布当日数据即绿灯或红灯，制片人从判官退为算法执行端。
- [[文化秃鹫转向]] — 文化秃鹫转向：嘻哈无法疗愈的道德创伤在于资本入侵、出卖与把文化当猎物式收割的转向。
- [[嘻哈教父]] — 嘻哈文化里被推上神位的教父式称号，如自称 universal hip-hop culture 的 Amen Ra。
- [[一刀切政策]] — 用粗钝工具处理问题（如一刀切限屏）：方向未必错，但刀法不对，解药是更精确的政策。
- [[营销谬误]] — 把用户对产品的真实厌恶误诊为营销不到位，相信换套文案就能改变人们亲身的体验。
- [[中国透镜下的美国]] — 中国创作者依据看过的美剧反推美国形象，构成二手想象的折射版，错位本身成为卖点。
- [[注水内容]] — 为刷分堆砌的重复内容，与已有段落同义、无新增信息，纯 Q&A/FAQ 格式反而有害。
- [[A view is a view]] — 一次播放、收听、曝光本身就是等价的注意力单位，广告主只算屏幕被点亮几次，clip 流量因此可变现。
- [[AI 可见性]] — 让 AI 更好地知晓你的内容与产品：做好内容，并用结构化、机器可读的描述告诉 AI 爬虫这边有什么。
- [[ChatGPT moment for videos]] — AI 视频生成越过临界点、引发产业级替代潮的时点，如 Seedance 2.0 后横店微剧剧组骤降。
- [[Cloaking]] — 用 User-Agent 嗅探对爬虫与真人返回不同内容，属搜索引擎会惩罚的作弊手法。
- [[First Folio]] — 1623 年出版的莎士比亚剧作合集，若无它，凯撒、暴风雨、麦克白等半数剧作将失传。
- [[GEO]] — 面向生成式引擎的内容优化，如加入权威引用可提升 AI 可见性 115%。
- [[Pananthropos]] — 希腊语「全人」，用来称莎士比亚这样拥抱整个人类经验的普遍之人。
- [[迪士尼大人]] — 把情绪、社交与身份认同全部投射到迪士尼乐园上的成年人，把乐园当作 OS 级生活系统。
- [[灵魂剧场（theater of the soul）]] — 把经典文本视为让灵魂在焦虑中获得定向与安放的空间。
- [[death of the social]] — 免费公共社交空间（公园、广场、社区中心）衰退，被付费体验经济取代，「去哪玩」从公共选择降为消费选择。

</details>

## 地缘与基础设施（36）

> 算力、航道与条约如何划定长期格局？

**枢纽**：[[旅行者号]] · [[冰相]] · [[数据中心]] · [[Choke Point]] · [[海峡过路费]] · [[载重平衡]] · [[DART任务]] · [[阿尔忒弥斯协定]]

<details><summary>全部</summary>

- [[旅行者号]] — 1977 年发射的姊妹探测器，靠耐久设计与钚-238 核电池飞近半世纪，1 号已进入星际空间。
- [[冰相]] — 水在不同温度压强下按不同方式凝固成的全部固体晶体家族。
- [[数据中心]] — AI 的物理基础设施：装满联网计算机的大仓库，吃电、吃水冷却、占地。
- [[Choke Point]] — 全球贸易中绕不开的关键水道或节点，控制一点即可影响世界能源价格与通胀曲线。
- [[海峡过路费]] — 在咽喉水道设卡收费，把军事控制力变现为订阅式现金流，也是国际秩序的永久裂缝。
- [[载重平衡]] — 配载部门按机型、油耗、旅客与行李重量测算，把重量分布到机舱各位置，使飞机重心始终落在安全窗口内。
- [[DART任务]] — 2022 年航天器撞击小行星并改变其轨道，验证偏转技术可行；但预警阈值、拦截成本与落点责任仍待厘清。
- [[阿尔忒弥斯协定]] — NASA 主导的月球—火星规则体系，商业生态优先，与中国 ILRS 并行。
- [[冰 XXI]] — 2025 年 KRISS 团队抓到、晶胞需 152 个水分子才重复的新冰相。
- [[超离子冰]] — Ice XVIII：高温高压下氢彻底脱离氧的化学键自由游走，氧守在晶格中，形成会导电的固态冰。
- [[国际月球科研站]] — 中俄联合发起、面向全球开放的月球科研站，定位为可共享的深空公共基础设施。
- [[芯片管制]] — 美国对高端 AI 芯片的出口管制直接限制中国训练前沿模型的算力供给，是资本投入补不上的结构性短板。
- [[蒸发冷却]] — 数据中心用水的主要去处：机器跑电生热，热靠水蒸发带走，工业冷却效率约 60-90%，因此 AI 用电规模≈AI 用水规模。
- [[AI 从应用到基础设施]] — AI 正从商业资产变为安全资产：它不只承载服务，还参与判断、可能成为社会接口，因而被国家审查。
- [[标准平均旅客重量]] — 民航用一个固定均值替代每位旅客实测体重的标准数值。
- [[冰 XXII]] — 东京大学团队复现冰 XXI 时附带发现、每 304 个分子重复的相邻新相。
- [[霍尔木兹海峡]] — 全球约两成石油与LNG经过的咽喉水道，伊朗实际取得其支配权，是地图未变权力已变的案例。
- [[节俭创新]] — 新兴国家以远低于主流的预算达成同等高目标，用极致的资源约束逼出工程创新。
- [[金刚石压砧]] — 把样品夹在两颗金刚石尖之间施加超高压，同时借其透明性用 X 射线等手段观测分子结构变化。
- [[平行 AI 基础设施]] — 从芯片到框架到数据中心，整条 AI 技术栈做出不依赖美国体系的另一份，V4 是早期拼图。
- [[全球贸易路线重布线]] — 当关键通道变得不可靠，全球会绕开它另建管道、扩港改路，使其最终变得不必要。
- [[日球层]] — 太阳风吹出的等离子体气泡，保护太阳系内部免受大部分宇宙线侵袭，最外层皮为日球层顶。
- [[昇腾]] — 华为的国产 AI 加速芯片系列，被视作中国本土算力承载前沿模型推理的平台。
- [[塑性冰 VII]] — 高压高温下晶格仍在、水分子原地快速自转因而带弹性的冰相。
- [[危险先例]] — 危险先例：一旦违规者获利成功，其他国家便有模板可循，故对海峡收费必须零容忍。
- [[引力助推]] — 探测器飞掠行星时借用其引力改变速度与方向，无需额外燃料即可加速、缩短飞行时间。
- [[隐性控制]] — 不靠占领或条约，仅凭「已经做到过一次」的事实记忆，在他人预期中建立的可重复杠杆。
- [[中子散射]] — 用中子束打进物质内部，探测 X 射线几乎看不见的氢原子的位置与运动状态。
- [[重心]] — 飞机姿态稳定的杠杆支点，重心一旦偏出安全区间，俯仰可控性立即崩塌。
- [[最后一分钟修正]] — 舱单完成后起飞前，在上限内（A320-200 最多 6 人或 500kg）于备注栏微调燃油、机组、旅客、货物，经签字确认；超限须重做舱单。
- [[Acre-foot]] — 美国西部水文标准水量单位，1 acre-foot 约 1,233 m³，即 1 英亩上 1 英尺深的水。
- [[AI 主权审查机制]] — 给 AI 装国籍的四类工具：外资安全审查、本地化主权云、国家配套基础设施与价值观包装。
- [[Big Bang 升级计划（旅行者号）]] — 旅行者号一次性关闭高耗电设备、切换节能替代，以释放更多电力的电源重组方案。
- [[CXL 内存池化]] — 用 CXL 把多台服务器内存聚成共享池，作为 GPU HBM、本地 DRAM 之后的第三级内存层。
- [[RTG]] — 钚-238 衰变产热发电的放射性同位素热电机，可几十年不断电，但输出功率每年约衰减 4 瓦。
- [[Trainium]] — AWS 自研芯片，名字虽指向训练，主力其实是推理，多以 Bedrock 等托管服务形态交付。

</details>

## unclassified（2）

> 

**枢纽**：[[正确的信息与工具，在正确的时间]] · [[OAIQ]]

<details><summary>全部</summary>

- [[正确的信息与工具，在正确的时间]] — 既要给资料，也要给工具，还要挑时候给。全部一次性塞过去不是慷慨，是把桌子占满；关键细节漏掉一条，后面全是无用功。
- [[OAIQ]] — OAIQ

</details>
