---
id: CON-attention-budget
type: 概念单元
title: "注意力预算"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "注意力预算"
  - "Attention Budget"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "注意力预算是一种工程解释：模型处理 Context 的有效注意能力有限，加入更多信息会争夺而不只增加可用证据。"
concept_function: "解释「注意力预算」是什么、边界在哪；分类：眼前真正有什么（现在就要懂）"
relationships:
  - type: 回应
    target: CON-context-rot
    note: "原 kind=used-with｜注意力预算是解释框架，不是 Context Rot 的唯一已证实原因。"
  - type: 冲突
    target: CON-llm-token
    note: "原 kind=contrast（反向）｜Token 计数描述输入规模，注意力预算描述有限处理能力在内容之间的分配。"
  - type: 冲突
    target: CON-reasoning-effort
    note: "原 kind=contrast（反向）｜推理强度调节计算投入，注意力预算描述模型处理当前上下文信息的有限能力。"
  - type: 回应
    target: CON-tool-schema-tax
    note: "原 kind=used-with（反向）｜大量工具说明会占用窗口并与任务信息争夺模型处理能力。"
---

## 核心内容

**定义（remember）**：注意力预算是一种工程解释：模型处理 Context 的有效注意能力有限，加入更多信息会争夺而不只增加可用证据。

**费曼一下**：想象一盏亮度有限的台灯要同时照好多张卡。卡片越多，每张能分到的清晰光线往往越少；关键卡可能仍在桌上，却更难被稳定看见。这里的“预算”是提醒你做取舍的比喻，不是能精确读取的统一刻度。

**边界（明确不成立的用法）**
- Attention Budget 不等于 Context Window；前者描述有限利用与竞争的工程直觉，后者描述一次调用的容量和处理边界。
- 它不是一个跨模型、跨任务通用且可直接读取的精确数值，也不能单独解释所有长上下文退化。
- 更多 Context 不是必然更差；新增的高价值证据可能提高结果，关键在相关性、组织方式、位置和任务。
- Context Rot 与 Lost in the Middle 是经验表现或位置效应，不能被写成 Attention Budget 已证实的单一因果结果。

**迁移问题**：一个窗口还能继续装 token，是否就表示加入更多日志不会挤压模型对关键证据的利用？

**分类问题**：模型此刻到底看见了什么，又能处理多少？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/attention-budget.yaml`（name_en: Attention Budget）
- 源证据范围（卡片自述）：Anthropic 用 Attention Budget 类比模型处理大量 Context 时的有限能力，并主张把 Context 当作珍贵资源。本站把它作为帮助设计与诊断的工程解释框架，不把“每个 token 支取一点预算”的比喻冒充统一、可精确测量的物理机制。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-context-rot]] —— 原 kind=used-with｜注意力预算是解释框架，不是 Context Rot 的唯一已证实原因。
- [冲突] [[CON-llm-token]] —— 原 kind=contrast（反向）｜Token 计数描述输入规模，注意力预算描述有限处理能力在内容之间的分配。
- [冲突] [[CON-reasoning-effort]] —— 原 kind=contrast（反向）｜推理强度调节计算投入，注意力预算描述模型处理当前上下文信息的有限能力。
- [回应] [[CON-tool-schema-tax]] —— 原 kind=used-with（反向）｜大量工具说明会占用窗口并与任务信息争夺模型处理能力。
- [[CON-context-rot_上下文腐烂]]
- [[CON-llm-token_模型词元]]
- [[CON-reasoning-effort_推理强度]]
- [[CON-tool-schema-tax_工具 Schema 税]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
