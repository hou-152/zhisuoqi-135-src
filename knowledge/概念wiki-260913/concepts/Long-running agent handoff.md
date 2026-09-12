---
id: cm_b8e70a87
name: Long-running agent handoff
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: when-needed
verification: use
centrality: 0.142
depth: 4
origin: [harness]
aliases: []
sources: 1
---

# Long-running agent handoff

> 跨上下文窗口、跨阶段维持长任务的交接机制，如 initializer agent、handoff artifact、feature list 与上下文压缩。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.142

## 费曼一下

长任务里的 agent 像接力队。每一棒都要留下清楚的进度、证据、失败和下一步，否则下一棒只能重新摸索。

## 原文 context

Anthropic 的 initializer agents、handoff artifacts、feature lists，以及 OpenHands 的 context condensation，都服务于跨上下文窗口、跨阶段的长任务延续。

## 掌握证据（做到这些才算会）

- 能列出至少两种 handoff 产物的具体形式
- 能说明交接如何避免长任务在窗口边界丢掉进度

## 验收问句

> 长任务跨多个上下文窗口时，{{name}} 靠什么保证进度不丢？

## 先懂这些（前置 5）

- [[Sessions]] · **hard** — 长任务交接靠跨轮持久记忆层维持上下文，不懂 Sessions 无法理解交接载体。
- [[Cross-session Work]] · **hard** — 交接跨上下文窗口，前提是状态能跨 session 保存与恢复。
- [[状态子系统与进度持久化]] · **hard** — 交接靠 feature list 与进度文件判断做到哪、下一步做啥。
- [[Cross-session Work]] · **soft** — 交接机制服务于跨 session 推进长任务，懂该场景让交接目的更清楚。
- [[持久化执行 durable execution]] · **soft** — 长任务要能续跑，依赖可独立重试的持久化 step。

## 相关

- [[Reliability-critical harness primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Context as working memory budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-19

## 出场

- Harness Engineering ｜ 《Harness engineering：把 agent 能力落到工具、约束和循环里》 ｜ https://github.com/walkinglabs/awesome-harness-engineering
## 反链

- [[Harness 工程 Harness Engineering]]
- [[Cross-session Work]]
- [[Sessions]]
- [[状态子系统与进度持久化]]
- [[持久化执行 durable execution]]
- [[Context as working memory budget]]
- [[Reliability-critical harness primitives]]
