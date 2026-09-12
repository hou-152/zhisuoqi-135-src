---
id: cm_4bceb333
name: Skill Files
type: REPRESENTATIONAL
subject: Harness Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.072
depth: 0
origin: [harness]
aliases: []
sources: 1
---

# Skill Files

> 可复用的 markdown 文档，只教模型怎么做，不定义做什么，目标由用户提供。

**领域** context-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

Skill file 是用 markdown 写的可复用流程文档，告诉模型“怎么做”。用户提供“做什么”，skill 提供“过程”。关键洞察是它像函数调用——接受参数，同一个流程用不同参数可以生成截然不同的能力。Garry 认为这不是 prompt engineering，而是“software design, using markdown as the programming language and human judgment as the runtime”。

## 原文 context

"A skill file is a reusable markdown document that teaches the model *how* to do something. Not what to do — the user supplies that. The skill supplies the process."

## 掌握证据（做到这些才算会）

- 能写出一个只含流程、不含具体任务的 skill file
- 能区分 what to do 由用户给、how 由 skill 给

## 验收问句

> {{name}} 该写 what to do 还是 how to do，为什么？

## 懂了它才能懂（解锁 1）

- [[Skill]] — 不懂【SKILL.md】的 frontmatter＋body 契约，就做不了【Skill Files】的 ⟨按最小结构编写可复用 skill⟩

## 相关

- [[Context Bloat]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[Skill-as-method-call]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[Learning Loop]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[Resolver]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[Latent vs Deterministic]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[Diarization]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[Thin Harness, Fat Skills]] · 同篇出现（co-occurrence） — 同篇出现：harness-24
- [[Skill]] · related-to（audit） — 两者几乎是同一物的两种表述（Skill 文件夹里的 markdown 正文），甚至更像反向包含关系；作为前置依赖冗余，应合并或删除。
- [[skill-creator 访谈式创建]] · related-to（audit） — 与 [6] 重复：产出物本质是 skill 契约，Skill Files 只是其内容形态的局部视角，单独作为前置立不住，建议合并进 [6]。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-24

## 出场

- Harness Engineering ｜ 《Thin Harness, Fat Skills：harness 才是真正的产品》 ｜ https://x.com/garrytan/status/2042925773300908103/
## 反链

- [[Skill]]
- [[Skill-as-method-call]]
- [[skill-creator 访谈式创建]]
- [[Latent vs Deterministic]]
- [[Resolver]]
- [[Thin Harness, Fat Skills]]
- [[Context Bloat]]
- [[Learning Loop]]
- [[Diarization]]
