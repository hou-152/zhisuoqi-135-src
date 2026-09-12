---
id: cm_d9aa9fe0
name: 上下文
nameEn: context
type: CONCEPTUAL
subject: AI 概念库 × Context Engineering
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.134
depth: 2
origin: [notion, context]
aliases: ["Context", "context"]
sources: 3
---

# 上下文 · context

> 任何可刻画实体所处情境的信息；各相关实体表征的并集即上下文，也指模型读到的全部前文。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.134

## 费曼一下

上下文不只是"聊天记录"。你是谁、你在哪个目录、手边有什么工具、系统怎么配置，全都算。论文认为今天把它窄化成对话历史，是把一个宽概念用窄了。

## 原文 context

<mention-page url="https://app.notion.com/p/dd2679b108ff8334b27601ede39a4a2e"/>
> 上下文，说白了就是『前面说过的话』。模型处理一个新词的时候，不仅要理解这个词本身，还要理解它和前面所有词的关系。
**费曼一下**：模型读到的所有『前文』。新词的 Q 必须和所有前文的 K 比一遍才能『看到』全貌。上下文越长，理解越深，但带来 n² 计算和显存爆炸的代价。

## 掌握证据（做到这些才算会）

- 能对一个 Agent 系统列出相关实体并给出各自的情境表征
- 能解释上下文变长为何带来 n² 计算与显存代价

## 验收问句

> 按 {{name}}，这个场景里哪些信息算上下文？

## 先懂这些（前置 1）

- [[系统提示 System Prompt]] · **hard** — System Prompt 是模型生成响应前可见 Context 的组成之一。

## 懂了它才能懂（解锁 2）

- [[短上下文]] — 短上下文是上下文的一种裁剪形态，先懂上下文。
- [[自回归下输出也是上下文]] — 模型自回归生成也进入自身输入，先懂上下文含生成前全部信息

## 相关

- [[四阶段演化模型]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[意图翻译者 intention translator]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[原始上下文容忍度 tolerance for raw context]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[上下文协作 context-cooperative]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[最小充分性与语义连续性原则]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[分层记忆架构]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[上下文隔离 context isolation]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[self-baking]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[轻量引用 lightweight references]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[注意力之前的注意力 attention before attention]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[语义操作系统 semantic operating system]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[数字存在 Digital Presence]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[Tacit Knowledge】]] · 对照（概念边界） — 隐性知识在未被外化、选择并提供给模型之前，还不是模型当前可见的 Context。
- [[限界上下文】 bounded context]] · 对照（概念边界） — 限界上下文规定领域语言的适用边界，LLM 上下文则是当前推理可获得的信息集合。
- [[系统提示 System Prompt]] · 组成（运行时组成） — System Prompt 是模型生成响应前可见 Context 的组成之一。
- [[系统提示 System Prompt]] · 常一起用 — System Prompt 和可用工具定义都是来源列出的 Context 构成。
- [[交接模型 handoff model]] · 同篇出现（co-occurrence） — 同篇出现：context-11
- [[复杂被误认为精密 complexity looked like sophistication]] · 同篇出现（co-occurrence） — 同篇出现：context-11
- [[流程即工作 the process became the work]] · 同篇出现（co-occurrence） — 同篇出现：context-11
- [[熵减 entropy reduction]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[长上下文窗口]] · 对照（概念边界） — Context 是内容；窗口是承载与处理边界。
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-01
- [[Harness]] · 常一起用（系统职责轴） — Agent Harness 负责运行并在每轮装配 Context；前者是运行系统，后者是模型当前可见信息。
- [[Harness]] · 常一起用 — 具体 Agent 的运行由 harness 驱动，并由上下文与工具增强。
- [[Harness]] · 常一起用 — Harness 负责 workflow、Context、权限、评估与持久状态。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/530679b108ff824086158130cd051fd3
- Context Engineering ｜ 《论文《上下文工程 2.0》：给这门手艺补上它自己的上下文》 ｜ https://arxiv.org/pdf/2510.26493
- Context Engineering ｜ 《产品开发的下一阶段由上下文与行动能力驱动》 ｜ https://linear.app/next

## 别名

`Context`、`context`

## 反链

- [[长上下文窗口]]
- [[交接模型 handoff model]]
- [[系统提示 System Prompt]]
- [[分层记忆架构]]
- [[流程即工作 the process became the work]]
- [[注意力之前的注意力 attention before attention]]
- [[短上下文]]
- [[熵减 entropy reduction]]
- [[四阶段演化模型]]
- [[自回归下输出也是上下文]]
- [[最小充分性与语义连续性原则]]
- [[self-baking]]
- [[Tacit Knowledge】]]
- [[复杂被误认为精密 complexity looked like sophistication]]
- [[轻量引用 lightweight references]]
- [[上下文隔离 context isolation]]
- [[上下文协作 context-cooperative]]
- [[数字存在 Digital Presence]]
- [[限界上下文】 bounded context]]
- [[意图翻译者 intention translator]]
- [[语义操作系统 semantic operating system]]
- [[原始上下文容忍度 tolerance for raw context]]
