---
id: SOL-tool
type: 方案单元
title: "工具：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "工具"
  - "Tool"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Tool Definition、Tool Call、Tool Execution 与 Tool Result 是连续但不同的环节；看到调用请求不等于动作已经执行成功。"
solution_summary: "排错时依次检查工具是否注册、描述是否清楚、参数是否通过校验、权限是否允许、执行是否成功、结果是否正确回传。"
action_steps:
  - "排错时依次检查工具是否注册、描述是否清楚、参数是否通过校验、权限是否允许、执行是否成功、结果是否正确回传。"
  - "只向当前任务暴露必要工具，避免无关能力增加选择噪声与权限面。"
  - "对高风险 Tool 把权限检查和执行日志放在模型外层，不依赖提示词自我约束。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-tool
    note: "本方案是「工具」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Tool Definition、Tool Call、Tool Execution 与 Tool Result 是连续但不同的环节；看到调用请求不等于动作已经执行成功。

**动作路径（how_to，逐条照抄源数据）**
1. 排错时依次检查工具是否注册、描述是否清楚、参数是否通过校验、权限是否允许、执行是否成功、结果是否正确回传。
2. 只向当前任务暴露必要工具，避免无关能力增加选择噪声与权限面。
3. 对高风险 Tool 把权限检查和执行日志放在模型外层，不依赖提示词自我约束。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/tool.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-tool]] —— 本方案是「工具」的落地动作
- [[CON-tool_工具]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
