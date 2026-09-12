---
id: cm_34ec5743
name: new topic 判定
type: PROCEDURAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: accept
centrality: 0.017
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# new topic 判定

> 小模型在发送消息时判断 isNewTopic 并抽 2-3 词标题，作者推测用途是管理上下文。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.017

## 费曼一下

长对话最大的敌人是上下文越堆越乱。先问一句「这是不是新话题」，就能决定要不要另起一段记忆，而不是把所有东西一直背在身上。

## 原文 context

另一个小模型请求在发送消息时判断 isNewTopic 并抽一个 2-3 词标题，作者判断「感觉是用来管理 context」。

## 掌握证据（做到这些才算会）

- 能实现一个返回 isNewTopic 与标题的判定环节
- 能说明该判定结果如何被用于切分上下文

## 验收问句

> {{name}} 的结果会被拿去做什么？

## 相关

- [[Session Management]] · related-to（audit） — 理由只是动机层：新话题判定可独立理解为『分类+抽标题』的机制，不懂会话管理也立得住；而且目的上更像会话管理在用它，建议降 soft 或反向考察
- [[对话加确定性缝合]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[反向代理式窥探]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[看对话 log]] · 同篇出现（co-occurrence） — 同篇出现：harness-21

## 出场

- Harness Engineering ｜ 《拆开 Claude Code：一个编码 agent 的 harness 内部长什么样》 ｜ https://xxchan.me/ai/2025/05/06/claude-code.html
## 反链

- [[看对话 log]]
- [[Session Management]]
- [[对话加确定性缝合]]
- [[反向代理式窥探]]
