---
id: cm_5bff7310
name: 两类 Skills
type: CONCEPTUAL
subject: AI 内参 260912
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.07
depth: 0
origin: [neican]
aliases: ["辅助设计确认／自动化减少体力劳动"]
sources: 1
---

# 两类 Skills

> 作者只用两类 Skills：辅助设计确认与自动化减少体力劳动。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.07

## 费曼一下

作者不靠大量编码类 Skills，因为模型编码已足够好。只用两类：帮助左侧设计确认，如高精度原型工具；帮助右侧自动化，如部署发布。它是瓶颈转移后的工具选择结论。

## 二、概念架构图

按功能角色分层：总原则层说明整体判断，流程阶段层呈现旧流程，机制与边界层解释 AI 原生开发如何运转，工具选择层对应瓶颈两侧的 Skills。边只表示原文能支持的关系。

```mermaid
flowchart TB
  subgraph P[总原则层]
    A["AI 原生开发：流程不变，执行主体改变"]
    B["人在关键路径确认"]
  end
  subgraph F[流程阶段层]
    C["可行性分析"]
    D["设计文档：桥梁与记忆载体"]
    E["高精度原型设计"]
    F1["编码实现"]
    G["测试验证"]
  end
  subgraph M[机制与边界层]
    H["Agent Session"]
    I["让 Agent 自行验证"]
    J["确认环节可合并但不能省略"]
    K["瓶颈转移到代码两侧"]
    L["把自己当普通用户／黑盒测试"]
  end
  subgraph T[工具选择层]
    S["两类 Skills：辅助设计确认／自动化减少体力劳动"]
  end
  A -->|推导出| B
  A -->|用新方式跑| C
  A -->|用新方式跑| D
  A -->|用新方式跑| E
  A -->|用新方式跑| F1
  A -->|用新方式跑| G
  C -->|先决定要不要做| D
  D -->|提供基础| E
  E -->|确认后| F1
  F1 -->|进入| G
  D -->|为下一个 Session 提供起点| H
  I -->|使合并更安全| J
  J -->|不可跳过| C
  J -->|不可跳过| D
  J -->|不可跳过| E
  J -->|不可跳过| G
  K -->|重新审视| J
  K -->|决定工具选择| S
  S -->|解决左侧瓶颈| E
  S -->|解决右侧瓶颈| G
  L -->|测试视角| G
```

## 原文 context

我的答案可能会出乎意料：大部分开发类 Skills 是没必要的。

> 我一般只用两类 Skills，恰好对应这两个瓶颈：

> 第一类是辅助设计确认的——解决左侧瓶颈。

> 第二类是自动化减少体力劳动的——解决右侧瓶颈。

## 掌握证据（做到这些才算会）

- 能说出不使用大量开发类 Skills 的理由是模型编码已足够好
- 能把两类 Skills 分别对应到瓶颈左右两侧

## 验收问句

> {{name}} 分成哪两类，各自解决哪一侧瓶颈？

## 出场

- AI 内参 260912 ｜ 《我的 AI 原生开发流程：一个真实案例的完整复盘》 ｜ https://baoyu.io/blog/2026-08-24/ai-native-dev-workflow

## 别名

`辅助设计确认／自动化减少体力劳动`
