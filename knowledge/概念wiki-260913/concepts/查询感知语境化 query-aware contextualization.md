---
id: cm_2fd13e0c
name: 查询感知语境化
nameEn: query-aware contextualization
type: PROCEDURAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 1
origin: [context]
aliases: ["query-aware contextualization"]
sources: 1
---

# 查询感知语境化 · query-aware contextualization

> 把查询同时放在待处理数据的前面与后面，使 decoder-only 模型编码材料时就注意到查询。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

先告诉模型"你要找什么"，再给材料，最后再问一遍。找一个具体的东西时这招极灵；需要综合判断时就没什么用。

## 原文 context

把查询同时放在待处理数据的前面和后面，使 decoder-only 模型在编码材料时就能注意到查询。它在合成键值任务上带来近乎完美的成绩，在多文档问答上却几乎无效。

## 掌握证据（做到这些才算会）

- 能复述结论：合成键值任务近乎完美，多文档问答几乎无效
- 能说明它为何只对特定任务结构与模型类型有效

## 验收问句

> 什么任务该用 {{name}}，什么任务不该用？

## 先懂这些（前置 1）

- [[迷失在中间 lost in the middle]] · **hard** — 不懂【迷失在中间】，就做不了【查询感知语境化】的「为什么把查询同时放在数据前后能避免中段被忽略」的机制设计。

## 相关

- [[首因偏置 primacy bias]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[U 型性能曲线]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[迷失在中间 lost in the middle]] · 同篇出现（co-occurrence） — 同篇出现：context-02

## 出场

- Context Engineering ｜ 《经典论文《迷失在中间》：位置决定了模型能不能真的用上信息》 ｜ https://arxiv.org/pdf/2307.03172

## 别名

`query-aware contextualization`

## 反链

- [[迷失在中间 lost in the middle]]
- [[U 型性能曲线]]
- [[首因偏置 primacy bias]]
