---
id: cm_a5b42ae5
name: harness–compute separation
type: CONCEPTUAL
subject: Harness Engineering
domain: safety-governance
learningStage: now
verification: judge
centrality: 0.126
depth: 1
origin: [harness]
aliases: []
sources: 1
---

# harness–compute separation

> 把 Agent 骨架与执行计算的沙箱环境分离，使模型生成的代码触不到凭证等敏感信息。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

把「带着 agent 运行的控制层」与「agent 在里面跑代码的执行层」分开。好处三个字：安全、持久、可扩展。模型生成的代码在 sandbox 里跑，而 credentials 住在 harness 端不给模型碰。

## 原文 context

Separating harness and compute helps keep credentials out of environments where model-generated code executes.

## 掌握证据（做到这些才算会）

- 能画出 harness 与 compute 两侧各自持有、不持有哪些凭证
- 能说出不分离时凭证被模型生成代码读取的具体路径

## 验收问句

> {{name}} 靠什么保证模型生成的代码拿不到凭证？

## 先懂这些（前置 2）

- [[exfiltration]] · **soft** — 隔离沙箱与骨架的目标之一就是防外泄，需先懂 exfiltration
- [[权限与推理的架构分离]] · **soft** — 不懂【权限与推理的架构分离】，就做不了【harness–compute separation】中骨架与计算沙箱之间的权限边界设计。

## 相关

- [[AWS VPC]] · rejected（audit） — VPC 是独立的云网络概念，其含义不依赖 harness–compute separation；这里只是「落地环境/例子」，关系反而更接近反向（分离目标才需要 VPC 这类网络层隔离）。
- [[Sandbox]] · 常一起用（运行时组成） — 沙箱承担被隔离的计算侧，是该分层模式的执行端。
- [[Agents SDK]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[model-native harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11
- [[Harness]] · 常一起用（运行时组成） — 该模式把 Harness 保留在控制侧，避免与模型生成代码的执行环境混成同一信任域。
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-11

## 出场

- Harness Engineering ｜ 《OpenAI Agents SDK 下一代演进：原生沙箱 + 模型原生 harness》 ｜ https://openai.com/index/the-next-evolution-of-the-agents-sdk/
## 反链

- [[Sandbox]]
- [[权限与推理的架构分离]]
- [[exfiltration]]
- [[model-native harness]]
- [[Agents SDK]]
- [[AWS VPC]]
