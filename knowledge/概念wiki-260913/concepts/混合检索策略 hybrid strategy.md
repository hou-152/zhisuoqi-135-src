---
id: cm_9de70b84
name: 混合检索策略
nameEn: hybrid strategy
type: PROCEDURAL
subject: Context Engineering
domain: memory-retrieval
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: ["hybrid strategy"]
sources: 1
---

# 混合检索策略 · hybrid strategy

> 预检索与即时检索的折中：先放入一部分保证速度，再由 Agent 自行决定深入探索。

**领域** memory-retrieval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

出门前先把地图和常用电话装口袋，其余的到了现场再问。两种做法各有代价——全预备太慢太重，全现问又容易走弯路，所以真实的做法通常是先备最稳定的那部分。

## 原文 context

预检索与即时检索的折中——先取一部分数据保证速度，再由 agent 自行决定深入探索。Claude Code 是范例：CLAUDE.md 一次性放入 context，glob、grep 等原语支持即时取文件，绕开陈旧索引与复杂语法树。文中指出内容不那么动态的场景（法律、金融）更适合它。

## 掌握证据（做到这些才算会）

- 能说出 CLAUDE.md 一次性入上下文、glob/grep 即时取文件
- 能指出法律、金融等内容不动态的场景更适合

## 验收问句

> {{name}} 在什么场景下最合适？

## 相关

- [[注意力预算 attention budget]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-05

## 出场

- Context Engineering ｜ 《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》 ｜ https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents

## 别名

`hybrid strategy`

## 反链

- [[上下文工程 context engineering]]
- [[注意力预算 attention budget]]
- [[上下文腐烂 Context Rot]]
