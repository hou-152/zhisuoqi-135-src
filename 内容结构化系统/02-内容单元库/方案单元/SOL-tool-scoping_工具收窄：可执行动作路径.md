---
id: SOL-tool-scoping
type: 方案单元
title: "工具收窄：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "工具收窄"
  - "Tool Scoping"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Tool Scoping 不是 Tool 本体，也不是设计工具 schema 的全部工作；它只决定某个步骤向模型暴露哪些已有工具。"
solution_summary: "按任务阶段列出“这一步必须用”“可能需要”“当前不应暴露”三组工具，并默认只开放第一组。"
action_steps:
  - "按任务阶段列出“这一步必须用”“可能需要”“当前不应暴露”三组工具，并默认只开放第一组。"
  - "记录工具误选、无工具可用、权限拒绝和工具说明占用的 Context，再依据证据调整范围。"
  - "工具范围变化时同时检查权限配置，避免“看不见但仍可调用”或“看得见却无授权”的不一致。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-tool-scoping
    note: "本方案是「工具收窄」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Tool Scoping 不是 Tool 本体，也不是设计工具 schema 的全部工作；它只决定某个步骤向模型暴露哪些已有工具。

**动作路径（how_to，逐条照抄源数据）**
1. 按任务阶段列出“这一步必须用”“可能需要”“当前不应暴露”三组工具，并默认只开放第一组。
2. 记录工具误选、无工具可用、权限拒绝和工具说明占用的 Context，再依据证据调整范围。
3. 工具范围变化时同时检查权限配置，避免“看不见但仍可调用”或“看得见却无授权”的不一致。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/tool-scoping.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-tool-scoping]] —— 本方案是「工具收窄」的落地动作
- [[CON-tool-scoping_工具收窄]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
