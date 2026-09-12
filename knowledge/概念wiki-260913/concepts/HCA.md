---
id: cm_f61cc152
name: HCA
type: REPRESENTATIONAL
subject: AI 概念库
domain: context-engineering
learningStage: deep-dive
verification: judge
centrality: 0.042
depth: 6
origin: [notion]
aliases: ["Heavily Compressed Attention", "重度压缩注意力"]
sources: 1
---

# HCA

> 重度压缩注意力：每 128 个相邻标签含义 KV 压成 1 个输入，压缩率达 CSA 四倍，剩下太少便不做稀疏筛选、让 Q 全量关注。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 原文 context

<mention-page url="https://app.notion.com/p/dd2679b108ff8334b27601ede39a4a2e"/>
> 把每128个相邻的标签含义KV都压缩成1个输入，是CSA压缩率的四倍……压缩后剩下的输入数量已经少得可以不做稀疏筛选了，直接让Q看到所有压缩后的输入。
**费曼一下**：CSA 的『豪华版压缩』——压缩率 4 倍于 CSA，细节损失更大；但因为压缩后总数已经够少，干脆不做筛选，让 Q 全量关注，从根上避免『筛选器漏掉关键信息』。
---
<mention-page url="https://app.notion.com/p/e14679b108ff82a79c9781937cfb2880"/>
- **context**：
	> 「混合注意力机制，CSA（压缩稀疏注意力），加 HCA（重度压缩注意力），mHC（流形约束超连接），还有就是那个 Muon 的优化器。」
- **费曼一下**：硅谷 101 把 HCA 与 CSA + mHC + Muon 优化器一起列为 DeepSeek V4 「混合注意力机制」的核心拼图。HCA 的贵重压缩负责「极限压缩后全量关注」那一段，为 token efficiency 的最后一公里提供了关键压舰性能。

## 掌握证据（做到这些才算会）

- 能说出 HCA 压缩率是 CSA 的 4 倍、代价是细节损失更大
- 能解释压缩后为何可以取消稀疏筛选这一步

## 验收问句

> {{name}} 为什么敢省掉稀疏筛选这一步？

## 先懂这些（前置 1）

- [[选择性注意力压缩]] · **hard** — HCA 是一种具体的压缩注意力实现，不懂选择性注意力压缩就无从理解它。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/HCA-fb4679b108ff833d99e58171ccc77787

## 别名

`Heavily Compressed Attention`、`重度压缩注意力`

## 反链

- [[选择性注意力压缩]]
