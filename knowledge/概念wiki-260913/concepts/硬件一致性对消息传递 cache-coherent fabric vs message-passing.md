---
id: cm_fd92ca19
name: 硬件一致性对消息传递
nameEn: cache-coherent fabric vs message-passing
type: CONCEPTUAL
subject: AI 内参 260912
domain: geo-infrastructure
learningStage: deep-dive
verification: judge
centrality: 0.089
depth: 0
origin: [neican]
aliases: ["cache-coherent fabric vs message-passing"]
sources: 1
---

# 硬件一致性对消息传递 · cache-coherent fabric vs message-passing

> NVLink/NVSwitch 用硬件做远端 HBM 读写与一致性；ICI 无远程语义，多芯片操作全靠编译器显式集合通信。

**领域** geo-infrastructure ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 费曼一下

NVLink/NVSwitch 是缓存一致的——一块卡上的读写可以直接瞄准另一块卡的 HBM，地址转换和一致性硬件管；谷歌 ICI 是消息传递——没有远程读写语义、没有一致性、没有交叉开关，多芯片操作全是编译器写明的显式集合通信。这对对照承重：它决定了编程模型（把远端内存当本地用，还是把通信当指令写），也解释了 Trainium 的 NeuronLink 为什么精神上更近 ICI 而非 NVSwitch，以及 Groq 为什么连远端操作数都不是被加载、而是被排程到准时到达。

## 原文 context

so a load or store on one GPU can target another GPU's HBM with the hardware handling address translation and coherence.

There is no remote-load semantics, no cache coherence, no crossbar.

## 掌握证据（做到这些才算会）

- 能说出 NVSwitch 一侧的 load/store 可直接瞄准另一卡的 HBM，地址转换与一致性由硬件处理
- 能指出 ICI 没有远程读写语义、没有缓存一致性、没有交叉开关，并据此把 NeuronLink 归到 ICI 一侧

## 验收问句

> {{name}} 这两种阵营的编程模型差别在哪？

## 懂了它才能懂（解锁 1）

- [[向上扩展与向外扩展 scale-up scale-out]] — 不懂【硬件一致性对消息传递】（NVLink/NVSwitch 有远端 HBM 读写与一致性语义，ICI 无远程语义、多芯片操作全靠编译器显式集合通信），就做不了【向上扩展与向外扩展】里「哪些吃带宽的集合通信能放进紧耦合域、哪些只能走域间通用网络」的切分判断

## 出场

- AI 内参 260912 ｜ 《都承诺提供6GW的运维能力》 ｜ https://www.jacobpeake.com/ai-chip-architectures

## 别名

`cache-coherent fabric vs message-passing`

## 反链

- [[向上扩展与向外扩展 scale-up scale-out]]
