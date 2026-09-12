---
id: cm_cf32c22f
name: 自评失真 / Self-evaluation Distortion
type: CONCEPTUAL
subject: Harness Engineering
domain: verification-eval
learningStage: now
verification: judge
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# 自评失真 / Self-evaluation Distortion

> agent 能发现自己产出的缺陷，但随后说服自己可以接受，最终给出通过的判断。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

Agent 版的「自我感觉良好」。它明明看到了问题，但作为自己工作的评审者，它倾向于找理由说服自己这没什么大不了。这就是为什么 Evaluator 必须和 Generator 没有共享内部状态——独立性是客观评价的前提。

## 原文 context

agent 能发现自己产出的缺陷，但随后说服自己可以接受，给出通过判断

## 掌握证据（做到这些才算会）

- 能举出自我评审放水、先发现缺陷后判通过的实例
- 能据此设计外部或对抗性评审来规避

## 验收问句

> 你如何用 {{name}} 解释自己评自己为何会失真？

## 先懂这些（前置 1）

- [[验证缺口]] · **soft** — 不懂【验证缺口】，就做不了【自评失真 / Self-evaluation Distortion】的「把自我评估与可验证事实对齐」

## 懂了它才能懂（解锁 1）

- [[橡皮鸭复审]] — 不懂【自评失真 / Self-evaluation Distortion】，就做不了【橡皮鸭复审】的「用另一家族模型抵消自我说服」

## 相关

- [[橡皮鸭复审]] · related-to（audit） — 橡皮鸭复审的原理是'不同训练数据带来不同盲区'，与自评失真无关；自评失真只是可选触发场景，非理解前提。
- [[验证缺口]] · related-to（audit） — 验证缺口谈'自评与事实的落差'，自评失真谈'发现缺陷后说服自己'，是不同机制；背景关系不构成理解前提。
- [[时间 Scalability Temporal Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[空间 Scalability Spatial Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1

## 出场

- Harness Engineering ｜ 《Harness Engineering 三个 Scaling 维度的统一框架》 ｜ https://yage.ai/share/harness-engineering-scalability-20260330.html
## 反链

- [[时间 Scalability Temporal Scalability]]
- [[橡皮鸭复审]]
- [[验证缺口]]
- [[空间 Scalability Spatial Scalability]]
