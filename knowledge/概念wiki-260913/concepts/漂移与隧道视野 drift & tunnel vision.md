---
id: cm_10f48272
name: 漂移与隧道视野
nameEn: drift & tunnel vision
type: CONCEPTUAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: when-needed
verification: judge
centrality: 0.154
depth: 0
origin: [harness]
aliases: ["drift & tunnel vision"]
sources: 1
---

# 漂移与隧道视野 · drift & tunnel vision

> 长时程自治的两种典型退化：偏离目标drift与视野收窄tunnel vision，需重启与角色分离。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.154

## 费曼一下

跑得太久，agent 要么慢慢偏离原本的目标（漂移），要么钻进一个局部越挖越深、看不见全局（隧道视野）。两者都不会报错，只会安静地浪费掉几天算力。

## 原文 context

长时程自治的两种典型退化。原文既用它评价模型差异（GPT-5.2"avoiding drift"），也用它解释为什么仍需要周期性重启，以及为什么角色分离能防止"any single agent getting tunnel vision"。

## 掌握证据（做到这些才算会）

- 能描述drift与tunnel vision各自的表征
- 能说明周期性重启与角色分离如何缓解它们

## 验收问句

> {{name}}能识别当前是漂移还是隧道视野并给出对策吗？

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
