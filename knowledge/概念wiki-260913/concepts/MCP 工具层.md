---
id: cm_433754e0
name: MCP 工具层
type: REPRESENTATIONAL
subject: Context Engineering
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.072
depth: 2
origin: [context]
aliases: []
sources: 1
---

# MCP 工具层

> 图谱建好后，Claude 通过 build/query/semantic search/list stats/get docs 等八个 MCP 工具自动与图谱交互。

**领域** tools-sandbox ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

图谱本身只是一堆数据，MCP 工具层就是把这些数据包装成 Claude 能直接调用的"接口菜单"，Claude 不需要理解图谱内部结构，只要按需调用对应工具就能拿到答案。

## 原文 context

图谱建好后，Claude 通过一组 MCP 工具自动与图谱交互——"Claude uses these automatically once the graph is built"，包括 build_or_update_graph_tool、query_graph_tool（callers、callees、tests、imports、inheritance 查询）、semantic_search_nodes_tool、list_graph_stats_tool、get_docs_section_tool 等八个工具；CLI 里也有对应的 install（"Register MCP server with Claude Code"）和 serve（"Start MCP server"）命令。

## 掌握证据（做到这些才算会）

- 能列出至少三个 MCP 工具名及其用途
- 能说明 install 与 serve 两条 CLI 命令的分工

## 验收问句

> 你能说出 {{name}} 里 query_graph_tool 能查哪几类关系吗？

## 先懂这些（前置 1）

- [[MCP Model Context Protocol]] · **hard** — 不懂【MCP】，就做不了【MCP 工具层】的八个工具接入与调用

## 相关

- [[持久化代码图谱 structural map graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[code-review-graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Tree-sitter]] · 同篇出现（co-occurrence） — 同篇出现：context-16

## 出场

- Context Engineering ｜ 《用持久化代码图谱给 AI Review 精准上下文》 ｜ https://github.com/tirth8205/code-review-graph
## 反链

- [[MCP Model Context Protocol]]
- [[持久化代码图谱 structural map graph]]
- [[code-review-graph]]
- [[Tree-sitter]]
