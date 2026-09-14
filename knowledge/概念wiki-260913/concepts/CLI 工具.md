---
id: cm_4fb030a3
name: CLI 工具
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: tools-sandbox
learningStage: when-needed
verification: use
centrality: 0.124
depth: 0
origin: [neican]
aliases: []
sources: 1
---

# CLI 工具

> 智能体可直接在终端执行的已装程序，如 gh、aws、kubectl、docker。

**领域** tools-sandbox ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能用 ｜ **中心度** 0.124

## 费曼一下

CLI 工具是智能体可以直接在终端执行的外部程序。与 MCP 不同，它们不需要额外配置，只要终端里安装了就能用。作者用 `gh`、`aws`、`kubectl`、`docker` 说明智能体能操作 GitHub、云服务、Kubernetes、Docker 等。规则还可以指定某类操作该用哪个 CLI 工具。它补全了智能体扩展操作能力的另一条路径。

## 二、概念架构图

```mermaid
flowchart TB
  subgraph L0[主体]
    Agent["编码智能体"]
  end

  subgraph L1[两层自定义方式]
    Rules["规则"]
    Skills["技能"]
  end

  subgraph L2[加载与成本机制]
    Dynamic["动态加载"]
    Cost["上下文成本"]
    Guard["防护措施"]
  end

  subgraph L3[能力扩展]
    MCP["MCP（模型上下文协议）"]
    CLI["CLI 工具"]
  end

  Agent -->|每次对话开始时看到| Rules
  Agent -->|根据当前任务决定何时使用| Skills
  Agent -->|输入 / 按需调用| Skills

  Skills -->|会| Dynamic
  Dynamic -->|使完整上下文仅在调用时使用| Cost
  Rules -->|始终占用上下文空间| Cost
  Cost -->|规则过多会占用不必要上下文| Rules
  Cost -->|偶尔需要的内容放入技能| Skills

  Rules -->|可包含| Guard
  Rules -->|通过规则指定实用工具| CLI

  MCP -->|让智能体连接外部工具并获取相关上下文| Agent
  CLI -->|无需额外配置即可直接执行| Agent
```

## 原文 context

除 MCP 外，智能体还可以运行终端中安装的任何 CLI 工具。`gh`、`aws`、`kubectl` 和 `docker` 等工具无需额外配置即可使用。智能体可以直接执行这些工具。

通过规则为智能体指定实用工具：

- 所有 GitHub 操作（问题、PR、CI 检查）均使用 `gh`

- 文件存储操作使用 `aws s3`

## 掌握证据（做到这些才算会）

- 能说出 CLI 工具与 MCP 在配置要求上的区别
- 能通过规则指定某类操作使用哪个 CLI 工具

## 验收问句

> 为什么{{name}}不需要额外配置就能被智能体使用？

## 懂了它才能懂（解锁 1）

- [[精确字符串查找 grep grep ripgrep Instant Grep]] — 不懂【CLI 工具】就做不了【精确字符串查找 / grep】的 ⟨在智能体终端里直接执行 grep 进行递归搜索⟩

## 出场

- AI 内参 260912 ｜ 《自定义 Agent》 ｜ https://cursor.com/cn/learn/customizing-agents
## 反链

- [[精确字符串查找 grep grep ripgrep Instant Grep]]
