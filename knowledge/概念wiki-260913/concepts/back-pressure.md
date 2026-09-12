---
id: cm_50087bfe
name: back-pressure
type: CONCEPTUAL
subject: Harness Engineering
domain: verification-eval
learningStage: now
verification: judge
centrality: 0.067
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# back-pressure

> 用上下文高效的自我验证给 agent 施加压力：解决成功率与自验证能力高度相关。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 费曼一下

让 agent 能自己知道对不对，比让它一次写对更重要。但反馈要像体检报告的结论页，不是把所有原始化验单都糊到它脸上。

## 原文 context

核心命题是「用 coding agent 成功解决问题的概率，与 agent 验证自己工作的能力强相关」。但验证机制必须上下文高效——早期让 agent 每次改完都跑全量测试，4000 行通过输出冲垮上下文，agent 跟丢任务并开始对刚读过的测试文件产生幻觉。现在是吞掉输出、只暴露错误。

## 掌握证据（做到这些才算会）

- 能复述『成功率与自验证能力强相关』这一命题
- 能解释为何要吞掉全量测试输出、只暴露错误

## 验收问句

> {{name}} 为什么不许 agent 每次改完都跑全量测试？

## 先懂这些（前置 2）

- [[验证闭环 verification loop]] · **soft** — back-pressure 靠 agent 自我验证施压，不懂验证闭环就不知压力来自哪。
- [[可验证目标]] · **soft** — 自我验证要成立，前提是目标能被机器判定，否则成功与否无从衡量。

## 相关

- [[configuration problem]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-04

## 出场

- Harness Engineering ｜ 《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》 ｜ https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents
## 反链

- [[Harness 工程 Harness Engineering]]
- [[验证闭环 verification loop]]
- [[可验证目标]]
- [[configuration problem]]
