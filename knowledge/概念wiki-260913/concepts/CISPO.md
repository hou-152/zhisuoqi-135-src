---
id: cm_07d6de4f
name: CISPO
type: REPRESENTATIONAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.072
depth: 1
origin: [notion]
aliases: ["裁剪重要性采样策略优化", "Clipped Importance Sampling Policy Optimization"]
sources: 1
---

# CISPO

> 一种 RL 目标：不裁梯度只裁权重，把 IS 比例硬截断加 stop-gradient，保住转折 token 的梯度。

**领域** model-training ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 原文 context

<mention-page url="https://app.notion.com/p/6ce679b108ff83778c7601e6e27c3f0e"/>
> 当一个 token 落在裁剪范围之外时，PPO 会完全阻断其梯度……报告中提到，像「However」「Recheck」「Wait」和「Aha」这类词汇在基座模型中的概率很低，但它们却可以作为推理轨迹中的分叉点。
**费曼一下**：PPO 一发现 token 概率波动太大就把它整个梯度砍掉，可惜被砍掉的恰好是「However」「Recheck」「Wait」「Aha」这种推理转折点的关键 token。CISPO（MiniMax-M1 首提）改一个细节：不裁梯度、只裁权重——把 IS 比例硬截断并加 stop-gradient——这样所有 token 的梯度照常反传，方差也削减了。MiniMax 实验里训练效率比 DAPO 翻倍，最后被 ScaleRL 钦定为默认。本质是 PPO 风格掩码的"软性替代"。

## 掌握证据（做到这些才算会）

- 能说明 PPO 裁剪为何误伤 However、Recheck、Wait、Aha 等分叉 token
- 能说出 CISPO 与 DAPO 的训练效率对比及被 ScaleRL 定为默认

## 验收问句

> {{name}} 相比 PPO 改了哪一步，推理转折 token 为何不再被砍？

## 先懂这些（前置 1）

- [[重要性采样]] · **hard** — CISPO直接截断IS比例并停梯度，不懂IS就抓不住其目标。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/CISPO-ac4679b108ff83108bca81d906af74b5

## 别名

`裁剪重要性采样策略优化`、`Clipped Importance Sampling Policy Optimization`

## 反链

- [[外包思考，但不外包理解]]
- [[Agent-Native Infrastructure]]
- [[重要性采样]]
- [[Sensors 与 Actuators]]
