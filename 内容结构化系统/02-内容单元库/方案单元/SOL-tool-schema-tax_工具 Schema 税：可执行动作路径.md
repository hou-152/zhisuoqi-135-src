---
id: SOL-tool-schema-tax
type: 方案单元
title: "工具 Schema 税：可执行动作路径"
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
target_problem: "避免这个误区：它衡量的是工具说明载荷，不是工具实际执行产生的结果 Token 或外部调用费用。"
solution_summary: "在请求 Payload 中单独统计每个工具 Schema 的 Token 和实际调用频率。"
action_steps:
  - "在请求 Payload 中单独统计每个工具 Schema 的 Token 和实际调用频率。"
  - "按任务场景只暴露必要工具，并缩短冗余说明而不牺牲参数边界。"
  - "比较精简前后的选择错误、任务成功率、费用和权限面，避免只追求更少 Token。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-tool-schema-tax
    note: "本方案是「工具 Schema 税」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它衡量的是工具说明载荷，不是工具实际执行产生的结果 Token 或外部调用费用。

**动作路径（how_to，逐条照抄源数据）**
1. 在请求 Payload 中单独统计每个工具 Schema 的 Token 和实际调用频率。
2. 按任务场景只暴露必要工具，并缩短冗余说明而不牺牲参数边界。
3. 比较精简前后的选择错误、任务成功率、费用和权限面，避免只追求更少 Token。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/tool-schema-tax.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-tool-schema-tax]] —— 本方案是「工具 Schema 税」的落地动作
- [[CON-tool-schema-tax_工具 Schema 税]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
