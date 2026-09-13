---
id: cm_0d71e42c
name: 开箱即用的编排与子 agent
type: REPRESENTATIONAL
subject: Harness Engineering
domain: multi-agent
learningStage: when-needed
verification: use
centrality: 0.126
depth: 4
origin: [harness]
aliases: []
sources: 1
---

# 开箱即用的编排与子 agent

> 编排器自动按任务复杂度分派小模型探查子 agent 与大模型通用子 agent，无需手工配置。

**领域** multi-agent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

这是全文最硬的一块证据——你以为要自己搭的多智能体架构，harness 已经默认替你搭好了。不知道它存在，你照样在享受它。

## 原文 context

Autopilot 阶段 Copilot 自动当 orchestrator：读代码库文件用小模型的 Explore 子 agent，判断动作复杂就用大模型的 General Purpose 子 agent。虽然自定义 agent 和指令能给你细粒度控制，但「你什么都不用做」也能拿到子 agent 与多模型工作流的好处。

## 掌握证据（做到这些才算会）

- 能不写自定义 agent 就跑通一次多子 agent 工作流
- 能说出小模型探查与大模型通用子 agent 各自的分工

## 验收问句

> 不做任何自定义配置，你能否用{{name}}完成一次多子 agent 任务？

## 先懂这些（前置 2）

- [[subagents]] · **soft** — 编排器调度的对象就是探查与通用子 agent
- [[模型—角色适配]] · **soft** — 不懂【模型—角色适配】就做不了【开箱即用的编排与子 agent】的「按任务复杂度分派小模型探查子 agent 与大模型通用子 agent」

## 相关

- [[模型—角色适配]] · related-to（audit） — A 只需按复杂度路由大小模型即可理解；模型—角色适配是上位原则，不是必要前置。
- [[「少即是多」：gimmick 与真实增益的分界]] · 同篇出现（co-occurrence） — 同篇出现：harness-13
- [[废料怪兽]] · 同篇出现（co-occurrence） — 同篇出现：harness-13
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-13

## 出场

- Harness Engineering ｜ 《GitHub：决定 AI 编码效果的是 harness，不是你换了哪个工具》 ｜ https://github.blog/company/the-harness-is-all-you-need-mostly/
## 反链

- [[模型—角色适配]]
- [[subagents]]
- [[废料怪兽]]
- [[「少即是多」：gimmick 与真实增益的分界]]
