---
id: cm_fcbdc4c2
name: Session
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: now
verification: use
centrality: 0.236
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Session

> 一次有状态的运行：用已建好的 agent 配置与环境拉起沙箱，挂载文件、仓库与认证。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.236

## 费曼一下

配置是剧本，环境是舞台设定，session 就是「今晚这一场」。同一个剧本可以演无数场，每场的道具和记录各自独立。

## 原文 context

三个中心概念之一——一次有状态的运行，使用已创建的 agent 配置与 environment：从模板拉起全新沙箱，挂载单次运行的资源（文件、GitHub 仓库），把认证存进安全 vault。一个 agent 可以有很多 session。

## 掌握证据（做到这些才算会）

- 能说清 agent、environment、session 三者的层级关系
- 能指出一个 session 里挂载了哪些资源与凭证

## 验收问句

> 一个 {{name}} 从模板拉起后挂载了哪些东西？

## 懂了它才能懂（解锁 4）

- [[Cross-session Work]] — 跨 session 任务由多个 Session 各承担一部分，不懂 Session 无法理解分工。
- [[Shared File System]] — 不懂【Session】就做不了【Shared File System】的『多 session 共用同一文件夹』这件事
- [[Sessions]] — 不懂【Session】就做不了【Sessions】的『在 agent loop 内跨轮携带上下文』这件事
- [[状态子系统与进度持久化]] — 不懂【Session】就做不了【状态子系统与进度持久化】的『让下次会话接着做』这件事

## 相关

- [[snapshotting + rehydration]] · related-to（audit） — 快照/再水合自身描述已说明恢复对象是检查点状态，不懂 Session 的定义也能理解，Session 只是有助于确定恢复的粒度
- [[step]] · rejected（audit） — step 是最小执行原语，理解它不需要 Session；沙箱执行不是 step 定义的一部分。
- [[Stateful Runtime Environment (SRE)]] · related-to（audit） — Session 自身定义已含「有状态运行」，懂了单次运行不必先懂 SRE 这个抽象层；SRE 更像 Session 的上位/同义概念，方向可疑，建议降 soft 或反向。
- [[Sessions]] · related-to（audit） — Session（一次运行）与 Sessions（跨轮持久记忆层）是不同层面的东西，前者定义不了后者，懂单次运行并不能推出记忆层，属命名联想而非定义依赖。
- [[Claude Managed Agents]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[messages API 作为直连网关]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-12

## 出场

- Harness Engineering ｜ 《Anthropic 干脆把 harness 托管了：Claude Managed Agents 的设计取舍》 ｜ https://x.com/rlancemartin/status/2041927992986009773/?s=12
## 反链

- [[状态子系统与进度持久化]]
- [[Claude Managed Agents]]
- [[Cross-session Work]]
- [[Stateful Runtime Environment (SRE)]]
- [[Sessions]]
- [[Shared File System]]
- [[snapshotting + rehydration]]
- [[messages API 作为直连网关]]
- [[step]]
