---
id: cm_b8e70a87
name: Long-running agent handoff
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: when-needed
verification: use
centrality: 0.236
depth: 3
origin: [harness]
aliases: []
sources: 1
---

# Long-running agent handoff

> 跨上下文窗口、跨阶段维持长任务的交接机制，如 initializer agent、handoff artifact、feature list 与上下文压缩。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.236

## 费曼一下

长任务里的 agent 像接力队。每一棒都要留下清楚的进度、证据、失败和下一步，否则下一棒只能重新摸索。

## 原文 context

Anthropic 的 initializer agents、handoff artifacts、feature lists，以及 OpenHands 的 context condensation，都服务于跨上下文窗口、跨阶段的长任务延续。

## 掌握证据（做到这些才算会）

- 能列出至少两种 handoff 产物的具体形式
- 能说明交接如何避免长任务在窗口边界丢掉进度

## 验收问句

> 长任务跨多个上下文窗口时，{{name}} 靠什么保证进度不丢？

## 先懂这些（前置 4）

- [[Sessions]] · **soft** — 长任务交接靠跨轮持久记忆层维持上下文，不懂 Sessions 无法理解交接载体。
- [[Cross-session Work]] · **soft** — 交接机制服务于跨 session 推进长任务，懂该场景让交接目的更清楚。
- [[状态子系统与进度持久化]] · **soft** — 不懂【状态子系统与进度持久化】就做不了【Long-running agent handoff】的『handoff artifact 与 feature list 这类交接构件』这件事
- [[文件系统即持久记忆]] · **soft** — 不懂【文件系统即持久记忆】就做不了【Long-running agent handoff】的『把 handoff artifact 落盘供后续阶段读取』这件事

## 相关

- [[Reliability-critical harness primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Context as working memory budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-19

## 出场

- Harness Engineering ｜ 《Harness engineering：把 agent 能力落到工具、约束和循环里》 ｜ https://github.com/walkinglabs/awesome-harness-engineering
## 反链

- [[Harness 工程 Harness Engineering]]
- [[状态子系统与进度持久化]]
- [[文件系统即持久记忆]]
- [[Cross-session Work]]
- [[Context as working memory budget]]
- [[Sessions]]
- [[Reliability-critical harness primitives]]
