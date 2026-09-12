---
id: CON-error-handling
type: 概念单元
title: "错误处理"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "错误处理"
  - "Error Handling"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "错误处理不是一律重试，而是先判断错误类型，再选择重试、把反馈交给模型、暂停等人、上报或终止。"
concept_function: "解释「错误处理」是什么、边界在哪；分类：AI 如何持续行动（需要时再学）"
relationships:
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜Error Handling 是 Agent Harness 控制失败路径的组成部分。"
  - type: 回应
    target: CON-tool
    note: "原 kind=used-with｜Error Handling 规定 Tool 失败、空结果与不确定性后的收敛动作。"
  - type: 回应
    target: CON-agent-loop
    note: "原 kind=used-with｜Error Handling 把失败转成 Agent Loop 下一轮可利用的反馈。"
  - type: 回应
    target: CON-multi-step-reliability-decay
    note: "原 kind=used-with（反向）｜多步可靠性衰减揭示需要按错误类型设计重试、恢复与中断策略。"
  - type: 回应
    target: CON-skill-chaining
    note: "原 kind=used-with（反向）｜自动调用链需要在中间步骤失败时决定停止、修复或升级。"
  - type: 解释
    target: CON-risk-tiered-autofixing
    note: "原 kind=part-of（反向）｜风险分级自动修复是系统发现错误后生成并路由修复的一类处理机制。"
---

## 核心内容

**定义（remember）**：错误处理不是一律重试，而是先判断错误类型，再选择重试、把反馈交给模型、暂停等人、上报或终止。

**费曼一下**：出错像医院分诊。短暂网络抖动可以稍后再试，工具参数有误可以把错误交回 Agent 调整，缺少用户资料要暂停等待，未知故障要上报调查，高风险异常则应终止。所有错误都按同一种方式处理，只会把小问题滚成大失败。

**边界（明确不成立的用法）**
- Error Handling 不等于 retry；对权限拒绝、无效输入或不可重复副作用盲目重试，可能扩大损失。
- 把错误返回模型只适用于模型能据此修正的情形；系统异常与安全事件仍需确定性的上报或停止路径。
- 处理完成不等于结果正确；错误恢复后仍需要验证循环确认任务产物。

**迁移问题**：同一个“工具失败”提示，什么时候应该重试，什么时候应该暂停等人，什么时候必须终止？

**分类问题**：为什么 AI 能连续做事，而不只回答一次？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/error-handling.yaml`（name_en: Error Handling）
- 源证据范围（卡片自述）：Akshay 的 Harness 拆解把错误分为临时性、模型可恢复、用户可修复和意外错误，并强调 Harness 要决定重试、向模型反馈、等待人类或上报调试。本站将“先分类再路由”作为稳定主线，不继承任何框架的固定重试次数。
- 定义状态：industry-common｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜Error Handling 是 Agent Harness 控制失败路径的组成部分。
- [回应] [[CON-tool]] —— 原 kind=used-with｜Error Handling 规定 Tool 失败、空结果与不确定性后的收敛动作。
- [回应] [[CON-agent-loop]] —— 原 kind=used-with｜Error Handling 把失败转成 Agent Loop 下一轮可利用的反馈。
- [回应] [[CON-multi-step-reliability-decay]] —— 原 kind=used-with（反向）｜多步可靠性衰减揭示需要按错误类型设计重试、恢复与中断策略。
- [回应] [[CON-skill-chaining]] —— 原 kind=used-with（反向）｜自动调用链需要在中间步骤失败时决定停止、修复或升级。
- [解释] [[CON-risk-tiered-autofixing]] —— 原 kind=part-of（反向）｜风险分级自动修复是系统发现错误后生成并路由修复的一类处理机制。
- [[CON-agent-harness_Agent Harness]]
- [[CON-tool_工具]]
- [[CON-agent-loop_Agent 循环]]
- [[CON-multi-step-reliability-decay_多步可靠性衰减]]
- [[CON-skill-chaining_Skill 链式调用]]
- [[CON-risk-tiered-autofixing_风险分级自动修复]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
