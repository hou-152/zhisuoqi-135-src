---
id: cm_51595412
name: 卡住即信号
nameEn: struggle as signal
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: use
centrality: 0.126
depth: 1
origin: [harness]
aliases: ["struggle as signal"]
sources: 1
---

# 卡住即信号 · struggle as signal

> Agent 卡住不是故障而是信号，据此补上缺的工具、护栏与文档，并让它自己写修复。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

这是把 debug 的对象从「这次的输出」换成「产生输出的环境」。人一旦开始接管，改进就停在这一次；把卡点当成环境缺陷来补，下一次同类问题就不再出现。

## 原文 context

OpenAI 团队被作者引用的迭代机制原话：agent 卡住时把它当信号，找出缺什么工具、护栏、文档，喂回代码库，而且修复始终由 Codex 自己写。

## 掌握证据（做到这些才算会）

- 能把一次卡住转译成「缺什么工具／护栏／文档」的具体条目
- 能展示修复代码由 agent 自己提交而非人工代写

## 验收问句

> Agent 卡住时，你按{{name}}补了哪些工具或文档？

## 先懂这些（前置 2）

- [[看对话 log]] · **soft** — 不懂看对话 log，就做不了把「Agent 卡住」识别为信号这件事
- [[让不可见变得可见]] · **soft** — 不懂让不可见变得可见，就做不了把 Agent 卡住这件事暴露出来并据此补工具

## 相关

- [[收敛式失败恢复]] · related-to（audit） — 收敛修正是一种具体做法，不依赖『卡住即信号』这一表述也能理解，最多是启发式相关
- [[无手打代码 no manually typed code at all]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-01

## 出场

- Harness Engineering ｜ 《Martin Fowler 为「harness 工程」站台：Thoughtworks 的一线笔记》 ｜ https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html

## 别名

`struggle as signal`

## 反链

- [[看对话 log]]
- [[让不可见变得可见]]
- [[收敛式失败恢复]]
- [[无手打代码 no manually typed code at all]]
