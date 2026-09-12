---
id: CON-sandbox
type: 概念单元
title: "沙箱"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "沙箱"
  - "Sandbox"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Sandbox 是受隔离与资源限制的执行环境，让 Agent 能在一个被圈定的工作区内行动，并把出错时的影响范围控制在边界内。"
concept_function: "解释「沙箱」是什么、边界在哪；分类：人如何控制 AI（需要时再学）"
relationships:
  - type: 回应
    target: CON-permission-boundary
    note: "原 kind=used-with（反向）｜一个判断能否做，一个限制动作影响范围。"
  - type: 冲突
    target: CON-guardrails
    note: "原 kind=contrast｜Sandbox 遏制后果，Guardrails 检查并尝试阻断路径。"
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜Sandbox 是 Agent Harness 隔离执行环境的组成部分。"
  - type: 回应
    target: CON-durable-execution
    note: "原 kind=used-with｜Sandbox 与 Durable Execution 配合，让环境失效后仍能从检查点恢复。"
  - type: 回应
    target: CON-tool
    note: "原 kind=used-with｜Tool 在 Sandbox 中执行，以隔离副作用并捕获结果。"
  - type: 回应
    target: CON-verification-loop
    note: "原 kind=used-with｜Sandbox 为 Verification Loop 提供安全执行、日志、截图与测试环境。"
  - type: 回应
    target: CON-harness-compute-separation
    note: "原 kind=used-with（反向）｜沙箱承担被隔离的计算侧，是该分层模式的执行端。"
  - type: 回应
    target: CON-code-execution
    note: "原 kind=used-with（反向）｜执行模型生成的代码通常需要隔离环境来限制影响范围。"
  - type: 冲突
    target: CON-filesystem-workspace
    note: "原 kind=contrast（反向）｜文件系统工作区提供持久协作面，Sandbox 主要限制执行位置与影响范围。"
---

## 核心内容

**定义（remember）**：Sandbox 是受隔离与资源限制的执行环境，让 Agent 能在一个被圈定的工作区内行动，并把出错时的影响范围控制在边界内。

**费曼一下**：把它想成一间可以推倒重建的实验室。Agent 可以在里面写文件、跑代码、装依赖，出错产生的碎片尽量留在房间里，不直接砸到外部系统。沙箱回答的是“在哪里做、最坏影响到哪”，而不是“这个动作该不该被授权”。

**边界（明确不成立的用法）**
- Sandbox 限制执行环境与爆炸半径，不负责判断动作是否获准；权限边界仍应在执行前独立生效。
- 沙箱不是绝对安全证明；挂载目录、网络、凭证、内核、资源配额和逃逸风险都取决于实际配置。
- “在容器里运行”不自动等于有效隔离；需要核对真实文件系统、网络、进程、用户身份与秘密暴露面。
- 可抛弃环境有助于恢复和扩展，但持久状态与副作用仍需单独设计。

**迁移问题**：一个动作已经获得用户授权，但可能执行未知代码时，为什么仍需要 Sandbox，而不能把授权当作隔离？

**分类问题**：人怎样说明目标、复用方法并限制行动？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/sandbox.yaml`（name_en: Sandbox）
- 源证据范围（卡片自述）：LangChain 的 Agent Harness 文章把 Sandbox 作为默认运行基础设施：它为代码、文件与依赖提供隔离环境，可叠加命令 allow-list 和网络隔离，并支持按需创建与销毁。本站采用“执行位置与影响范围”边界，不把隔离冒充授权或绝对安全。
- 定义状态：industry-common｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-permission-boundary]] —— 原 kind=used-with（反向）｜一个判断能否做，一个限制动作影响范围。
- [冲突] [[CON-guardrails]] —— 原 kind=contrast｜Sandbox 遏制后果，Guardrails 检查并尝试阻断路径。
- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜Sandbox 是 Agent Harness 隔离执行环境的组成部分。
- [回应] [[CON-durable-execution]] —— 原 kind=used-with｜Sandbox 与 Durable Execution 配合，让环境失效后仍能从检查点恢复。
- [回应] [[CON-tool]] —— 原 kind=used-with｜Tool 在 Sandbox 中执行，以隔离副作用并捕获结果。
- [回应] [[CON-verification-loop]] —— 原 kind=used-with｜Sandbox 为 Verification Loop 提供安全执行、日志、截图与测试环境。
- [回应] [[CON-harness-compute-separation]] —— 原 kind=used-with（反向）｜沙箱承担被隔离的计算侧，是该分层模式的执行端。
- [回应] [[CON-code-execution]] —— 原 kind=used-with（反向）｜执行模型生成的代码通常需要隔离环境来限制影响范围。
- [冲突] [[CON-filesystem-workspace]] —— 原 kind=contrast（反向）｜文件系统工作区提供持久协作面，Sandbox 主要限制执行位置与影响范围。
- [[CON-permission-boundary_权限边界]]
- [[CON-guardrails_护栏]]
- [[CON-agent-harness_Agent Harness]]
- [[CON-durable-execution_持久化执行]]
- [[CON-tool_工具]]
- [[CON-verification-loop_验证循环]]
- [[CON-harness-compute-separation_Harness 与计算分离]]
- [[CON-code-execution_代码执行]]
- [[CON-filesystem-workspace_文件系统工作区]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
