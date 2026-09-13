---
id: cm_a0ca0f95
name: Skill-as-method-call
type: CONCEPTUAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.236
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# Skill-as-method-call

> skill 像方法调用：同一套流程传入不同参数，产出截然不同的能力。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.236

## 费曼一下

这是 Garry 对 skill files 的核心比喻。Skill 不是固定的 prompt，而是可参数化的“方法”——同一套流程，传入不同的数据集和问题，产出完全不同的能力。这把 skill 从“提示词工程”升级为“软件设计”。

## 原文 context

"A skill file works like a method call. It takes parameters. You invoke it with different arguments. The same procedure produces radically different capabilities depending on what you pass in."

## 掌握证据（做到这些才算会）

- 能用同一 skill 换不同参数跑出两种不同结果
- 能指出 skill 里哪些部分是参数化的输入

## 验收问句

> 同一份 {{name}}，换参数后会得到什么不同结果？

## 先懂这些（前置 2）

- [[Skill]] · **hard** — 得先知道 skill 是什么，才能理解它像方法调用、传参产出不同能力。
- [[Skill]] · **hard** — 方法调用式的参数化，正是靠 frontmatter 声明来承接。

## 懂了它才能懂（解锁 2）

- [[skill-creator 访谈式创建]] — 不懂 skill 是「流程+参数」的可调用形态，就定不出访谈该问出哪些可变参数
- [[Skills Hell]] — 不懂 skill 是可调用的同构单元，就界定不了什么算「数量膨胀」「互相冲突」

## 相关

- [[Skill Files]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[tokens]] · rejected（audit） — 方法调用类比讲的是流程参数化，与 token 粒度无关；不懂 token 也能理解该注入思路。
- [[Thin Harness, Fat Skills]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-24

## 出场

- Harness Engineering ｜ 《Thin Harness, Fat Skills：harness 才是真正的产品》 ｜ https://x.com/garrytan/status/2042925773300908103/
## 反链

- [[Skill]]
- [[skill-creator 访谈式创建]]
- [[Skills Hell]]
- [[Thin Harness, Fat Skills]]
- [[tokens]]
- [[Skill Files]]
