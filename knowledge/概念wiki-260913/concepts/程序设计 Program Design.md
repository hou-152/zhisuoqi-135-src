---
id: cm_2b2a1434
name: 程序设计
nameEn: Program Design
type: PROCEDURAL
subject: Harness Engineering
domain: code-engineering
learningStage: now
verification: use
centrality: 0.017
depth: 0
origin: [harness]
aliases: ["Program Design"]
sources: 1
---

# 程序设计 · Program Design

> 写实现前先下沉到“代码的形状”：类型、方法签名、程序布局与调用栈，用轻量可视化替代 mermaid。

**领域** code-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

这一步是在动工前先把"这个房间会用到几个插座、每个插座接什么设备、线该怎么走"画成图纸——细到足以让工人不用猜，但又不必真的把墙砌起来。

## 原文 context

作者称之为 agentic coding 里"被严重低估"的一步——在写实现之前，从架构再下沉一层到"代码的形状"：类型、方法签名、程序布局、调用栈。他们发现伪代码式的轻量可视化比 mermaid 更好用：调用栈树（可用 diff 语法标注变化）、文件树 diff、关键新函数的类型和方法签名。Dillon Mulroy 的实践（"计划基本就是类型/接口怎么组合、边界在哪，加上调用栈"）印证了这一点。

## 掌握证据（做到这些才算会）

- 能产出含类型、签名、调用栈树的程序设计
- 能说明为何可 diff 的调用栈树比 mermaid 更好用

## 验收问句

> 你能先给出这个功能的 {{name}} 再动手写代码吗？

## 相关

- [[Lights-off 软件工厂]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[软件工厂 Software Factory]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-23

## 出场

- Harness Engineering ｜ 《为什么「软件工厂」会失败：光有 harness 工程还不够》 ｜ https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md

## 别名

`Program Design`

## 反链

- [[软件工厂 Software Factory]]
- [[Lights-off 软件工厂]]
