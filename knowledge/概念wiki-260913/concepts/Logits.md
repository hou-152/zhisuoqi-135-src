---
id: cm_c7d6c722
name: Logits
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.117
depth: 1
origin: [notion]
aliases: ["top-k logits / 对数几率"]
sources: 1
---

# Logits

> 模型输出下一个词前对词表中每个 token 打的原始概率得分，取排名靠前的候选即 top-k logits。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.117

## 原文 context

<mention-page url="https://app.notion.com/p/ffc679b108ff823ba0e901e51459673b"/>
- **context**：
	> Logits 是模型在输出最后一个词之前，针对词典里每一个词汇打出的原始概率得分。取排名前列的候选词得分，就是 top-k logits。这就好比呈递给 CEO 的最终选项清单。
- **费曼一下**：模型最后一步给出的 "候选词得分清单"。表面只输出一个 Yes/No，但背后还附带几十个词的概率分布——本论文证明，正是这份清单在悄悄泄密。

## 掌握证据（做到这些才算会）

- 能解释 logits 与最终概率分布之间的关系
- 能指出 logits 候选清单为何会泄露训练数据信息

## 验收问句

> 你能说清 {{name}} 在解码流程的哪一步、又为何会泄密吗？

## 先懂这些（前置 1）

- [[N-gram]] · **soft** — N-gram 的下一词概率是 logits 的简化前身，先懂它更易理解原始得分。

## 懂了它才能懂（解锁 3）

- [[Tuned Lens]] — Tuned Lens 把中间层映射成词表概率，不懂 logits 就不懂它的输出目标。
- [[重要性采样]] — IS比例来自策略对token的概率，懂logits能理解概率从哪来。
- [[reasoning thinking]] — 思考模式仍逐 token 生成，懂 logits 更易理解它如何在候选词上推演。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Logits-5ce679b108ff82bda5e501d88b66b60c

## 别名

`top-k logits / 对数几率`

## 反链

- [[重要性采样]]
- [[reasoning thinking]]
- [[N-gram]]
- [[Tuned Lens]]
