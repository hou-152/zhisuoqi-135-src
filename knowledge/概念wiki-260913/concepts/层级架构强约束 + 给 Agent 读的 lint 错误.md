---
id: cm_73952fe1
name: 层级架构强约束 + 给 Agent 读的 lint 错误
type: PROCEDURAL
subject: Harness Engineering
domain: code-engineering
learningStage: when-needed
verification: use
centrality: 0.045
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# 层级架构强约束 + 给 Agent 读的 lint 错误

> 用层级架构做强约束，并把 lint 错误写成给 Agent 直接读懂、可直接修复的指令，而非 violation detected。

**领域** code-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

OpenAI Frontier 实验里最反直觉的工程细节。Types→Config→Repo→Service→Runtime→UI 单向依赖、由 CI linter 强制；更狠的是 linter 报错本身就是"给 AI 的修复指令"，让 Agent 自己读了就能改。这是把工具链彻底改造成"AI 友好"的范例。

## 原文 context

\-

"普通项目的 lint 错误是『violation detected』，给人看的；OpenAI Frontier 的 lint 错误是『use [logger.info](http://logger.info/)({event: 'name', ...data}) instead of console.log』，给 Agent 看的、可以直接读懂并修复的指令。"

## 掌握证据（做到这些才算会）

- 能对比给人看与给 Agent 看的 lint 错误写法
- 能为自己的项目写出一条可直接照做的 lint 指令

## 验收问句

> 把一条 lint 错误改写成 {{name}} 的形式，你会怎么写？

## 懂了它才能懂（解锁 1）

- [[架构约束的确定性执行]] — 确定性执行靠分层架构与可读 lint 错误强制，不懂后者无从执行。

## 相关

- [[AI 工程基础设施】 AI engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[1.6% vs 98.4%]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[确定性工程基础设施】 deterministic engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20

## 出场

- Harness Engineering ｜ 《撕开 Claude Code 真相：让它好用的 98.4%，是工程不是 AI》 ｜ https://mp.weixin.qq.com/s?\_\_biz=MzI3MTA0MTk1MA==&mid=2652696950&idx=2&sn=b8388fc8a9c5f6b51dbdf7e799d7f349
## 反链

- [[确定性工程基础设施】 deterministic engineering infrastructure]]
- [[AI 工程基础设施】 AI engineering infrastructure]]
- [[1.6% vs 98.4%]]
- [[架构约束的确定性执行]]
