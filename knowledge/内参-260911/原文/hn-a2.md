# 只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍

- 标题：只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍
- 来源：openai.com
- 原文：https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores
- 作者：OpenAI
- 类型：主题特刊
- 摘要：同一模型只开启“保留推理”和“上下文压缩”，ARC-AGI-3 成绩便提升近 3 倍，输出 token 还少了约 6 倍。它把 harness 如何改变能力表现，做成了一组可量化的对照。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：10677
- 策展人按：清单叫「harness ＞ model」，但只有排名变化还不够。这篇把模型锁死，只动两个外壳设置：分数从 13.3% 到 38.3%，token 反而少了六倍。放在 TerminalBench 后面，算是给标题补上最硬的一锤。

---

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
