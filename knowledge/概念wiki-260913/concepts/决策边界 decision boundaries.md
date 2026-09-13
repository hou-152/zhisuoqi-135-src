---
id: cm_477781a9
name: 决策边界
nameEn: decision boundaries
type: CONCEPTUAL
subject: AI 内参 260912
domain: safety-governance
learningStage: now
verification: judge
centrality: 0.035
depth: 0
origin: [neican]
aliases: ["decision boundaries"]
sources: 1
---

# 决策边界 · decision boundaries

> 提示词里的权限线：哪些事必须事先征求同意、哪些可自主执行。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.035

## 费曼一下

决策边界是提示词里的权限线：哪些事必须事先请求同意，哪些可自主做。旧模型可能乱来，所以常用强硬措辞；Astra 只在确信安全时执行，强硬边界会被它认真执行，甚至在该继续时停下。这是理解自主与停止的机制边界。

## 原文 context

务必仔细定义边界。如果之前的模型未经许可擅自行动，您可能使用了较为强硬的措辞来要求它事先征求您的同意。这固然有用，但作为我们最契合的模型，GPT-6 Astra 的判断力要强得多，它只会在确信安全的情况下才会执行任务——因此，您应该以对待安全模型的方式来对待它。

> 如果你之前设定了界限，是为了防止其他模型走得太远，而现在你又要切换到 GPT-6 Astra，那么请考虑更新一下措辞：Astra 可能会过于认真对待，甚至在你希望它继续工作的情况下停止工作。

## 掌握证据（做到这些才算会）

- 能区分“必须请求同意”与“可自主执行”两类指令
- 能说明强硬边界为何让 Astra 在该继续时停下

## 验收问句

> {{name}} 写得过于强硬时，Astra 会出现什么行为？

## 出场

- AI 内参 260912 ｜ 《Rethinking skills and prompts for GPT-6 Astra | OpenAI Developers》 ｜ https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra

## 别名

`decision boundaries`
