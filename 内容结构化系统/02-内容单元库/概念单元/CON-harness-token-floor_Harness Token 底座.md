---
id: CON-harness-token-floor
type: 概念单元
title: "Harness Token 底座"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "Harness Token 底座"
  - "Harness Token Floor"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "在具体用户任务进入前，Harness 每次模型请求已经携带的系统提示、工具定义与运行脚手架所形成的基础 Token 负担及固定窗口占用。"
concept_function: "解释「Harness Token 底座」是什么、边界在哪；分类：眼前真正有什么（需要时再学）"
relationships:
  - type: 回应
    target: CON-agent-harness
    note: "原 kind=used-with｜Token 底座由 Agent Harness 随每次模型请求附带的静态运行信息产生，但它是负担指标而非 Harness 组件。"
  - type: 回应
    target: CON-system-prompt
    note: "原 kind=used-with｜系统提示是 Harness Token 底座的固定组成之一。"
  - type: 回应
    target: CON-tool-scoping
    note: "原 kind=used-with｜收窄暴露工具与 Schema 可降低每次请求的固定工具说明负担。"
  - type: 回应
    target: CON-context-window
    note: "原 kind=used-with｜固定系统输入会占用 Context Window 容量，即使缓存命中也不消失。"
  - type: 回应
    target: CON-context-compaction
    note: "原 kind=used-with｜固定占用越大，留给会话增长的空间越少，越可能提前触发压缩。"
  - type: 解释
    target: CON-tool-schema-tax
    note: "原 kind=part-of（反向）｜工具 Schema 的固定载荷是 Harness Token 底座中可单独测量的一部分。"
---

## 核心内容

**定义（remember）**：在具体用户任务进入前，Harness 每次模型请求已经携带的系统提示、工具定义与运行脚手架所形成的基础 Token 负担及固定窗口占用。

**费曼一下**：像打车的起步价，车还没走就已经计费。Agent 的起步价不仅占钱，也占上下文座位。

**边界（明确不成立的用法）**
- Token 底座不是一次性启动费；在无服务端状态的调用中，它会被每次请求重发或缓存读取。
- 缓存命中可以降低计费或延迟，却不会让固定前缀从本轮模型可见输入与窗口占用中消失。
- 绝对 Token 底座与它占上下文窗口的比例是同一负担的两种量法，不拆成两张候选卡。
- 底座较大不必然使整项任务更贵，请求次数、批处理能力与会话增长也会共同决定总量。
- 当前证据缺口：需要针对当前版本和真实配置在 API 边界重新测量，并核对各模型的缓存与窗口计量规则，才能比较具体产品。

**迁移问题**：如果缓存降低了固定前缀费用，却没有增加可用窗口，产品应该怎样解释这两种收益的差别？

**分类问题**：模型此刻到底看见了什么，又能处理多少？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/harness-token-floor.yaml`（name_en: Harness Token Floor）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Claude Code 在读提示词前为何已发送 3.3 万 Token》：逐字定义用户任务进入前由系统提示、工具 Schema 与脚手架组成的 Harness Token 固定底座；《Claude Code 在读提示词前为何已发送 3.3 万 Token》：逐字说明缓存命中降低计费却不减少固定底座对上下文窗口的物理占用。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-agent-harness]] —— 原 kind=used-with｜Token 底座由 Agent Harness 随每次模型请求附带的静态运行信息产生，但它是负担指标而非 Harness 组件。
- [回应] [[CON-system-prompt]] —— 原 kind=used-with｜系统提示是 Harness Token 底座的固定组成之一。
- [回应] [[CON-tool-scoping]] —— 原 kind=used-with｜收窄暴露工具与 Schema 可降低每次请求的固定工具说明负担。
- [回应] [[CON-context-window]] —— 原 kind=used-with｜固定系统输入会占用 Context Window 容量，即使缓存命中也不消失。
- [回应] [[CON-context-compaction]] —— 原 kind=used-with｜固定占用越大，留给会话增长的空间越少，越可能提前触发压缩。
- [解释] [[CON-tool-schema-tax]] —— 原 kind=part-of（反向）｜工具 Schema 的固定载荷是 Harness Token 底座中可单独测量的一部分。
- [[CON-agent-harness_Agent Harness]]
- [[CON-system-prompt_系统提示]]
- [[CON-tool-scoping_工具收窄]]
- [[CON-context-window_上下文窗口]]
- [[CON-context-compaction_上下文压缩]]
- [[CON-tool-schema-tax_工具 Schema 税]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
