---
id: cm_61efc972
name: 锯齿状智能（Jagged Intelligence）
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 2
origin: [notion]
aliases: ["Jagged Intelligence", "不平滑能力", "AI 能力锯齿", "能力边界不平滑"]
sources: 1
---

# 锯齿状智能（Jagged Intelligence）

> LLM 能力边界不平滑，某些任务表现惊艳，相邻的简单任务却莫名失败。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

LLM 的能力**不是一条平滑曲线**——在博士级数学题上吊打人类的同时，可能数不清「strawberry 里有几个 r」。

## 掌握证据（做到这些才算会）

- 能举出同一模型强项与莫名失败的对照例子
- 能说明锯齿在订阅制与按 token 计费下代价不同

## 验收问句

> 你能指出 {{name}} 的表现并据此保留冗余校验与人工兜底吗？

## 先懂这些（前置 2）

- [[探针]] · **soft** — 能力边界为何参差不齐，要靠探针从各层强行读出属性来定位，不懂探针就只能凭感觉猜边界。
- [[世界模型]] · **soft** — 边界不平滑常被解释为缺一致内部表征，不懂世界模型就无法说明为何相邻任务会突然失败。

## 懂了它才能懂（解锁 2）

- [[Capability Overhang]] — 能力零星出现、边界不平滑正是余量存在的前提，不懂锯齿状智能就无法理解余量从何而来。
- [[capability spike 公式]] — 跃迁是局部突变而非整体提升，不懂能力边界不平滑就难以理解为何只有某些任务突然变强。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Jagged-Intelligence-7c3679b108ff83d2930901a02d225f88

## 别名

`Jagged Intelligence`、`不平滑能力`、`AI 能力锯齿`、`能力边界不平滑`

## 反链

- [[Capability Overhang]]
- [[世界模型]]
- [[探针]]
- [[capability spike 公式]]
