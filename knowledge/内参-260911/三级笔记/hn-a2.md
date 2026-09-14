# 只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍

## 一句话主旨
开两项 API 设置，ARC-AGI-3 分数三倍，症结在 harness。

## 作者试图回答的问题
为什么 GPT-5.6 Sol 能解数学猜想、通关复杂游戏，却在 ARC-AGI-3 的 2D 拼图上仅 7.8%？是模型不擅长 2D 游戏，还是 harness/API 设置另有隐情？改设置后成绩、token 效率如何变化，对 eval 与 API 开发意味着什么？

## 三级论证骨架
### 一、谜题：强模型在 ARC-AGI-3 上异常低分
#### 1.1 表现反差
- GPT-5.6 Sol 解决过 cycle double cover conjecture、通关 Pokémon FireRed，但 ARC-AGI-3 只 7.8%；GPT-5.5 仅 0.4%。
- 两个互斥假设：2D 拼图对模型格外困难，或另有隐情。
#### 1.2 评测设置
- ARC-AGI-3 衡量 agent 学习与推理：探索陌生 2D 游戏，无显式说明推断机制；公开 demo 有 25 个。
- 评分用 RHAE，相对人类动作效率；基于官方人类测试日志，OpenAI 估计人类平均约 48%。
- 约束：模型不会被告知如何被评分，过程中看不到分数；每次动作只返回该帧文本表示和当前关卡。
- 官方演示中无前沿模型能过第一关；换成 Responses API harness，GPT-5.6 Sol 六关全通。

### 二、诊断：harness 是隐形变量，两处设置造成“失忆”
#### 2.1 通用 harness 与商用 harness 分岔
- ARC 刻意用通用（“intentionally generic”）harness，不带工具、无特殊功能；理由是让模型缺陷更可见、模型比较更公平。
- 商业开发者相反：围绕每个模型的特性和怪癖（“each model's features and quirks”）优化 harness；这是同一模型表现割裂的根源。
- OpenAI 初看实际尝试记录，印象与 ARC 一致：模型不太聪明、每步停留久；再深看结论翻转：大部分困惑“not inherent to the model itself, but due to settings in the harness”。
#### 2.2 两处设定切断跨轮次记忆
- 每次动作后丢弃全部私有推理；过去动作记录和简短笔记还在，但计划、洞察、思路（“the plans, insights, or thoughts”）消失，每一步都要重新弄懂游戏。
- 官方 harness 用滚动截断窗口：上下文超过 175,000 字符就丢弃最旧消息，较早动作逐渐不可见。
- 叠加效果：既忘掉自己的思考，也逐步忘掉做过什么，制造一个“每一步都被重置的学习者”，难随时间学习。

### 三、修复：用生产设置重建 harness，恢复跨轮次记忆
#### 3.1 思路：训练与部署一致性
- 模型被训练为在输出回复或工具调用前先用私有推理消息思考；这些思考消息会作为对话历史保留，对话过长时摘要继续。ChatGPT 和 Codex 就是这样部署。
- 用 Responses API 重新实现 ARC-AGI-3 harness，“To better match our production setup”；对 GPT-5.6，传入上一条 response 的 ID，跨工具调用和跨轮次的推理会自动保留。
#### 3.2 保留推理的效果
- 每个动作前思考时间变短，因为不必每轮从零解读游戏。
- 能记住过去想法后，模型更擅长随时间学习，也更能采用连贯策略（“employing coherent strategies”）。
#### 3.3 compaction 替换滚动截断
- 官方超过 175,000 字符丢弃最旧消息；滚动截断有两个弊端：丢失更早观察与动作；模型大部分时间运行在更满上下文窗口下，“which can slightly impair performance”。
- compaction 把已有推理压成摘要接续，而非丢弃；模型能在更长运行中更好地保住对每个游戏学到的东西，用更少输出 token 拿更高分。
- 实现细节：OpenAI 用 175,000 token 而非字符，但结果相当接近；因文本绝大部分是动作网格，在其分词器下按 1:1 切分。
#### 3.4 合计数字
- 官方 harness 下 GPT-5.6 Sol 得 13.3%；开启保留推理与 compaction 后得 38.3%；模型权重无变化。
- 合计约 3 倍分数，输出 token 少 6 倍。
- 配图证据：保留推理+压缩的 harness 用不到 50 万 token 到 38%，官方 harness 花 6 倍 token 仅 13%；同一模型双 harness 同样 42K token，官方侧仅过 1 关，保留推理侧已过 2 关。

### 四、结论：eval 是模型与工程选择的捆绑测量
#### 4.1 主命题
- “Benchmarks rarely measure AI models in isolation. They also measure less visible choices about API settings, harness design, and prompting.”
- 此前也出现过公开基准低分、回头发现 eval runner 用了会丢弃推理消息的通用 harness。
#### 4.2 建议
- API 开发者：用 Responses API，不要用 legacy 的 Chat Completions API；保留推理；使用 compaction。
- 做模型比较：依赖采用上述设置的 eval，因为它们最贴近 ChatGPT 和 Codex 里的真实使用。
#### 4.3 致谢与邀请
- 感谢 ARC 多年在 AGI 评估上的创造性工作，也感谢其分析促成这次深挖；邀请读者玩公开游戏，亲自和前沿模型比一比。
- 作者：Ilan Bigio、Ted Sanders；发表于 2026 年 7 月 29 日。

## 作者边界、反例与不确定性
- ARC 用通用 harness 有明确理由：简单 harness 让模型缺陷更可见、比较更公平；OpenAI 的发现揭示的是公平与代表性的张力，并未否定 ARC 的选择。
- 人类平均约 48% 是基于官方人类测试日志的估计。
- 175,000 token 与 175,000 字符只是“结果相当接近”，并非完全等同。
- 作者说大部分困惑来自 harness 设置，不是全部；结论基于 ARC-AGI-3 公开任务集与 GPT-5.6 Sol（max）等特定设置，材料未给出跨所有基准/模型的普遍证明。
- 评测约束仍在：模型不会被告知评分方式，过程中也看不到分数。
