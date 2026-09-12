---
id: cm_9d5fc50e
name: 恰当高度
nameEn: the right altitude
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: ["the right altitude"]
sources: 1
---

# 恰当高度 · the right altitude

> system prompt 的黄金区间：既不过度硬编码 if-else，也不含糊到缺乏具体信号。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

交代事情的颗粒度。说「客人进门第 3 秒说你好，第 7 秒递菜单」是把人当机器；说「让客人感到宾至如归」又等于没说。好的交代是「先问清楚客人的需求再推荐，拿不准就叫店长」——有判断依据，但不替对方做每一步决定。

## 原文 context

描述 system prompt 写作的 Goldilocks 区间。一端是硬编码复杂脆弱 if-else 逻辑以逼出精确行为，制造脆弱性与维护负担；另一端是含糊的高层指导，缺乏具体信号或错误假设共享 context。最优点是「specific enough to guide behavior effectively, yet flexible enough to provide the model with strong heuristics」。

## 掌握证据（做到这些才算会）

- 能判断一段 system prompt 落在过具体还是过含糊哪一端
- 能改写一段 prompt，使其具体到可引导行为又保留强启发式

## 验收问句

> 把这段 prompt 调到{{name}}，你会删什么、补什么？

## 相关

- [[注意力预算 attention budget]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-05

## 出场

- Context Engineering ｜ 《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》 ｜ https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

## 别名

`the right altitude`

## 反链

- [[上下文工程 context engineering]]
- [[注意力预算 attention budget]]
- [[上下文腐烂 Context Rot]]
