---
id: cm_70a22373
name: logits 掩码与 context-aware 状态机
type: CONCEPTUAL
subject: Context Engineering
domain: tools-sandbox
learningStage: deep-dive
verification: judge
centrality: 0.072
depth: 1
origin: [context]
aliases: []
sources: 1
---

# logits 掩码与 context-aware 状态机

> 不在迭代中途增删工具，而用上下文感知的状态机在解码时掩码 logits，配合一致动作名前缀约束可选范围。

**领域** tools-sandbox ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

工具都摆在桌上，但这一轮只有某几个抽屉是打开的。桌面没变（缓存还在），可选项却变少了（决策更准了）。给工具起名时留好统一前缀，等于事先把抽屉分好组。

## 原文 context

Manus 对 action space 膨胀的解法。不在迭代中途增删工具，而是用一个上下文感知的状态机管理工具可用性，在解码时对 token logits 做掩码来阻止或强制某些选择；配合 browser\_、shell\_ 这类一致的动作名前缀，无需有状态的 logits processor 就能按状态约束选择范围。

## 掌握证据（做到这些才算会）

- 能解释为何不在迭代中途增删工具
- 能说明动作名前缀如何免去有状态的 logits processor

## 验收问句

> 你会怎么用 {{name}} 控制 Agent 当前可选用的工具？

## 先懂这些（前置 1）

- [[工具定义 Tool Definitions Tool Schema]] · **soft** — 不懂【工具定义】，就做不了【logits 掩码与状态机】的动作名前缀约束——掩码要按定义里的动作名逐位对齐

## 相关

- [[押注 in-context learning]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[与底层模型正交 orthogonal to the underlying models]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-04

## 出场

- Context Engineering ｜ 《Manus 的上下文工程实战：几轮重写换来的一组局部最优》 ｜ https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
## 反链

- [[工具定义 Tool Definitions Tool Schema]]
- [[上下文工程 context engineering]]
- [[押注 in-context learning]]
- [[与底层模型正交 orthogonal to the underlying models]]
