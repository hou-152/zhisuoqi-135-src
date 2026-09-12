---
id: cm_da4daeff
name: Context Bloat
type: CONCEPTUAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.042
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Context Bloat

> 把每个怪癖、模式与经验都塞进 CLAUDE.md（如两万行），导致模型注意力退化。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

Context bloat 是向模型的上下文窗口塞入过多信息，导致注意力退化、性能下降。Thin harness 架构的一个核心目标就是最小化 context bloat——通过 resolver 按需加载，而非把所有知识放进上下文。

## 原文 context

"My [CLAUDE.md](http://claude.md/) was 20,000 lines. Every quirk, every pattern, every lesson I'd ever encountered. Completely ridiculous. The model's attention degraded."

## 掌握证据（做到这些才算会）

- 能指出哪些内容属于膨胀
- 能说明膨胀如何导致注意力下降

## 验收问句

> {{name}} 发生后最直接的征兆是什么？

## 先懂这些（前置 1）

- [[加法本能陷阱与过度约束]] · **soft** — 无脑往 CLAUDE.md 堆内容正是加法本能的产物，两者根因相同。

## 相关

- [[Skill Files]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[Thin Harness, Fat Skills]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-24

## 出场

- Harness Engineering ｜ 《Thin Harness, Fat Skills：harness 才是真正的产品》 ｜ https://x.com/garrytan/status/2042925773300908103/
## 反链

- [[加法本能陷阱与过度约束]]
- [[Skill Files]]
- [[Thin Harness, Fat Skills]]
