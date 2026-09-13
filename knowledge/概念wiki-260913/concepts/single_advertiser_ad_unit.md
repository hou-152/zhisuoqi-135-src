---
id: cm_72385793
name: single_advertiser_ad_unit
type: REPRESENTATIONAL
subject: AI 概念库
domain: economy-business
learningStage: when-needed
verification: accept
centrality: 0.017
depth: 0
origin: [notion]
aliases: ["单广告主广告单元", "single advertiser ad unit"]
sources: 1
---

# single_advertiser_ad_unit

> ChatGPT SSE 响应流中与模型输出混在一起的结构化广告事件，含品牌、轮播卡片、目标链接与 token。

**领域** economy-business ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.017

## 原文 context

来自：<mention-page url="https://app.notion.com/p/7d1679b108ff83299d4e01d8de291ab7"/>
> When you send a message to ChatGPT, the backend opens an SSE response at `chatgpt.com/backend-api/f/conversation`. Most events in that stream are model-output. Some are ad units. … `single_advertiser_ad_unit` is a typed schema. The naming implies siblings (multi-advertiser, etc.).
**费曼一下**：ChatGPT 跟你「说话」的同时，从同一根管子（SSE 流）里塞出来的「广告事件」就是这个东西。它不是独立的页面广告位，而是和模型回答**混在同一条响应流**中的结构化对象——典型字段包括品牌、轮播卡片、目标链接和 4 个 Fernet token。命名上还有 `multi_advertiser_*` 之类的兄弟，意味着这是一整套带类型的广告原语。

## 掌握证据（做到这些才算会）

- 能说出它在 SSE 流里与 model-output 事件并列出现
- 能指出命名暗示存在 multi_advertiser 等同类原语

## 验收问句

> {{name}} 与独立页面广告位的区别是什么？

## 相关

- [[OpenAI 广告基础设施域名]] · related-to（audit） — 域名角色的定义是「托管创意/SDK、收事件上报」，理解它不需要先懂 SSE 广告单元，只是同链条相关。
- [[Token 补贴缺口（Token Subsidy Gap）]] · related-to（audit） — 补贴缺口只是广告变现的动机背景，理解 SSE 里的结构化广告事件不需要先懂算力补贴经济，属可选语境而非构成前提。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/single_advertiser_ad_unit-892679b108ff836f863401ed60491da3

## 别名

`单广告主广告单元`、`single advertiser ad unit`

## 反链

- [[Token 补贴缺口（Token Subsidy Gap）]]
- [[OpenAI 广告基础设施域名]]
