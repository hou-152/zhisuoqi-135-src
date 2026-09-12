---
id: CON-agent-cli-runtime
type: 概念单元
title: "Agent CLI 运行时"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Agent CLI 运行时"
  - "Agent CLI Runtime"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "在命令行环境中承载 Agent 工作流，使同一套自然语言流程能够从 IDE 延伸到终端、脚本和 CI/CD 自动化。"
concept_function: "解释「Agent CLI 运行时」是什么、边界在哪；分类：AI 如何持续行动（需要时再学）"
relationships:
  - type: 回应
    target: CON-agent-harness
    note: "原 kind=used-with｜CLI runtime 可作为 Harness 暴露 Agent 工作流执行能力的一种入口，但不承担 Harness 的全部职责。"
  - type: 回应
    target: CON-durable-execution
    note: "原 kind=used-with｜进入脚本与 CI/CD 后，长任务仍需持久化执行机制处理恢复和重试。"
---

## 核心内容

**定义（remember）**：在命令行环境中承载 Agent 工作流，使同一套自然语言流程能够从 IDE 延伸到终端、脚本和 CI/CD 自动化。

**费曼一下**：CLI 运行时像给同一套 Agent 流程装上一扇终端入口：它让流程能被脚本和 CI 调用，却不替流程决定目标、权限或验证规则。

**边界（明确不成立的用法）**
- 它是工作流的命令行运行载体，不是工作流定义本身。
- 它只覆盖 CLI 执行边界，不等同于包含权限、状态、评测等完整职责的 Agent Harness。
- 当前证据缺口：需要不同 Agent CLI 的对照，确认共同的运行合同与能力边界。

**迁移问题**：一个流程在 IDE 中依赖隐式打开文件，迁到 CLI 时需要显式补上哪些运行上下文？

**分类问题**：为什么 AI 能连续做事，而不只回答一次？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-cli-runtime.yaml`（name_en: Agent CLI Runtime）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《构建可靠 AI 工作流：智能体原语与上下文工程》：这段直接说明 Agent CLI runtime 把自然语言工作流从 IDE 扩展到终端、脚本与 CI/CD 的运行边界。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-agent-harness]] —— 原 kind=used-with｜CLI runtime 可作为 Harness 暴露 Agent 工作流执行能力的一种入口，但不承担 Harness 的全部职责。
- [回应] [[CON-durable-execution]] —— 原 kind=used-with｜进入脚本与 CI/CD 后，长任务仍需持久化执行机制处理恢复和重试。
- [[CON-agent-harness_Agent Harness]]
- [[CON-durable-execution_持久化执行]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
