---
id: QST-CTX-17
type: 问题单元
title: "提示词缓存不是小优化，而是 agent 成本结构的关键变量"
source_documents:
  - "SRC-EXT-001"
source_authors:
  - "AI 内参转述稿（策展人 Howie 清单）"
themes:
  - "Context Engineering"
keywords:
  - "提示词缓存不是小优化，而是 agent 成本结构"
  - "提示词缓存"
  - "提示"
status: "待核对（确定性解析自源文「导读」小节）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
question_text: "我发现，在 Chatbot 的范式下，输入 Token 与输出 Token 的比例是 1:20。但到了 Agent 的范式，输入 Token 与输出 Token 的比例反过来了，而且扩大了很多倍，变成了 200:1。这背后的核心技术就是 Prompt Cache（提示词缓存）。"
question_type: "文章定位"
user_stage: "未标注"
applicable_topics:
  - "Context Engineering"
relationships:
  - type: 解释
    target: CON-prompt-caching
    note: "本篇导读提到这个概念"
  - type: 解释
    target: CON-prompt
    note: "本篇导读提到这个概念"
---

## 核心内容

**这篇从哪来、要解决什么（导读原文）**：我发现，在 Chatbot 的范式下，输入 Token 与输出 Token 的比例是 1:20。但到了 Agent 的范式，输入 Token 与输出 Token 的比例反过来了，而且扩大了很多倍，变成了 200:1。这背后的核心技术就是 Prompt Cache（提示词缓存）。

**源文标题**：提示词缓存不是小优化，而是 agent 成本结构的关键变量

## 来源依据

- `SRC-EXT-001`：`飞书-Context Engineering-26+2.md` 清单编号 17 的「导读」小节（原文照抄）

## 使用场景

作为这一篇其余单元（概念 / 观点 / 案例 / 方案）的入口问题；也是产品里「一个问题 → 3 概念」的那个问题。

## 关联单元

- [解释] [[CON-prompt-caching]] —— 导读提到「提示词缓存」
- [解释] [[CON-prompt]] —— 导读提到「提示」
- [[CON-prompt-caching_提示词缓存]]
- [[CON-prompt_提示]]

## 备注

导读是策展人写的一句话定位，不是完整的问句；`question_type` 标为「文章定位」以区别于真正的检验问题。
