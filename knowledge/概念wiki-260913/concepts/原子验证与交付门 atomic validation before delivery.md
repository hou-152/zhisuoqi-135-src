---
id: cm_a786850e
name: 原子验证与交付门
nameEn: atomic validation before delivery
type: CONCEPTUAL
subject: AI 内参 260912
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.144
depth: 1
origin: [neican]
aliases: ["atomic validation before delivery"]
sources: 1
---

# 原子验证与交付门 · atomic validation before delivery

> 交付前 schema、布局、HTML/SVG、路由、标签到路由间距等检查必须全过，候选才原子替换目标。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.144

## 费曼一下

新图先成为同目录候选，只有 schema、布局、HTML/SVG、路由、标签到路由间距等检查全部通过，才原子替换目标文件。否则旧的好图继续保留。这个门决定 Archify 的交付物不是随便生成，而是通过检查的版本。

## 原文 context

Atomic validation before delivery — schema, layout, HTML/SVG, route, and label-to-route clearance checks must all pass before a showcase artifact replaces the last known good output.

Step Deliver: A same-directory candidate is rendered and checked; only a passing artifact atomically replaces the target, then optional `--open` launches that exact file.

## 掌握证据（做到这些才算会）

- 能列出交付门包含的检查项
- 能说明检查失败时旧的好图如何被保留

## 验收问句

> 候选图未通过布局检查时，{{name}} 要求系统怎么做？

## 先懂这些（前置 1）

- [[确定性编译 deterministic compilation]] · **hard** — 不懂【确定性编译】，就做不了【原子验证与交付门】里的「候选原子替换目标」——同一份 IR 若每次编译出的布局/HTML 都可能不同，全过的检查结果贴不到实际交付物上，放行就等于没放行

## 懂了它才能懂（解锁 1）

- [[修复收据与有限修复轮次 repair receipt supportedFixes]] — 不懂【原子验证与交付门】，就做不了【修复收据与有限修复轮次】的「验证失败时返回稳定规则码、具体对象与测量证据」——不知道门里到底有 schema、布局、HTML/SVG、路由、标签到路由间距哪几项检查，就编不出对应的规则码与证据

## 出场

- AI 内参 260912 ｜ 《Archify》 ｜ https://github.com/tt-a1i/archify

## 别名

`atomic validation before delivery`

## 反链

- [[修复收据与有限修复轮次 repair receipt supportedFixes]]
- [[确定性编译 deterministic compilation]]
