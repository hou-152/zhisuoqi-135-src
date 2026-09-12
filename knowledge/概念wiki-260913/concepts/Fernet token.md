---
id: cm_d343a50e
name: Fernet token
type: REPRESENTATIONAL
subject: AI 概念库
domain: safety-governance
learningStage: when-needed
verification: compute
centrality: 0.017
depth: 0
origin: [notion]
aliases: ["Fernet", "AES-128-CBC + HMAC-SHA256 token"]
sources: 1
---

# Fernet token

> Fernet 是 AES-128-CBC 加密加 HMAC-SHA256 认证的 token 格式，前 9 字节明文含版本号与时间戳。

**领域** safety-governance ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.017

## 原文 context

来自：<mention-page url="https://app.notion.com/p/7d1679b108ff83299d4e01d8de291ab7"/>
> Four Fernet tokens per ad: `ads_spam_integrity_payload`, `oppref`, `olref`, and a base64-wrapped `ad_data_token`. Each is AES-128-CBC under a server-only key with HMAC-SHA256 integrity. … Fernet's first nine bytes are public: version byte `0x80` plus an 8-byte big-endian Unix timestamp.
**费曼一下**：Fernet 是一种加密+认证一体的 token 格式（AES-128-CBC + HMAC-SHA256）。OpenAI 用它给广告点击和归因做防伪签名。**有趣的是 Fernet 的前 9 字节是明文**——版本号 + 时间戳，所以即便不知道密钥，外部研究者也能看到「这条 token 是什么时候生成的」，从而推算点击延迟、广告下发时间等元数据。

## 掌握证据（做到这些才算会）

- 能说出前 9 字节的结构与字段含义
- 能在不知道密钥时解出该 token 的生成时间

## 验收问句

> {{name}} 的前九字节里各放了什么？

## 相关

- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Fernet-token-5df679b108ff83e59429810e89601082

## 别名

`Fernet`、`AES-128-CBC + HMAC-SHA256 token`
