---
id: cm_33d3954f
name: Web of Trust
type: CONCEPTUAL
subject: AI 概念库
domain: safety-governance
learningStage: deep-dive
verification: judge
centrality: 0.017
depth: 0
origin: [notion]
aliases: ["信任网络 / 信任之网"]
sources: 1
---

# Web of Trust

> 信任靠图结构中多跳传递与多源交叉，每条边附「为何信」元数据，不依赖中心认证局。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 原文 context

来源：<mention-page url="https://app.notion.com/p/ff3679b108ff827cb4b881ba168f9252"/>
- **context**
	> "Web of trust is a asserts that b is trustworthy, who asserts c is trustworthy, who asserts d is trustworthy, and then the trust drops off… you can have not just one proof point… all of which is expressed in the metadata on the edges of nodes."
- **费曼一下**：信任不靠中心化的认证局，而是图结构里的多跳传递 + 多源交叉。每条边都附带"为什么信"的元数据，由此可以算出"这个账号继续是人类"的概率。是 Balaji 应对 AI agents 冒充人类的核心数学武器。
- **应用场景**：human-only social networks 的网络层防御，配合生物验证（biometric）+ 文化设计（类 Snapchat）形成三层抗 AI 滥用结构。

## 掌握证据（做到这些才算会）

- 能解释信任如何在多跳之后衰减
- 能说明它如何与生物验证配合防止 AI 冒充人类

## 验收问句

> {{name}} 如何在没有中心认证局时算出可信概率？

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Web-of-Trust-b8e679b108ff83b59691017ae66460df

## 别名

`信任网络 / 信任之网`

## 反链

- [[外包思考，但不外包理解]]
- [[Agent-Native Infrastructure]]
- [[Sensors 与 Actuators]]
