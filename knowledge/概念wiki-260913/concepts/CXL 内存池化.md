---
id: cm_bf8b94c6
name: CXL 内存池化
type: REPRESENTATIONAL
subject: AI 概念库
domain: geo-infrastructure
learningStage: when-needed
verification: accept
centrality: 0.042
depth: 1
origin: [notion]
aliases: ["CXL Memory Pooling", "CXL Pool"]
sources: 1
---

# CXL 内存池化

> 用 CXL 把多台服务器内存聚成共享池，作为 GPU HBM、本地 DRAM 之后的第三级内存层。

**领域** geo-infrastructure ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.042

## 费曼一下

用 CXL（Compute Express Link）协议把多台机器的内存合成一个共享池，让超大 Engram 表跨机存放：

## 原文 context

> 答案是 CXL 内存池化。GPU HBM 放计算权重，本地 DRAM 做二级缓存，CXL 池做三级。8 台服务器共享 4TB 内存池，XConn XC50256 交换芯片做拓扑，512GB/s 带宽。

## 掌握证据（做到这些才算会）

- 能说出三级层次：HBM、本地 DRAM、CXL 池
- 能引用示例规模：8 台共享 4TB、512GB/s 带宽

## 验收问句

> {{name}} 在内存层级中排第几级、解决什么问题？

## 先懂这些（前置 1）

- [[数据中心]] · **hard** — CXL 内存池化是数据中心内服务器内存共享技术，离开数据中心便无场景。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/CXL-35c679b108ff83959a5901f40ae40082

## 别名

`CXL Memory Pooling`、`CXL Pool`

## 反链

- [[数据中心]]
