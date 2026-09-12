---
id: cm_d4790a0d
name: Context Anxiety
type: CONCEPTUAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Context Anxiety

> 部分模型在接近自认为的上下文上限时，提前给工作收尾的现象。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

模型在长任务中会产生一种「假想性上下文窗口即将耗尽」的幻觉，导致提前收尾、草草了事。这不是真的上下文窗口满了，而是模型自己「以为」要满了。Sonnet 4.5 表现尤为严重，单纯的 compaction 不足以解决，必须用 context reset。

## 原文 context

Some models also exhibit “context anxiety,” in which they begin wrapping up work prematurely as they approach what they believe is their context limit.

## 掌握证据（做到这些才算会）

- 能识别 Agent 提前总结收尾的行为
- 能把它与真正完成任务区分开

## 验收问句

> {{name}} 出现时，Agent 的行为有什么特征？

## 先懂这些（前置 1）

- [[有限的工作记忆 limited working memory]] · **hard** — 不懂【有限的工作记忆】，就做不了【Context Anxiety】的 ⟨接近上限提前收尾的判断⟩

## 相关

- [[Planner-Generator-Evaluator 三 Agent 架构]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Handoff Artifact]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Harness 简化原则 Harness Simplification]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Generator-Evaluator Loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Self-evaluation Failure]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Grading Criteria]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Sprint Contract]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[context rot（上下文腐烂）与 Lost in the Middle]] · related-to（audit） — 提前收尾与中段检索退化是不同现象，属「更好定位」而非不懂就没法懂
- [[Context Reset vs Compaction]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[废料怪兽]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-09

## 出场

- Harness Engineering ｜ 《Anthropic 工程实践：如何为长时间运行的 Agent 应用设计 Harness》 ｜ https://www.anthropic.com/engineering/harness-design-long-running-apps
## 反链

- [[有限的工作记忆 limited working memory]]
- [[Context Reset vs Compaction]]
- [[Grading Criteria]]
- [[Generator-Evaluator Loop]]
- [[Planner-Generator-Evaluator 三 Agent 架构]]
- [[Sprint Contract]]
- [[废料怪兽]]
- [[Handoff Artifact]]
- [[Harness 简化原则 Harness Simplification]]
- [[Self-evaluation Failure]]
- [[context rot（上下文腐烂）与 Lost in the Middle]]
