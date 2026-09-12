---
id: cm_60fc8578
name: needle-question 语义相似度谱系
type: CONCEPTUAL
subject: Context Engineering
domain: verification-eval
learningStage: when-needed
verification: compute
centrality: 0.042
depth: 1
origin: [context]
aliases: []
sources: 1
---

# needle-question 语义相似度谱系

> 把问答相似度量化成连续余弦谱，跨五个 embedding 模型取平均，相似度越低性能随长度衰减越快。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.042

## 费曼一下

问题和答案共享的词越少，模型就越要靠「意会」。短文本里意会得动，文本一长就意会不动了。而现实中的提问几乎从不精确复述答案里的措辞，所以真实场景恰好落在这条曲线衰减最快的那一段。

## 原文 context

把「问题与答案有多像」量化成余弦相似度，并跨 text-embedding-3-small、text-embedding-3-large、jina-embeddings-v3、voyage-3-large、all-MiniLM-L6-v2 五个模型取平均。PG 随笔主题的 8 根 needle 落在 0.445–0.775，arXiv 主题落在 0.521–0.829，标准差均 <0.1。结论：相似度越低，性能随长度衰减越快。原文同时反对把问答粗暴地二分为「词面/非词面」——真实的相似度是连续谱。

## 掌握证据（做到这些才算会）

- 能算出某个 needle 的跨模型平均相似度与标准差
- 能说明为何反对把问答二分为词面与非词面

## 验收问句

> {{name}} 为什么反对把问答二分为词面与非词面？

## 先懂这些（前置 1）

- [[needle-haystack 相似度]] · **soft** — 谱系是余弦检索相似度指标向问答任务的推广。

## 相关

- [[上下文均匀处理假设]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[大海捞针（NIAH）与词面匹配]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-03

## 出场

- Context Engineering ｜ 《Chroma 实测上下文腐烂：输入越长，模型并非均匀地可靠》 ｜ https://research.trychroma.com/context-rot
## 反链

- [[上下文腐烂 Context Rot]]
- [[大海捞针（NIAH）与词面匹配]]
- [[上下文均匀处理假设]]
- [[needle-haystack 相似度]]
