---
id: CON-skill
type: 概念单元
title: "Agent Skill"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "Agent Skill"
  - "Agent Skill"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Agent Skill 是把可复用做法、说明与必要资源组织起来，让 Agent 在合适任务中按同一方法工作的载体。"
concept_function: "解释「Agent Skill」是什么、边界在哪；分类：人如何控制 AI（需要时再学）"
relationships:
  - type: 冲突
    target: CON-tool
    note: "原 kind=contrast（反向）｜Tool 提供能力，Skill 组织完成工作的可复用方法。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜Skill 是 Agent Harness 按需提供方法与能力的组成部分。"
  - type: 回应
    target: CON-agent-loop
    note: "原 kind=used-with｜Agent Loop 调用经过测试的 Skill，形成可复用、可复利的工作流。"
  - type: 回应
    target: CON-progressive-disclosure
    note: "原 kind=used-with｜Skill 通过按需加载文件与能力实现 Progressive Disclosure。"
  - type: 回应
    target: CON-verification-loop
    note: "原 kind=used-with｜Skill 可封装并触发可重复执行的 Verification Loop。"
  - type: 回应
    target: CON-skill-chaining
    note: "原 kind=used-with（反向）｜链式调用以多个可独立运行的 Skill 为组成单元。"
  - type: 解释
    target: CON-skill-trigger-condition
    note: "原 kind=part-of（反向）｜触发条件是 Skill 元数据的一部分，用于决定该 Skill 的自动加载时机。"
---

## 核心内容

**定义（remember）**：Agent Skill 是把可复用做法、说明与必要资源组织起来，让 Agent 在合适任务中按同一方法工作的载体。

**费曼一下**：Tool 像一把能真正动手的工具，Skill 更像一副可重复使用的工艺夹具。它把你的步骤、判断点和注意事项固定成一条清楚的动作路径，Agent 每次遇到相似任务都能沿着它工作；夹具会指导动作，却不会自己替你完成外部操作。

**边界（明确不成立的用法）**
- Skill 沉淀的是可复用方法与任务上下文，不是可直接执行外部动作的 Tool。
- Skill 可以说明如何使用 Tool，但能否使用仍由实际工具面、权限和运行环境决定。
- Skill 也不是 MCP；前者是方法载体，后者是外部能力接入协议。
- 不同产品对 Skill 的目录、元数据、触发方式、渐进加载与允许工具没有统一实现，迁移时必须核对实际运行时。

**迁移问题**：如果一份 Skill 把步骤写得很清楚，但当前会话没有文件写入 Tool，它能仅靠这份 Skill 修改文件吗？

**分类问题**：人怎样说明目标、复用方法并限制行动？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/skill.yaml`（name_en: Agent Skill）
- 源证据范围（卡片自述）：Anthropic 的 Agent Skills 实践把重复步骤编码成可复用指令单元，并可带上执行所需的资源；本站以 Agent Skill 为主名称，保留 Skill 与“技能”为 Alias，同时明确不同产品在格式、发现、加载和工具授权上的实现并不一致。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-tool]] —— 原 kind=contrast（反向）｜Tool 提供能力，Skill 组织完成工作的可复用方法。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜Skill 是 Agent Harness 按需提供方法与能力的组成部分。
- [回应] [[CON-agent-loop]] —— 原 kind=used-with｜Agent Loop 调用经过测试的 Skill，形成可复用、可复利的工作流。
- [回应] [[CON-progressive-disclosure]] —— 原 kind=used-with｜Skill 通过按需加载文件与能力实现 Progressive Disclosure。
- [回应] [[CON-verification-loop]] —— 原 kind=used-with｜Skill 可封装并触发可重复执行的 Verification Loop。
- [回应] [[CON-skill-chaining]] —— 原 kind=used-with（反向）｜链式调用以多个可独立运行的 Skill 为组成单元。
- [解释] [[CON-skill-trigger-condition]] —— 原 kind=part-of（反向）｜触发条件是 Skill 元数据的一部分，用于决定该 Skill 的自动加载时机。
- [[CON-tool_工具]]
- [[CON-agent-harness_Agent Harness]]
- [[CON-agent-loop_Agent 循环]]
- [[CON-progressive-disclosure_渐进式披露]]
- [[CON-verification-loop_验证循环]]
- [[CON-skill-chaining_Skill 链式调用]]
- [[CON-skill-trigger-condition_Skill 触发条件]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
