---
id: CON-context-window
type: 概念单元
title: "上下文窗口"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "上下文窗口"
  - "Context Window"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "上下文窗口是一次推理能承载和处理 Context 的有限边界；它不是 Context，也不是长期记忆。"
concept_function: "解释「上下文窗口」是什么、边界在哪；分类：眼前真正有什么（现在就要懂）"
relationships:
  - type: 冲突
    target: CON-context
    note: "原 kind=contrast（反向）｜Context 是内容；窗口是承载与处理边界。"
  - type: 回应
    target: CON-context-compaction
    note: "原 kind=used-with（反向）｜Context Compaction 在 Context Window 接近上限时蒸馏历史并维持连续性。"
  - type: 回应
    target: CON-context-engineering
    note: "原 kind=used-with（反向）｜Context Engineering 决定 Context Window 里放什么、怎样放与何时放。"
  - type: 回应
    target: CON-context-selection
    note: "原 kind=used-with（反向）｜Context Selection 决定什么信息进入 Context Window。"
  - type: 回应
    target: CON-just-in-time-retrieval
    note: "原 kind=used-with（反向）｜Just-in-Time Retrieval 把 Context Window 当缓存，只在需要时加载详情。"
  - type: 回应
    target: CON-tool-scoping
    note: "原 kind=used-with（反向）｜Tool Scoping 减少进入 Context Window 的无关工具描述。"
  - type: 回应
    target: CON-memory
    note: "原 kind=used-with（反向）｜Memory 把进度写出 Context Window，并在后续需要时重新取回。"
  - type: 回应
    target: CON-agent-session-management
    note: "原 kind=used-with（反向）｜会话管理决定上下文窗口内哪些历史继续保留、被压缩或被丢弃。"
  - type: 回应
    target: CON-harness-token-floor
    note: "原 kind=used-with（反向）｜固定系统输入会占用 Context Window 容量，即使缓存命中也不消失。"
  - type: 回应
    target: CON-llm-token
    note: "原 kind=used-with（反向）｜上下文窗口容量通常按可容纳的 Token 数表示。"
---

## 核心内容

**定义（remember）**：上下文窗口是一次推理能承载和处理 Context 的有限边界；它不是 Context，也不是长期记忆。

**费曼一下**：窗口像桌子的尺寸。桌子变大，只说明能摊更多材料，不保证材料摆得好，也不保证模型能同时可靠地用好每一页。

**边界（明确不成立的用法）**
- 容量边界不等于实际 Context 内容。
- 更大窗口不自动带来更好的检索、注意或推理。
- 上下文窗口不等于跨会话长期记忆。

**迁移问题**：换成更大窗口后任务准确率没有提升，你下一步应验证容量之外的哪些变量？

**分类问题**：模型此刻到底看见了什么，又能处理多少？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context-window.yaml`（name_en: Context Window）
- 源证据范围（卡片自述）：来源文章用 Claude Code 的长窗口讨论会话管理；本站只采用“单次推理容量与处理边界”的稳定口径，不继承具体产品阈值。
- 定义状态：industry-common｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-context]] —— 原 kind=contrast（反向）｜Context 是内容；窗口是承载与处理边界。
- [回应] [[CON-context-compaction]] —— 原 kind=used-with（反向）｜Context Compaction 在 Context Window 接近上限时蒸馏历史并维持连续性。
- [回应] [[CON-context-engineering]] —— 原 kind=used-with（反向）｜Context Engineering 决定 Context Window 里放什么、怎样放与何时放。
- [回应] [[CON-context-selection]] —— 原 kind=used-with（反向）｜Context Selection 决定什么信息进入 Context Window。
- [回应] [[CON-just-in-time-retrieval]] —— 原 kind=used-with（反向）｜Just-in-Time Retrieval 把 Context Window 当缓存，只在需要时加载详情。
- [回应] [[CON-tool-scoping]] —— 原 kind=used-with（反向）｜Tool Scoping 减少进入 Context Window 的无关工具描述。
- [回应] [[CON-memory]] —— 原 kind=used-with（反向）｜Memory 把进度写出 Context Window，并在后续需要时重新取回。
- [回应] [[CON-agent-session-management]] —— 原 kind=used-with（反向）｜会话管理决定上下文窗口内哪些历史继续保留、被压缩或被丢弃。
- [回应] [[CON-harness-token-floor]] —— 原 kind=used-with（反向）｜固定系统输入会占用 Context Window 容量，即使缓存命中也不消失。
- [回应] [[CON-llm-token]] —— 原 kind=used-with（反向）｜上下文窗口容量通常按可容纳的 Token 数表示。
- [[CON-context_上下文]]
- [[CON-context-compaction_上下文压缩]]
- [[CON-context-engineering_上下文工程]]
- [[CON-context-selection_上下文选择]]
- [[CON-just-in-time-retrieval_即时检索]]
- [[CON-tool-scoping_工具收窄]]
- [[CON-memory_记忆]]
- [[CON-agent-session-management_Agent 会话管理]]
- [[CON-harness-token-floor_Harness Token 底座]]
- [[CON-llm-token_模型词元]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
