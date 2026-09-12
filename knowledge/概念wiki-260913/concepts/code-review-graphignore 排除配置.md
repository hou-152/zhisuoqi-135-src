---
id: cm_b797f401
name: code-review-graphignore 排除配置
type: REPRESENTATIONAL
subject: Context Engineering
domain: context-engineering
learningStage: when-needed
verification: use
centrality: 0.045
depth: 4
origin: [context]
aliases: []
sources: 1
---

# code-review-graphignore 排除配置

> 放在仓库根目录的排除清单，让图谱索引跳过生成代码与第三方依赖等无关路径。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

跟 .gitignore 是同一个思路，只不过这次排除的对象是"不需要被 AI 理解和索引的代码"，比如自动生成的文件和第三方库，省得图谱做无用功。

## 原文 context

文中给出具体示例——"create a .code-review-graphignore file in your repository root"，可排除 generated/\*\*、\*.generated.ts、vendor/\*\*、node_modules/\*\* 等路径，避免图谱把生成代码、第三方依赖也纳入索引。

## 掌握证据（做到这些才算会）

- 能写出含 generated/**、node_modules/** 的排除文件
- 能说明生成代码为何不该进索引

## 验收问句

> 用 {{name}} 把 vendor 与生成代码排除出索引，怎么写？

## 先懂这些（前置 1）

- [[code-review-graph]] · **hard** — 排除清单只对图谱索引工具有意义，先懂其索引机制

## 相关

- [[code-review-graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Tree-sitter]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[持久化代码图谱 structural map graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16

## 出场

- Context Engineering ｜ 《用持久化代码图谱给 AI Review 精准上下文》 ｜ https://github.com/tirth8205/code-review-graph
## 反链

- [[code-review-graph]]
- [[Tree-sitter]]
- [[持久化代码图谱 structural map graph]]
