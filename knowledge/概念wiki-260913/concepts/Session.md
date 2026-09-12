---
id: cm_fcbdc4c2
name: Session
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: now
verification: use
centrality: 0.142
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Session

> 一次有状态的运行：用已建好的 agent 配置与环境拉起沙箱，挂载文件、仓库与认证。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.142

## 费曼一下

配置是剧本，环境是舞台设定，session 就是「今晚这一场」。同一个剧本可以演无数场，每场的道具和记录各自独立。

## 原文 context

三个中心概念之一——一次有状态的运行，使用已创建的 agent 配置与 environment：从模板拉起全新沙箱，挂载单次运行的资源（文件、GitHub 仓库），把认证存进安全 vault。一个 agent 可以有很多 session。

## 掌握证据（做到这些才算会）

- 能说清 agent、environment、session 三者的层级关系
- 能指出一个 session 里挂载了哪些资源与凭证

## 验收问句

> 一个 {{name}} 从模板拉起后挂载了哪些东西？

## 先懂这些（前置 1）

- [[Stateful Runtime Environment (SRE)]] · **hard** — 一次有状态运行需靠 SRE 拉起沙箱并挂载环境，不懂 SRE 无法理解运行基础。

## 懂了它才能懂（解锁 4）

- [[Sessions]] — Sessions 是维持 session 内上下文的持久记忆层，需先懂单次 Session。
- [[Cross-session Work]] — 跨 session 任务由多个 Session 各承担一部分，不懂 Session 无法理解分工。
- [[Sessions]] — 要维持 loop 内工作上下文，必须先有“一次有状态运行”的概念。
- [[snapshotting + rehydration]] — 再水合恢复的是某次 Session 的状态，懂 Session 更清楚恢复对象。

## 相关

- [[agent 模板的声明式持久化]] · 前置（同领域依赖） — 拉起一次 session 要用已声明好的 agent 配置与环境。
- [[Claude Managed Agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[messages API 作为直连网关]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-12

## 出场

- Harness Engineering ｜ 《Anthropic 干脆把 harness 托管了：Claude Managed Agents 的设计取舍》 ｜ https://x.com/rlancemartin/status/2041927992986009773/?s=12
## 反链

- [[Cross-session Work]]
- [[Sessions]]
- [[agent 模板的声明式持久化]]
- [[Claude Managed Agents]]
- [[messages API 作为直连网关]]
- [[Stateful Runtime Environment (SRE)]]
- [[snapshotting + rehydration]]
