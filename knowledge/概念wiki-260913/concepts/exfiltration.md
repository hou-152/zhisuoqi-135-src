---
id: cm_a9276da2
name: exfiltration
type: CONCEPTUAL
subject: Harness Engineering
domain: safety-governance
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# exfiltration

> 把内部数据偷偷带出边界的攻击尝试（原文与提示注入并列提及）。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

把敏感数据悄悄运出去。比如诱骗 agent 把密钥写到日志里、或者请求外部网站。sandbox 与 harness 分离就是为了堆高这个攻击的成本。

## 原文 context

…prompt-injection and exfiltration attempts.

## 掌握证据（做到这些才算会）

- 能举出一条 prompt injection 导致外泄的路径
- 能指出可以阻断外泄的检查点

## 验收问句

> 你如何识别并拦住一次 {{name}} 尝试？

## 懂了它才能懂（解锁 2）

- [[harness–compute separation]] — 隔离沙箱与骨架的目标之一就是防外泄，需先懂 exfiltration
- [[Guardrails]] — 不懂【exfiltration】，就做不了【Guardrails】的输出侧数据外泄检测规则。

## 相关

- [[prompt-injection]] · related-to（audit） — 数据外泄是通用安全概念，定义只说『借助提示注入等手段』（等＝非唯一），注入只是可选手段之一，不构成必需前置。
- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
## 反链

- [[Guardrails]]
- [[harness–compute separation]]
- [[model-native harness]]
- [[prompt-injection]]
- [[Agents SDK]]
