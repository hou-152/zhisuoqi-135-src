---
id: CON-prompt-injection
type: 概念单元
title: "提示注入"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "提示注入"
  - "Prompt Injection"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "攻击者把指令嵌入 Agent 会读取的数据或内容中，诱使模型偏离原任务、越过控制边界或触发不应执行的动作。"
concept_function: "解释「提示注入」是什么、边界在哪；分类：做完后凭什么相信（现在就要懂）"
relationships:
  - type: 回应
    target: CON-guardrails
    note: "原 kind=used-with｜护栏需要识别或限制不受信指令引发的危险行为。"
  - type: 回应
    target: CON-permission-boundary
    note: "原 kind=used-with｜权限边界限制一次注入成功后能够调用的能力和影响范围。"
---

## 核心内容

**定义（remember）**：攻击者把指令嵌入 Agent 会读取的数据或内容中，诱使模型偏离原任务、越过控制边界或触发不应执行的动作。

**费曼一下**：攻击者把恶意指令藏在 agent 读取的内容里，诱骗 agent 做不该做的事。设计 agent 系统时，默认假设每一段输入都可能被污染。

**边界（明确不成立的用法）**
- 它不同于用户直接提交的正常任务指令，风险在于不受信内容被模型误当成可执行要求。
- 沙箱、权限与内容隔离可以降低后果，但没有任何单一机制能证明风险被完全消除。
- 是否构成成功攻击要看系统后续行为，出现可疑文本本身只是攻击尝试或风险信号。
- 当前证据缺口：需要补充直接注入与间接注入的边界例子。

**迁移问题**：如果外部文档中的一句话与用户目标完全一致，系统仍应依据什么决定它是证据还是可执行指令？

**分类问题**：Agent 说做完之后，凭什么相信它真的完成？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/prompt-injection.yaml`（name_en: Prompt Injection）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》：这段明确把隐藏在 Agent 输入中的恶意指令视为系统设计时应默认存在的攻击面。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-guardrails]] —— 原 kind=used-with｜护栏需要识别或限制不受信指令引发的危险行为。
- [回应] [[CON-permission-boundary]] —— 原 kind=used-with｜权限边界限制一次注入成功后能够调用的能力和影响范围。
- [[CON-guardrails_护栏]]
- [[CON-permission-boundary_权限边界]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
