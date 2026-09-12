---
id: cm_a56d4934
name: Verifiability
type: CONCEPTUAL
subject: AI 概念库
domain: verification-eval
learningStage: now
verification: judge
centrality: 0.067
depth: 0
origin: [notion]
aliases: ["Verifiability", "可验证性", "可验证性原则"]
sources: 1
---

# Verifiability

> 任务是否存在自动 reward 或成功信号，决定模型能否靠 RL 反复练习而快速进步。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 原文 context

<mention-page url="https://app.notion.com/p/202679b108ff8386979a01933594c9bc"/>
> Traditional software automates what you can specify. LLMs and reinforcement learning automate what you can verify. If a task has an automatic reward or success signal, models can practice it.
**费曼一下**：决定 AI 在哪里跑得最快的关键属性。
- 传统软件自动化"你能 **specify**（指定）的事"——你写得出来、就能跑
- LLM + RL 自动化"你能 **verify**（验证）的事"——只要有自动 reward / success signal，模型就能在 RL 里反复练
这就是为什么数学、编程、测试、benchmark、游戏、很多工程任务进步神速：它们 **resettable, repeatable, rewardable**。
也是为什么 coding agent 体验远好于普通 chatbot：测试通过/失败、程序运行/崩溃、diff 可检查、benchmark 可衡量——模型时刻有反馈。
创业者杠杆：找"高 verifiability + 高经济价值 + 但前沿实验室还没重点训"的领域，自己造 RL 环境去 fine-tune。
---
来源：<mention-page url="https://app.notion.com/p/d6d679b108ff82debc5181b2c1ced4ff"/>（Sequoia AI Ascent 演讲原文）
> Traditional computers can easily automate what you can specify in code, and the latest round of LLMs can easily automate what you can verify.
**费曼一下（2026-05-03 补充）**：Karpathy 在原文里给 verifiability 加了一句重要的兜底：**「Almost everything can ultimately be made verifiable to some extent」**——比如写作可以用 LLM judge council 来近似 reward。也就是说，verifiability 不是天然属性，而是**可设计的工程问题**——「区别只是难度，不是可能性」。

## 掌握证据（做到这些才算会）

- 能举例说明数学、编程、游戏因可验证而进步神速
- 能用可验证性解释 coding agent 体验为何好于普通 chatbot

## 验收问句

> 给定一个任务，你能判断它的 {{name}} 高低并说明依据吗？

## 懂了它才能懂（解锁 2）

- [[Verifiable Codebase]] — 可验证代码库是可验证性在工程环境中的落地形态。
- [[Self-verification]] — 任务有无自动成功信号，决定自检能否闭环。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Verifiability-e32679b108ff83d091750191b7bf3fe5

## 别名

`Verifiability`、`可验证性`、`可验证性原则`

## 反链

- [[Self-verification]]
- [[外包思考，但不外包理解]]
- [[Verifiable Codebase]]
- [[Agent-Native Infrastructure]]
- [[Sensors 与 Actuators]]
