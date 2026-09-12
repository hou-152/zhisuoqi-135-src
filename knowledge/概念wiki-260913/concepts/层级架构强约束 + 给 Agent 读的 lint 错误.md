---
id: cm_73952fe1
name: 层级架构强约束 + 给 Agent 读的 lint 错误
type: PROCEDURAL
subject: Harness Engineering
domain: code-engineering
learningStage: when-needed
verification: use
centrality: 0.072
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# 层级架构强约束 + 给 Agent 读的 lint 错误

> 把 lint 错误从『violation detected』改写成给 Agent 直接可读可改的修复指令，配合层级架构的强约束。

**领域** code-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

OpenAI Frontier 实验里最反直觉的工程细节。Types→Config→Repo→Service→Runtime→UI 单向依赖、由 CI linter 强制；更狠的是 linter 报错本身就是"给 AI 的修复指令"，让 Agent 自己读了就能改。这是把工具链彻底改造成"AI 友好"的范例。

## 原文 context

\-

"普通项目的 lint 错误是『violation detected』，给人看的；OpenAI Frontier 的 lint 错误是『use [logger.info](http://logger.info/)({event: 'name', ...data}) instead of console.log』，给 Agent 看的、可以直接读懂并修复的指令。"

## 掌握证据（做到这些才算会）

- 能写出一条带具体替代写法的 Agent 可读 lint 报错
- 能说明层级约束如何降低 Agent 越界改动

## 验收问句

> 你项目里 {{name}} 的报错，Agent 能据此直接改对吗？

## 先懂这些（前置 1）

- [[Agentic Engineering]] · **soft** — 不懂【Agentic Engineering】就做不了【层级架构强约束 + 给 Agent 读的 lint 错误】的 ⟨给 Agent 读的修复指令设计⟩

## 相关

- [[架构约束的确定性执行]] · related-to（audit） — 确定性执行靠自定义 linter/结构性测试，不依赖特定层级架构或 Agent 可读报错；后者只是辅助，不是硬前置。
- [[AI 工程基础设施 AI engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[确定性工程基础设施 deterministic engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[1.6% vs 98.4%]] · 同篇出现（co-occurrence） — 同篇出现：harness-20

## 出场

- Harness Engineering ｜ 《撕开 Claude Code 真相：让它好用的 98.4%，是工程不是 AI》 ｜ https://mp.weixin.qq.com/s?\_\_biz=MzI3MTA0MTk1MA==&mid=2652696950&idx=2&sn=b8388fc8a9c5f6b51dbdf7e799d7f349
## 反链

- [[Agentic Engineering]]
- [[架构约束的确定性执行]]
- [[1.6% vs 98.4%]]
- [[确定性工程基础设施 deterministic engineering infrastructure]]
- [[AI 工程基础设施 AI engineering infrastructure]]
