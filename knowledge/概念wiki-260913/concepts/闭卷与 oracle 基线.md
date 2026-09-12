---
id: cm_75642cd0
name: 闭卷与 oracle 基线
type: CONCEPTUAL
subject: Context Engineering
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [context]
aliases: []
sources: 1
---

# 闭卷与 oracle 基线

> 用不给任何文档与只给含答案文档两条参照线，为成绩定位的评测设定。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

一个是"不给资料能考多少分"，一个是"只给标准答案那页能考多少分"。中间位置的成绩跌破闭卷线，意味着给资料反而帮了倒忙。

## 原文 context

两条用来给成绩定位的参照线。闭卷指不给任何文档、只靠参数记忆作答；oracle 指只给那一篇含答案的文档。GPT-3.5-Turbo 的两条线分别是 56.1% 与 88.3%。

## 掌握证据（做到这些才算会）

- 能说明闭卷与 oracle 各给模型什么信息
- 能用两线差距判断是缺知识还是缺检索利用

## 验收问句

> {{name}} 中 oracle 高而闭卷低说明缺什么能力？

## 相关

- [[多文档问答受控实验]] · related-to（audit） — 闭卷/ oracle 是通用评测定位概念，oracle（给正确文档作上界）不特指多文档实验；该实验只是其中一个使用场景。
- [[首因偏置 primacy bias]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[U 型性能曲线]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[迷失在中间 lost in the middle]] · 同篇出现（co-occurrence） — 同篇出现：context-02

## 出场

- Context Engineering ｜ 《经典论文《迷失在中间》：位置决定了模型能不能真的用上信息》 ｜ https://arxiv.org/pdf/2307.03172
## 反链

- [[迷失在中间 lost in the middle]]
- [[多文档问答受控实验]]
- [[首因偏置 primacy bias]]
- [[U 型性能曲线]]
