---
id: cm_e0ddbb7e
name: agentfile
nameEn: CLAUDE.md 与 AGENTS.md
type: REPRESENTATIONAL
subject: Harness Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.042
depth: 0
origin: [harness]
aliases: ["CLAUDE.md 与 AGENTS.md"]
sources: 1
---

# agentfile · CLAUDE.md 与 AGENTS.md

> 仓库顶层被 harness 确定性注入系统提示的 markdown 文件；研究显示手写收益小、LLM 生成反损性能。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.042

## 费曼一下

这是给 agent 的入职须知，不是公司百科。写得越像百科越糟：它每天上班都要重读一遍，读完还没干活就已经累了。

## 原文 context

仓库顶层、会被 harness 确定性注入系统提示的 markdown 文件。ETH Zurich 对 138 个 agentfile 的研究显示：LLM 生成的反而损害性能且多花 20% 以上成本，人工撰写的只提升约 4%，处理这些文件多耗 14–22% 推理 token，代码库总览和目录清单完全无用。作者的自家版本不到 60 行。

## 掌握证据（做到这些才算会）

- 能说出手写 agentfile 的收益与 token 开销量级
- 能指出代码库总览、目录清单这类无用内容

## 验收问句

> {{name}}该写什么、不该写什么？代价多大？

## 懂了它才能懂（解锁 1）

- [[Instruction-file tax]] — 该税指的正是 AGENTS.md/CLAUDE.md 的 token 开销，不懂 agentfile 就无从谈税。

## 相关

- [[configuration problem]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-04

## 出场

- Harness Engineering ｜ 《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》 ｜ https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents

## 别名

`CLAUDE.md 与 AGENTS.md`

## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[configuration problem]]
- [[Instruction-file tax]]
