---
id: CON-retrieval-reasoning-dual-task-load
type: 概念单元
title: "检索—推理双任务负担"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "检索—推理双任务负担"
  - "Retrieval–Reasoning Dual-Task Load"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "当模型在一次调用中既要从长输入定位相关证据、又要基于证据推理时，检索步骤会额外消耗可靠性，使其表现低于已提供聚焦证据的同等推理任务。"
concept_function: "解释「检索—推理双任务负担」是什么、边界在哪；分类：眼前真正有什么（需要时再学）"
relationships:
  - type: 回应
    target: CON-context-selection
    note: "原 kind=used-with｜先做上下文选择可把资料定位与基于证据的推理拆开。"
  - type: 回应
    target: CON-minimal-sufficient-context
    note: "原 kind=used-with｜提供聚焦的最小充分证据可以减少同一调用中的检索负担。"
---

## 核心内容

**定义（remember）**：当模型在一次调用中既要从长输入定位相关证据、又要基于证据推理时，检索步骤会额外消耗可靠性，使其表现低于已提供聚焦证据的同等推理任务。

**费曼一下**：这解释了为什么「把所有历史都塞进去」不是省事而是加活。你没有帮模型准备好材料，你只是把找材料的工作也外包给了它，而它并不擅长在一次前向里既当图书管理员又当分析师。RAG 的价值不在省 token，在于把两件事拆开。

**边界（明确不成立的用法）**
- 它描述检索与推理被捆在一次调用中的复合负担，不表示所有检索增强都会降低表现。
- focused/full 的性能差还可能受歧义、干扰项和模型拒答策略影响。
- 「检索—推理双任务负担」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。

**迁移问题**：当完整输入组表现更差时，怎样排除歧义、干扰项和拒答策略，而不是把差值全部算成检索负担？

**分类问题**：模型此刻到底看见了什么，又能处理多少？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/retrieval-reasoning-dual-task-load.yaml`（name_en: Retrieval–Reasoning Dual-Task Load）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Chroma 实测上下文腐烂：输入越长，模型并非均匀地可靠》：原文用 focused/full 对照把同一次调用中先检索、再推理的额外负担单独呈现。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-context-selection]] —— 原 kind=used-with｜先做上下文选择可把资料定位与基于证据的推理拆开。
- [回应] [[CON-minimal-sufficient-context]] —— 原 kind=used-with｜提供聚焦的最小充分证据可以减少同一调用中的检索负担。
- [[CON-context-selection_上下文选择]]
- [[CON-minimal-sufficient-context_最小充分上下文]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
