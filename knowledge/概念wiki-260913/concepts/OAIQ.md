---
id: cm_21a4ec33
name: OAIQ
type: CONCEPTUAL
subject: AI 概念库
domain: unclassified
learningStage: when-needed
verification: judge
centrality: 0.045
depth: 1
origin: [notion]
aliases: ["OpenAI 广告 pixel SDK", "oaiq.min.js"]
sources: 1
---

# OAIQ

> OAIQ

**领域** unclassified ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 原文 context

来自：<mention-page url="https://app.notion.com/p/7d1679b108ff83299d4e01d8de291ab7"/>
> The merchant page loads the OAIQ SDK: `<script src="https://bzrcdn.openai.com/sdk/oaiq.min.js"></script>` … Every subsequent `measure` call POSTs JSON to `https://bzr.openai.com/v1/sdk/events?pid=<merchant>&st=oaiq-web&sv=0.1.3`
**费曼一下**：OAIQ 就是 OpenAI 版的 Meta Pixel / Google Tag。商家把这段 JS 装到自己网站，它会在浏览器里读取 URL 上的 `oppref`、写入 first-party cookie，然后把后续访问、加购、下单等行为通通上报到 `bzr.openai.com`。**有了它，OpenAI 第一次拥有了 ChatGPT 之外的转化数据。**

## 先懂这些（前置 1）

- [[正确的信息与工具，在正确的时间]] · **soft** — OAIQ 衡量的正是信息与工具在时点上的正确性，不懂这个标准就无法理解 OAIQ 的含义

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/OAIQ-3d8679b108ff8235983d81eee3b96e67

## 别名

`OpenAI 广告 pixel SDK`、`oaiq.min.js`

## 反链

- [[正确的信息与工具，在正确的时间]]
