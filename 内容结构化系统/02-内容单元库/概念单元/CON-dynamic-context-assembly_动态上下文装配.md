---
id: CON-dynamic-context-assembly
type: 概念单元
title: "动态上下文装配"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "动态上下文装配"
  - "Dynamic Context Assembly"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "动态上下文装配是在每次模型调用前，按当前任务与时机把所需信息、工具和历史组合成这一次的模型输入。"
concept_function: "解释「动态上下文装配」是什么、边界在哪；分类：信息如何进入工作台（现在就要懂）"
relationships:
  - type: 解释
    target: CON-context-selection
    note: "原 kind=prerequisite（反向）｜先决定取什么，再决定怎样按时机和格式装配。"
  - type: 解释
    target: CON-context-engineering
    note: "原 kind=part-of｜Dynamic Context Assembly 是 Context Engineering 按任务即时生成输入的实践。"
  - type: 回应
    target: CON-event-driven-agent-automation
    note: "原 kind=used-with（反向）｜新事件进入时通常需要围绕该事件装配当次运行所需上下文。"
---

## 核心内容

**定义（remember）**：动态上下文装配是在每次模型调用前，按当前任务与时机把所需信息、工具和历史组合成这一次的模型输入。

**费曼一下**：它不像提前准备一个永远不变的万能资料包，更像每次开工前重新摆桌面：这次要排会议，就放日历、联系人和发邀请工具；下次要查合同，就换成条款、往来记录和检索工具。装配结果是当前 Context，不是长期资料库本身。

**边界（明确不成立的用法）**
- 动态装配不等于 Context Selection；选择回答“取什么”，装配还要处理来源、时机、格式、顺序与本轮输入的组合。
- 动态装配不等于一次写死的 Prompt 模板；同一任务在状态、权限或外部数据变化后，装配结果也可能变化。
- 它不保证输出正确；来源质量、冲突、权限、工具失败和模型能力仍需独立验证。

**迁移问题**：同一位助理上午排会议、下午审合同，为什么不该让两项任务始终共享一份固定的大 Prompt？

**分类问题**：什么信息应在什么时候、以什么形式进入？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/dynamic-context-assembly.yaml`（name_en: Dynamic Context Assembly）
- 源证据范围（卡片自述）：Philipp Schmid 从 Context Engineering 的倡议者视角，把上下文描述为主模型调用前动态系统的输出：正确的信息与工具要在正确时间、以正确格式提供。本站据此抽出“动态装配”机制；这不是来源声称的统一行业标准，也不表示装得越多越好。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-context-selection]] —— 原 kind=prerequisite（反向）｜先决定取什么，再决定怎样按时机和格式装配。
- [解释] [[CON-context-engineering]] —— 原 kind=part-of｜Dynamic Context Assembly 是 Context Engineering 按任务即时生成输入的实践。
- [回应] [[CON-event-driven-agent-automation]] —— 原 kind=used-with（反向）｜新事件进入时通常需要围绕该事件装配当次运行所需上下文。
- [[CON-context-selection_上下文选择]]
- [[CON-context-engineering_上下文工程]]
- [[CON-event-driven-agent-automation_事件驱动的 Agent 自动化]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
