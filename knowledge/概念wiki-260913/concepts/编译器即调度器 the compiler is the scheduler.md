---
id: cm_80f7b860
name: 编译器即调度器
nameEn: the compiler is the scheduler
type: CONCEPTUAL
subject: AI 内参 260912
domain: geo-infrastructure
learningStage: deep-dive
verification: judge
centrality: 0.144
depth: 0
origin: [neican]
aliases: ["the compiler is the scheduler"]
sources: 1
---

# 编译器即调度器 · the compiler is the scheduler

> 把每周期做什么搬进编译器：无乱序、无预测、无动态调度，省下的硅面积换成更多乘加单元。

**领域** geo-infrastructure ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.144

## 费曼一下

把下一步做什么的决定权从硬件整体搬进编译器：VLIW 每周期八个功能槽由编译器提前填满，无乱序、无预测、无动态调度。它解决了硬件 second-guess 浪费硅的问题，也定义了这些芯片的软肋——负载必须静态可预测。TPU 编译器排一颗芯片，Groq 编译器排一整个系统（连网络都排），Trainium 干脆共用同一个编译器；代价被作者点破：XLA 不手调就更接近理论上限，但关掉剩下的差距也更难。

## 原文 context

There is no instruction cache miss, no warp scheduler, no out-of-order engine, no branch predictor: the compiler is the scheduler, and the silicon area saved is spent on more MACs.

the compiler is the scheduler, the torus is the topology, and the optical switch is the universal reconfigurable substrate

## 掌握证据（做到这些才算会）

- 能说出 VLIW 每周期八个功能槽由编译器提前填满，硬件不 second-guess
- 能对比 TPU 编译器排一颗芯片、Groq 排整个系统、Trainium 共用同一编译器的差异

## 验收问句

> {{name}} 之下负载必须满足什么前提？

## 懂了它才能懂（解锁 2）

- [[数据流执行 dataflow, wavelet]] — 不懂【编译器即调度器】，就做不了【数据流执行】里「核不取指令等活、数据到达即触发绑定任务」的排程——绑定关系与触发条件必须在编译期就定死，运行时没有取指与动态调度可依靠
- [[功能切片]] — 不懂【编译器即调度器】，就做不了【功能切片】里「控制、向量、矩阵、搬移、存储各成一列、数据横穿切片如流水线工件」的跨列搬运与节拍安排——列间数据流与同步全靠编译期静态排程，运行时不替你兜底

## 出场

- AI 内参 260912 ｜ 《都承诺提供6GW的运维能力》 ｜ https://www.jacobpeake.com/ai-chip-architectures

## 别名

`the compiler is the scheduler`

## 反链

- [[功能切片]]
- [[数据流执行 dataflow, wavelet]]
