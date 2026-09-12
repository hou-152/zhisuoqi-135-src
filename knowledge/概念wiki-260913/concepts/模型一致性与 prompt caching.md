---
id: cm_ff08655e
name: 模型一致性与 prompt caching
type: PROCEDURAL
subject: Harness Engineering
domain: caching-cost
learningStage: when-needed
verification: use
centrality: 0.045
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# 模型一致性与 prompt caching

> 同一功能全程不换模型与推理档位，让模型侧缓存保留，后续请求省token又省钱。

**领域** caching-cost ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.045

## 费曼一下

换模型就像换搭档，前面讲过的背景要重讲一遍，而重讲是要付钱的。忠诚于一个搭档，在这里是可以直接换算成账单的美德。

## 原文 context

实操建议——多数工作用中等模型配中等推理档位；更关键的是同一个功能/bug/增强从头到尾不换模型：只要不切换模型或推理档位，之前的对话在模型侧保持缓存，后续请求享受折扣、省 token。

## 掌握证据（做到这些才算会）

- 能说出中等模型配中等推理档位的默认选择
- 能解释切换模型或档位会打断prompt缓存

## 验收问句

> {{name}}能说出为什么不换模型和推理档位就能省token吗？

## 先懂这些（前置 1）

- [[提示词缓存（Prompt Caching）]] · **hard** — 该原则是为保住提示缓存前缀而设，无缓存即无此约束。

## 相关

- [[少即是多」：gimmick 与真实增益的分界]] · 同篇出现（co-occurrence） — 同篇出现：harness-13
- [[废料怪兽]] · 同篇出现（co-occurrence） — 同篇出现：harness-13
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-13

## 出场

- Harness Engineering ｜ 《GitHub：决定 AI 编码效果的是 harness，不是你换了哪个工具》 ｜ https://github.blog/company/the-harness-is-all-you-need-mostly/
## 反链

- [[提示词缓存（Prompt Caching）]]
- [[废料怪兽]]
- [[少即是多」：gimmick 与真实增益的分界]]
