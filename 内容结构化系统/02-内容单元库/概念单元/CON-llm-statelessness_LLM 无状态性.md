---
id: CON-llm-statelessness
type: 概念单元
title: "LLM 无状态性"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "LLM 无状态性"
  - "LLM Statelessness"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "模型单次调用不会自行保留上一轮会话状态；连续对话与任务进度必须由外部系统保存并在后续调用中重新提供。"
concept_function: "解释「LLM 无状态性」是什么、边界在哪；分类：眼前真正有什么（现在就要懂）"
relationships:
  - type: 冲突
    target: CON-memory
    note: "原 kind=contrast｜模型调用本身无状态，Memory 是外部保存并可按需取回的信息层。"
  - type: 回应
    target: CON-state-management
    note: "原 kind=used-with｜长任务的连续执行依赖外部状态管理记录并恢复当前进度。"
  - type: 回应
    target: CON-context
    note: "原 kind=used-with｜外部历史只有重新装配进当前 Context 后才对本次模型调用可见。"
---

## 核心内容

**定义（remember）**：模型单次调用不会自行保留上一轮会话状态；连续对话与任务进度必须由外部系统保存并在后续调用中重新提供。

**费曼一下**：每次调用都像把一张新白纸递给模型；上次写过什么，只有外部系统重新夹进这叠纸，它才看得见。白纸是新的，不代表模型忘了训练时学到的常识。

**边界（明确不成立的用法）**
- 无状态性描述调用接口的连续性边界，不表示模型没有训练所得知识。
- 外部系统保存了历史也不等于模型本轮已看见；相关内容仍需重新进入当前上下文。
- 当前证据缺口：需要在正文中区分无状态模型调用、服务端会话封装与持久化响应链等不同实现层。

**迁移问题**：如果应用数据库保存了完整对话，但本轮只发送最后一句，为什么仍不能说模型拥有了会话状态？

**分类问题**：模型此刻到底看见了什么，又能处理多少？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/llm-statelessness.yaml`（name_en: LLM Statelessness）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Coding Agent 如何工作：工具循环与上下文工程》：逐字说明模型每次调用从空白开始，连续性由 Harness 重发消息、工具结果和上下文维持。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-memory]] —— 原 kind=contrast｜模型调用本身无状态，Memory 是外部保存并可按需取回的信息层。
- [回应] [[CON-state-management]] —— 原 kind=used-with｜长任务的连续执行依赖外部状态管理记录并恢复当前进度。
- [回应] [[CON-context]] —— 原 kind=used-with｜外部历史只有重新装配进当前 Context 后才对本次模型调用可见。
- [[CON-memory_记忆]]
- [[CON-state-management_状态管理]]
- [[CON-context_上下文]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
