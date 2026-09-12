---
id: cm_231cf0b4
name: RLVR 与编码 agent 的 RL 训练循环
type: PROCEDURAL
subject: Harness Engineering
domain: model-training
learningStage: deep-dive
verification: compute
centrality: 0.154
depth: 4
origin: [harness]
aliases: []
sources: 1
---

# RLVR 与编码 agent 的 RL 训练循环

> 生成编码 agent 的 trace、用 verifier 打分、更新权重强化好 trace 抑制坏的，循环上百万次数周到数月。

**领域** model-training ｜ **类型** PROCEDURAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.154

## 费曼一下

这就像训练一只叼飞盘的狗——它做对了给零食，做错了不给，重复几万次，狗就学会了"叼飞盘"这个动作。但如果你只奖励"叼到"，从不管"叼的姿势有没有把邻居家的花坛踩烂"，狗迟早会学会踩花坛去换零食。

## 原文 context

作者为了论证"这不是技能问题"而钻研的训练机制——生成编码 agent 的 trace → 用 verifier 打分 → 更新权重强化好 trace、抑制坏 trace，循环上百万次、持续数周到数月。这套解释动画的灵感来自 Calvin French-Owen 在 AI Council 的一次演讲。

## 掌握证据（做到这些才算会）

- 能画出一条 trace 到权重更新的完整循环
- 能说明 verifier 在循环里承担什么角色

## 验收问句

> 描述 {{name}} 的一轮循环里谁打分、谁更新。

## 先懂这些（前置 3）

- [[Reward Signal]] · **hard** — RLVR 用 verifier 给 trace 打分，本质是奖励信号，不懂就不知道循环在强化什么。
- [[reasoning thinking]] · **soft** — RLVR 强化的 trace 是推理/思考过程，懂推理模式能更好理解被验证的对象。
- [[DPPO]] · **soft** — RLVR 通常用 PPO/GRPO 类算法更新权重，懂 PPO 才懂更新环节怎么发生。

## 懂了它才能懂（解锁 2）

- [[RL Circuits]] — RL 电路讲应用落在训练分布切片上，懂 RLVR 循环才懂切片从哪来。
- [[ScaleRL]] — ScaleRL 用 S 型曲线描述大规模 RL，懂 RLVR 循环才懂算力花在哪。

## 相关

- [[Lights-off 软件工厂]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[软件工厂 Software Factory]] · 同篇出现（co-occurrence） — 同篇出现：harness-23
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-23

## 出场

- Harness Engineering ｜ 《为什么「软件工厂」会失败：光有 harness 工程还不够》 ｜ https://github.com/humanlayer/advanced-context-engineering-for-coding-agents/blob/main/wsff.md
## 反链

- [[Harness 工程 Harness Engineering]]
- [[DPPO]]
- [[Reward Signal]]
- [[软件工厂 Software Factory]]
- [[reasoning thinking]]
- [[ScaleRL]]
- [[Lights-off 软件工厂]]
- [[RL Circuits]]
