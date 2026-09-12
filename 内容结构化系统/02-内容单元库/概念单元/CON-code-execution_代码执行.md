---
id: CON-code-execution
type: 概念单元
title: "代码执行"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "代码执行"
  - "Code Execution"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "让 Agent 通过 shell 或运行时编写并执行代码，把未被预先枚举的计算与操作组合成一种通用外部能力。"
concept_function: "解释「代码执行」是什么、边界在哪；分类：AI 如何接触外部世界（现在就要懂）"
relationships:
  - type: 解释
    target: CON-tool
    note: "原 kind=part-of｜代码执行是 Harness 向 Agent 暴露的一类通用工具能力。"
  - type: 回应
    target: CON-sandbox
    note: "原 kind=used-with｜执行模型生成的代码通常需要隔离环境来限制影响范围。"
---

## 核心内容

**定义（remember）**：让 Agent 通过 shell 或运行时编写并执行代码，把未被预先枚举的计算与操作组合成一种通用外部能力。

**费曼一下**：给 Agent 一间能写程序并按下运行键的工作间，它就能临时组合许多没预先做成按钮的操作。真正动手的是外部运行时，所以门锁、时限和验收都不能省。

**边界（明确不成立的用法）**
- 代码执行是 Tool 的一类高通用能力，不等于模型本身在执行代码。
- 通用性不会自动带来安全性；权限、Sandbox、超时和结果验证仍需独立设计。
- 当前证据缺口：需要补充不同执行形态的边界，例如 shell、解释器与远程计算环境。

**迁移问题**：当专用工具可以完成同一任务时，什么条件下仍值得开放通用代码执行，额外风险如何补偿？

**分类问题**：AI 靠什么读取、计算或改变外部世界？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/code-execution.yaml`（name_en: Code Execution）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《LangChain 解剖 agent harness：Agent = 模型 + harness》：原文把 bash 与代码执行描述为可按需生成手段的通用工具，区别于逐个预配置专用工具。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-tool]] —— 原 kind=part-of｜代码执行是 Harness 向 Agent 暴露的一类通用工具能力。
- [回应] [[CON-sandbox]] —— 原 kind=used-with｜执行模型生成的代码通常需要隔离环境来限制影响范围。
- [[CON-tool_工具]]
- [[CON-sandbox_沙箱]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
