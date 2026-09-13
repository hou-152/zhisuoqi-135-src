---
id: cm_592eb60e
name: Learning Loop
type: PROCEDURAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: now
verification: use
centrality: 0.072
depth: 4
origin: [harness]
aliases: []
sources: 1
---

# Learning Loop

> 把运行中获得的规则写回 skill 文件，下次运行自动生效，技能由此自我改写。

**领域** loop-autonomy ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

学习循环是 skill 系统的自我进化机制。通过 /improve skill 读取反馈（尤其是“OK”而非“差”的反馈）→ diarize → 提取模式 → 写回 skill file。Skill 自我重写，系统在不改代码的情况下变得更好。通用模式：retrieve → read → diarize → count → synthesize → rewrite the skill。

## 原文 context

"These rules get written back into the skill file. The next run uses them automatically. The skill rewrites itself."

## 掌握证据（做到这些才算会）

- 能描述一次规则写回 skill 文件的完整闭环
- 能指出闭环中哪一步负责沉淀经验

## 验收问句

> {{name}} 靠什么让技能一次比一次好？

## 先懂这些（前置 1）

- [[循环工程 loop engineering]] · **soft** — 不懂【循环工程】，就做不了【Learning Loop】的“把规则写回 skill 文件并下次生效”。

## 相关

- [[Skill Files]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[Thin Harness, Fat Skills]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[Loop Engineering]] · related-to（audit） — 写回 skill 是迭代反馈的一种具体机制，可独立理解，属组成/例子关系，不构成前置
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-24

## 出场

- Harness Engineering ｜ 《Thin Harness, Fat Skills：harness 才是真正的产品》 ｜ https://x.com/garrytan/status/2042925773300908103/
## 反链

- [[循环工程 loop engineering]]
- [[Loop Engineering]]
- [[Thin Harness, Fat Skills]]
- [[Skill Files]]
