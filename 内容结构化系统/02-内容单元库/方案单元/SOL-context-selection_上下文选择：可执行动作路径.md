---
id: SOL-context-selection
type: 方案单元
title: "上下文选择：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "上下文选择"
  - "Context Selection"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Context Selection 回答选什么；Dynamic Context Assembly 回答选中内容怎样排序、格式化和组合，二者不是 Alias。"
solution_summary: "先列候选来源与纳入标准，再说明每项材料支持哪个当前决策、依赖或验证步骤。"
action_steps:
  - "先列候选来源与纳入标准，再说明每项材料支持哪个当前决策、依赖或验证步骤。"
  - "将重复、过期、冲突和低可信材料分开处理，不只按关键词或 embedding 分数机械截取。"
  - "保留重要候选的排除理由；任务失败后，才能检查问题是否出在选择门漏掉了关键证据。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-context-selection
    note: "本方案是「上下文选择」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Context Selection 回答选什么；Dynamic Context Assembly 回答选中内容怎样排序、格式化和组合，二者不是 Alias。

**动作路径（how_to，逐条照抄源数据）**
1. 先列候选来源与纳入标准，再说明每项材料支持哪个当前决策、依赖或验证步骤。
2. 将重复、过期、冲突和低可信材料分开处理，不只按关键词或 embedding 分数机械截取。
3. 保留重要候选的排除理由；任务失败后，才能检查问题是否出在选择门漏掉了关键证据。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context-selection.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-context-selection]] —— 本方案是「上下文选择」的落地动作
- [[CON-context-selection_上下文选择]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
