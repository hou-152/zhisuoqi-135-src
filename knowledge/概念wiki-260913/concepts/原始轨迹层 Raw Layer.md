---
id: cm_0192e485
name: 原始轨迹层
nameEn: Raw Layer
type: CONCEPTUAL
subject: AI 内参 260912
domain: memory-retrieval
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 0
origin: [neican]
aliases: ["Raw Layer"]
sources: 1
---

# 原始轨迹层 · Raw Layer

> 存储每次迭代的执行轨迹：完整推理、工具调用与输出结果，不可变，保留到底发生了什么。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

指记录智能体每次尝试中每一步思考、工具调用与环境返回结果的底层存储。它的关键特征是只读不可变，保证后续分析失败模式和理解设计意图时，始终有一份未经污染的第一现场事实依据。

## 原文 context

Raw Layer 存储每次迭代的执行轨迹，包括 Agent 的完整推理过程、工具调用、输出结果。这一层不可变，目的是保留"到底发生了什么"的原始记录。

## 掌握证据（做到这些才算会）

- 能列出该层记录推理过程、工具调用与输出结果
- 能说明不可变是为了让失败模式分析与设计意图回溯始终有第一现场依据

## 验收问句

> {{name}} 为什么必须保持不可变？

## 懂了它才能懂（解锁 2）

- [[三层知识架构 Three-layer knowledge architecture]] — 不懂原始轨迹层，就做不了三层知识架构中把经验沉淀为不可变执行轨迹的第一层。
- [[持久维基层]] — 不懂原始轨迹层，就做不了持久维基层从具体成败轨迹中提炼抽象规律这件事。

## 出场

- AI 内参 260912 ｜ 《谷歌重磅发布WikiSkill，技能可以自己进化了！》 ｜ https://mp.weixin.qq.com/s?__biz=MzIyNjM2MzQyNg%3D%3D&mid=2247725815&idx=1&sn=6dc8d200fbcabc937f0093929522430a&chksm=e96ba0747e94677b08172b24288c71cf370f6673d7918a21578bf83247eea6e9bc037caf398b

## 别名

`Raw Layer`

## 反链

- [[三层知识架构 Three-layer knowledge architecture]]
- [[持久维基层]]
