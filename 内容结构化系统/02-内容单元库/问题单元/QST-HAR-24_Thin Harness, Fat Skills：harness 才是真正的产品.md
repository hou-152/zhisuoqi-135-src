---
id: QST-HAR-24
type: 问题单元
title: "Thin Harness, Fat Skills：harness 才是真正的产品"
source_documents:
  - "SRC-EXT-002"
source_authors:
  - "AI 内参转述稿（策展人 Howie 清单）"
themes:
  - "Harness Engineering"
keywords:
  - "Thin Harness, Fat Skills"
  - "上下文"
  - "工具"
status: "待核对（确定性解析自源文「导读」小节）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "harness vs skills  AI 生产力的 10x-100x 差距不来自更聪明的模型，而来自架构设计——核心原则是 **Thin Harness, Fat Skills**：  - harness（跑模型的外壳）只做四件事（循环调用模型、读写文件、管理上下文、执行安全），保持精简； - 真正的价值全部编码进可复用的 markdown skill 文件，让模型知道\"怎么做\"。 - 配合 resolver（按需路由上下文）、latent vs. deterministic 的分层判断（判断力向上推进 skills，确定性计算向下推进工具层），以及 diarization（从大量文档中综合出结构化情报）和 learning loop（skill 读取反馈后自我重写），整个系统得以持续复利——每次模型升级，所有 skill 自动变强，而确定性层保持稳定可靠。"
question_type: "文章定位"
user_stage: "未标注"
applicable_topics:
  - "Harness Engineering"
relationships:
  - type: 解释
    target: CON-context
    note: "本篇导读提到这个概念"
  - type: 解释
    target: CON-tool
    note: "本篇导读提到这个概念"
---

## 核心内容

**这篇从哪来、要解决什么（导读原文）**：harness vs skills

AI 生产力的 10x-100x 差距不来自更聪明的模型，而来自架构设计——核心原则是 **Thin Harness, Fat Skills**：

- harness（跑模型的外壳）只做四件事（循环调用模型、读写文件、管理上下文、执行安全），保持精简；
- 真正的价值全部编码进可复用的 markdown skill 文件，让模型知道"怎么做"。
- 配合 resolver（按需路由上下文）、latent vs. deterministic 的分层判断（判断力向上推进 skills，确定性计算向下推进工具层），以及 diarization（从大量文档中综合出结构化情报）和 learning loop（skill 读取反馈后自我重写），整个系统得以持续复利——每次模型升级，所有 skill 自动变强，而确定性层保持稳定可靠。

**源文标题**：Thin Harness, Fat Skills：harness 才是真正的产品

## 来源依据

- `SRC-EXT-002`：`飞书-Harness Engineering-28+2.md` 清单编号 24 的「导读」小节（原文照抄）

## 使用场景

作为这一篇其余单元（概念 / 观点 / 案例 / 方案）的入口问题；也是产品里「一个问题 → 3 概念」的那个问题。

## 关联单元

- [解释] [[CON-context]] —— 导读提到「上下文」
- [解释] [[CON-tool]] —— 导读提到「工具」
- [[CON-context_上下文]]
- [[CON-tool_工具]]

## 备注

导读是策展人写的一句话定位，不是完整的问句；`question_type` 标为「文章定位」以区别于真正的检验问题。
