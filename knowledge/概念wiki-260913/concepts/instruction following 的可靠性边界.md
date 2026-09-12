---
id: cm_3ca84975
name: instruction following 的可靠性边界
type: CONCEPTUAL
subject: Harness Engineering
domain: verification-eval
learningStage: now
verification: judge
centrality: 0.067
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# instruction following 的可靠性边界

> 模型会忠实执行字面指令（真删代码、真写注释），完全依赖它对指令的遵循并不可靠。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.067

## 费曼一下

模型会把「看起来像正确输出的东西」写出来，而不一定真的做对了事。凡是把正确性完全押在模型听话上的设计，都需要一层确定性的校验兜底。

## 原文 context

作者以为看到了 (Rest of file unchanged) 这种 magic 的体验，结果发现「它是真的把代码删了，把这个注释写进去了」，由此判断完全依赖 AI 的 instruction following 还是没那么靠谱。

## 掌握证据（做到这些才算会）

- 能举出模型字面执行导致破坏的实例
- 能指出哪些环节必须用测试或人工兜底

## 验收问句

> 为什么不能把{{name}}当成可以托付的承诺？

## 懂了它才能懂（解锁 2）

- [[Validation gates]] — 门禁之所以必要，正因为模型对字面指令的遵循不可靠。
- [[REI-Bench]] — 基准给出模糊指令成功率下滑，才能具体理解边界。

## 相关

- [[看对话 log]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[对话加确定性缝合]] · 同篇出现（co-occurrence） — 同篇出现：harness-21
- [[反向代理式窥探]] · 同篇出现（co-occurrence） — 同篇出现：harness-21

## 出场

- Harness Engineering ｜ 《拆开 Claude Code：一个编码 agent 的 harness 内部长什么样》 ｜ https://xxchan.me/ai/2025/05/06/claude-code.html
## 反链

- [[对话加确定性缝合]]
- [[看对话 log]]
- [[REI-Bench]]
- [[Validation gates]]
- [[反向代理式窥探]]
