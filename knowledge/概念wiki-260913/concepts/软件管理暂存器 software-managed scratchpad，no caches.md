---
id: cm_e0304491
name: 软件管理暂存器
nameEn: software-managed scratchpad，no caches
type: CONCEPTUAL
subject: AI 内参 260912
domain: geo-infrastructure
learningStage: deep-dive
verification: judge
centrality: 0.144
depth: 0
origin: [neican]
aliases: ["software-managed scratchpad，no caches"]
sources: 1
---

# 软件管理暂存器 · software-managed scratchpad，no caches

> 显式寻址的片上 SRAM（VMEM/SBUF/MEM），无预取无逐出无一致性，位置全靠编译器钉死。

**领域** geo-infrastructure ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.144

## 费曼一下

暂存器是显式寻址的片上 SRAM（TPU 的 VMEM/CMEM、Trainium 的 SBUF/PSUM、Groq 的 MEM、Cerebras 的核内 SRAM 同属此列）：没有预取、没有逐出、没有一致性硬件，每个张量在编译期就钉死在哪一层。它换来的硅面积变成更多乘加单元，付出的代价是全押编译器——排对了阵列永不停摆，排错了没有任何硬件兜底。这是理解非英伟达阵营软件栈为什么是编译器中心的物质基础。

## 原文 context

The hardware does no prefetching, no eviction, no coherence; when the compiler gets it right, the array never stalls; when it gets it wrong, there is no fallback path.

This is exactly Google's VMEM bet, an explicit scratchpad the compiler must schedule perfectly with no cache to paper over a mistake, and the opposite of NVIDIA's hardware-managed L2 and L1.

## 掌握证据（做到这些才算会）

- 能列出 VMEM、CMEM、SBUF/PSUM、Groq 的 MEM、Cerebras 核内 SRAM 属同一类
- 能说明排对则阵列永不停摆、排错没有任何硬件兜底，并解释这为何使软件栈变成编译器中心

## 验收问句

> {{name}} 把原本由缓存承担的责任交给了谁？

## 懂了它才能懂（解锁 2）

- [[脉动阵列与权重驻留 systolic array, weight-stationary]] — 不懂【软件管理暂存器】（显式寻址、无预取无逐出无一致性的片上 SRAM，位置由编译器钉死），就做不了【脉动阵列与权重驻留】里「权重预先驻留不动、激活流过」的那套数据复用布局——没有可被编译器钉住的 SRAM，权重驻留就无处落地
- [[权重流 weight streaming]] — 不懂【软件管理暂存器】，就做不了【权重流】里「激活常驻片上 SRAM、权重逐层从 MemoryX 流入」这件事——激活要长住不走，靠的正是无逐出、无一致性、由编译器指定位置的片上暂存器

## 出场

- AI 内参 260912 ｜ 《都承诺提供6GW的运维能力》 ｜ https://www.jacobpeake.com/ai-chip-architectures

## 别名

`software-managed scratchpad，no caches`

## 反链

- [[脉动阵列与权重驻留 systolic array, weight-stationary]]
- [[权重流 weight streaming]]
