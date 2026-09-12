---
id: cm_fa6a41e8
name: 多语言结构化解析
nameEn: 12 languages / node type mappings
type: PROCEDURAL
subject: Context Engineering
domain: code-engineering
learningStage: when-needed
verification: compute
centrality: 0.017
depth: 0
origin: [context]
aliases: ["12 languages / node type mappings"]
sources: 1
---

# 多语言结构化解析 · 12 languages / node type mappings

> 解析器支持 12 种语言的 node type 映射；新增语言需改 parser.py 的扩展名注册与各类型映射表。

**领域** code-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.017

## 费曼一下

这个工具不是只认一种语言，而是给每种语言都配了一份"翻译词典"（哪种语法结构算类、哪种算函数、哪种算调用），想让它认识一门新语言，本质上就是往词典里加词条。

## 原文 context

特性表列出支持的 12 种语言——"Python, TypeScript, JavaScript, Go, Rust, Java, C#, Ruby, Kotlin, Swift, PHP, C/C++"；贡献指南里说明扩展新语言的具体路径——编辑 parser.py，把扩展名加入 EXTENSION_TO_LANGUAGE，并在 \_CLASS_TYPES、\_FUNCTION_TYPES、\_IMPORT_TYPES、\_CALL_TYPES 中补充对应的 node type 映射。

## 掌握证据（做到这些才算会）

- 能说出 12 种语言中的多种及其扩展名注册位置
- 能按贡献指南为新语言补上 node type 映射并跑通解析

## 验收问句

> 你能否为 {{name}} 新增一门语言并跑通解析？

## 相关

- [[code-review-graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Tree-sitter]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[持久化代码图谱 structural map graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16

## 出场

- Context Engineering ｜ 《用持久化代码图谱给 AI Review 精准上下文》 ｜ https://github.com/tirth8205/code-review-graph

## 别名

`12 languages / node type mappings`

## 反链

- [[持久化代码图谱 structural map graph]]
- [[code-review-graph]]
- [[Tree-sitter]]
