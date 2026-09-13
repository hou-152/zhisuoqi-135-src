---
id: cm_926aa05d
name: shell tool
type: REPRESENTATIONAL
subject: Harness Engineering
domain: tools-sandbox
learningStage: now
verification: use
centrality: 0.181
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# shell tool

> 让模型在真实环境里执行 shell 命令、跑代码并读回输出的具名工具。

**领域** tools-sandbox ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.181

## 费曼一下

让 agent 像工程师一样在终端里执行命令。这是 agent 要做真活（安装包、跑测试、冲数据）的最基础开关。

## 原文 context

code execution using the shell tool

## 掌握证据（做到这些才算会）

- 能用 shell tool 跑通一段代码并取回 stdout
- 能根据报错改命令重跑直到通过

## 验收问句

> 要跑一段脚本验证结果，怎么用 {{name}} 执行并取回输出？

## 先懂这些（前置 1）

- [[工具 Tools]] · **hard** — 不懂【工具】，就做不了【shell tool】的⟨把执行能力包装成模型可调用的具名工具⟩

## 懂了它才能懂（解锁 2）

- [[通用工具与「给模型一台计算机」]] — 不懂【shell tool】，就做不了【通用工具与「给模型一台计算机」】——让模型写代码执行必须有一个执行 shell 的具名工具
- [[code mode]] — 不懂【shell tool】，就做不了【code mode】的⟨让 agent 写代码并真跑起来拿到结果⟩

## 相关

- [[通用工具与「给模型一台计算机」]] · related-to（audit） — shell tool 只是「给模型一台计算机」的一种具体实现，该概念可作为抽象理解，不必先懂 shell tool。
- [[code mode]] · related-to（audit） — code mode 靠的是代码执行原语，shell tool 只是其中一种落地方式；不懂 shell tool 也能理解 code mode，应降 soft。
- [[code mode]] · rejected（audit） — code mode 不依赖 shell tool，可用其他代码执行/沙箱实现。
- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
## 反链

- [[工具 Tools]]
- [[model-native harness]]
- [[通用工具与「给模型一台计算机」]]
- [[Agents SDK]]
- [[code mode]]
