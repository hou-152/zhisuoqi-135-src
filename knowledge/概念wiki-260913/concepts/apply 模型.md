---
id: cm_1725c0a2
name: apply 模型
type: REPRESENTATIONAL
subject: Harness Engineering
domain: code-engineering
learningStage: when-needed
verification: judge
centrality: 0.045
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# apply 模型

> Cursor 自训的专用 LLM，负责把编辑落到文件上，材料对其成功率存疑。

**领域** code-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

把「改文件」做成一个专用小模型，是上一代产品的护城河设想。一旦大模型本身足够听话、算力足够便宜，这条护城河就可能被一个更笨的办法抹平。

## 原文 context

cursor 自己训练了一个 LLM 专门做 apply edit，log 里的 edit_file 工具就是在调用它。但在总结部分作者对它的价值存疑：「因为最近一段时间感觉失败率甚至有点高」。

## 掌握证据（做到这些才算会）

- 能指出 log 中的 edit_file 工具调用的就是它
- 能复述作者对其失败率偏高的质疑

## 验收问句

> {{name}} 在 Cursor 编辑流程里做什么，有何争议？

## 懂了它才能懂（解锁 1）

- [[全文覆盖式编辑]] — 全文覆盖是为绕过 apply 模型落编辑的困难，不懂 apply 模型就不懂其动机。

## 相关

- [[看对话 log]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[对话加确定性缝合]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[反向代理式窥探]] · 同篇出现（co-occurrence） — 同篇出现：harness-21

## 出场

- Harness Engineering ｜ 《拆开 Claude Code：一个编码 agent 的 harness 内部长什么样》 ｜ https://xxchan.me/ai/2025/05/06/claude-code.html
## 反链

- [[对话加确定性缝合]]
- [[看对话 log]]
- [[反向代理式窥探]]
- [[全文覆盖式编辑]]
