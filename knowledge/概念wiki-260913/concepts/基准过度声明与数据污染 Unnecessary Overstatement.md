---
id: cm_6589abaf
name: 基准过度声明与数据污染
nameEn: Unnecessary Overstatement
type: CONCEPTUAL
subject: AI 内参 260912
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.072
depth: 0
origin: [neican]
aliases: ["Unnecessary Overstatement"]
sources: 1
---

# 基准过度声明与数据污染 · Unnecessary Overstatement

> 官方高调宣传 ExploitBench 满分，而满分恰说明数据污染，OpenAI 系统卡亦承认。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

官方高调宣传 ExploitBench 的 100%，但一个满分恰恰说明数据被污染、模型提前见过答案——OpenAI 自己在系统卡里也承认了这一点。作者认为这种夸张完全没必要，被用来证明"最对齐模型"的蜜罐演示也得不出那个结论。这个概念承重在于给出阅读官方基准的边界：宣传口径要打折，真分数反而更硬。

## 原文 context

If you score 100% on ExploitBench you cheated on ExploitBench. At minimum this involves data contamination, which is still cheating.

## 掌握证据（做到这些才算会）

- 能复述“满分即作弊”的判据
- 能对官方基准口径打折后再看真分数

## 验收问句

> 遇到满分基准时，{{name}}提醒你先怀疑什么？

## 懂了它才能懂（解锁 1）

- [[揭示偏好 Revealed Preference]] — 不懂【基准过度声明与数据污染】里「官方宣传的满分恰恰是污染的信号」这一层，就做不了【揭示偏好】的论证——即说不出为什么「人们实际把哪个模型设为主力」比跑分式证据更纯粹

## 出场

- AI 内参 260912 ｜ 《GPT-6-Astra 能做很多雄心勃勃的事情》 ｜ https://thezvi.substack.com/p/gpt-6-astra-can-do-ambitious-things?utm_source=tldrai

## 别名

`Unnecessary Overstatement`

## 反链

- [[揭示偏好 Revealed Preference]]
