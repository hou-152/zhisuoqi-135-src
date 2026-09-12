---
id: SOL-llm-token
type: 方案单元
title: "模型词元：可执行动作路径"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "眼前真正有什么"
  - "眼前真正有什么"
keywords:
  - "模型词元"
  - "LLM Token"
  - "眼前真正有什么"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
target_problem: "避免这个误区：Token 不等同于汉字、英文单词或字符；同一文本在不同分词器下可产生不同数量。"
solution_summary: "使用目标模型对应的分词器统计真实输入、输出和各组成部分的 Token。"
action_steps:
  - "使用目标模型对应的分词器统计真实输入、输出和各组成部分的 Token。"
  - "对代表性的中文、英文、代码和结构化数据分别测量，建立容量余量。"
  - "在压缩或裁剪后复算 Token，并独立检查信息是否仍完整、任务是否仍可完成。"
expected_result: "（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）"
relationships:
  - type: 解释
    target: CON-llm-token
    note: "本方案是「模型词元」这个概念的落地动作"
---

## 核心内容

**要解决的问题**：Token 不等同于汉字、英文单词或字符；同一文本在不同分词器下可产生不同数量。

**动作路径（how_to，逐条照抄源数据）**
1. 使用目标模型对应的分词器统计真实输入、输出和各组成部分的 Token。
2. 对代表性的中文、英文、代码和结构化数据分别测量，建立容量余量。
3. 在压缩或裁剪后复算 Token，并独立检查信息是否仍完整、任务是否仍可完成。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/llm-token.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-llm-token]] —— 本方案是「模型词元」的落地动作
- [[CON-llm-token_模型词元]]

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
