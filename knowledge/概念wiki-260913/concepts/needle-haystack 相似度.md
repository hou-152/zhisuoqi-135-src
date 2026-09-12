---
id: cm_fada3d6a
name: needle-haystack 相似度
type: PROCEDURAL
subject: Context Engineering
domain: verification-eval
learningStage: when-needed
verification: compute
centrality: 0.072
depth: 0
origin: [context]
aliases: []
sources: 1
---

# needle-haystack 相似度

> 用 needle 与 haystack 的 top-5 最相似 chunk 平均余弦相似度，量化检索任务的主题接近程度。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.072

## 费曼一下

直觉是「答案越像周围的内容就越难被挑出来，像迷彩服」。实测没给出这么干净的规律——模型对「融不融进背景」其实没那么敏感。这是报告里少数被诚实地标为「尚无定论」的地方，比强行给结论更有价值。

## 原文 context

needle 与背景语料在语义上有多接近。度量方式是把 haystack embedding 后为每根 needle 取 top-5 最相似 chunk 并平均余弦相似度，跨 5 个 embedding 模型重复。实测：PG haystack 中 PG needle 均值 0.529、arXiv needle 0.368；arXiv haystack 中 arXiv needle 0.654、PG needle 0.394。影响被判定为非均匀，作者明确表示两个主题不足以下定论。

## 掌握证据（做到这些才算会）

- 能对一批 needle 算出跨多个 embedding 模型的平均相似度
- 能报出不同 haystack 下 needle 相似度的实测差别

## 验收问句

> {{name}} 高说明这根针更好找还是更难找？

## 懂了它才能懂（解锁 1）

- [[needle-question 语义相似度谱系]] — 谱系是余弦检索相似度指标向问答任务的推广。

## 相关

- [[上下文均匀处理假设]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[大海捞针（NIAH）与词面匹配]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-03

## 出场

- Context Engineering ｜ 《Chroma 实测上下文腐烂：输入越长，模型并非均匀地可靠》 ｜ https://research.trychroma.com/context-rot
## 反链

- [[上下文腐烂 Context Rot]]
- [[上下文均匀处理假设]]
- [[needle-question 语义相似度谱系]]
- [[大海捞针（NIAH）与词面匹配]]
