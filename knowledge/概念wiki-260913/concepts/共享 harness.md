---
id: cm_519accd8
name: 共享 harness
type: CONCEPTUAL
subject: Context Engineering
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 2
origin: [context]
aliases: []
sources: 1
---

# 共享 harness

> 多个产品共用同一套 harness 代码与工具实现，减少重复并让改进跨产品传播。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

harness 是多个 agent 共用的工具底盘。底盘可以统一维护，但不同车辆仍需要不同驾驶规则。

## 原文 context

Copilot CLI harness 的代码探索工具被 cloud agent 等多个产品使用。GitHub 希望用统一实现减少重复，并让工具改进跨产品传播。

## 掌握证据（做到这些才算会）

- 能指出 Copilot CLI 的代码探索工具被 cloud agent 等产品复用
- 能说出统一实现的收益是减少重复、工具改进自动扩散

## 验收问句

> {{name}} 的收益是什么，能举哪个例子？

## 先懂这些（前置 2）

- [[Harness]] · **hard** — 共享的对象就是 harness，不懂它无从谈复用。
- [[Harness 工程 Harness Engineering]] · **soft** — 不懂【Harness 工程】，就做不了 ⟨把同一套 harness 代码与工具给多产品复用⟩

## 相关

- [[最小充分上下文]] · 同篇出现（co-occurrence） — 同篇出现：context-A1
- [[先收窄、后读取]] · 同篇出现（co-occurrence） — 同篇出现：context-A1
- [[工具调用批处理]] · 同篇出现（co-occurrence） — 同篇出现：context-A1
- [[Trace 驱动评估]] · 同篇出现（co-occurrence） — 同篇出现：context-A1
- [[任务特定工具说明]] · 同篇出现（co-occurrence） — 同篇出现：context-A1
- [[收敛式失败恢复]] · 同篇出现（co-occurrence） — 同篇出现：context-A1
- [[工具—工作流适配]] · 同篇出现（co-occurrence） — 同篇出现：context-A1
- [[浏览循环]] · 同篇出现（co-occurrence） — 同篇出现：context-A1

## 出场

- Context Engineering ｜ 《工具更多反而让 Copilot 代码审查变差，GitHub 如何修正》 ｜ https://github.blog/ai-and-ml/github-copilot/better-tools-made-copilot-code-review-worse-heres-how-we-actually-improved-it/
## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[最小充分上下文]]
- [[Trace 驱动评估]]
- [[工具—工作流适配]]
- [[工具调用批处理]]
- [[任务特定工具说明]]
- [[收敛式失败恢复]]
- [[浏览循环]]
- [[先收窄、后读取]]
