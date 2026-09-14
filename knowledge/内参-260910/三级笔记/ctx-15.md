# 构建 Claude Code 的经验教训：如何让 Agent「看见」世界

## 一句话主旨
构建 Agent 最难的是设计匹配其能力的行动空间。

## 作者试图回答的问题
- 核心问题：如何设计 agent 的 action space，使工具匹配模型自身能力？
- 关联子问题：
  - 如何知道模型的能力边界？
  - 如何提升 elicitation，提高人机通信带宽？
  - 模型变强后，旧工具为何会失效或变成约束？如何迭代工具集？
  - 如何让 agent 自己构建上下文，而非被给予上下文？
  - 能否不新增工具，仅通过 progressive disclosure 扩展行动空间？

## 三级论证骨架

### 一、总论点：action space 是构建 agent 最难的部分
#### 1.1 工具不是越多越好，而要匹配模型能力
- 好的工具设计是 "shaped to its own abilities"。
  - Claude 通过 Tool Calling 行动，原语包括 bash、skills、code execution 等。
  - 工具太少无法完成任务，太多则让模型困惑；关键是设计刚好匹配模型能力的工具集。
#### 1.2 设计方法：see like an agent
- 要知道模型能力，必须观察输出、阅读输出、反复实验，"see like an agent"。
  - 思维实验：面对难题想要什么工具？纸笔最基本但受限于手动计算；计算器更好但需会操作高级功能；电脑最强大但需会写代码。
  - 结论：工具要匹配模型能力边界；能力边界靠观察和实验了解。

### 二、案例 1：AskUserQuestion 的三次迭代
#### 2.1 目标：提升 elicitation
- 提升 Claude 提问能力，降低用户回答摩擦，提高人机通信带宽。
#### 2.2 前两次失败：计划中带问题、markdown 解析
- Attempt #1：在 ExitPlanTool 中加参数，附带一组问题。
  - 问题：Claude 同时生成计划和问题导致困惑；用户回答可能与计划冲突；Claude 是否需要调用两次？
- Attempt #2：修改输出格式，让 Claude 用特定 markdown 格式输出问题，再解析为 UI。
  - 问题：最通用但不可靠；Claude 会额外加句子、遗漏选项、换格式。
#### 2.3 成功：独立 AskUserQuestion Tool
- 任意时刻调用，触发 modal 阻塞 agent 循环，等待用户回答。
  - 好处：结构化输出、强制提供多选项、可组合（Agent SDK / skills 中引用）。
  - 最重要发现：Claude 似乎“喜欢”调用这个工具，输出效果好；即使设计再好，如果模型不理解怎么调用，也没用。
  - 启示：什么对一个模型有效，对另一个模型未必有效。

### 三、案例 2：从 Todo 到 Task 的演进
#### 3.1 早期：用 TodoWrite 保持任务追踪
- 开始时写 todo、完成时打勾。
  - 即便如此，Claude 仍会忘记待办，于是每 5 轮插入系统提醒。
#### 3.2 模型变强后：提醒从帮助变成约束
- Claude 不再需要提醒，但提醒反而让它觉得必须死板遵循列表，不去修改。
  - Opus 4.5 擅长使用 subagent，但多个 subagent 如何共享 Todo List？
#### 3.3 解决方案：Task Tool 替代 TodoWrite
- Todo 目标 "keeping the model on track"；Task 目标 "helping agents communicate with each other"。
  - Task 支持依赖关系、跨 subagent 共享更新、可修改和删除。
  - 关键教训：模型能力提升后，曾经需要的工具可能变成约束；要不断重新审视假设，持续迭代工具集。

### 四、案例 3：搜索界面——从 RAG 到 Grep
#### 4.1 早期 RAG 的问题
- 用 RAG 向量数据库为 Claude 提供上下文。
  - 问题：需要索引和配置，在不同环境中脆弱；上下文是“被给予的”，而非模型自己找到的。
#### 4.2 转变：Grep 让模型自己搜索、自己构建上下文
- 给 Claude 一个 Grep 工具，让它自己搜索代码库、自己构建上下文。
  - 核心模式：Claude 越聪明，越擅长在给定正确工具后自己构建上下文。
#### 4.3 Agent Skills 与 Progressive Disclosure
- 引入 Agent Skills 后，正式提出 Progressive Disclosure。
  - agent 通过探索逐步发现相关上下文；技能文件可引用其他文件，模型可递归读取。
  - 常见用法：在 skill 中添加搜索能力，如 API 使用说明、数据库查询方法。
  - 一年内，Claude 从“不太会自己构建上下文”进化到“能跨多层文件嵌套搜索，精确定位所需上下文”。

### 五、案例 4：Claude Code Guide Agent——不加工具也能扩展能力
#### 5.1 问题：Claude 不了解自身功能
- 问它如何加 MCP 或 slash command 会答不上来。
#### 5.2 排除方案：system prompt 与文档链接
- 放进 system prompt → 造成 context rot，干扰主任务写代码。
- 给文档链接让 Claude 自行加载 → 它会加载过多结果到上下文。
#### 5.3 最终方案：Claude Code Guide subagent
- Claude 被 prompted 在用户问关于自身的问题时调用这个 subagent。
  - subagent 有专门的搜索文档指令和返回格式。
  - 核心启示：通过 progressive disclosure，无需添加新工具就能扩展 agent 的行动空间。

### 六、总结与概念网络
#### 6.1 方法论总结：Art, not Science
- 设计 agent 工具没有一套固定规则。
  - 取决于三要素：模型本身、agent 的目标、运行环境。
  - 方法论：频繁实验，阅读输出，尝试新东西。See like an agent.
#### 6.2 概念关系（原文概念网络）
- Action Space 是全文核心问题；See Like an Agent 是设计 action space 的方法论；Tool Calling 是实现机制。
  - Elicitation 是解决人机通信的特定工具能力；Progressive Disclosure 是 action space 的扩展策略。
  - Agent Skills 是 progressive disclosure 的具体实现；Subagent 是 action space 的组织模式；Context Rot 是反面教训，解释为何不能简单往 prompt 塞东西。

## 作者边界、反例与不确定性
- 作者明确：设计 agent 工具没有固定规则，"Art, not Science"；取决于模型、目标、运行环境。
- 什么对一个模型有效，对另一个模型未必有效；AskUserQuestion 的成功用“似乎”描述，属于观察而非确定规则。
- 模型能力提升会让旧工具从帮助变成约束：Todo 提醒后来让 Claude 死板遵循列表；旧假设需重审。
- 排除方案构成反例：把自身功能放进 system prompt 导致 context rot、干扰写代码；给文档链接让模型自行加载会加载过多结果。
- RAG 方案被描述为需索引配置、环境脆弱、上下文“被给予的”而非模型自己找到。
- 原文未给出统一可复用的工具设计规则，也未说明这些案例是否适用于所有模型与环境。
