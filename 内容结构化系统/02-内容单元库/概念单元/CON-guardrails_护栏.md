---
id: CON-guardrails
type: 概念单元
title: "护栏"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "护栏"
  - "Guardrails"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Guardrails 是在 Agent 运行中检查输入、输出或工具调用，并在规则触发时阻断相应路径的控制机制。"
concept_function: "解释「护栏」是什么、边界在哪；分类：人如何控制 AI（需要时再学）"
relationships:
  - type: 冲突
    target: CON-sandbox
    note: "原 kind=contrast（反向）｜Sandbox 遏制后果，Guardrails 检查并尝试阻断路径。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜Guardrails 是 Agent Harness 约束输入、输出与行动路径的组成部分。"
  - type: 解释
    target: CON-harness-engineering
    note: "原 kind=part-of｜Guardrails 是 Harness Engineering 约束循环行动路径的实践之一。"
  - type: 回应
    target: CON-agent-elicitation
    note: "原 kind=used-with（反向）｜在高风险或边界不清时，主动提问可作为继续行动前的控制路径。"
  - type: 解释
    target: CON-agent-stop-conditions
    note: "原 kind=part-of（反向）｜终止条件是限制失控执行、成本和无进展运行的一类运行护栏。"
  - type: 回应
    target: CON-prompt-injection
    note: "原 kind=used-with（反向）｜护栏需要识别或限制不受信指令引发的危险行为。"
  - type: 冲突
    target: CON-system-prompt-altitude
    note: "原 kind=contrast（反向）｜系统提示提供行为启发式，护栏负责不可越过的运行边界，不能靠提高提示具体度替代。"
---

## 核心内容

**定义（remember）**：Guardrails 是在 Agent 运行中检查输入、输出或工具调用，并在规则触发时阻断相应路径的控制机制。

**费曼一下**：护栏像三条并行检查线：任务进入前可以查输入，每次要调用工具时可以查动作和参数，最终交付前可以查输出。检查通过就继续；触发 tripwire 就立即停止相应运行或调用。它降低风险，但不是绝不会漏检的安全保证。

**边界（明确不成立的用法）**
- Guardrails 不等于 Permission Boundary；权限边界回答“这个主体是否被授权”，护栏还可检查内容、参数、结果和运行条件。
- Guardrails 不等于 Sandbox；前者尝试检测和阻断不合规路径，后者限制即使动作发生后最坏影响能扩散到哪里。
- 护栏会误报或漏报，不能替代最小权限、沙箱、验证和人工确认。
- 输入、输出与工具护栏不是同一个检查点；讨论或排错时要说明检查对象、执行时机和触发后的动作。

**迁移问题**：如果危险工具在没有授权时仍能执行，只增加输出敏感词检查能解决根因吗？

**分类问题**：人怎样说明目标、复用方法并限制行动？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/guardrails.yaml`（name_en: Guardrails）
- 源证据范围（卡片自述）：OpenAI Agents SDK 将 Guardrails 作为核心原语，并区分输入、输出与工具护栏；输入或输出检查可以触发 tripwire，工具护栏可在函数工具调用前后检查。具体执行时机、并行方式和异常行为以所用 SDK 版本与配置为准。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-sandbox]] —— 原 kind=contrast（反向）｜Sandbox 遏制后果，Guardrails 检查并尝试阻断路径。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜Guardrails 是 Agent Harness 约束输入、输出与行动路径的组成部分。
- [解释] [[CON-harness-engineering]] —— 原 kind=part-of｜Guardrails 是 Harness Engineering 约束循环行动路径的实践之一。
- [回应] [[CON-agent-elicitation]] —— 原 kind=used-with（反向）｜在高风险或边界不清时，主动提问可作为继续行动前的控制路径。
- [解释] [[CON-agent-stop-conditions]] —— 原 kind=part-of（反向）｜终止条件是限制失控执行、成本和无进展运行的一类运行护栏。
- [回应] [[CON-prompt-injection]] —— 原 kind=used-with（反向）｜护栏需要识别或限制不受信指令引发的危险行为。
- [冲突] [[CON-system-prompt-altitude]] —— 原 kind=contrast（反向）｜系统提示提供行为启发式，护栏负责不可越过的运行边界，不能靠提高提示具体度替代。
- [[CON-sandbox_沙箱]]
- [[CON-agent-harness_Agent Harness]]
- [[CON-harness-engineering_Harness 工程]]
- [[CON-agent-elicitation_Agent 信息引出]]
- [[CON-agent-stop-conditions_Agent 终止条件]]
- [[CON-prompt-injection_提示注入]]
- [[CON-system-prompt-altitude_系统提示抽象高度]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
