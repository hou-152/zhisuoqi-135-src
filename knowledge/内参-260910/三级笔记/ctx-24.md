# AI 的新技能不是提示词，而是上下文工程

来源：philschmid.de｜作者：Philipp Schmid

## 一句话主旨
agent 成败关键不是模型或提示词，而是上下文工程。

## 作者试图回答的问题
AI 的“新技能”为什么从提示词工程转向上下文工程？agent 失败应归因于模型还是上下文？如何构建强大可靠的 agent？子问题包括：什么算上下文，上下文工程与提示词工程如何分界，它有哪些可操作特征。

## 三级论证骨架

### 一、术语转向：从提示词工程到上下文工程
#### 1.1 对话重心迁移
- AI 讨论从 prompt engineering 转向更宽、更有力量的 Context Engineering。
  - Tobi Lutke 的定义被作者认为说到了点上：the art of providing all the context for the task to be plausibly solvable by the LLM。
  - 关键词是 plausibly solvable（看似可解），不是更聪明；信息不全的任务，模型只能猜。
- agent 兴起是直接推力：跨多步、调工具、持续工作后，问题变成往有限工作记忆里装什么。
  - 结论前置：agent 成败主要决定因素是上下文质量；失败归因从模型不行变为上下文不行。

#### 1.2 全文最锋利的归因判断
- Most agent failures are not model failures anymore, they are context failures.
  - 把归因权从模型手里拿回，交还给做系统的人。

### 二、重新定义上下文：模型生成响应之前看到的一切
#### 2.1 上下文不只是单一提示词
- 作者把上下文定义为 everything the model sees before it generates a response。
  - 配图显示七类构成同处一个边界内且大量重叠，直观说明上下文远不止一个提示词。

#### 2.2 七类构成
- Instructions / System Prompt：定义模型在一次对话中行为方式的初始指令集，可含示例与规则。
- User Prompt：来自用户的即时任务或问题。
- State / History（短期记忆）：当前对话，包括把事情推到此刻的用户与模型的历次回应。
- Long-Term Memory：跨越许多次先前对话积累的持久知识库，如用户偏好、过往项目摘要、被要求记住的事实。
- Retrieved Information（RAG）：外部、最新知识，来自文档、数据库或 API。
- Available Tools：可调用的全部函数或内置工具定义，例如 check_inventory、send_email。
- Structured Output：对模型响应格式的定义，例如 JSON 对象。
- 意义：上下文是装配结果；七类来源各有获取路径与成本，共享同一块有限空间。

### 三、对照案例：廉价 demo 与魔法级 agent
#### 3.1 极简场景
- AI 助理根据一封邮件安排会议，邮件原文：Hey, just checking if you're around for a quick sync tomorrow.

#### 3.2 廉价 demo 型 agent
- 上下文贫乏，只看到用户请求。
  - 代码可能完全能跑，但输出无用且机械：Thank you for your message. Tomorrow works for me. May I ask what time you had in mind?

#### 3.3 魔法级 agent
- 由丰富上下文驱动；关键认知转换：代码首要职责不是弄清楚怎么回应，而是收集 LLM 完成目标所需的信息。
  - 调用 LLM 之前把上下文扩展到：日历信息（显示已排满）、与此人过往邮件（判断非正式语气）、联系人列表（识别关键合作方）、send_invite 或 send_email 工具。
  - 同一模型生成：Hey Jim! Tomorrow's packed on my end, back-to-back all day. Thursday AM free if that works for you? Sent an invite, lmk if it works.
- 对照要证明：魔法不在更聪明的模型或更巧妙的算法里，而在于为正确的任务提供正确的上下文；差距来自调用之前装进去的东西。

### 四、上下文工程的定义与四条特征
#### 4.1 与提示词工程分界
- prompt engineering 聚焦于在一个文本字符串里打磨出完美的指令集；context engineering 范围要宽得多。
- 作者定义：上下文工程是设计并构建动态系统的学科，这些系统在正确的时间、以正确的格式，提供正确的信息与工具，从而给 LLM 完成一项任务所需的一切。

#### 4.2 四条特征
- A System, Not a String：上下文不是静态提示词模板，而是在主 LLM 调用之前运行的那个系统的输出。
- Dynamic：即时生成，为当下任务量身定制；这次请求可能是日历数据，下次是邮件或一次网络搜索。
- About the right information, tools at the right time：确保模型不缺关键细节，否则 Garbage In, Garbage Out；同时提供知识（信息）与能力（工具），且只在需要且有用时提供。
- Where the format matters：如何呈现信息有影响；一份简洁的摘要优于一堆原始数据的倾倒；一个清晰的工具 schema 优于一句含糊的指令。
- 合起来：上下文从文本对象改写为系统对象——有生产者、有触发时机、有格式契约。

### 五、对构建可靠 agent 的含义
#### 5.1 重心迁移
- 构建强大可靠的 agent，越来越少关于寻找一个魔法提示词或等待模型更新，越来越多关于上下文的工程化。

#### 5.2 跨职能挑战
- 需要理解业务用例、定义清楚输出、把一切必要信息结构化，好让 LLM 能够完成任务。

#### 5.3 归因结论的含义
- 该判断既是诊断工具，也是责任划分：把改进着力点放在可被工程化的一侧。
- 原文末尾声明本文综述由深度与人工研究写成、参考了若干优秀资源，但本地归档在此处截断，具体来源清单不可见。

## 作者边界、反例与不确定性
- 边界：上下文工程不是单点提示词优化，而是动态系统；信息与工具只在需要且有用时提供；受模型有限工作记忆约束，必须做取舍。作者把转向表述为重心迁移，未说提示词工程完全无效。
- 反例/对照：廉价 demo 型 agent 在同一模型下失败，说明失败可来自上下文贫乏而非模型能力。
- 不确定性：原文末尾来源清单在本地归档截断，不可见；原文未展开具体工程实现、成本或取舍策略。
