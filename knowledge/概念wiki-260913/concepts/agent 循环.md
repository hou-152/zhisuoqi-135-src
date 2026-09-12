---
id: cm_c63aeadd
name: agent 循环
type: PROCEDURAL
subject: Context Engineering
domain: loop-autonomy
learningStage: now
verification: compute
centrality: 0.181
depth: 2
origin: [context]
aliases: []
sources: 1
---

# agent 循环

> LLM 输出结构化 JSON 决定下一步，确定性代码执行 tool call，结果回灌上下文，直到 intent 为 done。

**领域** loop-autonomy ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.181

## 费曼一下

一台只会做三件事的机器：想下一步、干这一步、把结果记在本子上，然后重来。所有关于 agent 的复杂讨论，最后都要落回这三步中的某一步——你要么改它怎么想，要么改它怎么干，要么改那个本子怎么记。

## 原文 context

全文的最小结构单元——LLM 输出结构化 json 决定下一步（tool calling）、确定性代码执行该 tool call、结果 append 回 context window，重复到 next_step 的 intent 为 "done"。原文以一段 while True 伪代码固化这一循环。

## 掌握证据（做到这些才算会）

- 能写出该循环的 while True 伪代码
- 能指出循环中哪一步是确定性的、结果如何回灌

## 验收问句

> {{name}}的一次迭代包含哪几步？何时结束？

## 先懂这些（前置 2）

- [[Decision-maker in the body]] · **hard** — 不懂【Decision-maker in the body】，就做不了【agent 循环】的“让 LLM 按当前状态决定下一步”。
- [[tool loop]] · **soft** — 不懂【tool loop】，就做不了【agent 循环】的“执行 tool call 并把结果回灌上下文”。

## 懂了它才能懂（解锁 1）

- [[steering]] — 不懂【agent 循环】，就做不了【steering】的“在 agent 运行中途介入”。

## 相关

- [[「并不 agentic」的 AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[软件即有向图]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[12-factor agents]] · 同篇出现（co-occurrence） — 同篇出现：context-06

## 出场

- Context Engineering ｜ 《12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则》 ｜ https://github.com/humanlayer/12-factor-agents
## 反链

- [[tool loop]]
- [[Decision-maker in the body]]
- [[steering]]
- [[「并不 agentic」的 AI Agent]]
- [[12-factor agents]]
- [[软件即有向图]]
