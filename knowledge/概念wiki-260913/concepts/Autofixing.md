---
id: cm_4318a3dc
name: Autofixing
type: CONCEPTUAL
subject: Harness Engineering
domain: code-engineering
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Autofixing

> 按改动文件夹的风险判断是否自动提交修复 PR，低风险仅需简单 review。

**领域** code-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

系统不只是告诉你哪里坏了，还会先修一版。如果问题在低风险区域，人看一眼确认就能上线；高风险区域才交给更资深的人深审。

## 原文 context

Peter 提到 Creao 有 autofixing 系统，能根据改动文件夹风险判断是否自动提交修复 PR。风险低的改动只需工程师简单 review，50% 以上 issue 可用这种方式处理。

## 掌握证据（做到这些才算会）

- 能说出触发自动提交的判据是改动风险
- 能复述约 50% 以上 issue 可由此处理

## 验收问句

> {{name}} 凭什么决定自动提交还是转人工 review？

## 相关

- [[零 bug 政策与一周 SLA]] · related-to（audit） — Autofixing 只是达成 SLA 的手段之一，不懂它照样能理解零 bug 政策与一周 SLA，应降 soft 或踢出。
- [[AI-First]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[信任机制重构]] · 同篇出现（co-occurrence） — 同篇出现：harness-14
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-14

## 出场

- Harness Engineering ｜ 《Harness Engineering：AI-First 组织的信任机制重构》 ｜ https://app.podwise.ai/dashboard/episodes/8185395
## 反链

- [[Harness 工程 Harness Engineering]]
- [[AI-First]]
- [[信任机制重构]]
- [[零 bug 政策与一周 SLA]]
