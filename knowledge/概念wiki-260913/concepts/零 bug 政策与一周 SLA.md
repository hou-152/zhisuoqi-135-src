---
id: cm_26923d16
name: 零 bug 政策与一周 SLA
type: PROCEDURAL
subject: Context Engineering
domain: code-engineering
learningStage: when-needed
verification: use
centrality: 0.067
depth: 1
origin: [context]
aliases: []
sources: 1
---

# 零 bug 政策与一周 SLA

> 所有 bug 进统一 triage 并在一周 SLA 内修完，coding agent 先修、工程师复核。

**领域** code-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.067

## 费曼一下

把“修 bug”从一件靠人排队、容易拖延的苦差，变成一条有硬期限、有机器先跑一遍的流水线。agent 负责脏活累活的第一版，人只做最后的质量把关。当修复的启动成本被压到接近零，“留着 bug”就从“没空”变成了一个明摆着的选择题——而他们选择不留。

## 原文 context

Linear 的内部质量制度，也是它把 agent 用在刀刃上的样板。所有 bug 进一个 team triage，一周 SLA 内必须修完；如今 coding agent 能先做第一遍修复，再 @ 工程师复核，工程师能直接在 Linear 里改代码、review 代码。Karri 由此说“现在你为什么还会有 bug？没有借口了”——它最终是一个“在乎质量还是只要产出”的选择。

## 掌握证据（做到这些才算会）

- 能复述 bug 从进 triage 到修复的 SLA 流程
- 能说明 agent 首修与工程师复核的分工方式

## 验收问句

> {{name}} 对 bug 修复的时间要求是什么？

## 先懂这些（前置 1）

- [[Autofixing]] · **soft** — SLA 下低风险修复可自动提交 PR，减少人工排队。

## 懂了它才能懂（解锁 1）

- [[根因优先]] — 一周 SLA 要求先定位根因再修，否则反复出错占满 triage。

## 相关

- [[代理原生 agent-native]] · 同篇出现（co-occurrence） — 同篇出现：context-10
- [[上下文骨架]] · 同篇出现（co-occurrence） — 同篇出现：context-10
- [[“SaaS 已死”叙事与护城河蒸发]] · 同篇出现（co-occurrence） — 同篇出现：context-10

## 出场

- Context Engineering ｜ 《SaaS 没死，Linear 正把上下文变成 Agent 的骨架》 ｜ https://app.podwise.ai/dashboard/episodes/7673574
## 反链

- [[代理原生 agent-native]]
- [[“SaaS 已死”叙事与护城河蒸发]]
- [[根因优先]]
- [[上下文骨架]]
- [[Autofixing]]
