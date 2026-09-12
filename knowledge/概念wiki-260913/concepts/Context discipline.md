---
id: cm_33d0987a
name: Context discipline
type: CONCEPTUAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.045
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Context discipline

> 用固定 anchor files 与稳定任务边界约束每轮迭代的上下文，不让对话无限膨胀。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

AI 很容易被长聊天搞糊涂。上下文纪律就是每轮只给它该看的材料，让它少带旧噪音上路。

## 原文 context

作者认为 ralph 的创新在于上下文纪律，而不是循环本身。固定 anchor files 避免对话无限膨胀，让每次迭代回到稳定的任务边界。

## 掌握证据（做到这些才算会）

- 能设计一组每轮复用的 anchor files
- 能说明它与无限累积对话的区别

## 验收问句

> {{name}} 靠什么机制让每轮迭代不膨胀？

## 先懂这些（前置 1）

- [[context rot（上下文腐烂）与 Lost in the Middle]] · **soft** — 用锚文件与稳定边界，正是为对抗长上下文注意力退化

## 相关

- [[Model as subroutine]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Continuous orchestration loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-15
- [[Loop Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-15

## 出场

- Harness Engineering ｜ 《一次关于 Loop 的工程争论》 ｜ https://x.com/mvanhorn/status/2063865685558903149/?rw_tt_thread=True
## 反链

- [[Loop Engineering]]
- [[context rot（上下文腐烂）与 Lost in the Middle]]
- [[Continuous orchestration loop]]
- [[Model as subroutine]]
