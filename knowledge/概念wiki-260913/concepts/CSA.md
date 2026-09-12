---
id: cm_bdf121d1
name: CSA
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.072
depth: 0
origin: [notion]
aliases: ["Compressed Sparse Attention", "压缩稀疏注意力"]
sources: 1
---

# CSA

> 压缩稀疏注意力：把 KV 分组压缩、每步只挑关键 KV 并保留滑动窗口，抑制上下文 n² 暴增。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 原文 context

<mention-page url="https://app.notion.com/p/dd2679b108ff8334b27601ede39a4a2e"/>
> 把一系列前后相连的标签含义KV分组打包……每次新的查询Q来了……先用一个小型筛选器，**挑出它认为最重要的若干个KV**……保留一个滑动窗口。
**费曼一下**：压缩（每章只记摘要）+ 稀疏（划重点只读关键部分）+ 滑动窗口（保留刚刚翻开的那一页）三件套。让模型不再随上下文 n² 暴增，但容易『注意力涣散』。
---
<mention-page url="https://app.notion.com/p/e14679b108ff82a79c9781937cfb2880"/>
- **context**：
	> 「混合注意力机制，CSA（压缩稀疏注意力），加 HCA（重度压缩注意力），mHC（流形约束超连接），还有就是那个 Muon 的优化器。」
- **费曼一下**：硅谷 101 把 CSA 和 HCA + mHC + Muon 一起列为 DeepSeek V4 把 token efficiency 做满的工程组合拳。从这一代开始，CSA 不再是单点尝试，而是和 HCA、mHC 并排进入 V 系列正式架构，成为「混合注意力机制」的关键支柱之一。

## 掌握证据（做到这些才算会）

- 能用压缩、稀疏、滑动窗口三件套复述 CSA 机制
- 能指出其代价是注意力容易涣散

## 验收问句

> {{name}} 用哪三件事压住注意力成本？代价是什么？

## 懂了它才能懂（解锁 1）

- [[混合注意力]] — 混合注意力由CSA与HCA交替构成，不懂CSA那半就说不清其设计。

## 相关

- [[多头注意力]] · related-to（audit） — CSA 核心是 KV 压缩与稀疏选择，懂注意力机制的 QKV/KV cache 即可；多头注意力不是硬前置。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/CSA-4d3679b108ff8376a01e01a023cc7fff

## 别名

`Compressed Sparse Attention`、`压缩稀疏注意力`

## 反链

- [[多头注意力]]
- [[混合注意力]]
