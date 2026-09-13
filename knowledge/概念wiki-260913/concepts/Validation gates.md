---
id: cm_91b202fd
name: Validation gates
type: CONCEPTUAL
subject: Context Engineering
domain: verification-eval
learningStage: now
verification: judge
centrality: 0.236
depth: 2
origin: [context]
aliases: []
sources: 1
---

# Validation gates

> 工作流中的检查点：完成一步后须通过测试、审查、人工确认或明示验收条件才能继续。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.236

## 原文 context

Validation gates 是工作流中的检查点。模型完成某一步之后，必须通过测试、审查、人工确认或明确验收条件，才能进入下一步。

## 掌握证据（做到这些才算会）

- 能在流程图上标出各检查点及其通过条件
- 能写出某一步可被机器判定通过的验收条件

## 验收问句

> 你的流程里 {{name}} 设在哪几步，各自靠什么条件放行？

## 先懂这些（前置 1）

- [[Sprint Contract]] · **soft** — 不懂 Sprint Contract，就做不了 Validation gates 的「明示验收条件」设定

## 懂了它才能懂（解锁 3）

- [[PR 级门禁 On every PR]] — 不懂 Validation gates，就做不了 PR 级门禁在每个 PR 上自动跑的「检查点链」
- [[SWE-bench 与二元打分]] — 不懂 Validation gates，就做不了 SWE-bench 的 FAIL_TO_PASS/PASS_TO_PASS 通过失败判定
- [[Harness-level benchmarks]] — 不懂 Validation gates，就做不了 Harness-level benchmarks 的「状态验证检查点」设计

## 相关

- [[instruction following 的可靠性边界]] · related-to（audit） — 门禁是通用检查点机制；B 只是其在 agent 场景中的一种必要性来源，非前置。
- [[Sprint Contract]] · related-to（audit） — 契约是对齐验收标准者，本身不是检查点；是门禁取用契约，而非契约依赖门禁。
- [[Markdown prompt engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-23
- [[Agentic primitives]] · 同篇出现（co-occurrence） — 同篇出现：context-23
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-23

## 出场

- Context Engineering ｜ 《构建可靠 AI 工作流：智能体原语与上下文工程》 ｜ https://github.blog/ai-and-ml/github-copilot/how-to-build-reliable-ai-workflows-with-agentic-primitives-and-context-engineering/
## 反链

- [[SWE-bench 与二元打分]]
- [[Sprint Contract]]
- [[Agentic primitives]]
- [[Harness-level benchmarks]]
- [[PR 级门禁 On every PR]]
- [[instruction following 的可靠性边界]]
- [[Markdown prompt engineering]]
