---
id: cm_5512c772
name: Tuned Lens
type: REPRESENTATIONAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.045
depth: 1
origin: [notion]
aliases: ["调谐透镜 / Tuned-Lens"]
sources: 1
---

# Tuned Lens

> 把中间层残差流隐藏状态提前映射成词表概率的可解释性方法，用于观察信息如何走向 logits。

**领域** model-training ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 原文 context

<mention-page url="https://app.notion.com/p/ffc679b108ff823ba0e901e51459673b"/>
- **context**：
	> 为了观察信息如何向最终输出过渡，研究人员使用了 Tuned Lens 技术来提取残差流向 Logit 空间映射的演变轨迹。
- **费曼一下**：把模型中间层的隐藏状态提前 "翻译" 成对最终词汇的概率打分，让人能看到信息从残差流走向 logits 的中间快照。本文借它证明：低维投影也藏不住秘密。

## 掌握证据（做到这些才算会）

- 能说明它输出的是中间层对最终词汇的打分快照
- 能解释它为何被用来证明低维投影藏不住信息

## 验收问句

> 想看到信息从残差流过渡到 logits 的过程，{{name}} 给出什么？

## 先懂这些（前置 1）

- [[Q、K、V]] · **soft** — Tuned Lens 观察隐藏状态走向 logits，懂 QKV 才懂中间层信息如何被读取。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Tuned-Lens-a2d679b108ff834186c78124409945e4

## 别名

`调谐透镜 / Tuned-Lens`

## 反链

- [[Q、K、V]]
