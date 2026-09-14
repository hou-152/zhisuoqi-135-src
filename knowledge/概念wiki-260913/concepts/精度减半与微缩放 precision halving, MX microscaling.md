---
id: cm_cbb94801
name: 精度减半与微缩放
nameEn: precision halving, MX microscaling
type: CONCEPTUAL
subject: AI 内参 260912
domain: geo-infrastructure
learningStage: when-needed
verification: judge
centrality: 0.035
depth: 0
origin: [neican]
aliases: ["precision halving, MX microscaling"]
sources: 1
---

# 精度减半与微缩放 · precision halving, MX microscaling

> FP16→FP8→FP4 逐代位宽砍半，换约 2× 每瓦吞吐；用块级共享指数的 MX 微缩放找回精度。

**领域** geo-infrastructure ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.035

## 费曼一下

精度减半指 FP16→FP8→FP4 逐代把位数砍半，每砍一半换来约 2× 每瓦吞吐；微缩放是找回精度的手段——把共享指数做成块级（MX 格式），用更细粒度的缩放恢复低位宽丢掉的准确度，英伟达、AMD、TPU 用的是同一套开放格式。这个节拍承重有二：它是逐代性能曲线的引擎；它也反衬出 Cerebras 与 Groq 停在 16-bit 的张力——片上 SRAM 最稀缺、最需要 8-bit 省容量的机器，恰恰没拿到低精度数据通路（作者标为 open question）。

## 二、概念架构图

```mermaid
flowchart TB
    subgraph L1["负载与问题层"]
        GEMM["GEMM vs GEMV（负载形状）"]
        WALL["内存墙"]
        DSA["特定领域架构 DSA"]
    end
    subgraph L2["数据供给层"]
        SCRATCH["软件管理暂存器（无缓存）"]
        WEIGHT["权重流（激活驻留）"]
        PREC["精度减半 + 微缩放"]
    end
    subgraph L3["计算组织层"]
        SYSTOLIC["脉动阵列（权重驻留）"]
        DATAFLOW["数据流执行（到达即调度）"]
        SLICE["功能切片（空间流水线）"]
    end
    subgraph L4["互联与扩展层"]
        SCALE["scale-up / scale-out"]
        COH["硬件一致性 vs 消息传递"]
        OCS["光路交换 OCS"]
    end
    subgraph L5["调度哲学层"]
        COMPILER["编译器即调度器（VLIW）"]
        DET["确定性（连网络也排程）"]
    end
    GEMM -->|"把瓶颈逼到访存"| WALL
    DSA -->|"早期在产范例：TPU v1"| SYSTOLIC
    WALL -->|"逼出"| SCRATCH
    WALL -->|"逼出"| WEIGHT
    SCRATCH -->|"供数"| SYSTOLIC
    COMPILER -->|"必须排准，无硬件兜底"| SCRATCH
    COMPILER -->|"极致化：从排一颗芯片到排一个系统"| DET
    DATAFLOW <-->|"互为倒置：到达 vs 时钟"| DET
    DATAFLOW -.->|"对照：不用矩阵单元，fabric 装配矩阵乘"| SYSTOLIC
    SLICE -->|"使排满每周期成为可能"| DET
    PREC -->|"省容量，缓解 SRAM-only 机器的稀缺"| WEIGHT
    SCALE -->|"向上扩展域的两种语法"| COH
    OCS -->|"按负载重构拓扑"| SCALE
    DET -->|"把片间网络纳入编译期排程"| SCALE
```

- 分层说明：负载与问题层是全文的出发点；数据供给层与计算组织层回答数据住哪、算什么；互联与扩展层回答芯片怎么连；调度哲学层是贯穿各层的分岔——交给编译器时刻表（TPU/Trainium/Groq），或交给数据到达（Cerebras），或留在硬件 warp 层级（NVIDIA，对应图中未单列的缓存加线程藏延迟路线，与 SCRATCH/COMPILER 两节点相对）。仅画原文明确支持的关系。

## 原文 context

Every generation buys roughly 2× per-watt throughput by cutting bits in half and restoring accuracy with a finer-grained scaling scheme

(block-level shared exponents that recover most of the accuracy lost at FP4)

## 掌握证据（做到这些才算会）

- 能说出约 2× 每瓦吞吐与块级共享指数恢复 FP4 精度的对应关系
- 能指出 Cerebras 与 Groq 停在 16-bit，最需要省片上容量的机器反而没拿到低精度数据通路

## 验收问句

> {{name}} 用什么手段补回砍位宽丢掉的精度？

## 出场

- AI 内参 260912 ｜ 《都承诺提供6GW的运维能力》 ｜ https://www.jacobpeake.com/ai-chip-architectures

## 别名

`precision halving, MX microscaling`
