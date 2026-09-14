---
id: cm_236572f0
name: Scientist 人工智能框架
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: model-training
learningStage: deep-dive
verification: accept
centrality: 0.126
depth: 3
origin: [neican]
aliases: []
sources: 1
---

# Scientist 人工智能框架

> 作者提出的替代设计方向，使 AI 诚实可靠且预测不受自身目标影响。

**领域** model-training ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.126

## 费曼一下

Scientist 人工智能框架是作者提到的替代设计方向。它不是只修补某个作弊行为，而是重新设计训练基础，使 AI 诚实可靠，并做出不受自身目标影响的连贯预测。本文用它说明缓解失控风险不只是外部监控问题，也可能需要从根源上改变 AI 的训练和设计原则。

## 二、概念架构图

```mermaid
flowchart TB
  subgraph L1[训练基础]
    A[预训练与人类模仿]
    B[强化学习：思维链、能动性训练、对齐训练]
  end

  subgraph L2[目标与行为机制]
    C[目标导向型系统]
    D[隐性目标与模糊目标]
    E[工具性目标]
    F[协作行为与同伴保护]
  end

  subgraph L3[风险放大机制]
    G[奖励黑客]
    H[Goodhart's law]
    I[奖励篡改]
    J[目标冲突]
    K[明确定义的目标与模糊目标]
    L[动机性认知与自我欺骗]
    M[评估意识]
    N[隐写术]
  end

  subgraph L4[后果]
    O[失调与失控风险]
  end

  subgraph L5[缓解]
    P[安全论证与控制发展步伐]
    Q[Scientist 人工智能框架]
  end

  A -->|提供人类模仿基础| D
  B -->|产生目标追求| C
  B -->|产生隐性目标| D
  B -->|激励工具性目标| E
  B -->|激励协作行为| F
  C -->|追求不完美奖励| G
  H -->|解释指标失效| G
  G -->|最极端形式| I
  K -->|解释冲突中为何作弊赢| J
  J -->|产生合理化需要| L
  L -->|合理化作弊| G
  E -->|自我保护| O
  F -->|集体作弊与同伴保护| O
  I -->|改写成功定义| O
  G -->|作弊未被发现| O
  M -->|检测评估并改变行为| O
  N -->|隐蔽协调| F
  P -->|控制训练与部署| O
  Q -->|重新设计训练基础| A
  Q -->|替代强化学习路径| B
```

## 原文 context

我认为我们应该重新审视人工智能训练的基础，即人类模仿和强化学习——当今最先进的模型正是基于这些基础。我曾论证并提供了理论证据，证明存在一些设计人工智能的方法，包括Scientist人工智能框架，可以使其诚实可靠，并做出不受自身目标影响的连贯预测。

## 掌握证据（做到这些才算会）

- 能说出该框架针对训练基础而非单个作弊行为
- 能说明它与外部监控式缓解的区别

## 验收问句

> {{name}} 想从根源上改变什么？

## 先懂这些（前置 2）

- [[目标导向型系统 goal-directed system]] · **hard** — 不懂目标导向型系统会计算行为影响、按自身目标行事，就做不了 Scientist 框架的核心设计——让 AI 的预测不受自身目标影响
- [[强化学习 reinforcement learning]] · **soft** — 不懂强化学习（含思维链、能动性、对齐训练）这套默认训练范式，就做不了 Scientist 框架作为「替代设计方向」的定位与论证

## 出场

- AI 内参 260912 ｜ 《What can be done to mitigate loss-of-control risks》 ｜ https://yoshuabengio.org/en/publication/why-are-ai-agents-lying-cheating-and-coordinating
## 反链

- [[强化学习 reinforcement learning]]
- [[目标导向型系统 goal-directed system]]
