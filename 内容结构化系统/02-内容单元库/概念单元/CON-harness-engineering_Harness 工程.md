---
id: CON-harness-engineering
type: 概念单元
title: "Harness 工程"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "Harness 工程"
  - "Harness Engineering"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Harness Engineering 是设计、测试和改进模型外运行系统的实践，让 Agent 在真实任务中更持续、可控、可恢复且可验证。"
concept_function: "解释「Harness 工程」是什么、边界在哪；分类：AI 如何持续行动（现在就要懂）"
relationships:
  - type: 解释
    target: CON-context-engineering
    note: "原 kind=part-of（反向）｜本站工程范围轴采用 Harness Engineering 通常包住 Context Engineering。"
  - type: 回应
    target: CON-context-engineering
    note: "原 kind=used-with｜Harness 管运行，并在运行时装配 Context。"
  - type: 解释
    target: CON-guardrails
    note: "原 kind=part-of（反向）｜Guardrails 是 Harness Engineering 约束循环行动路径的实践之一。"
  - type: 回应
    target: CON-harness-overfitting
    note: "原 kind=used-with（反向）｜Harness Engineering 需要用真实任务比较原生与替代接口，而不是假设官方配置恒优。"
---

## 核心内容

**定义（remember）**：Harness Engineering 是设计、测试和改进模型外运行系统的实践，让 Agent 在真实任务中更持续、可控、可恢复且可验证。

**费曼一下**：先把模型当成暂时不能换的核心。Harness 工程师改的是它周围的运行壳：怎样转循环、给哪些工具、保存什么状态、如何恢复错误、在哪里检查权限、用什么证据判断完成。模型前后可能完全相同，但整套系统的行为会因为运行壳的设计而变化。

**边界（明确不成立的用法）**
- 工程范围轴上，本站采用 Prompt Engineering → Context Engineering → Harness Engineering 的范围递增表达，Harness Engineering 通常包住前两者。
- 系统职责轴上，Context Engineering 主要管理模型获得的信息，Harness Engineering 主要管理系统怎样持续、受控地运行；两者在运行时 Context 装配处交叉。
- HumanLayer 来源曾提出 Harness Engineering 是 Context Engineering 的子集，与本站工程范围轴方向相反；该来源观点仍保留为 HOLD，不能被本站口径改写成行业共识。
- Harness Engineering 是工程实践，Agent Harness 是被设计和改进的运行对象；二者不是 Alias。

**迁移问题**：当同一个模型总在工具失败后卡住时，先换模型还是先改错误回灌与停止条件，哪个更符合 Harness Engineering？

**分类问题**：为什么 AI 能连续做事，而不只回答一次？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/harness-engineering.yaml`（name_en: Harness Engineering）
- 源证据范围（卡片自述）：Akshay 用三层工程说明 Prompt Engineering 打磨指令、Context Engineering 管理模型看到什么与何时看到，而 Harness Engineering 在工程范围上通常覆盖前两者并加入工具编排、状态、错误恢复、验证、安全与生命周期。本站另用系统职责轴说明 Context 管信息、Harness 管运行。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [解释] [[CON-context-engineering]] —— 原 kind=part-of（反向）｜本站工程范围轴采用 Harness Engineering 通常包住 Context Engineering。
- [回应] [[CON-context-engineering]] —— 原 kind=used-with｜Harness 管运行，并在运行时装配 Context。
- [解释] [[CON-guardrails]] —— 原 kind=part-of（反向）｜Guardrails 是 Harness Engineering 约束循环行动路径的实践之一。
- [回应] [[CON-harness-overfitting]] —— 原 kind=used-with（反向）｜Harness Engineering 需要用真实任务比较原生与替代接口，而不是假设官方配置恒优。
- [[CON-context-engineering_上下文工程]]
- [[CON-guardrails_护栏]]
- [[CON-harness-overfitting_Harness 过拟合]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
