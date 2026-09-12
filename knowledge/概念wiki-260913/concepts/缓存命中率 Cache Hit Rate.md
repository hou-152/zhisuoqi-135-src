---
id: cm_c684222f
name: 缓存命中率
nameEn: Cache Hit Rate
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: now
verification: use
centrality: 0.181
depth: 2
origin: [context]
aliases: ["Cache Hit Rate"]
sources: 1
---

# 缓存命中率 · Cache Hit Rate

> 把缓存命中率当作运行状态指标，监控 cache_read_input_tokens、cache_creation_input_tokens、首字延迟及版本上线后的变化。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.181

## 费曼一下

缓存命中率是系统健康度仪表盘。它能告诉你问题是没开缓存、没过门槛、断点错误，还是前缀被动态内容打碎了。

## 原文 context

作者建议把缓存命中率视为运行状态指标，并监控 cache_read_input_tokens、cache_creation_input_tokens、首字延迟和版本上线后的变化。

## 掌握证据（做到这些才算会）

- 能列出该监控需要看的两三个字段
- 能说明上线版本后该指标的变化意味着什么

## 验收问句

> 能否为线上服务搭一套 {{name}} 的监控口径？

## 先懂这些（前置 2）

- [[KV-cache 命中率]] · **soft** — 不懂KV-cache命中率，就做不了缓存命中率的指标口径（命中率本质是前缀相同比率）。
- [[API-boundary observability]] · **soft** — 不懂API-boundary observability，就做不了缓存命中率的准确采集（拿到usage计量块）。

## 懂了它才能懂（解锁 1）

- [[提示词缓存 Prompt Caching]] — 不懂缓存命中率，就做不了提示词缓存的效果评估（命中多少、是否值得）。

## 相关

- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12

## 别名

`Cache Hit Rate`

## 反链

- [[提示词缓存 Prompt Caching]]
- [[缓存断点 Cache Breakpoint]]
- [[KV-cache 命中率]]
- [[稳定前缀 Stable Prefix]]
- [[API-boundary observability]]
