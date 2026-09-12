---
id: cm_532995ad
name: EHR
type: REPRESENTATIONAL
subject: AI 概念库
domain: clinical-medicine
learningStage: when-needed
verification: accept
centrality: 0.045
depth: 0
origin: [notion]
aliases: ["电子健康记录", "Electronic Health Record", "电子病历"]
sources: 1
---

# EHR

> 电子健康记录，汇总分诊、问诊、化验、影像与住院评估的病人在院数字病历底盘。

**领域** clinical-medicine ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.045

## 原文 context

来源：<mention-page url="https://app.notion.com/p/389679b108ff82b9b75d81005e7123ba"/>
> 「你可以想象这是一个被动运行在电子健康记录上的系统，能够在诊断错误发生之前识别出来。」
**费曼一下**：EHR（Electronic Health Record，电子健康记录）是病人在医院里的「数字病历底盘」——分诊记录、问诊、化验、影像、住院评估都汇在这里。把推理模型挂在 EHR 上「被动运行」，意味着 AI 不是医生主动去查、去问的工具，而是一直在背后默默看着的「安全网」——在医生写下错误判断之前先红灯一下。这是论文里 AI 在医疗系统的「最小可部署形态」：不改变工作流，只在错误发生之前提示一次。

## 掌握证据（做到这些才算会）

- 能列出 EHR 中通常汇集的几类数据
- 能说明把模型被动挂在 EHR 上作错误前提示的部署形态

## 验收问句

> 把推理模型被动挂在 {{name}} 上意味着什么？

## 懂了它才能懂（解锁 1）

- [[第二意见]] — 第二意见在EHR中被动运行，无EHR则无运行底盘。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/EHR-70e679b108ff83adad4d81be560db23c

## 别名

`电子健康记录`、`Electronic Health Record`、`电子病历`

## 反链

- [[第二意见]]
- [[外包思考，但不外包理解]]
- [[Agent-Native Infrastructure]]
- [[Sensors 与 Actuators]]
