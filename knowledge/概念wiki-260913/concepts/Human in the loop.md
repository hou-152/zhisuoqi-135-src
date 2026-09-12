---
id: cm_5103a6a6
name: Human in the loop
type: CONCEPTUAL
subject: Harness Engineering
domain: safety-governance
learningStage: now
verification: use
centrality: 0.236
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Human in the loop

> 在 Agent 运行过程中引入人类参与的机制，与 Guardrails、Tracing 并列构成控制面能力。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.236

## 费曼一下

不是所有决定都该让 agent 自己拍板。人在环中是框架预留的插入点，让人在运行过程中确认、修正或叫停，而不是只能在事后看结果。

## 原文 context

Built-in mechanisms for involving humans across agent runs，与 Guardrails、Tracing 并列为控制面能力。

## 掌握证据（做到这些才算会）

- 能指出可以在哪几个环节插入人工介入
- 能说明它与 Guardrails、Tracing 各自的分工

## 验收问句

> {{name}} 在控制面里承担什么角色？

## 先懂这些（前置 1）

- [[意图的延伸]] · **soft** — 不懂 Human in the loop，就说明不了意图被外包后责任该锚回哪个环节

## 懂了它才能懂（解锁 3）

- [[YOLO 模式 Allow All]] — 不懂 Human in the loop，就定义不了 YOLO 模式到底关掉的是哪一层许可
- [[审批疲劳]] — 不懂 Human in the loop 的逐条许可请求，就说不清审批疲劳是怎么被人训练出来的
- [[Onboarding Agent]] — 不懂 Human in the loop，就做不了 Onboarding Agent 里『记录行为、审计理由』那一环

## 相关

- [[Guardrails]] · rejected（audit） — 理由明说是「并列构成控制面」，并列关系不是依赖；Human in the loop 的机制（运行中引入人类）无需先懂 Guardrails。
- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[Guardrails]]
- [[primitives]]
- [[Agent]]
- [[Onboarding Agent]]
- [[审批疲劳]]
- [[意图的延伸]]
- [[YOLO 模式 Allow All]]
- [[very few abstractions]]
