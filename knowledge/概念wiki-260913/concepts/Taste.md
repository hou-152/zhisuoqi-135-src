---
id: cm_270fdbaa
name: Taste
type: CONCEPTUAL
subject: AI 概念库
domain: thinking-method
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 0
origin: [notion]
aliases: ["Taste", "Judgment", "Taste and Judgment", "品味", "工程判断", "taste 与 judgment"]
sources: 1
---

# Taste

> 在美学、判断与取舍上的品味，负责在多个可运行方案中挑出对的、优雅的那个。

**领域** thinking-method ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 原文 context

<mention-page url="https://app.notion.com/p/d6d679b108ff82debc5181b2c1ced4ff"/>
> You basically still have to be in charge of the aesthetics, the judgment, the taste, and a little bit of oversight.
**费曼一下**：当 agent 接管了 typing speed，人类的杠杆从「打字快」变成「判断准」。
人类负责的「taste 三件套」：
- **Aesthetics（美学）**：代码、产品、文档是否优雅
- **Judgment（判断）**：哪些路径值得走、哪些不值得
- **Taste（品味）**：在多个 working solution 里挑出对的那个
Karpathy 说现在的 agent 代码「经常让人心脏病」——bloaty、复制粘贴、awkward abstractions。它能跑，但不一定漂亮。aesthetic reward 还没被塞进 RL，所以 taste 暂时仍是人独占的赛道。
nanoGPT 简化案例：他怎么 prompt 都让模型简化不动 → 明显「在 RL 圈外」。这是**人类瓶颈**的具体位置：agent 不会主动发现「用唯一 user ID 串起所有事情」这种问题——要靠人的工程品味先去定义。

## 掌握证据（做到这些才算会）

- 能指出 agent 产出中的 bloaty、复制粘贴与 awkward abstraction
- 能在两个都能跑的实现里说明哪个更好及理由

## 验收问句

> {{name}} 为什么仍是 agent 接管不了的领域？

## 懂了它才能懂（解锁 2）

- [[Friction-based Skill Formation]] — 品味只能从犯错、溯源、碰壁的摩擦中长出来。
- [[Universal appeal — makes, not has]] — 判断普遍性如何在读者身上被制造出来，需要品味。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Taste-b94679b108ff828892a901041cf27a80

## 别名

`Taste`、`Judgment`、`Taste and Judgment`、`品味`、`工程判断`、`taste 与 judgment`

## 反链

- [[外包思考，但不外包理解]]
- [[Friction-based Skill Formation]]
- [[Agent-Native Infrastructure]]
- [[Universal appeal — makes, not has]]
- [[Sensors 与 Actuators]]
