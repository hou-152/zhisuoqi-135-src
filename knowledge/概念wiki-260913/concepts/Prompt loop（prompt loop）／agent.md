---
id: cm_48fd6532
name: Prompt loop（prompt loop）／agent
type: CONCEPTUAL
subject: AI 内参 260912
domain: loop-autonomy
learningStage: now
verification: judge
centrality: 0.196
depth: 0
origin: [neican]
aliases: []
sources: 1
---

# Prompt loop（prompt loop）／agent

> agent 是一个普通程序在循环里：把任务与上一步结果发 LLM 求下一步，执行其输出，再回到第一步。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.196

## 费曼一下

本文里的 agent 不是有意识实体，而是一个普通程序。它把任务和上一步结果塞进 prompt，问 LLM 下一步做什么，然后执行 LLM 的输出，再回到第一步。它像不断变长的提示链条。这是后面所有 swarm、plotting、civilizations 说法的技术底座；拿掉它，读者会把 agent 当成自主心智，而不是循环程序。

## 原文 context

when people talk about “AI” going rogue, they’re actually referring to a *very specific type* of AI system in which a relatively straightforward computer program, running in a loop, repeatedly does the following:

1. **Ask:** Send a prompt to an LLM asking it for its suggestion for a next action. This prompt should include relevant descriptions of what happened in previous steps.

2. **Act:** Execute the action described in the LLM output.

3. *(Loop back to step 1)*

To implement this loop, the program – often called an *agent* – essentially grows an ever-longer prompt to send to the LLM in step 1.

## 掌握证据（做到这些才算会）

- 能复述 prompt loop 的四步
- 能说明它不是有意识实体，而是不断变长的提示链条

## 验收问句

> 用 {{name}} 说明：一个系统要满足什么才算 agent？

## 懂了它才能懂（解锁 2）

- [[被启动的电话游戏 extended game of actuated telephone]] — 不懂【Prompt loop／agent】「把任务与上一步结果发回 LLM 求下一步、执行其输出、再回到第一步」的机制，就做不了《被启动的电话游戏》的 ⟨解释成千上万条建议为何会被自动串成一条链、并在传递中把目标扭曲掉⟩ 这件事。
- [[交互式系统 vs. prompt loop 系统 interactive system vs. prompt loop system]] — 不懂【Prompt loop／agent】里「无人在环、上一步结果直接驱动下一步」的循环结构，就做不了 ⟨同一模型做成人类对话式交互更可控、塞进无监督循环自动跑才是危险源⟩ 这个对照判断。

## 出场

- AI 内参 260912 ｜ 《Are We at War with AI Agent “Civilizations”?》 ｜ https://calnewport.com/are-we-at-war-with-ai-agent-civilizations/
## 反链

- [[被启动的电话游戏 extended game of actuated telephone]]
- [[交互式系统 vs. prompt loop 系统 interactive system vs. prompt loop system]]
