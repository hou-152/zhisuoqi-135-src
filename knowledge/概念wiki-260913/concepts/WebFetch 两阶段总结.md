---
id: cm_bdec85a7
name: WebFetch 两阶段总结
type: PROCEDURAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# WebFetch 两阶段总结

> 大模型产出 tool call 与 prompt，小模型读网页并按 prompt 总结，只把一小段文字回传作上下文。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

别把一整个网页倒进主模型的脑子里。先派一个助理带着问题去读，读完只汇报一段话。上下文是稀缺资源，谁先学会压缩谁就跑得远。

## 原文 context

WebFetch 的参数除 URL 外还有一个 prompt。大号模型生成 tool call 与 prompt，系统把网页与 prompt 交给小模型总结，只把一小段文字传回大号模型作为 context。作者称这个两阶段过程「挺细腻的」，应该比把高噪音的 html 直接给模型效果好。

## 掌握证据（做到这些才算会）

- 能说出两个阶段分别由哪个模型承担
- 能解释为何比把高噪音 html 直接给模型效果好

## 验收问句

> {{name}} 为什么能降低回传给模型的上下文噪音？

## 相关

- [[Tool call offloading]] · rejected（audit） — 两者只是同类'压缩后再进上下文'的手法，互为类比/兄弟技术，谁都不是谁的前置。
- [[tokens]] · related-to（audit） — 只回传一小段是为省 token，属动机层面；两阶段总结的机制不依赖 token 概念即可懂。
- [[对话加确定性缝合]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[反向代理式窥探]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[看对话 log]] · 同篇出现（co-occurrence） — 同篇出现：harness-21

## 出场

- Harness Engineering ｜ 《拆开 Claude Code：一个编码 agent 的 harness 内部长什么样》 ｜ https://xxchan.me/ai/2025/05/06/claude-code.html
## 反链

- [[看对话 log]]
- [[tokens]]
- [[对话加确定性缝合]]
- [[Tool call offloading]]
- [[反向代理式窥探]]
