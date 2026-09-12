---
id: cm_07e5e0c3
name: 文件系统型代码执行环境
nameEn: Filesystem-based Code Execution Environment
type: CONCEPTUAL
subject: AI 内参 260912
domain: harness-runtime
learningStage: when-needed
verification: judge
centrality: 0.052
depth: 0
origin: [neican]
aliases: ["Filesystem-based Code Execution Environment"]
sources: 1
---

# 文件系统型代码执行环境 · Filesystem-based Code Execution Environment

> 技能以目录形式存在于带文件系统、bash 与代码执行的虚拟机中，可读文件、跑脚本。

**领域** harness-runtime ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.052

## 费曼一下

技能不是纯文本提示，而是放在虚拟机目录里的文件包。Claude 在这个环境中有文件系统访问、bash 命令和代码执行能力，可以像人操作电脑文件一样读取 SKILL.md、引用其他文件、运行脚本。这个环境解释了技能为什么能包含脚本和资源，也解释了为什么脚本代码本身不必进入上下文，只有输出会进入。

## 原文 context

Skills 利用 Claude 的虚拟机环境，提供仅凭提示无法实现的功能。Claude 在具有文件系统访问权限的虚拟机中运行，使得 Skills 可以以目录的形式存在，其中包含指令、可执行代码和参考资料，其组织方式类似于您为新团队成员创建的入职指南。

Skills run in a code execution environment where Claude has filesystem access, bash commands, and code execution capabilities. Skills exist as directories on a virtual machine, and Claude interacts with them using the same bash commands you'd use to navigate files on your computer.

When a Skill is triggered, Claude uses bash to read SKILL.md from the filesystem, bringing its instructions into the context window.

## 掌握证据（做到这些才算会）

- 能说明技能是虚拟机上的目录而非纯文本提示
- 能解释脚本代码不必进上下文、只有输出进入

## 验收问句

> {{name}} 为什么能让技能包含脚本和参考文件？

## 出场

- AI 内参 260912 ｜ 《Using Agent Skills with the API（用 API 使用 Agent Skills）》 ｜ https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview

## 别名

`Filesystem-based Code Execution Environment`
