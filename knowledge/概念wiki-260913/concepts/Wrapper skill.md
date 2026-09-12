---
id: cm_da125473
name: Wrapper skill
type: PROCEDURAL
subject: Context Engineering
domain: verification-eval
learningStage: when-needed
verification: use
centrality: 0.072
depth: 3
origin: [context]
aliases: []
sources: 1
---

# Wrapper skill

> 自建包装 skill，先调用原 skill，再调用自己的验证 skill，为改不了的 skill 补上验证。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.072

## 费曼一下

你不能改别人做好的黑盒机器，但可以给它套一个自己的外壳：外壳先把东西喂进黑盒，黑盒吐出结果后，外壳再接一道你自己的检查。机器没动，验证却加上了。

## 原文 context

链式的一个专门用法——给「你改不了的 skill」加验证。做一个自定义包装 skill，先调用原 skill，再调用你的验证 skill。原文例子 safe-refactor：先对当前 diff 跑 /simplify，结束后调用 /verify-no-public-api-changes。它是绕过「可编辑性边界」的正解。

## 掌握证据（做到这些才算会）

- 能说出包装 skill 的调用顺序
- 能举 safe-refactor 例子说明链式做法

## 验收问句

> {{name}} 怎么给一个你改不了的 skill 加上验证？

## 先懂这些（前置 1）

- [[Self-verification]] · **soft** — 包装 skill 的核心是给原 skill 补上自检环节。

## 相关

- [[把重复步骤编码成 Skill]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[skill-creator 访谈式创建]] · 同篇出现（co-occurrence） — 同篇出现：context-12
- [[验证闭环 verification loop]] · 同篇出现（co-occurrence） — 同篇出现：context-12

## 出场

- Context Engineering ｜ 《用 Skills 在 Claude Code 里搭建验证闭环》 ｜ https://claude.com/blog/building-verification-loops-in-claude-code-with-skills
## 反链

- [[skill-creator 访谈式创建]]
- [[验证闭环 verification loop]]
- [[Self-verification]]
- [[把重复步骤编码成 Skill]]
