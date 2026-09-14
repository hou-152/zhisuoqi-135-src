---
id: cm_eb1388f9
name: 烂代码生成陷阱
nameEn: AI Slop & Verification bottleneck
type: CONCEPTUAL
subject: AI 内参 260912
domain: code-engineering
learningStage: now
verification: judge
centrality: 0.089
depth: 0
origin: [neican]
aliases: ["AI Slop & Verification bottleneck"]
sources: 1
---

# 烂代码生成陷阱 · AI Slop & Verification bottleneck

> 生成无上限而验证卡在人工逐行阅读时，必然产出低质冗余代码，质量趋于零。

**领域** code-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 费曼一下

指当 AI 写代码的速度呈指数级增长，而人类审查只能按每分钟几十行的恒定生理速率进行时，传统 Code Review 必然沦为敷衍的扫视点赞（LGTM），导致低质冗余代码（Slop）不可逆地腐蚀整个系统的不可调和现象。

## 原文 context

Slop is what happens when generation is unbounded and verification is bottlenecked on a human reading the output.

If the goal is still to read every line, we are bottlenecked by our own ability to review, and quality degrades toward zero.

## 掌握证据（做到这些才算会）

- 能解释生成速度与人工审查速度不可调和导致 review 失效
- 能指出敷衍 LGTM 与代码质量下滑的因果链

## 验收问句

> 能否说清{{name}}为什么源于生成与验证的速度差？

## 懂了它才能懂（解锁 1）

- [[代码黑盒化与可解释性转向 Codebase as a black box & Interpretability]] — 不懂【烂代码生成陷阱】，就做不了【代码黑盒化与可解释性转向】的“把验证从人工逐行阅读切换为传感器检测业务不变量”这件事——因为不知道生成无上限而验证卡在人工逐行阅读会导致质量崩溃，就不会用黑盒验证替代逐行阅读。

## 出场

- AI 内参 260912 ｜ 《Building software factories (with no slop)》 ｜ https://x.com/dzhng/status/2090252351533973768/?rw_tt_thread=True

## 别名

`AI Slop & Verification bottleneck`

## 反链

- [[代码黑盒化与可解释性转向 Codebase as a black box & Interpretability]]
