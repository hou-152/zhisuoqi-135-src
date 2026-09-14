# 只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍

## 一句话主旨
开启保留推理与上下文压缩两个 API 设置，GPT-5.6 在 ARC-AGI-3 上分数三倍、输出 token 少 6 倍——瓶颈在 harness 不在模型。

## 作者试图回答的问题
为什么能证明 cycle double cover conjecture、通关 Pokémon FireRed 的 GPT-5.6 Sol，在 ARC-AGI-3 的 2D 拼图上只拿 7.8%？是这类游戏对模型格外难，还是另有隐情？

## 三级论证骨架

### 一、起点：一个说不通的能力矛盾
#### 1.1 强项与低分并存
- GPT-5.6 Sol 解决过长期未决的数学猜想、通关过 Pokémon FireRed，但在 ARC-AGI-3 上仅 7.8%；GPT-5.5 更是只有 0.4%。
- 同一模型在别的游戏上表现不俗：纯视觉 harness 通关 Pokémon FireRed，Codex 的 computer use 打通 Baba Is You 前几关。
- 摆在面前的是两个互斥假设：要么 2D 拼图对这些模型格外困难，要么另有隐情。

#### 1.2 基准的设计意图与评分口径
- ARC-AGI-3 想测 AI agent 的学习与推理：agent 探索陌生的 2D 游戏，在没有显式说明下推断游戏机制；公开 demo 游戏 25 个。
- 评分用 RHAE（Relative Human Action Efficiency），把模型表现与人类基线相比；基于官方人类测试日志，OpenAI 估计人类平均约 48%。
- 一个易被忽略的约束：模型不被告知评分方式，过程中也看不到分数，每次动作只返回该帧文本表示和当前第几关。

#### 1.3 官方视频里的直观对照
- 某个游戏的排行榜上没有任何前沿模型能过第一关；换成 OpenAI 的 Responses API harness，GPT-5.6 Sol 六关全通。
- 并排实测：同样 42K token，官方 harness 仅过 1 关，保留推理的 API 侧已过 2 关。

### 二、harness 是隐形变量：官方设置如何让模型「失忆」
#### 2.1 通用 harness 与商用 harness 的分岔
- ARC-AGI-3 刻意用通用 harness（intentionally generic），不带工具、没有特殊功能；理由是简单 harness 让模型缺陷更可见、模型间比较更公平。
- 商业开发者做法相反：围绕每个模型的 features and quirks 优化 harness——这正是同一模型在不同场景下表现割裂的根源。
- 沿着 ARC 对 GPT-5.5 短板的分析下探，OpenAI 初看尝试记录时印象一致：模型「不太聪明」，每个动作停留很久、难以推进。再往深看结论翻转：模型的大部分困惑「not inherent to the model itself, but due to settings in the harness」。

#### 2.2 两处设定共同制造「每一步都被重置的学习者」
- 第一处：每次动作后丢弃全部私有推理。过去的动作记录和简短随附笔记还在，但导致这些动作的「the plans, insights, or thoughts」全部消失——每走一步都要把游戏从头弄懂一遍（figure the game anew）。
- 第二处：使用滚动截断窗口（rolling truncation window），历史增长时较早的动作变得不可见。模型不仅忘掉自己的思考，连做过什么也在逐步丢失。
  - 具体阈值：对话上下文超过 175,000 字符时丢弃最旧的消息。
  - 两个弊端：丢失更早的观察与动作；任务大部分时间运行在更满的上下文窗口下，「slightly impair performance」。
- 两者叠加解释了模型为何难以随时间学习。

### 三、修复：让评测环境对齐生产
#### 3.1 思路来自训练与部署的一致性
- OpenAI 模型被训练成在输出回复或工具调用前先用私有推理消息思考，这些思考会作为对话历史保留，对话过长就做摘要再继续——ChatGPT 和 Codex 就是这么部署的。
- 做法：用 Responses API 重新实现 ARC-AGI-3 的 harness，「to better match our production setup」。对 GPT-5.6 只要传入上一条 response 的 ID，跨工具调用和跨轮次的推理就自动保留。

#### 3.2 保留推理的效果
- 每个动作前的思考时间变短，因为不必每轮从零解读游戏。
- 记住过去的想法后，模型「much better at learning over time and employing coherent strategies」。

#### 3.3 用 compaction 替换滚动截断
- 触及压缩上限时把已有推理压成摘要接续，推理链不断裂直到给出最终答案。
- GPT-5.6 Sol 能在更长运行中保住对每个游戏学到的东西，用更少输出 token 拿到更高分。

#### 3.4 合计结果
- 保留推理 + compaction，GPT-5.6 Sol（max）取得约 3 倍分数、6 倍更少输出 token：官方 harness 13.3% → 38.3%；模型权重没有任何变化，变的只是外壳。
- 一个实现细节：OpenAI 的实现用 175,000 token 而非 175,000 字符，两者结果相当接近——因为文本绝大部分是动作网格，在其分词器下按 1:1 比例被切分。

### 四、结论：基准是对模型加工程默认值的捆绑测量
- 主命题（开头与结尾各说一次）：「Benchmarks rarely measure AI models in isolation. They also measure less visible choices about API settings, harness design, and prompting.」
- 这不是第一次——此前也出现过公开基准低分、回头发现 eval runner 用了会丢弃推理消息的通用 harness 的情况。
- 给追求性能的 API 开发者的三条建议（即 OpenAI 自己产品在用的设置）：用 Responses API 而非 legacy Chat Completions API；保留推理；使用 compaction。
- 给做模型比较的人：依赖采用上述设置的 eval，因为它们最贴近 ChatGPT 和 Codex 里的真实使用。

## 作者边界、反例与不确定性
- 通用 harness 的公平性张力作者未消解：ARC 为「让缺陷更可见、比较更公平」而用通用 harness，但这使评测测出的是模型在失忆状态下的表现，而非真实产品能力。作者以结尾致谢 ARC 的「创造性工作」并称「正是他们的分析促成了这次深挖」的方式承认其价值，未正面反驳。
- 人类基线约 48% 是 OpenAI「基于官方人类测试日志」估计的，非实测固定值。
- 175,000 字符 vs 175,000 token 是作者自陈的实现偏差，靠分词比例巧合而「相当接近」。
- 全文聚焦这一模型/这一基准的一次对照，作者未主张该结论可无差别外推到所有基准或所有模型。
- 文章署名 Ilan Bigio、Ted Sanders，发表于 2026 年 7 月 29 日。
