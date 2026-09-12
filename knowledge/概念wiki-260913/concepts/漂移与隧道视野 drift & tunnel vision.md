---
id: cm_10f48272
name: 漂移与隧道视野
nameEn: drift & tunnel vision
type: CONCEPTUAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: now
verification: judge
centrality: 0.142
depth: 0
origin: [harness]
aliases: ["drift & tunnel vision"]
sources: 1
---

# 漂移与隧道视野 · drift & tunnel vision

> 长时程自治中的两种典型退化：偏离原始目标的漂移，与只盯局部而丢失全局的隧道视野。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.142

## 费曼一下

跑得太久，agent 要么慢慢偏离原本的目标（漂移），要么钻进一个局部越挖越深、看不见全局（隧道视野）。两者都不会报错，只会安静地浪费掉几天算力。

## 原文 context

长时程自治的两种典型退化。原文既用它评价模型差异（GPT-5.2"avoiding drift"），也用它解释为什么仍需要周期性重启，以及为什么角色分离能防止"any single agent getting tunnel vision"。

## 掌握证据（做到这些才算会）

- 能举出一次长任务中目标逐渐偏移的具体例子
- 能解释周期性重启与角色分离分别针对哪一种退化

## 验收问句

> 这个长跑任务目标跑偏了，属于{{name}}里的哪一种？

## 懂了它才能懂（解锁 5）

- [[长时程自治编码 long-running autonomous coding]] — 长时程运行必然面对漂移与隧道视野两种退化。
- [[judge agent 与周期性 fresh start]] — 该机制专为对抗漂移与隧道视野，不懂退化就不懂它为何存在。
- [[No-progress detection]] — 无进展是漂移的典型表现，检测它需先理解这种退化。
- [[范围控制与显式的完成定义]] — 范围失控是漂移的表现，先懂退化才懂为何要显式定义完成。
- [[steering]] — 中途介入正是为纠正漂移与视野收窄这两种退化。

## 相关

- [[长时程自治编码 long-running autonomous coding]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[单 agent 的速度天花板]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[动态协调 dynamic coordination]] · 同篇出现（co-occurrence） — 同篇出现：harness-07

## 出场

- Harness Engineering ｜ 《Cursor：让 coding agent 连续自治运行数周的工程经验》 ｜ https://cursor.com/blog/scaling-agents

## 别名

`drift & tunnel vision`

## 反链

- [[动态协调 dynamic coordination]]
- [[范围控制与显式的完成定义]]
- [[单 agent 的速度天花板]]
- [[长时程自治编码 long-running autonomous coding]]
- [[steering]]
- [[judge agent 与周期性 fresh start]]
- [[No-progress detection]]
