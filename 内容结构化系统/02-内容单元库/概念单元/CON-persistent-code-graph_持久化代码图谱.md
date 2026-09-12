---
id: CON-persistent-code-graph
type: 概念单元
title: "持久化代码图谱"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "持久化代码图谱"
  - "Persistent Code Graph"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "跨任务保存并持续更新代码实体及其调用、导入、继承与测试关系的结构化图谱，可供 Agent 按需查询代码库结构。"
concept_function: "解释「持久化代码图谱」是什么、边界在哪；分类：信息平时放在哪里（需要时再学）"
relationships:
  - type: 回应
    target: CON-just-in-time-retrieval
    note: "原 kind=used-with｜Agent 可先查询图谱，再按需读取真正相关的文件与结构信息。"
  - type: 冲突
    target: CON-memory
    note: "原 kind=contrast｜持久化代码图谱保存可查询的代码结构关系，Memory 是更广义的跨步骤或跨会话信息层。"
  - type: 回应
    target: CON-model-context-protocol
    note: "原 kind=used-with｜来源通过 MCP 工具把图谱查询能力暴露给 Claude。"
---

## 核心内容

**定义（remember）**：跨任务保存并持续更新代码实体及其调用、导入、继承与测试关系的结构化图谱，可供 Agent 按需查询代码库结构。

**费曼一下**：不是每次都临时给代码拍一张快照，而是造一张一直存在、可以反复查阅、还会自己更新的"代码关系网地图"。

**边界（明确不成立的用法）**
- 它不是一次任务临时生成的代码摘要，也不等同于只按文本相似度检索代码片段。
- 图谱是否可用取决于解析覆盖、更新及时性与关系正确性；持久化不自动保证新鲜。
- 当前证据缺口：需要更多实现来源比较图谱更新漂移、动态语言解析与跨仓库扩展性。

**迁移问题**：如果图谱查询很快但落后主分支三天，Agent 应如何判断它还能用于影响分析还是必须重建？

**分类问题**：哪些信息会被保留，任务进度又记在哪里？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/persistent-code-graph.yaml`（name_en: Persistent Code Graph）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《用持久化代码图谱给 AI Review 精准上下文》：逐字定义持久化代码图谱所映射的代码实体与关系，并说明它可跨任务查询和增量更新。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-just-in-time-retrieval]] —— 原 kind=used-with｜Agent 可先查询图谱，再按需读取真正相关的文件与结构信息。
- [冲突] [[CON-memory]] —— 原 kind=contrast｜持久化代码图谱保存可查询的代码结构关系，Memory 是更广义的跨步骤或跨会话信息层。
- [回应] [[CON-model-context-protocol]] —— 原 kind=used-with｜来源通过 MCP 工具把图谱查询能力暴露给 Claude。
- [[CON-just-in-time-retrieval_即时检索]]
- [[CON-memory_记忆]]
- [[CON-model-context-protocol_模型上下文协议]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
