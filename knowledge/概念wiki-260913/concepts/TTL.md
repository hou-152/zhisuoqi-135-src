---
id: cm_2e332668
name: TTL
type: CONCEPTUAL
subject: Context Engineering
domain: caching-cost
learningStage: when-needed
verification: use
centrality: 0.126
depth: 1
origin: [context]
aliases: []
sources: 1
---

# TTL

> 提示缓存的有效时长，默认 5 分钟、可扩展至 1 小时，决定多轮或中断后能否复用前缀。

**领域** caching-cost ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

TTL 决定缓存能等你多久。连续追问通常 5 分钟够用；中间要让 Agent 工作很久，1 小时更像保险。

## 原文 context

作者区分默认 5 分钟和扩展 1 小时两种缓存生命周期，并用连续追问、Agent 中途工作、半小时后回来继续等例子说明差异。

## 掌握证据（做到这些才算会）

- 能区分两种缓存时长各自适用的交互节奏
- 能判断连续追问与半小时后回来两种情况是否命中缓存

## 验收问句

> 用户半小时后回来接着问，{{name}} 的选择会带来什么差别？

## 先懂这些（前置 1）

- [[提示词缓存（Prompt Caching）]] · **hard** — TTL 是提示缓存的有效期参数，脱离缓存无法理解。

## 懂了它才能懂（解锁 1）

- [[模型一致性与 prompt caching]] — 不懂 TTL，就判断不了中断超时后能否继续沿用原模型与档位

## 相关

- [[稳定前缀 Stable Prefix]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[缓存断点 Cache Breakpoint]] · 同篇出现（co-occurrence） — 同篇出现：context-17
- [[提示词缓存 Prompt Caching]] · 同篇出现（co-occurrence） — 同篇出现：context-17

## 出场

- Context Engineering ｜ 《提示词缓存不是小优化，而是 agent 成本结构的关键变量》 ｜ https://x.com/shachepi/status/2053463461729046817/?rw_tt_thread=True&s=12
## 反链

- [[提示词缓存 Prompt Caching]]
- [[提示词缓存（Prompt Caching）]]
- [[缓存断点 Cache Breakpoint]]
- [[模型一致性与 prompt caching]]
- [[稳定前缀 Stable Prefix]]
