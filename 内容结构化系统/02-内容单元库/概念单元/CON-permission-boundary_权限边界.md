---
id: CON-permission-boundary
type: 概念单元
title: "权限边界"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "权限边界"
  - "Permission Boundary"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "权限边界把模型提出的动作与系统实际允许执行的动作分开，由模型外的确定性权限层决定允许、要求人工确认或拒绝。"
concept_function: "解释「权限边界」是什么、边界在哪；分类：人如何控制 AI（需要时再学）"
relationships:
  - type: 回应
    target: CON-sandbox
    note: "原 kind=used-with｜一个判断能否做，一个限制动作影响范围。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜Permission Boundary 是 Agent Harness 控制可执行动作范围的组成部分。"
  - type: 回应
    target: CON-tool
    note: "原 kind=used-with｜Permission Boundary 在 Tool 执行前检查动作是否被允许。"
  - type: 回应
    target: CON-agent-tool-contract
    note: "原 kind=used-with（反向）｜工具契约说明如何表达调用，权限边界决定该调用是否被允许执行。"
  - type: 回应
    target: CON-agent-action-space
    note: "原 kind=used-with（反向）｜可表达的动作还要经过权限边界，才能成为实际允许执行的动作。"
  - type: 回应
    target: CON-prompt-injection
    note: "原 kind=used-with（反向）｜权限边界限制一次注入成功后能够调用的能力和影响范围。"
  - type: 回应
    target: CON-human-escalation-tool-call
    note: "原 kind=used-with（反向）｜当权限边界要求人工裁决时，Agent 可发起显式人类调用并等待决定；该调用本身不授予越权能力。"
  - type: 回应
    target: CON-risk-tiered-autofixing
    note: "原 kind=used-with（反向）｜风险等级需要限制 Agent 能修改的范围以及修复候选可自动推进到的状态。"
---

## 核心内容

**定义（remember）**：权限边界把模型提出的动作与系统实际允许执行的动作分开，由模型外的确定性权限层决定允许、要求人工确认或拒绝。

**费曼一下**：模型像司机，可以提出“我要通过这个路口”；权限边界像实体闸门，按规则决定直接放行、停下来问人，还是拒绝。安全不能只靠司机答应遵守规则，因为真正限制动作的是路口的闸门，而不是司机脑中的一句话。

**边界（明确不成立的用法）**
- Permission Boundary 决定动作是否获准；Sandbox 限制获准动作在哪里执行、影响能扩散到哪里，二者不能互相替代。
- 不依赖模型自己“愿意听话”来保证安全；关键规则应在模型外确定性执行。
- 用户批准一次具体动作，不等于永久放开同类工具、所有参数或未来会话。
- 允许、人工确认与拒绝应绑定实际动作参数和当前运行状态，不能只看模型对动作的自然语言描述。

**迁移问题**：如果删除动作被允许进入一个隔离沙箱，它已经通过了哪一层，又仍需要哪一层来限制影响范围？

**分类问题**：人怎样说明目标、复用方法并限制行动？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/permission-boundary.yaml`（name_en: Permission Boundary）
- 源证据范围（卡片自述）：Akshay 的 Agent Harness 拆解强调模型决定“尝试什么”，工具系统决定“允许什么”；来源用项目加载信任、调用前权限检查与高风险人工确认说明权限执行应与模型推理解耦。稳定定义不继承来源中的产品数量或版本数字。
- 定义状态：relatively-stable｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-sandbox]] —— 原 kind=used-with｜一个判断能否做，一个限制动作影响范围。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜Permission Boundary 是 Agent Harness 控制可执行动作范围的组成部分。
- [回应] [[CON-tool]] —— 原 kind=used-with｜Permission Boundary 在 Tool 执行前检查动作是否被允许。
- [回应] [[CON-agent-tool-contract]] —— 原 kind=used-with（反向）｜工具契约说明如何表达调用，权限边界决定该调用是否被允许执行。
- [回应] [[CON-agent-action-space]] —— 原 kind=used-with（反向）｜可表达的动作还要经过权限边界，才能成为实际允许执行的动作。
- [回应] [[CON-prompt-injection]] —— 原 kind=used-with（反向）｜权限边界限制一次注入成功后能够调用的能力和影响范围。
- [回应] [[CON-human-escalation-tool-call]] —— 原 kind=used-with（反向）｜当权限边界要求人工裁决时，Agent 可发起显式人类调用并等待决定；该调用本身不授予越权能力。
- [回应] [[CON-risk-tiered-autofixing]] —— 原 kind=used-with（反向）｜风险等级需要限制 Agent 能修改的范围以及修复候选可自动推进到的状态。
- [[CON-sandbox_沙箱]]
- [[CON-agent-harness_Agent Harness]]
- [[CON-tool_工具]]
- [[CON-agent-tool-contract_Agent 工具契约]]
- [[CON-agent-action-space_Agent 行动空间]]
- [[CON-prompt-injection_提示注入]]
- [[CON-human-escalation-tool-call_人类升级工具调用]]
- [[CON-risk-tiered-autofixing_风险分级自动修复]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
