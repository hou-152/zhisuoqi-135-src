---
id: cm_c63aeadd
name: agent 循环
type: PROCEDURAL
subject: Context Engineering
domain: loop-autonomy
learningStage: now
verification: compute
centrality: 0.045
depth: 2
origin: [context]
aliases: []
sources: 1
---

# agent 循环

> LLM 输出结构化 json 决定 tool call，确定性代码执行，结果回 append 到上下文，循环至 intent 为 done。

**领域** loop-autonomy ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.045

## 费曼一下

一台只会做三件事的机器：想下一步、干这一步、把结果记在本子上，然后重来。所有关于 agent 的复杂讨论，最后都要落回这三步中的某一步——你要么改它怎么想，要么改它怎么干，要么改那个本子怎么记。

## 原文 context

全文的最小结构单元——LLM 输出结构化 json 决定下一步（tool calling）、确定性代码执行该 tool call、结果 append 回 context window，重复到 next_step 的 intent 为 "done"。原文以一段 while True 伪代码固化这一循环。

## 掌握证据（做到这些才算会）

- 能写出该 while True 循环的伪代码
- 能指出循环终止条件是 next_step 的 intent 为 done

## 验收问句

> 按 {{name}} 说出四步并给出终止条件。

## 先懂这些（前置 1）

- [[范围控制与显式的完成定义]] · **hard** — 循环要靠 intent 为 done 退出，不懂完成定义就不知何时停。

## 相关

- [[12-factor agents]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[并不 agentic」的 AI Agent]] · 同篇出现（co-occurrence） — 同篇出现：context-06
- [[软件即有向图]] · 同篇出现（co-occurrence） — 同篇出现：context-06

## 出场

- Context Engineering ｜ 《12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则》 ｜ https://github.com/humanlayer/12-factor-agents
## 反链

- [[范围控制与显式的完成定义]]
- [[12-factor agents]]
- [[并不 agentic」的 AI Agent]]
- [[软件即有向图]]
