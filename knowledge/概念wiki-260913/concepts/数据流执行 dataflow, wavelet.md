---
id: cm_c21c5190
name: 数据流执行
nameEn: dataflow, wavelet
type: CONCEPTUAL
subject: AI 内参 260912
domain: geo-infrastructure
learningStage: deep-dive
verification: judge
centrality: 0.089
depth: 1
origin: [neican]
aliases: ["dataflow, wavelet"]
sources: 1
---

# 数据流执行 · dataflow, wavelet

> 核不取指令等活，等数据（wavelet）到达即触发绑定任务，用到达而非时钟排程，跳零免费。

**领域** geo-infrastructure ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 费曼一下

数据流执行指核不取指令等活干，而是等数据（wavelet）到达才触发绑定的处理任务，八个微线程按操作数到达逐周期切换；指令的操作数就是张量描述符（DSR），一条指令对着到来的流一直算到张量尽头。它给出了谁排程这个问题的另一半答案——不用时钟排程，用到达排程。跳零因此免费（零不触发任何计算），这是 Cerebras 稀疏故事的来源；而与 Groq 的对照（WSE 对数据做反应、LPU 按时钟准时）是全文最有辨识度的架构对照之一。

## 原文 context

No warps, no warp schedulers, no caches to miss, no reorder buffer: *the arrival of data is the schedule*.

each holding a tensor descriptor: base address, extent, and stride, up to four dimensions.

## 掌握证据（做到这些才算会）

- 能说明操作数即张量描述符（基址、extent、stride，最多四维），一条指令对着到来的流一直算到张量尽头
- 能把 WSE 对数据做反应与 LPU 按时钟准时作为一对架构对照讲清

## 验收问句

> {{name}} 里究竟是谁在排程？

## 先懂这些（前置 1）

- [[编译器即调度器 the compiler is the scheduler]] · **hard** — 不懂【编译器即调度器】，就做不了【数据流执行】里「核不取指令等活、数据到达即触发绑定任务」的排程——绑定关系与触发条件必须在编译期就定死，运行时没有取指与动态调度可依靠

## 出场

- AI 内参 260912 ｜ 《都承诺提供6GW的运维能力》 ｜ https://www.jacobpeake.com/ai-chip-architectures

## 别名

`dataflow, wavelet`

## 反链

- [[编译器即调度器 the compiler is the scheduler]]
