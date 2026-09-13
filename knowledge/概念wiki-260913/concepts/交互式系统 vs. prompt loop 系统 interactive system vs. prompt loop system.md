---
id: cm_5c63e329
name: 交互式系统 vs. prompt loop 系统
nameEn: interactive system vs. prompt loop system
type: CONCEPTUAL
subject: AI 内参 260912
domain: loop-autonomy
learningStage: now
verification: judge
centrality: 0.126
depth: 1
origin: [neican]
aliases: ["interactive system vs. prompt loop system"]
sources: 1
---

# 交互式系统 vs. prompt loop 系统 · interactive system vs. prompt loop system

> 同一模型做成人类对话式交互更可控，塞进无监督 prompt loop 自动跑才是危险源。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

同一个模型可以做成人类对话式交互系统，也可以塞进 prompt loop 自动跑。本文认为前者更可预测、更可控，后者才是危险源。这个对照是为什么非要跑这些实验的硬边界：不是模型不能用来做网络安全，而是不应把模型接上无监督循环自动执行。

## 原文 context

When it comes to the specific goal of improving cybersecurity, for example, an interactive system, in which a human user interacts conversationally with a model trained on hacking, makes much, much more sense than connecting that same model to a prompt loop and letting it rock n’ roll.

## 掌握证据（做到这些才算会）

- 能用网络安全例子对比两种用法
- 能指出分界在部署方式而非模型本身

## 验收问句

> {{name}} 的对照说明风险来自模型还是接法？

## 先懂这些（前置 1）

- [[Prompt loop（prompt loop）／agent]] · **hard** — 不懂【Prompt loop／agent】里「无人在环、上一步结果直接驱动下一步」的循环结构，就做不了 ⟨同一模型做成人类对话式交互更可控、塞进无监督循环自动跑才是危险源⟩ 这个对照判断。

## 懂了它才能懂（解锁 1）

- [[被启动的电话游戏 extended game of actuated telephone]] — 不懂【交互式系统 vs. prompt loop 系统】把危险归结为「无监督自动串联」而不是模型本身，就做不了《被启动的电话游戏》的 ⟨失控归因：判断扭曲来自循环方式而非单次模型能力⟩。

## 出场

- AI 内参 260912 ｜ 《Are We at War with AI Agent “Civilizations”?》 ｜ https://calnewport.com/are-we-at-war-with-ai-agent-civilizations/

## 别名

`interactive system vs. prompt loop system`

## 反链

- [[Prompt loop（prompt loop）／agent]]
- [[被启动的电话游戏 extended game of actuated telephone]]
