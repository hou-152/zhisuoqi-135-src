---
id: cm_cd19781c
name: REI-Bench
type: REPRESENTATIONAL
subject: AI 概念库
domain: verification-eval
learningStage: when-needed
verification: accept
centrality: 0.067
depth: 1
origin: [notion]
aliases: ["Referring Expression Implicitness Benchmark"]
sources: 1
---

# REI-Bench

> 南洋理工 MARS Lab 发布的机器人模糊指令评测基准，按指代难度×上下文干扰分 9 级，主流任务成功率最高掉 36.9%。

**领域** verification-eval ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.067

## 原文 context

来源：<mention-page url="https://app.notion.com/p/dfc679b108ff825eac7b01a50bcec8e1"/>
> 来自南洋理工大学 MARS Lab 的研究团队，联合发布了系统化评估机器人处理「模糊人类指令」的测试基准 REI-Bench。在 REI-Bench 的测试下，当前主流任务成功率最高下降达 36.9%。
**费曼一下**：第一个系统化测试机器人「能不能听懂日常糊涂话」的考试。把「指代难度 × 上下文干扰」组合成 9 个层级，专门戳穿「LLM-机器人」在真实人机交互下的能力虚胖。

## 掌握证据（做到这些才算会）

- 能说出 REI-Bench 来自南洋理工 MARS Lab 且针对模糊人类指令
- 能引用成功率达 36.9% 的下降这一关键结论

## 验收问句

> {{name}} 的 9 个层级是按哪两个维度组合出来的？

## 先懂这些（前置 2）

- [[instruction following 的可靠性边界]] · **soft** — 基准给出模糊指令成功率下滑，才能具体理解边界。
- [[VirtualHome]] · **soft** — 先懂具身基准范式，才定位 REI-Bench 的评测对象。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/REI-Bench-4ad679b108ff83c7836281317e9091ac

## 别名

`Referring Expression Implicitness Benchmark`

## 反链

- [[instruction following 的可靠性边界]]
- [[VirtualHome]]
