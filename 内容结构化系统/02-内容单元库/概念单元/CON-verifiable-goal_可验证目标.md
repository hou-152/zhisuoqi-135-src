---
id: CON-verifiable-goal
type: 概念单元
title: "可验证目标"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "可验证目标"
  - "Verifiable Goal"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "用可重复执行或明确判定的条件描述任务成功，使 Agent 循环能够据此决定继续、修正、停止或报告失败。"
concept_function: "解释「可验证目标」是什么、边界在哪；分类：做完后凭什么相信（现在就要懂）"
relationships:
  - type: 回应
    target: CON-verification-loop
    note: "原 kind=used-with｜验证循环需要明确、可复现的成功条件来判断结果并驱动下一轮。"
  - type: 回应
    target: CON-agent-stop-conditions
    note: "原 kind=used-with｜成功条件与失败、预算和无进展终止边界共同决定循环何时结束。"
---

## 核心内容

**定义（remember）**：用可重复执行或明确判定的条件描述任务成功，使 Agent 循环能够据此决定继续、修正、停止或报告失败。

**费曼一下**：可验证目标就是红绿灯。绿了就停，红了就继续修。没有红绿灯，AI 只能凭感觉开车。

**边界（明确不成立的用法）**
- 它不同于测试本身；目标说明要达到什么，验证机制提供判定证据。
- 可机器判断不等于真实价值已被完整表达，仍需同时规定禁止路径与质量边界。
- 目标无法满足时应触发失败或升级，不应诱导 Agent 无限重试。
- 当前证据缺口：需要补充主观质量目标如何转译为可复核判据的来源。

**迁移问题**：一个目标容易机器判定却遗漏用户感受时，怎样增加人工质量边界而不让停止条件失去确定性？

**分类问题**：Agent 说做完之后，凭什么相信它真的完成？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/verifiable-goal.yaml`（name_en: Verifiable Goal）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《从 Prompt 转向 Loop Engineering 的工作流拐点》：这段将目标是否可由机器判断与循环能否知道继续或停止直接关联。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-verification-loop]] —— 原 kind=used-with｜验证循环需要明确、可复现的成功条件来判断结果并驱动下一轮。
- [回应] [[CON-agent-stop-conditions]] —— 原 kind=used-with｜成功条件与失败、预算和无进展终止边界共同决定循环何时结束。
- [[CON-verification-loop_验证循环]]
- [[CON-agent-stop-conditions_Agent 终止条件]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
