# Claude 官方课程 · 第 2 课：技能的结构（SKILL.md 与 frontmatter）

- 来源：academy.claude.com
- 原文：https://academy.claude.com/courses/introduction-to-agent-skills/creating-your-first-skill
- 抓取：Reader 快照（2026-09-12）
- 字数：1845

---

在 YouTube 上观看（在新标签页中打开） 
 
技能是一个目录，其中包含一个SKILL.md文件，该文件的前言部分包含元数据（名称、描述），后言部分包含说明。 
Claude在启动时仅加载技能名称和描述，然后使用语义匹配将传入的请求与这些描述进行匹配。 
在克劳德将全部技能内容加载到上下文之前，你会收到一个确认提示。 
名称冲突优先级：企业版 → 个人版 → 项目版 → 插件版 
要更新技能，请编辑其配置SKILL.md文件。要删除技能，请删除其配置文件目录。请务必重启 Claude Code以使更改生效。 
让我们从头开始创建一个技能，然后看看 Claude Code 如何在后台加载和匹配技能。
我们将创建一个个人技能，教 Claude 如何以统一的格式撰写 PR 描述。由于这是一项个人技能，它将位于您的主目录中，并适用于您的所有项目。
首先，在技能文件夹内创建一个用于存放技能的目录。目录名称应与技能名称一致：
---
name: pr-description
description: Writes pull request descriptions. Use when creating a PR, writing a PR, or when the user asks to summarize changes for a pull request.
---
When writing a PR description:
1. Run `git diff main...HEAD` to see all changes on this branch
2. Write a description following this format:
## What
One sentence explaining what this PR does.
## Why
Brief context on why this change is needed
## Changes
- Bullet points of specific changes made
- Group related changes together
- Mention any files deleted or renamed
技能名称代表你的技能。技能描述告诉克劳德何时使用该技能——这是匹配条件。第二组破折号之后的所有内容是克劳德激活技能后需要执行的指令。
Claude Code 会在启动时加载技能，因此创建技能后请重启游戏。您可以通过查看可用技能列表来确认技能是否可用。
你应该能看到你的技能列表。为了测试它，请在分支上做一些更改，然后说类似“为我的更改编写 PR 描述”之类的话。Claude 会显示它正在使用 PR 描述技能，检查你的差异，并按照你的模板编写描述——每次格式都相同。
Claude Code启动时，会扫描四个位置的技能，但只会加载技能名称和描述，而非完整内容。这是一个重要的细节。
当你发送请求时，Claude 会将你的消息与所有可用技能的描述进行比对。例如，“解释这个函数的作用”会匹配到“用图表解释代码”这项技能，因为它们的意图有所重叠。
找到匹配项后，克劳德会要求你确认加载技能。这个确认步骤能让你了解克劳德正在获取哪些上下文信息。确认后，克劳德会读取整个SKILL.md文件并执行其中的指令。
如果你克隆了一个代码仓库，其中包含一项与你个人技能同名的技能，那么哪个技能会优先生效？优先级顺序很明确：
 
企业级— 管理设置，最高优先级 
个人— 您的主目录 ( ~/.claude/skills) 
插件— 已安装的插件，优先级最低 
这样一来，企业既可以通过企业级技能来强制执行标准，又可以允许个人进行个性化定制。例如，如果贵公司已有企业级“代码审查”技能，而您又创建了一个同名的个人“代码审查”技能，则企业级版本优先。
为避免冲突，请使用描述性名称。例如，不要只用“review”，而应该使用“frontend-review”或“backend-review”。
 
你日常工作流程中的哪一项任务可以立即转化为一项技能？这项技能的描述会是什么样的？ 
在下一课中，您将学习高级配置选项，包括元数据字段、工具限制allowed-tools，以及如何使用渐进式披露和多文件组织来构建更大的技能。
这对您有帮助吗？
上一课什么是技能？下一课配置和多文件技能
