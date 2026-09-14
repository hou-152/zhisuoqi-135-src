---
id: cm_ef64feed
name: 只打补丁绝不重写
nameEn: Patch, never regenerate
type: CONCEPTUAL
subject: AI 内参 260912
domain: safety-governance
learningStage: now
verification: judge
centrality: 0.072
depth: 2
origin: [neican]
aliases: ["Patch, never regenerate"]
sources: 1
---

# 只打补丁绝不重写 · Patch, never regenerate

> 初稿生成后只允许小粒度 Edit 补丁，修改方被权限锁死无法整体重写

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

指在初稿生成之后，任何针对批评意见的修改只能以极小粒度的局部补丁（Edit hunk）形式进行。负责修改的 Agent 在系统权限层被锁死，根本没有新建或覆写整个文件的权限，从物理机制上彻底断绝了模型推倒重来引入新错误的风险。

## 原文 context

Patch, never regenerate. After step 11 produces the synthesized report (or step 10 for light tier), the only modifications are surgical Edit hunks. The patcher and polish auditor are tool-locked to [Read, Edit] at the Claude Code allowlist level so they physically cannot Write a new draft.

## 掌握证据（做到这些才算会）

- 能指出负责修改的 Agent 被限定在哪些工具
- 能解释为何禁止重写能防止引入新错误

## 验收问句

> {{name}} 是在哪一层被强制保证的？

## 先懂这些（前置 1）

- [[填充词元推理与监控盲区 Filler-Token Reasoning]] · **soft** — 不懂【填充词元推理与监控盲区】，就做不了【只打补丁绝不重写】的「评估小粒度补丁是否可能被用来隐藏填充词元式推理」这件事。

## 出场

- AI 内参 260912 ｜ 《jordan-gibbs/hyperresearch：基于智能体的研究知识库。智能体收集、搜索并将网络研究成果整合到一个持久的、可搜索的维基中。》 ｜ https://github.com/jordan-gibbs/hyperresearch

## 别名

`Patch, never regenerate`

## 反链

- [[填充词元推理与监控盲区 Filler-Token Reasoning]]
