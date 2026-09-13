---
id: cm_0a4ca4ce
name: Harness
type: CONCEPTUAL
subject: AI 概念库 × Context Engineering × Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 1
depth: 0
origin: [notion, context, harness]
aliases: ["项目级感知", "整个项目一起看", "model 外壳", "runtime", "agent harness"]
sources: 23
---

# Harness

> 包裹在大语言模型之外的完整软件架构，负责让模型能读文件、跑命令、改代码并自主完成任务。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 1

## 费曼一下

模型外面那层「项目级感知」。让 AI 不是只盯一段代码，而是先理解整个项目的目录、规则、依赖，再做决定。

## 原文 context

> 它最不一样的地方是模型能力本身就很不错，加上 Claude Code 自己的代码实现也把 Harness 这一套玩到了极致——整个项目一起看：先扫一遍 [CLAUDE.md](http://CLAUDE.md) 和目录结构摸清楚上下文，然后跨文件改代码、跑命令、看报错、再改，自己全部完成。

## 掌握证据（做到这些才算会）

- 能指出 Claude Code 里哪些组件属于 Harness、哪些属于模型自身
- 能解释为何同一模型换一个 Harness 表现差异巨大

## 验收问句

> {{name}} 指什么？它和模型权重各负责哪部分？

## 懂了它才能懂（解锁 11）

- [[Agent = Model + Harness]] — 等式右项的 Harness 不懂，等式无法成立。
- [[功能清单作为 harness 原语]] — 要成为 harness 原语，得先懂 harness 需要什么。
- [[共享 harness]] — 共享的对象就是 harness，不懂它无从谈复用。
- [[从期望行为反推 harness 设计]] — 反推的产物是 harness 功能，前提是懂 harness。
- [[动态系统]] — 说 harness 是动态系统，需先懂 harness 是什么。
- [[coding agent]] — 不懂【Harness】，就做不了 coding agent 的“harness 包裹 LLM”定义
- [[Claude Managed Agents]] — 不懂【Harness】，就做不了 Claude Managed Agents 的“预置 agent harness”定义
- [[agent 与 harness 的分工]] — 不懂【Harness】，就做不了区分 agent 与 harness 的分工
- [[Harness level feature]] — 不懂【Harness】，就做不了判断哪些能力属于 Harness level feature
- [[Filesystem 作为最基础的 harness 原语]] — 不懂【Harness】，就做不了把文件系统认定为 harness 原语
- [[可观测性]] — 可观测性被归为 harness 自身的组成部分。

## 相关

- [[编排循环 Orchestration Loop TAO ReAct]] · 常一起用 — Harness 明列编排循环、状态持久化、错误处理与护栏等运行部件。
- [[笨循环 Dumb Loop]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[记忆即提示 Memory as Prompt]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[执行可靠性机制 State Error Guardrails Verification]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[脚手架与 Harness 厚度 Scaffolding Harness Thickness]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[prompt completion]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[chat templated prompts]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[cached input tokens]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[滚动截断 rolling truncation]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[跨轮次记忆与连贯策略]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[Responses API 与生产设置对齐]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[「垃圾回收」型 agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[熵与腐化 entropy and decay]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[功能与行为验证的缺口]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[service template 与 golden path]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[解空间收窄 constraining the solution space]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[AI 友好度（AI-friendliness）作为选型标准]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[拓扑作为新抽象层]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[rigor 的搬迁 relocating rigor]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[从期望行为反推 harness 设计]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Filesystem 作为最基础的 harness 原语]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Self-verification loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Context injection]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Progressive disclosure（渐进式披露）与 Skills]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[step ID 自动索引]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[事件驱动编排与执行解耦]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[普遍可触发 universally triggered]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[子 agent 与 step.invoke()]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[两级上下文剪枝 pruning]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[预算警告与溢出恢复]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[steering]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[context firewall]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[长上下文的幻觉]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[agentfile CLAUDE.md 与 AGENTS.md]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[back-pressure]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[显式且可检查的并行]] · 同篇出现（co-occurrence） — 同篇出现：harness-05
- [[优化对象的阶梯]] · 同篇出现（co-occurrence） — 同篇出现：harness-05
- [[上下文 playbook 与增量条目]] · 同篇出现（co-occurrence） — 同篇出现：harness-05
- [[上下文坍塌与简洁偏置]] · 同篇出现（co-occurrence） — 同篇出现：harness-05
- [[机制与内容分离]] · 同篇出现（co-occurrence） — 同篇出现：harness-05
- [[可执行搜索空间]] · 同篇出现（co-occurrence） — 同篇出现：harness-05
- [[有界改动与回归闸]] · 同篇出现（co-occurrence） — 同篇出现：harness-05
- [[可编辑面与循环外的权限控制]] · 同篇出现（co-occurrence） — 同篇出现：harness-05
- [[进化式搜索与适应度]] · 同篇出现（co-occurrence） — 同篇出现：harness-05
- [[递归结构不能替代基座智能]] · 同篇出现（co-occurrence） — 同篇出现：harness-05
- [[最慢 worker 瓶颈与刚性]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[handoff 交接]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[自收敛与免全局同步]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[integrator 瓶颈]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[为吞吐量设计与可接受错误率]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[意图规约与可引导性]] · 同篇出现（co-occurrence） — 同篇出现：harness-06
- [[Planner-Generator-Evaluator 三 Agent 架构]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Handoff Artifact]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Harness 简化原则 Harness Simplification]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[native sandbox execution]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[AGENTS.md]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[apply patch tool]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[harness 的过时假设]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[任务时域 task horizon]] · 同篇出现（co-occurrence） — 同篇出现：harness-12
- [[长周期任务的基础设施压力]] · 同篇出现（co-occurrence） — 同篇出现：harness-12

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Harness-6c8679b108ff83579a3001b2c114d069
- Context Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- Context Engineering ｜ 《Coding Agent 如何工作：工具循环与上下文工程》 ｜ https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
- Context Engineering ｜ 《只改两个 API 设置，OpenAI 把 ARC-AGI-3 成绩提到三倍》 ｜ https://openai.com/index/how-two-settings-tripled-our-arc-agi-3-scores
- Harness Engineering ｜ 《Martin Fowler 为「harness 工程」站台：Thoughtworks 的一线笔记》 ｜ https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html
- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
- Harness Engineering ｜ 《你的 agent 需要的是 harness，不是又一个框架》 ｜ https://www.inngest.com/blog/your-agent-needs-a-harness-not-a-framework
- Harness Engineering ｜ 《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》 ｜ https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents

## 别名

`项目级感知`、`整个项目一起看`、`model 外壳`、`runtime`、`agent harness`

## 反链

- [[Skill]]
- [[上下文 context]]
- [[Sandbox]]
- [[工具 Tools]]
- [[持久化执行 durable execution]]
- [[记忆 Memory]]
- [[Agentic Engineering]]
- [[Subagent]]
- [[多时间尺度记忆与「记忆只是 hint」]]
- [[奖励攻击与多样性坍塌]]
- [[品味与「不接受够用就行」]]
- [[子 agent 与 step.invoke()]]
- [[Agent vs Harness]]
- [[coding agent]]
- [[Guardrails]]
- [[Session]]
- [[Skill-as-method-call]]
- [[上下文压缩 Context Compression Summarization]]
- [[Agent loop]]
- [[MCP Model Context Protocol]]
- [[跨轮次记忆与连贯策略]]
- [[验证闭环 verification loop]]
- [[Loop Engineering]]
- [[上下文腐烂 Context Rot]]
- [[权限与推理的架构分离]]
- [[文件系统即持久记忆]]
- [[子 agent 编排 Fork Teammate Worktree]]
- [[cached input tokens]]
- [[Claude Managed Agents]]
- [[Context Reset vs Compaction]]
- [[Creator → Curator 角色转换]]
- [[Cross-session Work]]
- [[Grading Criteria]]
- [[handoff 交接]]
- [[Harness token floor]]
- [[instruction budget]]
- [[Self-verification loop]]
- [[service template 与 golden path]]
- [[shell tool]]
- [[stateless]]
