---
id: cm_b5f952be
name: 欧拉方程与纳维-斯托克斯的时间反演对称性
nameEn: Time reversibility: Euler vs. Navier-Stokes
type: CONCEPTUAL
subject: AI 内参 260912
domain: thinking-method
learningStage: now
verification: judge
centrality: 0.035
depth: 0
origin: [neican]
aliases: ["Time reversibility: Euler vs. Navier-Stokes"]
sources: 1
---

# 欧拉方程与纳维-斯托克斯的时间反演对称性 · Time reversibility: Euler vs. Navier-Stokes

> 欧拉方程零粘度、时间可逆；纳维-斯托克斯有粘性耗散，时间只有一个方向。

**领域** thinking-method ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.035

## 费曼一下

欧拉方程描述零粘度流体，能量守恒且时间正反向对称；而纳维-斯托克斯方程包含粘性阻尼，能量会自然耗散，像热力学熵增一样定义了时间的唯一箭头。作者以此指出，在有粘性耗散的系统中，时间反向的数学推演绝不等同于正向的物理真实。

## 原文 context

The Euler equations are time reversible. They are identical to the Navier-Stokes equations but have zero viscosity.

Navier-Stokes has viscosity, so it is not time reversible. Energy dissipates; this is like entropy defining the arrow of time.

## 掌握证据（做到这些才算会）

- 能说出两者唯一差别是粘度是否为零
- 能用能量耗散、熵增解释时间不可逆

## 验收问句

> {{name}}中是哪一项决定了时间不可逆？

## 出场

- AI 内参 260912 ｜ 《“深奥的定理曾经稀少且晦涩，因此成为识别深刻思想的有效机制。人工智能打破了这一体系。”》 ｜ https://terrytao.wordpress.com/2026/09/13/deep-theorems-were-scarce-and-difficult-and-so-became-an-effective-mechanism-to-identify-deep-thought-ai-has-broken-this-system/?utm_source=tldrai

## 别名

`Time reversibility: Euler vs. Navier-Stokes`
