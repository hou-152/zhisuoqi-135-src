---
id: cm_c8798fb1
name: 上下文压缩
nameEn: Context Compression / Summarization
type: PROCEDURAL
subject: Context Engineering × Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.216
depth: 1
origin: [context, harness]
aliases: ["Context Compression / Summarization", "compaction"]
sources: 3
---

# 上下文压缩 · Context Compression / Summarization

> 通过摘要或减少携带内容来压缩上下文，但不得以破坏稳定前缀为代价。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.216

## 费曼一下

压缩不是目标，复用才是目标。一个短但每轮都变的摘要，可能比一个稍长但稳定的前缀更贵。

## 原文 context

文章认为“少带上下文”和“摘要压缩”都可能有用，但不能以破坏稳定前缀为代价。

## 掌握证据（做到这些才算会）

- 能在长跑任务中启用压缩并对比分数与输出 token
- 能判断某次压缩是否破坏了稳定前缀

## 验收问句

> 什么时候该用 {{name}}，代价是什么？

## 先懂这些（前置 2）

- [[上下文 context]] · **hard** — 不懂【上下文】，就做不了【上下文压缩】的定义要压缩什么
- [[压缩 Compaction]] · **soft** — 不懂【压缩】，就做不了【上下文压缩】的摘要浓缩机制设计

## 懂了它才能懂（解锁 1）

- [[compaction]] — 不懂【上下文压缩】，就做不了【compaction】的窗口重初始化时摘要保留

## 相关

- [[保留推理 retained reasoning]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[基准测试的捆绑测量性]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[注意力预算 attention budget]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[长上下文窗口]] · 常一起用 — Compaction 在窗口接近上限时蒸馏历史并重建可继续工作的窗口。
- [[长上下文窗口]] · 常一起用 — Compaction 用摘要替代滚动截断，以处理窗口上限并保留早期经验。
- [[长上下文窗口]] · 常一起用 — Compaction 替代滚动截断，使长运行不必一直占用更满的窗口。
- [[Agent = Model + Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-A2

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12
- Context Engineering ｜ 《只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍》 ｜ https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores
- Harness Engineering ｜ 《只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍》 ｜ https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores

## 别名

`Context Compression / Summarization`、`compaction`

## 反链

- [[上下文 context]]
- [[提示词缓存 Prompt Caching]]
- [[注意力预算 attention budget]]
- [[长上下文窗口]]
- [[上下文腐烂 Context Rot]]
- [[缓存断点 Cache Breakpoint]]
- [[压缩 Compaction]]
- [[基准测试的捆绑测量性]]
- [[Agent = Model + Harness]]
- [[compaction]]
- [[稳定前缀 Stable Prefix]]
- [[保留推理 retained reasoning]]
