---
id: CON-trace-based-evals
type: 概念单元
title: "基于轨迹的评测"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "基于轨迹的评测"
  - "Trace-based Evals"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "基于轨迹的评测让多次 Agent 运行面对同一任务、基线与 verifier，再比较它们怎样行动及结果如何；只有轨迹而没有统一判据，不算评测。"
concept_function: "解释「基于轨迹的评测」是什么、边界在哪；分类：做完后凭什么相信（深水区）"
relationships:
  - type: 解释
    target: CON-observability
    note: "原 kind=prerequisite（反向）｜可观测事件提供轨迹证据，Evals 再做跨运行判断。"
  - type: 冲突
    target: CON-verification-loop
    note: "原 kind=contrast｜一个跨运行评估系统，一个在当前运行中检查并纠偏。"
  - type: 回应
    target: CON-runnable-evidence
    note: "原 kind=used-with（反向）｜轨迹解释过程，可运行检查复验结果，两类证据共同支持诊断。"
  - type: 回应
    target: CON-browsing-loop
    note: "原 kind=used-with（反向）｜浏览循环通常需要从搜索、读取和错误恢复的轨迹中识别，而非只看最终分数。"
  - type: 冲突
    target: CON-change-impact-analysis
    note: "原 kind=contrast（反向）｜变更影响分析沿代码结构预测受影响范围，基于轨迹的评测依据实际运行轨迹评价 Agent 行为。"
  - type: 回应
    target: CON-harness-overfitting
    note: "原 kind=used-with（反向）｜固定模型、任务与评测条件的跨 Harness 轨迹比较可检验泛化下降。"
---

## 核心内容

**定义（remember）**：基于轨迹的评测让多次 Agent 运行面对同一任务、基线与 verifier，再比较它们怎样行动及结果如何；只有轨迹而没有统一判据，不算评测。

**费曼一下**：只看三个人都抵达终点，你不知道谁绕路、谁碰巧、谁违反规则。轨迹评测会先固定赛道和裁判尺度，再把多次完整路线放在一起比较。它判断的是不同运行在同一条件下的表现差异，不是简单把日志存起来，也不会自动把结论接回当前任务重试。

**边界（明确不成立的用法）**
- Observability 负责产生可回放轨迹；Trace-based Evals 负责用固定任务、基线与 verifier 对多次轨迹作比较判断。
- Verification Loop 把检查结果接回单次运行并控制修正或退出；评测结果是否用于改 Harness，是后续控制决策。
- Agent 可能有多条合理成功路径，评测不能把“不同于示范轨迹”直接判为失败。
- 分数会受工具版本、网络、沙箱、依赖和其他基础设施噪声影响；未经控制不能全归因于模型或 Harness 改动。

**迁移问题**：两个 Skill 各成功运行一次，但任务不同、环境不同、没有共同 verifier，能据此说哪个更好吗？

**分类问题**：Agent 说做完之后，凭什么相信它真的完成？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/trace-based-evals.yaml`（name_en: Trace-based Evals）
- 源证据范围（卡片自述）：Awesome Harness Engineering 汇集的 eval 资源强调把 Agent traces 转成 JSONL，配合 bounded tasks、deterministic verifiers、no-skill baselines 和 trajectory review；同时需控制运行环境噪声。本站因此将其放在深入研究层。
- 定义状态：evolving｜学习阶段：深水区

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-observability]] —— 原 kind=prerequisite（反向）｜可观测事件提供轨迹证据，Evals 再做跨运行判断。
- [冲突] [[CON-verification-loop]] —— 原 kind=contrast｜一个跨运行评估系统，一个在当前运行中检查并纠偏。
- [回应] [[CON-runnable-evidence]] —— 原 kind=used-with（反向）｜轨迹解释过程，可运行检查复验结果，两类证据共同支持诊断。
- [回应] [[CON-browsing-loop]] —— 原 kind=used-with（反向）｜浏览循环通常需要从搜索、读取和错误恢复的轨迹中识别，而非只看最终分数。
- [冲突] [[CON-change-impact-analysis]] —— 原 kind=contrast（反向）｜变更影响分析沿代码结构预测受影响范围，基于轨迹的评测依据实际运行轨迹评价 Agent 行为。
- [回应] [[CON-harness-overfitting]] —— 原 kind=used-with（反向）｜固定模型、任务与评测条件的跨 Harness 轨迹比较可检验泛化下降。
- [[CON-observability_可观测性]]
- [[CON-verification-loop_验证循环]]
- [[CON-runnable-evidence_可运行证据]]
- [[CON-browsing-loop_浏览循环]]
- [[CON-change-impact-analysis_变更影响分析]]
- [[CON-harness-overfitting_Harness 过拟合]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
