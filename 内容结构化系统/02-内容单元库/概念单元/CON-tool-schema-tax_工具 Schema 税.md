---
id: CON-tool-schema-tax
type: 概念单元
title: "工具 Schema 税"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "工具 Schema 税"
  - "Tool Schema Tax"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "为让模型知道工具名称、参数与调用格式，而在每次请求中携带工具 Schema 所产生的固定 Token 与上下文占用。"
concept_function: "解释「工具 Schema 税」是什么、边界在哪；分类：AI 如何接触外部世界（需要时再学）"
relationships:
  - type: 解释
    target: CON-harness-token-floor
    note: "原 kind=part-of｜工具 Schema 的固定载荷是 Harness Token 底座中可单独测量的一部分。"
  - type: 回应
    target: CON-tool-scoping
    note: "原 kind=used-with｜只暴露当前步骤必要工具可同时降低选择噪声与工具 Schema 静态载荷。"
  - type: 回应
    target: CON-attention-budget
    note: "原 kind=used-with｜大量工具说明会占用窗口并与任务信息争夺模型处理能力。"
---

## 核心内容

**定义（remember）**：为让模型知道工具名称、参数与调用格式，而在每次请求中携带工具 Schema 所产生的固定 Token 与上下文占用。

**费曼一下**：每次请模型做事前，都先附上一本“所有工具说明书”。工具越多，模型在读用户问题前要先背的说明书越厚。

**边界（明确不成立的用法）**
- 它衡量的是工具说明载荷，不是工具实际执行产生的结果 Token 或外部调用费用。
- 工具少不自动更好；应在必要能力、选择噪声、权限面与静态载荷之间取舍。
- 当前证据缺口：需要不同模型分词器和工具协议下的可比测量。

**迁移问题**：一个很少调用但一旦缺失就会阻塞任务的工具，应该常驻 Schema 还是按需加载；依据是什么？

**分类问题**：AI 靠什么读取、计算或改变外部世界？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/tool-schema-tax.yaml`（name_en: Tool Schema Tax）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Claude Code 在读提示词前为何已发送 3.3 万 Token》：逐字把随每次请求携带的工具 Schema 大小识别为静态 Token 负担，并指出工具越多负担越高。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-harness-token-floor]] —— 原 kind=part-of｜工具 Schema 的固定载荷是 Harness Token 底座中可单独测量的一部分。
- [回应] [[CON-tool-scoping]] —— 原 kind=used-with｜只暴露当前步骤必要工具可同时降低选择噪声与工具 Schema 静态载荷。
- [回应] [[CON-attention-budget]] —— 原 kind=used-with｜大量工具说明会占用窗口并与任务信息争夺模型处理能力。
- [[CON-harness-token-floor_Harness Token 底座]]
- [[CON-tool-scoping_工具收窄]]
- [[CON-attention-budget_注意力预算]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
