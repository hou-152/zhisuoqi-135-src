---
id: cm_f5056d61
name: stated 出处纪律
type: PROCEDURAL
subject: Context Engineering
domain: memory-retrieval
learningStage: now
verification: judge
centrality: 0.042
depth: 1
origin: [context]
aliases: []
sources: 1
---

# stated 出处纪律

> 存储时只保留用户明确说过的内容，判据是出处而不是是否有用

**领域** memory-retrieval ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

给每条记忆盖一个来源戳，然后只信盖了"本人亲述"戳的那些。这一条防的是长期漂移：模型的猜测一旦被当成事实存下来，下一轮就会被当成前提再往上堆，几轮之后档案里全是它自己的想象。

## 原文 context

每行内容只打 [stated]，判据是"这是用户说的吗"。由此排除模型的推论、前瞻状态、检索产出、加工补全（用户说 Holton, MI 就存这个，不补县名）、道听途说，以及模型自己的建议——判据是出处，不是谁最后说的；一句"听起来不错"只确认形状，不把十个细节各存一条。

## 掌握证据（做到这些才算会）

- 能对一行内容判断是否属于用户 stated
- 能拒绝把模型推论、补全与建议写进记忆

## 验收问句

> 这条记录该不该存，按 {{name}} 你怎么判？

## 先懂这些（前置 1）

- [[记忆 Memory]] · **hard** — 它是记忆写入的判据纪律，先懂记忆写入才懂出处优先。

## 相关

- [[判定程序化写法]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[反自我合理化条款]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[fail-closed 默认]] · 同篇出现（co-occurrence） — 同篇出现：context-20

## 出场

- Context Engineering ｜ 《Opus 5 系统提示词全文流出：一份近两万字的 agent 行为说明书》 ｜ https://github.com/Eversmile12/leaked-llm-prompts/blob/main/Anthropic/opus-5.md
## 反链

- [[记忆 Memory]]
- [[判定程序化写法]]
- [[fail-closed 默认]]
- [[反自我合理化条款]]
