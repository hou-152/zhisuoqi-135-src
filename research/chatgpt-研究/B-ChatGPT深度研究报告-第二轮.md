# 外部联网深度研究：哪些新证据真的会改知所栖的决策

## 决策结论

**会，而且这次确实找到了本地材料里没有、足以改变当前决策的外部证据。** 最重要的不是又找到几篇“学习科学支持主动回忆”的论文，而是三处真正的 **delta**：

| 外部新增证据 | 相对你们现有材料的变化 | 当前应改什么 | 决策强度 |
|---|---|---|---|
| **Tutor MCP 已经公开实现跨会话 learner state、misconception、session memory，并让 `get_next_activity` 综合这些状态决定下一活动** | 你们原先可谨慎写“公开可查范围未发现直接实现”；现在这句话已经过期 | **删除“没有公开实现先例”**。改成“已有早期开放实现；尚未找到成熟产品对‘自由复述漏点→下次主动回问’这一完整闭环的大规模公开实现” | **必须改路演/调研口径** |
| **二〇二四至二〇二五的新研究支持“有后果/非可选”显著提高 retrieval participation，但并不支持把门禁无限加硬** | 给“限速器到底多硬”补上了本地没有的新证据 | **维持软门禁：验收必须复述，但允许继续；跳过记‘未验收’。不要改成绝对锁死** | **产品动作明确** |
| **ALEKS、Math Academy、Synthesis 已把“根据当前状态决定下一题/下一课/下一活动”做成运行产品；LearnVector 自己则明确尚未发布产品** | “下一个教学动作”不能再当成空白竞争格；“与吴恩达同构”也证据过界 | **删“与吴恩达同构”**，改成“与 LearnVector 公布的问题方向同向”；把差异锚到“漏点→可验证下一动作”而不是“会决定下一步” | **必须改路演叙事** |

与此同时，Q1 反而得到一个很重要的**负结果**：截至 **2026 年 9 月 11 日**，公开搜索能确认与你们时间对应的“知乎 AI 黑客松新锐季走进贸大”，但**没有检索到当前这一场可公开核验的知乎/贸大官方规则页**；评分维度、权重、提交物细则、第三方材料与外部数据规则仍不能升级为事实。二手赛事索引只写到了“可实际演示的软硬件原型”以及知乎搜索、热榜、知识图谱、Agent、社交关系等能力。citeturn21search2

所以，外部研究对这四十八小时最值钱的结果不是“多写五页背景”，而是：

> **改两句路演，保持一种限速器，不再说一个“无先例”结论，并停止按猜出来的评审权重优化。**

这和输入包原先把“主办方规则”“跨会话先例”“LearnVector 竞争面”留作未核实外部变量的判断正好形成了有效增量，而不是重做本地学习科学底稿。fileciteturn0file0

## 主办方规则

**结论：当前比赛的官方评分权重、完整提交物规则和第三方数据规则仍然没有公开一手证据可核；这不是研究失败，而是一个应该直接约束路演修改的结果。与此同时，公开信息足以确认你们面对的不是五月那一场旧赛，而是九月的“新锐季走进贸大”，因此绝不能把五月规则偷偷移植到九月。**

**证据。** 当前公开赛事索引出现了与你们时间高度吻合的条目 **“知乎 AI 黑客松新锐季走进贸大”**，地点北京、开始日期为 2026 年 9 月 13 日；其活动描述要求把灵感做成“**可实际演示的软硬件原型**”，并称鼓励利用知乎搜索、热榜、知识图谱、智能 Agent、社交关系等 API，探索社交互动、知识获取和内容创作。这个来源是**二手赛事索引**，所以可以作为“定位线索”，**不能作为正式规则依据**。citeturn21search2

我进一步以完整活动名、`知乎 AI 黑客松新锐季`、`走进贸大` 分别限定知乎、对外经贸大学和微信公众号搜索，截至 9 月 11 日没有找到可索引的官方规则页面。因此，下列项目依然必须保持“未找到／待主办方确认”：

| 项目 | 当前可核状态 |
|---|---|
| 当前九月场的赛道正式名称与边界 | **未找到一手规则** |
| 评分维度 | **未找到** |
| 各维度权重 | **未找到** |
| 最终提交物清单、格式、时长 | **未找到** |
| 外部数据源能否使用、如何披露 | **未找到** |
| 第三方论文、产品或竞品材料如何引用 | **未找到** |

可以核到的是**同一主办方今年五月的官方活动页**。“知乎 Hackathon \| AI 脑洞实验室”官方页确实存在，页面本身列出了“活动简介、参赛权益、主题赛道、奖金赛程、了解详情”等栏目，分享文案是“**把灵感落地，让脑洞成真！**”；但核心细则被制作成图片型活动页，搜索抓取没有给出可引用的文字版评分表。citeturn21search4 因而即使是五月场，我也没有把无法读取的图片内容臆测成评分权重。

五月同主办方的公开复盘则能用来判断**作品形态，不应当用来冒充九月评分规则**。公开复盘称当时有超过 200 支团队参加 48 小时开发；一等奖《人生样本库》把知乎真实社区讨论变成个人选择的经验匹配，二等奖《赛博刘看山》把刘看山做成墨水屏陪伴硬件，三等奖《知道》把提问改成对话式 AI，并另设“最强脑洞奖、生态共振奖、极致交付奖”。这是平台上的机构媒体复盘，不是一份正式 judging rubric。citeturn21search1

**可信度：当前规则为低可得性，但“不能当事实”的结论可信度高。** 我能找到九月赛事存在的二手索引，也能找到五月官方活动页，但没有当前九月场的一手评分规则。因此正确输出只能是“**截至 2026-09-11 公开可查范围未找到**”，不能补齐一个看起来合理的评分表。citeturn21search2turn21search4

**对知所栖的含义。** 这里至少有一处现阶段很容易“写虚”的东西：**任何“评委更看重技术创新／完成度／社区价值，权重分别如何”之类的句子，都应该从正式路演依据中删除，除非 9 月 12 日 DDR 或主办方通知给出原文。** 同理，不要因为五月有“极致交付奖”就写“本届评分重点是交付”；最多只能说：

> **可直接替换的内部判断：**“公开信息尚不足以确认本场评分权重；因此我们不按猜测的 rubric 做功能扩张，只保证一句话价值主张和核心闭环现场可验证。”

还有一个更实际的决策：二手赛事说明把“知识获取”列为活动探索方向之一，说明知所栖并非明显偏离赛事语境；但因为这不是一手规则，**路演里不要说‘我们精准命中官方赛道要求’**。citeturn21search2

## 跨会话主动回问先例

**结论：原来的“公开可查范围内未发现已运行先例”已经不能原样使用。二〇二六年出现了至少一个公开、可运行、开源且相当接近的实现——Tutor MCP。真正还能守住的窄结论，是“我尚未找到成熟规模化产品明确公开实现‘从自由复述中发现遗漏 → 把该遗漏持久化 → 下一会话主动拿它回问’这一完整链条”。**

这可能是本轮研究**最值得立刻改稿的一条发现**。

**证据。** `ArnaudGuiovanna/tutor-mcp` 的公开 GitHub 仓库把自己定义为给 LLM 增加“durable learner state, review scheduling, session memory, misconceptions”的 tutoring runtime，当前标为 **alpha v0.5.0**。更关键的是，它不是只存聊天记录：仓库明确写到算法状态保存 **active misconceptions**；episodic memory 保存会话中的 salient exchanges 和待验证观察；而 `get_next_activity` 会把算法信号和 episodic context 合并，用来选择下一活动。仓库的短句甚至直接写：

> “**The next conversation starts from what the learner has mastered, forgotten, misunderstood…**”

这已经超过了 Anki 式“到期提醒你记得吗”，也超过了普通聊天机器人“知道你过去聊过什么”。citeturn15search1

其公开产品页还演示了一个非常接近你们问题定义的流程：新会话开始时读取 learner context、选择 next activity、检查 memory state，然后根据上一会话尚模糊的 cancellation 概念和到期复习信号，先给一个校准练习。页面明确说“**The next conversation starts from what the learner has mastered, forgotten, misunderstood…**”，并把“misconceptions、session memory、what to verify next”作为持久状态。它同时很诚实地标为 **Alpha / open source**，所以它是**公开运行实现先例**，不是成熟效果验证。citeturn15search0turn15search2

这个仓库截至研究日仍在快速开发；GitHub 当前页面公开显示它已经把 learner model、session memory、misconceptions、mastery evidence 和 activity selection 拆成实际工具接口，而不是概念稿。citeturn15search1

还有两个重要的“近邻而非同类”：

OpenAI Study Mode 可以在开启 Memory 时参考过去聊天，并能问开放问题、检查理解、解释“接下来该复习什么”；但官方文档**没有说**它会把本轮自动识别出的某个 misconception 建成持久缺口并在下次会话主动调度出来。因此不能把它算作已经证明你们完整闭环的先例。citeturn11search1turn11search3

学术方向也正在快速靠近这一结构。例如 2025 年 IntelliCode 用集中式 learner state 保存 mastery、misconceptions、review schedules，由 curriculum selection / spaced repetition 等 agent 基于共享状态调度；但论文报告主要是 simulated learners，所以同样不能写成成熟产品验证。citeturn15academia16

**可信度：对“至少已有公开 runnable 实现”的判断高；对“尚无成熟规模化完整同构产品”的判断中等。** 前者有仓库和公开文档直接支持。后者只能是检索结论，不是存在性证明。

为了让团队以后可以复核“没找到成熟完整同构产品”，建议保留下面这套可重复检索路径，而不是只留一句口头判断：

```text
时间窗：
2024-01-01 ～ 2026-09-11
重点再看最近 12 个月

GitHub：
"persistent learner state" tutoring
"active misconceptions" "session memory"
"get_next_activity" tutor
"next conversation" learner misunderstood
"misconception tracking" "cross-session" LLM tutor
"knowledge tracing" MCP tutor

论文：
"long-term tutoring" LLM misconception memory
"persistent learner model" LLM tutor
"cross-session personalized tutoring"
"knowledge tracing" dialogue LLM tutor
"long-horizon tutoring agent"

产品文档：
OpenAI Study Mode
Gemini Guided Learning
Khanmigo
Synthesis Tutor
ALEKS
Math Academy

纳入标准：
必须存在跨会话持久状态；
状态必须包含知识缺口/误解，而非只有用户偏好；
后续教学动作必须由该状态影响。

排除标准：
纯 Anki/FSRS 到期卡片；
只会“记住你学过什么”的聊天记忆；
一次会话内的苏格拉底提问；
只有论文架构、无公开 runnable artifact；
只有营销宣称、没有功能说明。
```

**对知所栖的含义。** 这里建议**立即改一句**。不要再写：

> ~~“截至 2026-09，公开可查范围内没有系统发现缺口、下次主动回问的运行先例。”~~

改成：

> **“公开生态已经出现持久化 learner state、misconception 与下一活动调度的早期开源实现；我们目前尚未找到成熟产品明确公开把‘自由复述中漏掉的点’直接变成下一会话主动回问的完整闭环。”**

这句话比“没有先例”稍长，但抗质疑能力高得多，而且保住了你们真正可能有辨识度的窄处：**不是长期记忆本身，也不是 next activity 本身，而是“自由复述暴露的语义缺口如何进入下一次教学动作”。**

换句话说，Tutor MCP **改变了定位决策**：不能再把“持久 learner model / 下一动作”当 moat；应该把演示和叙事收窄到**漏点是怎么被产生、如何改变后续动作**。

## 限速器证据

**结论：二〇二二至二〇二六没有找到足以证明“强制自由复述优于可选自由复述”的直接随机对照或元分析；但找到了一组更接近产品决策的新证据，方向很一致——让 retrieval 具有明确后果，会大幅提高实际参与；但把门禁做得更频繁、更硬，并不稳定地产生更好的学习结果。因此知所栖当前最合适的档位就是“验收强制、导航可跳过”，不是绝对锁死。**

这不是模糊的“学习很重要”，而是能直接落到一个产品参数：

> **限速器默认档：软门禁。**
>
> 完成语义要硬：不复述，就不算验收。  
> 导航权限不要硬：允许继续，但状态明确是“未验收”。

**证据。** 2024 年 Bertilsson、Stenlund、Sundström 在高中真实课程中比较 optional 与 non-optional online retrieval quizzes。非可选条件完成量显著更高：数学 **d = 1.8**，瑞典语 **d = 1.0**。这两个效应都很大。重要限制是：论文这次研究的是**使用行为**和个体差异，并没有把最终学习效果作为主要结果，所以它只能支持“可选会导致大量人不做”，不能直接支持“强制一定学得更多”。citeturn16search4

原文最值得你们拿走的是这个事实，而不是一般性的 retrieval 理论：

> “**significantly higher in non-optional sections**”

它直接对应限速器的行为问题。citeturn16search4

2024 年 Akbulut 做了四个真实高校实验，共 438 名本科生。其中 Study 1 比较同样六次 practice tests，一组计入最终成绩的 10%，另一组不计分；两组都收到相同反馈。整体 grading condition 对两次考试有显著效应，partial η² = .19；第一场考试差异 partial η² = .05，第二场已不显著。作者也明确承认这是准实验而非真正随机分组。因此它支持“给 retrieval 一点后果可能提高表现”，但不支持重罚或硬锁。DOI：`10.1111/ejed.12626`。citeturn17view2turn17view1

2025 年一项物理教育研究更直接测试了“**mandatory retrieval test**”：463 名学生，设 50% 最低门槛，研究者的主要目标就是用门禁促使学生实际采用 retrieval practice。179 人拿到满分，访谈中一些学生明确说 mandatory test 促使自己去记忆和理解；但约一半学生也出现临时突击，学习结果效应从 negligible 到 large 不等。因此这是一项很好的“强制会改变行为”的现场证据，却不是“门禁越硬越好”的证据。DOI：`10.1103/PhysRevPhysEducRes.21.010119`。citeturn19view0

2025 年 Bulut 等分析 336 名异步课程本科生，三个班分别改变 formative assessment 的频率和 mandatory/optional 状态。结果尤其适合给你们“踩刹车”：**增加 formative assessments 的频率并没有稳定改善表现**，mandatory 可以带来更一致的参与，但 optional 条件中的首答成绩有时反而是更纯净的能力指标。作者的实践建议不是“考得越多越好”，而是**更少、更有意义、战略性地使用 mandatory assessments**。DOI：`10.1111/jcal.13087`。citeturn16search2turn16search3

2025 年另一个真实课程干预也呈现同样的 participation 方向：pre-lab activity 从 optional 改为 mandatory，同时更换了部分学习材料后，完成率从约 **17% 提高到 79%**；成绩也同期改善。但由于同时发生了材料格式变化，这不能把学习增益单独归因于 mandatory。DOI：`10.1042/ETLS20253023`。citeturn18search0turn18search2

**可信度：对“非可选能显著提高实际参与”是中高；对“强制复述直接提高长期学习”是低到中。** 最大原因正是你要求我区分的那件事：这些最新实验主要操作的是 quiz/retrieval assessment 的 stakes 或 optionality，不是你们这种开放式“自己复述出来”。因此不能偷换成“论文证明知所栖强制复述有效”。

**对知所栖的含义。** 这组证据实际上支持你们输入包里已经收敛出的形态，而不是要求再加一堵墙：

> **保留：**“三模块做完但未完成复述 → 本次尚未验收。”  
> **保留：**允许 skip。  
> **保留：**补漏后必须再次复述才能升级为“验收”。  
> **不要改成：**复述不过就完全禁止浏览后续内容。

唯一值得在这四十八小时内强化的是**语义摩擦而不是功能封锁**。例如用户点跳过时，文案可以明确：

> **“可以继续，但这次不计为掌握；这个漏点仍是未验收项。”**

这比再做复杂的门禁机制更符合现有证据：**让 retrieval 有后果，但不要把“后果”误解成高惩罚。** citeturn16search4turn17view2turn16search3

因此，如果 DDR 问“为什么不是随便跳过，也为什么不是锁死”，现在已经有一句能答：

> **“新的课堂研究显示，可选 retrieval 很容易没人做；但更频繁、更强制也没有稳定带来更多学习。我们所以把‘完成’卡严，把‘浏览’放开。”** citeturn16search4turn16search3

## 竞争面与吴恩达叙事

**结论：二〇二六年的竞争面已经足够明确，不能把“根据学习状态决定下一步”当成空白格；真正应该降温的是 LearnVector 叙事——公开信息只支持“方向同向”，不支持“产品同构”。**

**证据。** LearnVector 自己的官方站写得非常清楚：公司 2026 年成立，目标是构建 one-to-one learning experiences；公开问题定义包括个人化、适应学习者，以及走向 mastery。但它也直接写：

> “**we’re building and will have something to show by early 2027**”

也就是说，截至今天，官网展示的是**公司使命和待发布方向**，不是已经可操作、可验证的产品。citeturn12search1

Coursera 2026 年 7 月 28 日的一手投资公告同样说，LearnVector 想从 one-to-many 转成 personal one-on-one experience，能适应学习方式、陪伴练习直到 mastery；但“**first LearnVector product experiences are targeted for early 2027**”。这是最关键的时间边界。citeturn12search0

更重要的是，**LearnVector 官方材料并没有公开说“学的单位 = 下一个教学动作”**。它公开支持的是“personal learning path / adapt / practice / mastery”。所以如果你们路演用“与吴恩达同构”去背书一个更精确的架构命题，评委完全可以追问：

> “LearnVector 产品都没发布，你怎么知道它和你同构？这是你对一篇公司宣言的解释，还是它已经公开的产品行为？”

这个质疑是成立的。citeturn12search0turn12search1

而且“系统知道下一步该给什么”本身早已有运行产品先例。

**Math Academy** 的官方技术说明甚至直接有一节叫 **“How the Task Selection Algorithm Chooses New Topics”**，并写到系统选择学生接下来应该 **learn or review** 的 topic，综合 mastery、spacing、interleaving 等信号。这里“下一步”已经是产品核心调度单元，而不是模糊营销概念。citeturn14search4

**ALEKS** 官方使用流程先做 Initial Knowledge Check，判断学生“what they know, don’t know, and what they’re ready to learn next”，再生成 customized learning path，并通过后续 Knowledge Checks 不断循环验证。citeturn13search8

**Synthesis Tutor** 的公开产品说明写得更像你们的“限速器”：每一课都包含实时 “micro-assessments”，不断检查理解，学生证明掌握之后才进入新内容；同时系统会 surface mistakes、fill gaps。citeturn14search5

**Quizlet Learn** 也明确根据过去学习行为找出薄弱项，持续 drill until you know them，并把学习组织成短而 actionable 的 sessions。它没有你们的开放复述闭环，但再次证明“系统根据当前状态选择下一项练习”不是无人区。citeturn14search11

**OpenAI Study Mode** 和 **Gemini Guided Learning** 则把这套思想带进通用大模型：前者会通过问题检查理解、根据 Memory 使用过去聊天做个性化；后者会用追问、开放问题、分步解释和 interactive quizzes 建构理解。它们没有公开说明与你们相同的跨会话“漏点账本→主动回问”，但它们显著提高了“自适应 AI tutor”这一大类定位的拥挤程度。citeturn11search1turn13search13

因此，二〇二六年的竞争图更接近这样：

| 能力 | 已有公开产品/实现 | 知所栖还能讲什么 |
|---|---|---|
| 个性化解释 | ChatGPT Study Mode、Gemini、Khanmigo 等 | 不够差异化 |
| 根据知识状态选下一题/下一课 | ALEKS、Math Academy、Synthesis | **不能 claim 空白** |
| mastery gate / 理解后再推进 | Synthesis、ALEKS 等 | 不是独占 |
| persistent learner state + misconception + next activity | Tutor MCP 等早期开源实现 | **已有技术先例** |
| 从开放式复述的“漏点”生成下一教学动作，并让该漏点进入后续验收 | 发现近邻，但截至本轮检索尚未发现成熟产品公开完整证明 | **这是目前更窄、更可守的叙事** |

这里有一个很有价值的反例：Quizlet 曾经推出 Q-Chat AI tutor，但官方后来明确决定停用，并于 **2025 年 6 月 30 日完全关闭**。这提醒你们，“有 AI tutor 产品”不等于“这个交互形态被市场验证有效”。因此也不能反向把 LearnVector 的高额投资当作产品效果证据。citeturn14search1turn14search6

**可信度：高。** LearnVector 的发布时间来自公司官网和 Coursera 投资者关系公告；Math Academy、ALEKS、Synthesis 的行为都来自各自产品官方文档。citeturn12search0turn12search1turn14search4turn13search8turn14search5

**对知所栖的含义。** 原路演如果有：

> ~~“我们和吴恩达的 LearnVector 是同构的。”~~

建议直接删掉。

最稳妥的替代是：

> **“我们和 LearnVector 公布的是同一个方向：从一对多课程转向更个体化的学习路径；但 LearnVector 还没有发布产品。知所栖今天要现场证明的，是更小的一件事——一个漏点，能不能立即改变你的下一个学习动作。”** citeturn12search0turn12search1

如果只有一句话的空间，我反而建议**完全不说吴恩达**：

> **“下一题早就有人会选；我们要解决的是：你刚刚没真正说会的那个点，能不能直接变成下一步。”**

这比“与吴恩达同构”更强，因为它主动承认竞争面，并把评委的比较维度从“你是不是另一个 AI tutor”拉回你们实际能演示的状态转换。

你们原来那句：

> “以前的平台生产一门课，我们生产你此刻应该做的下一个动作。”

也建议轻微降 claim。Math Academy 和 ALEKS 已经会生产“下一题/下一课”，所以更抗打的版本是：

> **“我们不重新生产一门课；我们把你刚刚暴露的理解缺口，变成此刻应该做的下一个动作。”**

“刚刚暴露的理解缺口”就是关键限定词。citeturn14search4turn13search8

## 黑客松演示结构

**结论：最近的获奖／特别奖案例没有证明某一种 pitch 模板因果上更容易获奖，但它们呈现出一个非常稳定、而且适合知所栖的结构：一句话不是描述技术栈，而是描述“输入经过产品后发生了什么可见变化”；现场演示则只证明这一个变化。**

知乎今年五月的前三名尤其明显。《人生样本库》不是“RAG + agent + recommendation platform”，而是把知乎真实人生经验匹配给正在做选择的人；《赛博刘看山》不是“多模态硬件 agent”，而是把刘看山放进墨水屏，成为能记录、回应兴趣的陪伴体；《知道》不是“LLM 问答系统”，而是“用对话代替提问”，甚至得到“第四种连接方式”的现场评价。三者都能一句话形成具体心理画面。citeturn21search1

同一复盘还列出了“极致交付奖”。这**不能推出**“交付占多少评分权重”，但至少说明主办方公开表彰的作品维度里，成品化和落地展示不是无关项。citeturn21search1

今年其他带知乎特别奖的公开 Hackathon 项目也表现出同样模式。例如 **“知乎第二现场”** 把“看完一条觉得有道理的知乎内容”推进成真实的下一步行动；**“杠精需求评审团”** 把一个需求送进多 Agent 辩论，最后变成可执行 blueprint；**“观点交易所—知乎未来版”** 则把观点变成可交易、可由实际社区反馈验证的对象。这些项目页是活动／项目一手 artifact，能证明它们怎么呈现自己，不能证明评委为什么打出某一个分数。citeturn1search14turn1search13turn1search7

这里最值得模仿的不是 UI，而是语法：

> **旧状态 → 一个产品动作 → 新状态。**

不是：

> “我们用了 A、B、C 三个模型，结合认知科学和 Agent 架构……”

而是：

> “你刚才以为自己会了 → 你试着说 → 系统抓到一个没说出来的点 → 下一步立刻改变。”

**可信度：对“获奖项目确实如此呈现”中高；对“这种形式导致获奖”低。** 没有评委分项数据，也没有对照实验，所以不能写“研究证明黑客松应该这样 demo”。它只能作为最近项目的结构性观察。citeturn21search1turn1search14turn1search13

**对知所栖的含义。** 我认为你们现在最该把 demo 缩成**一个故意失败的复述**，而不是展示更多页面。

一句话灵魂可直接改成：

> **“知所栖不替你多讲一遍；它把你刚刚没真正说会的地方，变成下一步学习动作。”**

现场验证只需要一个闭环：

**先问一个问题 → 读到解释 → 做判断／尝试 → 复述时故意漏掉一个关键点 → 系统显示这个点未验收并倒回补漏 → 再复述。**

这一演示有几个优势，但它们属于设计推论而不是外部事实：评委无需相信你们的长期留存、学习效果或未来 Agent；只需看见“**漏点改变了下一步**”确实发生。它也正好绕开产品尚未上线、没有用户数据这一硬边界。

尤其不要在有限路演时间里把现场证明任务变成：

> “请相信长期记忆以后会提高留存。”

你们目前没有数据支持这句话；而且 Q2 已经说明，持久 learner state 本身也不再新鲜。更强的现场问题是：

> **“刚才这个具体漏点，有没有真的改变系统接下来让我做什么？”**

如果当前版本尚未实现跨会话主动回问，就**不要在 demo 里演未来能力**。只演已经存在的“复述 → 漏点 → 倒回 → 再验收”。跨会话可以作为下一步设计原则，而不是假装已经发生的功能。这个边界与输入包的“仓库真实实现和内参解读分开”原则一致。fileciteturn0file0

## 没找到的与检索边界

这部分比再塞几个“类似产品”更重要。

**当前九月知乎黑客松的一手评分规则没有找到。** 截至 2026 年 9 月 11 日，能找到与 9 月 13 日时间对应的“知乎 AI 黑客松新锐季走进贸大”二手赛事条目，但以完整名称搜索知乎、对外经贸大学和公开微信公众号索引，都没有得到当前场次的官方评分维度、权重、完整提交物、外部数据源与第三方资料规则。五月官方 Hackathon 页面不能代替九月规则。citeturn21search2turn21search4

**没有找到二〇二二至二〇二六“强制自由复述 vs 可选自由复述”的直接元分析或随机对照。** 找到的是 optional/non-optional retrieval quizzes、graded/ungraded practice tests、mandatory retrieval tests，以及 mandatory/optional formative assessment。它们足以更新“限速器强度”的设计判断，却不足以写成“研究证明强制费曼复述提高学习效果”。citeturn16search4turn17view2turn19view0turn16search3

**没有找到成熟大规模产品公开证明完整的“自由复述漏点 → 持久 misconception → 下一次会话主动回问”闭环。** 但已经找到 Tutor MCP 这种非常接近、可运行的开源实现，因此“没有公开实现先例”已经不能使用。最严谨的词是“**尚未找到成熟产品公开完整实现**”，而不是“不存在”。citeturn15search1turn15search0

**没有找到 LearnVector 已经运行的产品行为或学习效果数据。** 相反，公司官网和 Coursera 一手公告都明确把第一批产品体验放到 2027 年初。因此它只能证明一个资金充分、业内重量级团队正在押注“one-to-one adaptive mastery”方向，不能证明某个具体教学动作设计有效，更不能证明与你们“同构”。citeturn12search0turn12search1

**没有找到“获奖项目采用一句话灵魂 + 单一现场状态转换，所以因此获奖”的因果证据。** 能看到的是今年知乎获奖项目和其他近期 Hackathon 特别奖项目的公开呈现方式；这是 case pattern，不是实验结论。citeturn21search1turn1search14turn1search13turn1search7

综合这些“找到”和“没找到”，这次外部研究已经越过你设的“白跑”门槛，而且不是靠报告长度越过的。**它至少迫使四个具体决策发生变化：**

第一，**“没有跨会话公开先例”必须撤回**，因为 Tutor MCP 已经构成反例。citeturn15search1

第二，**“与吴恩达同构”必须降级为“与其公开方向同向”**，因为 LearnVector 尚未有可验证产品，而且官方没有公开“学习单位就是下一个教学动作”这一精确说法。citeturn12search0turn12search1

第三，**限速器不要再加硬到完全禁止继续，也不要退回完全可选**；保持“验收必须复述、浏览允许跳过、跳过就是未验收”的软门禁，是当前外部证据最支持的档位。citeturn16search4turn17view2turn16search3

第四，**路演的竞争定位不要再卖“AI 会选下一步”**——这在 ALEKS、Math Academy、Synthesis 乃至新一代通用 AI 学习模式里都已经过于宽泛；应该卖更窄、也更容易现场验真的转换：**“你刚刚暴露的那个漏点，改变了你的下一步。”** citeturn14search4turn13search8turn14search5

就这次研究是否值得进最终路演和产品改动而言，结论因此很明确：**值得进，但只进这些 delta，不进一篇新的“大而全教育 AI 调研”。** 最值得带进 9 月 12 日 08:30 DDR 的不是全文，而是这四句话：

> **公开生态已有跨会话 learner state 与 misconception 调度先例，我们不再讲“没人做过”。** citeturn15search1  
>
> **LearnVector 还没发产品，我们只说方向同向，不说产品同构。** citeturn12search0turn12search1  
>
> **限速器卡“验收”，不卡“浏览”：跳过可以，但就是未验收。** citeturn16search4turn16search3  
>
> **现场只证明一件事：你漏掉的点，真的改变了下一步。**

