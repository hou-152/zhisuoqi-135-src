---
id: cm_b2c86d88
name: Tracing
type: CONCEPTUAL
subject: Harness Engineering
domain: verification-eval
learningStage: when-needed
verification: use
centrality: 0.072
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Tracing

> 框架内置的可观测能力：可视化与调试 agent 流程，并用于评估、监控与模型微调。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

agent 的每一步为什么这么走，事后要能回放。tracing 把这些运行轨迹记录下来，先用于排错，再用于评估，最后这些轨迹本身还能变成微调模型的训练材料——同一份数据在三个环节复用。

## 原文 context

built-in tracing that lets you visualize and debug your agentic flows, as well as evaluate them and even fine-tune models for your application；特性清单里补上 monitoring，并接入 OpenAI 的 evaluation、fine-tuning、distillation 工具套件。

## 掌握证据（做到这些才算会）

- 能说出 tracing 面板上要看的几个关键节点
- 能说明 trace 数据如何回流到评估或微调

## 验收问句

> agent 行为诡异时，你如何靠 {{name}} 定位并顺带产出评估数据？

## 懂了它才能懂（解锁 2）

- [[Trace-based evals]] — 轨迹评估建立在 trace 能被采集与回放之上。
- [[Trace 驱动评估]] — 据工具路径与错误判聚焦，前提是 trace 可观测。

## 相关

- [[very few abstractions]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[primitives]] · 同篇出现（co-occurrence） — 同篇出现：harness-08
- [[Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-08

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 官方文档：抽象极少的轻量 agent 框架》 ｜ https://openai.github.io/openai-agents-python/
## 反链

- [[Agent]]
- [[primitives]]
- [[Trace-based evals]]
- [[Trace 驱动评估]]
- [[very few abstractions]]
