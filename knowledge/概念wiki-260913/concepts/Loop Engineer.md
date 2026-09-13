---
id: cm_5f282c0d
name: Loop Engineer
type: CONCEPTUAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: when-needed
verification: judge
centrality: 0.126
depth: 4
origin: [harness]
aliases: []
sources: 1
---

# Loop Engineer

> 不再直接 prompt coding agent，而是设计能自动 prompt agent 的循环，关注触发器、状态、日志、验证与多 agent 协作。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

以前你是“给工人派活的人”，每次都要站在旁边说下一步。loop engineer 像是在设计一条流水线：什么时候开工、看哪张工单、把结果放哪里、失败怎么查、下一班人如何接手，都先设计好。

## 原文 context

作者把 loop engineer 定义为不再直接 prompting coding agent，而是 designing loops that automatically prompt agents。这个角色关注触发器、状态、日志、共享文件、验证和多 agent 协作，让 agent 在无人提示时也能持续产出。

## 掌握证据（做到这些才算会）

- 能对比 loop engineer 与直接写 prompt 的差异
- 能列出该角色关注的至少四个要素

## 验收问句

> 你能说清 {{name}} 与直接给 coding agent 写 prompt 的区别吗？

## 先懂这些（前置 2）

- [[Loop Engineering]] · **hard** — Loop Engineer 这一角色由循环工程的方法来定义。
- [[循环工程 loop engineering]] · **hard** — 不懂【Loop Engineering】，就做不了【Loop Engineer】的 ⟨角色定位与工作内容界定⟩

## 相关

- [[Executable Codebase]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Loop Contract]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Legible Codebase]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Shared File System]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Verifiable Codebase]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Artifact Schema]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Cross-session Work]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Read-only Verifier Agent]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Agent loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-16
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-16

## 出场

- Harness Engineering ｜ 《Loop Engineer：把 Agent 工作流变成可复用知识模板》 ｜ https://www.youtube.com/watch?v=W6x-hb44C0c
## 反链

- [[循环工程 loop engineering]]
- [[Agent loop]]
- [[Loop Engineering]]
- [[Cross-session Work]]
- [[Artifact Schema]]
- [[Executable Codebase]]
- [[Legible Codebase]]
- [[Loop Contract]]
- [[Shared File System]]
- [[Read-only Verifier Agent]]
- [[Verifiable Codebase]]
