---
id: SOL-change-impact-analysis
type: 方案单元
title: "变更影响分析：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "变更影响分析"
  - "Change Impact Analysis"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：影响分析给出应检查的范围，不等于证明这些位置已经发生缺陷。"
solution_summary: "从变更的符号和文件出发，沿调用、导入、继承与测试关系向外展开。"
action_steps:
  - "从变更的符号和文件出发，沿调用、导入、继承与测试关系向外展开。"
  - "把直接依赖、间接依赖和动态未知分别列出，并为每层选择验证方式。"
  - "运行受影响测试后核对实际轨迹，补充静态图谱未覆盖的运行时依赖。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-change-impact-analysis
    note: "本方案是「变更影响分析」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：影响分析给出应检查的范围，不等于证明这些位置已经发生缺陷。

**动作路径（how_to，逐条照抄源数据）**
1. 从变更的符号和文件出发，沿调用、导入、继承与测试关系向外展开。
2. 把直接依赖、间接依赖和动态未知分别列出，并为每层选择验证方式。
3. 运行受影响测试后核对实际轨迹，补充静态图谱未覆盖的运行时依赖。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/change-impact-analysis.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-change-impact-analysis]] —— 本方案是「变更影响分析」的落地动作
- [[CON-change-impact-analysis_变更影响分析]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
