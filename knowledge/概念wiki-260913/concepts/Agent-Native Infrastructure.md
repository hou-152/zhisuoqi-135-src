---
id: cm_012fc42e
name: Agent-Native Infrastructure
type: CONCEPTUAL
subject: AI 概念库
domain: agent-org
learningStage: when-needed
verification: judge
centrality: 0.144
depth: 0
origin: [notion]
aliases: ["Agent-Native Infrastructure", "agent-native infrastructure", "agent-first infrastructure", "面向 agent 的基础设施", "agent-native", "agent 原生基础设施", "智能体原生基础设施", "agent native"]
sources: 2
---

# Agent-Native Infrastructure

> 为 agent 而非给人点屏幕设计的基础设施：Markdown、CLI/API/MCP、结构化日志与可粘贴指令。

**领域** agent-org ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.144

## 原文 context

<mention-page url="https://app.notion.com/p/202679b108ff8386979a01933594c9bc"/>
> Most software is still built for humans clicking through screens... But increasingly the user is not the human directly. The user is the human's agent.
**费曼一下**：为 agent 而非人设计的产品基础设施。
Karpathy 的怨念：现在的文档还在告诉他"去这个 URL，点这个按钮"——但他根本不想点。**他想要的是一段可以粘贴给 agent 的指令。**
	agent-native surface 包括：
- Markdown 文档
- CLI、API、MCP server
- Structured logs、机器可读 schema
- 可复制粘贴的 agent 指令
- 安全 permissioning、可审计动作
- Headless 安装流程
**判断 benchmark**：MenuGen 故事——能否对 agent 说"build MenuGen"，agent 就完成 Vercel、auth、payments、DNS、secrets、生产配置？如果能，infrastructure 才算 agent-native。
底层抽象是 **Sensors 与 Actuators**：一切都是某种感知器或执行器。

## 掌握证据（做到这些才算会）

- 能列出一项 agent-native 的接口形态
- 能用 MenuGen 式基准判断基础设施是否 agent-native

## 验收问句

> 一份文档要怎样改写才算 {{name}}？

## 懂了它才能懂（解锁 2）

- [[代理原生 agent-native]] — 不懂【Agent-Native Infrastructure】，就做不了【代理原生】的底层形态设计——不知道要把能力做成 Markdown、CLI/API/MCP 和结构化日志而不是给人点的屏幕
- [[信任机制重构]] — 不懂【Agent-Native Infrastructure】，就做不了【信任机制重构】——没有结构化日志与 API/CLI，验证与结果审核根本无从取证

## 相关

- [[Vantage]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Claude Code]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Facts are facts, but perception is reality]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Reward Signal]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[AI matchmaking]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[门控机制]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[承诺链条]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Taste]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[The Deferred Bill]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[蒸发冷却]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[DeepSeek Moment]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[通关 ≠ 理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[capability spike 公式]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[大规模监控（Bulk Surveillance）]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[领域不均匀的谄媚（Domain-asymmetric Sycophancy）]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Step Change]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[优势函数]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[检索池 vs 引用]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[行为提取]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Executive LLM]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Manus 收购叫停事件]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[死亡地带]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[机会成本]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[给事物命名]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Ghosts, Not Animals]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[CISPO]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agentic Tools]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[注水内容]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Without Defensiveness]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Web of Trust]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Engram]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[llms-full.txt]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[ARC-AGI-3]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Simulated Competence]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[AgentCore]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Hyperscaler]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Honcho]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Bedrock Managed Agents]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[opt in opt out]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[知识端点]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Intelligence Factory 智能工厂]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[提示词缓存（Prompt Caching）]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[提示词记忆（MEMORY.md + USER.md）]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[记忆冲刷（Memory Flush）]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Frontier Demand 前沿需求]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[谄媚（Sycophancy）]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[对话式广告归因闭环]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[虚拟同事 Virtual Co-workers]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Codex]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[对话上下文定向]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[锯齿状智能（Jagged Intelligence）]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[苍白之马（Pale Horse）]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[桥接推理]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[反思性提示]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[混合指代]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[ALFRED]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[短上下文]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[意向性立场]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[意向性系统理论]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[无国籍智能体]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Agent-Native-Infrastructure-1a9679b108ff82dbb4f5811aa05d2be3
- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Agent-Native-Infrastructure-d9e679b108ff8375a0b3012c518cbdab

## 别名

`Agent-Native Infrastructure`、`agent-native infrastructure`、`agent-first infrastructure`、`面向 agent 的基础设施`、`agent-native`、`agent 原生基础设施`、`智能体原生基础设施`、`agent native`

## 反链

- [[Skill]]
- [[上下文 context]]
- [[Reward Signal]]
- [[Token count]]
- [[长上下文窗口]]
- [[Agentic Engineering]]
- [[提示词缓存（Prompt Caching）]]
- [[AI 作为新同事]]
- [[Intelligence Factory 智能工厂]]
- [[闭环]]
- [[多头注意力]]
- [[多智能体架构]]
- [[开源 vs 闭源]]
- [[平行 AI 基础设施]]
- [[死亡地带]]
- [[显式指代]]
- [[隐式指代]]
- [[DPPO]]
- [[REINFORCE]]
- [[Rubric]]
- [[Simulated Competence]]
- [[Stateful Runtime Environment (SRE)]]
- [[The Deferred Bill]]
- [[扁平化]]
- [[谄媚（Sycophancy）]]
- [[对话式广告归因闭环]]
- [[根因优先]]
- [[混合指代]]
- [[机会成本]]
- [[检索池 vs 引用]]
- [[可自动化循环]]
- [[前沿实验室]]
- [[数据中心]]
- [[推理模型]]
- [[信任机制重构]]
- [[信任域]]
- [[优势函数]]
- [[知识端点]]
- [[重要性采样]]
- [[注意力机制]]
