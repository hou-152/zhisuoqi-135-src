# 从 /grill-me 到 /grill-with-docs：用对话先对齐领域语言

## 一句话主旨
以可积累的领域语言取代一次性追问，让 AI 编码前先对齐术语与决策。

## 作者试图回答的问题
为什么 /grill-me 在编码场景不够用？如何把追问中形成的共享语言和关键决策沉淀为 AI 可复用的项目资产，使 AI 在实现前对齐术语、边界与难以逆转的选择？

## 三级论证骨架

### 一、/grill-me 有效，但暴露“语言没有沉淀”的缺口
#### 1.1 Grill Me 的原始作用：让 LLM 沿设计树追问，直到形成共享理解
- Grill Me 会让 LLM 对用户进行持续访谈，沿设计树每个分支往下问，一次解决一个决策依赖。
- 作者称收到大量反馈：它能发现歧义、前期问题多但长期节省时间，因为收集足够上下文后更接近一次性完成任务。

#### 1.2 缺口：共享语言没有被记录，AI 反复解释或误解术语
- AI 常对已有术语重新冗长描述，或不知道团队内部术语已有固定含义。
- 例：应用已有 course、lesson、video、section 等实体；引入 pitch 时 AI 不知道它是视频的包装方式（标题、描述、对受众的 framing）。
- 例：standalone video 在作者语境中指“不连接 lesson 或 course 的视频”，AI 一开始不知道。
- 作者想找“最薄的一层文档”，只记录能让 AI 更快进入领域语境的非显而易见内容。

### 二、从 DDD 借 ubiquitous language 作为理论基础
#### 2.1 Ubiquitous Language：代码库、开发者、领域专家共同使用的语言
- 引用 Eric Evans 的 Domain-Driven Design；核心价值是领域专家说出的词、开发者讨论的词、代码命名能对应。
- 对 AI 同样重要：AI 使用的语言、用户说的语言、代码里的语言一致，才更容易推断改哪里、怎么命名、如何表达计划。

#### 2.2 追问和语言沉淀应是同一个工作流，而不是两个动作
- 作者最初在 Grill Me 会话中手动调用 ubiquitous language skill，边讨论边创建 ubiquitous language.md。
- 由此合并出 Grill with Docs：保留访谈式追问，同时读取、挑战、更新领域文档。

### 三、Grill with Docs 的文档机制
#### 3.1 context.md 作为 shared language 的薄文档层
- 会话先查找 context.md，从中读取当前代码库或 bounded context 的 shared language。
- 作者承认 context 一词过载；在这里接近 DDD 的 bounded context：应用里使用同一套语言的范围。
- 单一应用一个 repo 根目录的 context.md 足够；大型 monorepo 可有 context map 和多个 context。

#### 3.2 主动挑战语言：对照 glossary 检查模糊语言、术语冲突和未定义概念
- 会话中把用户新说法和既有 glossary 对照，讨论具体场景、交叉引用代码，边讨论边更新文档。
- 在实现前处理：某词是一对一还是一对多、某实体是不是已有概念的 metadata、某状态是否需要严格状态机。

#### 3.3 ADR 补充 context.md 无法覆盖的非显然架构决策
- 仅用于“hard to reverse、没有上下文会显得 surprising、并且包含真实 trade-off”的决策。
- 不记录可以随时替换的普通库选择。

### 四、示例：pitch 与 standalone video 如何通过语言校准影响实现
#### 4.1 新概念 pitch 进入时，先对齐与既有概念的关系，而不是直接进入数据库
- context.md 已定义 standalone video 为 lesson_id 为 null 的 video。
- Grill with Docs 先问 cardinality：一个 pitch 对应一个视频，还是一个 pitch 可包含多个 standalone videos。

#### 4.2 术语冲突会改变产品和代码结构
- 问题：standalone video 仍是“不连接 lesson/course 的视频”，还是应重新定义为“未被 pitch 关联的视频”？
- 影响后续 UI：是把 pitched videos 单独分区，还是把 pitching 作为 standalone video 的 metadata。
- 作者最终倾向把 pitching 作为 standalone video 自身的 metadata，而不是制造新的主分类。

#### 4.3 语言落到变量名、文件名和删除语义；足够好时停止
- 后续讨论延伸到 pitch status、pitch 是否可以没有 video、删除是 cascade 还是 restrict。
- 作者强调这不是单纯 bike-shedding：context.md 里的语言会影响生成代码的变量名、文件名、UI 文案和查找路径。
- 当语言足够好但不必完美时，他停止打磨，接受之后可重构成新的语言。

### 五、实际收益与适用边界
#### 5.1 更少 token、更短回复、更一致的思考与代码导航
- 共享语言让 AI 不必反复长篇解释同一概念，可用更少词直接指向项目中真实对象。
- 作者观察到简洁也出现在 AI 的 thinking traces 中，因为 AI 也用语言思考和规划。
- 对话语言、计划文档、代码命名一致时，AI 查找信息更直接，例如围绕 pitches 搜索就能找到相关实现。

#### 5.2 有代码库时优先 Grill with Docs；Grill Me 仍用于无代码库泛用场景
- 作者明确保留 Grill Me，将其放入 productivity 类别，适合没有代码库的泛用场景。
- 非工程例子：有人用 Grill Me 让 AI 追问关于母亲的故事，帮助写悼词。
- 区分：没有代码库时用 Grill Me，有代码库时用 Grill with Docs；即使项目很早期也倾向用 Grill with Docs，因为早期正是建立 shared language 的关键阶段。

## 作者边界、反例与不确定性
- Grill Me 没有被否定：作者明确说“没有代码库时用 Grill Me，有代码库时用 Grill with Docs”；它适合无代码库的访谈和记忆挖掘。
- context 一词本身过载：作者承认这里更接近 bounded context，而非一般意义上的上下文。
- 不追求一次完美的语言：作者认为语言“足够好但不必完美”即可停止，之后可重构成新的语言。
- ADR 有严格适用条件：仅用于难以逆转、缺上下文显得意外、有真实 trade-off 的决策；普通库选择不写 ADR。
- 范围限定：单一应用一个 context.md 足够；大型 monorepo 需要 context map 和多个 context。
- 原文未提供对照实验或量化证据；收益观察来自作者个人使用与反馈，非严格评测。
