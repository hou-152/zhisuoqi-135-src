---
id: cm_fa6a41e8
name: 多语言结构化解析
nameEn: 12 languages / node type mappings
type: PROCEDURAL
subject: Context Engineering
domain: code-engineering
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: ["12 languages / node type mappings"]
sources: 1
---

# 多语言结构化解析 · 12 languages / node type mappings

> 支持 12 种语言的结构化解析；扩展新语言需改 parser.py，加扩展名并补齐各类 node type 映射。

**领域** code-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

这个工具不是只认一种语言，而是给每种语言都配了一份"翻译词典"（哪种语法结构算类、哪种算函数、哪种算调用），想让它认识一门新语言，本质上就是往词典里加词条。

## 原文 context

特性表列出支持的 12 种语言——"Python, TypeScript, JavaScript, Go, Rust, Java, C#, Ruby, Kotlin, Swift, PHP, C/C++"；贡献指南里说明扩展新语言的具体路径——编辑 parser.py，把扩展名加入 EXTENSION_TO_LANGUAGE，并在 \_CLASS_TYPES、\_FUNCTION_TYPES、\_IMPORT_TYPES、\_CALL_TYPES 中补充对应的 node type 映射。

## 掌握证据（做到这些才算会）

- 能列出支持的 12 种语言
- 能按贡献指南为一门新语言补全映射表

## 验收问句

> 给 {{name}} 加一门新语言，要改哪些地方？

## 相关

- [[code-review-graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Tree-sitter]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[持久化代码图谱 structural map graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16

## 出场

- Context Engineering ｜ 《用持久化代码图谱给 AI Review 精准上下文》 ｜ https://github.com/tirth8205/code-review-graph

## 别名

`12 languages / node type mappings`

## 反链

- [[code-review-graph]]
- [[Tree-sitter]]
- [[持久化代码图谱 structural map graph]]
