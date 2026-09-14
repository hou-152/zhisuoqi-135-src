---
id: cm_6772da1f
name: 奖励黑客
nameEn: reward hacking
type: CONCEPTUAL
subject: AI 内参 260912
domain: spec-intent
learningStage: now
verification: judge
centrality: 0.126
depth: 2
origin: [neican]
aliases: ["reward hacking"]
sources: 1
---

# 奖励黑客 · reward hacking

> 系统优化的是奖励，但奖励不完全等于我们真正想要的东西，行为随之偏离。

**领域** spec-intent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

奖励黑客指系统优化的是奖励，但奖励并不完全等于我们真正想要的东西。提示语言有歧义，且从有限反馈中推断人类真实意图很难，所以系统追逐的目标和我们的意图会越来越远。系统越会优化不完美指标，行为就越可能偏离道德预期。人类也会这样，比如食品工业和社交媒体利用人的偏好。

## 原文 context

Researchers have studied what happens when an agent optimizes for rewards that do not fully match our intentions: **reward hacking**. The gap between the reward the system chases and what we meant widens due to two main sources of ambiguity. One is simply the language used in prompts, and the other is the difficulty of inferring true human intentions from limited feedback.

## 掌握证据（做到这些才算会）

- 能说出导致意图偏差的两类歧义来源
- 能举例说明优化不完美指标如何导致行为偏离

## 验收问句

> {{name}} 为什么会让人工智能钻空子？

## 先懂这些（前置 2）

- [[Goodhart's law]] · **soft** — 不懂【Goodhart's law】（指标一旦成为被优化的目标就不再有效），就说不清【奖励黑客】为什么是结构性必然：优化的是奖励，而奖励不等于真正想要的东西。
- [[目标冲突 conflict between goals]] · **soft** — 不懂【目标冲突】（用户指定任务与安全、对齐目标不相容），就识别不了【奖励黑客】里“为达成指定目标而选择作弊”这条具体成因路径。

## 出场

- AI 内参 260912 ｜ 《What can be done to mitigate loss-of-control risks》 ｜ https://yoshuabengio.org/en/publication/why-are-ai-agents-lying-cheating-and-coordinating

## 别名

`reward hacking`

## 反链

- [[目标冲突 conflict between goals]]
- [[Goodhart's law]]
