---
id: cm_55cb0243
name: Codified Context
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.042
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Codified Context

> 把代码库的隐性约定写成教学文档式上下文并入库；某项目达 26000 行，超过部分模块代码。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

把 context 当基础设施来工程化——不是一个大 prompt，而是一套结构化文件网络（架构说明、编码规范、领域知识、决策记录……）。

## 原文 context

一个 Claude Code 项目演化出 26,000 行 codified context——比某些模块的实际代码还多。结果：agent 停止了幻觉。[\*\*CLAUDE.md\*\*](http://claude.md/) **不是配置文件，是教学文档**——最好的写法读起来像给一个已经会写代码但不了解你代码库的高级工程师的 onboarding docs。有效的 agent 规格中，超过一半是 context，不是 instructions。More context architecture, fewer instructions.

## 掌握证据（做到这些才算会）

- 能写出读起来像高级工程师 onboarding 的上下文文档
- 能指出有效规格中过半是 context 而非 instructions

## 验收问句

> {{name}} 与普通指令文件的差别在哪里？

## 先懂这些（前置 1）

- [[仓库即唯一事实来源]] · **hard** — 把隐性约定写成入库文档，前提是承认仓库才是唯一事实来源。

## 相关

- [[Agent Drift]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[Context 四种失败模式 Context Pollution Distraction Confusion Clash]] · 同篇出现（co-occurrence） — 同篇出现：context-25
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-25

## 出场

- Context Engineering ｜ 《上下文工程：AI 时代的核心能力》 ｜ https://x.com/nyk_builderz/status/2031581912071127158/?s=12&rw_tt_thread=True
## 反链

- [[仓库即唯一事实来源]]
- [[Agent Drift]]
- [[Context 四种失败模式 Context Pollution Distraction Confusion Clash]]
