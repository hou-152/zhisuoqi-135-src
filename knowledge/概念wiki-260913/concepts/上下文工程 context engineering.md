---
id: cm_30201f36
name: 上下文工程
nameEn: context engineering
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.393
depth: 1
origin: [context, harness]
aliases: ["context engineering", "Context Engineering"]
sources: 14
---

# 上下文工程 · context engineering

> 对模型上下文窗口的审慎构建与管理，把原始上下文与目标任务映射为可组合的上下文处理函数。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.393

## 费曼一下

它不是"写好提示词"的高级说法，而是"如何把人脑里的情境和目的，整理成机器接得住的形状"这个问题的统称。技术会换，问题不换。

## 原文 context

论文给出的形式化定义是 CE: (C, T) → f_context——把原始上下文 C 与目标任务 T 映射为一个上下文处理函数，这个函数由一组可灵活组合的操作构成（采集、存储管理、统一表示、多模态处理、self-baking、选择、跨系统共享、依反馈动态适配）。作者刻意让定义不绑定任何具体技术或时代：无论接收方是 1990 年代带图形界面的原始计算机，还是 2025 年的 agent，根本挑战都是"如何让上下文与意图被准确理解"。

## 掌握证据（做到这些才算会）

- 能把一个任务拆成采集、存储、表示、选择、压缩等上下文操作
- 能针对具体 Agent 说明每一步该把哪些信息放进窗口

## 验收问句

> 按 {{name}}，当前这一步该给模型看哪些信息？

## 先懂这些（前置 1）

- [[即时检索 Just-in-time Retrieval]] · **hard** — Just-in-Time Retrieval 是 Context Engineering 的生产策略之一。

## 懂了它才能懂（解锁 5）

- [[Harness 工程 Harness Engineering]] — 本站工程范围轴采用 Harness Engineering 通常包住 Context Engineering。
- [[CLAUDE.md]] — CLAUDE.md是上下文工程的产物，先懂工程才知它为何自动读取。
- [[上下文隔离 context isolation]] — 隔离是上下文工程切分任务、防污染的一种手段，不懂上下文工程就不知为何要隔离。
- [[上下文失败，而非模型失败 context failures, not model failures]] — 此判断的前提是上下文装配本身可被工程化，不懂上下文工程就无从归因。
- [[延迟加载工具 deferred loading]] — 延迟加载是上下文工程控制工具占用的手段，不懂上下文工程就不懂其动机。

## 相关

- [[四阶段演化模型]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[意图翻译者 intention translator]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[原始上下文容忍度 tolerance for raw context]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[上下文协作 context-cooperative]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[最小充分性与语义连续性原则]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[分层记忆架构]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[上下文隔离 context isolation]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[self-baking]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[轻量引用 lightweight references]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[注意力之前的注意力 attention before attention]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[语义操作系统 semantic operating system]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[数字存在 Digital Presence]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[Stochastic Graduate Descent]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[局部最优 local optima]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[KV-cache 命中率]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[prefill 与 decode 的高度倾斜]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[稳定的 prompt 前缀]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[action space 膨胀]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[logits 掩码与 context-aware 状态机]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[文件系统即终极上下文]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[复述（recitation）与 lost-in-the-middle]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[保留错误证据与错误恢复]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[few-shot 套路化与受控多样性]] · 同篇出现（co-occurrence） — 同篇出现：context-04
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
- [[示例的探索空间约束]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[工具接口的表达力设计]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[延迟加载工具 deferred loading]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[Rubric 与 verifier agent]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[gotchas 优先原则]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[代码即高保真引用]] · 同篇出现（co-occurrence） — 同篇出现：context-21
- [[冲突指令的隐性成本]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[护栏与判断力的取舍 guardrail tradeoff]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[从禁止什么到对齐什么]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[示例会收窄探索空间]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[接口即指令 design interfaces]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[延迟加载工具与 ToolSearch]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[指令就近原则]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[Rubrics 与验证 agent]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[gotchas 优先的 CLAUDE.md]] · 同篇出现（co-occurrence） — 同篇出现：context-22
- [[Validation gates]] · 同篇出现（co-occurrence） — 同篇出现：context-23
- [[Instructions files]] · 同篇出现（co-occurrence） — 同篇出现：context-23
- [[Chat modes]] · 同篇出现（co-occurrence） — 同篇出现：context-23
- [[Memory-driven development]] · 同篇出现（co-occurrence） — 同篇出现：context-23
- [[Agentic workflows]] · 同篇出现（co-occurrence） — 同篇出现：context-23
- [[Natural language as code]] · 同篇出现（co-occurrence） — 同篇出现：context-23
- [[Agent CLI runtimes]] · 同篇出现（co-occurrence） — 同篇出现：context-23
- [[APM]] · 同篇出现（co-occurrence） — 同篇出现：context-23
- [[上下文失败，而非模型失败 context failures, not model failures]] · 同篇出现（co-occurrence） — 同篇出现：context-24
- [[系统而非字符串 A System, Not a String]] · 同篇出现（co-occurrence） — 同篇出现：context-24
- [[动态装配 Dynamic]] · 同篇出现（co-occurrence） — 同篇出现：context-24
- [[正确的信息与工具，在正确的时间]] · 同篇出现（co-occurrence） — 同篇出现：context-24

## 出场

- Context Engineering ｜ 《论文《上下文工程 2.0》：给这门手艺补上它自己的上下文》 ｜ https://arxiv.org/pdf/2510.26493
- Context Engineering ｜ 《Chroma 实测上下文腐烂：输入越长，模型并非均匀地可靠》 ｜ https://research.trychroma.com/context-rot
- Context Engineering ｜ 《Manus 的上下文工程实战：几轮重写换来的一组局部最优》 ｜ https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
- Context Engineering ｜ 《Anthropic：有效的上下文工程，是为 agent 找到最小充分信息集》 ｜ https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents
- Context Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- Context Engineering ｜ 《Claude 5 世代的上下文工程，规则变了》 ｜ https://claude.com/blog/the-new-rules-of-context-engineering-for-claude-5-generation-models
- Context Engineering ｜ 《Claude 5 时代的上下文工程新规则：系统提示词砍掉 80%》 ｜ https://x.com/trq212/status/2080710971228918066/?s=12
- Context Engineering ｜ 《构建可靠 AI 工作流：智能体原语与上下文工程》 ｜ https://github.blog/ai-and-ml/github-copilot/how-to-build-reliable-ai-workflows-with-agentic-primitives-and-context-engineering/

## 别名

`context engineering`、`Context Engineering`

## 反链

- [[Harness 工程 Harness Engineering]]
- [[上下文 context]]
- [[长上下文窗口]]
- [[注意力预算 attention budget]]
- [[上下文腐烂 Context Rot]]
- [[有限的工作记忆 limited working memory]]
- [[分层记忆架构]]
- [[工具接口的表达力设计]]
- [[结构化记事 agentic memory]]
- [[Context Distraction]]
- [[Instructions files]]
- [[渐进式披露 progressive disclosure]]
- [[即时检索 Just-in-time Retrieval]]
- [[大海捞针（NIAH）与词面匹配]]
- [[工具即契约 tools as the contract]]
- [[接口即指令 design interfaces]]
- [[局部最优 local optima]]
- [[示例的探索空间约束]]
- [[configuration problem]]
- [[just in time 上下文检索]]
- [[prefill 与 decode 的高度倾斜]]
- [[Rubric 与 verifier agent]]
- [[Rubrics 与验证 agent]]
- [[Validation gates]]
- [[AI Agent]]
- [[CLAUDE.md]]
- [[上下文压缩 Context Compression Summarization]]
- [[压缩 Compaction]]
- [[「垃圾回收」型 agent]]
- [[冲突指令的隐性成本]]
- [[从禁止什么到对齐什么]]
- [[动态系统]]
- [[功能与行为验证的缺口]]
- [[架构约束的确定性执行]]
- [[卡住即信号 struggle as signal]]
- [[上下文隔离 context isolation]]
- [[上下文均匀处理假设]]
- [[上下文失败，而非模型失败 context failures, not model failures]]
- [[示例会收窄探索空间]]
- [[四阶段演化模型]]
