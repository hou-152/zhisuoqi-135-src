---
id: cm_983f29fd
name: asyncio 调度延迟与尾部延迟
type: CONCEPTUAL
subject: AI 内参 260912
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.035
depth: 0
origin: [neican]
aliases: []
sources: 1
---

# asyncio 调度延迟与尾部延迟

> 单请求触发数百次数据库调用时体验由最慢那次决定；asyncio 不绕过 GIL，CPU 密集任务抬高尾部延迟。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.035

## 费曼一下

一个用户请求可能触发数百次数据库调用，总体验由最慢的调用决定，这就是尾部延迟。Python 的 asyncio 能并发处理 I/O，但不能绕过 GIL 提供 CPU 并行性；CPU 密集任务会让事件循环上其他协程等待，产生调度抖动，放大尾部延迟。因此 Habitat 限制每个进程并发请求数，并大规模扩展 Python 工作进程。

## 原文 context

当平均每个用户请求都会导致数百次数据库调用时，用户感受到的延迟往往是最慢的那次。我们发现，在这种规模下运行 Python 服务的主要挑战在于如何管理这些尾部延迟。

> 由于我们的服务中包含大量 CPU 密集型工作负载和后台任务，asyncio 调度延迟很容易导致尾部请求延迟过高。

## 掌握证据（做到这些才算会）

- 能解释为何用户感受到的延迟往往是最慢的那次调用
- 能说明 asyncio 能并发 I/O 但不提供 CPU 并行，需限制进程并发数并扩大 Python 工作进程规模

## 验收问句

> {{name}} 为什么会放大用户感知到的延迟？

## 出场

- AI 内参 260912 ｜ 《Rapidly scaling online storage to serve over 1 billion ChatGPT users（存储平台 Habitat 的扩容复盘）》 ｜ https://openai.com/index/scaling-storage-one-billion-users-part-one/