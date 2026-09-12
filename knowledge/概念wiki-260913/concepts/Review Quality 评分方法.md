---
id: cm_2ae6e6ed
name: Review Quality 评分方法
type: PROCEDURAL
subject: Context Engineering
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.067
depth: 1
origin: [context]
aliases: []
sources: 1
---

# Review Quality 评分方法

> 用准确性、完整性、抓 bug 潜力、可行洞见四项 1-10 打分，验证省 token 是否牺牲评审质量。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 费曼一下

光说"省了多少 token"没说服力，所以作者专门找了一套标准（准不准、全不全、能不能抓到 bug、给不给得出具体建议）给每次评审打分，证明省 token 的同时评审质量没有变差，反而更好。

## 原文 context

基准测试用来验证"用图谱省 token 是否会牺牲评审质量"的量化手段——"Quality scored on accuracy, completeness, bug-catching potential, and actionable insight (1 to 10 scale)"，结果显示用图谱后评审质量普遍不降反升（如 httpx 的 9.0 vs 7.0）。

## 掌握证据（做到这些才算会）

- 能按四个维度给一份代码评审打 1-10 分
- 能对比图谱前后评审质量是否下降

## 验收问句

> 按 {{name}} 给这份评审打分，并说明有没有掉质量。

## 先懂这些（前置 2）

- [[Rubric]] · **hard** — 四项 1-10 打分本质是把评审质量写成分维 rubric。
- [[Kappa 系数]] · **soft** — 要证明 AI 评分与专家同级，须用一致度统计。

## 相关

- [[code-review-graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[Tree-sitter]] · 同篇出现（co-occurrence） — 同篇出现：context-16
- [[持久化代码图谱 structural map graph]] · 同篇出现（co-occurrence） — 同篇出现：context-16

## 出场

- Context Engineering ｜ 《用持久化代码图谱给 AI Review 精准上下文》 ｜ https://github.com/tirth8205/code-review-graph
## 反链

- [[Rubric]]
- [[持久化代码图谱 structural map graph]]
- [[code-review-graph]]
- [[Kappa 系数]]
- [[Tree-sitter]]
