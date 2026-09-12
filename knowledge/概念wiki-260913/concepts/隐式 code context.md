---
id: cm_d2597b53
name: 隐式 code context
type: CONCEPTUAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.045
depth: 3
origin: [harness]
aliases: []
sources: 1
---

# 隐式 code context

> Agent 在接到指令后自动挑选相关文件进入上下文，却看不到对应的 tool use 记录或本地索引。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

能被 log 看见的，是这个产品愿意让你看见的部分。总有一段逻辑发生在请求发出之前——那往往才是竞品最难抄的地方。

## 原文 context

作者发出指令后，claude code 自动挑了一些文件进入 context，「这个步骤并没有 tool use，也没有额外的模型总结」，\~/.claude 下也没发现代码索引，于是留下「感觉 claude code 还是藏了点东西的」这句悬念。

## 掌握证据（做到这些才算会）

- 能描述 Claude Code 在无 tool use、无额外模型总结的情况下自动纳入文件的观察
- 能指出 ~/.claude 下找不到代码索引，说明机制未公开

## 验收问句

> {{name}}指什么现象，它为什么让人怀疑 Claude Code 藏了东西？

## 先懂这些（前置 1）

- [[注意力之前的注意力 attention before attention]] · **soft** — Agent自动挑文件进上下文，属于注意力之前的筛选环节

## 相关

- [[看对话 log]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[对话加确定性缝合]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[反向代理式窥探]] · 同篇出现（co-occurrence） — 同篇出现：harness-21

## 出场

- Harness Engineering ｜ 《拆开 Claude Code：一个编码 agent 的 harness 内部长什么样》 ｜ https://xxchan.me/ai/2025/05/06/claude-code.html
## 反链

- [[对话加确定性缝合]]
- [[看对话 log]]
- [[注意力之前的注意力 attention before attention]]
- [[反向代理式窥探]]
