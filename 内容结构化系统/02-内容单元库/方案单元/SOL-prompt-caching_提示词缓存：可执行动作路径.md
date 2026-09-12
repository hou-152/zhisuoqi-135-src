---
id: SOL-prompt-caching
type: 方案单元
title: "提示词缓存：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "AI 如何持续行动"
  - "AI 如何持续行动"
keywords:
  - "提示词缓存"
  - "Prompt Caching"
  - "AI 如何持续行动"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：缓存的是稳定输入前缀的处理结果，不是上一轮答案，也不是按语义相似检索整段对话。"
solution_summary: "把稳定规则和工具说明排在前缀，把会话状态与本轮输入放在后部。"
action_steps:
  - "把稳定规则和工具说明排在前缀，把会话状态与本轮输入放在后部。"
  - "对比首次写入、重复命中和前缀微调三类请求的缓存量、费用与延迟。"
  - "找出破坏前缀稳定的时间戳、随机顺序和无关字段，修正后用真实流量复验。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-prompt-caching
    note: "本方案是「提示词缓存」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：缓存的是稳定输入前缀的处理结果，不是上一轮答案，也不是按语义相似检索整段对话。

**动作路径（how_to，逐条照抄源数据）**
1. 把稳定规则和工具说明排在前缀，把会话状态与本轮输入放在后部。
2. 对比首次写入、重复命中和前缀微调三类请求的缓存量、费用与延迟。
3. 找出破坏前缀稳定的时间戳、随机顺序和无关字段，修正后用真实流量复验。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/prompt-caching.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-prompt-caching]] —— 本方案是「提示词缓存」的落地动作
- [[CON-prompt-caching_提示词缓存]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
