---
id: CON-observability
type: 概念单元
title: "可观测性"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "可观测性"
  - "Observability"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "可观测性把运行事件变成可查询的轨迹、状态与时延证据，让人看见系统发生了什么；看得见不等于做得对。"
concept_function: "解释「可观测性」是什么、边界在哪；分类：做完后凭什么相信（需要时再学）"
relationships:
  - type: 解释
    target: CON-trace-based-evals
    note: "原 kind=prerequisite｜可观测事件提供轨迹证据，Evals 再做跨运行判断。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜Observability 是 Agent Harness 留下可查询运行证据的组成部分。"
  - type: 回应
    target: CON-prompt-caching
    note: "原 kind=used-with（反向）｜缓存收益需要通过读写 Token、命中率和首字延迟等运行指标持续观测。"
---

## 核心内容

**定义（remember）**：可观测性把运行事件变成可查询的轨迹、状态与时延证据，让人看见系统发生了什么；看得见不等于做得对。

**费曼一下**：黑箱机器只告诉你“结束了”，出了问题只能猜。可观测性像给它装上记录仪：哪一步发生了什么、状态怎样变化、每步花了多久都留下来。它提供的是事实材料，不是成绩单；是否正确仍要由判据、评测或人来判断。

**边界（明确不成立的用法）**
- 可观测性负责采集与呈现运行事实；它不自动判断路径质量、任务正确性或产品效果。
- Trace-based Evals 可以消费轨迹做跨运行判断，但“保存了 trace”不等于“已经做了 eval”。
- Verification Loop 可以消费某项观测结果控制重试或退出，但日志存在本身不会改变下一步。
- 指标与日志只能覆盖被记录的部分；缺少关联 ID、时间、环境或失败上下文时，证据可能无法解释。

**迁移问题**：如果面板完整显示每一步都发生了什么，却没有任何成功标准，它能证明任务做对了吗？

**分类问题**：Agent 说做完之后，凭什么相信它真的完成？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/observability.yaml`（name_en: Observability）
- 源证据范围（卡片自述）：Harness 工程学习仓库把可观测性列为独立子系统：看不到 Agent 做了什么，就修不了它搞坏的东西。本站据此把它限定为运行证据基础设施，而不是验证结论或流程控制器。
- 定义状态：industry-common｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-trace-based-evals]] —— 原 kind=prerequisite｜可观测事件提供轨迹证据，Evals 再做跨运行判断。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜Observability 是 Agent Harness 留下可查询运行证据的组成部分。
- [回应] [[CON-prompt-caching]] —— 原 kind=used-with（反向）｜缓存收益需要通过读写 Token、命中率和首字延迟等运行指标持续观测。
- [[CON-trace-based-evals_基于轨迹的评测]]
- [[CON-agent-harness_Agent Harness]]
- [[CON-prompt-caching_提示词缓存]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
