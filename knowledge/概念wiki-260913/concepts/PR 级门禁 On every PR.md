---
id: cm_4fa31dae
name: PR 级门禁
nameEn: On every PR
type: PROCEDURAL
subject: Context Engineering
domain: verification-eval
learningStage: when-needed
verification: use
centrality: 0.017
depth: 0
origin: [context]
aliases: ["On every PR"]
sources: 1
---

# PR 级门禁 · On every PR

> 让同一条链在每个 PR 上自动跑的同级门禁，不依赖作者是否记得调用。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.017

## 费曼一下

把你个人的自检清单，升级成公司大门口的安检。以前只有你出门会自觉检查，现在每个人进出都得过同一道安检门，谁都绕不过去，也不靠谁「记得」。

## 原文 context

第四种、也是最靠后的接入方式。链条对你自己的改动稳定后，同一套流程放到每个 PR 上跑，队友的改动过和你一样的门禁，「不管他有没有记得调用那条链」。基础设施和你写好的链是同一种东西，只是不再依赖作者的自觉。提醒：链条还在频繁变动时先别上，否则每次调整都成了全团队可见的事件。

## 掌握证据（做到这些才算会）

- 能在 CI 中把链条配成 PR 触发的工作流
- 能指出链条频繁变动时应先别上 PR 门禁

## 验收问句

> {{name}} 上了之后，队友忘记调用也会被拦吗？

## 相关

- [[把重复步骤编码成 Skill]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[skill-creator 访谈式创建]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[验证闭环 verification loop]] · 同篇出现（co-occurrence） — 同篇出现：context-12

## 出场

- Context Engineering ｜ 《用 Skills 在 Claude Code 里搭建验证闭环》 ｜ https://claude.com/blog/building-verification-loops-in-claude-code-with-skills

## 别名

`On every PR`

## 反链

- [[验证闭环 verification loop]]
- [[skill-creator 访谈式创建]]
- [[把重复步骤编码成 Skill]]
