---
id: cm_062e1f08
name: 勒雷奇点倒计时技巧
nameEn: Leray's countdown trick
type: CONCEPTUAL
subject: AI 内参 260912
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 0
origin: [neican]
aliases: ["Leray's countdown trick"]
sources: 1
---

# 勒雷奇点倒计时技巧 · Leray's countdown trick

> 令 τ=1−t 把时间反向、让奇点成为倒计时终点的变量替换，勒雷 1934 年首创。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

指让时间反向流动的数学变量替换（令 $\tau = 1-t$），将爆破奇点设为倒计时终点的方法。该技巧最早由勒雷在 1934 年奠基性论文中使用，其导数为负（$d\tau = -dt$），在纯无耗散系统中可利用对称性推导，但在不可逆系统中不能随意倒置。

## 原文 context

The AI uses the definition tau = (1-t) and describes it as a countdown to a singularity. Jean Leray first did this ‘trick’ in his foundational 1934 paper on fluid dynamics.

## 掌握证据（做到这些才算会）

- 能写出 τ=1−t 及其导数 dτ=−dt
- 能指出该技巧只在无耗散的对称系统中可用

## 验收问句

> {{name}}里的 τ=1−t 为什么导数为负？

## 懂了它才能懂（解锁 1）

- [[有限时间爆破失效 Invalidation of finite time blowup]] — 不懂【勒雷奇点倒计时技巧】里 τ=1−t 的变量替换及其时间反演含义，就做不了【有限时间爆破失效】的判断——即看不出 AI 写成 dτ=−dt 后，有限时间爆破的证明为什么在欧拉与纳维-斯托克斯方程上都不再成立

## 出场

- AI 内参 260912 ｜ 《“深奥的定理曾经稀少且晦涩，因此成为识别深刻思想的有效机制。人工智能打破了这一体系。”》 ｜ https://terrytao.wordpress.com/2026/09/13/deep-theorems-were-scarce-and-difficult-and-so-became-an-effective-mechanism-to-identify-deep-thought-ai-has-broken-this-system/?utm_source=tldrai

## 别名

`Leray's countdown trick`

## 反链

- [[有限时间爆破失效 Invalidation of finite time blowup]]
