---
id: CON-multi-step-reliability-decay
type: 概念单元
title: "多步可靠性衰减"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "多步可靠性衰减"
  - "Multi-Step Reliability Decay"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "多步 Agent 流程的端到端成功率受每一步条件成功率共同约束，单步的小概率失败会随步骤增加累积成显著的整体可靠性损失。"
concept_function: "解释「多步可靠性衰减」是什么、边界在哪；分类：做完后凭什么相信（现在就要懂）"
relationships:
  - type: 回应
    target: CON-error-handling
    note: "原 kind=used-with｜多步可靠性衰减揭示需要按错误类型设计重试、恢复与中断策略。"
  - type: 回应
    target: CON-verification-loop
    note: "原 kind=used-with｜在流程中尽早验证可阻止局部失败继续传播到后续步骤。"
---

## 核心内容

**定义（remember）**：多步 Agent 流程的端到端成功率受每一步条件成功率共同约束，单步的小概率失败会随步骤增加累积成显著的整体可靠性损失。

**费曼一下**：单步「几乎不出错」在多步流程里是一句安慰话。可靠性像利息，只是复的是负利。

**边界（明确不成立的用法）**
- 各步独立时可用成功率乘积作简化估计；存在相关失败、重试或恢复路径时必须按真实条件概率与流程图计算。
- 它描述可靠性随流程组合而下降的机制，不是某个固定步数或固定百分比的经验定律。
- 当前证据缺口：需要带相关失败与恢复分支的真实 Agent 轨迹验证估算方式。

**迁移问题**：当两个步骤会被同一网络故障同时影响时，为什么不能直接相乘；还需要收集什么联合失败数据？

**分类问题**：Agent 说做完之后，凭什么相信它真的完成？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/multi-step-reliability-decay.yaml`（name_en: Multi-Step Reliability Decay）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《一个被 harness 套住的 LLM agent：这个词到底指什么》：这段用连续步骤成功率的乘积说明微小单步失败会在长流程中累积为显著端到端损失。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-error-handling]] —— 原 kind=used-with｜多步可靠性衰减揭示需要按错误类型设计重试、恢复与中断策略。
- [回应] [[CON-verification-loop]] —— 原 kind=used-with｜在流程中尽早验证可阻止局部失败继续传播到后续步骤。
- [[CON-error-handling_错误处理]]
- [[CON-verification-loop_验证循环]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
