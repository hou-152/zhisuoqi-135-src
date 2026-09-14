---
id: cm_fde7ba65
name: 外层改进者技能
nameEn: Outer / Improver skill
type: CONCEPTUAL
subject: AI 内参 260912
domain: loop-autonomy
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 3
origin: [neican]
aliases: ["Outer / Improver skill"]
sources: 1
---

# 外层改进者技能 · Outer / Improver skill

> 按周期运行、比对人类反馈并向内层基础技能提出最小改进补丁的元智能体

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

指一个独立于日常任务、按周期定时运行的元智能体（Meta-Agent）。它不直接给用户干活，而是收集过去一段时间内内层技能的执行记录与人类批评，做差异对比后，向内层基础技能提出最小粒度的改进补丁。

## 原文 context

The outer/improver skill functions as an observer agent that runs on a schedule rather than per-task. It pulls the accumulated human feedback, compares what the agent suggested against how humans responded, and proposes a small, focused edit to the base skill.

## 掌握证据（做到这些才算会）

- 能区分外层技能与内层技能各自的触发时机
- 能说出它的输入是累积的人类反馈与执行记录

## 验收问句

> {{name}} 与日常执行任务的内层技能，在运行节奏上有何不同？

## 先懂这些（前置 1）

- [[软件工厂全景闭环 Software factory loop]] · **soft** — 不懂【软件工厂全景闭环】，就做不了【外层改进者技能】的 ⟨向内层基础技能提出最小改进补丁⟩

## 出场

- AI 内参 260912 ｜ 《https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude》 ｜ https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude

## 别名

`Outer / Improver skill`

## 反链

- [[软件工厂全景闭环 Software factory loop]]
