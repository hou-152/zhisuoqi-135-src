---
id: cm_3e69d260
name: Tool call offloading
type: PROCEDURAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Tool call offloading

> 工具输出超阈值 token 时只保留头尾，把完整输出卸载到文件系统，模型按需再读取。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

只把目录和结尾摆在桌上，整本书塞进书架，需要时再去翻。这是「文件系统作为 context 延伸」的最直接用法——信息没有丢，只是从昂贵的近处挪到了便宜的远处。

## 原文 context

针对大段工具输出污染上下文却不提供有效信息的问题。harness 对超过阈值 token 数的输出只保留头部和尾部 token，把完整输出卸载到文件系统，模型需要时再去访问。

## 掌握证据（做到这些才算会）

- 能说出触发卸载的阈值条件与保留头尾的做法
- 能描述模型事后如何从文件系统取回完整输出

## 验收问句

> 大段工具输出撑爆上下文时，{{name}} 具体怎么处理、模型怎么找回细节？

## 先懂这些（前置 2）

- [[tokens]] · **soft** — 卸载由超出 token 阈值触发，不懂 token 计数就无法理解该机制。
- [[U 型性能曲线]] · **soft** — 不懂【U 型性能曲线】，就判断不了工具输出超阈值时该保留头尾哪一段。

## 相关

- [[WebFetch 两阶段总结]] · rejected（audit） — 两者只是同类'压缩后再进上下文'的手法，互为类比/兄弟技术，谁都不是谁的前置。
- [[the dumb zone the smart zone]] · related-to（audit） — 卸载机制（阈值+文件系统+按需读回）本身可独立理解，dumb zone 只是其动机/好处，不是机制前提。
- [[Agent = Model + Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02

## 出场

- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
## 反链

- [[Agent = Model + Harness]]
- [[the dumb zone the smart zone]]
- [[tokens]]
- [[U 型性能曲线]]
- [[WebFetch 两阶段总结]]
