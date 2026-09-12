---
id: cm_b9e6e94d
name: mHC
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: accept
centrality: 0.045
depth: 1
origin: [notion]
aliases: ["Manifold-constrained Hyper-Connection", "流形约束超连接"]
sources: 1
---

# mHC

> 流形约束超连接，用流形几何约束 Transformer 层间连接，让信息传递更短更准，提升 token 效率。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.045

## 原文 context

<mention-page url="https://app.notion.com/p/e14679b108ff82a79c9781937cfb2880"/>
- **context**：
	> 「混合注意力机制，CSA（压缩稀疏注意力），加 HCA（重度压缩注意力），mHC（流形约束超连接），还有就是那个 Muon 的优化器。」
- **费曼一下**：mHC 是 DeepSeek V4 token efficiency 工程包里的一员。把 Transformer 不同层之间的连接看成在一个「流形」（manifold，可以理解为有几何结构的高维曲面）上铺路：靠流形几何的约束，让信息在层与层之间走得更短、更准，从而用同样的参数和算力换更高效的特征传递。和 CSA / HCA 配合，是 V4 把注意力机制压扁、又把信息流摊平的两手策略。

## 掌握证据（做到这些才算会）

- 能说明 mHC 在 V4 工程包里与 CSA/HCA 的分工
- 能复述层间连接被放在流形上约束这一说法

## 验收问句

> 你能说清 {{name}} 在 V4 里承担什么角色吗？

## 先懂这些（前置 1）

- [[残差流]] · **hard** — mHC约束层间连接即改进残差流传递，不懂残差流就抓不住其对象。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/mHC-0df679b108ff83f48ee201c3291e465b

## 别名

`Manifold-constrained Hyper-Connection`、`流形约束超连接`

## 反链

- [[残差流]]
