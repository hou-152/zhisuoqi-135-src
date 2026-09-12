---
id: cm_1e5e4cee
name: Q、K、V
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.099
depth: 0
origin: [notion]
aliases: ["Query / Key / Value", "QKV", "Query Key Value"]
sources: 1
---

# Q、K、V

> 注意力三角色：Q 是查询、K 是标签、V 是含义；先算 Q 与 K 相似度，再对 V 加权求和。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.099

## 原文 context

<mention-page url="https://app.notion.com/p/dd2679b108ff8334b27601ede39a4a2e"/>
> Q（Query，查询），你想要查找的内容，模型拿着这个查询Q去和所有的标签K比较相似度，找到最匹配的标签，然后按照匹配程度，把对应的含义V加权平均起来，得到最终的理解结果。
**费曼一下**：注意力机制的三个角色——Q 是问题、K 是标签（用来匹配问题）、V 是答案的含义。先用 Q 和 K 算相似度，再按相似度对 V 加权求和。

## 掌握证据（做到这些才算会）

- 能写出一维相似度加权求和的例子
- 能解释 Q 与 K 比对后如何取 V

## 验收问句

> {{name}} 中相似度算完之后，对谁做加权？

## 懂了它才能懂（解锁 3）

- [[multimodal Vision LLMs]] — 多模态 token 进入同一套注意力处理，懂 QKV 才懂图文融合的机制。
- [[Tuned Lens]] — Tuned Lens 观察隐藏状态走向 logits，懂 QKV 才懂中间层信息如何被读取。
- [[MoE]] — MoE 在 Transformer 中替换 FFN，懂 QKV 才懂它在计算流里的位置。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Q-K-V-010679b108ff83828f8601c486aeab55

## 别名

`Query / Key / Value`、`QKV`、`Query Key Value`

## 反链

- [[multimodal Vision LLMs]]
- [[MoE]]
- [[Tuned Lens]]
