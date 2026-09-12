---
id: cm_14dace51
name: Rubrics 与验证 agent
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

# Rubrics 与验证 agent

> 同类招式的另一种形态：带 rubric 启动验证 agent，反过来测试并校准你在某领域的品味判断。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

你把自己的评分标准写下来交给对方，他就能自己给自己打分，而不必每件事都来问你满不满意。品味一旦被写成可检查的条目，就能被复制和自动执行。

## 原文 context

引用的另一种形态，也是全文里最"元"的一招。Rubric 让 Claude 借助 dynamic workflows、启动带该 rubric 的 verifier agent，去**尝试验证你在某个领域的品味**——作者举的例子是"什么才算好的 API 设计"。

## 掌握证据（做到这些才算会）

- 能区分 rubric 驱动生成与 rubric 驱动验证两种用法
- 能举出一个用验证 agent 校准品味的实例

## 验收问句

> {{name}} 里验证 agent 到底在验证谁的标准？

## 先懂这些（前置 1）

- [[Rubric]] · **hard** — 带 rubric 启动验证 agent，前提是先有明确评分标准。

## 相关

- [[Read-only Verifier Agent]] · related-to（audit） — A 只需一般验证 agent；B 是执行侧只读 verifier 的具体实现，不是理解 A 的必需前提。
- [[prompt 与 context 的通用性落差]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[过度约束与松绑 over-constraining unhobbling]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-22

## 出场

- Context Engineering ｜ 《Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%》 ｜ https://x.com/trq212/status/2080710971228918066/?s=12
## 反链

- [[Rubric]]
- [[过度约束与松绑 over-constraining unhobbling]]
- [[prompt 与 context 的通用性落差]]
- [[Read-only Verifier Agent]]
