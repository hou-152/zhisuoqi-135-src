---
id: CON-verification-loop
type: 概念单元
title: "验证循环"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "验证循环"
  - "Verification Loop"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "验证循环把行动结果交给独立检查；未通过就依据证据修正下一步，通过才退出当前循环，但退出不等于用户验收或真实效果已经成立。"
concept_function: "解释「验证循环」是什么、边界在哪；分类：做完后凭什么相信（需要时再学）"
relationships:
  - type: 回应
    target: CON-agent-loop
    note: "原 kind=used-with（反向）｜行动循环产生结果，验证循环用外部证据决定修正或退出。"
  - type: 冲突
    target: CON-trace-based-evals
    note: "原 kind=contrast（反向）｜一个跨运行评估系统，一个在当前运行中检查并纠偏。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜Verification Loop 是 Agent Harness 检查结果并回灌反馈的组成部分。"
  - type: 回应
    target: CON-skill
    note: "原 kind=used-with（反向）｜Skill 可封装并触发可重复执行的 Verification Loop。"
  - type: 回应
    target: CON-sandbox
    note: "原 kind=used-with（反向）｜Sandbox 为 Verification Loop 提供安全执行、日志、截图与测试环境。"
  - type: 回应
    target: CON-runnable-evidence
    note: "原 kind=used-with（反向）｜验证循环消费可运行证据来决定继续、停止或返工；证据本身不是循环的运行组件。"
  - type: 回应
    target: CON-verifiable-goal
    note: "原 kind=used-with（反向）｜验证循环需要明确、可复现的成功条件来判断结果并驱动下一轮。"
  - type: 回应
    target: CON-multi-step-reliability-decay
    note: "原 kind=used-with（反向）｜在流程中尽早验证可阻止局部失败继续传播到后续步骤。"
  - type: 回应
    target: CON-change-impact-analysis
    note: "原 kind=used-with（反向）｜受影响范围可决定验证循环应运行哪些测试与检查。"
  - type: 回应
    target: CON-skill-chaining
    note: "原 kind=used-with（反向）｜来源用 Skill 链把产出、清理与验证步骤固化成端到端验证流。"
  - type: 回应
    target: CON-risk-tiered-autofixing
    note: "原 kind=used-with（反向）｜自动生成的修复仍需通过测试、审查或其他可复验检查后才能继续推进。"
---

## 核心内容

**定义（remember）**：验证循环把行动结果交给独立检查；未通过就依据证据修正下一步，通过才退出当前循环，但退出不等于用户验收或真实效果已经成立。

**费曼一下**：它像做题后把答案交给一位拿着标准的检查者，而不是自己说“应该对了”。检查者给出可复核的结果：没过，就指出差距并改变下一次行动；过了，才停止这一轮。循环负责的是把判断接回行动，不是负责收集所有日志，也不是替人决定最终是否满意。

**边界（明确不成立的用法）**
- Observability 负责采集运行事件、轨迹、状态和时延；Verification Loop 负责消费检查结果并改变当前运行的下一步。
- Trace-based Evals 用共同任务、基线和 verifier 比较多次运行；Verification Loop 通常作用于一次任务里的重试与退出。
- 检查器的证据强度不同：确定性测试、视觉检查和 LLM-as-judge 不能被当成等价证明。
- 机器检查通过只覆盖既定判据，不自动证明语义质量、用户满意、发布授权或真实业务效果。

**迁移问题**：如果 Agent 每轮都打印“检查完成”，却没有固定判据、失败分支或退出条件，这还是验证循环吗？

**分类问题**：Agent 说做完之后，凭什么相信它真的完成？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/verification-loop.yaml`（name_en: Verification Loop）
- 源证据范围（卡片自述）：Delba de Oliveira 展示了把测试、截图或其他检查通路封装进 Skills 的做法；来源策展同时用 guides 与 sensors 区分行动前引导和行动后反馈。本站把 Verification Loop 定义为消费检查结果并控制“修正或退出”的运行内闭环。
- 定义状态：industry-common｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-agent-loop]] —— 原 kind=used-with（反向）｜行动循环产生结果，验证循环用外部证据决定修正或退出。
- [冲突] [[CON-trace-based-evals]] —— 原 kind=contrast（反向）｜一个跨运行评估系统，一个在当前运行中检查并纠偏。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜Verification Loop 是 Agent Harness 检查结果并回灌反馈的组成部分。
- [回应] [[CON-skill]] —— 原 kind=used-with（反向）｜Skill 可封装并触发可重复执行的 Verification Loop。
- [回应] [[CON-sandbox]] —— 原 kind=used-with（反向）｜Sandbox 为 Verification Loop 提供安全执行、日志、截图与测试环境。
- [回应] [[CON-runnable-evidence]] —— 原 kind=used-with（反向）｜验证循环消费可运行证据来决定继续、停止或返工；证据本身不是循环的运行组件。
- [回应] [[CON-verifiable-goal]] —— 原 kind=used-with（反向）｜验证循环需要明确、可复现的成功条件来判断结果并驱动下一轮。
- [回应] [[CON-multi-step-reliability-decay]] —— 原 kind=used-with（反向）｜在流程中尽早验证可阻止局部失败继续传播到后续步骤。
- [回应] [[CON-change-impact-analysis]] —— 原 kind=used-with（反向）｜受影响范围可决定验证循环应运行哪些测试与检查。
- [回应] [[CON-skill-chaining]] —— 原 kind=used-with（反向）｜来源用 Skill 链把产出、清理与验证步骤固化成端到端验证流。
- [回应] [[CON-risk-tiered-autofixing]] —— 原 kind=used-with（反向）｜自动生成的修复仍需通过测试、审查或其他可复验检查后才能继续推进。
- [[CON-agent-loop_Agent 循环]]
- [[CON-trace-based-evals_基于轨迹的评测]]
- [[CON-agent-harness_Agent Harness]]
- [[CON-skill_Agent Skill]]
- [[CON-sandbox_沙箱]]
- [[CON-runnable-evidence_可运行证据]]
- [[CON-verifiable-goal_可验证目标]]
- [[CON-multi-step-reliability-decay_多步可靠性衰减]]
- [[CON-change-impact-analysis_变更影响分析]]
- [[CON-skill-chaining_Skill 链式调用]]
- [[CON-risk-tiered-autofixing_风险分级自动修复]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
