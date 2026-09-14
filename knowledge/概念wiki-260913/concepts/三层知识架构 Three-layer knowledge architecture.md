---
id: cm_c32be74a
name: 三层知识架构
nameEn: Three-layer knowledge architecture
type: CONCEPTUAL
subject: AI 内参 260912
domain: memory-retrieval
learningStage: when-needed
verification: judge
centrality: 0.236
depth: 2
origin: [neican]
aliases: ["Three-layer knowledge architecture"]
sources: 1
---

# 三层知识架构 · Three-layer knowledge architecture

> 把经验与知识分开：原始轨迹、持久知识库、带溯源技能三层，经验先沉淀再由知识驱动技能。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.236

## 费曼一下

指将智能体系统切分为 Raw Layer（原始不可变轨迹）、Wiki Layer（结构化持久知识库）、Skills Layer（带溯源的可执行技能）的三层设计。它打破了过去将经验与技能直接绑定的做法，让经验首先被编译为持久知识，再由知识驱动技能生成。

## 原文 context

这套架构的核心是把"经验"和"知识"分开。以前的技能进化方法（EvoSkill、Trace2Skill、SkillOpt）分析完执行轨迹就直接改 Skill，经验用一次就丢。WikiSkill 在中间加了一层持久知识库，让经验先沉淀、再复用。

## 掌握证据（做到这些才算会）

- 能说出 Raw、Wiki、Skills 三层的分工与先后顺序
- 能对比旧方法分析完轨迹直接改 Skill、经验用一次就丢的做法

## 验收问句

> {{name}} 比直接改技能多加了哪一层？

## 先懂这些（前置 4）

- [[原始轨迹层 Raw Layer]] · **hard** — 不懂原始轨迹层，就做不了三层知识架构中把经验沉淀为不可变执行轨迹的第一层。
- [[持久维基层]] · **hard** — 不懂持久维基层，就做不了三层知识架构中把经验提炼为抽象规律、驱动技能的第二层。
- [[技能与记忆的本质区别 Skills vs. Memory]] · **hard** — 不懂技能与记忆的本质区别，就做不了三层知识架构中把带溯源技能层与知识/经验层分开这件事。
- [[推论因果溯源图 Provenance of conclusions]] · **hard** — 不懂推论因果溯源图，就做不了三层知识架构中'带溯源技能'这一层的溯源追问。

## 出场

- AI 内参 260912 ｜ 《谷歌重磅发布WikiSkill，技能可以自己进化了！》 ｜ https://mp.weixin.qq.com/s?__biz=MzIyNjM2MzQyNg%3D%3D&mid=2247725815&idx=1&sn=6dc8d200fbcabc937f0093929522430a&chksm=e96ba0747e94677b08172b24288c71cf370f6673d7918a21578bf83247eea6e9bc037caf398b

## 别名

`Three-layer knowledge architecture`

## 反链

- [[推论因果溯源图 Provenance of conclusions]]
- [[持久维基层]]
- [[原始轨迹层 Raw Layer]]
- [[技能与记忆的本质区别 Skills vs. Memory]]
