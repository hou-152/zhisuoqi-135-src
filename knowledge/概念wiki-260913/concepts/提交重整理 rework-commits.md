---
id: cm_ff65f697
name: 提交重整理
nameEn: /rework-commits
type: PROCEDURAL
subject: AI 内参 260912
domain: code-engineering
learningStage: when-needed
verification: use
centrality: 0.124
depth: 1
origin: [neican]
aliases: ["/rework-commits"]
sources: 1
---

# 提交重整理 · /rework-commits

> 功能稳定后让智能体重置到 main、通读更改进而重建整洁提交，并校验内容未丢。

**领域** code-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.124

## 费曼一下

提交重整理是把开发过程和评审过程分开：开发时可以自由迭代，功能稳定后让智能体重置到主分支、通读所有更改、按逻辑顺序创建整洁提交，并验证最终内容没有丢失或改变。`/rework-commits` 技能把这一流程固定为可复用命令。

## 原文 context

1. 自由开发功能。迭代过程中无需担心提交规范。

2. 一切正常后，让智能体将提交历史重新整理为便于评审的提交。

3. 智能体会重置到 `main`，通读所有更改，并规划合理的顺序，创建整洁且提交信息清晰的提交。

4. 它会验证最终 diff 与原始内容一致，确保不会丢失任何更改。

## 掌握证据（做到这些才算会）

- 能复述先自由开发、一切正常后再重整理提交的顺序
- 能说出智能体重置到 main 后验证最终 diff 与原始内容一致

## 验收问句

> 功能开发完后，如何用{{name}}把提交历史整理成便于评审的样子？

## 先懂这些（前置 1）

- [[小而语义明确的提交]] · **hard** — 不懂【小而语义明确的提交】，就做不了【提交重整理】的“把杂乱的更改重建为整洁提交”这件事。

## 出场

- AI 内参 260912 ｜ 《评审和测试代码》 ｜ https://cursor.com/cn/learn/reviewing-testing

## 别名

`/rework-commits`

## 反链

- [[小而语义明确的提交]]
