---
id: cm_03a44650
name: integrator 瓶颈
type: CONCEPTUAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# integrator 瓶颈

> 大量 worker 并行时唯一的质量与合并闸口，会因争抢 push、rebase、解冲突、merge 而成为瓶颈。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

为了保证质量设一道总闸门，听起来很负责。但当上游有几百个人时，这道闸门就是全公司最堵的地方——它带来的排队损失远大于它拦下的错误。

## 原文 context

被删掉的一个组件。原本用于全局质量控制、并消除大量 worker 同时 push/rebase/解冲突/merge 的竞争，但"There were hundreds of workers and one gate (i.e. 'red tape') that all work must pass through."，改 prompt 无果后直接移除。

## 掌握证据（做到这些才算会）

- 能指出并行 worker 争抢同一闸口时的冲突点
- 能说明为什么改 prompt 解决不了它

## 验收问句

> {{name}} 为什么最终被直接移除？

## 先懂这些（前置 1）

- [[子 agent 编排 Fork Teammate Worktree]] · **soft** — 不懂【子 agent 编排】，就做不了【integrator 瓶颈】的 ⟨识别大量并行 worker 汇聚到唯一合并闸口⟩

## 懂了它才能懂（解锁 1）

- [[为吞吐量设计与可接受错误率]] — 不懂【integrator 瓶颈】，就做不了【为吞吐量设计与可接受错误率】的 ⟨为何放弃逐次 100% 正确、改留绿色分支收尾⟩

## 相关

- [[自协调与共享协调文件]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[锁竞争与乐观并发控制]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-06

## 出场

- Harness Engineering ｜ 《Cursor 谈「会自动驾驶的代码库」：多 agent 研究 harness 开放预览》 ｜ https://cursor.com/blog/self-driving-codebases
## 反链

- [[Harness]]
- [[子 agent 编排 Fork Teammate Worktree]]
- [[自协调与共享协调文件]]
- [[为吞吐量设计与可接受错误率]]
- [[锁竞争与乐观并发控制]]
