---
id: CAS-lost-in-the-middle
type: 案例单元
title: "迷失在中间：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "迷失在中间"
  - "Lost in the Middle"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "迷失在中间"
case_summary: "评测时固定问题、文档内容和评分方法，只改变含答案文档的位置，分别放在首部、中部与尾部；若中部条件持续更差，才把差异归入位置相关的利用问题。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Liu 等人设置了两类受控任务：多文档问答中只有一篇文档含答案，合成键值检索则尽量剥离自然语言语义；实验改变输入长度与相关信息位置，其他条件保持不变。多种当时模型由此呈现首尾较强、中部较弱的 U 型表现，但模型、任务与提示结构之间仍有明显差异。"
relationships:
  - type: 解释
    target: CON-lost-in-the-middle
    note: "本案例用来说明「迷失在中间」"
---

## 核心内容

**场景（假设场景）**：评测时固定问题、文档内容和评分方法，只改变含答案文档的位置，分别放在首部、中部与尾部；若中部条件持续更差，才把差异归入位置相关的利用问题。

**来源里的真实依据**：Liu 等人设置了两类受控任务：多文档问答中只有一篇文档含答案，合成键值检索则尽量剥离自然语言语义；实验改变输入长度与相关信息位置，其他条件保持不变。多种当时模型由此呈现首尾较强、中部较弱的 U 型表现，但模型、任务与提示结构之间仍有明显差异。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/lost-in-the-middle.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-lost-in-the-middle]] —— 本案例用来说明「迷失在中间」
- [[CON-lost-in-the-middle_迷失在中间]]

## 备注

不要把假设场景当真实复盘引用。
