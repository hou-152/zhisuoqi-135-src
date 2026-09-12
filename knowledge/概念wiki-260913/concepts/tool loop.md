---
id: cm_45b7faf3
name: tool loop
type: CONCEPTUAL
subject: Context Engineering
domain: loop-autonomy
learningStage: now
verification: judge
centrality: 0.126
depth: 1
origin: [context]
aliases: []
sources: 1
---

# tool loop

> LLM、system prompt 与 tools 组成循环：模型发出工具调用，结果回灌后再继续生成。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

tool loop 是 agent 的心跳：模型决定下一步，harness 执行工具，结果回到模型，模型再决定下一步。

## 原文 context

LLM、system prompt、tools 形成循环。

## 掌握证据（做到这些才算会）

- 能画出循环的四个环节与回流路径
- 能指出循环在什么条件下终止

## 验收问句

> 请描述一轮 {{name}} 从模型输出到结果回灌的完整走向？

## 先懂这些（前置 1）

- [[笨循环 Dumb Loop]] · **soft** — 不懂【笨循环】，就做不了【tool loop】的“反复调用模型形成循环”。

## 懂了它才能懂（解锁 1）

- [[agent 循环]] — 不懂【tool loop】，就做不了【agent 循环】的“执行 tool call 并把结果回灌上下文”。

## 相关

- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[Agent loop]] · related-to（audit） — tool loop 与 agent loop 基本是同一机制，agent loop 定义已自含工具调用与结果回灌，作为独立前置过强，宜降 soft 或合并。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-14

## 出场

- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
## 反链

- [[coding agent]]
- [[Agent loop]]
- [[agent 循环]]
- [[笨循环 Dumb Loop]]
- [[LLM Large Language Model]]
