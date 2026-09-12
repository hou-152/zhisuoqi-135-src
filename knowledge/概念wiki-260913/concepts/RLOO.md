---
id: cm_759cbeb8
name: RLOO
type: PROCEDURAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: compute
centrality: 0.067
depth: 5
origin: [notion]
aliases: ["REINFORCE Leave-One-Out"]
sources: 1
---

# RLOO

> 每 prompt 采 K 条回复，优势=自身奖励减其余 K-1 条均值，不除标准差并放弃裁剪回到纯 REINFORCE。

**领域** model-training ｜ **类型** PROCEDURAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.067

## 原文 context

<mention-page url="https://app.notion.com/p/6ce679b108ff83778c7601e6e27c3f0e"/>
> 对于每个提示词，RLOO 会采样 K 个回复……回复 y_i 的优势等于其奖励减去其他 K-1 个回复的平均奖励……更重要的是，RLOO 放弃了 PPO 风格的裁剪，转而回到纯粋的 REINFORCE 风格更新。
**费曼一下**：与 GRPO 同期、思路相近——每 prompt 采 K 条，每条优势 = 自己奖励减去"其他 K-1 条平均"。差异：不除标准差；放弃裁剪回到纯 REINFORCE。作者称裁剪激活率 \< 5% 可省——后来 CISPO/DPPO 用更细致的方式表明裁剪还是要保留，只是要做得更聪明。

## 掌握证据（做到这些才算会）

- 能按 RLOO 公式算出每条回复的优势值
- 能说出它与 GRPO 在除标准差和裁剪上的差异

## 验收问句

> 用 {{name}} 算这条回复的优势，并说明为何不裁剪。

## 先懂这些（前置 2）

- [[REINFORCE]] · **hard** — RLOO 放弃裁剪回到纯 REINFORCE，不懂 REINFORCE 就理解不了它的优势定义。
- [[DPPO]] · **soft** — RLOO 放弃 PPO 的裁剪，先懂 PPO 才能理解它做了哪些简化。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/RLOO-05c679b108ff82c793c501ddfdc496f1

## 别名

`REINFORCE Leave-One-Out`

## 反链

- [[DPPO]]
- [[REINFORCE]]
