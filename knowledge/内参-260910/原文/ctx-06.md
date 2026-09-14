# 12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则

- 标题：12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则
- 来源：github.com
- 原文：https://github.com/humanlayer/12-factor-agents
- 作者：Dex Horthy (HumanLayer)
- 类型：主题特刊
- 摘要：把 agent 工程沉淀成十二条可检查的原则，覆盖控制流、状态、工具和人机接口。可以直接当自查清单用。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：12041
- 策展人按：开头六篇到此为止。前五篇负责让你信，这篇负责让你有活干，所以压在这组最后。

---

- 原文标题：GitHub - humanlayer/12-factor-agents: What are the principles we can use to build LLM-powered software that is actually good enough to put in the hands of production customers?
- 作者：Dex Horthy (HumanLayer)
- 内参日期：2026-07-31
- 来源类型：blog
- 原文：https://github.com/humanlayer/12-factor-agents
- 标签：harness engineering, agents

把 agent 工程沉淀成十二条可检查的原则，覆盖控制流、状态、工具和人机接口。可以直接当自查清单用。

## 导读

agents 的 12 条原则

## 核心观点

- 作者 Dex Horthy 提出的中心问题只有一句：「What are the principles we can use to build LLM-powered software that is actually good enough to put in the hands of production customers?」——什么样的原则，能让 LLM 驱动的软件好到真敢交到生产用户手上。
- 他的经验结论是反直觉的：**好的 agent 大多不是 agent**。市面上自称 "AI Agents" 的产品「are not all that agentic」，多数是确定性代码，只在恰当的点上撒进几步 LLM，体验才显得神奇。
- 好的 agent 并不遵循「here's your prompt, here's a bag of tools, loop until you hit the goal」这一模式，而是「comprised of mostly just software」——绝大部分仍然是软件工程。
- 因此 12-factor agents 的定位不是又一个框架，而是一组可拆解、可单点植入的工程原则。作者的判断是：即便 LLM 继续指数级变强（"continue to get exponentially more powerful"），仍会存在让 LLM 软件更可靠、更可扩展、更好维护的核心工程技法。
- 落地路径也随之改变：与其为 agent 做一次 greenfield rewrite，不如把 agent 构建中的「small, modular concepts」拿出来，嵌进你已有的产品里；这些模块化概念不需要 AI 背景，大多数熟练软件工程师都能定义和应用。

## 作者是谁，凭什么下这个判断

- 自我介绍很直白：Dex 长期在做 AI agents，做 HumanLayer。
- 三条经验来源构成了全文的立论基础。
- 「I've tried every agent framework out there」：从即插即用的 crew / langchain，到「minimalist」的 smolagents，再到号称「production grade」的 langgraph、griptape 等。
- 「I've talked to a lot of really strong founders」：YC 内外都有，都在做很不错的 AI 产品，而多数人是自己 rolling the stack——他很少在面向客户的生产级 agent 里看到框架。
- 「I've been surprised to find」：真正被交付出去的所谓 agent，agentic 程度远低于宣传。
- 项目本身是公开的（humanlayer/12-factor-agents），精神来源是 12 Factor Apps（12factor.net），并向早期反馈者与 SF MLOps 社区致谢。

## 我们是怎么走到这里的：从代码到 DAG，再到「扔掉 DAG」

- 起点是一个几乎被遗忘的常识：**软件本身就是有向图**（directed graph）。「There's a reason we used to represent programs as flow charts.」——我们曾经用流程图表示程序，不是没有道理的。
- 大约 20 年前，DAG 编排器开始流行：Airflow、Prefect，以及更新的 dagster、inngest、windmill。它们沿用同一套图模式，额外带来了可观测性、模块化、重试、管理能力。
- agent 的承诺，是「you get to throw the DAG away」——把 DAG 扔掉。
- 不再由工程师逐步骤、逐边界情况地写代码，而是给 agent 一个目标和一组可能的转移（transitions）。
- 让 LLM 在运行时实时决策，自己找出路径。
- 承诺很诱人：你写更少的软件，只给出图的「边」，让 LLM 去填「节点」；出错能恢复，代码更少，甚至可能找到人想不到的新解法。
- 但作者随即给出预告：「it turns out this doesn't quite work.」这句转折是全文的枢纽——十二条原则正是从这个「不太行」里长出来的。

## agent 循环的真实形态

- 把 agent 拆到最里层，就是一个三步循环（原文写作三步，实际代码含终止判断）。
- LLM 决定工作流的下一步，输出结构化 json，也就是 tool calling。
- 确定性代码执行这次 tool call。
- 结果被 append 回 context window，然后重复，直到下一步被判定为 "done"。
- 原文给出的最小实现骨架，是理解后续所有原则的锚点。

**代码块：javascript**

initial_event = {"message": "..."}

context = [initial_event]

while True:

next_step = await llm.determine_next_step(context)

context.append(next_step)

if (next_step.intent === "done"):

return next_step.final_answer

result = await execute_step(next_step)

context.append(result)



- 初始 context 只是一个起始事件：可能是用户消息，可能是 cron 触发，可能是 webhook。
- 关键观察：这个循环里，**context 就是 agent 的全部状态**——每一步的决策与结果都堆在同一个数组里。谁掌握 context，谁就掌握 agent 的行为。
- ※ 原文此处配有一段多步骤循环的动画演示（027-agent-loop-animation），本地归档只留了文件名与 GIF 链接，未含画面。

## 为什么需要 12-factor：那堵 80% 的墙

- 在做 HumanLayer 的过程中，作者与至少 100 位 SaaS builders（多为技术型创始人）聊过，他们都想让既有产品更 agentic。旅程惊人地一致。
- 决定要做一个 agent。
- 做产品设计、UX 映射，想清楚解决什么问题。
- 想跑得快，于是抓起 \$FRAMEWORK 开干。
- 冲到 70-80% 的质量水位。
- 发现对大多数面向客户的功能来说，80% 根本不够好。
- 发现要越过 80%，就得反向工程框架、prompt、流程。
- 推倒重来，from scratch。
- 这条路径解释了为什么「原则」比「框架」更值钱：框架帮你快速到 80%，但最后那 20% 需要的恰恰是框架替你藏起来的那些东西——prompt、context、控制流。
- 三条免责声明界定了讨论边界。
- 这绝不是对众多框架及其背后聪明人的贬低（"BY NO MEANS meant to be a dig"），它们让不可思议的事成为可能，加速了整个 AI 生态；作者希望框架作者也能从这些旅程中学习，把框架做得更好，尤其是服务那些「want to move fast but need deep control」的构建者。
- 不谈 MCP——「I'm sure you can see where it fits in.」
- 示例主要用 TypeScript，但所有内容在 Python 或任何语言里同样成立。

## 设计判断：不是二选一，而是模块化植入

- 在翻遍数百个 AI 库、与数十位创始人合作后，作者的直觉是一组并列判断。
- 确实有一些核心要素让 agent 变得优秀。
- 全押某个框架、做一次实质上的 greenfield rewrite，可能适得其反。
- 这些核心原则，你引入框架时大多也能顺带获得。
- 但他见过的最快路径，是把 agent 构建中小而模块化的概念取出来，融进既有产品。
- 这些模块化概念，大多数熟练软件工程师都能定义并应用，哪怕没有 AI 背景。
- 原文把其中一条单独提为引述块，等于全文的行动纲领：「The fastest way I've seen for builders to get good AI software in the hands of customers is to take small, modular concepts from agent building, and incorporate them into their existing product」。

## 十二条原则清单

- 原文以完整清单形式给出（前置一节为 How We Got Here: A Brief History of Software）。
- Factor 1: Natural Language to Tool Calls——自然语言到工具调用。
- Factor 2: Own your prompts——prompt 归你自己所有。
- Factor 3: Own your context window——上下文窗口归你自己所有。
- Factor 4: Tools are just structured outputs——工具只不过是结构化输出。
- Factor 5: Unify execution state and business state——统一执行状态与业务状态。
- Factor 6: Launch/Pause/Resume with simple APIs——用简单 API 启动、暂停、恢复。
- Factor 7: Contact humans with tool calls——用工具调用去联系人类。
- Factor 8: Own your control flow——控制流归你自己所有。
- Factor 9: Compact Errors into Context Window——把错误压缩进上下文窗口。
- Factor 10: Small, Focused Agents——小而专注的 agent。
- Factor 11: Trigger from anywhere, meet users where they are——从任意入口触发，去用户所在的地方。
- Factor 12: Make your agent a stateless reducer——把你的 agent 做成无状态 reducer。
- 清单本身已能读出三条主线：**所有权**（Factor 2/3/8 三次重复 "Own your…"）、**状态与生命周期**（Factor 5/6/12）、**边界与外部世界**（Factor 7/10/11）。
- 荣誉提名：Factor 13: Pre-fetch all the context you might need——把你可能用到的上下文预先取好。
- ※ 本地归档为该项目 README 首页（索引页），每条 Factor 的详细论证在各自的独立页面，未包含在本次原文中；上表按标题原意呈现，不做超出标题的展开。

## 延伸资源

- 作者在 The Outer Loop 写作，并在 2025 年 3 月的 Tool Use 播客中谈过这些内容；他与 @hellovai 做过 Maximizing LLM Performance 的 webinar。
- 团队以这套方法论构建开源 agent（got-agents/agents）；同时坦承「we ignored all our own advice」，为在 kubernetes 上运行分布式 agent 造了一个框架。
- 指南中引用的其他链接包括：Building Effective Agents (Anthropic)、Prompts are Functions、Schema Aligned Parsing、Function Calling vs Structured Outputs vs JSON Mode、BAML、Outer Loop Agents、The AI Agent Index (MIT)，以及 Airflow / Prefect / Dagster / Inngest / Windmill 等编排器。

## 概念网络

### 关键概念

### 12-factor agents

**context**：全文的命名与纲领，"In the spirit of 12 Factor Apps"。它回答的是那个被作者单独提为引述块的问题——什么原则能让 LLM 软件「actually good enough to put in the hands of production customers」。作者明确它不是框架，而是一组可以被单独取用的工程要素。

**费曼一下**：就像当年 12 Factor Apps 不是一个 Web 框架，而是一份「你的服务要能上云、要能扩容，就得满足这几条」的检查表。12-factor agents 是同一种东西的 agent 版：不管你用什么语言、什么库，只要你的 LLM 软件要交给真实付费用户用，这十二条就是你迟早要面对的工程约束。

### 「并不 agentic」的 AI Agent

**context**：作者的惊讶发现——市面上以 "AI Agents" 为卖点的产品「are not all that agentic」，多数是 mostly deterministic code，只在恰到好处的点上撒进 LLM 步骤，体验才 truly magical。

**费曼一下**：好的自动驾驶不是让方向盘随机发挥，而是把绝大部分路况交给确定的规则，只在少数需要判断的时刻调用智能。agent 也一样：LLM 是点睛，不是骨架。当你发现产品做得好的地方其实是普通代码在支撑，那不是失败，那正是它能上线的原因。

### 软件即有向图

**context**：作者从 Directed Graphs (DGs) 与 DAGs 讲起，指出「software is a directed graph」，并提醒「There's a reason we used to represent programs as flow charts」。这是他重述 agent 演化史的起点。

**费曼一下**：任何程序说到底都是「从这一步走到那一步」的箭头集合。流程图之所以能表示程序，是因为程序本来就长那样。理解这一点后再看 agent，你会发现所谓的智能决策，不过是把「谁来决定下一支箭头指向哪」这个权限，从程序员手里挪给了模型。

### DAG 编排器

**context**：约 20 年前流行起来的一类工具——Airflow、Prefect，以及 dagster、inngest、windmill。它们沿用图模式，额外提供 observability、modularity、retries、administration。

**费曼一下**：这是把流程图工业化的产物：每一步是什么、失败了重试几次、跑到哪一步了、谁能看，全都被管起来。代价是这张图必须由人事先画完。它可靠，但不灵活——所有没画进去的情况，运行时都不存在。

### 「扔掉 DAG」的承诺

**context**：作者学 agent 时最大的心得，是 "you get to throw the DAG away"：不再逐步骤、逐 edge case 写代码，而是给 agent 一个目标和一组转移，让 LLM 实时决策路径。承诺是写更少的软件、能从错误中恢复、甚至找到 novel solutions。紧接着他写道：「it turns out this doesn't quite work.」

**费曼一下**：等于说「你只要告诉司机目的地，路线交给他」。听起来省事得多，但真拉上乘客跑城市配送时你就会发现，你需要的不是一位天才司机，而是可预期、可复盘、出事能定位的运输系统。承诺本身没错，错的是以为它可以免掉工程。

### agent 循环

**context**：全文的最小结构单元——LLM 输出结构化 json 决定下一步（tool calling）、确定性代码执行该 tool call、结果 append 回 context window，重复到 next_step 的 intent 为 "done"。原文以一段 while True 伪代码固化这一循环。

**费曼一下**：一台只会做三件事的机器：想下一步、干这一步、把结果记在本子上，然后重来。所有关于 agent 的复杂讨论，最后都要落回这三步中的某一步——你要么改它怎么想，要么改它怎么干，要么改那个本子怎么记。

### context window 即 agent 状态

**context**：在原文循环里，context 起手只是一个 initial event（用户消息、cron、webhook），随后每一次决策与每一次执行结果都被 append 进去。Factor 3 直呼 "Own your context window"。

**费曼一下**：agent 没有记忆器官，它的全部人生经历就是那段被反复喂回去的文本。你往里塞什么、按什么顺序塞、塞多少，直接决定它下一步会做什么。所以上下文不是配置项，而是这个系统真正的状态数据库——把它交给框架托管，等于把数据库交给别人。

### 80% 质量墙

**context**：那条被作者见过至少 100 次的旅程终点——冲到 70-80% 的质量水位后，「Realize that 80% isn't good enough for most customer-facing features」。

**费曼一下**：demo 和产品之间隔着的不是 20% 工作量，而是一整个数量级的确定性要求。给自己看，十次对八次很惊艳；给客户用，十次错两次就是事故。所有工程原则的动机，都在这堵墙后面。

### 框架反向工程

**context**：越过 80% 的代价——"getting past 80% requires reverse-engineering the framework, prompts, flow, etc"，其结局往往是 start over from scratch。

**费曼一下**：框架用抽象换速度，前提是你不需要看抽象底下的东西。可一旦质量要求逼你去调那句 prompt、那次重试、那段上下文，你就得把它拆开——而拆一个不是你写的黑箱，通常比自己写一遍还慢。这不是框架的罪过，是抽象的收费时点到了。

### 小而模块化的概念

**context**：作者给出的最快路径——「take small, modular concepts from agent building, and incorporate them into their existing product」，并强调多数熟练工程师即使没有 AI 背景也能应用它们。

**费曼一下**：不要为了做 agent 把产品推倒重做，而是把 agent 里那些独立好用的零件（工具调用、状态管理、人工介入点）一个个拧进现有系统。每拧一个都能立刻验证收益，出问题也能单独退回来。这是增量演化，不是革命。

### 所有权原则

**context**：十二条里三次出现 "Own your…"——Factor 2 own your prompts、Factor 3 own your context window、Factor 8 own your control flow。这一重复本身就是作者的强调方式。

**费曼一下**：prompt、上下文、控制流，是决定 agent 行为的三个开关。凡是你没握在手里的开关，出问题时你就修不了。所谓生产可用，很大程度上就是这三样东西的产权是否清晰地归你。

### 工具即结构化输出

**context**：Factor 4 的标题主张——"Tools are just structured outputs"。它与循环中「LLM 输出结构化 json，确定性代码执行」的分工完全对应。

**费曼一下**：LLM 其实什么也没「调用」，它只是吐出一段格式规整的话，说自己想干什么；真正动手的是你的代码。把工具去神秘化成一份结构化输出，责任边界立刻清楚了——模型只负责表达意图，执行的正确性永远是软件的事。

### 统一执行状态与业务状态

**context**：Factor 5 "Unify execution state and business state"，与 Factor 6 的 Launch/Pause/Resume with simple APIs、Factor 12 的 stateless reducer 构成一组关于状态与生命周期的主张。

**费曼一下**：如果「agent 跑到第几步了」和「这单业务处在什么阶段」是两份账本，它们迟早对不上，而且没人知道该信哪份。合成一份账本，agent 才能随时停下、随时恢复，也才能像纯函数那样：把当前状态和一个新事件丢进去，得到下一个状态。

### 用工具调用联系人类

**context**：Factor 7 "Contact humans with tool calls"，与 Factor 11 "Trigger from anywhere, meet users where they are"、Factor 10 "Small, Focused Agents" 一同界定 agent 与外部世界的边界。作者本人的产品 HumanLayer 正是围绕这一方向。

**费曼一下**：把「问一下人」做成 agent 可以调用的一个普通工具，而不是流程崩溃时的例外分支。这样一来，人不是 agent 失败后的补丁，而是它工具箱里的一件工具——需要授权、需要判断、需要担责的时候就调用，调用完循环继续走。

### 概念网络

![图片为12-Factor Agents工程原则的思想网络图。从“软件即有向图”出发，经历DAG编排器的演化，再到扔掉DAG的承诺，最终落地为agent循环。图中包含所有权原则、小而模块化概念、无状态reducer等主张，以及统一执行与业务状态、用工具调用联系人类等包含内容，还涉及context window即状态、框架反向工程等。该图与上下文紧密相关，直观呈现了全文思想脉络。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MDE5NGYwYWQ5OWNlMmFlOGY0ZDNlY2Y2ZDA4NTIzY2FfN2ZkOTg3MTMwOTQ5NGFlNTU5YTUwOGQ5MjJjNmQwOGJfSUQ6NzY2OTUxNjYzNjI5ODIwMjEwMF8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



全文的思想网络由一条历史线索和一次转折构成。

历史线索从「软件即有向图」出发：既然程序本来就是箭头的集合，DAG 编排器就是把这些箭头工业化管理的自然产物，代价是图必须由人事先画满。agent 的出现带来了「扔掉 DAG」的承诺——把画节点的权力交给 LLM，人只给边。这条演化线在 agent 循环处落地：LLM 决定下一步、确定性代码执行、结果回写 context window。循环之所以成立，全靠 context window 承担了 agent 的全部状态，所以「工具即结构化输出」是这个循环的必要前提——模型只表达意图，执行永远由软件负责。

转折发生在 80% 质量墙。承诺与现实之间的落差，正是「扔掉 DAG」与质量墙之间的张力：把路径决策整个交给模型，能很快抵达 70-80%，但面向客户的功能里，80% 不够好。要越过它就必须反向工程框架、prompt 与流程，多数团队最终推倒重来。这条代价链条催生了 12-factor agents——它不是新框架，而是从失败路径里提炼出的工程约束。「并不 agentic 的产品」从另一侧印证同一结论：真正交付成功的产品，骨架本就是软件。

十二条原则围绕这个中心呈放射状展开，且各自回指前面的结构。所有权原则（own your prompts / context window / control flow）直接覆盖 context window 这一状态载体，它是把 80% 之后的调优权力收回自己手里的手段。状态与生命周期一组中，「统一执行状态与业务状态」支撑「无状态 reducer」：只有账本合一，agent 才能被当作「旧状态 + 事件 → 新状态」的纯函数来启动、暂停与恢复。边界一组里，「用工具调用联系人类」与「小而专注的 agent」把不确定性挡在系统边缘。而「小而模块化的概念」是这一切的落地方式：原则之所以被拆成十二条而不是打包成框架，就是为了让它们能被逐个植入既有产品，避免另一次 greenfield rewrite。

※ 需注意，本次原文为项目索引页，每条 Factor 的详细论证位于各自独立页面；上述网络中十二条原则之间的关系依据其标题语义与作者在正文中的立论线索推得，未展开各条内部论证。

## 费曼 x3

有个说法值得先摆在桌上：那些真正交付给客户、跑在生产环境里的所谓 AI Agent，大多并不 agentic。它们的主体是确定性代码，只在恰到好处的几处撒进 LLM，体验才显得神奇。这听上去像是对 agent 的贬低，其实是对它的辩护——好的 agent 之所以能交付，恰恰因为它 comprised of mostly just software。

我们对 agent 的最初想象是「你可以把 DAG 扔掉」。二十年来我们用 Airflow 这类编排器把流程图工业化，代价是每一条边、每一个 edge case 都得人来画。agent 的承诺是把画节点的权力交给模型，人只给目标和一组转移，让 LLM 在运行时自己找路。写更少的代码，还能从错误里恢复。诱惑力毋庸置疑。

问题出在最后那截路。把路径决策整个交给模型，你会很快冲到 70-80% 的质量水位，然后撞墙：对大多数面向客户的功能，80% 不够好。而越过 80% 的唯一办法，是反向工程框架、prompt 和流程——去拆一个不是你写的黑箱，通常比自己写一遍还慢。于是推倒重来，from scratch。这条路径重复了上百次，才逼出了原则本身。

有意思的是，十二条原则里有三条都以同一个词开头：own your prompts、own your context window、own your control flow。这种重复不是修辞。agent 的全部状态就是那段被反复喂回去的上下文，它的全部行为由 prompt、上下文和控制流三个开关决定。凡是你没握在手里的开关，出事时你就修不了。所谓生产可用，说穿了是这三样东西的产权是否清楚。

所以真正的建议不是换个框架，而是别做那次 greenfield rewrite：把 agent 里那些小而模块化的概念一个个拧进你已有的产品——工具只是结构化输出，人也可以是一次工具调用，执行状态和业务状态该合成一份账本。这些零件不需要 AI 背景就能理解，每拧一个都能立刻验证收益。即便模型继续指数级变强，让软件可靠、可扩展、好维护的那些技法也不会过时。它们从来不是模型的补丁，而是软件工程本来的样子。

---
