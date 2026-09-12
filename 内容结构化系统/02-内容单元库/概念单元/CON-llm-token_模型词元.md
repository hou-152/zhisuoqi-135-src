---
id: CON-llm-token
type: 概念单元
title: "模型词元"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "模型词元"
  - "LLM Token"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "大语言模型实际接收和生成的离散编码单位；输入长度、输出长度、上下文容量与常见计费都以它而非自然语言词数衡量。"
concept_function: "解释「模型词元」是什么、边界在哪；分类：眼前真正有什么（现在就要懂）"
relationships:
  - type: 回应
    target: CON-context-window
    note: "原 kind=used-with｜上下文窗口容量通常按可容纳的 Token 数表示。"
  - type: 冲突
    target: CON-attention-budget
    note: "原 kind=contrast｜Token 计数描述输入规模，注意力预算描述有限处理能力在内容之间的分配。"
---

## 核心内容

**定义（remember）**：大语言模型实际接收和生成的离散编码单位；输入长度、输出长度、上下文容量与常见计费都以它而非自然语言词数衡量。

**费曼一下**：模型读写的不是我们眼中的“字”和“单词”，而是分词器切出的积木块。同一句话换一种分词器，积木数量会变；积木多也不等于问题更难。

**边界（明确不成立的用法）**
- Token 不等同于汉字、英文单词或字符；同一文本在不同分词器下可产生不同数量。
- Token 数量描述输入输出规模，不直接代表信息质量、任务难度或模型注意力是否有效。
- 当前证据缺口：当前摘录没有展开分词器差异与多模态输入如何映射为 Token。

**迁移问题**：当两个提示的 Token 数相同但任务表现不同，为什么不能据此断言它们占用了相同的有效注意力？

**分类问题**：模型此刻到底看见了什么，又能处理多少？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/llm-token.yaml`（name_en: LLM Token）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Coding Agent 如何工作：工具循环与上下文工程》：逐字说明 Token 是模型实际消费和生成的输入单位，并连接计费与上下文窗口约束。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-context-window]] —— 原 kind=used-with｜上下文窗口容量通常按可容纳的 Token 数表示。
- [冲突] [[CON-attention-budget]] —— 原 kind=contrast｜Token 计数描述输入规模，注意力预算描述有限处理能力在内容之间的分配。
- [[CON-context-window_上下文窗口]]
- [[CON-attention-budget_注意力预算]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
