---
id: cm_f6f6390f
name: Trace 驱动评估
type: PROCEDURAL
subject: Context Engineering
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Trace 驱动评估

> benchmark 同时记录工具路径、输出量、错误和搜索方向，据此判断 agent 是否聚焦证据。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

不仅看学生最后答对几题，也看他每一步怎么算。过程记录让你知道分数变化到底来自能力提升，还是偶然猜中。

## 原文 context

benchmark 同时记录工具路径、输出量、错误和搜索方向。团队据此判断 agent 是否聚焦证据，而不只比较最终 score。

## 掌握证据（做到这些才算会）

- 能列出轨迹里除最终得分外还要记录的四类信息
- 能据轨迹判断一次失败是方向错误还是执行错误

## 验收问句

> 只看最终 score 不够，{{name}} 还要看哪些轨迹信息？

## 先懂这些（前置 1）

- [[Tracing]] · **hard** — 据工具路径与错误判聚焦，前提是 trace 可观测。

## 懂了它才能懂（解锁 1）

- [[Trace-based evals]] — 不懂【Trace 驱动评估】，就做不了【Trace-based evals】的 ⟨用轨迹而非最终答案衡量 skill 或 harness 的改动⟩

## 相关

- [[共享 harness]] · 同篇出现（co-occurrence） — 同篇出现：context-A1
- [[工具—工作流适配]] · 同篇出现（co-occurrence） — 同篇出现：context-A1
- [[浏览循环]] · 同篇出现（co-occurrence） — 同篇出现：context-A1

## 出场

- Context Engineering ｜ 《工具更多反而让 Copilot 代码审查变差，GitHub 如何修正》 ｜ https://github.blog/ai-and-ml/github-copilot/better-tools-made-copilot-code-review-worse-heres-how-we-actually-improved-it/
## 反链

- [[Tracing]]
- [[共享 harness]]
- [[Trace-based evals]]
- [[工具—工作流适配]]
- [[浏览循环]]
