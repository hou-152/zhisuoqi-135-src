---
id: CON-progressive-disclosure
type: 概念单元
title: "渐进式披露"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "渐进式披露"
  - "Progressive Disclosure"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "渐进式披露先给地图与索引，只按当前需要展开一层；仍缺细节时再深入，让工作记忆不必一次背下整本百科。"
concept_function: "解释「渐进式披露」是什么、边界在哪；分类：信息如何进入工作台（需要时再学）"
relationships:
  - type: 冲突
    target: CON-just-in-time-retrieval
    note: "原 kind=contrast（反向）｜JIT 强调取数时机；渐进披露强调逐层发现。"
  - type: 回应
    target: CON-memory
    note: "原 kind=used-with（反向）｜Memory 可用路由文档与主题文件按 Progressive Disclosure 分层加载。"
  - type: 回应
    target: CON-tool
    note: "原 kind=used-with｜Progressive Disclosure 可延迟加载 Tool 定义，直到当前步骤真正需要。"
  - type: 回应
    target: CON-skill
    note: "原 kind=used-with（反向）｜Skill 通过按需加载文件与能力实现 Progressive Disclosure。"
---

## 核心内容

**定义（remember）**：渐进式披露先给地图与索引，只按当前需要展开一层；仍缺细节时再深入，让工作记忆不必一次背下整本百科。

**费曼一下**：进入陌生大楼时，你先看楼层导览，再走到目标楼层，只有找到具体房间时才看门牌说明。它设计的是信息怎样分层、怎样被逐步发现；JIT Retrieval 关心的是资料何时被工具取回，两者常一起用，但不是同一件事。

**边界（明确不成立的用法）**
- Progressive Disclosure 管“先看到哪一层、需要时怎样继续展开”；Just-in-Time Retrieval 管“何时通过工具把数据取回上下文”。
- 它不是隐藏重要规则；安全边界、当前目标和必须遵守的约束应在正确入口直接可见。
- 层级越多不一定越好；索引错误、命名含糊或入口太深都会让 Agent 在探索中浪费上下文。
- 渐进式披露不等于上下文压缩；前者保留可导航的层级，后者把已有内容蒸馏成更短表示。

**迁移问题**：一个系统运行时才取文件，但每次都把整棵目录和全部正文塞进上下文，它做到了 JIT，却做到了渐进式披露吗？

**分类问题**：什么信息应在什么时候、以什么形式进入？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/progressive-disclosure.yaml`（name_en: Progressive Disclosure）
- 源证据范围（卡片自述）：Anthropic 的 Effective Context Engineering 描述 Agent 利用文件路径、命名、大小和时间戳等元数据自主导航，通过探索增量发现相关 context。本站把 Progressive Disclosure 定义为信息的分层组织与逐步发现策略。
- 定义状态：industry-common｜学习阶段：需要时再学

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [冲突] [[CON-just-in-time-retrieval]] —— 原 kind=contrast（反向）｜JIT 强调取数时机；渐进披露强调逐层发现。
- [回应] [[CON-memory]] —— 原 kind=used-with（反向）｜Memory 可用路由文档与主题文件按 Progressive Disclosure 分层加载。
- [回应] [[CON-tool]] —— 原 kind=used-with｜Progressive Disclosure 可延迟加载 Tool 定义，直到当前步骤真正需要。
- [回应] [[CON-skill]] —— 原 kind=used-with（反向）｜Skill 通过按需加载文件与能力实现 Progressive Disclosure。
- [[CON-just-in-time-retrieval_即时检索]]
- [[CON-memory_记忆]]
- [[CON-tool_工具]]
- [[CON-skill_Agent Skill]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
