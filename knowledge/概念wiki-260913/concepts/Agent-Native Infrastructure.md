---
id: cm_012fc42e
name: Agent-Native Infrastructure
type: CONCEPTUAL
subject: AI 概念库
domain: agent-org
learningStage: when-needed
verification: judge
centrality: 0.062
depth: 2
origin: [notion]
aliases: ["Agent-Native Infrastructure", "agent-native infrastructure", "agent-first infrastructure", "面向 agent 的基础设施", "agent-native", "agent 原生基础设施", "智能体原生基础设施", "agent native"]
sources: 2
---

# Agent-Native Infrastructure

> 为 agent 而非给人点屏幕设计的基础设施：Markdown、CLI/API/MCP、结构化日志与可粘贴指令。

**领域** agent-org ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.062

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

## 先懂这些（前置 1）

- [[电脑应该适应人]] · **soft** — 为 agent 而非人设计基础设施，前提是认同机器应适应使用者的方向。

## 相关

- [[金唱片]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Dr. GRPO]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[暗淡蓝点]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[DPPO]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Tic Word]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[安全边际]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[中年危机]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Vantage]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Claude Code]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Facts are facts, but perception is reality]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[三个煤矿金丝雀]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[death of the social]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Reward Signal]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[AI matchmaking]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[道德恐慌]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[门控机制]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[星空与道德律]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[十年重塑]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Verifiability]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[半途低谷]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[搭子文化]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Software 3.0]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Exhaustion Debt]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[结构压力的性别化误读]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[习惯]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[意志力]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[文明的 feature（不是 bug）]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[极权制度下的产业革命]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[承诺链条]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Taste]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[REM 睡眠]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Skills as permanent upgrades]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Verification Markets]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Dating-app fatigue]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Ghosting]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[推理模型]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[The Deferred Bill]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[芯片管制]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Kappa 系数]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[The Grind]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[llms.txt]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Tiny Engram]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[看守看守者（Watchmen Watching the Watchmen）]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[必要劳动]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Targeted Memory Reactivation]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[DeepSeek V4]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[REINFORCE]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[SFT Feedback Loop]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[被动 vs. 互动屏幕使用]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[迪士尼负债]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[激励结构]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[上手状态]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[EHR]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[条件记忆]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[屏幕时间]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Choke Point]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[系统竞争]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[蒸发冷却]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[党的隐性契约]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[边际成本]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Agent-Native-Infrastructure-1a9679b108ff82dbb4f5811aa05d2be3
- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Agent-Native-Infrastructure-d9e679b108ff8375a0b3012c518cbdab

## 别名

`Agent-Native Infrastructure`、`agent-native infrastructure`、`agent-first infrastructure`、`面向 agent 的基础设施`、`agent-native`、`agent 原生基础设施`、`智能体原生基础设施`、`agent native`

## 反链

- [[多智能体架构]]
- [[Skill]]
- [[默认思维倾向]]
- [[常识心理学]]
- [[吹哨人困境]]
- [[鉴别诊断]]
- [[DPPO]]
- [[长上下文窗口]]
- [[党的隐性契约]]
- [[环境即无形之手]]
- [[可疑疾病]]
- [[三种应对：接受 清除 装作不知道（Acceptance Purging Pretend Ignorance）]]
- [[指代表达]]
- [[Dr. GRPO]]
- [[苍白之马（Pale Horse）]]
- [[承诺链条]]
- [[搭子文化]]
- [[法律的模糊性]]
- [[剪辑经济]]
- [[简化性暴力]]
- [[临床推理]]
- [[旅行者号]]
- [[五人平均法则]]
- [[隐式指代]]
- [[death of the social]]
- [[RLHF]]
- [[Token 补贴缺口（Token Subsidy Gap）]]
- [[Token count]]
- [[安全边际]]
- [[Agentic Engineering]]
- [[上下文 context]]
- [[冰相]]
- [[次贷式 AI 危机（Subprime AI Crisis）]]
- [[第二意见]]
- [[二阶思维]]
- [[付出按旧规则，兑现按新规则]]
- [[干预窗口]]
- [[宏动作]]
- [[混合指代]]
- [[机会性筛查]]
