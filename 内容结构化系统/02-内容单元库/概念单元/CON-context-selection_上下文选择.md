---
id: CON-context-selection
type: 概念单元
title: "上下文选择"
source_documents:
  - "SRC-EXT-003"
source_authors:
  - "图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）"
themes:
  - "信息如何进入工作台"
  - "信息如何进入工作台"
keywords:
  - "上下文选择"
  - "Context Selection"
  - "信息如何进入工作台"
status: "已核对（源：图鉴站已审计产物）"
canonical: true
version: 1
created_at: 2026-09-13
updated_at: 2026-09-13
concept_definition: "Hua 等人把上下文选择称为“注意力之前的注意力”：模型开始处理输入前，系统先判断哪些候选信息值得进入当前任务 Context。"
concept_function: "解释「上下文选择」是什么、边界在哪；分类：信息如何进入工作台（现在就要懂）"
relationships:
  - type: 回应
    target: CON-minimal-sufficient-context
    note: "原 kind=used-with（反向）｜前者给出选择质量准则，后者执行取舍。"
  - type: 解释
    target: CON-dynamic-context-assembly
    note: "原 kind=prerequisite｜先决定取什么，再决定怎样按时机和格式装配。"
  - type: 回应
    target: CON-context-window
    note: "原 kind=used-with｜Context Selection 决定什么信息进入 Context Window。"
  - type: 回应
    target: CON-memory
    note: "原 kind=used-with｜Context Selection 从 Memory 等候选信息中选择当前步骤真正需要的内容。"
  - type: 冲突
    target: CON-browsing-loop
    note: "原 kind=contrast（反向）｜上下文选择应收窄与当前问题相关的证据，浏览循环则让每次新内容继续扩大候选范围。"
  - type: 回应
    target: CON-retrieval-reasoning-dual-task-load
    note: "原 kind=used-with（反向）｜先做上下文选择可把资料定位与基于证据的推理拆开。"
  - type: 回应
    target: CON-change-impact-analysis
    note: "原 kind=used-with（反向）｜影响范围用于选择评审任务真正需要读取的代码与测试上下文。"
  - type: 回应
    target: CON-skill-trigger-condition
    note: "原 kind=used-with（反向）｜触发条件把任务场景与是否选择该 Skill 进入上下文连接起来。"
---

## 核心内容

**定义（remember）**：Hua 等人把上下文选择称为“注意力之前的注意力”：模型开始处理输入前，系统先判断哪些候选信息值得进入当前任务 Context。

**费曼一下**：模型只能在已经进入窗口的材料上分配注意力。上下文选择发生得更早：先从草稿、记忆、工具定义和检索结果中挑出与任务有关的部分，再交给模型；它解决“取什么”，还不负责“怎样组装”。

**边界（明确不成立的用法）**
- Context Selection 回答选什么；Dynamic Context Assembly 回答选中内容怎样排序、格式化和组合，二者不是 Alias。
- 它也不等于 JIT Retrieval；后者强调何时取回，Selection 仍需判断取回结果是否值得进入当前 Context。
- 语义相似度只是候选信号之一；论文同时讨论逻辑依赖、新近性与频率、信息重叠及用户反馈，不能把 embedding 排名直接当成纳入结论。
- 这篇综述给出的是方法族与设计考量，并未证明某一种筛选规则对所有任务最优。选择通过也不保证材料正确或完整。

**迁移问题**：检索系统返回了十条语义相似结果，为什么它们还不能自动等同于应该送入模型的 Context？

**分类问题**：什么信息应在什么时候、以什么形式进入？

## 来源依据

- `SRC-EXT-003`：图鉴站概念卡 `concepts/context-selection.yaml`（name_en: Context Selection）
- 源证据范围（卡片自述）：Hua 等人的综述把 Context Selection 概括为“Attention Before Attention”：模型自身的注意力只能作用于已经进入窗口的 token，因此系统还需要在此之前从草稿、记忆、工具定义与 RAG 结果中作选择。文中提到的约 50% 窗口填充度属于经验观察，不是受控实验得出的通用阈值，本站不据此设定固定上限。
- 定义状态：industry-common｜学习阶段：现在就要懂

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

- [回应] [[CON-minimal-sufficient-context]] —— 原 kind=used-with（反向）｜前者给出选择质量准则，后者执行取舍。
- [解释] [[CON-dynamic-context-assembly]] —— 原 kind=prerequisite｜先决定取什么，再决定怎样按时机和格式装配。
- [回应] [[CON-context-window]] —— 原 kind=used-with｜Context Selection 决定什么信息进入 Context Window。
- [回应] [[CON-memory]] —— 原 kind=used-with｜Context Selection 从 Memory 等候选信息中选择当前步骤真正需要的内容。
- [冲突] [[CON-browsing-loop]] —— 原 kind=contrast（反向）｜上下文选择应收窄与当前问题相关的证据，浏览循环则让每次新内容继续扩大候选范围。
- [回应] [[CON-retrieval-reasoning-dual-task-load]] —— 原 kind=used-with（反向）｜先做上下文选择可把资料定位与基于证据的推理拆开。
- [回应] [[CON-change-impact-analysis]] —— 原 kind=used-with（反向）｜影响范围用于选择评审任务真正需要读取的代码与测试上下文。
- [回应] [[CON-skill-trigger-condition]] —— 原 kind=used-with（反向）｜触发条件把任务场景与是否选择该 Skill 进入上下文连接起来。
- [[CON-minimal-sufficient-context_最小充分上下文]]
- [[CON-dynamic-context-assembly_动态上下文装配]]
- [[CON-context-window_上下文窗口]]
- [[CON-memory_记忆]]
- [[CON-browsing-loop_浏览循环]]
- [[CON-retrieval-reasoning-dual-task-load_检索—推理双任务负担]]
- [[CON-change-impact-analysis_变更影响分析]]
- [[CON-skill-trigger-condition_Skill 触发条件]]

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（57/76）本身仍在演化。
