---
id: CON-agent-tool-contract
type: 概念单元
title: "Agent 工具契约"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "Agent 工具契约"
  - "Agent Tool Contract"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Agent 与信息／行动空间之间的接口约定：模型用清晰、结构化的输出表达操作意图，确定性代码负责执行，并以紧凑、健壮、可解释的结果回传。"
concept_function: "解释「Agent 工具契约」是什么、边界在哪；分类：AI 如何接触外部世界（需要时再学）"
relationships:
  - type: 解释
    target: CON-tool
    note: "原 kind=part-of｜契约是 Agent 工具接口的一部分，规定模型意图与确定性执行如何衔接。"
  - type: 回应
    target: CON-permission-boundary
    note: "原 kind=used-with｜工具契约说明如何表达调用，权限边界决定该调用是否被允许执行。"
---

## 核心内容

**定义（remember）**：Agent 与信息／行动空间之间的接口约定：模型用清晰、结构化的输出表达操作意图，确定性代码负责执行，并以紧凑、健壮、可解释的结果回传。

**费曼一下**：工具不只是能力，更是一份说明书，规定了 agent 能碰什么、怎么碰、碰完拿回什么。说明书写歪了，能力再强也用不对地方；而且工具吐回来的每个字都要占注意力预算，所以「说得少而准」本身就是工具的设计目标。

**边界（明确不成立的用法）**
- 它不是工具能力本身，而是模型如何选择、调用并接收工具结果的责任边界。
- 工具契约清晰不等于权限安全；授权、沙箱和护栏仍需独立控制。
- 它只覆盖结构化意图经工具接口交给确定性程序执行与回传的契约，不把所有 AI 应用中的确定性代码拼接都收进来。

**迁移问题**：如果把同一个 Agent 从工单系统迁到财务系统，哪些接口约定必须重写，哪些执行责任仍应留在确定性代码中？

**分类问题**：AI 靠什么读取、计算或改变外部世界？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-tool-contract.yaml`（name_en: Agent Tool Contract）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》：原文把工具明确界定为 Agent 与信息／行动空间之间的契约，并列出自包含、健壮、清晰和 token 效率要求；《12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则》：原文从执行侧补充工具契约：模型只产生结构化意图，确定性代码承担实际执行与正确性责任；《拆开 Claude Code：一个编码 agent 的 harness 内部长什么样》：这段补充说明结构化模型结果必须由确定性程序承接，支持工具契约中的意图表达与执行责任边界。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-tool]] —— 原 kind=part-of｜契约是 Agent 工具接口的一部分，规定模型意图与确定性执行如何衔接。
- [回应] [[CON-permission-boundary]] —— 原 kind=used-with｜工具契约说明如何表达调用，权限边界决定该调用是否被允许执行。
- [[CON-tool_工具]]
- [[CON-permission-boundary_权限边界]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
