---
id: cm_7be88c4d
name: context window 即 agent 状态
type: CONCEPTUAL
subject: Context Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.042
depth: 0
origin: [context]
aliases: []
sources: 1
---

# context window 即 agent 状态

> 循环中上下文起于一个初始事件，此后每次决策与执行结果都追加进去，它本身就是 Agent 的状态。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

agent 没有记忆器官，它的全部人生经历就是那段被反复喂回去的文本。你往里塞什么、按什么顺序塞、塞多少，直接决定它下一步会做什么。所以上下文不是配置项，而是这个系统真正的状态数据库——把它交给框架托管，等于把数据库交给别人。

## 原文 context

在原文循环里，context 起手只是一个 initial event（用户消息、cron、webhook），随后每一次决策与每一次执行结果都被 append 进去。Factor 3 直呼 "Own your context window"。

## 掌握证据（做到这些才算会）

- 能说出初始事件的三种来源
- 能解释为什么要自己掌控上下文窗口

## 验收问句

> 为什么说 {{name}}，它里面都装了什么？

## 懂了它才能懂（解锁 1）

- [[时间 Scalability Temporal Scalability]] — 长时运行保持方向，前提是把上下文当作可累积的持久状态来管理。

## 相关

- [[12-factor agents]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[「并不 agentic」的 AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[软件即有向图]] · 同篇出现（co-occurrence） — 同篇出现：context-06

## 出场

- Context Engineering ｜ 《12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则》 ｜ https://github.com/humanlayer/12-factor-agents
## 反链

- [[时间 Scalability Temporal Scalability]]
- [[「并不 agentic」的 AI Agent]]
- [[12-factor agents]]
- [[软件即有向图]]
