---
id: CON-risk-tiered-autofixing
type: 概念单元
title: "风险分级自动修复"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "风险分级自动修复"
  - "Risk-Tiered Autofixing"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "系统在检测到问题后自动生成修复，并依据改动范围与风险等级决定轻量复核、深度人工审查或停止自动推进的修复机制。"
concept_function: "解释「风险分级自动修复」是什么、边界在哪；分类：做完后凭什么相信（需要时再学）"
relationships:
  - type: 解释
    target: CON-error-handling
    note: "原 kind=part-of｜风险分级自动修复是系统发现错误后生成并路由修复的一类处理机制。"
  - type: 回应
    target: CON-verification-loop
    note: "原 kind=used-with｜自动生成的修复仍需通过测试、审查或其他可复验检查后才能继续推进。"
  - type: 回应
    target: CON-permission-boundary
    note: "原 kind=used-with｜风险等级需要限制 Agent 能修改的范围以及修复候选可自动推进到的状态。"
---

## 核心内容

**定义（remember）**：系统在检测到问题后自动生成修复，并依据改动范围与风险等级决定轻量复核、深度人工审查或停止自动推进的修复机制。

**费曼一下**：系统不只是告诉你哪里坏了，还会先修一版。如果问题在低风险区域，人看一眼确认就能上线；高风险区域才交给更资深的人深审。

**边界（明确不成立的用法）**
- 它不是让 Agent 无条件修复并上线；风险分级决定自动化可以推进到哪一层门禁。
- 按目录判断风险只是来源中的一种实现，实际分级还可能依赖权限、数据敏感度、可逆性与影响范围。
- 自动提交修复候选不等于修复正确、获准合并或已经部署，仍需独立验证与发布授权。
- 当前证据缺口：需要另一套系统的风险分类、误修复处置和人工升级证据。

**迁移问题**：一个改动位于低风险目录却会改变公开数据，目录规则应如何被影响范围与可逆性覆盖？

**分类问题**：Agent 说做完之后，凭什么相信它真的完成？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/risk-tiered-autofixing.yaml`（name_en: Risk-Tiered Autofixing）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Harness Engineering：AI-First 组织的信任机制重构》：这段呈现了按改动风险决定自动修复后的审查深度，使自动修复与人类门禁形成分级机制。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-error-handling]] —— 原 kind=part-of｜风险分级自动修复是系统发现错误后生成并路由修复的一类处理机制。
- [回应] [[CON-verification-loop]] —— 原 kind=used-with｜自动生成的修复仍需通过测试、审查或其他可复验检查后才能继续推进。
- [回应] [[CON-permission-boundary]] —— 原 kind=used-with｜风险等级需要限制 Agent 能修改的范围以及修复候选可自动推进到的状态。
- [[CON-error-handling_错误处理]]
- [[CON-verification-loop_验证循环]]
- [[CON-permission-boundary_权限边界]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
