---
id: cm_deefef79
name: Generator-Evaluator Loop】
type: CONCEPTUAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.072
depth: 3
origin: [harness]
aliases: []
sources: 1
---

# Generator-Evaluator Loop】

> 借鉴 GAN，把干活的 Agent 与评判的 Agent 分开，形成生成-评估循环以提升质量。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

借鉴 GAN 的对抗思想：一个 agent 生成，另一个 agent 评判，形成反馈循环。核心价值不在于分离本身能消除宽容倾向，而在于调教一个独立的 evaluator 变得严格，远比让 generator 自我批评更容易。一旦外部反馈存在，generator 就有了具体的迭代目标。

## 原文 context

Taking inspiration from Generative Adversarial Networks (GANs), I designed a multi-agent structure with a generator and evaluator agent. … Separating the agent doing the work from the agent judging it proves to be a strong lever to address this issue.

## 掌握证据（做到这些才算会）

- 能画出生成者与评估者的职责边界
- 能说明职责分离为何是提升质量的杠杆

## 验收问句

> {{name}} 中由谁来评判产出？

## 先懂这些（前置 1）

- [[子 Agent 分工]] · **hard** — 生成与评估分离本质上是执行者与审查者的分工

## 懂了它才能懂（解锁 1）

- [[Planner-Generator-Evaluator 三 Agent 架构]] — 三 Agent 架构把生成-评估循环再加一层规划者

## 相关

- [[Context Anxiety】]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Context Reset vs Compaction】]] · 同篇出现（co-occurrence） — 同篇出现：harness-09
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-09

## 出场

- Harness Engineering ｜ 《Anthropic 工程实践：如何为长时间运行的 Agent 应用设计 Harness》 ｜ https://www.anthropic.com/engineering/harness-design-long-running-apps
## 反链

- [[子 Agent 分工]]
- [[Context Reset vs Compaction】]]
- [[Context Anxiety】]]
- [[Planner-Generator-Evaluator 三 Agent 架构]]
