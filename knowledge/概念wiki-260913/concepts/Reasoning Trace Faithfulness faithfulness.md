---
id: cm_2a6f7367
name: Reasoning Trace Faithfulness
nameEn: faithfulness
type: CONCEPTUAL
subject: AI 内参 260912
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 3
origin: [neican]
aliases: ["faithfulness"]
sources: 1
---

# Reasoning Trace Faithfulness · faithfulness

> 推理 trace 可读但不保证忠实反映模型内部计算；有效担忧只限于 looped 是否更常给出误导性 fake trace。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

CoT 可读，但不保证忠实描述模型内部实际计算。作者把有效担忧限定为：looped transformer 是否比传统 transformer 更常给出误导性的 fake trace。因为没有强证据，这个担忧不能直接当作反对 looped 的理由。

## 原文 context

It’s also worth keeping in mind that a reasoning trace is not guaranteed to faithfully describe everything that happens inside the model. In my view, the only valid concern is that looped transformers purposefully mislead users by presenting “fake” reasoning traces more often than conventional transformers. But I don’t think we have any strong evidence that this is happening.

## 掌握证据（做到这些才算会）

- 能复述作者的前提：reasoning trace 不保证忠实描述模型内部实际发生的一切
- 能指出作者只承认一个有效担忧——looped transformer 是否比传统 transformer 更常给出 fake trace，而非据此一律反对 looped

## 验收问句

> 按 {{name}}，为什么不能因为 trace 可能不忠实就直接反对 looped transformer？

## 先懂这些（前置 1）

- [[修复收据与有限修复轮次 repair receipt supportedFixes]] · **soft** — 不懂【修复收据与有限修复轮次】，就做不了【Reasoning Trace Faithfulness】里「判断 looped 是否更常给出误导性 fake trace」——不知道代理是在按 supportedFixes、最多两轮的修复循环里反复跑，就界定不了 looped 指的是哪

## 懂了它才能懂（解锁 1）

- [[嵌入式评估者 embedded evaluators]] — 不懂【Reasoning Trace Faithfulness】，就做不了【嵌入式评估者】的「评估模型与训练流程」——把可读的推理 trace 当成模型内部计算的忠实记录，评估结论就立不住

## 出场

- AI 内参 260912 ｜ 《GPT-6 Astra, Looped Transformers, and Hidden Reasoning》 ｜ https://magazine.sebastianraschka.com/p/gpt-6-astra-looped-transformers-and

## 别名

`faithfulness`

## 反链

- [[修复收据与有限修复轮次 repair receipt supportedFixes]]
- [[嵌入式评估者 embedded evaluators]]
