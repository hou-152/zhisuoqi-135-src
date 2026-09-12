---
id: cm_345d4b18
name: handoff 交接
type: CONCEPTUAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.092
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# handoff 交接

> worker 完工后写一份单一交接报告，含所做工作、注意事项、偏差、发现与反馈，由系统交给 planner。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.092

## 费曼一下

交接不是交作业，是交情报。做完了什么只是最浅的一层，真正值钱的是"我一路上发现了什么、哪里不对劲、我偏离了哪里"——这些才是让上层重新决策的燃料。

## 原文 context

worker 完成任务后写的**单一**交接报告，由系统提交给下达该任务的 planner。它"contains not just what was done, but important notes, concerns, deviations, findings, thoughts, and feedback"，planner 以 follow-up 消息形式收到。

## 掌握证据（做到这些才算会）

- 能说出交接报告除“做了什么”外还必须包含哪些信息
- 能指出谁接收以及以什么形式接收

## 验收问句

> {{name}} 中 planner 会以什么形式收到哪些内容？

## 先懂这些（前置 1）

- [[Planner–Worker 角色分离]] · **hard** — 交接存在的前提是有人只管规划、有人只管执行

## 懂了它才能懂（解锁 2）

- [[递归 Planner-Worker 架构]] — worker 上交结果靠 handoff，机制不懂则架构无法运转
- [[自收敛与免全局同步]] — 它是 handoff 的系统性后果，不懂交接就无从谈信息上浮

## 相关

- [[自协调与共享协调文件]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[锁竞争与乐观并发控制]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-06

## 出场

- Harness Engineering ｜ 《Cursor 谈「会自动驾驶的代码库」：多 agent 研究 harness 开放预览》 ｜ https://cursor.com/blog/self-driving-codebases
## 反链

- [[Planner–Worker 角色分离]]
- [[递归 Planner-Worker 架构]]
- [[自协调与共享协调文件]]
- [[锁竞争与乐观并发控制]]
- [[自收敛与免全局同步]]
