---
id: cm_8da6f44c
name: 看对话 log
type: PROCEDURAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: use
centrality: 0.067
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# 看对话 log

> 研究一个 AI app 怎么工作，最直接的方式是把它与模型之间的请求与响应截下来逐条读。

**领域** harness-runtime ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.067

## 费曼一下

AI 产品对外是一个界面，对内只是一串发给模型的消息。与其猜它有什么黑科技，不如站在它和模型之间，把信件拆开看一眼——所有秘密都写在信里。

## 原文 context

全文的方法起点。作者说「要研究某个 AI app 怎么工作最好的方式就是看对话 log」，无论是 openai platform 的 request log、Cloudflare AI gateway 的日志，还是自制 HTTP proxy，做的都是同一件事——把 app 与模型之间的对话截下来读。

## 掌握证据（做到这些才算会）

- 能通过 platform log、gateway 日志或自建代理抓到一轮完整对话
- 能从截下的对话里读出该 app 的提示结构与工具调用方式

## 验收问句

> 用{{name}}的方法，说说某个 app 发给模型的请求长什么样。

## 先懂这些（前置 1）

- [[对话加确定性缝合]] · **soft** — 知道应用即对话加缝合，才知道该读哪段 log。

## 懂了它才能懂（解锁 1）

- [[反向代理式窥探]] — 它只是看对话 log 的一种具体手段。

## 相关

- [[大小模型分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[氛围组请求]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[new topic 判定]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[系统 prompt 的体量差]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[TodoWrite 与 TodoRead]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[原生工具与 MCP 外挂]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[本地状态层]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[全文覆盖式编辑]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[apply 模型]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[instruction following 的可靠性边界]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[WebFetch 两阶段总结]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[隐式 code context]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[护城河清单与插件化路线]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[对话加确定性缝合]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[反向代理式窥探]] · 同篇出现（co-occurrence） — 同篇出现：harness-21

## 出场

- Harness Engineering ｜ 《拆开 Claude Code：一个编码 agent 的 harness 内部长什么样》 ｜ https://xxchan.me/ai/2025/05/06/claude-code.html
## 反链

- [[本地状态层]]
- [[大小模型分工]]
- [[对话加确定性缝合]]
- [[护城河清单与插件化路线]]
- [[instruction following 的可靠性边界]]
- [[TodoWrite 与 TodoRead]]
- [[WebFetch 两阶段总结]]
- [[反向代理式窥探]]
- [[氛围组请求]]
- [[全文覆盖式编辑]]
- [[原生工具与 MCP 外挂]]
- [[apply 模型]]
- [[new topic 判定]]
- [[系统 prompt 的体量差]]
- [[隐式 code context]]
