---
id: OPI-HAR-05-04
type: 观点单元
title: "相比 2023 年的老公式「agent = LLM + memory + tools + pla…"
source_documents:
  - "SRC-EXT-002"
source_authors:
  - "AI 内参转述稿（策展人 Howie 清单）"
themes:
  - "Harness Engineering"
keywords:
  - "状态管理"
status: "待核对（确定性解析自源文「核心观点」小节）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
core_claim: "相比 2023 年的老公式「agent = LLM + memory + tools + planning + action」，harness 工程额外包含 workflow 设计（如 loop engineering）、评估、权限控制、持久状态管理。它不再是 prompt 模板，而更接近运行时与软件系统设计。作者给了一个贯穿全文的类比：harness 之于模型，像操作系统——把复杂逻辑封装起来，同时保持接口简单。"
claim_scope: "出自《Lilian Weng：把 harness 工程接到「递归自我改进」这条老线索上》清单编号 05 的第 4 条核心观点；适用范围以原文为准，本工程未做二次判断"
why_it_matters: "它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场"
relationships:
  - type: 回应
    target: QST-HAR-05
    note: "这一条是该篇核心观点之一"
  - type: 证明
    target: CON-state-management
    note: "这条观点用到了「状态管理」"
---

## 核心内容

**核心判断（原文照抄）**：相比 2023 年的老公式「agent = LLM + memory + tools + planning + action」，harness 工程额外包含 workflow 设计（如 loop engineering）、评估、权限控制、持久状态管理。它不再是 prompt 模板，而更接近运行时与软件系统设计。作者给了一个贯穿全文的类比：harness 之于模型，像操作系统——把复杂逻辑封装起来，同时保持接口简单。

## 来源依据

- `SRC-EXT-002`：`Lilian Weng：把 harness 工程接到「递归自我改进」这条老线索上` 的「核心观点」第 4 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

- [证明] [[CON-state-management]] —— 用到「状态管理」
- [[QST-HAR-05_Lilian Weng：把 harness 工程接到「递归自我改进」这条老线索上]]
- [[CON-state-management_状态管理]]

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
