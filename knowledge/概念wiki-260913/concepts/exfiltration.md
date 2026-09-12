---
id: cm_a9276da2
name: exfiltration
type: CONCEPTUAL
subject: Harness Engineering
domain: safety-governance
learningStage: when-needed
verification: judge
centrality: 0.067
depth: 3
origin: [harness]
aliases: []
sources: 1
---

# exfiltration

> 借助提示注入等手段，把系统内部敏感数据偷偷带出边界的攻击行为。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 费曼一下

把敏感数据悄悄运出去。比如诱骗 agent 把密钥写到日志里、或者请求外部网站。sandbox 与 harness 分离就是为了堆高这个攻击的成本。

## 原文 context

…prompt-injection and exfiltration attempts.

## 掌握证据（做到这些才算会）

- 能举出一条 prompt injection 导致外泄的路径
- 能指出可以阻断外泄的检查点

## 验收问句

> 你如何识别并拦住一次 {{name}} 尝试？

## 先懂这些（前置 1）

- [[prompt-injection]] · **hard** — exfiltration 的定义就借助提示注入等手段，不懂注入说不清它

## 懂了它才能懂（解锁 1）

- [[harness–compute separation]] — 隔离沙箱与骨架的目标之一就是防外泄，需先懂 exfiltration

## 相关

- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
## 反链

- [[model-native harness]]
- [[harness–compute separation]]
- [[prompt-injection]]
- [[Agents SDK]]
