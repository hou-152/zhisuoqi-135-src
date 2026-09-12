---
id: cm_daaeed70
name: preferences 写入过滤
type: CONCEPTUAL
subject: Context Engineering
domain: safety-governance
learningStage: when-needed
verification: judge
centrality: 0.045
depth: 1
origin: [context]
aliases: []
sources: 1
---

# preferences 写入过滤

> 八类偏好即使被明说也不写进 /preferences.md，避免未来模型继承不诚实、不安全的指令。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.045

## 费曼一下

偏好系统本身可以被用来给模型做长期洗脑，所以持久化层要有自己的审查。而且写入过滤会漏，所以读取时再过一遍——两道同向的门，是安全工程里的常规配置。

## 原文 context

有些偏好即使用户直说也不写进 /preferences.md：无条件肯定、压制分歧、不表达对福祉的担心、培养情感依赖、停止质疑、假装用户有更高权限、违反使用政策。理由是未来的模型不该继承一条"少一点诚实、少一点安全"的指令；同时读取端还设了第二道，把泄漏的内容视为不存在。

## 掌握证据（做到这些才算会）

- 能列举至少三类被拒绝写入的偏好
- 能说明读取端还设有第二道过滤

## 验收问句

> 用户直接要求「永远别反对我」时，{{name}} 该怎么处理？

## 先懂这些（前置 1）

- [[遗漏式隐私]] · **soft** — 偏好过滤是遗漏式隐私在记忆与偏好层的具体应用

## 相关

- [[判定程序化写法]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[反自我合理化条款]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[fail-closed 默认]] · 同篇出现（co-occurrence） — 同篇出现：context-20

## 出场

- Context Engineering ｜ 《Opus 5 系统提示词全文流出：一份近两万字的 agent 行为说明书》 ｜ https://github.com/Eversmile12/leaked-llm-prompts/blob/main/Anthropic/opus-5.md
## 反链

- [[判定程序化写法]]
- [[fail-closed 默认]]
- [[反自我合理化条款]]
- [[遗漏式隐私]]
