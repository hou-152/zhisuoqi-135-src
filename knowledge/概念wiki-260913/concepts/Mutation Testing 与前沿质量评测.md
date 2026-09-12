---
id: cm_a25b0163
name: Mutation Testing 与前沿质量评测
type: PROCEDURAL
subject: Harness Engineering
domain: verification-eval
learningStage: when-needed
verification: use
centrality: 0.045
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Mutation Testing 与前沿质量评测

> 用变异测试检验测试有效性，惩罚不会在打补丁前代码上失败的测试，并加判官模型查质量。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

mutation testing 的直觉是——先故意在代码里埋几个小错（变异），再看你的测试套件能不能抓到它们；抓不到，说明这些测试形同虚设。作者提到老板玩过的一个类比游戏：看你能从一个 Python 大单体里删掉多少行代码，同时不让成千上万个单元测试挂掉——能删掉一大截还全绿，恰恰暴露了测试套件有多少是没在真正把关。

## 原文 context

作者列举的"前沿在往正确方向走"的三个尝试——SWE-Marathon 用约 400 小时量级任务加复合奖励；DeepSWE 用现实中从未被真正构建过的仓库任务防止训练集污染；Frontier Code 的关键一招是用 mutation testing 思路，惩罚"写了测试却不会在打补丁前的代码上失败"的行为，并额外跑一个判官模型检查代码质量规则。

## 掌握证据（做到这些才算会）

- 能说出一条测试若在旧代码上通过为何算无效
- 能设计一个让测试必须真实失败的评测流程

## 验收问句

> 你写的测试能过 {{name}} 这一关吗？

## 懂了它才能懂（解锁 1）

- [[SWE-bench 与二元打分]] — FAIL_TO_PASS 正是「补丁前必失败」的变异测试思想。

## 相关

- [[Lights-off 软件工厂]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[软件工厂 Software Factory]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-23

## 出场

- Harness Engineering ｜ 《为什么「软件工厂」会失败：光有 harness 工程还不够》 ｜ https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md
## 反链

- [[软件工厂 Software Factory]]
- [[SWE-bench 与二元打分]]
- [[Lights-off 软件工厂]]
