---
id: CON-agent-elicitation
type: 概念单元
title: "Agent 信息引出"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "Agent 信息引出"
  - "Agent Elicitation"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Agent 在缺少目标、约束或偏好时，主动向用户提出结构化问题以取得继续判断所需信息的交互能力。"
concept_function: "解释「Agent 信息引出」是什么、边界在哪；分类：人如何控制 AI（需要时再学）"
relationships:
  - type: 回应
    target: CON-context-engineering
    note: "原 kind=used-with｜信息引出用于补齐会改变任务判断的缺失上下文。"
  - type: 回应
    target: CON-agent-loop
    note: "原 kind=used-with｜提问工具可阻塞当前循环，等待用户回答后再恢复下一轮决策。"
  - type: 回应
    target: CON-guardrails
    note: "原 kind=used-with｜在高风险或边界不清时，主动提问可作为继续行动前的控制路径。"
---

## 核心内容

**定义（remember）**：Agent 在缺少目标、约束或偏好时，主动向用户提出结构化问题以取得继续判断所需信息的交互能力。

**费曼一下**：像医生问诊：不是问题越多越专业，而是只追问会改变诊断和处置的缺口。好提问让用户用最小力气补上关键一块，然后回到原任务继续。

**边界（明确不成立的用法）**
- 信息引出不是无条件多问；只有缺失信息会改变答案、风险或下一步时才值得打断用户。
- 提问接口应降低回答摩擦，并把答案可靠地送回原任务，而不是另开无关对话。
- 当前证据缺口：当前证据未给出何时提问、何时采用默认值以及如何衡量提问摩擦的通用阈值。

**迁移问题**：当用户不愿回答偏好问题时，Agent 应采用可逆默认值继续，还是停止等待；你会用哪些风险条件判断？

**分类问题**：人怎样说明目标、复用方法并限制行动？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/agent-elicitation.yaml`（name_en: Agent Elicitation）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《构建 Claude Code 的经验教训：如何让 Agent「看见」世界》：原文逐字把 elicitation 定义为 Agent 提问能力，并说明其目标是降低回答摩擦、提高人机通信带宽。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-context-engineering]] —— 原 kind=used-with｜信息引出用于补齐会改变任务判断的缺失上下文。
- [回应] [[CON-agent-loop]] —— 原 kind=used-with｜提问工具可阻塞当前循环，等待用户回答后再恢复下一轮决策。
- [回应] [[CON-guardrails]] —— 原 kind=used-with｜在高风险或边界不清时，主动提问可作为继续行动前的控制路径。
- [[CON-context-engineering_上下文工程]]
- [[CON-agent-loop_Agent 循环]]
- [[CON-guardrails_护栏]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
