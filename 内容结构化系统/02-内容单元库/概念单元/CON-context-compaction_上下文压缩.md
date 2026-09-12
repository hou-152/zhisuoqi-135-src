---
id: CON-context-compaction
type: 概念单元
title: "上下文压缩"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "上下文压缩"
  - "Context Compaction"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "上下文压缩是在长任务接近窗口限制时，把旧轨迹蒸馏成高信号摘要，并用摘要与可恢复引用开启新的上下文窗口。"
concept_function: "解释「上下文压缩」是什么、边界在哪；分类：信息如何进入工作台（需要时再学）"
relationships:
  - type: 解释
    target: CON-agent-harness
    note: "原 kind=part-of｜Context Compaction 是 Agent Harness 管理长会话的中间件。"
  - type: 解释
    target: CON-context-engineering
    note: "原 kind=part-of｜Context Compaction 是 Context Engineering 管理窗口内容的实践之一。"
  - type: 回应
    target: CON-context-rot
    note: "原 kind=used-with｜Context Compaction 是 Context Rot 加重时可采用的治理动作。"
  - type: 回应
    target: CON-agent-loop
    note: "原 kind=used-with｜Agent Loop 更新 Context 时可触发 Context Compaction，再继续下一轮。"
  - type: 回应
    target: CON-context-window
    note: "原 kind=used-with｜Context Compaction 在 Context Window 接近上限时蒸馏历史并维持连续性。"
  - type: 回应
    target: CON-memory
    note: "原 kind=used-with｜Context Compaction 与外部 Memory 配合，缩短窗口而保留可恢复原文。"
  - type: 回应
    target: CON-minimal-sufficient-context
    note: "原 kind=used-with｜Context Compaction 通过保留相关信息并剔除冗余，逼近 Minimal Sufficient Context。"
  - type: 回应
    target: CON-agent-session-management
    note: "原 kind=used-with（反向）｜压缩是长会话减重的一个选择，但需要按下一阶段目标决定保留内容。"
  - type: 回应
    target: CON-harness-token-floor
    note: "原 kind=used-with（反向）｜固定占用越大，留给会话增长的空间越少，越可能提前触发压缩。"
  - type: 冲突
    target: CON-prompt-caching
    note: "原 kind=contrast（反向）｜Prompt Caching 复用稳定前缀的计算，Context Compaction 缩短历史表示；短而频繁变化的摘要仍可能破坏缓存。"
  - type: 回应
    target: CON-subagent-orchestration
    note: "原 kind=used-with（反向）｜来源强调子 Agent 深度探索后返回压缩摘要，以降低主上下文负担。"
  - type: 冲突
    target: CON-restorable-compression
    note: "原 kind=contrast（反向）｜上下文压缩常用摘要承接历史，可恢复压缩则强调被省略原内容仍有回取路径。"
  - type: 冲突
    target: CON-observation-masking
    note: "原 kind=contrast（反向）｜观察掩码隐藏旧工具输出细节，Context Compaction 通常把较长历史总结成更短表示。"
---

## 核心内容

**定义（remember）**：上下文压缩是在长任务接近窗口限制时，把旧轨迹蒸馏成高信号摘要，并用摘要与可恢复引用开启新的上下文窗口。

**费曼一下**：长任务像写满了一块白板。压缩不是把白板缩小拍照，而是把架构决定、未决问题和当前进度誊到新白板上，再附上能回查原材料的索引。这样能继续工作，但摘要必然有损，漏掉的细节可能过一会儿才显出价值。

**边界（明确不成立的用法）**
- 压缩不等于删除最旧消息；它要提炼当前仍重要的状态、决定与未决事项。
- 压缩不等于结构化记事或完整外部记忆；摘要负责连续性，可恢复引用负责回查，两者应显式区分。
- 压缩是有损转换；摘要遗漏、错误归纳和过早丢弃都可能让后续任务偏航。
- 压缩通过释放空间缓解窗口压力，但不能自动消除 Context Rot、错误状态或错误目标。

**迁移问题**：如果一份压缩摘要很短，却漏掉了尚未解决的安全约束，它仍算高质量压缩吗？为什么？

**分类问题**：什么信息应在什么时候、以什么形式进入？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context-compaction.yaml`（name_en: Context Compaction）
- 源证据范围（卡片自述）：Anthropic 从构建 Agent 的实践者与平台方视角，把 compaction 作为长时程任务的第一根杠杆：接近窗口上限时摘要旧对话并重新初始化窗口。来源同时强调压缩取舍与过度压缩风险；这不是无损保证，也不是适合所有任务的唯一方案。
- 定义状态：industry-common｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-agent-harness]] —— 原 kind=part-of｜Context Compaction 是 Agent Harness 管理长会话的中间件。
- [解释] [[CON-context-engineering]] —— 原 kind=part-of｜Context Compaction 是 Context Engineering 管理窗口内容的实践之一。
- [回应] [[CON-context-rot]] —— 原 kind=used-with｜Context Compaction 是 Context Rot 加重时可采用的治理动作。
- [回应] [[CON-agent-loop]] —— 原 kind=used-with｜Agent Loop 更新 Context 时可触发 Context Compaction，再继续下一轮。
- [回应] [[CON-context-window]] —— 原 kind=used-with｜Context Compaction 在 Context Window 接近上限时蒸馏历史并维持连续性。
- [回应] [[CON-memory]] —— 原 kind=used-with｜Context Compaction 与外部 Memory 配合，缩短窗口而保留可恢复原文。
- [回应] [[CON-minimal-sufficient-context]] —— 原 kind=used-with｜Context Compaction 通过保留相关信息并剔除冗余，逼近 Minimal Sufficient Context。
- [回应] [[CON-agent-session-management]] —— 原 kind=used-with（反向）｜压缩是长会话减重的一个选择，但需要按下一阶段目标决定保留内容。
- [回应] [[CON-harness-token-floor]] —— 原 kind=used-with（反向）｜固定占用越大，留给会话增长的空间越少，越可能提前触发压缩。
- [冲突] [[CON-prompt-caching]] —— 原 kind=contrast（反向）｜Prompt Caching 复用稳定前缀的计算，Context Compaction 缩短历史表示；短而频繁变化的摘要仍可能破坏缓存。
- [回应] [[CON-subagent-orchestration]] —— 原 kind=used-with（反向）｜来源强调子 Agent 深度探索后返回压缩摘要，以降低主上下文负担。
- [冲突] [[CON-restorable-compression]] —— 原 kind=contrast（反向）｜上下文压缩常用摘要承接历史，可恢复压缩则强调被省略原内容仍有回取路径。
- [冲突] [[CON-observation-masking]] —— 原 kind=contrast（反向）｜观察掩码隐藏旧工具输出细节，Context Compaction 通常把较长历史总结成更短表示。
- [[CON-agent-harness_Agent Harness]]
- [[CON-context-engineering_上下文工程]]
- [[CON-context-rot_上下文腐烂]]
- [[CON-agent-loop_Agent 循环]]
- [[CON-context-window_上下文窗口]]
- [[CON-memory_记忆]]
- [[CON-minimal-sufficient-context_最小充分上下文]]
- [[CON-agent-session-management_Agent 会话管理]]
- [[CON-harness-token-floor_Harness Token 底座]]
- [[CON-prompt-caching_提示词缓存]]
- [[CON-subagent-orchestration_子 Agent 编排]]
- [[CON-restorable-compression_可恢复压缩]]
- [[CON-observation-masking_观察掩码]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
