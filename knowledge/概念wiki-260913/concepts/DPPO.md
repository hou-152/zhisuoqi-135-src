---
id: cm_c63842fd
name: DPPO
type: CONCEPTUAL
subject: AI 概念库
domain: model-training
learningStage: deep-dive
verification: judge
centrality: 0.181
depth: 2
origin: [notion]
aliases: ["散度 PPO", "Divergence PPO"]
sources: 1
---

# DPPO

> 用预估策略散度（TV/KL）定义的信任域，取代 PPO 中基于采样 token 概率比例的裁剪掩码。

**领域** model-training ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.181

## 原文 context

<mention-page url="https://app.notion.com/p/6ce679b108ff83778c7601e6e27c3f0e"/>
> 它的核心批判点在于，PPO 仅仅基于采样 token 的概率比例进行裁剪。这种方式可能并不能很好地代表实际策略散度，对于那些罕见 token 尤其如此……因此，DPPO 用基于预估策略散度定义的信任域（TV 或 KL 散度）取代了基于比例的掩码。
**费曼一下**：PPO 用"采样 token 概率比例"决定要不要更新，是个很糙的代理——罕见 token 概率改一个数量级对全局分布影响其实很小。DPPO 干脆把约束对象换成"两策略之间的 TV/KL 散度"，全词表算太贵就用二元/Top-K 近似。最有趣的实证：\< 0.5% 的更新（负样本把策略推太远）贡献几乎全部不稳定，屏蔽就稳了。

## 掌握证据（做到这些才算会）

- 能说明比例裁剪对罕见 token 的代理偏差
- 能解释屏蔽极小比例越界更新为何反而更稳

## 验收问句

> {{name}} 把约束对象从比例换成了什么？

## 先懂这些（前置 3）

- [[信任域]] · **hard** — DPPO用散度定义信任域取代PPO裁剪，不懂信任域就看不懂其替换。
- [[Reward Signal]] · **soft** — PPO 靠奖励信号优化策略，不懂奖励通道就不知道它优化什么。
- [[REINFORCE]] · **soft** — PPO 是带裁剪与重要性加权的策略梯度，基础是 REINFORCE 的加权采样。

## 相关

- [[RLOO]] · rejected（audit） — RLOO 的对照或简化对象是 PPO/REINFORCE，不是 DPPO；DPPO 只是另一类信任域方法，不构成前置。
- [[RLHF]] · rejected（audit） — DPPO 依赖的是 PPO/策略梯度，不是 RLHF；理由讲的是 RLHF 依赖 PPO，方向不对。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/DPPO-6b0679b108ff828994c101b158cf7ef5

## 别名

`散度 PPO`、`Divergence PPO`

## 反链

- [[Reward Signal]]
- [[REINFORCE]]
- [[信任域]]
- [[RLHF]]
- [[RLOO]]
