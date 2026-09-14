# 从 /grill-me 到 /grill-with-docs：用对话先对齐领域语言

- 标题：从 /grill-me 到 /grill-with-docs：用对话先对齐领域语言
- 来源：youtube.com
- 原文：https://www.youtube.com/watch?v=6BB6exR8Zd8
- 作者：Matt Pocock
- 类型：主题特刊
- 摘要：Matt Pocock 的方法强调通过文档驱动的追问建立 shared language，再进入实现阶段，适合复杂业务和领域驱动设计场景。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：8156
- 策展人按：循环的起手式是把话说清楚，所以它排在 Loop 那篇后面。方法很土，管用。

---

- 原文标题：I stopped using /grill-me for coding. Here’s what I use instead:
- 作者：Matt Pocock
- 内参日期：2026-05-16
- 来源类型：YouTube
- 原文：https://www.youtube.com/watch?v=6BB6exR8Zd8
- 标签：agent skills, agentic engineering, context engineering

Matt Pocock 的方法强调通过文档驱动的追问建立 shared language，再进入实现阶段，适合复杂业务和领域驱动设计场景。

## 导读

agent skill 欣赏

## 核心观点/主旨

Matt Pocock 认为，/grill-me 的价值在于让 AI 通过持续追问先和人达成共同理解，但它仍然缺少一层可复用的领域语言沉淀。新的 Grill with Docs 把追问式对话、领域驱动设计里的 ubiquitous language、context.md 和 ADR 结合起来，让 AI 在进入实现细节前先校准术语、边界和难以逆转的决策。这样得到的不是更多文档，而是更少重复解释、更一致的命名、更容易导航的代码，以及人与 AI 在同一套语言里工作的感觉。

## /grill-me 的成功与局限

### Grill Me 的原始作用

- 作者先回顾自己几个月前写下的 Grill Me skill：它会让 LLM 对用户进行持续访谈，沿着设计树的每个分支往下问，一次解决一个决策依赖，直到双方形成共享理解。
- 这个 skill 受到大量反馈，用户称它能发现歧义、前期问题很多但长期节省时间，因为收集足够上下文后就能更接近一次性完成任务。
- 作者并没有否定 Grill Me，而是把它看作一个有效的基础形态：先让 AI 追问，而不是急着写代码。

### 它真正暴露的问题：语言没有沉淀

- 作者在实际使用中发现，AI 常常会对已有术语重新冗长描述，或者不知道某个团队内部术语已经有固定含义。
- 例如他的应用里有 course、lesson、video、section 等实体，后来想引入 pitch；pitch 在他的语境中是视频的包装方式，包括标题、描述和对受众的 framing。
- 另一个例子是 standalone video。作者知道它指“不连接 lesson 或 course 的视频”，但 AI 一开始并不知道这个领域含义。
- Grill Me 可以在当次对话中帮助澄清这些词，但好的 shared language 往往没有被记录下来，下一次又要重新解释。

### 缺失的是“非显而易见知识”的薄文档层

- 作者不想引入厚重文档，而是在寻找最薄的一层文档：只记录那些能让 AI 更快进入领域语境的非显而易见内容。
- 这层文档要解决的不是代码语法问题，而是“这个项目里这些词到底是什么意思”。
- 因此，Grill Me 的局限不是问得不够，而是问出来的语言、边界和决策没有成为可复用的项目资产。

## 从 DDD 借来的核心：Ubiquitous Language

### 领域驱动设计中的共同语言

- 作者引用 Eric Evans 的 Domain-Driven Design，把 ubiquitous language 定义为代码库、开发者和领域专家都共同使用的语言。
- 这套语言的价值在于：领域专家说出一个 app section 或业务概念时，开发者能理解，代码里的命名也能对应上。
- 对 AI 来说，这同样重要：如果 AI 使用的语言、用户说的语言和代码里的语言一致，AI 才更容易推断要改哪里、怎么命名、如何表达计划。

### 从独立 skill 到合并 skill

- 作者一开始是在 Grill Me 会话中手动调用 ubiquitous language skill，用它边讨论边创建 ubiquitous language.md。
- 这个组合让他意识到：追问和语言沉淀其实应该是同一个工作流，而不是两个彼此分离的动作。
- 因此他把二者合并成新的 Grill with Docs：保留 Grill Me 的访谈式追问，同时加入对领域文档的读取、挑战和更新。

## Grill with Docs 的文档机制

### context.md：记录共享语言

- Grill with Docs 会先查找 context.md，从中读取当前代码库或 bounded context 的 shared language。
- 作者承认 context 这个词本身有些过载，但在这里接近 DDD 的 bounded context：应用里使用同一套语言的一块范围。
- 如果是大型 monorepo，可以有 context map 和多个 context；如果是单一应用，则一个 repo 根目录的 context.md 就足够。

### 对语言的主动挑战

- 新 skill 在会话中会把用户的新说法和既有 glossary 对照，发现模糊语言、术语冲突和没有定义的概念。
- 它会讨论具体场景、交叉引用代码，并在过程中更新文档，而不是只在最后产出一个实现计划。
- 这种机制让 AI 在谈实现之前先处理语言问题：某个词是一对一还是一对多，某个实体是不是已有概念的 metadata，某个状态是否需要严格状态机。

### ADR：记录语言无法覆盖的非显然决策

- 作者认为有些问题可以靠 sharpen fuzzy language 解决，但有些非显而易见的架构决策不能只写进 context.md。
- 对这些 hard to reverse、没有上下文会显得 surprising、并且包含真实 trade-off 的决策，他使用 Architectural Decision Record。
- ADR 只用于有后续后果的决策，而不是记录可以随时替换的普通库选择。

## 示例：pitch 与 standalone video 的语言校准

### 从新功能想法进入语言讨论

- 作者想在应用中新增 pitch 实体，用于先思考视频的包装，再决定具体视频内容。
- Grill with Docs 读到已有的 context.md 后，发现 standalone video 已被定义为 lesson_id 为 null 的 video，于是先把注意力放在新概念和旧概念的关系上。
- 它没有立即进入数据库实现，而是先问 pitch 与 standalone video 的 cardinality：一个 pitch 对应一个视频，还是一个 pitch 可以包含多个 standalone videos。

### 术语冲突会改变产品和代码

- 另一个问题是 standalone video 是否仍表示任何未连接 lesson 的视频，还是要被重新定义成未被 pitch 关联的视频。
- 作者指出，这个回答会影响后续 UI：是把 pitched videos 单独分区，还是把 pitching 作为 standalone video 的 metadata。
- 他最后倾向于把 pitching 作为 standalone video 自身的 metadata，而不是制造新的主分类。

### 语言会落到变量名、文件名和删除语义

- 后续讨论继续延伸到 pitch status、pitch 是否可以没有 video、删除时是 cascade 还是 restrict。
- 作者强调这不是单纯 bike-shedding，因为 context.md 里的语言会影响生成代码的变量名、文件名、UI 文案和查找路径。
- 当语言足够好但不必完美时，他会停止继续打磨，接受之后可以重构成新的语言。

## 作者观察到的实际收益

### 更少 token 与更短回复

- 共享语言让 AI 不必反复长篇解释同一概念，可以用更少词直接指向项目中的真实对象。
- 作者还观察到，这种简洁不只体现在输出里，也体现在 AI 的 thinking traces 中，因为 AI 也是用语言来思考和规划。
- 语言越贴近代码和用户意图，AI 越能少绕路。

### 更一致的计划文档和代码导航

- 当对话语言、计划文档和代码命名一致时，AI 查找信息会更直接，例如围绕 pitches 搜索就能找到相关实现。
- 这与 DDD 对人类团队的收益一致：同样的 shared language 既能协调人，也能协调 AI。
- 关键不在于让 AI 多读文档，而是让项目里最关键的词能够跨人、AI 和代码保持一致。

## Grill Me 与 Grill with Docs 的适用边界

### Grill Me 没有死亡

- 作者明确保留 Grill Me，并把它放到 productivity 类别，适合没有代码库的泛用场景。
- 他举了一个非工程例子：有人用 Grill Me 让 AI 追问关于母亲的故事，从而帮助写悼词。
- 这说明 Grill Me 的本质是访谈和记忆挖掘，不局限于软件工程。

### 有代码库时优先 Grill with Docs

- 作者的最终区分是：没有代码库时用 Grill Me，有代码库时用 Grill with Docs。
- 即使项目很早期，他也倾向于使用 Grill with Docs，因为项目早期正是建立 shared language 的关键阶段。
- 文章最后把这个 skill 放入作者持续更新的 AI skills 工作流中，说明这是一种会不断迭代的工程实践，而不是一次性 prompt。

## 关键概念/术语

- **Grill Me**：通过持续追问帮助用户和 LLM 达成共享理解的 skill，适合先澄清再执行。
- **Grill with Docs**：把 Grill Me 的追问机制与 context.md、ubiquitous language、ADR 结合的新 skill。
- **Ubiquitous Language**：代码、开发者和领域专家共同使用的语言，也是让 AI 对齐领域语境的核心介质。
- [\*\*context.md\*\*](http://context.md/)：记录 shared language 的薄文档层，让 AI 在对话前先读懂项目术语。
- **Bounded Context**：在应用或 repo 中使用同一套语言的范围，大型 monorepo 可以拆成多个 context。
- **ADR**：记录难以逆转、缺少上下文会显得意外、且包含真实 trade-off 的架构决策。
- **Pitch**：视频的包装概念，包括标题、描述和 framing；在作者示例中用于先设计包装再生产内容。
- **Standalone Video**：作者项目中的领域术语，指不连接 lesson 或 course 的视频。
- **Shared Language**：让用户、AI、文档和代码命名都指向同一事物的共同词汇体系。

## 概念网络

针对 *I stopped using /grill-me for coding. Here’s what I use instead*（Matt Pocock, YouTube）的概念提取

### 核心概念解析（Core Concepts）

### 【追问式对齐】(Grill Me)

- **context**：

文中把 Grill Me 放在一次 coding session 前，用来持续追问歧义、依赖和设计分支，直到双方形成共同理解。

- **费曼一下**：它不是让 AI 更快开写，而是让 AI 先像一个严格访谈者，把还没说清楚的地方问出来。

### 【共享理解】(shared understanding)

- **context**：

作者说 Grill Me 的目标是让人和 LLM 在设计树上逐步达成共同理解。

- **费曼一下**：共享理解就是双方对“要做什么、为什么这么做、哪些选择互相依赖”有同一张脑内地图。

### 【设计树】(design tree)

- **context**：

Grill Me 会沿着设计树的分支往下问，并逐个处理决策之间的依赖关系。

- **费曼一下**：设计树就是一个功能还没实现前的决策空间；每个问题都会把后续可选路径变窄或改变。

### 【领域语言缺口】(missing language layer)

- **context**：

作者发现 AI 能谈代码，却反复需要他解释代码库和业务领域里那些非显而易见的词。

- **费曼一下**：真正拖慢 AI 的不是上下文少，而是项目里有一套人已经默认懂、AI 还没学会的语言。

### 【统一语言】(ubiquitous language)

- **context**：

作者借用 DDD，把代码库、开发者和领域专家共同使用的语言带进 AI coding workflow。

- **费曼一下**：统一语言就是让业务专家嘴里的词、开发者讨论的词、代码里的类名和 AI 计划里的词都对得上。

### 【领域专家】(domain expert)

- **context**：

文中把领域专家定义为懂你在构建什么、但不一定懂你如何构建的人。

- **费曼一下**：领域专家提供的是问题空间的真实词汇；如果代码也说这套话，沟通成本就会显著降低。

### 【上下文文档】(context.md)

- **context**：

Grill with Docs 会查找 context.md，从里面读取项目已有的 shared language。

- **费曼一下**：context.md 是给 AI 的领域词典，不是百科文档；它记录的是“这个项目里这些词是什么意思”。

### 【限界上下文】(bounded context)

- **context**：

作者把 context 解释成应用里使用同一套 shared language 的范围，大型 monorepo 可以有多个 context。

- **费曼一下**：限界上下文是在说语言的适用边界；同一个词可能在不同系统区域有不同含义，所以要划清范围。

### 【带文档追问】(Grill with Docs)

- **context**：

新 skill 保留 Grill Me 的开头，但增加了读取、挑战和更新领域文档的能力。

- **费曼一下**：它把“问清楚”升级成“问清楚并写进项目语言”，让下一次 AI 不必从零开始问。

### 【模糊语言打磨】(sharpen fuzzy language)

- **context**：

作者让 skill 对照 glossary 挑战语言使用，讨论具体场景，并交叉引用代码。

- **费曼一下**：模糊语言打磨就是把“差不多懂”的词逼到可命名、可建模、可落代码的程度。

### 【架构决策记录】(ADR)

- **context**：

对那些难以逆转、没有上下文会显得意外、且包含真实 trade-off 的决定，作者使用 ADR。

- **费曼一下**：ADR 不是会议纪要，而是给未来的人和 AI 解释“为什么当时选择这条难改的路”。

### 【Pitch】(video packaging)

- **context**：

在作者示例中，pitch 是视频的包装：标题、描述，以及如何把视频呈现给受众。

- **费曼一下**：pitch 不是视频内容本身，而是先决定这个视频以什么角度被看见。

### 【独立视频】(standalone video)

- **context**：

作者项目里，standalone video 指不连接 lesson 或 course 的视频；AI 需要从文档中先知道这个定义。

- **费曼一下**：这是一个项目内术语；如果 AI 不知道它的精确定义，就会在数据关系、UI 分区和命名上走偏。

### 【语言驱动的代码一致性】(language-code alignment)

- **context**：

作者强调 context.md 里的语言会影响变量名、文件名、UI 文案和代码搜索路径。

- **费曼一下**：当语言对齐，代码就更像领域模型的镜子；AI 改代码时也能顺着同一套词找到正确位置。

### 概念网络（Concept Network）

![图片展示了概念网络图，从领域语言缺口出发，经Grill Me建立共享理解，再通过统一语言形成context.md，此文档可被Grill with Docs读取、挑战、更新，也可与语言与代码一致部分交互。此外，context.md还与ADR（补充决策依据）相关。该图与上下文紧密相连，直观呈现了从领域语言缺口到统一语言形成，再到后续交互的逻辑链，辅助理解AI coding中人、AI、文档和代码共享领域语言的关键步骤。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTQwNWQ1MDZhZTdjNDY0NGQwODcxYTJlZDcyMmM4MTZfYjVhYzRjMzU4N2MzMmE2NjE3YjhhNmRhZDhlYzAzZTlfSUQ6NzY2OTUxNjYzNzgyMDczNDQxMl8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

**底层框架**：AI coding 的关键瓶颈不是 prompt 技巧本身，而是人、AI、文档和代码是否共享同一套领域语言。

**主干逻辑链**：

- Grill Me 通过追问建立一次性的共享理解，但这些理解不会自动沉淀。
- 领域语言缺口导致 AI 反复解释、术语冲突和实现前误解。
- DDD 的 ubiquitous language 提供了解法：让领域专家、开发者和代码共享同一套词。
- context.md 把这套 shared language 变成 AI 可读取的薄文档层。
- Grill with Docs 在追问过程中读取、挑战、更新这层文档，让语言校准发生在实现之前。
- ADR 补上 context.md 覆盖不了的非显然架构决策，解释 hard to reverse 的 trade-off。
- 语言、文档和代码命名一致后，AI 的回复、思考和代码导航都变得更简洁。

**辅助逻辑链**：

- pitch 与 standalone video 的例子说明，术语定义会直接改变 cardinality、UI 分区、metadata 归属和删除语义。
- bounded context 说明 shared language 需要边界；小项目可以一个 context.md，大型 monorepo 需要 context map。
- Grill Me 仍适合没有代码库的泛用访谈，Grill with Docs 则适合有代码库或正在形成代码库的工程场景。

**一句话总结概念网络**：

Grill with Docs 的本质，是把一次性追问变成可积累的领域语言系统，让 AI 在写代码前先学会项目真正使用的词。

---
