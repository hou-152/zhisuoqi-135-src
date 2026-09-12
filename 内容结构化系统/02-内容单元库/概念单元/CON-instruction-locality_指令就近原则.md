---
id: CON-instruction-locality
type: 概念单元
title: "指令就近原则"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "指令就近原则"
  - "Instruction Locality"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "将对象的使用说明保存在它直接作用的接口或描述旁，而不是在系统提示等上层位置重复同一指令。"
concept_function: "解释「指令就近原则」是什么、边界在哪；分类：人如何控制 AI（需要时再学）"
relationships:
  - type: 回应
    target: CON-tool
    note: "原 kind=used-with｜来源用工具说明举例，要求把工具用法放在对应 tool description 中。"
  - type: 冲突
    target: CON-system-prompt
    note: "原 kind=contrast｜工具专属说明应靠近工具，而不是在系统提示中重复；系统提示仍承担更通用的产品级语境。"
---

## 核心内容

**定义（remember）**：将对象的使用说明保存在它直接作用的接口或描述旁，而不是在系统提示等上层位置重复同一指令。

**费曼一下**：洗衣说明缝在衣服标签上，比贴在整栋楼大厅更可靠。指令越靠近它实际约束的工具、文件或接口，越不容易重复、冲突和被无关任务带走。

**边界（明确不成立的用法）**
- 它回答指令应放在哪里，不回答信息应在何时加载，因此不等同于渐进式披露。
- 就近放置减少重复与冲突，但不保证指令本身正确、完整或具有更高优先级。
- 当前证据缺口：需要验证该原则在多工具共享约束或跨对象规则中的放置边界。

**迁移问题**：一条同时约束多个工具的安全规则应该放在哪里，才能兼顾就近维护与全局一致？

**分类问题**：人怎样说明目标、复用方法并限制行动？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/instruction-locality.yaml`（name_en: Instruction Locality）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Claude 5 世代的上下文工程，规则变了》：这段把工具专属说明从系统提示移到工具描述，给出“指令靠近作用对象”的具体放置方法；《Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%》：这段直接命名指令就近原则，并以系统提示与工具描述的去重说明其操作边界。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-tool]] —— 原 kind=used-with｜来源用工具说明举例，要求把工具用法放在对应 tool description 中。
- [冲突] [[CON-system-prompt]] —— 原 kind=contrast｜工具专属说明应靠近工具，而不是在系统提示中重复；系统提示仍承担更通用的产品级语境。
- [[CON-tool_工具]]
- [[CON-system-prompt_系统提示]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
