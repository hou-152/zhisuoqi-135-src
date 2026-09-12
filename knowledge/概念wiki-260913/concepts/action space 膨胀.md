---
id: cm_d2724a8b
name: action space 膨胀
type: CONCEPTUAL
subject: Context Engineering
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.045
depth: 2
origin: [context]
aliases: []
sources: 1
---

# action space 膨胀

> agent 能力增长的副作用：工具数量爆炸，模型更易选错动作、走低效路径，反而变笨。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

给一个人塞三百件工具，他不会变成三百倍能干，只会在工具箱前发呆。选择本身是有成本的。

## 原文 context

agent 能力增长的副作用——工具数量爆炸，MCP 的流行更是火上浇油，用户自配置工具会把几百个来路不明的工具插进精心策划的 action space。结果是模型更容易选错动作、走低效路径，"your heavily armed agent gets dumber"。

## 掌握证据（做到这些才算会）

- 能指出 MCP 与用户自配工具是膨胀来源
- 能说明为何工具越多 agent 表现越差

## 验收问句

> {{name}} 为什么会拖垮 agent 的选动作质量？

## 先懂这些（前置 1）

- [[Action Space】]] · **hard** — 膨胀是对行动空间规模变化的描述，不懂行动空间就不知在膨胀什么。

## 相关

- [[押注 in-context learning]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[与底层模型正交 orthogonal to the underlying models]] · 同篇出现（co-occurrence） — 同篇出现：context-04
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-04

## 出场

- Context Engineering ｜ 《Manus 的上下文工程实战：几轮重写换来的一组局部最优》 ｜ https://manus.im/blog/Context-Engineering-for-AI-Agents-Lessons-from-Building-Manus
## 反链

- [[上下文工程 context engineering]]
- [[Action Space】]]
- [[押注 in-context learning]]
- [[与底层模型正交 orthogonal to the underlying models]]
