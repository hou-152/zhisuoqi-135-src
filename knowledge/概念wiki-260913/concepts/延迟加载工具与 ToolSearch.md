---
id: cm_6bd125f5
name: 延迟加载工具与 ToolSearch
type: CONCEPTUAL
subject: Context Engineering
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.042
depth: 2
origin: [context]
aliases: []
sources: 1
---

# 延迟加载工具与 ToolSearch

> 渐进式披露在工具层的具体形态：agent 必须先用 ToolSearch 搜索到完整定义才能调用该工具。

**领域** tools-sandbox ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.042

## 费曼一下

工具箱里放五十把工具，但只有你伸手去找的那一把才拿出来摊开。工具变多不等于工作台变乱。

## 原文 context

渐进式披露在工具层的具体形态。部分工具是 "deferred loading"，agent 必须先用 ToolSearch 搜索到完整定义才能调用。作者说明了收益：这让团队可以挂载更多工具（例如 Task 类工具），而它们**在被需要之前不占用上下文**。

## 掌握证据（做到这些才算会）

- 能复述 ToolSearch 与 deferred loading 的先后关系
- 能为自己的工具集判断哪些该延迟加载

## 验收问句

> {{name}} 让团队挂载更多工具的原因是什么？

## 先懂这些（前置 1）

- [[工具收窄 tool scoping]] · **hard** — 渐进式披露本质是另一种收窄手段，不懂最小工具集就理解不了它要解决什么。

## 相关

- [[prompt 与 context 的通用性落差]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[过度约束与松绑 over-constraining unhobbling]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-22

## 出场

- Context Engineering ｜ 《Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%》 ｜ https://x.com/trq212/status/2080710971228918066/?s=12
## 反链

- [[上下文工程 context engineering]]
- [[工具收窄 tool scoping]]
- [[过度约束与松绑 over-constraining unhobbling]]
- [[prompt 与 context 的通用性落差]]
