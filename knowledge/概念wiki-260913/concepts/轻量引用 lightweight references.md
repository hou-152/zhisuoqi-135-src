---
id: cm_d8aa34b6
name: 轻量引用
nameEn: lightweight references
type: PROCEDURAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: ["lightweight references"]
sources: 1
---

# 轻量引用 · lightweight references

> 大块信息存外部，模型窗口只暴露简短引用，需要时再取回。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

桌上只放索引卡，资料放柜子里。要用哪份再去取，桌面不会被淹。

## 原文 context

上下文隔离常用的配套手法：大块信息存在外部，模型窗口里只暴露简短引用。HuggingFace 的 CodeAgent 采用沙箱方案，庞大输出存沙箱、需要时才取回；schema 化状态对象同理，文件与日志留在外部存储，只上浮选定字段。两者都在降低 token 开销的同时保留对完整上下文的可达性。

## 掌握证据（做到这些才算会）

- 能把庞大输出存进沙箱，只在窗口里留一个引用
- 能用 schema 化状态对象只上浮选定字段，而不是整份文件与日志

## 验收问句

> 你会怎么用{{name}}压掉这段上下文的 token？

## 相关

- [[熵减 entropy reduction]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[上下文 context]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-01

## 出场

- Context Engineering ｜ 《论文《上下文工程 2.0》：给这门手艺补上它自己的上下文》 ｜ https://arxiv.org/pdf/2510.26493

## 别名

`lightweight references`

## 反链

- [[上下文工程 context engineering]]
- [[上下文 context]]
- [[熵减 entropy reduction]]
