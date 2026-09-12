---
id: cm_2c89a6a8
name: 上下文腐烂
nameEn: Context Rot
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.139
depth: 0
origin: [context, harness]
aliases: ["Context Rot"]
sources: 8
---

# 上下文腐烂 · Context Rot

> 模型性能随输入长度增长而变得不可靠的现象，且不是平滑衰减，而是在不同位置参差塌陷。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.139

## 费曼一下

你以为上下文窗口像一个匀质的容器，塞进去多少都一样好用。实际它更像一块用久了会起雾的玻璃：整体还能看，但越往边上越模糊，而且哪块糊、糊到什么程度并没有规律。窗口标称 100 万 token，不等于这 100 万 token 每一个都被同等对待。

## 原文 context

本报告的标题概念，指模型性能随输入长度增长而变得越来越不可靠的现象。它不是某个模型的缺陷，而是 18 个模型（含 GPT-4.1、Claude 4、Gemini 2.5、Qwen3）共同呈现的行为模式，且在任务难度被刻意钉死时依然出现。关键词是「非均匀」——不是平滑地整体变差，而是在不同位置、不同条件下参差地塌陷。

## 掌握证据（做到这些才算会）

- 能说清非均匀塌陷与『越长越差』的平滑衰减有何区别
- 能在自己的长上下文任务中定位性能下降发生的位置

## 验收问句

> {{name}} 和『上下文越长越差』这种笼统说法差在哪？

## 相关

- [[输入长度与任务难度的混淆]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[needle-question 语义相似度谱系]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[干扰项与无关内容之分]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[干扰项的非均匀影响]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[弃答与幻觉：两种失败姿态]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[needle-haystack 相似度]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[haystack 结构连贯性效应]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[检索与推理的双任务负担]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[自回归下输出也是上下文]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[非尝试率与拒答模式]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[性能梯度而非硬悬崖 performance gradient rather than a hard cliff]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[最小高信号 token 集合 smallest possible set of high-signal tokens]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[恰当高度 the right altitude]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[工具即契约 tools as the contract]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[臃肿工具集 bloated tool sets]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[典型示例策展 diverse, canonical examples]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[just in time 上下文检索]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[混合检索策略 hybrid strategy]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[结构化记事 agentic memory]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[sub-agent 架构与关注点分离]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[观察掩码 Observation Masking]] · 常一起用（工作流） — 掩码旧工具输出用于降低低信号历史对当前推理的干扰。
- [[Action Space】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[See Like an Agent】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[Elicitation】]] · 同篇出现（co-occurrence） — 同篇出现：context-15
- [[上下文均匀处理假设]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[大海捞针（NIAH）与词面匹配]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[上下文压缩 Context Compression Summarization]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[configuration problem]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Agent vs Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[注意力预算 attention budget]] · 常一起用（概念边界） — 注意力预算是解释框架，不是 Context Rot 的唯一已证实原因。
- [[渐进式披露 progressive disclosure]] · 同篇出现（co-occurrence） — 同篇出现：context-05
- [[AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[非模型架构 Non-model Architecture]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[迷失在中间 lost in the middle]] · 对照（概念边界） — 前者是更广的长度相关退化，后者是位置效应。
- [[Agent = Model + Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：context-13

## 出场

- Context Engineering ｜ 《Chroma 实测上下文腐烂：输入越长，模型并非均匀地可靠》 ｜ https://research.trychroma.com/context-rot
- Context Engineering ｜ 《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》 ｜ https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Context Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- Context Engineering ｜ 《构建 Claude Code 的经验教训：如何让 Agent「看见」世界》 ｜ https://x.com/trq212/status/2027463795355095314
- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
- Harness Engineering ｜ 《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》 ｜ https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents
- Harness Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- Harness Engineering ｜ 《The Anatomy of an Agent Harness》 ｜ https://x.com/akshay_pachaar/status/2041146899319971922

## 别名

`Context Rot`

## 反链

- [[Agent = Model + Harness]]
- [[注意力预算 attention budget]]
- [[结构化记事 agentic memory]]
- [[Action Space】]]
- [[渐进式披露 progressive disclosure]]
- [[大海捞针（NIAH）与词面匹配]]
- [[工具即契约 tools as the contract]]
- [[上下文均匀处理假设]]
- [[输入长度与任务难度的混淆]]
- [[Elicitation】]]
- [[just in time 上下文检索]]
- [[迷失在中间 lost in the middle]]
- [[AI Agent]]
- [[上下文压缩 Context Compression Summarization]]
- [[性能梯度而非硬悬崖 performance gradient rather than a hard cliff]]
- [[臃肿工具集 bloated tool sets]]
- [[自回归下输出也是上下文]]
- [[最小高信号 token 集合 smallest possible set of high-signal tokens]]
- [[Agent vs Harness]]
- [[configuration problem]]
- [[haystack 结构连贯性效应]]
- [[needle-haystack 相似度]]
- [[needle-question 语义相似度谱系]]
- [[See Like an Agent】]]
- [[sub-agent 架构与关注点分离]]
- [[非模型架构 Non-model Architecture]]
- [[观察掩码 Observation Masking]]
- [[典型示例策展 diverse, canonical examples]]
- [[非尝试率与拒答模式]]
- [[干扰项的非均匀影响]]
- [[干扰项与无关内容之分]]
- [[混合检索策略 hybrid strategy]]
- [[检索与推理的双任务负担]]
- [[弃答与幻觉：两种失败姿态]]
- [[恰当高度 the right altitude]]
