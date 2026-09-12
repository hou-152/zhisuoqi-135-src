---
id: cm_2cbdf384
name: 技能验证器
nameEn: agent skills verifier
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: verification-eval
learningStage: when-needed
verification: use
centrality: 0.144
depth: 1
origin: [neican]
aliases: ["agent skills verifier"]
sources: 1
---

# 技能验证器 · agent skills verifier

> 命令行技能验证器，用 uv 安装最快，用于在深入调试前先捕获结构性问题。

**领域** verification-eval ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.144

## 费曼一下

一个命令行工具，安装后用 uv 最快，可在技能目录或任意位置运行。它的定位是排查流程的起点——在调用更耗时的调试之前，先把结构性、配置性错误挡在前面。所以凡是怀疑"结构有问题"的地方（包括插件），都会被指向它。

## 原文 context

首先应该尝试的是 agent skills verifier 命令。安装步骤因操作系统而异，但使用 uv 是最快捷的设置方式。

验证器会在您花时间调试其他问题之前，先捕获结构性问题。

## 掌握证据（做到这些才算会）

- 能说出它是排查的起点工具且可用 uv 安装
- 能在技能目录或任意位置运行它检查技能结构

## 验收问句

> {{name}} 用来做什么？建议放在排查流程哪一步？

## 先懂这些（前置 1）

- [[确认环节可以合并，但不能省略]] · **soft** — 不懂【确认环节可以合并，但不能省略】，就做不了【技能验证器】里「把它定位成深入调试前的结构性筛查、通过不等于放行」这件事——会拿命令行的通过结果顶替人的判断。

## 懂了它才能懂（解锁 1）

- [[让 Agent 自行验证]] — 不懂【技能验证器】，就做不了【让 Agent 自行验证】里「给 Agent 挂一个在命令行先捕获技能结构性问题的自检关卡」这件事。

## 出场

- AI 内参 260912 ｜ 《Claude 官方课程 · 第 6 课：技能排障》 ｜ https://academy.claude.com/zh-CN/courses/introduction-to-agent-skills/troubleshooting-skills

## 别名

`agent skills verifier`

## 反链

- [[确认环节可以合并，但不能省略]]
- [[让 Agent 自行验证]]
