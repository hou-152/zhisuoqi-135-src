---
id: cm_e56f1e8b
name: Harness 工程
nameEn: Harness Engineering
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.281
depth: 1
origin: [context, harness]
aliases: ["Harness Engineering"]
sources: 13
---

# Harness 工程 · Harness Engineering

> 围绕模型构建的完整系统，使 Agent 能够自主行动。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.281

## 费曼一下

Harness 工程比提示词和上下文更大。它把工具、状态、错误、验证、安全和生命周期都放进同一个执行架构里，使模型不仅能回答，还能行动。

## 原文 context

“让 Agent 能够自主行动的完整系统”

## 掌握证据（做到这些才算会）

- 能举出把人类先验注入 Agent 系统的具体做法
- 能说明模型升级后如何定位并替换 Harness 中过时的部分

## 验收问句

> {{name}} 的两个作用是什么？举一个注入先验的例子。

## 先懂这些（前置 1）

- [[If you're not the model, you're the harness.]] · **soft** — 不懂这条划界公式，就说不清 Harness 工程的范围、也不知道除模型外该由谁负责

## 相关

- [[从期望行为反推 harness 设计]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Filesystem 作为最基础的 harness 原语]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Self-verification loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Context injection]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Progressive disclosure（渐进式披露）与 Skills]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[递归 Planner-Worker 架构]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Symphony]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[context firewall]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[长上下文的幻觉]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[agentfile CLAUDE.md 与 AGENTS.md]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[back-pressure]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Outer Loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Orchestra Interface]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Agent as a New Type of Software]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[产品经理的组织化]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[Implementation 能力]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[Agent 经济]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[资深悖论]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[验证子系统与可运行的证据]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[功能清单作为 harness 原语]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[会话生命周期]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[端到端验证]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[弱 harness 强 harness 对照与消融实验]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[从救火到审查的角色转移]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[Repo-local instructions]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Long-running agent handoff]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[前置对齐 front-loading alignment]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[可维护性 霰弹式手术]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[可维护性缺一个可靠的打分预言机]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[系统架构评审]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Von Neumann Architecture Analogy]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[原则侧]] · 同篇出现（co-occurrence） — 同篇出现：harness-27
- [[通用工具与「给模型一台计算机」]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Memory file 与 continual learning]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[交互 Scalability Interaction Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[方向漂移 Direction Drift]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Harness 组件生命周期]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Generative Kernel]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[instruction budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Forward Deployed Engineer]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Skills Hell]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[动态系统]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[Agent-driven CICD]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[Autofixing]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[Architecture Operator 分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[价值定义]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[状态子系统与进度持久化]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[范围控制与显式的完成定义]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[仓库即唯一事实来源]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[验证缺口]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[可观测性]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[Safe autonomy]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Infrastructure noise]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness-level benchmarks]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[可维护性没有惩罚项]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Mutation Testing 与前沿质量评测]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Harness 内 RL RL inside the harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[2026 版约束理论]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Bitter Lesson]] · 同篇出现（co-occurrence） — 同篇出现：harness-26
- [[Orchestration Loop TAO Cycle ReAct Loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-27

## 出场

- Context Engineering ｜ 《Agent Harness 的本质：把模型放进可控的执行系统》 ｜ https://baoyu.io/translations/2026-05-10/akshay-pachaar-2041146899319971922
- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
- Harness Engineering ｜ 《Harness Engineering 三个 Scaling 维度的统一框架》 ｜ https://yage.ai/share/harness-engineering-scalability-20260330.html
- Harness Engineering ｜ 《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》 ｜ https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents
- Harness Engineering ｜ 《2026 AI 工程五大趋势：从模型能力转向可靠系统》 ｜ https://www.latent.space/p/aiewf26trends
- Harness Engineering ｜ 《Harness Engineering：AI-First 组织的信任机制重构》 ｜ https://app.podwise.ai/dashboard/episodes/8185395
- Harness Engineering ｜ 《Harness 工程学习仓库：从原始文献到能跑的 skill》 ｜ https://github.com/walkinglabs/learn-harness-engineering/blob/main/README-CN.md
- Harness Engineering ｜ 《Harness engineering：把 agent 能力落到工具、约束和循环里》 ｜ https://github.com/walkinglabs/awesome-harness-engineering

## 别名

`Harness Engineering`

## 反链

- [[Sandbox]]
- [[Agentic Engineering]]
- [[Subagent]]
- [[状态子系统与进度持久化]]
- [[Agent vs Harness]]
- [[AI-First]]
- [[Guardrails]]
- [[Long-running agent handoff]]
- [[Runtime-harness separation]]
- [[Skills Hell]]
- [[上下文压缩 Context Compression Summarization]]
- [[验证闭环 verification loop]]
- [[Loop Engineering]]
- [[上下文腐烂 Context Rot]]
- [[验证子系统与可运行的证据]]
- [[Creator → Curator 角色转换]]
- [[Self-verification loop]]
- [[SWE-bench 与二元打分]]
- [[If you're not the model, you're the harness.]]
- [[非模型架构 Non-model Architecture]]
- [[渐进式披露 progressive disclosure]]
- [[递归 Planner-Worker 架构]]
- [[可维护性没有惩罚项]]
- [[时间 Scalability Temporal Scalability]]
- [[信任机制重构]]
- [[自评失真 Self-evaluation Distortion]]
- [[Agent-driven CICD]]
- [[Architecture Operator 分工]]
- [[Context as working memory budget]]
- [[context firewall]]
- [[Filesystem 作为最基础的 harness 原语]]
- [[Forward Deployed Engineer]]
- [[Harness level feature]]
- [[Infrastructure noise]]
- [[Mutation Testing 与前沿质量评测]]
- [[Orchestration Loop TAO Cycle ReAct Loop]]
- [[Progressive disclosure（渐进式披露）与 Skills]]
- [[Repo-local instructions]]
- [[the dumb zone the smart zone]]
- [[Trace-based evals]]
