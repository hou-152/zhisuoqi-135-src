# Manus 的上下文工程实战：几轮重写换来的一组局部最优

- 标题：Manus 的上下文工程实战：几轮重写换来的一组局部最优
- 来源：manus.im
- 原文：https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
- 作者：Yichao 'Peak' Ji (Manus)
- 类型：主题特刊
- 摘要：分享 KV 缓存友好、工具遮蔽、拿文件系统当外部记忆等具体做法，全是被产品迭代逼出来的经验。这组里工程细节最落地的一篇。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：14747
- 策展人按：现象讲够了。Manus 这篇是清单里第一份一线记录，做法全是被产品迭代逼出来的，不是白板上想的。

---

- 原文标题：Context Engineering for AI Agents: Lessons from Building Manus
- 作者：Yichao 'Peak' Ji (Manus)
- 内参日期：2026-07-31
- 来源类型：blog
- 原文：https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
- 标签：context engineering

分享 KV 缓存友好、工具遮蔽、拿文件系统当外部记忆等具体做法，全是被产品迭代逼出来的经验。这组里工程细节最落地的一篇。

## 导读

context engineering 专题

## 核心观点

- Manus 在项目起点面对一个关键选择：用开源底座训练一个端到端的 agentic 模型，还是在前沿模型的 in-context learning 能力之上搭 agent。团队选了后者，也就是押注上下文工程（context engineering）。
- 这个选择买到的是迭代速度与解耦：改进以小时而不是周为单位发版，产品与底层模型保持正交。作者的比喻是——如果模型进步是上涨的潮水，Manus 要做船，而不是插在海底的柱子。
- 上下文工程并不优雅。它是一门实验科学：Manus 的 agent 框架被重写了四次，每次都是因为发现了更好的上下文塑造方式。团队把这套手工的架构搜索、prompt 摆弄和经验猜测戏称为 "Stochastic Graduate Descent"（随机研究生下降法）。
- 因此全文交付的是这轮试错抵达的一组局部最优（local optima），而非普适真理：这些只是对 Manus 有效的模式，作者的期望仅仅是帮别人少走一次痛苦的迭代。
- 六条局部最优：围绕 KV-cache 设计、掩码而非移除工具、把文件系统当上下文、通过复述操纵注意力、把错误留在上下文里、别把自己 few-shot 进套路。

## 起点的选择：为什么押注上下文工程而不是训模型

- 作者在 NLP 的第一个十年里没有这种选择的奢侈。BERT 时代（作者提醒：已经七年了）模型必须先 fine-tune、再评估，才能迁移到新任务，一轮迭代常常要几周——即便那些模型比今天的 LLM 小得多。
- 对快速迭代的应用、尤其是 pre-PMF 阶段的产品，这样的慢反馈循环是 deal-breaker。
- 这是作者上一家创业公司的苦涩教训：他从零训练模型做 open information extraction 和语义搜索，GPT-3 与 Flan-T5 一出，自研模型一夜之间变得无关紧要。讽刺的是，正是这批模型开启了 in-context learning 这条全新的路。
- 于是选择变得清晰：押注上下文工程，让产品与模型进步同向而非绑死。

## 围绕 KV-cache 设计：如果只能选一个指标

![图片展示了围绕KV-cache设计的两种情况。左侧箭头指向处，从step n到step n+1，Action 2 - Observation 3的上下文发生Cache Miss，标注有红色“×”；右侧箭头指向处，Action 1 - Observation 4的上下文持续命中Cache，标注有绿色“√”。该图与上下文紧密相关，直观呈现了前缀不稳定导致上下文缓存失效及只做追加上下文才能持续命中缓存的两种情况，辅助说明KV-cache设计时应关注的缓存命中问题。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YjU4ZTdhMzE5NWYyODEwNWRjMDZlOTMzM2U5ZGM4YTJfYTIzNGI2MDI4ODMxNjIzNzA2N2VhZjE2ZDg1MDRjM2VfSUQ6NzY2OTUxNjY1MDI5NDU5NDUxNl8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文配图｜左错右对：前缀不稳定会让整段上下文缓存失效，只做追加的上下文才能持续命中缓存* ｜ [原图](https://neican-res.candobear.com/article-images/87d74748808eeca90e3047ccca9026e5baffbb525b6d3f69c798d220cde91766.png)

- 如果只能选一个指标，作者认为 KV-cache 命中率是生产阶段 AI agent 最重要的单一指标，它直接决定延迟和成本。
- 要理解为什么，先看典型 agent 怎么跑：收到用户输入后，agent 进入一连串工具调用；每一轮，模型基于当前上下文从预定义的 action space 里选一个 action，该 action 在环境中执行（例如 Manus 的虚拟机沙箱）产生 observation；action 与 observation 被追加进上下文，构成下一轮的输入。循环持续到任务完成。
- 结构性后果：上下文每一步都在增长，而输出——通常是一个结构化的 function call——始终相对很短。相比 chatbot，agent 的 prefill 与 decode 比例高度倾斜。Manus 的平均输入输出 token 比约为 100:1。
- 好消息是相同前缀的上下文能吃到 KV-cache，大幅降低 TTFT（time-to-first-token）与推理成本，自建模型或调用推理 API 都适用。而且省下的不是小钱：以 Claude Sonnet 为例，缓存输入 token 是 0.30 USD/MTok，未缓存是 3 USD/MTok，相差 10 倍。
- 落到实践的第一条：保持 prompt 前缀稳定。由于 LLM 的自回归性质，哪怕一个 token 的差异，也会让该 token 之后的缓存全部失效。常见错误是在 system prompt 开头放时间戳，尤其是精确到秒的那种——它确实能让模型报出当前时间，同时也杀死了你的缓存命中率。
- ※ 本地原文归档在此处只保留了这组实践建议的第 1 条，后续条目未进入归档。

## 掩码而非移除：动态工具集是个陷阱

![图片展示了两种工具集处理方式。左侧“Mask, Don’t Remove”中，从step n到step n+1，工具集从Tool A、Tool B、Action 1变为Tool B、Tool C、Action 1，Action 1被移除，被红色叉号标记，表示不正确。右侧同样从step n到step n+1，工具集从Tool A、Tool B、Tool C、Action 1变为Tool A、Tool B、Tool C、Action 1，Action 1未被移除，被绿色勾号标记，表示正确。该图与上下文讨论的agent工具集处理方式相关，直观呈现了保留全部工具只做掩码的正确处理方式。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=YTQxZTY0NzlmYmJiMTJiMDY4ZDE0NWZhODM5YzIzNTFfNGE4ZjJmYTYzZTk4OTA0ZDM3ZDA2MTFjMzNhYjNkMzlfSUQ6NzY2OTUxNjY1MDAzNDU0NzY3Nl8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文配图｜对比中途增删工具与保留全部工具只做掩码：后者不破坏上下文前缀，工具集始终稳定* ｜ [原图](https://neican-res.candobear.com/article-images/8d727de3a9bbeb0c7fd311a0da6a415120a08abc2765fd1093147f2e8750d18f.png)

- 随着 agent 承担更多能力，action space 自然变复杂——直白说就是工具数量爆炸。MCP 的流行只是火上浇油：一旦允许用户自配置工具，一定会有人把几百个来路不明的工具插进你精心策划的 action space。
- 后果是模型更容易选错 action、走低效路径。用作者的话说：你那个全副武装的 agent 反而变笨了。
- 自然的反应是设计动态 action space，比如用类似 RAG 的方式按需加载工具。Manus 也试过，但实验给出一条明确规则：除非绝对必要，避免在迭代中途动态增删工具。
- ※ 原文给出的两条具体理由未进入本地归档。
- Manus 的解法是用一个 context-aware 的状态机来管理工具可用性：不移除工具，而是在解码时对 token logits 做掩码，按当前上下文阻止或强制某些 action 被选中。
- 例如用户给出新输入时，Manus 必须立即回复，而不是继续执行 action——这由掩码强制。
- 配套设计是刻意统一 action 名称前缀：浏览器相关工具都以 browser\_ 开头，命令行工具以 shell\_ 开头。这样无需有状态的 logits processor，就能约束 agent 在给定状态下只从某一组工具中选择。

## 把文件系统当作终极上下文

![图片展示了两种上下文使用方式。左侧为“把文件系统当作上下文”错误示例，上下文包含指令、动作及多次观察，观察1和2被突出显示。右侧为正确示例，上下文同样包含指令、动作及观察，但观察1和2被移出上下文，以文档和文件路径回指，文件系统中包含Document X和File Y。该图与上下文工程实战中把文件系统当作上下文的内容相关，直观呈现了正确与错误的上下文使用方式。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MWJiMzhlY2RmMTMwYjdhYmUxNjZjM2QzN2QwYjAxZmJfZWI5YmMwYzY0NjRmMTVkOGE4NWFkMTcxOGNhNDEzMDlfSUQ6NzY2OTUxNjY0OTE5MTQ0MzQzN18xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文配图｜把超长 observation 移出上下文、以文档与文件路径回指，上下文不再被单次观察撑爆* ｜ [原图](https://neican-res.candobear.com/article-images/71f79138680fabef2ac120fd198a7bbf59b3b09c01d344fd947c8d712d4c0fdb.png)

- 现代前沿 LLM 已提供 128K 甚至更大的上下文窗口，但在真实 agentic 场景里往往不够用，有时甚至是一种负担。
- ※ 原文列举的三个常见痛点未进入本地归档。
- 许多 agent 系统用上下文截断或压缩来应对，但过于激进的压缩必然带来信息损失。问题是根本性的：agent 按本性必须基于全部先前状态来预测下一个 action，而你无法可靠地预判哪条 observation 会在十步之后变得关键。从逻辑上说，任何不可逆压缩都带着风险。
- 所以 Manus 把文件系统当作终极上下文：大小无限、天然持久，且可由 agent 自己直接操作。模型学会按需读写文件，把文件系统用作结构化的外部化记忆，而不只是存储。
- 与之匹配，Manus 的压缩策略始终被设计成可恢复的：网页内容可以从上下文里丢掉，只要 URL 还在；文档正文可以省略，只要沙箱里的路径还在。这让上下文长度缩短而信息不永久丢失。
- 一个延伸想象：与 Transformer 不同，SSM（State Space Model）缺少完整注意力，难以处理长程回溯依赖；但如果它能掌握基于文件的记忆——把长期状态外部化而不是留在上下文里——它的速度和效率也许能解锁新一类 agent。作者判断，agentic SSM 可能才是 Neural Turing Machine 的真正继承者。

## 通过复述操纵注意力

![图片标题为“通过复述操纵注意力”。左侧显示在第n步时，Context中Objectives、Action 1、Observation 1、Action 2、Observation 2、Action 3、Observation 3依次排列，但Objectives未被选中。右侧则在第n+1步时，Objectives被选中，Action 1、Observation 1、Action 2、Observation 2、Action 3、Observation 3依次排列。图片与上下文关系为，通过对比不同步骤的Context内容，直观呈现了通过复述操纵注意力的机制，强调了将Objectives反复复述到上下文末尾，可使全局目标始终落在模型最近的注意力范围内。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NTY5MzVmZDVjMWM3YzBmNjY5NmE0MzMwNWJlODgwZTlfMTVjYWNlMDIwMzYyY2M2NjZhMDRhYzJhZDhmMDI1Y2NfSUQ6NzY2OTUxNjY0ODA2NzQzNTQ0OV8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文配图｜把 Objectives 反复复述到上下文末尾，全局目标始终落在模型最近的注意力范围内* ｜ [原图](https://neican-res.candobear.com/article-images/cdc2d7b96ef78de86ad528503c5761fb2619624c9c0de25febeba4e285564059.png)

- 用过 Manus 的人会注意到一个现象：处理复杂任务时，它倾向于创建一个 todo.md 文件，并随任务推进逐步更新、勾掉已完成项。
- 数字背景：Manus 的典型任务平均需要约 50 次工具调用。这是一个很长的循环，而 Manus 依赖 LLM 做决策，在长上下文或复杂任务中很容易跑题或忘记早先的目标。
- 机制解释：不断重写这份 todo 清单，等于把目标复述（recite）到上下文的末尾，把全局计划推入模型最近的注意力跨度，从而避开 "lost-in-the-middle" 问题、减少目标偏移。
- 关键在于它不需要任何特殊的架构改动——本质上是用自然语言给模型自己的注意力加偏置，让它偏向任务目标。

## 把错误留在上下文里

![这是一组对比图示，对应文档中“把错误留在上下文里”的相关内容，核心呈现两种处理模型失败结果的方式。左侧带红色叉号的部分为错误做法：模型两次失败的尝试（Attempt 2A、Attempt 2B）各自仅记录自身失败的行动与结果（Observation 2A、Observation 2B），未将两次失败信息整合保存；右侧带绿色对勾的部分为正确做法：模型在第n步的上下文（Context @ step n）中整合保留了两次失败的行动、结果，到第n+1步时，模型依据整合后的上下文更新尝试行动，成功记录为绿色标识，体现了保留失败观察、留存证据辅助模型优化后续做法的思路。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Yzc3MjJlOGEzYWQxMjE1YThiNzI4NDY3ZDBiNmUzZDNfZGUwZGFhZTY2ODM3NDNlNmZjNmViYmE5Mjg5YmJmZjFfSUQ6NzY2OTUxNjY1MTc3OTM0NTM3Nl8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文配图｜抹掉失败重试与保留失败观察的对比：留下证据后，模型在下一步换了做法并成功* ｜ [原图](https://neican-res.candobear.com/article-images/42e2867893c48626b2ee36972d518ba5d134af819e5d404131bbc9c3945dac47.png)

- agent 会犯错。这不是 bug，是现实：语言模型会幻觉、环境会返回错误、外部工具会行为异常、意外的边界情况层出不穷。在多步任务里，失败不是例外，而是循环的一部分。
- 常见冲动是把这些错误藏起来：清理轨迹、重试动作，或者重置模型状态、把结果交给神奇的 temperature。这感觉更安全、更可控，但有代价——抹掉失败就是抹掉证据；没有证据，模型就无法适应。
- Manus 的经验是，改善 agent 行为最有效的方式之一简单得近乎狡黠：把走错的弯路留在上下文里。当模型看到一个失败的 action 以及随之而来的 observation 或 stack trace，它会隐式更新自己的内部信念，把先验从类似 action 上挪开，降低重复同一错误的概率。
- 由此作者给出一个判据：错误恢复（error recovery）是真正 agentic 行为最清晰的指标之一。但它在多数学术工作和公开 benchmark 中仍被严重低估——那些评测往往只关注理想条件下的任务成功率。

## 别把自己 few-shot 进套路

![这张配图的主题为“Don’t Get Few-Shotted”，核心呈现了两种不同的Few-Shot示例对比。左侧被标注红色叉号的示例，其Action与Observation内容呈整齐重复的模式，模型易照抄这种固定节奏，属于不好的示例；右侧被标注绿色对号的示例，将最后一个Observation修改为“This is already the k-th time visiting a page on ...”，注入了内容变化，符合上下文提到的“在观察中注入变化才能打破套路”的观点，说明合适的示例可以帮助模型避免陷入固定模式。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NzUyNDBiOWJmM2ZhZjMyMDE2MjliNzI1ODVhMmY3ZGZfMzE0N2UxODk0YzQ3MDhlZmFmODlmYWMyZDVmNGEyYjdfSUQ6NzY2OTUxNjY0NzcwNjcwODk1NF8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文配图｜整齐重复的动作观察对会让模型照抄节奏；在观察中注入变化才能打破这种套路* ｜ [原图](https://neican-res.candobear.com/article-images/8cd960021eecdceaf8782bf1b8b11daea36877a7d1740de7a1bbf381933878bb.png)

- 语言模型是出色的模仿者：它们模仿上下文中呈现的行为模式。如果上下文里塞满了彼此相似的 action-observation 对，模型就会倾向于沿着那个模式继续，哪怕它已经不再是最优解。
- 这在涉及重复性决策或动作的任务里尤其危险。例如用 Manus 批量审阅 20 份简历时，agent 常常陷入某种节奏——仅仅因为上下文里就是这么做的——由此产生漂移、过度泛化，有时甚至幻觉。
- 修法是增加多样性：Manus 在 action 与 observation 中引入少量结构化变化——不同的序列化模板、替代性措辞、顺序或格式上的轻微噪声。这种受控的随机性打破模式、拨动模型的注意力。
- 换句话说，别把自己 few-shot 进一条车辙里。上下文越统一，你的 agent 就越脆弱。

## 结论：你如何塑造上下文，就定义了 agent 如何行动

- 上下文工程仍是一门新兴科学，但对 agent 系统而言已经是必需品。
- 模型会变得更强、更快、更便宜，但再多的原始能力也替代不了对记忆、环境和反馈的需求。
- 你如何塑造上下文，最终定义了 agent 的行为方式：它跑得多快、恢复得多好、能扩展多远。
- 这些教训来自反复重写、死胡同，以及跨越数百万用户的真实世界测试。作者保持了分寸：这里分享的没有一条是普适真理，只是对 Manus 有效的模式；如果它们能让读者少经历一次痛苦的迭代，这篇文章就完成了它的任务。

## 概念网络

### 关键概念

### 上下文工程（context engineering）

**context**：全文的主词。它是与"训练端到端 agentic 模型"相对的另一条路线——在前沿模型的能力之上，通过塑造递给模型的上下文来决定 agent 行为。作者称它"anything but straightforward"，是一门实验科学，Manus 为它重写了四次框架。

**费曼一下**：模型是租来的，上下文是你自己的。与其去改造发动机，不如把仪表盘、路书和后视镜重新排布一遍——同一台发动机，跑出的路线可以完全不同。

### 押注 in-context learning

**context**：项目起点的关键决策。作者在 BERT 时代经历过"必须 fine-tune 才能迁移新任务、一轮迭代要几周"的苦，又亲眼看到 GPT-3 与 Flan-T5 让自研模型"irrelevant overnight"，因此选择把宝押在模型的上下文内学习能力上。

**费曼一下**：以前教会模型做新事得回炉重炼几周；现在只要在对话里把事情说清楚，它当场就会。既然如此，把力气花在"怎么说清楚"上，比花在重炼上划算得多。

### 与底层模型正交（orthogonal to the underlying models）

**context**：押注上下文工程带来的结构性收益。作者用潮水与船的比喻表达：模型进步是上涨的潮水，产品要做被托起来的船，而不是插在海底、被潮水淹没的柱子。

**费曼一下**：把自己的价值建立在别人每半年就要重做一次的地基上，是危险的。正确的姿势是让别人的进步自动变成你的进步。

### Stochastic Graduate Descent（随机研究生下降法）

**context**：作者对上下文工程实际工作方式的戏称——手工的架构搜索、prompt 摆弄和经验猜测的组合。它是对 SGD（随机梯度下降）的双关。评价是"It's not elegant, but it works"。

**费曼一下**：没有解析解的时候，只能靠人肉一步步试着往下走。这个名字既是自嘲，也是一句诚实的技术判断：这个领域现在还没有闭式解。

### 局部最优（local optima）

**context**：全文交付物的自我定位。作者明确说本文分享的是自家 SGD 过程抵达的局部最优，而非普适真理："None of what we've shared here is universal truth—but these are the patterns that worked for us."

**费曼一下**：山谷里的最低点，未必是整片山脉的最低点。承认自己在一个局部最优里，比宣称找到了终极答案更可信，也更有用。

### KV-cache 命中率

**context**：作者认为如果只能选一个指标，它就是生产阶段 AI agent 最重要的单一指标，直接影响延迟与成本。前缀相同的上下文能命中缓存，大幅降低 TTFT；以 Claude Sonnet 为例缓存输入 0.30 USD/MTok 对未缓存 3 USD/MTok，差 10 倍。

**费曼一下**：模型每次都要把你给它的全部内容重读一遍。如果开头那段和上次一模一样，它可以直接沿用上次读过的记忆——省时也省钱，前提是你别去动开头。

### prefill 与 decode 的高度倾斜

**context**：agent 与 chatbot 的结构差异。agent 每一步都往上下文追加 action 与 observation，上下文持续增长，而输出通常只是一个短的结构化 function call。Manus 的平均输入输出 token 比约 100:1。

**费曼一下**：agent 是"读一百个字、写一个字"的活。既然成本几乎全在"读"上，优化就该全部押在如何让读变便宜，而不是让写变短。

### 稳定的 prompt 前缀

**context**：围绕 KV-cache 设计的第一条实践。由于 LLM 的自回归性质，单个 token 的差异就会让该位置之后的缓存全部失效；典型错误是在 system prompt 开头放精确到秒的时间戳。

**费曼一下**：缓存像是从头开始的一条链，任何一环换了，后面整条都得重打。为了让模型知道现在几点而牺牲整条链，是极不划算的交易。

### action space 膨胀

**context**：agent 能力增长的副作用——工具数量爆炸，MCP 的流行更是火上浇油，用户自配置工具会把几百个来路不明的工具插进精心策划的 action space。结果是模型更容易选错动作、走低效路径，"your heavily armed agent gets dumber"。

**费曼一下**：给一个人塞三百件工具，他不会变成三百倍能干，只会在工具箱前发呆。选择本身是有成本的。

### logits 掩码与 context-aware 状态机

**context**：Manus 对 action space 膨胀的解法。不在迭代中途增删工具，而是用一个上下文感知的状态机管理工具可用性，在解码时对 token logits 做掩码来阻止或强制某些选择；配合 browser\_、shell\_ 这类一致的动作名前缀，无需有状态的 logits processor 就能按状态约束选择范围。

**费曼一下**：工具都摆在桌上，但这一轮只有某几个抽屉是打开的。桌面没变（缓存还在），可选项却变少了（决策更准了）。给工具起名时留好统一前缀，等于事先把抽屉分好组。

### 文件系统即终极上下文

**context**：应对长上下文的根本策略。作者认为任何不可逆压缩都有风险，因为 agent 必须基于全部先前状态预测下一步，而你无法预知哪条 observation 会在十步之后变关键。文件系统大小无限、天然持久、可被 agent 直接操作，被 Manus 当作结构化的外部化记忆而非单纯存储。

**费曼一下**：脑子记不住那么多，就把东西写在纸上，需要时再翻。真正重要的不是脑容量，而是随手能写、随手能翻这件事本身。

### 可恢复的压缩（restorable compression）

**context**：Manus 压缩策略的设计原则。网页内容可以从上下文中丢弃，只要 URL 还保留；文档正文可以省略，只要沙箱里的路径还在。这让上下文缩短而信息不永久丢失。

**费曼一下**：扔掉正文、留下地址，跟撕掉整页纸是两回事。前者是收纳，后者是失忆。

### 复述（recitation）与 lost-in-the-middle

**context**：Manus 让复杂任务持续创建并更新 todo.md 的原因。典型任务平均约 50 次工具调用，长循环中模型容易跑题；不断重写待办清单等于把目标复述到上下文末尾，把全局计划推进模型最近的注意力跨度，避开中段被忽略的问题。

**费曼一下**：开长会容易忘了议题，所以每隔一会儿就把议题重念一遍。念的不是给别人听，是给自己听。

### 保留错误证据与错误恢复

**context**：作者最反直觉的一条建议。失败在多步任务中是循环的一部分而非例外；隐藏错误（清理轨迹、重试、重置状态并寄望于 temperature）感觉更安全，但"Erasing failure removes evidence"，模型因此无法适应。把走错的弯路留在上下文里，模型看到失败的 action 与 stack trace 会隐式更新先验。

**费曼一下**：把摔跤的地方擦干净，下次还会在同一处摔。留着那道痕迹，反而是最便宜的护栏。作者进一步认为，能从错误里爬起来才是"真 agent"最清晰的标志，而现有 benchmark 大多只测理想条件下的成功率。

### few-shot 套路化与受控多样性

**context**：语言模型强模仿能力的反面。上下文里堆满彼此相似的 action-observation 对时，模型会照着那个模式走下去，哪怕已非最优；批量审阅 20 份简历这类重复性任务尤其容易漂移、过度泛化甚至幻觉。Manus 的解法是在动作与观察中引入结构化变化——不同的序列化模板、替代措辞、顺序与格式上的轻微噪声。

**费曼一下**：给模型看太多整齐划一的样例，它会以为节奏本身就是任务。适度打乱，是提醒它每一步都要重新看一眼。

### 概念网络

![这张由原文Mermaid源码渲染的关系图，围绕“上下文工程作为产品所”构建了清晰的概念关联网络。其核心源头是将agent搭建在前沿模型的in-context learning之上，派生出“与底层模型正交”“Stochastic Graduate Descent”两个因素。中间的“一组局部最优”是核心产出，分别包含“复述目标到上下文末尾”“把错误留在上下文里”“受控的结构化多多样性”“few-shot繁衍化”等内容；同时图中还标注了多组支撑或对立关系，比如“稳定的prompt前缀”支撑“KV-cache命中率”，“logits 降码与状态机”对应“action space 膨胀”，最终关联到“上下文形塑agent行为”“外部化记忆”等相关概念。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGY2NjRmMmU4NjgwY2Y5MzEzNWJmNWM5ODI1ZTBiZjlfMGRhZjA2NTE5MTgxM2RlYWFiMTQzNDBhOWJlYWU4MDdfSUQ6NzY2OTUxNjY0ODU3NDk2MjY2Ml8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*原文关系图｜由原文 Mermaid 源码直接渲染*



整张网络有一个明确的源头：把 agent 建在前沿模型的 in-context learning 之上，而不是自己训模型。这个押注同时产生两个后果——一是产品与底层模型正交（潮水与船），二是没有解析解可用，只能靠手工的架构搜索一步步逼近，也就是所谓 Stochastic Graduate Descent。六条原则不是六个并列的技巧，而是这条搜索路径上收敛到的同一组局部最优。

六条原则之间的关系并非平铺。KV-cache 命中率是成本轴上的总闸门，它由两个上游因素共同决定：prefill 与 decode 的高度倾斜（100:1）使缓存的收益被放大，而稳定的 prompt 前缀是命中缓存的前提条件。掩码而非移除之所以成立，正是因为它同时解掉两个约束——既压住了 action space 膨胀带来的选择噪声，又不破坏前缀稳定性；所以第二条原则实际上是第一条的延伸，而不是它的邻居。这是全文最见结构的一处：两个看似不相干的问题被同一个设计一并解决。

第三条原则处在另一条轴上：上下文的容量与可靠性。作者的论证起点是一条逻辑判断——agent 必须基于全部先前状态决策，因此任何不可逆压缩都有风险。文件系统由此从"存储"升格为"外部化记忆"，而可恢复的压缩是让这条路成立的技术前提：只有当丢弃的内容随时可被 URL 或路径召回，缩短上下文才不等于失忆。

第四到第六条原则共享同一个更深的前提：模型的注意力和先验都由上下文的形状决定，因此可以被有意识地施力。复述是正向利用近因效应对抗 lost-in-the-middle；保留错误是保留可供模型更新先验的证据，其反面（清场重试）恰恰切断了适应的通道；而受控多样性对抗的是模仿能力的过度发挥——同一种"模型会照抄上下文"的机制，在复述里是资源，在 few-shot 套路化里就成了负债。三者共同支撑作者最后的判断：错误恢复才是真正 agentic 行为的标志，而不是理想条件下的成功率。

所有支线最终汇入结论：模型再强也替代不了记忆、环境与反馈，上下文的塑造方式定义了 agent 跑多快、恢复得多好、能扩展多远。值得注意的是这张网络的收束方式——作者没有把六条原则抬成定律，而是明确标注它们是局部最优。这种自我限定本身也是网络的一部分：它说明在上下文工程里，方法的适用边界和方法本身同等重要。

## 费曼 x3

做 agent 最反直觉的一点是：你能调的旋钮不在模型里，而在你递给模型的那段文字里。模型是租来的，上下文是自己的。这个区分决定了一家公司在模型半年翻新一次的浪潮里，是船，还是插在海底的柱子。

而上下文这件事一旦当真去做，立刻暴露出它的工程属性。它不是"把 prompt 写好"，而是一门实验科学——改一次架构，指标动一格，靠手工搜索和经验猜测慢慢逼近，重写四次才换来一组能用的做法。有人管这个过程叫随机研究生下降法，玩笑背后是一句诚实的判断：这个领域现在还没有闭式解，只有反复试。

这组做法里最有价值的不是技巧，而是一条统一的思路：不要跟模型的机制对着干，要顺着它的机制施力。模型是自回归的，一个 token 的差异就能让其后的缓存全部作废，所以上下文只能追加不能改写，连 system prompt 开头那个精确到秒的时间戳都得撤掉——省下的是十倍的推理成本。模型在解码时按 logits 选动作，所以工具太多的解法不是把工具搬走，而是掩住不该选的那些；给工具名统一前缀，掩码就顺手变成了一个免费的状态机。模型的注意力偏向最近的内容，所以让它不断重写一份待办清单，等于把全局目标一遍遍推回视野中央，绕开中间那段容易被忘掉的地带。

最见功力的是对失败的处理。人的本能是清理现场、重试、把错误藏起来，交给温度参数碰运气。但抹掉失败就是抹掉证据，没有证据，模型无从更新它的先验。把走错的弯路留在上下文里，那条 stack trace 就成了下一步不再重蹈覆辙的理由。由此得到一个值得记住的判据：错误恢复才是真正 agentic 行为最清晰的标志——而学术界和公开 benchmark 至今主要在理想条件下测任务成功率。

反过来，模型太会模仿也是陷阱。上下文里全是整齐划一的动作与观察，它就会照着那个节奏走下去，哪怕早就不该这么走了。解法是往序列化模板、措辞和顺序里掺一点受控的噪声。上下文越统一，agent 越脆弱，这句话可以直接贴在墙上。

所有这些手法共享同一个前提：无论模型多强、多快、多便宜，它都替代不了记忆、环境和反馈。你如何塑造上下文，最终定义了 agent 跑多快、恢复得多好、能走多远。

---
