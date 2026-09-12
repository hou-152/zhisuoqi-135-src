---
id: cm_a75270b6
name: 首因偏置
nameEn: primacy bias
type: CONCEPTUAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.042
depth: 2
origin: [context]
aliases: ["primacy bias"]
sources: 1
---

# 首因偏置 · primacy bias

> 模型更善用出现在上下文最开头的相关信息，呈 U 型曲线左半边，且只在大模型上出现。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

开头说的话最容易被记住。对模型而言，放在 prompt 最前面的材料享有一种天然优待。

## 原文 context

U 型曲线的左半边——模型更善于使用出现在输入上下文最开头的相关信息。作者发现它只在足够大的模型上出现（Llama-2 的 13B 与 70B 有，7B 没有）。

## 掌握证据（做到这些才算会）

- 能说明信息位置对使用效果的影响方向
- 能指出该效应在 7B 模型上不出现

## 验收问句

> 关键信息放开头还是中间，{{name}} 怎么预测？

## 先懂这些（前置 1）

- [[序列位置效应 serial-position effect]] · **hard** — 首因偏置正是序列位置效应 U 型曲线的左半边，不懂该效应就无法理解它。

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
- [[U 型性能曲线]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[迷失在中间 lost in the middle]] · 同篇出现（co-occurrence） — 同篇出现：context-02

## 出场

- Context Engineering ｜ 《经典论文《迷失在中间》：位置决定了模型能不能真的用上信息》 ｜ https://arxiv.org/pdf/2307.03172

## 别名

`primacy bias`

## 反链

- [[序列位置效应 serial-position effect]]
- [[迷失在中间 lost in the middle]]
- [[多文档问答受控实验]]
- [[长上下文评测协议]]
- [[闭卷与 oracle 基线]]
- [[合成键值检索任务]]
- [[性能饱和早于召回饱和]]
- [[重排序与排序列表截断]]
- [[U 型性能曲线]]
- [[查询感知语境化 query-aware contextualization]]
- [[干扰文档 distractor documents]]
- [[检索器-阅读器配置 retriever-reader]]
- [[近因偏置 recency bias]]
- [[扩展上下文模型 extended-context models]]
