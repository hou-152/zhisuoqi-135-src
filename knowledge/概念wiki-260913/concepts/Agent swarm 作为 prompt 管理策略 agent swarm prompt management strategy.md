---
id: cm_1ae08d06
name: Agent swarm 作为 prompt 管理策略
nameEn: agent swarm / prompt management strategy
type: LANGUAGE
subject: AI 内参 260912
domain: multi-agent
learningStage: now
verification: judge
centrality: 0.052
depth: 0
origin: [neican]
aliases: ["agent swarm / prompt management strategy"]
sources: 1
---

# Agent swarm 作为 prompt 管理策略 · agent swarm / prompt management strategy

> 主循环把大步骤拆成小步骤，每步开一个从零开始、只装必要信息的二级循环；本质是 prompt 管理策略。

**领域** multi-agent ｜ **类型** LANGUAGE ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.052

## 费曼一下

本文里的 agent swarm 不是一群有意图的 AI 公民，而是一种工程办法：主循环把大步骤拆成小步骤，每个小步骤开一个从零开始、只装必要信息的二级循环；必要时还能三级、四级。Newport 更新说，HuggingFace 事件里实际可能是几百个独立 prompt loop 同时跑，彼此只有有限甚至没有编排。它解决了提示太长太乱的问题，也解释了为什么 swarm 听起来吓人，实际是 prompt management。

## 原文 context

Ask the LLM to provide a higher-level description of the next step. The primary prompt loop can then create a *secondary* prompt loop to execute only that step.

The result is an “agent swarm,” but it’s probably better described as a prompt management strategy – many focused LLM prompts can provide better results than a single cluttered one.

Details from the METR report imply they *actually* ran many hundreds of independent prompt loops, each doing limited (or potential no) orchestration of secondary prompt loops.

## 掌握证据（做到这些才算会）

- 能描述主循环与二级循环的分工
- 能说明 swarm 中各循环可能只有有限甚至没有编排

## 验收问句

> 用 {{name}} 说明几百个 prompt loop 同时跑意味着什么？

## 出场

- AI 内参 260912 ｜ 《Are We at War with AI Agent “Civilizations”?》 ｜ https://calnewport.com/are-we-at-war-with-ai-agent-civilizations/

## 别名

`agent swarm / prompt management strategy`
