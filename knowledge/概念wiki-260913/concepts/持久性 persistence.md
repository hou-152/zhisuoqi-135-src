---
id: cm_f6dede97
name: 持久性
nameEn: persistence
type: CONCEPTUAL
subject: AI 内参 260912
domain: loop-autonomy
learningStage: now
verification: judge
centrality: 0.072
depth: 1
origin: [neican]
aliases: ["persistence"]
sources: 1
---

# 持久性 · persistence

> 模型接受请求后持续执行到哪一步、何时返回；Astra 可能初次实现后即返回审核。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

持久性指模型接受请求后持续做到哪里、何时返回。与 Sol 相比，Astra 可能在初步实现后、仍有余下工作时就返回审核。理解这个差异，才知道为什么要推动它继续。

## 原文 context

如果您习惯了 GPT-5.6 Sol 接受请求后长时间持续运行，那么 GPT-6 Astra 在何时停止方面可能会显得更加犹豫。它可能完成初步实现后，在仍有工作要做的情况下就返回给您进行审核。

## 掌握证据（做到这些才算会）

- 能描述 Astra 与 Sol 在“何时停止”上的行为差异
- 能判断一次提前返回是不是持久性差异导致的

## 验收问句

> {{name}} 上 Astra 和 Sol 的差别表现在哪里？

## 先懂这些（前置 1）

- [[完成标准]] · **soft** — 不懂【完成标准】「开始前说清什么算做完、把运行检查修复都写进请求」，就做不了 ⟨设定持久性：决定模型该连续执行到哪一步、何时返回（例如初次实现后即返回审核）⟩。

## 出场

- AI 内参 260912 ｜ 《Rethinking skills and prompts for GPT-6 Astra | OpenAI Developers》 ｜ https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra

## 别名

`persistence`

## 反链

- [[完成标准]]
