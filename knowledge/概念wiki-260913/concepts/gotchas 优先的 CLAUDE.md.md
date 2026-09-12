---
id: cm_ebeee733
name: gotchas 优先的 CLAUDE.md
type: PROCEDURAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.072
depth: 1
origin: [context]
aliases: []
sources: 1
---

# gotchas 优先的 CLAUDE.md

> CLAUDE.md 写法准则：轻量说明仓库用途，token 主要花在代码库内反直觉的 gotchas 上，不写显而易见的事。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

给新同事的交接文档，不该复述办公室在几楼，而该写"三楼那台打印机要先按两次开关才认纸"。只有意外之处才值得写下来。

## 原文 context

CLAUDE.md 层的具体写法准则。保持轻量、简述 repo 用途，**把大部分 token 花在代码库里的 gotchas 上**（例如类型集中在一个巨型文件里这类反直觉约定），并明确"避免陈述显而易见的东西"——Claude 看文件系统或 repo 就能知道的，不要写。

## 掌握证据（做到这些才算会）

- 能写出一份不含目录结构说明等显而易见内容的 CLAUDE.md
- 能指出某条 CLAUDE.md 内容是否属于 gotcha 并给出理由

## 验收问句

> 给你一份 {{name}}，你会优先把篇幅花在哪类内容上？

## 先懂这些（前置 1）

- [[gotchas 优先原则]] · **soft** — 不懂【gotchas 优先原则】，就做不了【gotchas 优先的 CLAUDE.md】的 ⟨把 token 主要分配给反直觉 gotchas 而不是显而易见的事⟩

## 相关

- [[gotchas 优先原则]] · related-to（audit） — 两个节点描述几乎逐字重合，是同一 token 分配原则与其 CLAUDE.md 实例化，属同层重复而非前置；说「CLAUDE.md 立不住」不成立，建议合并或降为 soft
- [[prompt 与 context 的通用性落差]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[过度约束与松绑 over-constraining unhobbling]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-22

## 出场

- Context Engineering ｜ 《Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%》 ｜ https://x.com/trq212/status/2080710971228918066/?s=12
## 反链

- [[过度约束与松绑 over-constraining unhobbling]]
- [[gotchas 优先原则]]
- [[prompt 与 context 的通用性落差]]
