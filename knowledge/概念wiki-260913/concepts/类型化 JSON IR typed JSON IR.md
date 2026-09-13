---
id: cm_01363896
name: 类型化 JSON IR
nameEn: typed JSON IR
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: spec-intent
learningStage: when-needed
verification: use
centrality: 0.144
depth: 0
origin: [neican]
aliases: ["typed JSON IR"]
sources: 1
---

# 类型化 JSON IR · typed JSON IR

> 代理先产出有 schema 的类型化 JSON 中间表示，作为可复现的源，再交给渲染编译。

**领域** spec-intent ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.144

## 费曼一下

代理不直接画 HTML/SVG，而是先产出有 schema 的 JSON 中间表示。这个 IR 是可复现的源，渲染、验证和后续迭代都围绕它。拿掉它，就理解不了为什么 Archify 能确定性地编译和验证。

## 原文 context

代理生成类型化的 JSON IR；Archify 确定性地将其编译为 HTML/SVG。

Typed JSON IR — every renderer-backed mode has a schema and reproducible source.

## 掌握证据（做到这些才算会）

- 能说出每个 renderer-backed 模式都有 schema 与可复现源
- 能按 schema 读懂或改写一份 IR 而不是直接改 HTML/SVG

## 验收问句

> 代理在生成 {{name}} 时，为什么不直接产出 HTML/SVG？

## 懂了它才能懂（解锁 2）

- [[五种图表类型 Architecture Workflow Sequence Data Flow Lifecycle]] — 不懂类型化 JSON IR 的 schema 与字段，就做不了五种图表类型各自的 prompt 信息骨架——不知道 Architecture/Workflow/Sequence/Data Flow/Lifecycle 每类该让代理产出哪些节点、哪些字段。
- [[真实交互 truthful interaction]] — 不懂类型化 JSON IR 里作者定义的节点关系，就做不了真实交互里的聚焦、上下游、路径、角色比较与故事——没有可复用的关系源，只能自己发明拓扑。

## 出场

- AI 内参 260912 ｜ 《Archify》 ｜ https://github.com/tt-a1i/archify

## 别名

`typed JSON IR`

## 反链

- [[五种图表类型 Architecture Workflow Sequence Data Flow Lifecycle]]
- [[真实交互 truthful interaction]]
