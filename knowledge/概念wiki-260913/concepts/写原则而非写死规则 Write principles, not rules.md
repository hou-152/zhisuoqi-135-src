---
id: cm_8989be25
name: 写原则而非写死规则
nameEn: Write principles, not rules
type: CONCEPTUAL
subject: AI 内参 260912
domain: spec-intent
learningStage: now
verification: judge
centrality: 0.072
depth: 1
origin: [neican]
aliases: ["Write principles, not rules"]
sources: 1
---

# 写原则而非写死规则 · Write principles, not rules

> 写技能时给判据与方向而非穷尽规则，让模型在未知边界下自行推理

**领域** spec-intent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

指撰写 Skill 时应像指导一个高智商员工一样阐述核心思想和判据理由（Why），而不是像给计算机写程序一样罗列穷尽的 if-else 规则。原则赋予了模型在未知边界下的推理灵活性，避免了规则爆炸与僵化。

## 原文 context

Write principles, not rules. "Construct the skill as though you're instructing a smart person, not like you're programming a computer,” Zach says. “Including direction in the skill like ’Look for repeated code’ provides better direction than exhaustive variable naming rules.”

## 掌握证据（做到这些才算会）

- 能给出一个用原则替代 if-else 清单的改写示例
- 能说明规则穷举为何在开放场景下失效

## 验收问句

> {{name}} 时，为什么'寻找重复代码'优于罗列变量命名规则？

## 先懂这些（前置 1）

- [[技能溯源 PURPOSE.md]] · **soft** — 不懂【技能溯源】就做不了【写原则而非写死规则】里的「决定这个技能该给哪几条判据、哪部分留给模型自行推理」——判据的来源正是 PURPOSE.md 记下的那条失败模式，没有它就只能退回去穷举规则。

## 出场

- AI 内参 260912 ｜ 《https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude》 ｜ https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude

## 别名

`Write principles, not rules`

## 反链

- [[技能溯源 PURPOSE.md]]
