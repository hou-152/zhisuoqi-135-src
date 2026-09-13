---
id: cm_4c6ea3d7
name: SWE-bench 与二元打分
type: REPRESENTATIONAL
subject: Harness Engineering
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.181
depth: 3
origin: [harness]
aliases: []
sources: 1
---

# SWE-bench 与二元打分

> 从真实仓库抓取约十五分钟量级任务的基准，用 FAIL_TO_PASS/PASS_TO_PASS 打 0/1 分

**领域** verification-eval ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.181

## 费曼一下

这类基准很像"只看考试最后答案对不对"的判卷方式——不管你是认真推导出来的，还是蒙对的，或是抄了半页公式却在最后一步凑巧约分对了。能拿满分，不代表解题过程经得起推敲。

## 原文 context

文中拿来解剖 RL 打分单薄性的具体基准——从 Redis、jq、Django 等仓库抓取约 15 分钟量级的任务，用 FAIL_TO_PASS/PASS_TO_PASS 决定 0/1 打分。fastlane\_\_fastlane-19304 是文中给出的完整案例：两行的 nil 兜底修复，模型只要让指定测试从失败变通过、其余测试不受影响就算赢。

## 掌握证据（做到这些才算会）

- 能解释 FAIL_TO_PASS 与 PASS_TO_PASS 的判分逻辑
- 能说明这种二元打分忽略了什么

## 验收问句

> {{name}} 是怎么判定一次修复算不算通过的？

## 先懂这些（前置 3）

- [[Validation gates]] · **soft** — 不懂 Validation gates，就做不了 SWE-bench 的 FAIL_TO_PASS/PASS_TO_PASS 通过失败判定
- [[Infrastructure noise]] · **soft** — 不懂 Infrastructure noise，就做不了 SWE-bench 成绩扣除环境差异后的公平解读
- [[pass@k]] · **soft** — 不懂 pass@k，就做不了 SWE-bench 的 pass@1/resolve rate 指标口径

## 相关

- [[Mutation Testing 与前沿质量评测]] · rejected（audit） — 两者只是思想类比（补丁前失败 vs 变异测试），SWE-bench 的二元打分可独立定义。
- [[pass@k]] · rejected（audit） — pass@k 只需任意 0/1 判定，不依赖 SWE-bench 这一具体基准。
- [[Lights-off 软件工厂]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[软件工厂 Software Factory]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-23

## 出场

- Harness Engineering ｜ 《为什么「软件工厂」会失败：光有 harness 工程还不够》 ｜ https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md
## 反链

- [[Validation gates]]
- [[Infrastructure noise]]
- [[Lights-off 软件工厂]]
- [[Mutation Testing 与前沿质量评测]]
- [[pass@k]]
- [[软件工厂 Software Factory]]
