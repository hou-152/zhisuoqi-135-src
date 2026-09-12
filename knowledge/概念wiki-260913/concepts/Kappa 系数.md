---
id: cm_89d0cc05
name: Kappa 系数
type: CONCEPTUAL
subject: AI 概念库
domain: verification-eval
learningStage: when-needed
verification: compute
centrality: 0.126
depth: 1
origin: [notion]
aliases: ["Cohen's Kappa", "Kappa coefficient", "Kappa 值", "Kappa 一致性", "科恩 Kappa"]
sources: 1
---

# Kappa 系数

> 衡量两个评分者一致程度的统计量，0.45–0.64 属中等一致，可用来证明 AI 评分与人类专家同级。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.126

## 原文 context

源自：<mention-page url="https://app.notion.com/p/92e679b108ff82bab54201af8ed3171e"/>
- **context**：
	> 人类专家之间的一致性，Kappa 值为 0.45 到 0.64，也就是中等一致性……AI 评分期跟人类专家之间的一致性呢？跟两个人类专家之间差不多。
- **费曼一下**：衡量两个评分者打分一致程度的统计指标。0.45–0.64 属「中等一致」——意思是软技能这种主观领域，连人类专家彼此都常打出不同分数。Vantage 用这个尺子证明：AI 跟人类专家的一致性，已经到了同一水平线。

## 掌握证据（做到这些才算会）

- 能解释 kappa 的含义与取值范围
- 能用它比较 AI 与人类专家的一致性水平

## 验收问句

> 怎么用{{name}}说明 AI 评分是可信的？

## 先懂这些（前置 1）

- [[Grading Criteria]] · **soft** — 不懂 Grading Criteria，就做不了 Kappa 系数用于 AI 评分与人类专家按同一口径的一致性测量

## 懂了它才能懂（解锁 1）

- [[Mutation Testing 与前沿质量评测]] — 不懂 Kappa 系数，就做不了 Mutation Testing 中判官模型与人类评分一致性的验证

## 相关

- [[Review Quality 评分方法]] · related-to（audit） — Kappa 只是可选的一致性验证工具，用相关性/其他统计也能证明，评分方法本身不依赖它。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Kappa-439679b108ff82c08f840127bd1d0755

## 别名

`Cohen's Kappa`、`Kappa coefficient`、`Kappa 值`、`Kappa 一致性`、`科恩 Kappa`

## 反链

- [[Grading Criteria]]
- [[Mutation Testing 与前沿质量评测]]
- [[Review Quality 评分方法]]
