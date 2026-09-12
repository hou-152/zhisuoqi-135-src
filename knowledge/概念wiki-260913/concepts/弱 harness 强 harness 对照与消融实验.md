---
id: cm_ecf56dd0
name: 弱 harness / 强 harness 对照与消融实验
type: PROCEDURAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: compute
centrality: 0.072
depth: 3
origin: [harness]
aliases: []
sources: 1
---

# 弱 harness / 强 harness 对照与消融实验

> 每个项目跑两次同样任务：只写提示词（弱 harness）与定好规则（强 harness），再用消融实验看效果变化。

**领域** harness-runtime ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.072

## 费曼一下

想知道某个零件有没有用，最直接的办法是把它拆掉再跑一次。对照与消融把 harness 从一堆看起来很讲究的规范，变成一组可以被度量效果的机制。

## 原文 context

课程的方法论骨架。「每个项目都要做弱 harness / 强 harness 对照」，P01 直接就是「跑两次同样的任务：只写提示词 vs 定好规则」，P06 收在消融实验。它对应的评价立场是：「我们关心的是效果变化，而不是『写了多少说明文档』。」

## 掌握证据（做到这些才算会）

- 能对同一任务分别跑出弱/强 harness 两份结果并对比差异
- 能用消融实验说明某条规则具体贡献了多少效果

## 验收问句

> 用{{name}}设计实验，说明强 harness 带来了什么变化？

## 先懂这些（前置 1）

- [[让不可见变得可见]] · **soft** — 对照与消融靠检查与指标暴露差异，本质是可见性手段。

## 懂了它才能懂（解锁 1）

- [[未来防腐测试 future-proofing test]] — 换更强模型重跑同一对照，是同类实验范式用于验证长期设计。

## 相关

- [[能力鸿沟]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[指令子系统与渐进式展开]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-18

## 出场

- Harness Engineering ｜ 《Harness 工程学习仓库：从原始文献到能跑的 skill》 ｜ https://github.com/walkinglabs/learn-harness-engineering/blob/main/README-CN.md
## 反链

- [[Harness 工程 Harness Engineering]]
- [[让不可见变得可见]]
- [[能力鸿沟]]
- [[未来防腐测试 future-proofing test]]
- [[指令子系统与渐进式展开]]
