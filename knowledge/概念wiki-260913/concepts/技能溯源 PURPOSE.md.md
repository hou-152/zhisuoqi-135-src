---
id: cm_e22503f1
name: 技能溯源
nameEn: PURPOSE.md
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: spec-intent
learningStage: when-needed
verification: use
centrality: 0.072
depth: 0
origin: [neican]
aliases: ["PURPOSE.md"]
sources: 1
---

# 技能溯源 · PURPOSE.md

> 每个技能除 SKILL.md 外标配 PURPOSE.md，记录它为解决 Wiki 中哪条失败模式而存在。

**领域** spec-intent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

每个技能除了包含实际执行指令的 SKILL.md 外，还标配一个 PURPOSE.md，专门记录该技能是为了解决 Wiki 中的哪条具体失败模式而建立的。它为后续修改提供了因果上下文，防止盲目打补丁导致历史意图丢失。

## 原文 context

PURPOSE.md 解决的是"这个技能为什么存在"的问题。当技能需要修改时，Proposer 可以通过 PURPOSE.md 回溯到对应的知识模式，理解当初的设计意图，而不是盲目地打补丁。

## 掌握证据（做到这些才算会）

- 能指出 PURPOSE.md 与 SKILL.md 各自的职责分工
- 能说明改技能前先查 PURPOSE.md 可回溯设计意图、避免盲目打补丁

## 验收问句

> {{name}} 回答的是哪个问题，它怎样防止改技能时丢失当初的设计意图？

## 懂了它才能懂（解锁 1）

- [[写原则而非写死规则 Write principles, not rules]] — 不懂【技能溯源】就做不了【写原则而非写死规则】里的「决定这个技能该给哪几条判据、哪部分留给模型自行推理」——判据的来源正是 PURPOSE.md 记下的那条失败模式，没有它就只能退回去穷举规则。

## 出场

- AI 内参 260912 ｜ 《谷歌重磅发布WikiSkill，技能可以自己进化了！》 ｜ https://mp.weixin.qq.com/s?__biz=MzIyNjM2MzQyNg%3D%3D&mid=2247725815&idx=1&sn=6dc8d200fbcabc937f0093929522430a&chksm=e96ba0747e94677b08172b24288c71cf370f6673d7918a21578bf83247eea6e9bc037caf398b

## 别名

`PURPOSE.md`

## 反链

- [[写原则而非写死规则 Write principles, not rules]]
