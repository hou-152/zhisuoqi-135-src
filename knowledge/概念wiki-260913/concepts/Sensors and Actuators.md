---
id: cm_0145bdc5
name: Sensors and Actuators
type: PROCEDURAL
subject: AI 概念库
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [notion]
aliases: ["Sensors and Actuators", "sensors over the world", "actuators over the world", "传感器与执行器", "感知与行动"]
sources: 1
---

# Sensors and Actuators

> 把工作流拆成感知与行动两类原子操作，让 agent 用一致方式编排它们。

**领域** tools-sandbox ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 原文 context

<mention-page url="https://app.notion.com/p/d6d679b108ff82debc5181b2c1ced4ff"/>
> Decompose the workloads that need to happen into fundamentally sensors over the world, actuators over the world. How do we make it agent native?
**费曼一下**：把世界上的工作流拆成两类原子操作——**感知（sensors）**和**行动（actuators）**——让 agent 来调度。
- **Sensors**：让 agent 看到世界（读文件、查数据库、调 API、看截图）
- **Actuators**：让 agent 改变世界（写文件、发邮件、点击 UI、调用工具）
这是 **Agent-Native Infrastructure** 的设计原语：当所有工作流都被拆成「读 + 写」两类原子时，agent 就能用一致的方式编排它们。
启示：构建 agent 系统的人，要少想「UI / 流程怎么设计」，多想「传感器是什么、执行器是什么、agent 怎么把它们串起来」。

## 掌握证据（做到这些才算会）

- 能把一条业务流程拆成读操作与写操作清单
- 能据此指出系统缺哪个 sensor 或 actuator

## 验收问句

> 用 {{name}} 拆开这条工作流，读和写各是什么？

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Sensors-and-Actuators-5ff679b108ff825f9b3581960a5d4817

## 别名

`Sensors and Actuators`、`sensors over the world`、`actuators over the world`、`传感器与执行器`、`感知与行动`
