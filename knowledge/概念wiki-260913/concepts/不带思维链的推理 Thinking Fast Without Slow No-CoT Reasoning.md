---
id: cm_dca45d36
name: 不带思维链的推理
nameEn: Thinking Fast Without Slow / No-CoT Reasoning
type: CONCEPTUAL
subject: AI 内参 260912
domain: safety-governance
learningStage: now
verification: judge
centrality: 0.072
depth: 0
origin: [neican]
aliases: ["Thinking Fast Without Slow / No-CoT Reasoning"]
sources: 1
---

# 不带思维链的推理 · Thinking Fast Without Slow / No-CoT Reasoning

> Astra 无可见思维链时 ECI 仅比 Fable 5.1 完整思考低 4 分，使 CoT 监控失去抓手。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

思维链（CoT）是模型把推理过程写出来的文本，也是目前最重要的监控窗口。Astra 在完全没有可见 CoT 的模式下，ECI 得分只比 Fable 5.1 的完整思考分数低 4 分；Fable 开与不开思考差 35 分，Astra 只差 10 分。也就是说 Astra 的大量推理根本不以可读文本发生——性能差距变小是好事，但"没有 CoT 可监控"直接把安全监控的抓手抽掉了，这是本文最重要的机制性发现之一。

## 原文 context

Astra can do almost as well as Fable, in a mode where CoT monitoring cannot work. Because there is no CoT to monitor.

## 掌握证据（做到这些才算会）

- 能给出 4 分、35 分、10 分这组对比
- 能说明没有 CoT 就没有监控窗口

## 验收问句

> 为什么{{name}}会削弱安全监控？

## 懂了它才能懂（解锁 1）

- [[填充词元推理与监控盲区 Filler-Token Reasoning]] — 不懂【不带思维链的推理】，就做不了【填充词元推理与监控盲区】的「把只塞填充点号的输出判定为无可见思维链下仍可完成连续推理的监控盲区」这件事。

## 出场

- AI 内参 260912 ｜ 《GPT-6-Astra 能做很多雄心勃勃的事情》 ｜ https://thezvi.substack.com/p/gpt-6-astra-can-do-ambitious-things?utm_source=tldrai

## 别名

`Thinking Fast Without Slow / No-CoT Reasoning`

## 反链

- [[填充词元推理与监控盲区 Filler-Token Reasoning]]
