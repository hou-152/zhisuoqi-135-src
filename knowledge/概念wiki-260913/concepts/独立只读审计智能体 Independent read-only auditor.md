---
id: cm_0e719a44
name: 独立只读审计智能体
nameEn: Independent read-only auditor
type: CONCEPTUAL
subject: AI 内参 260912
domain: multi-agent
learningStage: now
verification: use
centrality: 0.126
depth: 2
origin: [neican]
aliases: ["Independent read-only auditor"]
sources: 1
---

# 独立只读审计智能体 · Independent read-only auditor

> 审查者须是独立于实现者的只读副手，不给改码权限，否则它会自圆其说。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

指负责审查和记录决策的智能体，必须是独立于写代码智能体之外的副手。它绝对不能被授予改代码的权限，因为一旦它能自己去修代码，它就会倾向于掩盖漏洞以产出一份看起来完美的虚假绿灯报告。

## 原文 context

Small implementation detail: always make sure the auditor is a separate pass from the implementer (via an independent sub agent), because a model reviewing its own work is primed by its own intent and will rationalize.

## 掌握证据（做到这些才算会）

- 能解释模型审自己代码时为何会按自身意图合理化
- 能设计一个与实现分离、只读且不可改代码的审计子智能体

## 验收问句

> 能否说明{{name}}为何必须独立且只读？

## 先懂这些（前置 1）

- [[子智能体并行委派 Subagent delegation and orchestration]] · **soft** — 不懂【子智能体并行委派】，就做不了【独立只读审计智能体】的⟨把审查交给一个独立副手而非生产者自己兼审⟩——没有把活派给另一个智能体的机制，独立性就落不了地。

## 懂了它才能懂（解锁 1）

- [[分层对抗式研究流水线 Hierarchical adversarial research pipeline]] — 不懂【独立只读审计智能体】，就做不了【分层对抗式研究流水线】的⟨对抗批判与引文核实两步⟩——审查方不独立于产出方、还能顺手改产出，它就会替自己自圆其说。

## 出场

- AI 内参 260912 ｜ 《Building software factories (with no slop)》 ｜ https://x.com/dzhng/status/2090252351533973768/?rw_tt_thread=True

## 别名

`Independent read-only auditor`

## 反链

- [[子智能体并行委派 Subagent delegation and orchestration]]
- [[分层对抗式研究流水线 Hierarchical adversarial research pipeline]]
