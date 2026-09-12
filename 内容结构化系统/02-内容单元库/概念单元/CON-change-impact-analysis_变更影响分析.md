---
id: CON-change-impact-analysis
type: 概念单元
title: "变更影响分析"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "变更影响分析"
  - "Change Impact Analysis"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "沿代码依赖和测试关系计算一次变更可能影响到的函数、类、文件与验证范围的方法。"
concept_function: "解释「变更影响分析」是什么、边界在哪；分类：做完后凭什么相信（需要时再学）"
relationships:
  - type: 回应
    target: CON-context-selection
    note: "原 kind=used-with｜影响范围用于选择评审任务真正需要读取的代码与测试上下文。"
  - type: 回应
    target: CON-verification-loop
    note: "原 kind=used-with｜受影响范围可决定验证循环应运行哪些测试与检查。"
  - type: 冲突
    target: CON-trace-based-evals
    note: "原 kind=contrast｜变更影响分析沿代码结构预测受影响范围，基于轨迹的评测依据实际运行轨迹评价 Agent 行为。"
---

## 核心内容

**定义（remember）**：沿代码依赖和测试关系计算一次变更可能影响到的函数、类、文件与验证范围的方法。

**费曼一下**：你改了一行代码，这行代码会像水波一样影响到哪些函数、哪些文件、哪些测试——"影响半径"就是把这圈涟漪精确画出来，让 AI 知道除了你改的地方，还该关心哪些地方。

**边界（明确不成立的用法）**
- 影响分析给出应检查的范围，不等于证明这些位置已经发生缺陷。
- 静态图谱可能漏掉反射、动态加载、运行时配置或外部服务产生的依赖。
- 当前证据缺口：当前证据来自单一代码图谱实现，尚缺动态依赖与跨服务影响的覆盖说明。

**迁移问题**：面对大量反射和配置驱动的系统，静态影响图之外还要收集什么运行证据，才能决定回归范围？

**分类问题**：Agent 说做完之后，凭什么相信它真的完成？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/change-impact-analysis.yaml`（name_en: Change Impact Analysis）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《用持久化代码图谱给 AI Review 精准上下文》：逐字定义 Blast Radius 为一次改动影响到的函数、类、文件和测试范围，可支撑变更影响分析候选。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-context-selection]] —— 原 kind=used-with｜影响范围用于选择评审任务真正需要读取的代码与测试上下文。
- [回应] [[CON-verification-loop]] —— 原 kind=used-with｜受影响范围可决定验证循环应运行哪些测试与检查。
- [冲突] [[CON-trace-based-evals]] —— 原 kind=contrast｜变更影响分析沿代码结构预测受影响范围，基于轨迹的评测依据实际运行轨迹评价 Agent 行为。
- [[CON-context-selection_上下文选择]]
- [[CON-verification-loop_验证循环]]
- [[CON-trace-based-evals_基于轨迹的评测]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
