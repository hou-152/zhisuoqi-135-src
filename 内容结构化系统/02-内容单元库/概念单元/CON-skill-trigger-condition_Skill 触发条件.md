---
id: CON-skill-trigger-condition
type: 概念单元
title: "Skill 触发条件"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "Skill 触发条件"
  - "Skill Trigger Condition"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "写在 Skill 元数据中的适用场景声明，用来帮助运行环境判断何时自动加载或调用该 Skill。"
concept_function: "解释「Skill 触发条件」是什么、边界在哪；分类：信息如何进入工作台（需要时再学）"
relationships:
  - type: 解释
    target: CON-skill
    note: "原 kind=part-of｜触发条件是 Skill 元数据的一部分，用于决定该 Skill 的自动加载时机。"
  - type: 回应
    target: CON-context-selection
    note: "原 kind=used-with｜触发条件把任务场景与是否选择该 Skill 进入上下文连接起来。"
---

## 核心内容

**定义（remember）**：写在 Skill 元数据中的适用场景声明，用来帮助运行环境判断何时自动加载或调用该 Skill。

**费曼一下**：相当于卡片上的「适用场景」贴纸。写清楚「碰到 X 情况就翻我出来」，系统才会在对的时刻主动想起这张卡；贴纸写得含糊，卡片就躺在抽屉里没人用。

**边界（明确不成立的用法）**
- 触发条件决定何时被考虑，不等同于 Skill 的任务步骤或工具权限。
- 描述过宽会造成误触发，描述过窄会使 Skill 在需要时无法被拉入上下文。
- 当前证据缺口：当前证据聚焦 Claude Code 的 description 字段，跨运行环境是否采用相同触发合同仍需核对。

**迁移问题**：一个 Skill 同时服务“读取”和“编辑”两类任务时，触发条件应合并还是拆分；你会依据什么失败样本决定？

**分类问题**：什么信息应在什么时候、以什么形式进入？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/skill-trigger-condition.yaml`（name_en: Skill Trigger Condition）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《用 Skills 在 Claude Code 里搭建验证闭环》：逐字说明 Skill 的 description 如何声明适用场景并控制自动加载时机。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-skill]] —— 原 kind=part-of｜触发条件是 Skill 元数据的一部分，用于决定该 Skill 的自动加载时机。
- [回应] [[CON-context-selection]] —— 原 kind=used-with｜触发条件把任务场景与是否选择该 Skill 进入上下文连接起来。
- [[CON-skill_Agent Skill]]
- [[CON-context-selection_上下文选择]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
