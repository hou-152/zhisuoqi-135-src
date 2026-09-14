---
id: cm_a0acd706
name: 脉动阵列与权重驻留
nameEn: systolic array, weight-stationary
type: CONCEPTUAL
subject: AI 内参 260912
domain: geo-infrastructure
learningStage: deep-dive
verification: judge
centrality: 0.144
depth: 2
origin: [neican]
aliases: ["systolic array, weight-stationary"]
sources: 1
---

# 脉动阵列与权重驻留 · systolic array, weight-stationary

> 乘加网格中权重预先驻留不动、激活流过，数据复用焊进导线省掉访存

**领域** geo-infrastructure ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.144

## 费曼一下

脉动阵列是一张乘加单元网格：权重一格一个预先驻进阵列不动（即权重驻留），激活从边缘一格格流过，部分和向下流进累加队列——数据一旦进阵列就不再访存，数据复用被焊进导线而不是靠缓存仲裁。它解决了访存比乘法贵 100–1000 倍这个成本结构问题。代价是 underfill（形状不合就浪费硅，256×256 阵列跑 128×128 浪费 75%），靠 XLA 按 128/256 的倍数切块补齐。拿掉它就看不懂 TPU、Trainium 为什么没缓存也没关系，也看不懂 SparseCore/CAE 为什么存在（阵列形状不对的负载旁路掉）。

## 原文 context

matrix B's values are pre-loaded one weight per cell: ***weight-stationary*** dataflow, the choice that distinguishes TPUs from output-stationary arrays elsewhere.

The dominant cost in computing is not the multiplication itself (a few picojoules) but reading and writing memory at 100–1000× more energy per access; the systolic array deletes that cost by construction.

## 掌握证据（做到这些才算会）

- 能说出权重驻留与输出驻留的差别
- 能解释 underfill 的成因与按 128/256 切块补齐的办法

## 验收问句

> {{name}} 主要解决的是哪种成本结构问题？

## 先懂这些（前置 2）

- [[软件管理暂存器 software-managed scratchpad，no caches]] · **hard** — 不懂【软件管理暂存器】（显式寻址、无预取无逐出无一致性的片上 SRAM，位置由编译器钉死），就做不了【脉动阵列与权重驻留】里「权重预先驻留不动、激活流过」的那套数据复用布局——没有可被编译器钉住的 SRAM，权重驻留就无处落地
- [[GEMM 与 GEMV]] · **soft** — 不懂【GEMM 与 GEMV】（训练与预填充是矩阵乘矩阵、计算密集，解码退化成矩阵乘向量、带宽受限），就做不了【脉动阵列与权重驻留】里阵列形状与驻留策略的取舍——是按计算密集的 GEMM 堆乘加，还是按带宽受限的 GEMV 省访存，判据正来自这里

## 出场

- AI 内参 260912 ｜ 《都承诺提供6GW的运维能力》 ｜ https://www.jacobpeake.com/ai-chip-architectures

## 别名

`systolic array, weight-stationary`

## 反链

- [[软件管理暂存器 software-managed scratchpad，no caches]]
- [[GEMM 与 GEMV]]
