---
id: cm_dc4f803b
name: 技能触发与自动使用
nameEn: Skill Triggering / Automatic Use
type: CONCEPTUAL
subject: AI 内参 260912
domain: context-engineering
learningStage: when-needed
verification: judge
centrality: 0.161
depth: 2
origin: [neican]
aliases: ["Skill Triggering / Automatic Use"]
sources: 1
---

# 技能触发与自动使用 · Skill Triggering / Automatic Use

> Claude 按请求与 description 的匹配自动触发技能，触发后才用 bash 读取 SKILL.md 正文。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.161

## 费曼一下

技能不是用户每次手动挑选的，而是 Claude 根据请求与 `description` 的匹配情况自动触发。触发之后，Claude 才会用 bash 读取 SKILL.md，把正文指令带进上下文。这个机制解释了为什么描述必须同时写“功能”和“使用时机”：描述本身就是触发判断的依据。

## 原文 context

Claude 会根据此元数据来判断是否触发技能，因此它必须同时说明技能的功能和使用时机。

当您请求的内容与技能描述相符时，Claude 会使用 bash 从文件系统中读取 SKILL.md 文件。只有这样，该文件的内容才会显示在上下文窗口中。

一旦技能在您的环境中可用，Claude 就会在与您的请求相关时自动使用它。

## 掌握证据（做到这些才算会）

- 能解释触发判断依据是技能描述而非正文
- 能描述触发后正文才进入上下文窗口

## 验收问句

> {{name}} 发生在读取 SKILL.md 之前还是之后？

## 先懂这些（前置 2）

- [[技能描述]] · **hard** — 不懂技能描述，就做不了技能触发与自动使用里的「按请求与 description 的匹配结果自动决定是否激活技能」
- [[语义匹配（semantic matching）与触发短语]] · **hard** — 不懂语义匹配与触发短语，就做不了技能触发与自动使用里的「靠请求与技能描述在含义上的重叠决定是否触发」

## 出场

- AI 内参 260912 ｜ 《Using Agent Skills with the API（用 API 使用 Agent Skills）》 ｜ https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview

## 别名

`Skill Triggering / Automatic Use`

## 反链

- [[技能描述]]
- [[语义匹配（semantic matching）与触发短语]]
