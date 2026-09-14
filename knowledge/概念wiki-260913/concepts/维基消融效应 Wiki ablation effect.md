---
id: cm_b65cad24
name: 维基消融效应
nameEn: Wiki ablation effect
type: CONCEPTUAL
subject: AI 内参 260912
domain: verification-eval
learningStage: when-needed
verification: accept
centrality: 0.017
depth: 0
origin: [neican]
aliases: ["Wiki ablation effect"]
sources: 1
---

# 维基消融效应 · Wiki ablation effect

> 去掉 Wiki 访问后平均分从 63.7% 降至 48.7%，回落约 15 个百分点。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.017

## 费曼一下

实验证实若撤掉中间的 Wiki 知识层，仅靠提议者直接从原始轨迹修改技能，模型表现会断崖式下跌 15 个百分点。这证明持续积累的抽象知识库才是智能体解决复杂长尾缺陷的真正承重支柱。

## 二、概念架构图

```mermaid
graph TD
    subgraph 运行闭环
        A[Inference Agent] -->|产生执行轨迹| B[Raw Layer 原始轨迹层]
        B -->|采样轨迹根因分析| C[Wiki Maintainer 维护者]
        C -->|编译持久知识| D[Wiki Layer 维基中枢]
        D -->|查阅模式与历史| E[Skill Proposer 提议者]
        E -->|产出新技能提案| F[Skills Layer 技能层]
        F -->|验证评估| G{Gating 门禁}
        G -->|通过| A
        G -->|未通过: 回滚技能| F
    end
    subgraph 核心机制
        D -.->|永不回滚| D
        F -.->|PURPOSE.md 溯源| D
    end
```

## 原文 context

去掉 Wiki 访问后，平均分从 63.7% 降至 48.7%，回落约 15 个百分点。Wiki Maintainer 积累的跨迭代知识是 Skill Proposer 能解决复杂失败模式的前提。

## 掌握证据（做到这些才算会）

- 能复述 63.7%→48.7%、约 15 个百分点的消融结果
- 能据此判断 Wiki 层是解决复杂失败模式的前提而非可选装饰

## 验收问句

> {{name}} 的具体数据是多少，它说明 Wiki 层处于什么地位？

## 出场

- AI 内参 260912 ｜ 《谷歌重磅发布WikiSkill，技能可以自己进化了！》 ｜ https://mp.weixin.qq.com/s?__biz=MzIyNjM2MzQyNg%3D%3D&mid=2247725815&idx=1&sn=6dc8d200fbcabc937f0093929522430a&chksm=e96ba0747e94677b08172b24288c71cf370f6673d7918a21578bf83247eea6e9bc037caf398b

## 别名

`Wiki ablation effect`
