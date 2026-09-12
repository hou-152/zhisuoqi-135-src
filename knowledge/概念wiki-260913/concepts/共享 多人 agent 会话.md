---
id: cm_2081e44e
name: 共享 / 多人 agent 会话
type: CONCEPTUAL
subject: Context Engineering
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.126
depth: 3
origin: [context]
aliases: []
sources: 1
---

# 共享 / 多人 agent 会话

> 同一 agent 会话对团队可见，多人可进入同一个 chat 一起看、一起改，压缩协作循环。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

大多数人用 AI 是各自对着自己的私密聊天窗口干活，成果和过程别人看不见。共享会话把这块“单人操作台”改成“公共工作台”：谁发起的、改到哪一步、预览长什么样，全组一目了然。于是 PM、设计师、工程师不再靠转述彼此的意图，而是围着同一个 agent 直接协作——协作的往返一下子短了。

## 原文 context

Linear 演示里的一个关键差异化能力——agent session 对团队可见，多人可以跳进同一个 chat 一起看、一起改。文中的真实例子：head of product（Anon）和 head of design（Connor）一起在 inbox 上来回改，都能看同一个 preview link；代码评审时，工程师可以直接让 agent 修，而不必转手叫另一位工程师。Karri 说这“压缩了协作循环”。

## 掌握证据（做到这些才算会）

- 能描述产品与设计同看一个 preview link 并轮流修改的流程
- 能说明工程师直接让 agent 改而不再转手同事的收益

## 验收问句

> {{name}} 是怎么让多人进入同一会话共同改动的？

## 先懂这些（前置 3）

- [[共享文件加锁的协调机制]] · **soft** — 多人同时改同一会话，需先懂共享状态与锁如何防止并发冲突。
- [[多智能体架构]] · **soft** — 多人会话建立在多 agent 共同工作的架构之上。
- [[动态协调 dynamic coordination]] · **soft** — 多人进入同一会话后需按彼此当下动作协调，依赖动态协调。

## 懂了它才能懂（解锁 1）

- [[Orchestra Interface]] — 人留在 flow 中与 Agent 共处，需先懂共享会话这一协作形态。

## 相关

- [[代理原生 agent-native]] · 同篇出现（co-occurrence） — 同篇出现：context-10
- [[上下文骨架]] · 同篇出现（co-occurrence） — 同篇出现：context-10
- [[“SaaS 已死”叙事与护城河蒸发]] · 同篇出现（co-occurrence） — 同篇出现：context-10

## 出场

- Context Engineering ｜ 《SaaS 没死，Linear 正把上下文变成 Agent 的骨架》 ｜ https://app.podwise.ai/dashboard/episodes/7673574
## 反链

- [[多智能体架构]]
- [[代理原生 agent-native]]
- [[动态协调 dynamic coordination]]
- [[共享文件加锁的协调机制]]
- [[“SaaS 已死”叙事与护城河蒸发]]
- [[Orchestra Interface]]
- [[上下文骨架]]
