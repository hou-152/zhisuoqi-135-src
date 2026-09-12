---
id: cm_dd0feb2c
name: No-progress detection
type: CONCEPTUAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: now
verification: judge
centrality: 0.072
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# No-progress detection

> 识别 loop 仍在消耗预算却没有推进任务的机制，属于生产 loop 的硬停止条件之一。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

如果 AI 连续几轮都没把事情变好，就应该停下来，而不是继续烧钱假装努力。

## 原文 context

生产 loop 需要 hard stops，其中一个是 no-progress detection。它用于识别 loop 虽然还在消耗预算，但实际上没有推进任务。

## 掌握证据（做到这些才算会）

- 能指出一次 loop 烧钱不推进的具体信号
- 能说明触发后应当硬停而不是继续重试

## 验收问句

> {{name}} 触发时该停还是该继续？

## 先懂这些（前置 1）

- [[范围控制与显式的完成定义]] · **soft** — 不懂【范围控制与显式的完成定义】，就做不了【No-progress detection】的“判断 loop 是否推进任务”。

## 相关

- [[漂移与隧道视野 drift & tunnel vision]] · related-to（audit） — 无进展≠漂移，是相关但不同的退化；检测机制（消耗预算 vs 任务推进）可独立成立
- [[Model as subroutine]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Continuous orchestration loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Loop Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-15

## 出场

- Harness Engineering ｜ 《一次关于 Loop 的工程争论》 ｜ https://x.com/mvanhorn/status/2063865685558903149/?rw_tt_thread=True
## 反链

- [[Loop Engineering]]
- [[漂移与隧道视野 drift & tunnel vision]]
- [[Continuous orchestration loop]]
- [[范围控制与显式的完成定义]]
- [[Model as subroutine]]
