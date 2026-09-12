---
id: cm_03ce5cbe
name: 推理 vs 训练
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: now
verification: judge
centrality: 0.017
depth: 0
origin: [notion]
aliases: ["Inference vs Training", "inference", "training", "推理", "训练"]
sources: 1
---

# 推理 vs 训练

> 推理 vs 训练：训练是『教』模型、吃硬件极限，推理是『用』模型、要求性价比，两者对芯片诉求不同。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 原文 context

<mention-page url="https://app.notion.com/p/a3f679b108ff822aa1b3813935a31783"/>
- **context**：
	> DeepSeek appears to have adapted only part of V4's *training* process for Chinese chips ... Chinese chips still don't perform as well as Nvidia chips but are better suited for inference than training.
- **费曼一下**：训练（training）是**教**模型，推理（inference）是**用**模型。前者吃硬件极限，后者要求性价比。国产芯片在"用"上够格，在"教"上还差一截——所以 V4 把推理先迁过去，训练继续留在 Nvidia 上。

## 掌握证据（做到这些才算会）

- 能用自己的话说清训练与推理吃的是什么资源
- 能解释国产芯片为何先迁推理而训练留在 Nvidia

## 验收问句

> {{name}}的差别，如何解释 V4 的迁移选择？

## 相关

- [[推理模型]] · related-to（audit） — 训练/推理之分只帮助给推理模型定位，不懂也能理解推理模型本身。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/vs-09a679b108ff832bbe078154510afa2a

## 别名

`Inference vs Training`、`inference`、`training`、`推理`、`训练`

## 反链

- [[推理模型]]
