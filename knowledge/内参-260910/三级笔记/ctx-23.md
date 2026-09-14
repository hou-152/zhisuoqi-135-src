# 构建可靠 AI 工作流：智能体原语与上下文工程

## 一句话主旨
用三层框架把自然语言工作流变成可复用、可验证的工程系统。

## 作者试图回答的问题
如何把临时 prompt 实验转成可靠、可维护、可自动化的 AI 工作流？
- 子问题：如何让模型稳定理解意图？如何把规则、角色、流程、记忆变成可复用资产？如何持续控制上下文并验证结果？

## 三级论证骨架

### 一、问题起点：一次性 prompt 不足以支撑复杂项目
#### 1.1 复杂项目暴露四类失败
- 上下文漂移、角色不稳定、验证不足、流程不可复现。
  - 简单 prompt 可以解决一次性代码修改；复杂项目会遇到这些系统性问题。
#### 1.2 解决路径是三层工程框架，而不是更长 prompt
- Markdown prompt engineering 让意图结构化；agentic primitives 把规则、角色、流程和记忆产品化；context engineering 管理模型注意力。
  - 目标：把 AI 协作变成可维护的工程系统。

### 二、第一层：Markdown prompt engineering——先让意图结构化
#### 2.1 Markdown 是面向模型的结构化语言
- 标题、列表、链接、代码块帮助模型识别任务边界、推理步骤和上下文来源。
  - 关键技巧：通过链接加载上下文；用 headings 和 bullets 组织推理；用角色说明激活特定行为；用 MCP 工具连接外部能力；用精确措辞减少误解。
#### 2.2 Validation gates 防止把“完成叙述”当成“完成验证”
- 进入下一步前，明确要求检查、测试或人工确认。
  - 功能：把生成式输出转化为可验证结果，是可靠 workflow 的基本防线。

### 三、第二层：agentic primitives——把规则、角色、流程、记忆产品化
#### 3.1 primitives 是可复用的 AI 工作单元
- 包括 .instructions.md、.chatmode.md、.prompt.md、.spec.md、.memory.md、.context.md。
  - .instructions.md 固化项目规则和编码约束；.chatmode.md 固化角色和行为模式；.prompt.md 固化可重复执行的工作流；.spec.md 固化需求和验收标准；.memory.md 保留跨会话经验；.context.md 帮助按需加载背景。
#### 3.2 作用：将一次性自然语言请求升级为工作流资产
- 能在团队、项目和自动化系统里反复调用。
  - 概念比喻：agentic primitives 像 AI 工作流里的“标准零件”，把临场写在对话框里的规则、角色、背景和流程，拆成可复用、可版本化、可组合的文件。
  - instructions files 类似项目 README、lint 规则和团队约定，但直接影响模型每次执行任务时的行为。

### 四、第三层：context engineering——管理模型看到什么、忽略什么
#### 4.1 核心不是塞满上下文，而是选择、排序、排除
- 选择正确信息、用正确顺序呈现、排除无关噪声。
  - context window 是有限资源；过量上下文会降低模型判断质量。
  - 手段：session splitting、模块化规则、按需 context helper、memory-driven development。
  - 概念表述：关心的不是“给模型更多信息”，而是“给模型刚好需要的信息”。
#### 4.2 chat modes 也属于 context engineering
- 不同任务需要不同认知姿态：架构审查、代码实现、调试、文档生成。
  - 不应混用同一套上下文和角色；chat modes 是模型的角色切换机制。
#### 4.3 memory-driven development 解决跨会话断裂
- 把过去的项目决策、踩坑记录和稳定规则写成后续 agent 可读取的记忆。
  - 让 AI 不再每次从零开始，减少重复犯错和重复解释。

### 五、编排：从 primitives 到完整 agentic workflow
#### 5.1 .prompt.md 把各 primitives 串成完整流程
- 可协调 instruction、chat mode、spec、memory 和 context helper，用于 IDE、terminal、CI 等不同运行环境。
  - agentic workflows 是由规则、上下文、工具调用、验证和输出格式组成的端到端 AI 工作流。
  - 它把 AI 从“回答问题的工具”推进到“执行流程的系统”。
#### 5.2 可靠 workflow 通常包含一串可审查环节
- 加载项目规则 → 读取 spec → 执行任务 → 调用工具 → 运行验证 → 根据结果迭代 → 输出可审查的变更。
  - 价值：可重复、可审计；团队不再只依赖某个人临场写 prompt，而是沉淀可复用的 AI 工程实践。

### 六、自然语言作为软件：workflow 需要软件生命周期
#### 6.1 prompts、instructions 和 workflows 是“natural language as code”
- 它们不是随手写的说明，而是会直接影响系统行为的可执行资产。
  - 因此需要版本控制、依赖管理、发布机制、运行时和测试验证。
#### 6.2 Agent CLI runtimes 让自然语言工作流离开 IDE
- 可在终端、脚本和 CI/CD 中运行。
  - 连接开发者的 inner loop 和自动化的 outer loop，使 AI workflow 具备生产部署能力。

### 七、APM 与生态化分发：从个人技巧到团队基础设施
#### 7.1 APM 是 agent workflow 的 package manager 和 runtime manager
- 负责安装、配置、分发和运行 agent primitives。
  - 类比：像 npm/pip 负责传统代码包一样。
#### 7.2 可打包、共享、CI 执行后，AI 协作进入团队基础设施
- workflows 从个人文件夹走向可共享、可依赖、可部署的生态系统。
  - 作者用软件生态演进类比：原始代码 → primitives → runtimes → package management → ecosystem。
  - 当自然语言工作流具备版本、依赖、运行时和 CI/CD，它就开始接近软件工程本身。

### 八、作者给出的落地路径
#### 8.1 从稳定规则开始
- 从少量 .instructions.md 开始，把项目中稳定的协作规则写下来。
#### 8.2 再分任务状态、沉淀重复流程
- 为常见任务创建 chat modes，区分实现、审查、调试、研究等不同工作状态。
  - 把重复任务沉淀为 .prompt.md workflow，并配合 spec template 和 validation gates。
#### 8.3 最后接入自动化和生态
- 把经验写入 memory，把上下文拆成模块，把成熟 workflow 接入 CLI、APM 和 CI/CD。

## 作者边界、反例与不确定性
- 适用边界：简单 prompt 仍可解决一次性代码修改；复杂项目才需要三层框架和完整 workflow。
- 资源边界：context window 有限，过量上下文会降低判断质量；不同任务不应混用同一套上下文和角色。
- 验证边界：模型“完成叙述”不等于“完成验证”，必须经过 validation gates。
- 原文是 blog 式框架文章，给出概念、文件类型和演进类比，但未提供量化效果、失败案例或 APM 的具体实现细节。
- 对 APM 的定位仍是类比 npm/pip 的 package manager/runtime manager；原文未展开其治理、权限、安全或冲突解决机制。
