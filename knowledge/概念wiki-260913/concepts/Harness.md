---
id: cm_0a4ca4ce
name: Harness
type: CONCEPTUAL
subject: AI 概念库 × Context Engineering × Harness Engineering
domain: harness-runtime
learningStage: now
verification: judge
centrality: 1
depth: 3
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

## 先懂这些（前置 9）

- [[Agent loop]] · **hard** — Agent Harness 负责组织模型、工具与观察之间的运行循环。
- [[持久化执行 durable execution]] · **hard** — Durable Execution 是 Agent Harness 提供可靠重试与恢复的组成部分。
- [[Guardrails]] · **hard** — Guardrails 是 Agent Harness 约束输入、输出与行动路径的组成部分。
- [[记忆 Memory]] · **hard** — Memory 是 Agent Harness 管理跨步骤与跨会话信息的组成部分。
- [[MCP Model Context Protocol]] · **hard** — MCP 是 Agent Harness 接入外部工具与服务的组成部分。
- [[Sandbox]] · **hard** — Sandbox 是 Agent Harness 隔离执行环境的组成部分。
- [[Skill]] · **hard** — Skill 是 Agent Harness 按需提供方法与能力的组成部分。
- [[系统提示 System Prompt]] · **hard** — System Prompt 是 Agent Harness 配置模型行为的组成部分。
- [[验证闭环 verification loop]] · **hard** — Verification Loop 是 Agent Harness 检查结果并回灌反馈的组成部分。

## 懂了它才能懂（解锁 13）

- [[Agent]] — 来源提出 Agent = Model + Harness；本站在运行组成轴接纳该关系，同时保留 Agent 与 Agent Harness 不同义的行为视角。
- [[If you're not the model, you're the harness.]] — 该划界公式的定义直接依赖 Harness 这一侧的概念。
- [[Agent = Model + Harness]] — 等式右项的 Harness 不懂，等式无法成立。
- [[编排循环与「dumb loop」]] — 循环是 Harness 的心跳，先懂 Harness 才懂循环的位置。
- [[LLM-as-CPU Harness-as-OS]] — 类比的一端就是 Harness，不懂它类比无从谈起。
- [[操作系统类比]] — 该类比的主语就是 harness。
- [[功能清单作为 harness 原语]] — 要成为 harness 原语，得先懂 harness 需要什么。
- [[共享 harness]] — 共享的对象就是 harness，不懂它无从谈复用。
- [[从期望行为反推 harness 设计]] — 反推的产物是 harness 功能，前提是懂 harness。
- [[舱单]] — 舱单是描述工作区与挂载的清单，属 harness 的组成部分。
- [[可观测性]] — 可观测性被归为 harness 自身的组成部分。
- [[部署系统层]] — 该层基本等同于模型之外的 harness 层。
- [[动态系统]] — 说 harness 是动态系统，需先懂 harness 是什么。

## 相关

- [[编排循环 Orchestration Loop TAO ReAct]] · 常一起用 — Harness 明列编排循环、状态持久化、错误处理与护栏等运行部件。
- [[LLM-as-CPU Harness-as-OS]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[笨循环 Dumb Loop]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[记忆即提示 Memory as Prompt]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[执行可靠性机制 State Error Guardrails Verification]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[脚手架与 Harness 厚度 Scaffolding Harness Thickness]] · 同篇出现（co-occurrence） — 同篇出现：context-13
- [[tokens]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[prompt completion]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[multimodal Vision LLMs]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[chat templated prompts]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[stateless]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[cached input tokens]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[reasoning thinking]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[tool loop]] · 同篇出现（co-occurrence） — 同篇出现：context-14
- [[滚动截断 rolling truncation]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[跨轮次记忆与连贯策略]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[RHAE]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[Responses API 与生产设置对齐]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[通用 harness 的公平性张力]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[上下文占用率与性能衰减]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[输出 token 效率]] · 同篇出现（co-occurrence） — 同篇出现：context-A2
- [[架构约束的确定性执行]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[垃圾回收」型 agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[熵与腐化 entropy and decay]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[卡住即信号 struggle as signal]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[功能与行为验证的缺口]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[service template 与 golden path]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[解空间收窄 constraining the solution space]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[AI 友好度（AI-friendliness）作为选型标准]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[拓扑作为新抽象层]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[rigor 的搬迁 relocating rigor]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[Harness level feature]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[从期望行为反推 harness 设计]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Filesystem 作为最基础的 harness 原语]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[ReAct loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[通用工具与「给模型一台计算机]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Self-verification loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Context injection]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Memory file 与 continual learning]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Tool call offloading]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Progressive disclosure（渐进式披露）与 Skills]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[模型训练与 harness 设计的耦合]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[step]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[step ID 自动索引]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[think → act → observe 循环]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[事件驱动编排与执行解耦]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[普遍可触发 universally triggered]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[webhook transform 与 connect()]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[小函数组合]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[子 agent 与 step.invoke()]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[两级上下文剪枝 pruning]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[压缩（compaction）与运行内外的分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[预算警告与溢出恢复]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[steering]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[基础设施问题，不是 AI 问题]] · 同篇出现（co-occurrence） — 同篇出现：harness-03
- [[instruction budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[the dumb zone the smart zone]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[context firewall]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[长上下文的幻觉]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[agentfile CLAUDE.md 与 AGENTS.md]] · 同篇出现（co-occurrence） — 同篇出现：harness-04

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

- [[记忆 Memory]]
- [[文件系统即持久记忆]]
- [[Skill]]
- [[Loop Engineering]]
- [[Agent loop]]
- [[Agent]]
- [[agent 与 harness 的分工]]
- [[Cross-session Work]]
- [[验证闭环 verification loop]]
- [[MCP Model Context Protocol]]
- [[Session]]
- [[tokens]]
- [[上下文占用率与性能衰减]]
- [[Agent = Model + Harness]]
- [[Sandbox]]
- [[Guardrails]]
- [[Harness token floor]]
- [[Agentic Engineering]]
- [[上下文腐烂 Context Rot]]
- [[上下文 context]]
- [[模型训练与 harness 设计的耦合]]
- [[权限与推理的架构分离]]
- [[系统提示 System Prompt]]
- [[协同进化与紧耦合 co-evolution principle]]
- [[Context Management 四策略]]
- [[LLM Large Language Model]]
- [[Read-only Verifier Agent]]
- [[stateless]]
- [[程序记忆（Procedural Memory Skills） progressive disclosure]]
- [[持久化执行 durable execution]]
- [[基准测试的捆绑测量性]]
- [[通用 harness 的公平性张力]]
- [[Latent vs Deterministic]]
- [[废料怪兽]]
- [[编排循环与「dumb loop」]]
- [[工具收窄 tool scoping]]
- [[会话的话题边界]]
- [[开箱即用的编排与子 agent]]
- [[确定性工程基础设施】 deterministic engineering infrastructure]]
- [[三层工程 prompt context harness engineering]]
