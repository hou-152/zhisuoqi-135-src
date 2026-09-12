---
id: cm_cb329146
name: description
type: CONCEPTUAL
subject: AI 内参 260912
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.07
depth: 0
origin: [neican]
aliases: ["必填字段"]
sources: 1
---

# description

> 必填字段，≤1024 字符，是匹配依据，须写清技能作用与何时使用它

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.07

## 费曼一下

description 是克劳德做匹配的依据：它拿当前请求去比对描述，判断这个技能相不相关，从而决定是否启用。因此它必须回答两个问题——技能有什么作用、克劳德应在什么情况下用它；上限 1024 字符。它还连着一条排查规则：技能没在预期时机触发，就往描述里补上与真实请求措辞一致的关键词。写法上不要写"帮忙处理文件"这类含糊指令，要说清楚具体做什么。

## 原文 context

描述（必填）— 告诉克劳德何时使用该技能。最多 1024 个字符。这是最重要的字段，因为克劳德会用它来进行匹配。

好的描述应该回答两个问题：这项技能有什么作用？克劳德应该在什么情况下使用它？

如果你的技能没有在预期的时间触发，请尝试添加更多与你实际请求措辞相匹配的关键词。克劳德会根据描述来判断技能是否相关，所以措辞很重要。

指示要明确。如果有人告诉你"你的工作是帮忙处理文件"，你肯定不知道该怎么做——克劳德也是这么想的。

## 掌握证据（做到这些才算会）

- 能写出回答'做什么、何时用'的描述
- 能说出未按预期触发时可补上与真实请求措辞一致的关键词

## 验收问句

> {{name}}要回答哪两个问题？写含糊会有什么后果？

## 出场

- AI 内参 260912 ｜ 《Claude 官方课程 · 第 3 课：写好 name 与 description》 ｜ https://academy.claude.com/courses/introduction-to-agent-skills/configuration-and-multi-file-skills

## 别名

`必填字段`
