---
id: CON-human-escalation-tool-call
type: 概念单元
title: "人类升级工具调用"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "人类升级工具调用"
  - "Human Escalation Tool Call"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "把请求人类授权、判断或承担责任设计成 Agent 可调用并等待结果的显式工具，使人工介入成为可恢复工作流的一部分。"
concept_function: "解释「人类升级工具调用」是什么、边界在哪；分类：人如何控制 AI（需要时再学）"
relationships:
  - type: 回应
    target: CON-permission-boundary
    note: "原 kind=used-with｜当权限边界要求人工裁决时，Agent 可发起显式人类调用并等待决定；该调用本身不授予越权能力。"
  - type: 回应
    target: CON-durable-execution
    note: "原 kind=used-with｜等待人类回复的工作流需要持久保存状态并在结果到达后恢复。"
---

## 核心内容

**定义（remember）**：把请求人类授权、判断或承担责任设计成 Agent 可调用并等待结果的显式工具，使人工介入成为可恢复工作流的一部分。

**费曼一下**：把「问一下人」做成 agent 可以调用的一个普通工具，而不是流程崩溃时的例外分支。这样一来，人不是 agent 失败后的补丁，而是它工具箱里的一件工具——需要授权、需要判断、需要担责的时候就调用，调用完循环继续走。

**边界（明确不成立的用法）**
- 它不是把人当作无条件执行器；调用应包含清晰问题、必要证据和权限范围。
- 它不同于 Agent 失败后由运维人员临时接管的非结构化兜底。
- 「人类升级工具调用」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。

**迁移问题**：如果人工答复可能几小时后才到，工作流还要保存哪些状态，才能让升级成为可恢复工具调用而不是临时接管？

**分类问题**：人怎样说明目标、复用方法并限制行动？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/human-escalation-tool-call.yaml`（name_en: Human Escalation Tool Call）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则》：原文明确提出把请求人类判断建模为 Agent 循环中的普通工具调用，而不是流程外异常。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-permission-boundary]] —— 原 kind=used-with｜当权限边界要求人工裁决时，Agent 可发起显式人类调用并等待决定；该调用本身不授予越权能力。
- [回应] [[CON-durable-execution]] —— 原 kind=used-with｜等待人类回复的工作流需要持久保存状态并在结果到达后恢复。
- [[CON-permission-boundary_权限边界]]
- [[CON-durable-execution_持久化执行]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
