---
id: cm_b154f15f
name: 向上扩展与向外扩展
nameEn: scale-up / scale-out
type: CONCEPTUAL
subject: AI 内参 260912
domain: geo-infrastructure
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 1
origin: [neican]
aliases: ["scale-up / scale-out"]
sources: 1
---

# 向上扩展与向外扩展 · scale-up / scale-out

> 芯片先绑成紧耦合域，域内跑吃带宽的集合通信，域间才走通用网络

**领域** geo-infrastructure ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

向上扩展是把越多芯片绑成一个紧耦合域（NVL72 机架、TPU pod、Trainium UltraServer、Helios 机架都是域）；向外扩展是域与域之间走通用网络。分工固定：张量并行、MoE 专家路由这类吃带宽的集合通信必须留在域内，数据并行和流水线并行才跨域。这对概念承重，因为每家的机架规格、fabric 带宽、拓扑选择全部围绕把域做多大、用什么连展开，AMD 的核心缺口也正是只有盒子没有域。

## 原文 context

AI infrastructure uses both: bandwidth-hungry collectives (tensor parallelism, MoE expert routing) stay inside the scale-up domain; data parallelism and pipeline parallelism cross the scale-out fabric.

## 掌握证据（做到这些才算会）

- 能指出张量并行与数据并行分别属于哪个域
- 能举出文中一个 scale-up 域的实例

## 验收问句

> {{name}} 的分工原则是什么？

## 先懂这些（前置 1）

- [[硬件一致性对消息传递 cache-coherent fabric vs message-passing]] · **hard** — 不懂【硬件一致性对消息传递】（NVLink/NVSwitch 有远端 HBM 读写与一致性语义，ICI 无远程语义、多芯片操作全靠编译器显式集合通信），就做不了【向上扩展与向外扩展】里「哪些吃带宽的集合通信能放进紧耦合域、哪些只能走域间通用网络」的切分判断

## 出场

- AI 内参 260912 ｜ 《都承诺提供6GW的运维能力》 ｜ https://www.jacobpeake.com/ai-chip-architectures

## 别名

`scale-up / scale-out`

## 反链

- [[硬件一致性对消息传递 cache-coherent fabric vs message-passing]]
