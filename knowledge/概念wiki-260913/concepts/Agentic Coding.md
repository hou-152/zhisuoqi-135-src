---
id: cm_8e23b5e7
name: Agentic Coding
type: CONCEPTUAL
subject: AI 概念库
domain: loop-autonomy
learningStage: now
verification: judge
centrality: 0.126
depth: 2
origin: [notion]
aliases: ["Agentic Coding Tasks", "agent 编程任务", "agent coding", "agentic programming"]
sources: 1
---

# Agentic Coding

> 让模型自主完成读代码、改代码、跑测试、反思再改的多步编程任务，考核的是能不能把活儿干完。

**领域** loop-autonomy ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 原文 context

<mention-page url="https://app.notion.com/p/a3f679b108ff822aa1b3813935a31783"/>
- **context**：
	> V4-Pro now ranks among the strongest open-source models on benchmarks for agentic coding tasks ... DeepSeek says it has specifically optimized V4 for popular agent frameworks such as Claude Code, OpenClaw, and CodeBuddy.
- **费曼一下**：让模型自主完成多步编程任务——读代码、改代码、跑测试、反思、再改。评估的不是单点 Q&A，而是"能不能把活儿干完"。是当前 frontier 模型最重要的实战赛道。
---
<mention-page url="https://app.notion.com/p/e14679b108ff82a79c9781937cfb2880"/>
- **context**：
	> 「DeepSeek V4 的特殊之处不只是模型能力，而是它支持 100 万 token 上下文，面向 agentic coding（智能体编程）和复杂多步任务。」
- **费曼一下**：硅谷 101 的视角进一步确认：agentic coding 不是模型可选项，而是 frontier 模型必争之地。100 万 token 上下文 = 为长链路 agentic coding 任务量身打造的舞台，「读代码 → 改代码 → 跑测试 → 修 bug」可以一次自己跑完。

## 掌握证据（做到这些才算会）

- 能说清 agentic coding 与单点代码问答在评估标准上的差别
- 能描述一个长链路编程任务的完整循环：读→改→测→反思

## 验收问句

> {{name}} 与普通代码补全在评估标准上的核心差别是什么？

## 先懂这些（前置 1）

- [[Agent loop]] · **soft** — 自主读改写测依赖循环反复驱动，正是 agent loop。

## 懂了它才能懂（解锁 1）

- [[长时程自治编码 long-running autonomous coding]] — 不懂【Agentic Coding】，就做不了【长时程自治编码】的 ⟨把编码自治推到以周为单位这件事⟩

## 相关

- [[Agentic workflows]] · rejected（audit） — 理由是「Agentic Coding 是 Agentic workflows 的实例」，这是子类/实例关系，靠的是特化而非前置，不懂一般工作流也能懂 Agentic Coding。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Agentic-Coding-775679b108ff8387a49a818f214ed1cc

## 别名

`Agentic Coding Tasks`、`agent 编程任务`、`agent coding`、`agentic programming`

## 反链

- [[Agent loop]]
- [[长时程自治编码 long-running autonomous coding]]
- [[Agentic workflows]]
