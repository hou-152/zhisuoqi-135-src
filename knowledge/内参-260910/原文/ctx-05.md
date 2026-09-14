# Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集

- 标题：Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集
- 来源：anthropic.com
- 原文：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- 作者：Anthropic
- 类型：主题特刊
- 摘要：给出上下文的组织原则和常见反模式，强调「少而准」胜过「多而全」，并展开压缩、结构化笔记、多 agent 三种长任务技术。与 Manus 一文形成官方视角和实践视角的对照。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：15579
- 策展人按：紧挨着 Manus 放是刻意的。两篇一致的地方你随手就信了，打架的地方才是你得自己做决定的地方。

---

- 原文标题：Effective context engineering for AI agents
- 作者：Anthropic
- 内参日期：2026-07-31
- 来源类型：blog
- 原文：https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- 标签：Anthropic, context engineering

给出上下文的组织原则和常见反模式，强调「少而准」胜过「多而全」，并展开压缩、结构化笔记、多 agent 三种长任务技术。与 Manus 一文形成官方视角和实践视角的对照。

## 导读

context engineering 专题

## 核心观点

- 好的 context engineering，就是为 agent 找到**最小可能的高信号 token 集合**（the smallest possible set of high-signal tokens），让期望结果出现的概率最大化。这是全文唯一的指导原则，其余全部技术都是它在不同组件上的投影。
- prompt engineering 是「写好一段指令」的离散任务；context engineering 是在每一轮推理时反复发生的**策展**（curation）——从不断膨胀的可能信息宇宙里，决定什么进入有限的上下文窗口。
- context 必须被当成**有限资源**看待，且边际收益递减。LLM 和人一样有一份「注意力预算」（attention budget），每多一个 token 就从中支取一点。
- 长时程任务绕开窗口限制的三种技术：compaction（压缩）、structured note-taking（结构化记事）、sub-agent 架构；三者是按任务特征取舍，不是优劣排序。
- 演进方向：模型越强，需要的规定性工程越少，agent 自主度越高；但「把 context 当作珍贵而有限的资源」这一点不会随能力提升而失效。

## context engineering 是 prompt engineering 的自然演进

![这张配图对比了单轮prompt工程与agent的上下文策展循环：左侧为单轮prompt工程的流程，仅包含System prompt、User message、Context window、Assistant message，内容简洁。右侧为agent的上下文工程流程，标注为“Context engineering for agents”，可见Context window中需纳入System prompt、Memory file、Tool、User message、Message history等多类信息；该流程会先挑选可用的上下文内容送入模型，在生成Tool call后接收Tool result，再通过裁剪优化context窗口，形成工具结果回流后反复迭代的循环，契合文档中上下文工程是prompt工程自然演进的定位。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YzA5ODgwMmJmMWQyNDM2ZTJlYTE5MmZhNmYyNjBhZWRfZGQwZDJhM2VhZGY4ZDFkYWYyNjExMDIwNjBlMTgwY2RfSUQ6NzY2OTUxNjY0ODYyNTI0NTExNV8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文配图｜左为单轮 prompt 工程，右为 agent 的上下文策展循环：工具结果回流后需反复裁剪* ｜ [原图](https://neican-res.candobear.com/article-images/2c80407789814d462d3e75d2f530b82a8461ef52c7d5fa7bd3207e57f957f6fe.webp)

- Anthropic 的定位很明确：context engineering 是 prompt engineering 的自然演进（natural progression），不是替代关系。
- 两个词各自的所指：**context** 指从 LLM 采样时被纳入的那组 token；**engineering** 指在 LLM 固有约束下优化这些 token 的效用，以稳定达成期望结果。
- 有效驾驭 LLM 常常需要 \_thinking in context\_：考虑 LLM 在任一时刻可获得的**整体状态**，以及这个状态可能诱发什么行为。
- prompt engineering 关注怎么写、怎么组织指令（尤其 system prompt），它适配的是聊天之外那些一次性分类、文本生成的 one-shot 任务。
- 当我们转向能跨多轮推理、更长时间跨度运行的 agent，就必须管理**整个上下文状态**：system 指令、工具、MCP（Model Context Protocol）、外部数据、消息历史等等。
- 真正的差别在节奏：写 prompt 是一次性动作；context engineering 是迭代的——**每一次决定「传什么给模型」，策展环节就发生一次**。
- 在循环里跑的 agent 会不断产出「下一轮可能相关」的数据，这些信息必须被周期性地提炼（cyclically refined）。Karpathy 所说的 art and science，指的正是这件事。

## 为什么重要：context rot 与注意力预算

- **context rot（上下文腐烂）**：needle-in-a-haystack 类基准研究发现，随着上下文窗口内 token 数增加，模型准确召回其中信息的能力下降。不同模型的衰减陡缓不同，但这个特性在所有模型上都会浮现。
- 由此得出的判断是：context 必须被当作**有限资源**，且边际收益递减。像工作记忆容量有限的人类一样，LLM 在解析大量 context 时是从一份「注意力预算」里支取。
- 注意力稀缺的根源在架构层面：
- transformer 让每个 token 都能 attend 到其他每个 token，n 个 token 就产生 n² 对成对关系。
- 上下文长度增加时，捕捉这些成对关系的能力被摊得越来越薄，于是**上下文规模与注意力聚焦之间存在天然张力**。
- 另一层原因来自训练数据分布：短序列通常比长序列常见，模型对「跨全上下文的依赖」经验更少、专用参数也更少。
- position encoding interpolation 之类的技术能让模型处理更长序列（把长序列适配回原本训练的较小上下文），代价是 token 位置理解上的一些退化。
- 结论的分寸感很关键：这些因素造成的是**性能梯度而非硬悬崖**（a performance gradient rather than a hard cliff）——长上下文下模型依然高度可用，只是相对短上下文，信息检索精度和长程推理会变弱。
- 正因如此，深思熟虑的 context engineering 对构建有能力的 agent 是必需项，而不是优化项。

## 有效 context 的解剖：system prompt、工具、示例

- 总纲：既然注意力预算有限，**好的** context engineering 就意味着找到**最小可能的高信号 token 集合**，使期望结果的概率最大化。说起来容易，落地极难，下面是它在各组件上的具体含义。
- **system prompt 要找对「高度」（the right altitude）**：这是两种常见失败模式之间的 Goldilocks 区间。
- 一端：工程师在 prompt 里硬编码复杂、脆弱的 if-else 逻辑去逼出精确的 agent 行为——制造脆弱性，维护复杂度随时间上升。
- 另一端：给出含糊的高层指导，没能给 LLM 关于期望输出的具体信号，或者错误地假设了共享 context。
- 最优高度是平衡：足够具体到能有效引导行为，又足够灵活，给模型强启发式（strong heuristics）去自行判断。

![图片展示了系统提示（system prompt）的校准示例，分为太具体、恰到好处、太模糊三类。太具体类示例为Claude的助手，需严格遵循步骤；恰到好处类示例为Claude的客服，能理解客户真实需求，提供解决方案；太模糊类示例为面包店助手，仅能提供基本服务。该图与上下文紧密相关，直观呈现了系统提示在不同具体度上的表现，帮助理解有效context的解剖。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YWUyM2ZiYTkxYThhYjljNzk2MjI1YTBhMzYzNzFjZWVfY2RkMjEzZTc3NzJlMmM3MGI0OTE2YTc4MmEyNGIyYzRfSUQ6NzY2OTUxNjY0ODYwODUxNzA5MF8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文配图｜system prompt 高度标尺：过于具体的硬编码与过于含糊的套话之间是恰当区间* ｜ [原图](https://neican-res.candobear.com/article-images/9afca72306eb25f348bcd2c924f19e4f679fa877242e2c4f6eb8fa1136a0d2a7.webp)

- 组织方式上的建议：把 prompt 拆成彼此区分的小节（如 ## Tool guidance、## Output description 等），用 XML 标签或 Markdown 标题做分隔；不过随着模型变强，prompt 的确切格式重要性正在下降。
- 一个容易误读的分寸：「最小」不等于「短」（minimal does not necessarily mean short）——仍要预先给足信息，确保 agent 遵循期望行为。实践路径是先用手上最好的模型测一个最小 prompt，看它在任务上的表现，再依据初测暴露的失败模式补清晰指令和示例。
- **工具是 agent 与其信息/行动空间之间的契约**，所以工具必须促进效率：既返回 token 效率高的信息，也鼓励 agent 高效行事。
- 工具应当像设计良好的代码库里的函数：自包含、对错误健壮、用途极其清晰；输入参数同样要有描述性、无歧义，并契合模型的固有强项。
- 最常见的失败模式是**臃肿的工具集**：覆盖功能过宽，或制造出「该用哪个工具」的模糊决策点。文中给出的判据非常锋利——如果人类工程师都无法确定某个场景该用哪个工具，就不能指望 AI agent 做得更好。
- 精简到最小可用工具集还有额外收益：长交互中 context 的维护与剪枝会更可靠。
- **示例要策展而非堆砌**：few-shot prompting 是持续强烈推荐的最佳实践，但团队常犯的错是把一长串边缘 case 塞进 prompt，试图穷举 LLM 应遵守的每条规则——这不被推荐。正确做法是策展一组多样、典型（diverse, canonical）的示例，有效刻画 agent 的期望行为。对 LLM 而言，示例就是那种「胜过千言万语」的图片。
- 跨组件（system prompt、工具、示例、消息历史）的总原则是同一条：深思熟虑，让 context 既有信息量又保持紧凑（informative, yet tight）。

## 运行时取数：just in time 检索与 agentic search

- 文中采纳了一个简明的 agent 定义：**LLM 在循环中自主使用工具**（LLMs autonomously using tools in a loop）。与客户协作时可以看到，整个领域正收敛到这个朴素范式。
- 随着底层模型变强，agent 的自主度可以随之放大：更聪明的模型让 agent 能独立穿越微妙的问题空间，并从错误中恢复。
- 设计思路正在迁移：今天许多 AI-native 应用采用某种推理前的 embedding 检索，把重要 context 预先铺给 agent；随着领域转向更 agentic 的做法，越来越多团队在这套检索系统之上叠加 **just in time** 策略。
- just in time 的具体形态：不预处理全部相关数据，而是让 agent 维护轻量标识符（文件路径、存好的查询、网页链接等），运行时用工具按这些引用动态加载数据进 context。
- Claude Code 用这套方法在大型数据库上做复杂数据分析：写有针对性的查询、存下结果、用 head 和 tail 这类 Bash 命令分析大批数据，全程不把完整数据对象载入 context。
- 这与人类认知同构：我们一般不记住整个语料库，而是引入文件系统、收件箱、书签这类外部组织与索引系统，按需取回相关信息。
- **元数据本身就是可利用的信号**：对运行在文件系统里的 agent 来说，tests 目录下的 test_utils.py，与位于 src/core_logic/ 的同名文件，暗示的用途完全不同。目录层级、命名约定、时间戳都在告诉人和 agent「何时、如何使用这份信息」。
- **渐进式披露（progressive disclosure）**：让 agent 自主导航与检索，它就能通过探索增量地发现相关 context。文件大小暗示复杂度、命名约定暗示用途、时间戳可作相关性的代理；agent 逐层拼装理解，工作记忆里只保留必要部分，并用记事策略做额外持久化。这种自管理的上下文窗口让 agent 聚焦于相关子集，而不是淹没在详尽却可能无关的信息里。
- **代价与前提**：运行时探索比取预计算数据慢；而且需要有主张、经过深思的工程，确保 LLM 拥有正确的工具与启发式来导航自己的信息版图。缺乏恰当引导时，agent 会误用工具、追进死胡同、认不出关键信息，白白烧掉 context。
- **混合策略**：某些场景下最有效的 agent 会先取一部分数据保证速度，再自行决定深入探索。Claude Code 正是这种混合模型——CLAUDE.md 文件被朴素地一次性放入 context，而 glob、grep 这类原语让它即时取回文件，有效绕开了陈旧索引和复杂语法树的问题。
- 边界判断取决于任务：内容不那么动态的场景（如法律、金融工作）更适合混合策略。随着模型能力提升，agentic 设计会趋向「让聪明的模型聪明地行动」，人工策展逐步减少。给在 Claude 上构建 agent 的团队，最好的建议大概仍是「do the simplest thing that works」。

## 长时程任务的三种技术：压缩、记事、子 agent

- 问题定义：长时程任务要求 agent 在 token 总量超出上下文窗口的动作序列中，维持连贯性、context 和目标导向行为——比如跨越几十分钟到数小时连续工作的大型代码库迁移、综合性研究项目。
- 「等更大的上下文窗口」看似是显而易见的对策，但可预见的未来里，各种尺寸的窗口都会面临 context 污染与信息相关性问题——至少在追求最强 agent 表现的场景下如此。
- **compaction（压缩）**
- 做法：把接近窗口上限的对话做摘要，用这份摘要重新初始化一个新的上下文窗口。它通常是提升长期连贯性的第一根杠杆，本质是高保真地蒸馏一个窗口的内容，让 agent 以最小的性能损失继续跑。
- Claude Code 的实现：把消息历史交给模型总结压缩最关键的细节，保留架构决策、未解决的 bug、实现细节，丢弃冗余的工具输出和消息；agent 随后带着压缩后的 context 加上最近访问的五个文件继续工作，用户不必操心窗口上限就获得连续性。
- 手艺在于「留什么、弃什么」的选择：过度激进的压缩会丢掉微妙但关键的 context，而它的重要性往往事后才显现。
- 调优路径很具体：先最大化召回率，确保压缩 prompt 能抓全 trace 里每条相关信息，再迭代提升精确率，剔除多余内容。
- 最安全、最轻的一种形式是**清理工具调用与结果**：一个工具在消息历史深处被调用过之后，agent 为什么还需要看到原始结果？该能力已作为 Claude Developer Platform 的特性发布。
- **structured note-taking（结构化记事，又称 agentic memory）**
- 做法：agent 定期把笔记写到上下文窗口之外的持久化存储，之后再把这些笔记拉回窗口。开销极小，却提供了持久记忆。
- 形态可以很朴素：Claude Code 建 to-do 列表，或自定义 agent 维护一个 NOTES.md；这个简单模式让 agent 在几十次工具调用之间追踪进度、保住本会丢失的关键 context 和依赖关系。
- Claude playing Pokémon 是非编码领域的证明：agent 跨数千游戏步维持精确计数，追踪诸如「过去 1234 步我一直在 1 号道路练级，皮卡丘已升 8 级，目标是 10 级」这样的目标；在没有任何关于记忆结构的提示下，它自己发展出已探索区域的地图、记住已解锁的关键成就、维护对战策略笔记以学会哪种攻击对哪类对手更有效。
- 上下文重置之后，agent 读自己的笔记继续数小时的练级或地牢探索——这种跨摘要步骤的连贯性，是把全部信息都留在 LLM 窗口里所不可能达成的。
- 配套能力：随 Sonnet 4.5 发布，Claude Developer Platform 上线了 public beta 的 memory 工具，用基于文件的系统在窗口之外存取信息，让 agent 逐步积累知识库、跨会话维持项目状态、引用过往工作。
- **sub-agent 架构（子 agent）**
- 做法：不让单个 agent 扛住整个项目的状态，而是让专门化的子 agent 用干净的上下文窗口处理聚焦任务；主 agent 拿高层计划做协调，子 agent 做深度技术工作或用工具找信息。
- 关键的经济性在于回传比：每个子 agent 可能探索甚广、用掉数万乃至更多 token，但只返回浓缩提炼的摘要（通常 1000-2000 token）。
- 收益是清晰的关注点分离——详细的搜索 context 被隔离在子 agent 内部，主 agent 专注于综合与分析结果。在复杂研究任务上，这一模式相对单 agent 系统展现出实质性提升。
- **三者之间怎么选**（原文按任务特征并列给出）
- compaction 适合需要大量来回往复的任务，维持对话流。
- note-taking 擅长有清晰里程碑的迭代式开发。
- 多 agent 架构适合复杂研究与分析，并行探索能带来回报。
- 即使模型继续变强，跨长交互维持连贯性的挑战，仍将是构建更有效 agent 的核心议题。

## 指导原则与演进方向

- context engineering 代表了「用 LLM 构建」这件事的根本转变：模型越强，挑战就越不是打磨那句完美的 prompt，而是深思熟虑地策展——每一步让什么信息进入模型有限的注意力预算。
- 无论你在为长时程任务实现 compaction、设计 token 高效的工具，还是让 agent 即时探索环境，指导原则始终同一条：**找到最小的高信号 token 集合，最大化期望结果出现的概率**。
- 已可观察到的趋势：更聪明的模型需要更少规定性的工程，agent 可以拥有更大自主度；文中列出的技术也会随模型改进而继续演化。
- 但即便能力持续放大，把 context 当作珍贵而有限的资源来对待，仍将是构建可靠、有效 agent 的中心工作。

## 概念网络

### 关键概念

### context engineering（上下文工程）

**context**：全文的定义性概念——「curating and maintaining the optimal set of tokens (information) during LLM inference」，即在 LLM 推理期间策展并维护最优 token 集合，涵盖落进上下文的一切信息，而不只是 prompt。Anthropic 把它定位为 prompt engineering 的自然演进。

**费曼一下**：写 prompt 像给人写一张便条，措辞对了就行；context engineering 像给一个正在干活的同事布置整间工位——桌上摆哪些资料、给他哪些工具、之前的对话留多少、外部数据接进来多少。工位布置对了，人才能干得好；而且每交接一次任务，工位就得重新收拾一遍。

### 注意力预算（attention budget）

**context**：文中把 LLM 的注意力类比为人类有限的工作记忆容量——模型在解析大量 context 时从一份预算里支取，「every new token introduced depletes this budget by some amount」。这是 context 必须被当作有限资源、且边际收益递减的直接理由。

**费曼一下**：把模型的注意力想成一天的体力。每往它眼前多放一份材料，就要花掉一点体力去看、去比对。材料堆到一定量，人还在，但已经开始眼花——不是不认字了，是顾不过来了。

### context rot（上下文腐烂）

**context**：来自 needle-in-a-haystack 类基准研究的发现——随上下文窗口 token 数增加，模型准确召回其中信息的能力下降。文中强调「some models exhibit more gentle degradation than others」，但这一特性在所有模型上都会出现。

**费曼一下**：给人一页纸，让他找出其中一句话，很容易；给一整本书，同一件事就开始出错。书没变难，只是要顾及的东西太多了。模型也一样，窗口塞得越满，从里面精准捞出某条信息就越不靠谱。

### 性能梯度而非硬悬崖（performance gradient rather than a hard cliff）

**context**：文中对长上下文退化给出的分寸判断——transformer 的 n² 关系、训练分布中短序列占优、position encoding interpolation 的位置理解损失，这些因素叠加造成的是渐变的性能滑坡，而非某个长度之后突然失效。模型在长上下文下仍高度可用，只是信息检索精度与长程推理相对变弱。

**费曼一下**：不是过了某条线就报废，而是像开车上坡：坡越陡越费力，速度一点点掉，但车没熄火。所以问题不是「多长算太长」，而是「值不值得为这段内容付出精度」。

### 最小高信号 token 集合（smallest possible set of high-signal tokens）

**context**：全文的唯一指导原则，出现在「有效 context 的解剖」开头并在结尾再次点题——好的 context engineering 就是找到使期望结果概率最大的最小高信号 token 集合。文中特别澄清「minimal does not necessarily mean short」。

**费曼一下**：像收拾出差行李。目标不是箱子越轻越好，而是每一件都用得上、且缺一件就出问题。该带的一件不能少，不该带的一件都不要带——最小，是指没有一件多余，不是指少带。

### 恰当高度（the right altitude）

**context**：描述 system prompt 写作的 Goldilocks 区间。一端是硬编码复杂脆弱 if-else 逻辑以逼出精确行为，制造脆弱性与维护负担；另一端是含糊的高层指导，缺乏具体信号或错误假设共享 context。最优点是「specific enough to guide behavior effectively, yet flexible enough to provide the model with strong heuristics」。

**费曼一下**：交代事情的颗粒度。说「客人进门第 3 秒说你好，第 7 秒递菜单」是把人当机器；说「让客人感到宾至如归」又等于没说。好的交代是「先问清楚客人的需求再推荐，拿不准就叫店长」——有判断依据，但不替对方做每一步决定。

### 工具即契约（tools as the contract）

**context**：文中把工具定义为「the contract between agents and their information/action space」，因此工具必须促进效率：返回 token 高效的信息，并鼓励高效的 agent 行为；工具应像设计良好的代码库函数一样自包含、对错误健壮、用途清晰。

**费曼一下**：工具不只是能力，更是一份说明书，规定了 agent 能碰什么、怎么碰、碰完拿回什么。说明书写歪了，能力再强也用不对地方；而且工具吐回来的每个字都要占注意力预算，所以「说得少而准」本身就是工具的设计目标。

### 臃肿工具集（bloated tool sets）

**context**：文中点名的最常见失败模式——工具覆盖功能过宽，或制造出「该用哪个」的模糊决策点。判据极为锋利：「If a human engineer can't definitively say which tool should be used in a given situation, an AI agent can't be expected to do better.」

**费曼一下**：厨房里摆了七把功能重叠的刀，新来的厨师第一反应是发愣。工具多不等于能力强，重叠和歧义会直接转化成犹豫和出错。判断标准很简单：让一个熟手来看，他能不能一口说出该用哪把。

### 典型示例策展（diverse, canonical examples）

**context**：针对 few-shot prompting 的具体纪律。文中反对把一长串边缘 case 堆进 prompt 试图穷举规则，主张策展一组多样、典型的示例来刻画期望行为；对 LLM 来说，示例就是那种「胜过千言万语」的图片。

**费曼一下**：教人做事，与其列一百条例外条款，不如给三个做得漂亮的样板。样板传递的是判断风格，条款传递的只是死记的规则——而且条款越多，人越容易在真遇到新情况时不知所措。

### just in time 上下文检索

**context**：与「推理前把相关数据全预处理铺进 context」相对的策略——agent 只维护轻量标识符（文件路径、存好的查询、网页链接），运行时用工具按引用动态加载。Claude Code 借此在大型数据库上做分析，用 head、tail 处理大批数据而不载入完整对象。

**费曼一下**：不把整个图书馆搬进书房，只在书桌上放一张索书号清单，要用哪本再去取。人本来就这么活——我们不背下所有资料，而是靠文件夹、收件箱、书签这些外部系统，需要时再翻出来。

### 渐进式披露（progressive disclosure）

**context**：just in time 检索带来的认知模式——agent 通过探索增量发现相关 context，每次交互产出的信息又指导下一步决策：文件大小暗示复杂度、命名约定暗示用途、时间戳可作相关性代理。agent 逐层拼装理解，工作记忆只保留必要部分。

**费曼一下**：像走进一座陌生城市，不是先背下整张地图，而是从街名、门牌、店铺招牌一点点认出这是什么区域。每看一眼就多知道一点，也就知道下一眼该往哪看——理解是层层长出来的，不是一次性灌进去的。

### 混合检索策略（hybrid strategy）

**context**：预检索与即时检索的折中——先取一部分数据保证速度，再由 agent 自行决定深入探索。Claude Code 是范例：CLAUDE.md 一次性放入 context，glob、grep 等原语支持即时取文件，绕开陈旧索引与复杂语法树。文中指出内容不那么动态的场景（法律、金融）更适合它。

**费曼一下**：出门前先把地图和常用电话装口袋，其余的到了现场再问。两种做法各有代价——全预备太慢太重，全现问又容易走弯路，所以真实的做法通常是先备最稳定的那部分。

### compaction（上下文压缩）

**context**：长时程任务的第一根杠杆——把接近窗口上限的对话摘要后，用摘要重新初始化新窗口。Claude Code 的实现保留架构决策、未解决的 bug、实现细节，丢弃冗余工具输出，并带上最近访问的五个文件。调优路径是先最大化召回率再提升精确率；最轻的形式是清理已调用过的工具结果。

**费曼一下**：会开到一半白板写满了，就把结论和未决事项誊到新白板上，其余擦掉重来。难的不是誊写，是判断哪条「现在看着没用、过会儿才发现关键」——擦得太狠，代价往往过很久才浮现。

### 结构化记事 / agentic memory

**context**：agent 定期把笔记写到上下文窗口之外并在需要时拉回，形态可以是 to-do 列表或一个 NOTES.md。Claude playing Pokémon 展示了它的威力：跨数千游戏步维持精确计数与目标，自发形成区域地图、成就记录、对战策略笔记，上下文重置后靠读自己的笔记续上。

**费曼一下**：人做长期项目靠的不是记性，是笔记本。记性会断，笔记不会。agent 也一样——把状态写到窗口之外，重置之后回来读一遍，就还是那个知道自己干到哪儿的它。

### sub-agent 架构与关注点分离

**context**：绕开窗口限制的另一条路——专门化子 agent 用干净窗口处理聚焦任务，主 agent 用高层计划协调。关键在回传比：子 agent 可能用掉数万 token 探索，只返回 1000-2000 token 的浓缩摘要。详细搜索 context 隔离在子 agent 内，主 agent 专注综合分析，在复杂研究任务上相对单 agent 有实质提升。

**费曼一下**：主编不亲自跑现场，而是派几个记者各查一条线，每人回来交一页纸。记者那边翻了多少材料主编不必知道，他要的是那一页纸——这样主编的桌面永远清爽，判断力也就不会被材料淹掉。

### 概念网络

![图片为原文关系图，由Mermaid源码直接渲染。图中以“注意力预算”为核心，分为因果和约束两部分。因果部分有“context rot上下文腐烂”“context engineering上下文工程”等；约束部分有“sub-agent架构”“compaction上下文压缩”等。上下文工程需满足层级、长时程任务连贯性等核心原则，支撑包括最小高信号token集合、典型示例策展、just in time上下文检索等，还涉及system prompt恰当高度、结构化记事与外部记忆、工具层契约等内容。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NmZlYWMyMTRkMzIxODk4ZjM5ZTFlMWEwODlkNmEzZTVfNGMxOGE1YzJiM2JjOTg4YzFiNmRlYTRmYjY3ZWFlOWJfSUQ6NzY2OTUxNjYzNjEyNjIzNTU5NV8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



这张思想网络有一个明确的重心：**注意力预算**。它既是全部论证的起点，也是所有技术选择的裁判。

- **从架构到约束，是一条严格的因果链**：transformer 的全连接注意力带来 n² 对成对关系，叠加训练分布中短序列占优，共同造成注意力的稀缺；稀缺的可观测形态就是 context rot——窗口越满，召回越差。这条链条的终点不是「长上下文不能用」，而是一个有分寸的结论：性能梯度而非硬悬崖。三者是因果递进，不是并列罗列的现象；缺了任一环，「注意力是有限资源」这个前提就变成了没有根据的口号。
- **从约束到原则，是层级关系**：注意力预算的有限性直接推出 context engineering 的唯一核心原则——最小高信号 token 集合。文章之后所有具体建议，都是这条原则在不同组件上的投影，而不是彼此独立的技巧清单。理解了这一点，就不会把这篇文章读成一份 tips 汇编。
- **原则有四个同层投影，但内部有分工**：恰当高度、工具即契约、典型示例策展，三者作用于「预先往窗口里放什么」；just in time 检索作用于「运行时把什么取回来」。前者是静态策展，后者是动态策展，二者合起来才覆盖 agent 的完整生命周期。工具设计与 just in time 之间还有一条隐含支撑——正因为工具是 agent 触达信息的唯一通道，工具的 token 效率直接决定了即时取数是省 context 还是烧 context。
- **检索路线内部存在真实张力，而非谁替代谁**：just in time 支撑渐进式披露，让 agent 靠元数据与探索逐层拼装理解；代价是它比取预计算数据慢，且高度依赖工具与启发式的质量，引导不当就会在死胡同里烧掉 context。混合策略正是这对张力的解，所以它与 just in time 之间画的是无向关联——两条路线互相制衡，边界由任务的动态程度决定。
- **长时程的三种技术是另一层展开，彼此是取舍而非优劣**：compaction、结构化记事、sub-agent 架构都服务于同一个目标——token 总量超出窗口时仍维持连贯性。选择判据是任务特征：来回往复多的选压缩，里程碑清晰的选记事，需要并行探索的选多 agent。压缩与记事之间尤其构成一对取舍：压缩是把历史揉进摘要（保真但有损），记事是把状态挪到窗口外（无损但需主动维护）。
- **有一条回路让整张网络闭合**：sub-agent 架构反过来支撑了核心原则。子 agent 用掉数万 token 却只回传一两千 token，本身就是「最小高信号集合」在多 agent 层面的实现——它不只是绕开窗口限制的工程手段，更是同一条原则换了一个尺度重新出现。这使得全文从「约束推出原则、原则派生技术」的线性推演，变成一个自我印证的闭环。

## 费曼 x3

真正稀缺的资源从来不是算力，是注意力。这个判断对人成立，对模型同样成立，只是我们花了几年才肯承认。

用 LLM 的早期，人们相信存在一句完美的咒语，措辞找准，模型就会听话。可当模型开始在循环里连续跑上几十分钟甚至几小时，问题的形状变了：不再是该写哪句话，而是此刻模型眼前的这一整套状态，最可能让它做出什么行为。一次性写好的东西，变成了每一轮都要重做的取舍。

约束其实来自架构本身。每个 token 都能 attend 到其他每个 token，n 个 token 就是 n² 对关系，上下文越长，这张关系网被摊得越薄；训练语料里短序列又远多于长序列。于是有了 context rot——窗口里 token 越多，模型准确召回其中信息的能力越低。它不是悬崖而是缓坡，长上下文下模型依然能干，只是精度在悄悄流失。

承认这一点，工程判断就全变了。context 不再是越多越好的输入，而是一份会被消耗的注意力预算，每多一个 token 都从里面支取一点。于是整件事可以压成一句话：找到最小的高信号 token 集合，让期望结果出现的概率最大。要紧的是，最小不等于短——该给的信息一点不能少，不该给的一点都不要给。

这条原则往下落，会长出一串彼此呼应的手艺。system prompt 要落在 Goldilocks 区间，一端是硬编码的脆皮逻辑，另一端是含糊到没有信号的套话；工具集要精简到「如果人类工程师都说不清该用哪个，就别指望 agent 做得更好」；示例要策展成多样而典型的一组，而不是把边缘 case 堆成清单。取数方式也在转向：与其把数据预处理好全铺进去，不如只留文件路径、查询和链接这类轻量标识符，运行时按需加载。人本来就这么活着——我们不背下整个语料库，而是发明了文件系统、收件箱和书签。

任务长到窗口装不下时，办法也只有三种：压缩对话重新开始，把笔记写到窗口之外，或者让子 agent 烧掉几万 token 只交回一两千 token 的提炼。Claude 玩宝可梦时自己长出了区域地图和对战笔记，跨数千步维持目标——那不是记忆力的胜利，是外部化的胜利。

模型会继续变强，越强就越不需要规定性的工程。但把 context 当成珍贵而有限的资源，这件事不会过期。

---
