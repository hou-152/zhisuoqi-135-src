# 构建可靠 AI 工作流：智能体原语与上下文工程

- 标题：构建可靠 AI 工作流：智能体原语与上下文工程
- 来源：github.blog
- 原文：https://github.blog/ai-and-ml/github-copilot/how-to-build-reliable-ai-workflows-with-agentic-primitives-and-context-engineering/
- 作者：Daniel Meppiel
- 类型：主题特刊
- 摘要：这篇文章提供了一套用 agentic primitives、context engineering 和 human review 搭建可靠 AI workflow 的工程框架。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：6504
- 策展人按：新世代的规则看完，往回收。这篇负责把前面拆散的零件重新装回一个框架里。

---

- 原文标题：How to build reliable AI workflows with agentic primitives and context engineering
- 作者：Daniel Meppiel
- 内参日期：2026-05-11
- 来源类型：blog
- 原文：https://github.blog/ai-and-ml/github-copilot/how-to-build-reliable-ai-workflows-with-agentic-primitives-and-context-engineering/
- 标签：agentic workflow, context engineering, agents

这篇文章提供了一套用 agentic primitives、context engineering 和 human review 搭建可靠 AI workflow 的工程框架。

## 导读

理由：旧文重读。如何搭建稳健可靠的 ai 工作流？

## 核心观点

文章提出一套把临时 prompt 实验转化为可靠 AI 工程实践的三层框架：Markdown prompt engineering 负责让意图结构化，agentic primitives 负责把规则、角色、流程和记忆产品化，context engineering 负责持续控制模型看到什么、忽略什么、如何验证结果。作者的核心判断是：自然语言工作流正在变成一种可执行、可复用、可打包、可进入 CI/CD 的软件形态。

## 可靠 AI workflow 的问题起点

- 简单 prompt 可以解决一次性的代码修改，但复杂项目会遇到上下文漂移、角色不稳定、验证不足和流程不可复现的问题。
- 作者把解决路径拆成三层：先用 Markdown 写出清晰结构，再用 agentic primitives 固化可复用能力，最后用 context engineering 管理模型注意力。
- 这套方法的目标不是写更长的 prompt，而是把 AI 协作变成可维护的工程系统。

## 第一层：Markdown prompt engineering

- Markdown 是面向模型的结构化语言：标题、列表、链接和代码块会帮助模型识别任务边界、推理步骤和上下文来源。
- 关键技巧包括：通过链接加载上下文，用 headings 和 bullets 组织推理，用角色说明激活特定行为，用 MCP 工具连接外部能力，用精确措辞减少误解。
- Validation gates 是这一层的重要机制：在进入下一步之前明确要求检查、测试或人工确认，避免模型把“完成叙述”当作“完成验证”。

## 第二层：agentic primitives

- Agentic primitives 是可复用的 AI 工作单元，包括 .instructions.md、.chatmode.md、.prompt.md、.spec.md、.memory.md 和 .context.md。
- .instructions.md 固化项目规则和编码约束；.chatmode.md 固化角色和行为模式；.prompt.md 固化可重复执行的工作流；.spec.md 固化需求和验收标准；.memory.md 保留跨会话经验；.context.md 帮助按需加载背景。
- 这些 primitives 把一次性的自然语言请求，升级为可以在团队、项目和自动化系统里反复调用的工作流资产。

## 第三层：context engineering

- Context engineering 的核心不是把所有材料都塞进上下文，而是选择正确的信息、用正确顺序呈现，并把无关噪声排除出去。
- 作者强调 context window 是有限资源，过量上下文会降低模型判断质量；因此需要 session splitting、模块化规则、按需 context helper 和 memory-driven development。
- Chat modes 也属于 context engineering：不同任务需要不同认知姿态，例如架构审查、代码实现、调试、文档生成，不应混用同一套上下文和角色。

## 从 primitives 到完整 agentic workflow

- .prompt.md 可以把 instruction、chat mode、spec、memory 和 context helper 串成完整流程，用于 IDE、terminal、CI 等不同运行环境。
- 一个可靠 workflow 通常包括：加载项目规则、读取 spec、执行任务、调用工具、运行验证、根据结果迭代、输出可审查的变更。
- 这种 workflow 的价值在于可重复和可审计：团队不再只依赖某个人临场写 prompt，而是沉淀一套能被复用的 AI 工程实践。

## 自然语言作为软件

- 作者把 prompt、instructions 和 workflows 视为“natural language as code”：它们不是随手写的说明，而是会直接影响系统行为的可执行资产。
- 因此，它们也需要版本控制、依赖管理、发布机制、运行时和测试验证。
- Agent CLI runtimes 让这些自然语言工作流可以离开 IDE，在终端、脚本和 CI/CD 中运行，连接开发者的 inner loop 和自动化的 outer loop。

## APM 与生态化分发

- APM 在文章中承担 agent workflow 的 package manager 和 runtime manager 角色，负责安装、配置、分发和运行 agent primitives。
- 当 workflows 可以被打包、共享和在 CI 中执行时，AI 协作从个人技巧进入团队基础设施。
- 作者用软件生态演进类比这条路径：从原始代码到 primitives，再到 runtimes、package management，最后形成 ecosystem。

## 实践路径

- 从少量 .instructions.md 开始，把项目中稳定的协作规则写下来。
- 为常见任务创建 chat modes，区分实现、审查、调试、研究等不同工作状态。
- 把重复任务沉淀为 .prompt.md workflow，并配合 spec template 和 validation gates。
- 随着实践积累，把经验写入 memory，把上下文拆成模块，把成熟 workflow 接入 CLI、APM 和 CI/CD。

## 关键判断

- AI workflow 的可靠性来自结构化规则、上下文管理和验证机制，而不是单次 prompt 的聪明程度。
- Agentic primitives 把个人 prompt 技巧变成团队可复用的工程资产。
- Context engineering 是 AI-native development 的核心工程能力之一。
- 当自然语言工作流具备版本、依赖、运行时和 CI/CD，它就开始接近软件工程本身。

## 概念网络

![这张概念网络图由Codex整理，展示了构建可靠AI工作流的流程关联逻辑。图中以箭头连接各核心模块：顶部的Validation Gates作为起始节点，依次指向Markdown Prompt、Agentic Primitives与Context Engineering；Context Engineering关联至Workflow，Workflow最终指向CLI/APM，CLI/APM再对接至CI/CD，同时Validation Gates还分别对Context Engineering、Workflow、CI/CD节点提供指向关联，体现了各模块的协同配合关系，其中Agentic Primitives正是该文档定义的AI工作流基础构件之一。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YThmYjBjYzMwNjQyZTAzMmZhNmE2Y2MwYTJkMWZkNWFfMzE2MGFhODY2M2FiNDY4OWU2N2VlOTdkYzUxODM1MWZfSUQ6NzY2OTUxNjU5ODc5Mjc1MjA5Ml8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

### Agentic primitives

- **原文语境**：作者用它指代构成可靠 AI workflow 的基础构件，例如 instructions、chat modes、prompts、specs、memory 和 context files。
- **概念解释**：Agentic primitives 就像 AI 工作流里的“标准零件”。它们把原本临场写在对话框里的规则、角色、背景和流程，拆成可复用、可版本化、可组合的文件。
- **概念价值**：它让 AI 协作从个人经验变成团队资产，是从 ad-hoc prompting 走向系统化 AI 工程的关键一步。

### Markdown prompt engineering

- **原文语境**：文章把 Markdown 视为第一层能力，用标题、列表、链接、代码块等结构帮助模型理解任务。
- **概念解释**：Markdown prompt engineering 不是把 prompt 写得更华丽，而是用清晰层级告诉模型：什么是背景，什么是任务，什么是约束，什么是验证标准。
- **概念价值**：它降低模型误读概率，让复杂任务可以被拆解、追踪和复用。

### Context engineering

- **原文语境**：作者把 context engineering 放在第三层，强调要管理模型的上下文窗口和注意力。
- **概念解释**：Context engineering 是选择、组织和限制上下文的工程能力。它关心的不是“给模型更多信息”，而是“给模型刚好需要的信息”。
- **概念价值**：它解决复杂项目中的上下文污染、注意力分散和跨会话记忆断裂问题。

### Validation gates

- **原文语境**：文章把 validation gates 列为 Markdown prompt engineering 的关键模式之一。
- **概念解释**：Validation gates 是工作流中的检查点。模型完成某一步之后，必须通过测试、审查、人工确认或明确验收条件，才能进入下一步。
- **概念价值**：它把“模型说完成了”和“任务真的完成了”区分开来，是可靠 AI workflow 的基本防线。

### Instructions files

- **原文语境**：.instructions.md 用来保存项目规则、编码规范和协作约束。
- **概念解释**：Instructions files 是 AI agent 的长期工作规则。它们类似项目里的 README、lint 规则和团队约定，但直接影响模型每次执行任务时的行为。
- **概念价值**：它减少重复说明，保证不同会话和不同 agent 遵守同一套项目约束。

### Chat modes

- **原文语境**：.chatmode.md 用来定义不同任务场景下的 agent 行为模式。
- **概念解释**：Chat modes 是模型的角色切换机制。做架构设计、写代码、审查 PR、调试错误时，模型需要不同关注点和输出习惯。
- **概念价值**：它把“同一个模型处理所有事”的粗糙模式，拆成更专注、更可控的工作状态。

### Memory-driven development

- **原文语境**：文章把 memory files 视为 context engineering 的一部分，用来保留跨会话经验。
- **概念解释**：Memory-driven development 是把过去的项目决策、踩坑记录和稳定规则写成可被后续 agent 读取的记忆。
- **概念价值**：它让 AI 不再每次从零开始，也减少重复犯错和重复解释。

### Agentic workflows

- **原文语境**：.prompt.md 可以协调不同 primitives，形成完整可执行流程。
- **概念解释**：Agentic workflows 是由规则、上下文、工具调用、验证和输出格式组成的端到端 AI 工作流。
- **概念价值**：它把 AI 从“回答问题的工具”推进到“执行流程的系统”。

### Natural language as code

- **原文语境**：作者认为 prompts、instructions 和 workflows 已经具备软件属性。
- **概念解释**：Natural language as code 指自然语言不再只是说明文字，而是会驱动 agent 行为的可执行逻辑。
- **概念价值**：一旦自然语言会影响系统行为，它就需要像代码一样被版本管理、测试、复用和发布。

### Agent CLI runtimes

- **原文语境**：文章把 CLI runtimes 视为把 IDE 内 AI 协作扩展到终端和自动化环境的工具。
- **概念解释**：Agent CLI runtimes 是运行 agent workflow 的命令行环境，让自然语言工作流可以在本地脚本、终端任务和 CI/CD 中执行。
- **概念价值**：它连接开发者日常 inner loop 和自动化 outer loop，使 AI workflow 具备生产部署能力。

### APM

- **原文语境**：APM 被描述为 agent workflow 的 package manager 和 runtime manager。
- **概念解释**：APM 负责安装、分发、配置和运行 agent primitives，就像 npm/pip 负责传统代码包一样。
- **概念价值**：它让 AI workflow 从个人文件夹走向可共享、可依赖、可部署的生态系统。

### 核心链条

Markdown prompt engineering → Agentic primitives → Context engineering → Agentic workflows → Agent CLI runtimes / APM → CI/CD production automation

### 关系说明

- Markdown prompt engineering 提供结构化表达，是所有 primitives 的写作基础。
- Agentic primitives 把规则、角色、流程、规格和记忆拆成可复用模块。
- Context engineering 决定在每个任务阶段加载哪些 primitives 和背景材料。
- Agentic workflows 把这些模块编排成可重复执行的流程。
- Agent CLI runtimes 和 APM 让 workflow 离开单个 IDE，对接终端、团队分发和 CI/CD。
- Validation gates 横跨所有层，负责把生成式输出转化为可验证结果。

---
