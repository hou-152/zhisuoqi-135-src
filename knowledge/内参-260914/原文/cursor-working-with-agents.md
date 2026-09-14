# 与智能体协作

- 标题：与智能体协作
- 来源：cursor.com
- 原文：https://cursor.com/cn/learn/working-with-agents
- 作者：Cursor Documentation
- 类型：官方文档
- 摘要：开发者通过与智能体协作，让它们根据具体提示自动编写代码。提供清晰的指引和引用现有代码，有助智能体更准确地完成任务。管理好对话上下文和任务拆分，可以提高协作效率和代码质量。
- 收藏于：2026/9/14 22:50:35
- 抓取：Reader 快照（2026/9/14）
- 字数：2261

---
代码Agent


如今，开发者正借助智能体编写\_大量\_代码。他们不再手动输入每一行代码，而是与智能体交流，让它代为编写。


在 [Foundations](https://cursor.com/learn/agents) 课程中，我们学习了智能体的核心工作方式：为它们提供强大的工具，让它们在循环中自主运行。本课程将介绍软件开发过程中如何高效地与编码智能体协作。


Cursor 是一款内置编码智能体的 AI 编辑器。智能体在一个称为“框架”的环境中运行，该框架由三部分组成：


1. **说明**：引导行为的系统提示词和规则
2. **工具**：文件编辑、代码库搜索、终端执行等
3. **模型**：你为任务选择的智能体模型


编码智能体会根据你提供的目标帮助你完成任务。每个框架的行为会因调优方式和所用模型而略有不同。


有些模型经过训练，会更频繁地调用 shell 命令；另一些则需要更明确的说明。Cursor 的目标是支持所有[前沿模型](https://cursor.com/docs/models-and-pricing)，并尽可能[优化框架](https://cursor.com/blog/codex-model-harness)，包括智能体可访问的[工具](https://cursor.com/docs/agent/tools/search)。


使用智能体时，首先要做的是向它们提供提示词。来看两种不同的做法：


智能体得猜测所有细节：您需要什么布局、哪些组件、采用何种样式方案等。有时这样也能奏效，但通常您需要更清楚地说明意图。


再来看一个更详细的提示词，其中引用了代码库中的现有模式：


Agent example: 明确约束的提示词


添加用户设置页面。


查看 src/app/profile/page.tsx 中现有的配置文件页面，参考我们的布局模式。使用 src/components/ui/Form.tsx 中的同一套表单组件。设置应包括：


使用现有的 useUserPreferences hook 存储设置。遵循与 src/app/api/user/profile/route.ts 相同的 API route 模式。


See Cursor's response


第二个提示词好得多，因为它为智能体提供了基于代码库的具体指引：现有文件、组件和清晰的范围。智能体会遵循您的现有模式，而不是自行创造新模式。


在学习如何[创建新功能](https://cursor.com/learn/creating-features)以及规划跨多个文件的较大更改时，我们会进一步讨论这一点。


哪种做法能让智能体获得最佳结果？


引用具体文件和现有模式，并明确范围边界。


包含项目中的每个文件，以提供尽可能多的上下文。


与智能体协作时，对话会逐渐积累[上下文](https://cursor.com/learn/context)：消息、工具调用、文件内容等。上下文是智能体的工作记忆，但容量有限。


请留意智能体使用的上下文量。切换到新任务时，或发现智能体开始出错时，请新开对话。


如果你仍在处理同一功能，且智能体保留了早先消息中的有用上下文，继续当前对话会更合适。但如果智能体反复兜圈子，即使你正处于功能开发中途，也请重新开始。你可以引用旧对话，让智能体读取聊天会话记录。


![引用过往聊天，将之前对话中的上下文带入](https://cursor.com/docs-static/_next/image?url=https%3A%2F%2Fptht05hbb1ssoooe.public.blob.vercel-storage.com%2Fassets%2Fblog%2Fpast-chats.jpg&w=1920&q=75)
Agent example: 引用过往对话


继续处理 Red auth refactor 中的认证重构。我已处理 JWT 过期处理相关的评审反馈。现在更新 refresh token 轮换机制，使旧 token 在使用后失效。


See Cursor's response


最新模型越来越擅长为你查找上下文。借助[代码库搜索](https://cursor.com/docs/agent/tools/search)，智能体可以按需调取相关文件。如果你知道确切的文件，请标记它。否则，向智能体提供大致描述，让它找到合适的文件。


最常见的错误之一是没有做好规划，就要求进行大范围更改。你可能会发现智能体做了无关的更改、编辑了你不希望修改的文件，或逐渐偏离重点。


如果发现这种情况，不妨停下来想想能否将任务拆分成更小的部分。如果你正在规划一项复杂的功能，我们将在[创建功能](https://cursor.com/learn/creating-features)中介绍如何制定可靠的方案和规格说明。有了方案并开启首次对话后，通常在后续较小的对话中迭代会更快。


您已经了解智能体框架的工作原理，掌握了如何编写有效的提示词，以及如何管理上下文。下一章将深入介绍智能体如何在您的代码库中搜索，并帮助您更好地理解正在处理的代码和架构。


[Arrow pointing right](https://cursor.com/learn/understanding-your-codebase)
