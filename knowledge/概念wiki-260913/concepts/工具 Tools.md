---
id: cm_a72ef18d
name: 工具
nameEn: Tools
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: tools-sandbox
learningStage: now
verification: use
centrality: 0.27
depth: 1
origin: [context, harness]
aliases: ["Tools"]
sources: 3
---

# 工具 · Tools

> Agent 的『双手』：它得以对外部世界施加动作的调用能力。

**领域** tools-sandbox ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.27

## 费曼一下

工具是模型触达外部世界的手。Harness 把工具用名称、描述和参数结构暴露给模型，并负责校验、执行、捕获结果和返回观察。

## 原文 context

“Agent 的‘双手’”

## 掌握证据（做到这些才算会）

- 能为一个 Agent 列出它必须具备的工具清单
- 能说明每个工具的输入输出与失败模式

## 验收问句

> 这个 Agent 需要哪些 {{name}}，缺了哪个就跑不动？

## 先懂这些（前置 1）

- [[工具定义 Tool Definitions Tool Schema]] · **soft** — 不懂【工具定义】，就做不了【工具】的任何一次调用——模型没有名称与参数 schema 就无从生成合法调用

## 懂了它才能懂（解锁 3）

- [[工具即契约 tools as the contract]] — 不懂【工具】，就做不了【工具即契约】的⟨把工具定义成自包含、健壮、用途清晰的函数式接口⟩
- [[工具即结构化输出]] — 不懂【工具】，就做不了【工具即结构化输出】的⟨说明 LLM 输出 json、由确定性代码执行这一分工⟩
- [[shell tool]] — 不懂【工具】，就做不了【shell tool】的⟨把执行能力包装成模型可调用的具名工具⟩

## 相关

- [[coding agent]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[LLM Large Language Model]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[非模型架构 Non-model Architecture]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-13

## 出场

- Context Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
- Harness Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922

## 别名

`Tools`

## 反链

- [[工具定义 Tool Definitions Tool Schema]]
- [[coding agent]]
- [[shell tool]]
- [[非模型架构 Non-model Architecture]]
- [[AI Agent]]
- [[工具即契约 tools as the contract]]
- [[LLM Large Language Model]]
- [[工具即结构化输出]]
