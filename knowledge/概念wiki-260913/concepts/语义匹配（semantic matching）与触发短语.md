---
id: cm_b0946442
name: 语义匹配（semantic matching）与触发短语
type: CONCEPTUAL
subject: AI 内参 260912
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.089
depth: 0
origin: [neican]
aliases: []
sources: 1
---

# 语义匹配（semantic matching）与触发短语

> Claude 靠请求与技能描述在含义上的重叠决定是否触发，重叠不足就不匹配。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 费曼一下

Claude 决定是否使用某个技能，靠的不是关键词精确命中，而是你的请求与技能描述在"含义"上的重叠。重叠不足就不触发。由此推出修复方法：用你实际会说的各种说法去测试（"帮我分析一下这个性能""为什么这个这么慢？"等），把没触发的措辞作为触发短语补进描述里。这是"技能无法触发"几乎总是描述问题的原因。

## 原文 context

Claude 使用语义匹配，因此您的请求需要与描述的含义有所重叠。如果重叠不足，就不会匹配。

如果任何变体未能触发，请将这些关键词添加到您的描述中

## 掌握证据（做到这些才算会）

- 能解释触发靠语义重叠而非关键词精确命中
- 能把没触发的说法作为触发短语补进描述

## 验收问句

> {{name}} 里重叠不足会怎样？该怎么修？

## 懂了它才能懂（解锁 1）

- [[技能触发与自动使用 Skill Triggering Automatic Use]] — 不懂语义匹配与触发短语，就做不了技能触发与自动使用里的「靠请求与技能描述在含义上的重叠决定是否触发」

## 出场

- AI 内参 260912 ｜ 《Claude 官方课程 · 第 6 课：技能排障》 ｜ https://academy.claude.com/zh-CN/courses/introduction-to-agent-skills/troubleshooting-skills
## 反链

- [[技能触发与自动使用 Skill Triggering Automatic Use]]
