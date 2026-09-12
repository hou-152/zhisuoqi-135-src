---
id: cm_29cc1536
name: 嵌入
nameEn: Embedded
type: PROCEDURAL
subject: Context Engineering
domain: harness-runtime
learningStage: when-needed
verification: use
centrality: 0.072
depth: 1
origin: [context]
aliases: ["Embedded"]
sources: 1
---

# 嵌入 · Embedded

> 第二种接入方式：检查作为 skill 产出物的一部分自动触发，不必人工点名。

**领域** harness-runtime ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

把质检直接焊进生产工序里——工人组装完最后一步，顺手就把自检做了，不需要另派一个人在旁边喊「记得检查」。检查和生产变成同一个动作。

## 原文 context

第二种接入方式。检查作为「产出物的那个 skill」的一部分自动触发，不用你开口。最简单就是在产出 skill 的 body 末尾加一行，例如 scaffold-component 生成组件后自动跑 eslint 并在完成前修掉 error。验证方式：在一个全新任务上调用该 skill，看新步骤有没有作为输出的一部分跑出来。

## 掌握证据（做到这些才算会）

- 能在产出型 skill 的 body 末尾加一行，让检查随产出自动运行
- 能在一个全新任务上调用该 skill，验证新步骤作为输出一部分跑出来

## 验收问句

> 怎么验证某个检查是{{name}}而不是手动触发的？

## 先懂这些（前置 1）

- [[Agent Skills】]] · **hard** — 嵌入即作为 skill 产出物的一部分触发，不懂 skill 就无从谈嵌入。

## 懂了它才能懂（解锁 1）

- [[灵活性与自动化的权衡]] — 嵌入式接入的自动程度，是这条权衡坐标上的一个具体点。

## 相关

- [[把重复步骤编码成 Skill]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[skill-creator 访谈式创建]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[验证闭环 verification loop]] · 同篇出现（co-occurrence） — 同篇出现：context-12

## 出场

- Context Engineering ｜ 《用 Skills 在 Claude Code 里搭建验证闭环》 ｜ https://claude.com/blog/building-verification-loops-in-claude-code-with-skills

## 别名

`Embedded`

## 反链

- [[验证闭环 verification loop]]
- [[skill-creator 访谈式创建]]
- [[Agent Skills】]]
- [[把重复步骤编码成 Skill]]
- [[灵活性与自动化的权衡]]
