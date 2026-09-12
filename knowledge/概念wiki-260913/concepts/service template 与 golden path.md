---
id: cm_32dc32a9
name: service template 与 golden path
type: REPRESENTATIONAL
subject: Harness Engineering
domain: code-engineering
learningStage: when-needed
verification: accept
centrality: 0.181
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# service template 与 golden path

> 团队沿既定路径快速实例化新服务的现成实践，被用来类比 harness 未来按拓扑挑选。

**领域** code-engineering ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 只能认 ｜ **中心度** 0.181

## 费曼一下

golden path 是组织内被推荐的默认路线——照它走，脚手架、规范、工具链都是现成的。harness 若走上这条路，好处是新项目开局即有护栏，坏处是老问题会照搬过来：每个团队都把模板改成自己的样子，上游更新就再也合不回去。

## 原文 context

作者用来类比 harness 未来形态的现成实践：service template 帮团队沿 golden path 实例化新服务；她设想团队从一组 harness 里按应用拓扑挑一个开工，也预判了同样的 forking 与同步难题。

## 掌握证据（做到这些才算会）

- 能说明 service template 如何降低新服务起步成本
- 能指出 harness 分叉与同步会遇到的同类难题

## 验收问句

> {{name}} 能帮团队省掉哪一步起步工作？

## 先懂这些（前置 3）

- [[Harness evolution]] · **soft** — 类比 harness 按拓扑挑选，需先懂 harness 会持续演进。
- [[Executable Codebase]] · **soft** — 不懂【Executable Codebase】，就做不了【service template 与 golden path】的「让实例化出的新服务开箱即可启动测试」
- [[docsdecisions]] · **soft** — 不懂【docs/decisions/】，就做不了【service template 与 golden path】的「在模板中固化并解释关键架构决策」

## 相关

- [[无手打代码 no manually typed code at all]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：harness-01
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-01

## 出场

- Harness Engineering ｜ 《Martin Fowler 为「harness 工程」站台：Thoughtworks 的一线笔记》 ｜ https://martinfowler.com/articles/exploring-gen-ai/harness-engineering.html
## 反链

- [[Harness]]
- [[上下文工程 context engineering]]
- [[docsdecisions]]
- [[Executable Codebase]]
- [[Harness evolution]]
- [[无手打代码 no manually typed code at all]]
