# 选题装配：你的 agent 需要的是 harness，不是又一个框架

> 生成于 2026-09-13｜按 06-选题装配 模板装配｜所有引用都是真实单元，未新增内容

## 目标受众

已经在写 agent、但一直在换框架的人；以及要给团队讲清「harness 工程是什么」的人

## 装配理由

同一批源材料里，"框架"与"harness"被反复对照。这条装配线用一篇文章的入口问题，串起概念、观点、案例与动作路径，最后落到一次可观察的实验。

## 核心调用单元

### 问题

- [[QST-HAR-03_你的 agent 需要的是 harness，不是又一个框架]] —— 你的 agent 需要的是 harness，不是又一个框架

### 概念

- [[CON-agent-harness_Agent Harness]]
- [[CON-harness-engineering_Harness 工程]]
- [[CON-agent-loop_Agent 循环]]
- [[CON-guardrails_护栏]]

### 观点

- [[OPI-HAR-03-01_在任何工程学科里，harness 都是同一件东西：连接、保护、编排各个部件，而自己不做事。线束在…]] —— 在任何工程学科里，harness 都是同一件东西：连接、保护、编排各个部件，而自己不做事
- [[OPI-HAR-03-02_agent runtime 需要的正是这个东西。LLM 是引擎，工具是外设，memory 是存储…]] —— agent runtime 需要的正是这个东西。LLM 是引擎，工具是外设，memory
- [[OPI-HAR-03-03_那就是 harness。而每一个 agent 框架都在从零重造一个：自己的重试逻辑、自己的状态持…]] —— 那就是 harness。而每一个 agent 框架都在从零重造一个：自己的重试逻辑、自己
- [[OPI-HAR-03-04_作者的判断是：持久化、事件驱动的基础设施早已解决了这些问题。每一次 LLM 调用或工具调用都成为…]] —— 作者的判断是：持久化、事件驱动的基础设施早已解决了这些问题。每一次 LLM 调用或工具调
- [[OPI-HAR-03-05_为了验证这一点，Inngest 造了 Utah——Universally Triggered A…]] —— 为了验证这一点，Inngest 造了 Utah——Universally Trigger

### 案例

- [[CAS-agent-harness_Agent Harness：一个具体场景]]（假设场景，`case_type` 已标注）

### 方案

- [[SOL-agent-harness_Agent Harness：可执行动作路径]]

## 可追加调用单元

- 补充问题：[[QST-agent-harness_能不能讲清「Agent Harness」]]
- 补充概念：（按需从主题地图取）
- 补充观点：  - [[OPI-CTX-A2-03_关键数字：官方 harness 下 GPT-5.6 Sol 得 13.3%，开启两项设置后得 3…]] —— 关键数字：官方 harness 下 GPT-5.6 Sol 得 13.3%，开启
  - [[OPI-HAR-01-02_核心判断：她认可 harness 这个词。OpenAI 那篇文章标题里挂着 harness，正文…]] —— 核心判断：她认可 harness 这个词。OpenAI 那篇文章标题里挂着 ha
  - [[OPI-HAR-01-05_由此延伸出全文真正的思想负载：harness 会不会成为新的 service template；…]] —— 由此延伸出全文真正的思想负载：harness 会不会成为新的 service t
  - [[OPI-HAR-02-02_harness 的定义用的是减法：If you're not the model, you're…]] —— harness 的定义用的是减法：If you're not the model
- 补充案例：[[CAS-harness-engineering_Harness 工程：一个具体场景]]
- 补充方案：[[SOL-harness-engineering_Harness 工程：可执行动作路径]]

## 建议结构

1. 痛点：你的 agent 需要的是 harness，不是又一个框架
2. 冲突：先用 [[QST-agent-harness_能不能讲清「Agent Harness」]] 让人自己答一遍
3. 展开：[[CON-agent-harness_Agent Harness]] 的定义与边界
4. 案例：[[CAS-agent-harness_Agent Harness：一个具体场景]]
5. 方法：[[SOL-agent-harness_Agent Harness：可执行动作路径]] 的动作路径
6. 收束：回到 [[QST-agent-harness_能不能讲清「Agent Harness」]] 重答一次

## 表达骨架

### 开头

直接抛问题：你的 agent 需要的是 harness，不是又一个框架

### 中段 1

概念：把「Agent Harness」讲清楚 —— 定义、费曼、边界。

### 中段 2

观点：在任何工程学科里，harness 都是同一件东西：连接、保护、编排各个部件，而自己不做事

### 中段 3

案例与方案：[[CAS-agent-harness_Agent Harness：一个具体场景]] + [[SOL-agent-harness_Agent Harness：可执行动作路径]]

### 结尾

用 [[QST-agent-harness_能不能讲清「Agent Harness」]] 做一次自测：答得出，说明这一轮讲明白了。
