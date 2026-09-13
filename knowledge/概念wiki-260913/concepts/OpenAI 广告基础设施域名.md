---
id: cm_769e3775
name: OpenAI 广告基础设施域名
type: REPRESENTATIONAL
subject: AI 概念库
domain: economy-business
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [notion]
aliases: ["bzrcdn.openai.com", "bzr.openai.com", "OpenAI ad infrastructure domains"]
sources: 1
---

# OpenAI 广告基础设施域名

> bzrcdn.openai.com 托管广告创意与 SDK，bzr.openai.com 收事件上报，是广告网络自建的物理标志。

**领域** economy-business ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 原文 context

来自：<mention-page url="https://app.notion.com/p/7d1679b108ff83299d4e01d8de291ab7"/>
> Brand favicon and ad image both load from `bzrcdn.openai.com`. OpenAI hosts the advertiser's creative, not the merchant. … `oaiq.min.js` … POST `https://bzr.openai.com/v1/sdk/events`
**费曼一下**：两个域名暴露了 OpenAI 广告基础设施的轮廓——`bzrcdn.openai.com` 是 CDN（托管广告创意和 SDK 文件），`bzr.openai.com` 是事件服务器（接收 pixel 上报）。**对用户而言，这是「该不该屏蔽」的精准入口**；对 OpenAI 而言，它们是把广告网络从其他大厂托管中独立出来的物理标志。

## 掌握证据（做到这些才算会）

- 能区分两个域名各自承载 CDN 还是事件上报
- 能据此指出屏蔽广告追踪的精准入口

## 验收问句

> 要屏蔽 OpenAI 广告追踪，{{name}} 里该拦哪个域名？

## 相关

- [[oppref]] · related-to（audit） — 「bzr 收事件上报」这条定义懂不懂 oppref 都成立，回传内容的具体格式不是理解域名的前提。
- [[LLM 订阅错配（LLM Subscription Mispricing）]] · rejected（audit） — 域名事实本身不依赖订阅错配；错配只是解释 OpenAI 为何做广告，不是理解 bzrcdn/bzr 的前提。
- [[single_advertiser_ad_unit]] · related-to（audit） — 域名角色的定义是「托管创意/SDK、收事件上报」，理解它不需要先懂 SSE 广告单元，只是同链条相关。
- [[Token 补贴缺口（Token Subsidy Gap）]] · related-to（audit） — 域名与 SDK 的归属和功能可独立看懂，补贴缺口只解释「为什么要有它」，属存在理由而非理解前提。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/OpenAI-716679b108ff8320b13481fa0178630a

## 别名

`bzrcdn.openai.com`、`bzr.openai.com`、`OpenAI ad infrastructure domains`

## 反链

- [[LLM 订阅错配（LLM Subscription Mispricing）]]
- [[oppref]]
- [[Token 补贴缺口（Token Subsidy Gap）]]
- [[single_advertiser_ad_unit]]
