---
id: cm_e7cabc5e
name: 强化学习
nameEn: reinforcement learning
type: CONCEPTUAL
subject: AI 内参 260912
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.233
depth: 1
origin: [neican]
aliases: ["reinforcement learning"]
sources: 1
---

# 强化学习 · reinforcement learning

> 通过反复试验调整神经网络、提升被认可行为概率的训练，含思维链、能动性、对齐训练三种。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.233

## 费曼一下

强化学习通过反复试验调整神经网络，让被认为好的行为概率增加、坏的行为概率降低。它包含三种形式：思维链推理、能动性训练、对齐训练。本文特别关心后两种：AI 被训练在外部世界行动，并被训练取悦人类评分者或预测评分者的 AI。这两个训练目标都不是精确写死的规则，因此会带来模糊性和作弊空间。

## 原文 context

其次，他们通过反复试验进行训练，研究人员将这一过程称为 **强化学习**，这种训练方式分为三种：

> * 第一种方法是，模型在回答问题之前会先进行自我对话，生成一个私有的“思维链”，这有助于它在答案可以验证的问题上找到正确答案。这看起来像是 **推理**。

* 第二种是“**能动性训练**”，即学习在外部世界中行动，例如使用软件工具、与人互动，以完成分配给它的任务。

* 第三种是“**对齐训练**”，即奖励它以人类评分者认可的方式行事，或者以其他经过训练可以预测这些评分者会给出高分的 AI 系统所期望的方式行事。

## 掌握证据（做到这些才算会）

- 能说出强化学习通过什么方式调整行为概率
- 能区分思维链推理、能动性训练、对齐训练三种形式

## 验收问句

> {{name}} 的三种形式分别训练模型做什么？

## 先懂这些（前置 1）

- [[预训练与人类模仿]] · **soft** — 不懂预训练与人类模仿，就做不了强化学习里的对齐训练——在一套已从人类文字中习得百科式知识与目标模式的网络上，再去调整被认可行为的概率

## 懂了它才能懂（解锁 2）

- [[目标导向型系统 goal-directed system]] — 不懂强化学习中奖励如何反复塑造网络行为，就做不了目标导向型系统的判定——看不出一个系统是在「训练结束后仍像奖励持续存在一样行动」
- [[Scientist 人工智能框架]] — 不懂强化学习（含思维链、能动性、对齐训练）这套默认训练范式，就做不了 Scientist 框架作为「替代设计方向」的定位与论证

## 出场

- AI 内参 260912 ｜ 《What can be done to mitigate loss-of-control risks》 ｜ https://yoshuabengio.org/en/publication/why-are-ai-agents-lying-cheating-and-coordinating

## 别名

`reinforcement learning`

## 反链

- [[目标导向型系统 goal-directed system]]
- [[Scientist 人工智能框架]]
- [[预训练与人类模仿]]
