---
id: cm_78356595
name: 让 Agent 自行验证
type: PROCEDURAL
subject: AI 内参 260912
domain: verification-eval
learningStage: when-needed
verification: use
centrality: 0.161
depth: 2
origin: [neican]
aliases: []
sources: 1
---

# 让 Agent 自行验证

> 给 Agent 一个自己的反馈循环，让它在你看到结果前先自检。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.161

## 费曼一下

Agent 写代码后自己跑测试、调试、截图确认，形成内部反馈循环。人拿到的不是粗糙初稿，而是已自检结果。它解释了为什么可以合并确认而不牺牲太多质量。

## 原文 context

让 Agent 自行验证，可以减少你需要介入的次数。

> 相当于给 Agent 一个自己的反馈循环，让它在你看到结果之前先自己检查一遍。

> 这也是为什么合并一些确认环节（比如跳过 Code Review 直接黑盒测试）相对是安全的

## 掌握证据（做到这些才算会）

- 能描述 Agent 自行跑测试、调试、截图确认的过程
- 能说明这为何让合并确认环节相对安全

## 验收问句

> {{name}} 为什么能减少人的介入次数？

## 先懂这些（前置 2）

- [[确认环节可以合并，但不能省略]] · **soft** — 不懂【确认环节可以合并，但不能省略】，就做不了【让 Agent 自行验证】里「Agent 自检完之后仍把最终判断留在人的确认环节」这件事——会把自检结果直接当作放行依据。
- [[技能验证器 agent skills verifier]] · **soft** — 不懂【技能验证器】，就做不了【让 Agent 自行验证】里「给 Agent 挂一个在命令行先捕获技能结构性问题的自检关卡」这件事。

## 出场

- AI 内参 260912 ｜ 《我的 AI 原生开发流程：一个真实案例的完整复盘》 ｜ https://baoyu.io/blog/2026-08-24/ai-native-dev-workflow
## 反链

- [[确认环节可以合并，但不能省略]]
- [[技能验证器 agent skills verifier]]
