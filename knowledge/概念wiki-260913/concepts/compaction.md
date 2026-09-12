---
id: cm_6a2b80d9
name: compaction
type: PROCEDURAL
subject: Context Engineering × Harness Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.089
depth: 2
origin: [context, harness]
aliases: []
sources: 2
---

# compaction

> 上下文接近窗口上限时，把对话摘要后重新初始化新窗口，保留关键决策与未解决 bug。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.089

## 费曼一下

会开到一半白板写满了，就把结论和未决事项誊到新白板上，其余擦掉重来。难的不是誊写，是判断哪条「现在看着没用、过会儿才发现关键」——擦得太狠，代价往往过很久才浮现。

## 原文 context

长时程任务的第一根杠杆——把接近窗口上限的对话摘要后，用摘要重新初始化新窗口。Claude Code 的实现保留架构决策、未解决的 bug、实现细节，丢弃冗余工具输出，并带上最近访问的五个文件。调优路径是先最大化召回率再提升精确率；最轻的形式是清理已调用过的工具结果。

## 掌握证据（做到这些才算会）

- 能说出压缩会保留与丢弃哪些内容
- 能说明没有压缩时超出窗口会发生什么

## 验收问句

> {{name}} 触发后，哪些内容必须被带进新窗口？

## 先懂这些（前置 1）

- [[上下文压缩 Context Compression Summarization]] · **soft** — 不懂【上下文压缩】，就做不了【compaction】的窗口重初始化时摘要保留

## 出场

- Context Engineering ｜ 《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》 ｜ https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
## 反链

- [[上下文压缩 Context Compression Summarization]]
