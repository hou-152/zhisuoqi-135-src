---
id: cm_6c8463ad
name: 约束型 API 与成本不平衡
type: CONCEPTUAL
subject: AI 内参 260912
domain: caching-cost
learningStage: when-needed
verification: judge
centrality: 0.107
depth: 1
origin: [neican]
aliases: []
sources: 1
---

# 约束型 API 与成本不平衡

> 不开放任意 SQL，用简单 NoSQL API 让请求成本可预测，避免写得便宜、跑得昂贵的失衡。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.107

## 费曼一下

写一条 SQL 查询很便宜，但让它高效运行可能很贵；一条热路径上的昂贵查询就可能拖垮数据库。Habitat 不开放任意 SQL，而提供简单 NoSQL API，使请求成本可预测、工作量恒定。这个约束是 Python 服务能扩展到很大规模的原因之一，也是 Habitat 设计中的明确取舍。

## 原文 context

One reason we could scale Python this far was Habitat’s constrained API, which keeps request cost predictable.

> The problem here is in cost imbalance: it is cheap and easy to write SQL queries that are expensive and hard to run. In Habitat, we avoid this and make expensive queries exceedingly obvious client-side.

> 我们旨在优化简单、可预测、恒定工作量的请求。

## 掌握证据（做到这些才算会）

- 能解释“写 SQL 便宜、跑 SQL 昂贵”的成本不平衡
- 能说明约束型 API 为何是 Python 服务能扩到很大规模的原因之一

## 验收问句

> {{name}} 如何把昂贵查询在客户端变得显而易见？

## 先懂这些（前置 1）

- [[脚本执行]] · **soft** — 不懂【脚本执行】里『脚本不必读入上下文、运行期只有输出消耗 token』这套运行期成本模型，就做不了【约束型API与成本不平衡】中『判断一次请求实际烧掉多少、从而把 API 设计成成本可预测』这件事

## 出场

- AI 内参 260912 ｜ 《Rapidly scaling online storage to serve over 1 billion ChatGPT users（存储平台 Habitat 的扩容复盘）》 ｜ https://openai.com/index/scaling-storage-one-billion-users-part-one/
## 反链

- [[脚本执行]]
