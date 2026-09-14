---
id: cm_a76f31d9
name: 线束能力内化
nameEn: Harness Capabilities Shifting Into the Model
type: CONCEPTUAL
subject: AI 内参 260912
domain: harness-runtime
learningStage: now
verification: judge
centrality: 0.126
depth: 2
origin: [neican]
aliases: ["Harness Capabilities Shifting Into the Model"]
sources: 1
---

# 线束能力内化 · Harness Capabilities Shifting Into the Model

> 过去要靠外部线束提供的符号建模能力，正被 Astra 吸收进模型本体。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

线束（harness）是外部给模型搭的脚手架——连续对话、压缩、符号建模工具，过去要靠人精心搭建模型才能发挥。Chollet 观察到 Astra 在 ARC-AGI-3 的每一关当场建立高效的符号世界模型，甚至自创一套游戏专用的速记 DSL，行为效率超过人类基线——这套"外挂"正在被模型吸收进本体。这就是"ARC 不是侥幸"的机制解释：能力从脚手架转移到了模型自己身上。

## 原文 context

Overall, Astra exhibits symbolic modeling behaviors we had previously only seen with sophisticated harnesses -- so harness capabilities are increasingly shifting into the model itself.

## 掌握证据（做到这些才算会）

- 能举例 Astra 在 ARC-AGI-3 当场自建符号世界模型与速记 DSL
- 能解释这为何说明 ARC 成绩不是侥幸

## 验收问句

> {{name}}在 Astra 身上体现为哪个具体行为？

## 先懂这些（前置 2）

- [[开源 Codex 执行线圈 Open-source Codex harness]] · **soft** — 不懂【开源 Codex 执行线圈】暴露出来的线束核心逻辑，就做不了「线束能力内化」中对哪些符号建模能力可被模型本体吸收的界定
- [[长期运行智能体执行框架 Long-running agent execution framework]] · **soft** — 不懂【长期运行智能体执行框架】对上下文、工具、子智能体协调与文件代码环境的持续要求，就做不了「线束能力内化」中判断哪些外部线束职责该由模型本体接管的取舍

## 出场

- AI 内参 260912 ｜ 《GPT-6-Astra 能做很多雄心勃勃的事情》 ｜ https://thezvi.substack.com/p/gpt-6-astra-can-do-ambitious-things?utm_source=tldrai

## 别名

`Harness Capabilities Shifting Into the Model`

## 反链

- [[开源 Codex 执行线圈 Open-source Codex harness]]
- [[长期运行智能体执行框架 Long-running agent execution framework]]
