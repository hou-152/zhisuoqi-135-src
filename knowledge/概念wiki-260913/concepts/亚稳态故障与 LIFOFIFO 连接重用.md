---
id: cm_cbbe3f8e
name: 亚稳态故障与 LIFO/FIFO 连接重用
type: CONCEPTUAL
subject: AI 内参 260912
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.107
depth: 0
origin: [neican]
aliases: []
sources: 1
---

# 亚稳态故障与 LIFO/FIFO 连接重用

> 压力消失后进程仍卡在降级状态；aiohttp 默认 LIFO 重用连接，把流量越推越集中在慢 Pod 上。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.107

## 费曼一下

亚稳态故障是指外部触发压力消失后，系统仍卡在坏状态。这里，慢 Pod 最后才把连接归还连接池，而 LIFO 又优先重用最近归还的连接，于是后续请求更频繁地打向慢 Pod，流量越来越集中。FIFO 打破这个正反馈，使连接和工作负载更公平地分配。它是理解连接池为什么会影响尾部延迟和稳定性的机制边界。

## 原文 context

尽管我们停止了导致部分服务过载的客户端，但部分进程在突发流量过后仍然处于降级状态。事实上，我们注意到这些进程出现了失控降级，接收到的请求越来越多，直到我们重启它们为止。一旦某个 Pod 过载，某些行为就会将更多流量集中到过载的 Pod 上。我们的一些团队成员在之前的工作中已经熟悉这类故障：亚稳态故障。

> Python 的 aiohttp TCPConnector 默认采用后进先出 (LIFO) 的连接重用机制：即选择最近返回的连接用于下一个请求。

> 在请求激增期间，对速度较慢、负载过重的服务器的请求会稍后才将连接返回到连接池，因此后续请求会更频繁地选择这些连接，从而逐渐将更多流量集中在已经不堪重负的 Pod 上。将连接池修改为使用先进先出 (FIFO) 的连接重用机制打破了这种反馈循环，甚至还降低了我们稳定状态下的请求波动。

## 掌握证据（做到这些才算会）

- 能描述过载 Pod 接收请求越来越多、直到重启才恢复的失控降级现象
- 能解释 LIFO 更频繁复用慢服务器归还的连接、改成 FIFO 可打破该正反馈

## 验收问句

> {{name}} 是怎样把流量越推越集中到慢 Pod 的？

## 懂了它才能懂（解锁 1）

- [[连接扇入]] — 不懂 aiohttp 默认 LIFO 重用连接会把流量越推越集中在慢 Pod 上、压力退去后进程仍卡在降级状态，就做不好用连接池与长连接收拢扇入这件事。

## 出场

- AI 内参 260912 ｜ 《Rapidly scaling online storage to serve over 1 billion ChatGPT users（存储平台 Habitat 的扩容复盘）》 ｜ https://openai.com/index/scaling-storage-one-billion-users-part-one/
## 反链

- [[连接扇入]]
