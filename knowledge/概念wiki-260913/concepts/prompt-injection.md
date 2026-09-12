---
id: cm_1c3de8a9
name: prompt-injection
type: CONCEPTUAL
subject: Harness Engineering
domain: safety-governance
learningStage: now
verification: judge
centrality: 0.067
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# prompt-injection

> 设计 Agent 系统时应假设 prompt-injection 与数据外泄尝试一定会发生。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 费曼一下

攻击者把恶意指令藏在 agent 读取的内容里，诱骗 agent 做不该做的事。设计 agent 系统时，**默认假设每一段输入都可能被污染**。

## 原文 context

Agent systems should be designed assuming prompt-injection and exfiltration attempts.

## 掌握证据（做到这些才算会）

- 能说出至少一条由此推出的设计约束
- 能指出哪些输入属于不可信来源

## 验收问句

> {{name}} 要求我们在设计时默认假设什么？

## 先懂这些（前置 1）

- [[上下文即不可信输入]] · **hard** — 只有先把上下文当数据而非指令，才谈得上注入攻击

## 懂了它才能懂（解锁 1）

- [[exfiltration]] — exfiltration 的定义就借助提示注入等手段，不懂注入说不清它

## 相关

- [[Guardrails]] · 常一起用（系统职责轴） — 护栏需要识别或限制不受信指令引发的危险行为。
- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
## 反链

- [[Guardrails]]
- [[model-native harness]]
- [[上下文即不可信输入]]
- [[exfiltration]]
- [[Agents SDK]]
