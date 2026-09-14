---
id: cm_484ef122
name: 子智能体编排
nameEn: Multi-Agent Orchestration
type: CONCEPTUAL
subject: AI 内参 260912
domain: multi-agent
learningStage: now
verification: judge
centrality: 0.072
depth: 2
origin: [neican]
aliases: ["Multi-Agent Orchestration"]
sources: 1
---

# 子智能体编排 · Multi-Agent Orchestration

> Astra 被端到端训练做多智能体编排，由主模型拆活给子智能体并行再汇总。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

雄心勃勃的项目往往任务量巨大，单线程对话做不完，要靠一个主模型把活拆给很多子智能体并行干再汇总。多个报告说 Astra 的多智能体强化学习明显更先进、在超大规模项目上发光，甚至有人抱怨它"没被问就自己开了一堆子智能体"。它是"能做雄心勃勃的项目"的执行机制，概念上承重。

## 原文 context

GPT-6 Astra was trained end-to-end for multi-agent orchestration. It’s not documented, for obvious reasons, but it’s clear in practice.

## 掌握证据（做到这些才算会）

- 能说出它会被报告自发开启一堆子智能体
- 能说明编排是完成大项目的执行机制

## 验收问句

> {{name}}为什么是雄心项目能做完的前提？

## 先懂这些（前置 1）

- [[子智能体并行委派 Subagent delegation and orchestration]] · **hard** — 不懂【子智能体并行委派】，就做不了【子智能体编排】的⟨主模型拆活给子智能体并行再汇总⟩——编排要编的就是这套「拆分—并行—汇总」的动作。

## 出场

- AI 内参 260912 ｜ 《GPT-6-Astra 能做很多雄心勃勃的事情》 ｜ https://thezvi.substack.com/p/gpt-6-astra-can-do-ambitious-things?utm_source=tldrai

## 别名

`Multi-Agent Orchestration`

## 反链

- [[子智能体并行委派 Subagent delegation and orchestration]]
