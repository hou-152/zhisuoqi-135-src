---
id: CAS-permission-boundary
type: 案例单元
title: "权限边界：一个具体场景"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "人如何控制 AI"
  - "人如何控制 AI"
keywords:
  - "权限边界"
  - "Permission Boundary"
  - "人如何控制 AI"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
case_subject: "权限边界"
case_summary: "Agent 提议运行只读检查时，权限层可以直接允许；提议删除文件时暂停并要求用户确认；触碰明确禁止的路径时则直接拒绝。"
case_process: "（源数据未给过程——这是假设场景，不是真实复盘）"
case_result: "（源数据未给结果）"
case_type: "假设场景"
case_evidence: "Akshay 的 Agent Harness 拆解强调模型决定“尝试什么”，工具系统决定“允许什么”；来源用项目加载信任、调用前权限检查与高风险人工确认说明权限执行应与模型推理解耦。稳定定义不继承来源中的产品数量或版本数字。"
relationships:
  - type: 解释
    target: CON-permission-boundary
    note: "本案例用来说明「权限边界」"
---

## 核心内容

**场景（假设场景）**：Agent 提议运行只读检查时，权限层可以直接允许；提议删除文件时暂停并要求用户确认；触碰明确禁止的路径时则直接拒绝。

**来源里的真实依据**：Akshay 的 Agent Harness 拆解强调模型决定“尝试什么”，工具系统决定“允许什么”；来源用项目加载信任、调用前权限检查与高风险人工确认说明权限执行应与模型推理解耦。稳定定义不继承来源中的产品数量或版本数字。

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/permission-boundary.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-permission-boundary]] —— 本案例用来说明「权限边界」
- [[CON-permission-boundary_权限边界]]

## 备注

不要把假设场景当真实复盘引用。
