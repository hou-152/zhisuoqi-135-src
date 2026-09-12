---
id: CON-browsing-loop
type: 概念单元
title: "浏览循环"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "浏览循环"
  - "Browsing Loop"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Agent 从一次广泛搜索或读取中不断发现新线索并继续扩张探索范围，却没有围绕具体问题收窄证据或形成停止判断的循环性反模式。"
concept_function: "解释「浏览循环」是什么、边界在哪；分类：AI 如何持续行动（需要时再学）"
relationships:
  - type: 回应
    target: CON-trace-based-evals
    note: "原 kind=used-with｜浏览循环通常需要从搜索、读取和错误恢复的轨迹中识别，而非只看最终分数。"
  - type: 冲突
    target: CON-context-selection
    note: "原 kind=contrast｜上下文选择应收窄与当前问题相关的证据，浏览循环则让每次新内容继续扩大候选范围。"
---

## 核心内容

**定义（remember）**：Agent 从一次广泛搜索或读取中不断发现新线索并继续扩张探索范围，却没有围绕具体问题收窄证据或形成停止判断的循环性反模式。

**费曼一下**：每次搜索都发现一点新东西，于是 agent 永远觉得还该再看一点。它一直在移动，却没有更接近要回答的问题。

**边界（明确不成立的用法）**
- 它不是所有广泛探索；开放式规划任务可能确实需要先建立较宽的区域理解。
- 判断重点是每一轮是否减少关键不确定性，而不只是工具调用次数是否增加。
- 「浏览循环」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。

**迁移问题**：面对一个本来就需要摸清全貌的开放题，怎样区分必要的广泛探索与已经失去问题锚点的浏览循环？

**分类问题**：为什么 AI 能连续做事，而不只回答一次？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/browsing-loop.yaml`（name_en: Browsing Loop）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《工具更多反而让 Copilot 代码审查变差，GitHub 如何修正》：原文明确命名一种搜索不断扩散、却没有逼近任务证据的 Agent 失败循环。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-trace-based-evals]] —— 原 kind=used-with｜浏览循环通常需要从搜索、读取和错误恢复的轨迹中识别，而非只看最终分数。
- [冲突] [[CON-context-selection]] —— 原 kind=contrast｜上下文选择应收窄与当前问题相关的证据，浏览循环则让每次新内容继续扩大候选范围。
- [[CON-trace-based-evals_基于轨迹的评测]]
- [[CON-context-selection_上下文选择]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
