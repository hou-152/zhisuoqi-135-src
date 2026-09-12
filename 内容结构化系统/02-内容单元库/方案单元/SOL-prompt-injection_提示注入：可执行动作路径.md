---
id: SOL-prompt-injection
type: 方案单元
title: "提示注入：可执行动作路径"
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
target_problem: "避免这个误区：它不同于用户直接提交的正常任务指令，风险在于不受信内容被模型误当成可执行要求。"
solution_summary: "标记可信指令与外部内容的来源和优先级，不把抓取文本拼进控制层。"
action_steps:
  - "标记可信指令与外部内容的来源和优先级，不把抓取文本拼进控制层。"
  - "对外部内容触发的工具调用做权限、参数、目的地和敏感数据检查。"
  - "用含伪指令的测试材料演练，确认被拒动作留下回执，同时验证残余风险仍被记录。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-prompt-injection
    note: "本方案是「提示注入」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：它不同于用户直接提交的正常任务指令，风险在于不受信内容被模型误当成可执行要求。

**动作路径（how_to，逐条照抄源数据）**
1. 标记可信指令与外部内容的来源和优先级，不把抓取文本拼进控制层。
2. 对外部内容触发的工具调用做权限、参数、目的地和敏感数据检查。
3. 用含伪指令的测试材料演练，确认被拒动作留下回执，同时验证残余风险仍被记录。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/prompt-injection.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-prompt-injection]] —— 本方案是「提示注入」的落地动作
- [[CON-prompt-injection_提示注入]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
