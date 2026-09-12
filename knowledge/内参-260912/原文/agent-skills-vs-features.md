# Claude 官方课程 · Skills 与其他 Claude Code 功能的比较

- 来源：academy.claude.com
- 原文：https://academy.claude.com/zh-CN/courses/introduction-to-agent-skills/skills-vs-other-claude-code-features
- 抓取：Reader 快照（2026-09-12）
- 字数：1766

---

Watch on YouTube(opens in new tab) 
 
CLAUDE.md 会加载到每次对话中，最适合用于始终生效的项目标准。Skills 按需加载，最适合用于特定任务的专业知识 
Subagents 在隔离的执行上下文中运行——用于委派工作。Skills 则为您当前的对话添加知识 
Hooks 是事件驱动的（在文件保存、工具调用时触发）。Skills 是请求驱动的（根据您的请求内容激活） 
MCP servers 提供外部工具和集成——这与 skills 完全是不同的类别 
每个功能都各有专长——将它们结合使用，而不是把所有事情都硬塞进一种方案中 
Claude Code 提供了多种自定义选项：Skills、CLAUDE.md、subagents、hooks 和 MCP servers。它们解决的是不同的问题，了解何时使用哪一种可以避免您构建出错误的方案。让我们逐一分析。
CLAUDE.md 会始终加载到每次对话中。如果您希望 Claude 在您的项目中使用 TypeScript 严格模式，请将其写入您的 CLAUDE.md 文件。
Skills 按需加载。当 Claude 将某个请求与某个 skill 匹配时，该 skill 的指令就会加入对话。当您在编写新代码时，您的 PR 审查清单并不需要出现在上下文中——它只在您请求审查时才会激活。
在以下情况使用 CLAUDE.md：
 
始终适用的项目级标准 
诸如"永远不要修改数据库架构"之类的约束 
框架偏好和编码风格 
在以下情况使用 Skills：
 
特定任务的专业知识 
只在某些情况下才相关的知识 
会使每次对话都变得杂乱的详细流程 
Skills 会为您当前的对话添加知识。当某个 skill 激活时，其指令会加入现有的上下文。
Subagents 在独立的上下文中运行。它们接收一个任务，独立完成工作，然后返回结果。它们与主对话是隔离的。
在以下情况使用 Subagents：
 
您想将任务委派给一个独立的执行上下文 
您需要与主对话不同的工具访问权限 
您希望将委派的工作与主上下文隔离开来 
在以下情况使用 Skills：
 
您想为当前任务增强 Claude 的知识 
该专业知识适用于整个对话过程 
Hooks 在事件发生时触发。某个 hook 可能会在 Claude 每次保存文件时运行代码检查工具，或在特定工具调用之前验证输入。它们是事件驱动的。
Skills 是请求驱动的。它们根据您的请求内容激活。
在以下情况使用 Hooks：
 
应在每次文件保存时运行的操作 
特定工具调用之前的验证 
Claude 操作的自动化副作用 
在以下情况使用 Skills：
 
影响 Claude 处理请求方式的知识 
影响 Claude 推理过程的指导原则 
一个典型的配置可能包括：
 
CLAUDE.md —— 始终生效的项目标准 
Skills —— 按需加载的特定任务专业知识 
Hooks —— 由事件触发的自动化操作 
Subagents —— 用于委派工作的隔离执行上下文 
MCP servers —— 外部工具和集成 
每种功能都各有专长。当其他选项更合适时，不要把所有事情都硬塞进 skills 中——而且您可以同时使用多种功能。Skills 提供自动化的特定任务专业知识，CLAUDE.md 用于始终生效的指令，subagents 在隔离的上下文中运行，hooks 在事件发生时触发，而 MCP 提供外部工具。
当您拥有应在相关主题出现时由 Claude 自动应用的知识时，请使用 skills，并将其与其他功能结合使用，以实现全面的自定义。
 
查看您当前的 CLAUDE.md 文件。其中是否有内容更适合作为 skill（仅在相关时加载）？ 
思考您团队的开发工作流程。哪种 Claude Code 功能组合（skills、hooks、subagents、MCP）能解决您最常遇到的痛点？ 
在下一课中，您将学习如何与您的团队和组织共享 skills——从将它们提交到代码仓库，到通过插件分发，再到通过托管设置在企业范围内部署。
这对您有帮助吗？
上一课配置与多文件技能下一课共享技能
