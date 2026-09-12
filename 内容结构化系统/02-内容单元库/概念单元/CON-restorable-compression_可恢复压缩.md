---
id: CON-restorable-compression
type: 概念单元
title: "可恢复压缩"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息平时放在哪里"
  - "信息平时放在哪里"
keywords:
  - "可恢复压缩"
  - "Restorable Compression"
  - "信息平时放在哪里"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "从当前窗口省略大块内容时保留稳定的回取引用，使上下文得以缩短，同时让被移除的信息仍可在需要时恢复。"
concept_function: "解释「可恢复压缩」是什么、边界在哪；分类：信息平时放在哪里（需要时再学）"
relationships:
  - type: 冲突
    target: CON-context-compaction
    note: "原 kind=contrast｜上下文压缩常用摘要承接历史，可恢复压缩则强调被省略原内容仍有回取路径。"
  - type: 回应
    target: CON-just-in-time-retrieval
    note: "原 kind=used-with｜保留下来的引用需要在运行时按需取回原内容。"
---

## 核心内容

**定义（remember）**：从当前窗口省略大块内容时保留稳定的回取引用，使上下文得以缩短，同时让被移除的信息仍可在需要时恢复。

**费曼一下**：扔掉正文、留下地址，跟撕掉整页纸是两回事。前者是收纳，后者是失忆。

**边界（明确不成立的用法）**
- 它不同于把原文不可逆地浓缩成摘要；核心要求是仍存在可用回取路径。
- 留下 URL 或路径不自动保证未来仍有权限、网络或原文件可用。
- 「可恢复压缩」只表示候选定义覆盖的机制；它不单独证明某个产品已经正确实现该机制或因此获得结果保证。

**迁移问题**：如果引用仍存在但访问权限会过期，这份压缩还算可恢复吗；系统应增加什么保障？

**分类问题**：哪些信息会被保留，任务进度又记在哪里？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/restorable-compression.yaml`（name_en: Restorable Compression）
- 源证据范围（卡片自述）：本卡只采用以下来源范围：《Manus 的上下文工程实战：几轮重写换来的一组局部最优》：原文明确给出压缩后保留 URL 或路径、使被省略内容仍可回取的可恢复性原则。未被来源直接支持的产品结论、普遍因果或关系身份不写入本卡。
- 定义状态：evolving｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-context-compaction]] —— 原 kind=contrast｜上下文压缩常用摘要承接历史，可恢复压缩则强调被省略原内容仍有回取路径。
- [回应] [[CON-just-in-time-retrieval]] —— 原 kind=used-with｜保留下来的引用需要在运行时按需取回原内容。
- [[CON-context-compaction_上下文压缩]]
- [[CON-just-in-time-retrieval_即时检索]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
