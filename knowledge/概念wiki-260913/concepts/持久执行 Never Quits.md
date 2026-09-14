---
id: cm_35eacf4d
name: 持久执行
nameEn: Never Quits
type: CONCEPTUAL
subject: AI 内参 260912
domain: loop-autonomy
learningStage: now
verification: judge
centrality: 0.126
depth: 0
origin: [neican]
aliases: ["Never Quits"]
sources: 1
---

# 持久执行 · Never Quits

> Astra 会一直跑到做完，而非半途停下等确认，但也偶有偷懒反问的情况。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

前几代模型会做到一半停下来等用户确认，Astra 则"一直跑直到做完"——有用户说这是第一个可以下了几千行代码的订单就信任它完成的模型。但也有反例：它有时会偷懒停下反问"你到底想要什么"，或者只顾往前冲而不汇报。承重在于：持久执行是把"模型很强"变成"项目能做完"的最后一环，同时它偶尔的"quits"是用法上的真实边界。

## 原文 context

It just runs and runs and runs until it gets it done.

## 掌握证据（做到这些才算会）

- 能举出用户敢下几千行代码订单的信任证据
- 能说出它偶尔停下问“你到底想要什么”的反例

## 验收问句

> {{name}}给用法带来什么真实边界？

## 懂了它才能懂（解锁 2）

- [[雄心勃勃的项目 Ambitious Projects]] — 不懂【持久执行】，就做不了【雄心勃勃的项目】的 ⟨让模型自己拿主意持续推进跨多天完成数千行代码⟩
- [[软件工厂全景闭环 Software factory loop]] — 不懂【持久执行】，就做不了【软件工厂全景闭环】的 ⟨驱动切片构建持续进行直到闭环完成⟩

## 出场

- AI 内参 260912 ｜ 《GPT-6-Astra 能做很多雄心勃勃的事情》 ｜ https://thezvi.substack.com/p/gpt-6-astra-can-do-ambitious-things?utm_source=tldrai

## 别名

`Never Quits`

## 反链

- [[软件工厂全景闭环 Software factory loop]]
- [[雄心勃勃的项目 Ambitious Projects]]
