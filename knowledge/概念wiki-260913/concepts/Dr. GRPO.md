---
id: cm_786f3b46
name: Dr. GRPO
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.181
depth: 4
origin: [notion]
aliases: ["GRPO Done Right", "做对的 GRPO"]
sources: 1
---

# Dr. GRPO

> 指出 GRPO 样本级归一化带来偏向简短正确与冗长错误的偏置，改用固定常量归一化并去掉标准差归一化。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.181

## 原文 context

<mention-page url="https://app.notion.com/p/6ce679b108ff83778c7601e6e27c3f0e"/>
> Dr. GRPO（意为「做对的 GRPO/GRPO Done Right」）的作者们发现了另一个更重要的原因。标准的样本级损失归一化引入了一种偏置。这种偏置倾向于支持简短的正确回复以及冗长的错误回复。
**费曼一下**：GRPO 训练时回复越来越长，DeepSeek 解释为「顿悟时刻」；Dr. GRPO 给出更冷静的诊断——"先序列内平均、再跨序列平均"造成系统性偏置：偏向"简短正确 + 冗长错误"。修法朴素：用固定常量（最大 token 数）代替序列长度做归一化；同时砍掉标准差归一化（σ 极小时会把"几乎已答对"的 prompt 微小差异放大成巨大优势）。启示：GRPO 没问题，问题在那些"看似无害的归一化"并非中立。

## 掌握证据（做到这些才算会）

- 能解释回复变长不是顿悟而是归一化偏置
- 能说出两处修法并预测训练曲线变化

## 验收问句

> {{name}} 改掉了 GRPO 的哪两处归一化？

## 先懂这些（前置 4）

- [[优势函数]] · **hard** — GRPO用组内均值算相对优势，不懂优势函数就抓不住其核心。
- [[价值函数]] · **hard** — GRPO的卖点是移除critic，不懂价值函数就不知它省了什么。
- [[DPPO]] · **hard** — GRPO是PPO的变体，去掉critic改用组内相对优势，不懂PPO就不知道它到底改掉了什么。
- [[价值函数]] · **hard** — GRPO的卖点正是移除价值函数以省内存，不懂价值函数做什么就看不出这一步省在哪里。

## 懂了它才能懂（解锁 2）

- [[DAPO]] — DAPO在GRPO上解耦裁剪与改损失，不懂GRPO就看不懂它改了什么。
- [[MaxRL]] — MaxRL沿用组采样与相对思路，只把目标换成至少一次成功，不懂GRPO就接不上它的基线设定。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Dr-GRPO-212679b108ff827e9cf9814ac1696067

## 别名

`GRPO Done Right`、`做对的 GRPO`

## 反链

- [[DPPO]]
- [[外包思考，但不外包理解]]
- [[价值函数]]
- [[Agent-Native Infrastructure]]
- [[优势函数]]
- [[DAPO]]
- [[MaxRL]]
- [[Sensors 与 Actuators]]
