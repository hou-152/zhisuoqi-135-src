---
id: cm_19d82c87
name: 过度约束与松绑
nameEn: over-constraining / unhobbling
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [context]
aliases: ["over-constraining / unhobbling"]
sources: 1
---

# 过度约束与松绑 · over-constraining / unhobbling

> 在系统提示词、CLAUDE.md 与 skills 里过度约束模型，松绑后提示可大幅精简。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

给新手司机装的限速器、防撞杆，等他成了老司机还不拆，反而妨碍他正常开车。unhobbling 就是"拆掉已经不需要的辅助装置"。

## 原文 context

作者对自家实践的诊断结论：团队"在系统提示词、CLAUDE.md 文件和 skills 里都过度约束了 Claude Code"。松绑的直接战果是：面向 Claude Opus 5、Claude Fable 5 这代模型，Claude Code 系统提示词删掉 80% 以上，编码评测无可测量损失。

## 掌握证据（做到这些才算会）

- 能说出 Claude Code 系统提示词删掉 80% 以上、编码评测无可测量损失
- 能指出过度约束出现在哪三类载体

## 验收问句

> {{name}} 的松绑带来了什么可测量结果？

## 相关

- [[冲突指令的隐性成本]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[护栏与判断力的取舍 guardrail tradeoff]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[从禁止什么到对齐什么]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[示例会收窄探索空间]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[接口即指令 design interfaces]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[延迟加载工具与 ToolSearch]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[指令就近原则]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[Rubrics 与验证 agent]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[gotchas 优先的 CLAUDE.md]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[上下文文件树 tree of files]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[自动记忆 auto-memory]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[富引用 rich references]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[prompt 与 context 的通用性落差]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[渐进式披露 progressive disclosure]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-22

## 出场

- Context Engineering ｜ 《Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%》 ｜ https://x.com/trq212/status/2080710971228918066/?s=12

## 别名

`over-constraining / unhobbling`

## 反链

- [[渐进式披露 progressive disclosure]]
- [[接口即指令 design interfaces]]
- [[Rubrics 与验证 agent]]
- [[冲突指令的隐性成本]]
- [[从禁止什么到对齐什么]]
- [[示例会收窄探索空间]]
- [[延迟加载工具与 ToolSearch]]
- [[指令就近原则]]
- [[gotchas 优先的 CLAUDE.md]]
- [[富引用 rich references]]
- [[上下文文件树 tree of files]]
- [[自动记忆 auto-memory]]
- [[护栏与判断力的取舍 guardrail tradeoff]]
- [[prompt 与 context 的通用性落差]]
