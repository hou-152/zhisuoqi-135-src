---
id: cm_b3551678
name: 调试散文：一个词就是 bug
type: CONCEPTUAL
subject: Harness Engineering
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# 调试散文：一个词就是 bug

> Harness 失灵时被调试的代码常是一段英文，唯一调试器是判断力；prompt 里一个词只把行为推偏几度。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

代码 bug 有地址，散文 bug 只有语气。改一个形容词就像改一句话的口气，机器不报错，但对方对你的态度已经变了——而这个「态度」正是产品的行为。

## 原文 context

harness 出故障时，造成失败的「代码」往往是一段英文，唯一的调试器是你的判断力。作者用几个小时把一次回归追踪到 prompt 里的一个形容词，并对比：源码里一个字符的 bug 可被找到，prompt 里一个词的 bug 是不可见的——它只把行为推偏几度，而几度足够悄悄腐蚀输出。

## 掌握证据（做到这些才算会）

- 能把一次回归定位到 prompt 中的某个形容词
- 能说明为何词级 bug 在源码里可见、在 prompt 里不可见

## 验收问句

> 输出只是轻微跑偏时，你能定位到 {{name}} 的哪个词？

## 相关

- [[「模型即产品」的幻觉]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[非确定性 nondeterminism]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-22

## 出场

- Harness Engineering ｜ 《为什么 harness 工程这么难》 ｜ https://x.com/winterarc2125/status/2081042507471696318/?s=12
## 反链

- [[非确定性 nondeterminism]]
- [[「模型即产品」的幻觉]]
