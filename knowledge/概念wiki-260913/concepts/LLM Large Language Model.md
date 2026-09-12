---
id: cm_4cddc093
name: LLM
nameEn: Large Language Model
type: CONCEPTUAL
subject: Context Engineering
domain: model-training
learningStage: now
verification: judge
centrality: 0.126
depth: 0
origin: [context]
aliases: ["Large Language Model"]
sources: 1
---

# LLM · Large Language Model

> 大语言模型，本质上可被还原为一个根据前文做文本补全的模型。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

LLM 的基本能力是根据输入预测接下来最可能的 token；coding agent 的全部高级行为，都是建立在这个补全能力之上的工程编排。

## 原文 context

文章先把 LLM 还原成文本补全模型。

## 掌握证据（做到这些才算会）

- 能用文本补全的视角解释模型的具体行为
- 能指出这种还原解释了哪些能力与局限

## 验收问句

> 把{{name}}还原成文本补全模型，能解释什么？

## 懂了它才能懂（解锁 4）

- [[Agent]] — 模型提供推理与生成，Agent 还需要外部运行系统。
- [[模型蒸馏]] — 蒸馏用强LLM输出教弱模型，不懂LLM就无法理解师生信号传递。
- [[推理模型]] — 推理模型是LLM的一种推理时展开形式，不懂LLM就无base。
- [[押注 in-context learning]] — 押注ICL是押LLM的上下文学习能力，不懂LLM就无法理解该策略。

## 相关

- [[tokens]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[prompt completion]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[multimodal Vision LLMs]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[chat templated prompts]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[stateless]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[cached input tokens]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[reasoning thinking]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[tool loop]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[reasoning effort]] · 常一起用（运行时组成） — 推理强度控制一次模型运行中分配给推理过程的额外计算预算。
- [[工具 Tools]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[系统提示 System Prompt]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[Agent]] · 组成（运行时组成） — 模型提供推理与生成，Agent 还需要外部运行系统。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything

## 别名

`Large Language Model`

## 反链

- [[Agent]]
- [[tokens]]
- [[系统提示 System Prompt]]
- [[stateless]]
- [[推理模型]]
- [[coding agent]]
- [[multimodal Vision LLMs]]
- [[reasoning thinking]]
- [[模型蒸馏]]
- [[cached input tokens]]
- [[prompt completion]]
- [[工具 Tools]]
- [[押注 in-context learning]]
- [[chat templated prompts]]
- [[reasoning effort]]
- [[tool loop]]
