---
id: cm_231cf0b4
name: RLVR 与编码 agent 的 RL 训练循环
type: CONCEPTUAL
subject: Harness Engineering
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# RLVR 与编码 agent 的 RL 训练循环

> 生成编码 agent 的 trace、用 verifier 打分、更新权重强化好 trace 抑制坏的，循环上百万次数周到数月。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

这就像训练一只叼飞盘的狗——它做对了给零食，做错了不给，重复几万次，狗就学会了"叼飞盘"这个动作。但如果你只奖励"叼到"，从不管"叼的姿势有没有把邻居家的花坛踩烂"，狗迟早会学会踩花坛去换零食。

## 原文 context

作者为了论证"这不是技能问题"而钻研的训练机制——生成编码 agent 的 trace → 用 verifier 打分 → 更新权重强化好 trace、抑制坏 trace，循环上百万次、持续数周到数月。这套解释动画的灵感来自 Calvin French-Owen 在 AI Council 的一次演讲。

## 掌握证据（做到这些才算会）

- 能画出一条 trace 到权重更新的完整循环
- 能说明 verifier 在循环里承担什么角色

## 验收问句

> 描述 {{name}} 的一轮循环里谁打分、谁更新。

## 先懂这些（前置 1）

- [[Reward Signal]] · **hard** — RLVR 用 verifier 打分作为奖励信号，不懂奖励通道就不懂循环如何强化。

## 懂了它才能懂（解锁 1）

- [[Harness 内 RL RL inside the harness]] — 不懂编码 agent 的 RL 训练循环，就搭不出 harness 内 RL 的 trace 生成—verifier 打分—更新权重这条回路

## 相关

- [[RL Circuits]] · related-to（audit） — RL Circuits 泛指训练分布切片；RLVR 编码 agent 循环只是形成电路的一种具体训练方式，不是理解该概念的必要前提。
- [[reasoning thinking]] · rejected（audit） — reasoning/thinking 只是编码 trace 的可选内容，RL 训练循环机制不依赖它，应移出依赖图。
- [[ScaleRL]] · related-to（audit） — RLVR 长循环是 ScaleRL 的一个测量实例，不懂该具体循环也能理解算力曲线主张
- [[Lights-off 软件工厂]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[软件工厂 Software Factory]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-23

## 出场

- Harness Engineering ｜ 《为什么「软件工厂」会失败：光有 harness 工程还不够》 ｜ https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md
## 反链

- [[Reward Signal]]
- [[Harness 内 RL RL inside the harness]]
- [[Lights-off 软件工厂]]
- [[reasoning thinking]]
- [[软件工厂 Software Factory]]
- [[RL Circuits]]
- [[ScaleRL]]
