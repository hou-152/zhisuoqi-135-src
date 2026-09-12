---
id: cm_926aa05d
name: shell tool
type: REPRESENTATIONAL
subject: Harness Engineering
domain: tools-sandbox
learningStage: now
verification: compute
centrality: 0.099
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# shell tool

> 让模型在真实环境里执行 shell 命令、跑代码并读回输出的具名工具。

**领域** tools-sandbox ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.099

## 费曼一下

让 agent 像工程师一样在终端里执行命令。这是 agent 要做真活（安装包、跑测试、冲数据）的最基础开关。

## 原文 context

code execution using the shell tool

## 掌握证据（做到这些才算会）

- 能用 shell tool 跑通一段代码并取回 stdout
- 能根据报错改命令重跑直到通过

## 验收问句

> 要跑一段脚本验证结果，怎么用 {{name}} 执行并取回输出？

## 懂了它才能懂（解锁 3）

- [[通用工具与「给模型一台计算机]] — 该思路就是让 agent 用自带 bash 写代码，不懂 shell tool 就不知它依赖什么。
- [[code mode]] — 写代码执行代码要靠能跑 shell 的具名工具落地，先懂 shell tool 更具体。
- [[apply patch tool]] — 两者同属让模型在真实环境改文件与执行的具名工具，懂 shell 才懂 apply patch 的定位。

## 相关

- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
## 反链

- [[通用工具与「给模型一台计算机]]
- [[Agents SDK]]
- [[apply patch tool]]
- [[code mode]]
- [[model-native harness]]
