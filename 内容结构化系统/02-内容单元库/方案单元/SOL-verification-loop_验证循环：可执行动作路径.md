---
id: SOL-verification-loop
type: 方案单元
title: "验证循环：可执行动作路径"
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
target_problem: "避免这个误区：Observability 负责采集运行事件、轨迹、状态和时延；Verification Loop 负责消费检查结果并改变当前运行的下一步。"
solution_summary: "在行动前写清检查对象、判据、失败反馈格式和退出条件，避免由同一输出临时改标准。"
action_steps:
  - "在行动前写清检查对象、判据、失败反馈格式和退出条件，避免由同一输出临时改标准。"
  - "尽量让检查独立于生成者，并优先采用可重复运行的确定性证据；主观任务再补视觉检查或人工复核。"
  - "把未通过结果连回一个明确可改变的下一步；若反馈不能改变行动，它只是记录，不是验证循环。"
  - "为失败重试设置预算与人工升级路径，避免无限循环或为通过而偷偷降低标准。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-verification-loop
    note: "本方案是「验证循环」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Observability 负责采集运行事件、轨迹、状态和时延；Verification Loop 负责消费检查结果并改变当前运行的下一步。

**动作路径（how_to，逐条照抄源数据）**
1. 在行动前写清检查对象、判据、失败反馈格式和退出条件，避免由同一输出临时改标准。
2. 尽量让检查独立于生成者，并优先采用可重复运行的确定性证据；主观任务再补视觉检查或人工复核。
3. 把未通过结果连回一个明确可改变的下一步；若反馈不能改变行动，它只是记录，不是验证循环。
4. 为失败重试设置预算与人工升级路径，避免无限循环或为通过而偷偷降低标准。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/verification-loop.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-verification-loop]] —— 本方案是「验证循环」的落地动作
- [[CON-verification-loop_验证循环]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
