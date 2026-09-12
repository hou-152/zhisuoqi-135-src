---
id: cm_36e39546
name: snapshotting + rehydration
type: CONCEPTUAL
subject: Harness Engineering
domain: state-persistence
learningStage: when-needed
verification: use
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# snapshotting + rehydration

> Agents SDK 内置的快照与再水合能力，可在新容器里从上次检查点恢复状态继续跑。

**领域** state-persistence ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

快照 + 恢复。snapshot 把 agent 的状态存到外部，rehydration 在新容器里把状态注入回去。类比：游戏存档与读档。

## 原文 context

With built-in snapshotting and rehydration, the Agents SDK can restore the agent’s state in a fresh container and continue from the last checkpoint…

## 掌握证据（做到这些才算会）

- 能说出状态从哪个检查点恢复到新容器
- 能演示一次中断后从上次 checkpoint 续跑

## 验收问句

> 容器重启后，{{name}} 如何让 Agent 接着上次继续？

## 先懂这些（前置 1）

- [[持久化执行 durable execution]] · **hard** — 不懂【持久化执行】，就做不了【snapshotting + rehydration】的「在新容器里从上次检查点恢复状态并继续跑完未完成 step」

## 懂了它才能懂（解锁 1）

- [[Stateful Runtime Environment (SRE)]] — 不懂【snapshotting + rehydration】，就做不了【Stateful Runtime Environment (SRE)】的「在新容器里从上次检查点恢复 agent 状态继续跑」

## 相关

- [[Session]] · related-to（audit） — 快照/再水合自身描述已说明恢复对象是检查点状态，不懂 Session 的定义也能理解，Session 只是有助于确定恢复的粒度
- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
## 反链

- [[持久化执行 durable execution]]
- [[Session]]
- [[Stateful Runtime Environment (SRE)]]
- [[model-native harness]]
- [[Agents SDK]]
