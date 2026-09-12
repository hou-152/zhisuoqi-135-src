---
id: CON-chat-template
type: 概念单元
title: "聊天模板"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "聊天模板"
  - "Chat Template"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "把不同角色的消息与历史记录按模型约定格式序列化为一次补全输入的接口模板。"
concept_function: "解释「聊天模板」是什么、边界在哪；分类：信息如何进入工作台（需要时再学）"
relationships:
  - type: 回应
    target: CON-prompt
    note: "原 kind=used-with｜聊天模板把角色化消息序列化为模型实际接收的 Prompt 格式。"
  - type: 回应
    target: CON-system-prompt
    note: "原 kind=used-with｜系统提示通常作为特定角色消息被聊天模板纳入最终输入。"
---

## 核心内容

**定义（remember）**：把不同角色的消息与历史记录按模型约定格式序列化为一次补全输入的接口模板。

**费曼一下**：聊天模板像把多人对话排成模型认识的剧本格式：谁说了什么、顺序怎样，都要重新装进本次输入。剧本看起来连续，不代表演员脑中保留了上一场。

**边界（明确不成立的用法）**
- 聊天模板制造连续对话的输入格式，不会让无状态模型本身获得持久状态。
- 模板格式属于运行接口；它不同于当前对话内容，也不同于定义长期行为规则的系统提示。
- 当前证据缺口：当前证据未比较不同模型族的模板差异与模板错配的失败表现。

**迁移问题**：迁移模型时保留同一聊天历史，为什么仍可能需要重写模板；你会怎样验证角色没有串位？

**分类问题**：什么信息应在什么时候、以什么形式进入？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/chat-template.yaml`（name_en: Chat Template）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Coding Agent 如何工作：工具循环与上下文工程》：逐字定义聊天模板如何把角色化历史拼成补全提示，并由 Harness 重建连续对话。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-prompt]] —— 原 kind=used-with｜聊天模板把角色化消息序列化为模型实际接收的 Prompt 格式。
- [回应] [[CON-system-prompt]] —— 原 kind=used-with｜系统提示通常作为特定角色消息被聊天模板纳入最终输入。
- [[CON-prompt_提示]]
- [[CON-system-prompt_系统提示]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
