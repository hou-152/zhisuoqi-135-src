---
id: CON-system-prompt-altitude
type: 概念单元
title: "系统提示抽象高度"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "系统提示抽象高度"
  - "System Prompt Altitude"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "系统提示在具体行为规则与高层启发式之间选择的抽象层级；有效高度应足以稳定引导行为，又给模型保留处理新情况的判断空间。"
concept_function: "解释「系统提示抽象高度」是什么、边界在哪；分类：人如何控制 AI（需要时再学）"
relationships:
  - type: 解释
    target: CON-system-prompt
    note: "原 kind=part-of｜抽象高度是设计系统提示时需要校准的一个属性。"
  - type: 冲突
    target: CON-guardrails
    note: "原 kind=contrast｜系统提示提供行为启发式，护栏负责不可越过的运行边界，不能靠提高提示具体度替代。"
---

## 核心内容

**定义（remember）**：系统提示在具体行为规则与高层启发式之间选择的抽象层级；有效高度应足以稳定引导行为，又给模型保留处理新情况的判断空间。

**费曼一下**：交代事情的颗粒度。说「客人进门第 3 秒说你好，第 7 秒递菜单」是把人当机器；说「让客人感到宾至如归」又等于没说。好的交代是「先问清楚客人的需求再推荐，拿不准就叫店长」——有判断依据，但不替对方做每一步决定。

**边界（明确不成立的用法）**
- 它不是越具体或越简短越好，而是在任务、模型和失败模式之间校准颗粒度。
- 它只讨论系统提示的指导层级，不覆盖工具权限、运行时状态和外部护栏。
- 「系统提示抽象高度」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。

**迁移问题**：当任务变化很快但合规边界稳定时，哪些内容应上升为系统原则，哪些应留在就近工具说明中？

**分类问题**：人怎样说明目标、复用方法并限制行动？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/system-prompt-altitude.yaml`（name_en: System Prompt Altitude）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》：原文把系统提示的抽象高度定义为过度硬编码与过度含糊之间的可判断区间。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-system-prompt]] —— 原 kind=part-of｜抽象高度是设计系统提示时需要校准的一个属性。
- [冲突] [[CON-guardrails]] —— 原 kind=contrast｜系统提示提供行为启发式，护栏负责不可越过的运行边界，不能靠提高提示具体度替代。
- [[CON-system-prompt_系统提示]]
- [[CON-guardrails_护栏]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
