---
id: cm_76be18e9
name: 检查点式节奏与"配料"式节奏
nameEn: checkpoints / ingredients
type: CONCEPTUAL
subject: AI 内参 260912
domain: safety-governance
learningStage: when-needed
verification: judge
centrality: 0.089
depth: 2
origin: [neican]
aliases: ["checkpoints / ingredients"]
sources: 1
---

# 检查点式节奏与"配料"式节奏 · checkpoints / ingredients

> 行为口径按模型能做什么设关卡并要求对齐认证；配料口径则限量算力、训练运行等投入。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 费曼一下

这是"到底按什么口径减速"的对照。行为口径：按模型**能做什么**设关卡，能力达到 X 就必须配上对齐属性 Y、Z 的认证（评测、可解释性分析、训练环境审计）。配料口径：按投入的东西限量，比如训练算力、训练运行的性质、内部用 AI 改进 AI。作者明确偏好前者，因为配料指标更容易被规避（gameable），但他没有关掉这条讨论，而是把它交给嵌入式评估者去判断。保留这一对照，读者才能理解 pacing 的决策粒度在哪里、以及为什么第一个方案需要评估者先到位。

## 原文 context

For example, one possible scheme might be a series of “checkpoints”: if models have capability X, then they need to be accompanied by certifications of alignment properties Y and Z — such as some combination of evaluations, interpretability analyses, and audits of training environments — which demonstrate their alignment properties. In this example, X might be “the model is capable of escaping or defeating most common sandboxing methods”...

We should also consider pacing based on limiting the *ingredients* that go into frontier models, such as training compute, the nature of training runs, or internal use of AI to improve AI. I do worry that some of these measures may be more “gameable” than external behavior, but this is the kind of topic worth discussing with embedded evaluators.

## 掌握证据（做到这些才算会）

- 能对比两种口径的减速依据
- 能说明作者偏好行为口径因配料指标更易被规避

## 验收问句

> {{name}} 两种口径各按什么减速，作者偏好哪个？

## 先懂这些（前置 1）

- [[领跑节奏 pacing the frontier]] · **soft** — 不懂【领跑节奏】（给能力提升装可调限速器），就做不了【检查点式节奏与“配料”式节奏】的「按行为口径设关卡或按配料口径限量投入」这件事。

## 出场

- AI 内参 260912 ｜ 《我们必须加快开拓步伐》 ｜ https://darioamodei.com/post/we-must-pace-the-frontier

## 别名

`checkpoints / ingredients`

## 反链

- [[领跑节奏 pacing the frontier]]
