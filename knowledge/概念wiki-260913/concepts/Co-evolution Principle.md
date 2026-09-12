---
id: cm_f3d3cb69
name: Co-evolution Principle
type: CONCEPTUAL
subject: Harness Engineering
domain: model-training
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Co-evolution Principle

> 模型与特定 harness 在训练环中共同演化，工具实现一改就可能因紧耦合而掉性能。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

模型和 harness 不是分开造出来再拼在一起的——它们是**一起训练**出来的。Claude Code 的模型知道怎么用 Claude Code 的 harness，换个 harness 就掉分。这也是为什么 "Codex 模型在 Codex surfaces 上表现更好"。

## 原文 context

Models are now post-trained with specific harnesses in the loop. Claude Code's model learned to use the specific harness it was trained with. Changing tool implementations can degrade performance because of this tight coupling.

## 掌握证据（做到这些才算会）

- 能解释模型被 post-training 去用某个特定 harness 接口的机制
- 能举出更换工具实现后效果下降的情形

## 验收问句

> 改工具实现前，{{name}} 提醒你要先验证什么？

## 先懂这些（前置 1）

- [[模型训练与 harness 设计的耦合]] · **hard** — 不懂【模型训练与 harness 设计的耦合】，就做不了 Co-evolution Principle 的⟨工具实现一改就掉性能的机制说明⟩

## 懂了它才能懂（解锁 1）

- [[Harness 内 RL RL inside the harness]] — 不懂【Co-evolution Principle】，就做不了 Harness 内 RL 的⟨用确切工具集在环内训练以避免紧耦合掉性能的设计⟩

## 出场

- Harness Engineering ｜ 《The Anatomy of an Agent Harness》 ｜ https://x.com/akshay_pachaar/status/2041146899319971922
## 反链

- [[模型训练与 harness 设计的耦合]]
- [[Harness 内 RL RL inside the harness]]
