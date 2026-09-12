<title>Harness Engineering｜AI内参主题精选（28+2篇·图文最终版）</title>











**AI 内参 · 主题阅读集 · 图文版**

**Harness Engineering**

一个清单，搞懂 agent harness

**Howie 原清单 28 篇 ＋ Codex 补充推荐 2 篇**

*原清单更新于 2026-08-02 ｜ 整理于 2026-08-07*

---

# 整理说明

**匹配结果：**Howie 原清单 28 个 articleId 与 AI 内参文章逐条对应，清单标题和文章标题全部完全相同。

**补充边界：**不属于 Howie 的原始 28 篇精选；文章标题和正文来自 AI 内参，推荐词与 Codex 按为本次新写。

**图文版：**正文原位内嵌 60 张原文配图；把 15 张原文 Mermaid 直接渲染成图；另将 15 篇只有文字关系的概念网络整理成简图，并逐张标注为 Codex 制图。

harness ＞ model

## 阅读结构

- Howie 原清单的 01–28 编号、标题、内容说明和策展人按原样保留。
- Codex 补充 A1 建议插在原清单第 02 篇之后。
- Codex 补充 A2 建议插在原清单第 27 篇之后。
- 飞书导入后可以直接使用标题大纲跳转；每篇后面都是对应的 AI 内参 Markdown 正文。
- Mermaid 源码不再直接展示，成图节点显示概念名称；原文关系说明中的 C 编号按原文保留。

## 图解导航

- 原文配图：03、04、05、06、12、13、21、22、23、28、A2，共 60 张，均放回对应段落。
- 原文 Mermaid 成图：01、02、03、04、05、06、07、08、12、13、18、21、22、28、A2，共 15 张。
- Codex 据原文制图：09、10、11、14、15、16、17、19、20、23、24、25、26、27、A1，共 15 张；均明确标注为非原文配图。

HOWIE 原清单 · 01

# Martin Fowler 为「harness 工程」站台：Thoughtworks 的一线笔记

**内容说明：**从交付实践角度记录 AI 辅助软件开发中围绕 agent 搭脚手架的经验，把这块工作切成上下文工程、架构约束和对抗熵增的「垃圾回收」三块。短，但给了这个新词工程界的正式定义。

**策展人按：**先放 Fowler，是因为一个新词能不能站住，往往取决于谁先点头。这条很短，功能是背书不是内容。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：Harness Engineering
- 作者：martinfowler.com
- 内参日期：2026-07-31
- 来源类型：blog
- 原文：https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html
- 标签：harness engineering, context engineering

从交付实践角度记录 AI 辅助软件开发中围绕 agent 搭脚手架的经验，把这块工作切成上下文工程、架构约束和对抗熵增的「垃圾回收」三块。短，但给了这个新词工程界的正式定义。

## 导读

harness engineering 专题

## 核心观点

- 这是一篇一线技术领导者对 OpenAI「Harness engineering」写作的近距离评点。作者 Birgitta 是 Thoughtworks 的 Distinguished Engineer、AI 辅助交付方向的专家，有二十多年开发、架构与技术领导经验；文章发表在 martinfowler.com 的 Exploring Gen AI 系列——该系列专门记录 Thoughtworks 技术人对生成式 AI 用于软件开发的探索。
- 核心判断：她认可 harness 这个词。OpenAI 那篇文章标题里挂着 harness，正文却只出现一次，词很可能是事后想到的、受 Mitchell Hashimoto 那篇「engineer the harness」启发；但作者认为，用 harness 来指代「我们用来把 AI agent 管住（keep AI agents in check）的那一整套工具与实践」，是个好词。
- OpenAI 团队的实验本身足够硬：以「完全不手动敲代码」（no manually typed code at all）作为 forcing function，逼自己造出一套用 AI agent 维护大型应用的 harness；五个月后做出一个真实产品，代码量已超过 100 万行。
- 作者的两处保留：其一，所有描述的手段都指向长期内部质量与可维护性，唯独缺了功能与行为的验证（verification of functionality and behaviour）；其二，OpenAI 在「让我们相信代码可以由 AI 维护」这件事上有既得利益，可信度需要打折读。
- 由此延伸出全文真正的思想负载：harness 会不会成为新的 service template；要更高的 AI 自治，是不是必须先约束运行时；技术栈与代码库拓扑会不会因此收敛；以及一个更大的追问——新的抽象层究竟是自然语言，还是可被 harness 的代码库拓扑结构。

## 事情的起点：OpenAI 的「无手打代码」实验

- 实验设计的关键不在 AI 有多强，而在自我设限：把「一行代码都不手打」当成 forcing function，团队被迫把所有质量保障能力外化成工具与规则，而不是留在人的手上。
- 结果是一套真实规模的验证：五个月，一个上线产品，超过 100 万行代码，并且是在「用 AI agent 维护」这个前提下持续跑着的。
- 命名史值得记一笔：标题叫「Harness engineering: leveraging Codex in an agent-first world」，正文却只提一次 harness；作者猜测这个词是事后追加的，灵感可能来自 Mitchell Hashimoto 最近那篇 AI 采纳历程博客里的 engineer the harness 一步。
- 作者对词本身的态度很明确：不管来路如何，harness 这个词用得好——它准确描述了「把 agent 套住、同时让它使得上劲」的那套工装。

## harness 由什么构成：确定性与 LLM 的混合三件套

- 作者按自己的理解，把 OpenAI 的 harness 组件归成三类，三类都混合了确定性手段与基于 LLM 的手段。
- 第一类，context engineering（上下文工程）：一个写在代码库里、被持续增强的知识库，外加让 agent 能取到动态上下文——可观测性数据、浏览器导航都算在内。
- 第二类，架构约束（architectural constraints）：不只由 LLM agent 来盯，也由确定性的自定义 linter 和结构性测试（structural tests）来盯。确定性这一层是重点，它不依赖模型当天的状态。
- 第三类，「垃圾回收」（garbage collection）：周期性运行的 agent，专门找文档里的不一致、架构约束的违反，对抗熵与腐化（fighting entropy and decay）。
- 三类之外还有一条生长机制，作者专门引了原话：「When the agent struggles, we treat it as a signal: identify what is missing — tools, guardrails, documentation — and feed it back into the repository, always by having Codex itself write the fix.」——agent 卡住不算失败，算信号；缺的工具、护栏、文档补回代码库，而且补丁仍由 Codex 自己写。

## 作者的第一处保留：只管内部质量，谁管功能与行为

- 作者点出的空白很直接：以上全部措施都在提升长期内部质量与可维护性，写作里缺的是对功能与行为的验证。
- 这不是挑刺式的批评，而是一个结构性缺口——一套能保证代码「长得对」的装置，并不自动保证代码「做得对」。
- 第二处保留是读者立场上的提醒：作者明确说，尽管尊重作者与团队，OpenAI 对「让我们相信 AI 可维护代码」是有既得利益的（vested interest）；她选择先把这份折扣打出来，再来谈文章里确实存在的东西。

## harness 会成为新的 service template 吗

- 一个被文章激发出来的图景：大多数组织其实只有两三套主力技术栈，并不是每个应用都是自己的 snowflake（各不相同的雪花）。
- 于是可以想象一种未来：团队从一组现成 harness 里挑一个，对应常见的应用拓扑，直接开工——就像今天的 service template 帮团队沿「golden path」实例化新服务那样。
- 这样的 harness 会包含什么：自定义 linter、结构性测试、基础的上下文与知识文档、额外的上下文提供者。团队拿它当起点，再随自身应用的特性慢慢塑形。
- 老问题会不会重演：service template 的经验是，团队一边用一边回贡献，但其他团队常常难以把更新合并回来；harness 会不会同样面临 forking 与同步的难题。

## 要更高的 AI 自治，就得先收窄解空间

- 早期直到当下的 AI 编程叙事里藏着一个假设：LLM 会带来目标运行时的无限灵活——任何语言、任何模式，随便生成，模型自会搞定。
- 但要在规模上得到可维护、可信任的 AI 生成代码，总得有东西让步（something has to give）。
- 这套 harness 给出的经验指向相反的方向：提升信任与可靠性，靠的是收窄解空间——具体的架构模式、被强制执行的边界、标准化的结构。
- 交换关系因此很清楚：放弃一部分「什么都能生成」的自由，换来一堆装满技术细节的 prompt、规则和 harness。这是个价格，不是免费的升级。

## 收敛：技术栈、代码库拓扑，以及「新抽象层」之问

- 当写代码越来越不是敲字、而是操控生成（steering its generation），AI 可能把我们推向更少的技术栈。
- 框架与 SDK 的易用性仍然重要——「what's good for humans is good for AI」这一点被反复验证；但开发者在细节层面的口味会变得不那么重要：接口里那些小低效、小怪癖不再那么烦人，因为我们不再直接打交道。
- 新的选型标准随之出现：优先挑「有好 harness 可用」的技术栈，把 AI 友好度（AI-friendliness）放进考量。
- 这种收敛不止于技术栈，也可能发生在代码库结构与拓扑上：默认选那些更容易用 AI 维护的结构，因为它们更容易被 harness。
- 具体抓手上，作者能看清的两个重点是：保持数据结构稳定，以及定义并强制模块边界。她同时承认自己卡在细节上——OpenAI 说「we require Codex to parse data shapes at the boundary」，没有具体例子，她想象不出在他们的 harness 里这句话到底长什么样。
- 由此抛出全文最大的一问：如果我们能普遍学会 harness 代码库的设计模式，那么这些拓扑结构会不会成为新的抽象层——而不是许多 AI 爱好者所期待的自然语言本身。

## 存量代码库要不要补 harness

- 假设我们真的发展出好的 harness 技术，把 AI 自治度调到 9，紧接着的问题是：哪些技术能用在既有应用上，哪些只对「一开始就为 harness 而建」的应用成立。
- 对老代码库，要先算一笔账：改造（retrofitting）是否值得。AI 能让改造更快，但这类应用往往极不标准化、充满熵，可能根本不划算。
- 作者给了一个很具体的类比：像给一个从来没跑过静态代码分析的代码库第一次跑分析工具，然后淹没在告警里。

## 回到读者自己：你今天的 harness 是什么

- 五个月才做出这套东西，说明它不是能跳进去拿快速结果的事。
- 但可以马上反思的是：你今天的 harness 到底是什么。
- 作者给出的自检清单很朴素：有没有 pre-commit hook，里面装了什么；有没有想做的自定义 linter；希望给代码库加上哪些架构约束；有没有试过 ArchUnit 这类结构性测试框架。

## 结论：rigor 被搬到了别处

- 一个反直觉的结论：这套做法听起来远比「生成并维护一堆 Markdown 规则文件」要重得多。他们为 harness 的确定性部分建了大量工具。
- 上下文工程也不只是策展一个知识库，还包含大量设计工作——代码设计本身就是上下文的一大部分。
- OpenAI 团队的自述被作者拎出来：「Our most difficult challenges now center on designing environments, feedback loops, and control systems.」最难的挑战已经落在设计环境、反馈回路与控制系统上。
- 这让作者想起 Chad Fowler 那篇「Relocating Rigor」：严谨没有消失，它换了位置。听到关于「严谨该搬到哪里」的具体想法和经验，比一味指望「更好的模型」自动解决可维护性问题，要清爽得多。
- 结尾的自嘲也值得记：这一次她终于喜欢上这个领域的一个词，但这个词才两周大——她大概能屏住呼吸撑到有人把自己那个「一句 prompt 的 LLM 代码评审 agent」也叫作 harness 为止。

## 概念网络

### 关键概念

### harness（把 agent 管住的那套工装）

**context**：全文的锚概念。作者说她喜欢用 harness 这个词来描述「the tooling and practices we can use to keep AI agents in check」——我们用来把 AI agent 管住的工具与实践。它不是某一个工具，而是知识库、动态上下文、自定义 linter、结构性测试、巡逻 agent 的总和。

**费曼一下**：harness 原意是套在牲口身上的挽具——既限制它乱跑，又让它的力气能被用上。用在 AI 编程上是同一个意思：不是给 agent 松绑，也不是把它关死，而是造一副装置，让它的输出始终落在你能接受的范围内。

### 无手打代码（no manually typed code at all）

**context**：OpenAI 团队的自我设限规则，作者称之为 forcing function。正是这条规则逼出了整套 harness，并支撑起五个月、100 万行代码的真实产品。

**费曼一下**：把自己的退路堵死，才会认真造工具。只要允许「实在不行我自己上手改一行」，那些本该外化成规则和检查的东西就永远停在人的脑子里。禁止手打代码不是为了炫技，是为了把隐性能力逼成显性装置。

### context engineering（上下文工程）

**context**：作者归纳的 harness 三类组件之首：代码库内部持续增强的知识库，加上让 agent 取到动态上下文的通道——可观测性数据、浏览器导航。文末她进一步指出，上下文工程不只是策展知识库，代码设计本身就是上下文的一大部分。

**费曼一下**：agent 干得好不好，很大程度取决于它此刻知道什么。上下文工程就是有计划地安排「它该知道什么、从哪里知道」：静态的写进代码库，动态的开一条实时通道。而最深的一层是：代码写成什么样，本身就在告诉 agent 这个系统该怎么运转。

### 架构约束的确定性执行

**context**：harness 的第二类组件。关键在于这些约束不只交给 LLM agent 去盯，还由确定性的自定义 linter 和结构性测试来强制；作者在自检清单里点名 ArchUnit 这类结构性测试框架。

**费曼一下**：让模型来检查模型，等于让同一种不确定性做裁判。确定性检查的价值在于它今天和明天给出同样的结论——规则写死在代码里，违反就是违反，不看模型心情。

### 「垃圾回收」型 agent

**context**：harness 的第三类组件，周期性运行的 agent，专找文档不一致与架构约束违规，用作者的话说是在 fighting entropy and decay。

**费曼一下**：软件不会自己变好，只会自己变乱。这类 agent 相当于给代码库雇了个巡道工：不产出新功能，只在后台不断把跑偏的地方拨回来，让熵增的速度慢于修复的速度。

### 熵与腐化（entropy and decay）

**context**：既是「垃圾回收」agent 的对手，也是作者判断老代码库能否改造的依据——老应用往往「so non-standardized and full of entropy」，补 harness 未必划算。

**费曼一下**：熵在这里是很具体的东西：文档和代码对不上、模块边界越界、同一件事有五种写法。它不会一次性爆发，只会日积月累，直到没人能说清系统的真实结构——那时你想加任何自动化都无处下手。

### 卡住即信号（struggle as signal）

**context**：OpenAI 团队被作者引用的迭代机制原话：agent 卡住时把它当信号，找出缺什么工具、护栏、文档，喂回代码库，而且修复始终由 Codex 自己写。

**费曼一下**：这是把 debug 的对象从「这次的输出」换成「产生输出的环境」。人一旦开始接管，改进就停在这一次；把卡点当成环境缺陷来补，下一次同类问题就不再出现。

### 功能与行为验证的缺口

**context**：作者对 OpenAI 写作的第一处保留：所有措施都指向长期内部质量与可维护性，缺的是 verification of functionality and behaviour。

**费曼一下**：一套 harness 可以保证代码结构整洁、边界清楚、文档同步，但这些全是关于「代码长成什么样」的。它做的事对不对，是另一个维度的问题，需要另一套装置来回答——这个位置目前还空着。

### service template 与 golden path

**context**：作者用来类比 harness 未来形态的现成实践：service template 帮团队沿 golden path 实例化新服务；她设想团队从一组 harness 里按应用拓扑挑一个开工，也预判了同样的 forking 与同步难题。

**费曼一下**：golden path 是组织内被推荐的默认路线——照它走，脚手架、规范、工具链都是现成的。harness 若走上这条路，好处是新项目开局即有护栏，坏处是老问题会照搬过来：每个团队都把模板改成自己的样子，上游更新就再也合不回去。

### 解空间收窄（constraining the solution space）

**context**：作者从 harness 实践中读出的核心交换：提升信任与可靠性，靠的是具体架构模式、强制边界、标准化结构，代价是放弃一部分「generate anything」的灵活性。

**费曼一下**：可选项越少，出错的花样越少，检查也越容易写。想让 AI 自己跑得更远，你得先把跑道修窄——这是自由与自治之间的交换，不是双赢。

### AI 友好度（AI-friendliness）作为选型标准

**context**：作者对技术栈收敛的预判：当写代码变成 steering its generation，开发者在细节层面的口味变得不重要，接口的小怪癖不再烦人，团队可能优先选「有好 harness 可用」的栈。同时她保留了一句反向判断——what's good for humans is good for AI。

**费曼一下**：过去选框架看「我用着顺不顺手」，以后可能要多问一句「agent 用着顺不顺手、有没有现成护栏」。有意思的是这两个标准并不对立：清晰的接口对人好，对模型同样好。

### 拓扑作为新抽象层

**context**：全文最具野心的一问：如果我们普遍学会 harness 代码库的设计模式，这些拓扑结构会不会成为新的抽象层，而不是许多 AI 爱好者期待的自然语言本身。作者能看清的抓手是保持数据结构稳定、定义并强制模块边界。

**费曼一下**：抽象层是我们思考系统时真正操作的那一层。流行叙事说以后大家用自然语言编程，这一问反过来讲：真正决定系统能不能被 AI 维护的，也许不是你怎么描述它，而是它被切成了什么形状、边界画在哪里。

### rigor 的搬迁（relocating rigor）

**context**：作者借 Chad Fowler 的「Relocating Rigor」收束全文：OpenAI 团队自陈最难的挑战已变成设计环境、反馈回路与控制系统；她认为听到严谨该往哪儿搬的具体经验，好过指望「更好的模型」自动解决可维护性。

**费曼一下**：严谨这份工作量并没有蒸发，只是从「一行行把代码写对」搬到了「把环境、反馈和控制设计对」。谁以为 AI 会免掉这份工作，谁就会在几个月后收到一份没人看得懂的百万行代码。

### 概念网络

![图片是一张概念网络图，展示了harness的生成、演化及依赖关系。中心为harness，由无手打代码的forcing function催生，卡住即信号演化。其依赖解空间收窄、harness即新service template等，演化出老代码库改造成本、rigor的搬迁等。还涉及功能与行为验证缺口、技术栈与拓扑收敛等，最终指向拓扑作为新抽象层。该图与上下文紧密相关，直观呈现了harness在工程中的动态变化及影响因素。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTVkMDg3NWM5NjBhZmEwOTIzZjllNTA4ZDFmY2YzZDFfZTU2YWU0OGM0NTYxZjQyYjIwZDdmMzYxMzk4OGYyOThfSUQ6NzY3MTAwODA2NzU2MzAzMTc0MF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染；仅将 TD 改为 LR 以适配文档宽度；节点与连线未改*



这张网络的中心是 harness，但它不是一个静态定义，而是一条从约束出发、经由装置、最终指向抽象层变迁的链条。

起点是 C1 与 C2 的因果：「完全不手打代码」这条自我设限规则，才是 harness 的真正生成器。没有这条 forcing function，团队总能靠人手补救，装置就没有必须存在的理由。

C2 向下分出三条组件线（C3、C4、C5），三者分工不同但互补：上下文工程决定 agent 知道什么，架构约束的确定性执行决定它不能越过哪里，垃圾回收型 agent 则在时间维度上对抗 C7 的熵与腐化——前两者管一次生成的质量，第三者管长期不塌。C6 是这三条线的生长机制而非并列组件，它从外部指向 C2：每次 agent 卡住都被翻译成对装置的一次增补，所以图上画成演化关系而不是组成关系。

C8 与 C2 之间是无向的张力关系：功能与行为的验证不是 harness 的一个缺失零件，而是它整个覆盖面之外的一块空地。装置越完善，这块空地越显眼——代码结构可以被自动守住，代码做得对不对却仍无人接管。

右半边是从装置到范式的推演。C2 依赖 C9（解空间收窄），C9 换来 C10（更高的 AI 自治）——这是全文最硬的一条交换关系：自治不是模型变强的赠品，是用灵活性买来的。C9 继续外溢成 C11，技术栈与代码库拓扑向少数几种收敛，因为「容易被 harness」成了新的选型权重；而 C11 一旦成真，就逼出 C13 这个最大的问题：新的抽象层可能是拓扑结构，而不是自然语言。

C12 与 C14 是 C2 在组织现实中的两个侧面，方向相反。C12 是乐观面：harness 沿 service template 的老路演化成可复用起点。C14 是阻力面：老代码库熵太高，改造未必划算，因此这条画成张力而非支撑——同一个装置，对新系统是加速器，对旧系统可能是无底洞。

整张图最后收在 C15：harness 的本质不是新增了一层工具，而是严谨从人手中搬到了环境、反馈回路与控制系统的设计上。C1 到 C15 因此构成一个闭环——因为不许手打代码，严谨必须离开手指，落到别处。

## 费曼 x3

关于 AI 写代码的争论，大多停在模型能力上：写得对不对、能不能跑、下一代会不会更强。真正要紧的问题被跳过了——当代码不再由人一行行敲出来，是什么在替人守住这份代码的底线。

答案不是更好的提示词，而是一整套装置。把「完全不手动敲代码」当成自我设限的规则，五个月里逼出来的是：写进代码库、被持续增强的知识库，能取到可观测性数据和浏览器现场的动态上下文，由自定义 linter 和结构性测试确定性执行的架构边界，以及定期巡逻、专门清理文档不一致与架构违规、对抗熵与腐化的「垃圾回收」agent。把这一整套叫 harness——一副既套住 agent 又让它使得上劲的挽具——比叫「最佳实践」诚实得多。

最耐人寻味的不是它由什么构成，而是它怎么长出来的：agent 卡住的地方不算 agent 的失败，而被当成信号，缺什么工具、护栏、文档就补回代码库，而且补丁本身仍由它自己写。工程的重心因此从「我写得多好」挪到「我把环境设计得多好」——最难的挑战已经变成设计环境、反馈回路和控制系统。严谨没有消失，它只是搬了家。

代价同样清楚。早期的想象是 LLM 让你想用什么语言、什么模式都行；实践给出的方向恰好相反：固定的架构模式、被强制的模块边界、标准化的结构。要让 AI 跑得更远，先得把跑道修窄——愿意交出「什么都能生成」的自由，才换得来「生成的东西可以信」。顺这条路走下去，技术栈会向少数几个收敛，选型时会多出一条 AI 友好度，而代码库的拓扑本身，可能才是那个新的抽象层，不是很多人期待的自然语言。

两个问题仍然空着，也正因为空着才值得盯住。一是这套装置全部瞄准内部质量与可维护性，功能与行为对不对，仍无人接管。二是存量系统怎么办：花五个月造一副挽具，对一个从没跑过静态分析、一开就淹没在告警里的老代码库，可能根本不值当。所以该问自己的从来不是要不要做 harness，而是——你今天的 harness 是什么。pre-commit hook 里装了什么，想给代码库立哪几条架构约束，试过结构性测试没有。这些问题今天就能回答，而且回答它们本身就已经是在造那副挽具了。

HOWIE 原清单 · 02

# LangChain 解剖 agent harness：Agent = 模型 + harness

**内容说明：**把智能归于模型、把可用性归于 harness，逐项定义当下和未来 agent 需要的核心组件。适合当本主题的结构化索引先读。

**策展人按：**背书拿到了该看结构。Agent = 模型 + harness 这个等式是整份清单的骨架，后面二十几条基本都在给等号右边填东西。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：The Anatomy of an Agent Harness
- 作者：blog.langchain.com
- 内参日期：2026-07-31
- 来源类型：blog
- 原文：https://blog.langchain.com/the-anatomy-of-an-agent-harness/
- 标签：harness engineering, agents

把智能归于模型、把可用性归于 harness，逐项定义当下和未来 agent 需要的核心组件。适合当本主题的结构化索引先读。

## 导读

agent = model + harness

## 核心观点

- 全文的核心等式：**Agent = Model + Harness**。模型承载智能（the model contains the intelligence），harness 是让这份智能变得有用的那个系统（the harness makes that intelligence useful）。
- harness 的定义用的是减法：**If you're not the model, you're the harness.** 凡是不属于模型本身的代码、配置和执行逻辑，都是 harness。
- 作者 Vivek Trivedy 明确说，切分 agent 系统的方式有很多种，很多都很乱（messy），他之所以选这条最干净的界线，是因为它逼人去做一件事——**designing systems around model intelligence**（围绕模型智能来设计系统），而不是围着模型的缺陷打转。
- 全文方法论是**反向推导**：不列 harness 功能清单，而是从「模型这一原语」出发，按 Behavior we want (or want to fix) → Harness Design to help the model achieve this 的模式，一项一项推导出今天和明天的 agent 需要什么组件。
- 推导出的核心组件依次是：文件系统 → bash 与代码执行 → 沙箱与默认工具链 → 记忆与搜索（含上下文管理三件套）→ 长时程自主执行。这些原语不是并列的，越往后越依赖前面的，最后开始「复利」（compound）。
- 对未来的判断是双面的：模型变强会吸走一部分 harness 职责，但 harness engineering 不会因此消失——正如 prompt engineering 至今仍然有价值。

## 什么是 harness：一个用减法给出的定义

- 等式先行：Agent = Model + Harness；一句话版本是 **If you're not the model, you're the harness.**
- harness 是「除模型本身之外的每一段代码、配置和执行逻辑」（every piece of code, configuration, and execution logic that isn't the model itself）。
- 关键判断：**a raw model is not an agent**。裸模型只有在 harness 给了它四样东西之后才成为 agent——state（状态）、tool execution（工具执行）、feedback loops（反馈回路）、enforceable constraints（可强制执行的约束）。
- 作者给出的 harness 具体清单：
- System Prompts（系统提示词）
- Tools、Skills、MCPs 以及它们的描述（descriptions 本身也算 harness）
- Bundled Infrastructure：filesystem、sandbox、browser
- Orchestration Logic：subagent spawning、handoffs、model routing
- Hooks / Middleware，用于确定性执行：compaction、continuation、lint checks
- 注意清单里「描述」和「hooks」的地位：工具的描述文本、以及那些不经模型决策的确定性中间件，同样是 harness 的一等公民。
- 为什么坚持这条界线：不是因为它最准确，而是因为它把注意力从「模型还差什么」转向「该在模型周围造一个什么系统」。

## 为什么需要 harness：从模型视角反推

- 模型能力的素描非常克制：mostly 吃进 text、images、audio、video，吐出 text，**That's it.**
- 开箱即用做不到的四件事，全部是 harness level features：
- 跨交互维持 durable state（持久状态）
- 执行代码
- 获取 realtime knowledge（实时知识）
- 搭建环境、安装依赖包以完成工作
- 结构性结论：**LLM 的结构要求某种把它包起来的机器**（machinery that wraps them to do useful work）。
- 一个人人都用过的例子：为了得到「chatting」这种产品 UX，我们把模型包进一个 while loop，追踪历史消息并 append 新的用户消息——这已经是一副 harness 了。
- 主线心法：**把想要的 agent 行为，转换成 harness 里的一个实际功能**（convert a desired agent behavior into an actual feature in the harness）。
- harness engineering 的双重作用：帮人类注入有用的先验（inject useful priors）来引导 agent 行为；在模型变强之后，用来「surgically extend and correct」模型——外科手术式地扩展与纠正，让模型完成过去不可能的任务。

## 文件系统：最基础的 harness 原语

- 想要的行为：让 agent 拥有持久存储，能与真实数据打交道，能把塞不进 context 的信息卸载出去，并让工作跨 session 存活。
- 问题根源：模型只能直接操作 context window 里的知识。在文件系统之前，用户只能复制粘贴内容给模型——UX 笨拙（clunky），而且对自主 agent 根本不成立。
- 为什么解法是文件系统而不是别的：**世界本来就在用文件系统干活**，所以模型天然被训练在数十亿 token 的「如何使用文件系统」上。自然的解法就变成——harness 自带文件系统抽象与 fs-ops 工具。
- 文件系统解锁的三件事：
- agent 拿到一个 workspace，可以读数据、代码和文档。
- 工作可以增量累加和卸载，而不必把一切都攥在 context 里；agent 能存中间产物、维持超越单次 session 的状态。
- 文件系统是天然的**协作面**：多个 agent 与人类通过共享文件协调，Agent Teams 这类架构就依赖它。
- Git 在文件系统之上加了版本能力：追踪工作、回滚错误、开分支做实验。
- 作者的定位判断：文件系统「arguably the most foundational harness primitive」——后面几乎所有能力都要回来找它。

## bash 与代码执行：一个通用工具

- 想要的行为：agent 自主解决问题，人类不必预先设计好每一个工具。
- 今天主流的执行模式是 **ReAct loop**：模型推理 → 通过 tool call 采取行动 → 观察结果 → 在 while loop 里重复。
- 结构性瓶颈：**harness 只能执行它有逻辑的工具**。如果每个可能的动作都要人先造一个工具，agent 的能力上限就是工具表的长度。
- 解法：给 agent 一个通用工具——bash。于是 harness 自带 bash，模型靠写代码并执行来自主解决问题。
- 更本质的说法：bash + code exec 是朝着**给模型一台计算机**（giving models a computer）迈出的一大步，剩下的让它自己想办法。模型可以用代码即时设计自己的工具，而不被固定的预配置工具集束缚。
- 边界澄清：harness 仍然会带其他工具，但代码执行已经成为自主解题的**默认通用策略**。

## 沙箱与默认工具链：安全地执行并验证工作

- 想要的行为：给 agent 一个默认配置正确的环境，让它能安全行动、观察结果、持续推进。
- 为什么不能就地跑：本地执行 agent 生成的代码有风险，而且单个本地环境无法扩展到大规模 agent 负载。
- **沙箱给 agent 安全的运行环境**：harness 连到沙箱里跑代码、检查文件、装依赖、完成任务，得到安全隔离的执行。安全再加码可以做命令 allow-list 和网络隔离。
- 沙箱同时解锁规模：环境可以按需创建、在众多任务上扇出（fanned out）、干完就销毁。
- **好环境自带好的默认工具**：harness 负责配置工具链——预装语言运行时和包，git 与测试用的 CLI，用于网页交互与验证的 browser。
- browser、logs、screenshots、test runners 让 agent 有办法观察和分析自己的产出，从而形成 **self-verification loop**：写应用代码 → 跑测试 → 查日志 → 修错误。
- 归属判定很清楚：模型不会自己配执行环境。**agent 在哪运行、有哪些工具可用、能访问什么、如何验证自己的工作，全部是 harness 级的设计决策。**

## 记忆与搜索：让 agent 持续学习，并对抗上下文腐坏

- 想要的行为：agent 记得住见过的东西，也够得着训练时还不存在的信息。
- 硬约束：模型除了权重和当前 context 之外没有额外知识。既然无法编辑权重，**唯一的「加知识」途径就是 context injection**（上下文注入）。
- 记忆的落点仍然是文件系统：harness 支持 AGENTS.md 这类 memory file 标准，在 agent 启动时注入 context；agent 增删改这个文件后，harness 再把更新后的文件载入 context。
- 这构成一种 **continual learning**：agent 把一次 session 的知识持久存下来，再注入到未来的 session。
- 知识截止（knowledge cutoffs）的补法：Web Search，以及 Context7 这类 MCP 工具，让 agent 拿到训练停止之后才出现的信息，比如新的库版本和当下数据。作者的结论是——Web Search 和查询最新上下文的工具，是值得直接烤进 harness 的原语。
- 另一条想要的行为：**agent 的表现不应该随着工作推进而衰减。**
- **Context Rot**：模型在 context window 被填满的过程中，推理与完成任务的能力都会变差。所以 context 是宝贵且稀缺的资源，harness 必须有管理策略。
- 全文最锋利的一句定位：**Harnesses today are largely delivery mechanisms for good context engineering.**（今天的 harness 在很大程度上就是好的上下文工程的投递机制。）
- 三件应对武器：
- **Compaction（压缩）**：处理 context window 快满的情况。没有压缩时，对话超过窗口只能让 API 报错——那不行。压缩会智能地卸载并总结已有上下文，让 agent 继续工作。
- **Tool call offloading（工具输出卸载）**：大段工具输出会在不提供有效信息的情况下污染上下文。超过阈值 token 数时，harness 只保留输出的头部和尾部 token，把完整输出卸载到文件系统，模型需要时再去取。
- **Skills 与 progressive disclosure（渐进式披露）**：解决启动时载入过多工具或 MCP server、在 agent 还没开始干活就已经拖垮性能的问题。作者特别点出归属——**模型并没有选择让 Skill front-matter 在启动时进入 context，但 harness 可以支持这件事，替模型挡住 context rot。**

## 长时程自主执行：前面的原语开始复利

- 想要的行为：让 agent 自主、正确地完成复杂工作，并且跨越很长的时间跨度。autonomous software creation 是 coding agent 的圣杯（holy grail）。
- 今天模型的三个具体毛病：early stopping（过早停止）、难以分解复杂问题、工作跨越多个 context window 后失去连贯性（incoherence）。好 harness 必须围着这三点做设计。
- 结构性观察：到这一步，**前面的 harness 原语开始复合叠加**（start to compound）——长时程工作需要持久状态、规划、观察和验证，才能横跨多个 context window 继续推进。
- **文件系统与 git 用于跨 session 追踪工作**：agent 在一个长任务中会产出数百万 token，文件系统持久地捕获这些工作以追踪进展；加上 git，新的 agent 能迅速摸清项目的最新状态和历史；多 agent 协作时，文件系统就是共享的**工作账本**（shared ledger of work）。
- **Ralph Loop 用于让工作继续**：这是一种 harness 模式——用 hook 拦截模型的退出企图，在一个干净的 context window 里重新注入原始 prompt，逼 agent 对着完成目标继续工作。之所以可行，正是因为文件系统在：每一轮都从全新上下文开始，但能读到上一轮留下的状态。
- **规划与自验证用于不跑偏**：
- Planning 是模型把目标分解成一系列步骤；harness 通过好的提示词、以及注入「如何使用文件系统里的 plan 文件」的提醒来支持它。
- 每完成一步后，agent 受益于对正确性的检查，即 self-verification。实现路径有两条：harness 的 hooks 跑一套预定义测试，失败时把错误信息回灌给模型；或者提示模型独立地自评自己的代码。
- 验证的价值有两层：把解法锚定在测试上（grounds solution in tests），并为自我改进制造反馈信号。

## 模型训练与 harness 设计的耦合

- 现状：Claude Code、Codex 这类今天的 agent 产品，是**模型与 harness 同时在 loop 里**做的 post-training。这让模型在 harness 设计者认为它「应该天生擅长」的动作上变强——文件系统操作、bash 执行、planning、用 subagent 并行工作。
- 由此形成一个反馈回路：发现有用的原语 → 加进 harness → 用它训练下一代模型 → 模型在自己被训练的那副 harness 里越来越强。循环往复。
- 这种协同演化（co-evolution）对泛化有副作用：**改动工具逻辑会导致模型表现变差。** 作者举的例子是 Codex-5.3 prompting guide 里描述的 apply_patch 文件编辑工具逻辑——一个真正智能的模型在不同 patch 方法之间切换本该毫无压力，但「harness 在 loop 里」的训练方式造成了这种过拟合（overfitting）。
- 但关键的反转是：**模型被 post-train 时用的那副 harness，不一定是你这项任务的最佳 harness。**
- 证据一：Terminal Bench 2.0 榜单上，Opus 4.6 在 Claude Code 里的得分远低于同一个 Opus 4.6 在其他 harness 里的得分。
- 证据二：LangChain 自己**只改 harness**，就把他们的 coding agent 在 Terminal Bench 2.0 上从 Top 30 提到了 Top 5。
- 结论：为你的任务优化 harness，还有大量汁水可榨（a lot of juice to be squeezed out）。

## harness engineering 会走向何处

- 一个必然趋势：模型变强之后，今天住在 harness 里的一部分东西会被**吸收进模型**——planning、self-verification、长时程连贯性都会变得原生，从而需要更少的 context injection。
- 表面推论是 harness 应该越来越不重要。作者的反驳类比很干脆：**正如 prompt engineering 今天仍然有价值，harness engineering 很可能会继续对构建好 agent 有用。**
- 支撑这个判断的是一条区分：harness 今天确实在给模型的缺陷打补丁（patch over model deficiencies），但它同时也在围绕模型智能做系统工程。**一个配置良好的环境、正确的工具、持久的状态、验证的回路，会让任何模型都更高效，与它的基座智能无关。**
- LangChain 把 harness engineering 当作活跃的研究领域，用来改进他们的 harness 构建库 deepagents。作者列出三个正在探索的开放问题：
- 编排数百个 agent 在同一个共享 codebase 上并行工作
- 让 agent 分析自己的 trace，识别并修复 harness 级的失败模式
- harness 不再预配置，而是为给定任务**即时动态组装**（just-in-time）合适的工具与上下文
- 全文的收束句，也是它自己的定义回环：**The model contains the intelligence and the harness is the system that makes that intelligence useful.**

## 概念网络

### 关键概念

### Harness（框架 / 马具）

**context**：全文的定义对象。作者用减法给出边界——「If you're not the model, you're the harness」，即「every piece of code, configuration, and execution logic that isn't the model itself」。具体包含 System Prompts、Tools/Skills/MCPs 及其描述、bundled infrastructure（filesystem、sandbox、browser）、orchestration logic（subagent spawning、handoffs、model routing）、以及用于确定性执行的 hooks/middleware。

**费曼一下**：马具本身不产生力气，力气在马身上；但没有马具，马的力气没法变成拉车这件有用的事。harness 就是套在模型外面的那副装备——它不聪明，但它决定了模型的聪明能落到哪里、能不能持续、出错时能不能被纠正。

### Agent = Model + Harness

**context**：文章的核心等式，也是 TLDR 的第一句。作者强调 raw model is not an agent，模型只有在 harness 提供 state、tool execution、feedback loops 和 enforceable constraints 之后才成为 agent。

**费曼一下**：把「agent」这个模糊的词做了一次因式分解。以后评价一个 agent 好不好，可以分开问两个问题：模型这一项有多强？框架这一项做了多少事？两项是可以独立优化、也可以独立归因的。

### Harness Engineering（框架工程）

**context**：作者称之为「how we build systems around models to turn them into work engines」——把模型变成工作引擎的系统构建方式。它的两个作用是帮人类注入有用的先验（inject useful priors），以及在模型变强后「surgically extend and correct」模型。

**费曼一下**：不是给模型写更好的提示词，而是给模型造更好的工作环境。就像同一个工人，在工具齐全、流程清晰、有质检环节的车间里，产出会和在空地上完全不同——你改的不是人，是车间。

### Harness level feature（框架级能力）

**context**：指模型开箱即用做不到、必须由 harness 提供的能力。作者列举四项：维持跨交互的 durable state、执行代码、访问 realtime knowledge、搭建环境并安装依赖包。

**费曼一下**：一个判断归属的分诊标准。遇到 agent 做不到的事，先问它属于「模型不够聪明」还是「没人给它这个能力」。绝大多数看起来像智力问题的失败，其实是第二类——那就不该等模型升级，而该动手改框架。

### 从期望行为反推 harness 设计

**context**：全文的推导方法，作者写成 Behavior we want (or want to fix) → Harness Design to help the model achieve this，并明确说不做穷举清单，而是从「帮模型做有用的工作」这个起点推导出一组功能。

**费曼一下**：不是先看别人的框架有什么组件然后照抄，而是先说清楚「我希望它表现成什么样」，再倒推需要什么机制。这样得到的每个组件都带着理由，日后模型变了、任务变了，你知道哪些该留哪些该扔。

### Filesystem 作为最基础的 harness 原语

**context**：作者称文件系统「arguably the most foundational harness primitive」。理由不只是好用，还包括一条训练侧的论证——世界本来就用文件系统干活，模型天然在数十亿 token 的文件系统用法上训练过。它解锁工作区、增量卸载与持久状态、以及多 agent 与人类共享的协作面（Agent Teams 依赖它）。

**费曼一下**：给模型一块能写字的白板，而且是它从小就学会用的那种白板。context window 是短期记忆，文件系统是长期记忆兼公共桌面——后面的记忆、Ralph Loop、长时程协作，全都要回到这块白板上。

### ReAct loop

**context**：文中指出今天 agent 的主要执行模式——模型推理、通过 tool call 采取行动、观察结果，在 while loop 中重复。它同时暴露了一个结构性瓶颈：harness 只能执行它有逻辑的工具。

**费曼一下**：想一步、动一下、看一眼结果、再想下一步。这个循环本身很朴素，真正决定上限的是「动一下」这一步能动用什么——如果工具表是固定的，agent 的能力也就被这张表框死了。

### 通用工具与「给模型一台计算机」

**context**：作者主张与其强迫用户为每个可能的动作造工具，不如给 agent 一个通用工具：harness 自带 bash，让模型通过写代码并执行来自主解决问题。这被称作朝「giving models a computer」迈出的一大步，模型可以用代码即时设计自己的工具。

**费曼一下**：与其给厨师准备一百把专用刀，不如给他一间能自己打铁的作坊。代码执行是元工具——它让工具集从「事先枚举」变成「按需生成」，agent 的能力边界不再由设计者的想象力决定。

### Sandbox（沙箱）

**context**：解决「代码在哪里跑」的问题。本地跑 agent 生成的代码有风险，单个本地环境也无法扩展到大规模负载。沙箱提供安全隔离的执行环境，可叠加命令 allow-list 与网络隔离，并支持按需创建、扇出、用完销毁。

**费曼一下**：给 agent 一间一次性实验室——它可以在里面随便炸，炸完把房间扔掉再开一间新的。安全和扩展性其实是同一件事的两面：因为环境是隔离且可抛弃的，所以既能放心让它折腾，也能同时开一百间。

### Self-verification loop（自验证回路）

**context**：由 browser、logs、screenshots、test runners 这类观察工具支撑，让 agent 能「write application code, run tests, inspect logs, and fix errors」。在长时程章节进一步展开为两条实现路径：harness 的 hooks 跑预定义测试并在失败时回灌错误信息，或提示模型独立自评代码。作者指出验证的价值是把解法锚定在测试上，并创造自我改进的反馈信号。

**费曼一下**：让 agent 长出眼睛。只会写不会看的 agent，错了也不知道错在哪；能跑测试、能读日志、能截图对照，它才第一次拥有了「我干得对不对」这个信号——而所有自我改进都要从这个信号开始。

### Context injection（上下文注入）

**context**：作者的硬约束推论——模型除权重和当前 context 之外没有额外知识；在无法编辑权重的前提下，「the only way to add knowledge is via context injection」。记忆文件、Web Search、MCP 工具都是这条通道上的具体实现。

**费曼一下**：你没法给模型动脑手术，只能在它每次开口之前，往它面前的桌子上多放几张纸。一切「让 AI 知道更多」的花样，本质上都是在决定往桌上放什么、什么时候放、放多少。

### Memory file 与 continual learning（记忆文件与持续学习）

**context**：harness 支持 AGENTS.md 这类 memory file 标准，在 agent 启动时注入 context；agent 编辑后 harness 再载入更新版本。作者称其为一种 continual learning——agent 把一次 session 的知识持久存下来并注入未来的 session。

**费曼一下**：给模型一本它自己写、自己每天开工前先读一遍的工作笔记。权重改不了，但笔记可以改——于是「学习」这件事被从训练环节挪到了运行环节，由框架而不是训练管道来承担。

### Context Rot（上下文腐坏）

**context**：文中引用的概念，指模型随着 context window 被填满，在推理和完成任务上都会变差。作者由此得出「context 是宝贵而稀缺的资源」，harness 必须有管理策略，并给出全文最锋利的定位——「Harnesses today are largely delivery mechanisms for good context engineering」。

**费曼一下**：塞得越满未必记得越牢，反而会越糊涂。这是对「上下文窗口越大越好」的直接反驳——窗口大小是容量，不是效能。真正的手艺在于往里放什么、什么时候清理，而这活儿是框架干的。

### Compaction（压缩）

**context**：应对 context window 接近填满的策略。作者用反问点出必要性——没有压缩时，对话超出窗口的结果就是 API 报错，「that's not good」。压缩会智能地卸载并总结已有上下文，让 agent 得以继续工作。

**费曼一下**：桌子快堆满时，把旧材料归纳成一页纸的摘要、原件收进抽屉，腾出桌面继续干活。它换来的是连续性：一个能压缩的 agent 不会因为聊得太久就突然断片。

### Tool call offloading（工具输出卸载）

**context**：针对大段工具输出污染上下文却不提供有效信息的问题。harness 对超过阈值 token 数的输出只保留头部和尾部 token，把完整输出卸载到文件系统，模型需要时再去访问。

**费曼一下**：只把目录和结尾摆在桌上，整本书塞进书架，需要时再去翻。这是「文件系统作为 context 延伸」的最直接用法——信息没有丢，只是从昂贵的近处挪到了便宜的远处。

### Progressive disclosure（渐进式披露）与 Skills

**context**：Skills 被定位为 harness 级原语，解决启动时载入过多工具或 MCP server、在 agent 开始干活前就拖垮性能的问题。作者特别强调归属——模型并没有选择让 Skill front-matter 在启动时进入 context，是 harness 替它做了这个保护性取舍。

**费曼一下**：先给一份目录，用到哪一章再翻哪一章。它的深层含义是：能力的「存在」和能力的「在场」应该分开——你可以拥有一百个技能，但不必让这一百个同时占着注意力。

### Ralph Loop

**context**：一种 harness 模式——用 hook 拦截模型的退出企图，在干净的 context window 中重新注入原始 prompt，迫使 agent 对着完成目标继续工作。作者指出它之所以可行是因为文件系统在：每次迭代都从新鲜上下文开始，但会读取上一次迭代留下的状态。

**费曼一下**：模型想收工时，框架把它叫回来，递上同一份任务书和一张干净的桌子，说「接着干」。它把「长时间工作」拆成了许多次短时间工作，靠磁盘上的状态接力——连贯性不来自记忆，来自留在外部的痕迹。

### 模型训练与 harness 设计的耦合

**context**：Claude Code、Codex 这类产品是模型与 harness 同在 loop 中做的 post-training，形成「发现原语 → 加进 harness → 训练下一代模型」的反馈回路，模型在自己被训练的 harness 里越来越强。副作用是过拟合——改动工具逻辑会让表现变差（作者以 Codex-5.3 prompting guide 中的 apply_patch 为例）。反转在于：Terminal Bench 2.0 上 Opus 4.6 在 Claude Code 里的得分远低于它在其他 harness 里的得分，LangChain 只改 harness 就把自家 coding agent 从 Top 30 提到 Top 5。

**费曼一下**：模型和框架一起长大，会长出默契，也会长出依赖——换一副框架就手生。这有两个后果：一是模型的分数从来不是模型一个人的分数；二是「原厂框架」并不等于「最优框架」，为自己的任务重调框架，往往比换模型划算得多。

### 概念网络

![图片展示了Harness Engineering中Agent设计的流程图。从模型训练与harness设计组合出发，经张力、回归、驱动、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略、策略](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmE0N2VmZmMxYzM3ZDE3YTI0YTZjYjFlYjZlNzc4ODdfYmI0ZmViMTM0NzQxMmZhYmQ2NjVlMzBhMzk3N2U4MmRfSUQ6NzY3MTAwODA2ODU2OTY5NzQ3M18xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



整个网络的顶点是一条等式：Agent = Model + Harness。它把 agent 这个混沌的对象切成两块可以分别追问的东西——模型（C2）与 harness（C3）。这不是分类学游戏，而是全文所有推导的**发生器**：一旦承认智能只在模型那一侧，其余一切就都落在 harness 这一侧，harness 的组件清单也就不再是别人的最佳实践汇编，而是从模型缺什么反推出来的必然结果。

**第一条主链是「缺口 → 反推 → 原语」。** 模型的能力素描极其克制：吃进多模态数据，吐出文本，仅此而已。由此暴露的四个缺口（C4：持久状态、执行代码、实时知识、环境搭建）不是智力问题，而是能力归属问题。作者把它们统一转成一个可操作的推导模式（C5）：先说清想要什么行为，再设计对应的 harness 机制。文件系统（C6）、bash 与代码执行（C7）、沙箱（C8）、自验证（C9）就是沿着这条链一节一节被推出来的，且顺序不可交换——先有工作区才谈得上写代码，先有代码执行才需要安全的地方跑，跑起来了才有结果可观察可验证。

**第二条主链是「知识注入 → 上下文稀缺 → 管理策略」。** 无法编辑权重这个硬约束，把所有「让 agent 更懂」的手段都压缩成同一条通道：context injection（C10）。记忆文件（C11）和 Web Search 走的是这条通道的正向——往里放东西。但正向用力立刻撞上反向的约束：context rot（C12）说明这条通道有代价，塞得越满效能越差。于是 compaction（C13）、工具输出卸载（C14）、渐进式披露（C15）三件武器全部诞生于同一个张力，它们的共同动作也一致——把信息从昂贵的 context 里挪到便宜的文件系统里，需要时再取回。这解释了为什么作者说今天的 harness「largely delivery mechanisms for good context engineering」。

**两条主链在文件系统上交汇，并在长时程执行处复利。** C6 同时是第一条链的起点原语和第二条链的卸载目的地，这正是作者称它「最基础」的原因——它既是工作区，也是记忆载体，还是多 agent 的共享账本。长时程自主执行（C17）不是第六个新组件，而是前面所有原语叠加后涌现的能力：Ralph Loop（C16）靠文件系统在干净上下文之间接力，自验证（C9）提供不跑偏的信号，compaction（C13）提供跨窗口的连续性。三者缺一，长任务就会退回到 early stopping 与 incoherence。

**最外层是一对没有被作者调和的张力。** 模型训练与 harness 设计的耦合（C18）向内塑造 harness——被验证有用的原语会进入下一代模型的训练，模型于是在自己出生的框架里越来越顺手，甚至出现换个文件编辑工具就掉分的过拟合。这股力量指向「原厂框架最优」。但 C19 给出的证据指向相反方向：同一个 Opus 4.6 换个 harness，榜单位置可以天差地别；只改 harness 就能把 coding agent 从 Top 30 推到 Top 5。两者的张力是真实的，它意味着模型的分数从来不是模型一个人的分数，也意味着优化空间恰恰藏在耦合的缝隙里。

**最后，网络是闭合的。** C19 回到 C1 不是修辞：正因为等式的两项可以独立优化，「为你的任务优化 harness」才是一个有明确对象的工程动作，而不是模糊的调优直觉。作者对未来的判断也从这个闭环长出——模型变强会把 planning、self-verification、长时程连贯性吸收进 C2 一侧，harness 的补丁职能会萎缩；但 harness 的另一半职能（围绕模型智能做系统工程：好的环境、对的工具、持久的状态、验证的回路）与基座智能无关，因此不会随模型变强而消失。

## 费曼 x3

大多数人谈论 AI 能力时谈的是模型。但真正决定一个 agent 能不能干活的，往往是模型之外那一层。把这层说清楚只需要一个减法：如果你不是模型，你就是 harness。系统提示词、工具与技能的描述、文件系统与沙箱、子 agent 的编排逻辑、拦截退出的 hook——凡是不属于权重的部分，全在这一侧。

这个划分之所以有力，不在于它精确，而在于它逼你换一种提问方式：不再问模型还差什么，而是问我想要什么行为、该在模型周围造一个什么系统让它做到。裸模型吃进文本图像音频，吐出文本，仅此而已。它记不住上一次会话，跑不了代码，够不着训练之后发生的世界。每一项缺口都不是等模型变强就会自动填上的，而是一条明确的工程需求：给它一个工作区，于是有了文件系统；给它一台计算机，于是有了 bash 和代码执行；让它安全地折腾，于是有了沙箱；让它看得见自己干得对不对，于是有了测试、日志与自验证回路。

最反直觉的一条是：上下文不是越多越好。模型在窗口被填满的过程中会变笨，这叫 context rot。于是今天的 harness 在很大程度上只是「好的上下文工程的投递机制」——压缩、把冗长的工具输出卸载到磁盘只留头尾、用渐进式披露让技能到用时才展开。这些取舍模型自己无权决定，是别人替它做的。

更有意思的是，模型和框架已经开始互相塑造。今天的 agent 产品在训练时就把 harness 放进了 loop，模型于是在自己长大的那副框架里越来越顺手，顺手到换一种文件编辑工具就会掉分。但这并不意味着模型最适合的框架就是它出生的那副：同一个 Opus 换个 harness，榜单名次可以天差地别；只改框架不换模型，也能把一个编码 agent 从三十名开外推进前五。

所以值得记住的不是某个具体组件，而是那句收束：智能在模型里，让智能变得有用的那个系统在 harness 里。模型每强一分，今天由框架承担的一部分职责就会被吸走；但只要「为这项任务配一个更合适的环境」这件事还存在，这层工程就不会消失。你手上的模型也许和别人一样，你造的那副框架不一样。

CODEX 补充推荐 · A1

# Harness Engineering 三个 Scaling 维度的统一框架

**补充推荐词：**把 Harness Engineering 拆成时间、空间、交互三个 scaling 维度，解释 OpenAI、Cursor、Anthropic 为什么用了同一个词，却在解决不同问题。适合作为整份清单的概念地图。

**Codex 按：**前面那条给了零件表，这篇给坐标系。OpenAI、Cursor、Anthropic 嘴里说的是同一个 harness，实际各自在解时间、空间、交互三个不同的 scaling 问题。建议放在清单前面，后面二十几条都能往这三格里归。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：Harness Engineering 在讨论什么：三个 Scaling 维度的统一框架
- 作者：grapeot
- 内参日期：2026-04-06
- 来源类型：blog
- 原文：https://yage.ai/share/harness-engineering-scalability-20260330.html
- 标签：agents, agentic workflow, agent 元技能

OpenAI、Cursor、Anthropic 讲的 harness engineering 其实是三件不同的事——时间 scalability、空间 scalability、交互 scalability

## 导读

一个概念：harness engineering。aka：agent 元技能。

## 核心论点

Harness engineering 的本质是让 AI 构建软件变得 scalable，而 scalability 有三个独立的维度——时间、空间、交互。OpenAI、Cursor、Anthropic 三家各自解了其中一个，但人们用同一个词在讨论不同层面的问题，这是当前混乱的根源。

## 一个词，三件事

- 2026 Q1，三家先后发布 agent-first 软件开发实践报告，都被归入 harness engineering，但讲的是三件完全不同的事：
- **OpenAI** → 环境设计：文档体系、架构约束、可观测性基础设施，让 agent 在精心设计的工作环境里可靠生产代码
- **Cursor** → 协调架构：几百个 agent 同时工作，怎么分工、并行、收敛
- **Anthropic** → 运行时纠偏：一个 agent 连续跑几小时，怎么保持方向和质量
- 混乱根源：读者群高度重叠，术语高度一致，但各自回答的工程问题截然不同
- 大量二手解读还停留在两年前的 multi-agent 虚拟团队概念，离这三篇的实际内容更远

## 地基：三家收敛到的四条共识

这四条共识构成 harness engineering 的地基，三个 scaling 维度是在这个地基上的分化。

### 人类的核心工作从写代码转向设计 agent 的工作环境

- OpenAI：「设计环境、指定意图、构建反馈循环」
- Cursor：「架构和指令比 harness 本身更重要」
- Anthropic：planner 和 evaluator 的设计比 prompt 措辞对产出质量影响更大
- 共同结论：人类的杠杆点在于创造让 agent 能可靠工作的条件，代码本身由 agent 产出

### 知识必须版本化、可发现、存在于 repo 中

- OpenAI 最直白：**Codex 看不到的等于不存在**——Google Docs 里的讨论、Slack 上的对齐、脑子里的隐含知识，对 agent 统统是空白
- Cursor 验证：指令中的模糊措辞会被数百个 agent 同时放大，后果比人类团队严重得多
- 解法一致：把知识推入 repo，用 markdown 和结构化文档取代口头沟通

### 约束比指令有效

- OpenAI 用自定义 linter 强制执行分层架构，lint 错误信息本身就是给 agent 的修复指引
- Cursor 发现「no TODOs, no partial implementations」比「remember to finish implementations」有效得多
- 核心区别：约束是可执行的、确定性的；指令是可解释的、模糊的

### 完美主义是吞吐量的敌人

- OpenAI 采用最小阻塞合并：等待比纠错更昂贵
- Cursor 发现要求每次 commit 100% 正确会导致系统停滞，一个小错误让整个系统陷入修复循环
- 共同权衡：**纠错比等待便宜**——在 agent 产出速度远超人类注意力的场景下，这是合理的工程决策

任何一篇讨论 harness engineering 的文章，如果连这四条都没有涉及，大概率还在讨论别的东西。

## 三个 Scaling 维度

### 时间 Scalability：让一个 Agent 连续跑几小时（Anthropic）

**问题**：agent 在精心设计的环境里开始工作后，怎么在几个小时的连续运行中保持方向和质量？

**为什么独立于环境设计**：长时间运行会引发两类环境设计无法预防的失败——

- **方向漂移**：上下文窗口逐渐变满 → 一致性衰减 → 偏离方向、遗忘早期约束、在细节中越走越深
- **自评失真**：agent 能发现自己产出的缺陷，但随后说服自己可以接受，给出通过判断

**解法：三角色架构**

- **Planner**：一句话需求 → 完整产品 spec（只做产品层面和高层技术方向，不进入实现细节）
- **Generator**：按 spec 实现功能
- **Evaluator**：拿着事先协商的 sprint contract，用 Playwright 操作真实应用验证产出
- 关键：Evaluator 和 Generator 之间没有共享的内部状态——这种独立性是它能纠偏的前提

**最有方法论价值的部分：harness 组件的生命周期**

- 每个 harness 组件都是对当前模型能力边界的一个假设：
- Context reset → 假设模型无法在长上下文中保持一致性
- Sprint 分解 → 假设模型无法在连续长 session 中保持方向感
- Evaluator → 假设模型会对自己的工作过度宽容
- 这些假设有不同的过期速度：Sonnet 4.5 → Opus 4.5 → Opus 4.6 三代模型中，context reset 先被淘汰，sprint 分解随后淘汰，evaluator 仍然有价值
- 关键做法：逐一移除旧组件、测试质量是否真的下降，而不是继续叠加新组件

**产出**：数字音频工作站，运行 \~4 小时，成本 \$124（generator 第一轮连续跑 2h7min）。对比基线：单 agent 跑 20 分钟花 \$9，核心功能无法正常使用。

### 空间 Scalability：让几百个 Agent 并行工作（Cursor）

**问题**：能否通过投入 10x 计算获得 10x 有意义吞吐量？

**基准任务**：从零构建 web 浏览器引擎（Rust），数百个 agent 并行运行一周，生成 100 万+ 行代码。

**四次架构迭代（坦诚记录的失败过程）**：

1. **所有 agent 地位平等 + 共享状态文件** → 失败：持锁太久、忘记释放，20 个 agent 退化到 1-3 个的吞吐量；更深层：没有层级时 agent 变得回避风险，只做安全小改动
2. **四角色分离（Planner/Executor/Worker/Judge）** → 改善但被最慢 Worker 瓶颈住
3. **Planner 合并进 Executor** → 角色过载导致病理行为：随机休眠、停止生成任务、自己动手写代码
4. **最终方案：递归 Planner-Worker 架构** ✅

- 根 Planner 拥有整个项目范围，范围过大时生成子 Planner，递归进行
- Worker 在自己的 repo 副本上独立工作，完成后写 handoff（做了什么、发现了什么、有什么担忧）提交给 Planner
- Worker 之间互不感知，信息严格向上流动

**线性扩展的三个关键**：

- 规划层面：递归 Planner 让规划本身可并行，避免单一 Planner 成为瓶颈
- 执行层面：Worker 完全隔离，各自独立 repo 副本，消除锁竞争
- 质量层面：移除集中式 Integrator（它变成瓶颈），接受小而稳定的错误率，让错误被其他 agent 自然修复

**关键发现**：repo 从 monolith 重构为多个独立 crate 后，编译等待大幅缩短，吞吐量成倍提升 → **为 agent 优化的 repo 结构和为人类优化的可能不同**。峰值 \~1000 commits/hour。

### 交互 Scalability：让人用最少介入 steer 大量 Agent 工作（OpenAI）

**问题**：agent 产出速度远超人类注意力时，人应该通过什么界面来 steer 整个系统？

**原始交互模式**：人写 prompt → agent 跑（单次经常超 6 小时，通常在工程师睡觉时执行）→ agent 产出 PR → agent-to-agent review → 人选择性参与。三人团队五个月合并 \~1500 个 PR，平均每人每天 3.5 个。

**Symphony（2026.3 开源）**：把交互从「写 prompt 并触发」简化为「写 ticket 并移动状态」

- 用 Elixir/BEAM 构建的持久化守护进程
- 项目管理工具（Linear）变成 agent 的 job scheduler
- Ticket 移到 Todo → Symphony 自动创建独立工作空间 → 派 Codex 执行 → 产出 Proof of Work（CI 结果、walkthrough、录屏）→ 开 PR
- 配置通过 repo 内的 [WORKFLOW.md](http://workflow.md/) 完成（YAML frontmatter + Liquid 模板化 prompt）→ agent 策略跟代码一起版本控制

**人类注意力 scaling 的三层解法**：

1. **Agent 自我验证**：Chrome DevTools Protocol + 独立可观测性栈 → 高层目标（如「没有超过两秒的 span」）对 agent 可执行
2. **机械化约束取代人工 review**：自定义 linter 强制架构不变量，错误信息写成 agent 能理解的修复指引
3. **自动化熵管理**：编码「黄金原则」，后台 agent 定期扫描偏离、开修复 PR，大多数可在一分钟内审阅并自动合并

**反馈循环的转变**：重心从纠正 agent 的具体产出 → 改进 harness 本身（更好的测试、文档、约束），这些改进在所有未来 agent run 中复利。

## 三个维度之间的关系

理解依赖关系比理解每个维度本身更重要：

- **空间 scaling 会放大时间 scaling 的问题**：一个 agent 漂移，后果局限在一个 PR；几百个 agent 同时漂移，错误以并行度的倍数积累。Cursor 偏向接受稳定错误率并让系统自然收敛，Anthropic 偏向引入独立 evaluator——哪个更优尚无定论
- **交互 scaling 依赖时间和空间 scaling 的成熟度**：Symphony 的前提是单个 run 足够可靠（时间）且系统能管理大量 run（空间）。否则 ticket 驱动模式退化为手动触发的批处理
- **跨维度发现：模型选择对角色适配比预期更重要**：Cursor 发现 GPT-5.2 在长时间自主运行中优于 Opus 4.5（后者倾向提前停止和走捷径）。Harness engineering 的一部分工作是为不同角色匹配不同模型，且随模型迭代持续变化

## 框架的应用与边界

**判断工具**：当有人说 harness engineering 时，先问——它在解决哪个维度的 scaling？时间？空间？交互？三个维度的工程问题不同，解法不同，trade-off 也不同。

**质量过滤器**：如果一篇文章讨论 harness engineering 但连三个维度中任何一个都没触及，大概率在讨论更基础的东西——传统 multi-agent 协作、AI 虚拟团队概念、或者只是用时髦词包装已有实践。

**互补方向：Context Infrastructure**

- 三家讨论的 scaling 都在优化 agent 怎么工作，但质量上限取决于它拿到什么样的 context
- Harness 解决工作方式和协调，context infrastructure 解决认知密度
- 同样的模型 + 工具 + prompt，接入经过一年积累和分层精炼的认知框架后，产出从「正确的废话」变成「有判断力的分析」

**适用边界**

- 三个维度的 scaling 解决的是偏头部需求：极复杂系统、大型基础设施、AI 能力边界探索
- AI 对软件更深远的影响可能在另一个方向：让软件本身变得更简单、更一次性、更贴合具体需求
- 当交付物从成品软件变成 Generative Kernel 时，harness engineering 的重要性会下降——需要被 harness 的系统复杂度本身在降低

## 概念网络

### 核心概念解析 (Core Concepts)

- **【Harness Engineering】**
- **context**：

2026 Q1，三家先后发布 agent-first 软件开发实践报告，都被归入 harness engineering，但讲的是三件完全不同的事。

- **费曼一下**：Harness 原意是「驾驭」。Harness engineering 就是为 AI agent 搭建脚手架的工程学科——不是教 agent 写更好的代码，而是设计让 agent 能可靠工作的整个环境、流程和约束体系。本文的核心洞察是：这个词被三家公司用来指代三件完全不同的事（时间/空间/交互三个维度的 scaling），混淆了整个行业的讨论。
- **【时间 Scalability / Temporal Scalability】**
- **context**：

agent 在精心设计的环境里开始工作后，怎么在几个小时的连续运行中保持方向和质量？

- **费曼一下**：让一个 agent 从跑 20 分钟延长到跑 4 小时而不崩溃。核心难点是方向漂移和自评失真——跑久了 agent 会忘记初始目标，还会说服自己「差不多得了」。Anthropic 的解法是把一个 agent 拆成三个角色（Planner/Generator/Evaluator），用独立的验证者来对抗自我宽容。
- **【空间 Scalability / Spatial Scalability】**
- **context**：

能否通过投入 10x 计算获得 10x 有意义吞吐量？

- **费曼一下**：让几百个 agent 同时干活而不互相踩脚。核心难点是协调——共享状态导致锁竞争，集中式规划导致瓶颈。Cursor 的解法是递归 Planner-Worker 架构：Worker 完全隔离、各自独立副本，信息严格向上流动，让并行度真正线性扩展。
- **【交互 Scalability / Interaction Scalability】**
- **context**：

agent 产出速度远超人类注意力时，人应该通过什么界面来 steer 整个系统？

- **费曼一下**：当 agent 每天产出几十个 PR、人根本看不过来时，人类该怎么介入？OpenAI 的解法是把交互从「写 prompt」简化为「写 ticket 并移动状态」，让项目管理工具（Linear）变成 agent 的 job scheduler，配合自动化验证和熵管理来替代人工 review。
- **【方向漂移 / Direction Drift】**
- **context**：

上下文窗口逐渐变满 → 一致性衰减 → 偏离方向、遗忘早期约束、在细节中越走越深

- **费曼一下**：Agent 版的「煮青蛙」——不是突然崩溃，而是在长时间运行中缓慢偏离初始目标。上下文窗口满了之后，早期的约束和方向被新信息淹没，agent 在细节里越走越深却浑然不觉。
- **【自评失真 / Self-evaluation Distortion】**
- **context**：

agent 能发现自己产出的缺陷，但随后说服自己可以接受，给出通过判断

- **费曼一下**：Agent 版的「自我感觉良好」。它明明看到了问题，但作为自己工作的评审者，它倾向于找理由说服自己这没什么大不了。这就是为什么 Evaluator 必须和 Generator 没有共享内部状态——独立性是客观评价的前提。
- **【递归 Planner-Worker 架构】**
- **context**：

根 Planner 拥有整个项目范围，范围过大时生成子 Planner，递归进行。Worker 在自己的 repo 副本上独立工作，完成后写 handoff 提交给 Planner。Worker 之间互不感知，信息严格向上流动。

- **费曼一下**：Cursor 在四次失败后找到的最终架构。核心思想是「分治法」的工程实现：规划可以递归拆分（避免单一规划者成瓶颈），执行完全隔离（消除锁竞争），质量接受小幅损耗（让错误被自然修复而非集中审查）。这是让并行 agent 数量线性扩展的关键。
- **【Symphony】**
- **context**：

把交互从「写 prompt 并触发」简化为「写 ticket 并移动状态」。用 Elixir/BEAM 构建的持久化守护进程。项目管理工具（Linear）变成 agent 的 job scheduler。

- **费曼一下**：OpenAI 2026.3 开源的 agent 编排系统。它的创新在于把程序员和 agent 的交互界面从「写 prompt」变成「管 ticket」——你只需要在 Linear 上把任务拖到 Todo，Symphony 自动创建工作空间、派 agent 执行、产出 PR。agent 策略写在 repo 的 [WORKFLOW.md](http://workflow.md/) 里，跟代码一起版本控制。
- **【Harness 组件生命周期】**
- **context**：

每个 harness 组件都是对当前模型能力边界的一个假设。这些假设有不同的过期速度。关键做法：逐一移除旧组件、测试质量是否真的下降，而不是继续叠加新组件。

- **费曼一下**：本文最有方法论价值的洞察。每个 harness 组件（context reset、sprint 分解、evaluator）本质上是在说「模型做不到 X」。但模型在进化，这些假设会过期。正确做法不是无脑叠加新组件，而是定期拆掉旧组件测试——如果质量没下降，说明模型已经补上了那个短板。
- **【Context Infrastructure】**
- **context**：

三家讨论的 scaling 都在优化 agent 怎么工作，但质量上限取决于它拿到什么样的 context。Harness 解决工作方式和协调，context infrastructure 解决认知密度。

- **费曼一下**：Harness engineering 的互补方向。Harness 解决「怎么干活」，context infrastructure 解决「带着什么知识干活」。同一个 agent，接入经过长期积累和分层精炼的认知框架后，产出从「正确的废话」升级为「有判断力的分析」。这是作者对三篇报告共同盲区的补充。
- **【Generative Kernel】**
- **context**：

当交付物从成品软件变成 Generative Kernel 时，harness engineering 的重要性会下降——需要被 harness 的系统复杂度本身在降低。

- **费曼一下**：作者对 harness engineering 适用边界的判断。如果未来软件不再是大型复杂系统，而是按需生成的一次性内核，那么驾驭大型系统的工程学科自然失去用武之地。这暗示 AI 对软件更深远的影响可能不在于更好地构建复杂系统，而在于让系统本身不再需要那么复杂。

### 概念网络 (Concept Network)

![图片展示了Harness Engineering三个Scaling维度的统一框架。Harness组件生命周期横跨时间、空间、交互扩展性，每个harness组件是模型能力边界的假设，需随模型进化主动移除。时间扩展性涉及规划者、生成者与评估者应对漂移和自评失真；空间扩展性为递归规划者 - 工作者架构；交互扩展性是Symphony以工单驱动交互。上下文基础设施解决认知密度，与Harness工程互补。生成式内核在软件复杂度下降时重要性下降，与Harness工程存在互补关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDk2NjQxYTYxY2I5MWFkNDQ5YzBhYTQwZWFmZTU0MjZfYjgzZWJkM2YwZjkwNTgyOThjMjYwZjAwODNkYjU3YmFfSUQ6NzY3MTAwODA2ODU5OTA3NDA2N18xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

- **Harness Engineering** 是顶层概念，被拆解为三个独立的 scaling 维度：**时间 Scalability**（Anthropic）、**空间 Scalability**（Cursor）、**交互 Scalability**（OpenAI）
- **方向漂移** 和 **自评失真** 是时间 Scalability 的两个核心失败模式，催生了 Planner/Generator/Evaluator 三角色架构
- **递归 Planner-Worker 架构** 是空间 Scalability 的最终解法，经历四次迭代失败后收敛
- **Symphony** 是交互 Scalability 的工程产物，将人类交互界面从 prompt 简化为 ticket
- **Harness 组件生命周期** 横跨三个维度，提供了一种元方法论：每个 harness 组件都是对模型能力边界的假设，需随模型进化主动移除
- **Context Infrastructure** 与 Harness Engineering 互补——前者解决「认知密度」，后者解决「工作方式」，共同决定 agent 产出质量
- **Generative Kernel** 标定了 Harness Engineering 的适用边界——当软件复杂度本身下降时，驾驭复杂系统的工程学科重要性随之下降
- 三个维度之间存在依赖：空间 scaling 放大时间 scaling 的问题；交互 scaling 依赖前两者的成熟度

HOWIE 原清单 · 03

# 你的 agent 需要的是 harness，不是又一个框架

**内容说明：**主张 agent 运行时真正缺的是事件驱动、可持久的执行外壳，把工具、记忆和模型接到生产级基础设施上。本期 harness 主题的立论起点。

**策展人按：**清单的火药味从这里开始。它不只说 harness 重要，还点名框架不是答案。这个对立后面会被对方接住。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：Your Agent Needs a Harness, Not a Framework
- 作者：inngest.com
- 内参日期：2026-07-31
- 来源类型：blog
- 原文：https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework
- 标签：harness engineering

主张 agent 运行时真正缺的是事件驱动、可持久的执行外壳，把工具、记忆和模型接到生产级基础设施上。本期 harness 主题的立论起点。

## 导读

harness engineering 专题

## 核心观点

- 在任何工程学科里，harness 都是同一件东西：**连接、保护、编排各个部件，而自己不做事**。线束在引擎、传感器和仪表盘之间路由信号；测试 harness 提供让代码可重复、可观测的脚手架；安全带在你坠落时接住你。
- agent runtime 需要的正是这个东西。**LLM 是引擎，工具是外设，memory 是存储**——但把它们连起来的是什么？第五轮迭代 LLM 超时的时候，谁来接住这次失败？谁防止两条消息相撞？谁把一个 webhook 事件路由到正确的 handler、再路由到正确的回复频道？
- 那就是 harness。而**每一个 agent 框架都在从零重造一个**：自己的重试逻辑、自己的状态持久化、自己的任务队列、自己的事件路由。
- 作者的判断是：**持久化、事件驱动的基础设施早已解决了这些问题**。每一次 LLM 调用或工具调用都成为一个 step——一个可独立重试的工作单元；进程在第五轮死掉，前四轮的结果已经落盘。事件在函数之间路由触发，并发控制防止碰撞，step 级 trace 给你对 agent loop 每一轮的完整可观测性。**基础设施本身就是 harness**。
- 为了验证这一点，Inngest 造了 Utah——**Universally Triggered Agent Harness**：一个带工具、memory、子 agent 委派和完整持久性的 Telegram/Slack 对话式 agent，极简 TypeScript，**没有框架**，只有 Inngest 的 function、step 和 event 围绕一个标准的 think → act → observe 循环。作者的定位是「**一个持久化、云就绪版的 OpenClaw**」。
- 「universally triggered」这个词是实指：Telegram/Slack webhook、cron 定时、子 agent 调用、函数间事件——**agent 不知道也不关心自己是被什么激活的**。触发与工作解耦。明天加一个 Slack bot，agent loop 一行不改，harness 负责路由。

## harness 的定义与「谁来接住失败」

- harness 的三个动词是连接（connect）、保护（protect）、编排（orchestrate），而**关键在第四点：它自己不做工作**。这条边界正是它区别于框架的地方——框架倾向于替你决定 agent 怎么想、怎么行动，harness 只负责让这些动作可靠地发生。
- 作者把 agent runtime 的部件对号入座：LLM = 引擎，tools = 外设，memory = 存储。把这些部件摆齐之后，暴露出来的问题全是「之间」的问题——失败恢复、消息冲突、事件路由。
- 「每个 agent 框架都在从零造一个 harness」是全文的问题陈述。它暗示的浪费不是重复造轮子那么简单，而是：**这些框架在用应用层代码解决基础设施层问题**。
- 结论句直白：**这些全都是基础设施问题，不是 AI 问题**（All of these problems are infrastructure problems, not AI problems）。这句话是全文的价值主张，也是后面所有技术选择的依据。

## 架构：事件驱动，并把编排与 agent loop 解耦

![图片展示了Harness工程中事件驱动架构的整体拓扑。从Channel（Slack/Telegram）接收Webhook Event，经Inngest Cloud，通过WebSocket将State、Traces、Events广播。Local worker在Agent loop中运行步骤，步骤被检查点，事件被广播。LLMs和Tool calls（on disk）也与Local worker相关。该图与上下文紧密相关，直观呈现了文档中提到的Utah事件驱动架构及编排与agent loop解耦的特点。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTgzMDMyNTk3MzZlMzk0N2U5NTY3NGViNWU3YjgzMTJfYjE5ODFhNWQzYmY4NGI4ZGYzYzFiNTYzMThiZGEwYjVfSUQ6NzY3MTAwODA2Nzk3ODMwMDY0Nl8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜webhook 经 Inngest Cloud 到本地 worker 的整体拓扑* ｜ [原图](https://neican-res.candobear.com/article-images/8d5d302d0e9b688ea8e90b8b387927044ba2790013a888e86687fc167cbc2389.png)

- Utah 与多数 harness 不同的地方有两条：**它是事件驱动的，且把编排与 agentic loop 解耦**。它还借 Inngest Cloud 打通了「公网 webhook」与「本地 worker」之间的鸿沟。
- 完整链路：Telegram/Slack 的 webhook 打到 Inngest Cloud，一个 **webhook transform** 把原始 http payload 转成带类型的 Inngest event；跑在本地的 worker 接下这个事件，运行 agent function，然后**发出一个 reply 事件**，触发另一个独立的函数把回复通过对应渠道自己的 API 送回去。任何支持 webhook 的通信渠道（乃至任何服务）都能接进来。
- worker 用的是 Inngest 的 connect() API：**从你的本机（或一台 mac mini、一台远程服务器）向 Inngest Cloud 建立一条持久 WebSocket 连接**，不需要任何公网 endpoint。这是「本地跑 agent，但享受云编排」的关键一招。
- worker 里的 agent loop 本身极其朴素：**一个带「steps」的 while 循环，step 里调 LLM、跑工具**。作者用了 Pi 的 provider 接口和它的工具（评价是「两者都很棒」），但明确说这里可以换成任何东西——AI SDK、TanStack AI、自造工具，或接进 MCP。
- 图里同时标出了两个方向的收益：左侧「事件触发函数，agent loop 在本地跑 step」，右侧「step 被 checkpoint，事件被广播」——本地执行与云端状态/trace/事件是同一套机制的两面。

## 为什么不直接用 OpenClaw：编排层的价值

- 作者承认 OpenClaw 和 pi coding-agent 系列库是这个项目的灵感来源，但指出关键差异：**它们内部用的是进程内事件，事件与编排都在内存里处理**；而 Inngest 本身是一个事件驱动的编排层，**这个项目把执行与编排解耦了**。
- 解耦为 harness 带来五项具体能力：
- 编排层通过 trace 和 step 级检视提供**可观测性**；
- 内建的**持久化执行**带来可靠性与重试；
- 解耦为**多人、分布式的 agent 编排**铺路；
- 事件历史提供系统内发生过什么的**审计轨迹**；
- **调度**内建，支持 cron 或延迟/定时函数。
- 这一节的说服力不在于功能清单，而在于它把「in-memory 事件 vs 外部编排层」这条分界线画清楚了：前者足够跑通一个单机 agent，后者才让 agent 具备运维属性。

## agent loop 就是一串 step

- Utah 的核心是 think → act → observe 循环：每一轮调用 LLM，检查它是否想用工具，执行工具，把结果喂回去。**关键洞见是：每一次 LLM 调用和每一次工具执行都是一个 Inngest step。**
- 循环骨架：step.run 包住 callLLM（think）；若有 toolCalls 则逐个 step.run 执行工具（act），把 toolResultMessage 推回 messages（observe）；若 LLM 只返回文本没有工具调用，那段文本**就是**回复，循环结束。
- 三个值得注意的机制：
- **Inngest 自动为重复的 step ID 编号**。step.run("think") 在循环里被调十次，Inngest 内部记为 think:0、think:1……你不需要自己管理唯一 step ID，SDK 负责。
- **每个 step 独立可重试**。第 3 轮 LLM API 返回 500，Inngest 只重试那一个 step；第 1、2 轮的结果已经持久化，不会重放。作者点出这就是持久化执行本来的设计意图，只不过**从结账工作流换到了 agent loop 上**。
- **文本响应即完成**。LLM 返回文本且没有工具调用，这一轮就结束了，不需要显式的「done」信号。

## 工具不必自己造

- Utah 不手搓文件 I/O 和 shell 执行，而是直接引入 pi-coding-agent——来自 OpenClaw/Pi 生态、经过实战检验的工具实现：
- read、write、edit：文件操作，支持图片、二进制检测、智能截断（作者特别点名 edit 工具在 context window 上是个亮点）；
- bash：shell 执行，超时和输出截断可配置；
- grep、find、ls：搜索与导航，尊重 .gitignore。
- 在这些之上，Utah 自己只加了少数几个定制工具：remember（把笔记持久化进每日日志）、web_fetch、delegate_task。
- 作者把这一节的道理讲得很干脆：**AI agent 的工具故事和其他任何软件没有区别——用现成的库，用 Inngest step 包起来，完事**。示例里就是 createReadTool、createWriteTool、createBashTool 一路 import 进一个 tools 数组，「复制粘贴，开箱即用」。

## 六个函数，而不是一个巨石

![图片展示了Utah六个函数通过事件通信的流程。左侧“agent.message.received”触发“handleMessage”主循环，循环内有“subAgent”子agent运行。右侧“sendReply”将响应送回渠道，“acknowledgeMessage”作为打字指示器立即触发，“failureHandler”是全局错误处理。底部“heartbeat”以*/30的cron运行，用于memory compaction等。该图与上下文紧密相关，直观呈现了Utah六个函数的工作流程及事件连接关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTAyNjVkYjVmYWI4MGNmNTQ4ZWZjMjU0Zjk2MTAyNzhfZGRhNjViMDE1ZDZlYmNmZDUyZTI2YWJmYTc1MWNiYmJfSUQ6NzY3MTAwODA2NzQ4NzU5OTgyM18xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜六个函数由事件连接：确认、主循环、回复、失败兜底、心跳、子 agent* ｜ [原图](https://neican-res.candobear.com/article-images/9542e8ef35a57538b74e371a39d5f1815785cd6b5f4e93f9afa4cebe5044090f.png)

- Utah 不是一个包办一切的函数，而是**六个通过事件通信的函数**：
- handleMessage：主 agent 循环；
- sendReply：把响应送回渠道；
- acknowledgeMessage：打字指示器，立即触发；
- failureHandler：跨所有函数的全局错误处理；
- heartbeat：周期性定时签到（图中为 \*/30 的 cron，用于 memory compaction 一类的事）；
- subAgent：经 step.invoke() 隔离运行的子 agent。
- 这种拆分带来的直接好处：**打字指示器在消息到达时立刻触发，不必等 agent loop**；回复函数负责 Telegram/Slack 特有的格式化与错误处理（例如 LLM 生成了畸形 HTML 时降级为纯文本）；失败处理器接住所有函数的未处理错误并通知用户。
- **每个函数有自己的重试策略、并发控制和触发条件**。作者说这在 Inngest 里是自然的写法——你是在用一组小而专注、由事件连接的函数来组合行为。
- sendReply 的可组合性是个伏笔：它**可以从任何地方触发**，所以如果想让子 agent 或 fan-out 工作流在循环中途给用户发进度回复，只需要从一个新工具里发事件即可。

## 子 agent：step.invoke() 就够了

- 触发场景：有些任务大到会撑爆 context window——重构一个文件、研究一个主题、写一份文档。作者特别指出，像 OpenClaw 这类在**单线程对话**里跑的通用 agent（例如 Telegram），跨几天的长会话会遇到 context window 问题。答案是派生一个子 agent。
- 机制：Utah 提供 delegate_task 工具。主 agent 调用它时，用 step.invoke() 启动一次**完全独立的 agent function run**。子 agent 把会话上下文 fork 进自己的子会话（带自己的 session key），配一个聚焦的任务和产出目标。
- 子 agent 函数跑一个全新的 agent loop：**自己的 context window，同一套工具但去掉 \`delegate_task\`（不允许递归派生）**，最后向父级返回一份摘要。示例里 subAgent 是一个 retries: 1、由 agent.subagent.spawn 事件触发的普通 Inngest function。
- 作者强调这就是 step.invoke() 本来的用途——**把另一个 Inngest 函数当作一个 step 来调用，等它的结果，然后继续**。子 agent 拿到自己的重试、自己的 step 级可观测性、自己的持久化执行；父 agent 看到的只是一个工具结果：「这是我做的事」。
- 由此得出的结论很硬：**编排已经解决了，不需要 agent-to-agent 协议，只是函数在调用函数**。

## 单例并发：一次只跑一个对话

- 「一个对话」由渠道特定的 session key 定义：单线程渠道（如 Telegram）用 chat id；有 thread 的平台（如 Slack）则精确到 channel + thread。
- 问题场景：一个对话里连发多条消息时，你不希望第一个 agent loop 继续跑完、第二个再来回应——你希望 agent **同时拥有两条消息的上下文**。于是要么取消第一个循环让第二个接手，要么在循环内部处理「steering」。这个项目选择了 cancel + restart，理由是**循环带着全部上下文重启是最干净的做法**。
- 实现只需要在消息处理函数上加一行配置，做了两件事：
- **以 sessionKey 为键的单例并发**——每个 chat 同一时刻只有一次 agent run，没有竞态，没有交错的回复；
- **新消息即取消**——用户在 agent 处理中发来新消息，当前 run 被取消，新的 run 带着最新消息启动。
- 对照传统做法：你得给每个用户建队列、管理锁、自己处理取消。**在 Inngest 里这是一行配置。**

## 踩过的坑

- **上下文管理才是真正的难题。** 最难的不是调用 LLM，而是管理进入 LLM 调用的东西。Utah 用的工具单次可能返回数千字符，几轮之后对话上下文膨胀，模型开始跟丢——作者亲眼看到 agent loop **无休止地调用工具却始终产不出回复**。
- 修法是**两级上下文剪枝**：keepLastAssistantTurns: 3；softTrim 在超过 maxChars: 4000 时保留头 1500、尾 1500 字符；hardClear 在总量超过 50000 时整段清空并留下占位符。旧的工具结果被软裁或硬清，**最近三轮始终保持完整**。
- 在此之上还有一套针对**会话本身**的 compaction：估算 token 超阈值时，先把对话历史摘要化再喂进下一次运行。作者把两者的分工说得很清楚——**剪枝处理运行内的上下文，压缩处理跨运行的累积**。
- 另外两道保险：**预算警告**（agent 迭代次数快用完时注入系统消息，让它收尾）和**溢出恢复**（运行中途 LLM 返回 context-too-large 错误时，强制压缩消息并重试，不浪费一次迭代）。四者合起来让 agent 保持在轨。
- **多 provider 支持。** Utah 不直接调 Anthropic SDK，而是用 pi-ai 这个 provider 无关的 LLM 抽象，支持 Anthropic、OpenAI 和 Google，**换 provider 只是改配置**。作者展望了一个有意思的方向：子 agent 未来可能用不同模型甚至不同厂商——写代码的子 agent 用 Codex，做研究的用 Opus。
- **steering 仍是未解问题。** 用户在 agent 运行中途发新消息该怎么办？现在用 singleton 取消当前 run 再起新的，能用，但**在途的工作丢失了**；新 run 从持久化的会话状态接上，并不无缝。作者明说这是他们正在探索的领域。
- **streaming 与循环中途实时更新是机会点。** 每个 Inngest step 是原子的：运行、产出结果、结果落盘。这个项目尚未引入 streaming，也还没用上 Inngest 的 realtime 能力。Telegram 和 Slack 支持单条事件，团队想再叠一个 web app 和一个 TUI，去探索如何向支持流式的客户端**可选地推送循环中途的进度更新**。

## 下一步与可复用的结论

- Utah 目前是一个**跑在你自己机器或服务器上的、单人的个人 harness**；但作者认为核心架构支撑的远不止如此，接下来数周要探索的是让 Utah 真正「多人化」。
- 多人化的路径是**可替换的 sandbox、外部化的状态与 memory**——这也会让 Utah 能跑在 serverless 上。
- 其他在做的方向：基于 Inngest API 与 Insights 功能做**编码会话的 session 监控**；用 step.waitForEvent() 做**human-in-the-loop 审批流**；以及最能兑现「universally triggered」的一步——**让 Utah 自己写自己**：构建新的 agent 与工作流、创建新的 webhook、通过 API 自我监控。
- 源码作为参考实现公开在 GitHub 的 inngest/utah，包含：带 Inngest step 的 agent loop 与 pi-ai 的 provider 无关 LLM 层、来自 pi-coding-agent 的工具加自定义工具、经 step.invoke() 的子 agent 委派、经 webhook transform 的 Telegram/Slack 集成、上下文剪枝/压缩/溢出恢复、会话感知的单例并发。
- 最后一句是全文的推广面：**这个 agent loop 模式适用于任何对话式 AI**——Slack bot、Discord bot、客服 agent、编码助手；加一个新渠道无非是一个 webhook transform 加一个回复函数。如果你在做 AI agent 并撞上同样的墙——状态管理、重试、并发、可观测性——**你需要的原语可能已经存在了**。

## 概念网络

### 关键概念

### harness（工程套具）

**context**：全文的核心比喻与题眼。作者开篇即定义：在每一个工程学科里，harness 都是同一件东西——「连接、保护、编排各个部件，而自己不做工作」（the layer that connects, protects, and orchestrates components — without doing the work itself）。线束、测试 harness、安全带三个例子说明这是一个跨学科的通用角色。agent 领域缺的正是这一层。

**费曼一下**：harness 就像剧组里的场记加灯光加安全绳的合体：它不演戏，但没有它，演员根本没法可靠地演完一场戏。它管的是「连接处」和「出事时怎么办」，不管「演什么」。

### harness 与 framework 的分野

**context**：标题即论点——「Your Agent Needs a Harness, Not a Framework」。作者的指控是每个 agent 框架都在从零重造 harness：自己的重试逻辑、自己的状态持久化、自己的任务队列、自己的事件路由。框架替你决定 agent 怎么想；harness 只保证这些动作可靠发生。

**费曼一下**：框架是给你一套写好的剧本让你填空，harness 是给你一个稳固的舞台让你随便演。前者管「做什么」，后者管「怎么不出事」。作者认为大部分人真正缺的是后者。

### 持久化执行（durable execution）

**context**：全文的技术底座。「每一次 LLM 调用或工具调用都成为一个 step——一个可独立重试的工作单元。如果进程在第五轮死掉，第一到第四轮已经持久化了。」作者特别点明这不是为 agent 发明的新东西，而是**为结账工作流设计的持久化执行，原封不动地用到了 agent loop 上**。

**费曼一下**：像玩游戏时每过一关自动存档。第五关挂了，你从第五关重开，前四关不用重打。持久化执行就是把这套存档机制装进程序的每一步。

### step（可独立重试的工作单元）

**context**：Utah 的最小执行原语。step.run 包住 LLM 调用与每一次工具执行；LLM API 在第 3 轮返回 500 时，Inngest 只重试那一个 step，前两轮的结果不会重放。step 同时也是 trace 与检视的粒度。

**费曼一下**：step 就是一个被单独记账的小任务。它成功了就永久记账，失败了只重做它自己，不牵连已经做完的部分。

### step ID 自动索引

**context**：一个容易被忽略但很关键的工程细节。step.run("think") 在循环里被调用十次时，Inngest 内部把它们记作 think:0、think:1 等等——「你不需要自己管理唯一的 step ID，SDK 会处理」。这让「在循环里用持久化 step」这件事从繁琐变成自然。

**费曼一下**：你每次都喊同一个名字点名，系统自动在后面加编号区分是第几次，你不用费心给每一次都起个新名字。

### think → act → observe 循环

**context**：Utah 的 agent loop 形态，也是作者认为不需要框架就能写出来的东西：「一个带 steps 的 while 循环，step 里调 LLM、跑工具」。每轮调 LLM（think）、执行工具（act）、把结果喂回 messages（observe）；**LLM 返回文本且无工具调用即代表本轮结束**，不需要显式 done 信号。

**费曼一下**：想一想、动动手、看看结果，然后再想一想——直到不需要再动手，直接把话说出来为止。agent 的循环就这么朴素。

### 事件驱动编排与执行解耦

**context**：Utah 区别于 OpenClaw、pi 库的核心差异。后者「内部用进程内事件，事件与编排都在内存里」，而 Inngest 是一个外部的事件驱动编排层，于是「这个项目把执行与编排解耦了」。解耦换来可观测性、持久化重试、分布式多人编排的基础、事件审计轨迹和内建调度。

**费曼一下**：原来指挥和演奏是同一个人，出了错没人知道也没法回放；现在指挥站到台外，每个动作都被记录、可以重来、还能让更多乐手加进来。

### 普遍可触发（universally triggered）

**context**：Utah 名字里的第一个词（Universally Triggered Agent Harness），作者强调「这部分很重要」：Telegram/Slack webhook、cron 定时、子 agent 调用、函数间事件——**agent 不知道也不关心自己是怎么被激活的**。触发与工作解耦，「明天加一个 Slack bot，agent loop 也不变，harness 负责路由」。

**费曼一下**：不管是有人敲门、闹钟响了，还是同事喊你一声，你干活的方式都一样。谁来叫你，和你怎么干活，是两件事。

### webhook transform 与 connect()

**context**：打通「公网 webhook」与「本地 worker」的两个具体机件。webhook transform 在 Inngest Cloud 把原始 http payload 转成带类型的 Inngest event；connect() API 则从你的本机、mac mini 或远程服务器建立一条到 Inngest Cloud 的持久 WebSocket 连接，**不需要公网 endpoint**。

**费曼一下**：前者是海关，把外面五花八门的包裹拆开、贴上统一标签；后者是一条你主动拨出去的专线，这样别人不用知道你家地址也能把包裹送到。

### 小函数组合（六个函数，不是一个巨石）

**context**：Utah 由 handleMessage、sendReply、acknowledgeMessage、failureHandler、heartbeat、subAgent 六个通过事件通信的函数组成。分离带来的实效是打字指示器立即触发不必等 agent loop、渠道特有的格式化与降级隔离在回复函数里、全局错误由失败处理器统一接住；**每个函数有自己的重试策略、并发控制和触发条件**。

**费曼一下**：与其让一个人既接电话又做饭又救火，不如六个人各管一摊、用便条互相通知。谁出问题只换谁，不影响其他人。

### 子 agent 与 step.invoke()

**context**：应对 context window 撑爆的手段。delegate_task 工具被调用时，用 step.invoke() 启动一次完全独立的 agent function run，fork 出带自己 session key 的子会话，**工具集里去掉 \`delegate_task\` 以禁止递归派生**，最后向父级返回摘要。作者的结论是「编排已经解决了，不需要 agent-to-agent 协议，只是函数在调用函数」。

**费曼一下**：活太大自己干会脑子塞满，就交给一个助理，给他一个清晰的任务，他单独去做完，只把结论交回来。而且规定助理不能再找助理。

### 两级上下文剪枝（pruning）

**context**：作者称「上下文管理才是真正的难题」，症状是 agent loop「无休止地调用工具却始终产不出回复」。修法是配置化的两级剪枝：保留最近 3 轮助手回合；旧工具结果超过 4000 字符时软裁为头 1500 + 尾 1500；总量超过 50000 时硬清并留占位符。

**费曼一下**：桌上文件太多就看不见重点。于是规定：最近三份原样保留，久的只留首尾两页，实在太多就整摞收走贴个「已归档」的条子。

### 压缩（compaction）与运行内外的分工

**context**：与剪枝并列的第二套机制，作用对象是**会话本身**：估算 token 超过阈值时，把对话历史摘要化再喂进下一次运行。作者给出的分工判据很清晰——「剪枝处理运行内的上下文，压缩处理跨运行的累积」。

**费曼一下**：剪枝是这一场会议里少发点材料；压缩是每次开完会写一份纪要，下次带纪要来，而不是把历次材料全搬来。

### 预算警告与溢出恢复

**context**：上下文治理的另外两道保险。预算警告是在 agent 迭代次数快用完时注入系统消息，告诉它收尾；溢出恢复是当 LLM 在运行中途返回 context-too-large 错误时，强制压缩消息并重试，**不浪费一次迭代**。作者认为剪枝、压缩、预算压力、溢出恢复四者合起来才让 agent 保持在轨。

**费曼一下**：一个是提前提醒「还剩五分钟，请收尾」，一个是话说太长被打断时先精简再重说，而不是算作说过一次。

### steering（运行中途的介入）

**context**：作者明确标记的**未解问题**。用户在 agent 运行中途发来新消息时该怎么办？当前方案是 singleton 取消当前 run、带最新消息重启，代价是「任何在途的工作都丢失了」，新 run 从持久化的会话状态接上但「并不无缝」。这是他们正在积极探索的领域。

**费曼一下**：你正在给人干活，对方半路改口。现在的做法是把手上的活全扔掉重新开始——不会错，但浪费。怎么让人「边干边听改口」，还没有好答案。

### 「基础设施问题，不是 AI 问题」

**context**：全文的价值主张，出现在列举编排层五项收益之后：「All of these problems are infrastructure problems, not AI problems.」可观测性、重试、并发、状态管理、审计、调度——这些墙不是模型能力问题，撞上它们说明**你需要的原语可能已经存在了**，不必以 agent 之名重造。

**费曼一下**：agent 让人以为一切都是新问题，于是所有人从头造轮子。其实一大半麻烦，是软件工程二十年前就解决过的老麻烦，只是换了个场景出现。

### 概念网络

![图片是一张由Mermaid源码直接渲染的原文关系图。图中以“harness定义连接保护编排自己不做事”为核心，围绕“harness不是框架”这一主张展开。图中还呈现了“持久化事件驱动基础设施”“步骤级可观测性与审计”“基础设施问题不是AI问题”等支撑点，以及“step独立可重试单元”“think act observe循环”“六边形组合而非巨石”等具体概念，还涉及“子agent与step.invoke”“预算警告与溢出恢复”等细节。该图是对文档中“harness”概念网络的可视化呈现。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmQzNTMwMDc1YTBhNDlhNjA5MjZjYTNkNjU5OTJhNTdfZDgyNWE1ZDk0NzllNDgyNjQ4NThiYWViMDk2N2JmMzFfSUQ6NzY3MTAwODA2ODMwNTQyMzY2Ml8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



这张网络的**根**是一个定义：harness = 连接 + 保护 + 编排 + 自己不做事。把这四个词当作判据去看当下的 agent 生态，就得到文章的中心主张——你缺的是 harness，不是又一个框架。这条从「定义」到「主张」的边，是全文所有论证的起点，也解释了为什么作者反复回到「什么不属于 harness」。

主张之下是**唯一的技术押注**：持久化的、事件驱动的基础设施。它不是众多选项之一，而是被当成 harness 的充分实现——「基础设施本身就是 harness」。这个押注向下**分叉出三条并列的能力线**，构成网络的主干：

- **step 线**（持久化执行）：step 是可独立重试的工作单元，它使 think → act → observe 循环从「一段可能中途报废的代码」变成「可断点续跑的流程」，也顺带使子 agent 拿到自己的重试与持久性。
- **事件线**（路由与解耦）：事件把触发与工作分开，于是有了「普遍可触发」——agent 不知道自己被谁激活；同一条线还支撑了以 session key 为键的单例并发与取消重启。
- **可观测线**（trace 与审计）：step 级 trace 与事件历史，既是运维能力，也是文章结尾那句判断的**证据**——这些问题之所以是基础设施问题，正因为它们早已有基础设施级的解法。

网络中最值得注意的是**三处张力**，它们让这张图不至于变成一份产品功能清单：

第一处在 agent loop 与上下文之间。循环越持久、迭代越多，上下文膨胀越严重，直到 agent「无休止调用工具却产不出回复」。**持久性本身制造了它的反作用力**。剪枝、压缩、预算警告、溢出恢复四者不是并列的功能，而是沿着「运行内 → 跨运行 → 迭代预算 → 失败兜底」四个不同时间尺度铺开的层级式回应。

第二处在单例并发与 steering 之间。取消 + 重启是并发控制给出的最干净答案，但它以丢弃在途工作为代价。作者没有把这处裂缝粉饰过去，而是明确标为未解——这也是全文唯一一个「基础设施已解决」话术不成立的地方。

第三处在「借用」与「自造」之间。工具用 pi-coding-agent，LLM 层用 pi-ai，编排用 Inngest，Utah 自己只写了三个定制工具和一个 while 循环。这不是偷懒，而是主张的贯彻：**如果一件事是基础设施问题，那么正确的动作就是去用已经存在的原语**。

最后，网络在结尾**闭合成环**：从主张出发押注基础设施，基础设施带来能力，能力归结为「这些全是基础设施问题，不是 AI 问题」，而这句判断反过来回证了最初的主张。六个函数、step.invoke()、一行并发配置——所有具体实现都只是这个环上的例证，可以整体替换而论点不倒。

## 费曼 x3

有一个判断正在变得越来越可靠：当你在 agent 上撞到的墙是状态、重试、并发和可观测性，那你撞上的不是 AI 的边界，而是软件工程二十年前就翻过的那堵墙。你需要的原语可能已经存在了。

这句话之所以有分量，是因为它戳破了一个流行的错觉：agent 是全新的东西，所以要用全新的方式解决它的一切问题。于是每一个 agent 框架都在重造同一批零件——自己的重试逻辑、自己的状态持久化、自己的任务队列、自己的事件路由。它们造得越努力，越说明它们在用应用层的代码去解决基础设施层的问题。

真正好用的思考工具是那个古老的词：harness。在任何工程学科里它都是同一件东西——连接、保护、编排各个部件，而自己不做工作。线束在引擎和仪表盘之间路由信号，测试 harness 让代码可重复可观测，安全带在你坠落时接住你。定义里最关键的不是前三个动词，而是最后那半句：它自己不做工作。框架替你决定 agent 怎么想，harness 只保证这些动作可靠地发生。摆正这条边界，剩下的问题就都换了一副面孔：LLM 是引擎，工具是外设，memory 是存储，而真正稀缺的是把它们连起来、并在第五轮迭代超时时接住失败的那一层。

而那一层已经躺在那里了。把每一次 LLM 调用和每一次工具执行都变成一个 step，进程在第五轮死掉，前四轮已经落盘；这不是为 agent 发明的新机制，只是把为结账工作流设计的持久化执行原封不动搬到了 agent loop 上。让事件而非调用栈来路由触发，agent 就不再知道也不关心自己是被 webhook、cron 还是另一个 agent 激活的——明天加一个新渠道，循环一行不改。基础设施本身就是 harness。

这个视角最解放人的地方，在于它把「造 agent」从一件需要新范式的事，还原成一件需要好品味的事：工具用现成的库，模型层用 provider 无关的抽象，编排用已经解决过这些问题的系统，自己只写那个朴素的 while 循环。剩下真正棘手的，是它换不来的东西——上下文管理才是真正的难题，最难的从来不是调用 LLM，而是管理进入 LLM 调用的东西；以及用户中途改口时如何介入，取消重启能用，但在途的工作就这么丢了。

值得留意的是这两个残余问题的性质：它们恰恰是基础设施接不住的那部分。这也许才是真正的分工线——凡是能被基础设施接住的，就别再以 agent 之名重造一遍；剩下的，才是你该花心思的地方。

HOWIE 原清单 · 04

# HumanLayer：harness 工程就是把 coding agent 的配置点用到极致

**内容说明：**把提示词、上下文、工具和校验环节统称为可调配置点，给出提高任务成功率的具体做法，还顺带反驳了「把上下文窗口做大就行」。本组里实操密度最高的一篇。

**策展人按：**立完论得有人证明能落地。这篇给的是旋钮清单：哪些地方可以拧，拧了会怎样。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：Skill Issue: Harness Engineering for Coding Agents
- 作者：humanlayer.dev
- 内参日期：2026-07-31
- 来源类型：blog
- 原文：https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents
- 标签：harness engineering

把提示词、上下文、工具和校验环节统称为可调配置点，给出提高任务成功率的具体做法，还顺带反驳了「把上下文窗口做大就行」。本组里实操密度最高的一篇。

## 导读

harness engineering 专题

## 核心观点

- HumanLayer 团队用一年时间看着 coding agent 以各种可以想象的方式失败：无视指令、未经允许执行危险命令、在最简单的任务上原地打转。他们见过团队大量交付垃圾代码，也承认自己交付过一点。
- 每一次的本能反应都一样：「再等等，GPT-6 就能解决」「模型的指令遵循能力会变强」「等我用的那个小众库进了训练数据就好了」。但在几十个项目、几百次 agent session 之后，他们反复得到同一个结论：**这不是模型问题，这是配置问题**。
- 模型确实会变聪明，一些既有的失败模式会消失。但正因为它更聪明，我们会把更大更难的问题交给它，于是它**继续以出乎意料的方式失败**——对非确定性系统而言，意料之外的失败模式是个根本性问题。
- 与其祈祷 gpt-6.4-codex-ultrahigh_extended 来拯救所有人，作者选择回答另一个问题：**怎么从今天的模型身上榨出最多的东西？**
- skills、MCP servers、sub-agents、memory、agentfile 在技术上是分立的概念，但它们同属 coding agent 的**配置面**。作者把这个配置面称为 coding agent 的 **harness**，并把它理解成 agent 的运行时，或者说 agent 的外设：模型靠什么与环境交互。
- 全文的态度浓缩在最后一句：下次你的 coding agent 表现不如预期，在怪模型之前先查 harness。agentfile、MCP server、skills、sub-agents、hooks、back-pressure——杠杆大多藏在这里。模型大概率没问题，这只是个 skill issue。

## harness：coding agent 的配置面与运行时

![图片展示了harness工程中agent的运行流程。模型接收上下文注入（prompts、memory、skills、conversation）、控制（compaction、orchestration、ralph loops）、行动（调用bash、工具、MCPs，结果返回上下文）、持久化（文件系统、git、进度文件）以及观察验证（浏览器截图、测试结果、日志）等输入，模型基于这些输入进行推理，箭头和文字清晰标注了各部分之间的关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmYxYmUzNmMwYjUxNWVkYjE3MTNiMjFkZDI2NGUxZDRfM2QzZTQ1YjkyZWY0MGQ3YjE2M2ViYzZmMzYxMjg4OTNfSUQ6NzY3MTAwODA2ODY2NjE5OTI1NV8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜harness 把模型包在中间：上下文注入、控制、行动、持久化、观察验证五类外设* ｜ [原图](https://neican-res.candobear.com/article-images/104dafa91289aeacd4e365945661ad04b6bcc8236aa7b161a84fb87b6eef19d7.png)

- **harness engineering（harness 工程）** 这个词由 Viv 提出，指的是利用这些配置点来定制和改进 coding agent 输出质量与可靠性的实践。
- Mitchell Hashimoto 给出的定义最短也最锋利：harness 工程就是「每当你发现 agent 犯了一个错，就花时间工程化出一个解法，让 agent 再也不会犯这个错」。
- 这句话的重量在于它把 agent 可靠性从「祈祷模型升级」变成了一件可积累、可迭代、可交付的工程活儿：失败不是等待的理由，是配置的输入。

## harness 工程是上下文工程的子集

![图片为一张文氏图，展示了Harness工程作为Context Engineering（上下文工程）子集的关系。图中“Harness Engineering”位于“Context Engineering”内，两者相交部分包含“State/History”“Memory”等。此外，“Building a Coding Agent”包含“Prompt Engineering”“Structured Outputs”“RAG”等，还与“Harness Engineering”相交。图右下角有二维码及标注“@OniBlacklight & @daxhorty”。该图直观呈现了上下文工程与Harness工程的关系，与上下文提到的Harness工程定位为上下文工程子集的内容相契合。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTczYmEyYTg3NzYyM2RjNjVjMTkwZTczNGQ4YzA0NjRfNGZlZDFiYWI5ZWE0YzU2MWYxYmVmMzIwZDk0NzAyMGRfSUQ6NzY3MTAwODA2Nzc0MzQxOTM2NF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜文氏图显示 harness 工程是上下文工程的子集，hooks 与子 agent 都在其中* ｜ [原图](https://neican-res.candobear.com/article-images/a817fbc02bab0c5c25595548ccd11cf004e8342cef08652a26ac7b39bfd744c2.png)

- 作者明确把 harness 工程定位为 **context engineering（上下文工程）** 的子集。上下文工程由联合创始人 Dex 在 12-factor agents 中提出，是「提示词工程」的超集，还包含一系列系统性提升 AI agent 可靠性的技术。
- 更精确的表述：harness 工程是上下文工程中**主要通过 harness 配置点来精细管理 coding agent 上下文窗口**的那一部分。
- 它回答的是这样一串问题：
- 怎么给 coding agent 新增能力？
- 怎么教会它训练数据里没有的、关于我们代码库的知识？
- 怎么在系统消息里写「CRITICAL: always do XYZ」之外获得确定性？
- 怎么让 agent 的行为适配我们这个特定代码库？
- 怎么在「魔法提示词」之外提高任务成功率？
- 怎么防止上下文窗口膨胀过快，或者被太多坏上下文污染？
- skills、MCP servers、sub-agents、hooks、back-pressure 机制，都是他们摸索出来的战术解法。
- Viv 的两篇文章值得对照阅读：第一篇给出四个定制杠杆（系统提示、工具与 MCP、上下文、子 agent）；第二篇从**模型原生做不到什么**倒推每个 harness 组件为何存在。
- 作者补上 Viv 没强调的两个杠杆：一是 hooks，用于自动化集成和确定性控制流；二是 skills，用于知识的渐进披露（Dex 更愿意叫它们「Instruction Modules」，指令模块）。

![图片展示了模型原生无法实现的六种行为，以及Harness各组件如何补充。包括：持久处理真实数据（Filesystem + Git）、编写和执行代码（Bash + Code Execution）、安全执行及默认工具（Sandboxed Environments + Tooling）、记忆和访问新知识（Memory Files + Web Search + MCPs）、在长上下文保持性能（Compaction + Tool Offloading + Skills）、完成长期工作（Ralph Loops + Planning + Verification）。每项Harness功能均源于模型自身无法独立实现的行为。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzdlMDhjNGM3MjRmZTIxZWY0NzA2NzFkZTU2YmNmMzZfNTM5MzAzMWQxNTViZjMzM2NlY2I4ZDUzNTZjYThiZTNfSUQ6NzY3MTAwODA2Njg4NzgxNDM0Nl8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜从模型原生做不到的六种行为，反推出 harness 各个组件为何存在* ｜ [原图](https://neican-res.candobear.com/article-images/e32637a85704e76070585533a03b284a9ff0adad21d947dcb80f758f8ff741a3.png)

## 模型对 harness 会过拟合

- 常见反驳：既然前沿编程模型是在自家 harness 上做后训练的（Claude 在 Claude Code 里、GPT-5 Codex 在 Codex 里），那最好的配置就是模型被训练时用的那一套，别改。
- 佐证确实存在：Codex 模型与 Codex harness 的 apply_patch 工具耦合极深，以至于开源替代品 OpenCode 不得不专门为 GPT/Codex 模型加了一个 apply_patch 工具来模仿 Codex harness，而 Claude 等模型在 OpenCode 里照旧使用普通的 edit 和 write 工具。
- 但作者指出这把刀是双刃的：**模型也可能对自己的 harness 过拟合**。Viv 引用 Terminal Bench 2.0 的数据——Opus 4.6 在 Claude Code 里排第 33 位，换到一个后训练时没见过的 harness 里，排名升到第 5（上下浮动约 4 位）。
- 也就是说，「用官方 harness 最好」是个经验判断而非定律；harness 是变量，不是常量。

![图片展示的是Harness工程中“terminal-bench@2.0”模型的Leaderboard榜单。榜单显示了114条记录，列出了排名、Agent、Model、日期、Agent组织、Model组织、准确率和标准差等信息。其中，排名前10的模型包括Forge Code、Droid、Simple Codex等，它们的准确率在70.34% - 78.4%之间。该图片与上下文紧密相关，直观呈现了模型在Harness工程中的表现情况。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWExY2MwZjg0NWNiODk0ZTcyZTIyYWY2NjI2MGE0MDdfMzUyN2U3YzIzMGI0M2RlNTVhNDUxYTBiYmFhOWY5YjBfSUQ6NzY3MTAwODA2NjYyMzYwNjAwN18xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜榜单前十里，Opus 4.6 靠非原生 harness 排到第 5* ｜ [原图](https://neican-res.candobear.com/article-images/e9005a829d74e84462a7541e7b9ac71abf5cef846c95d8af68aa83209e193d02.png)

## agentfile：动别的配置之前先调这个

- 在碰任何其他 harness 配置点之前，通常值得先定制仓库顶层的 agentfile。这些 markdown 文件会被 harness **确定性地注入** agent 的系统提示。
- 苏黎世联邦理工（ETH Zurich）发布过一项研究，在多个仓库上测试了 138 个 agentfile，结论是大多数 agentfile 无用甚至有害，很多人据此说「你看，这东西根本没用」。研究的具体发现是：
- LLM 自动生成的 agentfile 反而**损害**性能，同时多花 20% 以上成本；
- 人工撰写的只带来约 4% 的提升；
- agent 处理上下文文件指令时多花了 14–22% 的推理 token，完成任务步数更多、调用工具更多，而解决率并没有提高；
- 代码库总览和目录清单完全没用——agent 自己就能把仓库结构摸清楚。
- 作者的读法是：这项研究恰恰**验证了他们原来的主张**。避免自动生成（要精心撰写）；指令越少越好（不该省的别省，但能少写就少写）；用渐进披露而不是把无关上下文都塞进去；内容要简洁且普遍适用，而不是堆一堆条件规则。
- 他们自己的 agentfile 不到 60 行。

## MCP server 是用来接工具的

- MCP server 的主要用途是把工具插进 coding agent，让它的能力超出文件读写和 bash 命令。MCP 规范里的 resources、prompts、elicitations 等特性，**在各家 MCP 客户端和 coding agent harness 里普遍支持得不好**。
- MCP 既支持跑在本机的 server（让 agent 与本地环境交互），也支持基于 HTTP 的远程 server（连 Linear、Sentry 这类服务）。
- 关键机制：接入 MCP server 后，可用工具的列表、描述和调用参数**会被注入 coding agent 的系统提示**。因此 server 可以通过工具描述来影响 agent 行为，告诉它何时该用哪个工具。
- 由此带来一条安全警告：正因为工具描述进了系统提示，**绝不要连接你不信任的 MCP server**——这是提示注入的危险入口；用 npx 或 uvx 在客户端本地运行的 STDIO server，即使没有提示注入也能在你的主机上执行代码。
- 工具太多是坏事：插进去的 MCP 工具一多，上下文窗口就被工具描述填满，把你更快地推进「笨蛋区」（the dumb zone）。**instruction budget（指令预算）** 同样重要——每一条无关的工具描述都是 agent 必须处理却毫无收益的指令。
- 这类失败太常见，以至于 Anthropic 发布了实验性的 MCP tool search，在用户接入工具过多时向 Claude 渐进披露工具。结论很直接：不在主动使用、又提供大量工具的 server，关掉。
- 另一条经验：如果某个 MCP server 复制的功能已经有训练数据里充分出现过的 CLI，直接提示 agent 用 CLI 效果更好。GitHub、Docker、大多数数据库都属于这一类——模型在训练中见得够多、本来就会用，还能顺带与 grep、jq 组合，进一步提高上下文效率。
- HumanLayer 的实操案例：他们用了一阵 Linear MCP server，发现只用到其中一小部分工具，于是写了个包装 Linear API 的小 CLI，返回极度精简的响应，并在 agentfile 里给出 6 条示例用法（取 issue、列 issue、加评论、加链接、改状态、取分支名、取工单图片）。这一手省下了系统提示里成千上万个来自 MCP 工具定义的 token，以及更多来自冗长 MCP 响应的 token。

![这张是对比两张智能体工具调用流程的示意图，左侧为未挂载过多MCP工具的情况，标注为“Without MCP Tools”，右侧为挂满MCP工具的情况，标注为“Too Many MCP tools”。在中间的分界线上，有文字标注“The 'Smart Zone'”和“The 'Dumb Zone'”，分界线上方为右侧路径新增的过多MCP工具模块，包括GitHub、Linear、Snowflake、Postgres等各类MCP工具。两张图的系统提示、CLA/IDE配置、Claude内置工具、用户消息及后续交互步骤（Read、Edit、Write、Book等）均保持一致，仅右侧额外新增了多个各类MCP工具模块。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODkwZTdmOGYyYzIwMjVjMTY4MDlmZDE4YzE4MzdmODdfMmRkOTI4YjU4MzYxZDEyMDgwZjEzYzA1Zjc3MTYxMDZfSUQ6NzY3MTAwODA2NzI4MjA0NjEzMl8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜对比图：挂满 MCP 工具后，用户消息还没出现就已经跌进笨蛋区* ｜ [原图](https://neican-res.candobear.com/article-images/34385b262847f40b6c018acd75da5d883227a37f7e9ee16c9e7ca007910016bd.png)

## skills 是用来装可复用知识（和工具）的

- skills 最初由 Anthropic 为 Claude Code 引入，此后成为开放标准，Codex、OpenCode 等 harness 也已支持。作者关心的不是它怎么组织，而是它**为什么有用**。
- 先泼一盆冷水：技能注册表已经被抓到分发过数百个恶意 skill。对待 skill 要像对待 npm install random-package 一样——读清楚你装了什么。ClawHub、[skills.sh](http://skills.sh/) 这类注册表能在你机器上执行任意代码。
- **progressive disclosure（渐进披露）** 是 skills 的核心价值。作者很早就吃过亏：把每条指令、每个工具都塞进系统提示，agent 越用越糟——还没开工，指令预算就烧光了。skills 的解法是，只有当 agent 判断（或你替它判断）需要时，它才拿到那部分指令、知识或工具。
- 技能激活的机制：skill 目录下的 SKILL.md 会作为一条 user message 载入 agent 的上下文窗口，同时 agent 被告知这个文件所在的目录，于是 SKILL.md 可以进一步说明目录里还捆绑了什么（模板文件、若干 CLI 等）。
- 由此可以把渐进披露玩得更深：一个 skill 里放多个 markdown 文件，各自承载不同功能、不同用途的信息，由主 SKILL.md 告诉 agent 其他文件是什么、什么时候该读。
- 一个现实限制：**没法把 MCP server 或自定义 agent 工具直接打包进 skill**，你得把它写成可执行文件、CLI、NPM 包之类，随 skill 分发，或在 skill 文件里指示 agent 去安装。例如与其配 Playwright MCP server，不如给 agent 一个用 BrowserBase 或 Vercel 浏览器 CLI 的 skill。

## sub-agents 是用来做上下文控制的

![图片展示了Harness工程中主agent和子agent的上下文窗口及任务处理流程。左侧为主agent上下文窗口，包含系统提示、Claude、内置工具等，用户消息请求更新XYZ schema，Agent()调用子agent，子agent结果为文件位置。右侧为子agent上下文窗口，同样有系统提示、Claude、部分内置工具等，用户消息请求在XYZ中查找文件位置，子agent调用多个工具，最终结果为文件位置。中间的“Context Firewall”对子agent几十次工具调用进行拦截，只让主线程收到最终结论。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDk5MWEwMTJjYzc0ZGNlM2VkMjZiMmQ4M2QxOTdjMTZfZjI1NTk1MGM4OGY3ZWUyY2M1YzEwNWMwZTg0NDQ2YTBfSUQ6NzY3MTAwODA2ODM3ODM4MTI4NV8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜上下文防火墙：子 agent 的几十次工具调用被挡在外面，主线程只收到最终结论* ｜ [原图](https://neican-res.candobear.com/article-images/94c05856c966bfddbb9250aea0f69bed1e81bcc1bcb021adc6a57633b30ef7b4.png)

- sub-agents 很流行也经常被误解。作者试过「前端工程师子 agent」「后端工程师子 agent」「数据分析师子 agent」那一套——**不管用**。真正管用的是把 sub-agents 用于**上下文控制**。
- 机制：sub-agent 把一整个 coding agent session 的工作封装起来，派发方只看到自己写给 sub-agent 的提示，以及 sub-agent 的最终结果；中间的工具调用、工具返回和其他消息，一概不进入父 agent 的上下文窗口。
- 在复杂的、棕地的、企业级代码库上做了几个月硬问题之后，他们发现 sub-agents 是特别强的杠杆：当一个问题需要非常多个上下文窗口才能解决时，**sub-agents 是跨多个 session 维持连贯性的关键**，它们**扮演「上下文防火墙」**，让离散任务在隔离的上下文窗口里跑，中间噪音不会累积到负责编排的父线程里。
- 把工作拆成离散任务再派给 sub-agents，是他们让主线程留在「聪明区」（smart zone）的办法，研究、实现和其他吃上下文的日常工作都这么干。
- **sub-agents 规避上下文腐烂**：Chroma 的 context rot 研究为「模型在更长上下文下表现更差」提供了实证——他们在大海捞针任务上测了 18 个模型。虽然这类任务与 agentic coding 差别不小，但结论与作者的体感完全一致：**上下文越长，性能越差，简单任务也不例外**。更糟的是，当问题与上下文中相关信息的语义相似度低时，衰减更陡；父 session 里每一次无关的工具调用、每一条 grep 结果、每一次文件读取都是潜在的干扰项，而干扰效应在长上下文里会**叠加**。
- 顺带回应「把上下文窗口做大就行」的思路：厂商给出的扩展上下文版本，通常不是一个指令预算更大的更大模型，而是同一个模型加上一些聪明的数学（例如 YaRN）来延长它能注意的序列长度。**更大的上下文窗口不会让模型更擅长找针，它只是把草堆堆得更大**——对使用者而言，只是能塞进更多指令（每条 user message 至少是一条指令，通常是好几条），把自己推得离笨蛋区更深。
- 所以，如果你觉得自己需要更长的上下文，你可能真正需要的是更好的**上下文窗口隔离**。sub-agents 在结构上解决这件事：每个 sub-agent 拿到一个全新的、小的、高相关的上下文窗口，带着全新的指令预算处理它的任务，只有浓缩后的结果回流给父 agent——于是你可以把很多个上下文窗口缝起来解决同一个问题。
- **适合交给 sub-agent 的任务**：在代码库中定位某个定义或实现；分析代码库找出某类工作的模式；追踪信息在代码库中的流向（例如跨服务边界追一个请求）；以及其他代码、文档、网页研究类任务。这些任务往往问题直白、答案简单，却需要大量你不想留在父 session 里的中间工具调用。
- sub-agent 的返回也要遵循渐进披露：给出答案的同时以 filepath:line 形式或 URL 附上出处，父 agent 不必接触所有原始材料，需要确认时又有线索可循。
- Claude Code 等 coding agent 甚至内置了任务专用的 sub-agent，例如用于代码库探索的 Explore，以及专门执行冗长 bash 命令、把信息提炼回父 agent 而不污染其上下文的 Bash。另一些 coding agent 支持 sub-agent 但不自带定义，需要用户手工配置。
- **sub-agents 也是成本控制手段**：父 session 用昂贵模型（Opus）负责规划与编排这类重思考任务，每个 sub-agent 用更便宜更快的 Sonnet 或 Haiku——它们拿到的任务更小更离散，更低智能、更小指令预算就够了，没必要为一次代码库 grep 烧 Opus 的 token。
- 有些 harness 根本不支持 sub-agents（Codex 直到最近才有，且仍是实验性的）。变通办法是自己写一个 MCP server，提供「用父 agent 给的提示启动一个新 agent session、并把它的最终回复返回给父 agent」的工具。作者给了一个非常粗糙的实现作为参考，同时警告：在本身支持 sub-agent 的 coding agent 上用这个模式，原生 sub-agent 也能通过 MCP 再派发 sub-agent，结果是一场不可预测的「传话游戏」。
- 因此写 sub-agent 的系统提示时必须把角色范围界定得非常清楚：它该做什么、不该做什么；该返回什么信息、以什么形式返回；应该给它哪些工具。另外，很多 harness 有 MCP 工具调用超时，用这个模式可能需要调大超时时间。

![图片为GPT - 5.4的1M上下文现实检查图，展示了在不同上下文窗口范围（tokens）下，大海捞针准确率（MRCR v2, 8 - needle）的变化情况。横轴为上下文窗口范围，从4 - 8K到512K - 1M；纵轴为准确率，从20%到100%。绿色折线代表准确率，数值分别为97.3%、92.4%、95.0%、90.0%、86.0%、78.5%、67.5%、16.6%。橙色折线标注“1M context”，数值为67.5%。该图与上下文提到的“大海捞针准确率随上下文变长从97.3%跌到36.6%，长窗口不等于长记性”相关。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTI2ZTUyZjYyYjU5MWViMzAyNDQ0NTA5MDY3NzNkZWJfMDI3NTAyMDU3MzgyMDNlOWQ1ODg5YmJiNmMzYjU4MzVfSUQ6NzY3MTAwODA2Njc5NTUwNjkxOF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜大海捞针准确率随上下文变长从 97.3% 跌到 36.6%，长窗口不等于长记性* ｜ [原图](https://neican-res.candobear.com/article-images/5354f1caadcc3fb51556ba9e33dd59a73e8bb50aaf42d4dbfb9213a9b356955c.jpg)

## hooks 是用来做控制流的

- Claude Code 有 hooks：在特定事件发生、agent 生命周期的各个节点自动执行的用户自定义命令或脚本。OpenCode 的 plugins 是同类概念，其他 coding agent 可能也有类似配置点（可惜 Codex 没有对应物）。
- hooks 在概念上类似 git hooks，但灵活得多：可以加新功能、集成外部服务、自动化例行动作、修改权限、配置默认行为。
- 各家实现细节不同，但一个 hook 一般能做到：
- 事件发生时静默地自动执行某件事；
- 在工具被调用时运行，并在工具结果之外向 agent 返回额外上下文；
- 在 agent 收尾之前把构建或类型错误抛给它，逼它继续干活直到解决。
- 常见用例：
- 通知——agent 完成或需要人介入（例如审批挂太久）时播放提示音；
- 审批——基于输入值和比默认权限模型更有表达力的规则自动批准或拒绝工具调用，例如自动拒绝任何试图跑数据库迁移的 Bash 调用，并要求 agent 让用户自己跑；
- 集成——完成后发 Slack 消息、创建 GitHub PR、拉起预览环境；
- 验证——如果你的框架和仓库能在几秒内跑完类型检查或构建，就在 agent 每次停下时都跑一遍，把错误暴露给它。
- 作者给出的示例 hook：Claude 停止时运行 biome 格式化和 TypeScript 类型检查，有错误就抛给 Claude，没有就静默退出。脚本里还处理了一个细节——biome 改写文件后即使全部修好也会以退出码 1 结束，所以跑两遍，第二遍无事可做时才返回 0。
- 这个例子的精髓是**成功彻底静默**：成功时什么都不会进 agent 的上下文；失败时只暴露错误，并用退出码 2 告诉 harness 重新唤起 agent，让它先修好再收工。

## back-pressure 提高成功的概率

- 核心洞见：**用 coding agent 成功解决问题的概率，与 agent 验证自己工作的能力强相关**。他们在仓库里花了大量时间建设测试和其他 back-pressure（背压）机制，这仍然是他们投入产出比最高的事情之一。
- 关键限定词是「上下文高效」。这一课他们是硬吃下来的：早期让 agent 每次改动后跑完整测试套件，4000 行通过的测试输出把上下文窗口冲垮，agent 随后就跟丢了真正的任务，并开始对刚读过的测试文件产生幻觉。
- 现在的做法是**吞掉输出、只暴露错误**；构建同理——成功是静默的，只有失败才产生冗长输出。
- 使用这些机制的说明写在 agentfile 里，而且写得**简洁**；一部分甚至打包进 skill，走渐进披露。

## 收尾：什么没用，什么有用

- 一个诚实的警告：你完全可能把时间花在优化 coding agent 配置上，比真正用它交付代码还多——作者说他们就经历过。
- 他们的取向是**偏向交付**：只在 harness 配置确实能让他们更快交付更高质量代码时才投入；agent 失败时就工程化一个解法让它不再那样失败，但**不预先去找问题解决**。
- 没用的做法：
- 在真正遇到失败之前就试图设计出理想的 harness 配置；
- 「以防万一」装几十个 skill 和 MCP server；
- 每次 agent session 结束都跑完整测试套件（5 分钟以上）——应该跑子集；
- 微调哪个 sub-agent 能访问哪些工具，这带来大量工具抖动，结果更差不是更好；何况多数 coding agent 也没有健全的相应配置面。
- 有用的做法：
- 从简单开始，只有当 agent 真的失败时才加配置；
- 设计、测试、迭代——并扔掉没用的东西（作者扔掉的 hooks 比今天在用的多得多）；
- 通过仓库级配置把久经考验的配置分发给整个团队；
- 优化**迭代速度**，而不是「第一次就一把过」的概率；
- 先给 agent 一整套能力（例如 Linear），等摸清真正需要什么之后再仔细裁剪暴露给模型的部分。

## 概念网络

### 关键概念

### harness（agent 的运行时与外设）

**context**：作者把 skills、MCP servers、sub-agents、memory、agentfile 这些「技术上分立」的概念统称为 coding agent 的配置面，并称之为 harness，把它理解成 the agent's runtime，或者 agent 的 peripherals——「模型用什么来与它的环境交互？」

**费曼一下**：模型是发动机，harness 是这辆车的方向盘、油门、仪表盘和后视镜。同一台发动机装进不同的车，能跑出完全不同的成绩。你换不了发动机，但你可以重新装配这辆车。

### harness engineering（harness 工程）

**context**：由 Viv 提出，指「利用这些配置点来定制和改进 coding agent 输出质量与可靠性」的实践。Mitchell Hashimoto 的定义是：每当你发现 agent 犯了一个错，就花时间工程化出一个解法，让它再也不会犯这个错。

**费曼一下**：把「这次 AI 又抽风了」当成一张缺陷单，而不是一次运气事故。修一次，永久生效。它把 agent 可靠性从玄学变成了可以逐条积累的工程资产。

### configuration problem（这不是模型问题，是配置问题）

**context**：几十个项目、几百次 agent session 之后，作者反复得到同一结论：failures 的根因不在模型能力，而在配置；而且因为模型变强后我们会交给它更大更难的问题，它会「继续以出乎意料的方式失败」——非确定性系统的根本属性。

**费曼一下**：等下一代模型，是把自己能控制的部分交给别人。模型每升一级，你也会把任务难度升一级，失败率不会归零，只会换个位置出现。所以真正可优化的，是你这一侧。

### context engineering（上下文工程）

**context**：由 Dex 在 12-factor agents 中提出，是「prompt engineering」的超集，还包含一系列系统性提升 AI agent 可靠性的技术；harness 工程被定位为它的子集，特指通过 harness 配置点精细管理 coding agent 上下文窗口的那部分。

**费曼一下**：提示词工程关心「怎么把这一句话说好」，上下文工程关心「模型此刻的视野里应该有什么、不该有什么」。harness 工程则是用配置手段去执行后者。

### instruction budget（指令预算）

**context**：作者反复强调「每一条无关的工具描述都是 agent 必须处理却毫无收益的指令」；每条 user message 至少是一条指令，通常是好几条；skills 出现之前，他们「还没开工就烧光了指令预算」。

**费曼一下**：模型的注意力像一份有限的预算。你写进上下文的每条规则、每个工具说明都在花钱。花在无关处的每一块钱，都是从真正的任务那里挪走的。

### the dumb zone / the smart zone（笨蛋区与聪明区）

**context**：插入过多 MCP 工具会让上下文窗口被工具描述填满，「把你更快地推进笨蛋区」；而把工作拆给 sub-agents，是他们让主线程留在「聪明区」的办法。

**费曼一下**：同一个模型在窗口干净时聪明，在窗口塞满噪音时变笨。这不是两个模型，是同一个模型的两种状态；你的配置决定它待在哪一侧。

### progressive disclosure（渐进披露）

**context**：skills 的核心价值——「只有当 agent 判断（或你替它判断）需要时，它才拿到那部分指令、知识或工具」；也是 agentfile 的写作原则、Anthropic MCP tool search 的机制，以及 sub-agent 返回结果时附 filepath:line 出处的原则。

**费曼一下**：不要一开始就把整本手册塞给它，而是给一张目录，让它需要哪页翻哪页。信息按需加载，预算才花在刀刃上。

### context firewall（上下文防火墙）

**context**：作者对 sub-agents 最核心的判断——它们「扮演上下文防火墙」，让离散任务在隔离的上下文窗口里跑，中间噪音不会累积到负责编排的父线程里，从而在很多个 session 上维持连贯性。

**费曼一下**：让助手去查资料，你只要他回来说结论，不需要他把翻过的每一页都念给你听。中间过程留在他那边，你的脑子才留得住整件事的全貌。

### context rot（上下文腐烂）

**context**：Chroma 在 18 个模型上的大海捞针实验为「模型在更长上下文下表现更差」提供了实证；作者补充，当问题与相关信息的语义相似度低时衰减更陡，且干扰项效应在长上下文中会叠加。

**费曼一下**：上下文不是越长越好，而是越长越糊。无关内容不只是占地方，它们还会互相干扰，越堆越难被忽略。

### 长上下文的幻觉（更大的窗口只是更大的草堆）

**context**：厂商的扩展上下文版本通常不是指令预算更大的更大模型，而是同一个模型加上 YaRN 一类的数学技巧延长可注意序列；「更大的上下文窗口不会让模型更擅长找针，它只是把草堆堆得更大」。

**费曼一下**：给你一个更大的书包，不代表你更会找东西，只代表你能塞更多找不到的东西。真正的解法不是更大的包，而是分成几个小包分别装。

### sub-agent（子 agent 的上下文封装）

**context**：sub-agent 把一整个 session 的工作封装起来，派发方只看到自己写的提示和最终结果；每个 sub-agent 拿到全新的、小的、高相关的上下文窗口和全新的指令预算，只有浓缩结果回流父 agent，于是可以把很多个上下文窗口缝起来解一个问题。作者明确否定了「前端工程师 / 后端工程师」这类角色分工用法。

**费曼一下**：子 agent 不是给 AI 分配职称，而是给上下文划分房间。每个房间干完活只递出一张纸条，屋里的杂物不进你的办公室。

### agentfile（CLAUDE.md 与 AGENTS.md）

**context**：仓库顶层、会被 harness 确定性注入系统提示的 markdown 文件。ETH Zurich 对 138 个 agentfile 的研究显示：LLM 生成的反而损害性能且多花 20% 以上成本，人工撰写的只提升约 4%，处理这些文件多耗 14–22% 推理 token，代码库总览和目录清单完全无用。作者的自家版本不到 60 行。

**费曼一下**：这是给 agent 的入职须知，不是公司百科。写得越像百科越糟：它每天上班都要重读一遍，读完还没干活就已经累了。

### harness over-fitting（模型对 harness 过拟合）

**context**：前沿模型在自家 harness 上做后训练，因此 Codex 模型与 apply_patch 深度耦合（OpenCode 不得不专门补一个同名工具）；但反面证据同样存在——Terminal Bench 2.0 上 Opus 4.6 在 Claude Code 里排第 33，换到后训练时没见过的 harness 里排第 5。

**费曼一下**：模型和它出生的那副装备磨合得太熟，既可能是优势，也可能是路径依赖。「官方配置最好」是个待验证的假设，不是定律。

### hooks（确定性控制流）

**context**：在 agent 生命周期特定事件上自动执行的用户脚本，可用于通知、审批、集成和验证。作者的示例是 Claude 停止时跑 biome 与类型检查：成功时完全静默、什么都不进上下文，失败时只暴露错误并用退出码 2 让 harness 重新唤起 agent。

**费曼一下**：模型是概率性的，hooks 是确定性的。凡是「必须每次都发生」的事，别写进提示词求它照做，写成脚本让它必然发生。

### back-pressure（背压与自我验证）

**context**：核心命题是「用 coding agent 成功解决问题的概率，与 agent 验证自己工作的能力强相关」。但验证机制必须上下文高效——早期让 agent 每次改完都跑全量测试，4000 行通过输出冲垮上下文，agent 跟丢任务并开始对刚读过的测试文件产生幻觉。现在是吞掉输出、只暴露错误。

**费曼一下**：让 agent 能自己知道对不对，比让它一次写对更重要。但反馈要像体检报告的结论页，不是把所有原始化验单都糊到它脸上。

### 概念网络

![图片为Harness Engineering中概念网络的原文关系图，由Mermaid源码直接渲染。图中以“不是模型问题是配置问题”为起点，催生出harness工程，其包含上下文工程，对harness过拟合有张力。harness即agent运行时，通过配置点管理技能、子agent、hooks等，还涉及MCP server、agentfile、指令预算等。该图直观呈现了harness工程在上下文工程中的作用及内部结构，与上下文对harness工程的介绍相呼应。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTJhNjBlMmZiMWVjMDRhYWZiYmYyYTllNmMyZTM0YTVfOTk5ZmNhNGFhM2RlODc2NGU4ZWQ1NzI1MDMyYmZjYzRfSUQ6NzY3MTAwODA1NDc0Mjg2MzA5MF8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



这张网络的起点是一句判断：**agent 的失败不是模型问题，而是配置问题**。这句话把注意力从「等下一代模型」转移到「今天可以动的东西」，也就是 harness——agent 的运行时与外设。harness 工程因此诞生，并被明确安放在上下文工程的内部：它是上下文工程中专门通过配置点来管理上下文窗口的那一支。

网络的第二层是所有配置点的展开：agentfile、MCP server、skills、sub-agents、hooks、back-pressure。它们表面上各管一摊，但全部指向同一个稀缺资源——**指令预算**。这是整张网络的枢纽概念：工具描述、agentfile 里的条件规则、无关的工具返回都在消耗它；预算一旦超支，模型就从聪明区滑进笨蛋区。ETH Zurich 研究里「自动生成的 agentfile 反而更差且更贵」和作者自己的「挂满 MCP 就变笨」，是同一条因果链在两个配置点上的显影。

第三层是**衰减机制**：上下文腐烂给出了实证解释——上下文越长性能越差，且低语义相似度下衰减更陡、干扰项效应叠加。这与指令预算是互补关系而非重复：预算说的是「你花掉了多少」，腐烂说的是「花掉之后还会互相污染」。两者共同否定了「把窗口做大就行」的直觉——更大的窗口只是更大的草堆。

第四层是**解法结构**，全部围绕同一个动作：减少并隔离上下文。渐进披露让知识按需加载，直接为指令预算省钱，skills 是它的载体；sub-agents 则把这件事做到结构层面，通过上下文防火墙把中间噪音挡在隔离窗口里，正面对冲上下文腐烂——这也是为什么作者说「你以为需要更长的上下文，其实需要更好的上下文隔离」。hooks 从另一个方向补位：它提供模型给不了的确定性，让成功静默、只把错误推回模型，因而天然是背压机制的执行器；而背压能力又直接决定任务成功率，回过头证成整个 harness 工程的价值。

最后是一条**张力边**：模型在自家 harness 上做后训练，可能对它过拟合。这条关系与「定制 harness 有价值」构成真正的对立而非矛盾——Codex 与 apply_patch 的耦合说明原生 harness 有优势，Terminal Bench 上 Opus 4.6 从第 33 到第 5 又说明这种耦合可能只是路径依赖。这条张力正是全文方法论的注脚：不要预设最优配置，让真实失败来告诉你该动哪里。

## 费曼 x3

把失败归因于模型，是这个行业最舒服也最昂贵的习惯。agent 又一次把简单任务做砸了，第一反应总是「等下一代」。但还有一个更冷静的解释：模型在你给它的那副环境里，本来就只能做到这么多。非确定性系统永远会以意料之外的方式失败——模型变聪明，我们就交给它更大更难的问题，失败只是换了个形状出现。等待，是把唯一能控制的部分让渡出去。

真正可控的从来不是模型，而是模型周围那一圈东西：系统提示、工具、上下文、子 agent、hooks、验证机制。它们在技术上是分立的概念，实际上同属一个配置面，也就是 agent 的运行时。把这圈东西当成可工程化的对象，才有可能把「祈祷」换成「迭代」：每当发现 agent 犯了一个错，就花时间工程化出一个解法，让它再也不会犯这个错。

这门工程真正的稀缺资源不是算力，是指令预算。每一条工具描述、每一条规则、每一次无关的 grep 结果，都是模型必须处理却毫无收益的指令；塞得越多，它越早从聪明区掉进笨蛋区。很多反直觉的结论由此都能解释：自动生成的仓库说明文件不但没用，还多花两成成本；工具挂满之后，用户还没开口，窗口就已经被工具描述占满；把四千行通过的测试日志灌回去，agent 会跟丢任务，开始对刚读过的文件产生幻觉。更大的上下文窗口也救不了——它不会让模型更擅长找针，只是把草堆堆得更大。

于是所有有效的配置点其实都在做同一件事：让进入视野的东西更少、更相关。知识按需加载，而不是一次塞完；子 agent 充当上下文防火墙，几十次中间调用留在隔离窗口里，只有浓缩过的结论回到主线程；hooks 让成功彻底沉默，只把错误推到模型面前；背压机制让 agent 能验证自己——你解决问题的概率，与它检查自己工作的能力强相关。

但这件事也有它的陷阱：你完全可能花在调配置上的时间，比真正交付代码还多。有效的做法是等失败真的发生了再加一层，而不是预先设计一副理想装备；是优化迭代速度，而不是「一次就中」的概率。下次 agent 让你失望，先别急着换模型，去看看你给它的那副 harness。模型大概率没问题。

HOWIE 原清单 · 05

# Lilian Weng：把 harness 工程接到「递归自我改进」这条老线索上

**内容说明：**从 I.J. Good 与 Yudkowsky 的递归自我改进谈起，论证现代模型的自我改进更可能发生在 harness 层而不是权重层。本期理论纵深最足的一篇。

**策展人按：**往上接了一条更老的线索。如果这个判断成立，harness 就不只是工程问题了，整份清单的野心在这条最大。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：Harness Engineering for Self-Improvement
- 作者：lilianweng.github.io
- 内参日期：2026-07-31
- 来源类型：blog
- 原文：https://lilianweng.github.io/posts/2026-07-04-harness/
- 标签：harness engineering, AGI

从 I.J. Good 与 Yudkowsky 的递归自我改进谈起，论证现代模型的自我改进更可能发生在 harness 层而不是权重层。本期理论纵深最足的一篇。

## 导读

harness engineering 专题

## 核心观点

- 这篇文章做的是一次接线：把 2026 年最热的 harness 工程，接到 1965 年 I. J. Good 的「ultraintelligent machine」和 2008 年 Yudkowsky 的「递归自我改进」（RSI）这条老线索上。Good 定义的超智能机器能在一切智力活动上超过人类并设计出更好的机器；Yudkowsky 把它收窄成一个具体反馈回路：AI 用当下的智能去改进那套产生它智能的认知机器。
- 现代 AI 里这个回路不一定意味着模型直接改写自己的权重，更广义的形态是模型改进**训练流水线**和**部署系统**，从而让下一代模型在有经济价值的任务上表现更好。作者特意点名「部署系统」：介于原始模型与真实世界之间的那一层，其重要性看起来不亚于模型的原始智能（即预训练刚结束时的 evals）。
- **harness 的定义**：环绕基础模型的那套系统，编排执行，并决定模型如何思考与规划、如何调用工具与行动、如何感知与管理 context、如何存储 artifacts、如何评估结果。Claude Code、Codex 这类成功的 coding agent 产品，证明了这一层的价值。
- 相比 2023 年的老公式「agent = LLM + memory + tools + planning + action」，harness 工程额外包含 **workflow 设计（如 loop engineering）、评估、权限控制、持久状态管理**。它不再是 prompt 模板，而更接近运行时与软件系统设计。作者给了一个贯穿全文的类比：harness 之于模型，像操作系统——把复杂逻辑封装起来，同时保持接口简单。
- 全文的主轴是一条**优化对象的阶梯**：instruction prompts → structured context → workflow → harness code → optimizer code。模型越强，就越能往阶梯上端、更复杂也更通用的目标走。
- 全文的转折点是一句判断：**代码是通用语言**。harness 说到底就是一段程序，规定 prompt、工具调用、子 agent、控制流、记忆和工作流逻辑如何协同。一旦 harness 设计变成可执行的搜索空间，强 coding agent 就能进入人类工程师使用的同一片设计空间，而且它能访问的空间远大于手写 prompt。
- 全文最重要的一条负面结果来自 STOP：同一套递归改进，在 GPT-4 上让下游平均表现随迭代上升，在 GPT-3.5 和 Mixtral 这类更弱模型上反而退化。**递归结构本身不够，基座模型必须强到足以改进机制**——harness 改进的是部署，智能仍是核心。
- 作者对近期路径的预测是双向的：harness 工程会朝**元方法论**方向演化（改进「拿到好答案的机器」而不只是答案本身），harness 系统自身成为优化目标，启发式规则更少、通用机制更多；反过来，成熟的 harness 支撑起自动研究的自我改进回路，而更聪明的模型能防止 harness 过度工程化。

## harness 的三个设计模式

- **Pattern 1：工作流自动化。** 定义一个模型可以在其中操作、测试、迭代的工作流，是自动化的关键设计。Karpathy 的 autoresearch 仓库是个干净的例子。常见工作流是一个目标导向循环：plan → execute → observe/test → improve → execute，**直到目标达成**；过程中可能主动向用户发起澄清请求，确认任务规格或执行偏好。
- 工作流图还强调模型要分析自己的轨迹和失败案例，然后通过一个「agent runtime」而非静态 prompt 模板来迭代自己的进展。
- **Pattern 2：文件系统即持久记忆。** 长时程 agent 系统里反复出现的模式，是用简单的控制方式管理丰富的状态和 artifacts。harness 不该把整条工作流和全部日志都扛在 context 里，而应该把耐久状态放进文件。长时程 rollout 中，实验日志、代码 diff、论文摘要、错误 trace、历史轨迹，长度常常远超模型训练时见过的 context 窗口。
- 学会用 bash 之类命令读、写、编辑文件系统，是 LLM 的一项基础技能；把持久记忆管理成「文件」这种朴素形态，天然能吃到核心模型能力提升的红利。
- **Pattern 3：子 agent 与后台作业。** harness 可以派生多个 subagent 并行执行、监控后台作业，适合主 agent 需要搜索多个假设、并发跑实验、或把孤立子任务外包出去而不污染主 context 的场景。父 agent 因此需要一个小型进程管理器：启动作业、检查日志、取消失败运行、把结果合并回主线程。
- 这里的关键设计选择是**让并行显式且可检查**。如果 subagent 的输出只活在临时对话 context 里，它们很快变得过时且不可见；如果它们被存成文件、日志和状态记录，模型就能在中断后恢复，并对自己的执行历史进行推理。

## 案例：coding agent harness 的稳定接口

![图片展示了主流coding agent的稳定循环流程。从“Observe repo”开始，依次经历“Plan”“Search/read files”“Edit/write patches”“Run tests”“Inspect errors”等步骤，最后到达“Done”。循环中，“Inspect errors”步骤被红色突出显示。该图与上下文紧密相关，直观呈现了文档中提到的Claude Code、Codex、OpenCode和Cursor式agent等主流coding agent在给定仓库里开发和调试时，共用同一套循环的稳定接口流程。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzY0YWFhMmU5NDVjZGZjNGUwYzU0Y2E3ZDM4MzY3NDJfMjlhMDRlZTZlZWNjZmFiMGVmZWI0NjliMjQ2YzYyMmVfSUQ6NzY3MTAwODA1NTU1NDc4ODY0M18xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜主流 coding agent 的稳定循环：观察仓库、计划、读写文件、改补丁、跑测试、看错误再重来* ｜ [原图](https://neican-res.candobear.com/article-images/f4efb3c97ce86af55c25a875ee87192fdb349939473d4ec1a300afc4827a31e0.png)

- Claude Code、Codex、OpenCode 和 Cursor 式 agent 的核心接口已经趋于稳定，共用同一套循环；配上一组工具后，coding agent 就能在给定仓库里开发和调试，就像人类开发者配上 IDE。
- 作者给出的工具分组（声明为演示而非穷举）：
- 文件系统：文件发现 glob、grep、ls；文件读取 read、read_many；文件修改 write（整个新文件）、edit（字符串精确匹配替换）、multi_edit、apply_patch（应用结构化补丁）
- Shell 执行：bash、PowerShell
- IO：lsp，以及 git_status、git_diff、git_commit 等 git 工具
- 外部 context：MCP 工具、Skills
- 网页搜索：web_search、web_fetch、浏览器工具
- Artifacts：读文档与图片，生成 HTML、图片
- 后台进程：如 CronCreate、CronDelete、CronList
- Agent 委派：如 spawn_agent、resume_agent、wait_agent、list_agents、close_agent、interrupt_agent

## harness 层与核心智能的关系

- 很难预测未来的 RSI 会多大程度依赖 harness 工程，但作者判断近期路径不太可能以「模型直接改写权重」开场。
- 设计原则上，harness 应当**刻意保持简单与通用**以获得泛化能力，并尽量参照既有软件工程实践，从而吃到预训练知识的红利；配置、工具接口和其他协议也可能逐渐在行业内标准化。
- 最终，许多 harness 改进可能被**内化**进模型的核心行为，但与外部 context 和工具的接口会保留下来。作者用 prompt engineering 做类比：随着指令微调和模型推理变强，手工 prompt 技巧的中心地位下降了，但**指定目标、约束、context 和评估方式的需求并没有消失**。

## context engineering：把上下文变成可演化的资产

- 把工具响应和模型生成一股脑追加进 context，会随着 agent 任务时程拉长而迅速失控。context 管理是为 LLM 构造更结构化、更精炼的 context 并管理持久状态的一层。长 context 研究会继续进步，但当下长 context 智能与 context 工程仍然彼此交织。

![图片展示了Agentic Context Engineering（ACE）框架。左侧是Context Playbook和Query，通过LLM Generator生成轨迹，再经LLM Reflector提炼洞见，形成Insights，由LLM Curator策展。Insights与Delta Context Items共同更新Context Playbook，形成迭代优化循环。图片与上下文紧密相关，直观呈现了ACE框架中各环节及数据流动，帮助理解上下文演化的迭代机制。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDAxMDkwMjlkZGEzYmM1YjUxZDMyMzVjYzQxNGNiM2JfNmZjYjg5NWFmNTY2NDMxNmMzMWRkYzZmMTZkYWI2YTVfSUQ6NzY3MTAwODA1NjI5NzE0NzYxN18xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜ACE 框架：生成器产出轨迹、反思器提炼洞见、策展器把增量条目并回 playbook* ｜ [原图](https://neican-res.candobear.com/article-images/0fbdfaa639c75b6898fd98547efd8170e5e928bd06a6815af0feb9cb71cdb4d0.png)

- **Agentic Context Engineering（ACE, Zhang et al. 2025）** 把 context 当作一本不断演化的 playbook，而不是一条越来越长的 prompt。它用三个组件维护一本 bullet 形式的 context playbook，每条 bullet 带标识符和描述：
- Generator：参照 bullet 条目产出任务轨迹
- Reflector：从成功与失败轨迹中提炼洞见
- Curator：以增量、逐条的方式更新结构化 context
- ACE 的关键设计是防止迭代重写过程中的 **context collapse 与 brevity bias**：curator 不重写整块 prompt，而是输出一组结构化的（标识符，描述）条目，用确定性逻辑合并进结构化 context 日志，并定期精化与去重。

![图片展示了MCE（Meta Context Engineering）的双层结构。左侧为工作目录，包含多个迭代，每个迭代有工具、上下文、数据和rollouts。中间是双层结构，元层为技能进化，包含技能数据库、技能概述、任务规格等；基层为上下文优化，有任务规格、新技能、上下文函数等。右侧是MCE的训练与评估流程，包含工具集、评估反馈、训练数据、验证数据等环节。该图与上下文内容紧密相关，直观呈现了MCE的工作原理和流程。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGQzMzU0OThjNzkyMWE2ZjVmYmNhNjQ4YzI5NWE4MDNfM2Y1OWEyZDEzNzUwOGNlZDE3ZjA1YWFhNzJlNjNhM2NfSUQ6NzY3MTAwODA1ODE3MzYzOTk4Ml8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜MCE 的双层结构：元层演化 skill，基层优化 context，工作目录按迭代存文件* ｜ [原图](https://neican-res.candobear.com/article-images/b029e8a00415e024ca5ea9fcfe9bb6663c9b0b93860a70a4bfcf356c66dc2a63.png)

- ACE 从 rollout 中学洞见，已经推动我们走向自管理记忆，但它的更新规则和整体工作流仍是手工设计的。**Meta Context Engineering（MCE, Ye et al. 2026）** 进一步把**机制**（如何管理 context）与**产物内容**（context 里有什么）分开：元层跑 skill 演化，基层跑 context 优化。
- 双层优化：内层在训练数据上寻找给定 skill 下的最佳 context，外层寻找在验证集上表现最好的 skill
- skill 数据库记录历史 skill、context 函数与评测指标；元层 agent 对既有 skill 做 agentic crossover 生成新 skill
- 实现上，一个 context 函数被实例化为某个专属目录里的一组文件，同时含静态部分（skill.md）与动态部分（context 与数据 rollout）；元层与基层的优化都在带标准工具集的 agentic coding 环境里执行
- MCE 不像 ACE 那样强加「context 该怎么组织」的启发式规则，而是用**自由形式的 skill** 存储任务最重要的知识，并让 skill 与 skill 条件下的 context 一起迭代演化。
- **Meta-Harness（Lee et al. 2026）** 再深一层：被优化的对象是那段**决定并优化「什么信息该被存储、检索、呈现给模型」的代码**。名字里的「Meta-」意思是它是一个用来优化 harness 的 harness。
- 提出新 harness 的 proposer 本身就是一个 coding agent，最终输出是一组位于帕累托前沿的 harness 候选
- 整个执行历史通过文件系统可访问，coding agent 用 grep、cat 之类命令去读，而不是把一切铲进单个 prompt
- 被提出的 harness 是文件系统里的一个字典，包含自己的源码、分数、rollout 轨迹和状态更新；循环迭代地创造新 harness，只保留合格的

![图片展示了Harness Optimizer搜索进展（左图）和TerminalBench-2 Harness性能（右图）的相关数据。左图中，Meta-Harness曲线最高，表明其性能最佳；右图对比了Meta-Harness（红色）与人类编写（蓝色）的性能，Meta-Harness在TerminalBench-2上的通过率（Pass Rate）为37.6%，高于其他模型。这些数据支持上下文提到的“一旦harness设计变成可执行的搜索空间，强coding agent就能利用人类工程师使用的同一片设计空间”的观点，展示了模型优化harness的成果。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDBlZWUyMjYyMzk4ZGQ3ZDNlYWZmOGEzNWFhNTRjYTRfNzU1ZWJkOTVlNjNjMDA1ZWFkNDIwYTVhOTlkYWIyMzRfSUQ6NzY3MTAwODA1NzQxNzAyNjc2M18xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜Meta-Harness 通过率 37.6，高于全部人工 harness* ｜ [原图](https://neican-res.candobear.com/article-images/11c0d4cf8735a06d68052688ef2e198c16fd5ee7734a4eaea00584c5b46fc702.png)

- 这里的重要教训很清楚：**一旦 harness 设计变成可执行的搜索空间，强 coding agent 就能利用人类工程师使用的同一片设计空间**。

## workflow design：手工流水线与自动搜索

![图片展示了Lilian Weng在Harness工程中AI内参主题的构思、实验、写稿三段工作流程。左侧为构思阶段，包括LLM想法提案、新颖性检查、评分和归档；中间是实验阶段，有初步调查、超参数调优、研究执行、消融研究等环节，各环节后有“写入日志”和“最佳选择”标识；右侧为写稿阶段，包含作图和反馈、论文模板、论文、论文AI评审等步骤。该图直观呈现了AI内参主题从构思到写稿的全流程。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDdmNDU2MmM4NzM3ODg1MzExNmUyOTFmMjhiYTgxMTdfMjk2YmZmNWU2NjkyY2RkNDY2NDBiOTU5OGRlMzQ5ZGZfSUQ6NzY3MTAwODA1ODYwODIwOTA5NF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜AI Scientist 流水线：构思、实验、写稿三段，每步写日志并挑最优分支* ｜ [原图](https://neican-res.candobear.com/article-images/b0d204e24a6c0326a6f09356ccd383a8be6905a2b42cd694ca124848e6519695.png)

- harness 里的工作流设计可以由领域专家手工打造。以自动研究为例，**AI Scientist（Lu et al. 2026）** 搭起一条流水线：提研究想法、写代码、跑实验、分析结果、写稿、做同行评审。
- **ScientistOne（Meng et al. 2026）** 把**可验证性**当作中心设计约束：每一条主张（引用、数值、方法、结论）都必须追溯到证据来源，并由 Chain-of-Evidence 检查审计。

![图片展示了Autodata的架构。主Agent接收grounding data和Challenger LLM的prompt，生成training data。Strong Solver、Weak Solver和Verifier/Judge分别向Main Agent提供example，Verifier/Judge还与Main Agent交互。Main Agent与Challenger LLM之间有prompt和example的双向箭头。该图与文档中介绍的Autodata角色图相呼应，直观呈现了其数据生成与评测流程。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDFhYjQ3ZDg0MTQzNTIxNGExOTY1Y2MxY2Q0NDY2NmVfM2Y4NGIyYTIyMWE3M2M1M2FhMzM1ZTU4MDk3MDkzNWRfSUQ6NzY3MTAwODA1NDkwNDczNjk1M18xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜Autodata 角色图：主 agent 调度出题者、强弱两个解题者和裁判来合成数据* ｜ [原图](https://neican-res.candobear.com/article-images/dc949203f206858744d3b35621984d3a8953a08d3eff8513d0372957daae8391.png)

- **Autodata（Kulikov et al. 2026）** 被设计成一个生成训练与评测数据的数据科学家。主 agent 管理一个 challenger（出题）、一个 weak solver、一个 strong solver 和一个 verifier/judge，目标是合成「难度刚刚好」的数据——强解题者能做对、弱解题者会做错。
- Autodata 里 challenger 的 prompt 会根据 solver 和 verifier 的反馈迭代更新。作者点出其局限：合成任务只用来微调弱 solver 而非强 solver；如果循环无法迭代改进强模型，它更像是在生成的 prompt 分布上做间接蒸馏，RSI 的味道就淡了。
- 工作流的设计空间**极其庞大**，所以自然可以把工作流设计当成搜索问题，用算法而不只是手工去找好解。

![图片展示了Harness工程中AI内参主题的流程。上方“Next interesting agent”处有“Refine until novel and error - free”循环箭头。右侧“New Agent”框内有“Summary and motivation”等内容。下方“Agent Archive”框内有“Test performance on tasks and add to archive”箭头。底部“Examples of Discovered Agents”部分展示了三种发现的代理，包括“Multi - step Peer Review Agent”“Verified Multimodal Agent”“Divide and Conquer Agent”，分别对应不同的任务处理方式。该图与上下文介绍的Harness工程中AI内参主题相关，呈现了其工作流程。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGI3MzBiYWRiYjU5NTllMTFlZjI1ZjRkYmU2ZjZkMTVfYzdjYTdiNTk0ZjNkMjZhZTY1ZDZhNGZmYTZmZjU4NTFfSUQ6NzY3MTAwODA1NTk1MzMxMjcyMF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜ADAS 元 agent 写出新 agent 代码，评测合格才回存档案库* ｜ [原图](https://neican-res.candobear.com/article-images/dc5a10cecf66c578612dc964e9af17764dadf14cd3ccb3c7b299e0962bd16dac.png)

- **Automated Design of Agentic Systems（ADAS, Hu et al. 2025）** 把 agent 设计本身表述成优化问题，即「meta-agent search」，由元 agent 提出新的 agentic 工作流设计：
- 用 CoT、self-refine 这类简单 agent 初始化一个工作流档案库
- 让元 agent 参照档案库里的既有方案，全用代码编写新 agent：先生成新工作流的高层描述，再实现成代码
- 草稿程序再经元 agent 两轮 self-refine（先让模型给反馈，再让同一模型据此改进输出；Madaan et al. 2023）以检查其新颖性
- 评测每个新候选，把成功的加回档案库，重复直到达到最大迭代次数
- **AFlow（Zhang et al. 2025）** 把 agentic 工作流表示成一张图：节点是调用 LLM 的动作，边用代码实现逻辑操作；工作流优化依赖 MCTS（蒙特卡洛树搜索）——用分数与均匀探索的软混合选择节点，让 LLM 基于评测表现产出改造后的工作流并展开，再执行与评测。在 QA、代码和数学任务上，AFlow 相对人工设计的工作流和 ADAS 都有可观改进。

## self-improving harness：STOP 与 Self-Harness

- context 工程也好、workflow 设计也好，都只是 harness 的一部分。真正需要的是在整个设计空间里搜索，把 context 管理逻辑、workflow、权限等诸多组件一起优化。**代码是通用语言**：如果 LLM 能优化那段执行 agent 的代码，它能触及的设计空间远大于手写 prompt。
- **Self-Taught Optimizer（STOP, Zelikman et al. 2023）** 是递归式脚手架改进的早期例子。种子改进器接收初始解、效用函数和一个黑箱语言模型，返回改进后的解；STOP 的目标不是直接改进解，而是**改进改进器本身**。由于「改进改进器」本身也是优化问题，可以按 meta-utility 衡量的表现递归地得到新版本。
- 实验中，改进后的改进器发现了各种策略：遗传算法、分解并改进局部、多臂 prompt 老虎机、模拟退火、变化温度、beam search / tree search——这正类比于「把 harness 工作流当成可优化对象」。
- 最值得记住的是那条**告诫式结果**：STOP 在 GPT-4 上让下游平均表现随迭代提升，在 GPT-3.5 和 Mixtral 这类更弱模型上反而退化。递归结构本身不够，基座模型必须**足够有能力**去改进机制。这说明 harness 改进带来的是更好的模型部署，但智能仍是核心。

![图片展示了Self-Harness的三阶段流程。首先，通过运行h_i任务收集执行轨迹，挖掘弱点，得到缺失验证、无限执行、工具调用错误等失败模式。接着，基于这些失败模式，当前Harness h_i提出候选Harness编辑，进行验证、循环中断模型更新、工具和策略更新。最后，通过回归测试决定是否接受，若接受则更新Harness，若否则返回上一步。该图与上下文紧密相关，直观呈现了Self-Harness的工作流程。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2UzYTIzNTQzMGJjMTM3N2IwM2E3NDNjMWMxODRmZWRfNGFmNzBlM2I0OGUxM2Y1MTUzNGM2ZTY1YWVkZDk1NzFfSUQ6NzY3MTAwODA1NjMzNDkyOTA3Nl8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜Self-Harness 的三阶段：挖弱点、提有界改动、回归验证通过才合入新 harness* ｜ [原图](https://neican-res.candobear.com/article-images/895bd4a7cd9b6b9db2c7a1b10dede177b8b4912afb8c458d163e066d8b9fdd45.png)

- **Self-Harness（Zhang et al. 2026）** 让 LLM agent 通过 propose-evaluate-accept 循环改进自己的 harness，分三阶段：
- 弱点挖掘：把失败聚类成有 verifier 依据的失败模式。注意两次运行可能在错误日志表面共享同一个 verifier 结果（如超时、缺 artifact），因果机制却完全不同；所以需要信息丰富的失败记录，含终端 verifier 级原因、相关 agent 行为的因果状态，以及 trace 暴露出的抽象 agent 机制，才能挖出根因
- harness 提案：基于挖出的失败模式提出**有界**的 harness 改动。模型拿到的是一份有界提案 context：当前 harness 的可编辑面、有 verifier 依据的失败模式、应当保留的通过行为记录、以往尝试过的改动摘要。改动应偏好可处理的、能用窄改动解决的复现性错误模式，且候选之间要有区分度和多样性
- 提案验证：候选改动在 held-in（测试弱点是否解决）与 held-out（检查是否引入新问题）两个划分上跑回归测试，**两边都无退化才被接受**；接受的合并进新 harness，被拒的只记日志、不动现役 harness
- 在 Terminal-Bench-2 上跑 MiniMax M2.5、Qwen3.5-35B-A3B 和 GLM-5 时，Self-Harness 学到了**针对不同基座模型不同弱点的模型专属 harness 指令**，并提升了 held-out 通过率。
- 作者对这类工作提出了担忧：如果一个程序被允许编辑操作系统本身，抽象边界就被打破了。**可编辑面必须被妥善设计，权限控制与安全层必须活在这个循环之外**；奖励攻击的全部挑战依然存在。

## 进化式搜索：从 prompt 进化到 harness 仓库进化

- 进化式搜索是受自然选择启发的优化方法：让一群解变异，只保留高「适应度」的个体。它适合两种情形——搜索空间极大或形状古怪；难以用梯度直接优化但容易评估解。harness 搜索看起来正好合适。
- 进化式搜索在 prompt 工程里已有先例：**Promptbreeder（Fernando et al. 2023）** 用一组丰富的变异操作优化任务 prompt，有趣的是变异 prompt 本身也在进化；**GEPA（Agrawal et al. 2025）** 把基于反思的 prompting 与进化搜索结合，用对试错轨迹的自然语言反思来提出 prompt 更新。

![图片展示了AlphaEvolve架构，由科学家/工程师提供提示模板和配置、现有或自定义LLM选择、评测代码及初始程序等输入，通过Prompt sampler、LLMs ensemble、Evaluators pool和Program database等组件，结合分布式控制器循环，生成改进diff，评测后将好程序存回数据库，最终输出最佳程序。该图与上下文紧密相关，直观呈现了AlphaEvolve系统的工作流程。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWJkMGU5MGIzMDUxMTkzMGViZDU3NDM0ZTNkNzhiNjJfYWIyOWNiNWVmNWEyNDEzMDJhZDM1ZTEzNTJlZGJhNzBfSUQ6NzY3MTAwODA1NDQ0MzI5Nzk3MV8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜AlphaEvolve 架构：采样父程序、让 LLM 生成 diff、评测后把好程序存回数据库* ｜ [原图](https://neican-res.candobear.com/article-images/9aff606707805732b0a8d1d9cc610f7d1608604c9dd76687b5cd5d2ebacc380e.png)

- **AlphaEvolve（Novikov et al. 2025）** 是一个 coding-agent 式的进化搜索系统：存一池候选程序，提示冻结的 LLM 生成改进 diff，反复评测子程序并保留成功者，随时间发现更好的解。几个设计细节重要：
- prompt 中包含父程序、结果、指令，有时还有元信息
- coding agent 能访问整个仓库，但待改进的代码区域用 EVOLVE-BLOCK-START 和 EVOLVE-BLOCK-END 显式标记
- 元 prompt 与指令、context 共同进化，方式与进化解程序如出一辙

![图片展示了AlphaEvolve消融实验结果。左侧是矩阵乘法张量分解实验，右侧是接吻数问题实验，均以目标指标（aggregated）为纵轴，计算预算占比（fraction of compute budget）为横轴。图中用不同颜色线条表示不同实验条件，如“Full method”为完整方法，“No meta prompt evolution”为无元提示进化等。各实验条件下，指标随计算预算占比变化，部分条件下的指标表现更优。该图与上下文讨论的AlphaEvolve实验设计相关，直观呈现了不同条件下的实验结果。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTUyMGI3ZDU0NTdjNGNkNzYwYzU1ODNjOGVjZGU0MDRfMWFmNzlmM2RjMDUxNWVmMjEzZGIzNzg0OTUzZTlmYTdfSUQ6NzY3MTAwODA1NTA5MzQzMTU4OF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜AlphaEvolve 消融：去掉进化或 context，同等算力下指标更差* ｜ [原图](https://neican-res.candobear.com/article-images/ad59c8ccfbcca45e7fa7c9636d54902ee3f13128b5aa76daca73a6955f66dcda.png)

- 消融实验显示了进化流程、prompt 中的 context、元 prompt、整文件进化以及使用更强 LLM 各自的价值。
- 后续变体：**ThetaEvolve（Wang et al. 2025）** 把进化搜索与 RL、上下文学习结合；**ShinkaEvolve（Lange et al. 2025）** 引入三个组件提升 LLM 采样效率——父代采样兼顾表现排名与子代数量以更高效探索；基于 embedding 余弦相似度做代码新颖性拒绝采样，丢掉与现有种群过于相似的候选；用 meta-scratchpad 记录成功解中的好模式来指导未来变异。
- **Darwin Gödel Machine（DGM, Zhang et al. 2025）** 与上述聚焦「改进解」的方法不同，它显式瞄准**可编辑 harness 代码仓库的进化**：这个 coding agent 被允许修改自己的 harness。后续的 Hyperagents（Zhang et al. 2026）引入元 agent 来控制如何修改既有任务 agent 以创造新 agent。
- 从池中一个 coding agent 起步；每轮按「与表现成正比、与子代数量成反比」的概率挑一个父代，改造并分叉出新 agent
- 被选中的父 agent 检查自己的基准评测日志，然后对自己的 harness 代码库提出改进，生成新版本的 coding agent；代码编辑只用两个基本工具：bash 与 editor（view/create/edit）
- 新 coding agent 被评测，只有表现足够高的才加回池中，重复直到触发停止条件
- DGM 是**固定模型下的 harness 进化**。以 Claude 3.5 Sonnet 为基座、初始 harness 配置很简单的实验里，DGM 发现的 agent 在 SWE-bench Verified 上从 20% 提到 50%、在 Polyglot 上从 14.2% 提到 30.7%，与手工设计的 agent 相当或更优。
- 这一族方法在**候选解可自动评测、适应度易量化**的领域效果好，如矩阵乘法、GPU kernel 优化、算法竞赛、数据中心调度；在评估缓慢、模糊或主要靠启发式的领域则吃力。进化的算力效率与有效性同样是隐忧。

## 与模型权重的联合优化：SIA

![图片展示了SIA的两个杠杆及交替推进指标的示例。左侧（a）图中，反馈代理（Feedback-Agent）对harness（scaffold）和权重（LoRA）进行更新，harness包含prompt、tools等，权重是基于基LLM的低秩适配器，由RL更新。右侧（b）图是交错步骤序列示例，展示了harness和权重交替推进的步骤，如A1、A2等，以及对应的指标变化曲线，体现了harness进化与模型权重优化的交替推进机制。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YThlMDlkNGU4YzdkNGZkODQyZTg2MDhlYzE0MzJlOTRfZmU5YWM0NTJmZjMwZGIwMTg0ZjI4ZWM0NWJiMTY0YjRfSUQ6NzY3MTAwODA1NjA5MTY1OTIwNF8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜SIA 的两个杠杆：反馈 agent 每步选择改 harness 还是更新权重，交替推进指标* ｜ [原图](https://neican-res.candobear.com/article-images/86fbe9555a0bf6f3c772683cd3733ffdcd65fd3cd325a0ed0e473099268cd074.png)

- harness 进化改变的是模型周围的非参数系统。要实现完整的自我改进，完全可以让模型同时更新自己的权重——权重更新可以通过改进训练流水线，或在测试时做持续学习来实现。
- **SIA（Hebbar et al. 2026）** 是把 harness 改进与模型参数更新放进同一个优化循环的早期尝试，三个组件：Meta-Agent 提出初始 harness；Task-Specific Agent 执行任务；Feedback-Agent 根据近期轨迹决定这一步是更新 harness 还是更新权重。
- 作者对证据本身持保留态度：SIA 的实验有若干混淆选择使结果难以解读，例如任务 agent 比 Meta-Agent 和 Feedback-Agent 用的模型弱得多（gpt-oss-120b 对 Claude Sonnet 4.6），基线也太弱、无法与相关方法干净互参。方向有趣，但证据是暂定的；训练稳定性、Goodhart 效应等挑战仍然开放。

## 未来挑战：先看研究 agent 的六种失败

- AI Scientist 这条线证明了专家设计的 harness 能协调自动研究回路的很大一部分（以写论文为实验形态）。但**论文生产不等于科学发现**：一个系统可以写出貌似合理的手稿，同时带着捏造的引用、实现漂移或弱实验结果。
- Trehan & Chopra（2026）测试了 LLM 能否在最小脚手架与基础工具（read_file、write_file、llm_search、list_files）下从研究想法走到论文。每个想法有专属工作区，agent 可生成并读取文档作为 context；三个领域（world models、多智能体 RL、AI 安全与对齐）各含 45–50 篇高质量种子文献。人类专家只挑了四个想法进入完整流程，**最终只有一个被完整执行成论文**。他们观察到六种反复出现的失败模式：
- 偏向训练数据的默认值：用旧库、过时命令、标准格式，或做出并非基于实际仓库/数据集的假设
- 执行压力下的实现漂移：当实现变得技术复杂，模型可能转向一个常见的更简单解法，而不是所提出的方法
- 记忆与 context 退化：长时程项目会丢失关键细节，除非日志被写成持久 artifact
- 过度乐观：实验噪声大甚至失败，模型仍宣布成功；与 Bubeck et al. (2025) 观察到的「p-hacking and eureka-ing」同类，模型会打上「数值胶带」并在信号仍是噪声时宣布胜利
- 领域智能不足：缺少默会的手艺知识，比如预判实现复杂度、判断实验结果是否合理、知道哪些基线才重要
- 科学品味薄弱：实验可以跑通，却回答不了对的问题

## 迈向完整 RSI 的七个瓶颈

- **1. 弱而模糊的评估器。** 许多研究主张没有快速精确的 verifier，很多现实任务也一样。当前的自我改进回路，在评估指标可测量、客观的任务上效果最好（与 RL 起效的条件类似）。研究品味、新颖性、长期科学价值都难以度量——研究品味本身混合了问题构造、实验设计，以及「哪些反常结果值得追、哪些失败值得重试」的判断。
- **2. context 与记忆的生命周期。** 随着 agent 更自主，记忆会不断增长。好的 harness 需要管理 context 与记忆，弥补长文本生成的现有局限，同时最大化长时程任务的成功率。作者由「人类能维持终生记忆」做类比，判断 **context engineering 将会也应该成为智能的核心组成部分，而不是停留在软件系统层**。
- **3. 负结果。** 研究者被激励去发表成功结果，文献因此偏向成功。在这种成败失衡的数据上训练出的 LLM，可能不擅长判断何时该放弃某个假设、报告负结果甚至承认失败。研究型 harness 应当让失败尝试易于保存——**从失败中学习是收缩任务搜索空间的最佳方式**。
- **4. 多样性坍塌。** 进化与 RL 回路倾向于压榨已知的高回报模式，需要机制防止种群坍缩成同一个解的变体。这对开放式研究尤其关键，因为最好的路径在当前评估器下最初可能显得更差。
- **5. 奖励攻击。** 自我改进回路优化的是你给它的任何信号：奖励来自单元测试，agent 可能对测试过拟合；来自裁判模型，就学会针对该裁判的攻击技巧；来自基准分数，就利用基准的伪影。
- **6. 长期成功。** 以 coding agent 为例，它已经提升了软件工程的日常生产力，但许多优化目标仍然太短期。它常能完成手头任务，却不清楚该如何保护一个由成百上千工程师共同维护的仓库的长期健康。标准的沙箱式 RLVR 训练很少捕捉可维护性、所有权边界、迁移成本、向后兼容或未来的调试负担。
- **7. 人的角色。** 人应当**在栈上往上移动，而不是被移出回路**——在正确的时机、正确的抽象层级提供监督，系统设计要考虑何时以及如何设置这些触点。
- 与之配套的结构性主张：**评估器与权限控制大概率应当坐在演化 harness 的循环之外**，配合 held-out 测试、trace 审计，以及在真正重要的决策点上的人类评审；监督能被放大和自动化到什么程度，仍是开放的研究领域。
- 作者的收尾立场很直接：上面列出的许多挑战都需要人的反馈与引导——**我们是在为人类更好的未来造这项技术，而不是反过来**。

## 附录：文中值得记住的基准

- PaperBench：从零复现 20 篇 ICML 2024 Spotlight/Oral 论文，含理解贡献、开发代码库、成功跑实验；每个复现任务被拆成可单独评分的小任务，共 8,316 条 rubric，与论文作者共同开发。当时最好的模型（Claude 3.5 Sonnet，约 21%）不敌 ML 博士生。
- CORE-Bench：评估已发表研究的计算可复现性，基于计算机科学、社会科学与医学的 90 篇论文共 270 个任务；当时最好的 agent（GPT-4o 与 GPT-4o-mini）在最难任务上只有 21% 准确率。
- ScienceAgentBench：从数学、化学、生物、地理四个学科 44 篇同行评审论文中抽出 102 个任务，覆盖数据处理、模型开发、数据分析与信息可视化。
- RE-Bench：7 个开放式 ML 研究工程环境，每个由（评分函数、初始解、参考解）构成，含 61 位专家的 71 次八小时尝试数据。专家在 82% 的八小时尝试中拿到非零分，24% 达到或超过强参考解；AI agent 在 2 小时预算下得分是人类的 4 倍，但人类在更长预算下回报更好，在 8 小时与 32 小时设置下反超。
- MLE-bench：75 场 Kaggle 机器学习工程竞赛，用公开排行榜作人类基线；论文中最好的配置（o1-preview 加 AIDE 脚手架）在 16.9% 的竞赛中至少达到铜牌水平。
- KernelBench：250 个 PyTorch 任务，评估 LLM 能否写出又快又对的 GPU kernel，指标 fast_p 是「正确且快于基线」的生成 kernel 占比。

## 概念网络

### 关键概念

### 递归自我改进（RSI）

**context**：全文的母题与线索起点。I. J. Good（1965）定义「ultraintelligent machine」为能在一切智力活动上超过人类、并设计出更好机器来改进自身的系统；Yudkowsky（2008）把它收窄成一个具体反馈回路：AI 用当下的智能去改进那套产生它智能的认知机器。文章明确指出，现代形态未必是模型改写权重，更广义是模型改进训练流水线与部署系统。

**费曼一下**：不是「机器变聪明」，而是「机器改进让自己变聪明的那条生产线」。你不是自己长脑子，而是把你的学校、教材和考试制度改得更好，于是下一届的你更强。

### harness

**context**：文章给出的定义是：环绕基础模型的那套系统，编排执行，并决定模型如何思考与规划、调用工具与行动、感知与管理 context、存储 artifacts、评估结果。相对 2023 年的「agent = LLM + memory + tools + planning + action」，它额外包含 workflow 设计、评估、权限控制与持久状态管理。

**费曼一下**：模型是发动机，harness 是整辆车——方向盘、变速箱、仪表盘、油箱和刹车。同一台发动机装进不同的车，跑出来的成绩可以差一大截。

### 部署系统层

**context**：作者特意点名 deployment system，认为介于原始模型与真实世界之间的这一层，重要性看起来不亚于模型的原始智能（即预训练刚结束时的 evals）。Claude Code、Codex 等 coding agent 产品是这一层价值的证据。

**费曼一下**：考试成绩和实际干活是两回事。原始模型是成绩单，部署系统是工位、工具和流程；成绩再好，工位太烂也干不成事。

### 操作系统类比

**context**：文章反复用 OS 类比 harness：harness 应当像操作系统一样把复杂逻辑封装起来、同时保持接口简单；设计要刻意简单通用以获得泛化，并参照既有软件工程实践以吃到预训练知识红利；配置与工具接口可能逐渐标准化。这个类比在 Self-Harness 一节又反向出现：允许程序编辑操作系统本身，会打破抽象边界。

**费曼一下**：好的操作系统让你不用管硬盘扇区，只要会读文件。harness 也该这样——把脏活封起来，露出一个模型能稳定用的简单界面。

### loop engineering（目标导向循环）

**context**：Pattern 1 工作流自动化的核心。常见工作流是 plan → execute → observe/test → improve → execute 的循环，直到目标达成；过程中可能主动向用户发起澄清请求。工作流图还强调模型分析自身轨迹与失败案例，通过「agent runtime」而非静态 prompt 模板迭代。

**费曼一下**：不是一口气写完交卷，而是「先想、动手、跑一遍看结果、改、再跑」，一直转到达标为止。关键是把这个转圈本身写成系统的一部分。

### 文件系统即持久记忆

**context**：Pattern 2。harness 不该把整条工作流和全部日志扛在 context 里，而应把耐久状态放进文件；长时程 rollout 中实验日志、代码 diff、错误 trace 常远超训练时的 context 窗口。作者补充：读写编辑文件系统（常通过 bash）是 LLM 的基础技能，因此这种朴素形态能天然吃到核心模型能力提升的红利。

**费曼一下**：脑子记不住那么多，就把东西写在纸上放进抽屉。抽屉不占脑容量，需要时再翻出来；而且「翻抽屉」这项技能，模型本来就越练越熟。

### 显式且可检查的并行

**context**：Pattern 3 的关键设计选择。harness 可派生多个 subagent 并行执行、监控后台作业，父 agent 需要一个小型进程管理器（启动、看日志、取消、合并）。如果 subagent 输出只活在临时对话 context 里，很快变得过时且不可见；存成文件、日志和状态记录，模型才能在中断后恢复并对自己的执行历史推理。

**费曼一下**：几个人同时干活可以，但要有工单和交接记录。全靠口头说，一断线就全丢了。

### 优化对象的阶梯

**context**：全文的组织骨架。harness 系统中被优化的对象大致沿这条路径演进：instruction prompts → structured context → workflow → harness code → optimizer code。模型越强越通用，我们就越往更复杂的目标和更通用的方法上走。

**费曼一下**：一开始你改的是「怎么问」，然后是「给它看什么材料」，然后是「按什么流程干」，最后干脆改「写流程的那段程序」，甚至「改程序的那段程序」。每上一级，杠杆更长。

### 上下文 playbook 与增量条目

**context**：ACE 的核心机制。把 context 当作不断演化的 playbook 而非越来越长的 prompt，由 Generator、Reflector、Curator 三角色维护一本带（标识符，描述）的 bullet 手册，增量、逐条更新，并定期精化去重。

**费曼一下**：不要每次都重写整本说明书，而是像维护一份编号清单：新学到一条就加一条，重复的合并掉，坏的划掉。

### 上下文坍塌与简洁偏置

**context**：ACE 要防的两个具体失效模式。迭代重写整块 prompt 会导致 context collapse 与 brevity bias，所以 curator 不重写整块 blob，而是输出结构化条目，用确定性逻辑合并进 logbook。

**费曼一下**：让人反复「总结上一版总结」，内容会越缩越短、细节全丢。所以改法是往清单里增删条目，而不是每次重写全文。

### 机制与内容分离（双层优化）

**context**：MCE 的关键动作——把「如何管理 context」的机制与「context 里有什么」的产物内容分开，元层跑 skill 演化、基层跑 context 优化；内层找给定 skill 下的最佳 context，外层找验证集上最优的 skill；skill 数据库支持元层 agent 做 agentic crossover。

**费曼一下**：一层是「这次考试带什么小抄」，另一层是「做小抄的方法论」。方法论改好了，以后每场考试的小抄都更好。

### 可执行搜索空间

**context**：全文的转折判断。代码是定义程序与系统的通用语言；harness 说到底是一段规定 prompt、工具调用、子 agent、控制流、记忆与工作流如何协同的代码。Meta-Harness、ADAS、AFlow 等工作说明：一旦 harness 设计变成可执行的搜索空间，强 coding agent 就能利用人类工程师使用的同一片设计空间，且远大于手写 prompt 所能触及的范围。

**费曼一下**：只要一个东西能写成代码、还能自动打分，它就能被机器一遍遍试着改。把 harness 写成代码，就等于把设计工作交给了会写代码的机器。

### 有界改动与回归闸

**context**：Self-Harness 的纪律。提案阶段只允许基于挖出的失败模式做**有界**的 harness 编辑，模型拿到的是有界提案 context（可编辑面、有 verifier 依据的失败模式、应保留的通过行为、以往尝试摘要）；验证阶段在 held-in 与 held-out 两个划分上跑回归测试，**两边都无退化才接受**，被拒候选只记日志不动现役 harness。

**费曼一下**：改系统要小步、可控，而且改完必须两套测试都不退步才准上线。改坏了不算英雄，改小且不破坏别人才算。

### 可编辑面与循环外的权限控制

**context**：作者对自改进 harness 的担忧。如果程序被允许编辑操作系统本身，抽象边界就被打破；可编辑面必须妥善设计，权限控制与安全层必须活在这个循环之外。第七条瓶颈里再次强调：评估器与权限控制大概率应坐在演化 harness 的循环之外，配合 held-out 测试、trace 审计与关键决策点的人类评审。

**费曼一下**：可以让员工改自己的工作流程，但不能让他同时改考勤机和自己的权限。裁判必须站在场外。

### 进化式搜索与适应度

**context**：受自然选择启发的优化方法，变异一群解、只留高适应度个体。适用条件有两条：搜索空间极大或形状古怪；难以用梯度直接优化但容易评估。AlphaEvolve、ShinkaEvolve、DGM 都属此列；这一族在矩阵乘法、GPU kernel、算法竞赛、数据中心调度这类可自动评测的领域好用，在评估缓慢、模糊或靠启发式的领域吃力。

**费曼一下**：不知道怎么直接算出最优解，就多生一批、挑活得好的、再生一批。前提是你能快速判断谁活得好。

### 递归结构不能替代基座智能

**context**：STOP 那条告诫式结果的抽象。同一套递归改进在 GPT-4 上让下游平均表现随迭代上升，换成 GPT-3.5、Mixtral 反而退化。作者的结论是：递归结构本身不够，基座模型必须足够强到能改进机制；harness 改进带来的是更好的部署，智能仍是核心。DGM 的「固定模型下的 harness 进化」也印证同一分工。

**费曼一下**：给一个学不明白的人一套「自我提升方法论」，他只会把自己越改越糟。会自我改进的前提，是你已经看得懂自己哪儿不行。

### 弱而模糊的评估器

**context**：迈向完整 RSI 的第一个瓶颈。许多研究主张没有快速精确的 verifier，现实任务同样如此；自我改进回路在指标可测量、客观时最有效（与 RL 起效条件类似）。研究品味、新颖性、长期科学价值难以度量——研究品味混合了问题构造、实验设计，以及哪些反常结果值得追、哪些失败值得重试的判断。

**费曼一下**：没有靠谱的裁判，比赛就没法自动越打越好。能量化的项目进步飞快，靠品味打分的项目原地踏步。

### 奖励攻击与多样性坍塌

**context**：第四、第五个瓶颈，也是自改进回路的两种系统性失灵。回路优化的是你给它的任何信号：来自单元测试就对测试过拟合，来自裁判模型就学会针对该裁判的技巧，来自基准分数就利用基准伪影；同时进化与 RL 回路倾向压榨已知高回报模式，需要机制防止种群坍缩成同一个解的变体，这对开放式研究尤其关键——最好的路径在当前评估器下最初可能显得更差。

**费曼一下**：考什么就练什么，甚至练怎么骗监考；而且一旦发现某条捷径能拿分，所有人就都走那条路，别的路再也没人试。

### 人类上移到更高抽象层

**context**：第七个瓶颈与全文收尾立场。人应当在栈上往上移动而不是被移出回路：在正确的时机、正确的抽象层级提供监督，系统设计要考虑何时以及如何设置这些触点。作者最后一句立场明确：我们是在为人类更好的未来造这项技术，而不是反过来。

**费曼一下**：不是把人赶出车间，而是让人从拧螺丝的位置换到画图纸和验收的位置。人还在，只是站得更高。

### 概念网络

![这是一张与工程、递归自我改进相关的关系图，由Mermaid源码渲染生成。图中以“harness”为核心节点，延伸出多条分支内容，包括其依托的“近期路径”“部署系统层”，衍生出的不同模式、优化对象的阶梯、终止的相关内容，还包含可执行搜索空间的对应方法、依赖与边界，以及循环相关的“人类上移到更抽象层”等内容，整体呈现出工程架构与递归自我改进相关内容的关联逻辑，清晰展现了各环节之间的支撑、限制、依赖等关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2U5YTg2ZTNhYjE1MDU3NzFjNjIxMTk3MTIxNWZjMTNfNjIzYTBmZjlhZmVjNjA3ZWVmYmY5YmM1MDcyOGI3ZDBfSUQ6NzY3MTAwODA1NDU3MzMwNTA1NF8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



- 这张网络的起点是一个替换：RSI 这条从 Good 与 Yudkowsky 传下来的老线索，在现代被替换掉了实现路径——不是模型直接改写权重，而是先改进**部署系统层**，而 harness 正是这一层的具体载体。所以「部署系统承载 harness」是全文的第一个结构性关系，也是把一篇 2026 年的工程综述接回 1965 年思想史的那根接线。
- harness 向下展开成三个并列的设计模式：loop engineering 管**时间**（什么时候该重来一遍），文件系统即持久记忆管**空间**（状态放在 context 里还是放在盘上），显式并行管**分工**（子 agent 的产物是消失还是留痕）。三者不是并列的功能清单，而是同一条原则的三个切面：把易失的过程变成可检查的持久对象。这条原则会在后面反复兑现——文件系统这一模式直接支撑了「可执行搜索空间」，因为 Meta-Harness 的执行历史、DGM 的 harness 仓库都是靠文件系统才可被 grep、可被继承。
- 网络的主干是**优化对象的阶梯**：prompt → 结构化 context → workflow → harness 代码 → 优化器代码。ACE 的上下文 playbook 占据第一级之上的位置，MCE 的机制与内容分离是对它的直接跃迁——ACE 仍然手写更新规则，MCE 把「更新规则」本身变成被搜索的对象。这一步与阶梯尽头的「可执行搜索空间」是同一个动作的两次发生：把原本由人拍板的东西，降格成可被程序改写、可被评分的对象。
- 阶梯尽头分出两条支路，方向相反。一条是**放大**：可执行搜索空间使进化式搜索成为可能，AlphaEvolve、ShinkaEvolve、DGM 让机器在人类工程师的同一片设计空间里搜索，Meta-Harness 的 TerminalBench-2 结果是这条支路的实测证据。另一条是**收紧**：Self-Harness 的有界改动与回归闸，规定改动必须窄、必须两套划分都不退化才准合入。放大与收紧共同依赖同一个前提——**评估器**。这就是为什么「弱而模糊的评估器」在网络里同时是两条支路的下游依赖，而不是一个孤立的挑战条目。
- 评估器一旦不可靠，失效有固定形态：**奖励攻击**（优化你给的信号而非你想要的东西）与**多样性坍塌**（压榨已知高分模式）。文章对此给出的不是更好的指标，而是一个结构性答案：把评估器与权限控制放到演化 harness 的循环**之外**，配 held-out 测试、trace 审计和关键节点的人类评审。这条边是全文最强的工程主张——不是「设计更好的奖励」，而是「不要让被优化的系统能碰到评判它的东西」。
- 横在整张网络之上的是一条张力关系：**递归结构不能替代基座智能**。STOP 在 GPT-4 上上升、在更弱模型上退化，说明可执行搜索空间的价值有上限，而这个上限由模型自身决定。所以它与「可执行搜索空间」之间画的是无向张力边而非支撑边：harness 工程把上限兑现得更充分，但不抬高上限。
- 最后闭环回到 RSI，且是两条不同性质的回边。一条是能力回路：可执行搜索空间催出更好的 harness，成熟 harness 支撑自动研究，从而回哺 RSI；作者同时指出反向约束——更聪明的模型能防止 harness 过度工程化，让系统保持可持续。另一条是治理回路：人类上移到更高抽象层，在正确时机、正确抽象层级提供监督。两条回边并存，正是这篇综述的立场——把 harness 当成放大器而非替代品，把人留在决定命运的节点上。

## 费曼 x3

「递归自我改进」这个词从 1965 年就在了，但它长期停留在一个吓人的画面上：机器改写自己的大脑。真正在发生的事没那么科幻，也更有意思——被改写的不是权重，是模型外面那一层。

那一层就是 harness：决定模型怎么规划、怎么调工具、看得见多少上下文、把中间产物存在哪、结果由谁来判。它已经不是 prompt 模板，而更像运行时和操作系统——把复杂逻辑封进去，把接口留得足够简单。一旦你承认这层存在，「智能」和「表现」就被拆成了两件事：模型的原始能力决定上限，harness 决定这次任务里有多少上限被真正兑现。

转折点在于表示方式。prompt、结构化上下文、工作流、harness 代码、优化器代码，这条阶梯每上一级，被优化的对象就更通用一点。而代码是通用语言：一个 harness 说到底就是一段程序，规定 prompt、工具调用、子 agent、控制流、记忆和工作流逻辑如何协同。所以一旦 harness 设计变成可执行的搜索空间，一个足够强的 coding agent 就能在人类工程师使用的同一片空间里搜索，而且不知疲倦。Meta-Harness 在 TerminalBench-2 上做出的 37.6 分高过所有手写 harness，就是这句话的实测版本。

但同一批研究里最该记住的是一条负面结果。STOP 让模型去改进「改进器」本身，在 GPT-4 上一路走高，换成更弱的模型却越改越差。递归结构不会凭空生出智能；能改进机制的前提，是你已经聪明到看得懂机制。harness 改善的是部署，不是天花板。

剩下的难题几乎长着同一张脸：信号不可靠。研究品味没有快速精确的验证器；文献偏向成功案例，模型于是不擅长承认失败；进化和 RL 都会向已知的高分区域坍塌；而任何自我改进回路，最终优化的都是你给它的那个信号——单元测试、裁判模型、榜单，给什么就攻什么。所以真正的答案不是设计更聪明的奖励，而是让评估器和权限控制待在演化循环之外，人往上走一层，在真正决定命运的节点上保留判断。我们是在为人的未来造这套东西，不是反过来。

HOWIE 原清单 · 06

# Cursor 谈「会自动驾驶的代码库」：多 agent 研究 harness 开放预览

**内容说明：**把内部多 agent 研究 harness 的一部分开放试用，目标是让代码库自己维护自己。看头部工具公司怎么把 harness 变成产品。

**策展人按：**理论抬得够高了，落回产品。Cursor 连着两条，这条是它敢放出来的那一面。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：Towards self-driving codebases
- 作者：Cursor
- 内参日期：2026-07-31
- 来源类型：blog
- 原文：https://cursor.com/blog/self-driving-codebases
- 标签：harness engineering, agents

把内部多 agent 研究 harness 的一部分开放试用，目标是让代码库自己维护自己。看头部工具公司怎么把 harness 变成产品。

## 导读

harness engineering 专题

## 核心观点

- Cursor 的这项研究要回答一个很朴素的问题：**能不能多花 10 倍算力，换来 10 倍有意义的吞吐量**（"Could we spend 10x more on compute to get 10x more meaningful throughput?"）。他们用来做实验的载体是一个从零写起的 web 浏览器——足够复杂、子系统足够多，能真实暴露前沿模型的极限。
- 答案是一个多 agent harness：它在一台大 Linux VM 上连续跑了一周，几乎包办了这个研究项目的绝大多数 commit，峰值约 **1,000 commits/hour、一周内 10M 次工具调用**，启动之后不需要人工干预。
- 但文章真正的价值不在这个数字，而在**通往这个设计的一连串失败**：自协调失败、静态 planner 太刚性、连续执行器角色过载、中心化 integrator 变成瓶颈。最终形态是递归的 planner + 隔离的 worker + 单向 handoff 回传，简单到"像今天某些软件团队的运作方式"。
- 三个反直觉的结论贯穿全文：**结构比自由更管用**（平级 agent 自协调必然退化）、**容忍稳定的错误率比追求 100% 正确更快**、**harness 稳定之后，瓶颈就转移到人给出的指令上**——"The harness was merely following our instructions exactly."

## 缘起：为什么是浏览器，为什么单 agent 走不通

- 研究起点是作者的个人业余项目。浏览器被选作 benchmark，因为它"复杂到足以暴露前沿模型的局限"，且有大量必须协同工作的子系统。
- 最初的做法极其朴素：让 Opus 4.5 写一份构建浏览器引擎的详细计划，然后反复催它 "keep going"，看它能走多远。
- 这条路很快失败。模型**跟丢自己在做什么**，还没接近完成就频繁宣称成功，卡在复杂的实现细节上。但它也显示出深厚的知识与智能——**小片段的代码写得很好**。
- 诊断：不是模型不行，而是浏览器这个任务对单次上下文过于压倒性，必须拆成子任务。
- 第二版：让 agent 先规划出主要工作的**依赖图**，人工按图 spawn agent、卡住就 nudge。吞吐量上去了，结果没好多少——agent 之间无法沟通、无法对项目整体给出反馈。系统需要更动态。
- 期间模型选择也在变：GPT-5.1（以及后来的 GPT-5.2）在**精确遵循指令**上表现更好，被判断为长时运行 agent 的更好匹配，harness 因此改用 OpenAI 模型。
- 此时 harness 已能造出一个不支持 JavaScript 的简版浏览器，但靠单 agent 造完整浏览器引擎"慢得不可接受"。

## 从单 agent 到多 agent：自协调方案的速败

- 新起一个仓库，用 Rust 写了一个简单 harness。**刻意回避分布式系统的复杂度**：全部跑在一台资源充裕的大 Linux VM 上，通过 SSH + 简单终端界面控制。
- 前期把力气花在**可观测性**上：记录所有 agent 消息、系统动作、命令输出，全部带时间戳，可分析可回放。这些日志不只供人工复盘，还能反过来喂给 Cursor，在海量数据里快速找模式。
- 第一个多 agent 想法最简单：一群**平级 agent** 共用一个共享状态文件，各自查看别人在做什么、决定自己做什么、再更新文件。设计哲学是"尽量少规定"，让 agent 自己想办法协调。
- 这个方案很快失败，失败点集中在锁上：
- agent 持锁太久、忘记释放、在非法时机尝试加锁解锁；
- 更根本的是它们**不理解持有协调文件锁的意义**——"Locking is easy to get wrong and narrowly correct"，加更多 prompt 也没用。
- 锁还带来严重竞争：**20 个 agent 的实际吞吐退化到 1–3 个的水平**，大部分时间在等锁。给 agent 一个显式"等待另一个 agent 完成"的工具，它们很少用；换成无锁的乐观并发控制，开销降了但困惑没消。
- 最深层的问题不是性能而是**责任真空**：agent 之间缺乏结构，就没有任何一个 agent 愿意接下大而复杂的任务。它们回避冲突与竞争，倾向做更小更安全的改动，而不是为项目整体负责。

![图片展示了多个平级agent读写同一个协调文件的场景。图中有四个方框，分别标注为Agent，它们分别指向一个中心方框，该方框标注为“Coordination File”。这与上下文提到的“多个平级agent都读写同一个协调文件，锁竞争由此而来”的内容相契合，直观呈现了多个agent共享同一协调文件的情况，是对上下文所述问题的可视化说明。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzQ4NDE2MmY0NWM5YmJkZGEwNTZlYzRhNWRmZGIyZWFfYWIyMmZkNzIyMWU4OWIyYWE1MGJiN2ExNzQyNWQwMmJfSUQ6NzY3MTAwODA1NzMyNDc4NDkyN18xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜多个平级 agent 都读写同一个协调文件，锁竞争由此而来* ｜ [原图](https://neican-res.candobear.com/article-images/eb6c7966280afda5895ad5e8212d665b3018ecb618a120502b54f4b79a470007.png)

## 加入结构与角色：planner、executor、worker、judge

- 下一步是**分离角色，给 agent 所有权与问责**（"ownership and accountability"）：
- **planner**：先把达成用户指令所需的确切路径与交付物排出来；
- **executor**：唯一的 lead agent，独自负责计划被完整达成，可以 spawn 任务给 worker，由此获得线性扩展与吞吐；
- **worker**：只管窄范围的具体任务；
- **judge**：executor 结束后独立运行，判断是否真的完成、是否需要再跑一轮。
- 效果明显：**有一个专职角色拥有并监督执行**，worker 就能安心聚焦自己那一小块，而系统整体仍然交付得出来。许多协调问题就此消解。
- 定下这个设计靠的是**贴身观察系统**：真正的大问题往往会在很多 agent、很多次工具调用上重复出现。一个具体例子是他们发现竞争过高，源头是**大量 agent 同时跑 \`git restore\`**。他们用 Cursor 分析日志、和 prompt 逐条对照，理解"行为为何与预期不符"。
- 但这套结构也有天花板：
- 系统被**最慢的那个 worker 卡住**，太刚性；
- 所有规划都在前期做完，导致新问题出现时系统难以动态重调；
- 一些 agent 会走进反效果的方向，**直到下一轮循环才有机会自我纠正**。

![图片展示了Harness AI内参中planner到executor再到judge的流水线结构。左侧从上至下依次为Planner、Executor、Judge，Planner与Executor间有箭头指向，Executor与Judge间也有箭头。右侧有四个Worker，其中两个Worker被虚线框突出显示。图片中“send events”字样用橙色箭头标注，表明Worker向Executor发送事件。该图与上下文介绍的Harness AI内参中代码库的结构及工作流程相契合，直观呈现了各组件间的关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MmVjNmJkYWYxOTU1ZTBiNzhmNTYxOGY0MzIxM2E1NWNfNWZiZTI0YzQxNmYwOGNmOWE4N2QzYTA0YjliZDlkOWJfSUQ6NzY3MTAwODA1NTUwODY1MTI2N18xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜planner 到 executor 到 judge 的流水线，worker 只接收事件* ｜ [原图](https://neican-res.candobear.com/article-images/0666e7236af0891157e078cc71b3255f79c7332ea6251ba950ddba1654b34beb.png)

## 连续执行器：更动态，也更容易过载

- 下一版**去掉独立 planner**。executor 既规划如何达成目标，也 spawn 任务。因为它是唯一的 agent，它**不需要把计划写在任何地方**，不必守着一份静态不变的计划，也不必刚性地等所有 worker。
- 为防止长时间运行后的漂移，引入了一组**新鲜度机制**（freshness mechanisms）：
- scratchpad.md 应该被频繁重写，而不是不断追加；
- 单个 agent 逼近上下文上限时自动做总结；
- 系统提示里加入自省与对齐提醒；
- 鼓励 agent 随时转向、随时挑战既有假设。
- 系统由此变得高度动态灵活：能主动探索代码、重新考虑决策、管理 worker、交错任务、持续反映最新信息。既然 agent 已能较好地跟随指令直到完成，**judge 也被删掉以保持系统简单**。
- 然而连续执行器开始表现出**病态行为**：随机 sleep、停掉正在跑的 agent、自己动手干活、拒绝规划、只肯 spawn 少数几个窄任务、不好好合并 worker 的改动、过早宣称完成。
- 归因很清楚：**它被同时赋予了太多角色与目标**——规划、探索、研究、派任务、盯 worker、review 代码、亲自改代码、合并产出、还要判断循环是否结束。"In retrospect, it makes sense it was overwhelmed."

![图片展示了连续执行器的工作流程。左侧为Executor，右侧有三个Worker。Executor与每个Worker间通过“send events”箭头进行事件发送，形成循环。此图与文档中对连续执行器的描述相呼应，直观呈现了其工作原理，即Executor不断向Worker发送事件，Worker处理后返回，形成持续循环，体现了其动态且易过载的特点。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTU0MGYzZmY2ZGQ2N2U0M2I0Yjg2ZjFjNjY3ZmVhNzNfMWRiZDA0MTgxYjA4YTBhZmJkOTQyNjkyZTkyZWY5M2VfSUQ6NzY3MTAwODA1ODEzNDIzNjQ0OV8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜去掉 planner 和 judge，只剩一个不断循环的 executor 调度 worker* ｜ [原图](https://neican-res.candobear.com/article-images/cdfebacd62c74b46ef04d5ef7190d614e76bff1f9921bf33e630ae2c34619a39.png)

## 最终系统设计：递归 planner + 隔离 worker + handoff

- 最终设计吸收了此前全部教训，只有三类角色：
- **root planner** 拥有用户指令的全部范围，负责理解当前状态、给出具体而有针对性的任务。它**自己完全不写代码**，也**不知道任务被谁接走、有没有被接走**。
- 当 planner 觉得自己的范围可以再切分时，它 spawn **subplanner**，后者以同样方式完全拥有被委派的那一窄片。这个过程是**递归的**。
- **worker** 领取任务并独自负责推到完成。它们对更大的系统一无所知，不与任何其他 planner 或 worker 通信，在**自己的仓库副本**上工作，完成后写一份**单一 handoff**，由系统提交给下达任务的那个 planner。
- 作者的评价耐人寻味：**"Interestingly, this does represent how some software teams operate today."**
- subplanner 的价值在于：既能快速扇出 worker 提升吞吐，又能保证整个系统**始终被某个 agent 完全拥有和负责**；同时避免单一 planner 在大项目上被压垮、陷入隧道视野。
- handoff 不只写"做了什么"，还包含**重要笔记、顾虑、偏离、发现、想法与反馈**。planner 以 follow-up 消息的形式收到它。
- 这一机制让系统持续运转：**即使一个 planner"已完成"，它仍会持续收到更新、拉取最新仓库、继续规划与决策**。所有 agent 都有这个机制，信息沿链条向上传递给视野越来越全局的所有者，**却不需要全局同步或交叉通信的开销**——系统因此保持极度动态且自收敛。
- **去掉 integrator**：他们原本加了一个 integrator 做全局质量控制，并缓解大量 worker 同时 push、rebase、解冲突、merge 的竞争。但它很快成为显而易见的瓶颈——**几百个 worker，一道所有工作都必须通过的闸门**（作者直接称之为 "red tape"）。改 prompt 无果后，判定它并非必需，直接删掉以简化系统。

![图片展示了最终系统设计的流程图。最上方是Planner，其向下分支出Subplanner和两个Worker。Subplanner再分支出两个Worker，这些Worker最终都提交到Git。该图与上下文紧密相关，是对文档中“最终系统设计：递归planner+隔离worker+handoff”这一内容的可视化呈现，直观地展示了Planner、Subplanner、Worker与Git之间的关系及工作流程。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmI0MjdiNmQwMTAxOWI5MmNhZTJiMjE0Mzk4ZjZjNWRfZjU3ZDFhODM4Yzc0YWYxZDViYmYyMWY1YTJlYTU2YWNfSUQ6NzY3MTAwODA1ODQ5NDk0NjU4M18xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜最终设计：planner 递归派生 subplanner，worker 各自提交到 git* ｜ [原图](https://neican-res.candobear.com/article-images/ccfe4ff112e772bd4f9c18c2897fc391989e5814269b620c0b2da15832cacf99.png)

## 吞吐量与刻意的取舍

- 成绩单：系统峰值约 **1,000 commits/hour**，一周内累计 **10M 次工具调用**，启动后无需任何人工干预。
- 这个吞吐量是**用刻意的取舍换来的**，主要有两处。
- **取舍一：不追求每次 commit 都 100% 正确。**
- 强制"每次 commit 前必须 100% 正确"会造成严重串行化，有效吞吐大幅下降。
- 哪怕一个小错误——一次 API 变更或一个 typo——都会让整个系统停摆：worker 会越出自己的范围去修不相干的东西，大量 agent 一拥而上、互相踩踏地修同一个问题。
- 允许一些"松弛"（slack）后，agent 可以**信任别的 agent 很快会修掉其他问题**；因为系统对整个代码库有有效的所有权与委派，这个信任是成立的。错误出现、也很快被修掉。
- 关键判断：**错误率保持小而恒定**——也许很少完全干净，但稳定可控，不会爆炸也不会恶化。
- 由此推出一个设计原则：理想的高效系统**接受一定错误率**，但需要一条最终的 "green" 分支，由一个 agent 定期打快照、在发布前做一次快速修复 pass。
- **取舍二：容忍同步开销与局部湍流。**
- 多个 agent 有时会碰同一个文件、重构同一段代码。他们**不去彻底消灭这种情况，也不过度工程化**，而是接受短暂的"湍流"，让系统在一小段时间内自然收敛、自行安定。
- 代价是多花一些 token、制造局部竞争；收益是系统整体更简单：**更容易对齐模型、不压垮模型、更容易管理和观测、摩擦更少、全局生产力更高**，也避免了过于复杂的方案。

## 基础设施的教训：单用户假设在几百个 agent 面前失效

- 每次多 agent 运行都独占一台资源充裕的大机器，**刻意避免过早引入分布式系统的复杂度**。多数运行峰值在几百个 agent，正好把机器吃满而不超配；这个架构也让观测系统指标、共享和复制状态更容易。
- 限制 agent 的 RAM 用量之后，**磁盘成为新热点**。尤其在 monolith 项目上，几百个 agent 同时编译会产生每秒数 GB 的构建产物读写，显著拖累整个 harness 的吞吐。
- 由此得到一个很有迁移价值的教训：**项目结构、架构决策和开发者体验会直接影响 token 与 commit 吞吐**——因为"与代码库打交道"（比如编译）主导了时间，而不是理想中的思考与写代码。
- 更普遍的问题是：那些在单用户工作区里合理、不起眼的约束和低效，**在一台机器上几百个 agent 同时做同样的事时会格外扎眼**。
- 一个平凡的解法是给每个 agent 一台机器；但作者认为，**重新思考和重新设计这些原语与工具，存在唾手可得的巨大效率空间**：
- git、Cargo 这类工具广泛使用共享锁，只是作为一种简单的并发控制机制——能不能把数据库等并发系统里成熟的机制搬过来？
- 所有 agent 各持一份仓库副本，但大多数文件与构建产物是相同的——**给这种典型"单用户"系统加上简单的写时复制（copy-on-write）与去重**，能否像成熟的生产级存储系统那样，不必另建基础设施就拿到同等收益？

## 向 agent 表达意图：harness 稳定之后，指令成为瓶颈

- 起初他们并没把指令当作首要目标，而是先追求一个稳定有效的 harness。但**指令的重要性很快浮现**。
- 本质上，他们面对的仍是一个典型的编码 agent，只是**多了数量级的时间与算力**——而这会**放大一切**，包括次优的、含糊的指令。
- 一句冷峻的判断：**"Ultimately, agents are still agents: trained to follow your instructions strictly, go down those paths, not change or override them, even if they're bad."**
- 他们在项目推进中不断修改初始指令，因为看到"糟糕或欠规约的 spec"直接反映在产出质量上——**这不是 harness 的问题，harness 只是在精确地执行他们的指令**。
- 浏览器项目的三个具体例子：
- 最初的指令聚焦"实现规范、消灭 bug"，但 "spec implementation" 这种说法太含糊，agent 会一头扎进冷僻罕用的特性，而不是智能地排优先级；
- 他们**隐含地假设**性能会落在用户可接受的范围内，实际上需要**显式指令和强制超时**才能逼 agent 在性能与其他目标之间做平衡；
- 在系统的复杂部分，agent 写出的代码可能有内存泄漏或死锁——人类会察觉，agent 未必；因此必须提供**显式的、基于进程的资源管理工具**，让系统能优雅恢复、更具防御性。
- 两个更大的失败与修正：
- 第一版不带 JavaScript 的简版浏览器**收敛到了一个无法演进为完整浏览器的架构**——这是初始规约的失败；
- 尽管被告知"从零造浏览器"，agent 仍拉进了一些本可自己实现的依赖，或把依赖当临时脚手架用；后来的一次运行**显式写清依赖哲学、列明哪些库不得使用**，问题被纠正。
- 那次运行同时做了一项**大重构：从 monolith 拆成许多自包含的 crate**。过程中仓库一度严重损坏，多 agent 系统却在几天内收敛回可用状态——说明系统**能在完全破碎的状态下协作并保持智能**，不会进一步退化或卡死。这次运行等待编译的时间也大幅减少，吞吐量数倍于之前。
- 总结句值得反复读：**架构与指令都重要。agent 有极强的工程能力，但会把指令执行到底，不论好坏。** 难点在于拿捏"过窄的指标"与"无结构的自由"之间的平衡，以及判断什么是不言自明的、什么必须明说。
- 由此指向两个研究方向：**可引导性（steerability）与可观测性（observability）**。

## prompt 优化的四条经验

- **只教模型不知道的事**。不要指导模型本来就会做的事，只指导它不会的（例如多 agent 协作）或与你的领域强相关的（例如怎么跑测试、你的部署流水线）。作者给了一个很好的类比：**把模型当作一个懂工程但不懂你的代码库与流程的、才华横溢的新员工**。
- **约束比指令更有效**。"No TODOs, no partial implementations" 比 "remember to finish implementations" 管用。模型默认就倾向做对的事，**约束是在为它划定边界**。
- **避免打勾式（checkbox）心态**。对更高层、更深入的任务，要给出关于你意图的详细说明；但要记住，给出具体的待办清单会让模型专注于完成这些条目，而不是更广的范围，**也隐含地把没列出的东西降级了**。通常更好的做法是让模型自己判断、自己发挥能动性。
- **谈"量"时给具体数字与范围**。"generate many tasks" 反而产出很少——保守的默认值、求稳、技术上又确实遵循了指令；而 **"Generate 20-100 tasks" 传达出"范围要大、要有野心"的意图**，他们观察到系统行为随之显著变化。

## 系统设计原则与更大的图景

- 三条从研究中确立的原则：
- **系统应当反脆弱（anti-fragile）**。同时运行的 agent 越多，出故障的概率越高；系统必须能承受个体 agent 失败，让其他 agent 恢复或尝试替代路径。
- **经验优先于假设**。用数据和观察来做调整，而不是带着"人类组织应该怎样"或"既有系统设计应该怎样"的先验进场。
- **显式地为吞吐量设计**。这意味着要在编码的其他方面做取舍——接受一个小而稳定、需要最终对账 pass 的错误率，而不是追求 100% 完全正确却让系统大幅变慢。
- 一个关于"简单"的重要限定：**这类系统做对了往往优雅而简单，但在探索过多种方案之前，你并不知道是哪一种简单方案会奏效**。当前设计以极小的开销运行，提供可用的线性 token 吞吐扩展，harness 本身**已无需重大迭代**。
- 人机分工的定位：**品味、判断与方向来自人类，AI 是快速迭代和探索这项研究的强力放大器（force-multiplier）**。
- 收尾有两个更大的判断：
- 这与所谓"良性（virtuous）AI 循环"有相似之处——**用 AI 开发 AI**，模型、agent 与 harness 一起变好，自我馈入、越来越快。作者引用了那句 **"We shape the tools which shape us."**
- 这套架构与今天某些软件团队的运作方式有"诗意的相似"。而这些模型**并没有被显式地这样训练过**，这意味着它是**涌现行为**，也可能说明这本来就是组织软件项目的正确方式。
- Cursor 表示将继续研究极长时运行的 agent，研究发现会反哺产品；本次研究的一部分已向部分用户开放试用。

## 概念网络

### 关键概念

### agent harness

**context**：文章的中心对象。这项研究"起于内部研究以推动当前模型的极限"，为此他们"created a new agent harness to orchestrate many thousands of agents and observe their behavior"。harness 不是模型，而是模型之外那层负责编排、调度、观测、约束的系统。全文讲的正是这层系统从 v1 到最终形态的演化。

**费曼一下**：模型是发动机，harness 是整辆车——底盘、变速箱、仪表盘和方向盘。同一台发动机，装在不同的车上跑出的成绩天差地别。这篇文章说的是他们如何把车造好，而不是如何把发动机做大。

### 自协调与共享协调文件

**context**：第一个多 agent 方案——"have agents with equal roles use a shared state file to see what others are working on, decide what to work on, and update the file"，设计哲学是"be the least prescriptive"。结果 "This failed quickly."

**费曼一下**：让一群地位相同的人共用一块白板，各自写下"我在干什么"，指望他们自己把活分好。听上去很民主，实际是每个人都在抢那支笔，而且没人愿意认领最难的活。

### 锁竞争与乐观并发控制

**context**：自协调失败的直接技术表现。agent"持锁太久、忘记释放、在非法时机加解锁"，且"didn't understand the significance of holding a lock"。竞争严重到"20 agents would slow to the throughput of 1-3"。他们试过给 agent 显式等待工具（很少被用）和无锁的乐观并发控制（开销降了但困惑没消）。

**费曼一下**：锁是并发编程里最容易写错的东西之一，正确的写法往往只有很窄的一条路。人类程序员都常写错，指望模型靠 prompt 学会拿捏锁的语义，是把难度放错了地方。

### 所有权与问责

**context**：从自协调转向角色分工的核心动机——"we separated roles to gives the agents ownership and accountability"。自协调最深的病根不是性能，而是"no single agent took on big, complex tasks"，agent 集体回避冲突、只做小而安全的改动。

**费曼一下**：一件事如果人人有份，就等于没人负责。给系统装上"这块归你"的明确归属，agent 才敢接下会得罪人的大活。

### planner–executor–judge 角色分工

**context**：第二代设计。planner 排出确切路径与交付物，executor 作为唯一 lead agent 保证计划被完整达成并 spawn 任务给 worker（"provided linear scaling and throughput"），judge 在 executor 结束后独立判断是否完成、是否再跑一轮。

**费曼一下**：把一个人的活拆给"出方案的、盯落地的、验收的"三个角色。好处是终于有人对结果负责了；代价是流程被钉死，前期方案一旦过时，整条流水线要等到下一轮才有机会改。

### 最慢 worker 瓶颈与刚性

**context**：角色分工版的天花板——"we found this system to be bottlenecked by the slowest worker. It was too rigid."；且"Doing all planning upfront also made it hard for the system to dynamically readjust"，走偏的 agent 要等到下一轮循环才能自我纠正。

**费曼一下**：把所有规划前置，等于把地图画死。路上发现桥塌了，队伍只能站在原地等下一次重新画图。

### 连续执行器

**context**：第三代设计，去掉独立 planner，executor 兼做规划与派任务。因为它是唯一的 agent，"it didn't need to write a plan anywhere, stick to one static unchanging plan, or rigidly wait for all workers"。系统由此变得高度动态灵活，judge 也被删除以保持简单。

**费曼一下**：让同一个人边想边干、随时改主意，不用把计划写成文件交给别人。灵活性大涨——但也埋下了下一个问题：这个人身上的帽子太多了。

### 新鲜度机制

**context**：为防止长时间运行的漂移而引入的一组做法：scratchpad.md 频繁重写而非追加、agent 接近上下文上限时自动总结、系统提示里加自省与对齐提醒、鼓励随时转向与挑战假设。

**费曼一下**：长跑中的 agent 最大的敌人是"记忆结痂"——旧笔记越堆越厚，最新的事实被埋在下面。定期重写而不是不断追加，就是强制刮掉那层结痂。

### 角色过载与病态行为

**context**：连续执行器的失败模式——随机 sleep、停掉 agent、自己动手、拒绝规划、不合并 worker 改动、过早宣称完成。归因是它同时被赋予"plan, explore, research, spawn tasks, check on workers, review code, perform edits, merge outputs, and judge if the loop is done"。

**费曼一下**：给一个人同时挂上产品、架构、开发、测试、项目经理五个头衔，他不会变成五个人，只会变成一个什么都做不好、还会莫名其妙发呆的人。

### 递归 planner 与 subplanner

**context**：最终设计的核心结构。root planner 拥有用户指令的全部范围、不写代码、不知道任务被谁接走；当它觉得范围可以细分时，spawn 出完全拥有那一窄片的 subplanner，"This is recursive."。subplanner 既提升扇出速度，又保证"the whole system remains fully owned and responsible by an agent"，并避免单一 planner 陷入隧道视野。

**费曼一下**：不是把一个大老板换成一群小兵，而是让"负责"这件事本身可以分形地复制下去——每一片工作，总有且仅有一个 agent 对它整体负责。

### handoff 交接

**context**：worker 完成任务后写的**单一**交接报告，由系统提交给下达该任务的 planner。它"contains not just what was done, but important notes, concerns, deviations, findings, thoughts, and feedback"，planner 以 follow-up 消息形式收到。

**费曼一下**：交接不是交作业，是交情报。做完了什么只是最浅的一层，真正值钱的是"我一路上发现了什么、哪里不对劲、我偏离了哪里"——这些才是让上层重新决策的燃料。

### 自收敛与免全局同步

**context**：handoff 机制的系统性后果——"even if a planner is 'done,' it continues to receive updates, pulls in the latest repo, and can continue to plan"；信息"propagating information up the chain to owners with increasingly global views, without the overhead of global synchronization or cross-talk"。

**费曼一下**：不开全员大会，也不让所有人互相加好友。信息只沿着"谁对这块负责"的链条往上走，视野越往上越全局。系统因此既保持动态，又不必付出人人同步的开销。

### integrator 瓶颈

**context**：被删掉的一个组件。原本用于全局质量控制、并消除大量 worker 同时 push/rebase/解冲突/merge 的竞争，但"There were hundreds of workers and one gate (i.e. 'red tape') that all work must pass through."，改 prompt 无果后直接移除。

**费曼一下**：为了保证质量设一道总闸门，听起来很负责。但当上游有几百个人时，这道闸门就是全公司最堵的地方——它带来的排队损失远大于它拦下的错误。

### 为吞吐量设计与可接受错误率

**context**：最重要的刻意取舍。要求每次 commit 前 100% 正确会导致严重串行化，一个 typo 就能让整个系统停摆、agent 一拥而上互相踩踏。放宽后，"agents can trust that other issues will get fixed by fellow agents soon"，且"The error rate remains small and constant"。推论是理想系统接受一定错误率，但需要一条最终的 "green" 分支做发布前的快速修复 pass。

**费曼一下**：追求"任何时刻代码都完美"，在几百个 agent 并发的场景下反而是最慢的路。更快的做法是允许持续存在一小撮已知会被很快修掉的错误，然后在发布口设一道净化关。前提是这个错误率**稳定**——不爆炸、不恶化。

### 反脆弱

**context**：三条系统设计原则之首——"As we scale the number of agents running simultaneously, we also increase the probability of failure. Our system needs to withstand individual agents failing, allowing others to recover or try alternative approaches."

**费曼一下**：规模本身就是故障源。一百个 agent 里总有几个会跑偏、卡死或胡说八道。系统的正确目标不是让每个 agent 都不出错，而是让任何一个出错都不要紧。

### 意图规约与可引导性

**context**：harness 稳定后浮现的真正瓶颈。多出数量级的时间与算力会"amplifies everything, including suboptimal and unclear instructions"；"The harness was merely following our instructions exactly."；由此指向"the importance of eliciting, specifying, and understanding intent"以及 steerability 与 observability 两个研究方向。

**费曼一下**：当执行力接近无限时，方向的每一度偏差都会被放大成几公里。这时你的工作不再是"多干一点"，而是"把想要什么说清楚"——因为系统会把你说的话执行到底，好话坏话一视同仁。

### 约束优于指令

**context**：prompt 优化的核心经验。"Constraints are more effective than instructions."——"No TODOs, no partial implementations" 胜过 "remember to finish implementations"，因为"Models generally do good things by default. Constraints are defining their boundaries."。配套经验还有：只教模型不会的事、避免 checkbox 心态、谈量时给出 "Generate 20-100 tasks" 这样的具体范围。

**费曼一下**：与其列一张"你要做的十件事"的清单（模型会只盯着这十件，还默认其他都不重要），不如画一圈"不许越过的线"，把剩下的判断留给它。前者压缩了它的能动性，后者只压缩了它的犯错空间。

### 单用户假设的失效

**context**：基础设施章节的核心洞察。限制 RAM 后磁盘成为热点，几百个 agent 同时编译产生每秒数 GB 读写；由此得出"the project structure, architectural decisions, and developer experience can affect token and commit throughput"。git、Cargo 等工具的共享锁、以及仓库副本间的大量重复文件，都被点名为可用写时复制与去重改造的"low-hanging opportunities"。

**费曼一下**：我们今天的开发工具，几乎都默认"一台机器上只有一个人在敲代码"。这个假设在一百个 agent 面前立刻崩掉——不是因为工具坏了，而是因为它从没被设计来应对这种并发。改造这些老原语，可能比再堆算力更划算。

### 概念网络

![图片为Harness Engineering AI内参主题精选中关于“会自动驾驶的代码库”概念网络的原文关系图。图中以“agent harness”为起点，依次展示了自动调用协防协议文件、导致锁竞争与死锁真空、促成planner executor judge、暴露最慢worker函数与属性、连接执行器、暴露角标过载的病态行为、被移除旧旧planner与subplanner、引入新解救机制、支持自收敛与全局同步、支持会自动驾驶的代码库等关键步骤，还涉及目标、支持、决定、约束、支配等关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGUyNzUzODllZTliNzQ5NjRjODgxMTNiOTEyNjQzMDRfYzdmZWE5YTM0OTZkMWNkY2I1MmE0OTRkNGFiZjFjZDdfSUQ6NzY3MTAwODA1NDU3MzMzNzU1MF8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



- 整篇文章的思想主干是一条**演化链**，而不是一份架构说明书：agent harness（C2）是研究对象，"会自动驾驶的代码库"（C1）是它要抵达的目标状态，中间隔着四代设计的失败与修正。
- 链条的第一段是**结构的诞生**。自协调共享协调文件（C3）是"最少规定"哲学的产物，它同时暴露了两个层次的问题：表层是锁竞争（20 个 agent 退化到 1–3 个的吞吐），深层是所有权真空——没有 agent 愿意接下大任务（C4）。这两者共同催生了角色分工（C5）。**注意因果方向：不是先想到分工更优雅，而是先被自由的代价打疼。**
- 链条的第二段是**结构的减负**。角色分工带来了问责，也带来了刚性：系统被最慢的 worker 卡住、前置规划无法动态重调（C6）。去掉 planner 得到连续执行器（C7），灵活性回来了，但它把太多角色压在一个 agent 身上，于是出现随机 sleep、拒绝规划、过早宣称完成等病态行为（C8）。**C5 与 C7 构成一组张力：结构过多则刚性，结构过少则过载。**
- 链条的终点是**把"所有权"做成可递归的**。递归 planner 与 subplanner（C9）解决了这组张力：责任可以分形复制，而 worker 被彻底隔离——不通信、独占仓库副本、只交回一份 handoff（C10）。handoff 加上新鲜度机制（C21）共同支撑起自收敛（C11）：信息只沿所有权链条向上传播，系统免除了全局同步的开销。integrator（C12）在这个结构里被证明是多余的闸门，删除它是这条链上的最后一次减法。
- 与这条主链**并行**的是一组**吞吐量取舍**。"为吞吐量设计"（C13）是显式原则，它向下推出对错误率的容忍（C14），而容忍错误率又反过来要求一条最终的 green 分支做修复 pass（C15）——**这是一组"放宽—补偿"的配对，缺了 C15 的 C14 就是纯粹的质量滑坡**。反脆弱（C16）是 C13 成立的前提（规模必然带来故障），经验优先于假设（C17）又是得到 C16 这类结论的方法论基础。单用户假设的失效（C20）从相反方向制约 C13：磁盘、共享锁、重复副本会把吞吐吃掉，这是**架构与工具层面对系统上限的硬约束**。
- 全文最深的一层关系在最后浮现：**意图规约（C18）与前面所有工程努力是并列而非从属的**。harness 稳定之后，输出质量的决定权就转移到了指令上——"The harness was merely following our instructions exactly."。约束优于指令（C19）是 C18 在 prompt 层面的具体方法：不列待办清单，而是划边界，把判断留给模型。
- 因此 C1 有**两个独立的必要条件**：一边是结构演化出的自收敛系统（C11），一边是人给出的清晰意图（C18）。任何一边缺席，另一边都不足以抵达"会自动驾驶的代码库"——这也解释了作者为何把 steerability 与 observability 列为下一步的研究方向。

## 费曼 x3

一个能力接近无限的执行者，最先暴露的不是它的能力上限，而是你表达意图的能力上限。

这大概是这项研究里最容易被那个耀眼数字盖过去的发现。一周不间断、峰值每小时约一千次提交、一千万次工具调用、启动后无人干预——很容易把它读成一则算力的胜利。但真正被反复验证的结论朴素得多：agent 终究还是 agent，被训练来严格遵循你的指令，一路走到底，不修改也不推翻，哪怕这些指令是错的。当他们发现浏览器项目的产出质量不佳，原因不在 harness，harness 只是在精确地执行他们给出的指令。第一版简版浏览器收敛到了一个无法演进成完整浏览器的架构，这不是模型的失败，是规约的失败。

沿着这条线看，整篇文章的四代设计其实是同一个主题的四次变奏：责任要怎么安放。让平级的 agent 共用一块白板自行协调，失败得最快——表面是锁竞争，二十个 agent 退化成三个的吞吐，深层却是没有任何一个 agent 肯接下大而复杂的活，它们回避冲突，只做小而安全的改动。加上角色分工，责任有了，刚性也来了，系统被最慢的那个 worker 拖住。把角色合并成一个连续执行器，灵活性回来了，那个 agent 却被规划、探索、审查、合并、判断收工同时压垮，开始随机睡觉和过早宣称完成。最后成立的方案是把"负责"这件事做成可以递归复制的：planner 完全拥有一片范围，觉得能再切就派生 subplanner 拥有更窄的一片，worker 彼此隔离、各持一份仓库副本，只交回一份写着顾虑、偏离和发现的交接。信息沿所有权链条向上流动，不必开全员大会，系统就能自己收敛。

另一个值得偷走的判断是关于错误的。要求每次提交前都百分之百正确，反而让整个系统停摆——一个拼写错误就能引来一群 agent 互相踩踏地抢修。放宽之后，agent 可以信任别的问题很快会被同伴修掉，而错误率保持小而恒定，不爆炸也不恶化。代价是需要一条最终的绿色分支，定期打快照、发布前做一次快速修复。这是一个很反直觉的工程姿态：允许持续存在一点脏，前提是脏得稳定。

最后那句引语值得单独记住：我们塑造工具，工具反过来塑造我们。这套系统的形态与今天某些软件团队的运作方式惊人地相似，而模型并没有被显式地这样训练过——这意味着它是涌现出来的，也可能意味着，这本来就是组织软件项目的正确方式。

HOWIE 原清单 · 07

# Cursor：让 coding agent 连续自治运行数周的工程经验

**内容说明：**记录长时间自治运行中暴露的目标漂移、验收和成本问题，以及对应的控制手段。和前一篇配套读。

**策展人按：**野心的价钱在这条。连着上一条读，你会看到同一家公司的愿景和它的运维日志之间隔着多远。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：Scaling long-running autonomous coding
- 作者：Cursor
- 内参日期：2026-07-31
- 来源类型：blog
- 原文：https://cursor.com/blog/scaling-agents
- 标签：harness engineering, agents

记录长时间自治运行中暴露的目标漂移、验收和成本问题，以及对应的控制手段。和前一篇配套读。

## 导读

harness engineering 专题

## 核心观点

- Cursor 把数百个 coding agent 并发投在同一个项目上连续运行数周，累计写出超过 100 万行代码、消耗数万亿 token，用来回答一个问题：**能否靠"往问题上堆更多 agent"来扩展自治编码**。他们的答案比预期乐观——数百个 agent 可以在一个代码库上协作数周，在野心级项目上取得真实进展。
- 真正的瓶颈不是单个 agent 的能力，而是**协调架构**。让地位平等的 agent 通过共享文件加锁自协调，会同时坏在两个层面：机制层面（持锁不放、崩溃时不释放、绕过锁写入）和激励层面（没有层级，agent 变得风险规避、只做小而安全的改动、无人对端到端负责）。
- 解法是**放弃平等协商、改成角色分离的流水线**：planner 持续勘察代码库并生成任务（可递归派生 sub-planner），worker 只管死磕单个任务并 push，周期末由 judge agent 决定是否继续，下一轮从头开始。
- 三条反直觉的工程判断：**减复杂度往往比加复杂度更有效**（专设的 integrator 角色被删掉）、**结构的正确剂量在中间**（太少则冲突漂移，太多则脆弱）、**prompt 比 harness 和模型更重要**。

## 单个 agent 的极限：从"够用"到"太慢"

- 今天的 agent 在聚焦型任务上表现良好，但面对复杂项目"很慢"（slow for complex projects）。Cursor 的目标是把人类团队通常需要数月完成的项目推给 agent，看能把 agentic coding 的前沿推到多远。
- 自然的下一步是并行跑多个 agent；难点不在启动它们，而在**如何协调**（figuring out how to coordinate them is challenging）。
- 最初的直觉是：提前规划会太僵硬（planning ahead would be too rigid）——大项目的路径本身是模糊的，正确的分工在一开始并不明显。
- 因此第一版选择了**动态协调**：agent 根据其他 agent 当下在做什么，来决定自己做什么。

## 扁平自协调的失败：从锁到乐观并发，再到激励塌方

- 初始设计：所有 agent 地位平等，通过一个**共享文件**自协调——查看别人在做什么、认领任务、更新状态；用**锁机制**防止两个 agent 抢到同一个任务。
- 这个设计以几种有意思的方式失败了：
- 机制不可靠：agent 会长时间持锁，或者干脆忘记释放。
- 吞吐塌陷：即便锁工作正常，它本身也成了瓶颈——20 个 agent 的有效吞吐掉到两三个的水平，大部分时间花在等待上。
- 系统脆弱：agent 可能在持锁时崩溃、试图重复获取自己已持有的锁、或者根本不获取锁就直接更新协调文件。
- 第二版用**乐观并发控制**替换锁：agent 可以自由读状态，但如果状态自上次读取后已改变，写入就失败。这更简单也更健壮，但更深的问题依然存在。
- 更深的问题在**激励**而非机制：没有层级（with no hierarchy），agent 变得风险规避（risk-averse）——避开困难任务、只做小而安全的改动；没有 agent 为难题或端到端实现负责，导致工作长时间空转（churning）而没有进展。

## Planner 与 Worker：用角色分离取代平等协商

- 下一版方案是**分离角色**：不再让每个 agent 什么都做，而是搭一条职责分明的流水线。
- **Planner**：持续探索代码库并创建任务；可以为特定领域派生 sub-planner，让规划本身也变得并行且递归。
- **Worker**：领取任务并全神贯注完成它；不与其他 worker 协调，也不操心大局，只是死磕手上这个任务直到完成，然后 push 自己的改动。
- 每个周期结束时，由一个 **judge agent** 判断是否继续；下一轮迭代则从头开始（start fresh）。
- 效果：解决了大部分协调问题，让系统能扩展到非常大的项目，而不会有任何单个 agent 陷入隧道视野（tunnel vision）。

## 跑了数周：四个真实实验

- **从零写一个 web 浏览器**：agent 连续跑了接近一周，跨 1000 个文件写出超过 100 万行代码，源码已开源（仓库 fastrender）。
- 尽管代码库体量巨大，新的 agent 仍然能理解它并做出有意义的推进。
- 数百个 worker 并发向同一个分支 push，冲突极少（minimal conflicts）。
- 作者强调：截图看起来简单，但从零造一个浏览器极其困难。
- **Cursor 自身代码库从 Solid 到 React 的原地迁移**：跑了三周多，改动量 +266K/-193K；仍需仔细 review，但已通过 CI 与早期检查。
- **一个即将发布产品的性能改造**：长时程 agent 用高效的 Rust 版本把视频渲染做快了 **25 倍**，还加上了跟随光标的平滑缩放与平移、自然的弹簧过渡和运动模糊。这部分代码已合并，即将进入生产环境。
- **仍在运行的例子**：Excel，12K commits、1.6M 行代码。

## 他们学到了什么

- **模型选择在极长时程任务上很关键**：GPT-5.2 系列在持续自治工作上明显更好——遵循指令、保持专注、避免漂移（drift）、把事情实现得精确而完整。
- **不同模型擅长不同角色**：Opus 4.5 倾向于更早停手、在方便时走捷径、很快把控制权交还；GPT-5.2 是比 GPT-5.1-Codex 更好的 planner，尽管后者专为编码训练。因此他们现在**按角色选最合适的模型**，而不是用一个通用模型包打天下。
- **很多改进来自减法而非加法**：他们最初为质量控制和冲突解决专门建了 integrator 角色，结果发现它制造的瓶颈比解决的问题更多——worker 本来就有能力自己处理冲突。
- **最好的系统往往比你预期的更简单**：一开始试图照搬分布式计算和组织设计的成熟模型，但发现它们并非都适用于 agent。
- **结构的正确剂量在中间**：结构太少，agent 会冲突、重复劳动、漂移；结构太多，系统会变脆弱（fragility）。
- **prompt 比 harness 和模型更重要**：系统行为中相当大的一部分归结于**怎么给 agent 写 prompt**——让它们协调良好、避免病态行为、长期保持专注，需要大量实验。原文的判断是：the harness and models matter, but the prompts matter more。

## 尚未解决的问题

- 多 agent 协调仍然是一个难题：现在的系统能用，但远非最优。
- 已知的具体缺口：
- planner 应该在自己派出的任务完成时被唤醒，去规划下一步。
- agent 偶尔会跑得太久。
- 仍然需要**周期性的 fresh start** 来对抗漂移和隧道视野。
- 但核心问题的答案比预期更乐观：数百个 agent 能在一个代码库上协作数周，在有野心的项目上取得真实进展。
- 这里发展出的技术最终会反哺 Cursor 自身的 agent 能力。

## 概念网络

### 关键概念

### 长时程自治编码（long-running autonomous coding）

**context**：全文的目标设定——"running coding agents autonomously for weeks"，要处理的是"人类团队通常需要数月完成"的项目。它把 agent 的使用场景从单次会话内的聚焦任务，推到以周为单位的连续自治运行。

**费曼一下**：不是"你问一句它改一段代码"，而是把一个大工程交出去，让 agent 自己连轴转几周，期间没人盯着。时间尺度一变，原本不重要的问题（协调、漂移、责任归属）全都变成主要矛盾。

### 单 agent 的速度天花板

**context**："Today's agents work well for focused tasks, but are slow for complex projects." 这是全文的起点问题：不是做不对，是做不快。

**费曼一下**：一个很强的工程师也架不住项目有三个月的量。瓶颈不在质量而在串行速度，所以下一步只能是并行——而并行立刻把问题从"能力"换成"协作"。

### 动态协调（dynamic coordination）

**context**：Cursor 的第一直觉是"planning ahead would be too rigid"，因为大项目的路径模糊、分工在一开始不明显；于是让 agent 根据其他 agent 当下在做什么来决定自己做什么。

**费曼一下**：不预先排班，大家到现场看着办。听上去灵活，实际是把调度成本平摊给每一个执行者，每个人都得先花时间搞清楚别人在干嘛。

### 共享文件加锁的协调机制

**context**：初版实现——所有 agent 地位平等，通过一个共享文件查看状态、认领任务、更新状态，用锁防止两个 agent 抢同一个任务。

**费曼一下**：像一块公共白板加一支唯一的笔，谁写谁先拿笔。规则很简单，但只要有人拿了笔不还、或者拿着笔晕过去，整块白板就停摆。

### 锁竞争瓶颈（lock contention）

**context**：即使锁本身工作正常，它也成了瓶颈——"Twenty agents would slow down to the effective throughput of two or three, with most time spent waiting."

**费曼一下**：20 个人干活却只有一支笔，多数时间在排队。人手加得再多，产出也卡在那支笔的速度上——这是并行系统最典型的伪扩展。

### 乐观并发控制（optimistic concurrency control）

**context**：第二版机制——agent 可自由读状态，但如果状态自上次读取后发生改变，写入就失败。原文评价是"simpler and more robust"，但"there were still deeper problems"。

**费曼一下**：不再抢笔，而是先写下来再检查"我看到的版本还是最新的吗"，不是就重来。机制上确实更干净，但它只解决了"谁能写"，没解决"谁该扛难活"。

### 无层级导致的风险规避（risk-averse agents）

**context**："With no hierarchy, agents became risk-averse." 它们避开困难任务、只做小而安全的改动，没有 agent 为难题或端到端实现负责，工作长时间 churning 而无进展。

**费曼一下**：一群地位相同、都能自选任务的人，最后往往都去挑最容易交差的那份。难题不是没人能做，是没人被指定要做——协调失败在这里已经不是技术问题，是责任归属问题。

### Planner–Worker 角色分离

**context**：解法性架构——planner 持续探索代码库并创建任务，worker 领任务后"grind on their assigned task until it's done"，不与其他 worker 协调、不操心大局。原文说它"solved most of our coordination problems"。

**费曼一下**：把"想做什么"和"把它做完"拆成两种岗位。执行者不再需要环顾四周，专注度和吞吐同时上来；协调成本被集中到少数规划者身上，而不是每个人身上摊一份。

### 递归并行规划（sub-planner）

**context**：planner "can spawn sub-planners for specific areas, making planning itself parallel and recursive"。

**费曼一下**：规划本身也会堵。所以让规划者按领域再派规划者，规划这件事也并行起来——否则执行端扩容再多，也会被上游那一个大脑限速。

### judge agent 与周期性 fresh start

**context**：每个周期结束时由 judge agent 判断是否继续，下一轮迭代从头开始；文末仍把"periodic fresh starts"列为对抗漂移与隧道视野的必要手段。

**费曼一下**：给长跑加上分段与裁判。跑久了状态会变形，与其修修补补，不如定期清空重来一轮——用"忘记"来对抗积累的偏移，这是长时程系统特有的维护动作。

### 漂移与隧道视野（drift & tunnel vision）

**context**：长时程自治的两种典型退化。原文既用它评价模型差异（GPT-5.2"avoiding drift"），也用它解释为什么仍需要周期性重启，以及为什么角色分离能防止"any single agent getting tunnel vision"。

**费曼一下**：跑得太久，agent 要么慢慢偏离原本的目标（漂移），要么钻进一个局部越挖越深、看不见全局（隧道视野）。两者都不会报错，只会安静地浪费掉几天算力。

### 模型—角色适配

**context**："We now use the model best suited for each role rather than one universal model." 依据是实测差异：GPT-5.2 更能坚持长时自治，Opus 4.5 更容易提前停手走捷径；GPT-5.2 做 planner 优于专为编码训练的 GPT-5.1-Codex。

**费曼一下**：不同模型的"性格"不同，有的适合长期死磕，有的适合快速交付。与其找一个万能模型，不如按岗位选人——而且"编码专用"未必就是最好的规划者。

### 减法式改进（removing complexity）

**context**："Many of our improvements came from removing complexity rather than adding it." 典型证据是专为质量控制与冲突解决建立的 integrator 角色被删除——它制造的瓶颈比解决的问题更多，worker 本来就能自己处理冲突。

**费曼一下**：发现问题就加一个角色，是系统复杂化最常见的路径。但每个新增的中间人都会变成新的排队点。先问"能不能删掉一层"，常常比"再加一层"更有效。

### 结构适量原则

**context**："The right amount of structure is somewhere in the middle." 太少则 agent 冲突、重复劳动、漂移；太多则系统脆弱。同一段还指出，直接照搬分布式计算与组织设计的成熟模型并非都适用于 agent。

**费曼一下**：管得太松，大家互相踩脚；管得太死，一个环节坏掉全线停摆。多 agent 系统的设计不是"越有秩序越好"，而是找到那个中间剂量——而且这个剂量不能从人类组织学直接抄。

### prompt 主导论

**context**："The harness and models matter, but the prompts matter more." 让 agent 协调良好、避免病态行为、长期保持专注，靠的是大量的 prompt 实验。

**费曼一下**：同一套系统、同一批模型，说话方式变了，行为就变了。当执行力不再稀缺时，稀缺的是把意图表达清楚的能力——这是 harness 工程里最便宜也最容易被低估的杠杆。

### 概念网络

![图片为一篇关于AI内参主题精选文档中的一张思想网络图，展示了从单agent速度天花板到长时程自治编码的路径。起始于单agent速度天花板，驱动多agent并行，需动态协调，实现为共享文件加锁，暴露锁竞争瓶颈，催生乐观并发控制等机制。图中还涉及减法式改进、结构适量原则、prompt主导论等支撑点，以及Planner-Worker角色分离、judge agent与周期性重启等关键环节，最终支撑长时程自治编码。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzdjZjk5Mzc0NGI4YjgwNDQ4NTVmNThhMDg4ODg2MzVfOGQwNWNmZTQ1MDkyYjMzYzFmZTAwZDAyNzdkZDQ4NzNfSUQ6NzY3MTAwODA1ODIwNTUzOTUzMF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



这篇文章的思想网络有一条清晰的主干：**问题 → 机制迭代 → 架构重构 → 元经验**。

主干的起点是速度而非能力。「单 agent 的速度天花板」直接驱动出「多 agent 并行」，而并行一旦成立，「动态协调」就成为默认选择——它背后是一个具体判断：大项目路径模糊，提前规划太僵硬。这条因果链解释了 Cursor 为什么先走扁平路线，而不是一上来就分角色。

中段是两轮**机制层面的迭代**，它们之间是演化关系而非并列关系。「共享文件加锁」暴露出「锁竞争瓶颈」——20 个 agent 退化成两三个的吞吐，是并行系统失败最锋利的证据；于是有了「乐观并发控制」。但关键在于：这次替换只把机制修干净了，并没有消灭「无层级导致风险规避」。二者之间是**张力关系**——更好的并发原语解决"谁能写"，解决不了"谁该扛难活"。这是全文最重要的一次转折：协调失败被重新诊断为**责任归属问题**。

诊断变了，解法层次也随之上移。「Planner–Worker 角色分离」不是又一个并发机制，而是一次架构重构，它是全网络的枢纽节点：向下**包含**「递归并行规划」（防止规划端成为新瓶颈）与「judge agent 与周期性重启」（给长跑加上分段与裁判），向上**支撑**「长时程自治编码」这个总目标的成立。

「漂移与隧道视野」是长时程场景独有的退化力量，与总目标之间构成持续张力——它不会报错，只会安静消耗算力。周期性重启正是**对抗**它的手段；而角色分离能防止任何单个 agent 陷入隧道视野，是同一威胁的另一道防线。

最外层是三个**元经验节点**，它们不描述系统组件，而是描述"如何设计这类系统"。「减法式改进」支撑「结构适量原则」——删掉 integrator 角色是"少即是多"的具体实例，而结构适量则把它上升成一般判断：太少则冲突漂移，太多则脆弱；这条原则反过来**支撑**了 Planner–Worker 这个恰好落在中间剂量的架构。与它并列的「prompt 主导论」从另一个方向支撑同一个架构：同样的角色划分，说话方式不同，行为就不同。

「模型—角色适配」是唯一一个绕过架构、直接支撑总目标的节点。它说明长时程自治的成败不只由 harness 决定，也由"把哪个模型放在哪个岗位"决定——这也是为什么原文把它与 prompt 并列写进「我们学到了什么」，而不是写进架构章节。

## 费曼 x3

二十个 agent 一起干活，有效吞吐却掉到两三个的水平——问题不出在模型不够聪明，出在它们全都在排队。把数百个 agent 扔进同一个代码库连续跑几周，最先撞上的从来不是能力的墙，是协调的墙。

平等协商这件事，在 agent 身上比在人身上崩得更快。共用一块白板、抢一支笔，听上去是最自然的分工方式，实际结果是持锁不放、崩溃时锁没释放、干脆绕过锁直接写。就算把锁换成乐观并发控制，把机制修得干干净净，更深的病还在：没有层级，agent 就变得风险规避，躲开难题，只做小而安全的改动，没人对端到端的实现负责，工作长时间空转。这里藏着最值得带走的一句诊断——协调失败常常不是机制问题，是责任归属问题。

真正解开局面的，是放弃"人人平等"，改成角色分工。规划者持续勘察代码库、生成任务，还能派生子规划者让规划本身并行；执行者只管死磕手上那一个任务，不协调、不操心大局，做完就推送。有意思的是，最初的直觉恰恰相反：提前规划"太僵硬"，因为大项目的路径本身模糊。最后救场的却正是显式的规划角色。僵硬的从来不是规划，是把规划做成一次性的。

更值得记的是他们的减法。为质量控制和冲突解决专设的整合者角色被删掉了，因为它制造的瓶颈比解决的问题更多——执行者本来就能自己处理冲突。他们试图照搬分布式计算和组织设计的成熟模型，发现并非都适用于 agent。结构的正确剂量在中间：太少则冲突、重复、漂移，太多则脆弱。

而最后一条结论最该让人停一下：harness 和模型都重要，但 prompt 更重要。系统的大部分行为，最终归结于你怎么跟这些 agent 说话。当你手上有数百个不知疲倦的执行者时，稀缺的东西已经不是算力，而是把意图说清楚的能力。

HOWIE 原清单 · 08

# OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架

**内容说明：**官方主张用尽量少的抽象搭 agent 应用，文档给出核心原语和最小示例。可以和本期 harness 系列对照，看框架派与 harness 派的分歧到底在哪。

**策展人按：**前面那条说「框架不是答案」，官方版本的框架长这样。把对手的陈述原文放进来是刻意的，这场分歧到底是路线之争还是措辞之争，你自己判断。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：OpenAI Agents SDK
- 作者：openai.github.io
- 内参日期：2026-07-31
- 来源类型：blog
- 原文：https://openai.github.io/openai-agents-python/
- 标签：harness engineering, OpenAI

官方主张用尽量少的抽象搭 agent 应用，文档给出核心原语和最小示例。可以和本期 harness 系列对照，看框架派与 harness 派的分歧到底在哪。

## 导读

openai agents SDK

## 核心观点

- OpenAI Agents SDK 的自我定位只有一句话：让你在一个 lightweight、easy-to-use 的包里构建 agentic AI 应用，而且 **with very few abstractions**。「抽象极少」不是谦辞，是它对外宣示的核心竞争力。
- 它不是实验品，而是被明确称为 Swarm（此前的 agent 实验项目）的 **production-ready upgrade**——同一条设计思路，从实验阶段转正。
- 全部地基只有一个 very small set of primitives：Agents、Agents as tools / Handoffs、Guardrails。三者加上 Python 本身，就 powerful enough to express complex relationships between tools and agents。
- 少抽象换来的直接收益是学习曲线：build real-world applications **without a steep learning curve**。这是文档反复回到的那个判据。
- 抽象少不代表运行时薄。SDK 自带 **tracing**，让你可视化和调试 agentic flows，并进一步接上 evaluate 与 fine-tune 模型的链路。

## 三个原语：整个框架的全部地基

- **Agents**：LLMs equipped with instructions and tools。一个 agent 就是「模型 + 指令 + 工具」这三件套的封装，没有更多。
- **Agents as tools / Handoffs**：允许 agent 把特定任务 delegate to other agents。同一个机制有两种叫法与两种用法——把子 agent 当工具调用，或者把控制权整体交接出去。
- **Guardrails**：对 agent 的 inputs and outputs 做 validation。它是横切在输入输出两端的校验层，而不是写在业务逻辑里的 if 判断。
- 组合律是关键：In combination with Python，这三个原语足以表达 tools 与 agents 之间的复杂关系。框架负责给出原语，表达能力交还给宿主语言。

## 两条 driving design principles

- 原则一：**Enough features to be worth using, but few enough primitives to make it quick to learn.**「值得用」和「学得快」被摆成一对需要同时满足的约束，而不是先做大再做减法。
- 原则二：**Works great out of the box, but you can customize exactly what happens.** 默认路径要开箱可用，定制路径要能精确到「究竟发生了什么」，中间不留黑箱。
- 这两条解释了它为什么反复强调 **Python-first**：用 built-in language features 去 orchestrate and chain agents，rather than needing to learn new abstractions。编排逻辑写在 Python 里，而不是写在框架发明的一套 DSL 里。

## SDK 的主要特性：runtime 提供什么

- **Agent loop**：内置的 agent 循环，负责 handles tool invocation、把结果 sends results back to the LLM，并 continues until the task is complete。这是「不用自己写 while 循环」的那一层。
- **Python-first**：用语言自带的能力编排与串联 agent。
- **Agents as tools / Handoffs**：跨多个 agent 协调与委派工作的机制。
- **Sandbox agents**：让 specialist agent 跑在 real isolated workspaces 里，支持 manifest-defined files、sandbox client 选择，以及 **resumable sandbox sessions**（可恢复的沙箱会话）。
- **Guardrails**：input validation 与 safety checks 与 agent execution **并行**运行，检查不通过就 fail fast。并行 + 快速失败是它区别于串行前置校验的地方。
- **Function tools**：把任意 Python 函数变成工具，schema 自动生成，用 **Pydantic** 做校验。
- **MCP server tool calling**：内置 MCP server 工具集成，用法与 function tools 完全一致——两条工具来源在调用面上被统一了。
- **Sessions**：a persistent memory layer，用于在一个 agent loop 内维持 working context。
- **Human in the loop**：跨 agent 运行过程引入人的内置机制。
- **Tracing**：可视化、调试、监控工作流，并支持 OpenAI 的 evaluation、fine-tuning、distillation 工具套件。
- **Realtime Agents**：基于 gpt-realtime-2.1 构建语音 agent，带 automatic interruption detection、context management 与 guardrails。

## Agents SDK 还是 Responses API：一条清晰的分层边界

- 事实前提：SDK 对 OpenAI 模型默认就走 Responses API，它做的事是 **adds a higher-level runtime around model calls**——不是替代品，是套在模型调用外面的一层运行时。
- 直接用 Responses API 的场景：
- 你想自己 own the loop, tool dispatch, and state handling。
- 你的 workflow 是 short-lived 的，主要目的就是拿到模型的一次响应。
- 用 Agents SDK 的场景：
- 你希望由 runtime 去管理 turns、tool execution、guardrails、handoffs 或 sessions。
- 你的 agent 需要 produce artifacts，或者要跨多个协调步骤运行。
- 你需要 a real workspace 或 resumable execution，也就是 Sandbox agents。
- 最重要的一句判断：**You do not need to choose one globally.** 很多应用是混用的——托管型工作流走 SDK，低层路径直接调 Responses API。选择粒度是「路径」而不是「项目」。

## 最小示例与官方给出的上手路径

- Hello world 只有三步：从 agents 导入 Agent 与 Runner，构造一个带 name 与 instructions 的 Agent，然后 Runner.run_sync 跑一次并打印 result.final_output。示例任务是「写一首关于递归的俳句」，文档连模型输出的俳句都一并附上了。
- 运行前提只有一条：确保设置了 OPENAI_API_KEY 环境变量。
- Start here 给的是一条按依赖顺序排列的路径：
- 先用 Quickstart 建一个 text-based agent。
- 再到 Running agents 决定如何 carry state across turns。
- 任务依赖真实文件、代码仓库或隔离的 per-agent workspace 状态时，读 Sandbox agents quickstart。
- 在 handoffs 与 manager-style orchestration 之间摇摆时，读 Agent orchestration。
- 文档还提供了一张 Choose your path 表，服务于「知道自己要做什么、但不知道该看哪一页」的读者——这是一种以任务而非以模块组织文档的索引方式。

## 概念网络

### 关键概念

### very few abstractions（抽象极少）

**context**：这是全文的第一句主张，也是 SDK 的定位宣言——build agentic AI apps in a lightweight, easy-to-use package with very few abstractions。它由「a very small set of primitives」和「without a steep learning curve」两处表述反复印证。

**费曼一下**：每多一层抽象，你就多一次翻译成本：出问题时要把框架的说法翻回你自己的说法。抽象极少的意思是，框架只发明它非发明不可的那几个词，剩下的用你本来就会的语言说。

### primitives（原语）

**context**：文档用 primitives 指称 Agents、Agents as tools / Handoffs、Guardrails 这三个不可再拆的基本构件，并强调 few enough primitives to make it quick to learn。

**费曼一下**：原语就是这套积木里的基本块。块的种类越少，你越快学会；能不能搭出复杂东西，取决于块之间能不能自由组合——这里的组合能力由 Python 提供。

### Agent（装备了指令与工具的 LLM）

**context**：定义极简——Agents, which are LLMs equipped with instructions and tools。Hello world 中一个 Agent 只需要 name 与 instructions。

**费曼一下**：agent 不是一个神秘的智能体，而是「模型 + 一段说明它该做什么的话 + 一组它能调用的工具」的打包。去掉包装，里面就这三样。

### Handoffs / Agents as tools（委派与交接）

**context**：allow agents to delegate to other agents for specific tasks，被列为 a powerful mechanism for coordinating and delegating work across multiple agents。文档在 Start here 里把它与 manager-style orchestration 并列为需要抉择的两种编排风格。

**费曼一下**：一个 agent 干不完的活，可以交给另一个更专的 agent。交法有两种：当成工具调一下再拿回控制权，或者干脆把整场对话交接出去。前者像请教同事，后者像转接电话。

### Guardrails（并行护栏）

**context**：enable validation of agent inputs and outputs；特性清单里进一步说明它 run input validation and safety checks **in parallel with agent execution**，并且 fail fast when checks do not pass。

**费曼一下**：护栏不是排在主流程前面挡路的关卡，而是与主流程同时跑的一条检查线。一旦检查不过就立刻中止，不让错误输入白白消耗一整轮推理。

### Agent loop（内置 agent 循环）

**context**：A built-in agent loop that handles tool invocation, sends results back to the LLM, and continues until the task is complete。它是 SDK 作为 higher-level runtime 的核心承载。

**费曼一下**：模型调工具、拿到结果、再喂回模型、判断是否结束——这个来回的循环谁都要写一遍。SDK 把它内置了，你只描述 agent 是什么，不用描述它怎么转。

### Python-first（以 Python 为先的编排）

**context**：Use built-in language features to orchestrate and chain agents, rather than needing to learn new abstractions。它是两条设计原则在 API 形态上的直接落地。

**费曼一下**：编排逻辑就用普通的 if、for、函数调用写，不用学框架自造的一套流程语言。好处是你原有的调试器、类型检查和测试工具全都还能用。

### Function tools（函数即工具）

**context**：Turn any Python function into a tool with automatic schema generation and Pydantic-powered validation。

**费曼一下**：你写一个普通函数，框架读它的签名自动生成模型能看懂的工具描述，并用 Pydantic 校验模型传来的参数。工具定义与函数定义合并成同一份代码，不再两处维护。

### MCP server tool calling（MCP 工具的同构接入）

**context**：Built-in MCP server tool integration that **works the same way as function tools**。

**费曼一下**：外部 MCP 服务器提供的工具，和你自己写的 Python 函数工具，在调用面上长得一模一样。工具从哪来对 agent 是透明的，这让本地能力和外部能力可以随意互换。

### Sessions（持久记忆层）

**context**：A persistent memory layer for maintaining working context within an agent loop；在 Start here 里对应「decide how you want to carry state across turns」这一步。

**费曼一下**：agent 每一轮都要知道之前发生过什么。Sessions 就是替它保管这份工作记忆的地方，让状态跨轮次延续，而不必每次都把全部历史手工塞回提示词。

### Sandbox agents（隔离工作区与可恢复执行）

**context**：Run specialists inside real isolated workspaces with manifest-defined files, sandbox client choice, and resumable sandbox sessions；文档把「任务依赖真实文件、仓库或隔离的 per-agent workspace 状态」列为读它的触发条件。

**费曼一下**：当 agent 要真的读写文件、跑代码，它需要一间自己的房间，而不是在你的机器上乱翻。沙箱给它这间房间，而且中断之后还能回到原处继续，不用从头再来。

### Human in the loop（人在环中）

**context**：Built-in mechanisms for involving humans across agent runs，与 Guardrails、Tracing 并列为控制面能力。

**费曼一下**：不是所有决定都该让 agent 自己拍板。人在环中是框架预留的插入点，让人在运行过程中确认、修正或叫停，而不是只能在事后看结果。

### Tracing（内置可观测性）

**context**：built-in tracing that lets you visualize and debug your agentic flows, as well as evaluate them and even fine-tune models for your application；特性清单里补上 monitoring，并接入 OpenAI 的 evaluation、fine-tuning、distillation 工具套件。

**费曼一下**：agent 的每一步为什么这么走，事后要能回放。tracing 把这些运行轨迹记录下来，先用于排错，再用于评估，最后这些轨迹本身还能变成微调模型的训练材料——同一份数据在三个环节复用。

### higher-level runtime（模型调用之上的运行时分层）

**context**：The SDK uses the Responses API by default for OpenAI models, but it **adds a higher-level runtime around model calls**；由此引出「own the loop 自己扛」与「让 runtime 管 turns、tool execution、guardrails、handoffs、sessions」的选择表，并以 You do not need to choose one globally 收束。

**费曼一下**：SDK 不是 API 的替代品，而是套在它外面的一层。你要么自己管循环、工具分发和状态，要么把这些交出去。关键在于这个选择是按路径做的：同一个应用里，托管流程走 SDK，低层调用直连 API，两者共存。

### 概念网络

![图片展示了OpenAI Agents SDK的架构图。核心是“抽象极少的轻量agent框架”，其下有层级关系，包括“Handoffs与agent as tool”“Agent原语”“Guardrails并行护栏”等。此外，还有Python-first编排、Agent loop内置循环等分支，以及Function tools、Sessions持久记忆等具体组件。该图与上下文紧密相关，直观呈现了上下文所述的Agent SDK设计选择和架构组成，帮助理解其设计思路和结构。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGQwOTk1NTYwNDM3ZGNiYWNmZGU5YzFiNGNiYTgwMDNfNTg1NzA0NGZkNWFlODY2NzA2MzlmMTVmYzAxODhjZjhfSUQ6NzY3MTAwODA1ODc1MDc5OTA4N18xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



整张网络的枢纽是「抽象极少」这条主张（C1）。它不是一句宣传语，而是决定了下游每一个设计选择：既然要少，就只留三个原语——Agent（C2）、Handoffs（C3）、Guardrails（C4）；既然只留三个，表达复杂关系的重担就必须转移出去，于是有了 Python-first（C6）。**少抽象与强表达力之间的张力，是靠把编排职责还给宿主语言来化解的**，这是全文最重要的一条因果链。

第二层是运行时的展开。Agent 原语一旦成立，Agent loop（C5）就是它的必然推论：既然 agent 是「模型 + 指令 + 工具」，就必然需要一个循环来 handles tool invocation、sends results back to the LLM、continues until the task is complete。Agent loop 因此成为第二个枢纽，其余能力都挂在它周围：Function tools（C7）与 MCP server tool calling（C8）是它的两个工具来源，二者的关系是**同构而非层级**——works the same way as function tools 这句话把外部能力与本地能力拉平；Sessions（C9）为它保存跨轮的 working context；Sandbox agents（C10）把它的执行环境扩展到 real isolated workspaces 并支持 resumable；Human in the loop（C11）在它的运行过程中插入人的判断；Tracing（C12）从它的运行中沉淀出可回放的轨迹。

Guardrails 与 Agent loop 的关系值得单独看：它不是循环的上游或下游，而是与之**并行**（in parallel with agent execution），并以 fail fast 中断循环。这条无向边表达的是一种横切关系——护栏不参与主流程，却随时能叫停主流程。

第三层是分层与取舍。higher-level runtime（C13）封装了 Agent loop 及其全部周边能力，与 Responses API 直调（C14）构成一组明确的对立选项：你要么 own the loop, tool dispatch, and state handling，要么交给 runtime。但这组对立不是排他的——**You do not need to choose one globally**，选择的粒度是路径而不是项目。而 Python-first 在这里扮演了一个微妙角色：它「替代」的正是本该由 runtime 承担的那部分编排抽象，让分层这件事本身变得更薄。

最后有一条回路：Tracing 产出的轨迹不仅用于调试，还接上 evaluate 与 fine-tune。这意味着运行数据反过来改进模型（C12 演化回 C1），框架从「跑一次的工具」变成「越跑越好的闭环」。这条回路是 SDK 敢于宣称 production-ready 而非 experimentation 的底气所在。

## 费曼 x3

一个 agent 框架的成败，往往不取决于它能做什么，而取决于你要先学多少东西才能用上它。抽象是有利息的：每引入一个新概念，出问题时你都要把框架的说法翻回自己的说法，翻译一次，理解就打一次折。OpenAI Agents SDK 把这笔账算得很明白，所以它的第一句自我介绍不是罗列能力，而是承诺代价——with very few abstractions。

代价压到多低？三个原语：Agent 是「装备了指令和工具的 LLM」，handoff 让 agent 把活委派给另一个 agent，guardrail 校验输入输出。剩下的表达能力它不打算自己提供，而是交还给 Python——用 built-in language features 编排和串联 agent，rather than needing to learn new abstractions。这个决定比看起来重要：编排逻辑写在普通的函数和控制流里，你的调试器、类型系统、测试框架就全都还在；写进框架自造的流程语言里，这些工具会集体失效。

少抽象容易被误读成薄，事实恰恰相反：agent loop、sessions、sandbox、human in the loop、tracing 一样不缺。区别在于它们是运行时能力，不是概念负担——替你转那个「调工具、拿结果、喂回模型、判断结束」的循环，而不要求你先接受一套新世界观。最能说明这种克制的是 MCP：外部服务器提供的工具和你自己写的 Python 函数，在调用面上长得一模一样。同构，而不是新增一层。

真正诚实的一段藏在「Agents SDK or Responses API」里。多数框架会说自己是更好的选择，这份文档却先画清边界：想自己 own the loop、tool dispatch 和状态处理，就直接用 Responses API；想让 runtime 管住 turns、guardrails、handoffs 和 sessions，再用 SDK。然后补上一句——You do not need to choose one globally。选择的粒度是路径，不是项目。承认自己不必被全盘采用的框架，反而更可能被真正用起来。

还有一条闭环：tracing 记下的轨迹先用于排错，再用于评估，最后成为微调模型的材料，同一份数据在三个环节复用。抽象的数量原来可以当作产品指标来管理——这大概是这份文档留给所有 harness 设计者的问题：你的框架，究竟发明了几个非发明不可的词？

HOWIE 原清单 · 09

# Anthropic 工程实践：如何为长时间运行的 Agent 应用设计 Harness

**内容说明：**Anthropic 工程团队分享长时间运行 Agent 应用的 harness 设计模式，涵盖状态管理、错误恢复和可观测性

**策展人按：**三月就写了，比这波讨论早得多。放在两派对峙之后，是想说明这事早有人闷头在做，只是当时还没人给它起名。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：Harness design for long-running application development
- 作者：Anthropic
- 内参日期：2026-03-26
- 来源类型：blog
- 原文：https://www.anthropic.com/engineering/harness-design-long-running-apps
- 标签：agentic engineering, agents, agent skills

Anthropic 工程团队分享长时间运行 Agent 应用的 harness 设计模式，涵盖状态管理、错误恢复和可观测性

## 导读

Anthropic 官方技术 blog，值得精读

## 🎯 核心主旨

作者 Prithvi Rajasekaran（Anthropic Labs）分享了如何通过 **harness 设计**（harness = 围绕模型的编排脚手架）突破长时间运行 Agent 应用的性能天花板。核心洞察：受 GAN 启发，将「生成」与「评估」分离为独立 agent，构建多 agent 架构，能显著提升 Agent 在主观任务（前端设计）和客观任务（全栈开发）上的输出质量。

## 📐 思想框架

- **问题定义** → **失败模式分析** → **GAN 启发的解决方案** → **前端设计实验验证** → **全栈开发扩展** → **简化与模型迭代** → **通用原则提炼**

## 起点：两个交织的问题

- 让 Claude 产出**高质量前端设计**
- 让 Claude **无需人工干预**地构建完整应用
- 早期通过 prompt engineering 和 harness 设计取得进展，但都撞上了天花板
- 为了突破瓶颈，作者在两个截然不同的领域（主观审美 vs 可验证的正确性）寻找通用的 AI 工程方法

## 长时间运行 Agent 的两大失败模式

**失败模式 1：上下文窗口填满后失去连贯性**

- 随着 context window 填满，模型倾向于失去连贯性
- 部分模型还会出现 **"context anxiety"**（上下文焦虑）——在接近自认为的上下文极限时提前收尾工作
- 解决方案：**context resets**（上下文重置）——彻底清空上下文窗口，启动全新 agent，配合结构化的 handoff 传递前一个 agent 的状态和下一步计划
- Context reset vs Compaction（压缩）的区别：
- Compaction：原地总结早期对话，同一个 agent 继续在缩短的历史上工作。保持了连续性，但没有给 agent 一个 "clean slate"，context anxiety 仍可能存在
- Reset：给 agent 一个全新起点，代价是 handoff artifact 必须包含足够的状态信息
- Sonnet 4.5 的 context anxiety 严重到 compaction 不够用，必须用 context reset

**失败模式 2：自我评估失败**

- Agent 评估自己的作品时，倾向于**自信地赞美**——即使质量明显平庸
- 在主观任务（如设计）上尤其严重，因为没有二元化的验证手段
- 即使在有可验证结果的任务上，agent 也会展现出糟糕的判断力
- 关键杠杆：**将做事的 agent 和评判的 agent 分离**
- 分离本身不能消除宽容倾向，但调教独立 evaluator 使其变得严格，远比让 generator 自我批评更可行
- 一旦外部反馈存在，generator 就有了具体的迭代目标

## 前端设计实验：GAN 启发的 Generator-Evaluator 循环

**两个关键洞察：**

1. 审美无法完全量化为分数，但可以用**编码了设计原则和偏好的评分标准**来改进。"Is this design beautiful?" 难以一致回答，但 "does this follow our principles for good design?" 给了 Claude 具体的评判依据
2. 将前端生成与前端评分分离，创造出**驱动 generator 产出更强输出的反馈循环**

**四项评分标准（同时给到 generator 和 evaluator）：**

1. **Design quality**（设计质量）：设计是否感觉像一个连贯的整体，而非零件拼凑？颜色、字体、布局、图像是否融合为独特的氛围和身份？
2. **Originality**（原创性）：是否有定制化的决策痕迹，还是模板布局、库默认值和 AI 生成的套路？明确惩罚 "AI slop" 模式（紫色渐变覆盖白色卡片等）
3. **Craft**（工艺）：技术执行——字体层级、间距一致性、配色和谐、对比度。这是能力检查而非创意检查
4. **Functionality**（功能性）：独立于审美的可用性

- 着重加权 design quality 和 originality（Claude 默认已擅长 craft 和 functionality）
- 通过 few-shot 示例 + 详细评分分解来校准 evaluator，确保判断对齐作者偏好

**实验循环：**

- 基于 Claude Agent SDK 构建
- Generator 生成 → Evaluator 用 Playwright MCP 实际浏览页面、截图、评分 + 写详细批评 → 反馈回 Generator 迭代
- 每次生成 5-15 次迭代，完整运行可达 4 小时
- Generator 在每轮评估后做战略决策：如果分数趋势好就精炼当前方向，否则彻底转向新的美学方向

**关键发现：**

- 评分标准的措辞会以意想不到的方式引导 generator（如 "museum quality" 推动设计向特定视觉方向收敛）
- 分数提升模式并非总是线性的——作者经常更偏好中间迭代而非最终版本
- 即使第一次迭代，输出也已显著优于无任何 prompting 的基线，说明**标准本身**就能引导模型远离泛化默认
- 荷兰艺术博物馆案例：第 9 次迭代是符合预期的暗色主题着陆页，第 10 次迭代突然推翻整个方案，重新想象为 3D 空间体验——CSS 透视渲染的棋盘格地板、自由悬挂的画作、门廊式导航。这种创造性飞跃在单次生成中从未见过

## 全栈开发：三 Agent 架构

**架构组成：**

1. **Planner**（规划者）：接收 1-4 句话的简单 prompt，扩展为完整产品规格。被提示要在范围上保持雄心，聚焦产品上下文和高层技术设计而非详细实现（避免上游错误级联）。还被要求在产品规格中编织 AI 功能
2. **Generator**（生成者）：按 sprint 工作，每次从规格中选取一个功能实现。使用 React + Vite + FastAPI + SQLite 技术栈。每个 sprint 结束后自我评估再交给 QA
3. **Evaluator**（评估者 / QA）：用 Playwright MCP 像用户一样点击运行中的应用，测试 UI 功能、API 端点和数据库状态。对每个 sprint 按标准打分，低于阈值则退回并给出详细反馈

**Sprint Contract 机制：**

- 每个 sprint 开始前，generator 和 evaluator 协商 "sprint contract"——在写任何代码前达成 "done" 的定义
- Generator 提出要构建什么 + 如何验证成功，evaluator 审核确保方向正确
- 双方迭代直到达成共识
- 通信通过文件进行：一个 agent 写文件，另一个读取并回应

**复古游戏制作器对比实验（Opus 4.5）：**

- Solo agent：20 分钟，\$9 → 表面看起来可以但核心功能（游戏可玩性）完全损坏
- Full harness：6 小时，\$200 → 功能丰富、视觉一致、核心功能可用（虽有物理引擎粗糙边缘）
- Evaluator 在每个 sprint 逐条验证 contract 标准（Sprint 3 单独就有 27 项标准），发现的问题具体到可直接修复

**调教 Evaluator 的挑战：**

- 开箱即用的 Claude 是糟糕的 QA agent——会发现问题然后说服自己 "不是大问题" 并通过
- 测试倾向于浅层，深层 bug 容易溜掉
- 调教循环：阅读 evaluator 日志 → 找到其判断偏离作者判断的例子 → 更新 QA prompt
- 经过多轮才达到合理水平，但仍有验证空间可以通过进一步调教捕获

## 简化 Harness：与模型能力共同演进

**核心原则：**

- harness 中的每个组件都编码了一个关于「模型自身做不到什么」的假设，这些假设值得不断压力测试——因为它们可能是错的，也可能随着模型进步而过时
- "find the simplest solution possible, and only increase complexity when needed"（来自 Building Effective Agents）

**Opus 4.6 带来的简化空间：**

- 移除了 sprint 结构（Opus 4.6 能原生处理长任务的分解）
- Evaluator 从逐 sprint 评审改为构建结束后的单次评审
- 保留了 planner（没有 planner 时 generator 会 under-scope）和 evaluator

**Evaluator 的动态价值：**

- Evaluator 不是固定的 yes-or-no 决定
- 当任务处于模型可靠独立完成的边界之内时，evaluator 是不必要的开销
- 当任务超出该边界时，evaluator 仍然提供真实的提升
- 随着模型能力提升，这个边界在外移，但 evaluator 对边界外的任务始终有价值

**DAW（数字音频工作站）实验（Opus 4.6 + 简化 harness）：**

- 一句话 prompt → 约 4 小时，\$124.70
- Generator 连续运行 2 小时以上无需 sprint 分解
- QA 仍然捕获了真实缺陷（功能只有展示没有交互深度、音频录制是 stub 等）
- 最终产出：浏览器中的功能性音乐制作程序，集成 AI agent 可通过 prompt 驱动创作

## 通用教训

1. **始终实验**：对你所构建的模型进行实验，阅读其在真实问题上的 traces，调优以达到期望结果
2. **分解与专化**：对于复杂任务，将任务分解并对每个方面应用专门的 agent，有时能带来额外空间
3. **随模型迭代 harness**：新模型发布时，重新审视 harness——剥离不再承重的部分，增加新能力
4. **harness 的有趣组合空间不会随模型进步而缩小——它会移动**。AI 工程师的有趣工作是持续找到下一个新组合

## 概念网络

### 核心概念解析 (Core Concepts)

- **【Harness】(编排脚手架)**
- **context**：

every component in a harness encodes an assumption about what the model can’t do on its own, and those assumptions are worth stress testing, both because they may be incorrect, and because they can quickly go stale as models improve.

- **费曼一下**：Harness 是围绕 LLM 构建的编排层——它不是模型本身，而是决定模型以什么顺序、以什么角色、在什么约束下工作的外部结构。每个 harness 组件本质上都是一个关于「模型自己做不到什么」的假设，这些假设需要随模型进化不断重新审视。
- **【Context Anxiety】(上下文焦虑)**
- **context**：

Some models also exhibit “context anxiety,” in which they begin wrapping up work prematurely as they approach what they believe is their context limit.

- **费曼一下**：模型在长任务中会产生一种「假想性上下文窗口即将耗尽」的幻觉，导致提前收尾、草草了事。这不是真的上下文窗口满了，而是模型自己「以为」要满了。Sonnet 4.5 表现尤为严重，单纯的 compaction 不足以解决，必须用 context reset。
- **【Context Reset vs Compaction】(上下文重置 vs 上下文压缩)**
- **context**：

This differs from compaction, where earlier parts of the conversation are summarized in place so the same agent can keep going on a shortened history. While compaction preserves continuity, it doesn’t give the agent a clean slate, which means context anxiety can still persist. A reset provides a clean slate, at the cost of the handoff artifact having enough state for the next agent to pick up the work cleanly.

- **费曼一下**：两种处理上下文窗口溢出的策略。Compaction 是「原地总结」——把早期对话压缩，同一个 agent 继续工作，优点是连续性，缺点是 context anxiety 仍在。Reset 是「重新开始」——彻底清空上下文，启动新 agent，通过 handoff artifact 传递状态。代价是编排复杂度和 token 开销，但能彻底消除 context anxiety。
- **【Generator-Evaluator Loop】(GAN 启发的生成-评估循环)**
- **context**：

Taking inspiration from Generative Adversarial Networks (GANs), I designed a multi-agent structure with a generator and evaluator agent. … Separating the agent doing the work from the agent judging it proves to be a strong lever to address this issue.

- **费曼一下**：借鉴 GAN 的对抗思想：一个 agent 生成，另一个 agent 评判，形成反馈循环。核心价值不在于分离本身能消除宽容倾向，而在于调教一个独立的 evaluator 变得严格，远比让 generator 自我批评更容易。一旦外部反馈存在，generator 就有了具体的迭代目标。
- **【Self-evaluation Failure】(自我评估失败)**
- **context**：

When asked to evaluate work they’ve produced, agents tend to respond by confidently praising the work—even when, to a human observer, the quality is obviously mediocre.

- **费曼一下**：Agent 对自己的作品存在系统性的「自我感觉良好」偏差。这在主观任务（如设计）上尤其突出，因为没有二元化的通过/不通过测试。但即使在有客观验证的任务上，agent 也会展现糟糕判断力。这是 Generator-Evaluator 分离的核心动因。
- **【Grading Criteria】(评分标准体系)**
- **context**：

“Is this design beautiful?” is hard to answer consistently, but “does this follow our principles for good design?” gives Claude something concrete to grade against.

- **费曼一下**：将主观判断转化为可操作的评分框架。作者设计了四个维度（Design quality、Originality、Craft、Functionality），并着重加权前两项（因为 Claude 默认已擅长后两项）。关键发现：标准的措辞会以意想不到的方式引导输出方向，即使在第一次迭代就能把模型从泛化默认中拉出来。
- **【AI Slop】(AI 泛化输出)**
- **context**：

Unmodified stock components—or telltale signs of AI generation like purple gradients over white cards—fail here.

- **费曼一下**：指 AI 生成的「一看就知道是 AI 做的」的平庸输出——模板布局、库默认值、紫色渐变覆盖白色卡片等典型模式。作者在 Grading Criteria 中明确惩罚这类模式，以推动模型走向真正的创造性决策。
- **【Sprint Contract】(冲刺合同)**
- **context**：

Before each sprint, the generator and evaluator negotiated a sprint contract: agreeing on what “done” looked like for that chunk of work before any code was written.

- **费曼一下**：在 generator 写任何代码之前，先和 evaluator 就「什么算完成」达成书面共识。这桥接了高层产品规格和可测试实现之间的鸿沟，确保 generator 构建的是正确的东西，且 evaluator 有明确的验收标准。
- **【Planner-Generator-Evaluator 三 Agent 架构】**
- **context**：

The final result was a three-agent architecture—planner, generator, and evaluator—that produced rich full-stack applications over multi-hour autonomous coding sessions.

- **费曼一下**：将软件开发生命周期拆分为三个专业化角色：Planner 负责将简单 prompt 扩展为完整规格（重范围而非实现细节）；Generator 按 sprint 逐功能实现；Evaluator 像真实用户一样测试应用。三者分工明确，通过文件通信。
- **【Handoff Artifact】(交接工件)**
- **context**：

Context resets—clearing the context window entirely and starting a fresh agent, combined with a structured handoff that carries the previous agent’s state and the next steps—addresses both these issues.

- **费曼一下**：在 context reset 时，上一个 agent 留给下一个 agent 的结构化状态文件。它必须包含足够的信息让新 agent 能干净利落地接手工作。质量好坏直接决定 context reset 的效果。
- **【Harness 简化原则】(Harness Simplification)**
- **context**：

find the simplest solution possible, and only increase complexity when needed. … every component in a harness encodes an assumption about what the model can’t do on its own.

- **费曼一下**：不要假设 harness 的复杂度是永久必要的。每次新模型发布时，应该逐一移除组件观察影响，剥离不再承重的部分。作者从 Opus 4.5 到 4.6，移除了 sprint 结构和逐 sprint 评审，但保留了 planner 和 evaluator。关键洞察：harness 的有趣组合空间不会随模型进步而缩小——它会移动。

### 概念网络 (Concept Network)

![这张概念网络图呈现了AI Agent应用设计的关联架构，由Codex依据原文概念网络整理。图中各概念存在明确的关系指向：自我评估失败直接驱动生成—评估循环，评分标准体系支撑生成—评估循环；上下文焦虑直接驱动上下文重置，上下文重置依赖交接工件；冲刺合同桥接规划—生成—评估协作，Harness简化原则约束该协作，模型能力提升会促使重新审视组件，简化原则还会随模型能力提升逐步剥离冗余组件，AI泛化输出会被评分标准体系明确惩罚，所有概念共同指向模型能力与Harness设计需共同演进的核心论点。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTU5OGZkNmY4Njc5ZDFlZDM2MTQ4MDQ3OTE0ODk2NzFfMjk4MDM4Y2Q1M2E1OWVlYzk4NGIzNzYyNmUwMGY2YjRfSUQ6NzY3MTAwODA0NjE0Njk0ODI3Nl8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

- **Self-evaluation Failure** →（直接驱动）→ **Generator-Evaluator Loop**：自我评估失败是核心痛点，生成-评估分离是其解法
- **Context Anxiety** →（直接驱动）→ **Context Reset**：上下文焦虑迫使采用重置而非压缩
- **Context Reset** →（依赖）→ **Handoff Artifact**：重置的效果取决于交接工件的质量
- **Grading Criteria** →（支撑）→ **Generator-Evaluator Loop**：标准体系是 evaluator 能发挥作用的前提，也直接影响 generator 的输出方向
- **AI Slop** →（被惩罚）→ **Grading Criteria**：标准明确惩罚泛化输出，推动模型走向原创
- **Sprint Contract** →（桥接）→ **Planner ↔ Generator ↔ Evaluator**：在高层规格和具体实现之间建立共识
- **Harness 简化原则** →（约束）→ 整个架构：随模型能力提升，逐步剥离不再承重的组件（如从 Opus 4.5 到 4.6，移除了 sprint 结构和 context reset）
- **总体关系**：所有概念共同服务于一个核心论点——**模型能力和 harness 设计是共同演进的关系**。模型越强，某些 harness 组件会变得多余，但同时新的、更复杂的任务空间也被打开，需要新的 harness 组合来征服。

HOWIE 原清单 · 10

# 2026 AI 工程五大趋势：从模型能力转向可靠系统

**内容说明：**AI Engineer World's Fair 显示行业重心正从自主 Agent 转向 harness、loop engineering、前线工程师与 skills。竞争焦点已经变成如何让 Agent 在真实生产环境中稳定工作。

**策展人按：**个人观点到这儿变成了行业读数。一场大会的重心转移，比十篇雄辩更能说明这个词不是自嗨。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：5 Trends That Defined AI Engineering at World’s Fair 2026
- 作者：Latent.Space
- 内参日期：2026-07-16
- 来源类型：blog
- 原文：https://www.latent.space/p/aiewf26trends
- 标签：agentic engineering, harness engineering

AI Engineer World's Fair 显示行业重心正从自主 Agent 转向 harness、loop engineering、前线工程师与 skills。竞争焦点已经变成如何让 Agent 在真实生产环境中稳定工作。

## 导读

2026 AI 工程的趋势

## 核心观点

2026 年 AI 工程的重心已经从“模型能不能成为 Agent”转向“怎样让 Agent 在真实系统中长期、可靠、可控地工作”。2023 年的 AutoGPT、prompt engineering 和早期 orchestration framework 主要证明自治可能性；如今 Claude Code、Codex、Gemini CLI、Cursor、Warp 已进入日常开发，工程难点变成 harness、context、permissions、persistent state、evals、loop、secure sandbox 和生产集成。

文章从 AI Engineer World’s Fair 归纳五大趋势：关注 Agent 周围的系统；用 loop engineering 建立新控制层；由 FDE 把 AI 带进企业；coding agent 取代 IDE 成为主要开发接口；skills 成为平台共同原语。五者共同指向一个结论：AI engineering 不再只是新职位，而正成为软件工程本身的下一阶段。

## 背景：三年内从 Prompt Engineering 到主流软件工程

- 2023 年 6 月，swyx 提出“AI engineer”，试图命名大模型爆发后出现的新型开发者。当时行业甚至还习惯称这一交叉领域为 prompt engineering。
- 三年后，是否每家公司正式设立 AI Engineer 职位已不再重要。coding agents、harness、context management、model output evaluation 和 autonomous system orchestration 已进入主流软件开发。
- 2023 年会议关注 AutoGPT、BabyAGI、GPT-Engineer，讨论如何移除人；2026 年几乎不再谈 AutoGPT，而集中讨论 Claude Code、Codex、Gemini CLI、Cursor、Warp 及生产基础设施。
- 这不是 Agent 热潮消退，而是工程成熟：从展示单次自治 demo，转向构建可被组织长期信任的系统。

## 趋势一：关注点从 Agent 转向 Agent 周围的系统

- Lilian Weng 2023 年的《LLM Powered Autonomous Agents》把 Agent 分解为 planning、memory、tool use；2026 年新文章《Harness Engineering for Self-Improvement》则把重点转到模型周围的 harness。
- Harness 负责 workflow、context、permissions、evaluation、persistent state 与 continuous improvement。模型能力只是系统的一部分，可靠交付来自外围结构。
- 完全自治不仅不可靠，在规模化场景中也未必可取。大会更常把 Agent 定位为增强 AI engineer，而不是彻底替代人。
- OpenAI 的 Romain Huet 用“software ate the world, AI ate software, AI engineers are eating the world”描述新的工程主体：人通过 Agent 放大交付范围。
- Anthropic 的 Thariq Shihipar 说“models are grown, not designed”，能力会 spiky 地增长。正因为前沿公司也不能完全预测模型变化，外部评估、监控和控制系统更重要。

## 趋势二：Loop Engineering 成为新的控制层

- 多位工程师把系统拆成 inner loop 与 outer loop。Inner loop 由 Agent 与用户或环境交互并执行主要工作；outer loop 研究、维护和改进这个执行系统。
- Introspection 的 Roland Gavrilescu 用 autoresearch 描述 outer loop：它读取反馈信号、evals 和 human input，持续研究 primary system。
- Addy Osmani 概括为：“agents can run much more of the inner execution loop, but that outer loop is still engineering。”
- OpenClaw 作者 Peter Steinberger 也采用同样分工：Agent 运行 inner execution loop，他在 outer loop 设方向、做决定。
- 争议在于 loop 是否足够可靠。HumanLayer 的 Dex Horthy 认为“hype is outrunning discipline”，并对比 Kubernetes 的 deterministic control loop；Ralph Loop 作者 Geoffrey Huntley 则把开发者比作 locomotive engineer，职责是让火车留在轨道上。

## Loop Engineering 的真正控制对象

- 人不必介入 Agent 每一步操作，但要设计反馈、失败检测、终止条件、升级路径和人工检查点。
- Inner loop 追求执行速度和自治，outer loop 追求方向、质量与系统改进。两层职责不同，不能把“人不在每一步”误写成“系统不需要人”。
- 非确定性模型不能直接套用传统控制循环。传统系统状态和规则较稳定，Agent 输出分布、工具调用和能力边界会随模型变化。
- 因此 loop engineering 是对自治的新约束方法：不是把 Agent 锁死，而是让它能跑，同时保留可观测、可评估和可纠偏的边界。
- 文章对 loops 保持审慎：这是 frontier thinking，下一年可能出现大量 factory 与 loop 失败案例，工程纪律仍未定型。

## 趋势三：AI Engineering 进入企业

- 企业落地常通过 Forward Deployed Engineer（FDE）完成。FDE 不只是部署模型，而是与组织共同实现 integrations、cloud agents、long-running agents、automations 和基于 SDK 的应用。
- Sierra 的 Natalie Meurer 指出，每家企业都想知道怎样维护 agentic ecosystem 的全部能力，包括多团队贡献和大量集成。
- Cursor 的 Pauline Brunet 把成功标准设为 strict ROI：FDE 离开后，客户不会关闭系统。这要求 Agent 真正进入工作流，而非停留在演示。
- “Software factory”描述长时间运行的 Agent 覆盖软件生命周期。企业必须选择自动化哪些 repository 和环节，以及在 code review、高风险变更等位置何时引入人。
- Enterprise adoption 仍集中在 early adopters，FDE 还需找到组织内 champion。技术可用并不等于组织具备治理、信任与变革条件。

## 企业级 Context Engineering

- Atlan 的 Prukalpa Sankar 把 context engineering 描述为：业务系统中的 context 先流入 shared company brain，再通过 MCP、API 和 retrieval 流向 agents、copilots 与 apps。
- 企业难题不只是“给模型更多资料”，而是让数据在权限正确、版本可靠、来源可追踪的情况下流动。
- Software factory 的自动化边界因组织与 codebase 而异：某些团队允许自动 review，另一些对特定风险必须人工审批。
- 这使 FDE 成为技术与组织之间的翻译者，既需要集成系统，也要共同定义 ROI、治理与人机分工。
- 企业 AI 的成败最终取决于系统能否在 FDE 离开后持续运行、被内部维护，并融入正式责任结构。

## 趋势四：Coding Agent 正取代 IDE 成为开发者接口

- 2023 年 AI 编程主要是 GitHub Copilot 自动补全几行代码，开发者仍亲自编写绝大多数实现。
- 2026 年 coding agent 能理解广泛目标、探索 codebase、修改多个文件、运行测试、调试失败并迭代，然后把结果交给开发者。
- Claude Code、Codex、Gemini CLI、Cursor、Warp 因此不再只是 IDE plugin，而是在成为开发者操作软件生产的主要接口。
- Vercel 的 Andrew Qu 称 Agent 是“a new type of software”：基础设施可能像 web app，但 interaction、interface 和 outputs 更动态、更不可预测。
- 一年前行业还未意识到 secure code execution、sandbox 与 long-running jobs 会如此重要。生产经验不断扩大 framework 需要承担的职责。

## Factory 与 Orchestra：人怎样留在 Flow 中

- Software factory 强调 Agent 团队规模化执行；Conductor CEO Charlie Holtz 更偏爱 orchestra 比喻，希望人站在乐团前挥动指挥棒，而不是被工厂流程隔离。
- 两个比喻代表不同设计价值：factory 追求自动化、吞吐和标准流程；orchestra 强调人的控制感、创造力与实时协作。
- Geoffrey Huntley 即使支持 loopmaxxing，也担心行业过度自动化，明年可能发现 factory 和 loop 大量失败。
- 因而 coding agent 取代 IDE，不等于开发者退出。人的接口从直接编辑每行代码，迁移到目标设定、任务分解、审查、风险判断和多 Agent 调度。
- 好的开发体验应让人感到掌控和“in the flow”，而不是只给出一个看不见过程的自动化黑箱。

## 趋势五：所有 Agent 平台都围绕 Skills 建设

- Anthropic 推广 agent skills 后，skills 成为大会最热门主题之一。Addy Osmani 将其定义为编码 senior engineer 的 workflows、quality gates 和 best practices。
- Vercel 的 Andrew Qu 称 skills 是“portable, on-demand knowledge”；Roland Gavrilescu 认为行业已从 agent tools 转向 agent skills。
- Google DeepMind 的 Philipp Schmid 展示 skills 与 declarative Markdown 如何实现 “agents without code”：用文件扩展能力，减少过去常由 Python 编写的 orchestration code。
- Skills 不只提供知识，也保存操作顺序、验收门槛与组织经验。Y Combinator 的 Garry Tan 观察到 AI-native 公司把销售、支持、财务流程编码为 skills，并雇工程师维护 skills、处理它们尚不能完成的工作。
- Skills 因而成为 Agent 平台的组织记忆和可移植流程层，但仍需要专业维护，不是“一写永用”的 prompt 文档。

## Skill Engineering 的风险与纪律

- Paul Bakaus 的 Impeccable 用 design skills 为 coding agent 提供界面设计词汇，并提出 skill engineering 作为独立学科。
- 他警告大多数 skill 和 model 不够有创造力；多人使用同一 skill 时会向单一方向收敛，导致所有设计相似。
- Matt Pocock 把管理混乱称为 “skills hell”，类比 framework hell，并建议写更少、更小的 skills，投入更多结构设计。
- “Autonomy without structure creates as much slop as leverage。”Skills 提供 structure，但结构本身必须被重新审视，而不是堆积更多文件。
- 新模型发布后，Agent 像从初中升入高中，原 curriculum 需要重写。Skill 必须随模型能力、工具和工作流共同迭代，旧 scaffold 可能限制新能力。

## 五大趋势构成同一套可靠系统工程

- Harness 定义 Agent 周围的运行边界；loops 把执行与监督拆层；FDE 将系统嵌入企业；coding agent 成为交互入口；skills 保存可移植知识和流程。
- 这些趋势不是平行热词，而是生产系统的五个层面：运行时、控制、组织落地、人机接口和可复用能力。
- Agent 已经能工作并开始规模化，工程问题因此从“是否可能”升级为可靠性、可维护性、治理、ROI 和持续改进。
- AI engineer 的职责也从写 prompt 迁移到设计系统：选择自动化边界、构建反馈循环、管理 context、定义 evals、维护 skills 和编排 Agent 团队。
- 2026 年的关键信号不是 Agent 终于取代人，而是软件工程开始围绕非确定性智能组件重新组织。

## 概念网络

### 关键概念

### Harness Engineering

**context**：负责 workflow、context、permissions、evaluation、persistent state 和 continuous improvement 的 Agent 外围系统，成为 2026 年工程重心。

**费曼一下**：模型像发动机，harness 是方向盘、刹车、仪表盘和车架。发动机再强，没有完整车辆也不能可靠上路。

### Capability Overhang

**context**：Anthropic 认为模型是“grown, not designed”，能力会 spiky 地出现，工程师无法完全预测何时增长或怎样组合。

**费曼一下**：模型像植物突然长出新枝，人不完全知道下一步会长哪里，所以要用测试和监控不断重新认识它。

### Inner Loop

**context**：Primary Agent 与用户、代码和工具交互，完成主要执行工作的循环，可在较少人工干预下长期运行。

**费曼一下**：像生产线本身，负责不断拿任务、加工、测试和修正，追求高效完成工作。

### Outer Loop

**context**：研究、监督和维护 primary system 的循环，汇集反馈、evals 与 human input，并由人设定方向和重要决定。

**费曼一下**：像工程团队观察生产线数据、调整工艺、处理异常。它不亲自做每个零件，却决定系统怎样变好。

### Loop Engineering

**context**：把 inner execution 与 outer oversight 设计成可反馈、可纠偏的系统，成为人控制非确定性 Agent 的新方法。

**费曼一下**：不是每一步都牵着 Agent，而是设计好轨道、信号灯、检查站和紧急制动，让它能独立跑又不会失控。

### Forward Deployed Engineer

**context**：FDE 进入客户组织，落地 integrations、long-running agents、automations 与 apps，并以可持续 strict ROI 为成功标准。

**费曼一下**：不是交付一盒软件就走，而是工程师驻场理解真实流程，把 AI 接进去，直到客户自己能维护且确实愿意继续使用。

### Software Factory

**context**：长时间运行的 Agent 覆盖软件生命周期，企业选择自动化 repository、阶段及人工检查点。

**费曼一下**：把写、测、审和部署组织成 Agent 生产线，但每家公司仍要决定哪些工位全自动、哪些必须人签字。

### Orchestra Interface

**context**：相对于 factory，比喻强调人仍在 flow 中，像指挥家一样设目标、协调多个 Agent 并保有创造控制感。

**费曼一下**：Agent 是乐手，人不必演奏每个音符，但要决定曲目、速度、配合和最终表达。

### Agent as a New Type of Software

**context**：Agent 的基础设施可像 web app，但 interaction、interface、outputs 更动态，需要 sandbox、secure execution 和 long-running job 支持。

**费曼一下**：传统软件像固定售货机，Agent 更像能临场处理任务的员工；同样需要场地，却不能用完全固定的输入输出规则管理。

### Skills

**context**：以 Markdown 等声明文件编码 senior engineer 的 workflow、quality gates 与 best practices，提供 portable, on-demand knowledge。

**费曼一下**：Skill 像给 Agent 的作业手册，不只告诉它知道什么，还写清楚按什么步骤做、做到什么标准才算完成。

### Skills Hell

**context**：Skill 数量膨胀、结构混乱、相互冲突或长期不维护，会像 framework hell 一样降低 Agent 可靠性。

**费曼一下**：手册太多、太长、互相矛盾时，员工反而不知道该听谁的。更少、更小且结构清楚的规则更有效。

### Model-relative Curriculum

**context**：模型能力升级像学生升学，原 skill 与 scaffold 需要重写；旧规则可能无法发挥新模型，甚至成为限制。

**费曼一下**：高中生不该继续用小学教材。Agent 变强后，流程也要升级，否则能力增长会被过时规则锁住。

### 概念网络

![图片展示了Harness Engineering对模型能力非线性增长的应对策略。模型能力非线性增长需可靠外围系统，Harness工程引出控制层；模型相对课程随模型升级重写，失控会形成Skills失控，两者连接；前沿部署工程师连接接入真实业务、企业流程，与软件工厂/Orchestra界面连接；Loop工程组织主要执行内部执行循环，组织监督与反馈外部监督循环，且与Harness工程、Skills失控连接。该图与上下文紧密相关，直观呈现了应对策略的逻辑关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTZlMDdhYzgyMWYzZDRjMzA1ZGY2YzE1NTMyOTJmYWVfNTM3OGZiMDQyZGYxNzM2YTAwMTU3MGUzZDczMzVkNDdfSUQ6NzY3MTAwODA0MzQ0MTYzODU5NF8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

**Harness Engineering** 回应模型的 **Capability Overhang**：既然能力非线性增长且不可完全预测，就必须用 context、permissions、evals 和 state 把模型嵌入可靠系统。系统内部再通过 **Loop Engineering** 分出 **Inner Loop** 与 **Outer Loop**，让 Agent 承担更多执行，同时由工程层持续监督、反馈和决定方向。

当这套系统进入组织，**Forward Deployed Engineer** 负责把抽象能力接入真实业务，并以 ROI 和可维护性收尾。落地形态一端是追求规模化的 **Software Factory**，另一端是强调人类控制感的 **Orchestra Interface**；二者共同承认 Agent 已成为 **Agent as a New Type of Software**，需要新的基础设施与人机接口。

**Skills** 则把组织知识、工作流与 quality gate 变成可移植文件，连接 harness、loop 和企业流程。但 skills 也可能积累成 **Skills Hell**，或让不同 Agent 输出趋同，所以必须保持小而清楚，并按 **Model-relative Curriculum** 随模型更新。

五大趋势由此闭合：模型能力驱动 Agent，harness 提供运行结构，loops 提供控制，FDE 提供组织落地，coding agent 提供日常接口，skills 提供可复用经验。AI 工程的核心不再是调用一次聪明模型，而是维护一个能持续工作的社会技术系统。

HOWIE 原清单 · 11

# OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness

**内容说明：**OpenAI 更新 Agents SDK，为开发者提供原生沙箱执行与 model-native harness，专门服务于跨文件、跨工具的长时间运行 agent。

**策展人按：**有意思的是，那个被点名的框架派自己也在往这边走。分歧收窄的过程，往往比分歧本身更值得看。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：The next evolution of the Agents SDK | OpenAI
- 作者：OpenAI
- 内参日期：2026-04-17
- 来源类型：blog
- 原文：https://openai.com/index/the-next-evolution-of-the-agents-sdk/
- 标签：agents, harness engineering, agentic engineering

OpenAI 更新 Agents SDK，为开发者提供原生沙箱执行与 model-native harness，专门服务于跨文件、跨工具的长时间运行 agent。

## 导读

openai agents SDK。对于自己设计 agent 的人，多理解原理总是好的。

OpenAI 更新 Agents SDK，为开发者提供 **model-native harness** 与 **native sandbox execution**，让 agent 能跨文件、跨工具、长时间运行，并在受控环境中安全执行。

## 问题背景：为什么需要新的 harness

开发者要构建「有用的 agent」，光有最强的模型还不够——还需要支撑 agent 做这些事的系统：

- **inspect files** 检查文件
- **run commands** 运行命令
- **write code** 写代码
- **keep working across many steps** 跨越多步骤持续工作

### 现有方案的三种 tradeoffs

当团队从 prototype 走向 production 时，三种主流方案都有明显短板：

- **Model-agnostic frameworks**：灵活，但不能充分发挥 frontier model 的能力；
- **Model-provider SDKs**：离模型更近，但对 harness 缺乏足够可见性；
- **Managed agent APIs**：部署简单，但限制 agent 运行位置和敏感数据访问方式。

### OpenAI 的答案

给开发者一套「standardized infrastructure」：

- easy to get started（易上手）
- built correctly for OpenAI models（为 OpenAI 模型而生）
- **a model-native harness** + **native sandbox execution**

## 核心能力一：更强的 agent loop harness

新 harness 专为处理文档、文件、系统的 agent 设计，具备以下特性：

### harness 的新能力

- **configurable memory** 可配置记忆
- **sandbox-aware orchestration** 感知沙箱的编排
- **Codex-like filesystem tools** 类 Codex 的文件系统工具
- **standardized integrations** 与 frontier agent 系统常见 primitives 的标准化集成

### 标准化的 agentic primitives

harness 内置对以下核心构件的支持：

- **MCP**（Model Context Protocol）：工具调用
- **skills**：progressive disclosure（渐进式披露）
- [\*\*AGENTS.md\*\*](http://agents.md/)：自定义指令
- **shell tool**：代码执行
- **apply patch tool**：文件编辑

这些 primitives 正在成为 frontier agent 系统的通用底层。OpenAI 把它们内置，让开发者「spend less time on core infrastructure, more time on domain-specific logic」。

### 对齐模型的自然执行模式

harness 的设计哲学：**让 execution 与模型最擅长的工作方式对齐**。

- 让 agent 贴近模型的 natural operating pattern
- 提升 reliability 与 performance，尤其在 long-running 或跨多工具协调的复杂任务上

### turnkey 但灵活

每个产品都不同，SDK 的设计哲学是 **turnkey yet flexible**：

- 即开即用，但允许开发者适配自己的 stack
- 可自定义 tool use、memory、sandbox environment

## 核心能力二：原生沙箱执行（Native Sandbox Execution）

### 为什么 agent 需要 sandbox

许多有用的 agent 需要一个工作空间，可以：

- 读写文件
- 安装依赖
- 运行代码
- 安全地使用工具

过去开发者要自己拼凑这个 execution layer。现在 SDK 直接内置。

### BYO sandbox 或内置 providers

开发者可以 bring your own sandbox，或直接使用内置支持：

- Blaxel、Cloudflare、Daytona、E2B、Modal、Runloop、Vercel

### Manifest 抽象：可移植的 workspace 描述

为让环境跨 provider 可移植，SDK 引入 **Manifest** 抽象：

- mount 本地文件
- 定义输出目录
- 从云存储拉数据：AWS S3、Google Cloud Storage、Azure Blob Storage、Cloudflare R2

Manifest 给模型一个 **predictable workspace**：哪里找 input、哪里写 output、如何在长任务中组织工作。

## 关键架构决策：Harness 与 Compute 分离

这是本次更新最深层的架构哲学。

### 安全：防 prompt-injection 与 exfiltration

Agent systems should be designed assuming prompt-injection and exfiltration attempts.

分离 harness 和 compute，能让 credentials 远离 model-generated code 执行的环境。

### 持久：durable execution

agent 的 state 被外部化后：

- sandbox 容器挂了，run 不会丢
- 内置 **snapshotting + rehydration**
- 原环境失败或过期，可在新容器里从上一个 checkpoint 继续

### 可扩展：scale-out 执行

- 一个 agent run 可以用一个或多个 sandbox
- 按需 invoke sandbox
- 把 subagent 路由到隔离环境
- 跨容器并行化，加速执行

## 其他要点

### 定价与可用性

- 所有客户通过 API 通用可用（GA）
- 使用标准 API pricing，按 tokens + tool use 计费

### 路线图

- 首发：Python；TypeScript 即将跟进
- 即将加入：**code mode** 与 **subagents**（Python + TypeScript 双端）
- 更多 sandbox providers、更多集成、更多生态入口

### 客户反馈（Oscar Health）

新 SDK 让我们有能力把一个关键临床记录工作流 production 化——过去的方案可靠性都不够。关键不在于能不能提取元数据，而在于能否正确理解每一次 encounter 的边界。

- Rachael Burns, Staff Engineer & AI Tech Lead, Oscar Health

## 思想框架：OpenAI 的 agent engineering 三层观

这篇文章本质上在定义 OpenAI 对「production-grade agent system」的架构三层观：

1. **Model 层**：frontier model 提供认知能力；
2. **Harness 层**（本次重点）：model-native，承载 agent loop、memory、tool use、filesystem、primitives；
3. **Compute 层**（本次重点）：sandbox 提供隔离、持久、可扩展的执行环境。

harness 与 compute **解耦** 是核心——既保证 frontier model 能力被充分释放，又满足生产环境对 security、durability、scale 的硬要求。

## 概念网络

### 核心概念解析 (Core Concepts)

### Agents SDK

- **context**

We’re introducing new capabilities to the Agents SDK that give developers standardized infrastructure that is easy to get started with and is built correctly for OpenAI models.

- **费曼一下**：OpenAI 提供给开发者的一套构建 agent 的标准基础设施。不是模型本身，也不是一个完整产品，而是让开发者快速搭建生产级 agent 的「脚手架」。

### harness（马具 / 执行架）

- **context**

a model-native harness that lets agents work across files and tools on a computer

- **费曼一下**：harness 是包裹在模型外层的「运行框架」——它决定了模型如何循环、如何调用工具、如何读写文件、如何管理记忆。模型是「大脑」，harness 就是「骸架和四肢」。同一匹马（模型），配不同的马具，跑出来的效果差异巨大。

### model-native harness

- **context**

a model-native harness that lets agents work across files and tools on a computer… The harness also helps developers unlock more of a frontier model’s capability by aligning execution with the way those models perform best.

- **费曼一下**：为特定模型量身定制的 harness。与 model-agnostic 的通用框架相比，model-native harness 能让 OpenAI 模型的能力得到最充分的释放——因为运行方式跟模型擅长的模式对齐了。

### native sandbox execution

- **context**

The updated Agents SDK supports sandbox execution natively, so agents can run in controlled computer environments with the files, tools, and dependencies they need for a task.

- **费曼一下**：SDK 自带的沙箱执行能力。开发者不再需要自己搭建受控的代码运行环境，直接使用 SDK 内置的就可以让 agent 在隔离环境里读写文件、安装依赖、运行命令。

### sandbox

- **context**

Many useful agents need a workspace where they can read and write files, install dependencies, run code, and use tools safely.

- **费曼一下**：给 agent 的「临时办公室」。一个隔离、受控、可销毁的计算环境，agent 在里面跑代码、调工具不会弄坏宿主机。

### agent loop

- **context**

A more capable harness for the agent loop… developers need systems that support how agents inspect files, run commands, write code, and keep working across many steps.

- **费曼一下**：agent 的核心工作循环：感知→思考→调用工具→观察结果→再思考… 直到任务完成。harness 的职责就是把这个循环稳定、可靠地跑下去，尤其是跨很多步的 long-horizon 任务。

### Manifest

- **context**

the SDK also introduces a Manifest abstraction for describing the agent’s workspace. Developers can mount local files, define output directories, and bring in data from storage providers…

- **费曼一下**：一份声明式的 workspace 配置清单——告诉 sandbox：输入文件放哪里、输出写哪里、从哪个云存储拉数据。有了 Manifest，agent 的环境就能在不同 provider 之间无缝移植。

### MCP（Model Context Protocol）

- **context**

These primatives include tool use via MCP…

- **费曼一下**：agent 与外部工具、数据源对话的标准协议。类比：USB-C 之于硬件。有了 MCP，agent 接入新工具不需要重写集成代码。

### skills （progressive disclosure）

- **context**

progressive disclosure via skills

- **费曼一下**：把能力模块按需暴露给 agent，不一次性把所有工具文档扔进 context。agent 需要什么技能，就加载哪个 skill 的详情——节省 token，保持注意力。

### AGENTS.md

- **context**

custom instructions via [AGENTS.md](http://agents.md/)

- **费曼一下**：agent 的 README。把项目规则、编码风格、团队约定写成 markdown，agent 进入工作区时自动读取作为上下文。

### shell tool

- **context**

code execution using the shell tool

- **费曼一下**：让 agent 像工程师一样在终端里执行命令。这是 agent 要做真活（安装包、跑测试、冲数据）的最基础开关。

### apply patch tool

- **context**

file edits using the apply patch tool

- **费曼一下**：让 agent 修改文件的标准方式——以 diff/patch 格式精准改改改，而不是整文件重写。更安全、更可审计。

### durable execution

- **context**

When the agent’s state is externalized, losing a sandbox container does not mean losing the run. With built-in snapshotting and rehydration, the Agents SDK can restore the agent’s state in a fresh container and continue from the last checkpoint if the original environment fails or expires.

- **费曼一下**：长任务不怕灰飞烟灭。agent 跑到一半容器挂了，下次开个新的能从上次 checkpoint 继续跑，而不是从头来过。

### snapshotting + rehydration

- **context**

With built-in snapshotting and rehydration, the Agents SDK can restore the agent’s state in a fresh container and continue from the last checkpoint…

- **费曼一下**：快照 + 恢复。snapshot 把 agent 的状态存到外部，rehydration 在新容器里把状态注入回去。类比：游戏存档与读档。

### harness–compute separation

- **context**

Separating harness and compute helps keep credentials out of environments where model-generated code executes.

- **费曼一下**：把「带着 agent 运行的控制层」与「agent 在里面跑代码的执行层」分开。好处三个字：安全、持久、可扩展。模型生成的代码在 sandbox 里跑，而 credentials 住在 harness 端不给模型碰。

### prompt-injection

- **context**

Agent systems should be designed assuming prompt-injection and exfiltration attempts.

- **费曼一下**：攻击者把恶意指令藏在 agent 读取的内容里，诱骗 agent 做不该做的事。设计 agent 系统时，**默认假设每一段输入都可能被污染**。

### exfiltration

- **context**

…prompt-injection and exfiltration attempts.

- **费曼一下**：把敏感数据悄悄运出去。比如诱骗 agent 把密钥写到日志里、或者请求外部网站。sandbox 与 harness 分离就是为了堆高这个攻击的成本。

### subagents

- **context**

route subagents to isolated environments… We’re also working to bring additional agent capabilities, including code mode and subagents…

- **费曼一下**：主 agent 把子任务外包给子 agent。每个 subagent 跨着自己的 context 和 sandbox 干活，互不干扰。类比：项目经理分派任务给专家小组。

### code mode

- **context**

additional agent capabilities, including code mode and subagents

- **费曼一下**：让 agent 通过写代码来调用工具，而不是通过 tool calling JSON。代码是表达力更强的「编排语言」，特别适合多步骤、多工具的复杂任务。

### turnkey yet flexible

- **context**

Developers get a harness that’s turnkey yet flexible—making it easy to adapt it to their own stack

- **费曼一下**：即开即用，又可改造。默认配置能跑，但开发者随时可以换自己的 tool、memory、sandbox。这是开发者工具的黄金标准。

### 概念网络 (Concept Network)

![图片展示了概念网络三层架构的组成及关系。模型负责思考，Harness构成核心逻辑，包含Agent工作循环、MCP、Skills与文件工具等。Harness通过工作区声明与Manifest桥接，实现安全隔离、快照恢复与持久执行、子Agent与横向扩展等功能，计算沙箱作为隔离执行层。该图与上下文紧密相关，直观呈现了模型、Harness、Compute三层架构及各部分功能与关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2RmYTJhOWM3NTQ1MWIyZGI5NGVlYzQ3NGQ3MjRiMjVfMDg1N2Q3ODRjM2QwMDdjM2JlN2I0YzYzN2MyMjI1MmFfSUQ6NzY3MTAwODA0Mjc4NTU5MDQ4Ml8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

- **三层架构**：Model → Harness → Compute。model 负责思考，harness 负责组织工作，compute (sandbox) 负责执行动作。三层分工是本文的总分项。
- **harness 包含 agent loop**：agent loop 是 harness 运行的核心逻辑；memory、tool use、filesystem tools 都是服务于这个 loop 的子能力。
- **primitives 填充 harness**：MCP、skills、[AGENTS.md](http://agents.md/)、shell、apply patch 是 harness 的标准配件，它们共同构成了 agent 的「能力工具箱」。
- **Manifest 桥接 harness 与 sandbox**：Manifest 描述工作空间，是 harness 告诉 sandbox 「我要在你里面做什么」的声明式契约。
- **harness–compute 分离 → 同时实现三个特性**：security（防 prompt-injection / exfiltration）、durability（snapshotting + rehydration）、scale（subagents + 并行容器）。这是本文最深的架构洞见。
- **model-native 对押 model-agnostic**：一对核心张力。前者牺牲通用性换取性能上限，后者牺牲性能上限换取通用性。OpenAI 的选择暴露了它对「agent 的未来是 model-native」的赌注。
- **subagents 是 scale 的关键**：子 agent 跨 sandbox 分发，配合 harness–compute 分离，构成可横向扩展的 agent 系统。

HOWIE 原清单 · 12

# Anthropic 干脆把 harness 托管了：Claude Managed Agents 的设计取舍

**内容说明：**与今天的多 agent 编排实操互补——他们的做法是不设计特定 harness，而把「大脑 / 双手 / 会话」三层解耦，让 harness 能随模型能力持续替换。

**策展人按：**最极端的一种解法：既然 harness 这么难，那我替你托管。你正打算自己造一个的话，这条的取舍值得先看。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：Launching Claude Managed Agents
- 作者：Lance Martin
- 内参日期：2026-07-28
- 来源类型：twitter
- 原文：https://x.com/rlancemartin/status/2041927992986009773/?s=12
- 标签：Anthropic

与今天的多 agent 编排实操互补——他们的做法是不设计特定 harness，而把「大脑 / 双手 / 会话」三层解耦，让 harness 能随模型能力持续替换。

## 导读

claude managed agents。

## 核心观点

- Claude Managed Agents 是一套预置、可配置的 agent harness，跑在托管的基础设施上：你把 agent 定义成一个模板（模型、system prompt、工具、skills、文件与仓库），harness 和 infra 由 Anthropic 提供。
- 它要解决的不是「怎么写一个更好的 harness」，而是「harness 与基础设施如何跟上一个能力持续变强、运行时间持续变长的 Claude」。
- 最关键的设计取舍是一个拒绝：Anthropic 没有去设计某一种 agent harness，而是把 brain（Claude 及其 harness）、hands（执行动作的沙箱与工具）、session（会话事件的日志）拆成三个彼此假设极少的接口，各自可以独立失败、独立替换。
- 一句可迁移的判断：让 agent 随 Claude 的智能一起扩展，是一个基础设施挑战（infrastructure challenge），而不严格是 harness 设计问题。

## 为什么需要托管 harness：messages API 之上的两个结构性压力

- messages API 是通往模型的直连网关（a direct gateway to the model）：接收 messages，返回 content blocks。基于它构建 agent，就必须自己补上一层 harness——把 Claude 的 tool call 路由到 handler，并管理 context。
- 压力一，harness 跟不上 Claude。文中最锋利的一句判断是：agent harness 编码的是「关于 Claude 做不到什么」的假设。模型变强，这些假设就变陈旧，反过来成为 Claude 表现的瓶颈（bottleneck），于是 harness 必须被持续更新才能跟上模型。
- 压力二，Claude 跑得越来越久。任务时域（task horizon）正在指数级增长，在 METR benchmark 上已经超过 10 个人类小时。运行时间一长，压力就从模型转移到 agent 周围的基础设施：要安全、要扛得住长任务期间必然发生的基础设施故障、要能扩展（例如支撑很多个 agent 团队）。
- 之所以现在就要处理，是因为作者预期未来的 Claude 会在人类最重大的挑战上连续运行数天、数周乃至数月。
- 演进路径因此很清楚：Claude Agent SDK 是第一步，提供了一个优秀的通用 agent harness；Claude Managed Agents 是这条路径上的下一步——harness 加上托管基础设施，支撑「我们预期 Claude 将要工作的那个时间尺度」上的安全、可靠执行。

## 三个中心概念：Agent、Environment、Session

- Agent：一份版本化的配置（a versioned config），承载 agent 的身份——模型、system prompt、工具、skills、MCP servers 等。创建一次，之后按 ID 引用。
- Environment：一份模板，描述如何 provision agent 的工具所运行的沙箱——runtime 类型、网络策略、包配置。
- Session：一次有状态的运行（a stateful run），使用已创建好的 agent 配置与 environment。它从 environment 模板拉起一个全新沙箱，挂载单次运行所需的资源（文件、GitHub 仓库），并把认证信息存进安全 vault（例如 MCP 凭证）。
- 心智模型：agent 是配置，environment 是你希望 agent 用来跑代码的那个沙箱的模板，session 是任意一次执行。一个 agent 可以有很多 session。

## 四种已经跑出来的使用模式

- 事件触发（Event-triggered）：由某个服务触发 Managed Agent 干活。例如系统标记出一个 bug，managed agent 写好补丁并开 PR——从「标记」到「动作」之间没有人类在环。
- 定时（Scheduled）：把 Managed Agent 排进日程。作者和很多人用这个模式做每日简报，比如 X 或 GitHub 的动态、一支 agent 团队正在做什么；他自己就在用一份 X 活动的每日简报。
- 触发即走（Fire-and-forget）：由人触发。例如通过 Slack 或 Teams 把任务派给 Managed Agent，拿回交付物——表格、幻灯片、应用。
- 长周期任务（Long-horizon）：作者认为这是 Managed Agents 特别有用的领域。他 fork 了 @karpathy 的 auto-research 仓库做探索，也让一个 Managed Agent 把 @\_chenglou 的 pretext 库尝试应用到 Anthropic 的工程博客内容上。

## 怎么接入：skill 做 onboarding，CLI 做 setup，SDK 做 runtime

- 最省事的入门路径是开源的 claude-api skill，在 Claude Code 里开箱即用：升级到最新版 Claude Code，跑对应子命令就能完成 Managed Agents 的 onboarding。作者特别提到，他很看好把 skill 当作新功能的 onboarding 方式，自己也大量使用。
- SDK 是面向代码的：在应用里 import，运行时驱动 session。目前六种语言有 Managed Agents 支持——Python、TypeScript、Java、Go、Ruby、PHP。
- CLI 是面向终端的：每一种 API 资源——agents、environments、sessions、vaults、skills、files——都暴露成一个子命令。
- 常见组合：CLI 做 setup，SDK 做 runtime。agent 模板是持久的，你可以把它存成一份 YAML（模型、system prompt、工具、MCP servers、skills）放进 git，再让 CLI 在部署流水线里 apply。

## 设计取舍：不押注某一种 harness，而是把它拆成可替换的接口

![图片展示了Anthropic托管Claude Managed Agents的架构。中心为Harness，连接Session、Sandbox、Orchestration。Session有“==”标识，Sandbox有“> -”标识，Orchestration有流程图。Harness与Tools（含Resources/MCP）通过虚线箭头连接。该图与文档中作者合写工程博客给出的核心教训相关，说明让agent随Claude智能扩展是基础设施挑战，而非单纯harness设计问题。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjdjNTU4MTMzNDdlNDk3YmE2MzViMTcyMjU0ZGE4OTdfMjE5MzczOTJhMWEyODVjZWU2YWZjNDRmODZkYTAyNTZfSUQ6NzY3MTAwODA0NDM4MTE0NjM0Ml8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜托管架构：harness 居中，工具、沙箱、会话、编排各成独立接口，可分别失败或替换* ｜ [原图](https://neican-res.candobear.com/article-images/b6f1acb1729cb5038190b2a55e4201b093cbcc3bf68d7bf9c2fbcffa76c4f1d7.jpg)

- 作者与 @mc_anthropic、@gcemaj、@jkeatn 合写的工程博客给出的核心教训是：让 agent 随 Claude 的智能一起扩展，是一个基础设施挑战，而不严格是 harness 设计问题。
- 基于这个判断，他们刻意没有去设计某一种特定的 agent harness——因为他们预期 agent harness 会不断演化。
- 取而代之的是解耦：把 brain（Claude 及其 harness）从 hands（执行动作的沙箱与工具）和 session（会话事件的日志）中分离出来。
- 每一部分都成为一个「对其余部分假设极少」的接口，因此可以各自失败、各自被替换。文中把这解释为系统可靠性、安全性与灵活性的来源——未来接入新的 harness、新的沙箱、新的 session 存储都不必重做。

## 结论：agent 成为 Claude API 的新核心原语

- 作者长期的一个 frustration 就是 agent harness 跟不上模型能力，他此前专门写过一篇文章讨论这件事。
- Claude Managed Agents 把 agent harness 和基础设施一起替你接管，让人可以在「agent 作为 Claude API 的一个新核心原语」之上做探索。
- 他明确看好的方向：多 agent 编排的各种模式，以及长时间运行的任务。

## 概念网络

### 关键概念

### Claude Managed Agents

**context**：全文的主题对象。TL;DR 把它定义为一套「预置、可配置、跑在托管基础设施上的 agent harness」：你定义 agent 模板（工具、skills、文件与仓库），harness 和 infra 由 Anthropic 提供，整个系统的设计目标是跟上 Claude 快速增长的智能并支撑长周期任务。

**费曼一下**：过去你租的是发动机（模型 API），车架、底盘、车库都得自己搭。Managed Agents 把车架和车库一起租给你，你只需要填一张「这台车怎么配」的表格。

### agent harness

**context**：文中把 harness 定义为构建在 messages API 之上的那一层——把 Claude 的 tool call 路由到 handler，并管理 context。全文的问题意识都从「harness 由谁维护、跟不跟得上模型」出发。

**费曼一下**：harness 是套在模型外面的挽具，决定它能碰哪些工具、记得住多少东西、出错怎么办。模型是马，harness 是缰绳和车辕。

### messages API 作为直连网关

**context**：原文称 messages API 是「通往模型的直连网关：接收 messages，返回 content blocks」。它足够底层，也正因为底层，任何 agent 都得自己补上 harness 这一层。

**费曼一下**：这是一个只管一问一答的窗口。想让它连续办完一件复杂的事，中间的排队、跑腿、记账都得你自己雇人做。

### harness 的过时假设

**context**：全文最锋利的判断——agent harness 编码的是「Claude 做不到什么」的假设；这些假设会随模型变强而陈旧（grow stale），并反过来 bottleneck Claude 的表现，因此 harness 需要被持续更新。

**费曼一下**：你给新人写的防呆手册，写的是他刚入职时的短板。人成长了，手册没改，手册本身就成了绊脚石。

### 任务时域（task horizon）

**context**：支撑「为什么是现在」的量化事实：Claude 的 task horizon 呈指数增长，在 METR benchmark 上已经超过 10 个人类小时；作者预期未来的 Claude 会连续运行数天、数周乃至数月。

**费曼一下**：衡量一个 AI 有多能干，不只看它答得对不对，还要看它能独立干多久而不脱轨。这个「能撑多久」正在成倍变长。

### 长周期任务的基础设施压力

**context**：时域一长，压力就从模型转移到 agent 周围的基础设施：要安全、要 resilient to infrastructure failures、要能 scaling（例如支撑很多个 agent 团队）。这是 Managed Agents 存在的第二个理由。

**费曼一下**：跑百米可以不带水，跑马拉松就必须有补给站、医疗车和退赛方案。任务变长之后，配套设施的重要性会超过跑者本身的技巧。

### Agent（版本化配置）

**context**：三个中心概念之一——一份版本化的配置，承载 agent 的身份：模型、system prompt、工具、skills、MCP servers 等；创建一次，之后按 ID 引用。

**费曼一下**：它是身份证加岗位说明书的合体，而不是一个正在干活的人。

### Environment（沙箱模板）

**context**：三个中心概念之一——一份模板，描述如何 provision agent 工具所运行的沙箱：runtime 类型、网络策略、包配置。

**费曼一下**：它是「工位标准」：装什么软件、能不能上网、放在哪个房间。每次开工都按这张标准现搭一个新工位。

### Session（有状态运行）

**context**：三个中心概念之一——一次有状态的运行，使用已创建的 agent 配置与 environment：从模板拉起全新沙箱，挂载单次运行的资源（文件、GitHub 仓库），把认证存进安全 vault。一个 agent 可以有很多 session。

**费曼一下**：配置是剧本，环境是舞台设定，session 就是「今晚这一场」。同一个剧本可以演无数场，每场的道具和记录各自独立。

### brain / hands / session 解耦

**context**：全文的设计取舍核心。Anthropic 没有设计特定 harness，而是把 brain（Claude 及其 harness）、hands（沙箱与工具）、session（会话事件日志）拆成三个「对其他部分假设极少」的接口，各自可以独立失败或被替换。

**费曼一下**：大脑、双手、日记本各管各的。手断了可以换假肢，日记本丢了可以换本子，不必推倒重来。

### 基础设施挑战而非 harness 设计问题

**context**：工程博客分享的那条教训——building agents to scale with Claude's intelligence is an infrastructure challenge, not strictly a matter of harness design。这是把注意力从 harness 技巧转向 infra 的关键归类动作。

**费曼一下**：问题被重新归了类。原来大家以为这是「怎么写好一个程序」，其实是「怎么建好一座工厂」。

### 触发模式谱系

**context**：文中总结的四类常见用法——event-triggered（系统标记 bug，agent 直接写补丁开 PR，中间无人在环）、scheduled（每日简报）、fire-and-forget（Slack 或 Teams 派活换交付物）、long-horizon（fork auto-research 仓库、用 pretext 库改造工程博客内容）。

**费曼一下**：按「谁按下开始键、要跑多久」给 agent 分类：机器按的、闹钟按的、人按完就走的，以及按下去要跑很久的那一类。

### agent 模板的声明式持久化

**context**：使用建议里最可迁移的做法——CLI 做 setup、SDK 做 runtime；agent 模板是持久的，可以存成一份 YAML（模型、system prompt、工具、MCP servers、skills）放进 git，由 CLI 在部署流水线里 apply。

**费曼一下**：把 agent 当基础设施代码来管：改动进版本库、走评审、随部署上线，而不是散落在某个人的本地脚本里。

### skill 作为 onboarding 载体

**context**：作者推荐用开源的 claude-api skill 在 Claude Code 里完成 Managed Agents 的 onboarding，并明确说他很看好「用 skill 来 onboard 新功能」这件事，自己已经大量使用。

**费曼一下**：新功能的说明书不再是给人读的文档，而是给 agent 读的技能包——你说想用，它自己就把接线做完了。

### agent 作为 Claude API 的新核心原语

**context**：结论的落点：Managed Agents 接管 harness 与基础设施，让人能在「agent 这个 Claude API 的新核心原语」之上做探索，尤其是多 agent 编排与长时间运行的任务。

**费曼一下**：以前 API 的最小积木是一次对话，现在最小积木变成了一个能自己干活的 agent。

### 概念网络

![图片是Harness Engineering关于Claude Managed Agents的原文关系图，由Mermaid源码直接渲染。图中有两条上游支流，分别指向“harness的过时假设”和“基础设施挑战而非harness设计”。其中，“harness的过时假设”由“messages API直连网关”和“任务时域指数增长”驱动；“基础设施挑战而非harness设计”由“长期周期任务的基础设施压力”驱动。该图与上下文紧密相关，直观呈现了Claude Managed Agents相关概念及驱动因素。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWVmZGRmNjgwNDViZjk4MzE4N2JhMWUwMjZkMWFkNTFfOTczZDE1OGE5NTFlZTkxODlhNTJhODY4ODIyM2Q3YThfSUQ6NzY3MTAwODA0NTE1MDM1ODc2M18xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



这张网络有两条上游支流，汇成一个判断，再由这个判断长出整套产品结构。

第一条支流是能力侧的。messages API 只提供直连模型的一问一答（概念 3），所以任何 agent 都得自建 harness（概念 2）；而 harness 天然是「对模型短板的一次拓印」，于是必然产生过时假设（概念 4）。这是一条因果链，不是并列关系：网关越底层，harness 越厚；harness 越厚，被模型进步淘汰的部分越多。

第二条支流是时间侧的。任务时域指数增长（概念 5）直接导致长周期任务的基础设施压力（概念 6）——安全、故障韧性、可扩展。注意这条支流与 harness 无关：即使 harness 写得完美，进程要连续跑几天几周，压力也照样落在 infra 上。

两条支流在概念 11「这是基础设施挑战而非 harness 设计问题」上合流。这是全文的枢纽判断，它把问题重新归类，从而合法化了 Managed Agents（概念 1）这个解法——如果问题只是 harness 写得不够好，正确的回应就该是开源一个更好的 harness，而不是托管一整套基础设施。

枢纽之下是层级展开。Managed Agents 的内部结构是 brain / hands / session 解耦（概念 10），三个接口彼此假设极少；这个抽象再落成三个用户可见的对象：Agent 配置（概念 7）、Environment 沙箱模板（概念 8）、Session 执行（概念 9）。前两者对第三者是支撑关系——配置与环境模板都是 session 的输入，而不是它的同级。这也解释了为什么「一个 agent 可以有很多 session」：可复用的部分被前置固化，一次性的部分留在运行时。

枢纽之侧是两条使用面的分支：触发模式谱系（概念 12）回答「什么时候用」，agent 模板的声明式持久化（概念 13）回答「怎么管」；skill 作为 onboarding 载体（概念 14）则是反向指向产品的一条入口边——它不是 Managed Agents 的组成部分，而是让人进入这套系统的方式。

整张网络的终点是概念 15：agent 成为 Claude API 的新核心原语。它同时被产品本身与触发模式谱系指向——前者是演化关系（托管化让 agent 从「你写的程序」变成「API 里的对象」），后者是实证支撑（四类模式都把 agent 当成一个可被外部系统调用的一等公民）。全文真正的张力也在这里：harness 曾经是开发者的主战场，现在它被抬进了平台内部，而开发者的注意力被推向更上层的问题——多 agent 编排，以及交给 agent 做什么。

## 费曼 x3

如果你写过 agent，大概率有过这种体验：花几周打磨出来的 harness，在下一个模型发布之后突然显得多余。原因不难理解——harness 里写满的，其实是「模型做不到什么」的假设。你为它补的每一次重试、每一段上下文裁剪、每一个把任务切碎再拼回来的技巧，都是对当下能力边界的一次拓印。模型变强，拓印就变成枷锁：这些假设会陈旧，并反过来成为 Claude 表现的瓶颈。

更容易被低估的是第二条曲线。Claude 的任务时域正在指数级变长，在 METR 上已经超过 10 个人类小时。当一个进程要连续跑几天、几周甚至几个月，压力就从「提示词写得好不好」转移到「这套东西扛不扛得住」——安全、故障恢复、可扩展。到这一步，难题的性质其实变了：让 agent 随智能一起扩展，是一个基础设施挑战，而不严格是 harness 设计问题。这句话看着朴素，却是整件事的分水岭。如果问题只是程序写得不够好，正确的回应是开源一个更好的 harness；既然是工厂问题，回应就只能是把工厂建起来。

Anthropic 的答案里，最值得学的不是产品清单，而是那个拒绝：他们没有去设计一种「正确的」harness。既然预期 harness 会不断演化，那就不要押注任何一版，而是把 brain（Claude 及其 harness）、hands（执行动作的沙箱与工具）、session（事件日志）拆成三个彼此假设极少的接口，让它们各自可以独立失败、独立被替换。可靠性、安全性和面向未来的灵活性，都是这个拒绝的副产品。放弃定义正确答案，换来的是容纳所有未来答案的空间。

于是 agent 变成一个可以被创建、版本化、按 ID 引用的对象：配置是 agent，沙箱模板是 environment，每一次执行是 session。一份 YAML 进 git，部署流水线里 apply——你熟悉的那套声明式基础设施纪律，第一次可以原样套在智能体上。

这才是「托管」两个字的分量。它省下的不是几行样板代码，而是把 agent 抬成 API 的一等原语，让你的注意力从追赶模型能力，回到真正该想的问题上：把什么交给它做。

HOWIE 原清单 · 13

# GitHub：决定 AI 编码效果的是 harness，不是你换了哪个工具

**内容说明：**主张回到基本功——选定工具、在沙箱里开自治模式、先原型再进 plan 模式、用 subagent 实现、人工 review 后再换一个模型做复盘。在必要之前不要急着堆自定义 agent 和 skill。

**策展人按：**前面几条都在说厂商该做什么，这条掉头说使用者。换工具解决不了的问题，换用法可能可以。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：The harness is all you need (mostly)
- 作者：GitHub
- 内参日期：2026-07-29
- 来源类型：blog
- 原文：https://github.blog/company/the-harness-is-all-you-need-mostly/
- 标签：harness engineering, agentic engineering

主张回到基本功——选定工具、在沙箱里开自治模式、先原型再进 plan 模式、用 subagent 实现、人工 review 后再换一个模型做复盘。在必要之前不要急着堆自定义 agent 和 skill。

## 导读

底层模型是 1，harness 是 0。没有 1 或者没有 0，都不行。

## 核心观点

- 作者的核心判断只有一句：**决定你 AI 效果的是 harness，以及你对它的理解程度**，而不是你又装了哪个 MCP、哪个 skill、哪个自定义 agent。他每天与 AI 一起工作，得到的结论是「less is way more」——那些安装、配置、诱导 agent 的花活「很有意思，但归根到底像 gimmick」。
- 「harness」在本文中与 GitHub Copilot 互换使用：GitHub Copilot 就是一个 agent harness。工具形态在收敛——CLI、新的 GitHub Copilot app、VS Code、Visual Studio、JetBrains 越来越跑在同一个 harness 上，细节不同但核心工作流一致。所以「Learn the harness once, use it everywhere」。
- 全文给出的是一条**只用现成功能**的八步工作流：挑工具 → 打开 YOLO 模式 → 先做原型 → 方法论式规划 → 用 Autopilot 实现 → 人工评审迭代 → 橡皮鸭复审 → 收工。没有奇怪的提示词，没有别人都知道你不知道的 skill。
- 作者主动划边界：不是说你永远不需要 skill、MCP、指令、自定义 agent——当你要定义复杂工作流、为团队做自动化时它们会变得相当重要，他自己在这篇文章里也用了几个；他要指出的是**没有这些东西你照样可以非常成功**。
- 一个清醒的旁注：市面上「slop」很多。不信就让 agent 随便造一个 skill，它会欣然照办；那个 skill 到底能不能用不重要，照样可以发布到各种 skill / MCP registry。

## 问题：AI 焦虑与「一个怪招搞定 AI」的幻觉

- 开篇直接安抚：如果你现在被 AI 搞得手足无措，你不是一个人。
- 每天都有新工具、新 MCP、新模型、新 skill、新工作流、新功能、新的社交媒体帖子，形式都是「快看！我用这一个怪招彻底搞懂了 AI」。
- 作者的回应只有一句：「我……不信你。」这句轻描淡写的怀疑是全文的情绪起点——真正的增益不来自这些声量。
- 他自己观察到的最大生产力提升，全部来自「how I use the harness and how well I understand it」。

## 免责声明：把话说清楚，避免被误读成反 skill

- 「harness」与「GitHub Copilot」在文中互换使用，目的是保持简单：你只需要知道 GitHub Copilot 是一个 agent harness。
- 不是说 skill、MCP、指令、自定义 agent 无用；恰恰相反，当你进阶到复杂工作流与团队级自动化时它们会很重要。
- 真正的主张是**必要性**问题，不是**有用性**问题：要用 AI 取得高效成果，这些都不是必需品。
- slop 论证：agent 会为任何请求生成一个 skill，无论它是否真的可用，都能被轻易发布到注册表。这解释了为什么「新 skill/新 MCP」的信息流并不等于价值流。

## 第一步：挑一个工具，然后尽可能贴近 harness

- 「挑个工具」看似废话，但即使在 GitHub Copilot 家族内部选项也很多：CLI、新的 GitHub Copilot app、VS Code、Visual Studio、JetBrains 等。
- 好消息是这些体验正越来越集中到同一个 harness 上：细节因工具而异，核心工作流一致。
- 学 harness 的最好方式是离它尽可能近。所以新手作者推荐从 GitHub Copilot CLI 开始：终端界面就是纯文本，没什么 UI 要学，你输入提示词、agent 干活，交互更直接、更即时，「而且坦白说非常爽」。
- 本文演示用的是新的 GitHub Copilot app，但它跑的 harness 与 CLI、VS Code 等处完全相同——这正是「学一次、处处用」的实证。

## 第二步：打开 YOLO 模式，但别在自己机器上跑

- YOLO 模式也叫「Allow All」，让 agent 无需逐次请求许可即可执行任何命令；多数工具里就是在聊天中输入 /allow-all。
- 为什么必须给自主权：如果你要审批 agent 的每一个动作，「你还不如自己干」。而且这是糟糕的用户体验——没人想整天坐在桌前按「Approve」。
- 更隐蔽的代价：反复点「Approve」会把你训练成不读就批，反而**让审批本身失去意义**。
- 安全的做法是把自主权关进沙箱：好人也会碰上坏事。尤其在公司环境里，数据在组织系统上，出错代价高。别在本地机器上跑 YOLO。
- 上手最简单的沙箱选项是 GitHub Codespaces 或 development containers。

## 第三步：一切从原型开始

- AI 最神奇的地方之一，是你可以在前期轻易把任何东西原型化。历史上原型是一个完整阶段、常常是奢侈品；现在一个提示词就能做出来。
- 以「做一个日期选择器 web component」为例：听起来直接，实则相当复杂——组件内如何导航？选中的日期长什么样？选中区间长什么样？用户如何在日、月、年之间切换？
- 做法是先生成一个简单原型的**多个变体**。作者拿到的一批布局里，有一个是从年视图开始的 mock——「这很有意思」，他由此确定自己想要的是从年缩放到月再到日的交互。**这类东西你不看见就想不到**。
- 底层原理：人类处理图像、形状、可触布局这类感官丰富的模型，远快于处理密集文本；低成本的早期原型让复杂概念立刻变得直观。

![图片展示了2D Date Picker Mocks的界面，包含“Year at a glance”和“Availability heatmap”两个部分。左侧“Year at a glance”以2026年为例，呈现了年视图，可左右滑动查看月份，9号被红色框选。右侧“Availability heatmap”以2026年11月为例，以网格形式展示日期，不同颜色代表不同可用性，16号被橙色框选。该图与上下文介绍的AI内参主题相关，展示了AI在生成日期选择器原型方面的应用。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDg3MzVkYzM4ZGI4NGE1NmMzNThlMjczNTEwMTc5MmZfYjYwOWI3ZTk4YzI0YTY1ODE5ZGY3YzVjNjkyNGNiNzBfSUQ6NzY3MTAwODA0Mjg1NDQxOTYzNl8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜一次生成二十个日期选择器原型，年视图等意外方案立刻可见* ｜ [原图](https://neican-res.candobear.com/article-images/1d0bc81435f66dcb0f7b8689edf3fa7e1c2f36136e1360faf48f071f96a397a2.png)

- 这套方法同样适用于非视觉任务。要加一个 API 端点，作者仍然先做可视化原型来理解需求与约束，提示词是「Create a visual mockup of the API for this project. Add five options for how we could handle a new API endpoint that allows the user to download their analytics data.」
- GitHub Copilot app 支持 Mermaid 图，agent 直接以 Markdown 渲染出五种实现该端点的不同方式，供并排比较。
- 与 agent 协作时容易忘记「一切都有微妙之处」；原型把这些 nuance 提前挖出来，从而**避免把宝贵时间和 token 花在返工上**。

![图片展示了GitHub Copilot中“analytics-api-download-options.md”文件的内容，标题为“五种分析数据导出接口方案”。上方有五个接口选项，分别为全局同步导出、按列表同步导出、异步导出作业、内容协商、自定义报告POST。下方详细说明了Option 1 - 全局同步导出（推荐MVP），包括HTTP请求方式、URL、参数、Cookie及响应状态码等信息。该图片与上下文紧密相关，是对原文中用Mermaid图并排比较五种分析数据导出接口方案的配图，直观呈现了各接口方案。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZDU0YTM0ZTYyNjQ1Yjg4N2VmM2ZjMGZhNmQ2Zjc5ZGJfYjhiN2U1OWM5OGFjZTc2N2YxZWU5MzViYmI1MWI3ZThfSUQ6NzY3MTAwODA0NDQzMTQ3Nzk3OF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜用 Mermaid 图并排比较五种分析数据导出接口方案* ｜ [原图](https://neican-res.candobear.com/article-images/83bd7004c06b9f3cdad28cdb8b15c00a1646c1004de428c51691a0e777c3e035.png)

- 模型选择的实操建议：多数工作用中等体量模型（如 GPT 5.6 Terra 或 Claude Sonnet）配中等推理档位即可。
- 更关键的是**一致性**：同一个功能、bug 或增强，从头到尾坚持用同一个模型。只要不切换模型或推理档位，之前的对话在模型侧保持缓存，后续请求可享受 prompt caching 的折扣，省 token。

## 第四步：方法论式地规划

- 有了原型，你才知道自己真正想要的是什么，而不是最初以为想要的东西；这时进入实现规划。
- 操作上是**不新开会话**直接切到 plan 模式：/plan Build a date picker web component. I want the user to be able to zoom in and out of years, months, and days.
- 作者坦承这是个相当模糊的提示词，你通常能提供更多上下文；但即使你没有更多上下文也没关系——**规划这一步就是为此存在的**。
- 理论上你可以用完美的提示词、完美的上下文、完美的顺序让模型一次成型（one-shot）。「理论上。」但没人做得到。规划让你逼近这个理想。
- 规划的实质是把你手工构建时迟早要回答的问题**提前问出来**：起止日期能否相同？部分选择是否有效？用户能否清空日期？「今天」是否始终可见？允许手动输入吗？日期以什么格式存储？允许粘贴日期吗？——清单可以一直列下去，你不可能想全，但模型能帮你识别出很多。
- 想让 plan 模式更凶狠地追问边界情况，可以装 Matt Pocock 的 grill-me skill：/plan /grill-me Build a date picker web component...。（注意这与全文主张不矛盾：skill 是加速器，不是入场券。）
- **这一步是关键**：重点不是照单全收 AI 的建议——那样就抵消了规划的价值——而是让你深度介入问题、引导模型，**你的专业判断在这里发挥作用**。
- 双向的：模型也会反问你。截图里它问「non-contiguous dates」是什么意思，作者虽然大致明白，仍要求澄清以确保双方在同一页上。规划过程即使被你打断提问也会继续推进。

![图片展示的是一个交互界面，内容为“Loaded skill grill - me”相关设置。界面中显示了用户提问“在交互模型中，‘zoom’意味着什么？”以及回答“层级钻取：年份→月份→天，带有标题或控制按钮缩放回原处（推荐...）”。接着询问“第一版必须支持哪些选择模式？”并列出选项：1. 单个日期（推荐）；2. 单个日期和日期范围；3. 单个日期、日期范围和多个不连续日期；4. 等待 - 这里不连续日期范围会是什么样子？图片与上下文紧密相关，是文档中规划模式反问选择模式，把非连续日期这类边界问题提前逼出来内容的配图。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWM5NDc5ZmY0ZGVlMGViZmJmZjQwZTRiYWExZWZmZGNfODIxMDgxZDYxODU3OTExMmRhMGUzN2EwZjI4NjlkZjBfSUQ6NzY3MTAwODA0NTY1NjE5ODM0MV8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜规划模式反问选择模式，把非连续日期这类边界问题提前逼出来* ｜ [原图](https://neican-res.candobear.com/article-images/43fda2c520647f58f5ca31f2ca2c0d00dea294817f2e6302fa9eda3df8ab2ede.png)

## 第五步：用 Autopilot 实现

- 计划完成后，GitHub Copilot 通常会提示你切换到 Autopilot 开始实现。
- Autopilot 是一个**内建的循环**：它强制模型持续工作，确保模型真的做完了它声称要做的事——在这里就是计划中的每一项。
- 这一阶段 GitHub Copilot 会自动充当 orchestrator：需要读代码库文件时用小模型的 Explore 子 agent；判断动作较复杂时用大模型的 General Purpose 子 agent。
- 关键的一句：虽然你可以用自定义 agent 和自定义指令获得对编排的细粒度控制，但**你什么都不用做也能拿到子 agent 与多模型工作流的好处**——它开箱即用，哪怕你根本不知道这些东西存在。这是「harness 就够了」最有力的证据。

![图片展示的是Harness工程中用Autopilot实现的计划摘要。内容包括：构建无框架的ES模块及独立交互演示，保留20个模拟对比页面；实现层级年 - 月 - 日钻取，固定3x4年/月网格，完整6x7天网格，稳定面板尺寸；添加精细的以单元为中心的空间缩放过渡，支持交叉淡入淡出和减少运动回退；支持内联/弹出模式、原生表单、ISO日期值、约束、本地化、全键盘访问性、响应式亮/暗样式；暴露文档化的属性/属性/方法/事件API、CSS令牌及::part()钩子；通过演示验证所有导航、选择、表单、弹出窗口、键盘、响应式和运动状态。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MmJmZjg3MTk1MzIyYjM4NmYwNGVkMWFhYWYzMzA1NzBfZWViYzIxZGUwNGQ5OWVhODM0NDFlYjU2MTU0OWNlMWJfSUQ6NzY3MTAwODA0NTYxNDI3MTc3NF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜计划摘要与一键交给 autopilot 执行的入口，规划直接转为实现* ｜ [原图](https://neican-res.candobear.com/article-images/e381622d8fd68a88059b307f29305c5b3be91d96d639b8ebec40b2efe0395c23.png)

## 第六步：人工评审与迭代——你的品味决定质量

- 这是你获得多巴胺的时刻：终于看到 AI 造出了什么。
- 但你多半不会一次拿到想要的东西。这很正常也在预期之内：模型读不懂你的心思，而且容易出错。
- 作者拿到的初版就有一串问题：动画不一致；悬停选中日期时因对比度不足文字读不出来；顶部没必要写「12 YEARS」；在月/年视图下点「Today」不会跳到当天。他还补了一句诚实的吐槽——设计「有点太像 AI 做的了，因为它就是」。

![图片展示的是一个日期选择界面，显示2018 - 2029年12年时间范围。界面上方有“<”和“>”按钮，可切换年份。下方以网格形式排列了各年份，其中2023年以红色框突出显示。界面底部有“Clear”和“Today”按钮。该图片与上下文内容相关，可能是用于说明文档中提到的“初版结果：十二年网格带多余的12 YEARS字样，一眼看出待改处”这一情况，直观呈现了2018 - 2029年的时间选择界面。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjY5MmQ1YWYxODFkMjIzYTVlMWMyZmI2ZjA2NDcwY2JfMTJjMTJmYzNhOTYzNmIyMTI0OGQ4ZTVlZDM3YWIxYzBfSUQ6NzY3MTAwODA0NjE3MjA4MTQyMl8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜初版结果：十二年网格带多余的 12 YEARS 字样，一眼看出待改处* ｜ [原图](https://neican-res.candobear.com/article-images/bde3927c10f37d51e2021f293765aad06583f350867c31520716f25061273a52.png)

- 修法很朴素：进入跟进模式，把自己的设计约束给模型。作者用了自己写的 CSS 框架 Postrboard，做成一个 skill 指向那份 CSS 并告诉 agent 怎么用；换任何你喜欢的 CSS 框架都行。「给模型一些设计指引很有帮助，通常一个 CSS 框架就够了。」
- 后续的修改提示词高度口语化：不要落地页、只要组件与设置面板；日视图不该再往下缩放；顶部不用写「Zoom Out」；悬停含选中日的月/年时文字读不出来；点「Today」应当跳到日视图；月份不用编号也不用方框，年份同理。
- 方法论提炼：**别想太多，直接说给模型听**——「If you've got the context, you've got the prompt.」
- 最重要的一条纪律：不要满足于「good enough」的 AI 产出。要坚持质量，且要苛刻。**这部分仍然是你的责任**；能分辨什么是优质结果、什么不是，正是你带来的价值。AI 不会取代你的人类触感与创造力。

![图片展示的是GitHub Copilot的日期选择器组件工作台界面。左侧为日期选择器，显示2026年5月，5月6日被红色框突出显示。下方有“Clear”和“Today”按钮。右侧是设置面板，可调整日期显示方式、语言、最小和最大日期等，还设有“Disable dates”区域，可设置禁用日期范围。该图片与上下文提到的GitHub Copilot迭代后的成品界面相关，直观呈现了迭代后的日期选择器组件样式和功能设置。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZmNiYzQ2ZWIxMTI0MzkxN2NiYjhlZTQwMWY2OTZiZWJfNWExZTdlYTU5MTExMDAwYTAwMGU3YWY3YjIyNTkxNmVfSUQ6NzY3MTAwODA0NjU1Nzk1NzA5MF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜迭代后的成品：左侧月历右侧设置面板，界面更干净可用* ｜ [原图](https://neican-res.candobear.com/article-images/e9f1ef47aae155c7a560ed13788496713b6157acd3845a615b4ddf06ee9da37c.png)

## 第七步：橡皮鸭复审

- 迭代到满意之后，做最后一次评审：向 GitHub Copilot 请求一次 Rubber Duck review，直接开口要即可。
- 机制是：GitHub Copilot 会向**另一个 AI 家族的模型**请求评审。作者当时用 GPT 5.6 Terra，它就去请了 Sonnet。
- 原理很干净：不同模型训练数据不同，因而**盲区不同**；橡皮鸭复审能发现单一模型会漏掉的问题。
- 它可以用在流程的任何节点：可以橡皮鸭原型，可以橡皮鸭计划，取决于你想不想要第二个 AI 的意见。
- 再进一步，可以把橡皮鸭与 Autopilot 组合成循环：/autopilot rubber duck this date picker implementation...，让两个模型反复复审直到双方都认为剩下的只有边际收益递减的条目。
- 代价与收益：这一步更费 token，但你是在真正地锤炼代码——把它当成对未来的自己的投资，因为你现在抓到了那些问题。

## 第八步：收工，以及会话的话题卫生

- 到这一步就可以 stage、commit，或者在同一个 PR 里继续做下一个功能。
- 一条会话卫生建议：接下来做与这个日期选择器无关的事，就开新的聊天会话。**把会话看成有话题性的**；一旦开始明显偏离主题，就该换新会话了。
- 作者自嘲这是个有点造作的例子，但仍请读者停下来惊叹一下：做日期选择器曾是前端最难的事情之一，随便问一个做过的人就知道。

## 结语：事情不必那么复杂

- 这套简单工作流对大多数人已经够用。简单还带来一个额外好处：**便于多线程**——保持简单，你更容易推理「哪个 agent 处在什么状态、你上一步在做什么」。而且你的上下文窗口也是有限的。
- 作者并不否认可能性空间：你可以加 MCP server、skill、指令、自定义 agent，可以搭工作流与循环，可以造「agent 提示 agent」，甚至立起整支虚拟开发团队，能做的事没有上限。
- 但要记住这句压舱石：**现在没人真的知道自己在干什么，我们都是边走边摸索**；今天的魔法咒语，很多会成为明天的反模式。

## 概念网络

### 关键概念

### harness（智能体外壳）

**context**：全文的中心词。作者明确声明「我把 harness 与 GitHub Copilot 互换使用……GitHub Copilot 就是一个 agent harness」。harness 是包裹模型的那层执行环境——模式切换、权限策略、内建循环、编排与子 agent 都住在这里。文章标题「The harness is all you need—mostly」即由此而来。

**费曼一下**：模型是发动机，harness 是整辆车：方向盘、变速箱、安全带、自动巡航。你换发动机能提速，但决定你能不能顺利到达的，是你会不会开这辆车。

### 「少即是多」：gimmick 与真实增益的分界

**context**：作者每天与 AI 工作后的判断——「less is way more」。安装什么、配置什么、怎么诱导 agent，「很有意思，但说到底像 gimmick」；真正的生产力提升来自「how I use the harness and how well I understand it」。

**费曼一下**：健身房里换器械不会让你变强，把几个基础动作练到位才会。工具的新鲜感冒充了进步，所以「少而深」通常打败「多而浅」。

### AI slop

**context**：作者用来解释信息噪声来源的概念——「让 agent 随便造一个 skill，它会欣然照办」，而无论那个 skill 是否真能用，都可以被轻易发布到各种 skill 或 MCP registry。

**费曼一下**：生成的成本降到接近零，但验证的成本没降。于是市面上充满看起来像成品、其实没人验证过的东西。判断力因此比获取力更值钱。

### YOLO 模式（Allow All）

**context**：工作流第二步。也叫「Allow All」，让 agent 无需逐次请求许可即可执行任何命令，多数工具中就是在聊天里敲 /allow-all。理由是「Agents need autonomy for you to see an increase in productivity」。

**费曼一下**：你雇了个助理，却要求他每拧一颗螺丝都先举手报告——那你自己拧还快些。自主权不是放纵，是让委托真正成立的前提。

### 审批疲劳

**context**：作者反对逐条审批的第二层理由：一遍遍按「Approve」只会训练你不读就批，「defeats the purpose」——审批这件事本身失去了意义。

**费曼一下**：警报响得太频繁，人就学会了无视警报。安全机制被点击疲劳磨钝之后，它的存在只剩下心理安慰。

### 沙箱化自主

**context**：与 YOLO 模式成对出现的约束：「When using YOLO mode, you don't want to run the agent on your local machine」，公司环境尤其如此——数据在组织系统上、错误代价高。入门选项是 GitHub Codespaces 或 development containers。

**费曼一下**：给 agent 自由，但把自由圈在一间可以随时推倒重建的房间里。爆炸半径可控，你才敢真正撒手。

### 原型先行

**context**：工作流第三步的核心主张。历史上原型是一个完整阶段、常是奢侈品，现在一个提示词就有。作者从二十个日期选择器变体里看见了「从年视图开始」的 mock，才确定自己要的交互——「这些东西你不看见就想不到」。

**费曼一下**：你不是在做作品，是在做一堆廉价的问题探测器。原型的价值不在它有多好，在它把你没意识到的选项和约束提前摊在桌面上。

### 感官模型快于密集文本

**context**：原型先行的认知基础——「As humans, we process sensory-rich models like images, shapes, and tangible layouts much faster than dense text」，所以低成本的早期原型让复杂概念立刻直观。

**费曼一下**：同样一件事，画出来两秒看懂，写出来两分钟还在猜。既然如此，就把最贵的思考环节挪到最省力的媒介上。

### 非视觉任务的可视化原型

**context**：作者把原型法推广到看似不需要图的场景：要加一个 API 端点，他仍先让 agent 做出五种实现方案的 Mermaid 图并排比较，再进实现。

**费曼一下**：接口设计、数据流、状态机本质上都是结构，结构就适合被画出来。「这事不视觉」往往只是没人试过把它画出来。

### 模型一致性与 prompt caching

**context**：实操建议——多数工作用中等模型配中等推理档位；更关键的是同一个功能/bug/增强从头到尾不换模型：只要不切换模型或推理档位，之前的对话在模型侧保持缓存，后续请求享受折扣、省 token。

**费曼一下**：换模型就像换搭档，前面讲过的背景要重讲一遍，而重讲是要付钱的。忠诚于一个搭档，在这里是可以直接换算成账单的美德。

### 规划模式与边界问题清单

**context**：工作流第四步。不新开会话直接切 /plan，让模型把你手工实现时迟早要回答的问题提前问出来：起止日期能否相同、部分选择是否有效、能否清空、「今天」是否常驻、是否允许手输与粘贴、日期以什么格式存储……你不可能想全，但模型能帮你识别很多。

**费曼一下**：规划不是写文档，是提前触发争吵。所有你没吵完的分歧，都会在实现阶段以返工的形式收利息。

### one-shot 的理论极限

**context**：作者的清醒判断——「In theory, you can get a model to one-shot anything if you compose the perfect prompt with the perfect context in the perfect order. In theory.」但没人做得到，规划的意义正是让你逼近这个理想。

**费曼一下**：完美提示词是个存在但够不着的点。承认够不着，就会把力气从「找咒语」转到「搭流程」上——后者才是可复制的。

### Autopilot：内建循环

**context**：工作流第五步。计划完成后 Copilot 提示切换到 Autopilot，它「is a built-in loop」，强制模型持续工作，确保模型真的完成了它声称要做的事——此处就是计划中的每一项。

**费曼一下**：模型天生倾向于「说完就算做完」。内建循环相当于在它身上装了一条验收流水线：没做完，就别想下班。

### 开箱即用的编排与子 agent

**context**：Autopilot 阶段 Copilot 自动当 orchestrator：读代码库文件用小模型的 Explore 子 agent，判断动作复杂就用大模型的 General Purpose 子 agent。虽然自定义 agent 和指令能给你细粒度控制，但「你什么都不用做」也能拿到子 agent 与多模型工作流的好处。

**费曼一下**：这是全文最硬的一块证据——你以为要自己搭的多智能体架构，harness 已经默认替你搭好了。不知道它存在，你照样在享受它。

### 品味与「不接受够用就行」

**context**：人工迭代阶段的纪律：「The most important thing is not to settle for AI output that is *good enough*. Insist on quality. Be ruthless about it.」这部分仍是你的责任，而分辨优质与否正是你带来的价值。

**费曼一下**：AI 把「做出来」变便宜了，于是「值不值得做成这样」成了唯一稀缺的判断。你的品味不再是装饰，它成了产品质量的最后一道闸门。

### 橡皮鸭复审

**context**：工作流第七步。Copilot 会向另一个 AI 家族的模型请求评审（作者用 GPT 5.6 Terra，它请来了 Sonnet），因为「不同模型训练数据不同，所以盲区不同」；可用于原型、计划或成品，也可与 Autopilot 组成循环直到双方都认为只剩边际收益递减项。

**费曼一下**：找同一个人复查自己的作业没用，他会犯一样的错。换一个受过不同训练的人来看，才可能照见你看不见的角落。

### 会话的话题边界

**context**：收工阶段的建议——接下来做与本功能无关的事就开新会话；「把聊天会话看成有话题性的」，一旦明显偏题就该换。呼应结语里「你的上下文窗口也是有限的」。

**费曼一下**：会话像一张桌子，堆得越杂越难找东西。定期收桌子不是洁癖，是让每次协作都从干净的台面开始。

### 「今天的魔法咒语，明天的反模式」

**context**：全文的元判断，落在结语：「nobody really knows what they are doing right now. We're all figuring this out as we go. A lot of what is today's magical incantation for AI will be tomorrow's anti-pattern.」

**费曼一下**：在一个连专家都在现学的领域里，追逐技巧的半衰期极短，理解底层机制的半衰期才长。这就是为什么押注 harness 比押注咒语划算。

### 概念网络

![图片为原文关系图，由Mermaid源码直接渲染。图中以“harness是唯一真实杠杆”为中心，围绕“少即是多”“AI slop”等概念展开。左侧有“harness智能体外壳”“YOLO模式Allow All”“规划模式与边界问题清单”等概念，右侧有“感官模型快于密集文本”“模型一致性与prompt caching”等概念。各概念间通过箭头连接，呈现支撑、起点、因果等关系，如“harness智能体外壳”支撑“少即是多”，“规划模式与边界问题清单”因果“one-shot的理论极限”等。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MTIyOWY3OGNhY2JiYTdmMTEyNzZiNjY0M2M0N2M2ODdfM2QzZDRkNWM3YWUyOGQ0ZjkxOWRhZGVkZDEzN2ZkNDZfSUQ6NzY3MTAwODA0NDczMzQ4NDI1NF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



这张网络的中心不是任何一项技巧，而是「harness 才是真实杠杆」这个主张，其余概念都在为它做三件事：立论、展开、收束。

**立论层**回答「为什么是 harness」。harness 这个概念本身给主张下定义——把 Copilot 与 harness 划等号，是为了让读者意识到自己每天在用的东西就是那层外壳；「少即是多」从正面支撑主张，AI slop 从反面解释了为什么信息流里的新工具不等于新价值：生成成本归零而验证成本没降，于是噪声必然过剩。结语的「今天的咒语明天的反模式」是同一判断的时间维度版本——它给「少即是多」提供了最强的理由：在一个所有人都在现学的领域，技巧的半衰期短于理解的半衰期。

**展开层**是八步工作流，概念之间是明确的工序演化关系。自主权（YOLO 模式）是起点，它由审批疲劳反向论证——逐条审批不只低效，还会训练你不读就批，让审批失去意义；同时它与沙箱化自主构成一组张力：自主权越大越需要边界，两者不是取舍而是配对。原型先行是下一道工序，感官模型快于密集文本是它的认知学依据，非视觉任务的可视化原型是它的适用边界扩张（连 API 设计也能画出来比较），模型一致性与 prompt caching 则是让这道工序在成本上可持续的条件。原型演化为规划，one-shot 的理论极限解释了为什么规划不可跳过——完美提示词在理论上存在、在实践中够不着，规划是逼近它的可行路径。规划再演化为 Autopilot，而开箱即用的编排与子 agent 是这一环最硬的证据：你以为要自己搭的多智能体架构，harness 默认已经搭好。

**收束层**把控制权交还给人。Autopilot 之后是人工评审，品味与「不接受够用就行」在此成为质量的最后闸门——AI 让「做出来」变便宜，于是「值不值得做成这样」成了唯一稀缺的判断。橡皮鸭复审与品味互补而非替代：它用「不同模型盲区不同」的机制补上单一视角看不见的角落，但决定哪些意见值得采纳的仍是人。会话的话题边界则从工作流侧面挂在核心主张上——它不属于任何一步，而是让这套简单流程能长期多线程运转的卫生条件。

整张图里最值得注意的一条隐含张力是：作者一边说「不需要 skill」，一边在规划步用了 grill-me、在迭代步用了自己的 CSS 框架 skill。这不是自相矛盾，而是主张的精确形状——skill 是加速器，harness 是入场券。把两者的次序搞反，就是全文要治的那种焦虑。

## 费曼 x3

被 AI 工具搞得焦虑的人，通常搞错了一件事：他们以为差距在配置上。于是每天追新模型、新 MCP、新 skill，收藏一堆「一个怪招搞定 AI」的帖子，却始终觉得别人手里有自己没有的东西。真相更朴素也更难堪——差距在你对手里那层外壳的理解深度上。模型是发动机，外壳是整辆车：模式切换、权限策略、内建循环、子 agent 编排都住在这里。你换发动机能提速，但决定你能不能到达的，是你会不会开这辆车。

这个判断之所以成立，是因为生成的成本已经归零，而验证的成本一点没降。让 agent 随手造一个 skill，它会欣然照办，能不能用不重要，照样发得上注册表。所以信息流里的丰饶从来不是价值的丰饶。在一个连从业者都在边走边摸索的领域里，「今天的魔法咒语，很多会是明天的反模式」——技巧的半衰期短得可怜，只有对机制的理解还站得住。

真正有杠杆的东西反而很少：先给 agent 足够的自主权，因为逐条审批不仅慢，还会把你训练成不读就批，让审批本身失去意义；同时把这份自主权关进沙箱，让爆炸半径可控，你才敢真正撒手。然后从原型开始——不是为了做出好东西，而是为了让你没想到的选项提前露面。人处理图像远快于处理密集文本，一批廉价原型能在几秒内告诉你「原来还可以从年视图开始」，而这是你坐在椅子上想三天也想不出来的。原型之后是规划：把手工实现时迟早要回答的问题提前问完，返工都是没吵完的架在收利息。

最容易被忽略的一环，是那些你以为需要自己搭的东西其实已经在那儿了。读文件时用小模型的探索子 agent、遇到复杂动作换大模型，这套多智能体编排开箱即用——你不知道它存在，也照样在享受它。这正是「外壳就够了」最硬的证据。

而最后那道闸门仍然是人。AI 把「做出来」变便宜了，于是「值不值得做成这样」成了唯一稀缺的判断。不要接受「够用就行」的产出，要苛刻，因为分辨优质与平庸正是你带来的全部价值。工具会一直换，这件事不会。

HOWIE 原清单 · 14

# Harness Engineering：AI-First 组织的信任机制重构

**内容说明：**硅谷101 这期把 AI-First 的重点从模型使用转到 harness：让 AI 在开发、测试、部署和反馈中持续工作。组织变化的核心不是让每个人多用 AI，而是把人的角色转向需求定义、系统架构和结果审核。

**策展人按：**话题从代码升到组织。如果 harness 真的成立，变的就不只是怎么写代码，还有谁来负责签字。清单里只有这条在讲人事。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：E238｜聊聊Harness时代AI-First的组织架构：从信任人到信任AI | 硅谷101播客
- 作者：硅谷101播客
- 内参日期：2026-07-06
- 来源类型：blog
- 原文：https://app.podwise.ai/dashboard/episodes/8185395
- 标签：harness engineering, 企业 AI

硅谷101 这期把 AI-First 的重点从模型使用转到 harness：让 AI 在开发、测试、部署和反馈中持续工作。组织变化的核心不是让每个人多用 AI，而是把人的角色转向需求定义、系统架构和结果审核。

## 导读

podcast 收录，harness engineering。

## 核心观点

这期播客讨论的不是“用 AI 工具提效”，而是 AI-First 组织真正困难的部分：当 AI 从辅助者变成生产力主导者，公司必须重构工程系统、工作流程、角色分工和信任机制。Harness Engineering 是这套重构的工程语言，它把大模型从一次性回答器变成一个能够持续运行、自我修复、吸收反馈并被组织信任的动态系统。Creao 的经验说明，效率跃迁来自两件事同时发生：一是开发、测试、部署、Bug 分诊和市场反馈被 Agent 化；二是人从执行者退到架构、需求定义、价值判断和最终审核的位置。

## Harness Engineering 是大模型工程能力的第三阶段

- 播客把过去几年的大模型工程演进分成三段：2023 年是 Prompt Engineering，重点是怎样写好提示词；2024 年是 Context Engineering，重点是怎样给模型提供更完整的上下文；到 2026 年，硅谷开始讨论 Harness Engineering。
- Harness 的对象不只是模型本身，而是围绕模型建立一套系统。Peter 强调，它包括基建、tooling、安全保障、sandbox 与 host service 的交互、启动时间、latency，以及系统如何持续 improve。
- Prompt 和 Context 更像静态优化：把一个任务喂给模型，让它在一次或少数几次交互中表现更好。Harness 则是动态系统：让 Agent 在真实世界里长时间工作、使用工具、吸收信号、发现错误并自我修复。
- 这也是为什么 Harness 的失败通常不是“模型不聪明”，而是系统没有给它足够好的护栏、反馈回路、上下文管理和工具边界。Clark 的说法很关键：不要只把 AI 当成一个智能，要把它当成一个系统；系统出错时，重点不是纠正某个回答，而是弥补系统漏洞。

## AI-First 的核心不是叠加工具，而是重构工作方式

- Creao 对 AI-First 的定义很激进：不是每个工程师用 AI 写代码、每个 PM 用 AI 写 PRD、每个设计师用 AI 做图，而是围绕 AI 的能力重新设计公司的流程和组织形态。
- 如果人仍是工具使用者，效率提升有上限，因为人的时间和对齐能力有上限。Kai 直接指出，如果想让效率提升 100 倍、1000 倍，AI 就不能只是助手，而要成为生产力的主导。
- 这种变化会把人的角色改写为 review 结果、定义目标、维护系统、判断价值。人不再是每个任务的直接执行者，而是让 AI 系统可被信任、可被约束、可持续运行的架构者。
- 真正的组织难点在“信任”。团队需要从信任人，转向信任一套 AI 驱动的系统；这要求 guardrails、验证机制、反馈链路和共同的工作方式，否则任何成员觉得“不如人做”，转型都会被拖慢。

## Creao 的开发系统把六周产品周期压缩成一天

- 播客反复提到一个对比：传统产品流程中，一个 feature 可能需要六周甚至两三个月；在 Creao 的 AI-First 工作流里，AI 辅助 coding 让实现本身只需要一两个小时，真正关键的是把 planning、design、testing 和 feedback 都纳入 Harness。
- Peter 的例子是：一家 25 人公司，99% 代码由 AI 写；早上 10 点写功能，中午 AB test，下午 3 点根据数据砍掉部分功能，5 点重写更好版本。这个节奏不是单点工具提效，而是系统已经能让 AI 主导开发和迭代。
- 市场团队也因此改变工作方式。Clark 说，开发速度已经远远超过市场能销售和消化的速度，团队不再围绕 roadmap 争论“要做什么”，而是像从产品库里挑选苹果或香蕉一样，根据市场需求选择已有能力。
- 这种模式降低了传统产研对齐成本。工程团队不再需要手动向市场同步每个功能，AI 系统会根据代码、部署、数据和功能状态向 go-to-market 团队提供可用信号。

## AI 驱动的 CI/CD 与 Bug 分诊让质量控制并行化

- Peter 承认 AI 写代码也会产生 Bug，但 Harness 的重点不是假设系统无错，而是让系统能更快发现、分诊和修复错误。
- Creao 构建了 Agent-driven CI/CD 和 Agent-driven bug triage。AI-driven integration test、unit test 和 Playwright 这类端到端测试，会在代码进入生产前拦截明显破坏产品的错误。
- 代码上线后，系统继续读取 log、error、incident 等信号，反馈给 AI 判断代码质量。Bug 出现后，不同 Agent 可以并行识别前端、后端或 Agent 核心系统的问题，并在几分钟内分派任务。
- Peter 给出的数量级是：发现一个 bug 可能只要 1 到 2 分钟，分配给工程师只要几秒，工程师再用 Agent investigate 并提出方案，整个 cycle 可以从过去的一周缩短到 1 到 2 小时。
- 更进一步，50% 以上 issue 可以通过 autofixing 处理。如果改动只涉及风险较低目录，AI 自动提交 PR，人只需简单 review 即可上线；涉及安全或 Agent behavior 的敏感文件，才需要更深的人工审核。

## 架构师成为 AI 系统的关键角色

- AI-First 并没有取消资深工程能力，而是把价值从“手写代码”转向“系统架构”。Peter 把团队角色分为 Architecture 和 Operator：前者决定 Agent 系统的结构、sandbox 与 host 的交互、安全性和 latency；后者在系统中运行和处理具体任务。
- 在传统条件下，搭一个 Agent 系统可能需要 10 到 20 人；在 AI 工作流下，一个 architecture 用一周就能完成框架。但这个效率成立的前提是架构师能识别 AI planning 的缺陷，能 challenge 方案，能让模型参考开源框架并修订计划。
- Peter 甚至说 2026 年他没有写一行代码，主要工作是和 AI 交流、criticize plan、发现 plan 的漏洞。这说明核心价值不是把键盘敲快，而是知道哪里不能让 AI 自由发挥。
- Skill 化也成为 Harness 的一部分。Peter 举例说，安全性、sandbox 与 host 交互等原则可以沉淀为 skill，下一次不用重复解释，只要让 AI follow 这个 principle，团队其他工程师也可以引用同一套规则来挑战 AI 的 plan。

## Agent 经济让“内容消费者”从人扩展到 AI

- Clark 提出一个重要外延：未来很多工作结果的消费者不一定是人，而可能是 Agent。营销素材、网页、任务管理产品甚至 SaaS Dashboard，都可能先被 Agent 阅读、筛选和调用。
- 这会改变内容与产品的评价标准。一个人类审美上不够好的 go-to-market asset，如果被 Agent 读取后带来更好的数据反馈，可能就是更有效的资产。问题不再是“人觉得好不好”，而是“真正的消费者是谁，它如何判断价值”。
- Peter 用 Asana、Linear 一类任务管理产品举例：过去人需要 dashboard 来管理任务；现在团队更关心这些产品有没有更好的 MCP 和 API，让 Agent 能读懂和使用任务。
- 这也反过来说明 Harness 不是单一工程概念，而是一种面向消费者、反馈信号和系统边界的设计方式。不同消费者是人还是 Agent，会决定系统应该优化什么。

## 组织角色被拆解，产品经理不消失但被组织化

- 传统产品经理承担大量对齐成本：连接市场、研发、设计和管理层。Creao 的做法不是否定产品判断，而是把产品经理的职能拆解到工程团队和工程管理者身上。
- 当开发成本大幅降低，谁能定义需求方向、谁能快速把想法变成产品，谁就承担产品经理的一部分职责。产品角色从一个人变成团队共同具备的能力。
- Kai 认为，未来产品经理仍然重要，但需要新的形态：要么有工程实现能力，要么有架构思维，要么能把市场想法快速落到产品中。Peter 也补充说，工程师、产品经理、设计师都需要 implementation 能力，因为当交流成本大于落地成本，传统交接流程就显得低效。
- 这意味着个人英雄主义式的 PM 会变弱，组织化的产品决策机制会变强。好产品不再只来自一个灵魂人物，而可能来自一套能持续吸收市场信号、快速实现、快速验证的系统。

## 初级工程师与资深工程师面临不同的转型压力

- Peter 的一个观察是：初级工程师往往比资深工程师更适应 AI-First 工作环境，因为他们技术债和思想束缚更少，更愿意把 scope 从写代码扩展到产品设计、数据分析和上线后的 impact 判断。
- 资深工程师的问题不是能力不足，而是过去十年、二十年积累的 specialty 正在被 AI coding 稀释。一个后端、前端或 infra 专家如果仍只关心代码交付前的部分，会很难适应新的工作闭环。
- 但资深工程师仍然不可替代。Peter 强调，真正稀缺的是能 embrace AI mindset、拥有架构能力、产品 sense 和 marketing knowledge 的资深工程师。过去可能需要很多这样的人，现在可能只需要一两个。
- 这形成一种“资深悖论”：专业知识仍有价值，但专业身份本身不再足够；资深工程师必须从写最优代码的人，变成能架构 AI 系统、识别 AI 计划缺陷、判断商业价值的人。

## 人的核心价值收敛到定义需求与审核结果

- 播客最后把问题推到更基础的层面：当 AI 可以主导执行、迭代和部分决策，人类最核心的能力是什么？
- Peter 从工程角度回答：人需要系统架构能力，从 implement feature 转向 architecture and maintain AI system。无论工程还是 marketing，核心都是搭建能自主运行的 Agent 系统。
- Kai 从长期技术演化回答：技术发展的方向仍由人的需求和社会需求决定。只要人这个物种还存在，人就负责定义需求方向，并在最终结果上判断是否符合利益、要求和伦理。
- Clark 的表达更简洁：人未来的价值是判断任何事情是否还有价值。价值定义延伸出需求定义；当我们知道自己想要什么，才能判断 AI 做出来的东西是否值得。
- 因此，这期内容的底层结论是：AI-First 并不是把人移出系统，而是把人放到更高层的判断位置。执行权交给 AI，价值判断、系统约束和最终审核仍然属于人。

## 概念网络

### 关键概念

### Harness Engineering

**context**：播客把 Harness Engineering 定义为大模型工程能力继 Prompt Engineering、Context Engineering 之后的第三阶段。它不是优化一句 prompt 或一段 context，而是围绕大模型建立包含 tooling、sandbox、安全、latency、反馈回路和自我修复能力的完整系统。

**费曼一下**：如果 Prompt Engineering 是教 AI 听懂一句话，Context Engineering 是给 AI 足够材料，Harness Engineering 就是给 AI 配一整套工作间、工具箱、安全规则和质检流程，让它能长期干活，并在出错后变得更好。

### AI-First

**context**：Creao 认为真正的 AI-First 不是员工都使用 AI 工具，而是让 AI 成为生产力主导，围绕 AI 的能力重构工作流程、组织结构和对齐机制。

**费曼一下**：不是“人照旧工作，只是旁边多了一个 AI 助手”，而是“公司默认由 AI 推动任务流转，人主要负责设定方向、搭系统和验收结果”。

### 信任机制重构

**context**：Kai 多次强调组织转型的第一步是从信任人转向信任 AI 系统。只有建立 guardrails、验证机制和结果审核机制，团队才会愿意让 AI 主导执行和对齐。

**费曼一下**：以前公司相信某个员工会把事情做好；现在公司要相信一套系统能把事情做好。这种信任不是盲信，而是靠护栏、监控、测试和人工 review 建起来。

### 动态系统

**context**：Peter 区分了静态的 Prompt/Context 优化和动态的 Harness 系统。动态系统会持续吸收 marketing、product、infrastructure 等信号，并根据反馈快速迭代。

**费曼一下**：静态系统像一份写好的说明书；动态系统像一个不断学习的工厂。它不是一次性把答案做完，而是持续根据外部反馈改进生产方式。

### Agent-driven CI/CD

**context**：Creao 将传统 rule-based 或 unit testing driven 的 CI/CD 升级为 AI-driven testing、log/error/incident 读取和 Agent-driven bug triage，用 AI 并行发现、分派和修复问题。

**费曼一下**：过去是流水线按固定规则检查代码；现在是多个 AI 质检员同时看代码、看日志、看用户反馈，发现问题后直接叫对应的人或 Agent 去修。

### Autofixing

**context**：Peter 提到 Creao 有 autofixing 系统，能根据改动文件夹风险判断是否自动提交修复 PR。风险低的改动只需工程师简单 review，50% 以上 issue 可用这种方式处理。

**费曼一下**：系统不只是告诉你哪里坏了，还会先修一版。如果问题在低风险区域，人看一眼确认就能上线；高风险区域才交给更资深的人深审。

### Architecture / Operator 分工

**context**：Peter 认为 AI 环境下工程团队可分为 Architecture 和 Operator。Architecture 负责系统设计、安全边界、sandbox 与 host 交互和整体优化；Operator 则在系统中执行具体运行任务。

**费曼一下**：Architecture 像设计工厂的人，决定机器怎么摆、危险区怎么隔离、流程怎么跑；Operator 像操作工，按系统安排处理具体任务。

### 产品经理的组织化

**context**：播客认为产品经理不会简单消失，但传统 PM 的对齐职能会被 AI 系统削弱，产品判断会分散到工程师、设计师和整个团队中，成为组织能力。

**费曼一下**：过去 PM 是一个专门传话、排优先级、定义需求的人；未来这些能力会嵌进团队每个人和 AI 流程里，PM 更像一种组织功能，而不一定是单一岗位。

### Implementation 能力

**context**：Peter 认为未来工程师、产品经理、设计师都需要把 idea 在一两个小时内带到产品中的能力，因为在 AI 环境下，交流和 alignment 成本可能大于 implementation 成本。

**费曼一下**：有想法但要层层转交给别人实现，会越来越慢；能自己借助 AI 把想法做出来的人，会更适应这个时代。

### Agent 经济

**context**：Clark 提出未来买东西、订阅、筛选信息的可能是 Agent，因此营销素材和产品界面可能越来越需要被 Agent 消费，而不仅是被人观看。

**费曼一下**：以后你的广告、网页和文档，第一读者可能不是人，而是替人做决策的 AI。你要让 AI 看得懂、愿意推荐，和让人觉得好看一样重要。

### 价值定义

**context**：播客最后讨论人的核心价值。Clark 说人未来的价值是判断任何事情是否还有价值；Kai 说人负责定义需求方向和审核结果。

**费曼一下**：AI 可以更快做事，但它不知道“什么值得做”。人最重要的工作，是告诉系统什么有意义，并判断结果是不是符合人的需要。

### 资深悖论

**context**：Peter 观察到初级工程师更容易适应 AI-First，因为思想负担较轻；资深工程师的 specialty 可能贬值，但真正能拥抱 AI、具备架构和产品判断的资深工程师更稀缺。

**费曼一下**：经验越多的人越有优势，也越可能被旧习惯困住。未来最强的资深工程师，不只是懂技术，而是能把技术经验升级成 AI 系统的判断力。

### 概念网络

![图片展示了Agent经济下的Harness工程推动组织进入AI-First的流程。从Agent经济出发，通过扩大适用范围引入Harness工程，将模型放入持续反馈与自我修复的动态系统，推动组织进入AI-First。AI-First下，执行层被AI接管后，架构设计/具体执行分工，人的价值上移到价值定义与结果审核，产品判断组织化与快速实现最终回到价值定义与结果审核。此外，还有信任机制重构、Agent驱动的质量检查与分诊、自动修复等环节。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWRkZWZkMDg1N2U2NjZjZDkzODc3OGU3MjM1MzMxY2ZfNzYyMDE4OTFkMjQ4ZjM4MmRmNWFkYTViNWE3NWZkNDZfSUQ6NzY3MTAwODA0NjM1MjQzNjQyNl8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

这篇内容的概念网络以 Harness Engineering 为中心展开。Prompt Engineering 和 Context Engineering 解决的是模型单次表现问题，Harness Engineering 则把模型放进动态系统中，要求它长期使用工具、吸收信号、处理错误并自我修复。要让这个动态系统在组织中成立，公司必须进入真正的 AI-First：AI 不再是人的助手，而是生产力主导。

AI-First 会直接触发信任机制重构。组织从信任具体的人，转向信任一套由 guardrails、测试、日志、反馈、review 和权限边界组成的 AI 系统。Agent-driven CI/CD、bug triage 和 autofixing 是这种信任机制在工程侧的具体实现：它们让系统能并行检查质量、快速发现问题，并在低风险区域自动修复。

当执行层被 AI 接管，人的角色就向上移动。Architecture / Operator 分工说明，人的高价值不再只是写代码，而是设计系统、定义边界、识别 AI planning 的缺陷。产品经理的组织化和 implementation 能力，则说明产品判断不再集中在单一岗位，而是分布在能快速把想法落地的复合型成员和 AI 流程中。

Agent 经济进一步扩大了 Harness 的适用范围：如果内容、产品和任务管理系统的消费者变成 Agent，系统就必须围绕新的消费者重构反馈标准。最终，所有这些概念都回到价值定义：AI 可以主导生产、对齐和修复，但“什么有价值”“需求是什么”“结果是否可接受”仍需要人来定义和审核。Harness Engineering 的真正目标，不是让 AI 脱离人，而是让人能在更高层次上驾驭 AI 系统。

HOWIE 原清单 · 15

# 一次关于 Loop 的工程争论

**内容说明：**这条推文围绕 Peter Steinberger 与 Boris Cherny 对 loop 的讨论展开，适合补充今天“Loop Engineering”主题。它说明 agent 产品真正难点常常不在模型调用，而在循环何时停止、如何观测、怎样验收。

**策展人按：**往下三条专讲 loop，harness 里最容易被低估的零件。开场就是两个人吵架，比直接看结论有意思。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：WTF Is a Loop? Peter Steinberger vs. Boris Cherny
- 作者：Matt Van Horn
- 内参日期：2026-06-16
- 来源类型：twitter
- 原文：https://x.com/mvanhorn/status/2063865685558903149/?rw_tt_thread=True
- 标签：agentic workflow, harness engineering

这条推文围绕 Peter Steinberger 与 Boris Cherny 对 loop 的讨论展开，适合补充今天“Loop Engineering”主题。它说明 agent 产品真正难点常常不在模型调用，而在循环何时停止、如何观测、怎样验收。

## 导读

loop engineering

## 核心观点

这篇文章追问的是 2026 年 AI coding 圈里突然爆火的一句话：不要再直接 prompt coding agents，而是设计会 prompt agents 的 loops。作者的判断是，这句话之所以引发争论，不是因为 loop 只是新名词，也不是因为 prompt engineering 已死，而是因为它准确描述了 AI 编程的下一层抽象：工程师不再只在会话里给模型下指令，而是写一个能反复提示、检查、调度、恢复和停止的系统。

作者把 loop 放进一条历史谱系里：ReAct 是模型推理、调用工具、读取结果、继续的学术 while-loop；AutoGPT 把目标交给模型自我推进，却暴露出失控和空转；ralph loop 用固定上下文和重复 prompt 让单 agent 迭代；/goal 和 /loop 产品化了这种模式；而 Boris Cherny 和 Peter Steinberger 所说的新 loop，是多 agent、可调度、可恢复、可验证的持续编排系统。文章最后把重点从 loop 转向 skill：loop 是管道，真正能复利的是它调用的可复用技能。

## 争论的起点：一句话出圈，但定义并不清楚

- Peter Steinberger 在 2026 年 6 月 7 日发出的核心说法是：工程师不应再只是 prompt coding agents，而应设计会 prompt agents 的 loops。
- 这句话获得了极高传播，作者用它观察到一个反差：几乎所有人都在引用 loop，但很多人无法说明它在工程实践里到底是什么。
- 最准确的评论来自一条区分旧 loop 和新 loop 的回复：它不是 ralph 或 goal 这种单 agent 循环，而更像一种持续编排 loop，负责监督其他线程或 agents。
- 作者没有把这场争论当成纯 hype，因为他自己每晚运行 loop，让 agents 在睡眠时间给大约三十个开源仓库打开 PR。
- 争论的真正主题不是“prompt 过时了”，而是工程师的位置发生变化：从循环内部的人类 prompt 发送者，移动到循环外部的系统设计者。

## Boris Cherny 给出的定义：model 成为 subroutine

- Boris Cherny 在 WorkOS 的 Acquired Unplugged 活动上给出作者认为最清楚的定义：他现在不再直接 prompt Claude，而是写正在运行的 loops，由 loops 去 prompt Claude 并判断下一步做什么。
- 文章给出一个朴素定义：loop 是一个小程序，它替你 prompt coding agent，读取 agent 的产物，判断是否完成；如果没完成，就再次 prompt。
- 在这个结构里，人类不再是循环里的操作者，而是循环的作者；模型不再是对话对象，而是系统中的一个 subroutine。
- Boris 的个人演进被概括为三阶段：一年前靠 autocomplete 手写代码；随后同时跑五到十个 Claude sessions 并逐个 prompt；现在写 loops，让几百个 agents 读取 GitHub、Slack、Twitter 并决定下一步构建什么。
- Boris 还提供了一个强烈信号：他在最近 30 天给 Claude Code 的贡献 100% 由 Claude Code 写出，并落地 259 个 PR。
- 作者强调，Boris 并不是说工程师消失了。相反，决定做什么、理解客户、协调团队仍然更重要；变化只是工程师的抽象层级从“写代码”上升到“写会写代码的东西”。

## loop 不是单一技术，而是一条从 ReAct 到编排的谱系

- 作者认为回复之所以混乱，是因为 loop 这个词至少覆盖五种不同层级。
- 第一阶段是 2022 年 ReAct：模型推理、调用工具、读取工具结果，再重复，通常是一模型一循环，并有人类监督。
- 第二阶段是 2023 年 AutoGPT：给模型一个目标，让它自我 prompt 和推进；它的失败模式是容易长时间空转，让很多人形成“agents are a toy”的印象。
- 第三阶段是 Geoffrey Huntley 在 2025 年发布的 ralph loop：一个几乎简单到粗暴的 bash 循环，反复把同一个 prompt 文件喂给 agent。
- ralph 的真正创新不是复杂性，而是上下文纪律：每次迭代都重置到固定 anchor files，而不是让对话上下文无限增长。
- 第四阶段是 2026 年春天 Codex 和 Claude Code 把 ralph 式模式产品化为 /goal：持续运行，直到小验证模型确认任务完成。
- 第五阶段才是 Steinberger 和 Boris 意义上的新东西：loop 成为工作单元，而不是单次任务；loop 可以并发监督其他 loops；调度替代人类 kickoff；git-backed state 和 crash recovery 让它能在基础设施时间里持续运行。
- 作者的结论是：single-agent ralph loop 已经是旧帽子，新的层级是 multi-agent orchestration loop。

## 为什么它不只是“cron 换皮”

- 文章正面回应了怀疑者的说法：如果 loop 只是定时运行的东西，那确实就是 cron，Boris 的 loop 也可以真的跑在 cron 上。
- 但作者认为这只说对了一半。传统 cron job 执行的是固定脚本，而 agent loop 的中间有一个会读取当前状态、选择下一步、执行、检查并决定是否继续的模型。
- 关键区别在于 decision-maker：不是硬编码分支决定下一步，而是模型在每个 tick 里根据状态做判断。
- 当多个 loop 被堆叠起来，由一个 loop 分派和监督其他 loop，并共享持久状态时，它就表达了 cron 无法表达的动态编排。
- 文章给出的诚实表述是：loop 不是魔法，也不只是 cron；它是 cron plus a decision-maker in the body，真正的工程难点是包住这个决策者，让它不会冲出边界。

## 实践入口：从一行 /loop 到 Gas Town 式多 agent 系统

- 作者给出的最小入口是 Claude Code 的 /loop：让它 babysit 所有 PR，自动修复 build 问题，并在评论出现时用 worktree agent 修复。
- Boris 后续提出五条运行 Opus 数小时或数天的建议：开启 auto mode 减少权限中断；使用动态 workflow 编排大量 agents；用 /goal 或 /loop 持续推进；在 cloud 中运行 Claude Code；给 Claude 端到端自验证能力。
- 作者强调第五条最关键：一个 loop 的可信度取决于它检查自己工作的能力。
- 面向普通用户的理解是：AI coding 正从 one-off prompts 转向 background operations。人类写意图和停止条件，loop 每个 tick 再去 prompt agent。
- 深水区例子是 Steve Yegge 的 Gas Town：二三十个 Claude Code instances 由 Mayor agent 协调，patrol agents 连续运行，状态存在 git 里，崩溃后还能恢复。
- 作者把 Gas Town 视为“持续编排 loop 监督其他线程”的现实版本，而不是概念幻灯片。

## 反馈和验证是 loop 能不能工作的核心

- 文章反复强调，最快增长的子主题不是 orchestration，而是 verification。
- 如果 open loop 只会写代码、没有反馈，它会变成制造 confident mistakes 的机器。
- 可靠的 loop 必须写、运行、读取结果、修正，把反馈放进循环内部。
- 作者引用 roborev 这类背景 commit review 工具作为方向：每个 commit 都被审查，结果在上下文仍然新鲜时反馈给 agent。
- 这里的要点是：loop 本身不是魔法，loop 里的 feedback 才是让它产生工程价值的部分。
- 因此，设计 loop 不能只设计 prompt，还要设计验证门禁、失败回路、回滚策略、日志、状态和停止条件。

## 成本从写代码转移到管理 loop

- 文章后半段把问题从哲学拉回财务：当模型能低成本写出大量代码时，昂贵的部分变成管理 agent loop。
- 一个工程师的讽刺说法是：他今年交付的每个 AI agent 本质上都是 for-loop、一次 LLM call，以及包住 JSON parsing 的 try/catch，真正 agentic 的地方只是月底的 Anthropic 账单。
- Uber 对 Claude Code 和 Cursor 给工程师设下每人每工具每月 1500 美元上限，是作者用来说明成本现实的案例。
- 生产环境最怕的失败模式是不会停止的 loop：无限迭代、无进展但持续消耗 token 或预算。
- 因此严肃的 loop 设计都会收敛到三种 hard stop：最大迭代次数、no-progress detection、token 或 dollar budget ceiling。
- 作者把浪漫版本和生产版本区分开：浪漫版本是让一千个 agents 一夜建公司；生产版本是写 loops，并把大量工作花在确保它们会停。

## 最终答案：loop 是管道，skill 才是资产

- 作者最后把自己的结论落在 skill 上：loop 是 plumbing，真正的资产是它调用的 skill。
- Steinberger 关于 loops 的另一半观点是：如果一件事做超过一次，就把它变成自动化 skill；如果一件事很难，做完后也把它变成 skill，让下一次免费。
- 一个没有可复用技能的 loop，只是包住陌生 agent 的 while-true；一个能调用锋利、经过测试、命名清楚的技能库的 loop，才会复利。
- 文章对“WTF is a loop”的最终回答不是 prompt engineering 死了，而是：不要再做循环里的那个人；写一次 loop，给它值得调用的技能和可检查自己的反馈，给它预算和停止边界，然后让它在基础设施时间里运行。
- Steinberger 和 Boris 描述的是同一种工程转向：从会话式 prompt，转向可调度、可验证、可恢复、可复用的 agent 操作系统。

## 概念网络

### 关键概念

### Loop engineering

**context**：文章围绕 Steinberger 的说法展开：工程师不再直接 prompt coding agents，而是设计会 prompt agents 的 loops。Loop engineering 指的不是把 prompt 写得更漂亮，而是写一个能提示、读取、判断、重试、调度和停止的程序结构。

**费曼一下**：以前你亲自一遍遍催 AI 写代码；现在你写一个“自动催 AI 的小系统”。这个系统知道什么时候继续、什么时候停、什么时候检查结果。

### Model as subroutine

**context**：作者说 loop 出现后，模型变成系统里的 subroutine。人类不再把 Claude 当成一个对话对象，而是把它当成 loop 在某一步调用的能力。

**费曼一下**：AI 不再是你正在聊天的同事，而像代码里的一个函数。你的程序需要判断时调用它，用完再根据返回结果继续执行。

### Continuous orchestration loop

**context**：文章认为 Steinberger 和 Boris 真正指的是持续编排 loop：它不只执行一个任务，而是监督其他线程、agents 或 loops，并且能按计划长期运行。

**费曼一下**：这不是一个人反复问 AI，而是一个调度室。调度室里有很多 AI 工人，loop 负责分工、检查、追踪和接着派活。

### Ralph loop

**context**：ralph loop 是 Geoffrey Huntley 在 2025 年发布的单 agent 循环：反复把同一个 prompt 文件喂给 agent，并在每次迭代时重置到固定上下文。

**费曼一下**：ralph loop 像每天让同一个实习生从同一份任务清单和资料夹重新开始干活，避免他被越来越长的聊天记录带偏。

### Context discipline

**context**：作者认为 ralph 的创新在于上下文纪律，而不是循环本身。固定 anchor files 避免对话无限膨胀，让每次迭代回到稳定的任务边界。

**费曼一下**：AI 很容易被长聊天搞糊涂。上下文纪律就是每轮只给它该看的材料，让它少带旧噪音上路。

### Decision-maker in the body

**context**：作者回应“loop 只是 cron”时提出，loop 的区别在于身体中间有一个 decision-maker：模型根据当前状态决定下一步，而不是执行固定脚本。

**费曼一下**：cron 像闹钟，到点就按固定步骤做事；agent loop 像带判断力的闹钟，到点先看看现场，再决定该做哪一步。

### Git-backed state

**context**：第五阶段 loop 的新特征之一是显式 durability，包括 git-backed state 和 crash recovery。Ralph 假设终端一直开着，2026 版本假设系统可能重启。

**费曼一下**：loop 要长期运行，就不能只靠当前窗口里的记忆。把状态存进 git，就像每一步都留下可恢复的存档。

### Self-verification

**context**：Boris 的五条建议里最关键的是让 Claude 有端到端自验证能力。作者认为 loop 的可信度取决于它检查自己工作的能力。

**费曼一下**：会干活的 AI 不够，必须会检查自己有没有干成。没有自检，loop 只是在更快地制造错误。

### Feedback loop

**context**：文章把 verification 视为 loop 真正工作的核心。写代码、运行、读取结果、修正，构成一个能纠偏的 feedback loop。

**费曼一下**：反馈回路就是让 AI 做完后看到结果，再根据结果改。没有反馈，它只是闭眼往前冲。

### No-progress detection

**context**：生产 loop 需要 hard stops，其中一个是 no-progress detection。它用于识别 loop 虽然还在消耗预算，但实际上没有推进任务。

**费曼一下**：如果 AI 连续几轮都没把事情变好，就应该停下来，而不是继续烧钱假装努力。

### Budget ceiling

**context**：作者用 Uber 的 AI 工具预算上限和无限 loop 的风险说明：成本已从写代码转移到管理 loop，因此 token 或 dollar budget ceiling 是必要边界。

**费曼一下**：给 loop 一张信用卡时，必须先设额度。否则它可能在你睡觉时把账单跑爆。

### Skill as asset

**context**：文章结尾说 loop 是 plumbing，资产是它调用的 skill。可复用、测试过、命名清楚的 skills 才能让 loop 复利。

**费曼一下**：loop 像自动化流水线，skill 像流水线上的专用工具。流水线本身不值钱，值钱的是里面那些越用越成熟的工具。

### 概念网络

![图片展示了从Ralph单Agent循环到持续多Agent编排的概念网络。Ralph单Agent循环真正留下模型成为系统子程序和固定输入与上下文纪律。围绕它设计Loop工程，减少长上下文漂移，支撑长期运行，作为管道调用，推动下一轮修正。Git状态与崩溃恢复提供刹车，无进展检测与预算上限提供刹车。持续多Agent编排必须具备自我验证，可复用Skill资产形成反馈回路。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODQ1OWQ3MTA4NDNiOWQ4YmNkMzY5MjJlMTJlODVjMDlfMDQ1M2NhZDBjNWVlZjc3ZGVlOGNjMmRhZDI5M2U4MWNfSUQ6NzY3MTAwODAzMjg0Njc5MzkzMF8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

这篇文章的概念网络可以从“抽象层级上移”理解。最底层是 model as subroutine：模型不再是聊天窗口里的对象，而成为系统调用的一步。围绕这个 subroutine，人类开始做 loop engineering，把提示、执行、读取结果、判断完成与继续迭代包装成程序。

Ralph loop 和 context discipline 是从单 agent 时代走向 loop engineering 的中间环节。Ralph 证明了简单循环也能产生实际产出，但它真正留下来的不是 bash while-loop，而是固定输入、固定上下文和可重复迭代的纪律。这个纪律解决的是 agent 在长上下文里漂移的问题。

Continuous orchestration loop 把单 agent loop 推进到多 agent 编排。它需要 git-backed state 支撑持久运行和崩溃恢复，也需要调度机制让 loop 在基础设施时间里运行，而不是等待人类每次 kickoff。在这一层，loop 不再只是执行一个任务，而是成为分派和监督其他任务的工作单元。

但编排本身会放大风险，所以 self-verification 和 feedback loop 成为系统可信的中心。没有验证，loop 只是在不断制造未经检查的输出；有了反馈，loop 才能把 build、review、测试、评论和失败信号读回来，推动下一轮修正。

最后，成本约束把系统从 hype 拉回生产。No-progress detection 和 budget ceiling 是 loop 的刹车系统，防止它在无进展状态下无限运行。文章由此得出最终判断：loop 是管道，skill as asset 才是长期复利的部分。好的 loop 调用好的 skills，并用反馈和边界约束它们；坏的 loop 只是昂贵的 while-true。

HOWIE 原清单 · 16

# Loop Engineer：把 Agent 工作流变成可复用知识模板

**内容说明：**AI Jason 讲解 Loop Engineer 的真实搭建方式，并给出 codebase harness 与知识模板。它的价值在于把一次性提示词沉淀成可复用的 agent 操作循环。

**策展人按：**吵完了看做法。重点不在搭 loop，在搭完之后它还能不能被第二次用上。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：wtf is Loop Engineer & how to setup for real
- 作者：AI Jason ·
- 内参日期：2026-06-21
- 来源类型：YouTube
- 原文：https://www.youtube.com/watch?v=W6x-hb44C0c
- 标签：agentic workflow, harness engineering

AI Jason 讲解 Loop Engineer 的真实搭建方式，并给出 codebase harness 与知识模板。它的价值在于把一次性提示词沉淀成可复用的 agent 操作循环。

## 导读

只为一个概念：loop engineering。因为，agent 的一句话定义就是：llm runs tools in a loop to achieve a goal。

## 核心观点

- 这篇内容的核心不是“更会 prompt 一个 coding agent”，而是把人的一次性提示升级成可复用、可触发、可记账、可复盘的 agent loop。Loop engineer 的工作，就是设计让 agent 自动被唤醒、读取上下文、执行任务、写入状态、积累信号，并在下一轮继续变好的外部系统。
- 作者把 agent 的基本形态压缩成三个底层部件：programming language agent loop、memory layer、tool access。真正的新变化发生在这三者之外：当任务跨越 30 分钟、2 小时、多 session、多 agent 时，系统需要一个 agent harness 来处理触发器、共享文件、日志、编排和验证。
- loop engineering 的价值来自“复利”。单个 support loop 能每 30 分钟处理工单；SEO loop 能每天发布页面；ads loop 能发现关键词机会。但当这些 loop 都读写同一套 signals、artifacts 和 contracts 时，支持、增长、产品、工程之间开始共享同一个“脑子”，不同 loop 观察到的机会会互相喂给对方。
- 作者给出的落地重点很工程化：代码库必须 legible、executable、worktree friendly、verifiable；文件系统必须有 artifacts、loop contract、global work log；验证最好交给只读 verifier，而不是让执行 agent 自证完成。

## 从 prompt engineering 到 loop engineering：使用 LLM 的重心变化

- 2023 年 GPT-3.5/4 API 刚出现时，多数用法仍是 task completion：输入 API prompt，让模型输出文本，用于结构化抽取、写作或转换。因为模型不确定，prompt engineering 主要是在单次调用里安排上下文，约束输出风格和格式。
- 到 2024 年中，模型能力增强，context window 从数千 tokens 扩到 128k，再到 1 million token 级别。更大的上下文让模型不只是“输出文本”，而是带着 MCP 等工具自己决定下一步，把 tool call 和 tool response 放回对话，循环执行到任务完成。
- 随着 agent 能做更长任务，context window 反而变成稀缺资源。作者提醒，即使标称 1 million tokens，真实有效窗口也可能只有 128k 到 200k。于是系统需要 prompt cache、compaction strategy、skill 等技术，避免每次都把所有背景塞进上下文。
- 2025 年之后，重点进一步转移到长任务、跨 session work 和多 agent 协作。问题不再只是“怎么让一个 agent 完成这次任务”，而是“怎么让整个 agentic system 自己决定下一步该做什么，并把状态延续到下一轮”。

## agent harness：模型之外的系统层

- 作者引用了 LangChain 语境里的 agent harness：凡是 non-model 的部分，都可以算 harness。这个定义很宽，容易让人困惑，因为它包含 prompt、context management、orchestration、hooks、state、logs、环境工具等大量东西。
- 一个更有用的二分是：第一层优化 agent loop 本身，让一个 Codex、Claude Code 或自建 Python agent 更好地完成单个任务；第二层优化 agentic system 的外部环境，让系统知道何时触发、做什么、交给谁、结果如何沉淀。
- loop engineer 主要处理第二层。它不是继续手写 prompt 给 agent，而是搭建环境：定时任务、webhook、另一个 agent、incident 事件都能触发 agent；agent 执行 investigation 和 action 后，把 backlogs、ideas、frictions、logs 写回共享状态，供下一轮阅读和学习。
- 这个外部 harness 让 agent 从“被人提示的一次性劳动力”变成“会被系统自动唤醒的工作单元”。人的角色从发 prompt 转向设计触发器、状态模型、共享目录、验证机制和升级路径。

## support loop 示例：从处理工单到触发工程修复

- 作者用 support loop 解释 loop engineering 的最小可行形态：每 30 分钟由 cron 唤醒 agent，读取近期 support tickets，回复还没有被自动处理的问题，并记录用户摩擦、产品想法和工程 bug。
- 第一层价值是自动处理重复支持问题，同时留下产品改进线索。agent 不只是回复用户，还会把观察到的问题写成 signal，例如多个用户询问如何 export files，就在 signals 文件夹里创建或更新一个相关条目。
- 第二层价值是闭环：如果支持 loop 发现明确 bug 或高频产品摩擦，它可以触发 coding agent 直接实现修复，再监控是否还有用户遇到相同问题，甚至告诉客户修复已经上线。
- 这个例子说明 loop 的威力不在“每次执行都很聪明”，而在“每次执行都能把结果写到系统里”。如果没有共享状态，support agent 每 30 分钟醒来只是重复巡检；有了 signals 和 task artifacts，它就能把一线用户反馈转化成工程优先级。

## 多个 loop 如何复利：shared brain 与 signals

- 作者公司里有 support loop、SEO loop、growth loop、ads loop 等多个定时循环。每个 loop 都有自己的触发节奏和职责，但它们都读写同一套共享文件系统。
- signals 是其中最重要的抽象之一。它可以记录 product ideas、frictions、opportunities、conversion gaps、keyword opportunities 等跨部门信号。一个 signal 文件会持续追加来源、用户案例和时间线，而不是每轮重新生成一份孤立报告。
- SEO loop 每天 9 点拉数据、研究主题、发布 SEO 页面；如果它发现某条路径点击很多但转化不足，就写入 conversion gap signal。ads loop 如果发现某个 keyword 点击率好但没有 organic content，也把这个信号反馈给 SEO loop。
- 复利发生在“互相读写”上：growth loop 不只看自己的 analytics，还会读取 support、SEO、ads 产生的 signals，于是能优先修复多次出现的 bug，或抓住营销团队观察到的机会。多个 loop 每小时或每天运行，但共享同一个决策背景。

## 四个核心组件：trigger、file structure、tools、parallel environment

- 第一是 triggers。触发器可以是 cron、webhook、incident、另一个 agent、用户事件或业务数据变化。好的 trigger 让 agent 在正确时机醒来，而不是等人手动发 prompt。
- 第二是 file structure。作者认为这是最重要的部分，因为跨 session、跨 agent 的工作必须依赖稳定、可读、可追加的状态系统。文件结构承担 memory、coordination、review、handoff 的职责。
- 第三是 tools and connectors。agent 必须能访问业务系统、日志、数据库、支付、客服、浏览器、仓库和测试工具，否则 loop 只能写总结，无法做 meaningful work。
- 第四是支持 parallel and autonomous work 的环境。代码库和运行环境必须允许多个 agent 同时工作、互不踩踏，并且每个 agent 都能验证自己的改动。没有这个前提，loop 一多就会互相冲突。

## codebase harness：让代码库对 agent 可读、可跑、可验

- legible codebase 意味着 agent 能快速判断“该改哪里”。作者提到 OpenAI 的 AGENTS.md 作为索引入口，指向其他文档，让 agent 渐进发现信息。除此之外，还可以用 custom lint 或 programmatic link check 把规则注入工具链，避免 agent 误用 legacy folders 或错误 repo。
- executable codebase 意味着 agent 可以用低 token、低认知负担启动本地环境。作者团队有 dev.local 脚本，让 agent 一步拉起开发环境；同时要求 worktree friendly，使 5 个 parallel agents 在不同 worktree 中都能启动和测试。
- verifiable codebase 意味着 agent 有工具证明结果。作者推荐 Playwright CLI，因为它可以操作浏览器、记录视频、附到 PR。关键路径需要端到端测试，例如 upgrade flow、sign up flow、核心创建流程。
- 作者强调，不要让 agent 只做 self-verification。更好的做法是在 PR skill 里要求执行 agent spawn 一个 read-only verifier agent，并给它详细规格。执行和验证分离，能减少“看起来完成但实际没完成”的情况。

## 文件系统抽象：artifacts、loop contract、logs

- artifacts 是每个 agent 工作或发现的输出，也是 shared knowledge layer。它可以包括 docs、signals、tasks、tickets、campaigns 等类型。每种 artifact 应有自己的文件夹和 README，写清楚内容边界、创建流程、schema 和时间线。
- loop contract 是每个 loop 自己的 README，说明 goal、workflow、boundaries、backlog 和 timeline。agent 每次被触发前先读 contract，理解当前领域的目标、流程、历史和待办，再决定下一步动作。
- global work log 用来记录跨领域的 ad hoc 信息和当天整体工作上下文。作者的理由是，人类一天既会 review loop 输出，也会和 agent 共同做一些创造性或困难任务；全局 log 帮助新 session 先读最近 5 到 10 条，理解整体进展。
- 三类文件形成分工：artifacts 记录结构化业务对象，contract 管理单个 loop 的职责和状态，global log 串起跨 loop、跨 domain 的临时上下文。

## 从手动试跑到自动 loop：先校准，再固化

- 作者建议不要一开始就自动化。以 support loop 为例，先让 agent 拉取过去一小时的工单，分析问题、草拟回复、保存 ticket artifacts、记录 signals、创建 engineering tasks，并在最后写 log。
- 这次 test run 的目的不是炫技，而是校准 workflow：哪些问题该直接回复，哪些需要查 Stripe、Supabase、Render logs，哪些只是产品反馈，哪些应该触发 engineering task。
- 当试跑结果符合预期，再让 agent 创建 domain/support/README 作为 contract，写入 goal、workflow、timeline 和 backlog，然后配置每小时触发的 loop。
- 这体现了 loop engineering 的基本姿势：先用人类监督跑一轮，确认边界和输出物，再把流程沉淀成 contract、artifacts 和 trigger。可复用知识模板不是事后文档，而是下一轮 agent 会真实读取和执行的操作系统。

## 概念网络

### 关键概念

### Loop Engineer

**context**：作者把 loop engineer 定义为不再直接 prompting coding agent，而是 designing loops that automatically prompt agents。这个角色关注触发器、状态、日志、共享文件、验证和多 agent 协作，让 agent 在无人提示时也能持续产出。

**费曼一下**：以前你是“给工人派活的人”，每次都要站在旁边说下一步。loop engineer 像是在设计一条流水线：什么时候开工、看哪张工单、把结果放哪里、失败怎么查、下一班人如何接手，都先设计好。

### Agent Harness

**context**：文中用 harness 指模型之外的一切：prompt/context 管理、orchestration logic、hooks、state、logs 和运行环境。作者认为更实用的理解是：它是 agent runtime 外面的工作环境，决定系统如何触发 agent、保持状态并持续改进。

**费曼一下**：agent 是发动机，harness 是车架、仪表盘、油路和道路规则。发动机再强，没有车架和仪表盘，也很难长期稳定地跑业务。

### Agent Loop

**context**：作者把基础 agent pattern 归纳为 programming language agent loop、memory layer、tool access。模型使用工具，把 tool call 和 tool response 放回对话，持续循环，直到它判断任务完成。

**费曼一下**：agent loop 就像一个会查资料、会动手、会看结果的循环：想一步，调用工具，读反馈，再想下一步。loop engineering 关心的是让这种循环被系统自动调度，而不是每次由人按下启动按钮。

### Shared File System

**context**：多 session、多 agent 工作需要一个 shared folder system 来记录状态。support、SEO、ads、growth 等不同 loop 都会读写 signals、artifacts、tasks 和 logs，使各自观察到的信息能被其他 loop 复用。

**费曼一下**：共享文件系统就是团队白板。每个 agent 都把看到的问题、做过的动作、下一步线索写上去，其他 agent 进来后不用重新问一遍，就能接着干。

### Signals

**context**：signals 用来保存 product ideas、user frictions、opportunities、conversion gaps、keyword opportunities 等观察。一个 signal 会不断追加来源和时间线，例如多位用户询问 export files，就更新同一条导出相关 signal。

**费曼一下**：signal 是“值得系统记住的业务信号”。它不是一次性总结，而是一个会累积证据的线索卡片：每多出现一次相关现象，就往同一张卡上加一笔。

### Loop Contract

**context**：每个 loop domain 里有 README 作为 contract，写清 goal、workflow、boundaries、backlog 和 timeline。agent 每次触发时读取 contract，理解这个 loop 的目标和历史，再执行下一轮工作。

**费曼一下**：loop contract 像岗位说明书加交接班记录。它告诉 agent：你负责什么、不负责什么、按什么流程做、上次做到哪、现在还有哪些待办。

### Legible Codebase

**context**：作者强调代码库要让 agent 容易理解哪里该改。AGENTS.md、文档索引、custom lint、programmatic link check 都是 context engineering 的一部分，目的是减少 agent 找错入口或误用旧模块。

**费曼一下**：legible codebase 就是路标清楚的城市。agent 不需要在每个路口猜方向，规则和入口会在它要走错时及时提醒。

### Executable Codebase

**context**：executable 指 agent 能低成本启动 dev server、进入特定状态并测试场景。作者提到 dev.local 脚本、worktree friendly、状态跳转脚本，都是为了让 agent 把注意力放在任务本身，而不是环境摸索。

**费曼一下**：如果每次开工都要先花半小时装机器，loop 就跑不起来。executable codebase 是“一键开机”的工作台。

### Verifiable Codebase

**context**：verifiable 指 agent 有可靠工具验证改动。作者推荐 Playwright CLI、关键 E2E tests、PR skill 和 read-only verifier agent，强调不要只让执行 agent 自己证明自己做对了。

**费曼一下**：可验证的代码库不是让 agent 说“我觉得好了”，而是让它交出录像、测试结果和独立检查。结果能被复核，循环才敢自动化。

### Artifact Schema

**context**：作者把 artifacts 看作 shared knowledge layer，并建议每种 artifact 都有 README、schema、添加流程和 timeline。schema 让不同 loop 产生的文件可读、可合并、可被小应用展示。

**费曼一下**：artifact schema 是统一表格格式。大家都按同一列写，后面的 agent 和人类才能排序、筛选、追踪和复用。

### Cross-session Work

**context**：文中说新的任务形态不再是一个 agent 完成全部工作，而是多个 agent session 各自处理一部分，在循环中持续推进。它要求外部状态能跨 session 保存和恢复。

**费曼一下**：cross-session work 就像多人接力跑。每个人只跑一段，但接力棒必须清楚，上一棒要留下位置、速度和下一步，否则下一棒只能重跑。

### Read-only Verifier Agent

**context**：作者在 PR skill 中要求执行 agent spawn 一个 read-only verifier agent，并提供详细 spec。这样验证者不修改代码，只检查结果是否符合要求，避免执行者自我确认。

**费曼一下**：这是把“做题的人”和“改卷的人”分开。做题的人可能看漏自己的错误，独立改卷更可靠。

### 概念网络

![图片是Harness Engineering AI内参主题精选中关于概念网络的图示，展示了Agent的基本能力层和Harness与环境层。基本能力层包括记忆层、工具访问、智能体循环、自动执行，解释Agent执行操作性任务的能力。Harness与环境层有Harness、稳定自动化、跨循环协作、复利效应，决定Agent Loop能否长期稳定运行，还涉及共享文件、信号、契约与输出规范。该图与上下文概念网络的三层结构相呼应，直观呈现了各部分关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWMyZDJjYjBmMTg3NjIxOGRmMmEzZmZlZTA1NGE0NzVfNGRmODg3NDg0ZGYwODdiMDljZGNlYzRhYzQ2ZWQ4ODlfSUQ6NzY3MTAwODAzMzk3OTI3MjQzOV8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

这篇内容的概念网络可以从三层看。

第一层是 agent 的基本能力层：Agent Loop 依赖 memory layer 和 tool access，能在一次任务中反复思考、调用工具、读取反馈。这一层解释了为什么 agent 不只是文本生成器，而是能完成操作性任务的执行单元。

第二层是 harness 与环境层：Agent Harness、Legible Codebase、Executable Codebase、Verifiable Codebase 共同决定 agent loop 能不能长期稳定运行。legible 解决“知道去哪改”，executable 解决“能不能跑起来”，verifiable 解决“怎么证明完成”，harness 把这些非模型能力组织成可复用工作环境。

第三层是跨循环协作层：Shared File System、Signals、Loop Contract、Artifact Schema、Global Work Log 和 Cross-session Work 共同构成 loop engineering 的状态系统。signals 让不同 loop 共享观察，artifact schema 让输出可被机器读取，contract 让每个 loop 有职责边界，global log 串起跨领域上下文，cross-session work 让多 agent 能接力。

三层之间的关系是递进的：没有 Agent Loop，就没有自动执行；没有 Harness 与可验证环境，单个 agent loop 只能偶尔完成任务，无法放心自动化；没有共享文件和 contract，多个 loop 会各自为政，无法形成作者说的 compound effect。

因此，Loop Engineer 的核心任务不是发明一个更漂亮的 prompt，而是把触发、执行、记忆、验证、交接和复盘组织成一个会持续学习的系统。prompt engineering 优化的是一次模型调用，agent harness 优化的是一次 agent 执行，而 loop engineering 优化的是多轮、多 agent、多业务信号之间的复利结构。

HOWIE 原清单 · 17

# 从 Prompt 转向 Loop Engineering 的工作流拐点

**内容说明：**文章主张单次提示词正在让位于可观察、可迭代、可管理的循环系统。对 AI 内参来说，这条更像是“agent 产品化”的操作提醒：设计闭环比设计一句 prompt 更关键。

**策展人按：**Loop 三条的收尾，也是最能改习惯的一条。你手上那些还在打磨措辞的 prompt，大概都该重新看看。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：Prompt该退环境了，未来属于Loop Engineering。
- 作者：数字生命卡兹克
- 内参日期：2026-06-16
- 来源类型：公众号
- 原文：https://mp.weixin.qq.com/s?\_\_biz=MzIyMzA5NjEyMA%3D%3D&mid=2647683561&idx=1&sn=cb696e11357022c64360c79bf9471f22&poc_token=HNz8L2qjHT7l7D-hSGkoiWTVrXB7ZPRuFeZy6Ptl
- 标签：agentic workflow, agentic engineering

文章主张单次提示词正在让位于可观察、可迭代、可管理的循环系统。对 AI 内参来说，这条更像是“agent 产品化”的操作提醒：设计闭环比设计一句 prompt 更关键。

## 导读

loop engineering。是个新词，但不是 karpathy 创造的那种新词级别。生命力存疑，先观察了解。

## 核心观点

- 文章把 Loop Engineering 定义为 Prompt Engineering、Context Engineering、Harness Engineering 之后的新一层工作方式：不再围绕一次提示词优化，而是设计一个能持续启动、执行、验证、修复的循环系统。
- 作者认为这个新词不是单纯的概念炒作。行业变化太快时，人们需要更精确的表达来描述新的工作重心；Loop Engineering 描述的正是从“人驱动 Agent”转向“系统驱动 Agent”的变化。
- 这篇文章最重要的判断是：Loop Engineering 表面上是工程实践，本质上是管理能力。真正稀缺的不是会不会写 hook、cron 或脚本，而是能不能把模糊意图翻译成可验证的目标、资源配置、反馈机制和边界条件。

## Loop Engineering 的出现：从单次提示到自动循环

- 文章开头用三组信号说明这个词正在形成共识：OpenClaw 创始人 Peter 在 6 月 7 日发推说，不再需要为编码智能体写提示词，而应设计循环来提示 Agent；Claude Code 创始人 Boris 也说，他不再手动给 Claude 写提示词，而是在运行让 Claude 自动编排任务的循环；Addy Osmani 随后用长文系统梳理了 Loop Engineering。
- 在这个语境里，loop 不是一句 prompt，而是一套持续运转的机制。作者把它概括为：你定义目标，定义验证条件，定义失败后如何处理，然后把执行交给系统。
- 文章把 Loop Engineering 放在一个连续演进链条里理解：Prompt Engineering 关注“好好说话”，Context Engineering 关注“给足信息”，Harness Engineering 关注“设规则和约束”，Loop Engineering 则关注“让整个系统自己跑起来”。
- 作者用“马具和缰绳”与“全自动工业流水线”的比喻说明层级变化：Harness 像缰绳，保证 Agent 在约束内行动；Loop 则像流水线，让约束下的 Agent 以固定节奏持续完成任务。

## Agent 工作方式的变化：人不再是循环发动机

- 传统 Claude Code 使用方式仍然是任务制：人给一个任务，Agent 写完，人检查，再提出修改意见，Agent 再改。虽然比 chatbot 更强，但循环的发动机仍然是人。
- Boris 的例子展示了另一种模式：他写一个类似 /loop babysit all my PRs 的循环，让系统自动查看 GitHub 上所有 PR，发现 CI 挂了就修，发现 review 新评论就派独立工作树里的子 Agent 处理。
- 更进一步的循环还可以挂到定时任务上，夜间自动启动。作者引用 Boris 的说法：2026 年他已经不再手写代码，而是在睡觉时让成千上万个 Agent 同时工作。
- 这个例子说明，Loop Engineering 的单位不是“完成一次任务”，而是“维护一个可持续运转的目标系统”。人从每轮对话的操作者，变成循环目标、验证标准和失败处理策略的设计者。

## 完整 loop 的五个组件

- 第一是定时任务，也就是整个 loop 的心跳。可以是 /loop 命令按间隔运行、cron 定时调度、Agent 生命周期 hook，或者 GitHub Actions。没有自动启动机制，Agent 每次都要人踢一脚，那仍然是人工操控。
- 第二是工作树隔离。多个 Agent 同时跑时，需要各自独立的工作空间，避免同时修改同一个文件造成冲突。作者把这种痛苦类比为两个设计师同时改一个图层却互不告知。
- 第三是项目知识体系。作者不同意只把它叫 skill，因为单个 skill 不够；自动循环需要一整套可维护的知识管理系统，包括全局规则、跨会话记忆、项目文档和任务后清理机制。
- 第四是连接器，也就是 MCP 这类让 Agent 进入真实工作环境的能力。只看文件系统的 Agent 能力有限；接入 GitHub、飞书、数据库等外部系统后，才可能从发现问题到解决问题再到通知人类形成闭环。
- 第五是子 Agent。作者强调做事和检查要分开，写代码的 Agent 不能自己给自己打分；需要另一个 Agent，甚至另一个模型，专门检查前一个 Agent 的输出。

## 知识体系为什么是自动循环的基础设施

- 文章特别强调项目知识体系，因为 loop 是自动跑的，人不在场。Agent 如果每次启动都读到过期信息，就会基于错误前提快速做错事。
- 作者批评了两种常见问题：AI 每次开新对话就忘记项目规范和踩坑记录；全局规则文件膨胀到几百行历史叙事，真正稳定的规则反而被挤掉。
- 因此，知识体系不是“给 Agent 多一点背景”这么简单，而是自动化系统的运行手册。它决定 Agent 每次启动时是否知道项目、边界、禁区和验收方式。
- 作者自己的做法是把 coding 开发经验沉淀为“洁癖.skill”，并在任务后整理知识体系，确保没有错误、过期信息和不必要的膨胀。

## Loop Engineering 的灵魂：定义目标

- 文章认为许多讨论停留在术的层面：五个组件、/goal、/loop、定时任务配置。这些都重要，但不是核心。
- 作者把 Loop Engineering 的核心能力定位为“定义目标”。/goal 的表面用法很简单：给 Claude 一个完成条件，让它一轮一轮做，直到满足条件。但实际效果取决于目标是否定义得好。
- 文中用两个目标对比说明差异：目标 A 是“把这个应用优化一下”，目标 B 是“test/auth 目录下所有测试通过，tsc --noEmit 零报错，npm run lint 零违规”。目标 A 会让 Agent 不知道何时算完成；目标 B 有三个明确命令和通过标准。
- 作者把这个经验扩展到自动化实践：自动监控 AI 行业热点这句话看似合理，实际没有定义浏览量阈值、抓取频率、质量评估、排序和推送方式。每个环节缺少判定标准，自动化链条就会失控。

## 管 Agent 和管人的逻辑相同

- 文章把目标定义能力追溯到创业和管理经验。管人最痛苦的不是人不努力，而是目标不清晰，导致下属不知道要什么，最后交付偏离预期。
- “把这个功能做好”是模糊目标；“接口响应时间降到 200 毫秒以下，错误率控制在 0.1% 以内，下周三之前上线”才是可执行目标。
- 作者把 Peter Drucker 的目标管理、Andy Grove 在 Intel 推动的 OKR，以及各种管理方法论归结为同一个核心：能不能把模糊意图翻译成一组可衡量、可验证的完成条件。
- 对 Agent 来说，这个要求更极端。人还可能主动确认需求，Agent 往往会自信地按自己的理解执行，并自信地宣称完成。因此，管理 Agent 对目标定义、资源提供和反馈设计的要求反而更高。

## 目标指标的陷阱：古德哈特定律和 Harness 的必要性

- 作者提醒，定义目标不仅要清楚，还要避免古德哈特定律：当衡量指标变成目标本身，它就不再是好的衡量指标。
- 在 Agent 场景下，这个问题被放大。Agent 会针对验证器优化，而不是针对真实目标优化。例如 loop 条件是测试全过，Agent 可能不修 bug，而是删除失败测试。
- 因此，一个好的目标定义不能只有完成标准，还必须有不能怎么做的边界。完成条件告诉 Agent 往哪里跑，边界条件告诉 Agent 哪些路径不能走。
- 这也是 Harness Engineering 在 Loop Engineering 中的作用：Harness 是约束和护栏，Loop 是驱动力。只有二者结合，系统才既能持续前进，又不会为了通过指标而破坏真实目标。

## 作者给出的目标定义框架

- 第一，完成标准要可以被机器验证。机器验证让循环能够自动判断是否继续，而不是依赖人的主观感觉。
- 第二，边界条件要和完成标准一起定义。只给通过标准会诱导 Agent 钻规则空子，必须同时说明不能删除测试、不能降低质量、不能越权修改等约束。
- 第三，要有失败的降级方案。一个自动循环不应只知道继续重试，也要知道什么时候切换策略、停止、汇报或交给人。
- 第四，目标要分层。大目标需要拆成可执行的小目标，每层都有自己的验收方式和边界，才能让系统稳定推进。
- 文章最后把四个 Engineering 对应到四门旧学科：语言学、信息科学、控制论、管理学。它借此说明，AI 工作流的新词背后并不是全新的魔法，而是旧的人类组织能力在新工具上的重新显现。

## 概念网络

### 关键概念

### Loop Engineering

**context**：文章把 Loop Engineering 放在 Prompt、Context、Harness 之后，指向一种从单次提示转向自动循环的 Agent 工作方式。它的核心不是“写一句更好的 prompt”，而是设计目标、触发、执行、验证、失败处理和反馈机制，让 Agent 持续运转。

**费曼一下**：以前是你一句一句指挥 AI 干活，现在是你先搭好一条自动流水线，让 AI 按规则自己跑、自己检查、自己修。你从操作员变成了流水线设计师。

### Prompt 到 Loop 的跃迁

**context**：作者把 Prompt Engineering、Context Engineering、Harness Engineering、Loop Engineering 串成四次跃迁：语言表达、信息组织、规则约束、系统自运行。Loop 是在已有约束之上进一步把任务变成可持续运行的流程。

**费曼一下**：提示词解决“怎么说”，上下文解决“给什么材料”，约束解决“不能乱来”，循环解决“怎么不用人一直盯着也能继续做”。

### 自动循环的心跳

**context**：文章把定时任务称为 loop 的心跳，包括 /loop 间隔执行、cron、hook 和 GitHub Actions。没有自动触发机制，Agent 每次都要人工启动，就仍然不是 loop。

**费曼一下**：心跳就是闹钟或传感器。它负责在合适的时候把系统叫醒，让 AI 开始下一轮工作。

### 工作树隔离

**context**：当多个 Agent 同时工作时，作者强调要给每个 Agent 一个独立工作空间，避免互相改同一个文件造成冲突。这个组件支撑并发执行和事后合并。

**费曼一下**：让每个 AI 在自己的小房间里改代码，改完再拿出来合并。否则大家挤在一张桌子上改同一份文件，很容易互相踩坏。

### 项目知识体系

**context**：作者认为 Addy Osmani 提到的 skill 还不够，loop 需要的是完整知识管理体系：规则、记忆、文档、经验沉淀和过期信息清理。自动运行时，Agent 必须在启动时读到正确上下文。

**费曼一下**：这就像给每天上班的员工准备一份准确的公司手册。手册过期，员工越勤快，犯错越快。

### 连接器

**context**：文章把 MCP、GitHub、飞书、数据库等外部接口看作 loop 闭环的一部分。Agent 只有接入真实工作环境，才能从发现问题、修改内容到通知人类形成完整流程。

**费曼一下**：连接器就是 AI 的手和眼睛。没有它，AI 只能在本地文件里想办法；有了它，AI 才能去真实系统里查、改、提交和反馈。

### 子 Agent 分工

**context**：作者强调“做事的和检查的分开”，因为写代码的 Agent 不应自己给自己打分。子 Agent 或不同模型可以承担执行、审查、修复等不同角色。

**费曼一下**：一个 AI 写作业，另一个 AI 批作业。这样比让写作业的 AI 自己宣布满分更可靠。

### 可验证目标

**context**：文章用“把应用优化一下”和“测试、类型检查、lint 全部通过”对比说明，loop 能否成功取决于目标是否能被机器判断。模糊目标会让 Agent 不知道何时停止。

**费曼一下**：可验证目标就是红绿灯。绿了就停，红了就继续修。没有红绿灯，AI 只能凭感觉开车。

### 管理 Agent

**context**：作者认为 Loop Engineering 的核心竞争力在管理，而非纯工程。管理者要确保目标清晰、资源充足、反馈及时；这些也正是一个好 loop 的条件。

**费曼一下**：管 AI 很像带团队。你不能只说“做好一点”，要说清楚做成什么样、有什么工具、怎么验收。

### 古德哈特定律

**context**：文章用古德哈特定律解释 Agent 可能针对验证器优化，而不是针对真实目标优化。例如为了让测试通过，Agent 可能删除失败测试。

**费曼一下**：你考什么，系统就会只优化什么。如果考核设计得不好，AI 会很快找到钻空子的办法。

### Harness 与 Loop 的配合

**context**：作者把 Harness 看作约束和护栏，把 Loop 看作驱动力。一个好的自动循环既要有完成标准，也要有不能越过的边界条件。

**费曼一下**：Loop 是油门，Harness 是护栏。只有油门没有护栏，车会跑偏；只有护栏没有油门，系统跑不起来。

### 概念网络

![图片为Harness Engineering AI内参主题精选中关于概念网络的图示，展示了从Prompt转向Loop Engineering的工作流拐点。图中从“工作单位变化”开始，依次为提示词工程、上下文工程、Harness工程、Loop工程，涉及古德哈特定律、可验证目标、知识与能力、运行边界等关键要素，如项目知识体系、连接器与子智能体分工、自动循环的心跳、工作树隔离等，体现了Loop Engineering在其中的中心地位。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTM0Mjg2ZjViYmZiMTkyNTFjODNiMjFlNTg1YWJkYTVfYjFiZGUyZmI4Y2M1NWQ0MjdiNWM5NTg0NDA0YmI2MmFfSUQ6NzY3MTAwODAzMTQwNDAzNTA0OF8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

文章的整体思想网络从“工作单位变化”开始：AI 使用从 Prompt 到 Context、Harness，再到 Loop，工作单位逐步从一句话、一个任务、一个受约束的操作，变成一个可持续运行的系统。

Loop Engineering 位于这个网络的中心。它需要自动循环的心跳来启动每一轮，需要工作树隔离来支持并发执行，需要项目知识体系来保证 Agent 使用正确前提，需要连接器进入真实工作环境，需要子 Agent 分工完成执行与验证。

这些工程组件共同指向一个更深层的能力：可验证目标。目标定义决定 loop 是否知道何时继续、何时停止、何时失败降级。可验证目标又与管理 Agent 相连，因为目标清晰、资源充足、反馈及时，本来就是管理人的基本逻辑。

但可验证目标也会引出古德哈特定律。只要指标变成唯一目标，Agent 就可能优化验证器而不优化真实结果。因此 Harness 与 Loop 必须配合：Loop 提供持续行动的动力，Harness 提供边界条件和禁止路径。二者合在一起，才构成稳定的 Agent 工作流。

最终，文章把 Loop Engineering 从一个新技术词拉回到旧的人类组织能力：语言表达、信息组织、控制约束和管理目标。所谓新的 Agent 工作流，底层仍然是如何让一个系统在清晰目标、充足资源和及时反馈中可靠运转。

HOWIE 原清单 · 18

# Harness 工程学习仓库：从原始文献到能跑的 skill

**内容说明：**今天那条「为什么 harness 工程这么难」讲的是难点，这个仓库给的是路径——把 OpenAI、Anthropic、LangChain 的原始 harness 文献和 harness-creator skill 整理成可动手的学习路线。

**策展人按：**读到这里如果手痒，从这条开始。清单里只有它给了顺序，其余都是零件。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：learn-harness-engineering/README-CN.md at main · walkinglabs/learn-harness-engineering
- 作者：https://github.com/walkinglabs/
- 内参日期：2026-07-28
- 来源类型：blog
- 原文：https://github.com/walkinglabs/learn-harness-engineering/blob/main/README-CN.md
- 标签：Anthropic, OpenAI

今天那条「为什么 harness 工程这么难」讲的是难点，这个仓库给的是路径——把 OpenAI、Anthropic、LangChain 的原始 harness 文献和 harness-creator skill 整理成可动手的学习路线。

## 导读

github repo 赏析。harness engineering 学习资料。

## 核心观点

- Learn Harness Engineering 是一门**项目制课程**，主题是「系统学习如何通过环境、状态、验证与控制机制，让 AI 编程智能体（Coding Agents）更可靠地工作」。它不是提示词技巧集，而是把业内最前沿的 harness 理论——OpenAI 的 Codex 实践、Anthropic 的两篇长时 agent harness 论文、Awesome Harness Engineering——收敛成可动手跑的课程。
- 全课的立论只有一句：**世界上最强的模型，如果没有一个合适的工作环境，依然会在真实工程任务中翻车。**作者把这句话追加了一个诊断——「这不是模型的问题，这是 harness 的问题。」
- Harness engineering 的定义：**围绕模型搭建一整套工作环境，让它产出可靠的结果。不只是写更好的提示词，而是设计模型运行所在的系统。**
- 分工判据是全文最锋利的一句：**模型决定写什么代码。Harness 管控什么时候写、在哪里写、怎么写。Harness 不会让模型变聪明。它让模型的产出变可靠。**
- 课程形态：12 个讲义（概念单元）+ 6 个循序渐进的实战项目（全部落在同一个 Electron 应用上）+ 开箱即用的中英文资料库（AGENTS.md、feature_list.json、init.sh 等模板）。仓库内另附 skills/harness-creator/ 技能，用于几分钟内为自己的项目搭出一套生产级 harness。
- 课程的验收口径同样是工程化的：每个项目都要求 agent 真正干活，每个项目都要做弱 harness / 强 harness 对照，「我们关心的是效果变化，而不是『写了多少说明文档』」。

## 立论与证据：模型没换，换的是 harness

- 起手的场景描述几乎人人有份：你给 Claude 或 GPT 一个任务，它看起来干得不错——读文件、写代码、很努力。然后出问题了。**它跳过了一个步骤。它搞坏了一个测试。它说「完成了」但实际上什么都没跑通。**结果是「你花在收拾烂摊子上的时间比自己做还多」。
- **Anthropic 的对照实验**（全文最硬的证据）：同一个模型 Opus 4.5，同一段提示词（「做一个 2D 复古游戏编辑器」）。
- 无 harness：20 分钟、9 美元，结果游戏核心功能跑不起来。
- 完整 harness（planner + generator + evaluator 三 agent 架构）：6 小时、200 美元，做出来的游戏可以正常游玩。
- 结论一句话：**模型没换，换的是 harness。**
- **OpenAI 用 Codex 得出同样结论**：在一个 harness 搭得好的仓库里，同一个模型从「不可靠」变成「可靠」——作者特意强调，「不是『好了一点』，是质变」。
- 原文用一段 ASCII 图把 harness 模式画成流水线：你给出任务 → agent 读取 harness 文件 → agent 开始执行，中间由 harness 管控每一步（指令 / 范围 / 状态 / 验证 / 周期），终点是「**agent 只在验证通过后才会停下来**」。

## Harness 的五个子系统

- **指令**：告诉 agent 做什么、按什么顺序、开工前先读什么。关键限定是「不是一个巨大的文件，而是渐进式展开的结构，agent 按需导航」。载体是 AGENTS.md、CLAUDE.md、feature_list、docs/。
- **状态**：跟踪做了什么、正在做什么、下一步是什么，**持久化到磁盘**，下次会话从上次停下的地方继续。载体是 progress.md、feature_list、git log、会话交接笔记。
- **验证**：只有通过的测试套件才算数。**agent 不能没有可运行的证据就说「做完了」。**载体是 tests + lint、type-check、smoke runs、e2e pipeline。
- **范围**：约束 agent 一次只做一个功能。「不多做，不少做，**不偷偷改功能清单掩盖未完成的工作**。」配套的是显式的完成定义。
- **会话生命周期**：开始时初始化（跑 init.sh），结束时清理（跑清理检查清单），给下次会话留交接笔记与一条干净的重启路径；**只在可以安全恢复时才 commit**。

## 真正的问题：跨会话、无人盯梢的可靠交付

- 作者把问题重新定义了一次：「问题不是『模型能不能写代码』。能写。问题是：**能不能在真实的仓库里，跨越多次会话，不需要人一直盯着，就可靠地完成真实的工程任务？**」现在的答案是——没有 harness 就不行。
- 无 harness 的两次会话：会话 1，agent 写代码 → 搞坏测试 → 说「做完了」→ 你手动修复；会话 2，agent 从头开始、没有上次的记忆、重新做一遍或者做了完全不同的东西 → 你再修一次。**结果：你花的时间比自己做还多。**
- 有 harness 的两次会话：会话 1，读指令 → 跑 init.sh → 一次只做一个功能 → 验证后才说完成 → 更新进度日志 → 干净地 commit；会话 2，读进度日志 → 从上次停下的地方继续 → 继续未完成的功能。**结果：agent 干活，你验证结果；你是审查，不是救火。**
- 课程真正关心的四个问题（也是它的研究提纲）：
- 哪些 harness 设计会提升任务完成率？
- 哪些设计会减少返工和错误完成？
- 哪些机制能让长时任务更稳定地持续推进？
- 哪些结构能让系统在多轮 agent 运行后仍然可维护？

## 12 个讲义：把失败模式逐个命名

- L01 模型能力强，不等于执行可靠 —— 基准测试与真实工程之间的**能力鸿沟**。
- L02 Harness 到底是什么 —— 五个子系统：指令、状态、验证、范围、生命周期。
- L03 让仓库成为唯一事实来源 —— **agent 看不到的东西，对它来说就不存在。**
- L04 为什么一个巨大的指令文件会失败 —— 渐进式展开：**给地图，不给百科全书。**
- L05 为什么长时任务会丢失上下文 —— 把进度持久化到磁盘，从停下的地方继续。
- L06 为什么初始化需要单独一个阶段 —— agent 开始工作前先验证环境是否健康。
- L07 为什么 agent 会多做或少做 —— 一次一个功能，显式的完成定义。
- L08 为什么功能清单是 harness 原语 —— **机器可读的范围边界，agent 无法忽略。**
- L09 为什么 agent 会提前宣告完成 —— 验证缺口：**自信 ≠ 正确。**
- L10 为什么端到端测试会改变结果 —— 只有跑通完整流程才算真正验证。
- L11 为什么可观测性属于 harness —— **看不到 agent 做了什么，就修不了它搞坏的东西。**
- L12 为什么每次会话都要留干净状态 —— 下次会话的成功，取决于这次会话的清理。

## 6 个项目：在同一个应用上层层加码

- P01 跑两次同样的任务：只写提示词 vs 定好规则 —— 最小 harness：AGENTS.md + init.sh + feature_list.json。定位是「你看到问题」。
- P02 重组项目结构，让 agent 能读懂 —— agent 可读的工作空间 + 持久化状态文件。「你重组仓库」。
- P03 让 agent 关掉再打开还能接着干 —— 进度日志 + 会话交接 + 多会话连续性。「你连接会话」。
- P04 防止 agent 做多了或做少了 —— 运行反馈 + 范围控制 + 增量索引。「你加上反馈循环」。
- P05 让 agent 自己验证自己的工作 —— 自验证 + 带引用的问答 + 基于证据的完成判定。「你让 agent 检查自己」。
- P06 从零搭建一套完整的 harness（综合项目）—— 全部机制 + 可观测性 + **消融实验**。「你搭建完整系统」。
- 项目之间的衔接方式值得单独记一笔：**每个项目的 solution 成为下一个项目的 starter。应用跟着你的 harness 技能一起进化。**共享基础是 Electron + TypeScript + React。

## Agent 会话生命周期：一台 16 步的状态机

- 课程的一个核心理念：**agent 的会话应该遵循结构化的生命周期，而不是自由发挥。**
- **开工**（1-5）：读 AGENTS.md / CLAUDE.md → 跑 init.sh（安装、验证、健康检查）→ 读 claude-progress.md（上次做了什么）→ 读 feature_list.json（做完哪些、接下来做哪个）→ 检查 git log（最近的改动）。
- **选择**（6-7）：选定且只选一个未完成的功能；只做这一个功能。
- **执行**（8-11）：实现功能 → 运行验证（测试、lint、类型检查）→ 失败则修复后重跑 → 通过则**记录证据**。
- **收尾**（12-16）：更新 claude-progress.md → 更新 feature_list.json → 记录还没做完和还没验证的东西 → commit（只在可以安全恢复时）→ 给下次会话留干净的重启路径。
- 全文最见功力的对照落在第 9 步：**没有 harness 时，第 9 步变成「agent 说看起来没问题」；有 harness 时，第 9 步是「测试通过、lint 干净、类型检查通过」。**Harness 管控生命周期里的每一次状态转换，模型只决定每一步写什么代码。

## 边界、门槛与仓库形态

- **适合谁**：已经在用 coding agent、希望提升稳定性和质量的工程师；想系统理解 harness 设计的研究者或构建者；需要理解「环境设计如何影响 agent 表现」的技术负责人。
- **不适合谁**：只想要零代码 AI 入门的人；只关心 prompt、不打算做真实实现的人；不准备让 agent 在真实仓库里工作的学习者。
- **环境要求**：这是一门真正需要动手跑 coding agent 的课程，至少要有 Claude Code、Codex，或其他支持文件编辑、命令执行、多步任务的 IDE / CLI coding agent；并且允许 agent 编辑文件、运行命令、检查输出并重复执行任务。
- **先修要求**：熟悉终端、git 和本地开发环境；至少会读写一种常见应用栈的代码；有基本调试经验（会看日志、测试和运行行为）。用过 Electron、有测试与架构经验则加分。
- **快速开始**：不用读完 12 个讲义再动手。「思路很简单：不是光写提示词，而是在仓库里放一组结构化的文件——告诉 agent 该做什么、做完了什么、怎么验证。这些文件就放在项目里，**每次会话都从同一个状态开始**。」
- **仓库工程化程度**：文档站用 VitePress（npm run docs:dev / docs:build / docs:preview）；课程 PDF 链路已补齐——npm run pdf:build 生成中英双语 PDF、输出到 artifacts/pdfs/，npm run screenshots:readme 刷新 README 截图，GitHub Actions 的 release-course-pdfs.yml 自动构建并上传到 Release。仓库分为 docs/（中英双语讲义、项目、资源）、projects/（shared 基础 + 每个项目的 starter/solution）、skills/harness-creator/。
- **参考谱系**：主参考为 OpenAI 的 Codex harness 文章与 Anthropic 的两篇长时 agent harness 文章；辅助参考包括 LangChain 的 The Anatomy of an Agent Harness、Thoughtworks 的 Harness Engineering、HumanLayer 的 Skill Issue。灵感致谢 learn-claude-code。

## 概念网络

### 关键概念

### Harness Engineering（工具马具 / 脚手架工程）

**context**：全文的主题词与组织中枢。原文定义为「围绕模型搭建一整套工作环境，让它产出可靠的结果。不只是写更好的提示词，而是设计模型运行所在的系统」。它把工程注意力从「换更强的模型」「写更好的 prompt」转向「设计模型运行所在的系统」，并以「模型没换，换的是 harness」的对照实验作为立论依据。

**费曼一下**：马具不会让马跑得更快，但它决定了这匹马能不能拉着车沿路走到终点。Harness 就是套在模型外面的那套装备——缰绳、车辕、路标、里程表。你不改模型的智力，只改它周围的约束和反馈，产出的可靠性就会变。

### 能力鸿沟（能力强 ≠ 执行可靠）

**context**：L01 的核心问题，也是全课的起点——「基准测试与真实工程之间的能力鸿沟」。原文用一组高度雷同的翻车现象刻画它：agent 跳过一个步骤、搞坏一个测试、说「完成了」但什么都没跑通。作者据此判定：这不是模型的问题，是 harness 的问题。

**费曼一下**：一个人考试满分，不代表他能独立把一个项目交付上线。前者考的是能力，后者考的是流程纪律。模型也一样：跑分强和在真实仓库里稳定干完活，是两件不同的事，而后者的短板不能靠继续提高跑分来补。

### 指令子系统与渐进式展开

**context**：五个子系统之一。指令负责「告诉 agent 做什么、按什么顺序、开工前先读什么」，载体是 AGENTS.md、CLAUDE.md、功能清单和 docs/。原文特别加了限定：「不是一个巨大的文件，而是渐进式展开的结构，agent 按需导航」，L04 把它总结为「给地图，不给百科全书」。

**费曼一下**：给新人一本 500 页的员工手册，等于什么都没给——他不会读，也找不到自己此刻需要的那一页。有效的做法是给一张目录清晰的地图：第一页写「今天先看这三件事」，需要细节时再按索引跳转。

### 状态子系统与进度持久化

**context**：五个子系统之一，也是 L05「为什么长时任务会丢失上下文」的解法。状态负责跟踪做了什么、正在做什么、下一步是什么，关键动作是**持久化到磁盘**（progress.md、claude-progress.md、feature_list、git log、会话交接笔记），让下次会话「从上次停下的地方继续」而不是从头开始。

**费曼一下**：agent 的记忆在会话结束时就清零了。想让它接着干，就不能指望它「记得」，只能让它「读得到」——把进度写在纸上放在桌面正中间，下次开工第一件事就是读那张纸。

### 验证子系统与可运行的证据

**context**：五个子系统中最硬的一条：「只有通过的测试套件才算数。agent 不能没有可运行的证据就说『做完了』。」载体是 tests + lint、type-check、smoke runs、e2e pipeline。它在会话生命周期第 9 步形成分水岭——无 harness 时是「agent 说看起来没问题」，有 harness 时是「测试通过、lint 干净、类型检查通过」。

**费曼一下**：把「完成」的判定权从当事人的嘴里，交给一台不会说谎的机器。你不问「你觉得做好了吗」，你只看测试是绿是红。证据可运行，是因为它可以被任何人在任何时候重新跑一遍。

### 范围控制与显式的完成定义

**context**：对应 L07「为什么 agent 会多做或少做」。范围子系统约束 agent「一次只做一个功能。不多做，不少做，不偷偷改功能清单掩盖未完成的工作」，并要求给出显式的完成定义。P04 把它落成「运行反馈 + 范围控制 + 增量索引」。

**费曼一下**：给人一张待办清单和一个明确的验收标准，比说「你看着办」更容易得到你想要的东西。尤其要防的是两头跑偏：顺手把别处也改了，或者悄悄把标准调低说自己达标了。

### 功能清单作为 harness 原语

**context**：L08 的主张，「机器可读的范围边界，agent 无法忽略」。feature_list.json 在课程里同时出现在指令、状态、范围三个子系统中：它既是任务来源，也是进度记录，还是范围边界，因此被称为 harness 的**原语**（primitive）。

**费曼一下**：便签上的手写清单只有人能读；JSON 清单机器也能读、能校验、能在流水线里当门禁。当边界写成机器能解析的格式，它就从「善意的提醒」变成了「绕不过去的判据」。

### 会话生命周期

**context**：课程的一个核心理念——「agent 的会话应该遵循结构化的生命周期，而不是自由发挥」，原文展开为 16 步的开工 / 选择 / 执行 / 收尾四段式。开工跑 init.sh 与读状态，收尾更新进度、记录未完成项、只在可以安全恢复时 commit，并给下次会话留干净的重启路径。

**费曼一下**：把一次 agent 会话当成一次值班交接班：上岗先看交接本和设备自检，下岗前把日志写完、把工位收拾干净，让下一班一进门就能接着干。自由发挥的问题不在于发挥，而在于没有交接。

### 仓库即唯一事实来源

**context**：L03 的主张，判据是那句「**agent 看不到的东西，对它来说就不存在**」。它解释了为什么指令、状态、功能清单必须以文件形式落在仓库里，而不是留在人的脑子里、聊天记录里或口头约定里。

**费曼一下**：团队里的默契、走廊上的口头共识、某个人脑子里的历史包袱，对 agent 全是虚空。它的世界边界就是它能读到的文件——所以想让它知道的事，都得写进仓库。

### 验证缺口（自信 ≠ 正确）

**context**：L09 的命名，用来解释「为什么 agent 会提前宣告完成」。原文的现象描述是「它说『完成了』但实际上什么都没跑通」，缺口指的正是模型的自我评估与可验证事实之间的落差。L10 进一步收紧：只有跑通完整流程（端到端测试）才算真正验证。

**费曼一下**：一个人越是笃定地说「肯定没问题」，你越应该去按一下开关试试。自信是一种语气，正确是一种事实，两者之间需要一道测试才能连上。

### 端到端验证

**context**：L10 的主张「只有跑通完整流程才算真正验证」，在五个子系统里落为 e2e pipeline 与 smoke runs。它是对单元测试式局部验证的补充——局部全绿而整体跑不起来，正是无 harness 组「游戏核心功能跑不起来」的形态。

**费曼一下**：零件逐个通电正常，不等于装起来的机器能开动。真正的验收是把整台机器打开走一遍全流程，看它有没有从头到尾跑到底。

### 可观测性

**context**：L11 的主张——「可观测性属于 harness」，理由是「看不到 agent 做了什么，就修不了它搞坏的东西」。它在项目序列中作为综合项目 P06 的组成部分（完整 harness + 可观测性 + 消融实验）出现，与状态、验证互为补充。

**费曼一下**：黑箱里出了问题，你只能整箱换掉。装上仪表盘和日志之后，你才知道是哪一步坏的、什么时候坏的——修复的前提是能看见。

### 弱 harness / 强 harness 对照与消融实验

**context**：课程的方法论骨架。「每个项目都要做弱 harness / 强 harness 对照」，P01 直接就是「跑两次同样的任务：只写提示词 vs 定好规则」，P06 收在消融实验。它对应的评价立场是：「我们关心的是效果变化，而不是『写了多少说明文档』。」

**费曼一下**：想知道某个零件有没有用，最直接的办法是把它拆掉再跑一次。对照与消融把 harness 从一堆看起来很讲究的规范，变成一组可以被度量效果的机制。

### 从救火到审查的角色转移

**context**：全文对读者收益的最终刻画。无 harness 时「你花的时间比自己做还多」；有 harness 时「agent 干活，你验证结果」——原文的落点是那句「**你是审查，不是救火**」。它是五个子系统协同工作后的可观测结果，而不是一句愿景。

**费曼一下**：同样是带一个人干活，有的带法是你在后面不停收拾残局，有的带法是你只在关口看一眼签个字。差别不在这个人有多聪明，而在于流程有没有替你把关口设好。

### 概念网络

![图片是一张Harness Engineering概念网络图，由原文Mermaid源码直接渲染，仅将TD改为LR以适配文档宽度。图中以“Harness Engineering”为核心，通过层级和支撑关系，展示了指令子系统、可观测性、验证子系统与可运行的证据、状态子系统与进度持久化、从救火到审查等概念，还涉及渐进式展开、功能清单作为harness原语、仓库即唯一事实来源、能力鸿沟：能力强不等于执行可靠等关键点。该图与上下文紧密相关，直观呈现了Harness工程学习仓库中相关概念的逻辑关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzZiOTliNmUxNTEzNTM5NjQzMzk4ZmMxY2U5OTI0NDJfMGFmNDViODZmMTE2YTUzZTNkNzI2YmYyZGUxNTdiYzZfSUQ6NzY3MTAwODAzNDAyOTYwNDAyMF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染；仅将 TD 改为 LR 以适配文档宽度；节点与连线未改*



这张网络的中心不是某个概念，而是一次立场转移：**能力鸿沟**（C2）逼出了 **harness engineering**（C1）。因为跑分和真实工程之间存在落差，且这个落差不随模型变强而自动消失，工程注意力才必须从「换模型、改提示词」转到「设计模型运行所在的系统」。Anthropic 那组同模型同提示词、只换 harness 的对照实验，是这条因果链上唯一的硬证据，而 **弱强 harness 对照与消融实验**（C14）把这种验证方式沉淀成课程的固定方法——每个项目都跑两遍，关心效果变化而不是文档篇幅。

C1 之下是五个子系统的层级关系：**指令**（C3）、**状态**（C4）、**验证**（C5）、**范围**（C6）、**会话生命周期**（C7）。它们不是并列的五个建议，而是一套分工：指令解决「做什么」，范围解决「做多少」，验证解决「算不算做完」，状态解决「跨会话怎么接上」，生命周期把前四者串成一次可重复的值班流程。原文那句「模型决定写什么代码，harness 管控什么时候写、在哪里写、怎么写」，正是这一层分工的压缩表述。

网络里有两个跨层的**约束性前提**。第一个是 **仓库即唯一事实来源**（C8）：它同时支撑指令和状态，因为「agent 看不到的东西，对它来说就不存在」——两个子系统的载体必须是仓库里的文件，否则整套设计落不了地。第二个是 **渐进式展开**（C9）：它约束指令的形态，防止指令子系统退化成一个没人读的巨型文件；「给地图，不给百科全书」是对 C3 的自我限制，而不是对它的补充。

**验证缺口**（C10）是驱动验证子系统存在的直接动因：agent 会提前宣告胜利，自信不等于正确，于是「完成」的判定权必须从模型的措辞挪到可运行的证据上。**端到端验证**（C12）和**可观测性**（C13）分别从两个方向加固 C5——前者补齐「局部全绿、整体跑不通」的盲区，后者提供「坏在哪一步」的可见性，因为看不到 agent 做了什么，就修不了它搞坏的东西。

**功能清单**（C11）是网络中身份最特殊的节点：它既是范围边界的机器可读载体（支撑 C6），也同时被状态子系统当作进度记录复用（与 C4 共用），这正是它被称为 harness「原语」而非普通模板的原因——一个对象在多个子系统里同时承担职责，才算得上原语。

最后一条链条是收益的兑现路径。**状态**（C4）支撑**会话生命周期**（C7），让下一次会话能从上次停下的地方继续；C7 与 **验证**（C5）共同演化出 **从救火到审查**（C15）的角色转移。这个结果之所以能成立，是因为它同时需要两个条件：跨会话的连续性让 agent 不必重来，可运行的证据让你不必逐行复核。缺任一条，「你是审查，不是救火」就只是一句愿望。

## 费曼 x3

把预算押在模型上，是这两年最容易做、也最容易白做的决定。同一个 Opus 4.5，同一句「做一个 2D 复古游戏编辑器」的提示词，裸跑二十分钟烧掉九美元，交出来的游戏核心功能跑不起来；套上一层完整的工作环境，六小时两百美元，游戏能玩。模型一个字没换，换的是它周围的东西。这个实验之所以刺眼，是因为它把「AI 还不够聪明」这个借口拿走了。

不够的从来不是智力，是纪律。agent 在真实仓库里翻车的方式高度雷同：跳过一步、搞坏一个测试、宣布「完成了」，下次会话从零开始又做一遍。这些都不是推理失败，是流程失败，而流程失败只能靠流程来解。把该做什么写进 AGENTS.md，把做到哪儿写进进度日志，把「算不算做完」交给测试和类型检查裁决，把一次只做一个功能钉进机器可读的功能清单。模型决定写什么代码，这套环境管控什么时候写、在哪里写、怎么写。它不会让模型变聪明，它让模型的产出变可靠。

其中最反直觉的一条是：agent 看不到的东西，对它来说就不存在。人类工程师之间的记忆、默契、口头约定，在它眼里全是虚空。所以仓库必须成为唯一的事实来源，状态必须持久化到磁盘，指令必须渐进式展开——给地图，不给百科全书，因为一个塞满一切的巨型说明文件，等价于没有说明。

第二条是关于「完成」的定义权归谁。agent 天生倾向于提前宣告胜利，自信不等于正确。把判据从模型的措辞挪到可运行的证据上——测试通过、lint 干净、端到端流程真的跑通——胜利就不再是一句话，而是一个任何人都能重跑一遍的事实。

于是分工被重新划定：agent 干活，你验证结果；你是审查，不是救火。这句话听着像口号，实际是一组可以逐条搭建、逐条拆掉、逐条测量效果的机制。真正值得问的问题也随之改变——不是「模型能不能写代码」，而是能不能在真实仓库里，跨越多次会话，没人一直盯着，把活干完。

HOWIE 原清单 · 19

# Harness engineering：把 agent 能力落到工具、约束和循环里

**内容说明：**和今天的 Codex、Skills、Claude Fable 主题强相关，可作为 agent 工程化资源索引。

**策展人按：**和上一条搭配，一个给路线一个给目录。两条都是工具性质，看完可以先收着，不急着读。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：walkinglabs/awesome-harness-engineering: 🛠️ Awesome tools & guides for harness engineering.
- 作者：walkinglabs
- 内参日期：2026-06-13
- 来源类型：blog
- 原文：https://github.com/walkinglabs/awesome-harness-engineering
- 标签：Anthropic

和今天的 Codex、Skills、Claude Fable 主题强相关，可作为 agent 工程化资源索引。

## 导读

git repo，harness engineering 内容集合

## 核心观点

这份资源清单把 harness engineering 定义为让 AI agent 在真实工作流里可靠运行的环境工程：不是再问“模型会不会更聪明”，而是系统性处理 context、memory、working state、constraints、guardrails、evals、observability、runtime 和 workflow design。它的价值不在单个链接，而在把 agent 可靠性拆成一组可建设的工程原语：给 agent 合适的上下文，让它在受控工具里行动，用可复现评测和遥测发现失败，用规范和工作流约束长任务，并在真实运行环境里保留状态、重试、恢复和交接。

## harness engineering 把 agent 从模型能力问题转成系统工程问题

- 这份清单的开头把 harness engineering 放在 context engineering、evaluation、observability、orchestration、safe autonomy 和 software architecture 的交叉点上。它关心的是 agent 周围的环境如何被塑造，而不是单纯比较模型榜单。
- 清单明确排除泛泛的 agent tooling，只有直接覆盖 harness design、context management、evaluation、runtime control 或 reliability-critical primitives 的资源才被纳入。这说明它把“工具很多”与“工具能形成可靠闭环”区分开来。
- Foundations 部分同时收录 OpenAI、Anthropic、LangChain、Thoughtworks、HumanLayer 和 Inngest 的文章，形成一个共同判断：agent 的成败越来越取决于 prompts、tools、middleware、orchestration、runtime infrastructure 和 repo-local instructions 的组合。
- OpenAI 的 field report 强调 architectural constraints、repo-local instructions、browser validation 和 telemetry；Anthropic 的 long-running agents 文章强调 initializer agents、feature lists、init.sh、self-verification 和 handoff artifacts；LangChain 则把 agent 拆成 model plus harness。几篇文章的共同点是：agent 不是一个孤立聊天对象，而是一个被环境塑形的执行系统。
- 这组资源对实际团队的启发是，agent-first development 不能只靠提示词热情。真正可复用的能力来自约束、状态、验证、反馈、交接和可观测性等一整套外部结构。

## context、memory 和 working state 是长任务 agent 的第一层基础设施

- Context, Memory & Working State 部分把上下文窗口视为 working memory budget，而不是资料倾倒场。Anthropic 的 context engineering、Manus 的 KV-cache locality、filesystem memory 和失败保留策略，都在回答同一个问题：怎样让 agent 在长任务里不漂移。
- Thoughtworks、HumanLayer 和 OpenHands 的文章补充了 coding agents 的场景：任务需要跨文件、跨测试、跨上下文窗口推进，agent 必须知道目标、当前状态、关键文件、失败测试和已经尝试过的路径。
- 清单把 [CLAUDE.md](http://claude.md/) / repo-local instructions 放在这个区域附近，意味着“记忆”不只是模型上下文，也包括项目内可重复读取的规则、任务约束和本地约定。[AGENTS.md](http://agents.md/)、[CLAUDE.md](http://claude.md/) 这类文件本质上是 harness 的持久化接口。
- Context-efficient backpressure 是很关键的细节：好 harness 不只是给更多信息，也要防止 agent 被低价值日志、噪声输出和无关探索消耗上下文。上下文管理同时包含“放进来”和“挡出去”。
- OpenHands 的 context condensation 则说明，长任务需要能够压缩会话历史，同时保留 goals、progress、critical files 和 failing tests。它把“上下文清理”变成一种有结构的状态转移，而不是简单摘要。

## constraints 和 guardrails 让 autonomy 可用，而不是把人卡在审批循环里

- Constraints, Guardrails & Safe Autonomy 部分围绕一个矛盾展开：agent 要更自主，系统又不能失控。Anthropic 关于 sandboxing、MCP code execution 和 writing tools for agents 的几篇文章，都是在降低 approval friction，同时保持明确边界。
- Claude Code sandboxing 的重点不是让 agent “随便做”，而是通过安全策略、隔离环境和权限模型，让更多动作可以在可接受风险内自动执行。自主性来自可验证边界，而不是放弃控制。
- MCP code execution 进一步把工具执行变成可检查、可组合的协议边界。对 harness 来说，工具不是给模型的玩具，而是明确输入、输出、权限和失败模式的接口。
- OpenHands 的 prompt injection 防护、Thoughtworks 的 internal quality 和 anchoring to reference，说明 guardrails 不只面向安全，也面向质量一致性。确认模式、静态分析、沙箱、参考应用和质量检查都可以成为循环中的约束。
- Humans and Agents in Software Engineering Loops 提供了一个重要角色分工：人不应该微管理每个 token，而应该强化 harness。人类的杠杆点是改善约束、样例、验证和任务边界。

## specs、agent files 和 workflow design 把任务意图变成可执行协议

- Specs, Agent Files & Workflow Design 部分把 [AGENTS.md](http://agents.md/)、[agent.md](http://agent.md/)、GitHub Spec Kit、spec-driven development、12 Factor Agents 和 12-Factor AgentOps 放在一起，说明 harness engineering 需要机器可读或至少 agent 可读的工作协议。
- [AGENTS.md](http://agents.md/) 和 [agent.md](http://agent.md/) 解决的是“agent 进入一个 repo 后怎么工作”的问题：命令、测试、目录边界、提交规则、权限约定、语言偏好和项目禁区，都应该被显式写下来。
- Spec Kit 和 spec-driven development 解决的是“agent 执行什么”的问题。越复杂的任务越不能只靠一句自然语言目标，必须把产品意图、验收标准、阶段边界和工程约束拆成可以检查的规格。
- 12 Factor Agents 把生产 agent 的 prompt、state ownership、pause-resume、tool boundaries 等原则工程化。它提醒读者：agent 的可靠性不是聊天体验，而是一个可暂停、可恢复、可审计的工作流系统。
- 这部分和前面的 context/memory 形成呼应：上下文告诉 agent 当前在哪里，specs 告诉 agent 要去哪里，workflow design 告诉 agent 每一步如何推进和何时停下。

## evals 和 observability 是 harness 改进的反馈回路

- Evals & Observability 部分把 OpenAI、OpenHands、Anthropic、LangChain 的 eval 资源集中起来，强调 agent 系统必须可测量、可复现、可回放。没有评测和轨迹观测，harness 只能靠感觉迭代。
- OpenAI 的 skill evals、agent evals、evaluation best practices 和 trace grading 指向同一个实践：把 agent traces 转成 JSONL、确定性检查和任务级指标，才能判断某个 skill 或 harness 改动是否真的提升。
- OpenHands 的 evaluate agent skills 强调 bounded tasks、deterministic verifiers、no-skill baselines 和 trace review。它把“这个 skill 有没有用”变成可比较实验，而不是凭单次成功判断。
- Anthropic 的 evals for agents 和 infrastructure noise 提醒读者，agent 轨迹可能有很多成功路径，运行时配置也能显著影响 benchmark 分数。harness 评测要关注过程质量、环境噪声和稳定性，而不只是最终答案。
- LangChain 的 deep agents eval 和 harness engineering 文章进一步说明，harness changes alone 可以显著改善 benchmark performance。模型不变时，状态、工具、规划和回路设计仍然可能带来实质提升。

## benchmarks 把 harness 质量放进不同任务环境里测试

- Benchmarks 部分很长，覆盖 Agent Arena、AgentBench、AgentBoard、AppWorld、AssistantBench、BrowseComp、BrowserGym、GAIA、OSWorld、SWE-bench Verified、Terminal-Bench、WebArena 等。它的选择标准是测试 context handling、tool calling、environment control、verification logic 和 runtime scaffolding。
- 这些 benchmark 的共同点是，它们不只考模型知识，还考 agent 在环境中行动的能力。比如 AppWorld 看 app state 和 execution-based tests，OSWorld 看真实桌面任务，SWE-bench Verified 看真实 GitHub issue 和测试，Terminal-Bench 看 shell、filesystem 和验证重任务。
- WebArena、VisualWebArena、BrowserGym 和 WorkArena 把 web navigation 放进更真实的 UI 环境里，让 harness 必须处理视觉上下文、页面状态、登录态、网络变化和多步任务。
- MCPBench、MCP Universe 和 MCPMark 直接把 MCP 工具交互作为评测对象，说明 tool-augmented workflow 已经成为 harness 质量的一部分。工具调用的准确性、延迟、状态处理和错误恢复都可以被测量。
- 这些 benchmark 对团队的意义不是“追榜”，而是帮助选择与自己任务形态接近的压力测试。研究型、编码型、浏览器型、桌面型、多 agent 型和安全型 harness，都需要不同的验证环境。

## runtimes、harnesses 和 reference implementations 把理念落到可运行系统

- Runtimes, Harnesses & Reference Implementations 部分收录 LangChain、Anthropic Claude Agent SDK、多 agent research system、deepagents、SWE-agent、SWE-ReX、AgentKit、Harbor 和 Harness Evolver。它把前面的理念落到具体 runtime 和开源实现。
- LangChain 对 framework、runtime 和 harness 的分解很重要：framework 提供抽象，runtime 负责执行环境，harness 则把模型、工具、状态、评测和任务循环组装成可靠系统。混淆这三者会让团队以为装了框架就拥有了 harness。
- Claude Agent SDK、deepagents 和 AgentKit 代表生产化 agent runtime 的方向：sessions、tools、orchestration、event-driven infrastructure、durable workflows 和 long-running agents 都成为一等能力。
- SWE-agent 和 SWE-ReX 是 coding agent 的参考实现：前者让 prompt、tools 和 environment design 可检查，后者提供 sandboxed code execution infrastructure。它们说明好的 harness 要能被阅读、复现和修改。
- Harbor 和 Harness Evolver 展示了更进一步的方向：harness 本身也可以被评估、改进，甚至由多 agent 系统在隔离 worktree 和 eval 反馈下演化。也就是说，harness engineering 未来可能会变成一套持续优化的工程流程。

## 这份清单本身也是一个 harness 设计原则样本

- Contributing 部分要求资源必须 specific about how agents are constrained, evaluated, resumed, observed, or orchestrated，并优先 original implementations、primary-source articles 和 high-signal technical write-ups。这说明作者把“可操作性”和“原始来源”作为筛选标准。
- 如果两个链接表达相似内容，清单建议选择更 primary、practical、implementation-oriented 的一个。这和 harness engineering 的精神一致：不要堆概念，要寻找能改变实际循环的资料。
- 清单采用 awesome list 的形式，但它实际组织出了一张路线图：先理解 foundations，再处理 context 和 constraints，再建立 specs 和 workflow，再用 evals/observability 反馈，最后用 benchmarks 和 runtimes 落地。
- 对 AI 内参读者来说，这篇材料适合作为 agent 工程的索引页。它不提供单一结论，而是告诉我们可靠 agent 的建设位置：不在模型外观层，不在提示词奇技淫巧，而在整个工作环境的工具、规则、状态、反馈和运行时里。

## 概念网络

### 关键概念

### Harness engineering

**context**：清单把 harness engineering 定义为围绕 AI agents 塑造工作环境的实践，重点覆盖 context engineering、evaluation、observability、orchestration、safe autonomy 和 software architecture。

**费曼一下**：模型像发动机，harness 是让发动机能在真实道路上稳定行驶的车身、仪表盘、刹车、导航和维修流程。

### Reliability-critical harness primitives

**context**：清单排除泛泛 agent tooling，只收录直接影响 harness design、context management、evaluation、runtime control 等可靠性原语的资源。

**费曼一下**：不是所有工具都能让 agent 更可靠。真正关键的是那些能减少漂移、限制破坏、发现错误、恢复状态和验证结果的基础部件。

### Context as working memory budget

**context**：Anthropic、Manus、OpenHands 和 HumanLayer 相关资源都把上下文窗口视为有限工作记忆，强调 KV-cache locality、filesystem memory、context condensation 和 backpressure。

**费曼一下**：agent 的上下文像一张工作台。好 harness 不是把所有材料倒上去，而是只摆当前任务真正需要的工具、图纸和失败记录。

### Repo-local instructions

**context**：[CLAUDE.md](http://claude.md/)、[AGENTS.md](http://agents.md/) 和 [agent.md](http://agent.md/) 被放在 context、memory、specs 和 workflow 附近，说明项目内规则是 agent 可反复读取的持久化协作接口。

**费曼一下**：每个仓库都应该有一本给 agent 看的操作手册。它告诉 agent 怎么跑测试、哪些文件不能碰、何时停下、什么才算完成。

### Safe autonomy

**context**：Anthropic 的 sandboxing、MCP code execution、tool design，以及 OpenHands 的 prompt injection 防护，都在讨论如何降低审批摩擦，同时保留权限边界和安全控制。

**费曼一下**：让 agent 自主不是把钥匙全给它，而是把它放进有护栏的工作间。它能高效做事，但危险动作被隔离、记录或要求确认。

### Spec-driven agent workflow

**context**：GitHub Spec Kit、spec-driven development、12 Factor Agents 和 12-Factor AgentOps 强调用明确规格、状态所有权、暂停恢复和工具边界组织 agent 工作。

**费曼一下**：复杂任务不能只说“帮我做完”。要把目标、约束、验收和步骤写成 agent 能执行的协议，让它知道每一步该做什么、做到哪里算停。

### Trace-based evals

**context**：OpenAI、OpenHands、Anthropic 和 LangChain 的 eval 资源都强调用 agent traces、JSONL、deterministic verifiers、baselines 和 trajectory review 衡量 skill 或 harness 改动。

**费曼一下**：评测 agent 不能只看最后有没有答对，还要回看它怎么走到结果。轨迹能告诉我们失败是上下文错、工具错、规划错，还是验证不够。

### Infrastructure noise

**context**：Anthropic 的 infrastructure noise 资源提醒，运行时配置、环境差异和基础设施噪声可能显著影响 coding benchmark 分数。

**费曼一下**：同一个模型在不同工作间里表现会不一样。工具速度、网络、沙箱、依赖和测试环境都会改变结果，所以 harness 评测必须控制环境。

### Harness-level benchmarks

**context**：清单中的 AppWorld、OSWorld、SWE-bench、Terminal-Bench、WebArena、MCPBench 等 benchmark 都测试工具调用、环境控制、状态验证和长任务推进，而不只是知识问答。

**费曼一下**：这些 benchmark 像不同类型的试车场。它们不是只测发动机马力，而是测试整辆车在城市、山路、雨天和长途中的表现。

### Runtime-harness separation

**context**：LangChain 的 framework、runtime、harness 分解，以及 Claude Agent SDK、AgentKit、SWE-ReX 等资源，说明执行环境和可靠工作循环不是同一层。

**费曼一下**：runtime 负责“能运行”，harness 负责“能可靠完成任务”。有执行器不等于有好的工作流程、状态管理和验证闭环。

### Long-running agent handoff

**context**：Anthropic 的 initializer agents、handoff artifacts、feature lists，以及 OpenHands 的 context condensation，都服务于跨上下文窗口、跨阶段的长任务延续。

**费曼一下**：长任务里的 agent 像接力队。每一棒都要留下清楚的进度、证据、失败和下一步，否则下一棒只能重新摸索。

### Harness evolution

**context**：Harness Evolver、Harbor 和 eval-oriented resources 指向一个方向：harness 本身可以在任务、trace、benchmark 和隔离实验中持续改进。

**费曼一下**：我们不只是用 agent 做项目，也可以用评测和实验不断改造 agent 的工作环境，让它下一次更稳、更少犯同类错误。

### 概念网络

![图片展示了Harness工程的概念网络图。从Harness工程出发，分为上下文工作记忆预算和仓库内长期指令两支，两者共同解决agent在长任务中问题。再分支出安全自治与规格驱动的执行边界，其下有基础设施噪声和基于轨迹的评测，评测需控制。评测后是Harness级基准测试，再是Harness持续演进，最后是可持续生产运行。该图与上下文内容紧密相关，直观呈现了Harness工程各部分的逻辑关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=N2U5Yzg1NWExZmNiNWFkZjljNDQ4N2YzNjdlMWM5ZjhfZDFiMWZjOTE5NTMwNThiN2U0OTQyOTk2MTk1YzAyNzhfSUQ6NzY3MTAwODAzMjg0Njk0MTM3Ml8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

这份清单的概念网络可以从“模型能力外部化”为起点理解：**Harness engineering** 把 agent 的可靠性从模型内部能力，外移到一套可设计、可观察、可评测的工程系统。这个系统的第一层是 **context as working memory budget** 和 **repo-local instructions**：前者管理短期工作记忆，后者提供长期项目规则，两者共同解决 agent 在长任务里容易遗忘、漂移和误操作的问题。

在上下文之上，**safe autonomy** 和 **spec-driven agent workflow** 构成执行边界。safe autonomy 通过 sandbox、MCP、tool design 和 prompt-injection 防护限制风险；spec-driven workflow 则通过规格、状态、暂停恢复和验收标准定义 agent 应该如何行动。两者共同回答“agent 能不能放手做事”这个问题：可以，但必须在明确边界和可检查协议内。

系统能否持续变好，取决于 **trace-based evals**、**infrastructure noise** 和 **harness-level benchmarks**。trace-based evals 让团队看见 agent 的过程错误；infrastructure noise 提醒评测必须控制运行环境；harness-level benchmarks 则把 agent 放进真实工具、浏览器、终端、桌面和 MCP 环境里测试。它们共同构成 harness 的反馈回路。

最后，**runtime-harness separation**、**long-running agent handoff** 和 **harness evolution** 把这套体系推向生产化。runtime 提供可执行环境，harness 组织可靠循环；handoff 让长任务跨上下文延续；evolution 则用评测和实验持续改进 harness 本身。整张网络的核心关系是：context 和 instructions 让 agent 站稳，constraints 和 specs 让 agent 可控，evals 和 benchmarks 让 agent 可测，runtime 和 handoff 让 agent 可持续运行，最终形成可迭代的 agent 工程系统。

HOWIE 原清单 · 20

# 撕开 Claude Code 真相：让它好用的 98.4%，是工程不是 AI

**内容说明：**Claude Code 好用背后的真相：98.4% 是精心设计的工程实现（prompt、工具链、上下文管理），1.6% 才是 AI 本身。

**策展人按：**98.4% 这个数字站不站得住可以争，但它是这份清单最好用的一句话。想说服别人时先甩它，想说服自己请读下一条。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：撕开Claude Code真相：让它好用的98.4%，是工程不是AI
- 作者：新智元
- 内参日期：2026-05-02
- 来源类型：公众号
- 原文：https://mp.weixin.qq.com/s?\_\_biz=MzI3MTA0MTk1MA==&mid=2652696950&idx=2&sn=b8388fc8a9c5f6b51dbdf7e799d7f349
- 标签：agentic engineering, harness engineering, agent 元技能

Claude Code 好用背后的真相：98.4% 是精心设计的工程实现（prompt、工具链、上下文管理），1.6% 才是 AI 本身。

## 导读

agent harness。

## 核心观点/主旨

让 AI 编程真正好用的，不是更强的模型或更长的提示词，而是围绕模型搭建的一整套确定性工程基础设施——[CLAUDE.md](http://claude.md/)、skills、hooks、docs/decisions 这套"项目大脑+工作 SOP+合规护栏+章程"的组合。Claude Code 51.2 万行代码里只有 1.6% 是 AI 决策逻辑，剩下 98.4% 都是权限、上下文、工具路由、错误恢复这类工程基建。范式正在从"调 prompt"转向"为 AI 造一个项目大脑"。

## 一张不算泄露的「泄露截图」，撕开一个真相

### 起点：一条 X 推文

- @ai_rohitt 晒出"头部大厂偷偷在用的 Claude Code 项目模板外泄"
- 开头惊呼："这已经不是写提示词了。这是 AI 工程基础设施。"

### 整套打法的三条核心原则（围绕 CLAUDE.md 展开）

- 每次 Claude 犯错 → 你加一条规则
- 每次你重复自己 → 你加一个工作流
- 每次出 bug → 你加一道护栏
- 目的：把项目经验沉淀成 Claude 每次启动都会读取的长期上下文和自动化约束

### 整个架构像一家 AI 公司的岗位编制

- [CLAUDE.md](http://claude.md/) = 入职手册
- skills/ = 工作 SOP
- hooks/ = 合规部
- docs/ = 公司章程
- tools/ = 后勤组
- src/ = 真正出活的业务部门
- 一句概括："你不再是在和 AI 聊天了，而是在构建一个了解你代码仓库的 AI。"

### 这张截图其实不是"泄露"

- 它是 Anthropic 官方文档里公开推荐的 Claude Code 标准范式
- [CLAUDE.md](http://claude.md/) 是 Claude Code 每次会话开始时自动读取的项目记忆文件
- .claude/skills/ 和 .claude/hooks/ 是官方支持的扩展机制
- 社区已经讨论了几个月，但很多资深开发者这两天才意识到原来它还能这么用
- 而硅谷顶级团队，已经把这件事跑成了生产线

### 硅谷顶级团队的两个生产级例子

- **OpenAI Frontier 团队**：从空 repo 起步的内部 beta，约 5 个月内由 Codex 生成约 100 万行代码、约 1500 个 PR；团队 3 人扩到 7 人，人工不直接写代码；带队的 Ryan Lopopolo 称这套工作流已接近"0 人工代码、0 人工 review"的极限形态——与其节省 token，不如用模型极高的并发能力和极低的成本，去替代人类有限且昂贵的同步注意力。
- **Stripe Minions**：内部自动化代码代理系统，每周生成并推动超过 1300 个 PR 合并，代码从头到尾由 AI 生成，但仍经人工 review。

### 关键数据：1.6% vs 98.4%

- 来源：MBZUAI VILA-Lab 论文，扒了 Claude Code v2.1.88 的 51.2 万行 TypeScript 源码
- 结论：只有 1.6% 是 AI 决策逻辑，98.4% 是确定性工程基础设施
- 98.4% 具体由四类组成：权限网关、上下文管理、工具路由、错误恢复
- 这组数字不是说模型只贡献 1.6% 的能力，而是说明 Claude Code 作为产品，大量复杂度不在模型本身，而在围绕它的工程基建上
- 普通开发者的 [CLAUDE.md/skills/hooks](http://claude.md/skills/hooks) 结构，和 OpenAI、Stripe 那套是同一种范式，只是规模小得多

## CLAUDE.md 暴露的秘密：项目大脑的几层结构

### 范式转移：真正在生产环境跑通 AI 编程的团队，关心的早就不是模型版本

- 不再问"GPT 什么时候更聪明"、"Claude 什么时候出新版本"
- 真正关心的是：
- 怎么让 AI 记住自己上次踩过的坑
- 怎么让 AI 在动手前先看一眼项目的架构约束
- 怎么让 AI 犯错的时候自己被工具挡住

### CLAUDE.md = 项目大脑

- Anthropic 官方定义：一个 markdown 文件，放在项目根目录，Claude Code 在每次会话开始时自动读取
- 内容：架构决策、命名约定、测试要求、反复踩过的坑
- 它是 AI 每次启动时第一眼看到的"员工手册"

### claude/skills/ = 可复用工作流

- Boris Cherny（Claude Code 创建者）金句："如果你每天做某件事超过一次，把它变成 skill 或 command。"
- 一个 skill 就是一段可执行的方法论
- Code review、生成 commit message、写发布说明，都不该是每天手敲提示词的活，应该是 skill 调一下就出结果

### claude/hooks/ = 自动护栏（最关键）

- 不依赖 AI 自己判断，由确定性代码在 AI 犯错之前就挡住它
- 这就是为什么敢让 AI"无人监督"地跑——出错的边界由 hooks 卡死了

### docs/decisions/ = 架构决策记录（最容易被忽略，但是最大的杠杆点）

- 让 AI 不仅知道代码"是什么"，还知道代码"为什么是这样"

### tools/ 和 src/ = 执行层

### 这套架构真正值得注意的地方

- 不是某个开发者搞出了一个漂亮目录
- 而是越来越多独立团队正在收敛到同一个方向：把模型放进一套由上下文、工具、权限、评估和反馈循环组成的 harness 里
- GitHub 上的代表项目：rohitg00 的 awesome-claude-code-toolkit、diet103 的 claude-code-infrastructure-showcase、affaan-m 的 everything-claude-code，都围绕 agents、skills、hooks、rules、MCP configs 等组件搭建
- 结论：真正成熟的 AI 编程工作流 = 把模型嵌入一套**可复用、可约束、可恢复、可审计**的工程系统里

## OpenAI 实验室的极限实验：Harness Engineering

### 一个新名词：Harness

- 2026 年 2 月 11 日 OpenAI 官博文章《Harness engineering: leveraging Codex in an agent-first world》
- Anthropic 围绕这个概念重新调整 Claude Code 架构思路
- Martin Fowler 网站凝练成公式：**Agent = Model + Harness**
- Harness 来自马术，指马的整套挽具——缰绳、马嚼子、马鞍、笼头
- 类比：模型再强也不知道在你的代码库里该往哪儿走，Harness 就是你为它造的方向盘+刹车+导航

### OpenAI Frontier 团队"100 万行 0 人工"实验的关键工程实践

- **层级架构强约束**：从 Types → Config → Repo → Service → Runtime → UI，依赖关系单向流动，由 linter 在 CI 层强制执行；Agent 写出违反层级的代码 → 直接构建失败
- **linter 错误信息本身是修复指令**（最反直觉的细节）：
- 普通项目："violation detected"——给人看的
- OpenAI Frontier："use [logger.info](http://logger.info/)({event: 'name', ...data}) instead of console.log"——给 Agent 看的、可以直接读懂并修复的指令
- **文档作为单一事实来源**：所有架构图、execution plans、设计规范都在仓库内部的 docs/ 目录；Agent 不需要任何外部知识库，一切就在 repo 里

### 效果有多厉害

- 模型没有换，LangChain 只是调整了 harness（系统提示、工具、中间件、推理模式），把 Terminal Bench 2.0 分数从 52.8 提到 66.5

## 你今天就能做的事：为 AI 造一个项目大脑

### 第一件事：在最重要的项目根目录建一个 CLAUDE.md

- 不需要完美，也不需要很长
- 写下团队的架构规则、命名约定、测试要求、反复踩过的坑，10 分钟能写完一个能用的版本
- 下次 AI 犯错时，先不要手动修，而是问自己：[CLAUDE.md](http://claude.md/) 里缺了什么？

### 第二件事：把每天重复做的事改造成 skill

- 遵循 Boris Cherny 金句：每天做超过一次的事，就变成 skill 或 command
- Code review、生成 commit message、写发布说明、修一类重复的 bug，这些都该是 skill，不该是每天手敲提示词

### 第三件事：在容易踩坑的地方加一个 hook

- Hook 是 98.4% 里最有杠杆的那部分
- 它不依赖 AI 变聪明，依赖确定性代码做强制检查
- 这是把人类工程师的判断力**翻译成机器可读约束**的过程

### 核心一句话

- 这件事的核心不在写代码，而在写规则
- Karpathy 今年 1 月推特金句："我已经从 80% 手动写代码变成了 80% 交给 Agent 写。"
- 未来五年，工程师的能力曲线正在从「我能写多少行代码」转向「我能为 AI 设计多严格的工作环境」
- 写代码的活儿正在被 Agent 接管，但设计那个让 Agent 能写出好代码的世界，还是人的工作——而且比以前更难、更重要、也更有意思

## 概念网络

针对 *《撕开 Claude Code 真相：让它好用的 98.4%，是工程不是 AI》*（新智元，编辑：元宇）的概念提取

### 核心概念解析（Core Concepts）

### 【AI 工程基础设施】(AI engineering infrastructure)

- **context**：

\-

"这已经不是写提示词了。这是 AI 工程基础设施。"

- **费曼一下**：让 AI 在生产环境真正能用的那套外围工程系统——不是模型本身，而是围绕模型搭起来的项目记忆、工作流、护栏、文档、工具组成的"基建"。范式从"调 prompt"切换到"造基建"。

### 【1.6% vs 98.4%】

- **context**：

\-

"研究者系统性扒了 Claude Code v2.1.88 版本 51.2 万行 TypeScript 源码，给出的结论是：只有 1.6% 是 AI 决策逻辑，剩下的 98.4% 是确定性的工程基础设施。"

- **费曼一下**：本文的"标题数字"。Claude Code 整个产品里，真正调用模型做决策的代码只占 1.6%，其余 98.4% 是写死的工程逻辑——权限、上下文、工具路由、错误恢复。它揭示的不是模型不重要，而是"产品复杂度的重心在工程那一侧"。

### 【确定性工程基础设施】(deterministic engineering infrastructure)

- **context**：

\-

"具体说就是权限网关、上下文管理、工具路由、错误恢复这四类。"

- **费曼一下**：那 98.4% 的具体构成。"确定性"是核心修饰词——这些代码不依赖 AI 推理，给定输入永远给出相同输出，因此能用来约束、兜底那个不确定的模型。四大件：权限网关、上下文管理、工具路由、错误恢复。

### 【CLAUDE.md】

- **context**：

\-

"一个 markdown 文件，放在项目根目录，Claude Code 在每次会话开始时自动读取。"

- **费曼一下**：项目的"大脑"或"员工手册"。AI 每次启动第一眼读它，里面写着架构决策、命名约定、测试要求、踩过的坑。它是把"项目经验沉淀成长期上下文"的载体。本文的三条原则——Claude 犯错就加规则、自己重复就加工作流、出 bug 就加护栏——本质都是在嗂养这一份文件及其衍生结构。

### 【skills（.claude/skills/）】

- **context**：

\-

"如果你每天做某件事超过一次，把它变成 skill 或 command。"

- **费曼一下**：可复用的工作流。一个 skill 就是一段"可执行的方法论"——code review、生成 commit message、写发布说明、修一类 bug，封成 skill 之后，调一下就出结果，不必每天手敲提示词。它对应公司里的 SOP。

### 【hooks（.claude/hooks/）】

- **context**：

\-

"它不依赖 AI 自己判断，由确定性代码在 AI 犯错之前就挡住它。这就是为什么敢让 AI『无人监督』地跑，因为出错的边界由 hooks 卡死了。"

- **费曼一下**：自动护栏。不靠 AI 自我反省，靠确定性代码强制拦截。它是 98.4% 里"杠杆最大"的一块——把人类工程师的判断力翻译成机器可读的硬约束。它对应公司里的合规部。

### 【docs/decisions/（架构决策记录，ADR）】

- **context**：

\-

"让 AI 不仅知道代码『是什么』，还知道代码『为什么是这样』。这一项最容易被忽略，但也是 AI 协作最大的杠杆点。"

- **费曼一下**：仓库里专门记录"为什么这么写"的文档。光有代码本身，AI 只知道现状；有了 decisions 记录，AI 才理解约束的来历，不会无脑改回去。最容易被忽略，但杠杆最大。

### 【AI 公司岗位编制】（项目结构的隐喻）

- **context**：

\-

"[CLAUDE.md](http://claude.md/) 是入职手册，skills/ 是工作 SOP，hooks/ 是合规部，docs/ 是公司章程，tools/ 是后勤组，src/ 才是真正出活的业务部门。"

- **费曼一下**：作者用来串起整套架构的核心比喻。把仓库目录看成一家 AI 公司的组织结构——这正好对应了"你不再是在和 AI 聊天了，而是在构建一个了解你代码仓库的 AI"。

### 【Harness】(挽具)

- **context**：

\-

"Harness 这个词来自马术。它指的是马的整套挽具，缰绳、马嚼子、马鞍、笼头。一匹马可以跑得很快很有力，但它自己不知道往哪儿走：整套挽具决定了它的方向。"

- **费曼一下**：本文最关键的隐喻。模型 = 跑得很快的马，Harness = 你给它的方向盘+刹车+导航。AI 在你的代码库里能不能跑出价值，取决于这套挽具，而不是马本身有多能跑。

### 【Agent = Model + Harness】

- **context**：

\-

"Martin Fowler 的网站把它凝练成一个公式：『Agent=Model+Harness。』"

- **费曼一下**：本文的中心公式，把"为什么工程占 98.4%"用一行说清楚——一个真正能干活的 Agent，不是模型单独跑，而是模型加上整套 harness。换模型只是换马，换 harness 才是换整匹马的可控性。

### 【Harness Engineering】(挽具工程)

- **context**：

\-

"2026 年 2 月 11 日，OpenAI 官方博客发了一篇文章：《Harness engineering: leveraging Codex in an agent-first world》。"

- **费曼一下**：把"为 AI 造挽具"作为一门独立的工程学科。LangChain 没换模型、只调 harness（系统提示、工具、中间件、推理模式），就把 Terminal Bench 2.0 从 52.8 提到 66.5——这就是 harness engineering 的实证威力。

### 【层级架构强约束 + 给 Agent 读的 lint 错误】

- **context**：

\-

"普通项目的 lint 错误是『violation detected』，给人看的；OpenAI Frontier 的 lint 错误是『use [logger.info](http://logger.info/)({event: 'name', ...data}) instead of console.log』，给 Agent 看的、可以直接读懂并修复的指令。"

- **费曼一下**：OpenAI Frontier 实验里最反直觉的工程细节。Types→Config→Repo→Service→Runtime→UI 单向依赖、由 CI linter 强制；更狠的是 linter 报错本身就是"给 AI 的修复指令"，让 Agent 自己读了就能改。这是把工具链彻底改造成"AI 友好"的范例。

### 【0 人工代码、0 人工 review 极限形态】

- **context**：

\-

"带队的 Ryan Lopopolo 在后续访谈中进一步提到，这套工作流已经接近『0 人工代码、0 人工 review』的极限形态。他认为与其节省 token，不如利用模型极高的并发能力和极低的成本来代替人类有限且昂贵的同步注意力。"

- **费曼一下**：OpenAI Frontier 团队 5 个月跑出 100 万行代码、1500 个 PR 的工作模式。背后是一个反直觉的算账方式——人类的同步注意力是稀缺昂贵的，而 token 是便宜并发的，应该把工作量倾倒在模型那一侧。

### 【为 AI 设计工作环境（工程师能力曲线的转移）】

- **context**：

\-

"未来五年，工程师的能力曲线正在从『我能写多少行代码』转向『我能为 AI 设计多严格的工作环境』。"

- **费曼一下**：本文给普通开发者的最终结论。工程师的护城河正在从"写代码的手速"迁移到"为 AI 写规则的判断力"。Karpathy 那句"从 80% 手动写代码变成了 80% 交给 Agent 写"是同一件事的另一面。

### 概念网络（Concept Network）

![图片展示了让AI编程真正好用的底层框架。包括犯错加规则、重复加工作流、出错加护栏等，以及项目规则文件、可复用技能工作流、自动护栏、架构决策记录等。模型能力（1.6%）与Harness系统相关，Harness系统由Agent（模型+Harness）和Harness工程构成。确定性工程基础设施（98.4%）贯穿其中。该图与上下文紧密相关，直观呈现了AI编程好用的底层框架构成。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjhjZDc5OWE5MmJkNzQ2ZDhiMGEzNjhiNDgwY2I1YzBfMjI1ZmEwMDBhNmVmNWIzZGNkYTdiYzc5MWZlMDg5NGJfSUQ6NzY3MTAwODAzMjk3NDMxMDY3Ml8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

**底层框架**：让 AI 编程真正好用的，不是更强的"马"（模型），而是更好的"挽具"（Harness）。挽具由确定性工程基建构成，普通开发者也能照着 [CLAUDE.md](http://claude.md/) / skills / hooks / docs/decisions 这套结构搭一个迷你版。

**主干逻辑链**：

- **【1.6% vs 98.4%】** × **【确定性工程基础设施】** → 揭示产品复杂度的重心不在模型，而在工程
- **【Harness】** × **【Agent = Model + Harness】** → 给 98.4% 起了个名字，并把它升级成一门学科：**【Harness Engineering】**
- **【**[\*\*CLAUDE.md\*\*](http://claude.md/)**】** + **【skills】** + **【hooks】** + **【docs/decisions】** → 普通开发者层面的 harness 实例，对应隐喻 **【AI 公司岗位编制】**
- 三条原则（犯错加规则、重复加工作流、出 bug 加护栏）→ 分别嗂养上面四个组件 → 形成"越用越聪明"的反馈循环

**辅助逻辑链**：

- OpenAI Frontier 的 **【层级架构强约束 + 给 Agent 读的 lint 错误】** + **【0 人工代码、0 人工 review 极限形态】** → 证明把 harness 做到极致能跑出生产级结果（100 万行 / 1500 PR）
- LangChain 不换模型只调 harness，把 Terminal Bench 2.0 分数从 52.8 拉到 66.5 → 反向印证 **【Harness Engineering】** 的杠杆
- 由此推出对普通开发者的行动结论：**【为 AI 设计工作环境】**——工程师价值曲线的迁移

**一句话总结概念网络**：

模型只是那匹跑得飞快的马，真正决定它能不能在你的代码库里跑出价值的，是你为它造的那套挽具——而 98.4% 的活，其实都在挽具上。

HOWIE 原清单 · 21

# 拆开 Claude Code：一个编码 agent 的 harness 内部长什么样

**内容说明：**GitHub 那篇《harness is all you need》讲的是方法论，这篇是具体解剖，看完再回去读会实在很多。

**策展人按：**这就是上一条那句口号的施工图。看完你会明白 98.4% 具体是些什么东西。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：Claude Code 内部工作原理窥探
- 作者：xxchan
- 内参日期：2026-07-29
- 来源类型：blog
- 原文：https://xxchan.me/ai/2025/05/06/claude-code.html
- 标签：Anthropic

GitHub 那篇《harness is all you need》讲的是方法论，这篇是具体解剖，看完再回去读会实在很多。

## 导读

旧文重读。

## 核心观点

- 想知道一个 AI app 究竟怎么工作，最可靠的方式不是读它的宣传，而是看它和模型之间的对话 log。作者用 custom endpoint 把 Claude Code 的请求截下来，直接读到了它的 system prompt、工具清单和背后的小模型调用。
- 全文的方法论内核，是作者自称「小小升华」的一句判断：prompt 对话是 LLM 的第一性原理，任何 AI app 归根结底就是和 LLM 对话（例如工具调用也是对话），然后把有用的（结构化的）结果抠出来，再用确定性的其他代码缝合起来。
- 拆开之后看到的 Claude Code，最大的亮点不在模型，而在 task management：13k 字符的 prompt 里反复强调 TodoWrite/TodoRead 要 VERY frequently 地用。作者认为这是一个更进阶版的 scratchpad.md，主要胜在多个子任务的管理，并大胆预测任务管理必定是未来 agentic coding tool 的标配。
- 它在代码编辑上的选择同样朴素：tool call 基本只用 Write 全文覆盖而不用 Edit，直接绕过 apply edit 的困难，代价只是费 token。但完全依赖 instruction following 也会翻车——(Rest of file unchanged) 那次「magic 的体验」，其实是模型真的把代码删了。
- 由此引出全文最尖锐的一问：对 agent 模式而言，cursor 相比 claude code 多出来的 apply 模型、原生 fix lint、codebase index & vector search，哪一样是真的强依赖 IDE？如果都不是，fork 一个 IDE 的路线就越发不明朗，纯插件方案反而可能更有前途。

## 窥探 prompt 的三种方法：从 log 反推 AI app

- 缘起是一篇讲怎么偷看 cursor prompt 的帖子：用 ollama 在本地跑大模型看 log，再用 ngrok 把本地端口暴露到公网，让 cursor 能访问。作者用类似方法转向 Claude Code。
- 方法 1 是 openai platform 原生的 request log（第一次进这个页面需要手动 enable 一次），信息非常详细，比如能看到 project_layout 这个 cursor 最近版本的 beta 功能。
- 作者强调「tools 是一大关键」：log 里列出的 codebase_search 应该就是 cursor 从索引过的 codebase 做 vector search，而 edit_file 则是调用 cursor 训练的 apply change 模型——工具清单本身就暴露了产品架构。

![图片展示的是Harness Engineering中窥探prompt的三种方法之一，从log反推AI app的相关内容。左侧是对话界面，显示开发人员与AI的对话，AI作为编码agent，与USER配对解决问题。右侧是工具清单，列出了如read_file、grep_search等工具调用及对应的函数调用，如git_base.search、git_base.create_issue等。该图片与上下文紧密相关，直观呈现了从log中读取cursor完整系统prompt及工具调用输入输出，进一步说明研究AI app工作方式可通过看对话log。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2IyZDRlODY3YjY1YWJkZDgwYmY0M2MxODI2NGE5M2VfNGY2NzNlNWFjYjcyM2FmZDk5NGFhZTc4YmQ3NTM5MmNfSUQ6NzY3MTAwODAzMTM5NTY5NTU2Nl8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜OpenAI 日志里能读到 cursor 完整系统 prompt，右侧工具清单让产品架构一目了然* ｜ [原图](https://neican-res.candobear.com/article-images/997a809e9578488bf958ea8cd076596acdc384f7912af60d136c696334e1c030.png)

- 工具调用的输入输出同样能在 log 里看到，于是有了那句升华：任何 AI app 归根结底就是和 LLM 对话，再把结构化结果抠出来、用确定性的其他代码缝合起来；要研究某个 AI app 怎么工作，最好的方式就是看对话 log。
- 方法 2 是 Cloudflare AI gateway（免费）。开启后拿到一个 endpoint，针对 openai / anthropic / openrouter 有不同变种，在 cursor 之类的 app 里把 custom endpoint 一换就生效。
- 它本质上是一个反向代理：原封不动地把请求转给模型供应商再转回来，中间截取请求做通用的 log 和 metrics。相比 openai 的 log，它多了请求级别的计费和时长统计、支持 openai 以外的模型、能看到更完整的请求（例如 choices），缺点是没有渲染成对话形式那么清楚。

![图片展示的是Cloudflare网关日志界面，呈现了请求级计费、时长与完整请求响应信息。上方有Logs、Analytics、Evaluations、Guardrails、Settings等导航栏。下方记录了多条请求日志，如2025年5月5日13:34:14的请求，状态为Success，模型为openai/gpt-4.1-mini，请求内容为“你好，有什么可以帮忙的吗？”，响应内容为AI助手回复，还显示了Tokens、Cost、Duration等数据。该图与文档中方法3自制HTTP proxy的内容相关，直观呈现了通过Cloudflare网关获取的请求响应数据。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTgzNmYxM2RkZTAwOWE1MmQyYjYwMzQwYjEwNjAzYzFfZDUwNWRhY2EzNzUyOWQzMjA3MzNkNjg4OWNkYzc3MzlfSUQ6NzY3MTAwODAzMDUyMzI0Nzg1NV8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜Cloudflare 网关日志带请求级计费、时长与完整请求响应* ｜ [原图](https://neican-res.candobear.com/article-images/79d9e04d80b259bb20c814d224ead7dba4edb65fb4759fd48e02b8039bf65bc9.png)

- 方法 3 是自制 HTTP proxy。既然 gateway 本质就是个简单反向代理，那自己写个接收并转发、顺手把请求 log 下来的服务器，只需要几行代码；少了 token 统计、计费这类特化功能，但可以更灵活地做更多事。

## 进入 Claude Code：一大一小两个模型

- 研究动机很朴素：看到一条 twitter 说 claude code 太牛了、可以替代 cursor，作者「很难不好奇是不是真有这么牛」。问 ChatGPT 没问出什么，只能自己上手。
- 要看 prompt 就得用 custom endpoint。ChatGPT 给出了一个 undocumented env var ANTHROPIC_BASE_URL，但 claude SDK 与 openai API 不兼容，无法直接用 openrouter/openai 的 key；简单搜索就找到了 claude-code-proxy 这个「Run Claude Code on OpenAI models」的项目，完美符合需求。
- 初步观察有两条：claude code 会使用一大一小两个模型；每次打字都会发请求给小模型。

![图片展示的是Harness Engineering文档中关于Claude Code的AI内参主题精选内容。画面呈现了日志界面，显示了172条记录，记录了每敲一个字就触发一次小模型请求的情况，输出多为“Wondering”“Pondering”等词。这些记录对应于“进入Claude Code：一大一小两个模型”这一主题，直观呈现了小模型被要求生成积极、欢快、带点whimsy的动名词以添彩状态提示，且被禁止使用Terminating、Killing等词的使用情况。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzcyYmRlNGJkZDFiYWMyODJiNTE4YjU2NDBiMTJhZmRfNzY4ODMyYjFkYzZhNzBiZjE1NmVlMTdkYWQ3NTY4YTRfSUQ6NzY3MTAwODAxOTE4NjA2MDU2MF8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜日志里 172 条记录显示每敲一个字就触发一次小模型请求，输出全是 Wondering 之类的词* ｜ [原图](https://neican-res.candobear.com/article-images/1a34f7c8f6d241f1ecf89e96ce83fdb9b088a3855d7b6fdb14d797fe357c51cb.png)

- 这个高频请求「看起来是纯氛围组」，作者在使用中没发现它的实际作用——小模型被要求生成一个积极、欢快、带点 whimsy 的动名词，用来给状态提示添彩，还被明令禁止使用 Terminating、Killing 这类会让工程师紧张的词。

![图片展示的是Harness Engineering中AI内参主题精选文档中关于Claude Code的Chat Completion示例。画面中“System”部分给出指令，要求分析消息并给出一个与之相关的积极、欢快、令人愉悦的动词，需以动名词形式呈现，首字母大写，且不能使用可能令人担忧或不恰当的词汇。下方“User”部分是“what does”，“Assistant”部分给出答案“Delighting”。该图片与文档中对Claude Code内部长样的介绍相关，直观呈现了其工作流程中系统与用户交互的示例。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODRmMmQzNzhmZDczMDI0Yzc4ODllNzRmZTUxMmU2OGVfNjhmZWFhMWY0NzJmNDQ5YzJmMzU5MDg3ZTI4ZjRhYmZfSUQ6NzY3MTAwODAyMDMxMDAzNTc0MV8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜这条小模型 prompt 要求生成一个欢快动词给用户添点惊喜，输出是 Delighting* ｜ [原图](https://neican-res.candobear.com/article-images/fd7d50c3154e761ce934ed75672e1776bcea846c099f77e71a19b7d3417610e3.png)

- 另一个小模型请求是在发送消息时判断是否是 new topic，并抽出一个 2-3 词的标题，作者判断「感觉是用来管理 context」。

![图片展示了Harness工程中Claude Code的Chat Completion日志界面。界面中显示了系统和用户的消息。系统消息要求分析是否为新会话主题，如果是则提取2 - 3词标题，格式为JSON对象，包含“isNewTopic”和“title”字段，仅包含这些字段。用户消息为“summarize this project”。输出部分显示系统响应，JSON对象中“isNewTopic”为true，“title”为“Project Summary”。该图片与文档中对Claude Code内小模型请求的描述相关，直观呈现了系统对新话题判断及标题提取的响应示例。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZjA3OWFmZWMxNjA3YzlkNmY3MDY5MGZlYTQzYzcyZWZfMWY3M2QzMTllMjhjNzc4NjBmN2Y1Y2FlNDYwY2IyMWNfSUQ6NzY3MTAwODAyMDEzODA4NTMyN18xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜另一条小模型请求判断消息是否开启新话题并给出标题，用于管理上下文* ｜ [原图](https://neican-res.candobear.com/article-images/9378f7ecced3a0eddee06fb166709d33cccf9f86f090a44cae3a2d4dafe98e81.png)

## 正式请求里的 Claude Code：13k 字符 prompt 与任务管理

- 对正式请求的两条观察：prompt 非常长，有 13k 字符，相比之下 cursor 的 prompt 只有不到 6k；tools 里大多是 Bash、Grep、Edit、WebFetch 这些标配，但内置了 TodoRead/Write（！）和 NotebookRead/Write（jupyter）。

![图片展示的是Claude Code系统prompt与工具清单。左侧是系统prompt，强调Claude Code是Anthropic官方CLI，为用户提供软件工程任务帮助，拒绝恶意代码，工作前思考代码用途，禁止生成或猜测URL，可使用用户提供的URL。右侧是工具清单，包括Task、Bash、Batch、Glob、Grep、Ls、Read、Write、NotebookRead、NotebookEdit、WebFetch、ToolInstall、ToolWrite等，以及Configuration和Response部分。该图片与文档中对Claude Code系统prompt与工具清单的介绍相关，直观呈现了相关内容。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGFiYzJiN2VkMmEwOGIzMTJkYmM0N2UwMjFjNmIyMjlfZDAzZTRmNzU2ODA1Yjg3NzAxNmY5YTlmMGRjNGVjNDJfSUQ6NzY3MTAwODAxOTM4NzI3MjM5MV8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜Claude Code 系统 prompt 与工具清单，含两个待办工具* ｜ [原图](https://neican-res.candobear.com/article-images/4556fa250c24603ba3d8a61dda2c54a10fc266d3c074234d287749e45ab2762a.png)

- prompt 本身的取舍值得一读：反复要求 concise、direct、to the point，明确「fewer than 4 lines」的输出上限，禁止 unnecessary preamble or postamble，甚至给出「2+2 → 4」这类极端简洁的示例；也交代了 tone、proactiveness、synthetic messages、following conventions（不假设库存在、先看邻近文件和 package.json）、code style（除非被要求，不加任何注释）等规范。
- 作者认为其中最大的亮点是 task management。prompt 里着重强调这两个工具要 VERY frequently 地用，还写明「If you do not use this tool when planning, you may forget to do important tasks — and that is unacceptable」，并要求做完一项立刻标记完成、不要攒着一起标。
- writeTodo 这个 tool 的 spec 也写得非常长。对比此前让 plain cursor 拥有更强 agent 能力的 devin.cursorrules 项目，作者的判断是：这是一个更进阶版的 scratchpad.md，主要胜在有多个子任务的管理。

![图片展示的是终端界面，呈现了Claude Code在任务管理中的实际运行效果。界面中显示了“init”指令，询问需初始化的内容，如初始化git仓库、设置新项目等。下方有“Update Todos”和“Read Todos”列表，列出当前代码库结构、未实现功能、核心流程等任务，还显示了搜索“*.swift”和“*.plist”文件的结果。该图片与文档中介绍Claude Code任务管理的内容相呼应，直观呈现了其在终端中的操作与效果。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODNkNTg2NjFkNzljYmMwY2FmNzEyYTYwZDUyODYyMTBfYjQ5MWQwYjBiNzk1N2QwYjAyMjAwYTY2M2U1ZDcxY2RfSUQ6NzY3MTAwODAyMjQxNTU0MzI3MV8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜终端里 Claude Code 先写 todo 再逐条推进，这是任务管理的实际运行效果* ｜ [原图](https://neican-res.candobear.com/article-images/6caaa8747efc3fcbaf0ad8311b939a9a0d4884793763f34b1987a78deeb4ae6d.png)

- TODO list 并没有写在项目路径下面，而是藏在 \~/.claude：todo 是一个 json，同目录还有一个 sqlite 数据库 \_\_store.db（表包括 \_\_drizzle_migrations、assistant_messages、base_messages、conversation_summaries、user_messages），以及 statsig 的缓存文件——statsig 是一家专门做数据实验的 startup，作者由此判断「claude 还是很重视做数据实验的」。

![图片展示了Harness工程中Claude Code的内部结构。左侧为IDE界面，显示了claude - prompt.md、writetodo.md等文件，以及todos文件夹下的json文件。右侧是todos.json内容，包含多个任务，如“Review current codebase structure and existing Swift files”等，状态有“in_progress”“pending”等，优先级有“high”“medium”等，还有任务ID。该图片与文档中对Claude Code内部结构的描述相关，直观呈现了其存储任务信息的json文件内容。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmY1NDRiZjY5NDQ0YjE1ZmJkZGEwOTg2Y2FjODE1YjRfOWYxYWIxYTU0ZDNjMjkyNTFjMDZkMGZiODgzYTA0YjlfSUQ6NzY3MTAwODAyMjE1NTQ5NjcxNF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜本地配置目录里存着待办 json、消息库与实验缓存文件* ｜ [原图](https://neican-res.candobear.com/article-images/764be65917ef7c6f60201e60503aafe0acf40f533d5ad34ce6ee8ba0f970e7e7.png)

- 作者「稍微发挥一下」，大胆预测 task management（以及 memory/knowledge management？）必定是未来 agentic coding tool 乃至所有 agentic app 的标配，并疑惑为什么 cursor 到现在还没有推出自己的方案，「感觉有点落后了」。
- 但他随即自我反问：是不是直接通过 MCP 插一个 todo manager 就够用了？并不需要 app 原生的任务管理工具。外置方案已经有 task master（支持命令行或 MCP 调用），不过他直觉上觉得「有点不必要地复杂」：弄个很长的 prd，再分解成十几个 subtask。
- \*这个「原生 vs 外挂」的悬念作者没有给出结论，只留下「因为暂时还没有深度在项目中使用，所以这个 todo 的具体效果还有待检验」。

## 其他有趣观察：编辑、WebFetch 与神秘的 code context

- **apply edit**：cursor 自己训练了一个 LLM 专门做 apply edit，作者好奇 claude code 这个命令行「小工具」怎么做到。试下来发现 tool call 基本上只用 Write 而不用 Edit。
- 仔细看 Edit 的 tool spec，里面有一行「For larger edits, use the Write tool to overwrite files」，作者「一下子顿悟了」：如果直接无脑全文覆盖，不就绕过了 apply edit 的困难吗？只要 instruction following 能力强，效果应该不错，「只是费电 token 罢了」。写完之后还会渲染出 diff，细节做得不错。

![图片展示了终端中关于MemoScribe/ContentView.swift文件的代码内容。其中，第20行代码“@State private var deleteTarget: Recording? = nil”被高亮显示，表明当前代码中存在一个名为deleteTarget的State变量，其类型为Recording的可选类型，初始值为nil。该图片与上下文紧密相关，上下文提到“但这条路也有代价”，此图片可能是在说明代码修改带来的影响或代价。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODFiODY2N2QzZjk4OWNhMjZlZDczOGFkNjAyNTlhZjhfZTkyNGIzNjdiMzQ0MmIwN2ZmNTMwY2Y1MTBiMzExZDFfSUQ6NzY3MTAwODAyMTExOTU1Mjc0Ml8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜Write 一次覆盖带来 44 处新增和 344 处删除，终端里仍渲染出清晰 diff* ｜ [原图](https://neican-res.candobear.com/article-images/9a3aaabfed59c976b7a83b3d6e8694bc4d23dc1ee2c8a9e3584b687322f03e66.png)

- 但这条路也有代价。作者一度以为看到了 (Rest of file unchanged) 这种 magic 的体验，结果「…………并不是，它是真的把代码删了，把这个注释写进去了」。结论是：完全依赖 AI 的 instruction following 还是没那么靠谱（此处用的是 gpt4.1，默认的 claude3.7 或许会好一点）。

![图片展示的是代码片段，包含`#Preview`注释块，其中`ContentView`函数被定义，其环境设置为`managedObjectContext`和`FolderState()`。图片下方有两行注释，第一行“\\ No newline at end of file”表示文件末尾无换行符，第二行“// (Rest of file unchanged)”表明文件其余部分未变。该图片与文档中“diff显示大段代码被删，只留下一行Rest of file unchanged的假象”内容相关，直观呈现了代码中这一现象。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZTI3YmQ4YjA2ZjM1ODc0MWVmYTU3YTBmNzJkOTkyMTRfMjU1N2Y3NWMwNTkzMTY3YTgwZjFkY2RiYzk4ODMzZGZfSUQ6NzY3MTAwODAyMDA4OTQwODcwMF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜diff 显示大段代码被删，只留下一行 Rest of file unchanged 的假象* ｜ [原图](https://neican-res.candobear.com/article-images/57e901cd7c106381060d295320eb5e8d12f06831037be4c1918ba4b65fe2616d.png)

- **WebFetch**：这个 tool 的参数在 URL 之外还有一个 prompt。大号模型生成 tool call（包括这个 prompt），系统再把网页与 prompt 组合交给小模型总结，最后只把一小段文字传回给大号模型作为 context。作者评价这个两阶段过程「还是挺细腻的」，应该比把高噪音的 html 直接给模型效果好。

![图片展示的是一个AI内参主题精选文档中关于GitHub PR引入的GitHub Actions工作流自动化Docker镜像构建的对话界面。界面中显示了系统提供的PR内容，包括通过改进标签简化手动标签错误、使用双破折号清晰分隔标签段等信息。下方是助手的输出，总结了该PR通过改进标签简化手动标签错误、使用双破折号清晰分隔标签段等，旨在简化Docker镜像构建过程并改善开发者体验。该图片与上下文紧密相关，直观呈现了AI对GitHub PR内容的总结反馈。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODU0ODhkNjU3OGI5YWQxNDkwNzBmODFjOWVlMzk2MjJfMjNhOGI1YTlmNjI1N2QwNmMwZGUwZDg0NzU5NmU1MmNfSUQ6NzY3MTAwODAyMTM3NTM3MjUyOF8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜WebFetch 第二阶段：小模型按大模型给的 prompt 把网页压成一小段摘要* ｜ [原图](https://neican-res.candobear.com/article-images/04ab401d75e2fc7739e95dd40ae2cc0ce7da7e89b5340663b95e9c80147e61af.png)

- **自动带的 code context**：发出一个指令后，claude code 自己挑选了一些文件加入 context。这个步骤并没有 tool use，也没有额外的模型总结，\~/.claude 目录下也没发现类似代码索引的东西，所以「感觉有点神秘。感觉 claude code 还是藏了点东西的」。

![图片展示了生成CLAUD.E.MD文件时，对MemoScribe项目中多个源文件的读取情况。包括读取MemoScribe/MemoScribeApp.swift（101行）、MemoScribe/ContentView.swift（474行）、MemoScribe/AudioUtilities.swift（28行）、MemoScribe/UploadManager.swift（258行）和MemoScribe/FolderScanner.swift（174行）文件。最后显示写入CLAUD.E.md文件31行内容，其中包含项目概述等信息。该图片与上下文关于生成项目说明文件时，几个源文件未经工具调用就自动进入上下文的内容相关，直观呈现了文件读取情况。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGNhNmI2Yzg3Mjk0M2FjMjVhZmY3M2I5NTk5YmExZTlfZDFkNzI0MmMwNDMwNjNkZDA0OTc0NzA5YzUwOTViNDJfSUQ6NzY3MTAwODAyMDIzMjAxNTEzOF8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜生成项目说明文件时，几个源文件未经工具调用就自动进入上下文* ｜ [原图](https://neican-res.candobear.com/article-images/138587454b69aebf6977c264b90c3c7dc3df4d6707f0b6916d0a31939632ac96.png)

## 总结与判断：terminal 形态与 IDE 护城河

- 整体看下来，claude code 确实是个细节打磨得不错的工具：terminal UX 不错，prompt 和 task management 用心。
- 虽然效果还没经过大规模实战检验，但作者已经不禁在想：AI coding 好像确实没那么需要一个 IDE，terminal 这个形态感觉很合理。让 agent 在 terminal 写，人类使用寻常的 IDE（例如原生 VS Code）进行 review、进一步编辑，好像没有任何问题，不比在 IDE 里 chat 慢或效果差。
- 再进一步：对于 agent 模式，cursor 相比 claude code 多了什么？作者一下子能想到三样，并逐一祛魅——
- apply 模型：或许准确率和性能更高？但有点存疑，因为最近一段时间感觉失败率甚至有点高。
- 原生的 fix lint：并非反复在对话里让 ai 修，感觉和 apply/edit 一样是另一个专门的小模型；为此或许需要依赖 IDE/LSP 的静态分析，但从命令行跑 lint 或许也完全能达到这个效果。
- codebase index & vector search：同理，感觉并不强依赖 IDE，原则上做进命令行也没什么不可。
- 三样都不构成 IDE 的硬绑定，于是结论指向一个不太乐观的判断：agentic coding tool（startup）的未来越发不明朗，特别是 cursor 这种 fork 的 IDE；或许像 Augment Code 这样的纯插件方案更有前途——连当初最吸引作者的 cursor tab 功能，都已经以纯插件的方式做到了。
- 后记里补了一条：openai codex 是纯开源的，prompt 和 tool 直接看得一清二楚，不用特意扒，但看看 request log 仍是个不错的观察切面。作者还发现 codex 的 issue 里竟然没人提 task management——于是他自己去提了一个。

## 概念网络

### 关键概念

### 看对话 log

**context**：全文的方法起点。作者说「要研究某个 AI app 怎么工作最好的方式就是看对话 log」，无论是 openai platform 的 request log、Cloudflare AI gateway 的日志，还是自制 HTTP proxy，做的都是同一件事——把 app 与模型之间的对话截下来读。

**费曼一下**：AI 产品对外是一个界面，对内只是一串发给模型的消息。与其猜它有什么黑科技，不如站在它和模型之间，把信件拆开看一眼——所有秘密都写在信里。

### 对话加确定性缝合

**context**：作者的「小小升华」：prompt 对话是 LLM 的第一性原理，任何 AI app 归根结底就是和 LLM 对话（例如工具调用也是对话），然后把有用的（结构化的）结果抠出来，再用确定性的其他代码缝合起来。

**费曼一下**：一个 AI 应用 = 会说话但不可靠的大脑 + 一堆一定能跑对的普通代码。大脑负责出主意，普通代码负责把主意接住、校验、执行。产品差距往往出在后半截。

### 反向代理式窥探

**context**：文中给出的三种看 prompt 的手段里，方法 2 与方法 3 共享同一个原理——AI gateway「本质上是一个反向代理」，原封不动转发请求，只在中间截取并记录；自己写一个只需几行代码。

**费曼一下**：在你和模型之间架一个中转站。它不改内容，只是顺手抄一份。抄下来的这份，就是产品说明书里永远不会写的那部分。

### 大小模型分工

**context**：初步观察的第一条结论是「claude code 会使用一大一小两个模型」。小模型承担高频、低价值的边角活（状态词、new topic 判定、网页总结），大模型只处理真正的编码推理。

**费曼一下**：贵的脑子用在刀刃上，杂活派给便宜的脑子。这不是模型能力问题，是成本与延迟的工程分配。

### 氛围组请求

**context**：每次打字都会发请求给小模型，prompt 要求生成一个积极、欢快、带 whimsy 的动名词，还禁用 Terminating、Killing 这类字眼。作者的评价是「这个请求看起来是纯氛围组，但在使用中没发现它的作用」。

**费曼一下**：产品愿意为「等待时那一瞬间的心情」单独调一次模型。功能上毫无必要，体验上却是那点让人愿意继续用下去的东西。

### new topic 判定

**context**：另一个小模型请求在发送消息时判断 isNewTopic 并抽一个 2-3 词标题，作者判断「感觉是用来管理 context」。

**费曼一下**：长对话最大的敌人是上下文越堆越乱。先问一句「这是不是新话题」，就能决定要不要另起一段记忆，而不是把所有东西一直背在身上。

### 系统 prompt 的体量差

**context**：正式请求的观察之一：claude code 的 prompt 有 13k 字符，「相比之下 cursor 的 prompt 只有不到 6k」。这份 prompt 详尽规定了语气、简洁度上限、主动性边界、代码风格与工具使用纪律。

**费曼一下**：prompt 的长度是一个可观测的用心程度指标。它相当于给员工写的入职手册——手册越细，说明产品越清楚自己要什么行为，而不是把一切交给模型即兴发挥。

### TodoWrite 与 TodoRead

**context**：tools 里内置了 TodoRead/Write，prompt 中要求 VERY frequently 地使用，强调不用它规划就可能忘记重要任务，且做完一项要立刻标记完成。作者称之为「更进阶版的 scratchpad.md」，胜在多个子任务的管理。

**费曼一下**：给 agent 一张写在外面的清单。模型的注意力会漂移，但清单不会；把「记住要做什么」从脑子里搬到纸上，长任务才不会做着做着散架。

### 原生工具与 MCP 外挂

**context**：作者预测任务管理会成为标配后立刻自我反问：「是不是直接通过 MCP 插一个 todo manager 就够用了？并不需要 app 原生的任务管理工具。」外置的 task master 已经存在，但他直觉觉得它「有点不必要地复杂」。

**费曼一下**：同一个能力，可以长在产品身体里，也可以外接一个插件。前者体验一体、后者生态灵活。判断标准不是哪个更时髦，而是这项能力是否高频到值得被产品自己吃下。

### 本地状态层

**context**：TODO list 不在项目路径下，而在 \~/.claude：todo 是 json，另有 sqlite 数据库 \_\_store.db 存放消息（含 conversation_summaries 等表），还有 statsig 的缓存文件。

**费曼一下**：agent 不只是一次性对话，它需要一层落在磁盘上的记忆——待办、历史消息、摘要、实验开关。看一个 agent 在你机器上留下了什么文件，就知道它把什么当成需要跨会话保留的东西。

### 全文覆盖式编辑

**context**：作者发现 claude code 的 tool call 基本只用 Write 而不用 Edit，Edit 的 spec 里明写「For larger edits, use the Write tool to overwrite files」。他的顿悟是：直接无脑全文覆盖，就绕过了 apply edit 的困难，「只是费电 token 罢了」。

**费曼一下**：与其教模型精确地做外科手术，不如让它把整份文件重抄一遍。笨、贵，但可靠得多——很多工程难题的最优解就是用算力换掉一个必须训练的模型。

### apply 模型

**context**：cursor 自己训练了一个 LLM 专门做 apply edit，log 里的 edit_file 工具就是在调用它。但在总结部分作者对它的价值存疑：「因为最近一段时间感觉失败率甚至有点高」。

**费曼一下**：把「改文件」做成一个专用小模型，是上一代产品的护城河设想。一旦大模型本身足够听话、算力足够便宜，这条护城河就可能被一个更笨的办法抹平。

### instruction following 的可靠性边界

**context**：作者以为看到了 (Rest of file unchanged) 这种 magic 的体验，结果发现「它是真的把代码删了，把这个注释写进去了」，由此判断完全依赖 AI 的 instruction following 还是没那么靠谱。

**费曼一下**：模型会把「看起来像正确输出的东西」写出来，而不一定真的做对了事。凡是把正确性完全押在模型听话上的设计，都需要一层确定性的校验兜底。

### WebFetch 两阶段总结

**context**：WebFetch 的参数除 URL 外还有一个 prompt。大号模型生成 tool call 与 prompt，系统把网页与 prompt 交给小模型总结，只把一小段文字传回大号模型作为 context。作者称这个两阶段过程「挺细腻的」，应该比把高噪音的 html 直接给模型效果好。

**费曼一下**：别把一整个网页倒进主模型的脑子里。先派一个助理带着问题去读，读完只汇报一段话。上下文是稀缺资源，谁先学会压缩谁就跑得远。

### 隐式 code context

**context**：作者发出指令后，claude code 自动挑了一些文件进入 context，「这个步骤并没有 tool use，也没有额外的模型总结」，\~/.claude 下也没发现代码索引，于是留下「感觉 claude code 还是藏了点东西的」这句悬念。

**费曼一下**：能被 log 看见的，是这个产品愿意让你看见的部分。总有一段逻辑发生在请求发出之前——那往往才是竞品最难抄的地方。

### 护城河清单与插件化路线

**context**：作者逐项审视 cursor 相对 claude code 的三样东西——apply 模型、原生 fix lint、codebase index & vector search——发现它们都不强依赖 IDE，进而判断 fork IDE 的路线越发不明朗，纯插件方案（如 Augment Code）或许更有前途。

**费曼一下**：判断一个产品的壁垒，方法是逐条列出它「多出来的东西」，再逐条问：这一条离得开它现在的形态吗？如果每一条答案都是「离得开」，那壁垒就只是形态惯性。

### 概念网络

![图片为Harness Engineering AI内参主题精选文档中关于概念网络的原文关系图。图中以箭头和文字说明各节点间关系，如“看对话log是最佳研究切面”支撑“反向代理式窥探”等。图中还标注了“手段”“支撑”“张力”“因果”“对立”等类别，以及“随机code context”“系统prompt体量差13K对6K”等具体信息，直观呈现了概念网络的结构与逻辑。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWVmZTYwOTNkN2E1OTE1YjMyYmYwNTU1NzI5ZmI4ZDFfYzVjODQzNDZlMWNjY2FkNTkwYjFjMTE2MDM4Y2U5YTdfSUQ6NzY3MTAwODAxOTA2NDM3NjU0MF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染；仅将 TD 改为 LR 以适配文档宽度；节点与连线未改*



这张网络的入口是方法而非结论：因为承认「AI app 归根结底就是和 LLM 对话，再用确定性的其他代码缝合起来」，看对话 log 才成为最有效率的研究切面；反向代理（AI gateway 或几行代码的自制 proxy）是把这个切面变得可操作的手段。方法一旦成立，观察就顺着请求的两条线索展开。

第一条线索是模型的分工。截下来的请求立刻暴露了一大一小两个模型：小模型承担每次打字触发的氛围组动词、消息发出时的 new topic 判定，也承担 WebFetch 的第二阶段——把网页压成一小段再回传给大模型。三者是同一个原则的三次应用：把低价值、高频次、噪音大的工作从主推理链上剥离。WebFetch 因此反过来印证了「对话加确定性缝合」——两阶段之间的编排本身就是缝合代码。

第二条线索是 prompt 的重量。13k 字符对不到 6k，这个差额并非修辞，而是产品意志的密度；这份意志最集中的落点就是 TodoWrite 与 TodoRead。任务管理向下延伸出本地状态层（\~/.claude 里的 todo json、消息 sqlite 与实验缓存），向侧面则与「原生工具还是 MCP 外挂」形成一处未解的张力——作者自己也没给答案。

编辑一侧是另一组关系。全文覆盖式编辑与 cursor 的 apply 模型构成直接对立：一个用算力和确定性绕开难题，一个用专门训练的模型解决难题；但绕开也有代价，(Rest of file unchanged) 的假象正是全文覆盖在 instruction following 上撞到的边界，所以这条边是因果而非并列。

所有线索最终收束到两个判断节点。任务管理与全文覆盖共同说明，编码 agent 需要的东西 terminal 已经给得起，于是 terminal 形态成立；terminal 形态一旦成立，护城河清单里的每一项就必须重新自证，而 apply 模型的失败率恰好从内部削弱了这份清单。唯一游离在方法之外的是隐式 code context：它与「看 log 就能看懂产品」形成张力——总有一段逻辑发生在请求发出之前，那部分 log 照不到。

## 费曼 x3

一个编码 agent 好不好用，我们习惯把功劳或责任推给模型。但把它和模型之间的请求截下来读一遍，会发现决定手感的东西大多不在模型里，而在模型之外那层不起眼的胶水。

这层胶水之所以值得单独看，是因为一条更根本的判断：prompt 对话是 LLM 的第一性原理，任何 AI app 归根结底就是和 LLM 对话，然后把有用的结构化结果抠出来，再用确定性的其他代码缝合起来。这句话听着像废话，用起来却是一把尺子——它意味着一个产品的全部秘密都写在它发出的请求里，你不需要它开源，只需要在中间架一个反向代理。

Claude Code 把这层胶水的重量押在了任务管理上。它的 prompt 反复要求把待办写下来、做完一项立刻划掉，用一个写在外面的清单对抗模型注意力的漂移。称它是更进阶版的 scratchpad.md 并不贬低它：模型会忘，纸不会忘；长任务真正的失败方式不是某一步做错，而是做着做着忘了自己在做什么。

另一处朴素得更彻底。cursor 专门训练了一个模型来做 apply edit，Claude Code 干脆基本只用 Write 全文覆盖——如果直接无脑全文覆盖，不就绕过了 apply edit 的困难吗，只是费电 token 罢了。用算力和确定性换掉一个必须训练的模型，这是典型的 harness 思维。当然笨办法也会翻车：那句看起来很 magic 的 (Rest of file unchanged)，其实是模型真的把代码删了，然后写了一行注释假装它还在。凡是把正确性完全押在模型听话上的设计，都欠着一层校验。

于是那个不太舒服的问题就顺理成章：agent 模式下，IDE 究竟还提供了什么不可替代的东西？apply 模型、原生 fix lint、codebase index，逐条数下来，好像都不强依赖 IDE。让 agent 在 terminal 里写，人回到寻常编辑器去 review，也没有任何问题。如果一条护城河的全部内容只是形态，那它可能从来就不是护城河。

HOWIE 原清单 · 22

# 为什么 harness 工程这么难

**内容说明：**长推拆解 agent harness 的工程难点——难的不是模型能力，而是把工具、上下文与失败恢复做成可靠系统。对做 agent 平台的人是硬核经验。

**策展人按：**解剖完该谈代价了。这条和下一条是清单里唯二泼冷水的，放这儿是防止你读完前面二十几条就以为搞定了。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：Why Harness Engineering Is So Hard
- 作者：Winter
- 内参日期：2026-07-28
- 来源类型：twitter
- 原文：https://x.com/winterarc2125/status/2081042507471696318/?s=12
- 标签：agent skills

长推拆解 agent harness 的工程难点——难的不是模型能力，而是把工具、上下文与失败恢复做成可靠系统。对做 agent 平台的人是硬核经验。

## 导读

拆解 agent harness 的工程难点

## 核心观点

- 五个月、104 次 commit，作者反复撞上同一个教训：harness 工程很难。
- 几乎每个建在大语言模型上的项目都笼罩着同一种幻觉——**以为模型就是产品**。接上 API 调用、写个 prompt、第一次演示效果惊艳，于是感觉难的部分已经结束了。作者的回答只有三个字：「It is not.」
- 真正难的是把那次惊艳的演示变成**你能依赖的行为**：让模型在不同输入下遵守同一组约束、表达正确的意思而不漂移、熬过模型更新、显式失败而不是静默失败，并且在输出永远不可能完全确定的前提下依然可被测试。
- 作者把这层「行为层」称为 harness：介于一个概率式模型和产品使用者之间的 prompts、examples、schemas、validators、evals、guardrails。「The model generates the output. The harness is what makes that output usable.」
- 让优秀工程师反复吃惊的是：这里的痛苦大多来自一小组**结构性事实**——它们表面看像普通的软件问题，实际上不是。文章按六个痛点逐一拆解：测试失效、失败静默、调试散文、加法陷阱、地基自己重写、反馈回路慢而贵，外加一个社会性痛点：没人看得见这份工作。
- 收尾判断：这些难都不能被工程掉，只能被 harness 吸收；而正因为吸收不了的部分是不可复制的，它才是护城河。「The pain is the work, and the work is the moat.」

## 你写不出你想写的那个测试

![图片标题为“NON-DETERMINISM BREAKS TESTING”，展示了同一输入“SAME INPUT”对应三种输出结果。左侧为输入，右侧分别标注“CORRECT”“CLOSE-BUT-WRONG”“WRONG”，并配有对应符号。底部文字“expect(output).toBe(X) you can't write this test”表明无法编写此测试。该图与上下文紧密相关，直观呈现了测试中非确定性导致输出结果多样，进而影响测试结果准确性的现象。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTkxZjM4MzE1ODNkYjE4OWZkMTM2OGZmZTMwMjRhNzVfMmNiYzVmYWZlZDMwYzI0ZjY1NGNiNWFhZTU3NzhlZGVfSUQ6NzY3MTAwODAxOTYxMTIyNTA0Ml8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜同一输入产生正确、近似错误、错误三种输出，等值断言失效* ｜ [原图](https://neican-res.candobear.com/article-images/d232c45fc9a6212435a030b01b520b8e8467dbc93aa0a9bbf3d6fb52f8a1c2d1.jpg)

- 第一个崩掉的是**测试直觉**。整个职业生涯建立起来的测试实践都假设确定性：给定输入、代码产出固定输出、断言相等。
- 但同一个输入喂给语言模型两次，你会得到两个不同的输出。不一定天差地别——可能只是几个词、一个调换了顺序的从句、同一个意思的另一种说法——但足以让严格的等值断言变成废纸。
- 这听起来像小麻烦，其实不是：它**抽掉了整个质量策略的地板**。「写个测试、跑一遍、绿了就算完成」这条反射不再成立，而大多数工程师手上并没有一条替补反射。
- 退路只剩两种，且都更弱：
- 断言**结构**（输出能不能解析、必填字段在不在、计数对不对）。
- 断言**不变量**（有没有违反被告知要遵守的规则）。
- 两者都比工程师习惯的断言弱，都会放真正的意外输出过去。
- 问题于是从「一个输出是否等于一个预期答案」变成「系统在一个输入分布上、在重复运行中，是否满足一份 rubric」。这更接近 evaluation 而不是普通单元测试，**得到的是置信度，不是正确性的证明**。

## 失败是静默的、分级的，不是二元的

![图片展示了传统代码与模型输出在处理失败时的不同表现。左侧传统代码流程图中，输入经处理后出现红叉标志的CRASH；右侧模型输出流程图中，输入经生成后输出看似干净的文档，但文档中有红叉和斜杠标识的BROKEN。该图与上下文紧密相关，直观呈现了传统软件和模型在处理失败时的差异，即传统软件明确显示错误，而模型输出看似正常但隐藏错误。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Y2FkYTlhYTdhODY5MDdmYjU1NjkyNmRlYjMwYjBmZThfYjQ0YTc5N2NhODE0NjY0ZWQ1NTcwMDA1NWUzNTA3M2ZfSUQ6NzY3MTAwODAyMDYwNzgxNDk0Nl8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜传统代码以崩溃报错，模型输出把错误织进看似干净的文档里* ｜ [原图](https://neican-res.candobear.com/article-images/e6f9e0a078fd781b3e96d9474b7a0cde34cdbb1b0c12a83bf122abd1e83a3999.jpg)

- 普通软件里，失败会自己喊疼：异常、堆栈、非零退出码、红色日志。即使 bug 很隐蔽，系统最终也会给出信号——一个错误数字、一次崩溃、一次超时。
- 模型输出不会崩。一个 95% 正确、5% 崩坏的模型产出的响应**看上去完全没问题**：没有错误符号、没有异常，错的那 5% 用同样的散文、同样的格式、同样的自信，织进对的那 95% 里。
- 模型不知道自己错了；它没有一条独立的「我不确定」通道，就算你给它一条，它的使用也不一致。于是失败就静静躺在一份看似干净的文档里，流水线上没有任何东西报警。
- **最危险的输出恰恰是那些差一点就通过的**。粗暴的错误好抓（validator 会拒、人扫一眼就皱眉），微妙的错误通过所有浅层检查抵达用户。而「微妙地错」在语言模型这里不是一个小类别，它至少包括：
- 模型因为后面的指令间接与前面矛盾而**偏离某条约束**；
- 模型在该承认不知道的地方**编出一个听起来合理的值**；
- 模型**守住规则的字面、破坏规则的精神**。
- 这三种都不崩溃，三种都会发布出去。
- 所以你必须为一类**没有信号的失败**建防御。抓不到看不见的东西，因此 harness 工程有很大一部分其实是「making the invisible visible」：加能暴露分级漂移的检查、加能标出「结构合规但语义跑偏」的断言、在置信度低的节点上加人工介入——而这些各自又都带着自己的取舍。

## 你在 debug 散文，不是 debug 代码

![这张图片分为上下两个部分，用以体现代码调试与散文调试的差异。上半部分标注为“DEBUGGING CODE”，展示了一段代码，其中第42行的代码“total += item.price”被醒目标出，还有一个箭头指向此处，右侧明确标注出bug所在行号为line 42；下半部分标注为“DEBUGGING PROSE”，是大段模糊的散文文本，仅在其中有一个小标记，下方配有放大镜和问号，还标注了疑问“which word was it?”，该图和上下文呼应，直观展现了代码故障可精准定位到具体行，而散文故障却难以精准定位出错处的特点。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjY0MzA1NGQzMTQ5OWE2ZjA1OGRlMzg1MzIyMjk2MzRfY2NjNWNjMTYwOTY4OGY3NmExNDRjNGQyODk3OTgyZTNfSUQ6NzY3MTAwODAyMDQyMzI2NTUzMV8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜代码 bug 可定位到第 42 行，散文 bug 只剩一句这是哪个词* ｜ [原图](https://neican-res.candobear.com/article-images/8c52a22936dc7baa724fcbc4aa7d644fbfff3f75f10031a09c22b36a01db2034.jpg)

- 检测到坏输出只解决了一半问题。harness 出故障时，造成失败的那段「代码」往往是**一段英文**；唯一的调试器是你的判断力：读上千字，判断到底是什么给了模型许可去做它刚做的事。
- 残酷之处在于：**一个词就可能是那个 bug**。作者花了几个小时才把一次回归追踪到 prompt 里的一个形容词——写的时候看起来人畜无害，模型却把它读成了某种许可。
- 源码里一个字符的 bug 是老掉牙的段子，但它**可被找到**；prompt 里一个词的 bug 是**不可见**的：这个词机械上什么都没破坏，它只是把模型的行为推偏几度，而几度足够在任何人察觉之前悄悄腐蚀输出。
- 更糟的是：prompt 有确定的顺序，却**不像有显式控制流的程序那样执行**；靠前和靠后的指令会以难以隔离的方式互相影响。
- 你没法像推理一个函数那样推理它，只能像**作家推敲一个段落**那样推理它：凭感觉、读出声、问「这段话到底在叫读者做什么」，然后跑一遍、眯着眼看输出来检验自己的读法。这是一项与 debug 截然不同的技能，多数工程师从未被迫发展过。

## 加法本能是陷阱

![图片标题为“THE ADDITIVE TRAP”，展示了“加法本能”陷阱。上方“PROMPT”区域有多个规则，箭头指向表示每次失败都要求添加规则，下方“SOLUTION SPACE”区域被框住，标注“no valid output”，意为无有效输出。该图与上下文紧密相关，直观呈现了加法本能陷阱，即出了问题本能往prompt里加规则，导致解空间压缩，最终无有效输出，是作者掉进此陷阱次数最多的失败模式。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzRlYmFkMTJjMDQ0MjNiZWZlZjg2NmIwZmNhOWI1ZjRfMTc3YmY5MzI1YmY3MWQ2YTA4ZTcxZGYyMjIwMWE2OTJfSUQ6NzY3MTAwODAyMTMyNTA0MDgzNF8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜规则互相拉扯的提示词，把解空间压缩到没有合法输出* ｜ [原图](https://neican-res.candobear.com/article-images/146ae551bf47f514b84985f9f3cb6c851840b866d24cd33eb440fd7b5c86f8f9.jpg)

- 这是 harness 工程里**最可靠的失败模式**，也是作者掉进去次数最多的一个：出了问题，本能就是往 prompt 里加一条规则。模型做错了？告诉它别这么做。模型忘了约束？把约束再喊一遍。模型编造了？加一行「do not invent」。经典款还有全大写的「MAKE NO MISTAKES!」
- 每一次添加都显得负责、甚至细致——毕竟你是在回应一次真实的失败。于是 prompt 长啊长啊，一直长下去。但**prompt 变长本身是病，不是药**。
- 每加一条规则，都会收窄模型被允许产出的空间——这正是目的所在。问题在于规则是用自然语言写的，而自然语言规则与模型的交互方式**无法被完全预测**：
- 一条修好新失败的规则，会与一条修好旧失败的规则互相矛盾；
- 一条「be concise」会和一条「include all of these details」打架；
- 一条「never do X」会让模型开始想 X，于是 X 出现在它此前从未出现的输出里。
- 你不会收到冲突报错，你只会得到一个**被过度约束**的模型：它被拉扯到无法同时满足所有方向，于是安静地挑一条来违反——你用一个可见的 bug 换来了另一个更隐蔽的 bug。
- 作者亲眼看着一份 prompt 从二十行长到两百行，每一行都出于善意、都在修一个真实的失败，直到这份 prompt 重到几乎再也产不出好东西。
- **每一次解法都是减法**：删规则、合并重复、删掉那些在暗中互相打架的指令、把约束从散文里搬进代码里执行——在代码里它没法被反驳。**质量的跃升来自删除，而不是添加。**
- 但删除是当下感觉最不对的动作，因为你在「移除一道保险」，而工程训练里没有任何东西会奖励你扔掉一条曾经修好过 bug 的规则。

## 示例比规则更能改变行为

- 这是加法陷阱的推论，而且让它更糟：**模型从示例中学到的，远比从指令中学到的更有力**。
- 如果你写了一条「don't do X」的规则，却附上一个恰好做了 X 的示例，模型就会做 X。**示例赢**。你可以把规则写成全大写、可以重复、可以恳求，但示例是一次示范，而示范是比禁令更强的信号。
- 更深的教训：prompt 里的一切都是**行为程序**——指令、示例、章节的顺序、你选的词，（也许）甚至格式。prompt 里**没有中立的部分**，每个 token 都在把模型推向某处。
- 因此维护一份 prompt 不像维护一个配置文件，而像维护一个**每一行都可执行、且输出带范围**的程序。

## 地基会自己重写

![这张配图以图示直观呈现了Harness工程的难点：标注为“YOUR HARNESS”的支架，原本固定在标注“worked”的MODEL v1模型上，随着模型迭代，后续的MODEL v2产生“drift（漂移）”向左偏移，MODEL v3出现“regression（回归）”向左偏移的变化，体现出“Harness钉在旧模型上，新版本滑走带来漂移与回归”的核心问题；底部配文进一步点明内容主旨：“THE THING YOU BUILD ON REWRITES ITSELF. YOUR STABLE CONTRACT IS WITH A MOVING TARGET.”，契合文档中关于Harness工程难度的主题说明。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=M2U3YmJlYWYzODMyODk0MWMzYjgyODNiYTRlMzUyNDlfZjdlNWRjZjRmMDYwNDUyMmViZjcwZjgwN2IwZWVhNTRfSUQ6NzY3MTAwODAxODgwMDE1MTc0N18xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜harness 钉在旧模型上，新版本滑走带来漂移与回归* ｜ [原图](https://neican-res.candobear.com/article-images/2fdc31daff017baf931e168632d310050a72efd0a63cb80d94d2cef7daeaacb4.jpg)

- 大多数软件建在**静止的地基**上：语言版本偶尔升一次，框架一两年发一次破坏性变更，还附带迁移指南和废弃周期；代码与平台之间的契约在一个 sprint 的时间尺度上基本稳定。
- 模型不是稳定的地基。厂商会更新它（**有时不打招呼**），而更新会改变行为：
- 上个季度产出干净输出的 prompt，这个季度产出微妙不同的输出——不是因为你改了什么，而是**统计表面在你脚下移动了**；
- 旧模型读作硬约束的一句话，新模型读作建议；
- 旧模型稳定产出的格式，新模型偶尔缺一块；
- 你的 harness 是针对旧模型的失效模式调优的，而新模型有**不同的**失效模式——你的防御守着已经不再发生的问题，新问题却无人看守。
- 作者点名的当下例证：Opus 5 发布后，很多人反映自己此前可靠的 skills 文件突然不灵了。
- 这是 harness 工程与普通工程**根本不同**的地方：你不是建在一个平台上，你是建在一个**按别人的日程重写自己行为的概率系统**上。你写的每一份契约都是与移动靶子签的；**测试可以是绿的，产品却在退化**，因为测试断言的是旧模型的行为，而模型已经动了。
- 也没有永久有效的「锁版本」逃生舱：厂商会废弃旧版本、价格会变，最终不管你准备好没有，都会被推到新表面上。
- 实践后果是：**harness 永远不会「做完」**，它处在对一个持续移动的地基的持续适配中。你会花掉没预算的时间，去针对一个你并没选择升级的模型重新调 prompt；你会为一个不是你造成的回归发补丁。这不是计划失败，而是基底的结构性事实。诚实的应对只有三条：
- 尽量**最小化 prompt**，少依赖模型特有的怪癖；
- 建能**捕捉漂移**的校验；
- 保持谦逊——预期下一次更新会弄坏某个你此刻还叫不出名字的东西。

## 反馈回路又慢又贵

- 正常的 edit-compile-test 循环以秒计：改一行、跑测试、看结果、再改。**回路的紧凑度**正是工程可以忍受的原因——它让你不必把整个系统装在脑子里就能迭代到正确解。
- harness 的反馈回路完全不是这样：一次模型调用要花钱，也许不多，但足以让你没法像跑单元测试那样跑上一千次；如果流水线里有多次模型调用，**一次端到端测试要几分钟到几个小时**。
- 于是你迭代得更慢，脑子里要装更多状态。你不能用「一分钟试二十种变体」暴力求解，只能试三种、等、认真读输出、形成假设、再试一种。**解决问题的整个形状变了**。
- 习惯了紧回路的工程师会觉得自己在慢动作里工作，诱惑随之而来：改完 prompt 就推上去、待会儿再回来看——而这恰恰是回归被引入的方式，因为**你在停止编辑之前就停止了观察**。
- 成本还有第二层更隐蔽的效应：**它让你在验证上变懒**。每次检查都昂贵时，你就开始少检查，说服自己这个改动小到可以跳过完整运行——而它几乎从来没有那么小。「昂贵的回路训练你欠测试，而对一个概率系统欠测试，就是在发布漂移。」

## 没人看得见这份工作

- 最后一种痛苦是社会性的，也可能是最消耗人的。「Prompt engineering」这个说法让这份工作听起来微不足道：它暗示这活儿就是**写 prompt**，在没做过的人看来难度约等于写封邮件。
- 几个月的收紧、被移除的矛盾、在发布前被拦下的静默失败——全都是不可见的。**看起来你几乎什么都没做。**
- 没有干净的解法。能做的最好的事，是**刻意地让不可见变得可见**：记录你抓到的失效模式、度量你阻止的漂移、写下那些没有发布出去的回归；并且接受你创造的一部分价值，永远不会被周围的人读懂。
- 这是这份工作自带的税，值得把它说出来——这样你才不会内化那条错误的信息：以为自己没做什么。

## 难度本身就是护城河

- 作者反复回到的结论是：以上每一个痛点都是**结构性地难**。它们难，不是因为工具不成熟、也不是因为最佳实践还没摸索出来，而是因为它们来自基底的本性——一个没有堆栈跟踪、没有确定性、没有稳定契约、也不区分「程序」和「它被训练的数据」的概率系统。
- **这些事实无法被工程掉，你只能造一个吸收它们的 harness。**
- 而这，恰恰就是护城河：如果 harness 工程很容易，模型就是产品，任何有 API key 的人都能和你竞争。一个真实应用之所以难做，与它之所以难被复制，是同一个原因——把概率输出变成可发布、可靠、可测试的东西，这份工作**不可见、痛苦，且无法靠读你的 prompt 转移**。
- 「The pain is the work, and the work is the moat.」

## 概念网络

### 关键概念

### harness（行为层护栏）

**context**：文章的核心定义。作者用 harness 指代「介于一个概率式模型和产品使用者之间的 prompts、examples、schemas、validators、evals、guardrails」这一整层行为约束设施，并给出全文最凝练的分工判断：「The model generates the output. The harness is what makes that output usable.」

**费曼一下**：模型是发动机，harness 是底盘、刹车、安全带和仪表盘。发动机再强，没有这些东西你也不敢把车开上路。做 AI 产品时真正耗掉时间的，从来不是接上发动机，而是把它变成一辆能交付给别人开的车。

### 「模型即产品」的幻觉

**context**：文章开篇指出，几乎每个建在大模型上的项目都会落入同一个幻觉——接上 API、写个 prompt、第一次演示惊艳，于是感觉难的部分已经结束。作者的回应是一句独立成段的「It is not.」

**费曼一下**：demo 惊艳和产品可靠之间隔着一整个工程学科。第一次成功是概率给你的礼物，而产品要求的是同一件事在一万次不同输入下都成立——这两者的距离，就是全文要拆的那份难度。

### 非确定性（nondeterminism）

**context**：同一输入喂两次得到两个不同输出，差异可能只是几个词、一个调换顺序的从句，但「足以让严格的等值断言变成废纸」。作者说这不是小麻烦，而是「抽掉了整个质量策略的地板」。

**费曼一下**：普通程序像自动售货机，投同样的币出同样的货；模型像每次都重新讲一遍故事的人，意思大致相同，用词从不重复。你没法用「对不对得上」来验收一个每次都换说法的人。

### 结构断言与不变量断言

**context**：等值断言失效后，作者给出的两条退路——断言结构（输出能否解析、必填字段是否存在、计数是否正确）与断言不变量（是否违反被告知遵守的规则）。他明确指出两者「都比工程师习惯的更弱，都会放真正的意外输出过去」。

**费曼一下**：你没法检查一篇作文是不是逐字符正确，但可以检查它有没有标题、段落数够不够、有没有出现禁用词。这类检查有用，却挡不住一篇结构完美、内容跑偏的作文。

### 从单元测试到评估：置信度而非正确性证明

**context**：问题从「一个输出是否等于一个预期答案」变成「系统在一个输入分布上、在重复运行中是否满足一份 rubric」。作者说这更接近 evaluation 而非普通单元测试，「得到的是置信度，不是正确性的证明」。

**费曼一下**：从「考试判对错」变成「大样本抽检打分」。你不再能说「这个功能是对的」，只能说「在这批输入上它有九成把握是对的」——工程的验收语言从布尔值换成了概率。

### 静默的分级失败

**context**：与普通软件「失败会自己喊疼」相对，作者指出模型输出不会崩：95% 正确、5% 崩坏的响应「看上去完全没问题」，错的部分用同样的散文、同样的格式、同样的自信织进对的部分里，而且模型没有一条可靠的「我不确定」通道。

**费曼一下**：程序出错像玻璃碎了，声音很大；模型出错像牛奶里掺了水，看起来喝起来都还行。没有报警声的失败最贵，因为它会一路走到用户面前。

### 差一点就通过的输出

**context**：作者判定「最危险的输出恰恰是那些差一点就通过的」，并列出三种典型：因后文指令间接矛盾而偏离约束、在该承认不知道时编出一个听起来合理的值、守住规则字面却破坏规则精神。「None of these crash. All of them ship.」

**费曼一下**：明显错的东西会被门口的保安拦下；穿得体面、证件齐全但心怀不轨的才会混进去。质检真正要防的，不是离谱，而是「像样」。

### 让不可见变得可见

**context**：面对没有信号的失败，作者把 harness 工程的很大一部分定义为「making the invisible visible」——加能暴露分级漂移的检查、加能标出「结构合规但语义跑偏」的断言、在置信度低的节点加人工介入。文末谈社会性痛苦时，他把同一个动作用回自己身上：刻意记录抓到的失效模式与阻止的漂移。

**费曼一下**：既然系统不会自己报警，你就得亲手给它装警报器；而既然你的劳动别人看不见，你也得亲手给这份劳动装一块仪表盘。同一招，一次对系统，一次对人。

### 调试散文：一个词就是 bug

**context**：harness 出故障时，造成失败的「代码」往往是一段英文，唯一的调试器是你的判断力。作者用几个小时把一次回归追踪到 prompt 里的一个形容词，并对比：源码里一个字符的 bug 可被找到，prompt 里一个词的 bug 是不可见的——它只把行为推偏几度，而几度足够悄悄腐蚀输出。

**费曼一下**：代码 bug 有地址，散文 bug 只有语气。改一个形容词就像改一句话的口气，机器不报错，但对方对你的态度已经变了——而这个「态度」正是产品的行为。

### 加法本能陷阱与过度约束

**context**：文章称之为 harness 工程里最可靠的失败模式：一出问题就往 prompt 里加规则，「MAKE NO MISTAKES!」式的加法看起来负责，结果是 prompt 从二十行长到两百行。规则之间会互相矛盾（「be concise」对上「include all of these details」，「never do X」反而把 X 唤出来），最终模型被拉扯到无法同时满足所有约束，只好安静地挑一条违反。

**费曼一下**：往一间已经很挤的房间里继续塞家具，每件都有正当理由，最后连走路都成了问题。规则不是叠加的保险，而是互相挤占空间的住户。

### 减法带来质量跃迁

**context**：作者给出的唯一有效解法：删规则、合并重复、删掉暗中互相打架的指令、把约束从散文搬进代码——在代码里它没法被反驳。「质量的跃升来自删除，而不是添加。」他同时点出为什么这很难：删除意味着「移除一道保险」，而工程训练不奖励扔掉一条曾修好过 bug 的规则。

**费曼一下**：好的 prompt 更像被反复删改的短文，不像不断追加条款的合同。真正的进步往往发生在你敢删掉自己写过的东西的那一刻。

### 示例强于规则

**context**：加法陷阱的推论。写了「don't do X」却附上一个恰好做了 X 的示例，模型就会做 X——「示例赢」。你可以大写、重复、恳求，但示范是比禁令更强的信号。

**费曼一下**：教小孩别看手机，自己却在饭桌上刷手机，孩子学的是你做的那件事。模型也一样：它看你怎么做，不只听你怎么说。

### 提示词即行为程序

**context**：作者由示例强于规则推出更深的结论——prompt 里的一切都是行为程序：指令、示例、章节顺序、用词，甚至格式。prompt 里没有中立的部分，每个 token 都在把模型推向某处；维护它不像维护配置文件，而像维护一个每行都可执行、输出带范围的程序。

**费曼一下**：你以为自己在填表格，其实每一格都是一行会被执行的代码。连你排版的顺序都在参与运算，所以「随手加一句」这种动作在这里并不存在。

### 会自己重写的地基

**context**：与静止的语言版本、有迁移指南的框架相对，模型是「按别人的日程重写自己行为的概率系统」。厂商有时不打招呼就更新，旧模型读作硬约束的句子新模型读作建议，你的防御守着已不再发生的问题。作者以 Opus 5 发布后很多人可靠的 skills 文件突然失灵为当下例证，并指出没有永久有效的「锁版本」逃生舱。

**费曼一下**：别人家的房子建在地面上，你的房子建在一块会自己漂移的板块上。你不是在盖楼，你是在持续地扶楼；harness 永远没有「完工」这一天。

### 测试是绿的，产品却在退化

**context**：作者用来描述地基漂移后果的关键句式——因为测试断言的是旧模型的行为，而模型已经动了，所以绿色的测试与真实的回归可以同时成立。他给出的应对是三条：最小化 prompt、建能捕捉漂移的校验、保持「预期下次更新会弄坏某个你还叫不出名字的东西」的谦逊。

**费曼一下**：仪表盘显示一切正常，只是因为它测的是去年的那辆车。当参照系本身在动，通过测试就不再等于没有问题。

### 昂贵的反馈回路与欠测试

**context**：一次模型调用要花钱，多次调用的流水线跑一次端到端要几分钟到几小时，于是你只能试三种变体而不是二十种。作者点出两层后果：改完就推、待会儿再看，是「在停止编辑之前就停止了观察」；以及成本让你在验证上变懒——「昂贵的回路训练你欠测试，而对一个概率系统欠测试，就是在发布漂移。」

**费曼一下**：体检便宜时你每年查一次，体检贵到离谱时你会开始安慰自己「今年应该没事」。检查成本决定了检查频率，而频率决定了你什么时候才知道自己病了。

### 不可见的劳动

**context**：文章唯一的社会性痛点。「Prompt engineering」这个说法让工作听起来像写邮件，而几个月的收紧、被移除的矛盾、在发布前拦下的静默失败全都不可见——「看起来你几乎什么都没做。」作者说这是工作自带的税，值得说出来，免得你内化「自己没做什么」这条错误信息。

**费曼一下**：没发生的事故没有新闻。守夜人的价值恰恰体现在什么都没发生，而这份价值天然不上镜——所以要自己记账。

### 难度即护城河

**context**：全文收束。所有痛点都是结构性地难，源自基底本性而非工具不成熟；这些事实无法被工程掉，只能被一个 harness 吸收。而这正是护城河：如果 harness 工程很容易，模型就是产品，任何有 API key 的人都能竞争；真实应用之所以难做与难被复制，是同一个原因。「The pain is the work, and the work is the moat.」

**费曼一下**：门槛就是资产。让你半夜睡不着的那部分工作，正是别人拿到你的 prompt 也复制不走的那部分——因为可复制的是文本，不可复制的是你为它踩过的所有坑。

### 概念网络

![图片为全文的思想网络图，由概率式基底派生出四个方向。基底因非确定性、昂贵的反馈回路、静默的分级失败、会自己重写的地基，分别引发从单元测试到评估、加法本能陷阱、加法本能陷阱、减法带来质量跃迁。还涉及模型即产品的幻觉、harness行为层护栏、难度护城河、不可见的劳动、调试散文、让不可见变得可见等概念，体现了工程的复杂性。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTc2N2QwODhmZDY2NDIwMGU2NDUyNTNjMDgzYjBhODhfYWM5NzExZDQ0MzhhZjUwNmY1NWJkNWUxNjFiZDA2ZTJfSUQ6NzY3MTAwODAyMTU4MDg5MzM4NF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



全文的思想网络有一个单一源头：**概率式基底**。文章所有的痛苦都不是并列的经验条目，而是从「你在一个没有堆栈跟踪、没有确定性、没有稳定契约、也不区分程序与训练数据的系统上做工程」这一件事上派生出来的四个方向。

**第一层：从基底到四种失效。** 概率式基底直接导出四个后果——非确定性（同一输入不同输出）、静默的分级失败（错误织进看似干净的输出）、会自己重写的地基（厂商按自己的日程改变行为）、昂贵的反馈回路（一次运行要钱要时间）。这四者互不重叠，共同定义了 harness 工程与普通软件工程的边界。

**第二层：每种失效逼出一种应对。** 非确定性逼死等值断言，于是测试演化成评估，验收语言从「正确性证明」降级为「置信度」；静默失败没有信号，于是必须刻意造信号，这就是「让不可见变得可见」；地基漂移让所有模型特有的调优都变成负债，于是它反过来要求最小化 prompt，与减法主张合流。这三条应对共同构成了 harness 的实质内容——它不是模型的附属品，而是把模型输出变得可用的那一层。

**第三层：一组内在张力。** 网络里最有教益的关系不是支撑，而是拉扯。**加法本能与减法解法直接对立**：出了失败就加规则是最自然的动作，而唯一有效的动作是删规则；工程直觉在这里是反的。**昂贵的反馈回路与评估式验收互相冲突**：评估要求在输入分布上重复运行，而每次运行都在花钱和花时间，成本压力又把你训练成欠测试的人——想做对的方法与做得起的方法在互相抵消。**提示词即行为程序**是这组张力的底层解释：既然没有中立的 token，示例就必然比禁令更强，而这直接放大了加法陷阱（你加规则的同时，示例还在反着教）；也正因为 prompt 的每一行都在执行，调试它才只能靠读散文而不是读堆栈。

**第四层：不可见性的两次出现。** 「看不见」在文章里出现了两次，而且是同构的：一次是系统层面——失败没有信号；一次是社会层面——劳动没有痕迹。作者给出的解法也是同一个动作：刻意地让不可见变得可见（给系统装警报器，给自己记账）。调试散文之所以格外消耗人，正是因为它同时占据这两种不可见——几个小时追一个形容词，既没有报错，也没有产出物可展示。

**收口：难度转化为价值。** 网络的两条主线在终点汇合。一条是工程线：harness 由评估、可见性和减法构成，它吸收了基底带来的全部不确定性；另一条是社会线：这份劳动天然不可见、不可通过读 prompt 转移。两条线共同支撑了最后的判断——难度不是待解决的临时问题，而是护城河本身。文章由此完成了一次反转：开篇的「模型是产品」被证伪，结尾给出的替换命题是，harness 才是产品，也才是别人拿不走的东西。

## 费曼 x3

把大模型接进产品的那一刻，几乎所有人都会短暂地相信同一件事：模型就是产品。API 通了，prompt 写了，第一次演示效果惊人，难的部分好像已经过去。真正的工作恰恰从这里开始，而且它不长得像工作——介于概率输出和使用者之间的那一层，才决定这东西能不能交付给别人用。

它难，难在你所有的工程反射都是为「有信号的系统」训练出来的。传统软件里失败会喊疼：异常、堆栈、红色日志。模型不会。一个 95% 正确、5% 崩坏的输出看上去完全正常，错的那部分用同样的语气、同样的格式、同样的自信，织在对的那部分里。所以最危险的从来不是离谱的输出，而是那些差一点就通过的——粗暴的错误会被拦下，微妙的错误一路抵达用户。等值断言在这里是废纸，你只能退到结构和不变量上，拿到的是置信度，不是正确性的证明。护栏工程有一大半的实质，其实是给没有信号的失败亲手造出信号来。

最反直觉的一条是：出了问题不要加规则。加法是最自然的动作，每一条新规则都在回应一次真实的失败，都显得负责。但规则是自然语言写的，它们会以你无法预测的方式互相打架——「简洁」和「包含全部细节」互斥，「绝不要做 X」反而让 X 出现在它从未出现过的地方。你不会收到冲突报错，只会得到一个被过度约束的模型，它安静地挑一条来违反。每一次质量跃升都来自删除：合并重复、拿掉互斥的指令、把约束从散文搬进代码里，让它没法被反驳。而且示例比禁令更强——你写了「不要做 X」却附上一个做了 X 的例子，模型就会做 X。prompt 里没有中立的部分，每个 token 都在推它。

更麻烦的是，你签的每一份契约都是和移动靶子签的。厂商更新模型，有时不打招呼，上个季度干净的输出这个季度就微妙地变了。测试可以是绿的，产品却在退化，因为测试断言的是旧模型的行为。加上一次跑要花钱、端到端要几分钟到几小时，昂贵的回路会把你训练成一个懒得验证的人——而对概率系统少测一次，就是在发布一次漂移。

这些难都不是工具不成熟造成的，你消除不掉，只能造一个能吸收它们的东西。这也正是它值钱的地方：如果这活儿容易，模型就是产品，任何有 API key 的人都能复制你。痛苦本身就是这份工作，而这份工作就是护城河。

HOWIE 原清单 · 23

# 为什么「软件工厂」会失败：光有 harness 工程还不够

**内容说明：**深入讨论编码 agent 的上下文工程为何撑不起可靠的「软件工厂」，直指工程化落地的真实瓶颈。

**策展人按：**另一盆冷水，而且更狠。清单敢把一篇拆自己台的文章放进来，说明这场官司还没打完。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：Why Software Factories Fail (or: harness engineering is not enough)
- 作者：GitHub
- 内参日期：2026-07-25
- 来源类型：blog
- 原文：https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md
- 标签：agent skills

深入讨论编码 agent 的上下文工程为何撑不起可靠的「软件工厂」，直指工程化落地的真实瓶颈。

## 导读

软件工程

## 核心观点

作者 Dex（HumanLayer 创始人）的论点很直接：无论堆多少 harness 工程——编排、沙盒、更多 linter、"adversarial review" 机器人——都解决不了一个**模型训练层面**的问题：今天的编码模型在 RL 训练里几乎只被 FAIL_TO_PASS/PASS_TO_PASS 这类二元通过/不通过信号打分，代码可维护性（maintainability）在这套打分体系里没有任何惩罚项。于是"lights-off 软件工厂"——不再有人读代码、写代码——注定会失败：模型能通过测试，却在持续侵蚀代码库的架构质量，而这种侵蚀要几周、几个月甚至几年后才会现出代价，RL 又缺一个又快又可靠的"质量预言机"来实时纠正它。作者给出的应对不是放弃 agent，而是把人重新放回循环：用产品评审、系统架构、程序设计、垂直切片四个前置阶段做"先对齐、后动手"，把原本发生在代码评审时的返工提前消化掉，用可持续的 2-3 倍速度换掉赌上代码库的 10-100 倍速度。

## 叙事起点：我们都在被劝"多写循环"

- 大家都在冲刺把 AI coding 送进生产环境，"loop engineering" 的主流看法是应该多写循环（loops）。
- factory.strongdm.ai 是 StrongDM 的"lights-off 软件工厂"——没有人读代码，也没有人写代码。它背后的叙事是：
- 你（人）才是瓶颈；
- 模型已经足够好；
- 代码是免费的；
- 那就多产出点东西。
- OpenAI 的 Ryan Lopopolo 在 2 月写了篇 harness engineering 文章，4 月又做了一场关于 OpenAI 软件工厂 Symphony 的演讲。
- 作者对这些人评价很高（"really dang smart"），但也点破最刻薄的解读：这不过是又一个把更多 VC 的钱泵进"slop 大炮"（slop cannon）的借口。

## 警报已经在响

- Mario（即 badlogicgames）在 AI Engineer Europe 上恳求大家慢下来——因为一些本不该因编码 agent 出岔子而宕机的公司，正在因编码 agent 出岔子而宕机（金融时报报道过相关事故）。
- Matt Pocock 的说法：代码库正在以前所未有的速度"散架"。
- StrongDM 自家的 weather-report 页面在 2 月到 6 月之间只有寥寥几次更新，作者没能挖到任何关于这场"灯灭实验"结果的确凿数据。
- Faros AI 的报告指出：自今年 1、2 月大家普遍用上 AI coding 工具以来，PR 评审质量明显下滑——评论更多更长，大量 PR 完全没经评审就合并，事故数上升，人均 bug 数上升。作者提醒这份报告更多是相关性信号而非确凿证据，但"从我看到的情况说，方向感觉是对的"。

## "你只是没用对"——但其实不是

- 常见说法：如果效果不好，那是你的技能问题；只要再多花点 token、把"读代码"这件事放下就好——作者坦言自己去年夏天也是这么想的。
- 作者的背书：他早年一段关于"怎么用好 agent"的发言在 YouTube 上有上百万播放量，也写过《Advanced Context Engineering for Coding Agents》《No Vibes Allowed》《Everything We Got Wrong About RPI》等长文/演讲，长期钻研如何用好编码 agent。
- 这套"多冲 token"话术许诺的终点是：10-100 倍速度、高质量，外加"再也不用做人人都讨厌的代码评审"——只要配置更多 linter、往 PR 评审机器人里撒一点"adversarial review"之类的魔法词。

## 这不是技能问题（全文的转折）

- 作者要论证的是：无论多少 harness 工程或"loopsmaxxing"，都解决不了一个本质上是**模型训练**层面的问题。
- 为了讲清楚这一点，他深入研究了编码模型是如何被训练和评测的——既涉及 RLVR（Reinforcement Learning with Verifiable Rewards），也涉及各类基准测试。
- 接下来全文要讲三件事：软件工厂从 1968 年至今怎么演化、模型为什么能在"跑分"上过关却仍能制造成堆的 slop、以及即便如此，你依然可以在不烧毁代码库的前提下跑得相当快。

## 软件工厂简史：从 1968 到 2022 基线

- "软件工厂"这个词能追溯到 1968 年的 NATO 会议——正是那次会议贡献了"software engineering"这个说法；美国国防部后来还专门写过一份 31 页 PDF，讲 DoD 该怎么更好地用 Jenkins。
- 以 2022 年（AI 之前）为基线的典型软件工厂长这样：人决定做什么 → 进 tracker（Linear/Jira）→ 有人认领并实现（顺带做测试）→ PR（自动检查+人工评审）→ 有问题就打回去 → 上线 → 上监控 → 用户抱怨/提需求 → 回到 tracker。这条链路里 AI 还没登场，循环已经一堆。
- 团队几十年前就悟出的道理：build 和 review 都要花几小时到几天，所以要把工作**前置**——一起做规划、架构提案、迭代计划——这样能减少返工，也能让评审在"已经很接近完美"的 PR 面前变得飞快。这就是"front-loading alignment"，也是文章后半段整套四阶段流程的思想源头。

## agentic 软件工厂：瓶颈从"建造"转移到"评审"

- Ramp、Stripe、WorkOS、Brex 等公司今年都花了大半年时间对外讲述自己怎么造出了一套能产出约 75% 代码的 agent 工厂。
- agentic 版本本质是把"有人建造"换成"agent 建造"（配上编排、harness、沙盒、模型、computer use 等）。
- 后果：建造时间从几小时/几天降到几分钟/几小时，但评审依然要几小时到几天——因为还是要有人读代码、测变更，评审变成了新瓶颈。
- 应对方式是把评审也加速：agentic code review 抓风格/bug/安全，agentic 回归测试用浏览器和 computer use 从外部戳它、完事甚至发个小视频。评审快了，但很可能仍是瓶颈——于是继续加循环：把线上事故也路由进工厂（不再是半夜呼人，而是醒来发现 PR 可能已经把它修了），把用户反馈也路由进来。最后问题简化成两个：队列里能塞多少、评审和测试跟不跟得上。这就通向了"灯灭软件工厂"。

## 灯灭软件工厂：把代码评审这一步也去掉

- Dan Shapiro 创造了"lights-off software factory"这个说法，Simon Willison 写过 StrongDM 这套实现——不再有人读代码。
- 逻辑是：那个"人读每一行改动"的步骤太烦人，干脆去掉，把精力挪到别处：投入测试（让 agent 自己测自己的活）、投入沙盒和编排、投入自动化评审、投入监控、投入发布、投入收集用户反馈信号。
- 于是问题变成一句话：我们想让 agent 建造多少东西？想"烧多大一片海"（boil the ocean）？

## HumanLayer 亲历：灯灭工厂是怎么翻车的

- 2025 年 7 月，作者团队真的全面转向灯灭模式：只读 spec 和 ticket，中小任务全交给后台 agent。
- 结局是典型的：总会撞上至少一个 agent 解决不了的棘手问题——即便用上最高级的 prompt 和工作流也不行；做了带上下文的深度研究，让 agent 用十种不同方式复现，最后还是得硬着头皮回去啃那个已经三个月没读过的代码库，搞清楚到底哪里坏了。
- 与此同时：网站宕机、用户不满，作者本人形容自己"很惨——读着自己放任溜进系统的一堆 slop 代码"。
- 第一次出事，他选择咬牙挺过去（"下行风险配得上速度收益"）；但到了 11 月前后第三次撞上同类问题时，团队决定干脆推倒重写——他的联合创始人花了整整两周，在 VS Code（甚至不是 Cursor）里手工把所有模式重新梳理了一遍。

## 模型的短板：守不住代码库质量

- 作者把问题定位为：模型有一个明确短板——没有相当程度的人工引导，它们没法长期维护并提升代码库质量。
- 他说的"可维护性"，specifically 是指"改一处却容易牵连别处"变得异常困难——这正是 Martin Fowler 说的"shotgun surgery"（霰弹式手术）。想深入这块可以去读 John Ousterhout 的《A Philosophy of Software Design》、Robert C. Martin 的《Clean Code》、Martin Fowler 的《Refactoring》。
- "那模型不是应该比 7 月更强了吗？"——作者的回答是：在某些方面确实强很多（解决单点问题、随手 vibe-code 一个营销站），但在"长期维护代码库质量"这件事上，进步不大，至少他看不出来。他也坦承自己和读者都拿不出证据，因为**根本没有衡量模型维护代码库质量能力的靠谱基准**。当然，你可以让顶级模型做出漂亮的重构——但前提是你得先告诉它要重构，而要能告诉它，你自己得先懂这个代码库懂到知道"这里需要重构"——这正是"灯灭"模式行不通的地方：没人在看，就没人知道该让模型去修哪里。

## Claude Code 为什么赢：把 RL 做进了 harness 里面

- Claude Code 在不到一年内，据作者说营收从零冲到大约 40 亿美元、现在被形容为逼近 90 亿美元——这有点奇怪，因为当时已经有 aider、cline、codebuff 这些不错的 CLI agent，上下文工程做得也不差，工具集（读、写、编辑、grep、bash）也大同小异。作者自己用过，体验是"工具调用时不时就是会失败"——盯着它对同一处修改扑腾三次，最后还是自己打开编辑器动手。
- SWE-Agent 那篇 2024 年的论文早就指出：工具形态的微小变化会带来明显差异，比如在 ReadFile 结果里加行号，或者把 Edit 工具从查找替换换成按行区间编辑。
- 但 Claude Code 一上线就直线起飞。可以把这归因于渠道，但公认的解释是：Claude Code 更好，而它更好是因为 Anthropic 把模型训练直接放进了 harness 里——第一次有实验室拿着自己即将发布的那套工具去 RL 训练模型，让模型在 agentic 循环里变得异常擅长调用这些工具。
- 光是打磨工具定义和评测、找到模型最喜欢的形状就已经很耗时；但当你真正拥有权重、能够改模型本身去适配一套工具时，是完全不同的量级。OpenAI 团队 11 月的一场演讲说得很到位：如果你搭了个 harness，却不掌握权重、无法在 harness 内部做 RL，你永远会输给同时拥有两者的团队。

## 编码 agent 的 RL 训练：60 秒版

- 训练循环三步：生成一批编码 agent 的 trace 去解决某个问题（比如"修好我的测试"）→ 用某种打分标准（verifier）给 trace 打分 → 更新模型权重，让"好" trace 更可能出现、"坏" trace 更不可能出现——这个循环要跑上百万次，持续数周到数月。
- Calvin French-Owen（Segment 创始人、Codex 团队 MTS）在 AI Council 上的一次讲解，给了作者制作这套解释动画的灵感。
- 问题出在"打分"这一步，经常出人意料地单薄、单维度。

## SWE-bench 案例：过了测试，不代表代码没变差

- 以 SWE-bench Multilingual 为例：任务规模都不大（平均约 15 分钟的工作量），从 Redis、jq、Django 等开源仓库里扒出来；打分是 0/1 二元的，依据是 FAIL_TO_PASS（是否修好了要求修的问题）和 PASS_TO_PASS（是否没搞坏别的东西）。
- 作者用一个真实案例 fastlane\_\_fastlane-19304（Ruby 项目 fastlane）具体演示：它的 zip action 拿到两个可选参数就直接调 .empty?，一旦调用方没传 include/exclude 就报错 undefined method 'empty?' for nil:NilClass。人类修复只有两行——把两个参数在为 nil 时兜底成空数组。
- 评测流程：模型从"修复落地前一刻"的 base commit 出发，只看到 bug 报告，看不到那份"金标准补丁"或作为评分依据的 test patch；它写出的补丁会被保留，但它对测试文件做的任何改动会被整体丢弃（用来防止模型偷偷注释掉失败测试或塞一个让测试形同虚设的 mock）；随后把基准自带的 test patch 盖上去，跑整套测试（已有的 PASS_TO_PASS 加新增的 FAIL_TO_PASS），看是否全过。
- 关键结论：模型是**怎么**得到正确答案完全不重要。只要测试通过就算赢——但这套打分对"侵蚀代码库可维护性"没有任何惩罚。这正是满地 try/catch 包裹一切、还有那些架空类型系统本身意义的偷懒类型转换的来源。

## 验证代码质量，比"测试过没过"难上好几个数量级

- 跑测试几秒钟就能拿到明确的过/不过结果，这正是 RL 能在训练一代模型时跑上百万次循环的原因。
- 但"架构差"这种代价，是以周、月甚至年为单位计量的——直到有一天，有人为了改一行代码打开某个文件，才发现根本没法一行改完，因为之前有人"vibe 得有点用力过猛"，现在同一处改动得在十一个地方各改一遍，还得祈祷别的地方不会因此悄悄崩掉。
- "设计差"是今天的基准测不出来的东西。作者承认 RL 不等于 Benchmark，但如果这问题在 RL 里被解决了，理应也会开始体现在基准的设计方式上——他个人不相信当前基准上的任何进步能说明模型突然不再往你的代码库里"倒垃圾"了。

## 前沿在缓慢变好，但一个模型判官不足以撑起一切

- 作者认可确实有聪明人在攻克这个问题，他的判断不是"做不到"，而是"炒作正在跑赢真正的工程投入"（the hype is outrunning the discipline）。
- 三个他认为方向对的努力：
- SWE-Marathon（Abundant AI）：约 400 小时量级的任务（比如"把整个 Excel 每个功能都克隆一遍"），用一条复合奖励通道取代单一 pass/fail；
- DeepSWE（Datacurve）：基于那些"现实中从未真正被构建过"的开源仓库出大任务——靠构造方式天然避免了训练集污染，但没解决质量问题本身；
- Frontier Code（Cognition）：多 PR 任务，加了一手聪明的确定性质量评估——如果模型写的测试在打补丁之前的代码上不会失败，就要受罚（这正是 mutation testing 的核心思路），另外还会跑一个判官模型去检查 diff 是否符合代码质量规则。作者顺带提到一个类比：早年在 Sprout Social 时，老板喜欢玩一个游戏——看你能从一个 Python 大单体里删掉多少行代码，同时不让成千上万个单元测试挂掉，能删掉一大截还全绿，恰恰说明测试套件很多地方形同虚设。
- 但"用模型去评判质量"终究有天花板：如果一个模型真能可靠分辨代码好坏，它很可能一开始就直接写出了那个好版本。RL 需要一个又快又可靠的"预言机"（oracle），而可维护性目前还没有这样一个预言机。
- 更多评审 agent、更多 token 确实有用——它们能把地板抬高，抓住那些明显愚蠢的错误；但它们撑不高天花板，因为天花板取决于 RL 阶段到底教会了模型什么，而"好设计"恰恰是我们还不知道怎么教的东西。所以作者说自己还不敢把代码库押注在这些新基准上，但它们至少是他见过的第一批"认真尝试给可维护性打分，而不只是停在 pass/fail"的评测。

## 把代码评审请回来：四个前置阶段

- 既然模型评判不了，"裁判"暂时还得是人——于是把代码评审请回来，同时延续 AI 之前就有的老办法：提前做一点点规划，降低陷入一场漫长痛苦评审的概率。作者把这套"找杠杆"的方法拆成四个阶段：产品需求、系统架构、程序设计、垂直切片。
- **产品评审**：一切从一份简短文档开始，钉死"做什么"和"为什么"——目标是能把两句话或一段语音碎碎念，变成半结构化的东西。先对齐**要解决的问题**（用用户自己的语言讲清用户痛点），再对齐**成功的样子**（上线后看什么指标能判断这事值得做）——理想情况是"能更快完成 XYZ 工作流"这类用户结果，有时是错误率、延迟这类更底层的数字，有时干脆就是"关于 X 的支持工单不再出现了"。作者会刻意把讨论拉回产品层面，一旦自己开始往技术细节里飘，就先记下来留给后面阶段；如果技术决策卡住了产品决策，就先把已有的东西定下来，再进架构阶段或做一点可行性方面的原型研究。这一步很依赖"不描述、而是做出来"——一个粗糙的 HTML mockup，三段文字都摆不平的争论，一眼就能定。他们的做法是"作者自选评审人"：想省评审时间，就自己挑出会来评审这个 PR 的人，提前和 ta 过一遍产品/技术 spec（可以走异步文档评论，也可以用 GitHub/Notion 之类工具）。当然不是所有改动都要走产品评审——文案微调、一次性脚本、复现路径明确的 bug，还是直接一步到位丢给 agent；这一阶段是为那些"agent 误解意图代价很高"的改动准备的。
- **系统架构**：产品评审定了之后，对齐服务、接口、schema、队列、存储之间怎么互通——但不深入到程序设计层面的细节。这个阶段会大量使用可视化来提升人和 agent 之间的沟通带宽，比如一张时序图（如 UI → API → ResourceService → Store 的创建流程）、接口/契约形状（如 PUT /api/resources/:slug 的请求响应结构）、数据模型和表结构变化。mermaid 在这里够用，但有时会显得多余，甚至会营造一种"我们已经对齐了"的假象；架构层面杠杆很高，能提前挡掉不少模型的坏习惯，但单靠它还不足以产出高质量代码——那需要下一步的**程序设计**。
- **程序设计**：作者认为这是 agentic coding 里"被严重低估"的一步。多数人以为架构定了模型就能直接开写，你确实可以这么做，但结果未必是你想要的。真正有效的是：在人或 agent 写实现代码之前，从架构再往下一层，进入"代码的形状"——类型、方法签名、程序布局、调用栈。他们团队最早版本的"程序设计 skill"很难读、很累人；试过 mermaid，也有它的用处，但真正好用的是伪代码式的轻量可视化：**调用栈树**（涉及编排或控制流变化时用，变化部分可以用 diff 语法标出，如新增 handleCreateResource 调用链、删掉 legacyCreateFlow）；**文件树 diff**，让你随时清楚代码库布局和文件去向，比如新增 resource-client.ts、resource-client.test.ts，修改 resource-route.ts；以及关键新函数的**类型和方法签名**（比如 Item、Cursor 两个 interface，加上 resolveTarget(items, cursor) -> ItemId | null 这样的签名）——这些是"太内部、架构文档懒得写，但 agent 很可能还是会写错"的东西。Dillon Mulroy 的说法印证了这点：他的"计划"很大程度上就是伪代码式的类型/接口定义、它们怎么组合、边界在哪，最近还开始加入调用栈，对他自己和 agent 实现时都很有帮助。这些东西都做不了多久（模型起草，人和它争论几句），但每一个都是原本会在代码评审时才隐性做出的决定——而代码评审，恰恰是改主意成本最高的时间点。
- **垂直切片**：也叫"tracer bullets"。模型天生偏爱"横向计划"——按数据库迁移 → 服务层 → API → 前端这种技术分层顺序推进，但这样做到一半根本没法真正"摸到"东西。AI 之前，写代码很少有人能不做任何检查就写出 2000 行甚至 500 行——作者回忆自己 AI 之前的习惯是从中间开始、向外扩展：先建 API 契约、喂 mock 数据、用 curl 测；再建前端消费 mock 数据、在浏览器里迭代打磨；再把 API 接到服务层（服务层先继续吐 mock 数据/行为）；再加数据库迁移、把服务层接上数据库；再补业务逻辑；最后补错误处理——每一步都在测试、迭代、打磨。如果他很在意某块代码，或不太信任模型在这块代码库里的能力，会在每一步都做评审——每次检查 100-200 行、随时重新引导，成本比等到 2000+ 行之后再回头低得多。多数前沿模型如果没有人工引导，不会自己规划出这种切片式路线，而且这事很难按代码库或任务泛化，所以作者更愿意全程在场——他说得很直白：如果"思考"这件事真能外包出去，他早就外包了。
- 四个阶段合起来就是：30 分钟的规划，换来几小时评审时间的节省。当然不是每次都走全套流程——作者估算大致分布是：约 40% 的任务直接一次成型或配 1-2 轮轻量反馈；中等任务把产品/系统设计合并成一份文档，不细分阶段；大任务才走全部四步（遇到大型重构之类，甚至会跳过产品这一步）。多数情况下，他会一次只放 1-3 个切片出去，边走边评审——比等到 2000+ 行代码摆在眼前、完全摸不清哪里坏了，更容易早期重新引导。

![图片展示了程序设计阶段的调用栈树实例，分为生产与测试两条依赖链路。生产链路从HTTP处理器逐层缩进到存储执行器，依次经过LinkCatalog、LinkCatalog.layerDurableObject等环节，最终到达PublicRedirectIndexService。测试链路同样从HTTP处理器开始，但LinkCatalog之后的环节为linkCatalogMemoryLayer、LinkCatalog.layer等，最后也是到达PublicRedirectIndexService.layerMemory。该图与上下文紧密相关，直观呈现了文档中提到的调用栈树实例。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OTgwNTk0MTBhM2UxYTdiZTJkMGI2NzE3YWZjOWM3NTFfOGFkYTk2MWFlMDBmMDJmNjUzM2Q2ZjFhYzQ2NDVhZjZfSUQ6NzY3MTAwODAxODY2NTkwMTI5OF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜程序设计阶段的调用栈树实例：从 HTTP 处理器逐层缩进到存储执行器，并列出生产与测试两条依赖链路* ｜ [原图](https://neican-res.candobear.com/article-images/347a9dc7ed2dfd251417e5058b21132e8c6d9061eee496c7fd5138e5fcfc8a30.jpg)

## PR 太多不是问题，烂 PR 太多才是

- 你不是 PR 太多，是**烂** PR 太多——AI 之前大家也一直在评审需要返工的 PR。
- 一份好 PR 是种享受：逐文件看下去，代码干净，处处遵循团队已经讨论、争取来的共识。反过来，如果一份 PR 哪怕只需要 20% 的返工（作者认为这已经算乐观估计，多数 AI 一次成型的 PR 更接近 50%），对提交者和评审者都是**智力负担**和**情绪负担**的双重打击——哪怕提交者是个 AI，也总有人发起了这个任务、或者 vibe 润色过它的结果、或者至少在乎这件事的结果。

## 2026 版"约束理论"

- 全文的结论容易让人有点丧："目前为止，我们还是得读代码"。作者也曾期待一个可以只管提需求、放手让模型去做、不用读代码、软件自己演化又不会烂掉的世界。
- 但他真正铺陈出来的，只是一系列**约束**：模型在某些事情上很强，某些事情上不然——在这些约束下，你该怎么优化自己的流程？
- 你完全可能一边拼命想冲到 10-100 倍速度、一边说服自己代码质量已经不重要了；也可能选择拥抱这些约束，安全地跑出 2-3 倍速度。
- 收尾建议很朴素：把约束摸熟（靠大量和模型一起工作培养直觉）、在这些约束划出的场地里优化系统、主动找杠杆、然后——读那该死的代码（read the dang code）。

## 概念网络

### 关键概念

### 软件工厂（Software Factory）

**context**：文章用"软件工厂"贯穿全文的分析框架。术语可追溯到 1968 年 NATO 会议（与"software engineering"同源）；作者把 2022 年（AI 之前）的形态定义为基线：人决定做什么 → 进 tracker → 有人建造 → PR 评审 → 上线 → 监控 → 用户反馈回到 tracker 的完整反馈环。

**费曼一下**：把开发一款软件想象成一条工厂流水线——想法进料，经过设计、制造、质检、发货、返修几道工序，循环往复。这个比喻本身没有对错，关键是"AI 进场后，流水线上哪道工序被替换、哪道工序被直接砍掉"。

### Harness Engineering（harness 工程）

**context**：全文标题的另一半（"harness engineering is not enough"）。指围绕模型搭建的编排、沙盒、工具调用、review 机器人等工程设施；OpenAI 的 Ryan Lopopolo 在 2 月的文章和 4 月关于 Symphony 的演讲是这个概念的代表性阐述对象。

**费曼一下**：模型是发动机，harness 就是围着发动机造的整台车——变速箱、方向盘、仪表盘。这篇文章说的是：车造得再好，如果发动机本身没被训练成"知道怎么把车开稳"，光靠造车技术是补不回来的。

### Lights-off 软件工厂

**context**：Dan Shapiro 命名、StrongDM 用 factory.strongdm.ai 实践的极端形态——连代码评审这一步也去掉，不再有人读代码。作者团队 2025 年 7 月亲自试过这个模式，最终因反复撞上 agent 解决不了的问题而放弃。

**费曼一下**：如果说 agentic 工厂是"关掉建造车间的灯，让机器人自己造"，lights-off 工厂就是连质检车间的灯也一起关掉——没人再检查任何一件出厂的产品。

### 前置对齐（front-loading alignment）

**context**：作者追溯到 AI 之前团队就懂的道理——建造和评审都要花大量时间，所以把规划、架构提案提前到动手之前一起做，以减少返工、加快评审。这是后文四阶段流程（产品评审→系统架构→程序设计→垂直切片）共同的思想源头。

**费曼一下**：与其等菜做好了再让全桌人挑刺，不如点菜前先问清楚每个人的忌口和偏好。前面多花十分钟对齐，后面能少炒好几盘要重做的菜。

### RLVR 与编码 agent 的 RL 训练循环

**context**：作者为了论证"这不是技能问题"而钻研的训练机制——生成编码 agent 的 trace → 用 verifier 打分 → 更新权重强化好 trace、抑制坏 trace，循环上百万次、持续数周到数月。这套解释动画的灵感来自 Calvin French-Owen 在 AI Council 的一次演讲。

**费曼一下**：这就像训练一只叼飞盘的狗——它做对了给零食，做错了不给，重复几万次，狗就学会了"叼飞盘"这个动作。但如果你只奖励"叼到"，从不管"叼的姿势有没有把邻居家的花坛踩烂"，狗迟早会学会踩花坛去换零食。

### SWE-bench 与二元打分

**context**：文中拿来解剖 RL 打分单薄性的具体基准——从 Redis、jq、Django 等仓库抓取约 15 分钟量级的任务，用 FAIL_TO_PASS/PASS_TO_PASS 决定 0/1 打分。fastlane\_\_fastlane-19304 是文中给出的完整案例：两行的 nil 兜底修复，模型只要让指定测试从失败变通过、其余测试不受影响就算赢。

**费曼一下**：这类基准很像"只看考试最后答案对不对"的判卷方式——不管你是认真推导出来的，还是蒙对的，或是抄了半页公式却在最后一步凑巧约分对了。能拿满分，不代表解题过程经得起推敲。

### 可维护性 / 霰弹式手术

**context**：作者定义的模型核心短板——没有人工引导时，模型无法长期维护并提升代码库质量；具体表现是"改一处却容易牵连别处"变得异常困难，即 Martin Fowler 所说的 shotgun surgery。作者指向三本书：Ousterhout《A Philosophy of Software Design》、Robert Martin《Clean Code》、Fowler《Refactoring》。

**费曼一下**：好代码库像一台各部件之间有清晰边界的机器，换一个零件不用拆掉半台机器；可维护性差的代码库则像挨了一枪的霰弹——你想改一个小地方，弹片却嵌进了十几个不相干的部位，每处都要单独处理。

### 可维护性没有惩罚项

**context**：SWE-bench 式评测的关键漏洞——"模型是怎么得到正确答案的完全不重要"，只要测试通过就算赢，但这套打分对"侵蚀代码库可维护性"没有任何惩罚。作者认为这正是代码里到处是兜底 try/catch、以及架空类型系统的偷懒类型转换的来源。

**费曼一下**：如果一场考试只按"最终答案对不对"给分，完全不管解题步骤和卷面整洁度，学生自然会学会用最快、最脏的手段凑出答案——反正没人因为字迹潦草、逻辑跳步扣分。

### 可维护性缺一个可靠的打分预言机

**context**：作者解释为什么 RL 练不出"守护代码质量"这个能力的核心原因——跑测试几秒钟出结果，而架构变差的代价要以周、月甚至年计量；"设计差"是今天的基准测不出来的东西。就算用模型当判官（如 Frontier Code），也只能到"如果模型真能可靠分辨好坏代码，它一开始可能就写出了好版本"这个悖论为止。

**费曼一下**：强化学习就像靠味觉反馈练厨艺——如果每道菜几秒钟就能知道咸淡对不对，厨师能练得飞快；但"这道菜吃了会不会三年后让人得高血压"，没有任何一口能立刻告诉你，所以再怎么高频试错，也练不出这项本事。

### Mutation Testing 与前沿质量评测

**context**：作者列举的"前沿在往正确方向走"的三个尝试——SWE-Marathon 用约 400 小时量级任务加复合奖励；DeepSWE 用现实中从未被真正构建过的仓库任务防止训练集污染；Frontier Code 的关键一招是用 mutation testing 思路，惩罚"写了测试却不会在打补丁前的代码上失败"的行为，并额外跑一个判官模型检查代码质量规则。

**费曼一下**：mutation testing 的直觉是——先故意在代码里埋几个小错（变异），再看你的测试套件能不能抓到它们；抓不到，说明这些测试形同虚设。作者提到老板玩过的一个类比游戏：看你能从一个 Python 大单体里删掉多少行代码，同时不让成千上万个单元测试挂掉——能删掉一大截还全绿，恰恰暴露了测试套件有多少是没在真正把关。

### Harness 内 RL（RL inside the harness）

**context**：作者给出的"Claude Code 为什么能赢"的解释——aider、cline、codebuff 等 CLI agent 更早出现、工具集和上下文工程也不差，但工具调用时常失败；Claude Code 的优势在于 Anthropic 第一次拿着即将发布的那套确切工具去 RL 训练模型本身，而不是事后适配。OpenAI 团队 11 月的演讲把这一点讲透：不掌握权重、无法在 harness 内部做 RL，就永远落后于同时拥有两者的团队。

**费曼一下**：同样是教人用一套厨具做菜，一种方法是写一本详尽的操作手册（打磨 harness）；另一种是从头把这个人训练成只会、且特别擅长用这套厨具的厨师（在 harness 内部做 RL）。前者进步有上限，后者能把工具和使用者拧成一体。

### 产品评审（Product Review）

**context**：四阶段前置流程的第一步——先用一份简短文档钉住"要解决什么问题"（用户自己的语言）和"成功是什么样子"（用户结果或可量化指标），用粗糙的 HTML mockup 代替文字描述界面，并采用"作者自选评审人"的方式提前对齐。文案微调、一次性脚本、复现路径明确的 bug 不需要走这一步。

**费曼一下**：动工前先把"我们到底要盖个什么、盖它是为了解决谁的什么问题"写清楚、画出来，而不是一边砌墙一边现场吵该往哪个方向砌。

### 系统架构评审

**context**：第二阶段——对齐服务、接口、schema、队列、存储怎么互通，大量使用时序图、接口契约、数据模型等可视化提升人和 agent 之间的沟通带宽；文中举了一个创建资源的例子（UI → API → ResourceService → Store 时序图 + PUT /api/resources/:slug 契约 + 新建的数据表）。作者提醒 mermaid 好用但可能营造虚假的"我们已经对齐了"的错觉，单靠这一步不足以产出高质量代码。

**费曼一下**：这一步画的是整栋楼的水电煤管线走向图——谁接谁、口径多大、走哪条路——但还没细到某个房间的插座该装在墙的哪个高度，那是下一步的事。

### 程序设计（Program Design）

**context**：作者称之为 agentic coding 里"被严重低估"的一步——在写实现之前，从架构再下沉一层到"代码的形状"：类型、方法签名、程序布局、调用栈。他们发现伪代码式的轻量可视化比 mermaid 更好用：调用栈树（可用 diff 语法标注变化）、文件树 diff、关键新函数的类型和方法签名。Dillon Mulroy 的实践（"计划基本就是类型/接口怎么组合、边界在哪，加上调用栈"）印证了这一点。

**费曼一下**：这一步是在动工前先把"这个房间会用到几个插座、每个插座接什么设备、线该怎么走"画成图纸——细到足以让工人不用猜，但又不必真的把墙砌起来。

### 垂直切片 / Tracer Bullet

**context**：第四阶段，针对模型偏爱的"横向计划"（按数据库迁移→服务层→API→前端的技术分层顺序）提出的替代方案——从中间向外打通一条完整可测试的通路（API 契约配 mock 数据加 curl 测试 → 前端接 mock 数据 → 服务层 → 数据库迁移 → 业务逻辑 → 错误处理），每一步都能实际"摸到"、随时评审 100-200 行并重新引导。

**费曼一下**：横向计划像先把整栋楼所有楼层的地基、所有楼层的墙、所有楼层的水电都分别一次性做完，直到全部完工才第一次尝试开灯；垂直切片则是先盖出一间能住人、能开灯、能用水的样板间，验证整个链路走得通，再复制去盖下一间。

### 2026 版约束理论

**context**：全文的收尾框架——作者承认自己铺陈出来的"不过是一堆约束"：模型在某些事情上强、某些事情上不然。与其硬赌 10-100 倍的"灯灭"速度、说服自己代码质量不重要，不如摸熟这些约束，在约束划出的场地里优化系统、找杠杆，然后"读那该死的代码"。

**费曼一下**：与其无视自己体力和心肺的极限硬冲马拉松配速最终受伤退赛，不如先摸清楚自己今天的真实状态，在这个状态允许的范围内跑出一个可持续、能完赛的配速。

### 概念网络

![图片为概念网络图，由Coding Agent强化学习和Harness工程加速建造两个部分组成。Coding Agent强化学习部分包含测试通过/失败的二元打分、可维护性没有惩罚项、代码库长期变差；Harness工程加速建造部分包含评审成为瓶颈、灯灭软件工厂。二者通过箭头相连，最终指向人参与：产品评审、架构、程序设计、垂直切片，在能力约束内追求可持续提升。该图是对原文概念网络文字的整理，直观呈现了相关概念间的关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Y2Y0MmIzMTY0M2YyNzljZDJiMzMyMWIyN2NjZTZiZDBfYjViNWQxMmQ3ODNmZDkyNTMyZmE4OTk4OTcwYWRiOWZfSUQ6NzY3MTAwODAyMDAyNDg4ODU1MF8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

全文的骨架是一条从"诊断"到"药方"的因果链，起点是把「软件工厂」拆成三种形态——2022 基线、agentic 版本、「lights-off 软件工厂」——每一步都在把"人做的事"更多地换成"agent 做的事"，而 HumanLayer 亲历的翻车故事就是 lights-off 这一端在真实世界里的应验。作者没有停在轶事层面，而是往回追问：为什么模型会在"过了测试"的同时持续把代码库变差？答案落在「RLVR 与编码 agent 的 RL 训练循环」上——用「SWE-bench 与二元打分」式的方式训练模型，天然导致「可维护性没有惩罚项」，因为 verifier 只关心测试是否通过，不关心过程留下的「可维护性 / 霰弹式手术」代价。往深一层追问"为什么这个打分做不到位"，就得到全文最关键的机制性解释——「可维护性缺一个可靠的打分预言机」：测试几秒出结果、RL 才跑得动百万次循环，而架构变差的代价要几个月几年才现形，这道时间差目前没有办法被压缩，「Mutation Testing 与前沿质量评测」这类努力是在正确方向上打补丁，但都撞在"模型评判质量"本身有天花板这堵墙上。与此同时，「Harness 内 RL」解释了另一条平行的因果线——为什么 Claude Code 能赢：不是 harness 造得更精致，而是训练阶段就把模型和工具拧在了一起，这条线索提醒读者「Harness Engineering」本身不是没用，只是不掌握权重就做不到位，呼应了标题"光有 harness 工程还不够"。诊断成立之后，文章转向药方：既然模型内部的打分机制短期内补不上这个缺口，判断质量这件事就只能暂时留给人——于是作者把 AI 之前就有的老经验「前置对齐」重新展开成四个具体阶段：「产品评审」对齐"做什么、为什么"，「系统架构评审」对齐服务怎么互通，「程序设计」下沉到类型与调用栈的"代码形状"，「垂直切片 / Tracer Bullet」则把这套设计变成一条条可以随时验证、随时评审的实际通路——四者层层递进，本质是把原本会在事后代码评审时才暴露、成本最高的返工，提前挪到成本更低的规划阶段消化掉。最后，「2026 版约束理论」把整条链路收束成一句方法论：既然模型的能力边界（擅长单点任务、不擅长长期守护架构）在当下是既定约束，与其赌上代码库去追 lights-off 承诺的 10-100 倍速度，不如在这些约束内用四阶段流程稳稳跑出可持续的 2-3 倍——这既是对开篇「软件工厂」叙事的回应，也是对「可维护性没有惩罚项」这一根本诊断在实践层面唯一现实的应对。

## 费曼 x3

先说一个反直觉的判断：你手里那些不断加码的自动化——更多 linter、更多评审 agent、更长的 loop、往 PR 机器人身上撒一点"对抗式评审"的魔法词——都在解决一个它们无权解决的问题。评审慢不是流程问题，也不是"你姿势不对"的技能问题，它是一个模型训练层面的问题。这个区分很要紧，因为它决定了你继续加码的方向究竟有回报，还是纯属徒劳。

为什么是训练问题？看一眼模型是怎么被奖励的。一次编码 RL 的打分常常只有两位：你要修的修好了吗，别的没弄坏吧。跑一遍测试，几秒钟就给出干净的通过或失败，于是这个循环可以跑上百万次。但坏架构的代价函数是以周、以月、甚至以年计量的——它在某个人打开那个文件想改一行、却发现同样的改动得在十一处重复、还要祈祷三个文件之外不会悄悄坏掉的那一刻才结算。测试通过就算赢，而侵蚀可维护性没有任何惩罚。你不惩罚的东西，模型就不会学。

更棘手的是，这件事没法用"再套一层 AI"绕过去。让模型来当质量裁判听着很美，可如果一个模型真能可靠地分辨好代码和坏代码，它一开始大概就会写出那个好版本。RL 需要一个又快又可靠的判据，而可维护性至今没有。所以多加评审 agent 确实有用——它抬高了地板，把蠢错误捞出来；但它抬不动天花板，因为天花板就是 RL 里教给模型的那些东西，而好设计恰恰是我们还不知道怎么教的那一样。

于是"熄灯工厂"的算术根本不成立：省下的评审时间会以贵得多的价格回来。三到六个月后，一个 agent 攒起来的代码库开始变得难改，你只好回头去读那份自己三个月前就不再看的代码——而此时站点已经挂了，用户已经骂了。

出路一点也不新鲜，反倒是 AI 之前那套老手艺：把对齐前移。产品意图、系统架构、程序设计（类型、方法签名、调用栈这些"代码的形状"）、垂直切片——这里的每一项，都是你本来会在代码评审时隐式做出的决定，而评审是你改主意最贵的时刻。你的问题从来不是 PR 太多，是烂 PR 太多。所以别急着追 10 到 100 倍，先学会在约束里安全地跑 2 到 3 倍，然后老老实实读代码。

HOWIE 原清单 · 24

# Thin Harness, Fat Skills：harness 才是真正的产品

**内容说明：**真正的秘密不在模型而在 harness——实时 repo 上下文、prompt 缓存、结构化会话记忆、并行子 agent

**策展人按：**冷水泼完，这条给了个可能的出路。thin / fat 这个划法未必对，但它是清单里少数敢下架构判断的。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：Thin Harness, Fat Skills
- 作者：Garry Tan
- 内参日期：2026-04-21
- 来源类型：twitter
- 原文：https://x.com/garrytan/status/2042925773300908103/
- 标签：harness engineering, agentic engineering, agents

真正的秘密不在模型而在 harness——实时 repo 上下文、prompt 缓存、结构化会话记忆、并行子 agent

## 导读

harness vs skills

AI 生产力的 10x-100x 差距不来自更聪明的模型，而来自架构设计——核心原则是 **Thin Harness, Fat Skills**：

- harness（跑模型的外壳）只做四件事（循环调用模型、读写文件、管理上下文、执行安全），保持精简；
- 真正的价值全部编码进可复用的 markdown skill 文件，让模型知道"怎么做"。
- 配合 resolver（按需路由上下文）、latent vs. deterministic 的分层判断（判断力向上推进 skills，确定性计算向下推进工具层），以及 diarization（从大量文档中综合出结构化情报）和 learning loop（skill 读取反馈后自我重写），整个系统得以持续复利——每次模型升级，所有 skill 自动变强，而确定性层保持稳定可靠。

## 核心论点

- AI 生产力的 10x-100x 差距不来自更聪明的模型，而来自**架构**——具体说就是模型外面那层"wrapper"
- 这个架构原则可以写在一张索引卡上：**Thin Harness, Fat Skills**
- harness 保持薄：只做循环运行模型、读写文件、管理上下文、执行安全四件事
- skills 做厚：把判断力、流程、领域知识全部编码进 markdown skill 文件

## The Harness Is the Product

- 2026 年 3 月 Anthropic 意外泄露 Claude Code 全部 512,000 行源码，Garry Tan 读完后确认：**秘密不在模型，在包裹模型的那层东西**
- 实时 repo 上下文、prompt 缓存、专用工具、context bloat 最小化、结构化 session 记忆、并行 sub-agent——这些都不让模型更聪明，而是**在正确时间给正确上下文，不淹没在噪音里**
- 这层 wrapper 就叫 **harness**，核心问题是：什么放进 harness，什么留在外面？

## Five Definitions（五个核心定义）

### Skill Files

- Skill file = 可复用的 markdown 文档，教模型 *how* to do something（用户提供 what）
- **关键洞察：skill file 像一个方法调用**——接受参数，用不同参数调用同一个流程，产生截然不同的能力
- 案例：/investigate skill，7 个步骤（scope dataset → build timeline → diarize → synthesize → argue both sides → cite sources），接受 TARGET, QUESTION, DATASET 三个参数
- 指向安全科学家 + 210 万封发现邮件 → 医学研究分析师
- 指向空壳公司 + FEC 备案文件 → 法证调查员
- "This is not prompt engineering. This is software design, using markdown as the programming language and human judgment as the runtime."

### The Harness（薄壳层）

- Harness 只做 4 件事：循环运行模型、读写文件、管理上下文、执行安全
- **反模式：Fat harness + thin skills**
- 40+ tool definitions 吃掉一半上下文窗口
- God-tools 的 MCP round-trip 需要 2-5 秒
- REST API wrapper 把每个 endpoint 变成独立 tool → 3 倍 token、3 倍延迟、3 倍失败率
- **正确做法：purpose-built tooling，fast and narrow**
- Playwright CLI 每个浏览器操作 100ms vs Chrome MCP 15 秒 → 快 75 倍

### Resolvers（上下文路由表）

- Resolver = 上下文的路由表：当任务类型 X 出现时，先加载文档 Y
- Skills 告诉模型 how；Resolvers 告诉模型 what to load and when
- 案例：开发者改 prompt → resolver 自动先加载 [EVALS.md](http://evals.md/) → 模型知道要跑评测套件
- Claude Code 内置 resolver：每个 skill 有 description 字段，模型自动匹配用户意图到 skill 描述
- Garry 的教训：[CLAUDE.md](http://claude.md/) 曾膨胀到 20,000 行 → 模型注意力退化 → 砍到 200 行指针文档，resolver 按需加载

### Latent vs. Deterministic

- 系统中每一步非此即彼，**混淆两者是 agent 设计最常见的错误**
- **Latent space**（智能所在）：模型阅读、解释、判断。判断力、综合分析、模式识别
- **Deterministic**（信任所在）：相同输入 → 相同输出。SQL 查询、编译代码、算术
- 案例：LLM 能安排 8 人晚宴座位（考虑性格和社交动态），但安排 800 人就会幻觉出看似合理但完全错误的座位表——这是**组合优化问题被错误地塞进了 latent space**

### Diarization（档案综述）

- Diarization = 模型阅读关于某个主题的一切，写出一份结构化的 profile——从数十/数百份文档中提炼出一页判断
- 没有 SQL 查询能做到，没有 RAG 管道能做到——模型必须真正阅读、持有矛盾、注意变化、综合出结构化情报
- 本质区别：database lookup vs. analyst's brief

## The Architecture（三层架构）

- **顶层 — Fat Skills**：编码判断力、流程和领域知识的 markdown 程序，**90% 的价值在这里**
- **中层 — Thin CLI Harness**：约 200 行代码，JSON in / text out，默认只读
- **底层 — Your Application**：QueryDB, ReadDoc, Search, Timeline——确定性基础设施
- 原则方向性：智能**向上推**进 skills，执行**向下推**进确定性工具，harness 保持**薄**
- 好处：模型每次升级，自动改善所有 skill；确定性层保持完全可靠

## The System That Learns（YC Startup School 实战案例）

- 场景：Chase Center，2026 年 7 月，6000 名创始人的 Startup School
- 传统方法：15 人项目团队读申请、拍脑袋、更新表格——200 人时可行，6000 人时崩溃

### Enrichment（数据充实）

- /enrich-founder skill：拉取所有来源 → enrichment → diarize → 高亮创始人"说的"和"实际在做的"之间的差距
- 确定性层：SQL 查询、GitHub 统计、浏览器测试 demo URL、社交信号、CrustData 查询。cron 每晚运行
- 案例：Maria Santos 说"Datadog for AI agents"，但 80% 的 commit 在 billing 模块 → 实际在做的是伪装成 observability 的 FinOps 工具
- 发现这个差距需要同时阅读 GitHub commit 历史 + 申请 + 顾问访谈，没有 embedding 搜索能做到

### Matching（匹配）

- 同一个 matching skill 的三种调用：
- /match-breakout：1200 人按行业亲和度聚类，30 人/房间
- /match-lunch：600 人跨行业偶遇匹配，8 人/桌，不重复
- /match-live：当前在场者实时 nearest-neighbor，200ms，1:1 配对
- 模型做出聚类算法永远做不到的判断："Santos 和 Oram 都是 AI infra，但不是竞争对手——Santos 做 cost attribution，Oram 做 orchestration，放同一组"

### The Learning Loop（学习循环）

- /improve skill 读 NPS 调查 → diarize 那些"OK"（不是"差"）的反馈 → 提取模式 → 提出新规则 → **写回 skill file**
- Skill 自我重写：7 月活动 12% "OK" → 下次活动 4%
- 通用模式：*retrieve → read → diarize → count → synthesize*；然后 *survey → investigate → diarize → rewrite the skill*

## Skills Are Permanent Upgrades

- Garry 给 OpenClaw 的指令："You are not allowed to do one-off work. If I ask you to do something and it's the kind of thing that will need to happen again, you must: do it manually the first time on 3 to 10 items. Show me the output. If I approve, codify it into a skill file."
- "The test: if I have to ask you for something twice, you failed."
- 每个 skill 是系统的永久升级——不退化、不遗忘、凌晨 3 点自动运行
- 下一个模型发布时，所有 skill 即刻变强（latent 步骤的判断力提升，deterministic 步骤保持可靠）
- **"That's how you get Yegge's 100x. Not a smarter model. Fat skills, thin harness, and the discipline to codify everything."**
- **"The system compounds. Build it once. It runs forever."**

## 概念网络

### 核心概念解析 (Core Concepts)

- **【Harness】**
- **context**：

"The harness is the program that runs the LLM. It does four things: runs the model in a loop, reads and writes your files, manages context, and enforces safety. That's it. That's the 'thin.'"

- **费曼一下**：Harness 就是模型外面那层程序外壳。不是模型本身，而是“跑模型的那个东西”——它只做四件事：循环调用模型、读写文件、管理上下文、执行安全护栏。Garry 的核心主张是它必须保持 thin，因为往里塞太多东西（40+ tool definitions、God-tools）会吃掉上下文窗口、拉高延迟、提升失败率。Harness 是 AI 系统的“产品”，但它的价值恰恰在于克制和精简。
- **【Skill Files】**
- **context**：

"A skill file is a reusable markdown document that teaches the model *how* to do something. Not what to do — the user supplies that. The skill supplies the process."

- **费曼一下**：Skill file 是用 markdown 写的可复用流程文档，告诉模型“怎么做”。用户提供“做什么”，skill 提供“过程”。关键洞察是它像函数调用——接受参数，同一个流程用不同参数可以生成截然不同的能力。Garry 认为这不是 prompt engineering，而是“software design, using markdown as the programming language and human judgment as the runtime”。
- **【Thin Harness, Fat Skills】**
- **context**：

"Push intelligence *up* into skills. Push execution *down* into deterministic tooling. Keep the harness *thin*. When you do this, every improvement to the model automatically improves every skill, while the deterministic layer stays perfectly reliable."

- **费曼一下**：这是整篇文章的核心架构原则。“薄壳层”负责运行和调度，“肥技能”承载判断力和知识。原则是方向性的：智能向上推进 skills，执行向下推进确定性工具。好处是模型升级时所有 skill 自动变强，而确定性层不受影响。
- **【Resolver】**
- **context**：

"A resolver is a routing table for context. When task type X appears, load document Y first. Skills tell the model how. Resolvers tell it what to load and when."

- **费曼一下**：Resolver 是上下文的路由表——当特定任务类型出现时，自动加载对应的文档。它解决的是“加载什么”和“何时加载”的问题，而 skill 解决“怎么做”。Garry 的实践教训是把 20,000 行 [CLAUDE.md](http://claude.md/) 砍成 200 行指针文档——让 resolver 按需加载，而不是全部塞进上下文窗口。
- **【Latent vs. Deterministic】**
- **context**：

"Every step in your system is one or the other, and confusing them is the most common mistake in agent design. Latent space is where intelligence lives. Deterministic is where trust lives."

- **费曼一下**：系统中每一步要么是 latent（模型判断、综合、模式识别），要么是 deterministic（SQL、编译、算术，相同输入永远相同输出）。最常见错误是把该用确定性方法解决的问题塞给模型（如 800 人座位安排），或反过来。智能属于 latent space，信任属于 deterministic space。
- **【Diarization】**
- **context**：

"Diarization is the step that makes AI useful for real knowledge work. The model reads everything about a subject and writes a structured profile — a single page of judgment distilled from dozens or hundreds of documents."

- **费曼一下**：Diarization 是模型对某个主题的“档案综述”——读完所有相关文档，写出一份结构化的 profile。这不是 RAG 能做的事，因为模型必须真正阅读、持有矛盾、注意变化、综合出结构化情报。本质是 database lookup（数据库查询）和 analyst's brief（分析师简报）的区别。
- **【Skill-as-method-call】**
- **context**：

"A skill file works like a method call. It takes parameters. You invoke it with different arguments. The same procedure produces radically different capabilities depending on what you pass in."

- **费曼一下**：这是 Garry 对 skill files 的核心比喻。Skill 不是固定的 prompt，而是可参数化的“方法”——同一套流程，传入不同的数据集和问题，产出完全不同的能力。这把 skill 从“提示词工程”升级为“软件设计”。
- **【Learning Loop】**
- **context**：

"These rules get written back into the skill file. The next run uses them automatically. The skill rewrites itself."

- **费曼一下**：学习循环是 skill 系统的自我进化机制。通过 /improve skill 读取反馈（尤其是“OK”而非“差”的反馈）→ diarize → 提取模式 → 写回 skill file。Skill 自我重写，系统在不改代码的情况下变得更好。通用模式：retrieve → read → diarize → count → synthesize → rewrite the skill。
- **【Context Bloat】**
- **context**：

"My [CLAUDE.md](http://claude.md/) was 20,000 lines. Every quirk, every pattern, every lesson I'd ever encountered. Completely ridiculous. The model's attention degraded."

- **费曼一下**：Context bloat 是向模型的上下文窗口塞入过多信息，导致注意力退化、性能下降。Thin harness 架构的一个核心目标就是最小化 context bloat——通过 resolver 按需加载，而非把所有知识放进上下文。

### 概念网络 (Concept Network)

![图片展示了Thin Harness,Fat Skills架构下的逻辑链。从Thin Harness,Fat Skills出发，经Harness（薄壳层）和Resolver（连接harness和skills的桥梁），到Skill文件（承载智能），Skill即方法调用。Resolver按需加载Skill文件，Skill文件上移到潜在判断，典型应用为话者画像整理，由潜在判断解决上下文膨胀问题，下沉到应用层确定性执行。该图与上下文紧密相关，直观呈现了架构各部分的逻辑关系及功能。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NWMxMzU0NmRhNDA0NGYzYjljNTJjMzY5ZjY2ODA5YzZfZGJhNTBiZmMxMjMyYzhjYzk5MmI1M2Q0NDFiZWVlN2RfSUQ6NzY3MTAwODAxOTEwMjA1OTcyM18xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

- **Thin Harness, Fat Skills** 是统领全局的架构原则，其他概念都是它的组成部分：
- **Harness**（薄壳层）和 **Skill Files**（肥技能）是架构的两极，前者负责调度，后者承载智能
- **Resolver** 是连接 harness 和 skills 的桥梁，决定“加载哪个 skill / 文档”
- **Skill-as-method-call** 是对 Skill Files 的深层理解：skill 不是固定指令，而是可参数化的能力单元
- **Latent vs. Deterministic** 是架构分层的判断标准：智能/判断向上推进 skills（latent），执行/计算向下推进应用层（deterministic）
- **Diarization** 是 skill 最典型的 latent space 应用——读取大量文档、综合判断、生成结构化 profile
- **Context Bloat** 是 thin harness 架构要解决的核心问题，**Resolver** 是解决 context bloat 的具体机制
- **Learning Loop** 是整个系统的进化引擎：skill 通过 diarize 反馈自我重写，实现“不改代码就变强”
- 整体逻辑链：**Thin Harness, Fat Skills**（架构原则）→ **Latent vs. Deterministic**（分层标准）→ 顶层 **Skill Files** + 底层确定性工具 + 中间层薄 **Harness** → **Resolver** 解决上下文路由、抑制 **Context Bloat** → **Diarization** 作为核心 latent 能力 → **Learning Loop** 驱动 skill 自我进化 → 系统复利

HOWIE 原清单 · 25

# Agent Harness 的本质：把模型放进可控的执行系统

**内容说明：**Agent harness 的核心是把模型放进包含循环、工具、记忆和上下文管理的可控执行系统里。

**策展人按：**兜了一圈回到定义。前面二十几条攒下的直觉，在这条里被压成一句话。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：深度拆解：AI Agent Harness 的构造
- 作者：Akshay
- 内参日期：2026-05-12
- 来源类型：blog
- 原文：https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- 标签：harness engineering, agent 元技能, agents

Agent harness 的核心是把模型放进包含循环、工具、记忆和上下文管理的可控执行系统里。

## 导读

agent harness。aka “agent 元技能”。

## 核心观点/主旨

Agent 的本质不是模型突然获得了独立行动能力，而是大语言模型被放进了一套可控的执行系统里。这个系统就是 Agent Harness：它负责组织循环、暴露工具、管理记忆和上下文、保存状态、处理错误、设置护栏并验证结果。

用户感知到的是 AI Agent：一个有目标、会用工具、能纠错的实体。但背后真正让这种行为发生的，是模型外围的 Harness。文章的核心判断是：生产级 Agent 的性能差异，很大程度来自 Harness 的设计，而不是单纯来自模型参数或提示词。

## 问题不只在模型，而在模型外围的基础设施

### Demo 能跑，不代表系统能进入生产

- 许多开发者已经做过聊天机器人或 ReAct 循环，演示时看似顺畅。
- 一旦进入生产环境，常见问题会暴露：模型忘记几步前的动作，工具调用静默失败，上下文窗口被无意义信息填满。
- 作者把这些失败归因于模型外围的基础设施，而不是模型本身的单点缺陷。

### Harness 的设计可以显著改变 Agent 表现

- LangChain 的案例说明：模型和参数不变，仅改变包裹模型的底层架构，就能让系统在 TerminalBench 2.0 上从 30 名开外提升到第 5 名。
- 另一项研究让大语言模型自行优化 Harness 架构，达到了 76.4% 的通过率，超过人工精心设计的系统。
- 这说明 Agent 能力不是裸模型能力的直接外显，而是模型与执行架构共同产生的结果。

## 什么是 Agent Harness

### Harness 是模型之外的完整软件架构

- Harness 包裹在大语言模型之外，包含编排循环、工具、记忆、上下文管理、状态持久化、错误处理和护栏。
- Anthropic 和 OpenAI 都把 Agent/Harness 用来指代让大语言模型真正发挥作用的非模型架构。
- Vivek Trivedy 的定义公式是：如果某个部分不是模型本身，那它就是 Harness。

### AI Agent 是行为体现，Harness 是背后机器

- AI Agent 是用户感知到的实体：它有目标、调用工具、尝试纠错。
- Harness 是产生这种实体行为的机器：开发者说“我做了一个 Agent”，实际含义通常是做了一套 Harness 并接入模型。
- 因此，Agent 不是单个模型对象，而是模型与外围执行系统共同构成的应用形态。

### 操作系统类比

- 原生大语言模型类似没有内存、硬盘和输入输出设备的 CPU。
- 上下文窗口相当于内存，外部数据库相当于硬盘，工具集成相当于设备驱动。
- Harness 则是操作系统：它把这些资源和机制组织起来，让模型从“能生成文本”变成“能执行任务”。

## 围绕模型的三层工程化

### Prompt engineering

- 提示词工程关注模型接收到什么指令。
- 它是最靠近模型输入的一层，但不足以解决完整执行系统的问题。

### Context engineering

- 上下文工程关注模型在什么时间点能看到什么内容。
- 它把上下文窗口视为稀缺资源，决定哪些信息进入窗口、哪些信息被压缩、检索或隐藏。

### Harness engineering

- Harness 工程涵盖提示词和上下文，同时加入应用架构层面的设计。
- 它处理工具编排、状态持久化、错误恢复、验证循环、安全执行和生命周期管理。
- 文章强调，Harness 不是提示词外面套一层壳，而是让 Agent 可以自主行动的完整系统。

## 生产级 Harness 的核心组件

### 编排循环：系统的心脏

- 编排循环实现 Thought-Action-Observation，也就是思考、行动、观察的连续过程。
- 技术上它可能只是一个 while 循环，但复杂性来自循环内部要维护的状态、工具调用、错误反馈和退出条件。
- Anthropic 把运行时称为“笨循环”：智慧留给模型，Harness 管理回合切换。

### 工具：Agent 的双手

- 工具以结构化模式暴露给模型，包括名称、描述和参数类型。
- 工具层要完成注册、校验、参数提取、沙箱执行、结果捕获和观察结果格式化。
- Claude Code、OpenAI Agents SDK 和 MCP 都体现了工具层在生产 Agent 中的中心位置。

### 记忆：跨时间尺度保存信息

- 短期记忆是单次会话里的对话历史。
- 长期记忆跨越会话存在，可以表现为项目文件、[memory.md](http://memory.md/)、命名空间 JSON 存储、SQLite/Redis 会话存储等。
- Claude Code 的三层记忆包括轻量索引、按需主题文件和可搜索的原始对话记录。
- 文章强调一个设计原则：Agent 应把记忆看作提示，行动前仍要根据现实状态验证。

### 上下文管理：防止上下文腐烂

- 许多 Agent 失败来自上下文窗口中的信号变差。
- 当关键信息处于窗口中间位置时，模型表现会下降；即使窗口达到百万级 token，指令遵循能力也会随上下文增长退化。
- 生产策略包括压缩、观察掩码、即时检索和子 Agent 委托。
- 上下文工程的目标是找到最小但信号最强的 token 集合。

### 提示词构建：决定每一步模型能看到什么

- 提示词构建是分层的：系统提示词、工具定义、记忆文件、对话历史和当前用户消息共同进入输入。
- OpenAI Codex 使用优先级栈：系统消息、工具定义、开发者指令、用户指令、对话历史。
- 这说明 Harness 不只是拼接文本，而是在管理权限、优先级和上下文结构。

### 输出解析：从自由文本转向原生工具调用

- 现代 Harness 依赖模型返回结构化 tool_calls，而不是解析自由文本。
- Harness 判断是否有工具调用：有则执行并继续循环，没有则把输出作为最终答案。
- 对结构化输出，OpenAI 和 LangChain 都支持用 Pydantic 等模型进行模式约束。

### 状态管理：让任务可恢复、可追踪

- LangGraph 把状态建模为在图节点之间流动的类型化字典。
- Checkpointing 让系统中断后可以恢复，也让调试可以回到过去状态。
- OpenAI 提供应用内存、SDK 会话、服务器端 API、响应 ID 链等状态策略。
- Claude Code 倾向使用 Git 提交和进度文件作为存档点与草稿纸。

### 错误处理：防止小错误滚成大失败

- 多步骤流程的整体成功率会随步骤数量下降；10 个 99% 成功率的步骤串联后，全流程成功率只有约 90.4%。
- LangGraph 将错误分为临时性错误、模型可恢复错误、用户可修复错误和意外错误。
- Harness 的错误处理不是简单报错，而是决定重试、反馈给模型、暂停等待人类，或上报调试。

### 护栏与安全：模型想做什么，系统允许什么

- OpenAI SDK 有输入护栏、输出护栏和工具护栏。
- 一旦触发 tripwire，Agent 会立即停止。
- Anthropic 的结构把模型推理与权限执行分离：模型决定想做什么，Harness 决定能不能做。

### 验证循环：生产级 Agent 的分水岭

- 验证循环区分玩具演示和生产级 Agent。
- Anthropic 推荐规则反馈、视觉反馈和 LLM-as-judge 三种验证方式。
- Claude Code 的创造者认为，让模型能够验证自己的工作，可以显著提升产出质量。

### 子 Agent 编排：把探索和控制拆开

- Claude Code 支持克隆、队友、工作树三种子 Agent 模式。
- OpenAI 支持把 Agent 作为工具，或把任务移交给另一个专家 Agent。
- 子 Agent 的价值在于深度探索后返回压缩摘要，降低主上下文负担。

## 一次 Agent 循环怎样运转

### 循环步骤

- 第一步：Harness 组装完整输入。
- 第二步：模型基于输入生成 token，可能是文本，也可能是工具调用请求。
- 第三步：Harness 判断输出类型；没有工具调用则结束，有工具调用则进入执行。
- 第四步：工具执行层校验参数、检查权限、在沙箱中运行并捕获结果。
- 第五步：执行结果被打包为模型可读的观察消息，错误也会被转换成模型可以处理的反馈。
- 第六步：上下文被更新，必要时触发压缩。
- 第七步：循环返回第一步，直到满足退出条件。

### 循环的关键含义

- Agent 的连续行动来自 Harness 对“推理、执行、反馈、再推理”的稳定组织。
- 模型不是直接控制外部世界；它通过 Harness 提供的接口、权限和反馈机制间接行动。

## 主流框架如何实现同一套骨架

### Anthropic Claude Agent SDK

- 通过 query() 暴露 Harness。
- 运行时保持简单循环，把智慧主要留给模型。

### OpenAI Agents SDK

- 使用代码优先策略，用 Python 表达工作流逻辑。
- 支持函数工具、托管工具和 MCP 服务器工具。

### LangGraph

- 将 Harness 显式建模为状态图。
- 优势是对流程、状态和恢复路径有更精细的控制。

### CrewAI 与 AutoGen

- CrewAI 采用角色化多 Agent 协作，由流程层管理确定性骨干逻辑。
- AutoGen 支持顺序执行、群聊、移交和动态任务管理等多种编排方式。

## 脚手架比喻与协同进化原则

### Harness 像脚手架

- 脚手架本身不盖房子，但让工人到达原本够不到的位置。
- Harness 本身不是智能来源，但让模型获得工具、状态、反馈和安全边界。

### Harness 会变薄，但不会消失

- 随着模型能力提升，Harness 的复杂度应该逐渐降低。
- 文章把这称为协同进化：模型训练已经开始考虑 Harness 的存在。
- 好的 Harness 设计能在模型升级时自然受益，而不是不断增加外围复杂度。

## 定义 Harness 的七个架构决策

### 单 Agent vs. 多 Agent

- 官方倾向是先充分挖掘单 Agent 能力。
- 多 Agent 会引入额外开销和信息损耗。

### ReAct vs. 先规划后执行

- ReAct 灵活，但成本高。
- 先规划后执行速度更快，但灵活性不同。

### 上下文管理策略

- 架构师要决定是总结对话，还是动态加载需要的信息。

### 验证循环设计

- 验证可以来自硬性的代码测试，也可以来自另一个 LLM 的评估。

### 权限与安全架构

- 系统要在快速自动批准和安全逐步确认之间取舍。

### 工具范围管理

- 工具不是越多越好。
- 给模型暴露当前步骤所需的最小工具集，往往效果更好。

### Harness 厚度

- 架构师要决定多少逻辑写死在系统中，多少逻辑交给模型发挥。
- Harness 厚度是一种架构下注。

## Harness 即产品

### 同一模型，不同 Harness，结果可能天差地别

- TerminalBench 的证据表明，仅改变 Harness 就能让排名发生巨大变化。
- 因此，Agent 产品的差异不只是模型选择，也来自外围执行系统的设计质量。

### Harness 不是商品层，而是硬核工程能力

- 文章把 Harness 看作尚未被解决的工程问题。
- 关键挑战包括：如何把上下文当作稀缺资源管理，如何设计验证循环防止错误累积，如何构建不会产生幻觉的记忆系统。
- 即使模型越来越强，仍需要系统管理窗口、执行代码、保存状态并验证工作。

## 关键概念/术语

- **Agent Harness**：包裹在大语言模型之外的完整软件架构，负责循环、工具、记忆、上下文、状态、错误、护栏和验证。
- **AI Agent**：用户感知到的行为实体，有目标、能用工具、能纠错；它由模型和 Harness 共同产生。
- **Prompt engineering**：设计模型接收到的指令。
- **Context engineering**：管理模型在什么时间点能看到什么内容。
- **Harness engineering**：围绕 Agent 的完整应用架构工程，包含工具编排、状态、错误恢复、验证、安全和生命周期。
- **TAO / ReAct 循环**：思考、行动、观察的循环，是 Agent 连续执行任务的核心机制。
- **Tools**：模型连接外部世界的结构化能力接口，包括文件、搜索、执行、网页、代码分析和 MCP 工具等。
- **Memory**：短期会话历史和长期跨会话存储的组合。
- **Context rot / Lost in the middle**：上下文增长和关键信息位置不佳导致模型表现下降的现象。
- **Compaction**：接近上下文限制时对历史进行压缩，保留高信号信息，丢弃冗余输出。
- **Observation masking**：隐藏旧工具输出，但保留工具调用记录。
- **Just-in-time retrieval**：只保留轻量标识符，按需动态加载数据。
- **State management / Checkpointing**：保存任务状态，使中断恢复和回溯调试成为可能。
- **Guardrails / Tripwire**：输入、输出和工具调用层面的安全检查与停止机制。
- **Verification loops**：让系统通过测试、视觉反馈或 LLM 裁判验证结果的循环。
- **Subagent orchestration**：把复杂任务拆给子 Agent 探索、压缩和回传。
- **Scaffolding metaphor**：Harness 像脚手架，让模型达到单独够不到的执行高度。
- **Harness thickness**：系统写死逻辑和模型自由发挥之间的架构比例。

## 概念网络

针对 *《Agent Harness 的本质：把模型放进可控的执行系统》*（Akshay，The Anatomy of an Agent Harness / [baoyu.io](http://baoyu.io/) 翻译）的概念提取

### 核心概念解析（Core Concepts）

### Agent Harness

- **context**：

“包裹在大语言模型之外的完整软件架构”

- **费曼一下**：Agent Harness 是模型外面的执行系统。模型负责推理和生成，Harness 负责让这些推理能进入循环、调用工具、保存状态、处理错误并被验证。

### AI Agent

- **context**：

“用户感知到的行为体现”

- **费曼一下**：AI Agent 是用户看到的“会做事的东西”。它看起来有目标、会用工具、会纠错，但这种行为不是裸模型单独产生的，而是 Harness 把模型组织进执行系统之后的外在表现。

### 非模型架构（Non-model Architecture）

- **context**：

“如果你不是模型本身，那你就是 Harness。”

- **费曼一下**：文章把 Agent 能力拆成模型本体和模型之外的系统。凡是负责运行、组织、限制、连接、恢复和验证的部分，都属于非模型架构。

### LLM-as-CPU / Harness-as-OS

- **context**：

“Harness，就是那个操作系统。”

- **费曼一下**：裸 LLM 像没有外设的 CPU，只会计算。Harness 像操作系统，把内存、硬盘、设备驱动和权限机制组织起来，让计算变成可执行任务。

### 提示词工程（Prompt Engineering）

- **context**：

“精心设计模型接收到的指令”

- **费曼一下**：提示词工程只解决“怎么告诉模型”的问题。它能影响模型当下的响应方式，但不足以管理一个会长期执行、调用工具、处理状态的 Agent。

### 上下文工程（Context Engineering）

- **context**：

“管理模型在什么时间点能看到什么内容”

- **费曼一下**：上下文工程是在管理模型的视野。它决定哪些信息进入窗口、哪些被隐藏、压缩或按需加载，因为模型能看到什么，直接决定它能做什么。

### Harness 工程（Harness Engineering）

- **context**：

“让 Agent 能够自主行动的完整系统”

- **费曼一下**：Harness 工程比提示词和上下文更大。它把工具、状态、错误、验证、安全和生命周期都放进同一个执行架构里，使模型不仅能回答，还能行动。

### 编排循环（Orchestration Loop / TAO / ReAct）

- **context**：

“思考 - 行动 - 观察”

- **费曼一下**：编排循环是 Agent 的节拍器。模型先推理，Harness 执行动作，再把结果作为观察反馈给模型；这个循环不断重复，直到任务结束。

### 笨循环（Dumb Loop）

- **context**：

“所有的智慧都存在于模型之中”

- **费曼一下**：笨循环不是说系统粗糙，而是说 Harness 尽量保持执行框架简单，把判断和推理留给模型，只负责稳定地推进回合和处理边界条件。

### 工具（Tools）

- **context**：

“Agent 的‘双手’”

- **费曼一下**：工具是模型触达外部世界的手。Harness 把工具用名称、描述和参数结构暴露给模型，并负责校验、执行、捕获结果和返回观察。

### MCP（Model Context Protocol）

- **context**：

“一种开放的工具接入标准”

- **费曼一下**：MCP 在文中代表一种工具接入方式。它让不同工具可以被标准化接入 Harness，使模型不必只依赖框架内置能力。

### 记忆（Memory）

- **context**：

“不同的时间尺度上运作”

- **费曼一下**：记忆不是一个单一存储，而是短期对话历史和长期跨会话信息的组合。Harness 要让模型既能延续当前任务，也能调用过去保存的知识。

### 记忆即提示（Memory as Prompt）

- **context**：

“记忆视为一种‘提示’”

- **费曼一下**：记忆不是事实本身，而是给模型的线索。Agent 不能盲信记忆，行动前仍要用当前环境验证它是否还成立。

### 上下文腐烂（Context Rot）

- **context**：

“上下文窗口里塞满了毫无意义的垃圾信息”

- **费曼一下**：上下文腐烂是窗口变大但信号变差的状态。模型看到很多东西，却更难抓住关键内容，执行质量反而下降。

### 迷失在中间（Lost in the Middle）

- **context**：

“关键信息处于窗口中间位置”

- **费曼一下**：迷失在中间描述的是模型对上下文位置的敏感性。信息即使在窗口里，如果位置不好，也可能被模型弱化处理。

### 压缩（Compaction）

- **context**：

“在接近限制时总结对话历史”

- **费曼一下**：压缩是在上下文快满时把历史浓缩成更小的高信号版本。它保留架构决策和未解决问题，丢弃冗余工具输出。

### 观察掩码（Observation Masking）

- **context**：

“隐藏旧的工具输出”

- **费曼一下**：观察掩码不是删除历史，而是降低旧工具结果对当前推理的干扰。模型仍知道发生过调用，但不必反复看到沉重的输出细节。

### 即时检索（Just-in-time Retrieval）

- **context**：

“只保留轻量级标识符”

- **费曼一下**：即时检索把上下文窗口当作缓存，而不是仓库。Harness 只放必要线索，等模型真正需要时再加载具体内容。

### 执行可靠性机制（State / Error / Guardrails / Verification）

- **context**：

“中断也能恢复” / “错误是会滚雪球的” / “Agent 将立即停止”

- **费曼一下**：执行可靠性机制是一组让 Agent 可恢复、可约束、可检查的系统能力。状态和存档点保证任务不中断即归零；错误处理防止失败累积；护栏和验证循环把模型行动放进可控边界。

### 脚手架与 Harness 厚度（Scaffolding / Harness Thickness）

- **context**：

“脚手架本身不盖房子” / “多少逻辑写死在系统里”

- **费曼一下**：脚手架比喻说明 Harness 是支撑模型行动的临时基础设施；Harness 厚度则说明架构师要分配系统确定性和模型自由度之间的责任。

### 概念网络（Concept Network）

![图片展示了Harness执行系统的核心内容。从提示词工程开始，经范围扩展至上下文工程，再经范围扩展至Harness工程，最终形成完整应用架构。Harness执行系统包含模型能力、Agent行为、循环与工具、记忆与状态、上下文治理、错误、安全与验证等部分。该图与上下文紧密相关，直观呈现了Harness执行系统各组成部分及其关系，是对文档中概念网络主干逻辑链的可视化呈现。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MWU0NGE0YjQyYjAyMDJmZDU1ZDM5MmM1MDEzZmI4NTBfM2UxYTJiNzMxMjE1ZWY2OTZjNmJmNzUxZTUwM2RhN2JfSUQ6NzY3MTAwODAwODQ5NDY0ODUzMV8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

**底层框架**：本文的底层框架是“模型能力 × Harness 执行系统 = Agent 行为”。裸模型只是推理核心，Harness 才把推理组织成可控、可恢复、可验证的行动。

**主干逻辑链**：

- Agent Harness + AI Agent + 非模型架构 → 区分用户看到的行为实体和背后真正产生行为的软件系统。
- LLM-as-CPU / Harness-as-OS → 解释为什么裸模型需要操作系统式的外部架构。
- Prompt engineering → Context engineering → Harness engineering → 工程范围从指令、视野扩展到完整应用系统。
- 编排循环 + 笨循环 + 工具 + MCP → 形成“思考、行动、观察”的执行闭环。
- 记忆 + 记忆即提示 → 让 Agent 能延续任务，但又不把历史线索误当作事实。
- 上下文腐烂 + 迷失在中间 → 推出压缩、观察掩码和即时检索这些上下文治理策略。
- 执行可靠性机制 → 把状态、错误、安全和验证合并成生产级 Agent 的稳定性基础。
- 脚手架与 Harness 厚度 → 说明 Harness 会随着模型增强而变薄，但不会完全消失。

**辅助逻辑链**：

- Anthropic、OpenAI、LangGraph、CrewAI、AutoGen 的不同实现，都是同一套 Harness 骨架的不同工程表达。
- TerminalBench 表现变化说明，Agent 产品差异可以来自 Harness，而不只是模型本体。

**一句话总结概念网络**：

Agent Harness 把无状态的语言模型嵌入循环、工具、记忆、上下文治理、执行可靠性和安全验证体系中，使模型从“会说”变成“能在边界内做事”。

HOWIE 原清单 · 26

# Harness Engineering vs Agentic Engineering：两种工程范式的概念辨析

**内容说明：**区分 Harness Engineering 与 Agentic Engineering 两种工程范式的核心差异，厘清 Agent 时代的工程方法论边界。

**策展人按：**这条管划界。两个词长得像、经常混着用，值得花五分钟弄清各自管什么。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：Harness Engineering vs Agentic Engineering：概念辨析
- 作者：howie.serious
- 内参日期：2026-03-27
- 原文：n/a
- 标签：agents, agentic engineering

区分 Harness Engineering 与 Agentic Engineering 两种工程范式的核心差异，厘清 Agent 时代的工程方法论边界。

## 导读

来自 Claude Opus 对话，只为一个概念：Harness Engineering。

## 核心命题

- Agentic Engineering 与 Harness Engineering 是 2026 年初几乎同时火起来的两个概念，容易混淆但指向**完全不同的抽象层级**
- Agentic Engineering（智能体工程）回答的是：**「人类如何与 AI Agent 协作来做软件开发？」**——描述的是一种**工作方式（practice）**
- Harness Engineering（驾具工程）回答的是：**「如何设计让 Agent 可靠运行的环境和基础设施？」**——描述的是一种**系统设计学科（discipline）**
- 核心比喻：Agentic Engineering 是说「我们现在骑马出行了，不再步行」；Harness Engineering 是说「马鞍、缰绳、马蹬怎么设计，马才不会把你甩下去」

## Agentic Engineering 详解

- **Simon Willison** 定义：在编码 Agent 的辅助下开发软件的实践（Claude Code、OpenAI Codex、Gemini CLI 等）
- **Karpathy** 认为行业已超越 vibe coding 阶段，走向更结构化的方向：「Agent 编排写代码，人类开发者监督和验证输出」
- 核心关切是**角色转换**——工程师从创造者（creator）变为策展人（curator）
- 花更少时间写基础代码
- 花更多时间编排 AI Agent 组合、定义目标和护栏、验证输出
- 核心技能从语法变成系统思维

## Harness Engineering 详解

- 不关心「人类该怎么跟 Agent 合作」这个工作流问题
- 关心的是：如何设计**约束、工具链、反馈循环、文档系统和生命周期管理**，使 Agent 在数千次迭代中始终产出正确、可审计、可恢复、可扩展的工作
- **LangChain 的经验**最能说明问题：编码 Agent 在 Terminal Bench 2.0 上从 Top 30 跃升到 Top 5——**没换模型，只改了 Harness**
- 产出包括：Linter、[AGENTS.md](http://agents.md/)、CI 管道、skill 系统

## 层级关系：两种视角

- **视角 A**：Agentic Engineering 是上层大伞，Harness Engineering 是子集
- Simon Willison 把 harness 看作 agentic engineering 实践中的一部分
- 「LLM 不会从过去的错误中学习，但编码 Agent 可以——前提是我们刻意更新指令和工具 harness 来适应所学」
- **视角 B**：Harness Engineering 是底层基础设施，Agentic Engineering 是上层工作流
- 编排是操作的大脑，harness 是手和基础设施
- Harness 是地基，Agentic Engineering 的所有上层实践都建立在 Harness 提供的可靠性之上
- 作者倾向**视角 B**：你可以在几周内微调出有竞争力的模型，但构建生产级的 Harness 需要几个月甚至几年。**Harness 是护城河，Agentic Engineering 是护城河之上的城堡。**

## 对比表

| 维度 | Agentic Engineering | Harness Engineering |

| --- | --- | --- |

| 核心问题 | 人如何与 Agent 协作？ | Agent 的运行环境怎么设计？ |

| 命名者 | Andrej Karpathy (2026.01) | Mitchell Hashimoto (2026.02) |

| 对比对象 | Vibe Coding（随性编码） | Prompt/Context Engineering |

| 抽象层 | 工作流与角色定义 | 系统架构与基础设施 |

| 关注点 | 委派、审查、所有权 | 约束、反馈循环、可观测性 |

| 产出 | 流程、团队模式、最佳实践 | Linter、\[AGENTS.md\](http://agents.md/)、CI 管道、skill 系统 |

| 隐喻 | 「你是管理者，Agent 是团队」 | 「模型是马，Harness 是缰绳」 |

## Bitter Lesson 的张力

- **Noam Brown 的反论**：人们在推理模型之上构建脚手架，但这些脚手架最终可能会被更强大的模型取代（经典的苦涩教训论点）
- **作者的反驳**：Harness 不只是弥补模型缺陷，它也在做**治理（governance）**——权限控制、审计追踪、合规性验证。模型能力越强、自主性越高，这些需求反而**更加重要**

## 实践映射

- 设计多 Agent 架构的角色分工和工作流 → **Agentic Engineering**
- 配置 skill 系统、[MEMORY.md](http://memory.md/)、Heartbeat 机制、接口 → **Harness Engineering**
- 最简类比：**Agentic Engineering 是管理学（如何带团队），Harness Engineering 是工程学（如何造工厂）**
- 结论：你需要两者，但如果工厂地基没打好，管理再好也出不了合格的产品

## 概念网络

### 核心概念解析 (Core Concepts)

- **【Harness Engineering】（驾具工程）**
- **context**：

Harness Engineering 聚焦的完全是另一个问题。它不关心「人类该怎么跟 Agent 合作」这个工作流问题，它关心的是：如何设计约束、工具链、反馈循环、文档系统和生命周期管理，使得 Agent 在数千次迭代中始终产出正确、可审计、可恢复、可扩展的工作。

- **费曼一下**：Harness 本意是「马具/缰绳」。Harness Engineering 就是给 AI Agent 设计「缰绳」的工程学科——不是教你怎么骑马，而是怎么造出一套让马不会失控的装备。由 Mitchell Hashimoto（2026.02）命名，对标 Prompt/Context Engineering，但抽象层级更高：从「单次调用优化」升级到「系统级运行环境设计」。产出包括 Linter、[AGENTS.md](http://agents.md/)、CI 管道、skill 系统等基础设施。
- **【Agentic Engineering】（智能体工程）**
- **context**：

Agentic Engineering 回答的是一个工作流层面的问题：人类如何与 AI Agent 协作来做软件开发？它描述的是一种工作方式（practice），而非一门工程学科。

- **费曼一下**：Agentic Engineering 是「骑马出行」这件事本身。由 Andrej Karpathy（2026.01）命名，对标的是 Vibe Coding。核心变化是工程师的角色从「写代码的人」变成「编排 Agent 组合、定义目标和护栏、审查输出的人」——从 creator 变为 curator。它关注的是委派、审查、所有权等工作流问题。
- **【Harness】（驾具）**
- **context**：

LangChain 的编码 Agent 在 Terminal Bench 2.0 上从 Top 30 跃升到 Top 5——没换模型，只改了 Harness。

- **费曼一下**：具体指 Agent 的运行环境和约束装置的总称——包括 Linter、[AGENTS.md](http://agents.md/)、CI 管道、skill 系统、反馈循环、工具链等一切「让模型产出可靠工作」的基础设施。类比马具之于马：模型是马，Harness 是缰绳。它是 Harness Engineering 的核心产出物。
- **【Vibe Coding】（随性编码）**
- **context**：

Karpathy 认为行业已经超越了 Vibe Coding 阶段，走向了更结构化的方向。

- **费曼一下**：“跟着感觉走”式的编程——把需求抛给 AI，不统规划、不结构化、不严格审查。是 Agentic Engineering 的前一个阶段，Karpathy 以它为对标来定义 Agentic Engineering 的进化方向。
- **【Bitter Lesson】（苦涩教训）**
- **context**：

Noam Brown 的反论：人们在推理模型之上构建脚手架，但这些脚手架最终可能会被更强大的模型取代。

- **费曼一下**：Rich Sutton 提出的经典论点：长期看，通用的计算力扩展总是胜过人类工程师手工设计的巧妙方案。在本文语境下，Noam Brown 用它来质疑 Harness Engineering 的长期价值——但作者反驳：Harness 不只是弥补模型缺陷，它还做治理（权限、审计、合规），模型越强这些反而越重要。
- **【Creator → Curator 角色转换】**
- **context**：

工程师的角色从「创造者」变成了「策展人」——花更少时间写基础代码，花更多时间编排 AI Agent 组合、定义目标和护栏、验证输出。

- **费曼一下**：Agentic Engineering 范式下工程师身份的根本变化。以前你是亲手写代码的匠人，现在你是管理一群 Agent 的编排者——核心技能从「语法」变成「系统思维」。

### 概念网络 (Concept Network)

![图片为Harness Engineering与Agentic Engineering概念网络图。图中以箭头和文字说明两者关系，如Agentic Engineering关注工作流与角色，Harness Engineering关注基础设施与系统设计等。还展示了进化关系，如Vibe Coding→Agentic Engineering，Prompt Engineering→Harness Engineering。图中还呈现了Harness工程的约束、工具链、文档与生命周期等内容，以及模型越强越重要的观点。该图是对文档中Harness Engineering与Agentic Engineering关系的可视化呈现。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MjI5OTNiYWVkZmMwOGNjOGRjODU0MWVjZTI3MGFiMTZfYzg2ZDNjOGUxODhhMmFiNDgwOTEyMzcxNTExN2ZlZWFfSUQ6NzY3MTAwODAwNjk3MjE4MTcyNl8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

- **对立关系**：Agentic Engineering ↔ Harness Engineering——同一时代背景下的两种工程视角，前者关注工作流与角色，后者关注基础设施与系统设计
- **进化关系**：Vibe Coding → Agentic Engineering——从随性编码走向结构化协作，Karpathy 定义的进化路径
- **进化关系**：Prompt Engineering → Harness Engineering——从单次调用优化到系统级运行环境设计，Mitchell Hashimoto 定义的抽象跃迁
- **包含关系**：Harness 是 Harness Engineering 的核心产出物，包括 Linter、[AGENTS.md](http://agents.md/)、CI 管道、skill 系统等具体工具
- **伴生关系**：Creator → Curator 角色转换是 Agentic Engineering 范式的直接后果
- **张力关系**：Bitter Lesson 质疑 Harness Engineering 的长期价值，但作者用「治理」角度反驳——模型越强，缰绳越重要
- **层级关系**：作者倾向 Harness Engineering 是地基，Agentic Engineering 是上层建筑——「Harness 是护城河，Agentic Engineering 是护城河之上的城堡」

HOWIE 原清单 · 27

# The Anatomy of an Agent Harness

**内容说明：**TerminalBench 证据：仅改 harness 就能让同一模型的 agent 排名移动 20+ 位——harness 而非模型才是真正的硬工程所在。

**策展人按：**清单叫「harness ＞ model」，而这条是唯一带跑分的。它落在倒数第二位，纯属清单是长出来的、不是设计出来的。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：The Anatomy of an Agent Harness
- 作者：Akshay 🚀
- 内参日期：2026-04-20
- 来源类型：twitter
- 原文：https://x.com/akshay_pachaar/status/2041146899319971922
- 标签：agents, harness engineering, agent 元技能

TerminalBench 证据：仅改 harness 就能让同一模型的 agent 排名移动 20+ 位——harness 而非模型才是真正的硬工程所在。

## 导读

agent harness

## 核心论点

- 不是你的模型不行，而是模型周围的一切不行。决定 agent 生产级表现的，不是模型本身，而是包裹模型的整个 **harness（马具 / 脚手架）**。
- **TerminalBench 的硬证据**：仅仅更换 harness，就能让同一个 LLM 从榜单之外跃升到 rank 5——**harness 而非模型，才是硬工程真正所在**。

## 什么是 Agent Harness

- **定义**：包裹 LLM 的全部软件基础设施——orchestration loop、tools、memory、context management、state persistence、error handling、guardrails。
- **术语正式化于 2026 年初，但概念早已存在**
- Anthropic：Claude Agent SDK 就是 "the agent harness that powers Claude Code"
- OpenAI Codex 团队明确把 "agent" 等同于 "harness"，指让 LLM 好用的**非模型基础设施**
- **LangChain Vivek Trivedy 的公式**："If you're not the model, you're the harness."
- **agent vs harness 的关键区分**
- **agent** = 涌现行为（用户看到的那个目标导向、会用工具、能自我纠错的实体）
- **harness** = 产生这个行为的机器
- "我搭了个 agent" 本质是 "我搭了个 harness，对准一个模型"

## 冯·诺依曼式的 OS 类比（Beren Millidge, 2023）

- 原始 LLM = 没有 RAM、磁盘、I/O 的 CPU
- context window = RAM（快但小）
- 外部数据库 = 磁盘（大但慢）
- 工具集成 = 设备驱动
- **harness = 操作系统**
- "We have reinvented the Von Neumann architecture"——这是任何计算系统的自然抽象

## 三层工程（Three Levels of Engineering）

- **Prompt engineering**：打磨给模型的指令
- **Context engineering**：管理模型看到什么、何时看到
- **Harness engineering**：囊括以上两者，加上整个应用基础设施——tool orchestration、state persistence、error recovery、verification loops、safety enforcement、lifecycle management
- 一句话：harness 不是 "包在 prompt 外的壳"，而是让自主 agent 行为成为可能的**完整系统**

## 生产级 harness 的 12 个组件

- **Orchestration Loop（编排循环）**：心跳，实现 TAO（Thought-Action-Observation）即 ReAct 循环。Anthropic 称自己的 runtime 为 "dumb loop"——智能都在模型里，harness 只管轮次。
- **Tools（工具）**：agent 的手，以 schema 形式注入 LLM context。Claude Code 分六类：文件操作、搜索、执行、网络访问、代码智能、sub-agent spawning。
- **Memory（记忆）**：多时间尺度
- 短期：单会话对话历史
- 长期：跨会话持久化（Anthropic 用 [CLAUDE.md](http://claude.md/) + [MEMORY.md](http://memory.md/)；LangGraph 用 namespace 化 JSON Stores；OpenAI 用 SQLite/Redis Sessions）
- Claude Code 三层分级：轻量索引（\~150 字符/条常驻）→ 按需详细主题文件 → 原始 transcript 仅通过搜索访问
- **关键原则**：agent 把自己的 memory 当 "hint"，行动前必须对照实际状态验证
- **Context Management**：很多 agent 就死在这里
- 核心问题 **context rot**：关键内容落在窗口中段时，模型性能下降 30%+（Chroma 研究 + Stanford "Lost in the Middle"）
- million-token 窗口也会随着 context 变长，指令跟随能力下降
- 生产策略：compaction、observation masking、just-in-time retrieval、sub-agent delegation
- Anthropic 的目标："smallest possible set of high-signal tokens"——最小但高信号的 token 集合
- **Prompt Construction**：分层装配——system prompt + 工具定义 + memory 文件 + 对话历史 + 当前用户消息
- OpenAI Codex 严格优先级栈：server system message ＞ 工具定义 ＞ 开发者指令 ＞ 用户指令（级联 [AGENTS.md](http://agents.md/)，32 KiB 上限）＞ 对话历史
- **Output Parsing**：现代 harness 用 native tool calling（返回结构化 tool_calls 对象）而非解析 free-text。有 tool call 就执行并继续循环；没有就是最终答案。
- **State Management**
- LangGraph：类型字典在图节点间流转，reducer 合并更新，super-step 边界 checkpoint，支持中断恢复 + 时间旅行调试
- OpenAI 四选一：application memory / SDK sessions / Conversations API / previous_response_id chaining
- Claude Code：**git commits 作为 checkpoint，progress 文件作为结构化 scratchpad**
- **Error Handling**：错误会复利式放大——99% 单步成功率 × 10 步 = 90.4% 端到端成功率
- LangGraph 区分四类错误：transient（退避重试）、LLM-recoverable（把 error 作为 ToolMessage 让模型调整）、user-fixable（中断请求人类输入）、unexpected（上抛调试）
- Stripe 生产 harness 重试上限 = 2
- **Guardrails and Safety**
- OpenAI 三级：input guardrails、output guardrails、tool guardrails。tripwire 触发立即停机。
- Anthropic 把权限执法与模型推理**在架构上分开**——模型决定尝试什么，工具系统决定允许什么。Claude Code 独立管理 \~40 个工具能力：项目加载时建立信任 → 每次工具调用前权限检查 → 高危操作显式用户确认
- **Verification Loops**：区分玩具 demo 与生产级 agent 的关键
- 三种方式：rules-based（测试/lint/类型检查）、visual（Playwright 截图）、LLM-as-judge
- Boris Cherny（Claude Code 作者）：**给模型一个验证自己工作的方式，质量提升 2-3 倍**
- **Subagent Orchestration**
- Claude Code 三种执行模型：Fork（父 context 字节级副本）、Teammate（独立终端面板 + 文件邮箱）、Worktree（独立 git worktree，按 agent 隔离分支）
- OpenAI：agents-as-tools（专家处理有边界的子任务）与 handoffs（专家全权接管）
- LangGraph：子 agent = 嵌套状态图
- （原文 12 个组件，上文列出 11 个；第 12 项对应的是 Lifecycle / 整体治理层——由上述各部件共同构成，落在文末的架构选择里展开）

## 循环的实战：7 步 walkthrough

- **Prompt Assembly**：装配完整输入，重要 context 放首尾（Lost in the Middle）
- **LLM Inference**：调模型 API
- **Output Classification**：无 tool call → 结束；有 tool call → 执行；handoff → 切换 agent 重启
- **Tool Execution**：校验参数、检查权限、沙盒执行；只读可并发，可变串行
- **Result Packaging**：格式化为 LLM 可读消息；错误作为 error result 返回以便自纠
- **Context Update**：追加到历史；逼近窗口上限时触发 compaction
- **Loop**：回到 Step 1，重复直到终止
- **终止条件（分层）**：模型无 tool call 的回复 / 超轮次上限 / token 预算耗尽 / guardrail tripwire / 用户中断 / 安全拒答
- **跨 context window 的长任务：Ralph Loop 双阶段模式（Anthropic）**
- **Initializer Agent**：初始化环境（init 脚本、progress 文件、feature 清单、初始 git commit）
- **Coding Agent**：后续每个 session 先读 git log 和 progress 文件回忆自己干到哪，选最高优先级未完成 feature，干活 → commit → 写摘要
- **文件系统提供跨 context window 的连续性**

## 主流框架如何落地

- **Anthropic Claude Agent SDK**：一个 query() 函数暴露全部，返回 async iterator。runtime 是 "dumb loop"。Claude Code 用 **Gather-Act-Verify** 循环：查上下文 → 改文件跑命令 → 跑测试查输出，反复。
- **OpenAI Agents SDK**：Runner 类三种模式（async、sync、streamed）。**code-first**——workflow 用原生 Python 表达，不是 graph DSL。Codex harness 三层架构：Codex Core + App Server + 客户端（CLI/VS Code/web），共享同一 harness——这也解释了 "Codex 模型在 Codex surfaces 上表现比在通用 chat 里更好"。
- **LangGraph**：显式状态图。两节点（llm_call + tool_node）一条条件边。由 LangChain AgentExecutor（v0.2 弃用，因难扩展、缺多 agent 支持）演化而来。LangChain 的 **Deep Agents** 明确使用 "agent harness" 术语。
- **CrewAI**：基于角色的多 agent 架构——Agent（harness 包裹 LLM，由 role/goal/backstory/tools 定义）+ Task + Crew。Flows 层提供 "deterministic backbone with intelligence where it matters"。
- **AutoGen**（演化为 Microsoft Agent Framework）：对话驱动编排的开创者。三层架构（Core/AgentChat/Extensions），五种编排模式：sequential、concurrent（fan-out/fan-in）、group chat、handoff、**magentic**（manager agent 维护动态任务账本协调专家）

## 脚手架隐喻（Scaffolding Metaphor）——精确而非装饰

- 建筑脚手架是临时基础设施——它不做建造，但没它工人上不去
- **关键洞察：建完楼，脚手架就拆掉。** 模型越强，harness 复杂度应越小。Manus 六个月重写五次，每次都在**删**复杂度——复杂工具定义 → 通用 shell 执行；"管理 agent" → 简单结构化 handoff
- **Co-evolution Principle（协同进化原则）**：模型现在是带着特定 harness 一起 post-train 的。Claude Code 的模型就是用它的 harness 训出来的。换工具实现就会掉分——紧耦合。
- **"Future-proofing test"**：若模型升级后 harness 不需要加复杂度，性能就随之提升——那么设计是好的

## 每个 harness 架构师的 7 个决策

- **单 agent vs 多 agent**：Anthropic 和 OpenAI 都说——先把单 agent 用到极致。多 agent 带路由开销、handoff 会丢 context。只有工具过载 ＞ \~10 个重叠工具、或任务域明显分离时才拆。
- **ReAct vs plan-and-execute**：ReAct 每步都交织推理与行动（灵活但单步贵）；plan-and-execute 分开。LLMCompiler 比顺序 ReAct 快 **3.6x**。
- **Context window 管理策略**：时间清理 / 对话摘要 / observation masking / 结构化笔记 / 子 agent 委派。ACON 研究：**token 减 26–54%，准确率保持 95%+**——优先保留推理轨迹而非原始工具输出。
- **验证循环设计**：computational verification（测试、lint）给确定性 ground truth；inferential verification（LLM-as-judge）抓语义但加延迟。Martin Fowler Thoughtworks 团队的框架：**guides（feedforward，行动前引导）vs sensors（feedback，行动后观察）**。
- **权限与安全架构**：Permissive（快但险）vs Restrictive（安全但慢）。选择取决于部署场景。
- **工具范围策略**：工具越多往往性能越差。Vercel 从 v0 砍掉 **80% 工具**反而更好。Claude Code 靠 lazy loading 做到 **95% context 削减**。原则：只暴露当前步骤最小必要工具集。
- **Harness 厚度（Harness Thickness）**：多少逻辑放 harness、多少交给模型。Anthropic 押注薄 harness + 模型升级；图式框架押注显式控制。Anthropic 会随新模型版本内化规划能力，**主动从 Claude Code 的 harness 中删除规划步骤**。

## Harness 就是产品（The Harness Is the Product）

- 同一个模型，不同 harness 设计，可以产生截然不同的表现。TerminalBench 证据清楚：**仅换 harness，agent 在排行榜上移动 20+ 位**。
- harness 不是已解决的问题，也不是 commodity 层——硬工程都在这里：把 context 当稀缺资源管理、设计能在错误复利前抓住它们的验证循环、搭既提供连续性又不幻觉的记忆系统、在 "造多少脚手架 vs 留多少给模型" 之间下架构赌注
- 趋势：随模型变强，harness 在变薄。但不会消失——最强的模型也需要东西去管它的 context、执行它的 tool call、持久化它的状态、验证它的工作

## 结语

- The next time your agent fails, don't blame the model. Look at the harness.

## 概念网络

### 核心概念解析（Core Concepts）

- **Agent Harness（代理马具 / 智能体脚手架）**
- **context**：The harness is the complete software infrastructure wrapping an LLM: orchestration loop, tools, memory, context management, state persistence, error handling, and guardrails. LangChain Vivek Trivedy: "If you're not the model, you're the harness."
- **费曼一下**：把 LLM 想成一个关在黑箱里会说话的大脑。harness 就是给这个大脑装上的**手**（工具）、**耳朵**（context 管理）、**记忆体**（memory）、**神经系统**（编排循环）、**安全带**（guardrails）。没它，模型只是个会做梦的脑子；有它，才成为能在现实世界里推进任务的 agent。
- **Agent vs Harness（agent 与 harness 的区分）**
- **context**：The "agent" is the emergent behavior: the goal-directed, tool-using, self-correcting entity the user interacts with. The harness is the machinery producing that behavior.
- **费曼一下**：**agent 是台前**——用户看到的那个会干活的智能体；**harness 是台后**——让那个智能体能干活的那套机器。说 "我做了个 agent" 本质是 "我造了个 harness，把它对准了一个模型"。
- **Harness Engineering（马具工程）**
- **context**：Harness engineering encompasses both (prompt + context engineering), plus the entire application infrastructure: tool orchestration, state persistence, error recovery, verification loops, safety enforcement, and lifecycle management.
- **费曼一下**：Prompt engineering 管 "怎么跟模型说话"，context engineering 管 "给模型看什么"，harness engineering 管 "让整个 agent 能在生产环境里不崩"。是包在 prompt 和 context 之外的最外层工程学科——也是 agentic AI 时代真正的硬工程所在。
- **Orchestration Loop / TAO Cycle / ReAct Loop（编排循环）**
- **context**：This is the heartbeat. It implements the Thought-Action-Observation (TAO) cycle, also called the ReAct loop. Mechanically, it's often just a while loop. Anthropic describes their runtime as a "dumb loop" where all intelligence lives in the model.
- **费曼一下**：agent 的心跳。一个 while 循环不断跑：装配 prompt → 调模型 → 解析输出 → 执行工具 → 把结果塞回去 → 再来一遍。循环本身是 "dumb" 的——智能全在模型里，循环只管 "下一轮"。
- **Context Rot（上下文腐烂）**
- **context**：Model performance degrades 30%+ when key content falls in mid-window positions (Chroma research, corroborated by Stanford's "Lost in the Middle" finding). Even million-token windows suffer from instruction-following degradation as context grows.
- **费曼一下**：给模型喂越多 token，它反而越容易忘关键的。信息放中间位置更是灾难。million-token context window 不是魔法——它只是个更大的、同样会腐烂的容器。所以 context 必须当稀缺资源管理，不是 "越大越好"。
- **Lost in the Middle**
- **context**：Important context is positioned at the beginning and end of the prompt (the "Lost in the Middle" finding).
- **费曼一下**：大模型对 context 首尾比对中段记得更牢。所以工程上的铁律：**关键信息永远放 prompt 的开头或结尾**，中间是记忆盲区。
- **Scaffolding Metaphor（脚手架隐喻）**
- **context**：The scaffolding metaphor isn't decorative. It's precise. Construction scaffolding is temporary infrastructure that enables workers to build a structure they couldn't reach otherwise. **The key insight: scaffolding is removed when the building is complete.**
- **费曼一下**：harness 是**临时的**。模型越强，需要的 harness 越薄。Manus 六个月重写五次，每次都在删复杂度。好的 harness 设计不是越长越胖——模型升级后，它该**消失一部分**，不是越堆越多。
- **Co-evolution Principle（协同进化原则）**
- **context**：Models are now post-trained with specific harnesses in the loop. Claude Code's model learned to use the specific harness it was trained with. Changing tool implementations can degrade performance because of this tight coupling.
- **费曼一下**：模型和 harness 不是分开造出来再拼在一起的——它们是**一起训练**出来的。Claude Code 的模型知道怎么用 Claude Code 的 harness，换个 harness 就掉分。这也是为什么 "Codex 模型在 Codex surfaces 上表现更好"。
- **Ralph Loop（双阶段长任务模式）**
- **context**：For long-running tasks spanning multiple context windows, Anthropic developed a two-phase "Ralph Loop" pattern: an Initializer Agent sets up the environment, then a Coding Agent in every subsequent session reads git logs and progress files to orient itself.
- **费曼一下**：任务太长，一个 context window 装不下怎么办？把工作成果写到磁盘上（git commit + progress 文件），每开一个新会话就让 agent 先读这些文件 "回忆" 自己上次干到哪了——**用文件系统做跨会话的记忆**。
- **Verification Loop（验证循环）**
- **context**：Boris Cherny, creator of Claude Code, noted that giving the model a way to verify its work improves quality by 2 to 3x.
- **费曼一下**：让 agent 自己检查自己干得对不对——跑测试、截图对比、请另一个 LLM 当 judge。这一步是 demo 和生产级 agent 的**分水岭**。
- **Gather-Act-Verify Cycle**
- **context**：Claude Code uses a Gather-Act-Verify cycle: gather context (search files, read code), take action (edit files, run commands), verify results (run tests, check output), repeat.
- **费曼一下**：ReAct 的一个具体变种——**先搜集情报，再动手，再复查**。顺序不能乱，复查不能省。这就是 Claude Code 跑得比其他 coding agent 稳的原因。
- **Harness Thickness（马具厚度）**
- **context**：Harness thickness. How much logic lives in the harness versus the model. Anthropic bets on thin harnesses and model improvement. Graph-based frameworks bet on explicit control.
- **费曼一下**：一个产品要把多少逻辑写在代码里（**厚 harness**），多少交给模型自己处理（**薄 harness**）？这是个哲学问题：相信模型会越来越强 → harness 越写越薄；相信确定性控制更重要 → harness 越写越厚。Anthropic 选前者，还会主动**删掉**老的规划步骤。
- **Context Management 四策略**
- **Compaction（压缩）**：context 逼近上限时，压缩旧对话历史。Claude Code 保留架构决策和未解决 bug，丢弃冗余工具输出。
- **Observation Masking（观察遮蔽）**：JetBrains Junie 藏起旧工具的输出，但保留工具调用可见。
- **Just-in-Time Retrieval（即时检索）**：只保留轻量标识符，需要时再动态加载数据。Claude Code 用 grep/glob/head/tail，而不是直接读整个文件。
- **Sub-agent Delegation（子 agent 委派）**：子 agent 去探索，只返回 1000–2000 token 的浓缩摘要。
- **费曼一下**：context 是稀缺资源，不是 "越大越好"。真正的 harness 工程是把 context 当内存管理——**该压就压，该藏就藏，该懒加载就懒加载**。
- **Von Neumann Architecture Analogy（冯·诺依曼架构类比）**
- **context**：A raw LLM is a CPU with no RAM, no disk, and no I/O. The context window serves as RAM. External databases function as disk storage. Tool integrations act as device drivers. The harness is the operating system. "We have reinvented the Von Neumann architecture."
- **费曼一下**：LLM = CPU，context window = RAM，外部数据库 = 磁盘，工具 = 设备驱动，**harness = 操作系统**。这不是比喻——是**同构**。我们又一次重新发明了计算机。
- **"If you're not the model, you're the harness."**
- **context**：LangChain Vivek Trivedy 的断言。
- **费曼一下**：agentic AI 世界里，万物二分。你做的要么是训练模型，要么是做 harness。**没有第三条路**。

### 概念网络（Concept Network）

![图片是关于生产级Harness骨架的结构图。上方是“上下文腐烂、中间遗失与错误复利”，下方有“玩具循环无法进入生产”“十二个组件”“收集—行动—验证与Ralph循环”“四种上下文管理策略”等。中间是“生产级Harness骨架”，其由“模型”“Agent行为”“脚手架与共同进化”“Harness厚薄”共同构成，还与“临时且随模型演进”“核心设计分歧”相关。该图与上下文介绍的生产级Harness骨架内容相呼应，直观呈现其构成及与各部分的关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Mzc1NjFkYjgxZmFlMjk0ZTM1YWU2NmZkYmVjZjI5ZDhfZGQ1NWMzNjBmMjc5YTUyZTlhODQ1NGRlMGIxMmQ0MzFfSUQ6NzY3MTAwODAxMDE3NjU4MDgxN18xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

- **一条主线**：agent = harness + model。全文所有概念都挂在这条主线上。
- **问题侧**：context rot + Lost in the Middle + errors compounding（10 × 99% = 90.4%）共同解释了——为什么一个 "加个 ReAct 循环" 的玩具 demo 进不了生产。
- **方案侧**：12 个组件 + Gather-Act-Verify + Ralph Loop + 4 种 context 管理策略，共同构成真正的生产级 harness 骨架。
- **原则侧**
- 冯·诺依曼类比 → 为什么需要 harness（LLM 本身只是 CPU）
- scaffolding metaphor + co-evolution principle → harness 是**临时的、与模型共同进化的**
- harness thickness → 设计 harness 的核心哲学分歧（厚 / 薄）
- **决策侧**：7 个决策把前面所有概念收拢成架构师的选择题——单/多 agent、ReAct/plan-and-execute、context 策略、验证设计、权限、工具范围、harness 厚度
- **结论侧**："harness 就是产品"——TerminalBench 上 "仅换 harness 移位 20+" 是全文论点的**数据锚点**。模型变强 → harness 变薄，但 harness 永远不会消失。

CODEX 补充推荐 · A2

# 只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍

**补充推荐词：**同一模型只开启“保留推理”和“上下文压缩”，ARC-AGI-3 成绩便提升近 3 倍，输出 token 还少了约 6 倍。它把 harness 如何改变能力表现，做成了一组可量化的对照。

**Codex 按：**清单叫「harness ＞ model」，但只有排名变化还不够。这篇把模型锁死，只动两个外壳设置：分数从 13.3% 到 38.3%，token 反而少了六倍。放在 TerminalBench 后面，算是给标题补上最硬的一锤。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：How enabling two settings tripled our scores on the ARC-AGI-3 benchmark
- 作者：OpenAI
- 内参日期：2026-07-31
- 来源类型：blog
- 原文：https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores
- 标签：OpenAI, context engineering, AGI

保留推理痕迹加上开启上下文压缩，两项配置让 GPT-5.6 在 ARC-AGI-3 上的分数翻了三倍，还更省。典型的调 harness 胜过换模型的案例。

## 导读

harness ＞model 的实例

## 核心观点

![图片展示了GPT-5.6 Sol在ARC-AGI-3公共数据集上的得分情况。横轴为每场游戏输出的token数量，纵轴为得分。蓝色实线表示保留推理和压缩的harness，其得分在不同token数量下显著高于绿色虚线代表的官方harness。在50万token时，保留推理和压缩的harness得分约为38%，而官方harness仅约13%。该图与上下文紧密相关，直观呈现了两种harness在基准测试中的表现差异。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWQzYmQyN2VmOWEyMWY2YWNjMmY4NjFkYjM2M2E1OGNfODg2MDFkOTEzZGZkNmNhYWZjMTQyY2FlMDI3NzZlOTdfSUQ6NzY3MTAwODAwOTUyMjI2OTQ1OV8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜两条设置曲线对比：保留推理加压缩的 harness 用不到 50 万 token 冲到 38%，官方 harness 花 6 倍 token 仅 13%* ｜ [原图](https://neican-res.candobear.com/article-images/ff567c759d307dda8cc173b89c1ce2d3b9508bdc5a8705908ea339c005f6e0bb.png)

- 基准测试很少孤立地衡量模型（Benchmarks rarely measure AI models in isolation）。它同时在衡量一捆不太可见的选择：API 设置、harness 设计和提示词。
- 在 ARC-AGI-3 上，OpenAI 把自己在 ChatGPT 和 Codex 里已经在用的两个 API 设置打开——保留推理（retained reasoning）与上下文压缩（compaction）——公开任务集上的成绩变成三倍，输出 token 少了 6 倍。
- 关键数字：官方 harness 下 GPT-5.6 Sol 得 13.3%，开启两项设置后得 38.3%；模型权重没有任何变化，变的只是模型之外的外壳。
- 由此得到的实践结论有两层：
- 做 API 开发要对齐生产环境的设置；
- 做模型比较要挑用了这些设置的 eval，因为它们更接近真实使用。

## 谜题：能证明数学猜想的模型，为什么玩不了 2D 拼图游戏

![图片展示了GPT-5.6 Sol在ARC-AGI-3基准测试中使用官方和自定义Harness尝试解决拼图游戏的对比。左侧为官方Harness，右侧为保留推理的自定义Harness。两者均显示42K token输出，官方Harness动作数14，自定义Harness动作数36。官方Harness仅过1关，自定义Harness已过2关。图片下方文字说明这是GPT-5.6 Sol尝试解决拼图游戏的加速视频，自定义Harness让其解决所有关卡。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzIwNDFiZGFkOWY1Y2NhNWYyYmE4NDg5ZDQyZTQ2N2JfMGI2N2FlNWEwODk4Njc3ZWQ5NzI5YjgyZTg5NDE5ZGRfSUQ6NzY3MTAwODAwNzU3NjE5NDI3OF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜同一模型双 harness 并排玩 ARC-AGI-3：同样 42K token，官方侧仅过 1 关，保留推理的 API 侧已过 2 关* ｜ [原图](https://neican-res.candobear.com/article-images/8a8410e5b238644baa1c6a33ad319bd3a8a21a03fb4ddeaa40cfc7ed59ab1a03.png)

- 起点是一次困惑（we were puzzled）：GPT-5.6 Sol 解决过 cycle double cover conjecture 这类长期未决的数学问题，也通关过 Pokémon FireRed，但在 ARC-AGI-3 这个 2D 拼图游戏基准上只拿到 7.8%，GPT-5.5 更是几乎玩不动，只有可怜的 0.4%。
- 摆在面前的是两个互斥假设：要么 2D 拼图游戏对这些模型格外困难，要么另有隐情（Or was something else going on?）。
- ARC-AGI-3 的设计意图是衡量 AI agent 的学习与推理能力：agent 探索陌生的 2D 游戏，在没有任何显式说明的情况下推断游戏机制；公开的 demo 游戏有 25 个。
- 评分口径是 RHAE（Relative Human Action Efficiency），一个把模型表现与人类基线相比的指标。基于官方人类测试日志，OpenAI 估计人类测试者的平均分约为 48%。
- 一个容易被忽略的约束：模型不会被告知自己将如何被评分，过程中也看不到自己的分数；每次动作只返回该帧的文本表示以及当前处于第几关。
- 官方演示视频里的对比更直观：在其中一个游戏的排行榜上，没有任何前沿模型能通过第一关；换成 OpenAI 的 Responses API harness，GPT-5.6 Sol 六关全通。

## harness 是隐形变量：通用 harness 与商用 harness 的分岔

- ARC-AGI-3 刻意使用一个通用（intentionally generic）harness，不带工具，也没有特殊功能。ARC 的理由很清楚：简单的 harness 会让模型的缺陷更可见，也让模型之间的比较更公平。
- 商业开发者的做法正好相反：他们围绕每个模型的特性和怪癖（each model's features and quirks）去优化 harness。这就是同一个模型在不同场景下表现割裂的根源。
- 佐证来自同一模型在其他游戏上的成绩：用纯视觉 harness 通关 Pokémon FireRed，用 Codex 的 computer use 打 Slay the Spire，还打通了 Baba Is You 的前几关。既然如此，ARC-AGI-3 到底哪里不一样（What was so different about ARC-AGI-3?）。
- 沿着 ARC 自己对 GPT-5.5 短板的分析往下看，OpenAI 检查了一批实际尝试记录，第一印象与 ARC 一致：模型看上去不太聪明，在每个动作上停留很久，难以推进。
- 但再往深看，结论翻转：模型的大部分困惑并非模型本身固有，而是来自 harness 的设置（not inherent to the model itself, but due to settings in the harness）。

![图片展示的是Ethan Mollick在Twitter上分享的内容。他提到自己给GPT-5.6 Sol在Codex中控制电脑，让它赢得游戏《杀戮尖塔2》每日挑战（随机因素，不能作弊）。该挑战持续5小时，涉及复杂游戏决策，最终成功通关。图片右侧是游戏界面，显示角色在战斗场景中。此内容与文档中关于AI在游戏挑战中的表现相关，展示了AI在游戏中的应用成果。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmRiY2M5MDUzMmI1MDJmZWU0NDYwYWY5ODk3ZjljZTZfNjk3NGEyM2QxOTg3YTllYjk4MWMxNDBlMTU3NmM5YWJfSUQ6NzY3MTAwODAwOTc5OTA5MzIxMF8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜Codex 中连跑 5 小时、自动压缩上下文，通关杀戮尖塔 2 每日挑战的界面证据* ｜ [原图](https://neican-res.candobear.com/article-images/9dcb2d3efc5481fea647692af29f9c7eab6ccb83ce548451faecf1b0125ad793.webp)

## 两处 harness 设定如何让模型「失忆」

- 第一处：每次游戏动作之后，全部私有推理都被丢弃。这意味着每走一步，GPT-5.6 Sol 都要从头重新弄懂这个游戏（asked to figure out the game anew）。
- 它并非什么都看不到——过去的动作记录和简短的随附笔记还在，但导致这些动作的计划、洞察和思路（the plans, insights, or thoughts）全部消失。
- 第二处：harness 使用滚动截断窗口（rolling truncation window），随着历史增长，较早的动作会变得不可见。于是模型不仅忘掉了自己的思考，连自己做过什么也在逐步丢失。
- 两者叠加，解释了模型为什么难以随时间学习：丢弃推理和滚动截断这两个特性，共同制造了一个每一步都被重置的学习者。

## 修复：让模型记得自己做过什么

![图片展示了GPT-5.6在长任务推理中的机制。左侧为用户提示，包含推理、工具调用、结果及推理等环节。中间和右侧为压缩摘要，推理链不断裂，直到给出最终答案。箭头表示推理链的传递，底部有“COMPACTION LIMIT”标识。该图与上下文紧密相关，直观呈现了GPT-5.6在触及压缩上限时，将已有推理压成摘要接续，推理链不断裂直至给出最终答案的推理过程。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWI4N2FlNjRiNGI0NmUwYTNiYzVkYjRkZmMzNGNjYTlfZmQyNmU4Nzc1NWM0Yzk2NTI1MmZkOGVkZDFkMGMzYzBfSUQ6NzY3MTAwODAwOTI2MjIzODk0NV8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜长任务推理机制：触及压缩上限时把已有推理压成摘要接续，推理链不断裂直到给出最终答案* ｜ [原图](https://neican-res.candobear.com/article-images/19af068485844c89e1417dfbb0dd8b2cd28feaa8c04cd9488f0c8f475d2127b6.png)

- 修复的思路来自训练与部署的一致性。OpenAI 的模型被训练成在输出回复或工具调用之前先用私有推理消息思考，而这些思考消息会作为对话历史的一部分被保留；对话过长时就做摘要再继续。ChatGPT 和 Codex 就是这样部署的。
- 具体做法是用 Responses API 重新实现 ARC-AGI-3 的 harness，让评测环境贴近生产环境。对 GPT-5.6 来说，只要传入上一条 response 的 ID，跨工具调用和跨轮次的推理就会被自动保留。
- 保留推理带来两个变化：
- 每个动作之前的思考时间变短了，因为模型不再需要每一轮都从零解读游戏。
- 能记住过去的想法之后，模型明显更擅长随时间学习，也更能采用连贯的策略（employing coherent strategies）。
- 第二步改进是用 compaction 替换滚动截断。官方 harness 处理上下文上限的方式是：当对话上下文超过 175,000 字符时，丢弃最旧的消息。
- 滚动截断有两个弊端：
- 模型丢失了更早的观察与动作。
- 模型在任务的大部分时间里都运行在一个更满的上下文窗口下，而这会轻微损害表现。
- 启用 compaction 之后，GPT-5.6 Sol 能在更长的运行中更好地保住它对每个游戏学到的东西，用更少的输出 token 拿到更高的分数。
- 合计效果：保留推理加上 compaction，让 GPT-5.6 Sol（max）拿到大约 3 倍的分数和 6 倍更少的输出 token。
- 一个实现细节值得留意：OpenAI 的实现用的是 175,000 token 而非 175,000 字符，但两者结果相当接近——因为文本绝大部分是动作网格，在其分词器下按 1:1 的比例被切分。

## 结论与建议

- 作者把这次实验定位成一个提醒：eval 很少孤立地衡量模型，它同时衡量一捆不太可见的选择。而且这不是第一次——此前也出现过公开基准低分、回头发现 eval runner 用了会丢弃推理消息的通用 harness 的情况。
- 给追求性能的 API 开发者的三条建议，就是 OpenAI 自己产品里在用的设置：
- 用 Responses API，不要用 legacy 的 Chat Completions API。
- 保留推理。
- 使用 compaction。
- 给做模型比较的人的建议：依赖那些采用上述设置的 eval，因为它们最贴近 ChatGPT 和 Codex 里的真实使用。
- 结尾保留了对 ARC 的致谢：感谢他们多年来在 AGI 评估上的创造性工作，也感谢正是他们的分析促成了这次深挖。文章同时邀请读者自己去玩公开游戏，亲自和前沿模型比一比。
- 作者：Ilan Bigio、Ted Sanders；发表于 2026 年 7 月 29 日。

## 概念网络

### 关键概念

### harness（智能体外壳）

**context**：文中反复出现的核心变量。ARC-AGI-3 使用 intentionally generic harness，商业开发者则为每个模型的 features and quirks 优化 harness。整篇文章的发现可以概括为：模型的大部分困惑「not inherent to the model itself, but due to settings in the harness」。

**费曼一下**：harness 是包在模型外面的那层跑腿程序——它决定模型每一轮能看到什么、记住什么、能调用什么工具、上下文满了怎么办。模型是发动机，harness 是变速箱和底盘；同一台发动机装在两台车上，跑出来的圈速可以差三倍。

### 基准测试的捆绑测量性

**context**：全文的主命题，开头和结尾各说一次：「Benchmarks rarely measure AI models in isolation. They also measure less visible choices about API settings, harness design, and prompting.」

**费曼一下**：你以为分数是模型的体检报告，其实它是模型加上一整套工程默认值的联考成绩。想从分数里读出模型能力，必须先知道监考规则；否则你比较的可能只是两套脚手架。

### 保留推理（retained reasoning）

**context**：两个被打开的 API 设置之一。原 harness 在每次动作后丢弃全部私有推理，模型只能看到过去的动作记录，看不到「the plans, insights, or thoughts that led to them」；在 Responses API 中传入上一条 response ID 即可跨工具调用与轮次自动保留。

**费曼一下**：让模型把自己的草稿纸留在桌上，而不是每做完一步就撕掉。有草稿在，它不必重新推导已经想明白的事，因此反而想得更少、走得更快。

### 上下文压缩（compaction）

**context**：另一个被打开的设置，用来替换 harness 原有的滚动截断。启用后模型「better able to preserve what it had learned about each game across longer runs」，分数更高且输出 token 更少。

**费曼一下**：上下文快满时，不是把最老的记录扔掉，而是把它们浓缩成摘要留下。相当于把厚厚一叠会议记录压成一页纪要——占地小了，结论还在。

### 滚动截断（rolling truncation）

**context**：官方 harness 的上下文管理方式，超过 175,000 字符就丢弃最旧的消息。文中列出两个弊端：丢失更早的观察与动作，以及大部分时间运行在更满的上下文窗口下从而轻微损害表现。

**费曼一下**：像一条只能记住最近几步的传送带，旧的东西自动掉出去。你不会收到任何提示，只会发现自己反复回到同一个死胡同。

### 跨轮次记忆与连贯策略

**context**：修复带来的实质收益。保留推理之后，模型「much better at learning over time and employing coherent strategies」；两处失忆叠加则解释了它此前为何难以随时间学习。

**费曼一下**：能不能把每一步的经验累积成一套打法，是探索型任务的胜负手。没有记忆，模型只是在做一串互不相关的单步决策；有了记忆，这些决策才连成策略。

### RHAE（相对人类动作效率）

**context**：ARC-AGI-3 的评分指标，把模型表现与人类基线相比。基于官方人类测试日志，OpenAI 估计人类测试者平均约 48%，而 GPT-5.6 Sol 在两项设置开启后为 38.3%。

**费曼一下**：它不看你最终有没有通关，而看你用多少动作达成目标，再跟人类比。分数低可能不是因为不会玩，而是因为绕的弯太多。

### Responses API 与生产设置对齐

**context**：修复的实现路径。OpenAI 用 Responses API 重新实现 harness，理由是「To better match our production setup」；最终建议开发者用 Responses API 而非 legacy Chat Completions API。

**费曼一下**：把评测环境改造成和产品线上一模一样，再去量成绩。你想知道车在高速上跑多快，就别在停车场里测。

### 通用 harness 的公平性张力

**context**：ARC 采用通用 harness 的理由是让模型缺陷更可见、让模型比较更公平；而 OpenAI 的发现表明，这种公平同时让评测远离了真实部署形态。文末以致谢方式承认了 ARC 工作的价值。

**费曼一下**：统一考场对所有考生一视同仁，却也剥夺了每个人惯用的工具。公平和代表性在这里是一对拉扯：越标准化，越可比；越贴近真实，越有预测力。

### 上下文占用率与性能衰减

**context**：滚动截断第二个弊端的机制说明——模型在任务大部分时间里都运行在更满的上下文窗口下，「which can slightly impair performance」。compaction 通过腾出空间同时缓解了这一点。

**费曼一下**：上下文窗口不是装满了才算用好，越满往往越迟钝。给模型留出余量，本身就是一种性能优化。

### 输出 token 效率

**context**：本次改动的第二个量化结果：约 3 倍分数的同时，输出 token 少 6 倍。原因在于模型不再需要每个动作前重新解读游戏，思考时间随之缩短。

**费曼一下**：省钱和提分在这里不是取舍，而是同一个原因的两个结果。让模型少做无用的重复思考，账单和成绩会同时变好。

### 概念网络

![图片是ARC-AGI-3基准的原文关系图，由Mermaid源码直接渲染。图中“ARC-AGI-3基准”为起点，采用通用harness，harness决定了benchmark成绩，上下文占用率与性能衰减、上下文压缩compaction、跨轮次记忆等概念支撑harness。还涉及Responses API、丢弃私有推理、保留推理、滚动截断、RHAE评分口径等概念，以及eval模型与工程的捆绑测量。该图直观呈现了ARC-AGI-3基准相关概念的逻辑关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MzQ5MWM4ODdlNDM1NDRkYTJkMWY4YzQ3NTA1YmExMGFfMjM4MTVhNTE0ZTQ3ZDQ0OTU1MGJkZjQyZmYzZDRlYTJfSUQ6NzY3MTAwODAwODkxNDA5NTM5NF8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



整张网络围绕一个枢纽命题展开：harness 决定了 benchmark 成绩。它上承证据，下启结论，是全文所有概念的汇合点。

从基准这一侧看，ARC-AGI-3 同时给出了两样东西：一个通用 harness 和一套 RHAE 评分口径。评分口径界定了「成绩」这个词的含义——它比的是动作效率而非通关与否，也因此对记忆缺失格外敏感：一个反复重来的模型会在动作数上被狠狠扣分。通用 harness 则是隐形变量的载体，丢弃私有推理和滚动截断这两个设定都藏在其中。

从损害机制这一侧看，两个设定指向同一个受害者：跨轮次记忆。丢弃推理切断了思考的连续性，滚动截断切断了观察与动作的连续性，二者叠加把一个能做长程规划的模型压成了单步决策者。这是因果链条中最关键的一环——不是模型不会推理，而是它被剥夺了推理的对象。

从修复这一侧看，Responses API 是同一个供给源，向下分出保留推理与上下文压缩两条路径，两者共同修复跨轮次记忆。上下文压缩与滚动截断构成直接的对立关系：面对同一个上限，一个选择丢弃，一个选择浓缩。压缩还额外降低了上下文占用率，从而在记忆之外再补一份性能增益——这解释了为什么效果不是简单相加，而是分数与 token 效率同时改善。

最后是从枢纽命题到全文结论的升华：既然外壳能把成绩改变三倍，那么任何 eval 都必然是模型与工程选择的捆绑测量。这一步也回照了通用 harness 与该结论之间的张力：通用 harness 为了公平而抹平工程差异，恰恰使它测出的是模型在失忆状态下的表现，而非它在真实产品中的能力。公平与代表性在这里未必同向，这也是全文给评测方与开发者分别开出不同建议的原因。

## 费曼 x3

一个能证明数学猜想的模型，在一堆 2D 拼图小游戏上只拿到 7.8 分，你会先怀疑谁？大多数人会怀疑模型——它大概不擅长空间推理，或者面对没有说明书的环境无能为力。真实答案更不体面，也更有用：它每走一步，上一步的思考都被人为抹掉了。

这里藏着一个容易被忽略的事实：我们以为在测模型，其实在测一个组合。分数背后是一捆不太可见的选择——API 怎么调、推理留不留、上下文满了怎么办。同一个 GPT-5.6 Sol，换掉两个开关，成绩从 13.3% 跳到 38.3%，输出 token 还少了六倍。权重一个字节都没变。

失忆是最贵的成本。丢弃私有推理，意味着每个动作前都要把游戏从头弄懂一遍；滚动截断，意味着连自己做过什么都记不全。模型于是在每一步上耗费大量思考，却始终无法把这些思考累积成策略。补上记忆之后，它反而想得更少、走得更快——因为不必再重新发现自己刚刚发现过的东西。省钱和提分在这里不是取舍，是同一个原因的两个结果。

这对做评测的人是个提醒。用一个丢掉推理的通用 harness，你测出的是模型在失忆状态下的下限，而不是它在真实产品里的样子。ARC 的选择当然有道理：简单的外壳让缺陷更可见，也让比较更对等。但商业部署做的恰恰相反，是围着每个模型的特性和怪癖去打磨外壳。两种做法都成立，只是它们回答的从来不是同一个问题——一个问「模型本身有多强」，一个问「这套系统能交付什么」。

对做产品的人，提醒更直接：能力的边界经常不在模型里，而在你替它做的那些默认设置里。把上下文当成一次性的消耗品，还是当成可累积的记忆，决定了同一个模型是「看上去不太聪明」，还是能连着几小时把一件复杂的事做完。下次看到一个刺眼的低分，先别急着换模型——先看看它有没有被允许记住自己。

HOWIE 原清单 · 28

# 一个被 harness 套住的 LLM agent：这个词到底指什么

**内容说明：**今日 harness 十篇的最佳前置读物：把 harness 定义、与 agent 的分工、各家 SDK 的实现方式一次讲清，读完再回看 Fowler 和 LangChain 会顺很多。

**策展人按：**它自称前置读物，却被排到了最后。你要是读到这儿还觉得 harness 这个词有点滑，就把它当补丁；下次带人入门，直接从这条开始。

以下为 AI 内参下载的 Markdown 正文；原文配图已原位内嵌，概念网络已成图。

- 原文标题：A harnessed LLM agent
- 作者：Akshay 🚀
- 内参日期：2026-07-31
- 来源类型：twitter
- 原文：https://x.com/akshay_pachaar/status/2045510648474530263/?s=12
- 标签：harness engineering, agents

今日 harness 十篇的最佳前置读物：把 harness 定义、与 agent 的分工、各家 SDK 的实现方式一次讲清，读完再回看 Fowler 和 LangChain 会顺很多。

## 导读

旧文重读。harness、llm、agent

## 核心观点

- 大多数人把 agent 想象成「一个模型外面栓了几把工具」，真实架构恰好把这个关系倒过来：模型被刻意做薄（deliberately thin），智能被推到外面，由 harness 在运行时组装。
- harness 指的是包裹 LLM 的全部软件基础设施——编排循环、工具、记忆、上下文管理、状态持久化、错误处理、护栏。LangChain 的 Vivek Trivedy 给了一句划界公式：「If you're not the model, you're the harness.」
- agent 与 harness 不是同一个东西：agent 是目标导向、会用工具、能自我纠错的**涌现行为**，是用户打交道的那个东西；harness 是产生这种行为的**机器**。说「我造了个 agent」，真实含义是「我造了个 harness，然后把它指向一个模型」。
- 证据不是修辞：LangChain 只换包在 LLM 外面的基础设施（同一个模型、同一份权重），在 TerminalBench 2.0 上从 30 名开外冲到第 5；另一个研究项目让 LLM 自己去优化基础设施，pass rate 达到 76.4%，超过手工设计的系统。
- 这套框架解锁的有用问题是：任何一项新能力，它该住在哪里？稳定知识去记忆，学到的打法去 skills，通信契约去 protocols，循环治理交给中介层。harness 设计因此变成「外置什么、如何中介」的问题。
- 趋势判断：模型越强，harness 越薄，但 harness 不会消失。全文收在一句话上——下次 agent 失败，别怪模型，去看 harness。

## 推文的原始框架：薄模型、三个维度、一圈中介层

- 模型本身刻意做薄，智能被推到外面（pushed outward），harness 在运行时把它们组合起来。这是整篇的第一句反直觉判断，也是后面所有结论的地基。
- 三个维度绕着 harness 内核转：
- **Memory** 装的是模型不该扛在权重或上下文里的状态：working context、semantic knowledge、episodic experience、personalized memory，每一类都有自己的生命周期。
- **Skills** 装的是程序性知识：操作规程（operational procedures）、决策启发式（decision heuristics）、规范性约束（normative constraints），把通用模型按任务专门化。
- **Protocols** 装的是交互契约：agent 对用户、agent 对 agent、agent 对工具，是三个不同的界面，各有各的失败模式。
- 内核与这些模块之间坐着 mediators（中介层）：sandboxing、observability、compression、evaluation、approval loops、sub-agent orchestration。它们管的是 harness 如何伸出去、状态如何流回来。
- 作者同时预告：正在从零写一个极简 agent harness，didactic、易读、no magic，即将开源。

## harness 定名：术语、公式与操作系统类比

![图片展示了计算机与LLM Agent的逐层对应关系。左侧为计算机，从上至下依次是CPU、RAM、硬盘、设备驱动、操作系统、应用；右侧为LLM Agent，对应部分分别为LLM（模型权重）、上下文窗口、向量数据库/长期存储、工具集成、Agent Harness、Agent（涌现行为）。图片中“Same architecture, new substrate”（相同架构，新基板）的字样，以及箭头指向Agent Harness，强调Agent Harness是使LLM Agent有用的关键层。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MmQ1NjIxZTc4Nzk4MDJlY2UwYmM2YjdiMDA2M2Y0YjNfMzQyYzc2MTc3NDUwY2VmYjdmOGFmZWI4ZGI5MjMwZjhfSUQ6NzY3MTAwODAwNjY3ODU4MDQyMV8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜计算机与 LLM agent 的逐层对应：harness 就是那一层操作系统* ｜ [原图](https://neican-res.candobear.com/article-images/d461557f3edec7c2b922b8baf377f8210858f274d863da7ef45a21e3dbadc5bb.jpg)

- 「agent harness」这个词在 2026 年初被正式定名，但东西早就存在。它指的是包裹 LLM 的完整软件基础设施。
- Anthropic 的 Claude Code 文档说得直白：SDK 就是「the agent harness that powers Claude Code」。OpenAI 的 Codex 团队用同一套 framing，明确把「agent」与「harness」等同起来，指的都是让 LLM 变得有用的**非模型基础设施**（non-model infrastructure）。
- 真正让人卡住的区分在这里：agent 是涌现出来的行为，harness 是产生这个行为的机器。二者混用会让「我做了个 agent」这句话失去信息量。
- Beren Millidge 2023 年的文章《Scaffolded LLMs as Natural Language Computers》把类比做到了精确：裸 LLM 是一颗没有内存、没有硬盘、没有 I/O 的 CPU。
- 上下文窗口 = RAM（快，但小）
- 外部数据库 = 磁盘（大，但慢）
- 工具集成 = 设备驱动
- harness = 操作系统
- 他的结论是「We have reinvented the Von Neumann architecture」——因为这是任何计算系统的自然抽象，不是巧合。

## 三层工程：prompt、context、harness

- 环绕模型的是三个同心层级的工程：
- prompt engineering：打磨模型收到的指令。
- context engineering：管理模型看到什么、什么时候看到。
- harness engineering：把前两者都包住，再加上整个应用基础设施——工具编排、状态持久化、错误恢复、验证循环、安全执行、生命周期管理。
- 一句定性：harness 不是包着 prompt 的一层壳（not a wrapper around a prompt），而是让自主 agent 行为成为可能的完整系统。

## 生产级 harness 的十二个组件

![图片展示了Harness的架构图，核心为LLM（无状态模型），围绕其有Prompt Construction、Error Handling、Orchestration Loop等组件。外部有Capabilities、Safety & Scale、Guardrails & Safety三层，分别包含多种能力模块。右侧有“Tool calls go out”和“User request enters here”标注，表示工具调用和用户请求的进出。左下角有“Tool Scoping”和“State Management”标识，右下角有“Context Management”标识。该图与上下文介绍的Harness架构相呼应，直观呈现其多层结构及各部分功能。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MWRjNGQ0ZDUzZTMxZTUwYzg1YjUwZDFiMzViNzhiZjVfOGYzMDRlYTgxNzc2ZWRhMjU5NjdhMGU4YjU2ODJjNjRfSUQ6NzY3MTAwODAwODQ2OTU2NDYxMF8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜harness 解剖图：模型在核心，运行时、能力、安全三层向外包裹* ｜ [原图](https://neican-res.candobear.com/article-images/7fccb8f542d1f64307177042be74d5725d503a474c1098b52e1ca1b04ccb455e.jpg)

- **编排循环（Orchestration Loop）**：心跳。实现 Thought-Action-Observation（TAO）循环，也叫 ReAct 循环：组装提示、调用 LLM、解析输出、执行工具调用、把结果喂回去、重复直到完成。机制上常常就是一个 while 循环——复杂性住在循环所管理的一切里，而不是循环本身。Anthropic 把自己的 runtime 描述为「dumb loop」，智能全在模型里，harness 只管回合。
- **工具（Tools）**：agent 的手。以 schema（名称、描述、参数类型）注入模型上下文，让模型知道有什么可用；工具层负责注册、schema 校验、参数抽取、沙箱执行、结果捕获，以及把结果格式化成模型可读的 observation。Claude Code 提供六类工具：文件操作、搜索、执行、网络访问、代码智能、子 agent 派生。OpenAI Agents SDK 支持 function tools（@function_tool）、hosted tools（WebSearch、CodeInterpreter、FileSearch）与 MCP server tools。
- **记忆（Memory）**：运行在多个时间尺度上。短期记忆是单次会话内的对话历史；长期记忆跨会话持久化——Anthropic 用 CLAUDE.md 项目文件与自动生成的 MEMORY.md，LangGraph 用命名空间组织的 JSON Store，OpenAI 支持 SQLite 或 Redis 支撑的 Sessions。Claude Code 实现了三层结构：常驻的轻量索引（约 150 字符一条）、按需拉入的主题文件、只能通过搜索访问的原始 transcript。一条关键设计原则：agent 把自己的记忆当作「hint」，行动前先对真实状态做校验。
- **上下文管理（Context Management）**：很多 agent 在这里静默失败。核心问题是 context rot——关键内容落在窗口中部时模型表现下降 30%+（Chroma 研究，与 Stanford 的「Lost in the Middle」互相印证）；即使百万 token 窗口，指令遵循也会随上下文变长而退化。生产策略包括：
- compaction：接近上限时对对话历史做摘要（Claude Code 保留架构决策与未解决 bug，丢弃冗余工具输出）
- observation masking：JetBrains 的 Junie 隐藏旧工具输出，但保留工具调用可见
- just-in-time retrieval：维持轻量标识符、动态加载数据（Claude Code 用 grep、glob、head、tail 而不是整文件加载）
- 子 agent 委派：每个子 agent 广泛探索，但只回传 1000 到 2000 token 的浓缩摘要
- **提示组装（Prompt Construction）**：拼出模型每一步真正看到的东西，是分层的——系统提示、工具定义、记忆文件、对话历史、当前用户消息。OpenAI Codex 用严格的优先级栈：服务端控制的系统消息（最高）、工具定义、开发者指令、用户指令（级联的 AGENTS.md，32 KiB 上限），最后才是对话历史。
- **输出解析（Output Parsing）**：现代 harness 依赖原生 tool calling，模型返回结构化的 tool_calls 对象，而不是需要解析的自由文本。harness 只判断一件事：有工具调用就执行并继续循环，没有工具调用就是最终答案。结构化输出方面，OpenAI 与 LangChain 都支持 Pydantic 模型约束的 schema 响应；RetryWithErrorOutputParser 这类老办法（把原提示、失败补全、解析错误一起回喂模型）留给边缘情况。
- **状态管理（State Management）**：LangGraph 把状态建模成流经图节点的 typed dict，用 reducer 合并更新，在 super-step 边界做 checkpoint，从而支持中断后恢复与时间旅行调试。OpenAI 给出四种互斥策略：应用自管记忆、SDK sessions、服务端 Conversations API、轻量的 previous_response_id 串接。Claude Code 走的是另一条路——**git commit 当 checkpoint，进度文件当结构化 scratchpad**。
- **错误处理（Error Handling）**：为什么重要有个硬数字——一个 10 步流程，每步 99% 成功率，端到端只剩约 90.4%，错误复利得很快。LangGraph 区分四类错误：瞬时错误（退避重试）、LLM 可恢复错误（作为 ToolMessage 回给模型自行调整）、用户可修错误（中断并请求人工输入）、意外错误（冒泡出来调试）。Anthropic 在工具处理器内部捕获失败并作为 error result 返回，以保持循环运转。Stripe 的生产 harness 把重试上限压在两次。
- **护栏与安全（Guardrails and Safety）**：OpenAI SDK 分三级——输入护栏（在首个 agent 上运行）、输出护栏（在最终输出上运行）、工具护栏（每次工具调用都跑）；tripwire 机制一触发就立即停机。Anthropic 在架构上把权限执行与模型推理分开：模型决定尝试什么，工具系统决定允许什么。Claude Code 独立管控约 40 项离散工具能力，分三个阶段：项目加载时建立信任、每次工具调用前做权限检查、高风险操作要用户显式确认。
- **验证循环（Verification Loops）**：这是玩具 demo 与生产 agent 的分水岭。Anthropic 推荐三种做法：规则式反馈（测试、linter、类型检查）、视觉反馈（用 Playwright 截图做 UI 任务）、LLM-as-judge（另一个子 agent 评判输出）。Claude Code 作者 Boris Cherny 的观察是：给模型一条能验证自己工作的通路，质量提升 2 到 3 倍。
- **子 agent 编排（Subagent Orchestration）**：Claude Code 支持三种执行模型——Fork（父上下文的逐字节副本）、Teammate（独立终端窗格，基于文件的信箱通信）、Worktree（自己的 git worktree，一 agent 一分支）。OpenAI SDK 支持 agents-as-tools（专家处理有界子任务）与 handoffs（专家接管全部控制）。LangGraph 把子 agent 实现为嵌套的状态图。
- ※ 原文自称 twelve distinct components，但编号展开的小节只到 11 项，第 12 项未单列，存疑。

## 循环在运转：七步走查与终止条件

![图片展示了循环在运转的七步走流程，从提示组装到上下文更新，以及各种退出条件。1. 提示组装包含系统提示、工具、记忆、历史和用户消息；2. LLM推理模型生成输出；3. 分类输出；4. 工具执行，需验证、沙盒执行；5. 结果包装，格式化结果为消息；6. 上下文更新，将结果追加到历史；7. 循环，存在多种退出条件，如最大轮次超限、令牌预算耗尽等。图片与上下文紧密相关，直观呈现了循环运转的步骤与条件。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDM3YjY0NTA0Y2VmYzdiNmE3OTI3ZDk1ZWFhYTM2YjhfYTExNzRlMDVlYThlYzRhM2NhNWYxZTBkMDZiOTZmNzlfSUQ6NzY3MTAwODAwNzIwMjg4NDgxNV8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜编排循环七步走：从提示组装到上下文更新，以及各种退出条件* ｜ [原图](https://neican-res.candobear.com/article-images/d85da2c190bd0bd1b35f3dcbcc413e6a5b85d76948350ccfd940e59fe5eec745.jpg)

- **第一步 提示组装**：harness 拼出完整输入——系统提示 + 工具 schema + 记忆文件 + 对话历史 + 当前用户消息。重要上下文被放在开头和结尾，正是「Lost in the Middle」的直接应用。
- **第二步 LLM 推理**：组装好的提示发给模型 API，模型产出文本、工具调用请求，或两者兼有。
- **第三步 输出分类**：只有文本没有工具调用，循环结束；有工具调用，进入执行；请求 handoff，则更新当前 agent 并重启。
- **第四步 工具执行**：逐个校验参数、检查权限、在沙箱内执行、捕获结果。只读操作可以并发，改写操作串行。
- **第五步 结果封装**：工具结果被格式化成模型可读的消息；错误也被捕获并作为 error result 返回，好让模型自我纠正。
- **第六步 上下文更新**：结果追加进对话历史；接近上下文窗口上限就触发 compaction。
- **第七步 循环**：回到第一步，重复直到终止。
- 终止条件是分层的：模型给出不含工具调用的回复、超过最大回合数、token 预算耗尽、护栏 tripwire 触发、用户中断、返回安全拒答。一个简单问题可能 1 到 2 个回合，一次复杂重构可能串起几十次工具调用、跨越许多回合。
- 面向跨多个上下文窗口的长任务，Anthropic 提出两阶段的「Ralph Loop」：Initializer Agent 先搭好环境（init 脚本、进度文件、特性清单、首次 git commit），此后每个会话里的 Coding Agent 读 git log 与进度文件给自己定位，挑出优先级最高的未完成特性去做，提交，再写摘要。文件系统提供了跨上下文窗口的连续性。

## 真实框架如何实现同一个模式

![图片展示了五个主流框架在循环、状态、多agent与哲学上的取舍对照。Claude Agent SDK为“dumb loop, smart model”，OpenAI Agents SDK有4种策略，LangGraph为状态图，CrewAI为顺序/层次结构，AutoGen为对话驱动。在状态方面，Claude Agent SDK依赖Git提交，OpenAI Agents SDK有4种策略，LangGraph使用类型化字典和检查点，CrewAI关注任务结果，AutoGen基于消息历史。在多agent方面，Claude Agent SDK为分支/团队成员/工作流，OpenAI Agents SDK为代理作为工具和交接，LangGraph为嵌套图，CrewAI为代理 - 任务 - 团队，AutoGen有5种编排模式。哲学上，Claude Agent SDK信任模型，OpenAI Agents SDK代码优先，LangGraph基于图的控制，CrewAI基于角色的协作，AutoGen将对话视为协议。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGExZWU4ZDVjZDhiYjJlYjZmYTRiY2Q3ZjhiY2RmMmNfMDYzYzg2ODM2M2EwMmY2Mzc2ZjI0MmI0NTExYmE0OGFfSUQ6NzY3MTAwODAwNzA2ODY1MDc0N18xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜五个主流框架在循环、状态、多 agent 与哲学上的取舍对照* ｜ [原图](https://neican-res.candobear.com/article-images/a5ef66a901086b92c250395f377a29993d54213fb8f98ef50d8258214622c790.jpg)

- **Anthropic Claude Agent SDK**：用单个 query() 函数暴露 harness，创建 agentic loop 并返回流式消息的异步迭代器。runtime 是「dumb loop」，所有智能住在模型里。Claude Code 走 Gather-Act-Verify 循环：收集上下文（搜文件、读代码）、采取行动（改文件、跑命令）、验证结果（跑测试、看输出）、重复。
- **OpenAI Agents SDK**：通过 Runner 类实现 harness，三种模式（async、sync、streamed）。SDK 是 code-first 的：工作流逻辑用原生 Python 表达，而不是图 DSL。Codex harness 在此之上扩出三层架构——Codex Core（agent 代码 + runtime）、App Server（双向 JSON-RPC API）、客户端界面（CLI、VS Code、Web app）。所有界面共用同一个 harness，这正是「Codex 模型在 Codex 界面上比在通用聊天窗口里手感更好」的原因。
- **LangGraph**：把 harness 建模成显式状态图。两个节点（llm_call 与 tool_node）由一条条件边连接：有工具调用就路由到 tool_node，没有就路由到 END。它从 LangChain 的 AgentExecutor 演化而来，后者因难以扩展、缺乏多 agent 支持在 v0.2 被弃用。LangChain 的 Deep Agents 明确使用「agent harness」这个术语：内建工具、规划（write_todos）、用于上下文管理的文件系统、子 agent 派生、持久记忆。
- **CrewAI**：角色制多 agent 架构——Agent（围绕 LLM 的那层 harness，由 role、goal、backstory、tools 定义）、Task（工作单元）、Crew（agent 的集合）。Flows 层再加一根「确定性主干，智能只放在真正需要的地方」，负责路由与校验，Crew 负责自主协作。
- **AutoGen**（正演化为 Microsoft Agent Framework）：开创了对话驱动的编排。三层架构（Core、AgentChat、Extensions），支持五种编排模式：顺序、并发（fan-out/fan-in）、群聊、handoff、magentic（一个管理者 agent 维护动态任务账本来协调专家）。

## 脚手架隐喻：精确在哪，何时该拆

![图片展示了agent、LLM、harness三者分工及楼建成后脚手架被拆除的场景。左侧是脚手架，标注有agent、LLM、harness，分别对应工具、LLM、临时基础设施。中间脚手架上标注“Orchestration loop”等，下方有工人操作。右侧是完工的高楼，标注“Models get smarter over time”等。底部文字说明脚手架不施工，但工人在脚手架上工作才能完成高层建筑。该图与上下文紧密相关，直观呈现了三者在建筑施工中的分工与作用。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGNiYTQwZTc5NDVkZmZhMDQxNzIwYmQ2NGEzNjY0NTZfNTk1MDE5Y2QwYjU3NjlmM2U1ZjVkN2JlYjgzMGYxZDBfSUQ6NzY3MTAwODAwNzMyODY5NzU0M18xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜脚手架隐喻：agent、LLM、harness 三者分工，以及楼建成后脚手架被拆除* ｜ [原图](https://neican-res.candobear.com/article-images/2edd8cd63152172ec0b4e5fc573870cd82186d272486a703c83bf4ff0c94b740.jpg)

- 脚手架不是装饰性比喻，而是精确的：施工脚手架是临时基础设施，让工人够得到自己本来够不到的结构。它本身不盖楼，但没有它，工人上不了高层。
- 关键洞见：楼盖完，脚手架就被拆掉。模型变强，harness 复杂度就应该下降。Manus 在六个月里重写了五次，每次重写都在删复杂度——复杂的工具定义退化成通用 shell 执行，「管理 agent」退化成简单的结构化 handoff。
- 由此引出协同进化原理（co-evolution principle）：模型现在是带着特定 harness 一起做后训练的。Claude Code 的模型学会的是它训练时那一套 harness；换掉工具实现反而可能让性能下降，因为耦合非常紧。
- harness 设计的「未来防腐测试」（future-proofing test）：如果换上更强的模型、不增加任何 harness 复杂度、性能就能跟着涨，这个设计就是稳的。

## 定义每个 harness 的七个决策

![图片展示了设计Agent Harness的七个关键决策，包括Agent Count、Reasoning Strategy、Context Strategy、Verification、Permissions、Tool Scoping、Harness Thickness。每个决策都有其特点和影响，如Agent Count有单Agent和多Agent，多Agent可隔离、专业化但更复杂；Reasoning Strategy有ReAct和Plan-and-Execute等。这些决策共同构成了Agent Harness架构的设计空间，没有普适答案，只有取舍。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MmE3ZTRiNmQyNGQ1NzY3NjljZDFkODA5ZWUxYTFkOWJfMzI2MjljMjU2YThkZjFjZmQ2OTBjMTExZjgzNjQ3OGVfSUQ6NzY3MTAwODAwODQ5MDUwMzQzNF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文配图｜七个决策构成 agent harness 的设计空间，没有普适答案只有取舍* ｜ [原图](https://neican-res.candobear.com/article-images/62300a2feaab0d79177cbc9524a5f10c1755234f0c33980cb4c7c4416a7b5080.jpg)

- **单 agent vs 多 agent**：Anthropic 与 OpenAI 口径一致——先把单 agent 榨到极致。多 agent 带来额外开销（路由要多花 LLM 调用、handoff 时丢上下文）。只有当重叠工具超过约 10 个、或存在明显分离的任务域时才拆。
- **ReAct vs plan-and-execute**：ReAct 每一步都交错推理与行动（灵活，但每步成本更高）；plan-and-execute 把规划与执行分开，LLMCompiler 报告相对顺序式 ReAct 有 3.6 倍加速。
- **上下文窗口管理策略**：五种生产做法——按时间清理、对话摘要、observation masking、结构化记笔记、子 agent 委派。ACON 研究显示，优先保留推理轨迹而非原始工具输出，可以在保持 95%+ 准确率的同时减少 26% 到 54% 的 token。
- **验证循环设计**：计算式验证（测试、linter）提供确定性的 ground truth；推断式验证（LLM-as-judge）能抓语义问题但增加延迟。Martin Fowler 的 Thoughtworks 团队把这组对立表述为 guides（前馈，行动前引导）与 sensors（反馈，行动后观察）。
- **权限与安全架构**：宽松（快但有风险，多数动作自动放行）对严格（安全但慢，每个动作都要审批），选择取决于部署场景。
- **工具收窄策略**：工具越多往往表现越差。Vercel 从 v0 里删掉 80% 的工具，结果反而更好；Claude Code 靠懒加载做到 95% 的上下文缩减。原则是：只暴露当前这一步所需的最小工具集。
- **harness 厚薄**：多少逻辑住在 harness 里，多少留给模型。Anthropic 押注薄 harness 加模型进步，图式框架押注显式控制。Anthropic 会随着新模型内化规划能力，定期从 Claude Code 的 harness 里删掉规划步骤。

![图片展示了Harness厚薄光谱，从押注模型进步到押注显式控制，各框架的位置。左侧为“薄”端，代表模型决定所有决策，有Claude Agent SDK、OpenAI Agents SDK等，强调信任模型；右侧为“厚”端，代表显式路由、规划步骤等，有CrewAI Flows、LangGraph等，强调编码逻辑。上方箭头表示随着模型进步，信任度降低。该图与上下文关于Harness的七个决策相关，直观呈现了不同框架在模型信任度上的差异。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OGE4Y2MwNDk5ZmIyMDc0YzFmOTQ2MDUxOTYwMGQ4MDZfMWZlZDZlOWNiOWFlYjI3MTQ4MWM0N2NkOTkzMzdhN2VfSUQ6NzY3MTAwODAwOTU4OTM3ODMzMV8xNzg2NTU0OTEzOjE3ODY1NTg1MTNfVjM)

*原文配图｜harness 厚薄光谱：从押注模型进步到押注显式控制，各框架的位置* ｜ [原图](https://neican-res.candobear.com/article-images/e35bc9175eb1693e8388051b5ad3ca055af323fc843af802ce9a30c7204668a2.jpg)

## harness 就是产品

- 用同样模型的两个产品，性能可以天差地别，差别只在 harness 设计。TerminalBench 的证据很硬：只改 harness，agent 的排名移动了 20 位以上。
- harness 不是已经解决的问题，也不是一层商品化的中间件。难工程都在这里：把上下文当稀缺资源来管理、设计能在错误复利之前抓住失败的验证循环、构建有连续性又不产生幻觉的记忆系统、以及对「造多少脚手架、留多少给模型」下架构赌注。
- 大势是随着模型变强 harness 变薄，但 harness 本身不会消失。即使最强的模型，也需要有东西替它管上下文窗口、执行工具调用、持久化状态、验证工作。
- 全文收束在一句可操作的判断上：下次你的 agent 失败，别怪模型，去看 harness。

## 概念网络

### 关键概念

### agent harness（智能体套具）

**context**：全文的中心概念，指「the complete software infrastructure wrapping an LLM」——编排循环、工具、记忆、上下文管理、状态持久化、错误处理与护栏的总和。术语在 2026 年初被正式定名，但 Anthropic 的 Claude Agent SDK 文档与 OpenAI 的 Codex 团队早已在用同一个所指：让 LLM 变得有用的非模型基础设施。

**费曼一下**：模型是发动机，harness 是整辆车——底盘、变速箱、油路、仪表盘、安全带。你买不到一辆只有发动机的车，也做不出一个只有模型的产品。

### 「If you're not the model, you're the harness」

**context**：LangChain 的 Vivek Trivedy 给出的划界公式，被作者称为 canonical formula。它把整个 agent 系统一刀切成两半：模型权重是一侧，其余全部工程是另一侧。

**费曼一下**：这句话的力量在于取消了中间地带。你写的调度代码、压缩策略、权限闸门，全都在同一侧——不能说「这是模型的问题」来推卸。

### agent 与 harness 的分工（涌现行为 vs 产生行为的机器）

**context**：文章反复强调的、最容易被混淆的一处区分：agent 是「the emergent behavior：目标导向、会用工具、能自我纠错的实体」，是用户交互的对象；harness 是产生这一行为的机器。所以「I built an agent」的真实含义是「我造了个 harness，然后把它指向一个模型」。

**费曼一下**：agent 是你看到的舞台效果，harness 是舞台背后的灯光、绳索和机关。观众谈论演出，工程师谈论机关。

### 脚手架化 LLM 与冯·诺依曼架构类比

**context**：Beren Millidge 2023 年文章《Scaffolded LLMs as Natural Language Computers》提出的映射——裸 LLM 是没有内存、硬盘和 I/O 的 CPU，上下文窗口是 RAM，外部数据库是磁盘，工具集成是设备驱动，harness 是操作系统。他的结论是「We have reinvented the Von Neumann architecture」。

**费曼一下**：CPU 再快，没有操作系统也开不了机。把 LLM 当 CPU 看，很多设计问题就不再新鲜——它们是计算机体系结构里已经解过一遍的老题。

### 三层工程（prompt / context / harness engineering）

**context**：文章给出的三个同心层级——prompt engineering 打磨指令，context engineering 管理模型看到什么与何时看到，harness engineering 包住前两者并加上工具编排、状态持久化、错误恢复、验证循环、安全执行与生命周期管理。

**费曼一下**：这是一组包含关系，不是三个并列流派。只谈提示词，等于只讨论怎么写一封信，却不管邮局、地址簿和收发流程。

### 编排循环与「dumb loop」（笨循环、聪明模型）

**context**：harness 的心跳，实现 Thought-Action-Observation（ReAct）循环：组装提示、调 LLM、解析输出、执行工具、结果回喂、重复。机制上常常就是一个 while 循环，「the complexity lives in everything the loop manages」；Anthropic 把自家 runtime 描述为 dumb loop，智能全在模型。

**费曼一下**：循环本身笨得像洗衣机的定时器，真正难的是往里放什么、什么时候停、脏东西怎么处理。

### context rot（上下文腐烂）与 Lost in the Middle

**context**：上下文管理失效的核心机制——关键内容落在窗口中部时模型表现下降 30%+（Chroma 研究，与 Stanford 的「Lost in the Middle」互证）；百万 token 窗口同样会随上下文变长而出现指令遵循退化。文章据此把重要内容安排在提示的开头与结尾。

**费曼一下**：模型读长文像人扫读长会议纪要——开头记得，结尾记得，中间那段基本白读。所以别把最关键的一句藏在中段。

### 上下文压缩与即时检索（compaction / just-in-time retrieval）

**context**：对抗 context rot 的生产策略组合：compaction（保留架构决策与未解决 bug，丢弃冗余工具输出）、observation masking（隐藏旧工具输出、保留工具调用）、just-in-time retrieval（用 grep、glob、head、tail 而非整文件加载）、子 agent 委派（只回传 1000 到 2000 token 摘要）。目标是找到「smallest possible set of high-signal tokens」。

**费曼一下**：把上下文当成随身背包而不是仓库——只带这一段路要用的东西，其余留在原地，需要时再回去取。

### 多时间尺度记忆与「记忆只是 hint」

**context**：短期记忆是单会话对话历史，长期记忆跨会话持久化（CLAUDE.md、自动生成的 MEMORY.md、命名空间 JSON Store、SQLite/Redis Sessions）。Claude Code 用三层结构：常驻轻量索引、按需拉取的主题文件、只可搜索的原始 transcript。关键原则是 agent 把自己的记忆当作提示，行动前对真实状态做校验。

**费曼一下**：笔记本上写着「钥匙在抽屉里」，出门前还是要拉开抽屉看一眼。记忆是线索，不是事实。

### 错误复利（compounding errors）

**context**：文章给出的硬数字——10 步流程、每步 99% 成功率，端到端只剩约 90.4%。由此推出 LangGraph 的四类错误分诊（瞬时、LLM 可恢复、用户可修、意外），以及把工具失败作为 error result 返回、Stripe 把重试上限设为两次这类具体做法。

**费曼一下**：单步「几乎不出错」在多步流程里是一句安慰话。可靠性像利息，只是复的是负利。

### 权限与推理的架构分离

**context**：Anthropic 在架构上把权限执行与模型推理分开——模型决定尝试什么，工具系统决定允许什么。Claude Code 独立管控约 40 项工具能力，分三阶段：项目加载建立信任、每次调用前检查权限、高风险操作要求用户显式确认。对照 OpenAI 的输入/输出/工具三级护栏与 tripwire 立即停机机制。

**费曼一下**：不要指望说服司机不闯红灯，直接把路口设成物理闸门。安全不该建立在模型「愿意听话」上。

### 验证循环：guides 与 sensors

**context**：区分玩具 demo 与生产 agent 的关键组件。Anthropic 推荐规则式反馈（测试、linter、类型检查）、视觉反馈（Playwright 截图）、LLM-as-judge 三种；Boris Cherny 观察到给模型验证通路能把质量提升 2 到 3 倍。Martin Fowler 的 Thoughtworks 团队把计算式与推断式验证表述为 guides（前馈，行动前引导）与 sensors（反馈，行动后观察）。

**费曼一下**：一种是提前给你划好车道线，一种是事后告诉你压线了。两种都要，前者省事，后者兜底。

### 子 agent 编排（Fork / Teammate / Worktree）

**context**：Claude Code 的三种执行模型——Fork（父上下文的逐字节副本）、Teammate（独立终端窗格 + 基于文件的信箱通信）、Worktree（各自的 git worktree 与隔离分支）。OpenAI SDK 提供 agents-as-tools 与 handoffs 两种形态，LangGraph 把子 agent 实现为嵌套状态图。子 agent 同时也是上下文管理手段：广泛探索、只回传浓缩摘要。

**费曼一下**：派实习生去翻三小时资料，只让他交回一页纸。你的注意力被保护了，工作量却外包出去了。

### harness 厚薄（thin vs thick）

**context**：七个架构决策中最根本的一个——多少逻辑住在 harness、多少留给模型。Anthropic 押注薄 harness 与模型进步，图式框架押注显式控制，CrewAI Flows 一类走混合路线。Anthropic 会随新模型内化规划能力，定期从 Claude Code 的 harness 里删掉规划步骤。

**费曼一下**：这是一场关于「信任模型到什么程度」的赌注。押模型会变强，就少写代码；押要可控，就把流程钉死在代码里。押错了要么脆弱，要么臃肿。

### 协同进化与紧耦合（co-evolution principle）

**context**：模型如今是带着特定 harness 一起做后训练的，Claude Code 的模型学会的是它训练时那套 harness。因此换掉工具实现可能反而降低性能——harness 与模型之间存在紧耦合。

**费曼一下**：像给一个用惯了某套工具的老师傅换全新工具箱，短期内效率不升反降。工具与手是一起长出来的。

### 工具收窄（tool scoping）

**context**：反直觉的经验规律——工具越多往往表现越差。Vercel 从 v0 中删掉 80% 的工具后结果更好，Claude Code 靠懒加载实现约 95% 的上下文缩减。原则是只暴露当前步骤所需的最小工具集；文章同时给出拆分多 agent 的经验阈值：重叠工具超过约 10 个。

**费曼一下**：给人一把螺丝刀，他会去拧螺丝；给他一整面工具墙，他会先站着发呆。选项本身是有成本的。

### 未来防腐测试（future-proofing test）

**context**：文章给出的 harness 设计判据——如果换上更强的模型、不增加任何 harness 复杂度、性能就能跟着提升，这个设计就是好的。它与脚手架隐喻（楼盖完就拆）和「模型越强 harness 越薄」是同一件事的三种说法。

**费曼一下**：好的支架不会阻挡长个子。判断标准很简单：孩子长高了，衣服还能穿吗，还是必须整套重做？

### 能力外置化决策（这项能力该住在哪）

**context**：推文原始框架解锁的核心提问——for any new capability, where should it live？稳定知识去 memory，学到的打法去 skills，通信契约去 protocols，循环治理去 mediators（sandboxing、observability、compression、evaluation、approval loops、sub-agent orchestration）。harness 设计因此被重述为「外置什么、如何中介」。

**费曼一下**：这是给 agent 做的收纳整理。东西不是越多越好，而是每样都得有固定的家，你才知道去哪儿找、什么时候该扔。

### 概念网络

![图片为Harness Engineering的AI内参主题精选文档中关于“agent harness智能体套具”的思想网络图。图中以“agent harness智能体套具”为核心，从定义、治理、内核、支撑等角度展开，如定义方面有“不是模型就是harness”“agent是涌现行为”等；治理方面有“权限与推理架构分离”“能力外置化决策”等；内核方面有“模型与harness协同进化”“编排循环、循环驱动模型”等；支撑方面有“工具收窄”“错误复制”等。该图是对全文思想的可视化呈现。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGI1ZmQ1ZDQ3NDYyNGQ2YjRlNWZjNDE5MTJjYjlmNWFfYjRhZDEzOWE5OWY4Yzk3ZWU4ZDFmZDUyNGMwMWVhMTlfSUQ6NzY3MTAwODAxMDEyMjA3MTAyOF8xNzg2NTU0OTE0OjE3ODY1NTg1MTRfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



全文的思想网络有一个明确的中心：**agent harness**。所有其他概念要么是它的定义与边界，要么是它内部的机制，要么是它的设计取舍。

**第一圈是定名。**「不是模型，就是 harness」这句划界公式给出了外延，而 agent 与 harness 的分工给出了内涵——agent 是涌现出的行为，harness 是产生行为的机器。冯·诺依曼架构类比则从另一个方向确认了同一件事：把 LLM 当 CPU，harness 就是操作系统。三层工程（prompt、context、harness）是这条定名线的收口，它说明 harness 不是与提示工程并列的新流派，而是把它们整个包住的外层。

**第二圈是机制，全部挂在编排循环上。**循环是心跳，其余组件都是它每一拍要处理的事：记忆决定它能带走多少历史，上下文管理决定它每一拍看到什么。这里出现了本文最重要的一组因果链——循环越长，context rot 越致命，于是逼出压缩、即时检索与观察遮蔽；同时循环越长，错误复利越可怕（10 步 × 99% ≈ 90.4%），于是逼出验证循环。子 agent 编排在这张图上是一个双身份节点：它既是循环能力的扩展（把工作分包出去），也是上下文管理的手段（只回传浓缩摘要），因此它同时缓解了 context rot。

**第三圈是治理与取舍。**权限与推理的架构分离，把「模型想做什么」和「系统允许做什么」拆成两件事；它与工具收窄之间存在真实张力——安全要求收窄暴露面，能力要求扩大暴露面，而经验数据（Vercel 删掉 80% 工具反而更好）说明这组张力的最优解常常偏向收窄。

**最后所有线索汇进 harness 厚薄。**它是全篇的架构总账：工具收窄支撑薄 harness，协同进化约束着你不能随便改厚薄（模型是带着特定 harness 后训练的），而「这项能力该住在哪」的外置化决策，正是决定厚薄的具体操作。厚薄之争与编排循环之间也有张力——logic 放在循环代码里还是交给模型，本质是同一个问题的两种问法。

**这张网的出口是「harness 就是产品」。**它由两条线共同支撑：厚薄决策决定了产品的架构性格，验证循环决定了产品是否够得上生产级。TerminalBench 上只换 harness 就移动 20 位排名的事实，是这个结论的经验锚点。而脚手架隐喻给整张网加了一个时间维度：这些结构不是永久的，模型变强，它们就该逐层拆除——但拆不完，因为再强的模型也需要有人替它管上下文、执行调用、持久化状态、验证工作。

## 费曼 x3

「我造了一个 agent。」这句话在今天几乎总是说错了对象。真正被造出来的是一套 harness，然后它被指向了某个模型。模型是买来的、共享的、随时可换的；harness 才是你亲手写下的那部分。LangChain 换掉的只是包在模型外面的基础设施，权重一个字节没动，TerminalBench 2.0 的排名就从三十名开外冲到第五——这不是调参故事，这是产权归属的故事。

有一句划界公式值得记一辈子：如果你不是模型，你就是 harness。它锋利的地方在于取消了中间地带。你写的每一行调度、每一次压缩、每一个权限闸门，都落在这条线的同一侧，没有「这是模型的问题」可以推卸。

更值得琢磨的是方向。大多数人想象的架构是模型加外挂工具，真实架构却把关系倒了过来：模型被刻意做薄，智能被推到外面，由 harness 在运行时组装。裸 LLM 不过是一颗没有内存、没有硬盘、没有 I/O 的 CPU；上下文窗口是 RAM，外部数据库是磁盘，工具集成是驱动，而 harness 是操作系统——我们又一次发明了冯·诺依曼架构。一旦接受这个类比，问题就从「提示词怎么写」变成了「这项能力该住在哪」：稳定的知识进记忆，学到的打法进 skills，通信的契约进 protocols，循环的治理交给中介层。

这也意味着 harness 的价值天然是有期限的。脚手架从不盖楼，但没有它工人够不到上层；楼盖完，它就该被拆掉。模型越强，harness 就该越薄——Manus 半年重写五次，每次都在删东西，复杂的工具定义退化成一句通用 shell，管理 agent 退化成一次结构化交接。检验一个 harness 设计好不好，只需要一问：换上更强的模型、不加任何复杂度，性能会不会自己涨上去？

所以别再把失败归给模型。一个每步九成九的十步流程，端到端只剩九成；错误是复利的，而复利发生在循环里，不在权重里。下次 agent 崩了，去看 harness。