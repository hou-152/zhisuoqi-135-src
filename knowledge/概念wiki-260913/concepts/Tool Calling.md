---
id: cm_51de352d
name: Tool Calling
type: CONCEPTUAL
subject: Context Engineering
domain: tools-sandbox
learningStage: now
verification: use
centrality: 0.29
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Tool Calling

> 模型通过工具调用来对外行动，工具可用 bash、skills、代码执行等原语构造。

**领域** tools-sandbox ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.29

## 费曼一下

Claude 与外部世界交互的唯一方式。模型不能直接操作环境，而是通过“调用工具”这个标准接口来行动。bash、code execution、skills 都是不同类型的工具原语。

## 原文 context

Claude acts through Tool Calling, but there are a number of ways tools can be constructed in the Claude API with primitives like bash, skills and recently code execution.

## 掌握证据（做到这些才算会）

- 能说明模型本身不执行动作、而是发出工具调用
- 能列举至少两种构造工具的原语

## 验收问句

> 要让模型真正动手改文件，{{name}} 在其中扮演什么角色？

## 先懂这些（前置 1）

- [[Sandbox]] · **soft** — 不懂【Sandbox】就做不了【Tool Calling】里代码执行原语的安全隔离构造

## 懂了它才能懂（解锁 4）

- [[工具调用批处理]] — 批处理是对工具调用节奏的编排优化，先懂单次工具调用才谈得上批量。
- [[MCP server tool calling]] — 不懂【Tool Calling】就做不了【MCP server tool calling】的模型调用循环
- [[Function tools]] — 不懂【Tool Calling】就做不了【Function tools】的 schema 生成与调用注册
- [[沙箱化自主]] — 不懂【Tool Calling】就做不了【沙箱化自主】里 agent 的对外自主行动

## 相关

- [[Action Space]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[See Like an Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Elicitation]] · 同篇出现（co-occurrence） — 同篇出现：context-15

## 出场

- Context Engineering ｜ 《构建 Claude Code 的经验教训：如何让 Agent「看见」世界》 ｜ https://x.com/trq212/status/2027463795355095314
## 反链

- [[Sandbox]]
- [[沙箱化自主]]
- [[Action Space]]
- [[Elicitation]]
- [[Function tools]]
- [[MCP server tool calling]]
- [[工具调用批处理]]
- [[See Like an Agent]]
