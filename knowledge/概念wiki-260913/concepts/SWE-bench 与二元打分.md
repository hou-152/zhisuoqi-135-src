---
id: cm_4c6ea3d7
name: SWE-bench 与二元打分
type: REPRESENTATIONAL
subject: Harness Engineering
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# SWE-bench 与二元打分

> 从真实仓库抓取约十五分钟量级任务的基准，用 FAIL_TO_PASS/PASS_TO_PASS 打 0/1 分

**领域** verification-eval ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

这类基准很像"只看考试最后答案对不对"的判卷方式——不管你是认真推导出来的，还是蒙对的，或是抄了半页公式却在最后一步凑巧约分对了。能拿满分，不代表解题过程经得起推敲。

## 原文 context

文中拿来解剖 RL 打分单薄性的具体基准——从 Redis、jq、Django 等仓库抓取约 15 分钟量级的任务，用 FAIL_TO_PASS/PASS_TO_PASS 决定 0/1 打分。fastlane\_\_fastlane-19304 是文中给出的完整案例：两行的 nil 兜底修复，模型只要让指定测试从失败变通过、其余测试不受影响就算赢。

## 掌握证据（做到这些才算会）

- 能解释 FAIL_TO_PASS 与 PASS_TO_PASS 的判分逻辑
- 能说明这种二元打分忽略了什么

## 验收问句

> {{name}} 是怎么判定一次修复算不算通过的？

## 先懂这些（前置 1）

- [[Mutation Testing 与前沿质量评测]] · **soft** — FAIL_TO_PASS 正是「补丁前必失败」的变异测试思想。

## 懂了它才能懂（解锁 1）

- [[pass@k]] — 有了 0/1 判定才能统计 k 次中至少一次通过。

## 相关

- [[Lights-off 软件工厂]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[软件工厂 Software Factory]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-23

## 出场

- Harness Engineering ｜ 《为什么「软件工厂」会失败：光有 harness 工程还不够》 ｜ https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md
## 反链

- [[Harness 工程 Harness Engineering]]
- [[软件工厂 Software Factory]]
- [[Lights-off 软件工厂]]
- [[Mutation Testing 与前沿质量评测]]
- [[pass@k]]
