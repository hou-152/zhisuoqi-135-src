---
id: cm_ca597dd5
name: Rubric 与 verifier agent
type: PROCEDURAL
subject: Context Engineering
domain: verification-eval
learningStage: when-needed
verification: use
centrality: 0.072
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Rubric 与 verifier agent

> 借动态工作流让 Claude 起 verifier agent，用 rubric 去尝试并验证你在某领域的品味，如什么算好的 API 设计。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

把「什么算好」写成可核对的评分标准，再派一个专门的检查员照单核对。这样品味不再只存在你脑子里，而变成流程里可执行的一环。

## 原文 context

富引用中最特别的一种。Rubric 让 Claude 借 dynamic workflows 起 verifier agent，去尝试并验证你在某个领域的品味，文中的例子是「什么样的 API 设计算好设计」。

## 掌握证据（做到这些才算会）

- 能把一份品味 rubric 交给 verifier agent 去验证
- 能根据 verifier 反馈修正自己的领域品味标准

## 验收问句

> 用 {{name}} 验证你对好 API 设计的判断。

## 先懂这些（前置 1）

- [[Rubric]] · **hard** — 用 rubric 起验证 agent，不懂 rubric 就无从谈这套招式。

## 相关

- [[Read-only Verifier Agent]] · related-to（audit） — rubric verifier agent 定义自足，是 read-only verifier 的一个具体实例；懂一般概念有帮助但非理解前提。
- [[护栏型指令的过期]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[判断力优先 let Claude use judgement]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-21

## 出场

- Context Engineering ｜ 《Claude 5 世代的上下文工程，规则变了》 ｜ https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models
## 反链

- [[Rubric]]
- [[护栏型指令的过期]]
- [[判断力优先 let Claude use judgement]]
- [[Read-only Verifier Agent]]
