---
id: CON-reasoning-effort
type: 概念单元
title: "推理强度"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "推理强度"
  - "Reasoning Effort"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "控制模型在生成最终结果前投入多少推理计算的运行参数，用于在任务质量、响应时间与成本之间取舍。"
concept_function: "解释「推理强度」是什么、边界在哪；分类：人如何控制 AI（需要时再学）"
relationships:
  - type: 回应
    target: CON-large-language-model
    note: "原 kind=used-with｜推理强度控制一次模型运行中分配给推理过程的额外计算预算。"
  - type: 冲突
    target: CON-attention-budget
    note: "原 kind=contrast｜推理强度调节计算投入，注意力预算描述模型处理当前上下文信息的有限能力。"
---

## 核心内容

**定义（remember）**：控制模型在生成最终结果前投入多少推理计算的运行参数，用于在任务质量、响应时间与成本之间取舍。

**费曼一下**：这是 agent 在速度、成本和质量之间的旋钮；难题值得多花 token，简单任务不一定需要。

**边界（明确不成立的用法）**
- 更高推理强度通常意味着更多计算预算，但不保证每个任务都更正确。
- 它不是上下文长度，也不同于注意力预算；前者控制额外推理投入，后者关注输入信息之间的有限处理能力。
- 当前证据缺口：当前证据未量化不同任务上推理强度对成本、延迟与正确率的关系。

**迁移问题**：当高推理强度只让答案更长却不更准时，你会调整任务拆分、评分还是路由规则，为什么？

**分类问题**：人怎样说明目标、复用方法并限制行动？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/reasoning-effort.yaml`（name_en: Reasoning Effort）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Coding Agent 如何工作：工具循环与上下文工程》：逐字把 reasoning effort 定义为可调参数，并说明其在速度、成本与质量之间的取舍作用。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-large-language-model]] —— 原 kind=used-with｜推理强度控制一次模型运行中分配给推理过程的额外计算预算。
- [冲突] [[CON-attention-budget]] —— 原 kind=contrast｜推理强度调节计算投入，注意力预算描述模型处理当前上下文信息的有限能力。
- [[CON-large-language-model_大语言模型]]
- [[CON-attention-budget_注意力预算]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
