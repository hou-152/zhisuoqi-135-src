---
id: cm_9754bbb2
name: TodoWrite 与 TodoRead
type: REPRESENTATIONAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: now
verification: use
centrality: 0.017
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# TodoWrite 与 TodoRead

> 内置的待办读写工具，prompt 要求高频使用，做完一项立刻标记完成，管理多子任务。

**领域** loop-autonomy ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

给 agent 一张写在外面的清单。模型的注意力会漂移，但清单不会；把「记住要做什么」从脑子里搬到纸上，长任务才不会做着做着散架。

## 原文 context

tools 里内置了 TodoRead/Write，prompt 中要求 VERY frequently 地使用，强调不用它规划就可能忘记重要任务，且做完一项要立刻标记完成。作者称之为「更进阶版的 scratchpad.md」，胜在多个子任务的管理。

## 掌握证据（做到这些才算会）

- 能在多子任务会话中频繁写入并即时标记完成
- 能对比使用前后是否漏掉重要任务

## 验收问句

> {{name}} 该怎么用，做完一项后要做什么？

## 相关

- [[对话加确定性缝合]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[反向代理式窥探]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[看对话 log]] · 同篇出现（co-occurrence） — 同篇出现：harness-21

## 出场

- Harness Engineering ｜ 《拆开 Claude Code：一个编码 agent 的 harness 内部长什么样》 ｜ https://xxchan.me/ai/2025/05/06/claude-code.html
## 反链

- [[看对话 log]]
- [[对话加确定性缝合]]
- [[反向代理式窥探]]
