---
id: cm_dadcb3e5
name: Software 3.0
type: CONCEPTUAL
subject: AI 概念库
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [notion]
aliases: ["Software 3.0", "软件 3.0", "software three"]
sources: 1
---

# Software 3.0

> 用 prompt、context、tools 编程的第三种范式；context window 是操纵 LLM 解释器的杠杆。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 原文 context

<mention-page url="https://app.notion.com/p/202679b108ff8386979a01933594c9bc"/>
> Software 3.0 is about programming through prompting. What's in the context window is your lever over the interpreter, and the interpreter is the LLM. It interprets your context and performs computation in digital information space.
**费曼一下**：编程范式的第三阶段。
- **Software 1.0**：人显式写代码
- **Software 2.0**：人造数据集、目标和神经网络，程序学进权重
- **Software 3.0**：人通过 prompt、context、tools、examples、memory、instructions 来"编程"LLM
在 3.0 中，**context window 就是新程序**，**LLM 就是新解释器**，在数字信息空间里做计算。这是另一种程序：不那么精确，但更自适应。
例子：跨平台安装一个工具
- 旧世界：脆弱的 shell 脚本，充满条件判断
- 3.0：一段粘贴给 agent 的指令；agent 读本地环境、debug、自适应完成
---
来源：<mention-page url="https://app.notion.com/p/d6d679b108ff82debc5181b2c1ced4ff"/>（Sequoia AI Ascent 演讲原文）
> Software 3.0 now is kind of about... your programming now turns to prompting and what's in the context window is your lever over the interpreter that is the LLM.
**费曼一下（2026-05-03 补充）**：演讲原文里 Karpathy 把 Software 3.0 的「原生例子」举了两个——OpenClaw 安装与 MenuGen。它们的共同点是：以前要写 app / script，现在只需要写好「该粘给 agent 的那段文字」。Software 3.0 最深的转折不只是写代码加速，而是**「通用信息处理」本身被自动化**——能创造出过去根本不存在的东西（如个人 wiki / 知识库）。

## 掌握证据（做到这些才算会）

- 能对比 Software 1.0／2.0／3.0 各自「程序」存在哪里
- 能举出用一段指令替代脆弱 shell 脚本完成安装的例子

## 验收问句

> 按 {{name}} 的说法，你写的程序到底存在哪里？

## 相关

- [[Stochastic Graduate Descent]] · rejected（audit） — SGD 的梗源自 Stochastic Gradient Descent 的缩写与自嘲，和 Software 3.0 只是主题相邻，不通后者照样懂这个戏称。
- [[Skill]] · related-to（audit） — Software 3.0 是给 Skill 附加的一种解读视角/类比，不用这个框架 skill 文件夹照样能懂，属可选背景。
- [[外包思考，但不外包理解]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Agent-Native Infrastructure]] · 同篇出现（co-occurrence） — 同篇出现：notion
- [[Sensors 与 Actuators]] · 同篇出现（co-occurrence） — 同篇出现：notion

## 出场

- Notion 概念库 ｜ Notion 概念库 ｜ https://app.notion.com/p/Software-3-0-a49679b108ff839d80e801f62f65e4da

## 别名

`Software 3.0`、`软件 3.0`、`software three`

## 反链

- [[Skill]]
- [[Stochastic Graduate Descent]]
