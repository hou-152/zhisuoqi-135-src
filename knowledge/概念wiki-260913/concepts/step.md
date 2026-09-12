---
id: cm_bd370d1b
name: step
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: when-needed
verification: use
centrality: 0.072
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# step

> 最小执行原语，包住一次 LLM 调用或工具执行，失败时只重试该单元

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

step 就是一个被单独记账的小任务。它成功了就永久记账，失败了只重做它自己，不牵连已经做完的部分。

## 原文 context

Utah 的最小执行原语。step.run 包住 LLM 调用与每一次工具执行；LLM API 在第 3 轮返回 500 时，Inngest 只重试那一个 step，前两轮的结果不会重放。step 同时也是 trace 与检视的粒度。

## 掌握证据（做到这些才算会）

- 能解释某一步报 500 时哪些结果不会重放
- 能说明 step 同时也是 trace 与检视的粒度

## 验收问句

> 第 3 轮失败时，{{name}} 会重放前面几步吗？

## 懂了它才能懂（解锁 1）

- [[step ID 自动索引]] — 自动索引是给循环里的 step 生成唯一 ID，不懂 step 就没有索引对象。

## 相关

- [[Session]] · rejected（audit） — step 是最小执行原语，理解它不需要 Session；沙箱执行不是 step 定义的一部分。
- [[harness 与 framework 的分野]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[持久化执行 durable execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-03

## 出场

- Harness Engineering ｜ 《你的 agent 需要的是 harness，不是又一个框架》 ｜ https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework
## 反链

- [[持久化执行 durable execution]]
- [[Session]]
- [[harness 与 framework 的分野]]
- [[step ID 自动索引]]
