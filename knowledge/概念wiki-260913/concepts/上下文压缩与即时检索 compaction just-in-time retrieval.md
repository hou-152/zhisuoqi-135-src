---
id: cm_b747de39
name: 上下文压缩与即时检索
nameEn: compaction / just-in-time retrieval
type: PROCEDURAL
subject: Harness Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.072
depth: 1
origin: [harness]
aliases: ["compaction / just-in-time retrieval"]
sources: 1
---

# 上下文压缩与即时检索 · compaction / just-in-time retrieval

> 对抗 context rot 的组合策略：compaction、观察遮蔽、按需 grep/glob、子 agent 只回传摘要。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

把上下文当成随身背包而不是仓库——只带这一段路要用的东西，其余留在原地，需要时再回去取。

## 原文 context

对抗 context rot 的生产策略组合：compaction（保留架构决策与未解决 bug，丢弃冗余工具输出）、observation masking（隐藏旧工具输出、保留工具调用）、just-in-time retrieval（用 grep、glob、head、tail 而非整文件加载）、子 agent 委派（只回传 1000 到 2000 token 摘要）。目标是找到「smallest possible set of high-signal tokens」。

## 掌握证据（做到这些才算会）

- 能列出至少三种策略并说明各自丢什么、留什么
- 能用 grep/head/tail 替代整文件加载

## 验收问句

> 要在最小高信号 token 下跑完任务，这套策略怎么组合？

## 先懂这些（前置 1）

- [[可恢复的压缩 restorable compression]] · **soft** — 不懂【可恢复的压缩】留下的 URL、沙箱路径等锚点，就做不了【上下文压缩与即时检索】中「按需 grep/glob 取回原文」这件事

## 相关

- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12

## 别名

`compaction / just-in-time retrieval`

## 反链

- [[If you're not the model, you're the harness.]]
- [[可恢复的压缩 restorable compression]]
- [[agent 与 harness 的分工]]
