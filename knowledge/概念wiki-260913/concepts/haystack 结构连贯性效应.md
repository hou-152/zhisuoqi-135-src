---
id: cm_8c8c6e16
name: haystack 结构连贯性效应
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: deep-dive
verification: accept
centrality: 0.042
depth: 1
origin: [context]
aliases: []
sources: 1
---

# haystack 结构连贯性效应

> 同批语料保留思路流与随机打乱句序相比，打乱版性能反而更好，提示输入结构会影响注意力施加方式。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.042

## 费曼一下

本以为给模型一份条理清楚的材料它会读得更好，实测反而是把句子打散更容易被找到。这几乎是对「整理好资料再喂给模型」这条工程直觉的一记闷棍。它也提醒我们：模型对上下文的敏感点，未必落在人类觉得重要的那些维度上。

## 原文 context

把同一批语料做成两个版本——original 保留原有的思路流，shuffled 把句子随机重排（主题不变、逻辑连贯性消失）。反直觉的一致结论是：结构连贯性损害性能，18 个模型都在打乱版上表现更好。作者据此推测输入的结构模式可能影响注意力机制的施加方式，尤其在长输入下，并把机制解释留给可解释性研究。

## 掌握证据（做到这些才算会）

- 能复述 18 个模型在 shuffled 版上普遍更好的反直觉结论
- 能说明作者只给出机制推测、把机制解释留给可解释性研究

## 验收问句

> {{name}} 的实测结论是什么，作者对机制解释到什么程度？

## 先懂这些（前置 1）

- [[context rot（上下文腐烂）与 Lost in the Middle]] · **soft** — 它解释输入结构如何影响注意力，与长上下文退化同属一类发现

## 相关

- [[上下文均匀处理假设]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[大海捞针（NIAH）与词面匹配]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-03

## 出场

- Context Engineering ｜ 《Chroma 实测上下文腐烂：输入越长，模型并非均匀地可靠》 ｜ https://research.trychroma.com/context-rot
## 反链

- [[上下文腐烂 Context Rot]]
- [[context rot（上下文腐烂）与 Lost in the Middle]]
- [[大海捞针（NIAH）与词面匹配]]
- [[上下文均匀处理假设]]
