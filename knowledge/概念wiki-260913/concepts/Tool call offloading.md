---
id: cm_3e69d260
name: Tool call offloading
type: PROCEDURAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.092
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# Tool call offloading

> 工具输出超阈值 token 时只保留头尾，把完整输出卸载到文件系统，模型按需再读取。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.092

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

- [[tokens]] · **hard** — 卸载由超出 token 阈值触发，不懂 token 计数就无法理解该机制。
- [[the dumb zone the smart zone]] · **soft** — 卸载的动机是让主线程不至于掉进笨蛋区。

## 懂了它才能懂（解锁 1）

- [[WebFetch 两阶段总结]] — 都是把大输出压缩后再进上下文的同类做法。

## 相关

- [[Agent = Model + Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02

## 出场

- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[tokens]]
- [[Agent = Model + Harness]]
- [[the dumb zone the smart zone]]
- [[WebFetch 两阶段总结]]
