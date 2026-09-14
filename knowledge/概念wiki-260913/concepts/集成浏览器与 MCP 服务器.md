---
id: cm_ec73ae4b
name: 集成浏览器与 MCP 服务器
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.144
depth: 1
origin: [neican]
aliases: []
sources: 1
---

# 集成浏览器与 MCP 服务器

> 让智能体自己开浏览器截图比对自己改的页面，或从 Figma MCP 取设计规格。

**领域** tools-sandbox ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.144

## 费曼一下

上一个概念里视觉反馈靠人手动粘贴，人就卡在回路中间。集成浏览器把这个环节交给智能体自己：它能自己开页面、截图、比对，从而"验证自己的视觉输出"；Figma MCP 让它直接从设计文件取 token 与组件规格，不必由人转述。二者的分界很清楚——图像输入是人给的材料，浏览器与 MCP 是智能体自取的反馈，后者把它从半自动变成了闭环。

## 原文 context

你还可以连接 Figma MCP 服务器，让智能体直接从你的 Figma 文件中提取设计 token、变量和组件规格。

集成浏览器可让你在智能体进行更改时预览效果。借助此浏览器，智能体可以浏览页面、截取屏幕截图并验证自己的视觉输出。这样你无需再手动将屏幕截图传回给智能体。

## 掌握证据（做到这些才算会）

- 能说出集成浏览器让智能体自己取视觉反馈的环节
- 能区分图像输入与浏览器/MCP 在反馈来源上的不同

## 验收问句

> 相比人工粘贴截图，{{name}}把哪个环节交给了智能体？

## 先懂这些（前置 2）

- [[集成浏览器]] · **hard** — 不懂【集成浏览器】就做不了【集成浏览器与 MCP 服务器】的 ⟨让智能体自己开浏览器截图比对自己改的页面⟩
- [[MCP 服务器]] · **hard** — 不懂【MCP 服务器】就做不了【集成浏览器与 MCP 服务器】的 ⟨从 Figma MCP 取设计规格⟩

## 出场

- AI 内参 260912 ｜ 《创建功能》 ｜ https://cursor.com/cn/learn/creating-features
## 反链

- [[集成浏览器]]
- [[MCP 服务器]]
