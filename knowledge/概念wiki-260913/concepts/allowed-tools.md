---
id: cm_53ec7c9b
name: allowed-tools
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.179
depth: 1
origin: [neican]
aliases: ["可选字段"]
sources: 1
---

# allowed-tools

> 可选字段，列出技能激活时免许可可用的工具；省略则不限制，回到正常权限模型

**领域** tools-sandbox ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.179

## 费曼一下

这是技能激活期间的权限白名单。列进去的工具可以免许可直接调用；列不进去的能力（编辑、写入）在这个技能里被挡死。反向边界同样重要：完全省略该字段就等于不设限，克劳德回到正常权限模型。作者把它推荐给只读任务、高安全要求或需要设护栏的工作流程。

## 原文 context

allowed-tools（可选）— 限制克劳德在技能激活时可以使用的工具。

allowed-tools限制克劳德在技能激活时可以使用的工具——适用于只读或对安全性要求较高的工作流程。

当这项技能激活时，克劳德无需请求许可即可使用这些工具——不能编辑，也不能写作。

如果完全省略allowed-tools，该技能不会限制任何内容。克劳德使用其正常的权限模型。

## 掌握证据（做到这些才算会）

- 能说明列入的工具免许可、编辑与写入被挡死
- 能指出完全省略该字段等于不设限

## 验收问句

> {{name}}完全省略时，技能激活期间的权限会怎样？

## 先懂这些（前置 2）

- [[运行时限制、权限与数据保留边界 Runtime Limitations, Constraints, and Retention]] · **hard** — 不懂【运行时限制、权限与数据保留边界】里的正常权限模型与 ZDR 不覆盖的前提，就做不了 allowed-tools 的 ⟨判断省略该字段后技能回到什么样的默认权限⟩
- [[MCP servers]] · **soft** — 不懂【MCP servers】是提供外部工具与集成、与 skills 完全不同的类别，就做不了 allowed-tools 的 ⟨把 MCP 提供的外部工具列进免许可可用工具清单⟩

## 出场

- AI 内参 260912 ｜ 《Claude 官方课程 · 第 3 课：写好 name 与 description》 ｜ https://academy.claude.com/courses/introduction-to-agent-skills/configuration-and-multi-file-skills

## 别名

`可选字段`

## 反链

- [[MCP servers]]
- [[运行时限制、权限与数据保留边界 Runtime Limitations, Constraints, and Retention]]
