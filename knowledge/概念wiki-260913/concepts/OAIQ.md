---
id: cm_21a4ec33
name: OAIQ
type: REPRESENTATIONAL
subject: AI 概念库
domain: economy-business
learningStage: when-needed
verification: accept
centrality: 0.072
depth: 0
origin: [notion]
aliases: ["OpenAI 广告 pixel SDK", "oaiq.min.js"]
sources: 1
---

# OAIQ

> OpenAI 商家端转化追踪 SDK，读取 oppref、写 cookie，并把访问、加购、下单等上报 bzr.openai.com。

**领域** economy-business ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.072

## 原文 context

来自：<mention-page url="https://app.notion.com/p/7d1679b108ff83299d4e01d8de291ab7"/>
> The merchant page loads the OAIQ SDK: `<script src="https://bzrcdn.openai.com/sdk/oaiq.min.js"></script>` … Every subsequent `measure` call POSTs JSON to `https://bzr.openai.com/v1/sdk/events?pid=<merchant>&st=oaiq-web&sv=0.1.3`
**费曼一下**：OAIQ 就是 OpenAI 版的 Meta Pixel / Google Tag。商家把这段 JS 装到自己网站，它会在浏览器里读取 URL 上的 `oppref`、写入 first-party cookie，然后把后续访问、加购、下单等行为通通上报到 `bzr.openai.com`。**有了它，OpenAI 第一次拥有了 ChatGPT 之外的转化数据。**

## 懂了它才能懂（解锁 1）

- [[对话式广告归因闭环]] — 不懂 OAIQ，就做不了对话式广告归因闭环里的上报环节（读 oppref、写 cookie、把下单回报到 bzr.openai.com）

## 相关

- [[正确的信息与工具，在正确的时间]] · rejected（audit） — OAIQ 可由技术描述独立理解；该泛原则只是抽象关联，不是前置依赖。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/OAIQ-3d8679b108ff8235983d81eee3b96e67

## 别名

`OpenAI 广告 pixel SDK`、`oaiq.min.js`

## 反链

- [[对话式广告归因闭环]]
- [[正确的信息与工具，在正确的时间]]
