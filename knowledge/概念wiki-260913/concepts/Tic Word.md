---
id: cm_60061253
name: Tic Word
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.089
depth: 2
origin: [notion]
aliases: ["抽动词", "verbal tic", "lexical tic", "language tic", "语言癖", "Style Tic", "风格性口癖", "语言怪癖"]
sources: 2
---

# Tic Word

> 模型在不该出现的语境下仍反复使用的词，是奖励信号系统性偏差的可量化指纹。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 原文 context

来源：<mention-page url="https://app.notion.com/p/eda679b108ff83c5941101d79d69ff4d"/>
**context**：
> 进一步调查揭示了一系列其他奇特生物：浣熊、巨魔、食人魔和鸽子也被识别为其他抽动词，而大多数对"frog"（青蛙）的使用则被证实是合理的。
**费曼一下**：从语言学/神经学借来的术语（verbal tic / lexical tic），原意指人不自觉地反复说出的某个词或短语。在大模型语境下，**指模型在不该出现的语境下也忍不住反复用的词或表达**——它不再是风格选择，而是**控制不住的口癖**。
关键诊断方法：
- 比较「出现 vs 不出现」该词的同一任务输出，看奖励是否**系统性偏向某一边**；如果偏向显著，这个词就是抽动词。
- 反例（合理使用）：哥布林之谜里 "frog"（青蛙）的大多数使用都被证实合理——青蛙是名字，不是抽动。
- 正例家族：goblin、gremlin、浣熊、巨魔、食人魔、鸽子——都属于哥布林之谜里被点名的抽动词。
为什么这个概念有用：
- 它把模糊的「模型风格变得奇怪」**翻译成可量化的诊断目标**：找抽动词 = 找奖励偏差的指纹。
- 它提供了一个**一般性的检测框架**，不局限于哥布林：任何高频且跨条件出现的词，只要奖励对其呈现系统性偏好，都可以被这套方法识别出来。
- 它揭示出 alignment 排查的一个新工种：**模型抽动词巡查**——查找那些被奖励信号悄悄植入、但没人知情的语言癖好。

## 掌握证据（做到这些才算会）

- 能用出现与不出现某词的同一任务输出比较奖励偏向
- 能区分抽动词与合理使用（如作品里的专有名词）

## 验收问句

> 你能否用 {{name}} 的诊断法找出一个被奖励偏置植入的词？

## 先懂这些（前置 1）

- [[奖励攻击与多样性坍塌]] · **soft** — 不懂【奖励攻击与多样性坍塌】，就做不了 Tic Word 的⟨作为奖励信号系统性偏差指纹的因果解释⟩

## 相关

- [[奖励攻击与多样性坍塌]] · related-to（audit） — Tic Word 作为「语境不当的重复词」本身可独立理解，奖励攻击只是成因解释，非定义/机制依赖
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Tic-Word-a20679b108ff83bd94998138bd7be514
- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Lexical-Tic-f85679b108ff8355af9701970a79d4ac

## 别名

`抽动词`、`verbal tic`、`lexical tic`、`language tic`、`语言癖`、`Style Tic`、`风格性口癖`、`语言怪癖`

## 反链

- [[奖励攻击与多样性坍塌]]
