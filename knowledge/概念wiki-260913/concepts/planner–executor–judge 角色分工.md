---
id: cm_7cbbd7dc
name: planner–executor–judge 角色分工
type: CONCEPTUAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.126
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# planner–executor–judge 角色分工

> planner 排路径与交付物，executor 作唯一 lead 保证达成并派活，judge 独立判定是否完成。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

把一个人的活拆给"出方案的、盯落地的、验收的"三个角色。好处是终于有人对结果负责了；代价是流程被钉死，前期方案一旦过时，整条流水线要等到下一轮才有机会改。

## 原文 context

第二代设计。planner 排出确切路径与交付物，executor 作为唯一 lead agent 保证计划被完整达成并 spawn 任务给 worker（"provided linear scaling and throughput"），judge 在 executor 结束后独立判断是否完成、是否再跑一轮。

## 掌握证据（做到这些才算会）

- 能说明 executor 唯一 lead 为何带来线性扩展
- 能说明 judge 在 executor 结束后判断什么

## 验收问句

> {{name}} 中谁保证计划被达成，谁判是否再跑一轮？

## 先懂这些（前置 1）

- [[所有权与问责]] · **soft** — 不懂【所有权与问责】，就做不了【planner–executor–judge 角色分工】的 ⟨判据：为何必须把路径、达成、判定拆给不同 owner⟩

## 懂了它才能懂（解锁 1）

- [[模型—角色适配]] — 不懂【planner–executor–judge 角色分工】，就做不了【模型—角色适配】的 ⟨按 planner/executor/judge 的职责差异分别选模型⟩

## 相关

- [[Planner–Worker 角色分离]] · related-to（audit） — planner–executor–judge 是对 planner/worker 的平行演化加一个 judge，可独立理解，非派生性的理解前提，降 soft
- [[自协调与共享协调文件]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[锁竞争与乐观并发控制]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-06

## 出场

- Harness Engineering ｜ 《Cursor 谈「会自动驾驶的代码库」：多 agent 研究 harness 开放预览》 ｜ https://cursor.com/blog/self-driving-codebases
## 反链

- [[Planner–Worker 角色分离]]
- [[所有权与问责]]
- [[自协调与共享协调文件]]
- [[模型—角色适配]]
- [[锁竞争与乐观并发控制]]
