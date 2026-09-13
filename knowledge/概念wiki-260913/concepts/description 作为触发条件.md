---
id: cm_aad08abd
name: description 作为触发条件
type: PROCEDURAL
subject: Context Engineering
domain: context-engineering
learningStage: now
verification: use
centrality: 0.126
depth: 2
origin: [context]
aliases: []
sources: 1
---

# description 作为触发条件

> 在 frontmatter 的 description 里写清「什么时候用」，以此决定该 skill 何时被自动拉进上下文。

**领域** context-engineering ｜ **类型** PROCEDURAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.126

## 费曼一下

相当于卡片上的「适用场景」贴纸。写清楚「碰到 X 情况就翻我出来」，系统才会在对的时刻主动想起这张卡；贴纸写得含糊，卡片就躺在抽屉里没人用。

## 原文 context

frontmatter 里最关键的一行。示例把 description 写成「…Use when the diff touches error handling or logging.」，用一句「什么时候用」决定这个 skill 何时被自动拉进来。文章排查嵌入失效时明确指出：如果追加的检查没跑，「就是 skill 的 description 或前面的指令没把它拉进来」。

## 掌握证据（做到这些才算会）

- 能给一个 skill 写出含明确触发条件的 description
- 能在 skill 未被拉入时优先排查 description 与前置指令

## 验收问句

> {{name}} 该怎么写，才能让 skill 在该用时被拉进来？

## 先懂这些（前置 2）

- [[Agent Skills]] · **hard** — description 是 skill frontmatter 的字段，不懂 Skill 结构就无从谈触发
- [[Skill]] · **hard** — 不懂【Skill】，就做不了【description 作为触发条件】里在 frontmatter 写清何时加载该技能

## 相关

- [[把重复步骤编码成 Skill]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[skill-creator 访谈式创建]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[验证闭环 verification loop]] · 同篇出现（co-occurrence） — 同篇出现：context-12

## 出场

- Context Engineering ｜ 《用 Skills 在 Claude Code 里搭建验证闭环》 ｜ https://claude.com/blog/building-verification-loops-in-claude-code-with-skills
## 反链

- [[Skill]]
- [[skill-creator 访谈式创建]]
- [[验证闭环 verification loop]]
- [[把重复步骤编码成 Skill]]
- [[Agent Skills]]
