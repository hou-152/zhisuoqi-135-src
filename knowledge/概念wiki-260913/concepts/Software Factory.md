---
id: cm_8e7dfd61
name: Software Factory
type: CONCEPTUAL
subject: Harness Engineering
domain: agent-org
learningStage: when-needed
verification: judge
centrality: 0.181
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# Software Factory

> 长时间运行的 Agent 覆盖软件生命周期，企业选择自动化 repository、阶段及人工检查点。

**领域** agent-org ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.181

## 费曼一下

把写、测、审和部署组织成 Agent 生产线，但每家公司仍要决定哪些工位全自动、哪些必须人签字。

## 原文 context

长时间运行的 Agent 覆盖软件生命周期，企业选择自动化 repository、阶段及人工检查点。

## 掌握证据（做到这些才算会）

- 能画出一条从 repo 到发布、人只在检查点介入的流程
- 能指出当前哪些阶段还没被 Agent 接管

## 验收问句

> 在 {{name}} 里，人还剩哪几个检查点必须插手？

## 先懂这些（前置 1）

- [[Architecture Operator 分工]] · **soft** — 不懂【Architecture / Operator 分工】，就定不出软件工厂里人工检查点该由谁承担

## 懂了它才能懂（解锁 2）

- [[Lights-off 软件工厂]] — 不懂【Software Factory】，就做不了【Lights-off 软件工厂】的定义——它是去掉代码评审后的软件工厂形态
- [[Forward Deployed Engineer]] — 不懂【Software Factory】，就做不了 FDE 在客户组织落地长期 Agent 与自动化的方案

## 出场

- Harness Engineering ｜ 《2026 AI 工程五大趋势：从模型能力转向可靠系统》 ｜ https://www.latent.space/p/aiewf26trends
## 反链

- [[Architecture Operator 分工]]
- [[Forward Deployed Engineer]]
- [[Lights-off 软件工厂]]
