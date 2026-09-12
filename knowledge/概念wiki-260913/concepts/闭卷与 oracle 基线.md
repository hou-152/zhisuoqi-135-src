---
id: cm_75642cd0
name: 闭卷与 oracle 基线
type: CONCEPTUAL
subject: Context Engineering
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.045
depth: 2
origin: [context]
aliases: []
sources: 1
---

# 闭卷与 oracle 基线

> 给成绩定位的两条参照线：闭卷只靠参数记忆作答，oracle 只给含答案的那一篇文档。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

一个是"不给资料能考多少分"，一个是"只给标准答案那页能考多少分"。中间位置的成绩跌破闭卷线，意味着给资料反而帮了倒忙。

## 原文 context

两条用来给成绩定位的参照线。闭卷指不给任何文档、只靠参数记忆作答；oracle 指只给那一篇含答案的文档。GPT-3.5-Turbo 的两条线分别是 56.1% 与 88.3%。

## 掌握证据（做到这些才算会）

- 能说出闭卷与 oracle 各自提供了什么信息
- 能引用 GPT-3.5-Turbo 的 56.1% 与 88.3% 两条线

## 验收问句

> {{name}}中两条线各代表什么条件下的成绩？

## 先懂这些（前置 1）

- [[多文档问答受控实验]] · **soft** — oracle 那条基线就是“只给含答案那篇”的极端受控长上下文设置。

## 相关

- [[U 型性能曲线]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[首因偏置 primacy bias]] · 同篇出现（co-occurrence） — 同篇出现：context-02
- [[迷失在中间 lost in the middle]] · 同篇出现（co-occurrence） — 同篇出现：context-02

## 出场

- Context Engineering ｜ 《经典论文《迷失在中间》：位置决定了模型能不能真的用上信息》 ｜ https://arxiv.org/pdf/2307.03172
## 反链

- [[多文档问答受控实验]]
- [[迷失在中间 lost in the middle]]
- [[首因偏置 primacy bias]]
- [[U 型性能曲线]]
