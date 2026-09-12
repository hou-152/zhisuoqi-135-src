---
id: cm_35dc59c9
name: native sandbox execution
type: REPRESENTATIONAL
subject: Harness Engineering
domain: tools-sandbox
learningStage: now
verification: use
centrality: 0.072
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# native sandbox execution

> Agents SDK 原生支持在受控环境里跑 agent，自带任务所需文件、工具与依赖。

**领域** tools-sandbox ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

SDK 自带的沙箱执行能力。开发者不再需要自己搭建受控的代码运行环境，直接使用 SDK 内置的就可以让 agent 在隔离环境里读写文件、安装依赖、运行命令。

## 原文 context

The updated Agents SDK supports sandbox execution natively, so agents can run in controlled computer environments with the files, tools, and dependencies they need for a task.

## 掌握证据（做到这些才算会）

- 能搭出一个带文件与依赖的受控执行环境
- 能说明沙箱把 agent 的动作限在了哪里

## 验收问句

> {{name}} 里 agent 动手前被限在什么范围内？

## 先懂这些（前置 1）

- [[Sandbox]] · **hard** — 原生沙箱执行是 SDK 内置的沙箱能力，不懂沙箱概念就抓不住它隔离受控的含义。

## 相关

- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
## 反链

- [[Harness]]
- [[Sandbox]]
- [[model-native harness]]
- [[Agents SDK]]
