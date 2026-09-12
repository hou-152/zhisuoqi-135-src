---
id: cm_56230a91
name: Rubric
type: REPRESENTATIONAL
subject: AI 概念库
domain: verification-eval
learningStage: now
verification: use
centrality: 0.126
depth: 0
origin: [notion]
aliases: ["评分量表", "评估量表", "scoring rubric", "Rubric"]
sources: 1
---

# Rubric

> 明确写出「什么表现算好、什么算差」的评分标准，既驱动场景生成又约束最终评分，须指向具体片段。

**领域** verification-eval ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 原文 context

源自：<mention-page url="https://app.notion.com/p/92e679b108ff82bab54201af8ed3171e"/>
- **context**：
	> 系统不是随机编个故事，它先拿到评估量表，看清楚「什么表现算好、什么算差」，然后倒推出一个能区分好坏的具体情境……评分 agent 拿着量表和上一步提取出的行为证据，逐条对照打分。
- **费曼一下**：贯穿 Vantage 整套流程的「度量衡」。一份明确写出「什么算好、什么算差」的评分标准，**既驱动场景生成，又约束最终评分**——所有打分必须指向具体对话片段作为依据，不允许凭印象给分。

## 掌握证据（做到这些才算会）

- 能写出一份可区分好坏表现的评分量表
- 能按量表逐条对照并引用具体对话片段打分

## 验收问句

> 写一份 {{name}}，说明它如何同时约束生成与打分。

## 懂了它才能懂（解锁 4）

- [[Review Quality 评分方法]] — 四项 1-10 打分本质是把评审质量写成分维 rubric。
- [[Rubric 与 verifier agent]] — 用 rubric 起验证 agent，不懂 rubric 就无从谈这套招式。
- [[Rubrics 与验证 agent]] — 带 rubric 启动验证 agent，前提是先有明确评分标准。
- [[Sprint Contract】]] — 契约本质就是开工前双方对齐的验收 rubric。

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Rubric-a33679b108ff8219b8d701f656589992

## 别名

`评分量表`、`评估量表`、`scoring rubric`、`Rubric`

## 反链

- [[Review Quality 评分方法]]
- [[Rubric 与 verifier agent]]
- [[Rubrics 与验证 agent]]
- [[Sprint Contract】]]
