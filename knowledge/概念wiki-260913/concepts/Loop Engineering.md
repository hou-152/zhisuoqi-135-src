---
id: cm_20bf8a66
name: Loop Engineering
type: PROCEDURAL
subject: Context Engineering × Harness Engineering
domain: loop-autonomy
learningStage: now
verification: use
centrality: 0.237
depth: 1
origin: [context, harness]
aliases: []
sources: 5
---

# Loop Engineering

> 从单次提示转向自动循环的工作方式：设计目标、触发、执行、验证、失败处理与反馈机制。

**领域** loop-autonomy ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.237

## 费曼一下

以前是你一句一句指挥 AI 干活，现在是你先搭好一条自动流水线，让 AI 按规则自己跑、自己检查、自己修。你从操作员变成了流水线设计师。

## 原文 context

文章把 Loop Engineering 放在 Prompt、Context、Harness 之后，指向一种从单次提示转向自动循环的 Agent 工作方式。它的核心不是“写一句更好的 prompt”，而是设计目标、触发、执行、验证、失败处理和反馈机制，让 Agent 持续运转。

## 掌握证据（做到这些才算会）

- 能画出 plan→execute→observe→improve 的循环图
- 能为一个任务定义触发条件、终止条件与失败回退策略

## 验收问句

> 为这个任务设计一个 {{name}} 循环，终止条件是什么？

## 先懂这些（前置 2）

- [[自动循环的心跳]] · **hard** — 设计自动循环必须先有定时或事件触发这个心跳。
- [[闭环]] · **hard** — 循环工程的核心就是让执行、反馈与修正首尾相接的闭环。

## 懂了它才能懂（解锁 4）

- [[Loop Engineer]] — Loop Engineer 这一角色由循环工程的方法来定义。
- [[Loop Contract]] — Loop Contract 是循环工程落地为可读契约的一种形式。
- [[Learning Loop]] — Learning Loop 把规则写回 skill，是循环工程迭代环节的机制。
- [[Prompt 到 Loop 的跃迁]] — 跃迁的终点就是 Loop Engineering，先懂循环工程才懂这次跃迁。

## 相关

- [[工作树隔离]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[项目知识体系]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[连接器]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[子 Agent 分工]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[可验证目标]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[管理 Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[古德哈特定律]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[Harness 与 Loop 的配合]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[Context discipline]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Decision-maker in the body]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Git-backed state]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Self-verification]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Feedback loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[No-progress detection]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Budget ceiling]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Skill as asset]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Ralph Loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Prompt 到 Loop 的跃迁]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[自动循环的心跳]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[Capability Overhang]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Inner Loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Model as subroutine]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Continuous orchestration loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[递归自我改进 RSI]] · 同篇出现（co-occurrence） — 同篇出现：harness-05
- [[部署系统层]] · 同篇出现（co-occurrence） — 同篇出现：harness-05
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-05

## 出场

- Context Engineering ｜ 《从 Prompt 转向 Loop Engineering 的工作流拐点》 ｜ https://mp.weixin.qq.com/s?\_\_biz=MzIyMzA5NjEyMA%3D%3D&mid=2647683561&idx=1&sn=cb696e11357022c64360c79bf9471f22&poc_token=HNz8L2qjHT7l7D-hSGkoiWTVrXB7ZPRuFeZy6Ptl
- Harness Engineering ｜ 《Lilian Weng：把 harness 工程接到「递归自我改进」这条老线索上》 ｜ https://lilianweng.github.io/posts/2026-07-04-harness/
- Harness Engineering ｜ 《2026 AI 工程五大趋势：从模型能力转向可靠系统》 ｜ https://www.latent.space/p/aiewf26trends
- Harness Engineering ｜ 《一次关于 Loop 的工程争论》 ｜ https://x.com/mvanhorn/status/2063865685558903149/?rw_tt_thread=True
- Harness Engineering ｜ 《从 Prompt 转向 Loop Engineering 的工作流拐点》 ｜ https://mp.weixin.qq.com/s?\_\_biz=MzIyMzA5NjEyMA%3D%3D&mid=2647683561&idx=1&sn=cb696e11357022c64360c79bf9471f22&poc_token=HNz8L2qjHT7l7D-hSGkoiWTVrXB7ZPRuFeZy6Ptl
## 反链

- [[子 Agent 分工]]
- [[Git-backed state]]
- [[可验证目标]]
- [[Self-verification]]
- [[自动循环的心跳]]
- [[Capability Overhang]]
- [[管理 Agent]]
- [[项目知识体系]]
- [[Ralph Loop]]
- [[部署系统层]]
- [[Inner Loop]]
- [[工作树隔离]]
- [[古德哈特定律]]
- [[连接器]]
- [[Harness 与 Loop 的配合]]
- [[Prompt 到 Loop 的跃迁]]
- [[闭环]]
- [[Budget ceiling]]
- [[Context discipline]]
- [[Continuous orchestration loop]]
- [[Decision-maker in the body]]
- [[Feedback loop]]
- [[Learning Loop]]
- [[Loop Contract]]
- [[Loop Engineer]]
- [[No-progress detection]]
- [[Skill as asset]]
- [[递归自我改进 RSI]]
- [[Model as subroutine]]
