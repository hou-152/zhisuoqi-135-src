---
id: cm_1e5e4cee
name: Q、K、V
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 0
origin: [notion]
aliases: ["Query / Key / Value", "QKV", "Query Key Value"]
sources: 1
---

# Q、K、V

> 注意力三角色：Q 是查询、K 是标签、V 是含义；先算 Q 与 K 相似度，再对 V 加权求和。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 原文 context

<mention-page url="https://app.notion.com/p/dd2679b108ff8334b27601ede39a4a2e"/>
> Q（Query，查询），你想要查找的内容，模型拿着这个查询Q去和所有的标签K比较相似度，找到最匹配的标签，然后按照匹配程度，把对应的含义V加权平均起来，得到最终的理解结果。
**费曼一下**：注意力机制的三个角色——Q 是问题、K 是标签（用来匹配问题）、V 是答案的含义。先用 Q 和 K 算相似度，再按相似度对 V 加权求和。

## 掌握证据（做到这些才算会）

- 能写出一维相似度加权求和的例子
- 能解释 Q 与 K 比对后如何取 V

## 验收问句

> {{name}} 中相似度算完之后，对谁做加权？

## 懂了它才能懂（解锁 2）

- [[Tiny Engram]] — 不懂 Q、K、V，就做不了 Tiny Engram 把 Engram 挂到 Stable Diffusion 交叉注意力层的迁移
- [[VLM]] — 不懂 Q、K、V，就做不了 VLM 的跨模态注意力融合（图像 token 对文本 token 的加权）

## 相关

- [[mHC]] · rejected（audit） — mHC 约束的是层间连接，与注意力 QKV 是不同机制，QKV 非其前置
- [[MoE]] · rejected（audit） — MoE 稀疏化的是 FFN，与 QKV 注意力是并列组件，不构成依赖，理由定位有误
- [[Muon 优化器]] · rejected（audit） — QKV 只是 Transformer 中一类矩阵参数；Muon 优化任意矩阵参数，不懂注意力也能理解它。
- [[multimodal Vision LLMs]] · related-to（audit） — 多模态 LLM 的核心是不同模态的编码与对齐；QKV 是 Transformer 底层机制，不懂它仍可理解多模态概念，只是帮助理解融合。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Q-K-V-010679b108ff83828f8601c486aeab55

## 别名

`Query / Key / Value`、`QKV`、`Query Key Value`

## 反链

- [[multimodal Vision LLMs]]
- [[Tiny Engram]]
- [[VLM]]
- [[mHC]]
- [[MoE]]
- [[Muon 优化器]]
