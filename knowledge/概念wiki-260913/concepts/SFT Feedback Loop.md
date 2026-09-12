---
id: cm_6945fcf2
name: SFT Feedback Loop
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.042
depth: 0
origin: [notion]
aliases: ["SFT 反馈循环", "supervised fine-tuning feedback loop", "model-generated rollouts loop"]
sources: 1
---

# SFT Feedback Loop

> 模型生成的 rollout 被回收作 SFT 数据，把自己的口癖喂回自己，偏差逐代变成标准答案。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 原文 context

来源：<mention-page url="https://app.notion.com/p/3c7679b108ff83da8e608158cba52620"/>
**context**：
> Model-generated rollouts are used for supervised fine-tuning (SFT). The model gets even more comfortable producing the tic.
**费曼一下**：自我强化的五步闭环——
1. Playful 风格被 RL 奖励
2. 部分被奖励的样本里夹带了一个独特的 lexical tic
3. 这个 tic 在 rollouts 里出现得更频繁
4. Model-generated rollouts 被回收用作 SFT 数据
5. 模型产出这个 tic 更顺手、更舒服
本质上，模型把自己的口癖喂回给自己学，越喂越上头——很像一个人在朋友圈反复看到自己爆款回复的版本，于是说话越来越像那个版本。
为什么这是个**放大器**而不是简单的复制：
- 每一轮 SFT 都把「上一代的偏差」变成「下一代的标准答案」。
- 数据里的怪癖原本是少数派，循环之后会变成多数派 → 看似在「学习自己」，其实在**让偏差成为身份**。
- 想打断循环，需要在两端同时做事：上游收紧奖励信号、下游过滤回流到 SFT 的数据。
---
来源：<mention-page url="https://app.notion.com/p/eda679b108ff83c5941101d79d69ff4d"/>（中文复述 / 量子位）
**context**：
> 这就形成了一个反馈循环：俏皮的表达风格会获得正向奖励 → 部分被奖励的样本里带有独特用词口头禅/句式癖 → 这类语言癖在 rollouts 中出现得越来越频繁 → 模型自主生成的样本被用于有监督微调（SFT）→ 久而久之，模型会越来越习惯、自然地输出这种固定用词癖好。
**费曼一下**：中文版多出一个**反例 / smoking gun**：GPT-5.5 从未发布过"书呆子"人格，但 goblin 出现次数比 GPT-5.4 反而**更多**——这就直接证明 SFT 反馈循环是**独立于源人格存在的放大器**。即使你把上游开关关掉，下游数据里囤积的口癖还会自顾自地放大下去。修复必须**两头同时做**：移除 reward 信号 + 过滤训练数据。

## 掌握证据（做到这些才算会）

- 能复述奖励—口癖—回流—SFT 的五步闭环
- 能指出打断循环需上游收紧奖励、下游过滤回流数据

## 验收问句

> 要打断 {{name}}，得在哪两端同时动手？

## 懂了它才能懂（解锁 1）

- [[Model-relative Curriculum]] — 懂自生成数据回灌会固化旧口癖，才理解模型换代后旧课程为何必须重写。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/SFT-Feedback-Loop-58c679b108ff828da17a8197bd09f72e

## 别名

`SFT 反馈循环`、`supervised fine-tuning feedback loop`、`model-generated rollouts loop`

## 反链

- [[外包思考，但不外包理解]]
- [[Model-relative Curriculum]]
- [[Agent-Native Infrastructure]]
- [[Sensors 与 Actuators]]
