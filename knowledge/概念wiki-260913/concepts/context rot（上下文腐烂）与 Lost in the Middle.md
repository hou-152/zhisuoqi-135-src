---
id: cm_beedff1a
name: context rot（上下文腐烂）与 Lost in the Middle
type: CONCEPTUAL
subject: Harness Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.092
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# context rot（上下文腐烂）与 Lost in the Middle

> 关键内容落在窗口中段时模型表现下降 30% 以上；长窗口也会随长度增加出现指令遵循退化。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.092

## 费曼一下

模型读长文像人扫读长会议纪要——开头记得，结尾记得，中间那段基本白读。所以别把最关键的一句藏在中段。

## 原文 context

上下文管理失效的核心机制——关键内容落在窗口中部时模型表现下降 30%+（Chroma 研究，与 Stanford 的「Lost in the Middle」互证）；百万 token 窗口同样会随上下文变长而出现指令遵循退化。文章据此把重要内容安排在提示的开头与结尾。

## 掌握证据（做到这些才算会）

- 能说出中部内容带来的性能损失量级
- 能据此把重要内容放在提示首尾

## 验收问句

> {{name}} 要求你把关键信息放在提示的什么位置？

## 懂了它才能懂（解锁 3）

- [[Context Anxiety]] — 它属于长上下文下的行为退化家族，先懂退化现象更好定位它
- [[Context Distraction]] — 机械重复是长上下文退化的表现，先懂退化更易理解它
- [[haystack 结构连贯性效应]] — 它解释输入结构如何影响注意力，与长上下文退化同属一类发现

## 相关

- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12
## 反链

- [[agent 与 harness 的分工]]
- [[Context Distraction]]
- [[If you're not the model, you're the harness.]]
- [[Context Anxiety]]
- [[haystack 结构连贯性效应]]
