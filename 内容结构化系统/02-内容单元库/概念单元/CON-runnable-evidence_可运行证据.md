---
id: CON-runnable-evidence
type: 概念单元
title: "可运行证据"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "做完后凭什么相信"
  - "做完后凭什么相信"
keywords:
  - "可运行证据"
  - "Runnable Evidence"
  - "做完后凭什么相信"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "能由独立执行者重新运行并得到明确结果的验证材料，例如测试、静态检查、冒烟运行或端到端流程回执。"
concept_function: "解释「可运行证据」是什么、边界在哪；分类：做完后凭什么相信（现在就要懂）"
relationships:
  - type: 回应
    target: CON-verification-loop
    note: "原 kind=used-with｜验证循环消费可运行证据来决定继续、停止或返工；证据本身不是循环的运行组件。"
  - type: 回应
    target: CON-trace-based-evals
    note: "原 kind=used-with｜轨迹解释过程，可运行检查复验结果，两类证据共同支持诊断。"
---

## 核心内容

**定义（remember）**：能由独立执行者重新运行并得到明确结果的验证材料，例如测试、静态检查、冒烟运行或端到端流程回执。

**费曼一下**：把「完成」的判定权从当事人的嘴里，交给一台不会说谎的机器。你不问「你觉得做好了吗」，你只看测试是绿是红。证据可运行，是因为它可以被任何人在任何时候重新跑一遍。

**边界（明确不成立的用法）**
- 它不同于 Agent 对结果的文字总结或自信声明。
- 机器通过只证明对应检查覆盖的条件，不能自动证明全部用户价值或发布可接受性。
- 可复跑还要求保留命令、环境与必要输入，否则证据可能无法复现。
- 当前证据缺口：需要补充环境锁定与复现失败时的证据降级规则。

**迁移问题**：当验证依赖昂贵外部服务无法随时重跑时，怎样提供仍可独立检查、又不冒充实时结果的证据？

**分类问题**：Agent 说做完之后，凭什么相信它真的完成？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/runnable-evidence.yaml`（name_en: Runnable Evidence）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Harness 工程学习仓库：从原始文献到能跑的 skill》：这段把完成声明绑定到可由他人重跑的测试、检查与端到端流程，而不是模型自我评价。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-verification-loop]] —— 原 kind=used-with｜验证循环消费可运行证据来决定继续、停止或返工；证据本身不是循环的运行组件。
- [回应] [[CON-trace-based-evals]] —— 原 kind=used-with｜轨迹解释过程，可运行检查复验结果，两类证据共同支持诊断。
- [[CON-verification-loop_验证循环]]
- [[CON-trace-based-evals_基于轨迹的评测]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
