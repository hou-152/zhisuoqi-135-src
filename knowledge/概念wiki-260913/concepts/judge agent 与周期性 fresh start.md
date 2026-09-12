---
id: cm_10cff6a4
name: judge agent 与周期性 fresh start
type: PROCEDURAL
subject: Harness Engineering
domain: loop-autonomy
learningStage: when-needed
verification: use
centrality: 0.072
depth: 5
origin: [harness]
aliases: []
sources: 1
---

# judge agent 与周期性 fresh start

> 每个周期结束由 judge agent 判定是否继续，下一轮从头开始，以对抗漂移与隧道视野。

**领域** loop-autonomy ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

给长跑加上分段与裁判。跑久了状态会变形，与其修修补补，不如定期清空重来一轮——用"忘记"来对抗积累的偏移，这是长时程系统特有的维护动作。

## 原文 context

每个周期结束时由 judge agent 判断是否继续，下一轮迭代从头开始；文末仍把"periodic fresh starts"列为对抗漂移与隧道视野的必要手段。

## 掌握证据（做到这些才算会）

- 能画出一个含 judge 判定与重启的循环流程
- 能说明 fresh start 针对的是哪种失效

## 验收问句

> {{name}} 解决了长期循环中的什么问题？

## 先懂这些（前置 1）

- [[漂移与隧道视野 drift & tunnel vision]] · **hard** — 该机制专为对抗漂移与隧道视野，不懂退化就不懂它为何存在。

## 相关

- [[长时程自治编码 long-running autonomous coding]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[动态协调 dynamic coordination]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[单 agent 的速度天花板]] · 同篇出现（co-occurrence） — 同篇出现：harness-07

## 出场

- Harness Engineering ｜ 《Cursor：让 coding agent 连续自治运行数周的工程经验》 ｜ https://cursor.com/blog/scaling-agents
## 反链

- [[长时程自治编码 long-running autonomous coding]]
- [[动态协调 dynamic coordination]]
- [[漂移与隧道视野 drift & tunnel vision]]
- [[单 agent 的速度天花板]]
