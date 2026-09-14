# 决策题工作单（2026-09-14）

机器已完成：正确项 76 个 · 候选误区 264 条。
待人工：76 单元 × 3 题 × 2 干扰项 = **456 个干扰项 + 456 条 why**。

> 干扰项**不许照抄**候选里的陈述句 —— 要改写成「按这个做」的做法式选项。

## batch-agent（ready）

- QST：能不能讲清「AI Agent」
- **正确项（机器已填）**：识别一个系统是否真的具有 Agent 行为时，检查它能否围绕目标根据结果选择下一步，而不只看是否使用了 Agent 名称。
  - 依据：`SOL-agent` · units[id=SOL-agent].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L21 Agent 不等于 LLM；模型负责推理与生成，工具执行、状态维护、权限和循环来自外部系统。
  - 　 L22 “能调用一次工具”是重要分界，但生产级 Agent 通常还需要错误处理、验证、停止条件与状态管理。
  - ★ L23 Agent 与 Agent Harness 不是同义词；前者描述呈现出来的行动系统，后者强调产生和约束这种行为的运行机器。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-agent-action-space（scaffold）

- QST：能不能讲清「Agent 行动空间」
- **正确项（机器已填）**：枚举当前环境允许的动作、参数范围、前置条件和返回反馈。
  - 依据：`SOL-agent-action-space` · units[id=SOL-agent-action-space].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L19 行动空间不等于工具数量；同一工具的参数、调用时机和组合方式也会改变可行动边界。
  - 　 L20 更大的行动空间不必然更强，超出模型可理解范围的选择会增加混淆和风险。
  - 　 L21 当前证据缺口：当前证据未给出衡量行动空间复杂度或模型工具适配度的统一指标。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-agent-cli-runtime（scaffold）

- QST：能不能讲清「Agent CLI 运行时」
- **正确项（机器已填）**：把流程需要的输入、输出、退出码和环境依赖写成稳定命令接口。
  - 依据：`SOL-agent-cli-runtime` · units[id=SOL-agent-cli-runtime].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 它是工作流的命令行运行载体，不是工作流定义本身。
  - 　 L21 它只覆盖 CLI 执行边界，不等同于包含权限、状态、评测等完整职责的 Agent Harness。
  - 　 L22 当前证据缺口：需要不同 Agent CLI 的对照，确认共同的运行合同与能力边界。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-agent-elicitation（scaffold）

- QST：能不能讲清「Agent 信息引出」
- **正确项（机器已填）**：在行动前列出会改变答案、风险或权限的未知量。
  - 依据：`SOL-agent-elicitation` · units[id=SOL-agent-elicitation].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 信息引出不是无条件多问；只有缺失信息会改变答案、风险或下一步时才值得打断用户。
  - ★ L21 提问接口应降低回答摩擦，并把答案可靠地送回原任务，而不是另开无关对话。
  - 　 L22 当前证据缺口：当前证据未给出何时提问、何时采用默认值以及如何衡量提问摩擦的通用阈值。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-agent-handoff（scaffold）

- QST：能不能讲清「Agent 交接」
- **正确项（机器已填）**：交接包至少写清目标、当前进度、已验证证据、失败与阻塞、关键位置、未完成项和明确下一步。
  - 依据：`SOL-agent-handoff` · units[id=SOL-agent-handoff].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L20 把子 Agent 当工具调用后拿回结果，不等于把当前任务的控制权完整交给另一个 Agent。
  - ★ L21 Handoff artifact 是可恢复的任务状态，不是把整段聊天或全部上下文原样倾倒给下一位 Agent。
  - ★ L22 发出交接请求不等于完成交接；接收方应核对证据、真实状态与责任范围后确认接管。
  - ★ L23 交接能延续工作，不保证前一位 Agent 的判断正确；关键事实仍需对真实文件、测试或外部状态复核。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-agent-harness（ready）

- QST：能不能讲清「Agent Harness」
- **正确项（机器已填）**：排查 Agent 失败时，分别检查模型判断、循环、工具、状态、Context、权限、错误处理和验证，避免把所有问题都归因于模型能力。
  - 依据：`SOL-agent-harness` · units[id=SOL-agent-harness].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L20 Agent Harness 不等于模型；模型负责生成判断或工具请求，Harness 负责执行、回灌、状态与控制。
  - ★ L21 Agent Harness 也不等于用户感知到的 Agent；本站用 Agent 描述围绕目标持续行动的系统表现，用 Harness 描述产生并治理这种表现的运行机器。
  - 　 L22 “模型外一切”是便于划界的广义口径；工程实践中也有只把循环、工具分发与状态处理称为 Harness 的薄口径，讨论时要先声明范围。
  - ★ L23 Harness 会与 Context Engineering 交叉，因为它必须在运行时装配信息；但 Context 负责“模型看到什么”，Harness 负责“系统怎样持续、受控地运行”，不能静默压成一条轴。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-agent-lifecycle（scaffold）

- QST：能不能讲清「Agent 生命周期」
- **正确项（机器已填）**：为开工、运行、暂停、恢复和收尾分别定义入口条件、必要动作、产出证据与退出条件。
  - 依据：`SOL-agent-lifecycle` · units[id=SOL-agent-lifecycle].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 Lifecycle 定义阶段、转换和交接责任，不等于 Agent Loop 的逐步推理与工具调用循环。
  - ★ L21 暂停不是结束，恢复也不是重新开始；二者需要可读状态、环境核对和明确所有权。
  - ★ L22 Hook 是在生命周期事件上执行检查、通知或清理的一种实现方式，不是 Lifecycle 的同义词，也不能替代阶段设计。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-agent-loop（scaffold）

- QST：能不能讲清「Agent 循环」
- **正确项（机器已填）**：记录每一轮的输入、模型选择、工具参数、工具结果和停止原因，定位空转、早停与错误回灌。
  - 依据：`SOL-agent-loop` · units[id=SOL-agent-loop].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L20 Agent Loop 只描述单个 Agent 内部“选择—执行—观察—再选择”的行动心跳，不等于外层持续工作流、多 Agent 编排或 Loop Engineering。
  - ★ L21 模型生成工具调用请求，不是模型亲自执行工具；执行和结果封装由 Harness 完成。
  - ★ L22 退出不能只依赖模型随口说“完成”；真实系统还应有最大回合、预算、无进展、权限拒绝与用户中断等边界。
  - ★ L23 循环持续运行不等于任务已经正确完成，仍需独立验证结果。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-agent-session-management（scaffold）

- QST：能不能讲清「Agent 会话管理」
- **正确项（机器已填）**：检查当前目标、已加载历史、错误路径和未落盘状态是否仍服务于下一步。
  - 依据：`SOL-agent-session-management` · units[id=SOL-agent-session-management].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - 　 L20 会话管理不只是开关聊天窗口，而是管理历史、工具输出、错误路径与后续任务是否仍应共享同一上下文。
  - 　 L21 更大的上下文窗口只推迟容量上限，不会自动消除噪音、错误路径和上下文腐烂。
  - 　 L22 当前证据缺口：当前证据聚焦 Claude Code 命令，需要跨 Agent 产品核对可迁移的会话操作与状态语义。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-agent-stop-conditions（scaffold）

- QST：能不能讲清「Agent 终止条件」
- **正确项（机器已填）**：为成功、预算耗尽、风险升级、重复状态和连续无进展分别定义可观测条件。
  - 依据：`SOL-agent-stop-conditions` · units[id=SOL-agent-stop-conditions].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L20 它不是任务成功判定的同义词；循环可能因预算、风险或无进展而在未成功时停止。
  - ★ L21 终止条件应由 Harness 执行，不能只依赖模型自行承诺停止。
  - 　 L22 具体阈值取决于任务风险、成本和可恢复性，不存在通用固定数值。
  - 　 L23 当前证据缺口：需要补充停止后转交、恢复和告警的标准处理路径。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-agent-tool-contract（scaffold）

- QST：能不能讲清「Agent 工具契约」
- **正确项（机器已填）**：列出模型可以表达的操作意图，并为每种意图限定必填参数和可选参数。
  - 依据：`SOL-agent-tool-contract` · units[id=SOL-agent-tool-contract].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L19 它不是工具能力本身，而是模型如何选择、调用并接收工具结果的责任边界。
  - ★ L20 工具契约清晰不等于权限安全；授权、沙箱和护栏仍需独立控制。
  - 　 L21 它只覆盖结构化意图经工具接口交给确定性程序执行与回传的契约，不把所有 AI 应用中的确定性代码拼接都收进来。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-attention-budget（ready）

- QST：能不能讲清「注意力预算」
- **正确项（机器已填）**：每加入一段材料都问它会支持哪项当前判断；说不清用途的内容优先留在外部。
  - 依据：`SOL-attention-budget` · units[id=SOL-attention-budget].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L19 Attention Budget 不等于 Context Window；前者描述有限利用与竞争的工程直觉，后者描述一次调用的容量和处理边界。
  - ★ L20 它不是一个跨模型、跨任务通用且可直接读取的精确数值，也不能单独解释所有长上下文退化。
  - ★ L21 更多 Context 不是必然更差；新增的高价值证据可能提高结果，关键在相关性、组织方式、位置和任务。
  - ★ L22 Context Rot 与 Lost in the Middle 是经验表现或位置效应，不能被写成 Attention Budget 已证实的单一因果结果。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-bounded-context（scaffold）

- QST：能不能讲清「限界上下文」
- **正确项（机器已填）**：找出一个经常引发争议的业务词，分别记录各团队用它做什么决定。
  - 依据：`SOL-bounded-context` · units[id=SOL-bounded-context].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L19 它来自领域驱动设计，不等于 LLM 的 Context 或 Context Window。
  - 　 L20 仓库目录可以承载边界，但目录结构本身不会自动形成清晰的领域边界。
  - 　 L21 「限界上下文」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-browsing-loop（scaffold）

- QST：能不能讲清「浏览循环」
- **正确项（机器已填）**：在搜索前写下要支持的决定、三个关键未知量和可接受的证据类型。
  - 依据：`SOL-browsing-loop` · units[id=SOL-browsing-loop].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 它不是所有广泛探索；开放式规划任务可能确实需要先建立较宽的区域理解。
  - 　 L21 判断重点是每一轮是否减少关键不确定性，而不只是工具调用次数是否增加。
  - 　 L22 「浏览循环」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-change-impact-analysis（scaffold）

- QST：能不能讲清「变更影响分析」
- **正确项（机器已填）**：从变更的符号和文件出发，沿调用、导入、继承与测试关系向外展开。
  - 依据：`SOL-change-impact-analysis` · units[id=SOL-change-impact-analysis].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L21 影响分析给出应检查的范围，不等于证明这些位置已经发生缺陷。
  - 　 L22 静态图谱可能漏掉反射、动态加载、运行时配置或外部服务产生的依赖。
  - 　 L23 当前证据缺口：当前证据来自单一代码图谱实现，尚缺动态依赖与跨服务影响的覆盖说明。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-chat-template（scaffold）

- QST：能不能讲清「聊天模板」
- **正确项（机器已填）**：核对目标模型要求的角色标记、起止符和生成提示位置。
  - 依据：`SOL-chat-template` · units[id=SOL-chat-template].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - 　 L19 聊天模板制造连续对话的输入格式，不会让无状态模型本身获得持久状态。
  - 　 L20 模板格式属于运行接口；它不同于当前对话内容，也不同于定义长期行为规则的系统提示。
  - 　 L21 当前证据缺口：当前证据未比较不同模型族的模板差异与模板错配的失败表现。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-code-execution（ready）

- QST：能不能讲清「代码执行」
- **正确项（机器已填）**：明确允许的运行时、目录、网络、凭据、资源上限和超时。
  - 依据：`SOL-code-execution` · units[id=SOL-code-execution].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 代码执行是 Tool 的一类高通用能力，不等于模型本身在执行代码。
  - 　 L21 通用性不会自动带来安全性；权限、Sandbox、超时和结果验证仍需独立设计。
  - 　 L22 当前证据缺口：需要补充不同执行形态的边界，例如 shell、解释器与远程计算环境。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-context（ready）

- QST：Claude 5 世代的上下文工程，规则变了
- **正确项（机器已填）**：排查回答错误时，先列出模型在出错那一轮实际看到了什么，不要用“系统里存着什么”替代这份清单。
  - 依据：`SOL-context` · units[id=SOL-context].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L19 Context 是当前可见的信息集合，不等于承载它的 Context Window；窗口更大也不保证所需信息已经进入或能被可靠使用。
  - 　 L20 Memory 中已保存但未被取回的内容，不属于当前 Context；会话历史若已随本轮输入送入，则属于当前 Context。
  - 　 L21 Tool 的名称、说明和参数 schema 可以进入 Context，但真实 Tool Execution 发生在模型外。
  - 　 L22 本卡采用 LLM 运行时语境，不声称覆盖普适计算与 HCI 对 Context 的全部广义定义。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-context-compaction（ready）

- QST：能不能讲清「上下文压缩」
- **正确项（机器已填）**：先以召回率为优先，确保架构决定、当前目标、未决问题、重要约束与下一步没有被漏掉。
  - 依据：`SOL-context-compaction` · units[id=SOL-context-compaction].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L21 压缩不等于删除最旧消息；它要提炼当前仍重要的状态、决定与未决事项。
  - ★ L22 压缩不等于结构化记事或完整外部记忆；摘要负责连续性，可恢复引用负责回查，两者应显式区分。
  - 　 L23 压缩是有损转换；摘要遗漏、错误归纳和过早丢弃都可能让后续任务偏航。
  - ★ L24 压缩通过释放空间缓解窗口压力，但不能自动消除 Context Rot、错误状态或错误目标。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-context-engineering（ready）

- QST：Claude 5 世代的上下文工程，规则变了
- **正确项（机器已填）**：从任务决策倒推模型这一轮必须知道什么、可以稍后再取什么、什么应留在窗口外。
  - 依据：`SOL-context-engineering` · units[id=SOL-context-engineering].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L19 它不等于 Prompt Engineering；提示词工程主要处理指令怎样表达，上下文工程管理每轮整体信息怎样进入模型。
  - 　 L20 Context 是被管理的对象，Context Engineering 是持续选择、装配、更新这一对象的工程实践。
  - ★ L21 工程范围轴上，本站采用 Harness Engineering 通常包住 Context Engineering；系统职责轴上，Context 侧主要管信息，Harness 侧主要管运行。两条轴不能混成单一包含关系。
  - ★ L22 “提供完成任务所需的一切”不表示把所有可用资料一次性塞入窗口，也不保证模型输出必然正确。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-context-rot（scaffold）

- QST：能不能讲清「上下文腐烂」
- **正确项（机器已填）**：先证明模型在短输入条件下能完成任务，再固定任务难度、相关证据与评分方法，只改变输入长度。
  - 依据：`SOL-context-rot` · units[id=SOL-context-rot].key_fields.solution_summary
- 候选误区 5 条（★ = 含否定词，可能更像误区）：
  - ★ L20 Context Rot 不等于 Context Window；前者谈实际利用可靠性，后者谈一次调用可承载的容量边界。
  - ★ L21 它不等于 Lost in the Middle；后者专指位置效应，而 Chroma 的语义相似度实验跨 11 个 needle 位置没有观察到显著位置影响。
  - 　 L22 报告没有给出统一失效阈值。更长输入仍可能带来信息增益，是否值得取决于具体任务、模型与实测。
  - 　 L23 不同模型会以漏答、幻觉、拒答或复制错误等不同方式表现不可靠；只统计一种失败姿态会读错结果。
  - 　 L24 needle-haystack 相似度实验只覆盖两个主题，作者明确认为证据不足以支持普遍结论。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-context-selection（scaffold）

- QST：能不能讲清「上下文选择」
- **正确项（机器已填）**：先列候选来源与纳入标准，再说明每项材料支持哪个当前决策、依赖或验证步骤。
  - 依据：`SOL-context-selection` · units[id=SOL-context-selection].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L21 Context Selection 回答选什么；Dynamic Context Assembly 回答选中内容怎样排序、格式化和组合，二者不是 Alias。
  - ★ L22 它也不等于 JIT Retrieval；后者强调何时取回，Selection 仍需判断取回结果是否值得进入当前 Context。
  - ★ L23 语义相似度只是候选信号之一；论文同时讨论逻辑依赖、新近性与频率、信息重叠及用户反馈，不能把 embedding 排名直接当成纳入结论。
  - ★ L24 这篇综述给出的是方法族与设计考量，并未证明某一种筛选规则对所有任务最优。选择通过也不保证材料正确或完整。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-context-window（ready）

- QST：能不能讲清「上下文窗口」
- **正确项（机器已填）**：同时检查窗口上限与当前实际占用。
  - 依据：`SOL-context-window` · units[id=SOL-context-window].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L19 容量边界不等于实际 Context 内容。
  - 　 L20 更大窗口不自动带来更好的检索、注意或推理。
  - ★ L21 上下文窗口不等于跨会话长期记忆。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-durable-execution（scaffold）

- QST：能不能讲清「持久化执行」
- **正确项（机器已填）**：把长任务拆成有明确输入、输出和提交边界的步骤，并把运行状态存到短命计算环境之外。
  - 依据：`SOL-durable-execution` · units[id=SOL-durable-execution].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 Durable Execution 不等于 checkpoint；保存恢复点是必要部件之一，却不能单独保证续跑正确。
  - ★ L21 重放必须区分纯计算、可幂等调用和不可安全重复的外部副作用；不能假设所有步骤都能再跑一次。
  - ★ L22 “状态已恢复”不代表外部世界回到旧状态；工单、付款、邮件、文件写入等副作用要靠幂等键、事务、补偿或人工确认处理。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-dynamic-context-assembly（scaffold）

- QST：能不能讲清「动态上下文装配」
- **正确项（机器已填）**：先列出当前任务真正需要的信息与能力，再为每项明确来源、触发时机和呈现格式。
  - 依据：`SOL-dynamic-context-assembly` · units[id=SOL-dynamic-context-assembly].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L21 动态装配不等于 Context Selection；选择回答“取什么”，装配还要处理来源、时机、格式、顺序与本轮输入的组合。
  - ★ L22 动态装配不等于一次写死的 Prompt 模板；同一任务在状态、权限或外部数据变化后，装配结果也可能变化。
  - ★ L23 它不保证输出正确；来源质量、冲突、权限、工具失败和模型能力仍需独立验证。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-error-handling（ready）

- QST：能不能讲清「错误处理」
- **正确项（机器已填）**：至少区分瞬时、模型可恢复、用户可修复、意外和安全类错误，并为每类规定次数、退避、超时与退出条件。
  - 依据：`SOL-error-handling` · units[id=SOL-error-handling].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L19 Error Handling 不等于 retry；对权限拒绝、无效输入或不可重复副作用盲目重试，可能扩大损失。
  - 　 L20 把错误返回模型只适用于模型能据此修正的情形；系统异常与安全事件仍需确定性的上报或停止路径。
  - ★ L21 处理完成不等于结果正确；错误恢复后仍需要验证循环确认任务产物。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-event-driven-agent-automation（scaffold）

- QST：能不能讲清「事件驱动的 Agent 自动化」
- **正确项（机器已填）**：定义可触发的事件、必要载荷和事件唯一标识，并过滤无关变化。
  - 依据：`SOL-event-driven-agent-automation` · units[id=SOL-event-driven-agent-automation].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - 　 L19 事件触发只决定何时启动，不自动保证后续动作正确、幂等或安全。
  - 　 L20 它不同于持续轮询，也不同于由人手动发起一次 Agent 会话。
  - 　 L21 当前证据缺口：当前证据未覆盖重复事件、失败重试和副作用控制。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-filesystem-workspace（scaffold）

- QST：能不能讲清「文件系统工作区」
- **正确项（机器已填）**：规划输入、生成物、临时文件和回执的目录边界与命名规则。
  - 依据：`SOL-filesystem-workspace` · units[id=SOL-filesystem-workspace].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 文件系统是稳定载体，不等于 Memory 或 State Management；后两者描述保存与恢复哪些信息的职责。
  - ★ L21 工作区可持久不等于安全隔离；Sandbox 还要限定执行环境和影响范围。
  - 　 L22 当前证据缺口：需补充无本地文件系统的远程 Agent 实现，以校准载体边界。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-guardrails（ready）

- QST：能不能讲清「护栏」
- **正确项（机器已填）**：先明确每条护栏检查什么对象、依据什么规则、在何时运行，以及触发后是阻断单次调用还是停止整个 Agent。
  - 依据：`SOL-guardrails` · units[id=SOL-guardrails].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L20 Guardrails 不等于 Permission Boundary；权限边界回答“这个主体是否被授权”，护栏还可检查内容、参数、结果和运行条件。
  - ★ L21 Guardrails 不等于 Sandbox；前者尝试检测和阻断不合规路径，后者限制即使动作发生后最坏影响能扩散到哪里。
  - ★ L22 护栏会误报或漏报，不能替代最小权限、沙箱、验证和人工确认。
  - ★ L23 输入、输出与工具护栏不是同一个检查点；讨论或排错时要说明检查对象、执行时机和触发后的动作。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-harness-compute-separation（scaffold）

- QST：能不能讲清「Harness 与计算分离」
- **正确项（机器已填）**：列出状态、凭据、控制决策与不可信计算，分别指定所属层和通信接口。
  - 依据：`SOL-harness-compute-separation` · units[id=SOL-harness-compute-separation].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L20 它是运行架构分层，不是把 Harness 或沙箱从 Agent 系统中移除。
  - ★ L21 分离能降低执行环境接触凭据的机会，但不能单独消除提示注入或数据外泄风险。
  - 　 L22 具体进程、网络和存储边界仍由实现决定。
  - 　 L23 当前证据缺口：需要明确不同部署形态下状态、凭据与网络边界的实现差异。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-harness-engineering（scaffold）

- QST：能不能讲清「Harness 工程」
- **正确项（机器已填）**：先固定模型、任务与评测条件，再逐项改变循环、工具、状态、权限、错误恢复或验证，避免多变量一起变化后无法归因。
  - 依据：`SOL-harness-engineering` · units[id=SOL-harness-engineering].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - 　 L19 工程范围轴上，本站采用 Prompt Engineering → Context Engineering → Harness Engineering 的范围递增表达，Harness Engineering 通常包住前两者。
  - 　 L20 系统职责轴上，Context Engineering 主要管理模型获得的信息，Harness Engineering 主要管理系统怎样持续、受控地运行；两者在运行时 Context 装配处交叉。
  - ★ L21 HumanLayer 来源曾提出 Harness Engineering 是 Context Engineering 的子集，与本站工程范围轴方向相反；该来源观点仍保留为 HOLD，不能被本站口径改写成行业共识。
  - ★ L22 Harness Engineering 是工程实践，Agent Harness 是被设计和改进的运行对象；二者不是 Alias。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-harness-overfitting（scaffold）

- QST：能不能讲清「Harness 过拟合」
- **正确项（机器已填）**：固定模型、任务、权限和评分，准备两套能力尽量等价的 Harness 接口。
  - 依据：`SOL-harness-overfitting` · units[id=SOL-harness-overfitting].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - 　 L20 与原生 Harness 协同良好不自动等于过拟合；只有跨等价接口的泛化下降才支持该判断。
  - 　 L21 原厂 Harness 也不必然最优，必须固定模型与任务做跨 Harness 比较。
  - 　 L22 当前证据缺口：需要排除工具能力、提示与资源配置差异后再归因于过拟合。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-harness-token-floor（scaffold）

- QST：能不能讲清「Harness Token 底座」
- **正确项（机器已填）**：在 API 边界分别计算系统提示、工具定义、脚手架、历史和用户输入的 Token。
  - 依据：`SOL-harness-token-floor` · units[id=SOL-harness-token-floor].key_fields.solution_summary
- 候选误区 5 条（★ = 含否定词，可能更像误区）：
  - ★ L21 Token 底座不是一次性启动费；在无服务端状态的调用中，它会被每次请求重发或缓存读取。
  - 　 L22 缓存命中可以降低计费或延迟，却不会让固定前缀从本轮模型可见输入与窗口占用中消失。
  - 　 L23 绝对 Token 底座与它占上下文窗口的比例是同一负担的两种量法，不拆成两张候选卡。
  - 　 L24 底座较大不必然使整项任务更贵，请求次数、批处理能力与会话增长也会共同决定总量。
  - 　 L25 当前证据缺口：需要针对当前版本和真实配置在 API 边界重新测量，并核对各模型的缓存与窗口计量规则，才能比较具体产品。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-human-escalation-tool-call（scaffold）

- QST：能不能讲清「人类升级工具调用」
- **正确项（机器已填）**：明确哪些风险、金额或责任判断必须升级给人，并把它们编码成可触发条件。
  - 依据：`SOL-human-escalation-tool-call` · units[id=SOL-human-escalation-tool-call].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 它不是把人当作无条件执行器；调用应包含清晰问题、必要证据和权限范围。
  - 　 L21 它不同于 Agent 失败后由运维人员临时接管的非结构化兜底。
  - 　 L22 「人类升级工具调用」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-instruction-locality（scaffold）

- QST：能不能讲清「指令就近原则」
- **正确项（机器已填）**：为每条指令标出它直接约束的对象、维护者和生效位置。
  - 依据：`SOL-instruction-locality` · units[id=SOL-instruction-locality].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - 　 L20 它回答指令应放在哪里，不回答信息应在何时加载，因此不等同于渐进式披露。
  - ★ L21 就近放置减少重复与冲突，但不保证指令本身正确、完整或具有更高优先级。
  - 　 L22 当前证据缺口：需要验证该原则在多工具共享约束或跨对象规则中的放置边界。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-just-in-time-retrieval（scaffold）

- QST：能不能讲清「即时检索」
- **正确项（机器已填）**：在 Context 中保留稳定且轻量的文件路径、查询、网页链接或记录 ID，而不是完整对象。
  - 依据：`SOL-just-in-time-retrieval` · units[id=SOL-just-in-time-retrieval].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L21 即时检索不等于把所有可能相关资料预先塞进 Context；关键差别是按任务进展触发取回。
  - ★ L22 它不等于 Progressive Disclosure；即时检索是取数时机策略，渐进式披露是逐层发现信息的更广组织模式。
  - ★ L23 它也不等于普通 RAG 的唯一实现；预检索、即时探索与混合策略应按任务动态程度和延迟要求选择。
  - 　 L24 引用过期、工具误用、搜索死胡同或漏识别关键信息都会让按需检索失败。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-large-language-model（ready）

- QST：能不能讲清「大语言模型」
- **正确项（机器已填）**：判断一次能力来自哪里时，先问“这是模型生成的内容，还是外部系统执行并反馈的动作？”
  - 依据：`SOL-large-language-model` · units[id=SOL-large-language-model].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 “续写机”是帮助理解生成机制的比喻，不表示模型只会逐字机械复制，也不概括训练、推理与多模态能力的全部细节。
  - ★ L21 模型生成工具调用请求，不等于模型亲自执行了工具；执行、权限与结果回灌由外部软件负责。
  - ★ L22 Claude、Codex 等产品的整体表现同时受模型、提示、工具、状态、权限和循环设计影响，不能全部归因为裸模型能力。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-llm-statelessness（scaffold）

- QST：能不能讲清「LLM 无状态性」
- **正确项（机器已填）**：在客户端显式保存任务状态、消息和必要工具结果，不依赖模型自行记住。
  - 依据：`SOL-llm-statelessness` · units[id=SOL-llm-statelessness].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L19 无状态性描述调用接口的连续性边界，不表示模型没有训练所得知识。
  - ★ L20 外部系统保存了历史也不等于模型本轮已看见；相关内容仍需重新进入当前上下文。
  - 　 L21 当前证据缺口：需要在正文中区分无状态模型调用、服务端会话封装与持久化响应链等不同实现层。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-llm-token（scaffold）

- QST：能不能讲清「模型词元」
- **正确项（机器已填）**：使用目标模型对应的分词器统计真实输入、输出和各组成部分的 Token。
  - 依据：`SOL-llm-token` · units[id=SOL-llm-token].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - 　 L19 Token 不等同于汉字、英文单词或字符；同一文本在不同分词器下可产生不同数量。
  - 　 L20 Token 数量描述输入输出规模，不直接代表信息质量、任务难度或模型注意力是否有效。
  - 　 L21 当前证据缺口：当前摘录没有展开分词器差异与多模态输入如何映射为 Token。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-lost-in-the-middle（scaffold）

- QST：能不能讲清「迷失在中间」
- **正确项（机器已填）**：评测时固定问题、文档集合和评分方法，只移动关键证据位置，分别比较首、中、尾条件。
  - 依据：`SOL-lost-in-the-middle` · units[id=SOL-lost-in-the-middle].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L21 它描述的是相关信息位置变化带来的表现差异，不等于所有长输入都会整体变差，也不表示每个模型都出现同样深的 U 型曲线。
  - ★ L22 它不等于 Context Rot；后者是输入增长后利用可靠性变差的更广经验现象，可能受噪声、干扰、结构和任务类型共同影响。
  - 　 L23 扩大 Context Window 只改变可容纳容量；论文发现，在同一输入同时能装进普通版与扩展版时，扩展版未必表现得更稳健。
  - ★ L24 查询前置在合成键值检索中显著改善结果，却未在多文档问答中复现同等收益；不能把单一缓解手段外推到所有长文本任务。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-memory（ready）

- QST：能不能讲清「记忆」
- **正确项（机器已填）**：先区分“已经保存”“已经取回”“已经进入当前 Context”和“已经核实”四个状态。
  - 依据：`SOL-memory` · units[id=SOL-memory].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 Memory 被存储在外部，不代表它已进入当前 Context；只有取回并装配后，模型本轮才可见。
  - 　 L21 记忆是历史线索，不自动等于当前事实；行动前仍应核对真实状态与来源时效。
  - ★ L22 Memory 常偏向保存知识与经历，State Management 常偏向追踪当前执行位置与恢复点；但待办、进度、依赖、文件和数据库都可能同时承载两类内容，不能只按介质或字段名硬分。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-minimal-sufficient-context（scaffold）

- QST：能不能讲清「最小充分上下文」
- **正确项（机器已填）**：先写出完成当前决策必需的证据、约束、工具说明和输出要求，再删除无法说明用途的材料。
  - 依据：`SOL-minimal-sufficient-context` · units[id=SOL-minimal-sufficient-context].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L20 “最小”不等于字符最少、摘要最短或固定 token 配额；任何缺失后会破坏任务的关键信息都不该被删。
  - ★ L21 它是一条选择准则，不等于 Context Selection、Dynamic Context Assembly、JIT Retrieval 或 Progressive Disclosure 等具体机制。
  - 　 L22 充分性随任务阶段、模型、工具和可接受风险变化，不存在对所有任务通用的唯一内容清单。
  - 　 L23 高信号不只指与查询语义相似；约束、反例、依赖、权限和验收标准也可能是必要信号。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-model-context-protocol（scaffold）

- QST：能不能讲清「模型上下文协议」
- **正确项（机器已填）**：集成时分别验证 server 可连接、能力可发现、授权有效、当前会话实际可见，以及一次真实调用或读取能返回预期结果。
  - 依据：`SOL-model-context-protocol` · units[id=SOL-model-context-protocol].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L20 MCP 是通信与接入协议，不是某个具体 Tool，也不保证已连接能力一定可用。
  - 　 L21 MCP 的范围不只等于工具调用；资源与提示也是当前项目采用口径中的独立能力类型。
  - ★ L22 连接成功不等于能力已经投影到当前 Agent 会话；还要检查客户端、server、授权、会话工具面与运行策略。
  - 　 L23 MCP 不负责 Agent 是否选对能力、是否遵守权限或是否正确理解返回内容。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-multi-step-reliability-decay（scaffold）

- QST：能不能讲清「多步可靠性衰减」
- **正确项（机器已填）**：画出步骤、条件分支、重试和恢复路径，并测量每条边的条件成功率。
  - 依据：`SOL-multi-step-reliability-decay` · units[id=SOL-multi-step-reliability-decay].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - 　 L20 各步独立时可用成功率乘积作简化估计；存在相关失败、重试或恢复路径时必须按真实条件概率与流程图计算。
  - ★ L21 它描述可靠性随流程组合而下降的机制，不是某个固定步数或固定百分比的经验定律。
  - 　 L22 当前证据缺口：需要带相关失败与恢复分支的真实 Agent 轨迹验证估算方式。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-observability（ready）

- QST：能不能讲清「可观测性」
- **正确项（机器已填）**：为模型调用、工具调用、状态转换、错误与时延记录稳定的事件结构、时间戳和关联 ID。
  - 依据：`SOL-observability` · units[id=SOL-observability].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - 　 L19 可观测性负责采集与呈现运行事实；它不自动判断路径质量、任务正确性或产品效果。
  - ★ L20 Trace-based Evals 可以消费轨迹做跨运行判断，但“保存了 trace”不等于“已经做了 eval”。
  - 　 L21 Verification Loop 可以消费某项观测结果控制重试或退出，但日志存在本身不会改变下一步。
  - 　 L22 指标与日志只能覆盖被记录的部分；缺少关联 ID、时间、环境或失败上下文时，证据可能无法解释。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-observation-masking（scaffold）

- QST：能不能讲清「观察掩码」
- **正确项（机器已填）**：标出已经完成作用、但不必继续逐字可见的旧工具输出。
  - 依据：`SOL-observation-masking` · units[id=SOL-observation-masking].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L19 掩码不是删除整个交互历史；调用痕迹仍可保留，沉重的观察内容不再反复进入当前输入。
  - 　 L20 被隐藏的信息若后续仍需要，系统应保留可重新取回的路径。
  - 　 L21 当前证据缺口：当前证据未说明哪些工具输出可安全掩码，以及重新取回时如何恢复引用关系。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-permission-boundary（scaffold）

- QST：能不能讲清「权限边界」
- **正确项（机器已填）**：按工具、参数、路径、网络目标与副作用划分授权规则，并对高风险动作设置明确的人类确认点。
  - 依据：`SOL-permission-boundary` · units[id=SOL-permission-boundary].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L20 Permission Boundary 决定动作是否获准；Sandbox 限制获准动作在哪里执行、影响能扩散到哪里，二者不能互相替代。
  - 　 L21 不依赖模型自己“愿意听话”来保证安全；关键规则应在模型外确定性执行。
  - ★ L22 用户批准一次具体动作，不等于永久放开同类工具、所有参数或未来会话。
  - ★ L23 允许、人工确认与拒绝应绑定实际动作参数和当前运行状态，不能只看模型对动作的自然语言描述。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-persistent-code-graph（scaffold）

- QST：能不能讲清「持久化代码图谱」
- **正确项（机器已填）**：定义要持久化的代码实体、关系类型、版本标识和来源位置。
  - 依据：`SOL-persistent-code-graph` · units[id=SOL-persistent-code-graph].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 它不是一次任务临时生成的代码摘要，也不等同于只按文本相似度检索代码片段。
  - 　 L21 图谱是否可用取决于解析覆盖、更新及时性与关系正确性；持久化不自动保证新鲜。
  - 　 L22 当前证据缺口：需要更多实现来源比较图谱更新漂移、动态语言解析与跨仓库扩展性。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-progressive-disclosure（scaffold）

- QST：能不能讲清「渐进式披露」
- **正确项（机器已填）**：在入口文件只放稳定地图、当前必读项和下一层链接，把详细规则交给明确命名的专题文档。
  - 依据：`SOL-progressive-disclosure` · units[id=SOL-progressive-disclosure].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - 　 L20 Progressive Disclosure 管“先看到哪一层、需要时怎样继续展开”；Just-in-Time Retrieval 管“何时通过工具把数据取回上下文”。
  - ★ L21 它不是隐藏重要规则；安全边界、当前目标和必须遵守的约束应在正确入口直接可见。
  - 　 L22 层级越多不一定越好；索引错误、命名含糊或入口太深都会让 Agent 在探索中浪费上下文。
  - ★ L23 渐进式披露不等于上下文压缩；前者保留可导航的层级，后者把已有内容蒸馏成更短表示。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-prompt（ready）

- QST：提示词缓存不是小优化，而是 agent 成本结构的关键变量
- **正确项（机器已填）**：讨论 Prompt 时先说清是在改用户消息、系统消息，还是模型最终接收的完整输入。
  - 依据：`SOL-prompt` · units[id=SOL-prompt].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - 　 L20 本站同时标明狭义“用户提示”和广义“完整模型输入”两种常见口径，不把其中一种静默冒充唯一行业定义。
  - 　 L21 Prompt 是输入对象；Prompt Engineering 是设计、组织和测试输入的实践。
  - 　 L22 System Prompt 是完整输入中的系统层约束，不与用户当前输入等同。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-prompt-caching（scaffold）

- QST：提示词缓存不是小优化，而是 agent 成本结构的关键变量
- **正确项（机器已填）**：把稳定规则和工具说明排在前缀，把会话状态与本轮输入放在后部。
  - 依据：`SOL-prompt-caching` · units[id=SOL-prompt-caching].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 缓存的是稳定输入前缀的处理结果，不是上一轮答案，也不是按语义相似检索整段对话。
  - 　 L21 首次写入可能更贵，收益取决于后续复用次数、前缀稳定性、模型门槛与缓存有效期。
  - 　 L22 当前证据缺口：需要按当前各模型提供方文档核对缓存匹配粒度、计价与失效规则。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-prompt-engineering（ready）

- QST：能不能讲清「提示词工程」
- **正确项（机器已填）**：先写清目标、必要背景、约束与期望输出，再删除与当前任务无关的内容。
  - 依据：`SOL-prompt-engineering` · units[id=SOL-prompt-engineering].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 提示词工程不等于 Context Engineering；前者主要处理指令表达，后者管理模型在每轮能看到的整体信息。
  - ★ L21 它也不等于 Harness Engineering；工具执行、状态、权限、错误处理和生命周期属于更外层的运行系统。
  - ★ L22 好措辞能提高期望结果的概率，但不能保证模型每次正确，也不能替代验证。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-prompt-injection（scaffold）

- QST：能不能讲清「提示注入」
- **正确项（机器已填）**：标记可信指令与外部内容的来源和优先级，不把抓取文本拼进控制层。
  - 依据：`SOL-prompt-injection` · units[id=SOL-prompt-injection].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - 　 L19 它不同于用户直接提交的正常任务指令，风险在于不受信内容被模型误当成可执行要求。
  - 　 L20 沙箱、权限与内容隔离可以降低后果，但没有任何单一机制能证明风险被完全消除。
  - 　 L21 是否构成成功攻击要看系统后续行为，出现可疑文本本身只是攻击尝试或风险信号。
  - 　 L22 当前证据缺口：需要补充直接注入与间接注入的边界例子。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-reasoning-effort（scaffold）

- QST：能不能讲清「推理强度」
- **正确项（机器已填）**：按任务难度、错误代价和时延要求建立几档代表样本。
  - 依据：`SOL-reasoning-effort` · units[id=SOL-reasoning-effort].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L19 更高推理强度通常意味着更多计算预算，但不保证每个任务都更正确。
  - ★ L20 它不是上下文长度，也不同于注意力预算；前者控制额外推理投入，后者关注输入信息之间的有限处理能力。
  - 　 L21 当前证据缺口：当前证据未量化不同任务上推理强度对成本、延迟与正确率的关系。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-repository-source-of-truth（scaffold）

- QST：能不能讲清「仓库事实真源」
- **正确项（机器已填）**：把运行必需的规则、范围、状态和验收入口放入版本化、可定位的文件。
  - 依据：`SOL-repository-source-of-truth` · units[id=SOL-repository-source-of-truth].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L20 它不表示所有组织知识都必须进入仓库，只要求运行所依赖的事实不能仅存在于口头、个人脑中或不可定位的聊天记录。
  - 　 L21 仓库中的文件也可能过期或冲突，仍需明确权威顺序和维护责任。
  - 　 L22 单纯存在文件不证明 Agent 已读取、采用或正确执行其中内容。
  - 　 L23 当前证据缺口：需要补充仓库外动态真源如何登记、同步与失效处理。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-restorable-compression（scaffold）

- QST：能不能讲清「可恢复压缩」
- **正确项（机器已填）**：把准备移出窗口的原文保存到稳定载体，并记录可校验的定位信息。
  - 依据：`SOL-restorable-compression` · units[id=SOL-restorable-compression].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - 　 L19 它不同于把原文不可逆地浓缩成摘要；核心要求是仍存在可用回取路径。
  - 　 L20 留下 URL 或路径不自动保证未来仍有权限、网络或原文件可用。
  - 　 L21 「可恢复压缩」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-retrieval-reasoning-dual-task-load（scaffold）

- QST：能不能讲清「检索—推理双任务负担」
- **正确项（机器已填）**：准备答案与推理难度相同的任务，分别提供完整材料和已聚焦证据。
  - 依据：`SOL-retrieval-reasoning-dual-task-load` · units[id=SOL-retrieval-reasoning-dual-task-load].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L19 它描述检索与推理被捆在一次调用中的复合负担，不表示所有检索增强都会降低表现。
  - 　 L20 focused/full 的性能差还可能受歧义、干扰项和模型拒答策略影响。
  - 　 L21 「检索—推理双任务负担」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-risk-tiered-autofixing（scaffold）

- QST：能不能讲清「风险分级自动修复」
- **正确项（机器已填）**：按可逆性、影响范围、权限、数据敏感度和验证强度定义风险等级。
  - 依据：`SOL-risk-tiered-autofixing` · units[id=SOL-risk-tiered-autofixing].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L20 它不是让 Agent 无条件修复并上线；风险分级决定自动化可以推进到哪一层门禁。
  - 　 L21 按目录判断风险只是来源中的一种实现，实际分级还可能依赖权限、数据敏感度、可逆性与影响范围。
  - ★ L22 自动提交修复候选不等于修复正确、获准合并或已经部署，仍需独立验证与发布授权。
  - 　 L23 当前证据缺口：需要另一套系统的风险分类、误修复处置和人工升级证据。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-runnable-evidence（scaffold）

- QST：能不能讲清「可运行证据」
- **正确项（机器已填）**：把每项完成声明转换成别人可执行的命令、输入、预期结果和失败信号。
  - 依据：`SOL-runnable-evidence` · units[id=SOL-runnable-evidence].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - 　 L20 它不同于 Agent 对结果的文字总结或自信声明。
  - ★ L21 机器通过只证明对应检查覆盖的条件，不能自动证明全部用户价值或发布可接受性。
  - 　 L22 可复跑还要求保留命令、环境与必要输入，否则证据可能无法复现。
  - 　 L23 当前证据缺口：需要补充环境锁定与复现失败时的证据降级规则。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-sandbox（ready）

- QST：能不能讲清「沙箱」
- **正确项（机器已填）**：默认只挂载任务需要的文件与依赖，收窄网络、命令、CPU、内存、时间和凭证访问。
  - 依据：`SOL-sandbox` · units[id=SOL-sandbox].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - 　 L20 Sandbox 限制执行环境与爆炸半径，不负责判断动作是否获准；权限边界仍应在执行前独立生效。
  - ★ L21 沙箱不是绝对安全证明；挂载目录、网络、凭证、内核、资源配额和逃逸风险都取决于实际配置。
  - 　 L22 “在容器里运行”不自动等于有效隔离；需要核对真实文件系统、网络、进程、用户身份与秘密暴露面。
  - 　 L23 可抛弃环境有助于恢复和扩展，但持久状态与副作用仍需单独设计。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-skill（scaffold）

- QST：能不能讲清「Agent Skill」
- **正确项（机器已填）**：把稳定、重复、可检查的做法写进 Skill，并明确什么时候用、输入是什么、步骤怎样走、什么算完成。
  - 依据：`SOL-skill` · units[id=SOL-skill].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L21 Skill 沉淀的是可复用方法与任务上下文，不是可直接执行外部动作的 Tool。
  - 　 L22 Skill 可以说明如何使用 Tool，但能否使用仍由实际工具面、权限和运行环境决定。
  - ★ L23 Skill 也不是 MCP；前者是方法载体，后者是外部能力接入协议。
  - 　 L24 不同产品对 Skill 的目录、元数据、触发方式、渐进加载与允许工具没有统一实现，迁移时必须核对实际运行时。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-skill-chaining（scaffold）

- QST：能不能讲清「Skill 链式调用」
- **正确项（机器已填）**：为每个 Skill 写清输入、输出、成功条件和可以独立停止的位置。
  - 依据：`SOL-skill-chaining` · units[id=SOL-skill-chaining].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 链式调用把灵活性换成自动化；步骤需要独立使用时不应强制串联。
  - ★ L21 调用链本身不保证每一步正确，仍需验证、失败处理与升级路径。
  - 　 L22 当前证据缺口：当前证据未给出跨 Skill 的参数传递、状态格式与失败语义合同。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-skill-trigger-condition（scaffold）

- QST：能不能讲清「Skill 触发条件」
- **正确项（机器已填）**：从真实请求中列出应该触发、容易混淆和明确不应触发的样本。
  - 依据：`SOL-skill-trigger-condition` · units[id=SOL-skill-trigger-condition].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - 　 L19 触发条件决定何时被考虑，不等同于 Skill 的任务步骤或工具权限。
  - 　 L20 描述过宽会造成误触发，描述过窄会使 Skill 在需要时无法被拉入上下文。
  - 　 L21 当前证据缺口：当前证据聚焦 Claude Code 的 description 字段，跨运行环境是否采用相同触发合同仍需核对。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-state-management（ready）

- QST：能不能讲清「状态管理」
- **正确项（机器已填）**：明确哪些变量决定下一步，并在每次状态转换时原子地记录当前阶段、完成证据和待处理项。
  - 依据：`SOL-state-management` · units[id=SOL-state-management].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - 　 L19 State 是任务当前可描述的执行事实；State Management 是记录、更新、持久化和恢复这些事实的实践。
  - ★ L20 Checkpoint 只是保存某个恢复点的机制之一；有 checkpoint 不代表变量完整、恢复正确或外部副作用安全。
  - 　 L21 State Management 常偏向当前执行位置与恢复点，Memory 常偏向过去保存的知识与经历；但两者可共用文件、数据库，也会在待办、进度和依赖上重叠。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-subagent-orchestration（scaffold）

- QST：能不能讲清「子 Agent 编排」
- **正确项（机器已填）**：切出边界清晰、可独立验证且不会争用同一写入面的子任务。
  - 依据：`SOL-subagent-orchestration` · units[id=SOL-subagent-orchestration].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - 　 L20 它不等同于只启动更多 Agent；编排还需定义任务边界、结果回传与主流程如何消费结果。
  - 　 L21 子 Agent 的并行或深度探索会增加协调成本，并可能在压缩回传时损失信息。
  - 　 L22 每个子 Agent 还可能复制独立启动底座，主流程摄入返回记录时会形成第二次上下文放大。
  - 　 L23 当前证据缺口：当前证据未比较单 Agent、并行子 Agent 与顺序移交的适用阈值和信息损耗。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-system-prompt（ready）

- QST：Opus 5 系统提示词全文流出：一份近两万字的 agent 行为说明书
- **正确项（机器已填）**：在系统层写稳定的角色、边界、工具规则和成功标准，避免塞入容易过时的长篇资料。
  - 依据：`SOL-system-prompt` · units[id=SOL-system-prompt].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L21 System Prompt 是输入层约束，不是模型权重、长期记忆或不可违抗的内部人格。
  - ★ L22 高优先级不等于绝对保证；冲突、提示注入、模型误解或实现差异仍可能导致偏离。
  - ★ L23 安全与授权不能只靠 System Prompt；高风险动作还需要工具权限、沙箱、护栏和人工确认。
  - 　 L24 不同模型 API 对 system、developer、user 等角色的支持与优先级并不完全相同，应以实际接口和运行日志为准。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-system-prompt-altitude（scaffold）

- QST：能不能讲清「系统提示抽象高度」
- **正确项（机器已填）**：收集高频任务、真实失败样本和必须统一的行为边界。
  - 依据：`SOL-system-prompt-altitude` · units[id=SOL-system-prompt-altitude].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 它不是越具体或越简短越好，而是在任务、模型和失败模式之间校准颗粒度。
  - 　 L21 它只讨论系统提示的指导层级，不覆盖工具权限、运行时状态和外部护栏。
  - 　 L22 「系统提示抽象高度」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-tacit-knowledge（scaffold）

- QST：能不能讲清「隐性知识」
- **正确项（机器已填）**：在决策或复盘中追问“看到了什么信号、排除了什么、为何愿意承担这个代价”。
  - 依据：`SOL-tacit-knowledge` · units[id=SOL-tacit-knowledge].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L19 隐性知识不是所有未写文档的信息，重点是难以从结果本身恢复的判断依据与经验。
  - 　 L20 录制会议只产生可挖掘材料，不证明知识已被完整、准确地外化为 Agent 可用 Context。
  - 　 L21 当前证据缺口：需要更强证据比较会议提取、访谈与决策记录对隐性知识外化的保真度。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-tool（ready）

- QST：OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness
- **正确项（机器已填）**：排错时依次检查工具是否注册、描述是否清楚、参数是否通过校验、权限是否允许、执行是否成功、结果是否正确回传。
  - 依据：`SOL-tool` · units[id=SOL-tool].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L20 Tool Definition、Tool Call、Tool Execution 与 Tool Result 是连续但不同的环节；看到调用请求不等于动作已经执行成功。
  - ★ L21 Tool 是具体能力接口，MCP 是连接一组外部能力的标准协议；二者不能互作同义词。
  - ★ L22 Skill 主要沉淀“怎么做”的可复用方法，它可以指导调用 Tool，但不是 Tool 本身。
  - ★ L23 工具存在不保证 Agent 会选对工具、填对参数或获得权限；这些问题要分别检查。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-tool-schema-tax（scaffold）

- QST：能不能讲清「工具 Schema 税」
- **正确项（机器已填）**：在请求 Payload 中单独统计每个工具 Schema 的 Token 和实际调用频率。
  - 依据：`SOL-tool-schema-tax` · units[id=SOL-tool-schema-tax].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 它衡量的是工具说明载荷，不是工具实际执行产生的结果 Token 或外部调用费用。
  - 　 L21 工具少不自动更好；应在必要能力、选择噪声、权限面与静态载荷之间取舍。
  - 　 L22 当前证据缺口：需要不同模型分词器和工具协议下的可比测量。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-tool-scoping（scaffold）

- QST：能不能讲清「工具收窄」
- **正确项（机器已填）**：按任务阶段列出“这一步必须用”“可能需要”“当前不应暴露”三组工具，并默认只开放第一组。
  - 依据：`SOL-tool-scoping` · units[id=SOL-tool-scoping].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - ★ L20 Tool Scoping 不是 Tool 本体，也不是设计工具 schema 的全部工作；它只决定某个步骤向模型暴露哪些已有工具。
  - ★ L21 收窄工具可以减少选择与权限面，但不自动证明模型会选对工具，也不能替代每次调用的权限检查。
  - ★ L22 最小工具集不是固定越少越好；过度收窄会让任务缺少必要能力，应按步骤、角色与真实失败记录动态调整。
  - ★ L23 多 Agent 拆分可以形成不同工具范围，但 Tool Scoping 不要求一定采用多 Agent。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-tool-workflow-fit（scaffold）

- QST：能不能讲清「工具—工作流适配」
- **正确项（机器已填）**：先写任务锚点、合格证据、允许动作和完成条件，再列工具必须支持的环节。
  - 依据：`SOL-tool-workflow-fit` · units[id=SOL-tool-workflow-fit].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - 　 L19 它不反对共享工具基础设施，而是要求不同产品保留任务特定的工作流层。
  - ★ L20 一项工具在某任务中不适配，不代表工具本身实现错误或在其他任务中无效。
  - 　 L21 「工具—工作流适配」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-trace-based-evals（scaffold）

- QST：能不能讲清「基于轨迹的评测」
- **正确项（机器已填）**：先固定有边界的任务集、成功条件、对照基线、运行配置与 verifier，再开始采样轨迹。
  - 依据：`SOL-trace-based-evals` · units[id=SOL-trace-based-evals].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - 　 L20 Observability 负责产生可回放轨迹；Trace-based Evals 负责用固定任务、基线与 verifier 对多次轨迹作比较判断。
  - 　 L21 Verification Loop 把检查结果接回单次运行并控制修正或退出；评测结果是否用于改 Harness，是后续控制决策。
  - ★ L22 Agent 可能有多条合理成功路径，评测不能把“不同于示范轨迹”直接判为失败。
  - ★ L23 分数会受工具版本、网络、沙箱、依赖和其他基础设施噪声影响；未经控制不能全归因于模型或 Harness 改动。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-ubiquitous-language（scaffold）

- QST：能不能讲清「统一语言」
- **正确项（机器已填）**：从争议频繁的业务动作中收集术语及各角色的实际定义。
  - 依据：`SOL-ubiquitous-language` · units[id=SOL-ubiquitous-language].key_fields.solution_summary
- 候选误区 3 条（★ = 含否定词，可能更像误区）：
  - ★ L20 它不是全局通用词典；同一词在不同限界上下文中可以有不同含义。
  - ★ L21 它不要求一次性达到完美，而要让命名、代码和讨论中的差异可被发现并更新。
  - 　 L22 「统一语言」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-verifiable-goal（scaffold）

- QST：能不能讲清「可验证目标」
- **正确项（机器已填）**：把成功写成可重复输入、明确判定和允许误差，并列出不可接受路径。
  - 依据：`SOL-verifiable-goal` · units[id=SOL-verifiable-goal].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - 　 L20 它不同于测试本身；目标说明要达到什么，验证机制提供判定证据。
  - ★ L21 可机器判断不等于真实价值已被完整表达，仍需同时规定禁止路径与质量边界。
  - ★ L22 目标无法满足时应触发失败或升级，不应诱导 Agent 无限重试。
  - 　 L23 当前证据缺口：需要补充主观质量目标如何转译为可复核判据的来源。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______

## batch-verification-loop（scaffold）

- QST：能不能讲清「验证循环」
- **正确项（机器已填）**：在行动前写清检查对象、判据、失败反馈格式和退出条件，避免由同一输出临时改标准。
  - 依据：`SOL-verification-loop` · units[id=SOL-verification-loop].key_fields.solution_summary
- 候选误区 4 条（★ = 含否定词，可能更像误区）：
  - 　 L20 Observability 负责采集运行事件、轨迹、状态和时延；Verification Loop 负责消费检查结果并改变当前运行的下一步。
  - 　 L21 Trace-based Evals 用共同任务、基线和 verifier 比较多次运行；Verification Loop 通常作用于一次任务里的重试与退出。
  - ★ L22 检查器的证据强度不同：确定性测试、视觉检查和 LLM-as-judge 不能被当成等价证明。
  - 　 L23 机器检查通过只覆盖既定判据，不自动证明语义质量、用户满意、发布授权或真实业务效果。
- [ ] 干扰项 A：______　why：______
- [ ] 干扰项 B：______　why：______
