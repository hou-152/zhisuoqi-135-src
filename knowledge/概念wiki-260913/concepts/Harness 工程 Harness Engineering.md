---
id: cm_e56f1e8b
name: Harness 工程
nameEn: Harness Engineering
type: CONCEPTUAL
subject: Context Engineering × Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.451
depth: 2
origin: [context, harness]
aliases: ["Harness Engineering"]
sources: 13
---

# Harness 工程 · Harness Engineering

> 围绕模型构建系统、把模型变成工作引擎的工程方式，用于注入人类先验并在模型变强后做外科式修正。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.451

## 费曼一下

Harness 工程比提示词和上下文更大。它把工具、状态、错误、验证、安全和生命周期都放进同一个执行架构里，使模型不仅能回答，还能行动。

## 原文 context

“让 Agent 能够自主行动的完整系统”

## 掌握证据（做到这些才算会）

- 能举出把人类先验注入 Agent 系统的具体做法
- 能说明模型升级后如何定位并替换 Harness 中过时的部分

## 验收问句

> {{name}} 的两个作用是什么？举一个注入先验的例子。

## 先懂这些（前置 2）

- [[上下文工程 context engineering]] · **hard** — 本站工程范围轴采用 Harness Engineering 通常包住 Context Engineering。
- [[Guardrails]] · **hard** — Guardrails 是 Harness Engineering 约束循环行动路径的实践之一。

## 懂了它才能懂（解锁 7）

- [[可执行搜索空间]] — 把 harness 设计写成可搜索代码，先要懂 harness 工程要素。
- [[harness 的过时假设]] — 过时假设正是 harness 工程要外科式修正的对象，不懂工程就不知假设从哪来、如何改。
- [[Responses API 与生产设置对齐]] — 用新 API 重实现 harness，先要懂 harness 工程怎么搭。
- [[基础设施挑战而非 harness 设计问题]] — 判断它不是 harness 设计问题，先要懂 harness 设计是什么。
- [[基础设施问题，不是 AI 问题]] — 把墙归为基础设施问题，先要懂 harness 工程能解决什么。
- [[框架反向工程]] — 越过八成完成度要逆向已有框架，先懂 harness 工程的结构。
- [[configuration problem]] — 失败多源于配置，先懂 harness 工程才知道在哪配置。

## 相关

- [[Harness level feature]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[从期望行为反推 harness 设计]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Filesystem 作为最基础的 harness 原语]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[ReAct loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[通用工具与「给模型一台计算机」]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Self-verification loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Context injection]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Memory file 与 continual learning]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Tool call offloading]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Progressive disclosure（渐进式披露）与 Skills]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[模型训练与 harness 设计的耦合]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[交互 Scalability Interaction Scalability]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[方向漂移 Direction Drift]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[自评失真 Self-evaluation Distortion]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[递归 Planner-Worker 架构]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Symphony]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Harness 组件生命周期]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Context Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[Generative Kernel]] · 同篇出现（co-occurrence） — 同篇出现：harness-A1
- [[instruction budget]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[the dumb zone the smart zone]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[context firewall]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[长上下文的幻觉]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[agentfile CLAUDE.md 与 AGENTS.md]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[back-pressure]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Outer Loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Forward Deployed Engineer]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Orchestra Interface]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Agent as a New Type of Software]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Skills Hell]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Model-relative Curriculum]] · 同篇出现（co-occurrence） — 同篇出现：harness-10
- [[Agent-driven CICD]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[Autofixing]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[Architecture Operator 分工]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[产品经理的组织化]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[Implementation 能力]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[Agent 经济]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[价值定义]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[资深悖论]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[状态子系统与进度持久化]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[验证子系统与可运行的证据]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[范围控制与显式的完成定义]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[功能清单作为 harness 原语]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[会话生命周期]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[仓库即唯一事实来源]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[验证缺口]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[端到端验证]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[弱 harness 强 harness 对照与消融实验]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[从救火到审查的角色转移]] · 同篇出现（co-occurrence） — 同篇出现：harness-18
- [[Repo-local instructions]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Safe autonomy]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Spec-driven agent workflow]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Infrastructure noise]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness-level benchmarks]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Runtime-harness separation]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Long-running agent handoff]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[Harness evolution]] · 同篇出现（co-occurrence） — 同篇出现：harness-19
- [[前置对齐 front-loading alignment]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[RLVR 与编码 agent 的 RL 训练循环]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[SWE-bench 与二元打分]] · 同篇出现（co-occurrence） — 同篇出现：harness-23

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

- [[上下文工程 context engineering]]
- [[Loop Engineering]]
- [[验证闭环 verification loop]]
- [[Agent = Model + Harness]]
- [[Sandbox]]
- [[价值定义]]
- [[Guardrails]]
- [[Long-running agent handoff]]
- [[上下文腐烂 Context Rot]]
- [[Agentic Engineering]]
- [[程序记忆（Procedural Memory Skills） progressive disclosure]]
- [[仓库即唯一事实来源]]
- [[模型训练与 harness 设计的耦合]]
- [[状态子系统与进度持久化]]
- [[RLVR 与编码 agent 的 RL 训练循环]]
- [[范围控制与显式的完成定义]]
- [[可维护性没有惩罚项]]
- [[软件工厂 Software Factory]]
- [[协同进化与紧耦合 co-evolution principle]]
- [[Capability Overhang]]
- [[Context as working memory budget]]
- [[Context Management 四策略]]
- [[Harness evolution]]
- [[Harness level feature]]
- [[Harness Thickness]]
- [[Orchestra Interface]]
- [[Runtime-harness separation]]
- [[Symphony]]
- [[the dumb zone the smart zone]]
- [[Tool call offloading]]
- [[渐进式披露 progressive disclosure]]
- [[Subagent]]
- [[Ralph Loop]]
- [[迷失在中间 lost in the middle]]
- [[递归 Planner-Worker 架构]]
- [[空间 Scalability Spatial Scalability]]
- [[能力鸿沟]]
- [[时间 Scalability Temporal Scalability]]
- [[通用工具与「给模型一台计算机」]]
- [[验证子系统与可运行的证据]]
