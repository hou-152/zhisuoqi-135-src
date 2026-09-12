---
id: cm_2ad4f942
name: 两级上下文剪枝
nameEn: pruning
type: PROCEDURAL
subject: Harness Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [harness]
aliases: ["pruning"]
sources: 1
---

# 两级上下文剪枝 · pruning

> 上下文过长时的配置化修法：留最近 3 轮助手回合，旧工具结果超 4000 字符软裁首尾，总量超 50000 硬清留占位。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

桌上文件太多就看不见重点。于是规定：最近三份原样保留，久的只留首尾两页，实在太多就整摞收走贴个「已归档」的条子。

## 原文 context

作者称「上下文管理才是真正的难题」，症状是 agent loop「无休止地调用工具却始终产不出回复」。修法是配置化的两级剪枝：保留最近 3 轮助手回合；旧工具结果超过 4000 字符时软裁为头 1500 + 尾 1500；总量超过 50000 时硬清并留占位符。

## 掌握证据（做到这些才算会）

- 能说出软裁与硬清各自的触发阈值
- 能识别 loop 反复调工具却无回复是上下文问题

## 验收问句

> 按 {{name}} 的规则，工具结果和总上下文各在什么阈值被处理？

## 相关

- [[harness 与 framework 的分野]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[持久化执行 durable execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-03

## 出场

- Harness Engineering ｜ 《你的 agent 需要的是 harness，不是又一个框架》 ｜ https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework

## 别名

`pruning`

## 反链

- [[Harness]]
- [[持久化执行 durable execution]]
- [[harness 与 framework 的分野]]
