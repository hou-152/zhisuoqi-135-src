---
id: CON-observation-masking
type: 概念单元
title: "观察掩码"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "观察掩码"
  - "Observation Masking"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "在保留工具调用发生记录的同时，隐藏或移出旧工具输出细节，以减少其对当前推理的干扰和上下文占用。"
concept_function: "解释「观察掩码」是什么、边界在哪；分类：信息如何进入工作台（需要时再学）"
relationships:
  - type: 冲突
    target: CON-context-compaction
    note: "原 kind=contrast｜观察掩码隐藏旧工具输出细节，Context Compaction 通常把较长历史总结成更短表示。"
  - type: 回应
    target: CON-just-in-time-retrieval
    note: "原 kind=used-with｜被移出窗口的旧观察可保留轻量线索，并在再次需要时按需取回。"
  - type: 回应
    target: CON-context-rot
    note: "原 kind=used-with｜掩码旧工具输出用于降低低信号历史对当前推理的干扰。"
---

## 核心内容

**定义（remember）**：在保留工具调用发生记录的同时，隐藏或移出旧工具输出细节，以减少其对当前推理的干扰和上下文占用。

**费曼一下**：观察掩码不是删除历史，而是降低旧工具结果对当前推理的干扰。模型仍知道发生过调用，但不必反复看到沉重的输出细节。

**边界（明确不成立的用法）**
- 掩码不是删除整个交互历史；调用痕迹仍可保留，沉重的观察内容不再反复进入当前输入。
- 被隐藏的信息若后续仍需要，系统应保留可重新取回的路径。
- 当前证据缺口：当前证据未说明哪些工具输出可安全掩码，以及重新取回时如何恢复引用关系。

**迁移问题**：哪些旧工具结果可以只保留调用痕迹，哪些必须保留关键数值或原文才能避免后续误判？

**分类问题**：什么信息应在什么时候、以什么形式进入？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/observation-masking.yaml`（name_en: Observation Masking）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Agent Harness 的本质：把模型放进可控的执行系统》：逐字定义观察掩码隐藏旧工具输出但保留调用历史的上下文治理机制。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-context-compaction]] —— 原 kind=contrast｜观察掩码隐藏旧工具输出细节，Context Compaction 通常把较长历史总结成更短表示。
- [回应] [[CON-just-in-time-retrieval]] —— 原 kind=used-with｜被移出窗口的旧观察可保留轻量线索，并在再次需要时按需取回。
- [回应] [[CON-context-rot]] —— 原 kind=used-with｜掩码旧工具输出用于降低低信号历史对当前推理的干扰。
- [[CON-context-compaction_上下文压缩]]
- [[CON-just-in-time-retrieval_即时检索]]
- [[CON-context-rot_上下文腐烂]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
