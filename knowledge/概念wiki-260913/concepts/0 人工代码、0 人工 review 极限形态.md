---
id: cm_86d3d4a6
name: 0 人工代码、0 人工 review 极限形态
type: CONCEPTUAL
subject: Harness Engineering
domain: agent-org
learningStage: deep-dive
verification: accept
centrality: 0.126
depth: 2
origin: [harness]
aliases: []
sources: 1
---

# 0 人工代码、0 人工 review 极限形态

> 工作流逼近零人工写码、零人工 review，用模型高并发低成本替代人的同步注意力。

**领域** agent-org ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.126

## 费曼一下

OpenAI Frontier 团队 5 个月跑出 100 万行代码、1500 个 PR 的工作模式。背后是一个反直觉的算账方式——人类的同步注意力是稀缺昂贵的，而 token 是便宜并发的，应该把工作量倾倒在模型那一侧。

## 原文 context

\-

"带队的 Ryan Lopopolo 在后续访谈中进一步提到，这套工作流已经接近『0 人工代码、0 人工 review』的极限形态。他认为与其节省 token，不如利用模型极高的并发能力和极低的成本来代替人类有限且昂贵的同步注意力。"

## 掌握证据（做到这些才算会）

- 能描述该团队的端到端流程
- 能说出为何不省 token 反而放大并发

## 验收问句

> {{name}} 中人类还剩下哪些不可替代的动作？

## 先懂这些（前置 2）

- [[信任机制重构]] · **soft** — 不懂【信任机制重构】，就做不了【0 人工代码、0 人工 review 极限形态】的落地——没人敢让 AI 直接合码，gate 一撤组织就崩
- [[管理 Agent]] · **soft** — 不懂【管理 Agent】，就做不了【0 人工代码、0 人工 review 极限形态】——目标不清晰、资源不到位、反馈不及时，loop 跑一轮就废

## 相关

- [[虚荣指标 vanity metrics]] · rejected（audit） — 虚荣指标只是要避免的反面度量，不是理解或成立“0人工代码/review”的前置依赖。
- [[AI 工程基础设施 AI engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[确定性工程基础设施 deterministic engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[Lights-off 软件工厂]] · related-to（audit） — 二者近乎同一概念的具体形态与抽象形态（极限形态的实践版），属冗余同义边而非认知前置。
- [[1.6% vs 98.4%]] · 同篇出现（co-occurrence） — 同篇出现：harness-20

## 出场

- Harness Engineering ｜ 《撕开 Claude Code 真相：让它好用的 98.4%，是工程不是 AI》 ｜ https://mp.weixin.qq.com/s?\_\_biz=MzI3MTA0MTk1MA==&mid=2652696950&idx=2&sn=b8388fc8a9c5f6b51dbdf7e799d7f349
## 反链

- [[信任机制重构]]
- [[管理 Agent]]
- [[Lights-off 软件工厂]]
- [[1.6% vs 98.4%]]
- [[确定性工程基础设施 deterministic engineering infrastructure]]
- [[虚荣指标 vanity metrics]]
- [[AI 工程基础设施 AI engineering infrastructure]]
