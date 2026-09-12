---
id: cm_d854798b
name: U 型性能曲线
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.045
depth: 1
origin: [context]
aliases: []
sources: 1
---

# U 型性能曲线

> 相关信息的位置与任务准确率呈 U 形：首尾高、中间低，在多种模型与任务上反复出现。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

成绩单画成一条曲线，开头一个高点，结尾一个高点，中间是个坑。位置变了，能力就变了，这条曲线就是证据。

## 原文 context

把相关信息的位置作为横轴、任务准确率作为纵轴画出的曲线呈 U 形——两端高、中间低。它在多文档问答、合成键值检索、基座模型、指令模型、GPT-4 乃至超出训练长度的编码器-解码器模型上反复出现。

## 掌握证据（做到这些才算会）

- 能画出位置-准确率的曲线形状
- 能据此把关键信息放在上下文首尾

## 验收问句

> 长上下文里关键信息放中间会怎样，{{name}} 告诉你该怎么摆放？

## 先懂这些（前置 1）

- [[tokens]] · **soft** — 位置效应发生在 token 序列上，懂 token 更易理解首尾高中间低。

## 相关

- [[近因偏置 recency bias]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[多文档问答受控实验]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[干扰文档 distractor documents]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[闭卷与 oracle 基线]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[合成键值检索任务]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[扩展上下文模型 extended-context models]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[查询感知语境化 query-aware contextualization]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[检索器-阅读器配置 retriever-reader]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[性能饱和早于召回饱和]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[重排序与排序列表截断]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[序列位置效应 serial-position effect]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[长上下文评测协议]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[首因偏置 primacy bias]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[迷失在中间 lost in the middle]] · 同篇出现（co-occurrence） — 同篇出现：context-02

## 出场

- Context Engineering ｜ 《经典论文《迷失在中间》：位置决定了模型能不能真的用上信息》 ｜ https://arxiv.org/pdf/2307.03172
## 反链

- [[tokens]]
- [[多文档问答受控实验]]
- [[序列位置效应 serial-position effect]]
- [[长上下文评测协议]]
- [[迷失在中间 lost in the middle]]
- [[闭卷与 oracle 基线]]
- [[合成键值检索任务]]
- [[首因偏置 primacy bias]]
- [[性能饱和早于召回饱和]]
- [[重排序与排序列表截断]]
- [[查询感知语境化 query-aware contextualization]]
- [[干扰文档 distractor documents]]
- [[检索器-阅读器配置 retriever-reader]]
- [[近因偏置 recency bias]]
- [[扩展上下文模型 extended-context models]]
