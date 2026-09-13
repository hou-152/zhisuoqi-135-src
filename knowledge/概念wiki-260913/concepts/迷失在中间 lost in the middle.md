---
id: cm_53822d1c
name: 迷失在中间
nameEn: lost in the middle
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.179
depth: 0
origin: [context, harness]
aliases: ["lost in the middle", "Lost in the Middle"]
sources: 4
---

# 迷失在中间 · lost in the middle

> 当模型必须访问并使用位于长输入上下文中间的信息时，性能显著劣化的现象。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.179

## 费曼一下

把一份关键资料夹在一沓材料的正中间递给模型，它大概率会"看漏"。不是资料没进去，是进去了却没被用上。

## 原文 context

论文标题所命名的现象——当模型必须访问和使用位于长输入上下文中间的信息时，性能显著劣化。它是全文所有实验共同指向的那个结论，也是 context engineering 语境下被引用最多的一个说法。

## 掌握证据（做到这些才算会）

- 能把关键信息放在窗口首尾来对比效果差异
- 排查 Agent 失败时优先怀疑中间信息被忽略

## 验收问句

> 关键信息落在窗口中间时，{{name}} 会怎么表现？

## 懂了它才能懂（解锁 2）

- [[复述（recitation）与 lost-in-the-middle]] — 不懂【迷失在中间】，就做不了【复述（recitation）与 lost-in-the-middle】的把目标复述到上下文末尾的策略
- [[查询感知语境化 query-aware contextualization]] — 不懂【迷失在中间】，就做不了【查询感知语境化】的「为什么把查询同时放在数据前后能避免中段被忽略」的机制设计。

## 相关

- [[近因偏置 recency bias]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[干扰文档 distractor documents]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[扩展上下文模型 extended-context models]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[查询感知语境化 query-aware contextualization]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[检索器-阅读器配置 retriever-reader]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[性能饱和早于召回饱和]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[重排序与排序列表截断]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[序列位置效应 serial-position effect]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[闭卷与 oracle 基线]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[合成键值检索任务]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[多文档问答受控实验]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[长上下文评测协议]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[首因偏置 primacy bias]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[U 型性能曲线]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[Agent vs Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[非模型架构 Non-model Architecture]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[上下文腐烂 Context Rot]] · 对照（概念边界） — 前者是更广的长度相关退化，后者是位置效应。
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-13

## 出场

- Context Engineering ｜ 《经典论文《迷失在中间》：位置决定了模型能不能真的用上信息》 ｜ https://arxiv.org/pdf/2307.03172
- Context Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- Harness Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- Harness Engineering ｜ 《The Anatomy of an Agent Harness》 ｜ https://x.com/akshay_pachaar/status/2041146899319971922

## 别名

`lost in the middle`、`Lost in the Middle`

## 反链

- [[Agent vs Harness]]
- [[上下文腐烂 Context Rot]]
- [[非模型架构 Non-model Architecture]]
- [[AI Agent]]
- [[检索器-阅读器配置 retriever-reader]]
- [[查询感知语境化 query-aware contextualization]]
- [[多文档问答受控实验]]
- [[复述（recitation）与 lost-in-the-middle]]
- [[干扰文档 distractor documents]]
- [[近因偏置 recency bias]]
- [[性能饱和早于召回饱和]]
- [[长上下文评测协议]]
- [[重排序与排序列表截断]]
- [[U 型性能曲线]]
- [[闭卷与 oracle 基线]]
- [[合成键值检索任务]]
- [[扩展上下文模型 extended-context models]]
- [[首因偏置 primacy bias]]
- [[序列位置效应 serial-position effect]]
