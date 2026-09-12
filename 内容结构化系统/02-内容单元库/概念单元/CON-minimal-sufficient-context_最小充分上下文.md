---
id: CON-minimal-sufficient-context
type: 概念单元
title: "最小充分上下文"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "最小充分上下文"
  - "Minimal Sufficient Context"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "最小充分上下文是足以支持当前任务、又尽量不带入无关噪声的高信号信息集合；最小不等于越短越好。"
concept_function: "解释「最小充分上下文」是什么、边界在哪；分类：信息如何进入工作台（现在就要懂）"
relationships:
  - type: 回应
    target: CON-context-selection
    note: "原 kind=used-with｜前者给出选择质量准则，后者执行取舍。"
  - type: 回应
    target: CON-context-compaction
    note: "原 kind=used-with（反向）｜Context Compaction 通过保留相关信息并剔除冗余，逼近 Minimal Sufficient Context。"
  - type: 回应
    target: CON-retrieval-reasoning-dual-task-load
    note: "原 kind=used-with（反向）｜提供聚焦的最小充分证据可以减少同一调用中的检索负担。"
---

## 核心内容

**定义（remember）**：最小充分上下文是足以支持当前任务、又尽量不带入无关噪声的高信号信息集合；最小不等于越短越好。

**费曼一下**：像给一次维修准备工具盘：扳手、螺丝刀和正确零件都在，少任何一样都会卡住；无关的大箱工具则留在旁边。目标不是让工具盘看起来最空，而是让它小而够用。

**边界（明确不成立的用法）**
- “最小”不等于字符最少、摘要最短或固定 token 配额；任何缺失后会破坏任务的关键信息都不该被删。
- 它是一条选择准则，不等于 Context Selection、Dynamic Context Assembly、JIT Retrieval 或 Progressive Disclosure 等具体机制。
- 充分性随任务阶段、模型、工具和可接受风险变化，不存在对所有任务通用的唯一内容清单。
- 高信号不只指与查询语义相似；约束、反例、依赖、权限和验收标准也可能是必要信号。

**迁移问题**：一份只有三行却漏掉关键约束的输入，和一份十页但每页都支撑当前判断的输入，哪一个更接近“最小充分”？

**分类问题**：什么信息应在什么时候、以什么形式进入？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/minimal-sufficient-context.yaml`（name_en: Minimal Sufficient Context）
- 源证据范围（卡片自述）：Anthropic 将有效 Context Engineering 的指导原则表述为寻找能最大化期望结果概率的最小高信号 token 集合，并明确 minimal 不一定意味着 short；《Context Engineering 2.0》也把充分性而非体量视为 Context 的价值所在。
- 定义状态：industry-common｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-context-selection]] —— 原 kind=used-with｜前者给出选择质量准则，后者执行取舍。
- [回应] [[CON-context-compaction]] —— 原 kind=used-with（反向）｜Context Compaction 通过保留相关信息并剔除冗余，逼近 Minimal Sufficient Context。
- [回应] [[CON-retrieval-reasoning-dual-task-load]] —— 原 kind=used-with（反向）｜提供聚焦的最小充分证据可以减少同一调用中的检索负担。
- [[CON-context-selection_上下文选择]]
- [[CON-context-compaction_上下文压缩]]
- [[CON-retrieval-reasoning-dual-task-load_检索—推理双任务负担]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
