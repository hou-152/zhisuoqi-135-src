---
id: cm_7a03b65b
name: 锁竞争瓶颈
nameEn: lock contention
type: CONCEPTUAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: judge
centrality: 0.067
depth: 2
origin: [harness]
aliases: ["lock contention"]
sources: 1
---

# 锁竞争瓶颈 · lock contention

> 锁本身工作正常也会成为瓶颈，二十个 agent 吞吐退化为两三个。

**领域** multi-agent ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 费曼一下

20 个人干活却只有一支笔，多数时间在排队。人手加得再多，产出也卡在那支笔的速度上——这是并行系统最典型的伪扩展。

## 原文 context

即使锁本身工作正常，它也成了瓶颈——"Twenty agents would slow down to the effective throughput of two or three, with most time spent waiting."

## 掌握证据（做到这些才算会）

- 能指出大部分时间花在等待而非工作
- 能解释串行化如何吃掉并行收益

## 验收问句

> 为什么 {{name}} 让 20 个 agent 只剩 2-3 个的吞吐？

## 先懂这些（前置 1）

- [[共享文件加锁的协调机制]] · **hard** — 瓶颈来自锁机制本身，不懂加锁就理解不了为何吞吐退化

## 懂了它才能懂（解锁 1）

- [[锁竞争与乐观并发控制]] — 乐观并发是应对持锁过久、忘释放等锁竞争问题的方案

## 相关

- [[长时程自治编码 long-running autonomous coding]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[单 agent 的速度天花板]] · 同篇出现（co-occurrence） — 同篇出现：harness-07
- [[动态协调 dynamic coordination]] · 同篇出现（co-occurrence） — 同篇出现：harness-07

## 出场

- Harness Engineering ｜ 《Cursor：让 coding agent 连续自治运行数周的工程经验》 ｜ https://cursor.com/blog/scaling-agents

## 别名

`lock contention`

## 反链

- [[动态协调 dynamic coordination]]
- [[共享文件加锁的协调机制]]
- [[单 agent 的速度天花板]]
- [[长时程自治编码 long-running autonomous coding]]
- [[锁竞争与乐观并发控制]]
