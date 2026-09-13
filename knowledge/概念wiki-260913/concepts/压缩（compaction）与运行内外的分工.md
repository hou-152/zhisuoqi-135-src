---
id: cm_73e12992
name: 压缩（compaction）与运行内外的分工
type: CONCEPTUAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# 压缩（compaction）与运行内外的分工

> 剪枝处理运行内的上下文，压缩处理跨运行的会话累积：token 超阈值就把历史摘要后喂进下一次运行。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

剪枝是这一场会议里少发点材料；压缩是每次开完会写一份纪要，下次带纪要来，而不是把历次材料全搬来。

## 原文 context

与剪枝并列的第二套机制，作用对象是**会话本身**：估算 token 超过阈值时，把对话历史摘要化再喂进下一次运行。作者给出的分工判据很清晰——「剪枝处理运行内的上下文，压缩处理跨运行的累积」。

## 掌握证据（做到这些才算会）

- 能明确区分剪枝与压缩各自的作用对象
- 能设定一个 token 阈值并说明摘要后如何续接

## 验收问句

> 跨运行累积的历史该用剪枝还是压缩，依据{{name}}怎么判？

## 懂了它才能懂（解锁 2）

- [[预算警告与溢出恢复]] — 溢出恢复即触发强制压缩消息并重试，前提是懂压缩。
- [[Context Reset vs Compaction]] — 不懂【压缩（compaction）与运行内外的分工】，就做不了【Context Reset vs Compaction】里对「压缩」一端的定义与对比

## 相关

- [[Context-window tax]] · rejected（audit） — 压缩是 Context-window tax 触发的下游响应；理解固定内容占用窗口不必须懂压缩。
- [[harness 与 framework 的分野]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[持久化执行 durable execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-03

## 出场

- Harness Engineering ｜ 《你的 agent 需要的是 harness，不是又一个框架》 ｜ https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework
## 反链

- [[持久化执行 durable execution]]
- [[Context Reset vs Compaction]]
- [[Context-window tax]]
- [[harness 与 framework 的分野]]
- [[预算警告与溢出恢复]]
