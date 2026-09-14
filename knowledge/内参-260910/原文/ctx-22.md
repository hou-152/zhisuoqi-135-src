# Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%

- 标题：Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%
- 来源：claude.com
- 原文：https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models
- 作者：Claude
- 类型：主题特刊
- 摘要：Anthropic 的 Thariq 分享内部实践：为新模型删掉了约八成 Claude Code 系统提示词，并总结了写 system prompt、skill 和 CLAUDE.md 的新准则。所有维护 skill 的人今天最该读的一篇。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：14582
- 策展人按：同一件事的内部版本，比官方文档狠得多。放在官方规范后面，是让你先知道规矩，再看写规矩的人自己怎么破例。

---

- 原文标题：The new rules of context engineering for Claude 5 models
- 作者：Thariq
- 内参日期：2026-07-26
- 来源类型：twitter
- 原文：https://x.com/trq212/status/2080710971228918066/?s=12
- 标签：Anthropic, agent skills

Anthropic 的 Thariq 分享内部实践：为新模型删掉了约八成 Claude Code 系统提示词，并总结了写 system prompt、skill 和 CLAUDE.md 的新准则。所有维护 skill 的人今天最该读的一篇。

## 导读

claude opus 5 与 context engineering 新规则。来自 anthropic 团队。

## 核心观点

- 你发给 Claude 的那条 prompt，只是它实际拿到的上下文的一小部分。真正决定结果的，是由系统提示词、Skills、CLAUDE.md 文件、memory 等来源拼装起来的整体上下文——作者把这件事称为**上下文工程（context engineering）**。
- 上下文工程和写 prompt 有本质差别：prompt 是一次性的、可以很具体；上下文要跨很多次请求通用使用，**所以它没法那么具体**。难点就在于：你不知道用户下一句会问什么，却要先写好给 Claude 的通用指引。
- 更棘手的是，这套指引会随着 Claude 自身能力进化而过时。Anthropic 团队最近发现了一个大跳变：针对 Claude Opus 5、Claude Fable 5 这一代模型，他们**删掉了 Claude Code 系统提示词的 80% 以上，编码评测上没有可测量的损失**。
- 结论不是"提示词写得越细越好"，而是相反：过去那些为了兜住最坏情况而加的强约束，正在变成新一代模型的**枷锁**（over-constraining）。当模型判断力足够时，正确做法是删掉规则、把决定权还给模型和它周围的上下文。
- 团队把这些实践固化进了 claude doctor——在 Claude Code 里用 /doctor 命令，可以自动帮你给 skills 和 CLAUDE.md 文件"瘦身"到合适尺寸。

## 给 Claude 松绑（Unhobbling Claude）

![图片展示了Claude在处理系统提示词、skills和用户请求时的上下文结构。系统提示词部分有“leave documentation as appropriate”等指令；skills部分有“do not add comments”等要求；用户请求部分有“just make it work like the old one”等说明。图片下方注释说明这是示例，不是真实指令的字面引用。该图与上下文紧密相关，直观呈现了Claude在处理指令时面临的复杂情况，是团队自我诊断中“系统提示词、CLAUDE.md、skills三层都在过度约束”的具体体现。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTZjOGE5YjA1M2EzMWZlYmYxNTdiN2U4MDIyNTAxZGJfNzcwZjAyMmJmMmIwNDk1MjhlYWEzNGJiZTc0ZGYwOTFfSUQ6NzY2OTUxNjU5OTE2MTg1MDgzN18xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文配图｜系统提示词与 skills、用户请求在同一份上下文里给出互相打架的指令，Claude 必须自己调和* ｜ [原图](https://neican-res.candobear.com/article-images/509afdef71f0920d1d6835476e1f18c06d891c5125314e4ac4de3df92c034a2e.jpg)

- 团队的自我诊断结论很直白：**我们过去把 Claude Code 约束得太狠了**，系统提示词、CLAUDE.md、skills 三层都在过度约束。
- 证据来自读自家内部使用的 transcript：同一个请求里经常出现互相打架的指令，比如系统提示词说"leave documentation as appropriate"（该写文档就写），另一处又说"DO NOT add comments"（不要加注释），系统提示词、skills 和用户请求彼此冲突。
- Claude 通常仍能读懂用户真实意图给出正确答案，但代价是：**它必须先花更多思考去消化这些重叠、冲突的指令，才能决定做什么**。冲突指令的成本不是"做错"，而是"想得更累"。
- 这些约束当初确有必要——是为了避免最坏情况（例如删文件）。但现在团队发现，**其中很多可以直接删掉，让模型用周围的上下文和自身判断力去决定**。
- 另一个变化是工具变多了。过去 Claude 主要靠 CLAUDE.md 充当记忆、信息和指引的来源；现在有了 memory、artifacts、skills，Claude 可以自己创造新的方式，在会话之间加载和共享上下文。CLAUDE.md 不必再一肩挑。

## 六条"过去 vs 现在"：那些已经变成神话的最佳实践

作者逐条列出了曾经正确、如今已成 myth 的上下文工程实践。

![这张图片对应文档中“六条‘过去vs现在’：那些已经变成神话的最佳实践”内容，是该部分的对比示意图。图中以左右对照的形式，呈现了六条AI上下文工程的旧实践与新规则：左侧为过去的旧做法，分别是给Claude提规则、给Claude示例、全部内容前置、重复自身、在Claude的模型记忆中存储信息、简单规格说明；右侧是对应适配Claude 5时代的新调整，分别是赋予Claude判断力、设计接口、采用渐进式披露、制作简洁的工具说明、自动记忆、丰富参考内容，清晰展现了AI内参中提及的优化规则。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YmQwZjY4ZWE0YmFkZTYzNjQyNzMwN2U2ODgxMTU2N2NfMjBjZGZmNGFkOGRlYWZiOGU0MzkwNWY1YjNkOTAyZmFfSUQ6NzY2OTUxNjU5OTMxMjg3ODUyMF8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文配图｜六条过去与现在的对照：规则改判断力、示例改接口、全部前置改渐进式披露等* ｜ [原图](https://neican-res.candobear.com/article-images/e302005b64c15c818cf465ce6134fe0b90a3537f54da1ce224f37688f62c6907.jpg)

- **过去：给 Claude 定规则 → 现在：让 Claude 用判断力**
- Claude Code 刚上线时，为了确保避开最坏情况，团队会给出"未必总是成立"的强指引。旧系统提示词的原话是：默认不写注释（"default to writing no comments"），绝不写多段 docstring 或多行注释块，一行封顶；除非用户要求，不要生成计划、决策或分析文档，要从对话上下文工作，而不是靠中间产物文件。
- 问题是，对某一类 prompt 这条指引就是错的：用户可能有自己的文档偏好，特别复杂的代码本来就需要多行注释块。
- 但在旧模型上，没有这些护栏，Claude 写出来的注释在很多情况下是错的，**团队只能接受这个 tradeoff**。新模型判断力更好，不靠显式规则也能处理好这类决定。
- 新系统提示词换成了一句话：写出读起来像周围代码的代码——匹配它的注释密度、命名和惯用法（"Write code that reads like the surrounding code: match its comment density, naming, and idiom."）。规则从"禁止什么"变成"对齐什么"。
- **过去：给 Claude 示例 → 现在：设计接口**
- 工具使用的头号法则曾经是：给 Claude 示例，告诉它怎么用。
- 但在最新模型上，团队发现**给示例反而会把模型约束在某个特定的探索空间里**。
- 替代做法：与其塞示例，不如认真想清楚工具、脚本和文件的**设计**——Claude 手里有哪些参数，这些参数怎样才能更有表达力。
- 作者给的例子是 Todo 工具：把 status 定义成 pending、in_progress、completed 的枚举，本身就在向 Claude 暗示该怎么用；而"同时只保留一项 in_progress"这条约定，则定义了团队想要的行为。**接口即指令**。

![图片展示了旧版工具说明与新版TodoWrite的对比。左侧“Before”部分以约9100字符的篇幅，列举了何时使用列表、示例等内容；右侧“TodoWrite”部分仅用“Create and update a task list for the current session...”一条约束表达，状态枚举为pending、in_progress、completed，强调一次只进行一项任务。该图与上下文讨论的AI内参主题精选中Claude 5时代上下文工程新规则相呼应，直观呈现了新旧版本在工具说明上的变化。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ODU4OGFhMDAyZWI2Y2QyNzIwZTQzNDI3ZjU3ZWM2YjFfMmZiYzU4OTA4MzgwMzhkMDViOTBmMjgzYTczZjQxMTZfSUQ6NzY2OTUxNjYwMTM4MDYwNDg3NV8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文配图｜旧版工具说明约 9100 字符堆满示例，新版 TodoWrite 只靠状态枚举和一条约束表达用法* ｜ [原图](https://neican-res.candobear.com/article-images/b83a7fd4198f65e23ff4f3f661d2f0f1a49e690f712d9205f231b5c58d1e49d6.jpg)

- **过去：全部前置 → 现在：渐进式披露（progressive disclosure）**
- 因为 Claude Code 聚焦编码，系统提示词里塞了详细的代码审查与验证说明。这些信息不是总需要，但需要的时候极其关键。
- 现在 Claude Code 已经很擅长渐进式披露——**在正确的时机加载正确的上下文**。团队把验证和代码审查搬进了各自独立的 skills，让 Claude Code 按需调用。
- 渐进式披露不只用于 skills，也用于工具：有些工具是 **deferred loading（延迟加载）**，agent 必须先用 ToolSearch 搜索到完整定义才能使用。这样团队可以挂载更多工具（比如 Task 类工具），而这些工具在被真正需要之前不占用上下文。
- 同一逻辑适用于你自己的 CLAUDE.md 和 SKILL.md。一个常见神话是：得把所有可能用到的实践都塞进一个中心仓库，否则 Claude 找不到。作者的建议正相反——**做一棵可以在恰当时机被加载的文件树**。
- **过去：重复自己 → 现在：简洁的工具描述**
- 早期 Claude 模型有时需要重复指令，而且更容易听上下文窗口末尾的指令、而不是开头的。
- 结果就是：系统提示词里既提到工具，工具描述里又写一遍说明。
- 团队发现这些重复的示例可以删掉，**把"怎么用这个工具"的说明放进工具描述本身，而不是系统提示词**。指令就近于它作用的对象。
- **过去：把记忆写进 \`CLAUDE.md\` → 现在：自动记忆（auto-memory）**
- 过去团队鼓励用户用 # 热键把内容自动写进 CLAUDE.md，以此保存记忆。
- 现在 Claude 会**自动保存**与当前工作和与你本人相关的记忆，不再需要用户手动维护这条通道。
- **过去：简单 spec → 现在：富引用（rich references）**
- 在 plan mode 里，Claude Code 一直重度依赖装着计划的 markdown 文件；把计划存成文件，方便 Claude 需要时回看。类似的老实践还有：把 spec 存进代码库，供 Claude 在长周期项目中随时参考。
- 但团队发现，**Claude 能处理的引用可以越来越复杂**。除了简单 markdown 文件，Claude 还能引用由新的 artifacts 功能生成的 HTML artifact。
- 引用也可以是代码形态：一份 spec 可以是一套详尽的测试套件，也可以是另一个代码库里某个待移植的函数。
- **Rubrics（评分标准）是引用的另一种形态**：它让 Claude 借助 dynamic workflows、启动带 rubric 的 verifier agent，去尝试验证你在某个领域的品味（比如"什么才算好的 API 设计"）。

## 落到你自己的上下文上：四层各写什么

作者把全文收拢成一份分层清单——当你亲手拼装上下文时，每一层该承担什么。

![图片展示了Claude 5时代上下文工程的构成，从上至下依次为Your prompt、References（提及的文件、规范、原型、代码库、产物等）、System prompt、Claude.MDs、Skills、Memory。其中Your prompt以红色框突出显示，表明其为最核心部分。该图与上下文紧密相关，直观呈现了上下文各层构成，帮助理解上下文工程中各要素的层级关系及重要性。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTQyNjc5OWMyMzYyZWEzZTEwMjA2N2EzNjMzYmJkZTZfNzkxMjY3Y2FiOWNhOTFmOGNmYzgxNTI1OWFlNTU2ZTNfSUQ6NzY2OTUxNjYwMjMyODUxNzYxM18xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文配图｜prompt 之外，引用、系统提示词、项目记忆文件、Skills、记忆逐层拼装成上下文* ｜ [原图](https://neican-res.candobear.com/article-images/7e19611584b686a75ea6fb711c9a3ef5521d6f5a094e58b26a175f654941669c.jpg)

- **系统提示词（System Prompt）**
- 它和产品语境强绑定：告诉 Claude 它运行在什么产品里、正在做什么事。
- 对 Claude Code 用户来说，你基本永远不会去改它；但如果你在构建自己的 agent harness，**这一层值得你花大量时间**。
- **\`CLAUDE.md\`**
- 保持轻量：简要说明这个 repo 是干什么的。
- 把大部分 token **花在代码库里的 gotchas 上**——例如"所有类型都集中放在一个巨型文件里，别处没有"这类反直觉约定。
- 避免陈述"显而易见"的东西：Claude 看一眼文件系统或 repo 就能知道的事，不要写。
- 更多细节交给渐进式披露：比如你有若干独特的验证工作方式，就建一个 verification skill，然后从 CLAUDE.md 引用它。
- **Skills**
- 把 skill 当作**轻量指南**：让 Claude 在需要时能找到信息。
- 避免把 skill 写得过度约束，只有在极其重要的领域才例外。
- 长 skill 要尽量用渐进式披露：拆成多个文件、分出去。
- Skill 的最佳用途，是编码那些**属于你、你的团队或你的产品所特有的观点、知识和最佳实践**。
- **References（引用）**
- 可以用 @ 提及文件把它们作为引用带入，让 Claude 参考当前计划的深度信息。
- 引用可以是 spec 文件、mockup，甚至整个代码库。
- 一般应**优先选择以代码形式存在的文件**，因为代码是 Claude 极其熟悉的语言，能提供清晰、高保真的指令。
- 作者给的对照很具体：一份设计的 HTML mockup，通常会比对该设计的文字描述或一张截图产生更好的结果。

## 行动收束：试着做减法

- 作者的最终建议只有一句：在你的系统提示词、skills 和 CLAUDE.md 文件上，**你可能需要像我们一样做一次简化**。
- 团队为此上线了新命令 claude doctor，可以帮你自动完成这件事。
- 想更深入了解如何为更高阶模型写提示词，团队另有一份 Fable field guide 可供参考。

![这是一张展示Claude 5时代上下文工程新规则的关系图，采用Mermaid源码渲染，布局调整为从左到右适配文档宽度。图中以左侧的“Claude 5时代的上下文工程新规则”为总分支，分四个核心板块展开内容：一、总结Claude的特点，涵盖核心观点、能力优势、成本分析、新旧工具分组等；二、对比“六条过左”与“四条过右”的不同路径，涉及能力侧重点、迭代逻辑、重复工作、自动生成CLAUDE.md相关内容；三、明确四条过右的具体编写要求，如简单spec、偏好内容及CLAUDE.md相关细节；四、说明行动收束的要求为做减法，提及可用claude doctor自动完成简化操作。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NjQwNzFhYWQ4OWZkMjBkMzdjZWMwMGQzMzExNTlkYWRfODM5YjJlZTNlMGRkMWVkYTg3NTBkNjJlZTNjNmJiOWFfSUQ6NzY2OTUxNjU5OTQyMTk2MzIzOF8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染；仅将 TD 改为 LR 以适配文档宽度；节点与连线未改*



## 概念网络

### 关键概念

### 上下文工程（context engineering）

**context**：文章的总纲概念。作者指出，"当你给 Claude 发一条消息时，prompt 只是它拿到的上下文的一小部分"——大部分上下文是从系统提示词、Skills、CLAUDE.md 文件、memory 及其他来源**装配**出来的。这个装配过程就叫上下文工程，它对你用 Claude Code 或自建 agent 时的产出质量"影响很大"。

**费曼一下**：写 prompt 像是当面交代一件事，上下文工程则像是给一个新同事准备入职手册、工位环境和工具箱。手册写什么、放在哪、什么时候拿出来看，决定了他日后处理你没预料到的任务时表现如何。

### prompt 与 context 的通用性落差

**context**：作者点出的核心结构性难点——"和 prompt 不同，context 会被跨很多请求通用使用，所以它不可能那么具体"。由此引出全文要解决的问题：在不知道用户会问什么的前提下，如何写通用的指引。

**费曼一下**：一次性便签可以写"今天下午三点把这份合同送到 A 公司"；但贴在墙上给所有人长期看的规程，只能写"外送文件要登记签收"。后者越想写具体，越容易在某些场景下变成错的。

### 过度约束与松绑（over-constraining / unhobbling）

**context**：作者对自家实践的诊断结论：团队"在系统提示词、CLAUDE.md 文件和 skills 里都过度约束了 Claude Code"。松绑的直接战果是：面向 Claude Opus 5、Claude Fable 5 这代模型，Claude Code 系统提示词删掉 80% 以上，编码评测无可测量损失。

**费曼一下**：给新手司机装的限速器、防撞杆，等他成了老司机还不拆，反而妨碍他正常开车。unhobbling 就是"拆掉已经不需要的辅助装置"。

### 冲突指令的隐性成本

**context**：团队读自家 transcript 时发现，同一个请求里同时存在"leave documentation as appropriate"和"DO NOT add comments"这类互相打架的指令。关键判断是：Claude 通常仍能推断用户意图给出正确答案，但它**必须先更费力地思考这些重叠冲突的信息，才能决定做什么**。

**费曼一下**：三个领导给你下了三条互相矛盾的命令，你最后还是把事办对了，但一半精力花在了猜"到底听谁的"上。冲突指令的代价不是出错，而是白烧掉的思考。

### 护栏与判断力的取舍（guardrail tradeoff）

**context**：文章解释了旧强规则为何存在——为避免删文件这类最坏情况。对旧模型而言，没有护栏时 Claude 写的注释"在很多情况下是错的，我们只能接受这个 tradeoff"。而新模型判断力更好，不需要显式规则也能处理好。这条概念把"规则数量"变成了**模型能力的函数**。

**费曼一下**：护栏是一笔交易——用"在少数场景下做错"换"绝不出大事"。当对方本事变强，这笔交易就不划算了，该退掉。

### 从"禁止什么"到"对齐什么"

**context**：新旧系统提示词的对照是全文最具操作性的一处细节。旧版是一串禁令（默认不写注释、绝不写多行注释块、不要生成中间文档）；新版换成一条对齐指令：写出读起来像周围代码的代码，匹配它的注释密度、命名和惯用法。

**费曼一下**：与其列一张"不许做的事"清单，不如给一个参照物："照着屋里现有的风格来。"后者更短，却在更多情况下是对的。

### 示例会收窄探索空间

**context**：曾经的工具使用头号法则是给 Claude 示例。作者的新发现是，对最新模型而言，**给示例反而把它们约束在某个特定的探索空间里**（"giving examples actually constrains them to a certain exploration space"）。这是全文对既有共识反转最强的一条。

**费曼一下**：你给学生看了三道范例题，他就默认题目只有这三种解法。示例在给出方向的同时，也悄悄划掉了别的可能。

### 接口即指令（design interfaces）

**context**：替代示例的方案。作者要求重新思考工具、脚本、文件的**设计**：Claude 有哪些参数，这些参数怎样更有表达力。Todo 工具的例子说明了机制：把 status 写成 pending / in_progress / completed 的枚举，本身就在提示用法；"同时只保留一项 in_progress"则定义了期望行为。

**费曼一下**：好工具不需要说明书。插头只能按一个方向插进插座，你不用读手册也不会插反——形状本身就是指令。

### 渐进式披露（progressive disclosure）

**context**：贯穿全文的组织原则，被作者反复应用于 skills、工具和用户自己的文件。定义是"在正确的时机加载正确的上下文"。落地方式包括把验证和代码审查拆成独立 skills 供按需调用，以及把 CLAUDE.md 的细节外移到被引用的 skill 里。

**费曼一下**：把所有资料都摊在桌上，你反而找不到要用的那份。渐进式披露是把资料按需从抽屉里取——需要时在手边，不需要时不占桌面。

### 延迟加载工具与 ToolSearch

**context**：渐进式披露在工具层的具体形态。部分工具是 "deferred loading"，agent 必须先用 ToolSearch 搜索到完整定义才能调用。作者说明了收益：这让团队可以挂载更多工具（例如 Task 类工具），而它们**在被需要之前不占用上下文**。

**费曼一下**：工具箱里放五十把工具，但只有你伸手去找的那一把才拿出来摊开。工具变多不等于工作台变乱。

### 上下文文件树（tree of files）

**context**：作者点名要破除的一个神话——认为 CLAUDE.md 和 SKILL.md 应该成为"所有已知实践的中央仓库"，否则 Claude 找不到。他的替代主张是：构建**一棵可以在恰当时机被加载的文件树**。

**费曼一下**：知识不该堆成一本谁也读不完的百科全书，而该整理成一个有目录的书架——先看目录，再抽出需要的那一本。

### 指令就近原则

**context**："重复自己 → 简洁工具描述"这条转变背后的原理。早期模型有时需要重复指令，且更倾向于听上下文窗口末尾而非开头的指令，导致系统提示词和工具描述里各写一遍。新做法是删掉重复，**把"怎么用这个工具"的说明放进工具描述本身**。

**费曼一下**：使用说明贴在机器上，比印在员工手册第 47 页有用。指令应该待在它作用的那个东西旁边。

### 自动记忆（auto-memory）

**context**：CLAUDE.md 职能被拆解的一个例证。过去鼓励用户用 # 热键把内容自动写进 CLAUDE.md 来保存记忆；现在 Claude 会自动保存"与工作相关、与你相关"的记忆。它与 artifacts、skills 一起，构成了 Claude 在会话之间加载和共享上下文的新通道。

**费曼一下**：以前得靠你自己记笔记给助手看，现在助手边工作边自己记，还知道哪些值得记。

### 富引用（rich references）

**context**：对"spec 只能是简单 markdown 文件"这一旧实践的升级。作者列举了引用可以采取的更复杂形态：新 artifacts 功能生成的 HTML artifact、一套详尽的测试套件、另一个代码库里待移植的函数。落到 References 层的选择原则是：**优先选以代码形式存在的文件**，因为代码是 Claude 极其熟悉的语言，能给出清晰、高保真的指令——一份 HTML mockup 通常胜过文字描述或截图。

**费曼一下**：告诉装修师傅"我要简约风"，不如直接给他一张实景照片；给他一套可执行的施工图，比照片还准。载体的保真度决定了结果的保真度。

### Rubrics 与验证 agent

**context**：引用的另一种形态，也是全文里最"元"的一招。Rubric 让 Claude 借助 dynamic workflows、启动带该 rubric 的 verifier agent，去**尝试验证你在某个领域的品味**——作者举的例子是"什么才算好的 API 设计"。

**费曼一下**：你把自己的评分标准写下来交给对方，他就能自己给自己打分，而不必每件事都来问你满不满意。品味一旦被写成可检查的条目，就能被复制和自动执行。

### gotchas 优先的 CLAUDE.md

**context**：CLAUDE.md 层的具体写法准则。保持轻量、简述 repo 用途，**把大部分 token 花在代码库里的 gotchas 上**（例如类型集中在一个巨型文件里这类反直觉约定），并明确"避免陈述显而易见的东西"——Claude 看文件系统或 repo 就能知道的，不要写。

**费曼一下**：给新同事的交接文档，不该复述办公室在几楼，而该写"三楼那台打印机要先按两次开关才认纸"。只有意外之处才值得写下来。

### 概念网络

![图片为Context Engineering文章中关于Claude 5时代上下文工程新规则的思想网络图。图中以“模型能力跃升”为核心，涵盖“护栏与判断力的取舍”“渐进式披露”“上下文工程”等关键概念，还涉及“上下文文件树”“自动记忆”“推理记忆”等具体机制，以及“claude doctor”“工具箱”等工具。该图是对文章思想的可视化呈现，直观展示了各概念间的关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=OWI5ZWQ3NDk5MmZmNGRiMjYxNTQ0ZWQzMDQxM2E3NDJfNjEwYzgxZmE3MmZmNzlmMGNiYWZlNmIzNmI2MTY2NmRfSUQ6NzY2OTUxNjU5ODY3NTM2MDcxNl8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



这篇文章的思想网络有一个明确的源头：**模型能力的跃升**。Claude Opus 5、Claude Fable 5 这代模型判断力变强，直接导致了「护栏与判断力的取舍」这笔旧交易失效——过去用"少数场景做错"换"绝不出大事"是划算的，现在不再划算。整篇文章其余所有主张，都是这一个变量变化后的连锁反应。

第一条因果链是**减法链**。能力跃升 → 旧护栏变成「过度约束」→ 松绑（unhobbling）→ 系统提示词删掉 80% 而评测无损。「冲突指令的隐性成本」是这条链上的关键中间环节：它解释了为什么冗余约束不是"无害的保险"——即使 Claude 最终答对，它也必须先耗费思考去消化互相打架的指令。这就把"删规则"从一个风格偏好，升级成一个有明确收益的工程决策。「从禁止什么到对齐什么」是这条链的落地形态：删掉禁令清单之后，留下的不是空白，而是一条更短、在更多情况下成立的参照式指令。

第二条因果链是**替代链**，回答"删掉的东西用什么补"。作者提供了三种替代物，彼此层级不同：

- 用**接口**替代示例。「示例会收窄探索空间」与「接口即指令」构成一对因果——示例的坏处（框死探索空间）恰恰是接口的好处（用参数形状暗示用法而不封死路径）。枚举值 pending / in_progress / completed 就是把指令编码进了结构本身。
- 用**位置**替代重复。「指令就近原则」把说明搬到工具描述里，删掉了系统提示词中的复述。它与「冲突指令的隐性成本」同源：指令散落多处既产生冗余，也产生矛盾。
- 用**时机**替代前置。这就引出了全文的组织总原则。

「渐进式披露」是网络中的**枢纽概念**，向下辐射出三个具体实现，覆盖三个不同层级：在工具层是「延迟加载工具与 ToolSearch」（工具变多但不占上下文）；在 skills 层是把验证、代码审查拆成可按需调用的独立 skill；在用户文件层是「上下文文件树」，用来破除"CLAUDE.md 应当是万物中央仓库"的神话。这三者共享同一个机制：**把上下文的"有没有"问题，转化成"什么时候加载"的问题**。

「自动记忆」和「富引用」则从另一个方向解构了 CLAUDE.md 的旧地位。过去 CLAUDE.md 一肩挑记忆、信息、指引三职；现在 memory、artifacts、skills 各自接走一块。记忆职能被 auto-memory 接走，spec 职能被 rich references 接走。「富引用」内部还有一条保真度递进：文字描述 < 截图 < HTML mockup < 可执行的测试套件或代码，越靠近 Claude 熟悉的语言，指令保真度越高。「Rubrics 与验证 agent」是这条递进的终点也是升维——它引用的不再是内容，而是**评判内容的标准**，从而让品味本身变得可执行、可自动验证。

最后，第三部分的四层清单（系统提示词 / CLAUDE.md / Skills / References）不是新增概念，而是把上述所有原则**按层归位**的一张表：系统提示词管产品语境（普通用户不动，自建 harness 者重投入），CLAUDE.md 遵循「gotchas 优先」只写反直觉之处，Skills 作为轻量指南承载团队特有的观点与实践并内部再做渐进式披露，References 优先选代码形态以求高保真。四层之间是**由通用到具体、由长期到当下**的梯度关系，而渐进式披露正是这个梯度得以成立的机制——每一层都可以把细节推迟到下一层、在需要时才展开。

网络的收口是 claude doctor：它把整张网络里的判断压缩成一条可执行命令，让"做减法"从一个需要品味的手工活，变成一次可以自动执行的体检。

## 费曼 x3

我们写给 AI 的每一条规则，都是在为它当时的某种不足买保险。保险有代价，只是过去代价看不见——直到模型变强，保费还在扣。

Anthropic 砍掉了 Claude Code 系统提示词的 80%，编码评测没有可测量的下降。刺眼的不是省下多少 token，而是那 80% 早已不是指令而是噪音。噪音还会互相打架：读自己团队的使用记录，同一个请求里同时出现"酌情保留文档"和"不要写注释"——系统提示词、skill 与用户请求彼此冲突。Claude 通常仍能猜中意图，但它得先在这些互相重叠矛盾的信号里权衡，才轮到干活。

于是旧的最佳实践一条条变成了迷思。给规则变成给判断：写死的"默认不写注释"换成了"写出读起来像周围代码的代码：匹配它的注释密度、命名和惯用法"。给例子变成设计接口——例子反而把模型框进某个探索空间，不如让参数自己说话，一个 pending / in_progress / completed 的枚举就已讲清了用法。全部前置变成渐进披露：代码审查和验证挪进单独的 skill，需要时才加载；工具也可以延迟加载，用到才搜出完整定义。

这背后有一个值得反复自问的问题：我此刻写下的这条约束，是模型真的需要，还是我不放心？前者是知识，后者是焦虑。知识值得进上下文，焦虑不值得。所以 CLAUDE.md 该省着写，把 token 花在代码库里那些真正的坑上，而不是复述文件系统一看便知的事实。

工具变强之后，最难删掉的从来不是代码，是我们对旧世界的记忆。

---
