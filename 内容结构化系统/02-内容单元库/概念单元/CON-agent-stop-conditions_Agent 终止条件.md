---
id: CON-agent-stop-conditions
type: 概念单元
title: "Agent 终止条件"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "Agent 终止条件"
  - "Agent Stop Conditions"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "为持续运行的 Agent 或循环预先定义必须停止、转交或重新规划的条件，例如达到迭代上限、连续无进展或耗尽 token 与费用预算。"
concept_function: "解释「Agent 终止条件」是什么、边界在哪；分类：人如何控制 AI（需要时再学）"
relationships:
  - type: 回应
    target: CON-agent-loop
    note: "原 kind=used-with｜持续循环需要显式终止、转交或重规划边界，不能只依赖模型主观判断。"
  - type: 解释
    target: CON-guardrails
    note: "原 kind=part-of｜终止条件是限制失控执行、成本和无进展运行的一类运行护栏。"
  - type: 回应
    target: CON-verifiable-goal
    note: "原 kind=used-with（反向）｜成功条件与失败、预算和无进展终止边界共同决定循环何时结束。"
---

## 核心内容

**定义（remember）**：为持续运行的 Agent 或循环预先定义必须停止、转交或重新规划的条件，例如达到迭代上限、连续无进展或耗尽 token 与费用预算。

**费曼一下**：给不停试路的司机设油量、时间和“连续三次没更近”的停车规则。停车可能意味着到达，也可能意味着该求助；停止与成功是两张不同的牌。

**边界（明确不成立的用法）**
- 它不是任务成功判定的同义词；循环可能因预算、风险或无进展而在未成功时停止。
- 终止条件应由 Harness 执行，不能只依赖模型自行承诺停止。
- 具体阈值取决于任务风险、成本和可恢复性，不存在通用固定数值。
- 当前证据缺口：需要补充停止后转交、恢复和告警的标准处理路径。

**迁移问题**：一个任务仍在产生新输出却没有减少关键不确定性时，终止条件应看活动量还是进展量，怎样量化？

**分类问题**：人怎样说明目标、复用方法并限制行动？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-stop-conditions.yaml`（name_en: Agent Stop Conditions）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《一次关于 Loop 的工程争论》：这段把最大迭代、无进展检测与成本上限并列为生产循环必须显式设计的终止边界。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-agent-loop]] —— 原 kind=used-with｜持续循环需要显式终止、转交或重规划边界，不能只依赖模型主观判断。
- [解释] [[CON-guardrails]] —— 原 kind=part-of｜终止条件是限制失控执行、成本和无进展运行的一类运行护栏。
- [回应] [[CON-verifiable-goal]] —— 原 kind=used-with（反向）｜成功条件与失败、预算和无进展终止边界共同决定循环何时结束。
- [[CON-agent-loop_Agent 循环]]
- [[CON-guardrails_护栏]]
- [[CON-verifiable-goal_可验证目标]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
