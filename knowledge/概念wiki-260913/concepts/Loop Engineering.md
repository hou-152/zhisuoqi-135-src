---
id: cm_20bf8a66
name: Loop Engineering
type: PROCEDURAL
subject: Context Engineering × Harness Engineering
domain: loop-autonomy
learningStage: now
verification: use
centrality: 0.196
depth: 1
origin: [context, harness]
aliases: []
sources: 5
---

# Loop Engineering

> 从单次提示转向自动循环的工作方式：设计目标、触发、执行、验证、失败处理与反馈机制。

**领域** loop-autonomy ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.196

## 费曼一下

以前是你一句一句指挥 AI 干活，现在是你先搭好一条自动流水线，让 AI 按规则自己跑、自己检查、自己修。你从操作员变成了流水线设计师。

## 原文 context

文章把 Loop Engineering 放在 Prompt、Context、Harness 之后，指向一种从单次提示转向自动循环的 Agent 工作方式。它的核心不是“写一句更好的 prompt”，而是设计目标、触发、执行、验证、失败处理和反馈机制，让 Agent 持续运转。

## 掌握证据（做到这些才算会）

- 能画出 plan→execute→observe→improve 的循环图
- 能为一个任务定义触发条件、终止条件与失败回退策略

## 验收问句

> 为这个任务设计一个 {{name}} 循环，终止条件是什么？

## 先懂这些（前置 1）

- [[闭环]] · **hard** — 循环工程的核心就是让执行、反馈与修正首尾相接的闭环。

## 懂了它才能懂（解锁 1）

- [[Loop Engineer]] — Loop Engineer 这一角色由循环工程的方法来定义。

## 相关

- [[连接器]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[可验证目标]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[Harness 与 Loop 的配合]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[Budget ceiling]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[工作树隔离]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[管理 Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[古德哈特定律]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[Context discipline]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Decision-maker in the body]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Self-verification]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Feedback loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[No-progress detection]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Loop Contract]] · related-to（audit） — Loop Contract 只是循环工程落地的实例之一，不懂循环工程也能读懂一份 README 契约，属例子关系，应降级或移除
- [[Learning Loop]] · related-to（audit） — 写回 skill 是迭代反馈的一种具体机制，可独立理解，属组成/例子关系，不构成前置
- [[项目知识体系]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[Skill as asset]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[子 Agent 分工]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[Ralph Loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Git-backed state]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Prompt 到 Loop 的跃迁]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[Capability Overhang]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Model as subroutine]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Continuous orchestration loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Prompt 到 Loop 的跃迁]] · related-to（audit） — 跃迁的终点是 Loop Engineering，属目标/结果而非前置；甚至可能方向相反（理解跃迁才理解循环工程）
- [[自动循环的心跳]] · 同篇出现（co-occurrence） — 同篇出现：context-07
- [[Inner Loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[自动循环的心跳]] · related-to（audit） — 心跳只是触发的一种实现（尤其定时触发），Loop Engineering 还含事件/模型驱动等触发，缺此概念仍可理解，应降 soft 或踢出。
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

- [[闭环]]
- [[Self-verification]]
- [[可验证目标]]
- [[子 Agent 分工]]
- [[自动循环的心跳]]
- [[递归自我改进 RSI]]
- [[Continuous orchestration loop]]
- [[Feedback loop]]
- [[Git-backed state]]
- [[Loop Contract]]
- [[Loop Engineer]]
- [[Ralph Loop]]
- [[古德哈特定律]]
- [[管理 Agent]]
- [[连接器]]
- [[项目知识体系]]
- [[Harness 与 Loop 的配合]]
- [[Budget ceiling]]
- [[Capability Overhang]]
- [[Decision-maker in the body]]
- [[Inner Loop]]
- [[Learning Loop]]
- [[Model as subroutine]]
- [[No-progress detection]]
- [[Skill as asset]]
- [[工作树隔离]]
- [[Prompt 到 Loop 的跃迁]]
- [[部署系统层]]
- [[Context discipline]]
