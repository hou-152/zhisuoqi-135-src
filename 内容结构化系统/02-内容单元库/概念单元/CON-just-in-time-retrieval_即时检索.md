---
id: CON-just-in-time-retrieval
type: 概念单元
title: "即时检索"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "即时检索"
  - "Just-in-Time Retrieval"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "即时检索让 Agent 平时只保留轻量引用，在任务需要时再查询外部信息，把相关部分送进当前 Context。"
concept_function: "解释「即时检索」是什么、边界在哪；分类：信息如何进入工作台（需要时再学）"
relationships:
  - type: 冲突
    target: CON-progressive-disclosure
    note: "原 kind=contrast｜JIT 强调取数时机；渐进披露强调逐层发现。"
  - type: 回应
    target: CON-context-window
    note: "原 kind=used-with｜Just-in-Time Retrieval 把 Context Window 当缓存，只在需要时加载详情。"
  - type: 解释
    target: CON-context-engineering
    note: "原 kind=part-of｜Just-in-Time Retrieval 是 Context Engineering 的生产策略之一。"
  - type: 回应
    target: CON-restorable-compression
    note: "原 kind=used-with（反向）｜保留下来的引用需要在运行时按需取回原内容。"
  - type: 回应
    target: CON-observation-masking
    note: "原 kind=used-with（反向）｜被移出窗口的旧观察可保留轻量线索，并在再次需要时按需取回。"
  - type: 回应
    target: CON-persistent-code-graph
    note: "原 kind=used-with（反向）｜Agent 可先查询图谱，再按需读取真正相关的文件与结构信息。"
---

## 核心内容

**定义（remember）**：即时检索让 Agent 平时只保留轻量引用，在任务需要时再查询外部信息，把相关部分送进当前 Context。

**费曼一下**：你不用把整座图书馆搬到书桌，只要先留下一张索书号清单。做到某一步发现需要某份材料时，再按索引去查，只把相关几页拿回来。这样桌面更轻，但也更依赖检索工具、索引和判断时机。

**边界（明确不成立的用法）**
- 即时检索不等于把所有可能相关资料预先塞进 Context；关键差别是按任务进展触发取回。
- 它不等于 Progressive Disclosure；即时检索是取数时机策略，渐进式披露是逐层发现信息的更广组织模式。
- 它也不等于普通 RAG 的唯一实现；预检索、即时探索与混合策略应按任务动态程度和延迟要求选择。
- 引用过期、工具误用、搜索死胡同或漏识别关键信息都会让按需检索失败。

**迁移问题**：当资料变化频繁且体量很大时，为什么“先存路径、需要时再局部读取”可能比启动时全部加载更稳？

**分类问题**：什么信息应在什么时候、以什么形式进入？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/just-in-time-retrieval.yaml`（name_en: Just-in-Time Retrieval）
- 源证据范围（卡片自述）：Anthropic 从 Agent 设计与 Claude Code 实践视角，描述只维护文件路径、已存查询或网页链接，并在运行时用工具动态加载数据的策略。来源也明确指出运行时探索更慢且依赖工具与启发式；本站不把它写成预检索的全面替代。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-progressive-disclosure]] —— 原 kind=contrast｜JIT 强调取数时机；渐进披露强调逐层发现。
- [回应] [[CON-context-window]] —— 原 kind=used-with｜Just-in-Time Retrieval 把 Context Window 当缓存，只在需要时加载详情。
- [解释] [[CON-context-engineering]] —— 原 kind=part-of｜Just-in-Time Retrieval 是 Context Engineering 的生产策略之一。
- [回应] [[CON-restorable-compression]] —— 原 kind=used-with（反向）｜保留下来的引用需要在运行时按需取回原内容。
- [回应] [[CON-observation-masking]] —— 原 kind=used-with（反向）｜被移出窗口的旧观察可保留轻量线索，并在再次需要时按需取回。
- [回应] [[CON-persistent-code-graph]] —— 原 kind=used-with（反向）｜Agent 可先查询图谱，再按需读取真正相关的文件与结构信息。
- [[CON-progressive-disclosure_渐进式披露]]
- [[CON-context-window_上下文窗口]]
- [[CON-context-engineering_上下文工程]]
- [[CON-restorable-compression_可恢复压缩]]
- [[CON-observation-masking_观察掩码]]
- [[CON-persistent-code-graph_持久化代码图谱]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
