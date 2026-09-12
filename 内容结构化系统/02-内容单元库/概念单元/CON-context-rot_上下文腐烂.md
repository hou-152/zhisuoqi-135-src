---
id: CON-context-rot
type: 概念单元
title: "上下文腐烂"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "上下文腐烂"
  - "Context Rot"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Chroma 用“上下文腐烂”概括一组受控观察：在任务难度不变时，仅增加输入长度，也会使受测模型的表现更不可靠，而且退化并不均匀。"
concept_function: "解释「上下文腐烂」是什么、边界在哪；分类：信息如何进入工作台（现在就要懂）"
relationships:
  - type: 回应
    target: CON-attention-budget
    note: "原 kind=used-with（反向）｜注意力预算是解释框架，不是 Context Rot 的唯一已证实原因。"
  - type: 冲突
    target: CON-lost-in-the-middle
    note: "原 kind=contrast｜前者是更广的长度相关退化，后者是位置效应。"
  - type: 回应
    target: CON-context-compaction
    note: "原 kind=used-with（反向）｜Context Compaction 是 Context Rot 加重时可采用的治理动作。"
  - type: 回应
    target: CON-agent-session-management
    note: "原 kind=used-with（反向）｜会话越长越容易积累噪音，Context Rot 是需要主动治理会话的主要原因之一。"
  - type: 回应
    target: CON-observation-masking
    note: "原 kind=used-with（反向）｜掩码旧工具输出用于降低低信号历史对当前推理的干扰。"
---

## 核心内容

**定义（remember）**：Chroma 用“上下文腐烂”概括一组受控观察：在任务难度不变时，仅增加输入长度，也会使受测模型的表现更不可靠，而且退化并不均匀。

**费曼一下**：同一道题、同一条关键证据都不变，只往输入里加入更多材料。如果输入越长，模型越容易漏用证据、混入干扰项或放弃作答，那么增加长度本身就带来了可靠性成本。

**边界（明确不成立的用法）**
- Context Rot 不等于 Context Window；前者谈实际利用可靠性，后者谈一次调用可承载的容量边界。
- 它不等于 Lost in the Middle；后者专指位置效应，而 Chroma 的语义相似度实验跨 11 个 needle 位置没有观察到显著位置影响。
- 报告没有给出统一失效阈值。更长输入仍可能带来信息增益，是否值得取决于具体任务、模型与实测。
- 不同模型会以漏答、幻觉、拒答或复制错误等不同方式表现不可靠；只统计一种失败姿态会读错结果。
- needle-haystack 相似度实验只覆盖两个主题，作者明确认为证据不足以支持普遍结论。

**迁移问题**：如果模型在 100K 输入里偶尔漏答，但把相同证据放到 10K 输入就稳定，下一步应先查模型容量，还是查输入增长带来的利用退化？

**分类问题**：什么信息应在什么时候、以什么形式进入？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context-rot.yaml`（name_en: Context Rot）
- 源证据范围（卡片自述）：Chroma 在 18 个模型上完成 194,480 次调用，并以“固定任务难度、只改变输入长度”为主要控制思路。语义检索、带干扰项问答、LongMemEval 与重复词复制等实验共同显示：长度增加时，可靠性会以不同方式下降。报告观察的是行为结果；关于结构为何影响注意力的解释仍是推测，未被证明为统一机制。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-attention-budget]] —— 原 kind=used-with（反向）｜注意力预算是解释框架，不是 Context Rot 的唯一已证实原因。
- [冲突] [[CON-lost-in-the-middle]] —— 原 kind=contrast｜前者是更广的长度相关退化，后者是位置效应。
- [回应] [[CON-context-compaction]] —— 原 kind=used-with（反向）｜Context Compaction 是 Context Rot 加重时可采用的治理动作。
- [回应] [[CON-agent-session-management]] —— 原 kind=used-with（反向）｜会话越长越容易积累噪音，Context Rot 是需要主动治理会话的主要原因之一。
- [回应] [[CON-observation-masking]] —— 原 kind=used-with（反向）｜掩码旧工具输出用于降低低信号历史对当前推理的干扰。
- [[CON-attention-budget_注意力预算]]
- [[CON-lost-in-the-middle_迷失在中间]]
- [[CON-context-compaction_上下文压缩]]
- [[CON-agent-session-management_Agent 会话管理]]
- [[CON-observation-masking_观察掩码]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
