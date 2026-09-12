---
id: CON-harness-compute-separation
type: 概念单元
title: "Harness 与计算分离"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "Harness 与计算分离"
  - "Harness-Compute Separation"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "将负责 Agent 控制、状态与凭据的 Harness 层，同运行模型生成代码的计算环境分开，使两层可以分别隔离、恢复和扩展。"
concept_function: "解释「Harness 与计算分离」是什么、边界在哪；分类：人如何控制 AI（需要时再学）"
relationships:
  - type: 回应
    target: CON-agent-harness
    note: "原 kind=used-with｜该模式把 Harness 保留在控制侧，避免与模型生成代码的执行环境混成同一信任域。"
  - type: 回应
    target: CON-sandbox
    note: "原 kind=used-with｜沙箱承担被隔离的计算侧，是该分层模式的执行端。"
---

## 核心内容

**定义（remember）**：将负责 Agent 控制、状态与凭据的 Harness 层，同运行模型生成代码的计算环境分开，使两层可以分别隔离、恢复和扩展。

**费曼一下**：把「带着 agent 运行的控制层」与「agent 在里面跑代码的执行层」分开。好处三个字：安全、持久、可扩展。模型生成的代码在 sandbox 里跑，而 credentials 住在 harness 端不给模型碰。

**边界（明确不成立的用法）**
- 它是运行架构分层，不是把 Harness 或沙箱从 Agent 系统中移除。
- 分离能降低执行环境接触凭据的机会，但不能单独消除提示注入或数据外泄风险。
- 具体进程、网络和存储边界仍由实现决定。
- 当前证据缺口：需要明确不同部署形态下状态、凭据与网络边界的实现差异。

**迁移问题**：哪些中间状态必须留在 Harness 才能安全恢复，哪些放进沙箱反而更便于隔离和复现？

**分类问题**：人怎样说明目标、复用方法并限制行动？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/harness-compute-separation.yaml`（name_en: Harness-Compute Separation）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》：这段直接给出控制层与执行层分离的架构做法及其凭据隔离目的；《Harness engineering：把 agent 能力落到工具、约束和循环里》：这段从 runtime 与 Harness 的职责区分补充执行环境和可靠工作循环不能混为一层的证据。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-agent-harness]] —— 原 kind=used-with｜该模式把 Harness 保留在控制侧，避免与模型生成代码的执行环境混成同一信任域。
- [回应] [[CON-sandbox]] —— 原 kind=used-with｜沙箱承担被隔离的计算侧，是该分层模式的执行端。
- [[CON-agent-harness_Agent Harness]]
- [[CON-sandbox_沙箱]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
