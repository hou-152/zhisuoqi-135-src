---
id: CON-skill-chaining
type: 概念单元
title: "Skill 链式调用"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Skill 链式调用"
  - "Skill Chaining"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "让一个 Skill 完成后显式调用下一个 Skill，把多个独立步骤串成可自动推进的端到端工作流。"
concept_function: "解释「Skill 链式调用」是什么、边界在哪；分类：AI 如何持续行动（需要时再学）"
relationships:
  - type: 回应
    target: CON-skill
    note: "原 kind=used-with｜链式调用以多个可独立运行的 Skill 为组成单元。"
  - type: 回应
    target: CON-verification-loop
    note: "原 kind=used-with｜来源用 Skill 链把产出、清理与验证步骤固化成端到端验证流。"
  - type: 回应
    target: CON-error-handling
    note: "原 kind=used-with｜自动调用链需要在中间步骤失败时决定停止、修复或升级。"
---

## 核心内容

**定义（remember）**：让一个 Skill 完成后显式调用下一个 Skill，把多个独立步骤串成可自动推进的端到端工作流。

**费曼一下**：像接力赛：上一棒不仅要跑完，还要按约定把接力棒交给下一棒。把几个 Skill 排在列表里不叫链，明确输入输出、失败处理和交接才叫链。

**边界（明确不成立的用法）**
- 链式调用把灵活性换成自动化；步骤需要独立使用时不应强制串联。
- 调用链本身不保证每一步正确，仍需验证、失败处理与升级路径。
- 当前证据缺口：当前证据未给出跨 Skill 的参数传递、状态格式与失败语义合同。

**迁移问题**：当链中某个 Skill 也常被单独使用时，怎样设计连接层才能自动推进又不牺牲独立调用？

**分类问题**：为什么 AI 能连续做事，而不只回答一次？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/skill-chaining.yaml`（name_en: Skill Chaining）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《用 Skills 在 Claude Code 里搭建验证闭环》：逐字定义一个 Skill 在结尾调用下一个 Skill 的链式机制，并说明其端到端验证用途。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-skill]] —— 原 kind=used-with｜链式调用以多个可独立运行的 Skill 为组成单元。
- [回应] [[CON-verification-loop]] —— 原 kind=used-with｜来源用 Skill 链把产出、清理与验证步骤固化成端到端验证流。
- [回应] [[CON-error-handling]] —— 原 kind=used-with｜自动调用链需要在中间步骤失败时决定停止、修复或升级。
- [[CON-skill_Agent Skill]]
- [[CON-verification-loop_验证循环]]
- [[CON-error-handling_错误处理]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
