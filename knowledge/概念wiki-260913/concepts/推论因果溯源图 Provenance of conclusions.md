---
id: cm_927648fd
name: 推论因果溯源图
nameEn: Provenance of conclusions
type: CONCEPTUAL
subject: AI 内参 260912
domain: memory-retrieval
learningStage: when-needed
verification: judge
centrality: 0.181
depth: 0
origin: [neican]
aliases: ["Provenance of conclusions"]
sources: 1
---

# 推论因果溯源图 · Provenance of conclusions

> 每条推导结论都挂载证据树，记录由哪些基础事实与规则推出，可追问来源并顺藤摸瓜。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.181

## 费曼一下

在系统中，任何一条推导出的结论都挂载着一棵严密的证据树，详细记录了它是由哪条基础事实和哪条逻辑规则推导出来的。这使得人类能直接质问“你凭什么得出这个结论”，一旦发现源头虚假，即可精确顺藤摸瓜。

## 原文 context

Because Lemmalog already tracks the dependencies of derived facts, we can ask it for the provenance of a conclusion.

## 掌握证据（做到这些才算会）

- 能说出 Lemmalog 已跟踪推导事实的依赖关系，因而可查结论来源
- 能解释如何借溯源定位一条虚假的源头事实及其下游影响

## 验收问句

> 当有人问“你凭什么得出这个结论”，{{name}} 能给出什么？

## 懂了它才能懂（解锁 3）

- [[事实与推导的自动级联失效 Automatic invalidation of derived facts]] — 不懂推论因果溯源图，就做不了级联失效中顺藤摸瓜找到所有依赖该事实的结论。
- [[声明式逻辑记忆引擎 Datalog-based memory engine]] — 不懂推论因果溯源图，就做不了声明式逻辑记忆引擎在事实增删时重算依赖这件事。
- [[三层知识架构 Three-layer knowledge architecture]] — 不懂推论因果溯源图，就做不了三层知识架构中'带溯源技能'这一层的溯源追问。

## 出场

- AI 内参 260912 ｜ 《Some things should probably stay fuzzy》 ｜ https://pwning.systems/posts/llm-memory-program-analysis/

## 别名

`Provenance of conclusions`

## 反链

- [[三层知识架构 Three-layer knowledge architecture]]
- [[事实与推导的自动级联失效 Automatic invalidation of derived facts]]
- [[声明式逻辑记忆引擎 Datalog-based memory engine]]
