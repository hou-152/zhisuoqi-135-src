# 《Claude 5 世代的上下文工程，规则变了》三级笔记

## 一句话主旨
Claude 5 世代：上下文工程从灌满约束转向按需给对。

## 作者试图回答的问题
面向 Claude 5 系列，上下文工程应如何改？核心判断是：过去的最佳实践为何变成神话，哪些旧习惯该退休，system prompt、CLAUDE.md、skills、references 应如何重新组装。

## 三级论证骨架

### 一、总判断：旧护栏被模型能力提升淘汰

#### 1.1 旧实践的共同形状
- 用显式约束替模型做决定：给死规则、给示例、把一切前置、反复强调。
  - 在弱模型时代是必要护栏；在 Claude 5 世代，同一套护栏反而压缩模型的判断空间。
  - 原文定性："previous context engineering best practices that had become myths"；它们不是写错，而是被模型能力提升淘汰。
  - 总方向：把上下文窗口当有限预算而不是垃圾场，工具和信息按需加载。

#### 1.2 机制样本：注释规则
- 旧 system prompt 规定：默认不写注释，绝不写多段 docstring 或多行注释块，一行为上限；除非用户要求，不创建计划、决策、分析类文档，从对话上下文工作而不是从中间文件工作。
  - 这条指令对一部分 prompt 是错的：用户可能有自己的文档偏好，特别复杂的代码段也确实需要多行注释块。
  - 但老模型没有护栏会写错注释，团队只能接受这个 tradeoff，判断由规则代做。
- 新 system prompt 换成取向性的话："Write code that reads like the surrounding code: match its comment density, naming, and idiom."——不给结论，只给对齐的对象。

### 二、六组 then / now：规则如何反转

#### 2.1 减法路径：把决定权还给模型
- 给规则 → 让 Claude 用判断力。
  - 护栏换成可迁移的取向，具体决定交回模型。
- 给示例 → 设计接口。
  - 新发现相反："giving examples actually constrains them to a certain exploration space"。
  - 替代做法是回到工具、脚本、文件本身的设计：Claude 拿到哪些参数，参数能不能更有表达力。
  - 样本是 Todo 工具：status 做成 pending、in_progress、completed 枚举，本身就在暗示用法；「同时只保留一项处于 in_progress」把期望行为定义清楚。接口即指令。
- 反复强调 → 简洁的工具描述。
  - 早期模型有时需要重复指令，也更听上下文窗口末尾而非开头，于是 system prompt 和 tool description 各写一遍。
  - 现在重复示例可删，工具怎么用就写在 tool description 里，不必回流 system prompt。
- 把记忆写进 `CLAUDE.md` → 自动记忆。
  - 过去鼓励用 # 热键自动写进 CLAUDE.md；现在 Claude 自动保存与当前工作、与用户本人相关的记忆。

#### 2.2 重排路径：渐进披露决定信息出场时机
- 全部前置 → 渐进披露。
  - 早期 Claude Code 聚焦编码，system prompt 塞进 code review 与 verification 的详细信息；它们不总被需要，但需要时至关重要。
  - 现在把 verification 与 code review 挪进各自 skill，由 Claude 自行选择调用。定义是「在正确的时机加载正确的上下文」。
- 渐进披露也用于工具：部分工具是 deferred loading，agent 必须先用 ToolSearch 搜到完整定义才能调用。
  - 这样可以拥有更多工具（例如 Task 系列），而它们在被需要之前不占用上下文。
- 同一道理适用于自己的 CLAUDE.md 和 Skill.md：常见神话是必须把所有可能用到的实践都塞进去；正解是做成一棵能在正确时机加载的文件树。

#### 2.3 引用质量路径：给更硬的 spec
- 简单 spec → 富引用。
  - plan mode 曾重度依赖 markdown 计划文件；另一条类似实践是把 spec 存在 codebase 里供长周期参照。
  - 现在 Claude 能处理更复杂的引用：HTML artifact、详细的测试套件、另一个 codebase 里等待移植的函数。
- Rubric 与 verifier agent。
  - Rubric 让 Claude 借 dynamic workflows 起 verifier agent，去尝试并验证你在某个领域的品味，例：「什么样的 API 设计算好设计」。
- 代码即高保真引用。
  - 一般优先选代码形式的文件：给 Claude 清晰、高保真的指令，且用的是它非常熟悉的语言。
  - 对照：一份设计的 HTML mockup，通常比对该设计的文字描述或一张截图产生更好结果。

### 三、四个层面：怎么组装上下文

#### 3.1 System Prompt
- 与产品语境强绑定，告诉 Claude 它运行在什么产品里、在做什么。
  - 用 Claude Code 的人大概永远不需要改；如果自建 agent harness，这里值得花大量时间。

#### 3.2 `CLAUDE.md`
- 保持轻量，简要说明 repo 是干什么的；大部分 token 花在 codebase 内部的 gotchas 上。
  - 例：类型全集中在一个 monolithic 文件里、别处没有。
  - 避免陈述 Claude 看文件系统或 repo 就知道的显而易见的事。
  - 大量使用渐进披露：有若干独特验证方法，就做一个 verification skill，再从 CLAUDE.md 引用它。

#### 3.3 Skills
- 当作轻量指南，让 Claude 在需要时找到信息；不要做得过度约束，除非是高度重要的领域。
  - 长 skill 尽量渐进披露，拆成多个文件分出去。
  - 最好用来编码你、团队或产品特有的观点、知识和最佳实践。

#### 3.4 References
- 用 @ 提及文件把它们作为引用，让 Claude 拿到关于当前计划的深入信息。
  - 可引用 spec 文件、mockup，甚至整个 codebase。
  - 一般优先代码形式文件。

### 四、收束动作：简化
- 跨 system prompt、skills 和 CLAUDE.md，可能需要像 Anthropic 一样做一次简化；Anthropic 自己在 Claude Code 上做了这件事。
- 新推出的 claude doctor 命令可帮你自动完成简化工作。
- 针对更先进模型的 prompting 细节，作者指向 Fable field guide。
- 思想网络的总开关：模型判断力提升，使显式约束从收益变成成本；上下文工程正从「写得更全」转向「留得更少、找得更准」。

## 作者边界、反例与不确定性
- 旧规则不是被证伪，而是环境变了；作者明确它们对一部分 prompt 本就错误，但在老模型上团队接受这个 tradeoff。
- 新规则面向 Claude 5 世代；是否适用于其他模型或旧模型，原文未展开。
- System Prompt 的投入分场景：Claude Code 用户大概不需改，自建 harness 才值得大量投入。
- Skills 不要过度约束，除非高度重要领域；References 一般优先代码，并非绝对排除文字描述或截图。
- 原文多为官方经验、样本和 then / now 对照，未给出量化效果或失败率；概念网络部分是对全文关系的再组织。
