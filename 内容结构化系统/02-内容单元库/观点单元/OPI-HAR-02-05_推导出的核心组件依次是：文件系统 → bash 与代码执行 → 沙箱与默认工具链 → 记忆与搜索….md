---
id: OPI-HAR-02-05
type: 观点单元
title: "推导出的核心组件依次是：文件系统 → bash 与代码执行 → 沙箱与默认工具链 → 记忆与搜索…"
source_documents:
  - "SRC-EXT-002"
source_authors:
  - "AI 内参转述稿（策展人 Howie 清单）"
themes:
  - "Harness Engineering"
keywords:
  - "代码执行"
  - "上下文"
  - "记忆"
  - "沙箱"
  - "工具"
status: "待核对（确定性解析自源文「核心观点」小节）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
core_claim: "推导出的核心组件依次是：文件系统 → bash 与代码执行 → 沙箱与默认工具链 → 记忆与搜索（含上下文管理三件套）→ 长时程自主执行。这些原语不是并列的，越往后越依赖前面的，最后开始「复利」（compound）。"
claim_scope: "出自《LangChain 解剖 agent harness：Agent = 模型 + harness》清单编号 02 的第 5 条核心观点；适用范围以原文为准，本工程未做二次判断"
why_it_matters: "它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场"
relationships:
  - type: 回应
    target: QST-HAR-02
    note: "这一条是该篇核心观点之一"
  - type: 证明
    target: CON-code-execution
    note: "这条观点用到了「代码执行」"
  - type: 证明
    target: CON-context
    note: "这条观点用到了「上下文」"
  - type: 证明
    target: CON-memory
    note: "这条观点用到了「记忆」"
---

## 核心内容

**核心判断（原文照抄）**：推导出的核心组件依次是：文件系统 → bash 与代码执行 → 沙箱与默认工具链 → 记忆与搜索（含上下文管理三件套）→ 长时程自主执行。这些原语不是并列的，越往后越依赖前面的，最后开始「复利」（compound）。

## 来源依据

- `SRC-EXT-002`：`LangChain 解剖 agent harness：Agent = 模型 + harness` 的「核心观点」第 5 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

- [证明] [[CON-code-execution]] —— 用到「代码执行」
- [证明] [[CON-context]] —— 用到「上下文」
- [证明] [[CON-memory]] —— 用到「记忆」
- [[QST-HAR-02_LangChain 解剖 agent harness：Agent = 模型 + harness]]
- [[CON-code-execution_代码执行]]
- [[CON-context_上下文]]
- [[CON-memory_记忆]]

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
