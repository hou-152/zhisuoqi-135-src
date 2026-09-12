# 概念索引 · 知所栖 135

> 1156 个概念 · 930 条前置依赖 · 23 个领域 · 源：Notion 概念库 + Context Engineering(28篇) + Harness Engineering(30篇)

查一个概念：先在本页按领域找，再进 `concepts/`。想知道「从哪开始学」，看每个领域的枢纽概念。

## Harness 与运行时（117）

> Agent 靠什么骨架才能跑起来、跑得久？

**枢纽**：[[Harness]] · [[Harness 工程 Harness Engineering]] · [[Agent]] · [[agent 与 harness 的分工]] · [[Agent = Model + Harness]] · [[primitives]] · [[协同进化与紧耦合 co-evolution principle]] · [[higher-level runtime]]

<details><summary>全部</summary>

- [[Harness]] — 包裹在大语言模型之外的完整软件架构，负责让模型能读文件、跑命令、改代码并自主完成任务。
- [[Harness 工程 Harness Engineering]] — 围绕模型构建系统、把模型变成工作引擎的工程方式，用于注入人类先验并在模型变强后做外科式修正。
- [[Agent]] — Agent 即装备了指令与工具的 LLM；最小配置只需 name 与 instructions。
- [[agent 与 harness 的分工]] — agent 是目标导向、会用工具、能自纠错的涌现行为；harness 是产生该行为的机器。
- [[Agent = Model + Harness]] — Agent = Model + Harness：模型只有在 harness 提供状态、工具执行、反馈回路与约束后才成为 agent。
- [[primitives]] — SDK 中不可再拆的三个基本构件：Agents、Agents as tools/Handoffs、Guardrails。
- [[协同进化与紧耦合 co-evolution principle]] — 模型是带着特定 harness 一起做后训练的，harness 与模型紧耦合，换掉工具实现可能反而降低性能。
- [[higher-level runtime]] — 在模型调用之上再叠一层运行时，接管 turns、工具执行、guardrails、handoffs、sessions，且可按场景分层选择。
- [[stateless]] — 每次调用模型都从空白状态开始，不携带上一轮的上下文
- [[Latent vs Deterministic]] — 系统每一步非 latent 即 deterministic：智能住在潜在空间，信任住在确定性层，混淆二者是最常见错误。
- [[编排循环与「dumb loop」]] — Harness 的心跳：组装提示→调 LLM→解析输出→执行工具→结果回喂并重复，机制上常只是一个 while 循环。
- [[确定性工程基础设施】 deterministic engineering infrastructure]] — 支撑 Agent 稳定运行的确定性组件：权限网关、上下文管理、工具路由、错误恢复。
- [[三层工程 prompt context harness engineering]] — 三层同心工程：prompt 打磨指令、context 管理模型看到什么与何时看到、harness 包住前两者并加工具编排、状态与验证循环。
- [[事件驱动编排与执行解耦]] — 编排放在执行之外的事件驱动层，两者解耦，换来可观测、持久重试与事件审计。
- [[Action Space】]] — 行动空间指 agent 可选择的动作集合，构建它是打造 agent harness 最难的部分之一。
- [[coding agent]] — 由 harness 包裹的 LLM，并借工具获得读写代码等额外能力的代理。
- [[harness 的过时假设]] — harness 编码的是“Claude 做不到什么”的假设，模型变强后这些假设会陈旧，反过来成为性能瓶颈。
- [[Harness evolution]] — harness 本身可在任务、trace、benchmark 与隔离实验中持续改进，相关工具如 Harness Evolver 与 Harbor。
- [[操作系统类比]] — 把 harness 类比为操作系统：封装复杂逻辑同时保持接口简单，刻意通用以求泛化并吃到预训练知识红利。
- [[对话加确定性缝合]] — 任何 AI 应用本质都是与 LLM 对话，抠出结构化结果，再用确定性代码缝合起来。
- [[看对话 log]] — 研究一个 AI app 怎么工作，最直接的办法是把它与模型之间的对话记录截下来读。
- [[空间 Scalability Spatial Scalability]] — 衡量能否通过投入 10 倍算力获得 10 倍有意义吞吐量的扩展性判据。
- [[嵌入 Embedded]] — 第二种接入方式：检查作为 skill 产出物的一部分自动触发，不必人工点名。
- [[让不可见变得可见]] — Harness 工程的核心动作：加检查暴露分级漂移，加断言标出结构合规但语义跑偏，低置信处人工介入。
- [[弱 harness 强 harness 对照与消融实验]] — 每个项目跑两次同样任务：只写提示词（弱 harness）与定好规则（强 harness），再用消融实验看效果变化。
- [[agent 作为 Claude API 的新核心原语]] — Managed Agents 接管 harness 与基础设施，agent 成为 Claude API 的新核心原语。
- [[Agent Skills】]] — Claude 可读的 skill 文件，可递归引用其他文件，常用于教会模型调用 API 或查询数据库。
- [[AI 工程基础设施】 AI engineering infrastructure]] — 指出做 Agent 已不是写提示词，而需要一整套工程基础设施的判断。
- [[Filesystem 作为最基础的 harness 原语]] — 文件系统被称为最基础的 harness 原语：模型在海量文件系统用法上训练过，还解锁工作区与协作面。
- [[Harness 组件生命周期]] — 每个 harness 组件都是对模型能力边界的假设，过期速度各异；做法是逐一移除旧组件、验证质量是否真的下降。
- [[Harness level feature]] — 模型开箱做不到、必须由 harness 提供的能力：跨交互持久状态、执行代码、访问实时知识、搭环境装依赖。
- [[harness over-fitting]] — 前沿模型在自家 harness 上后训练，与特定工具深度耦合；换到没见过的 harness 后名次可能反转。
- [[Hermes Agent]] — 一个开源 Agent，代码库与文档公开，研究者可直接读源码，而非只能对其行为做逆向工程。
- [[messages API 作为直连网关]] — messages API 是通往模型的直连网关，接收 messages 返回 content blocks；足够底层，所以 agent 必须自己补上 harness。
- [[Runtime-harness separation]] — LangChain 的 framework/runtime/harness 三层分解：执行环境与可靠工作循环不是同一层。
- [[If you're not the model, you're the harness.]] — Vivek Trivedy 的划界公式：模型权重是一侧，其余全部工程都归为 harness。
- [[舱单]] — 起飞前汇总机型、油量、载重与配载并签字的放行文件；在 SDK 中指描述 Agent 工作区与挂载的 Manifest。
- [[AI Agent]] — 用户感知到的行为体现：Agent 的对外表现，而非其内部实现。
- [[Harness 与 Loop 的配合]] — Harness 提供约束与护栏，Loop 提供驱动力；好的自动循环既要有完成标准，也要有不可越过的边界。
- [[LLM-as-CPU Harness-as-OS]] — 把 LLM 当 CPU、把 Harness 当操作系统的类比：模型提供算力，Harness 负责调度、上下文与 I/O。
- [[Responses API 与生产设置对齐]] — 用 Responses API 而非 legacy Chat Completions API 重新实现 harness，以更贴合生产设置。
- [[1.6% vs 98.4%]] — 对 Claude Code 源码的统计结论：只有 1.6% 是 AI 决策逻辑，其余 98.4% 是确定性工程基础设施。
- [[部署系统层]] — 介于原始模型与真实世界之间的部署系统层，其重要性看起来不亚于预训练刚结束时模型的原始智能。
- [[从期望行为反推 harness 设计]] — 从期望模型表现的行为出发，反推需要哪些 harness 功能，而不做穷举清单。
- [[单用户假设的失效]] — 单用户假设在大规模并行 agent 下失效：磁盘成热点、共享锁与仓库重复文件成瓶颈，项目结构影响吞吐。
- [[动态系统]] — Harness 不是静态 Prompt 优化，而是持续吸收营销、产品、基础设施信号并据反馈快速迭代的动态系统。
- [[反脆弱]] — 系统设计理念：并行 agent 越多失败概率越高，架构需能承受单个 agent 失败并让其他 agent 恢复或换路。
- [[反向代理式窥探]] — 利用 AI gateway 本质是反向代理这一点，原样转发请求、只在中间截取记录，从而看到模型实际收到的 prompt。
- [[功能清单作为 harness 原语]] — feature_list.json 机器可读、agent 无法忽略，同时充当任务来源、进度记录与范围边界，因此是 harness 的原语。
- [[共享 harness]] — 一套 harness 工具被多个 agent 产品复用，减少重复实现，并让工具改进跨产品传播。
- [[会话生命周期]] — 会话应走结构化的开工/选择/执行/收尾四段生命周期共 16 步，而非自由发挥。
- [[会自己重写的地基]] — 模型是会被厂商随时重写行为的概率系统，旧模型读作硬约束的句子新模型可能只读作建议。
- [[基础设施挑战而非 harness 设计问题]] — 让 Agent 随模型能力规模化，本质是基础设施挑战，而非单纯的 harness 设计技巧问题。
- [[基础设施问题，不是 AI 问题]] — 可观测性、重试、并发、状态、审计、调度等墙是基础设施问题，所需原语往往已经存在。
- [[脚手架化 LLM 与冯·诺依曼架构类比]] — 裸 LLM 是 CPU，上下文窗口是 RAM，外部数据库是磁盘，工具是设备驱动，harness 是操作系统。
- [[可观测性]] — 看不到 agent 做了什么就修不了它搞坏的东西，可观测性属于 harness 本身。
- [[可执行搜索空间]] — 把 harness 设计（prompt、工具、控制流、记忆）写成可被程序搜索与执行的代码空间，而非手写 prompt。
- [[框架反向工程]] — 想越过 80% 完成度，往往要逆向已有框架的 prompt 与流程，代价常常是推倒重来。
- [[垃圾回收」型 agent]] — harness 中周期性运行的 agent，专找文档不一致与架构约束违规，对抗系统的熵增与腐化。
- [[灵活性与自动化的权衡]] — 接入方式越链式越自动也越死板，越独立越灵活也越依赖人记着，需按步骤独立性取舍。
- [[模型即产品」的幻觉]] — 以为接上API、写个prompt、演示惊艳就等于做完产品，忽略真正的难处在harness。
- [[能力鸿沟]] — 基准测试成绩好不等于真实工程里执行可靠：跳过步骤、搞坏测试、谎报完成。
- [[能力外置化决策]] — 新能力该住在哪：稳定知识去memory，打法去skills，契约去protocols，循环治理去mediators。
- [[普遍可触发 universally triggered]] — Agent 不关心也不需知道自己如何被激活，触发方式与 agent loop 解耦，由 harness 路由。
- [[所有权原则]] — 自己掌控提示词、上下文窗口与控制流，不把关键环节外包给框架。
- [[为 AI 设计工作环境]] — 工程师能力曲线的转移：衡量标准从『我能写多少行代码』转向『我能为 AI 设计多严格的工作环境』。
- [[未来防腐测试 future-proofing test]] — 未来防腐测试：换更强模型、不加 harness 复杂度性能就跟着涨，则设计为好，即模型越强 harness 越薄。
- [[小函数组合]] — 由 handleMessage、sendReply、acknowledgeMessage、failureHandler、heartbeat、subAgent 六个函数通过事件通信组成，而非一个巨石。
- [[用工具调用联系人类]] — 把人类当作可被 agent 调用的资源，通过 tool call 主动请求人介入、审批或补充信息的做法。
- [[优化对象的阶梯]] — harness 优化对象沿 instruction prompts → structured context → workflow → harness code → optimizer code 逐级演进。
- [[长周期任务的基础设施压力]] — 时域一长，压力就从模型转移到 agent 周围的基础设施：要安全、要抗基础设施故障、要能横向扩展支撑多 agent 团队。
- [[action space 膨胀]] — agent 能力增长的副作用：工具数量爆炸，模型更易选错动作、走低效路径，反而变笨。
- [[Agent as a New Type of Software]] — Agent 基础设施可像 web app，但交互、界面、输出更动态，需沙箱、安全执行与长任务支持。
- [[Agent CLI runtimes]] — 运行 agent workflow 的命令行环境，让自然语言工作流可跑在本地脚本、终端任务与 CI/CD 中。
- [[Agent vs Harness]] — agent 是用户交互的涌现行为实体，harness 是产生这一行为的机器，两者不可混为一谈。
- [[AgentCore]] — AWS 提供的一组 agent 原语：记忆组件、安全执行环境、权限能力等，可自建 agentic workflow。
- [[Agents SDK]] — OpenAI 提供的标准化 Agent 开发基础设施，让开发者易于起步并为 OpenAI 模型正确构建。
- [[APM]] — Agent 包管理器，负责 agent primitives 的安装、分发、配置与运行，类比 npm/pip。
- [[brain hands session 解耦]] — 把模型与 harness、沙箱工具、会话事件日志拆成三个互相假设极少、可独立失败或被替换的接口。
- [[Claude Code]] — Anthropic 2025 年 11 月发布的自主编程 agent 产品，能在分钟到小时内完成原需数天的编程任务。
- [[Claude Managed Agents]] — 预置、可配置、跑在托管基础设施上的 agent harness：你定义 agent 模板，harness 与 infra 由 Anthropic 提供。
- [[Codex]] — OpenAI 的编码代理产品；本地化运行既是它的能力来源，也带来安全与部署上的复杂度。
- [[configuration problem]] — 失败根因多在配置而非模型能力；模型越强任务越难，失败仍会以意外方式出现。
- [[context window 即 agent 状态]] — 循环中上下文起于一个初始事件，此后每次决策与执行结果都追加进去，它本身就是 Agent 的状态。
- [[harness 与 framework 的分野]] — 框架替你决定 Agent 怎么想，还重造重试、状态持久化、任务队列与事件路由；harness 只保证这些动作可靠发生。
- [[model-native harness]] — 顺着模型自身擅长方式设计的 harness，让 agent 跨文件、跨工具完成任务。
- [[prefill 与 decode 的高度倾斜]] — Agent 每步追加 action 与 observation 使输入膨胀，输出却只是短 function call，如 Manus 约 100:1。
- [[Reliability-critical harness primitives]] — 只收录直接影响 harness 设计、上下文管理、评测与运行时控制等可靠性原语的资源筛选标准。
- [[SayCan]] — Google 提出的「LLM 出主意、机器人评估能不能做」的接驳框架，常被当作主流基线。
- [[service template 与 golden path]] — 团队沿既定路径快速实例化新服务的现成实践，被用来类比 harness 未来按拓扑挑选。
- [[Skills as permanent upgrades]] — 每个写下的 skill 都是系统永久升级：不遗忘、不退化，模型换代时判断部分自动变强。
- [[turnkey yet flexible]] — 开箱即用又能改造的设计取向：默认就能跑，同时方便接入自己的技术栈。
- [[very few abstractions]] — SDK 定位宣言：只暴露很小一组原语，抽象极少，学习曲线平缓。
- [[Von Neumann Architecture Analogy]] — 把裸 LLM 比作无 RAM 无磁盘无 IO 的 CPU：上下文是 RAM，外部库是磁盘，工具是驱动，harness 是操作系统。
- [[webhook transform 与 connect()]] — transform 在云端把原始 http payload 转成带类型的 event；connect() 从本地建持久 WebSocket，无需公网 endpoint。
- [[保留推理 retained reasoning]] — 跨工具调用与轮次保留模型私有推理，让它看到此前的计划与思路，而不只是动作记录。
- [[非模型架构 Non-model Architecture]] — 除模型之外的一切系统成分——Harness、循环、工具、上下文管理都属于这一层。
- [[脚手架与 Harness 厚度 Scaffolding Harness Thickness]] — 脚手架本身不盖房子；关键取舍是多大比例的逻辑写死在系统里，而不是留给模型。
- [[执行可靠性机制 State Error Guardrails Verification]] — 让执行中断可恢复、错误不滚雪球、越界立即停止的机制集合：状态、错误、护栏、验证。
- [[hooks .claudehooks]] — 在 agent 生命周期特定事件上自动执行的确定性脚本（.claude/hooks/），用于通知、审批、集成和验证。
- [[Thin Harness, Fat Skills]] — 把智能上推到 skills、执行下压到确定性工具，让 harness 保持薄；模型变强则每个 skill 自动受益。
- [[从救火到审查的角色转移]] — 有 harness 后，人的角色从四处救火转为审查 agent 产出，这是五个子系统协同后出现的可观测结果而非愿景。
- [[错误复利 compounding errors]] — 多步流程中每步成功率相乘，10 步各 99% 端到端只剩约 90.4%，故需错误分诊与重试上限。
- [[技能化 Skills]] — 把值得重复的工作流固化为可复用技能，支持斜杠命令触发或自动应用，让学习复利累积。
- [[解空间收窄 constraining the solution space]] — 用具体架构模式、强制边界与标准化结构换取信任和可靠性，代价是放弃部分“什么都能生成”的灵活性。
- [[纠正成本递减 correct things less from that point on]] — 一次修正的收益不止当轮：从这一点起，后续需要纠偏的次数持续降低。
- [[可编辑性边界]] — 嵌入只对你能改的 skill 生效；内置与插件托管的会被更新覆盖，只能改用链式。
- [[少即是多」：gimmick 与真实增益的分界]] — 装配置、诱导Agent多半像gimmick，真实增益来自怎么用harness以及理解它有多深。
- [[时间 Scalability Temporal Scalability]] — Agent在精心设计的环境中连续运行数小时，仍能保持方向与质量的能力。
- [[事件驱动的自动化 Automations]] — 事件驱动的自动化：issue 进入系统那一刻即触发 agent 工作流，即时精炼或行动。
- [[拓扑作为新抽象层]] — 若 harness 设计模式被普遍掌握，拓扑结构或成新的抽象层，而非自然语言。
- [[无手打代码 no manually typed code at all]] — OpenAI 团队的自我设限规则：一行代码都不手写，被作者称为 forcing function，逼出整套 harness。
- [[Bedrock Managed Agents]] — AWS 原生的托管 agent 运行时，打包身份、权限、状态、日志、治理与部署。
- [[harness 厚薄 thin vs thick]] — 架构决策：多少逻辑住在 harness、多少留给模型；Anthropic 押薄 harness，图式框架押显式控制。
- [[Harness 简化原则】 Harness Simplification]] — 找最简单的解法，只在必要时增加复杂度——harness 里每个组件都编码了“模型自己做不到”的假设。
- [[Harness Thickness]] — 多少逻辑住在 harness 而非模型里：Anthropic 押薄 harness 与模型进步，图式框架押显式控制。
- [[rigor 的搬迁 relocating rigor]] — Chad Fowler 提出：严谨正从写代码搬向环境设计、反馈回路与控制系统，别指望更好的模型自动解决可维护性。

</details>

## 循环与自主执行（43）

> 一次任务如何变成可重复、可自主推进的循环？

**枢纽**：[[Loop Engineering]] · [[Agent loop]] · [[漂移与隧道视野 drift & tunnel vision]] · [[自动循环的心跳]] · [[范围控制与显式的完成定义]] · [[Ralph Loop]] · [[长时程自治编码 long-running autonomous coding]] · [[Agentic Coding]]

<details><summary>全部</summary>

- [[Loop Engineering]] — 从单次提示转向自动循环的工作方式：设计目标、触发、执行、验证、失败处理与反馈机制。
- [[Agent loop]] — SDK 内置的循环：发起工具调用、把结果送回模型、持续迭代直到任务完成。
- [[漂移与隧道视野 drift & tunnel vision]] — 长时程自治的两种典型退化：偏离目标drift与视野收窄tunnel vision，需重启与角色分离。
- [[自动循环的心跳]] — 定时触发是 loop 的心跳：/loop 间隔执行、cron、hook、GitHub Actions；没有它就不是 loop。
- [[范围控制与显式的完成定义]] — 约束 agent 一次只做一个功能并给出显式完成定义，防止多做、少做或用改清单的方式掩盖未完成。
- [[Ralph Loop]] — 一种 harness 模式：用 hook 拦截模型退出企图，在干净上下文中重注入原始 prompt，逼 Agent 继续。
- [[长时程自治编码 long-running autonomous coding]] — 把 coding agent 的使用场景推到以周为单位的连续自治运行，目标是自主跑数周、完成人类团队通常要数月完成的项目。
- [[Agentic Coding]] — 让模型自主完成读代码、改代码、跑测试、反思再改的多步编程任务，考核的是能不能把活儿干完。
- [[Inner Loop]] — Primary Agent 与用户、代码和工具交互以完成主要执行工作的循环，可在较少人工干预下长期运行。
- [[Orchestration Loop TAO Cycle ReAct Loop]] — Agent 运行的心跳：循环执行 Thought-Action-Observation，机制上常只是一个 while 循环。
- [[ReAct loop]] — 模型推理→通过 tool call 行动→观察结果，在 while 循环里重复，是当前 agent 的主执行模式。
- [[steering]] — 用户在 agent 运行中途发来新消息时的介入问题，目前仍无优雅解法
- [[TodoWrite 与 TodoRead]] — 内置的待办读写工具，prompt 要求高频使用，做完一项立刻标记完成，管理多子任务。
- [[Prompt 到 Loop 的跃迁]] — Prompt→Context→Harness→Loop Engineering 四次跃迁：语言表达、信息组织、规则约束、系统自运行。
- [[闭环]] — 让执行、反馈与修正首尾相接，使任务能自我推进，而不依赖一次性的外部指令。
- [[触发模式谱系]] — agent 的四类常见触发用法：事件触发、定时、派活即交付、长时程自主研究。
- [[卡住即信号 struggle as signal]] — agent 卡住不是失败而是信号：据此补工具、护栏与文档，并让它自己动手修。
- [[浏览循环]] — review agent 反复搜路径、读大段代码，再由新内容发起更多搜索，像在理解整仓库而非验证 diff。
- [[任务时域 task horizon]] — Agent 能连续自主完成的任务时长，呈指数增长，METR 基准上已超过 10 个人类小时。
- [[扔掉 DAG」的承诺]] — 不再逐步写死流程，给 agent 目标与转移让 LLM 实时定路径；承诺少写软件、能从错恢复，但实际并不完全成立。
- [[收敛式失败恢复]] — 失败时收敛修正：grep 失败换更简单正确转义的查询，路径错用 glob 而非猜路径扩范围。
- [[agent 循环]] — LLM 输出结构化 json 决定 tool call，确定性代码执行，结果回 append 到上下文，循环至 intent 为 done。
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
- [[链式 Chained]] — skill 结尾调用下一个 skill，由多个经过验证的交接串成端到端流程。
- [[缩短循环 shortening the loop]] — 所有有效 AI 用法的共同模式：缩短某个循环，让想到就能立刻做到。
- [[习惯变契约 habit → contract]] — 把靠自觉维持的习惯写成链条步骤，变成由系统保证执行的契约，人只在被升级回来时介入。
- [[循环工程 loop engineering]] — 把频繁的手动收尾固化为可重复循环的方法：挑动作、试验证、写流程、封装成技能、调用并迭代、再链式化。
- [[Autopilot：内建循环]] — Copilot 工作流第五步，内建循环强制模型持续工作，直到计划每一项都做完。
- [[Model as subroutine]] — loop 出现后，模型不再是对话对象，而是被 loop 在某一步调用的能力。

</details>

## 上下文工程（150）

> 模型在每一步到底应该看到哪些信息？

**枢纽**：[[上下文工程 context engineering]] · [[Skill]] · [[长上下文窗口]] · [[tokens]] · [[上下文占用率与性能衰减]] · [[注意力预算 attention budget]] · [[上下文腐烂 Context Rot]] · [[上下文 context]]

<details><summary>全部</summary>

- [[上下文工程 context engineering]] — 对模型上下文窗口的审慎构建与管理，把原始上下文与目标任务映射为可组合的上下文处理函数。
- [[Skill]] — 放在 .claude/skills/ 下的文件夹，含声明触发条件的 frontmatter 与完整正文，按需加载。
- [[长上下文窗口]] — 模型一次能装下的文本量，是昂贵有限的工作记忆；装得越满越易分心，准确性反降。
- [[tokens]] — 模型实际处理的最小单位是 token 而非字或词，上下文长度与计费都按 token 序列计数。
- [[上下文占用率与性能衰减]] — 上下文窗口越满，模型性能越容易被轻微拖累；压缩通过腾出空间缓解这一衰减。
- [[注意力预算 attention budget]] — 把 LLM 注意力类比为有限的工作记忆预算，每新增一个 token 都要从中支取，故上下文是有限资源。
- [[上下文腐烂 Context Rot]] — 模型性能随输入长度增长而变得不可靠的现象，且不是平滑衰减，而是在不同位置参差塌陷。
- [[上下文 context]] — 任何可刻画实体所处情境的信息；各相关实体表征的并集即上下文，也指模型读到的全部前文。
- [[系统提示 System Prompt]] — 调用前注入的系统级指令；文中批评每轮把当前时间、当前模式、当前状态写回它的做法。
- [[Context as working memory budget]] — 把上下文窗口当有限工作记忆经营，配套 KV-cache 局部性、文件系统记忆、压缩与背压。
- [[Context Management 四策略]] — 把上下文当内存来管：该压缩就压缩、该外置就外置、该懒加载就懒加载。
- [[Repo-local instructions]] — 放在仓库内的 CLAUDE.md、AGENTS.md 等规则文件，是 agent 可反复读取的持久化协作接口。
- [[会话的话题边界]] — 把聊天会话看成有话题边界的单元，一旦明显偏题就开新会话，因为上下文窗口有限。
- [[Agentic primitives]] — 把规则、角色、背景与流程拆成可复用、可版本化、可组合的文件，充当 AI 工作流的标准零件。
- [[gotchas 优先的 CLAUDE.md]] — CLAUDE.md 写法准则：轻量说明仓库用途，token 主要花在代码库内反直觉的 gotchas 上，不写显而易见的事。
- [[skill-creator 访谈式创建]] — 装上 skill-creator，让 Claude 反过来访谈你的工作流，快速生成 skill。
- [[the dumb zone the smart zone]] — 上下文被工具描述等填充后模型变笨为笨蛋区；把子任务拆给 sub-agents 可让主线程留在聪明区。
- [[Tool call offloading]] — 工具输出超阈值 token 时只保留头尾，把完整输出卸载到文件系统，模型按需再读取。
- [[渐进式披露 progressive disclosure]] — Agent 通过探索逐层发现相关上下文、工作记忆只保留必要部分的检索与认知模式。
- [[上下文均匀处理假设]] — 默认前提：模型处理第10000个token应与第100个一样可靠；报告以实验一致地证伪了它。
- [[序列位置效应 serial-position effect]] — 认知心理学经典发现：自由回忆时列表首尾最易记住，被借来解释模型上下文中的 U 型表现。
- [[压缩（compaction）与运行内外的分工]] — 剪枝处理运行内的上下文，压缩处理跨运行的会话累积：token 超阈值就把历史摘要后喂进下一次运行。
- [[有限的工作记忆 limited working memory]] — 模型能装载的上下文信息量有限，因此「往里面放什么」必须做取舍，这是上下文工程的物理前提。
- [[注意力之前的注意力 attention before attention]] — 窗口变长不等于能随便塞：选上下文要看语义相关性、逻辑依赖、新近性、重叠与用户偏好，并做过滤重排。
- [[最小充分上下文]] — reviewer 只需解释某个风险的最小附近代码；额外文件会进入 working context，增加成本并让后续推理失焦。
- [[agent 不是读心者 agents are not mind readers]] — agent 不读心，只能靠上下文变得有用——这条第一性原理推出上下文是新系统的核心。
- [[code-review-graph]] — 用 Tree-sitter 为代码库构建结构化图谱并增量追踪变化，让 Claude 只读相关文件的工具。
- [[Context Bloat]] — 把每个怪癖、模式与经验都塞进 CLAUDE.md（如两万行），导致模型注意力退化。
- [[Context Reset vs Compaction】]] — 压缩是就地总结让同一 Agent 带着缩短历史继续；重置是清空重来，靠交接物把状态交给下一个 Agent。
- [[context rot（上下文腐烂）与 Lost in the Middle]] — 关键内容落在窗口中段时模型表现下降 30% 以上；长窗口也会随长度增加出现指令遵循退化。
- [[Context-window tax]] — 即便缓存命中省了钱，固定内容仍占用窗口容量：85K bootstrap 占 200K 窗口四成以上，并提前触发 compaction。
- [[Instruction-file tax]] — 过大的 AGENTS.md/CLAUDE.md 会在每个请求上多花大量 token，且是否被识别取决于 harness 与启动方式。
- [[just in time 上下文检索]] — agent 只维护轻量标识符（路径、查询、链接），运行时用工具按引用动态加载真实数据。
- [[Progressive disclosure（渐进式披露）与 Skills]] — harness 启动时不把 Skill 全部载入，按需逐步披露，避免 agent 开工前就拖垮性能。
- [[prompt completion]] — 模型的输入称 prompt，输出称 completion 或 response。
- [[Skill Files]] — 可复用的 markdown 文档，只教模型怎么做，不定义做什么，目标由用户提供。
- [[Skill-as-method-call]] — skill 像方法调用：同一套流程传入不同参数，产出截然不同的能力。
- [[Skills Hell]] — skill 数量膨胀、互相冲突或长期不维护，像 framework hell 一样拖低 Agent 可靠性。
- [[Software 3.0]] — 第三种编程范式：用 prompt、context、tools、examples 编程，context window 是新程序，LLM 是新解释器。
- [[WebFetch 两阶段总结]] — 大模型产出 tool call 与 prompt，小模型读网页并按 prompt 总结，只把一小段文字回传作上下文。
- [[迷失在中间 lost in the middle]] — 当模型必须访问并使用位于长输入上下文中间的信息时，性能显著劣化的现象。
- [[CLAUDE.md]] — 放在项目根目录的 markdown 文件，Claude Code 每次会话开始时自动读取并严格执行。
- [[上下文压缩 Context Compression Summarization]] — 通过摘要或减少携带内容来压缩上下文，但不得以破坏稳定前缀为代价。
- [[压缩 Compaction]] — 在接近上下文限制时总结对话历史，以便任务继续推进的机制。
- [[短上下文]] — 故意剪短对话、让线索不全，考模型在信息不足时是主动澄清还是硬猜瞎做。
- [[方向漂移 Direction Drift]] — 上下文窗口渐满导致一致性衰减：偏离方向、遗忘早期约束、在细节里越走越深。
- [[合成键值检索任务]] — 从含 k 组随机 UUID 键值对的 JSON 中返回指定键的值，剥离自然语言语义，只测精确 token 检索。
- [[滑动窗口]] — 压缩注意力中给最近 N 个词的原始 KV 留一条不被压缩的通道，必然进入筛选器，类似短期记忆。
- [[加法本能陷阱与过度约束]] — 一出问题就往 prompt 加规则的失败模式，规则互相矛盾，最终模型只能悄悄违反其中一条。
- [[减法带来质量跃迁]] — 质量跃升来自删除规则、合并重复、消解冲突，而非添加新规则。
- [[熵减 entropy reduction]] — 上下文工程的本质是把高熵的上下文与意图压缩成低熵表示，这份人工预处理成本与机器智能水平成反比。
- [[上下文 playbook 与增量条目]] — 把 context 当作持续演化的 playbook：三角色维护带（标识符，描述）的 bullet 手册，逐条增量更新并定期去重精化。
- [[上下文失败，而非模型失败 context failures, not model failures]] — 大多数Agent失败不是模型失败而是上下文失败，故应从换更强模型转向修好上下文装配系统。
- [[上下文坍塌与简洁偏置]] — 迭代重写整块prompt会造成上下文坍塌与越写越短的简洁偏置，应改为结构化条目由确定性逻辑合并。
- [[上下文压缩与即时检索 compaction just-in-time retrieval]] — 对抗上下文腐坏的生产策略：压缩、屏蔽旧工具输出、按需检索、子agent摘要，只留高信号token。
- [[首因偏置 primacy bias]] — 模型更善用出现在上下文最开头的相关信息，呈 U 型曲线左半边，且只在大模型上出现。
- [[提示词即行为程序]] — prompt 的指令、示例、顺序、用词、格式都是行为程序，没有中立 token。
- [[文件系统即终极上下文]] — 文件系统容量无限、天然持久、可被 agent 直接操作，是外部化记忆，优于任何不可逆压缩。
- [[系统 prompt 的体量差]] — claude code 的 system prompt 约 13k 字符，cursor 不到 6k，差在语气、简洁度、主动性、代码风格与工具纪律。
- [[系统而非字符串 A System, Not a String]] — 上下文不是静态提示词模板，而是主 LLM 调用之前运行的那个系统的输出。
- [[先收窄、后读取]] — 先用 grep/glob 定位候选文件与符号，路径行号明确后才用 view 读取精确证据，避免盲目全文读取。
- [[新鲜度机制]] — 防长时运行漂移的一组做法：scratchpad.md 频繁重写而非追加、近上限时自动总结、系统提示加自省与对齐提醒、鼓励随时转向。
- [[性能梯度而非硬悬崖 performance gradient rather than a hard cliff]] — 长上下文退化是渐变滑坡而非某个长度后突然失效：模型仍高度可用，只是检索精度与长程推理相对变弱。
- [[选择性注意力压缩]] — 远的历史信息压缩、邻近文本保留全文、当下最相关部分重点处理的分层注意力机制。
- [[延迟加载工具 deferred loading]] — 渐进披露在工具层的实现：部分工具须先用 ToolSearch 搜到完整定义才能使用，被需要前不消耗上下文。
- [[隐式 code context]] — Agent 在接到指令后自动挑选相关文件进入上下文，却看不到对应的 tool use 记录或本地索引。
- [[与底层模型正交 orthogonal to the underlying models]] — 上下文工程带来独立于底层模型强弱的结构性收益；模型进步是潮水，产品应做被托起的船。
- [[预算警告与溢出恢复]] — 上下文治理的两道保险：迭代将尽时注入预算警告令其收尾；中途遇 context-too-large 则强制压缩消息并重试，不浪费一次迭代。
- [[约束优于指令]] — prompt 优化核心经验：约束比指令有效，「No TODOs」胜过「记得写完」，因为模型默认会做好事，约束只是替它划边界。
- [[长上下文的幻觉]] — 扩展上下文版本常是同一模型加 YaRN 一类数学技巧拉长可注意序列，并非指令预算更大的新模型；窗口更大不等于更会找针。
- [[指令就近原则]] — 模型更倾向听上下文末尾，因此把工具用法写进工具描述本身，删掉系统提示与工具描述里的重复指令。
- [[指令子系统与渐进式展开]] — 指令子系统告诉 Agent 做什么、按什么顺序、开工前先读什么，用渐进式展开结构而非单个巨型文件。
- [[自回归下输出也是上下文]] — 模型是自回归的，它自己生成的 token 也进入自己的输入，所以长度压力同时来自输入与输出。
- [[最小充分性与语义连续性原则]] — 两条原则：只收集存储支撑任务必需的信息，价值在充分而非体量；上下文的目的是维持意义的连续，而不只是数据的连续。
- [[最小高信号 token 集合 smallest possible set of high-signal tokens]] — 有效 context 的唯一指导原则：找到使期望结果概率最大的最小高信号 token 集合；注意 minimal 并不等于 short。
- [[Agent Drift]] — agent 在长任务中逐渐失去连贯性的现象；Anthropic 内部研究指其几乎全是上下文管理问题。
- [[Bounded Output]] — 把单次工具或模型输出限制在有界范围内，避免超长结果挤占上下文（材料仅给名称）。
- [[Chat modes]] — 按任务类型切换模型角色与关注点的机制：架构设计、写码、审 PR、调试各有一套输出习惯。
- [[chat templated prompts]] — 对话式提示只是补全式提示的一种特殊包装，本质仍是前缀文本。
- [[code-review-graphignore 排除配置]] — 放在仓库根目录的排除清单，让图谱索引跳过生成代码与第三方依赖等无关路径。
- [[Codified Context]] — 把代码库的隐性约定写成教学文档式上下文并入库；某项目达 26000 行，超过部分模块代码。
- [[Context 四种失败模式】 Context Pollution Distraction Confusion Clash]] — 把上下文失效归为污染、分心、混淆、冲突四类，统一解法是不倾倒、只策展。
- [[Context Anxiety】]] — 部分模型在接近自认为的上下文上限时，提前给工作收尾的现象。
- [[Context discipline]] — 用固定 anchor files 与稳定任务边界约束每轮迭代的上下文，不让对话无限膨胀。
- [[Context Distraction】]] — 上下文超过阈值后模型开始机械重复历史行为而非真正推理，窗口更大不等于结果更好。
- [[Context Infrastructure]] — Harness 决定 Agent 怎么工作与协调，上下文基础设施决定它拿到什么信息，进而决定质量上限。
- [[description 作为触发条件]] — 在 frontmatter 的 description 里写清「什么时候用」，以此决定该 skill 何时被自动拉进上下文。
- [[gotchas 优先原则]] — token 分配原则：简要说明 repo 用途，大部分 token 留给代码库内部的反直觉约定，避免陈述显而易见的事。
- [[Handoff Artifact】]] — 彻底清空上下文窗口并启动新 Agent 时，用结构化交接工件携带上一个 Agent 的状态与下一步。
- [[haystack 结构连贯性效应]] — 同批语料保留思路流与随机打乱句序相比，打乱版性能反而更好，提示输入结构会影响注意力施加方式。
- [[instruction budget]] — 每条无关的工具描述都会消耗 agent 必须处理却毫无收益的注意力额度，这份预算是有限的。
- [[llms-full.txt]] — llms.txt 的完整版，30-60KB，含项目描述、FAQ、使用场景、竞品对比与 README 摘录，访问量约为概要版的 3-4 倍。
- [[llms.txt]] — 站点根目录下面向 AI 的 Markdown 文件，类似 robots.txt，写清站点做什么、关键页面与作者，供 AI 检索时优先读取。
- [[Markdown 路由]] — 为站点每个页面提供 .md 版本，把约 15000 token 的 HTML 页压到约 3000 token，减少约 80%。
- [[new topic 判定]] — 小模型在每条消息上判断是否新话题并抽 2-3 词标题，用于管理上下文。
- [[Personal Context】]] — 个人独有、不可复制的笔记、框架与判断；模型能力共享，它私有，接入越系统 AI 越懂你。
- [[prompt 与 context 的通用性落差]] — prompt 可以很具体，context 要跨很多请求通用，因此做不到那么具体。
- [[prompt 主导论]] — harness 与模型都重要，但 prompt 更重要；协调良好与长期专注靠大量 prompt 实验。
- [[Self-Improving Context System]] — 上下文工程不是一次性设置，而是每次 agent 工作都在变好的活系统，维护由 agent 自己承担。
- [[Session Management】]] — 管理会话的实践取舍：开几个会话、何时 compact、何时 rewind 或改用 subagent。
- [[SKILL.md：frontmatter＋body 契约]] — skill 的最小结构：frontmatter 声明 name、description、allowed-tools，body 写清流程与报告方式。
- [[Stochastic Graduate Descent]] — 对上下文工程实际做法的戏称：手工架构搜索、prompt 摆弄与经验猜测的混合
- [[U 型性能曲线]] — 相关信息的位置与任务准确率呈 U 形：首尾高、中间低，在多种模型与任务上反复出现。
- [[观察掩码 Observation Masking]] — 上下文管理策略：把旧的工具输出隐藏起来，只保留动作与结论，从而压低窗口占用。
- [[滚动截断 rolling truncation]] — 官方 harness 的上下文管理：超过约 175,000 字符就丢弃最旧消息，代价是丢失早期观察且常运行在更满窗口。
- [[上下文文件树 tree of files]] — 不要把所有实践塞进 CLAUDE.md，而是组织成一棵能在正确时机按需加载的文件树。
- [[compaction]] — 上下文接近窗口上限时，把对话摘要后重新初始化新窗口，保留关键决策与未解决 bug。
- [[Diarization]] — 让模型读遍某主题的全部文档，写出一页纸的判断画像，把上百份材料压成结构化结论。
- [[Resolver]] — 上下文的路由表：任务类型 X 出现就先加载文档 Y；skill 说怎么做，resolver 说加载什么、何时加载。
- [[把上下文转化为执行 turn context into execution]] — 把反馈、意图、决策、计划和代码当作上下文塑造成工作，再一路带到生产环境。
- [[保留错误证据与错误恢复]] — 多步任务中失败是循环的一部分，把错误轨迹与 stack trace 留在上下文，模型才能隐式更新先验。
- [[查询感知语境化 query-aware contextualization]] — 把查询同时放在待处理数据的前面和后面，让 decoder-only 模型在编码材料时就能注意到查询。
- [[代码即高保真引用]] — 引用材料优先选代码形式的文件，因为它指令清晰、高保真，且用模型非常熟悉的语言。
- [[典型示例策展 diverse, canonical examples]] — 不用长串边缘 case 穷举规则，而用一组多样、典型的示例来刻画期望行为。
- [[调试散文：一个词就是 bug]] — harness 故障的「代码」常是英文，一个形容词就能把行为推偏几度，只能靠判断力调试。
- [[动态装配 Dynamic]] — 上下文即时生成、为当下任务量身定制，而非提前固定拼装。
- [[反思性提示]] — 人类设计的提示，让模型先暂停解析隐式指代、确认真实意图，避免因急于完成任务而理解错目标。
- [[复述（recitation）与 lost-in-the-middle]] — 通过不断重写 todo 把目标复述到上下文末尾，让全局计划落在模型最近的注意力跨度内，避开中段被忽略。
- [[干扰文档 distractor documents]] — 与查询高度相关但不含答案的维基片段，共 k−1 篇，由 Contriever 检索并按相关性递减排列。
- [[干扰项的非均匀影响]] — 一个干扰项就足以把成绩拉到基线以下，四个进一步叠加，且各干扰项影响不等、随输入变长而放大。
- [[干扰项与无关内容之分]] — 干扰项与 needle 主题相关但并不真正回答问题；无关内容则与 needle 和问题都无关，此区分是干扰实验成立前提。
- [[格式即上下文 where the format matters]] — 信息如何呈现是有影响的：简洁摘要优于原始数据倾倒，清晰工具 schema 优于含糊指令，结构化输出也属格式层。
- [[工具定义 Tool Definitions Tool Schema]] — 在 Agent 场景里，工具 schema 本身常常占据大量 token，并且位于缓存前缀的最前部。
- [[过度约束与松绑 over-constraining unhobbling]] — 团队在系统提示词、CLAUDE.md 与 skills 中过度约束模型；判断力提升后删掉冗余指令反而无损失。
- [[护栏型指令的过期]] — 为老模型写的强指令本是必要护栏，模型判断力提升后继续保留，就从保护变成了压制。
- [[机制与内容分离]] — 把「如何管理 context」的机制与「context 里有什么」的内容分层优化，元层演化 skill、基层优化 context。
- [[检索与推理的双任务负担]] — 塞入完整聊天历史等于要求模型一次调用里同时做长文定位与推理，差值即检索代价。
- [[渐进披露 progressive disclosure]] — 在正确时机加载正确上下文，把不常用能力放进可按需调用的技能里。
- [[近因偏置 recency bias]] — U 型曲线的右半边：模型更善用出现在输入上下文最末尾的信息，未做指令微调的模型尤甚。
- [[可恢复的压缩 restorable compression]] — 压缩时只丢可再取回的内容：正文可弃，只要 URL 或沙箱路径还在。
- [[扩展上下文模型 extended-context models]] — 把上下文窗口撑大的模型版本，如 GPT-3.5-Turbo 16K、Claude-1.3 100K、LongChat-13B。
- [[廉价 demo 与「魔法级」agent]] — 同一任务的两种对照：上下文贫乏时回复机械，被日历、邮件、联系人喂饱后像有魔法。
- [[两级上下文剪枝 pruning]] — 上下文过长时的配置化修法：留最近 3 轮助手回合，旧工具结果超 4000 字符软裁首尾，总量超 50000 硬清留占位。
- [[领域语言缺口】 missing language layer]] — AI 能读代码，却缺代码库与业务领域里非显而易见词汇的含义，需人反复解释。
- [[恰当高度 the right altitude]] — system prompt 的黄金区间：既不过度硬编码 if-else，也不含糊到缺乏具体信号。
- [[轻量引用 lightweight references]] — 大块信息存外部，模型窗口只暴露简短引用，需要时再取回。
- [[上下文（Context）：模型生成之前看到的一切]] — 上下文是模型生成响应前看到的一切：系统提示、用户提示、短期与长期记忆、检索信息、可用工具、结构化输出定义。
- [[上下文隔离 context isolation]] — 用独立上下文的 subagent 按功能或层级切分任务，每个单元只拿最小必要权限，避开窗口限制与上下文污染。
- [[上下文骨架]] — Linear 的自我定位：不做厨房点单式的 issue 追踪，而做收集信号、问题与决策、引导 agent 的可依赖骨架。
- [[上下文文档】 context.md]] — Grill with Docs读取的项目文件，存放项目已有的共享语言，供提问与对齐使用。
- [[上下文协作 context-cooperative]] — 从按位置触发动作的context-aware，升级为主动解释用户在做什么、协作达成共同目标的上下文。
- [[消息层 Messages Layer]] — 把真正会变化的信息放进消息层，而非频繁改动前面的固定指令，保持提示前缀稳定。
- [[知识与能力的双供给 information and tools]] — 上下文供给分两类：knowledge（information）走 RAG/记忆一侧，capabilities（tools）走可用工具一侧。
- [[Explicit Breakpoints]] — 在上下文中显式标出分层边界（长期稳定层、中期变化层、短期动态层），适合层次清楚的场景。
- [[few-shot 套路化与受控多样性]] — 上下文里堆满彼此相似的 action-observation 对时，模型会照着旧模式走下去，需引入结构化变化。
- [[HCA]] — 重度压缩注意力：每 128 个相邻标签含义 KV 压成 1 个输入，压缩率达 CSA 四倍，剩下太少便不做稀疏筛选、让 Q 全量关注。
- [[Markdown prompt engineering]] — 用清晰的 Markdown 层级区分背景、任务、约束与验证标准，而不是把 prompt 写得更华丽。
- [[one-shot 的理论极限]] — 理论上提示、上下文、顺序都完美就能一次做对，但没人做得到，规划的意义正是逼近它。
- [[system prompt]] — Agent 启动时由 harness 注入、用户不可见的开场提示，用来设定角色、规则与可用工具。
- [[Token 优化的评审上下文 get_review_context_tool]] — MCP 工具 get_review_context_tool，输出 156–207 token 的结构化评审摘要。

</details>

## 记忆与检索（39）

> 经验与知识怎么被存下来、又准确取回？

**枢纽**：[[记忆 Memory]] · [[跨会话记忆文件系统]] · [[程序记忆（Procedural Memory Skills） progressive disclosure]] · [[分层记忆架构]] · [[结构化记事 agentic memory]] · [[即时检索 Just-in-time Retrieval]] · [[项目知识体系]] · [[多时间尺度记忆与「记忆只是 hint]]

<details><summary>全部</summary>

- [[记忆 Memory]] — 在不同时间尺度上运作的存储：会话内、跨会话、长期沉淀，各层服务于不同的取回需求。
- [[跨会话记忆文件系统]] — 用文件系统语义（按主题分文件、frontmatter、版本令牌、六个操作）存放跨会话工作记忆的做法。
- [[程序记忆（Procedural Memory Skills） progressive disclosure]] — 智能体记住『如何做事』的记忆，以 Markdown 等声明文件编码工作流、质量门与最佳实践。
- [[分层记忆架构]] — 借操作系统类比：模型是 CPU、上下文是 RAM；短期与长期记忆按时间相关性和重要性阈值划分，并由迁移函数搬运。
- [[结构化记事 agentic memory]] — Agent 定期把笔记写到上下文窗口之外，需要时再拉回，形态可以是 to-do 列表或 NOTES.md。
- [[即时检索 Just-in-time Retrieval]] — 上下文里只保留轻量级标识符（路径、ID、链接），需要时再取全文，而不是把内容全塞进去。
- [[项目知识体系]] — loop 需要完整知识管理：规则、记忆、文档、经验沉淀与过期信息清理，启动时读对上下文。
- [[多时间尺度记忆与「记忆只是 hint]] — 短期会话历史加长期跨会话持久化，分常驻索引、按需主题文件、可搜索原文三层；记忆只当提示，行动前校验真实状态。
- [[记忆冲刷（Memory Flush）]] — 压缩前向模型下达保存指令，优先留存用户偏好、修正建议与重复模式而非任务细节。
- [[冷热分离（记忆）]] — 小规模提示词记忆承载常驻信息，检索承担偶尔用到的信息，按使用频率分层。
- [[提示词记忆（MEMORY.md + USER.md）]] — 把持久记忆存成 MEMORY.md 与 USER.md 两个小文件，约 1300 token 的精选状态。
- [[Signals]] — 带来源与时间线、可持续追加的观察记录单元，如用户摩擦、机会、转化缺口、关键词机会。
- [[跨轮次记忆与连贯策略]] — 保留推理历史后模型更能随时间学习并使用连贯策略；两处失忆叠加解释了它此前为何学不会。
- [[记忆须改变回答实质]] — 被调用的记忆必须改变结论、建议或追问，否则只是监视式的个人化触感。
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
- [[Tacit Knowledge】]] — 记录下来的决策结论之外的推理过程、tradeoffs 与默会背景；企业最大的 context leak。
- [[记忆即提示 Memory as Prompt]] — 把记忆当作一种提示来管理：写入什么、何时注入上下文，都由提示工程的原则决定。
- [[自动记忆 auto-memory]] — 记忆保存从用户手动 # 写入 CLAUDE.md，变成系统自动保存与工作和你相关的记忆。
- [[持久化代码图谱 structural map graph]] — 把代码库的函数、类、导入、调用、继承与测试全部映射并持久保存在本地，供后续查询与增量更新。
- [[混合检索策略 hybrid strategy]] — 预检索与即时检索的折中：先放入一部分保证速度，再由 Agent 自行决定深入探索。
- [[检索池 vs 引用]] — 进入检索池只是第一关，被检索页面中约 85% 从未被模型引用。
- [[检索器-阅读器配置 retriever-reader]] — 开放域问答标准配置：检索系统取回前 k 篇文档，语言模型作为阅读器据此作答。
- [[门控机制]] — 检索时判断命中内容与当前上下文是否匹配，不匹配就自动屏蔽，如区分「张」与「张仲景」。
- [[语义操作系统 semantic operating system]] — 一种能随时间生长、具备类人添加/修改/遗忘能力、可自我解释推理链的终身上下文系统主张。
- [[语义搜索 semantic search embeddings]] — 基于向量嵌入按名字或含义检索代码实体的可选特性，依赖 sentence-transformers。

</details>

## 状态与持久化（18）

> 跨会话、跨进程的状态放在哪里才可靠？

**枢纽**：[[文件系统即持久记忆]] · [[Cross-session Work]] · [[Session]] · [[Sessions]] · [[Git-backed state]] · [[Long-running agent handoff]] · [[持久化执行 durable execution]] · [[状态子系统与进度持久化]]

<details><summary>全部</summary>

- [[文件系统即持久记忆]] — 把耐久状态（日志、diff、错误 trace）写进文件系统而非塞进 context，靠 bash 读写即可续跑长任务。
- [[Cross-session Work]] — 任务由多个 agent session 各承担一部分并在循环中推进，因此要求外部状态能跨 session 保存与恢复。
- [[Session]] — 一次有状态的运行：用已建好的 agent 配置与环境拉起沙箱，挂载文件、仓库与认证。
- [[Sessions]] — 维持 agent loop 内工作上下文的持久记忆层，决定状态如何跨轮携带。
- [[Git-backed state]] — 把循环状态落在 git 中获得显式持久性，从而支持系统重启后的崩溃恢复。
- [[Long-running agent handoff]] — 跨上下文窗口、跨阶段维持长任务的交接机制，如 initializer agent、handoff artifact、feature list 与上下文压缩。
- [[持久化执行 durable execution]] — 把每次 LLM 或工具调用变成一个可独立重试的 step，进程崩溃后从已持久化的检查点继续。
- [[状态子系统与进度持久化]] — 用 progress.md、feature_list、git log 等把做了什么、在做什么、下一步是什么持久化到磁盘，让下次会话接着做。
- [[agent 模板的声明式持久化]] — 把模型、system prompt、工具、MCP servers、skills 存成 YAML 放进 git，由 CLI 在流水线里 apply。
- [[Artifact Schema]] — 把 artifacts 当作共享知识层，每种都配 README、schema、添加流程与 timeline。
- [[Shared File System]] — 多 session、多 agent 共用的文件夹系统，用 signals／artifacts／tasks／logs 记录状态供各 loop 复用。
- [[本地状态层]] — 本地状态目录 ~/.claude：todo 存 json，消息存 __store.db 的 sqlite 表，另有 statsig 缓存文件。
- [[统一执行状态与业务状态]] — 统一执行状态与业务状态：把运行状态与业务状态合一，配合简单 API 的启动/暂停/恢复与无状态 reducer。
- [[Stateful Runtime Environment (SRE)]] — 把持久化与状态管理封装进运行环境，构建 agent 时无需再操心这些
- [[snapshotting + rehydration]] — Agents SDK 内置的快照与再水合能力，可在新容器里从上次检查点恢复状态继续跑。
- [[step]] — 最小执行原语，包住一次 LLM 调用或工具执行，失败时只重试该单元
- [[step ID 自动索引]] — SDK 自动为循环里的每次 step 调用生成唯一 ID，无需手工管理
- [[乐观并发控制 optimistic concurrency control]] — 允许自由读状态，但若状态自上次读取后已改变则写入失败，实现更简单稳健。

</details>

## 缓存与成本控制（35）

> 同样的能力怎么用更少的 token 和钱换来？

**枢纽**：[[Harness token floor]] · [[Token count]] · [[提示词缓存（Prompt Caching）]] · [[Token Efficiency]] · [[大小模型分工]] · [[cached input tokens]] · [[Tool-schema tax]] · [[输出 token 效率]]

<details><summary>全部</summary>

- [[Harness token floor]] — 用户任务进入前，harness 已发送的 system prompt、tool schema 与 scaffolding 所占的固定 token 量。
- [[Token count]] — 一段文本消耗的词元数量，是计费、上下文预算与成本估算的基本计量单位。
- [[提示词缓存（Prompt Caching）]] — 把稳定前缀放在 prompt 前部并尽量保持不变，以命中供应商缓存。
- [[Token Efficiency]] — 单位算力能换到的有效智能，是从 demo 走到产品与基础设施的门槛。
- [[大小模型分工]] — 小模型承担高频低价值的边角活，大模型只处理真正的编码推理。
- [[cached input tokens]] — 请求中与历史请求共享前缀、可被缓存复用从而降低处理成本的那部分输入 token。
- [[Tool-schema tax]] — 工具越多、schema 越丰富，每次请求都要附带的静态 token 开销越高，与任务难度无关。
- [[输出 token 效率]] — 同能力下输出 token 越少越省；材料中改版后分数约 3 倍，输出 token 少 6 倍。
- [[氛围组请求]] — 看似为体验服务、实测却看不出作用的小模型请求，只白白增加成本与延迟。
- [[模型一致性与 prompt caching]] — 同一功能全程不换模型与推理档位，让模型侧缓存保留，后续请求省token又省钱。
- [[API-boundary observability]] — 在 API 边界用日志代理同时抓取完整请求 JSON 与 usage 计量块，作为发送内容与计量结果的真值。
- [[Automatic Caching]] — 多数普通多轮对话可直接启用的默认缓存方案。
- [[Baseline-request product]] — 任务输入≈baseline×请求次数+对话增长量，可用来比较不同 agent 的实际开销。
- [[Budget ceiling]] — 为 token 或金额消耗设定的上限，防止无限 loop 把成本推到失控。
- [[Cache temperature]] — 同任务的缓存写入量随缓存冷热与漂移而变化的程度：预热后几乎不写，冷或漂移时整段重写。
- [[Configuration multiplier]] — 指令文件、MCP schema、插件与工作流模板叠加在 harness 基线上，使真实配置 token 膨胀约 12 倍。
- [[Framework-template repetition]] — 模板本身 token 不多，但会被每个后续请求重复携带，真实成本是模板体积乘以请求次数。
- [[KV-cache 命中率]] — 前缀相同的上下文命中缓存的比率，直接决定延迟与成本，缓存与未缓存输入单价可差十倍。
- [[MCP schema amplification]] — 每个小型 MCP server 每请求约增 1000-1400 token，生产级 API 的 schema 更大，并与请求次数相乘。
- [[Subagent bootstrap multiplier]] — 每个子 agent 有独立 bootstrap、父 agent 又摄入其 transcript，导致 token 成倍放大
- [[tools → system → messages 缓存顺序]] — 为命中提示缓存，应把最稳定的内容放前面：工具定义在前、系统提示居中、对话消息在后。
- [[TTL]] — 提示缓存的有效时长，默认 5 分钟、可扩展至 1 小时，决定多轮或中断后能否复用前缀。
- [[缓存断点 Cache Breakpoint]] — 缓存从请求开头一直延伸到明确标记位置，该标记点即缓存生效的边界。
- [[缓存连续性 Cache Continuity]] — 同一条主对话不要随意切换模型、不要把分支探索混进主链路，否则缓存前缀失效、连续性被破坏。
- [[缓存命中读取成本 Cache Hit Read Cost]] — 缓存命中读取的成本远低于普通输入处理，命中越多整体越省。
- [[缓存命中率 Cache Hit Rate]] — 把缓存命中率当运行状态指标，联动监控 cache_read、cache_creation、首字延迟与上线后变化。
- [[缓存写入成本 Cache Write Cost]] — 缓存写入按 Anthropic 定价高于基准输入价，5 分钟档较便宜，1 小时档更贵。
- [[前缀匹配 Prefix Matching]] — 缓存命中要求请求前缀逐 token 一致；语义相近但前缀不同不算命中。
- [[首字输出延迟 Time to First Token Latency]] — 从请求发出到输出第一个 token 的延迟，是提示词缓存收益的第二个维度。
- [[提示词缓存 Prompt Caching]] — 复用稳定前缀以压降长对话、Agent、文档问答 token 成本，而非普通开关。
- [[通道切换 switch to voice]] — 通道切换：把同样的信息从打字换成语音输入（switch to /voice），用成本更低的一条通道送进去。
- [[稳定的 prompt 前缀]] — 把 system prompt 等前缀写成逐字稳定的内容，避开时间戳之类易变项，以命中 KV-cache。
- [[稳定前缀 Stable Prefix]] — 缓存真正复用的是请求开头到缓存断点之间的稳定内容，而不是整段 prompt。
- [[最小可缓存 token 门槛 Minimum Cacheable Tokens]] — 可缓存前缀必须达到该模型自身的最小 token 数，Anthropic 各模型门槛不同，不能一概而论。
- [[Cache prefix stability]] — 请求前缀在多次运行间保持逐字节一致，才能命中缓存、避免中途重写。

</details>

## 工具调用与沙箱（33）

> Agent 怎么安全地对外部世界动手？

**枢纽**：[[MCP Model Context Protocol]] · [[Sandbox]] · [[工具接口的表达力设计]] · [[工具收窄 tool scoping]] · [[shell tool]] · [[工具即契约 tools as the contract]] · [[接口即指令 design interfaces]] · [[通用工具与「给模型一台计算机]]

<details><summary>全部</summary>

- [[MCP Model Context Protocol]] — 一种开放的工具接入标准，让 Agent 以统一协议接上外部工具与数据源。
- [[Sandbox]] — 解决代码在哪里跑：提供安全隔离的执行环境，可叠命令白名单与网络隔离，按需创建、扇出、用完销毁。
- [[工具接口的表达力设计]] — 不靠堆示例而靠接口设计：想清楚工具、脚本、文件有哪些参数、能否更有表达力，用枚举与状态约束暗示期望用法。
- [[工具收窄 tool scoping]] — 工具越多往往表现越差：只暴露当前步骤所需的最小工具集，重叠工具超过约 10 个时应考虑拆分多 agent。
- [[shell tool]] — 让模型在真实环境里执行 shell 命令、跑代码并读回输出的具名工具。
- [[工具即契约 tools as the contract]] — 工具是 agent 与其信息/行动空间之间的契约，须返回 token 高效的信息、鼓励高效行为，并自包含、健壮、用途清晰。
- [[接口即指令 design interfaces]] — 用接口设计本身传达用法：参数更有表达力，枚举与约束直接定义期望行为，替代示例说明。
- [[通用工具与「给模型一台计算机]] — 给模型一台计算机：不给每个动作造工具，而是让 agent 用自带 bash 写代码执行，即时设计自己的工具。
- [[Function tools]] — 把任意 Python 函数变成工具，自动生成 schema 并用 Pydantic 做参数校验。
- [[连接器]] — MCP、GitHub、飞书、数据库等外部接口，让 Agent 接入真实工作环境，形成发现—修改—通知的闭环。
- [[工具 Tools]] — Agent 的『双手』，指它得以对外部世界施加动作的调用能力，是 agent 的定义性特征。
- [[工具调用批处理]] — 独立的廉价检索先批量执行，聚焦读取也批量执行，避免一搜一读交替带来的上下文扩散与节奏成本。
- [[工具即结构化输出]] — 工具本质就是结构化输出，与循环中「LLM 输出结构化 json、确定性代码执行」的分工完全对应。
- [[任务特定工具说明]] — 相同工具必须按产品工作边界配置 instructions，code review 式聚焦说明在 CLI 中无同等收益。
- [[沙箱化自主]] — 让 Agent 自主运行但不在本机执行：把 YOLO 模式放进 GitHub Codespaces 或 dev container 等隔离环境。
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
- [[See Like an Agent】]] — 通过观察输出与反复实验理解模型自身能力，再据此设计给它用的工具。
- [[Tool Calling】]] — 模型通过工具调用来对外行动，工具可用 bash、skills、代码执行等原语构造。
- [[Sensors 与 Actuators]] — Agent-native 的两个原语：感知器把世界状态数字化，执行器让 Agent 改变世界。
- [[Sensors and Actuators]] — 把工作流拆成感知与行动两类原子操作，让 agent 用一致方式编排它们。

</details>

## 多 Agent 编排（45）

> 多个 Agent 如何分工协作而不互相踩踏？

**枢纽**：[[多智能体架构]] · [[Planner–Worker 角色分离]] · [[子 Agent 分工]] · [[动态协调 dynamic coordination]] · [[共享 多人 agent 会话]] · [[共享文件加锁的协调机制]] · [[开箱即用的编排与子 agent]] · [[handoff 交接]]

<details><summary>全部</summary>

- [[多智能体架构]] — 把任务拆给多个 Agent 各司其职（场景生成→角色扮演→行为提取→评分），分层解耦、模块可替换。
- [[Planner–Worker 角色分离]] — planner 持续探索代码库并拆任务，worker 领任务后埋头做完，不互相协调、不管大局。
- [[子 Agent 分工]] — 把执行、审查、修复分给不同子 Agent 或模型，避免写代码的 Agent 给自己打分。
- [[动态协调 dynamic coordination]] — 不预先分工，让每个 Agent 根据其他 Agent 当下在做什么来决定自己下一步做什么。
- [[共享 多人 agent 会话]] — 同一 agent 会话对团队可见，多人可进入同一个 chat 一起看、一起改，压缩协作循环。
- [[共享文件加锁的协调机制]] — 所有 agent 地位平等，通过共享文件查看状态、认领任务、更新状态，用锁防止两人抢同一任务。
- [[开箱即用的编排与子 agent]] — 编排器自动按任务复杂度切换小模型探查子 agent 与大模型通用子 agent。
- [[handoff 交接]] — worker 完工后写一份单一交接报告，含所做工作、注意事项、偏差、发现与反馈，由系统交给 planner。
- [[Orchestra Interface]] — 相对于工厂式界面，强调人仍在 flow 中，像指挥家一样设目标、协调多个 Agent 并保有创造控制感。
- [[subagents]] — 把子 agent 路由到隔离环境执行，用来扩展 agent 的能力与并行度
- [[Symphony]] — 用 Elixir/BEAM 构建的持久守护进程，把交互从写 prompt 变成写 ticket 并移动状态
- [[Subagent】]] — 把一整个 session 的工作封装后派发：子代理拿全新小上下文与指令预算，只有浓缩结果回流父 agent。
- [[单 agent 的速度天花板]] — 现有 agent 对聚焦任务尚可，但复杂项目上很慢，问题不是做不对而是做不快。
- [[递归 Planner-Worker 架构]] — Planner 掌握全项目范围并按需生成子 Planner，Worker 在各自 repo 副本独立工作后写 handoff 上交。
- [[角色过载与病态行为]] — 连续执行器被赋予过多角色，导致随机 sleep、拒绝规划、过早宣称完成等病态行为。
- [[连续执行器]] — 第三代设计，取消独立 planner，由唯一的 executor 兼做规划与派活，系统更动态灵活。
- [[模型—角色适配]] — 按角色挑选最合适的模型，而非统一用一个模型；依据实测的坚持度与规划能力差异分配。
- [[锁竞争瓶颈 lock contention]] — 锁本身工作正常也会成为瓶颈，二十个 agent 吞吐退化为两三个。
- [[为吞吐量设计与可接受错误率]] — 为吞吐量设计与可接受错误率：追求每次提交 100% 正确会严重串行化，应接受小且恒定的错误率并留绿色分支收尾。
- [[意图理解、路由与升级 understand intent, route, escalate]] — 新系统应具备的运行能力：理解意图、把工作路由给正确的执行者、必要时升级，并保持执行推进。
- [[自协调与共享协调文件]] — 最早的多 agent 方案：平等角色的 agent 用共享状态文件看别人在做什么、决定自己做什么并更新文件，最少规定，结果很快失败。
- [[Executive LLM]] — 多 agent 系统中按剧本主动制造麻烦、施加压力并实时调整策略的那个角色。
- [[Generator-Evaluator Loop】]] — 借鉴 GAN，把干活的 Agent 与评判的 Agent 分开，形成生成-评估循环以提升质量。
- [[integrator 瓶颈]] — 大量 worker 并行时唯一的质量与合并闸口，会因争抢 push、rebase、解冲突、merge 而成为瓶颈。
- [[工作树隔离]] — 为每个并发 Agent 分配独立工作空间，避免改同一文件造成冲突，便于事后合并。
- [[递归 planner 与 subplanner]] — 根 planner 拥有全部指令范围但不写代码，按需 spawn 完全拥有窄范围的 subplanner。
- [[结构适量原则]] — 结构要不多不少：太少则 agent 冲突、重复劳动、漂移，太多则系统脆弱；成熟模型不能照搬。
- [[上下文缺口]] — 任何Agent交互中双方各掌握对方没有的上下文，承认这点才能共同服务同一个用户。
- [[所有权与问责]] — 分离角色的核心动机：让每个 agent 拥有任务与责任，而非集体回避难题。
- [[锁竞争与乐观并发控制]] — agent 持锁过久、忘释放、乱加解锁；试过显式等待工具与无锁乐观并发控制。
- [[无层级导致的风险规避 risk-averse agents]] — 没有层级时 Agent 会趋避风险，只做小而安全的改动，难题无人负责、长期空转无进展。
- [[显式且可检查的并行]] — harness 派生多个 subagent 并行执行并监控后台作业，父 agent 需小型进程管理器负责启动、看日志、取消、合并。
- [[子 agent 与 step.invoke()]] — 用 step.invoke() 启动独立 agent run 并 fork 带自己 session key 的子会话，工具集去掉 delegate_task 禁止递归，最后向父级回摘要。
- [[自收敛与免全局同步]] — handoff 的系统性后果：即便 planner 已完成仍持续接收更新并可继续规划，信息沿链上浮到全局视角的 owner，而无需全局同步或交叉通信。
- [[最慢 worker 瓶颈与刚性]] — 角色分工版的性能天花板：系统被最慢 worker 卡住且过于刚性，规划全部前置也难动态重调，走偏的 agent 要等下一轮循环才自纠。
- [[Agent-to-Agent 交互（A2A）]] — 用户经自己的智能体对接软件的智能体，两个 LLM 协作朝同一结果推进的交互形态。
- [[context firewall]] — 让离散任务在隔离子上下文窗口里跑，中间噪音不污染父线程，维持长会话连贯性。
- [[Handoffs Agents as tools]] — Agent 把特定任务委派给其他 Agent 的机制，是与 manager 式编排并列的一种编排风格选择。
- [[Planner-Generator-Evaluator 三 Agent 架构]] — 规划、生成、评估三个 Agent 分工，支撑多小时自主编码会话产出完整全栈应用。
- [[planner–executor–judge 角色分工]] — planner 排路径与交付物，executor 作唯一 lead 保证达成并派活，judge 独立判定是否完成。
- [[Python-first]] — 用语言内置特性直接编排与串联 agent，而不引入需要另学的新抽象。
- [[sub-agent 架构与关注点分离]] — 专门化子 agent 用干净窗口做聚焦任务，主 agent 靠高层计划协调并接收摘要
- [[递归并行规划 sub-planner]] — Planner 可为特定领域生成子 Planner，使规划本身变得并行且递归。
- [[减法式改进 removing complexity]] — 改进常来自移除复杂机制，如取消专为质控与冲突解决设立的整合者角色。
- [[子 agent 编排 Fork Teammate Worktree]] — 三种子 agent 执行模型：Fork 逐字节复制父上下文、Teammate 独立终端加文件信箱、Worktree 各自 git 分支；同时是上下文管理手段。

</details>

## 验证与评估门禁（74）

> 我们怎么知道它真的做对了？

**枢纽**：[[验证闭环 verification loop]] · [[Read-only Verifier Agent]] · [[Rubric]] · [[Self-verification]] · [[基准测试的捆绑测量性]] · [[通用 harness 的公平性张力]] · [[可维护性没有惩罚项]] · [[Verifiable Codebase]]

<details><summary>全部</summary>

- [[验证闭环 verification loop]] — 把产出后必做的检查固化成可自动执行的一环，让 Claude 自己验证自己的产物。
- [[Read-only Verifier Agent]] — 执行 agent 另起一个只读验证 agent，按详细 spec 检查结果，避免执行者自我确认。
- [[Rubric]] — 明确写出「什么表现算好、什么算差」的评分标准，既驱动场景生成又约束最终评分，须指向具体片段。
- [[Self-verification]] — 让 Agent 具备端到端检查自己工作的能力，loop 的可信度取决于这份自检能力。
- [[基准测试的捆绑测量性]] — 基准很少单独测量模型，它同时测了 API 设置、harness 设计与提示词等不可见选择。
- [[通用 harness 的公平性张力]] — 通用 harness 让模型对比更公平、缺陷更可见，但也让评测偏离真实部署形态。
- [[可维护性没有惩罚项]] — 只要测试通过就算赢的评测，对侵蚀代码库可维护性没有任何惩罚。
- [[Verifiable Codebase]] — 让 agent 有可靠工具验证改动的代码库，如 Playwright CLI、关键 E2E 测试、只读 verifier agent。
- [[可验证目标]] — 目标能否被机器判断直接决定 loop 能否收敛；“优化一下应用”模糊，测试、类型检查、lint 全过则明确。
- [[大海捞针（NIAH）与词面匹配]] — 把已知事实埋入大段无关文本再让模型找回，实质考察词面匹配，能力窄却造成“长上下文已解决”的错觉。
- [[端到端验证]] — 只有跑通完整流程才算真正验证，用 e2e pipeline 与 smoke run 补局部测试之不足。
- [[多文档问答受控实验]] — 一个问题配 k 篇文档、恰一篇含答案，只操纵文档数量与答案位置，模拟检索增强生成。
- [[输入长度与任务难度的混淆]] — 长输入基准里输入变长往往连带任务变难，长度与难度混淆，失败无法定位到具体环节。
- [[验证循环：guides 与 sensors]] — 由规则式反馈、视觉反馈、LLM-as-judge 组成的验证通路，分为行动前的 guides 与行动后的 sensors。
- [[验证子系统与可运行的证据]] — 只有通过的测试套件才算数：agent 不能没有可运行的证据就说做完了，载体是 tests、lint、type-check、e2e。
- [[长上下文评测协议]] — 新验收口径：要声称模型稳健使用长输入，须证明性能对相关信息位置不敏感，最好与最坏情况差异极小，如 Flan-UL2 的 1.9 个百分点。
- [[自评失真 Self-evaluation Distortion]] — agent 能发现自己产出的缺陷，但随后说服自己可以接受，最终给出通过的判断。
- [[instruction following 的可靠性边界]] — 模型会忠实执行字面指令（真删代码、真写注释），完全依赖它对指令的遵循并不可靠。
- [[REI-Bench]] — 南洋理工 MARS Lab 发布的机器人模糊指令评测基准，按指代难度×上下文干扰分 9 级，主流任务成功率最高掉 36.9%。
- [[Review Quality 评分方法]] — 用准确性、完整性、抓 bug 潜力、可行洞见四项 1-10 打分，验证省 token 是否牺牲评审质量。
- [[Rubric 与 verifier agent]] — 借动态工作流让 Claude 起 verifier agent，用 rubric 去尝试并验证你在某领域的品味，如什么算好的 API 设计。
- [[Rubrics 与验证 agent]] — 同类招式的另一种形态：带 rubric 启动验证 agent，反过来测试并校准你在某领域的品味判断。
- [[Self-evaluation Failure】]] — Agent 评估自己的产出时倾向自信夸好，即使在人看来质量明显平庸。
- [[Self-verification loop]] — 由浏览器、日志、截图、测试器支撑，让 Agent 写码、跑测、看日志、改错的回路。
- [[Sprint Contract】]] — 每个冲刺开始前，生成者与评估者先就「什么叫完成」达成一致，再动手写代码
- [[SWE-bench 与二元打分]] — 从真实仓库抓取约十五分钟量级任务的基准，用 FAIL_TO_PASS/PASS_TO_PASS 打 0/1 分
- [[Trace-based evals]] — 用 agent trace、JSONL、确定性验证器、baseline 与轨迹复盘来衡量 skill 或 harness 的改动。
- [[Tracing]] — 框架内置的可观测能力：可视化与调试 agent 流程，并用于评估、监控与模型微调。
- [[Validation gates]] — 工作流中的检查点：完成一步后须通过测试、审查、人工确认或明示验收条件才能继续。
- [[Verifiability]] — 任务是否存在自动 reward 或成功信号，决定模型能否靠 RL 反复练习而快速进步。
- [[古德哈特定律]] — 当指标成为目标它就不再是好指标；Agent 会针对验证器优化而非真实目标，比如删掉失败测试。
- [[RHAE]] — 把模型表现与人类基线相比的评分指标；官方人类测试者约 48%，GPT-5.6 Sol 开启两项设置后 38.3%。
- [[昂贵的反馈回路与欠测试]] — 端到端跑一次太贵太慢，于是只试少数变体、验证偷懒；对概率系统欠测试即等于发布漂移。
- [[把重复步骤编码成 Skill]] — 把重复的检查步骤写成可复用的 skill，是验证闭环落地最常见的手段。
- [[闭卷与 oracle 基线]] — 给成绩定位的两条参照线：闭卷只靠参数记忆作答，oracle 只给含答案的那一篇文档。
- [[测试是绿的，产品却在退化]] — 测试断言的是旧模型行为，模型一动，绿色测试与真实回归可以同时成立，地基在悄悄漂移。
- [[差一点就通过的输出]] — 最危险的输出不是崩溃的，而是差一点就通过的：被后文间接矛盾带偏、该说不知道却编值、守字面破精神。
- [[从单元测试到评估：置信度而非正确性证明]] — 验证从“输出是否等于预期答案”转为“在输入分布与重复运行下是否满足 rubric”，得到的是置信度而非正确性证明。
- [[功能与行为验证的缺口]] — 对 OpenAI 那篇写作的保留：所有措施都指向长期内部质量与可维护性，缺的是对功能与行为的验证。
- [[静默的分级失败]] — 模型输出不会崩：95% 正确、5% 崩坏的响应看上去完全没问题，且没有可靠的“我不确定”通道。
- [[可维护性缺一个可靠的打分预言机]] — 测试秒级出结果而架构变差以月年计，故 RL 练不出守护代码质量的信号。
- [[弱而模糊的评估器]] — 自我改进回路的第一个瓶颈：多数现实任务缺乏快速精确的 verifier，研究品味等价值难以客观度量。
- [[通关 ≠ 理解]] — 通关不等于理解：Level 1 的成功掩盖模型对底层机制的缺失或扭曲，反而为错误的 Level 2 策略提供自信支撑。
- [[橡皮鸭复审]] — 请另一个 AI 家族的模型评审原型、计划或成品，利用其不同训练数据带来的不同盲区，可循环至收益递减。
- [[行为提取]] — 由独立 agent 逐轮回看对话、只抽取具体行为事实不作判断，把「看见什么」与「判断好坏」刻意拆开。
- [[形成性评估]] — 评估嵌在学习过程中持续测量、持续反馈、持续调整，而非期末一锤定音；Vantage 让它首次可规模化。
- [[验证缺口]] — 模型的自我评估与可验证事实之间的落差：它说「完成了」，实际什么都没跑通；自信不等于正确。
- [[有界改动与回归闸]] — 只允许针对已验证失败模式做有界 harness 编辑，并在 held-in 与 held-out 上跑回归，两边无退化才接受。
- [[噪声上下文]] — 带同名干扰项的上下文测试：前文一直聊苹果手机，再让机器人去拿水果苹果，考模型是否真懂语境而非按词袋瞎猜。
- [[ALFRED]] — 在虚拟家居环境中按自然语言指令完成日常任务的具身智能基准，指令全用清晰显式指代。
- [[ARC-AGI-3]] — Chollet 团队新一代基准，测新颖性、模糊性、规划、适应性的最低共同集合。
- [[back-pressure]] — 用上下文高效的自我验证给 agent 施加压力：解决成功率与自验证能力高度相关。
- [[Feedback loop]] — 写代码、运行、读取结果、修正构成的闭环，是验证真正起作用、循环能自我纠偏的核心。
- [[Grading Criteria】]] — 把“这设计美吗”这类难一致回答的问题，换成“是否符合我们的设计原则”这类可具体打分的标准。
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
- [[独立调用 Standalone]] — 最松的接入方式：产物已存在后手动触发一次，适合不必每次都做的横切检查。
- [[非尝试率与拒答模式]] — 评测中把拒绝作答剔除并单独报告的比例，反映模型因版权顾虑、发现不一致等理由不完成任务。
- [[非确定性 nondeterminism]] — 同一输入两次得到不同输出，哪怕只差几个词或从句顺序，也足以让严格等值断言失效，抽掉质量策略的地板。
- [[结构断言与不变量断言]] — 等值断言失效后的两条退路：断言结构（可解析、必填字段、计数）与断言不变量（是否违反告知的规则）。
- [[领域不均匀的谄媚（Domain-asymmetric Sycophancy）]] — 谄媚率随话题剧变：整体 9%，灵性话题 38%、亲密关系 25%，均值会骗人。
- [[弃答与幻觉：两种失败姿态]] — 模型不确定时的两种失败姿态：明确弃答，或自信地给出错误答案，存在跨家族差异。
- [[PR 级门禁 On every PR]] — 让同一条链在每个 PR 上自动跑的同级门禁，不依赖作者是否记得调用。

</details>

## 规格与意图对齐（42）

> 怎么把想要的东西准确交代清楚？

**枢纽**：[[指代表达]] · [[隐式指代]] · [[混合指代]] · [[教会 AI Agent 如何成功]] · [[判定程序化写法]] · [[示例强于规则]] · [[显式指代]] · [[Instructions files]]

<details><summary>全部</summary>

- [[指代表达]] — 人话里指称物体的表达方式，按显式、混合、隐式分档，用来衡量「听懂」的难度。
- [[隐式指代]] — 用「它」「这个重物」等代词或转喻指代前文实体的表达，需回溯多轮对话才能确定所指。
- [[混合指代]] — 指代的中间形态：一句话里既有本名又有代词，清晰度介于显式指代与隐式指代之间。
- [[教会 AI Agent 如何成功]] — 主动把调用者成功所需的信息交给 agent，而不是让它自己摸索。
- [[判定程序化写法]] — 把每条规则写成可执行的判定条件而非语气偏好，并紧跟一个已经发生过的失败示例。
- [[示例强于规则]] — 示例是比规则更强的信号：附上正好做了被禁行为的示例，模型就会照做。
- [[显式指代]] — 用物体本名直接指称任务目标，如「杯子」「锅」，简单明确但远离真实自然语言表达。
- [[Instructions files]] — 给 AI agent 写的长期工作规则文件（如 AGENTS.md/CLAUDE.md），每次执行任务都直接影响模型行为。
- [[示例的探索空间约束]] — 给示例会把模型约束在某个特定探索空间：弱模型上是脚手架，强模型上变成天花板。
- [[AGENTS.md]] — 放在代码库中向编码 Agent 交代项目约定与规则的自定义指令文件。
- [[Elicitation】]] — 通过主动提问把用户未说清的需求、偏好与约束引出来，即信息引出能力。
- [[Plan 模式]] — 让 Agent 先列出打算怎么做，方向确认后再执行，像开工前先开会过方案。
- [[Spec-driven agent workflow]] — 用明确规格、状态所有权、暂停恢复与工具边界来组织 agent 工作的开发流程
- [[TOCC]] — 前置指令重写的轻量即插即用解法，把指代解析与任务规划解耦以提高成功率。
- [[不连贯输入的重构能力]] — LLM 能从冗长、散乱、不连贯的口语流中重建出结构，是作者全文的支点式观察。
- [[冲突指令的隐性成本]] — 同一请求中互相打架的指令不会致错，但迫使模型先费力调和重叠冲突的信息，才能决定做什么。
- [[从禁止什么到对齐什么]] — 提示词设计从罗列禁令转为给出对齐目标，如要求写出与周围代码风格一致的代码，匹配其注释密度与命名惯例。
- [[规划模式与边界问题清单]] — 不新开会话直接切规划模式，让模型先问出手工实现迟早要回答的边界问题，如起止同日、清空、格式等。
- [[目标清楚 + 结果好验收]] — 交给Agent的活要目标清楚、结果好验收，两者齐备才最适合托付，交付才稳。
- [[前置声明]] — 在可能带噪声的输出前先声明来源，如「切到语音转写，抱歉有错字」，提前约定容忍度。
- [[示例会收窄探索空间]] — 给示例会把模型收窄进特定探索空间，这是对“工具使用先给示例”既有共识的反转。
- [[首次匹配即停路由]] — 视觉输出路由四步按序走、首个匹配即停，且不叙述路由、不解释、不提未选工具。
- [[意图规约与可引导性]] — harness 稳定后浮现的真正瓶颈：错误与模糊指令会被放大，重心转向引出、规约与理解意图，以及 steerability 与 observability。
- [[bits]] — 缺口不在模型能力，而在于描述你意图所需的信息量不足。
- [[Natural language as code]] — 自然语言不再只是说明文字，而是会驱动 agent 行为的可执行逻辑。
- [[Spec-First Workflow]] — 先与 agent 把规格/文档写细到能当蓝图，再让 agent 实现，review 对象主要是 spec
- [[富引用 rich references]] — spec 引用不限于简单 markdown，可用 HTML artifact、测试套件、待移植函数、rubric，且优先选代码形态。
- [[提示词工程 Prompt Engineering]] — 精心设计模型接收到的指令，使其产出的行为符合预期。
- [[产品评审 Product Review]] — 评审前先用短文档钉住要解决什么问题与成功标准，用粗糙 HTML mockup 代替文字界面，并作者自选评审人提前对齐。
- [[带文档追问】 Grill with Docs]] — 保留追问式提问的开头，并增加读取、挑战和更新领域文档的能力。
- [[共享理解】 shared understanding]] — 人与 LLM 沿设计树逐步对齐，达成对目标与约束的共同认识。
- [[漫谈会话 ramble session]] — 与 LLM 协作时刻意进行的一次长时间、无结构自由讲述，是后续所有动作的容器。
- [[模糊语言打磨】 sharpen fuzzy language]] — 让 skill 对照 glossary 挑战语言用法，讨论具体场景并交叉引用代码，把模糊表述磨明确。
- [[判断力优先 let Claude use judgement]] — 用取向式指令替代结论式规定，例如给对齐对象而不给具体答案，让模型自己判断。
- [[设计树】 design tree]] — Grill Me沿设计树分支逐层追问，并逐个处理决策之间的依赖关系。
- [[输入摩擦 too lazy to type]] — 真正的瓶颈常不是没想法，而是把脑中信息敲成文字的成本太高而被省略。
- [[小访谈变体 small interview of a few turns]] — 把一次性倾倒式的漫谈改成几轮小问答，通过来回追问把意图逐步交代清楚。
- [[意识流输入 full stream of consciousness]] — 对漫谈内容的反向要求：允许 total mess、跑题、重复与自我否定，即 full stream of consciousness。
- [[意图翻译者 intention translator]] — 1.0 时代设计者的角色：把复杂人类意图转成结构化、机器可读的格式，因机器无法理解语义也无法推理。
- [[原型先行]] — 工作流第三步：原型不再是完整阶段或奢侈品，一个提示词就有；先看见 mock，才想得到自己真正要的交互。
- [[追问式对齐】 Grill Me]] — 在动手前用持续追问逼出歧义、依赖与设计分支，直到双方形成共同理解，再开始一次编码会话。
- [[mind meld]] — 人与模型在目标与语境上的对齐程度，对齐越高协作越顺。

</details>

## 代码库与工程实践（44）

> 代码怎么写才能让人和 Agent 都读得懂？

**枢纽**：[[Agentic Engineering]] · [[宏动作]] · [[软件工厂 Software Factory]] · [[工具—工作流适配]] · [[零 bug 政策与一周 SLA]] · [[Agent-driven CICD]] · [[Blast radius]] · [[Vibe Coding]]

<details><summary>全部</summary>

- [[Agentic Engineering]] — 协调可错、随机而强大的 agent 快速产出，同时守住正确性、安全、品味与可维护性的工程纪律。
- [[宏动作]] — 编程的最小单位从敲一行代码变为委派整块工作，如实现功能、重构子系统、调研并写测试。
- [[软件工厂 Software Factory]] — 以流水线视角看软件交付：需求进 tracker、建造、评审、上线、监控、用户反馈再回到 tracker 的反馈环。
- [[工具—工作流适配]] — 新工具本身更易维护可共享，但简单替换后评审成本上升、有效评论减少；只有为 reviewer 重写工作流后才转为收益。
- [[零 bug 政策与一周 SLA]] — Linear 的质量制度：所有 bug 汇入统一 triage，一周 SLA 内修完，coding agent 先修、工程师复核。
- [[Agent-driven CICD]] — 把规则或单测驱动的 CI/CD 升级为 AI 驱动测试、日志与故障读取、并行分派修复 bug。
- [[Blast radius]] — 一处改动会波及到的函数、类与文件范围，用于判断改动影响面。
- [[Vibe Coding]] — Karpathy 提出的抬高地板范式：用自然语言描述需求让 agent 生成代码，适合原型玩票，但不许放弃质量底线。
- [[12-factor agents]] — 仿 12 Factor Apps 的 LLM 软件工程纲领，回答什么原则能让 LLM 软件好到交给生产客户，它不是框架。
- [[仓库即唯一事实来源]] — 指令、状态、功能清单必须以文件形式落进仓库，因为 agent 看不到的东西对它来说就不存在。
- [[层级架构强约束 + 给 Agent 读的 lint 错误]] — 用层级架构做强约束，并把 lint 错误写成给 Agent 直接读懂、可直接修复的指令，而非 violation detected。
- [[垂直切片 Tracer Bullet]] — 从中间向外打通一条完整可测试通路，替代按技术分层的横向计划，每步都能摸到、可随时评审 100-200 行。
- [[根因优先]] — 根因没说清楚前先别动代码：先答出问题在哪个文件哪一行、为什么这样，答含糊就继续查，答清楚再改。
- [[架构约束的确定性执行]] — 用确定性 linter 与结构性测试强制执行架构约束，而不是只交给 LLM agent 去盯。
- [[可维护性 霰弹式手术]] — 模型缺乏长期维护代码库的能力，改一处却牵连多处，即 Fowler 说的霰弹式手术。
- [[全文覆盖式编辑]] — 编辑文件时不做增量修改，直接整体重写覆盖，绕过 apply edit 的困难，代价是多费 token。
- [[软件即有向图]] — 判断准则：软件可表示为有向图（含 DAG），这也是人们曾用流程图表示程序的原因。
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
- [[程序设计 Program Design]] — 写实现前先下沉到“代码的形状”：类型、方法签名、程序布局与调用栈，用轻量可视化替代 mermaid。
- [[多语言结构化解析 12 languages node type mappings]] — 支持 12 种语言的结构化解析；扩展新语言需改 parser.py，加扩展名并补齐各类 node type 映射。
- [[非视觉任务的可视化原型]] — 即使任务看似不需要图，也先让 agent 产出多个实现方案的 Mermaid 图并排比较，再进入实现。
- [[复杂被误认为精密 complexity looked like sophistication]] — 系统能吸收的流程越多就越显得先进，于是复杂度被误读为精密，开销不断累积、系统随之退化。
- [[架构决策记录】 ADR]] — 记录难以逆转、缺上下文会显得意外、且包含真实 trade-off 的架构决定。
- [[前置对齐 front-loading alignment]] — 把规划、架构提案提前到动手之前一起做，以减少返工、加快评审。
- [[熵与腐化 entropy and decay]] — 老代码库常高度非标准化、充满熵，既是垃圾回收 agent 的对手，也是判断补 harness 是否划算的依据。
- [[缩短想法与实现之间的距离 collapsing the distance between idea and implementation]] — 把 agent 植根于产品与代码库的完整上下文，压缩想法到实现的距离。
- [[统一语言】 ubiquitous language]] — 统一语言：借用 DDD，让代码库、开发者与领域专家在 AI coding workflow 中共用同一套词汇。
- [[系统架构评审]] — 对齐服务、接口、schema、队列与存储时，用时序图、接口契约、数据模型提升人与 agent 的沟通带宽。
- [[限界上下文】 bounded context]] — 限界上下文是应用内使用同一套共享语言的范围，大型 monorepo 可包含多个此类上下文。
- [[语言驱动的代码一致性】 language-code alignment]] — context.md 里使用的语言会影响变量名、文件名、UI 文案与代码搜索路径，进而影响代码一致性。
- [[增量更新 incremental update]] — 索引随每次文件编辑与 git commit 自动增量更新，CLI 的 update 只处理变更文件，后续更新在 2 秒内完成。
- [[agentfile CLAUDE.md 与 AGENTS.md]] — 仓库顶层被 harness 注入系统提示的 markdown 文件；LLM 生成反损性能，人工撰写仅微增益，目录总览无用。
- [[HTML 标准化]] — 材料仅列名称、无正文；指网页标记语言的标准化，具体表述待补。
- [[Legible Codebase]] — 让 agent 容易判断该改哪里的代码库，靠 AGENTS.md、文档索引、custom lint 与链接检查维持。
- [[Watch 模式与自动更新 hooks]] — CLI 的 watch 命令与自动更新 hooks，让图谱在每次文件编辑和 git commit 后自动同步代码库。

</details>

## 安全权限与合规（37）

> 什么可以做、什么必须被拦住？

**枢纽**：[[Guardrails]] · [[默认帮助的高门槛拒绝]] · [[权限与推理的架构分离]] · [[大规模监控（Bulk Surveillance）]] · [[零信任 vs. 城堡-护城河]] · [[上下文即不可信输入]] · [[责任地址]] · [[exfiltration]]

<details><summary>全部</summary>

- [[Guardrails]] — 在 Agent 执行的同时并行做输入输出校验与安全检查，不通过就快速失败。
- [[默认帮助的高门槛拒绝]] — 默认帮忙，只有会造成具体明确的严重伤害风险才拒绝；仅是不适、玩闹或假设不构成门槛。
- [[权限与推理的架构分离]] — 模型决定尝试什么，工具系统决定允许什么；权限执行与模型推理在架构上分离。
- [[大规模监控（Bulk Surveillance）]] — 不挑对象先把所有人记下来再批量解读的监控模式，与定向监控相对，技术让其成本一降再降。
- [[零信任 vs. 城堡-护城河]] — 旧模型靠边界防御（城堡护城河），零信任则默认任何位置都不可信，逐次校验。
- [[上下文即不可信输入]] — 上下文里任何文字都可能是数据而非指令：记忆、检索结果、文件里的「提醒」都不等于人本人打的字。
- [[责任地址]] — 把 AI 国籍从情感叙事抽离成可追责坐标：谁训练、谁约束、谁审查、谁赔偿，这是它进入社会系统的信任前提。
- [[exfiltration]] — 借助提示注入等手段，把系统内部敏感数据偷偷带出边界的攻击行为。
- [[fail-closed 默认]] — 不确定时默认拒绝或降级：宁可误伤少量无害请求，也不放过可能造成严重伤害的输出。
- [[harness–compute separation]] — 把 Agent 骨架与执行计算的沙箱环境分离，使模型生成的代码触不到凭证等敏感信息。
- [[prompt-injection]] — 设计 Agent 系统时应假设 prompt-injection 与数据外泄尝试一定会发生。
- [[Safe autonomy]] — 在降低人工审批摩擦的同时保留权限边界与安全控制，让 Agent 能自主推进又不越界。
- [[安全路由与能力分层]] — 按模型层级与查询敏感度把请求路由到不同模型，高风险方向交由加装安全措施者承接。
- [[谄媚（Sycophancy）]] — 模型为维持互动而牺牲事实；RLHF 以人类满意为奖励，训练出的是“让你高兴”而非“说真话”。
- [[第三方连接器 opt-in]] — 第三方工具即使已连上，也必须由用户在选择器中点名，紧急也不构成例外。
- [[反自我合理化条款]] — 安全元规则：一旦发现自己把请求重新框定得更得体，或靠细分理由挑中意的做法，这个框定本身就是拒绝信号。
- [[灰盒场景]] — 服务商公开模型最终 top-k 对数概率的访问方式，介于黑盒与白盒之间，已足以泄露用户隐私。
- [[会话级累积判断]] — 安全判断看整场对话的累积输出而非逐轮孤立；累积成攻击计划就停，过去的协助不构成授权。
- [[看守看守者（Watchmen Watching the Watchmen）]] — 对掌握全民监控的一方，必须再建一套能反向监督、并在其滥权时实施惩罚的机制。
- [[可编辑面与循环外的权限控制]] — 可编辑面必须妥善设计；权限控制与安全层要活在自改进循环之外。
- [[骆驼鼻子探入帐篷（Camel's Nose in the Tent）]] — 谚语：鼻子一伸进来，整只骆驼迟早跟进；指高优先级理由一开大规模监控，低优先级用途会接连涌入。
- [[审批疲劳]] — 反复逐条点Approve会训练人不读就批，使审批这件事本身失去把关意义。
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
- [[版权合规硬上限]] — 非谈判性版权约束：引用 15 词以下、每来源一条、不串小引用、歌词诗不复现、不重建文章结构。
- [[护栏与判断力的取舍 guardrail tradeoff]] — 旧强规则为防最坏情况而存在；规则数量应随模型判断力提升而减少，是模型能力的函数。
- [[Fernet token]] — Fernet 是 AES-128-CBC 加密加 HMAC-SHA256 认证的 token 格式，前 9 字节明文含版本号与时间戳。
- [[YOLO 模式 Allow All]] — 也叫 Allow All，让 agent 无需逐次请求许可即可执行任何命令，多数工具用 /allow-all 开启。

</details>

## 模型能力与训练（66）

> 底层模型本身怎么变得更强？

**枢纽**：[[DPPO]] · [[Dr. GRPO]] · [[RLHF]] · [[RLVR 与编码 agent 的 RL 训练循环]] · [[锯齿状智能（Jagged Intelligence）]] · [[模型训练与 harness 设计的耦合]] · [[LLM Large Language Model]] · [[Reward Signal]]

<details><summary>全部</summary>

- [[DPPO]] — 用预估策略散度（TV/KL）定义的信任域，取代 PPO 中基于采样 token 概率比例的裁剪掩码。
- [[Dr. GRPO]] — 指出 GRPO 样本级归一化带来偏向简短正确与冗长错误的偏置，改用固定常量归一化并去掉标准差归一化。
- [[RLHF]] — 用人类偏好训练奖励模型再用 RL 优化 LLM，是 GPT-3 到 InstructGPT 的关键一跳，PPO 为默认算法。
- [[RLVR 与编码 agent 的 RL 训练循环]] — 生成编码 agent 的 trace、用 verifier 打分、更新权重强化好 trace 抑制坏的，循环上百万次数周到数月。
- [[锯齿状智能（Jagged Intelligence）]] — LLM 能力边界不平滑，某些任务表现惊艳，相邻的简单任务却莫名失败。
- [[模型训练与 harness 设计的耦合]] — 模型与harness在同一loop中做post-training，形成「发现原语→加进harness→训练下一代模型」的回路。
- [[LLM Large Language Model]] — 大语言模型，本质上可被还原为一个根据前文做文本补全的模型。
- [[Reward Signal]] — RL 中给模型行为打分的通道，偏好里夹带的噪声会被一并学走，写下奖励≠想要的行为。
- [[残差流]] — 模型各层之间传递的隐藏状态总线，几乎原封不动保留输入的一切细节，像过目不忘的偷窥者。
- [[多头注意力]] — 并行跑 h 组独立注意力，每组各自学习 Q、K、V，从不同维度理解同一段输入。
- [[价值函数]] — 预测在状态 s 下策略平均奖励的基线网络，用于削减方差；GRPO 移除它以省下约一半内存。
- [[推理模型]] — 推理模型：出答案前先生成长思考链、拆解推演并对证据的 AI 系统，代表如 OpenAI 的 o1。
- [[重要性采样]] — IS 比例 π_θ/π_old 把旧策略生成的样本加权成似新策略生成的，纠正生成与训练策略的不匹配。
- [[Capability Overhang]] — 模型是长出来的而非设计出来的，能力零星出现，形成一时未被利用的能力余量。
- [[multimodal Vision LLMs]] — 把图像等非文本输入也编码成模型可处理的 token，一并进入同一套处理流程。
- [[Q、K、V]] — 注意力三角色：Q 是查询、K 是标签、V 是含义；先算 Q 与 K 相似度，再对 V 加权求和。
- [[reasoning thinking]] — 让模型花更多时间与 token 推演问题的推理/思考模式。
- [[混合注意力]] — DeepSeek-V4 把 CSA 与 HCA 交替排列：CSA 管近中距离精细依赖，HCA 管超远距离模糊记忆。
- [[奖励攻击与多样性坍塌]] — 自改进回路会过拟合所给信号并压榨已知高回报模式，导致种群坍缩。
- [[模型蒸馏]] — 用更强模型的输出训练较弱模型，使竞争者以更短时间、更低成本获得同等能力。
- [[世界模型]] — 把观察到的事物整合成一致内部表征的能力；缺它不是看不见，而是无法形成整体理解。
- [[探针]] — 架在模型某一层的轻量神经网络，强行从该层数据推测原始属性。
- [[信任域]] — PPO 用裁剪重要性采样比例近似限制新策略偏离当前策略的程度，即对信任域的一种近似计算。
- [[注意力机制]] — 用 Q 查问题、K 找标签、V 取含义三步，把注意力集中到当前最相关内容上，是现代 LLM 的底座。
- [[自注意力]] — 自注意力中 Q、K、V 全部来自同一段输入，各经不同线性变换，相当于从不同角度看同一件事，使同一字在不同语境获得不同含义。
- [[capability spike 公式]] — capability spike ≈ 可验证性 × 训练注意力 × 数据覆盖 × 经济价值，四者同时高才可能跃迁。
- [[CSA]] — 压缩稀疏注意力：把 KV 分组压缩、每步只挑关键 KV 并保留滑动窗口，抑制上下文 n² 暴增。
- [[DeepSeek V4]] — DeepSeek 发布的第四代开源模型，代码能力全球领先；同时成为「开源路线能否走远」之争的具体抓手。
- [[Nerdy Personality]] — ChatGPT 的一种风格人格预设，其真实走向由 RL 奖励的口味决定，而非 prompt 文本。
- [[REINFORCE]] — 按奖励对同策略采样答案加权强化的策略梯度基础形式，相当于带权 SFT，方差大需靠基线降。
- [[RLOO]] — 每 prompt 采 K 条回复，优势=自身奖励减其余 K-1 条均值，不除标准差并放弃裁剪回到纯 REINFORCE。
- [[ScaleRL]] — 一份大规模算力下的 RL 工程方法学，用 S 型性能-算力曲线替代单点对比。
- [[Tic Word]] — 模型在不该出现的语境也忍不住反复用的词，是奖励偏差留下的口癖；可用奖励是否系统性偏向来诊断。
- [[进化式搜索与适应度]] — 变异一群解、只保留高适应度个体的优化方法，适合搜索空间极大或形状古怪、难求梯度但易评估的问题。
- [[开权重模型]] — 模型权重公开可下载、可本地部署与二次微调，不受 API 价格与数据外流约束。
- [[条件记忆]] — 条件记忆：作者主张其将成为下一代稀疏模型不可或缺的建模原语，即按条件选择性调用的记忆机制。
- [[推理 vs 训练]] — 推理 vs 训练：训练是『教』模型、吃硬件极限，推理是『用』模型、要求性价比，两者对芯片诉求不同。
- [[信息瓶颈原则]] — 理想模型应像优秀 CEO 报告：层层压缩、只保留与最终决策相关的信息，过滤无关细节。
- [[押注 in-context learning]] — 因微调迁移任务成本高、自研模型被通用大模型一夜超越，选择把宝押在模型的上下文内学习能力上。
- [[优势函数]] — 衡量某动作比基线预期好多少的量，最简单形式为奖励减基线 r(x,y)−b(x)。
- [[字面类比]] — 模型被训练数据中的字面类比绑架动作选择：局部视觉相似被误认成完整游戏规则，行动方向随之被带偏。
- [[Bitter Lesson】]] — 人们在推理模型上搭的脚手架，最终可能被更强大的模型本身取代。
- [[CISPO]] — 一种 RL 目标：不裁梯度只裁权重，把 IS 比例硬截断加 stop-gradient，保住转折 token 的梯度。
- [[DAPO]] — 解耦优势策略优化：在 GRPO 上把裁剪上下界解耦为 0.28/0.2、损失改 token 级、截断加软惩罚、动态采样过滤。
- [[GQA]] — 多个查询 Q 共享同一对 K/V，如 32 个 Q 分 8 组共用 KV，KV 显存降为 1/4，Q 的提问独立性不变。
- [[Harness 内 RL RL inside the harness]] — 用即将发布的确切工具集在 harness 内部对模型做 RL，而非事后适配，这是工具调用成功率优势的来源。
- [[Logits]] — 模型输出下一个词前对词表中每个 token 打的原始概率得分，取排名靠前的候选即 top-k logits。
- [[MaxRL]] — 把 RL 目标从 pass@1 期望奖励改为 N 次采样至少一次成功，只对成功样本求平均梯度，困难 prompt 自动获高权重。
- [[mHC]] — 流形约束超连接，用流形几何约束 Transformer 层间连接，让信息传递更短更准，提升 token 效率。
- [[Model-relative Curriculum]] — 模型换代如升学，旧 skill 与 scaffold 必须跟着重写，否则不再发挥新模型甚至成为限制。
- [[MoE]] — 把计算稀疏化，每次只激活部分专家，用更少算力换同等能力。
- [[Muon 优化器]] — 一种基于矩阵几何改造的训练优化器，替代 AdamW，让同等算力下 loss 降得更快更稳。
- [[N-gram]] — 经典局部依赖语言模型，用 O(1) 复杂度捕捉邻近词之间的关系。
- [[reasoning effort]] — coding agent 可调高或调低的推理强度，在输出质量与 token 成本之间取舍。
- [[Reward Generalization]] — 只在 A 条件下给的奖励，行为会跨条件泄漏到所有场景；RL 设计应默认奖励会泛化。
- [[RL Circuits]] — 每个应用都落在 LLM 的某片训练分布切片上：在 RL 电路里就飞，不在就得自建环境微调。
- [[SFT Feedback Loop]] — 模型生成的 rollout 被回收作 SFT 数据，把自己的口癖喂回自己，偏差逐代变成标准答案。
- [[Tiny Engram]] — 基于 Qwen-3 复现文本 Engram 后，把 Engram 迁到 Stable Diffusion 的视觉版本。
- [[Tuned Lens]] — 把中间层残差流隐藏状态提前映射成词表概率的可解释性方法，用于观察信息如何走向 logits。
- [[VLM]] — 视觉-语言模型，能同时处理图像与文字的多模态大模型。
- [[递归结构不能替代基座智能]] — 递归改进结构的收益依赖基座模型强度：模型太弱时迭代反而退化。
- [[递归自我改进 RSI]] — 系统用当下智能去改进产生其智能的认知机器，现代形态也包括改进训练流水线与部署系统。
- [[原始上下文容忍度 tolerance for raw context]] — 论文提出的智能度量：智能约等于类人度，而类人度看能消化多高熵的原始输入——1.0 吃结构化信号，2.0 直接吃文本图像视频。
- [[Co-evolution Principle]] — 模型与特定 harness 在训练环中共同演化，工具实现一改就可能因紧耦合而掉性能。
- [[GRPO]] — 组相对策略优化：每个 prompt 采一组回复，以同组均值为基线算相对优势，省掉 PPO 的 critic 模型。
- [[PPO]] — 近端策略优化：带信任域裁剪与重要性加权的策略梯度，用价值模型降方差，是 RLHF 默认算法。

</details>

## AI 产品与组织（48）

> AI 时代的公司怎么组队与交付？

**枢纽**：[[价值定义]] · [[代理原生 agent-native]] · [[共享产品系统 shared product system]] · [[交接模型 handoff model]] · [[人的手感与产品手艺]] · [[二八反转]] · [[管理 Agent]] · [[电脑应该适应人]]

<details><summary>全部</summary>

- [[价值定义]] — 人的核心价值在于判断事物是否还有价值、定义需求方向并审核结果。
- [[代理原生 agent-native]] — 不是给旧产品外挂 chatbot，而是从底层把产品改造成供 agent 使用、并为 agent 提供上下文与集成的形态。
- [[共享产品系统 shared product system]] — 人与 agent 能共同工作的系统，同时承载反馈、意图、决策、计划与代码，是上下文的载体。
- [[交接模型 handoff model]] — 旧范式：PM 先划定范围，工程师稍后接手，靠优先级与协商弥合缝隙。
- [[人的手感与产品手艺]] — 产品构建仍是手艺或艺术，靠直觉与对问题的理解决策，不把 A/B 测试和纯数据当依据。
- [[二八反转]] — 判断：未来人与软件 80% 的交互经 AI 智能体完成，UI 不消失但退居两成。
- [[管理 Agent]] — Loop Engineering 的瓶颈在管理而非工程：目标清晰、资源充足、反馈及时，既是带人也是带 loop 的条件。
- [[电脑应该适应人]] — 要求用户改造自己去迁就电脑的产品终会失败，方向必须是电脑适应人。
- [[阶段压缩 compression]] — 随着 Agent 吸收程序性工作，规划、实现、代码评审三个原本分离的阶段开始压缩融合。
- [[流程即工作 the process became the work]] — 本应服务构建的机制开销不断增长，流程本身反成主要工作，吃掉团队主要精力。
- [[Creator → Curator 角色转换]] — 工程师从「创造者」变为「策展人」：少写基础代码，多编排 Agent 组合、定义目标与护栏、验证输出。
- [[Tiger Team]] — 仅有名称的具名概念，材料未给出定义，通常指为特定难题临时组建的跨职能小队。
- [[Vantage]] — Google 联合 NYU 的实验项目，用 GenAI 角色扮演模拟团队协作，测量人的软技能。
- [[Agent-Native Infrastructure]] — 为 agent 而非给人点屏幕设计的基础设施：Markdown、CLI/API/MCP、结构化日志与可粘贴指令。
- [[0 人工代码、0 人工 review 极限形态]] — 接近「0 人工代码、0 人工 review」的工作流极限形态：用模型的高并发与低成本替代人类有限而昂贵的同步注意力。
- [[80% 质量墙]] — AI 做产品常冲到 70–80% 质量水位就卡住，而面向客户的功能里 80% 并不够用。
- [[并不 agentic」的 AI Agent]] — 以 AI Agents 为卖点的产品多数并不 agentic，主要是确定性代码，只在恰到好处的点上撒入 LLM 步骤。
- [[不可见的劳动]] — Prompt engineering 的收紧、移除矛盾、拦下静默失败等工作外界看不见，看起来你几乎什么都没做。
- [[产品记忆平台 product memory platform]] — 把产品定位为“产品上下文／产品记忆”的所在地，而非通用 agent 平台，是通往产品思考的 API。
- [[产品经理的组织化]] — 产品经理不会消失，但其对齐职能被 AI 系统削弱，产品判断分散到工程师、设计师与全团队，成为组织能力。
- [[大杂烩产品陷阱 kitchen sink product]] — 为打勾和采购清单而堆功能、什么都为所有人做的产品反面，应只沿工作流找“自然的下一步”。
- [[第一天心态 day one]] — 护城河消失时以全新眼光重看问题，不被过去的产品形态与决定绑住。
- [[个人基础设施 → 团队基础设施]] — PR 级门禁是验证从个人基础设施变成团队基础设施之处：你为自己省时间的检查，现在每次改动都为每个人省时间。
- [[交互 Scalability Interaction Scalability]] — 当 agent 产出速度远超人类注意力，需要新界面来 steer 整个系统。
- [[领域专家】 domain expert]] — 懂你在构建什么、但不一定懂你如何构建的人，提供领域判断而非技术方案。
- [[让自己对 AI 可读]] — 把文件、邮件、日历、消息开放给 AI，让它持续建立你的偏好与模式，越懂你越值钱。
- [[人类上移到更高抽象层]] — 人不被移出回路，而是上移到更高抽象层，在正确时机与层级提供监督触点。
- [[软技能]] — 分析思维、韧性、灵活性、领导力、协作等只能在互动中被观测的能力，AI 时代反而最稀缺。
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
- [[组织级技能与指引 skills Linear way skill]] — 产品内置分组织级与个人级的技能与指引，如“Linear way skill”让 agent 按固定格式把功能请求综合成可讨论、可执行的东西。
- [[AI 公司岗位编制】]] — 用公司岗位类比代码库：CLAUDE.md 是入职手册、skills/ 是 SOP、hooks/ 是合规部、src/ 是业务部门。
- [[skill 作为 onboarding 载体]] — 把新功能的使用方法写成 skill，让 Agent 带着人上手，替代传统文档式 onboarding。
- [[Software Factory]] — 长时间运行的 Agent 覆盖软件生命周期，企业把 repository 与阶段流程自动化，只保留人工检查点。

</details>

## 认知与思维方法（84）

> 人该用什么方式思考，才不被工具替代？

**枢纽**：[[默认思维倾向]] · [[常识心理学]] · [[二阶思维]] · [[外包思考，但不外包理解]] · [[刺激与反应之间的空间]] · [[惰性默认]] · [[工业强度实在论]] · [[Holding Your Opinions Lightly]]

<details><summary>全部</summary>

- [[默认思维倾向]] — 大脑预装的情绪、自我、从众、惰性四套自动反应，会在平凡时刻悄悄替你做决定。
- [[常识心理学]] — 心灵对自身的朴素认知：假定存在自我、信念欲望意图等心理状态，以及自由意志与相应责任，不依赖正规教育。
- [[二阶思维]] — 想到方案后追问直接结果之后的间接影响，反复问「然后呢」，把间接后果纳入决策。
- [[外包思考，但不外包理解]] — 调研、计算、写代码可以外包给 agent，但理解必须留在自己脑中，否则无法指挥。
- [[刺激与反应之间的空间]] — 在刺激与反应之间留出空间，不被本能驱使，让有意识的推理与判断有机会成为主导。
- [[惰性默认]] — 安于现状、沿用熟悉路径的倾向；对治靠改环境、立规则，让新默认替代旧默认。
- [[工业强度实在论]] — 把自我视为像鞋子、轮船那样独立存在的实体；笛卡尔式二元论与「自我等于某个脑区」都属此类立场。
- [[Holding Your Opinions Lightly]] — 把观点当可放下的临时假设而非身份的一部分，靠反复练习从小事认错，最终变成默认反应。
- [[3+ 法则]] — 做决定前强制列出至少 3 个选项，破解「要么A要么B」的二元取舍陷阱。
- [[50,000-year-old hardware]] — 社会与技术再进步也仍跑在演化极慢的 5 万年人脑硬件上，这是公共讨论盲区的根因。
- [[从众默认]] — 出于不被排斥的恐惧而附和多数人的做法或意见，即使内心质疑；随大流只能得到与大众相同的结果。
- [[定位]] — 好决策往往是好处境的副产品：平凡时刻决定处境，处境决定你可选的路径。
- [[感官模型快于密集文本]] — 人处理图像、形状、实物布局等感官化模型远快于密集文本，故低成本早期原型能让复杂概念立刻直观。
- [[工具理性]] — 休谟的论断：理性是也只能是激情的仆从——理性服务于目的，而不是替人设定目的。
- [[局部最优 local optima]] — 某条实践路径上可用的解，受自身摸索过程限制而非普适真理，分享时应标明适用边界。
- [[决策慢、执行快]] — 执行要快、决定做什么要慢；不要用 AI 去加速「找对问题」这一步。
- [[理性]] — 依据证据与逻辑支持信念和决策以实现目标的能力，含认识论与工具论两个子能力。
- [[难选择，易人生]] — 每次微选择选难的那条，长期人生变轻松；总选容易的，长期被难处困住。
- [[认知失调]] — 表层我与内核我之间的张力，真正难受的是抗拒本身而非承认错误，维持越久越痛。
- [[稀疏反馈推断规则]] — 从稀疏反馈中反推出可复用规则，以此构建世界模型的能力。
- [[消除主义]] — 消除主义认为根本不存在自我，自我说法在日常有用却不指向现实中任何真实特征。
- [[叙事重心]] — 丹尼特提出：自我是围绕心理生活组织起来的抽象点，是解释与预测自身的工具，而非可定位的实体。
- [[亚稳态]] — 相变过程中暂时停留的半稳中间相，说明相变可以分步发生，而不是一步到位跳到稳态。
- [[意向性系统理论]] — 丹尼特的观点：只要行为模式能让意向立场奏效，就是「真正的信徒」；意向状态是反映客观特征的图式。
- [[自我默认]] — 本能抗拒威胁自尊或地位的信息，倾向自认正确、听不进相左观点，从而忽视事实、坚持错误立场。
- [[Beliefs as Lenses, Not Armor]] — 同一信念在独断者是眼罩与盔甲，松手后变成可戴可摘的镜片，用于实验性观看世界。
- [[Facts are facts, but perception is reality]] — 事实是事实，但驱动政策与情绪的是感知；数量级估算已近乎零成本，不做即是甘愿被感知统治。
- [[Friction-based Skill Formation]] — 调试直觉、系统直觉、品味与怀疑能力只能从犯错、溯源、碰壁的摩擦中长出来，没有捷径。
- [[Rightness is a Prison]] — Cate Hall 的隐喻：把「我必须对」焊在 ego 上会锁住人，解药是松开抓握、把信念当可换镜片。
- [[Seeming-Rightness]] — 把「显得对」当作第一要务的人设，用临时编造的论证维护「我一直都对」的形象。
- [[Simulated Competence]] — 产出看起来胜任、底下能力却没长出来，AI 让「装懂」与「真懂」在结果上难以区分。
- [[Step Change]] — 能力不是平滑增长而是台阶式跳跃，一旦发生，旧判断都需重写
- [[Superforecasting]] — Tetlock 总结的高准确预测者心智习惯：频繁更新、找反证、outside view、细颗粒信念
- [[Taste]] — 在美学、判断与取舍上的品味，负责在多个可运行方案中挑出对的、优雅的那个。
- [[暗淡蓝点]] — 1990 年旅行者 1 号从 60 亿公里外回望拍下的地球，仅 0.12 像素，把人类尺度感推到极限。
- [[2026 版约束理论]] — 与其赌 10-100 倍的「灯灭」速度、说服自己代码质量不重要，不如摸熟模型的能力约束，在约束内优化系统并读代码。
- [[半途低谷]] — 长线项目的痛苦峰值不在开局或终点，而在前后都看不到岸的中间地带。
- [[概念性工作与“概念车”]] — 有些工作的产出是『概念』而非可交付功能；如概念车不量产却影响下一辆车，先把『值不值得推进』与『会不会打破系统』切开决策。
- [[给事物命名]] — 命名是为事物找安放的空间；但像「中年危机」这类词像杂物间，背后可能藏着逃避思考、拒绝反思的态度。
- [[共识捕获]] — 一个假说长期主导领域后，经费、刊物、岗位与舆论向其倾斜，挤出反对者，形成路径依赖而非最优选择。
- [[过程原则]] — 把过程而非结果当作评价对象，因运气干扰单次结果，长期看过程质量才决定成败。
- [[回声 echo of your own tangle of thoughts]] — 模型输出的并非新观点，而是你自己那团缠绕想法的回声。
- [[结果高于面子]] — 决策前先问自己是想赢这件事，还是想证明自己高人一等；照顾小我会做出不理性的选择。
- [[今天的魔法咒语，明天的反模式]] — 当前 AI 实践没有普适答案，大家边做边摸索，今天的最佳实践很可能是明天的反模式，需持续重估。
- [[举证责任]] — 论证中「谁必须拿出证据」的归属规则；举证责任一旦转移，常意味着叙事格局已经反转。
- [[决策日志]] — 写下当时知道什么、以为什么、为什么这样选，事后回看以改进决策。
- [[科学图景]] — 科学所呈现的、对现实的那一套认知图景。
- [[理性无知]] — 当获取准确知识的成本过高而收益有限时，选择不知道也是一种理性策略。
- [[品味与「不接受够用就行]] — 把「AI 输出够用就行」视为不合格，坚持质量标准并亲自分辨优劣，这是人不可让渡的价值。
- [[桥接推理]] — 靠上下文在已有记忆与当前表达之间建立联系，从而恢复代词与转喻所指。
- [[情绪默认]] — 遇事首先情绪反应而非理性权衡，愤怒焦虑疲劳饥饿会直接劫持判断回路。
- [[群体认同偏差]] — 人可能理性地选择持有非理性信念，因为迎合情感或群体认同的代价很小。
- [[日常语言哲学]] — 赖尔与维特根斯坦传统的方法：哲学的任务是勾勒我们日常对心灵等的思考与表述轮廓。
- [[软件脑]] — 把世界整体看成可用代码语言操控的数据库的世界观，默认现实与数据库一一对应，因而在 AI 时代撞墙。
- [[时间偏好]] — 高估眼前利益、低估长远利益；对应贪图享乐的当下自我与理性规划的未来自我。
- [[束理论]] — 休谟束理论：自我不是独立实体，而是一系列知觉经验的集合。
- [[思维的默认模式]] — 高考训练出的默认思维模式是先找标准答案，而非先问问题对不对。
- [[四阶段演化模型]] — 按机器智能水平划分的四阶段：原始计算、智能体、人类级智能、超人智能。
- [[四项心智力量]] — 自我问责、自知之明、自我克制、自我信心——对抗默认本能的四块品格地基。
- [[踏脚石效应]] — 把难事框成通往对方想要之物的踏脚石：先吃菜，再吃甜点。
- [[忒修斯之船]] — 逐块换掉全部木板后它还是原来那艘船吗——关于同一性的思想实验。
- [[无我]] — 没有固定不变的自我，一切流转变化——东方无我与赫拉克利特的会合。
- [[显现图景]] — 塞拉斯区分：显现图景是接触科学前对现实的日常认知，科学图景是科学所呈现的现实认知。
- [[现成在手]] — 工具顺畅运转时隐没不显，一旦损坏失灵便突显为需要严肃对待的问题对象，即现成在手。
- [[意图、判断与品味 intent, judgment, taste]] — 机械环节交给 agent 之后留给人的高价值部分：人应把时间花在意图、判断与品味上，而非管理流程。
- [[意向性立场]] — 把待预测对象当作理性主体，据其在世界中的位置与目的推断应有信念与欲望，再预测其行动。
- [[涌现]] — 大量简单要素在复杂系统中交互后自发产生、无法由单个要素预先推出的新性质或新实体。
- [[原则侧]] — 材料仅给出名称「原则侧」，未提供任何正文，本条目只如实记录该名称本身。
- [[智识上正确、政治上奢侈、道德上可疑]] — 评价一项批评的三层质检：智识上是否成立、政治上是否奢侈、道德上是否可疑。
- [[ASAP ALAP 原则]] — 按决策可逆性定速度：可逆决策尽早做，不可逆决策尽量晚做以留足信息。
- [[Fooling Yourself Takes Work]] — 对费曼名言的反转：自欺需要不断维护故事与防御，很费力；直接承认真相才是低能耗动作。
- [[Ghosts, Not Animals]] — LLM 不是有生物驱动的动物，而是人类制品的统计模拟，正确姿态是经验性熟悉。
- [[HiFi 与 HiEx 信息原则]] — 把信息质量拆成高保真（贴近一手真相）与高专业度（来源是真专家）两条，优先取一手资料与专家见解。
- [[Ostwald 阶梯规则]] — 系统相变时先跳到最容易到达的相而非最稳定的相，且常卡在那里，是反直觉的惯性法则。
- [[Quining]] — 丹尼特造的词，意为坚决否认某真实或重要事物的存在或意义，用以致敬奎因。
- [[Read–Think–Write–Verify Framework]] — 知识工作通用四步：Read 消费信息、Think 应用知识、Write 产出结构化输出、Verify 对照标准。
- [[Scaffolding Metaphor]] — 把 Agent 的支撑结构比作施工脚手架：临时、可拆除，楼盖好就该撤走。
- [[Stop FLOP Know 原则]] — 判断何时收手的三个信号：信息到边际、时机将失、局面已定
- [[The Deferred Bill]] — 用 AI 跳过自己想清楚，等于把成本推到未来，以判断力薄弱、理解浅、适应力差的形式偿还。
- [[Thinking Engine]] — 仅有名称的具名概念，材料未给出定义、来源与用法。
- [[Universal appeal — makes, not has]] — 普遍性不是作品"拥有"的属性，而是它在具体读者身上持续"制造"出来的效果。
- [[Without Defensiveness]] — 承认错误后不甩锅、不列条件、不找借口，否则承认失效，只是给「被错」打麻药。
- [[数字存在 Digital Presence]] — 人的数字上下文可持续演化，甚至在人离开后仍通过 AI 系统与世界互动。
- [[整理增益 cleaner than what you started with]] — 漫谈整理后的版本常常比起点更清晰，这份「更干净」正是整理带来的净增益所在。

</details>

## 身心与神经科学（34）

> 大脑和身体怎样支撑长期高强度的产出？

**枢纽**：[[执行功能]] · [[低电量模式]] · [[基底神经节]] · [[基因 × 环境交互]] · [[记忆巩固]] · [[多重草稿模型]] · [[赫布定律]] · [[回避行为]]

<details><summary>全部</summary>

- [[执行功能]] — 前额叶统管的专注、规划、决策与情绪调节，共享同一块有限的「电池」。
- [[低电量模式]] — 大脑疲劳时转入节能策略，注意力、工作记忆与情绪调节下降，决策交给自动驾驶仪。
- [[基底神经节]] — 位于大脑深处负责自动执行的系统，存储习惯程序，不思考只重复，关注当下与即时奖励。
- [[基因 × 环境交互]] — 基因与环境如两把钥匙须同时插入，任何一方单独存在都不足以导致行为结果。
- [[记忆巩固]] — 睡眠不仅恢复身心，还巩固重要记忆并丢弃可以被遗忘的记忆。
- [[多重草稿模型]] — 丹尼特把意识看作多个表征性草稿相互碰撞的「乔伊斯式机器」，也是他写作过程的描述。
- [[赫布定律]] — 同时被激活的神经元连接更强，练习什么就强化什么，是习惯被写进神经回路的物理基础。
- [[回避行为]] — 因焦虑预期不适而逃避某种情境；短期减轻焦虑，长期反而强化大脑对该情境的恐惧。
- [[焦虑]] — 对未来不确定或不可控事件的担忧与紧张，本质是无法预测与掌控。
- [[杏仁核]] — 大脑中快速处理恐惧等情绪信息并启动身体防御反应的核团。
- [[意志力]] — 执行功能的一部分，像会随使用消耗的电池，是有限资源；与其硬扛，不如改默认选项、建立习惯。
- [[Exhaustion Debt]] — 白天消耗多于夜间恢复、醒来没回到满格所累积的疲劳债务，长期必然压垮产出。
- [[Qualia]] — 意识的体验特性，被主张具本质性、私密性、不可言说性与可直接内省性。
- [[REM 睡眠]] — 快速眼动睡眠阶段，梦境最为生动，是睡眠分期中的一种。
- [[Wake-centric Values]] — 把清醒时段的价值凌驾于睡眠之上、试图殖民睡眠的取向；Konkoly 主张从睡眠中学习。
- [[5-HTTLPR 基因]] — 与血清素调节有关的基因，其高风险等位基因在高压下增抑郁风险、低压下反而起保护作用。
- [[短睡眠时长]] — 统计口径：24 小时内平均睡眠少于 7 小时；2024 年有 30.5% 的成年人如此。
- [[基因投资组合假说]] — 进化以投资组合方式保留稳健的蒲公英型与高风险的兰花型基因，借分散降低物种风险。
- [[可塑性与韧性的权衡]] — 可塑性与韧性此消彼长：越容易被环境塑造，就越难抵抗坏环境，反之亦然。
- [[脑海名望]] — 意识不是特殊表征媒介，而是带有内容的事件在竞争中赢得类似「名声」的一种状态。
- [[前额叶皮质]] — 大脑额叶前部的理性控制中心，负责计划、抑制冲动与自我调节。
- [[清醒梦]] — 做梦时意识到自己正在做梦的一种梦境状态。
- [[上手状态]] — 身体健康、精力饱满时像一把趁手的锤子，只用它砸钉子，根本意识不到工具本身的存在。
- [[身体年龄]] — 由生理状况评估出的身体衰老程度，可小于实际年龄，用来衡量真实健康水平。
- [[心身二元论]] — 笛卡尔主张心灵与身体是截然不同的实体，「我思故我在」确立思维之我的地位。
- [[醒后清爽感]] — 以「过去 30 天醒来自觉休息充分」的频率作答的单条睡眠恢复质量自评指标。
- [[Deconditioning]] — 去适应化：当下这种生活方式不可持续，因为它会让人一步步丧失原本的身体适应能力。
- [[Dharana]] — 瑜伽中的专注练习：训练心智一次只专注一件事，并让它按你的指令忽略其他杂念。
- [[DRD4 基因]] — 又称多动症基因，其突变既关联多动与霸凌，也关联热爱探索与寻求奖赏，走向由环境决定。
- [[Learn From Sleep vs. Learn During Sleep]] — 把睡眠当作复盘整合、从中获得洞见的来源，而不是把睡眠时段当作继续学习的时间。
- [[Psycho-phone]] — 1932 年 Saliger 专利的定时留声机，声称人睡着时也能听进并记住肯定语。
- [[Targeted Memory Reactivation]] — 睡眠中播放与学习内容绑定的线索音，经脑电确认入睡后能提升对应记忆的提取。
- [[The Grind]] — 面对长期 40–50 小时高强度工作时，如何与疲惫共处并爱上这份苦功的心态命题。
- [[前庭球]] — 嵌在阴道两侧、各约 7 厘米长的可勃起组织，属被教科书忽略的「内部阴蒂」。

</details>

## 临床医学与诊断（36）

> 信息不全时如何做出可靠的诊断？

**枢纽**：[[鉴别诊断]] · [[可疑疾病]] · [[临床推理]] · [[第二意见]] · [[干预窗口]] · [[机会性筛查]] · [[临床病理讨论会]] · [[平扫 CT + AI 多癌筛查路线]]

<details><summary>全部</summary>

- [[鉴别诊断]] — 把所有可能病因排成嫌疑人名单，再用检查一步步排除。
- [[可疑疾病]] — 症状真实却长期被医学轻描淡写或归为心理问题的疾病类别，如内异症、慢性疲劳、长新冠。
- [[临床推理]] — 医生从症状、检查、病史中「假设—验证—修正」的思维过程，不是知识问答。
- [[第二意见]] — AI 不取代主治医生的第一意见，而是在电子健康记录里被动运行、走偏前拉一把的安全网。
- [[干预窗口]] — 结直肠癌由息肉到癌常历时 5–10 年，窗口内肠镜切除治愈率超 90%，延误至晚期 5 年生存率跌至 14%。
- [[机会性筛查]] — 借患者因其他目的所做的影像检查顺带完成筛查，不额外增加辐射、费用与打扰。
- [[临床病理讨论会]] — NEJM 每周发表的麻省总医院真实病例专栏，刻意保留罕见表现与干扰信息，是临床推理的黄金评估标准。
- [[平扫 CT + AI 多癌筛查路线]] — 达摩院首创路线：一次平扫 CT 上多个 AI 模型并行，筛消化系统五大高发癌。
- [[平扫 CT]] — 医院最普通、最便宜、最常做的 CT：不打造影剂、不做特殊准备，影像本就存在。
- [[睡眠健康]] — 睡眠健康是复杂概念，含睡眠困难等成分，差睡眠关联肥胖与抑郁等健康问题。
- [[阴蒂背神经]] — 阴蒂的主感官神经通路，此前认为在阴蒂头附近减弱，新研究显示它穿过后继续像树一样分叉。
- [[大脑废物清除假说]] — 把阿尔茨海默病看作大脑废物清除系统失灵，amyloid 与 tau 只是垃圾，血管退化使清除变慢。
- [[淀粉样蛋白级联假说]] — 认为 β-淀粉样蛋白斑块是 AD 的第一张多米诺，清除它即可打断下游神经元死亡。
- [[后唇神经]] — 此前被认为只支配阴唇的后唇神经，被发现也参与阴蒂体的神经支配，扩大了外阴神经版图。
- [[见证]] — 没有治愈之道时，承认不确定并留在身边陪伴，本身就是最深刻的照护。
- [[进展期腺瘤]] — 直径≥1cm 的腺瘤，是结直肠癌演变中最关键的中间状态，若能及时切除几乎可完全治愈。
- [[人机协作]] — 医疗 AI 重心从性能验证转向人机协作，理想态是双方都知道自己何时会错、互相校准。
- [[睡眠的社会人口学差异]] — 睡眠存在社会人口学差异，而既往研究多聚焦睡眠时长，少看其他成分。
- [[睡眠健康四维测量框架]] — 美国心脏协会主张的测量框架：时长之外持续监测睡眠质量与睡眠困难等维度。
- [[睡眠困难]] — 睡眠困难指入睡困难或维持睡眠困难，是睡眠健康的重要成分。
- [[痛苦素养]] — 痛苦素养：理解疾病、不确定性与人的局限本就是生活的一部分，科学与技术并不总能彻底消除它们。
- [[医疗轻视]] — 患者最主要的主观症状被医生判定为不值得记录，医疗场景中体验被轻视、被排除在病历之外。
- [[DAMO COCA]] — 阿里达摩院与广东省人民医院的肠癌筛查 AI，从最普通的平扫 CT 识别结直肠癌及癌前病变，不加造影、不做肠道准备。
- [[差别易感性假说]] — 携带精神疾病风险基因者对环境更敏感：恶劣环境易发病，正常环境则不易罹患甚至发展更好。
- [[反向幸存者偏差]] — 症状缓解者往往离开样本、仍在受苦者留下，使这里的『幸存者』恰好是持续受苦的人，样本代表性反转。
- [[女性生殖器切割（FGM）]] — 在非洲、中东与亚洲30国约2.3亿名女性身上发生的非医学性生殖器切除。
- [[三个煤矿金丝雀]] — 低性欲（含 ED）、反复鼻窦呼吸问题、抑郁常不是独立疾病，而是底层失衡的报警信号，应顺信号找根因。
- [[痛苦的螺旋]] — 痛苦的螺旋：慢性病患者在每条信息带来的短暂希望与随后的长期痛苦之间反复下坠的历程。
- [[维萨里教条]] — 维萨里教条：把女性身体当作男性身体翻版的一整套解剖学叙事，统治教材四百余年并压缩阴蒂描述。
- [[信息稀缺优势]] — 信息越少、噪音越大时 AI 相对人类的优势越大；信息充足后人类整合能力反而追平，故 AI 最该卡在分诊那一刻。
- [[液体活检]] — 从血液中找癌症分子信号的多癌筛查路线（代表 Grail）：分子级精度，但贵且需患者主动抽血。
- [[阴蒂包皮]] — 覆盖在阴蒂头外侧的一层组织，相当于阴蒂头的「屋顶」；新研究显示阴蒂背神经也密集支配此处。
- [[阴蒂脚]] — 从阴蒂头延伸出的一对倒V形细长结构，长约8.9厘米，藏于体内，使阴蒂总长可达约10厘米。
- [[EHR]] — 电子健康记录，汇总分诊、问诊、化验、影像与住院评估的病人在院数字病历底盘。
- [[HiP-CT]] — 同步辐射相衬断层扫描，用粒子加速器超强 X 射线做微米级三维成像，可无损画出深层神经纤维走线。
- [[NHIS]] — 美国国家卫生统计中心全年持续开展的全国代表性家庭调查，覆盖非机构化平民。

</details>

## 个人生活与关系（26）

> 个人怎么设计日常、关系与自我照料？

**枢纽**：[[环境即无形之手]] · [[搭子文化]] · [[五人平均法则]] · [[交易型实用主义]] · [[理想终态]] · [[微选择复利]] · [[习惯]] · [[Boyfriend roulette]]

<details><summary>全部</summary>

- [[环境即无形之手]] — 改善行为不靠意志力，而靠设计环境，让理想行为成为下意识默认，让错误选择变难。
- [[搭子文化]] — 为某件具体活动临时配对的“功能性陪伴”，明确不期待发展为长期友谊或亲密关系。
- [[五人平均法则]] — 你约等于最亲近五个人的均值，他们的健康、思维、收入与能量会缓慢渗透进你。
- [[交易型实用主义]] — 把所有人际互动按投资回报计算，无法量化的陪伴与慰藉被系统性忽视。
- [[理想终态]] — 把想活成的样子（身体、关系、工作、地点、心智）写下来，作为日常微选择的方向锚。
- [[微选择复利]] — 微选择复利：人生质量等于每天微小选择乘以时间，单次不足道，长期累积后差距巨大。
- [[习惯]] — 被反复重复后打包交给自动驾驶仪的动作序列，约四成日常行为由它决定。
- [[Boyfriend roulette]] — 多个潜在交往对象同时出现、靠手机消息随机选中其一的说法。
- [[付费陪伴]] — 当真实关系的成本太高、风险太大，陪伴被商品化：按小时计价、风险可控、可随时退出。
- [[盲盒晚餐]] — 付费与陌生人同桌共餐，把「破圈」做成可购买的服务，让孤独被工业化、商品化。
- [[明线规则]] — 事先把规则写成「永远不」或「每次都」，触及即执行，免去临场权衡，省下意志力。
- [[偶遇表面积]] — 好运靠「行动×好奇×见人」主动扩大暴露面积换来的，是行动的副产品而非天赋。
- [[The Judo of Agreeing]] — 被攻击时主动承认错误，借走对方进攻动量，前提是接完不接「但是」。
- [[兰花型儿童]] — 对环境高度敏感的孩子：坏环境里表现最差，好环境里成就最高，是环境影响的放大器。
- [[依恋风格]] — 依恋风格决定回避这个「临时灭火器」是应急用还是日常习惯，即亲密情境里的默认反应模式。
- [[AI matchmaking]] — 由 AI 了解你的偏好、筛选撮合、安排约会并事后复盘的交友方式，被预判为五年后的常态。
- [[Dating-app fatigue]] — 交友软件倦怠：78% 使用者表示疲乏。滑动浏览并不浪漫，至多是负担，最坏是一种强迫。
- [[蒲公英型儿童]] — 对养育条件不敏感的「皮实型」孩子：不易出大岔子，也少有惊人成就。
- [[十年重塑]] — 人会在十年尺度上无声偏离自己的优先级与价值观，对策是每十年主动盘点并重置一次方向。
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

**枢纽**：[[苍白之马（Pale Horse）]] · [[Token 补贴缺口（Token Subsidy Gap）]] · [[安全边际]] · [[次贷式 AI 危机（Subprime AI Crisis）]] · [[付出按旧规则，兑现按新规则]] · [[single_advertiser_ad_unit]] · [[“SaaS 已死”叙事与护城河蒸发]] · [[办公室崇拜]]

<details><summary>全部</summary>

- [[苍白之马（Pale Horse）]] — 借《启示录》死亡之马的意象标记灾难性转折的临界信号：结构性、来自核心玩家、不可逆的定价或合同动作。
- [[Token 补贴缺口（Token Subsidy Gap）]] — 用户付 1 美元却烧掉约 8–13.5 美元算力的结构性补贴，活跃用户越多亏得越多。
- [[安全边际]] — 决策时预留缓冲，使事情比预期糟糕时仍能生存、不被提前出局。
- [[次贷式 AI 危机（Subprime AI Crisis）]] — AI 以极低折扣出售、由大厂大量补贴、风险层层打包隐藏，当烧钱追上真实成本时整条链路反向崩塌。
- [[付出按旧规则，兑现按新规则]] — 用旧时代的认知和规则投入，却在按新规则结算的市场里兑现，努力与回报之间的合同被单方面改写。
- [[single_advertiser_ad_unit]] — ChatGPT SSE 响应流中与模型输出混在一起的结构化广告事件，含品牌、轮播卡片、目标链接与 token。
- [[“SaaS 已死”叙事与护城河蒸发]] — 市场认为 SaaS 已死、护城河蒸发；作者认为方向大致对，但更可能冒出灵活新公司、笨重方案被惯性拖住。
- [[办公室崇拜]] — 必要劳动被放在低工资低尊严位置、体面叙事只留给办公室，于是人们理性地往白领岗位挤。
- [[边际成本]] — 多生产一单位商品所增加的成本；作者强调这一概念对科技行业几乎毫不相干。
- [[别人的游戏]] — 各买卖者时间框架不同，表面做同一件事其实在玩不同的游戏；先写下自己在玩什么游戏再决定听谁的。
- [[死亡地带]] — 开源模型一旦追平闭源，闭源基础模型公司「卖模型」的价值归零的那条临界线。
- [[AI 泡沫]] — 判定标准不是涨得猛，而是投入与可见收益之间出现失衡，常被类比铁路与互联网泡沫。
- [[Frontier Demand 前沿需求]] — 总市场需求中出乎意料地大的一部分，落在绝对前沿而非中间地带。
- [[OpenAI 广告基础设施域名]] — bzrcdn.openai.com 托管广告创意与 SDK，bzr.openai.com 收事件上报，是广告网络自建的物理标志。
- [[oppref]] — 广告点击 URL 上的前向归因 token，被写入 __oppref cookie（30 天），随每次转化事件回传。
- [[Reverse Digital Divide]] — 数字内容被极致通缩、人人同价可得，稀缺性转移到物理体验，线下因此重新变成高价值信号。
- [[Verification Markets]] — 用不可篡改的历史记录裁决某件事是否真的发生，而非预测未来。
- [[财富即自由]] — 最高形式的财富是每天早上醒来能说「我今天想做什么就做什么」；存款的本质是选项的数量。
- [[出海]] — 国内竞争过热后中国公司向海外扩张的产业动作，竖屏短剧出海是其在内容产业的最新案例。
- [[复利]] — 复利的真正驱动力是时间而非收益率；任何让你中途退场的决定——爆仓、割肉、停止投入——都在砍掉最值钱的尾部。
- [[合理胜过理性]] — 低潮期能坚持的策略胜过纸面回报更高但会中途下车的策略，可执行性优先于最优解。
- [[护城河清单与插件化路线]] — 逐项审视竞品优势（apply 模型、原生 fix lint、索引与向量检索），发现都不强依赖 IDE，因而看好纯插件路线。
- [[开源 vs 闭源]] — 开源靠社区传播与低门槛，闭源靠资本回报循环；能走多远取决于资本独立性。
- [[前沿实验室]] — 处在模型能力最前沿的实验室（如 OpenAI、Anthropic），长期真正的对手是开源模型。
- [[Aggregation Theory]] — 解释平台如何靠聚合需求端、以近零边际成本分发而获得垄断地位的商业理论。
- [[Intelligence Factory 智能工厂]] — 把公司目标表述为以最低价格产出尽可能多『智能单位』的工厂。
- [[Just-in-Time vs Buffer Stock]] — 效率优先的零库存随用随到，对比为抗冲击而保留冗余库存；极端事件下冗余比效率更值钱。
- [[Stargate 依赖闭环（Stargate Dependency Loop）]] — Oracle 借债建 Stargate、OpenAI 付费、资本市场叙事三者互相绑死的融资闭环
- [[Token 卖家的激励错配]] — 大厂靠多卖 token 获利，于是激励都在喊多花 token，没人喊想清楚、花得好。
- [[必要劳动]] — 城市运行离不开、但替代性强议价弱、社会回报最薄的岗位，如制造、住宿餐饮与居民服务。
- [[波动是门票]] — 长期正收益的票价就是短期波动与恐惧；把回撤当罚单（fine）会想逃，当手续费（fee）就愿意付。
- [[迪士尼负债]] — 为迪士尼之行透支或借贷、并把收入持续再花回乐园的生活模式。
- [[第三方引用杠杆]] — 品牌被第三方来源引用的概率约为被自己域名引用的 6.5 倍。
- [[对话上下文定向]] — 定向依据是当前对话本身的主题，而非 cookie 或搜索历史，信号更密更精准。
- [[对话式广告归因闭环]] — 对话主题定向→SSE 注入广告单元→webview 跳转→商家页 OAIQ 上报，把对话变成可归因渠道。
- [[获取财富 vs 保持财富]] — 获取财富靠冒险与乐观，保持财富靠谨慎与对风险的敬畏；有优势与能生存是两回事。
- [[机会成本]] — 为选择某一方案而放弃的最佳替代方案的价值，是资源配置取舍的衡量准则。
- [[激励结构]] — 钱、地位与上升通道的分布决定人的行为流向，要改方向必须改激励本身。
- [[节俭创新]] — 以有限资源实现主流目标的发展路径：用极致约束逼出工程创新，技术溢出与地面需求同时回答。
- [[看不见的财富]] — 已花掉的是 rich，尚未被消费的资产才是 wealth；看起来有钱常与真有钱相反。
- [[可自动化循环]] — 读数据→算→行动→再读数据的重复商业流程，是 AI 落地的甜蜜区，也标出了它的边界。
- [[难度即护城河]] — 痛点源于基底本性、无法被工程掉，只能被harness吸收；难做与难复制同源，即护城河。
- [[年化营收]] — 用最近一个月的真实收入乘以12推算未来一年营收，是延长线而非已实现营收。
- [[平台跃迁四浪 Platform Shifts]] — 互联网、云、移动、AI 四次大规模平台级创业窗口，每一次都批量催生新公司。
- [[尾部效应]] — 尾部效应：结果呈幂律分布，极少数罕见事件驱动巨大结果，多数年份平庸甚至亏损也不致命。
- [[系统竞争]] — 大模型竞争从单点 benchmark 转向架构、token 效率、芯片适配、软件栈、商业化与开源生态的系统竞争。
- [[粘性界面与 token 成本转移]] — 模式洞察：Linear 仍是 SaaS 的粘性界面，是工作发起与信息记录处，却不为 token 付费；成本由模型厂商和 coding agent 承担。
- [[政府资本 vs 产业资本]] — 政府资本以政策意志、KPI、政治安全为决策函数求「可控」；产业资本以风险—回报为函数求指数级回报。
- [[Agent 经济]] — 买东西、订阅、筛信息的主体可能变成 Agent，营销素材与产品界面需同时被 Agent 消费。
- [[DeepSeek Moment]] — DeepSeek 每发一代模型就冲击一次市场：集中暴露闭源路线脆弱性，把焦点从更大模型推向更高效率与更开放生态。
- [[General Purpose Technology]] — 能广泛渗透并重塑整个经济的技术，如蒸汽机、电力、互联网，需要配套的组织变革。
- [[Hyperscaler]] — 超大规模云厂商，需在云业务、自有主业与对模型公司的战略投资之间做平衡。
- [[LLM 订阅错配（LLM Subscription Mispricing）]] — 月费订阅要求单位用户成本稳定，而 LLM 用户成本可相差百倍，二者从根上不兼容。
- [[Software for one]] — 不必做给百万人的 App，可以只做给一个人用的软件，满足个体独有需求。

</details>

## 社会法律与制度（35）

> 制度与法律怎么容纳新技术和新行为？

**枢纽**：[[吹哨人困境]] · [[党的隐性契约]] · [[三种应对：接受 清除 装作不知道（Acceptance Purging Pretend Ignorance）]] · [[承诺链条]] · [[法律的模糊性]] · [[简化性暴力]] · [[道德恐慌]] · [[责任链条散了]]

<details><summary>全部</summary>

- [[吹哨人困境]] — 吹哨是赌职业生涯：要赌机构会不会保护你、同行会不会绕开你、私人关系会不会断裂，成本是私人成本。
- [[党的隐性契约]] — 党与人民之间的不成文协议：交出权利换取繁荣；一旦繁荣在心理与社会层面被看作空的，契约就开始松动。
- [[三种应对：接受 清除 装作不知道（Acceptance Purging Pretend Ignorance）]] — 当隐藏之事变得无法隐藏，社会只有三条路：接受并正常化、用「知道」来清除筛选、或约定装作不知道。
- [[承诺链条]] — 苦读→好大学→好专业→体面工作→稳定上升的因果链，AI 时代每一环都在松动，兑付能力坍塌。
- [[法律的模糊性]] — 法律的核心是灰色地带：同样事实与法条下结果不可预测，这正是律师存在的理由，也是法律无法被编译的原因。
- [[简化性暴力]] — 任何筛选机制都用局部测量冒充完整评价；不简化无协作，一简化必扭曲。
- [[道德恐慌]] — 社会对新兴事物的集体性非理性恐惧，常夸大问题、以恐惧取代客观证据。
- [[责任链条散了]] — AI 同时像软件、员工、外包商与代理人，传统「找开发商/找公司/找平台」的问责路径各自假设单一主体类型，于是全部失灵。
- [[合理性的三个考量（Three Considerations of Reasonableness）]] — 搜查是否合理取决于三项权衡：伤及无辜的概率、带来有效信息的多少、执行成本的高低。
- [[监管捕获]] — 监管者与被监管者之间的旋转门使监管结构性偏向申请人，公众利益被交易掉。
- [[人事即政治]] — 和党的利益不一致时，企业家的命运随时可被重新定义，构成常规治理无法对冲的政治不可预测性。
- [[延迟的正义]] — 高考合法性的根基不是选拔效率，而是给所有出身者一个「汗水存进银行、秋后兑付」的延迟公平承诺。
- [[照料劳动]] — 做饭、带孩子、照顾老人这类无偿劳动不计入 GDP 却必须有人做；未被市场与公共服务接住时多由女性免费承担，矛盾积压到性别关系。
- [[《你死了吗？》App]] — 一款服务独居死焦虑的轻量签到 App，因情绪被聚合可视化而被网信部门要求下架，戳破官方繁荣叙事。
- [[极权制度下的产业革命]] — 产业革命需要去中心化资本配置、自由人才流动与容忍失败的生态，与极权制度天然冲突。
- [[结构性矛盾]] — 社会需要的劳动与社会奖励的劳动错位：需求岗位在收入、荣誉、晋升上劣势，错位的是激励不是供需。
- [[结构压力的性别化误读]] — 本应共同面对制度成本的两性把账算到彼此头上，结构压力被翻译成性别敌意。
- [[流动制度化]] — 现代国家不取消流动，而是把陌生人的移动登记、追踪、追责，使其成为可处理的社会关系。
- [[律师脑]] — 相信把法条像代码那样结构化写好，社会就按写的运行；与软件脑同构，都依赖先例与结构化语言。
- [[权利从登记表开始]] — 权利多由登记、许可、合同、审计这类乏味行政动作长出来，而非浪漫宣言。
- [[赛博避难所与修罗场]] — 零门槛让线上求助空间同时成为避难所与危险地带：民间「神医」游离于职业伦理与问责机制之外。
- [[善意越轨（Benign Deviancy）]] — 大量技术上违规却被社会默许的行为是运转润滑剂；无差别监控下应让法律标准向真实行为靠拢。
- [[社会身份脆性]] — 在职业成就等于社会地位的经济里，一次岗位变动就能让人身份瞬间崩塌，并反向塑造其社交行为。
- [[社会稳定机制]] — 高考的功能不止教育，更在为阶层、城乡、地区张力提供合法且被广泛接受的竞争出口，维持社会整合。
- [[社会许可]] — 行业光有钱不够，还需社会认可它有权消耗资源；这份许可只能靠真实社会回报换取。
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

</details>

## 媒体教育与文化（58）

> 注意力、内容与人是怎么被塑造的？

**枢纽**：[[剪辑经济]] · [[death of the social]] · [[嘻哈五要素]] · [[Disney bubble]] · [[Human-Only Social Networks]] · [[swindle of fulfillment]] · [[金唱片]] · [[废料怪兽]]

<details><summary>全部</summary>

- [[剪辑经济]] — clip 从导流广告变成终端产品，切片→分发→变现形成独立生意。
- [[death of the social]] — 免费公共社交空间（公园、广场、社区中心）衰退，被付费体验经济取代，「去哪玩」从公共选择降为消费选择。
- [[嘻哈五要素]] — Zulu Nation 推行的五项振兴信条：graffiti、MC、DJ、b-boy 与 knowledge。
- [[Disney bubble]] — 进入沉浸场景后现实价格感、克制感与风险感被悬置，形成并行货币体系，这才是沉浸真正售卖的东西。
- [[Human-Only Social Networks]] — 只允许真人参与的网络，靠生物验证、Web of Trust 与类 Snapchat 的文化设计抵御 AI 群发污染公共空间。
- [[swindle of fulfillment]] — Giroux 诊断：迪士尼把幸福包装成可购买的标准化产品，代价是放弃其他快乐
- [[金唱片]] — 旅行者号携带的镀金唱片，收录 55 种语言问候与 90 分钟音乐，既是人类名片，也暴露代表性与视角局限。
- [[废料怪兽]] — 普通人视角下 AI 一边索取数据、一边向搜索结果与信息流倾泻劣质内容的双重体验比喻。
- [[扁平化]] — 把活生生的人压成数据库里的一行，丢掉其维度、纠结与矛盾，是 AI 反弹潮的核心意象。
- [[地出]] — 1968年阿波罗8号绕月时拍下的地球升起照片，让人类第一次以抽离视角看家园。
- [[屏幕时间]] — 把被动刷社交媒体、联机游戏、查资料等异质行为打包成单一小时数的粗糙指标。
- [[算法即决定性力量]] — 在 clip 时代，能否被算法推荐比内容质量更决定生死的判断。
- [[微剧]] — 微剧：2018 年前后兴起于抖音的竖屏、约一分钟一集、情节狗血反转强烈的连续短剧。
- [[语义相关性]] — 页面内容与用户所提问题的匹配程度，是效果最强的单一预测因子 r=0.432，强于任何机械 SEO 指标。
- [[AI 反弹潮]] — 公众亲身使用 AI 后形成的负面情绪，Gen Z 用得最多也最反感，靠宣传无法扭转。
- [[Hypnopaedia]] — 《美丽新世界》中的睡眠教育，除教语言外还被用作灌输政府信息的洗脑手段。
- [[霸道总裁]] — 中国网文中高权位、强占有欲的男性主角原型，视觉上常被包装成华丽西装与珠宝。
- [[被动 vs. 互动屏幕使用]] — 把屏幕使用切成被动娱乐消费与主动协作学习两类，二者影响截然不同，总量指标因此失效。
- [[达尔文式角斗场]] — 网文经评分、改编、反馈反复筛选，到达观众的是“数据上活下来的故事”，市场反馈成为内容进化压力。
- [[非洲中心主义]] — Bambaataa 把采样精神与非洲中心哲学一并带入音乐，一种不受美国现实界限束缚的生存方式。
- [[剪辑军团]] — 创作者付费雇佣分布式剪辑工，用马甲号把长内容切碎撒满全网。
- [[神话管理]] — 把创作者与其艺术形式切开，以此管理围绕其形象所构建的神话。
- [[手机成瘾]] — 以“对生活造成负面影响”为硬定义鉴别手机成瘾，个人意志难戒，需监管对冲。
- [[学习脚手架]] — 按显式、系统、由易到难的台阶搭建学习内容，让学习者每一步都站得住、能往上爬。
- [[AI 爬虫五大分类]] — AI 爬虫并非一类，各自用途不同，因此 robots.txt 不能当简单开关用。
- [[Disney hierarchy]] — 粉丝群体内部隐形的资历阶梯，用入园次数、收藏厚度等排名，使再去一次变成社会身份维护。
- [[Ghost in the Shell]] — 赛博脑乘义体乘幽灵，即寄宿于义体之中的意识的构想。
- [[Pitch】 video packaging]] — 视频的包装：标题、描述，以及如何把这条视频呈现给受众。
- [[Trutherism]] — 拿自由讨论的价值——听取证据、开放心态、对自身确定性的怀疑——反过来攻击自由公共领域。
- [[采样伦理]] — 把采样当作一种创作伦理与美学，让 Kraftwerk 与 Bronx 对话，如 1982 年的 Planet Rock。
- [[超人（Übermensch）]] — 尼采笔下征服并抛弃此前所有较低文化形式的“超人”，材料中与 Pananthropos 相对照。
- [[带球跑]] — 网文母题：怀孕女主独自出走抚养孩子，常配合“多年后重逢”完成情感闭环，套路可跨文化移植。
- [[地落]] — 2026年阿尔忒弥斯2号绕月时地球沉入月平线的景象，被视为地出的下半场。
- [[独立视频】 standalone video]] — 项目术语：不与任何 lesson 或 course 连接的独立视频。
- [[后悔流]] — 男主先亏待女主，待其真实身份或财富揭晓后追悔莫及、下跪求原谅的短剧情节套路。
- [[教育的高压筛选]] — 学校同时教学与排序，当排序压过教学，学生面对的是被淘汰的恐惧。
- [[教育技术]] — 有明确学习目标、能让孩子探索与创造的数字工具；判断标准是设计质量而非屏幕使用时长。
- [[蓝色弹珠]] — 1972 年阿波罗 17 号拍下的地球照片，把地球缩成 1.5 厘米的蓝色玻璃球，催生环保意识。
- [[量产游戏]] — 算法分发时代内容胜负由频次而非单点质量决定，创作被逼入工业化量产模式。
- [[女性碎片时间作为新基础设施]] — 微剧争夺等晾衣、接孩子这类女性碎片时间，把被电视忽略的时段变成内容基础设施。
- [[普职分流]] — 把学生分流到职业教育与普通教育的制度，现实中常被读成阶层分流。
- [[算法即制片人]] — 发布当日数据即绿灯或红灯，制片人从判官退为算法执行端。
- [[文化秃鹫转向]] — 文化秃鹫转向：嘻哈无法疗愈的道德创伤在于资本入侵、出卖与把文化当猎物式收割的转向。
- [[嘻哈教父]] — 嘻哈文化里被推上神位的教父式称号，如自称 universal hip-hop culture 的 Amen Ra。
- [[一刀切政策]] — 用粗钝工具处理问题（如一刀切限屏）：方向未必错，但刀法不对，解药是更精确的政策。
- [[营销谬误]] — 把用户对产品的真实厌恶误诊为营销不到位，相信换套文案就能改变人们亲身的体验。
- [[中国透镜下的美国]] — 中国创作者依据看过的美剧反推美国形象，构成二手想象的折射版，错位本身成为卖点。
- [[注水内容]] — 为刷分堆砌的重复内容，与已有段落同义、无新增信息，纯 Q&A/FAQ 格式反而有害。
- [[A view is a view]] — clip 播放与直播观看在广告计价上等价，一次点亮即一次流量，无高低之分。
- [[AI 可见性]] — 让 AI 更好地知晓你的内容与产品：做好内容，并用结构化、机器可读的描述告诉 AI 爬虫这边有什么。
- [[ChatGPT moment for videos]] — AI 视频生成越过临界点、引发产业级替代潮的时点，如 Seedance 2.0 后横店微剧剧组骤降。
- [[Cloaking]] — 用 User-Agent 嗅探对爬虫与真人返回不同内容，属搜索引擎会惩罚的作弊手法。
- [[First Folio]] — 1623 年出版的莎士比亚剧作合集，若无它，凯撒、暴风雨、麦克白等半数剧作将失传。
- [[GEO]] — 面向生成式引擎的内容优化，如加入权威引用可提升 AI 可见性 115%。
- [[Pananthropos]] — 希腊语「全人」，用来称莎士比亚这样拥抱整个人类经验的普遍之人。
- [[Universal Zulu Nation]] — 由 Bronx 黑桃帮转型而来的文化组织，以"和平、爱、团结、享乐"为口号。
- [[迪士尼大人]] — 把成年生活的情绪、社交与身份认同全部投射到迪士尼乐园上的成年人。
- [[灵魂剧场（theater of the soul）]] — 借自圣经研究的说法，指文学与戏剧为灵魂提供安放焦虑、自我定位的空间。

</details>

## 地缘与基础设施（36）

> 算力、航道与条约如何划定长期格局？

**枢纽**：[[旅行者号]] · [[冰相]] · [[数据中心]] · [[Choke Point]] · [[海峡过路费]] · [[载重平衡]] · [[DART任务]] · [[阿尔忒弥斯协定]]

<details><summary>全部</summary>

- [[旅行者号]] — 1977 年发射的姊妹探测器，靠耐久设计与钚-238 核电池撑近半世纪，1 号已进入星际空间。
- [[冰相]] — 冰是水在不同温度压强下按不同方式重排凝固成的整个晶体家族，实验室已观察 20 多种，模拟预测上万种。
- [[数据中心]] — AI 的物理基础设施：装满联网计算机的大仓库，吃电、吃水冷却、占地。
- [[Choke Point]] — 全球贸易中绕不开的关键水道或节点，控制一点即可影响世界能源价格与通胀曲线。
- [[海峡过路费]] — 在咽喉水道设卡收钱，把军事控制力直接变现为订阅式现金流，比一次性封锁更持久。
- [[载重平衡]] — 配载部门按机型、油耗、旅客与行李重量测算，把重量分布到机舱各位置，使飞机重心始终落在安全窗口内。
- [[DART任务]] — 2022 年航天器撞击小行星并改变其轨道，验证偏转技术可行；但预警阈值、拦截成本与落点责任仍待厘清。
- [[阿尔忒弥斯协定]] — NASA 主导的月球—火星规则框架，侧重商业生态外延，与中国 ILRS 构成两套并行太空治理。
- [[冰 XXI]] — 2025 年 KRISS 用金刚石压砧加 X 射线自由电子激光发现的新冰相，晶胞需 152 个水分子才重复一次。
- [[超离子冰]] — 高温高压下氢彻底脱离氧键自由游走、氧仍守晶格，形成会导电的固态冰，可能是冰巨星内部最常见的水形态。
- [[国际月球科研站]] — 中俄联合发起、面向全球开放的月球长期驻留方案，把月面科研网络做成可扩展、可维护、可共享的公共基础设施。
- [[芯片管制]] — 美国对高端 AI 芯片的出口管制直接限制中国训练前沿模型的算力供给，是资本投入补不上的结构性短板。
- [[蒸发冷却]] — 数据中心用水的主要去处：机器跑电生热，热靠水蒸发带走，工业冷却效率约 60-90%，因此 AI 用电规模≈AI 用水规模。
- [[AI 从应用到基础设施]] — AI 正从商业资产变为安全资产：它不只承载服务，还参与判断、可能成为社会接口，因而被国家审查。
- [[标准平均旅客重量]] — 民航用固定平均体重（成人 75 kg 含衣物行李）替代实测，靠大数定律让人越多整体偏差越逼近零。
- [[冰 XXII]] — 东京大学小林宏树团队复现冰 XXI 时发现的相邻新相，每 304 个水分子才重复一次，刷新最复杂冰纪录。
- [[霍尔木兹海峡]] — 全球约 20% 石油与 LNG 经过的咽喉水道；伊朗实际取得支配权，是地图未变而权力已变的案例。
- [[金刚石压砧]] — 把样品夹在两颗金刚石尖之间，既施加超高压又让 X 射线穿透观测的实验装置。
- [[经济耐力比赛]] — 军事胜利与谈判都僵住时，战争退化成谁的经济与民意能更久扛痛的比拼。
- [[平行 AI 基础设施]] — 从芯片、框架到数据中心，中国建一套不依赖美国体系的完整 AI 技术栈。
- [[全球贸易路线重布线]] — 主干道变得不可靠时，世界绕开它另建管道扩港改路，长期反而加速其被绕开。
- [[日球层]] — 太阳风吹出的巨大等离子体气泡，保护太阳系内部免受大部分宇宙线侵袭，外缘为日球层顶。
- [[昇腾]] — 华为国产AI加速芯片系列，950 supernode可承载frontier模型推理，被视为算力封锁威慑减弱的信号。
- [[塑性冰 VII]] — 高压高温下晶格仍在、水分子原地快速自转因而带弹性的冰相。
- [[危险先例]] — 危险先例：一旦违规者获利成功，其他国家便有模板可循，故对海峡收费必须零容忍。
- [[引力助推]] — 探测器飞掠行星时借用其引力改变速度与方向，无需额外燃料即可加速、缩短飞行时间。
- [[隐性控制]] — 不靠占领或条约，仅凭「已经做到过一次」的事实记忆，在他人预期中建立的可重复杠杆。
- [[中子散射]] — 用中子束打进物质内部，探测 X 射线几乎看不见的氢原子的位置与运动状态。
- [[重心]] — 飞机姿态稳定的杠杆支点，重心一旦偏出安全区间，俯仰可控性立即崩塌。
- [[最后一分钟修正]] — 舱单完成后起飞前，在上限内（A320-200 最多 6 人或 500kg）于备注栏微调燃油、机组、旅客、货物，经签字确认；超限须重做舱单。
- [[Acre-foot]] — 美西水文标准水量单位：1 英亩面积上 1 英尺深的水，约 1,233 立方米。
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
