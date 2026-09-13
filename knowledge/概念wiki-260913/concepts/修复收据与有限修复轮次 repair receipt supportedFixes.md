---
id: cm_2bd22aed
name: 修复收据与有限修复轮次
nameEn: repair receipt / supportedFixes
type: CONCEPTUAL
subject: AI 内参 260912
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.144
depth: 2
origin: [neican]
aliases: ["repair receipt / supportedFixes"]
sources: 1
---

# 修复收据与有限修复轮次 · repair receipt / supportedFixes

> 验证失败返回稳定规则码、具体对象与测量证据，代理只能按 supportedFixes 修，最多两轮。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.144

## 费曼一下

验证失败时，返回机器可读的诊断：稳定规则码、具体对象、测量证据、允许的修复控件。代理只能按 supportedFixes 修，最多两轮，视觉审查另算。它定义了失败后的修复边界，避免乱试。

## 原文 context

Failures come with a repair receipt — `validate --json` and `deliver --json` return stable rule codes, the exact subject, measured evidence, and only supported repair controls instead of a Node stack or an unstructured retry guess.

On failure, `validate --json` and `deliver --json` emit one JSON object. Apply only each `diagnostics[]` subject's `supportedFixes`, within the Skill's two correction rounds; visual review remains separate.

## 掌握证据（做到这些才算会）

- 能说出修复收据包含哪几类字段
- 能说出修复轮次上限及视觉审查是否另算

## 验收问句

> {{name}} 规定失败后代理可以做什么、不可以做什么？

## 先懂这些（前置 1）

- [[原子验证与交付门 atomic validation before delivery]] · **hard** — 不懂【原子验证与交付门】，就做不了【修复收据与有限修复轮次】的「验证失败时返回稳定规则码、具体对象与测量证据」——不知道门里到底有 schema、布局、HTML/SVG、路由、标签到路由间距哪几项检查，就编不出对应的规则码与证据

## 懂了它才能懂（解锁 1）

- [[Reasoning Trace Faithfulness faithfulness]] — 不懂【修复收据与有限修复轮次】，就做不了【Reasoning Trace Faithfulness】里「判断 looped 是否更常给出误导性 fake trace」——不知道代理是在按 supportedFixes、最多两轮的修复循环里反复跑，就界定不了 looped 指的是哪

## 出场

- AI 内参 260912 ｜ 《Archify》 ｜ https://github.com/tt-a1i/archify

## 别名

`repair receipt / supportedFixes`

## 反链

- [[原子验证与交付门 atomic validation before delivery]]
- [[Reasoning Trace Faithfulness faithfulness]]
