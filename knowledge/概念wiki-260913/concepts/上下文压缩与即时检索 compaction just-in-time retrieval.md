---
id: cm_b747de39
name: 上下文压缩与即时检索
nameEn: compaction / just-in-time retrieval
type: PROCEDURAL
subject: Harness Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.045
depth: 2
origin: [harness]
aliases: ["compaction / just-in-time retrieval"]
sources: 1
---

# 上下文压缩与即时检索 · compaction / just-in-time retrieval

> 对抗上下文腐坏的生产策略：压缩、屏蔽旧工具输出、按需检索、子agent摘要，只留高信号token。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

把上下文当成随身背包而不是仓库——只带这一段路要用的东西，其余留在原地，需要时再回去取。

## 原文 context

对抗 context rot 的生产策略组合：compaction（保留架构决策与未解决 bug，丢弃冗余工具输出）、observation masking（隐藏旧工具输出、保留工具调用）、just-in-time retrieval（用 grep、glob、head、tail 而非整文件加载）、子 agent 委派（只回传 1000 到 2000 token 摘要）。目标是找到「smallest possible set of high-signal tokens」。

## 掌握证据（做到这些才算会）

- 能说出compaction、observation masking、just-in-time retrieval各自保留与丢弃什么
- 能为一次长任务写出包含四种手段的上下文预算方案

## 验收问句

> 你会用哪些手段落实{{name}}以压低token占用？

## 先懂这些（前置 1）

- [[上下文占用率与性能衰减]] · **hard** — 压缩与按需检索就是为对抗窗口越满越易衰减，不懂衰减就不懂其动机

## 相关

- [[agent 与 harness 的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[If you're not the model, you're the harness.]] · 同篇出现（co-occurrence） — 同篇出现：harness-28
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-28

## 出场

- Harness Engineering ｜ 《一个被 harness 套住的 LLM agent：这个词到底指什么》 ｜ https://x.com/akshay_pachaar/status/2045510648474530263/?s=12

## 别名

`compaction / just-in-time retrieval`

## 反链

- [[agent 与 harness 的分工]]
- [[上下文占用率与性能衰减]]
- [[If you're not the model, you're the harness.]]
