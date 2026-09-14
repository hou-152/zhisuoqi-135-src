---
id: cm_d940bf8d
name: 上下文用量 / 上下文管理
nameEn: context usage / context management
type: CONCEPTUAL
subject: AI 内参 260912
domain: context-engineering
learningStage: now
verification: judge
centrality: 0.29
depth: 0
origin: [neican]
aliases: ["context usage / context management"]
sources: 1
---

# 上下文用量 / 上下文管理 · context usage / context management

> 对话中累积的信息量；搜索大量文件会使其膨胀，子代理只返回发现结果可显著改善管理。

**领域** context-engineering ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.29

## 费曼一下

上下文用量指对话中累积的信息量。搜索很多文件会让上下文膨胀，影响主对话聚焦；本文用子代理只返回发现结果来管理它。这个机制说明子代理不是装饰，而是大型搜索中的边界条件。

## 原文 context

正如我们在基础课程中所讲，了解并关注上下文用量很重要。如果您要搜索代码库中的许多文件，就会生成大量上下文。子代理仅返回其发现结果，让主对话保持聚焦，从而显著改善上下文管理。

## 掌握证据（做到这些才算会）

- 能解释为什么让子代理搜索能保持主对话聚焦
- 能说出上下文用量是使用智能体时需持续关注的对象

## 验收问句

> {{name}} 膨胀的典型原因是什么，本文用什么办法管理它？

## 懂了它才能懂（解锁 5）

- [[动态加载]] — 不懂【上下文用量 / 上下文管理】，就做不了动态加载的「按当前任务判断何时把技能完整内容加载进来、占多少上下文」这件事。
- [[@Branch 完整 diff 上下文]] — 不懂【上下文用量 / 上下文管理】，就做不了把当前分支的完整 diff 塞进提示词做跨文件评审的取舍。
- [[规则 Rules]] — 不懂【上下文用量 / 上下文管理】，就做不了决定「每次对话开始时都注入哪些规则文件、注入多少」这件事。
- [[代码库搜索]] — 不懂【上下文用量 / 上下文管理】，就做不了代码库搜索的策略选择——该搜索多广、何时改用子代理只返回发现结果以抑制上下文膨胀。
- [[图像输入]] — 不懂【上下文用量 / 上下文管理】，就做不了图像输入的判断——贴多大的设计稿或截图、贴几张才不挤掉其余上下文。

## 出场

- AI 内参 260912 ｜ 《理解您的代码库》 ｜ https://cursor.com/cn/learn/understanding-your-codebase

## 别名

`context usage / context management`

## 反链

- [[图像输入]]
- [[规则 Rules]]
- [[@Branch 完整 diff 上下文]]
- [[代码库搜索]]
- [[动态加载]]
