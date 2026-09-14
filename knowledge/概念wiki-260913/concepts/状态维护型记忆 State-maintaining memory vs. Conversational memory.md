---
id: cm_6105c3cd
name: 状态维护型记忆
nameEn: State-maintaining memory vs. Conversational memory
type: CONCEPTUAL
subject: AI 内参 260912
domain: memory-retrieval
learningStage: when-needed
verification: judge
centrality: 0.144
depth: 0
origin: [neican]
aliases: ["State-maintaining memory vs. Conversational memory"]
sources: 1
---

# 状态维护型记忆 · State-maintaining memory vs. Conversational memory

> 不只是记录说过什么，而是维护一份当前已知事实的状态；前提被推翻时相应认知随之更新。

**领域** memory-retrieval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.144

## 费曼一下

指不仅记录过去说了什么话，而且时刻维护一份经过逻辑校验的“当前已知事实清单”。在复杂任务中，当一个前提被推翻后，普通对话记忆会同时保留新旧矛盾，而状态型记忆会联动清理所有下游推论。

## 原文 context

我希望它能**保持我们目前所知的状态**。

显然，告诉一个法学硕士（LLM）某些事情是错误的，并不一定意味着它会停止相信所有依赖于它的事情 :)

## 掌握证据（做到这些才算会）

- 能区分状态维护型记忆与对话记忆的差别
- 能指出“告诉模型某事是错的”并不等于它停止相信所有依赖它的推论

## 验收问句

> 与普通对话记忆相比，{{name}} 多维护了什么？

## 懂了它才能懂（解锁 2）

- [[事实与推导的自动级联失效 Automatic invalidation of derived facts]] — 不懂状态维护型记忆，就做不了观察变化时前提被推翻后相应认知随之更新的级联失效。
- [[模糊与确定性解耦范式 Fuzzy-Deterministic split]] — 不懂状态维护型记忆，就做不了模糊与确定性解耦中确定性引擎负责的状态推导与一致性维护。

## 出场

- AI 内参 260912 ｜ 《Some things should probably stay fuzzy》 ｜ https://pwning.systems/posts/llm-memory-program-analysis/

## 别名

`State-maintaining memory vs. Conversational memory`

## 反链

- [[事实与推导的自动级联失效 Automatic invalidation of derived facts]]
- [[模糊与确定性解耦范式 Fuzzy-Deterministic split]]
