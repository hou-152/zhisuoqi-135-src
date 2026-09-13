---
id: cm_88d4edc1
name: Context window 与 prompt 杂乱
nameEn: cluttered prompt / maximum allowable context window
type: CONCEPTUAL
subject: AI 内参 260912
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.017
depth: 0
origin: [neican]
aliases: ["cluttered prompt / maximum allowable context window"]
sources: 1
---

# Context window 与 prompt 杂乱 · cluttered prompt / maximum allowable context window

> 长时间跑 prompt loop 会让提示越来越杂乱冗长，干扰注意力机制，甚至超出最大上下文窗口。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

长时间跑 prompt loop，提示会越来越挤、越来越长；这既会干扰 LLM 的注意力，也可能超过它能接受的最大上下文窗口。它是 swarm 产生的技术原因：不是因为 AI 想繁殖，而是因为单个提示装不下、太乱。

## 原文 context

The issue with this approach is that if you run this style of *prompt loop* for a long time, the prompt will eventually become so cluttered and cumbersome that it might confuse the LLM’s attention mechanisms and potentially exceed the maximum allowable context window.

## 掌握证据（做到这些才算会）

- 能说出提示杂乱带来的两类后果
- 能说明它是 agent swarm 出现的技术原因

## 验收问句

> 按 {{name}}，为什么单个 prompt 会装不下整个任务？

## 出场

- AI 内参 260912 ｜ 《Are We at War with AI Agent “Civilizations”?》 ｜ https://calnewport.com/are-we-at-war-with-ai-agent-civilizations/

## 别名

`cluttered prompt / maximum allowable context window`
