---
id: cm_7c5152aa
name: oppref
type: REPRESENTATIONAL
subject: AI 概念库
domain: economy-business
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [notion]
aliases: ["__oppref cookie", "forward attribution token", "前向归因 token"]
sources: 1
---

# oppref

> 广告点击 URL 上的前向归因 token，被写入 __oppref cookie（30 天），随每次转化事件回传。

**领域** economy-business ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 原文 context

来自：<mention-page url="https://app.notion.com/p/7d1679b108ff83299d4e01d8de291ab7"/>
> `oppref` present on the click URL and copied verbatim by the OAIQ pixel into the cookie `__oppref` (TTL 720 hours / 30 days). The forward attribution token. Travels with every subsequent merchant pixel event.
**费曼一下**：4 个 token 里**真正「跑完全程」的归因主键**。它先被注入到广告点击 URL，用户跳到商家网站后被 OAIQ 写到 first-party cookie `__oppref`（30 天 TTL），之后商家页面上的每个 pixel 事件都会捎带它回传 OpenAI。**它就是把「对话里的某条广告」和「商家网站上的某次转化」绑在一起的那根线。**

## 掌握证据（做到这些才算会）

- 能说明它从点击到转化全程被携带的路径
- 能说出 cookie 名与 720 小时/30 天 TTL

## 验收问句

> {{name}} 是怎么把广告点击和商家转化绑到一起的？

## 相关

- [[single_advertiser_ad_unit]] · related-to（audit） — oppref 只解释了广告单元里 token 这一个字段的用途，整节点（结构化广告事件）不懂它也能立住。
- [[OpenAI 广告基础设施域名]] · related-to（audit） — 「bzr 收事件上报」这条定义懂不懂 oppref 都成立，回传内容的具体格式不是理解域名的前提。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/oppref-686679b108ff837cb0a881dd634db906

## 别名

`__oppref cookie`、`forward attribution token`、`前向归因 token`

## 反链

- [[OpenAI 广告基础设施域名]]
- [[single_advertiser_ad_unit]]
