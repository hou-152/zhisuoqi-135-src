---
id: cm_836f9734
name: Nerdy Personality
type: REPRESENTATIONAL
subject: AI 概念库
domain: model-training
learningStage: when-needed
verification: accept
centrality: 0.067
depth: 6
origin: [notion]
aliases: ["Nerdy 人格", "ChatGPT Nerdy", "personality customization - Nerdy"]
sources: 1
---

# Nerdy Personality

> ChatGPT 的一种风格人格预设，其真实走向由 RL 奖励的口味决定，而非 prompt 文本。

**领域** model-training ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.067

## 原文 context

来源：<mention-page url="https://app.notion.com/p/3c7679b108ff83da8e608158cba52620"/>
**context**：
> You are an unapologetically nerdy, playful and wise AI mentor to a human... You must undercut pretension through playful use of language.
**费曼一下**：ChatGPT「personality customization」里的一种风格预设，鼓励模型用 playful、不端着、不自我严肃的方式回答。它有自己的 system prompt，也有自己的 RL 奖励——而奖励的「判分口味」决定了风格的具体走向：本来想要的是「机智」，结果模型学到的是「开口就是 goblin」。
关键事实：
- Nerdy 在 ChatGPT 全部回复中只占 **2.5%**，却贡献了 **66.7%** 的 goblin 提及，是哥布林口癖的「主战场」。
- 2026 年 3 月，OpenAI 在 GPT‑5.4 之后**退役**了 Nerdy 人格，作为修复哥布林之谜的一部分。
- Nerdy 是一个有用的「人格 = 风格指令 + 风格奖励」案例：人格的真正定义不在 prompt 文本里，而在 RL 奖励的口味里。
---
来源：<mention-page url="https://app.notion.com/p/eda679b108ff83c5941101d79d69ff4d"/>（中文复述 / 量子位）
**context**：
> "书呆子"人格使用了以下系统提示：你是一位毫不掩饰自己书呆子气、风趣幽默又智慧过人的 AI 导师……必须用轻松诙谐的语言化解故作姿态。书呆子风格仅占 ChatGPT 所有回复的 2.5%，但在所有提及"goblin"的回复中占了 66.7%。
**费曼一下**：中文版把人格的"系统提示"原话搬出来了——读起来很像一份角色卡，鼓励模型 playful、不端着、化解 pretension。然后用 2.5% vs 66.7% 这一对反差数据，干脆利落地证明：哥布林口癖**不是普遍互联网模因，是特定人格条件下的精准副产物**。

## 掌握证据（做到这些才算会）

- 能举出 Nerdy 回复占比与其 goblin 提及占比的失衡
- 能说明人格＝风格指令＋风格奖励这一结构

## 验收问句

> {{name}} 的说话风格由 prompt 还是奖励决定？

## 先懂这些（前置 2）

- [[Reward Signal]] · **soft** — 人格真实走向由 RL 奖励口味决定，懂奖励信号更易理解它非 prompt 决定。
- [[RLHF]] · **soft** — RLHF 用偏好奖励塑造行为，理解它更清楚人格如何被训练出来。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Nerdy-Personality-3d1679b108ff838995ea01ea93a76cfa

## 别名

`Nerdy 人格`、`ChatGPT Nerdy`、`personality customization - Nerdy`

## 反链

- [[Reward Signal]]
- [[RLHF]]
