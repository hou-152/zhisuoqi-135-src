---
id: cm_4f9d35ac
name: Context Reset vs Compaction】
type: CONCEPTUAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Context Reset vs Compaction】

> 压缩是就地总结让同一 Agent 带着缩短历史继续；重置是清空重来，靠交接物把状态交给下一个 Agent。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

两种处理上下文窗口溢出的策略。Compaction 是「原地总结」——把早期对话压缩，同一个 agent 继续工作，优点是连续性，缺点是 context anxiety 仍在。Reset 是「重新开始」——彻底清空上下文，启动新 agent，通过 handoff artifact 传递状态。代价是编排复杂度和 token 开销，但能彻底消除 context anxiety。

## 原文 context

This differs from compaction, where earlier parts of the conversation are summarized in place so the same agent can keep going on a shortened history. While compaction preserves continuity, it doesn’t give the agent a clean slate, which means context anxiety can still persist. A reset provides a clean slate, at the cost of the handoff artifact having enough state for the next agent to pick up the work cleanly.

## 掌握证据（做到这些才算会）

- 能说明压缩为何给不了干净起点
- 能列出重置所需交接产物的内容

## 验收问句

> {{name}} 两种做法各自的代价是什么？

## 先懂这些（前置 1）

- [[Handoff Artifact】]] · **hard** — 重置分支必须靠结构化交接工件把状态交给下一个 agent

## 懂了它才能懂（解锁 1）

- [[Session Management】]] — 会话管理要决定何时 compact、何时重来，先懂两者区别

## 相关

- [[Generator-Evaluator Loop】]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Self-evaluation Failure】]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Grading Criteria】]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Sprint Contract】]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Planner-Generator-Evaluator 三 Agent 架构]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Handoff Artifact】]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Harness 简化原则】 Harness Simplification]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Context Anxiety】]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[废料怪兽]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-09

## 出场

- Harness Engineering ｜ 《Anthropic 工程实践：如何为长时间运行的 Agent 应用设计 Harness》 ｜ https://www.anthropic.com/engineering/harness-design-long-running-apps
## 反链

- [[废料怪兽]]
- [[Generator-Evaluator Loop】]]
- [[Self-evaluation Failure】]]
- [[Sprint Contract】]]
- [[Context Anxiety】]]
- [[Grading Criteria】]]
- [[Handoff Artifact】]]
- [[Planner-Generator-Evaluator 三 Agent 架构]]
- [[Session Management】]]
- [[Harness 简化原则】 Harness Simplification]]
