---
id: CON-harness-overfitting
type: 概念单元
title: "Harness 过拟合"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "Harness 过拟合"
  - "Harness Overfitting"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "模型因在特定 Harness 的工具与交互协议中后训练而过度依赖其实现细节，换用等价但不同的运行接口时表现反而下降。"
concept_function: "解释「Harness 过拟合」是什么、边界在哪；分类：做完后凭什么相信（深水区）"
relationships:
  - type: 回应
    target: CON-harness-engineering
    note: "原 kind=used-with｜Harness Engineering 需要用真实任务比较原生与替代接口，而不是假设官方配置恒优。"
  - type: 回应
    target: CON-trace-based-evals
    note: "原 kind=used-with｜固定模型、任务与评测条件的跨 Harness 轨迹比较可检验泛化下降。"
---

## 核心内容

**定义（remember）**：模型因在特定 Harness 的工具与交互协议中后训练而过度依赖其实现细节，换用等价但不同的运行接口时表现反而下降。

**费曼一下**：像只在一种键盘布局上练成的打字员：换一把功能等价的键盘就明显失速，暴露他学到的是接口习惯，不是任务本领。

**边界（明确不成立的用法）**
- 与原生 Harness 协同良好不自动等于过拟合；只有跨等价接口的泛化下降才支持该判断。
- 原厂 Harness 也不必然最优，必须固定模型与任务做跨 Harness 比较。
- 当前证据缺口：需要排除工具能力、提示与资源配置差异后再归因于过拟合。

**迁移问题**：如果换 Harness 后下降来自更慢的工具而非协议陌生，怎样调整实验才能支持或推翻过拟合判断？

**分类问题**：Agent 说做完之后，凭什么相信它真的完成？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/harness-overfitting.yaml`（name_en: Harness Overfitting）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《LangChain 解剖 agent harness：Agent = 模型 + harness》：原文说明模型与 Harness 共同后训练可能造成对特定工具逻辑的依赖，并把它明确称为过拟合；《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》：第二篇文章再次明确模型可能对原生 Harness 过拟合，并以跨 Harness 表现差异支撑其可检验性。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：深水区

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-harness-engineering]] —— 原 kind=used-with｜Harness Engineering 需要用真实任务比较原生与替代接口，而不是假设官方配置恒优。
- [回应] [[CON-trace-based-evals]] —— 原 kind=used-with｜固定模型、任务与评测条件的跨 Harness 轨迹比较可检验泛化下降。
- [[CON-harness-engineering_Harness 工程]]
- [[CON-trace-based-evals_基于轨迹的评测]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
