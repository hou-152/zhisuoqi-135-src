---
id: cm_8924eaeb
name: 分层对抗式研究流水线
nameEn: Hierarchical adversarial research pipeline
type: PROCEDURAL
subject: AI 内参 260912
domain: multi-agent
learningStage: deep-dive
verification: judge
centrality: 0.072
depth: 3
origin: [neican]
aliases: ["Hierarchical adversarial research pipeline"]
sources: 1
---

# 分层对抗式研究流水线 · Hierarchical adversarial research pipeline

> 把研究拆成分解、扫描、矛盾聚类、对抗批判、引文核实等十六步的流水线

**领域** multi-agent ｜ **类型** PROCEDURAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

指将复杂研究任务拆分为分解、宽度扫描、矛盾聚类、深度调查、三方综合、多角度对抗批判、引文核实等 16 个严密步骤的系统。每个步骤的专有技能只有在执行时才动态载入上下文，防止长流程导致任务目标漂移。

## 原文 context

Hyperresearch 将 Claude Code 改造成一个深度研究代理：目前在 DeepResearch-Bench RACE 排行榜上名列前茅（内部基准测试）。一个分层自适应的 16 步流程只需接收一个提示，即可生成一份经过对抗性审计并包含完整源代码来源的报告。

## 掌握证据（做到这些才算会）

- 能说出对抗批判与引文核实分别在哪一环发挥作用
- 能说明各步技能为何只在执行时才载入上下文

## 验收问句

> {{name}} 靠什么机制避免长流程中目标漂移？

## 先懂这些（前置 1）

- [[独立只读审计智能体 Independent read-only auditor]] · **soft** — 不懂【独立只读审计智能体】，就做不了【分层对抗式研究流水线】的⟨对抗批判与引文核实两步⟩——审查方不独立于产出方、还能顺手改产出，它就会替自己自圆其说。

## 出场

- AI 内参 260912 ｜ 《jordan-gibbs/hyperresearch：基于智能体的研究知识库。智能体收集、搜索并将网络研究成果整合到一个持久的、可搜索的维基中。》 ｜ https://github.com/jordan-gibbs/hyperresearch

## 别名

`Hierarchical adversarial research pipeline`

## 反链

- [[独立只读审计智能体 Independent read-only auditor]]
