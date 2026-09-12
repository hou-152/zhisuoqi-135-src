---
id: CON-tool-scoping
type: 概念单元
title: "工具收窄"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何接触外部世界"
  - "AI 如何接触外部世界"
keywords:
  - "工具收窄"
  - "Tool Scoping"
  - "AI 如何接触外部世界"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Tool Scoping 是按当前步骤只向模型暴露最小必要工具集的策略，用更少选择降低误选、权限面和 Context 噪声。"
concept_function: "解释「工具收窄」是什么、边界在哪；分类：AI 如何接触外部世界（需要时再学）"
relationships:
  - type: 回应
    target: CON-tool
    note: "原 kind=used-with｜工具收窄决定当前步骤暴露哪些 Tool。"
  - type: 回应
    target: CON-context-window
    note: "原 kind=used-with｜Tool Scoping 减少进入 Context Window 的无关工具描述。"
  - type: 回应
    target: CON-model-context-protocol
    note: "原 kind=used-with｜Tool Scoping 可关闭当前不用的 MCP 工具面，减少误选与 Context 占用。"
  - type: 回应
    target: CON-tool-workflow-fit
    note: "原 kind=used-with（反向）｜工具收窄决定暴露哪些能力，工作流适配决定这些能力在任务中以什么节奏和证据标准被使用。"
  - type: 回应
    target: CON-agent-action-space
    note: "原 kind=used-with（反向）｜工具收窄是在具体步骤中把行动空间限制到模型当前需要且能处理的范围。"
  - type: 回应
    target: CON-harness-token-floor
    note: "原 kind=used-with（反向）｜收窄暴露工具与 Schema 可降低每次请求的固定工具说明负担。"
  - type: 回应
    target: CON-tool-schema-tax
    note: "原 kind=used-with（反向）｜只暴露当前步骤必要工具可同时降低选择噪声与工具 Schema 静态载荷。"
---

## 核心内容

**定义（remember）**：Tool Scoping 是按当前步骤只向模型暴露最小必要工具集的策略，用更少选择降低误选、权限面和 Context 噪声。

**费曼一下**：工具库像一整面工具架，但模型当前只需要完成一步工作。系统先看这一步要做什么，再从工具架上挑出少量合适工具放到模型面前。工具没有消失，也没有被重新发明；改变的是此刻哪些工具对模型可见、可选和可调用。

**边界（明确不成立的用法）**
- Tool Scoping 不是 Tool 本体，也不是设计工具 schema 的全部工作；它只决定某个步骤向模型暴露哪些已有工具。
- 收窄工具可以减少选择与权限面，但不自动证明模型会选对工具，也不能替代每次调用的权限检查。
- 最小工具集不是固定越少越好；过度收窄会让任务缺少必要能力，应按步骤、角色与真实失败记录动态调整。
- 多 Agent 拆分可以形成不同工具范围，但 Tool Scoping 不要求一定采用多 Agent。

**迁移问题**：如果模型总在十几个相似工具之间选错，第一步应该继续补长工具说明，还是先缩小当前可见工具集？

**分类问题**：AI 靠什么读取、计算或改变外部世界？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/tool-scoping.yaml`（name_en: Tool Scoping）
- 源证据范围（卡片自述）：Akshay 的 Harness 术语解释把 Tool Scoping 列为七项设计决策之一，并给出“只暴露当前步骤所需最小工具集”的原则。来源同时用删减工具与懒加载案例说明工具过多可能带来误选和 Context 成本；具体效果仍需在真实任务上验证。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-tool]] —— 原 kind=used-with｜工具收窄决定当前步骤暴露哪些 Tool。
- [回应] [[CON-context-window]] —— 原 kind=used-with｜Tool Scoping 减少进入 Context Window 的无关工具描述。
- [回应] [[CON-model-context-protocol]] —— 原 kind=used-with｜Tool Scoping 可关闭当前不用的 MCP 工具面，减少误选与 Context 占用。
- [回应] [[CON-tool-workflow-fit]] —— 原 kind=used-with（反向）｜工具收窄决定暴露哪些能力，工作流适配决定这些能力在任务中以什么节奏和证据标准被使用。
- [回应] [[CON-agent-action-space]] —— 原 kind=used-with（反向）｜工具收窄是在具体步骤中把行动空间限制到模型当前需要且能处理的范围。
- [回应] [[CON-harness-token-floor]] —— 原 kind=used-with（反向）｜收窄暴露工具与 Schema 可降低每次请求的固定工具说明负担。
- [回应] [[CON-tool-schema-tax]] —— 原 kind=used-with（反向）｜只暴露当前步骤必要工具可同时降低选择噪声与工具 Schema 静态载荷。
- [[CON-tool_工具]]
- [[CON-context-window_上下文窗口]]
- [[CON-model-context-protocol_模型上下文协议]]
- [[CON-tool-workflow-fit_工具—工作流适配]]
- [[CON-agent-action-space_Agent 行动空间]]
- [[CON-harness-token-floor_Harness Token 底座]]
- [[CON-tool-schema-tax_工具 Schema 税]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
