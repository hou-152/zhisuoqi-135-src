---
id: cm_7e6ba505
name: hooks
nameEn: .claude/hooks/
type: PROCEDURAL
subject: Harness Engineering
domain: harness-runtime
learningStage: now
verification: compute
centrality: 0.035
depth: 0
origin: [harness]
aliases: [".claude/hooks/"]
sources: 2
---

# hooks · .claude/hooks/

> 在 agent 生命周期特定事件上自动执行的确定性脚本，用于通知、审批、集成与验证。

**领域** harness-runtime ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能算 ｜ **中心度** 0.035

## 费曼一下

模型是概率性的，hooks 是确定性的。凡是「必须每次都发生」的事，别写进提示词求它照做，写成脚本让它必然发生。

## 原文 context

在 agent 生命周期特定事件上自动执行的用户脚本，可用于通知、审批、集成和验证。作者的示例是 Claude 停止时跑 biome 与类型检查：成功时完全静默、什么都不进上下文，失败时只暴露错误并用退出码 2 让 harness 重新唤起 agent。

## 掌握证据（做到这些才算会）

- 能写出停止时跑检查、成功静默失败只报错并退出码 2 的脚本
- 能解释为何确定性代码能在 AI 犯错前挡住它

## 验收问句

> 能否给 {{name}} 写一个失败时退出码 2、成功时静默的校验脚本？

## 相关

- [[AI 工程基础设施 AI engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[1.6% vs 98.4%]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[确定性工程基础设施 deterministic engineering infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：harness-20
- [[configuration problem]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-04
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-04

## 出场

- Harness Engineering ｜ 《HumanLayer：harness 工程就是把 coding agent 的配置点用到极致》 ｜ https://www.humanlayer.dev/blog/skill-issue-harness-engineering-for-coding-agents
- Harness Engineering ｜ 《撕开 Claude Code 真相：让它好用的 98.4%，是工程不是 AI》 ｜ https://mp.weixin.qq.com/s?\_\_biz=MzI3MTA0MTk1MA==&mid=2652696950&idx=2&sn=b8388fc8a9c5f6b51dbdf7e799d7f349

## 别名

`.claude/hooks/`

## 反链

- [[configuration problem]]
- [[1.6% vs 98.4%]]
- [[确定性工程基础设施 deterministic engineering infrastructure]]
- [[AI 工程基础设施 AI engineering infrastructure]]
