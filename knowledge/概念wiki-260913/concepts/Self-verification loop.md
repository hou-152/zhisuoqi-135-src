---
id: cm_a85cb1f1
name: Self-verification loop
type: PROCEDURAL
subject: Harness Engineering
domain: verification-eval
learningStage: now
verification: use
centrality: 0.181
depth: 3
origin: [harness]
aliases: []
sources: 1
---

# Self-verification loop

> 由浏览器、日志、截图、测试器支撑，让 Agent 写码、跑测、看日志、改错的回路。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.181

## 费曼一下

让 agent 长出眼睛。只会写不会看的 agent，错了也不知道错在哪；能跑测试、能读日志、能截图对照，它才第一次拥有了「我干得对不对」这个信号——而所有自我改进都要从这个信号开始。

## 原文 context

由 browser、logs、screenshots、test runners 这类观察工具支撑，让 agent 能「write application code, run tests, inspect logs, and fix errors」。在长时程章节进一步展开为两条实现路径：harness 的 hooks 跑预定义测试并在失败时回灌错误信息，或提示模型独立自评代码。作者指出验证的价值是把解法锚定在测试上，并创造自我改进的反馈信号。

## 掌握证据（做到这些才算会）

- 能按写码—跑测试—看日志—修错的顺序搭出回路
- 能说清 hooks 跑预定义测试与模型自评两条实现路径

## 验收问句

> {{name}} 里错误信息怎么回到模型手上？

## 先懂这些（前置 3）

- [[Verifiable Codebase]] · **hard** — 闭环靠浏览器、测试等可验证工具支撑。
- [[验证子系统与可运行的证据]] · **hard** — 不懂【验证子系统与可运行的证据】，就做不了【Self-verification loop】的 ⟨给循环一个可判定终止条件——没有测试/lint 跑出的结果，循环不知道何时算做完⟩
- [[Self-verification]] · **soft** — 回路是自检能力在写码-跑测-改错上的具体形态。

## 相关

- [[Agent = Model + Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness 工程 Harness Engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-02
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-02

## 出场

- Harness Engineering ｜ 《LangChain 解剖 agent harness：Agent = 模型 + harness》 ｜ https://blog.langchain.com/the-anatomy-of-an-agent-harness/
## 反链

- [[Harness]]
- [[Harness 工程 Harness Engineering]]
- [[验证子系统与可运行的证据]]
- [[Self-verification]]
- [[Agent = Model + Harness]]
- [[Verifiable Codebase]]
