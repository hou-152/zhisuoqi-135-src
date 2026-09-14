# 自定义 Agent

- 标题：自定义 Agent
- 来源：cursor.com
- 原文：https://cursor.com/cn/learn/customizing-agents
- 作者：Cursor Documentation
- 类型：官方文档
- 摘要：Cursor allows you to customize intelligent agents with simple rules and skills to match your team's coding style and workflow. Rules provide always-on guidance, while skills add specialized, on-demand capabilities. This customization helps agents work more efficiently and produce better results tailored to your project.
- 收藏于：2026/9/14 22:50:51
- 抓取：Reader 快照（2026/9/14）
- 字数：4324

---
[Skip to main content](https://cursor.com/cn/learn/customizing-agents/#main-content)


代码Agent


编码智能体即使不经过任何自定义，也已非常智能。它们对经过验证的软件工程实践有深刻理解，通常能做出正确的决策。


不过，它们不了解你的团队习惯如何编写软件、偏好的工具，也不了解你的业务上下文。这正是自定义的价值所在。你可以调整智能体，帮助它们更高效地工作，并产出更高质量的结果。


Cursor 提供两层自定义方式，对应于你如何让新团队成员入职：让它们始终了解的**规则**，以及可在需要时调用专业知识的**技能**。


[规则](https://cursor.com/docs/rules) 是存储在 `.cursor/rules/` 中的 markdown 文件，智能体会在每次对话开始时看到这些文件。您可以将其视为始终包含的指令，用于指导智能体如何处理您的代码。


好的规则文件应简短、具体，引用示例而非直接复制示例：



```
# Commands

- `npm run build`: Build the project
- `npm run typecheck`: Run the typechecker
- `npm run test`: Run tests (prefer single test files for speed)

# Code style

- Use ES modules (import/export), not CommonJS (require)
- Destructure imports: `import { foo } from 'bar'`
- See `components/Button.tsx` for canonical component structure

# Workflow

- Always typecheck after making a series of code changes
- API routes go in `app/api/` following existing patterns
```

规则最适合用于：


* 智能体应了解的构建和测试命令
* 智能体应遵循的代码约定
* 指向代码库中权威示例的链接
* 防护措施 (不得修改的文件、应避免的模式)


* **不要照搬整套风格指南。** 应改用 linter。规则应作为工具链的补充，而非替代。
* **不要记录所有命令。** 智能体已了解常用工具。只添加项目特有的命令。
* **从简单开始。** 规则会纳入每次对话，数量多了会不断累积。只有发现智能体反复犯同样的错误时，才添加规则，并保持简短。


将规则提交到 git，让整个团队都能受益于共享知识。


[技能](https://cursor.com/docs/skills)可通过专业知识和工作流扩展智能体的能力。与规则不同，技能会[动态加载](https://cursor.com/blog/dynamic-context-discovery)。智能体会根据当前任务决定何时使用它们。


技能在 `SKILL.md` 文件中定义，可包含领域知识、自定义工作流，以及智能体可执行的脚本和代码。



```
---
描述: 部署到预发布环境。当用户要求部署、发布或推送到预发布环境时使用。
---

# 部署到预发布环境

## 步骤

1. 运行 `npm run build` 并确认成功
2. 运行 `npm run test` 并确认所有测试通过
3. 运行 `npm run deploy:staging`
4. 访问 https://staging.example.com/health 验证部署
5. 报告部署状态和 URL
```

规则与技能的主要区别：




|  | 规则 | 技能 |
| --- | --- | --- |
| **用途** | 始终生效的约定 | 专门的工作流 |
| **上下文成本** | 始终占用上下文空间 | 仅在调用时使用完整上下文 |
| **最适合用于** | 智能体应始终了解的内容 | 智能体在被要求时可以执行的操作 |


[MCP (模型上下文协议)](https://cursor.com/docs/mcp)  可让智能体连接外部工具，并获取相关上下文。MCP 服务器提供智能体可按需使用的上下文和操作。


例如，您可以将智能体连接到：


* **Slack**，读取消息和发布更新
* **Datadog**，排查生产环境日志
* **Sentry**，查找错误详情和堆栈跟踪
* **数据库**，直接查询数据
* **Figma**，获取设计 token 和组件规格


浏览[Marketplace](https://cursor.com/marketplace)，查找适用于您所用工具的服务器。


除 MCP 外，智能体还可以运行终端中安装的任何 CLI 工具。`gh`、`aws`、`kubectl` 和 `docker` 等工具无需额外配置即可使用。智能体可以直接执行这些工具。


通过规则为智能体指定实用工具：



```
- 所有 GitHub 操作（问题、PR、CI 检查）均使用 `gh`
- 文件存储操作使用 `aws s3`
```

这对调试也很有用。无需切换到浏览器查看 CI 状态或查找问题，你可以让智能体：“使用 `gh` 查明此 PR 的 CI 为何失败。”它会运行命令、读取输出，并据此采取操作。


您还可以在智能体输入框中输入 `/`，按需调用技能。这样便可将技能转为可通过名称触发的可复用工作流，非常适合每天需要多次执行的任务。


例如，用于提交、推送和创建 PR 的 `/pr` 技能：



```
---
description: 为当前更改创建拉取请求。
---

1. 使用 `git diff` 查看已暂存和未暂存的更改
2. 根据更改内容编写清晰的提交信息
3. 提交并推送到当前分支
4. 使用 `gh pr create` 打开带有标题/描述的拉取请求
5. 完成后返回拉取请求的 URL
```

pr: # Create a pull request Create a pull request for the current changes. ## Steps 1. Look at the staged and unstaged changes with `git diff` 2. Write a clear commit message based on what changed 3. Commit and push to the current branch 4. Use `gh pr create` to open a pull request with title and description 5. Return the PR URL when done


[Add to Cursor](cursor://anysphere.cursor-deeplink/skill?name=pr&text=%23%20Create%20a%20pull%20request%0A%0ACreate%20a%20pull%20request%20for%20the%20current%20changes.%0A%0A%23%23%20Steps%0A%0A1.%20Look%20at%20the%20staged%20and%20unstaged%20changes%20with%20%60git%20diff%60%0A2.%20Write%20a%20clear%20commit%20message%20based%20on%20what%20changed%0A3.%20Commit%20and%20push%20to%20the%20current%20branch%0A4.%20Use%20%60gh%20pr%20create%60%20to%20open%20a%20pull%20request%20with%20title%20and%20description%0A5.%20Return%20the%20PR%20URL%20when%20done)


其他适合作为技能的工作流：


* `/fix-issue [number]`：使用 `gh issue view` 获取问题详情，查找相关代码，修复缺陷并创建 PR
* `/review`：运行 linter，检查常见问题，并总结需要关注的事项
* `/update-deps`：检查过时的依赖项并逐一更新，每次更新后运行测试


将这些提交到 Git 中，方便整个团队运行。


以下通过一个实际示例说明自定义的效果。假设某个团队使用 Next.js、Tailwind 和 Vitest：


**添加规则前：** 智能体使用 `jest` 进行测试 (因为它在训练数据中更常见) ，使用 CSS modules 创建组件，并将 API 路由放在随意的位置。


**添加三条规则后：**



```
- 测试使用 Vitest，而非 Jest。请参阅 `src/__tests__/example.test.ts` 了解范例。
- 使用 Tailwind 实用类设置样式。不要使用 CSS modules 或 styled-components。
- API 路由应遵循现有模式，放在 `app/api/[resource]/route.ts` 中。
```

智能体现已默认遵循团队约定，无需再在每次对话中纠正同样的错误。


你可能想为所有事情都编写规则，但请克制。规则过多会占用不必要的上下文，还可能让智能体感到困惑。


规则应保持精简且高质量。它们应是团队持续更新的共享产物。如果只是偶尔需要某些内容，请将其放入技能中。


你已根据团队的惯用模式自定义智能体。最后一章将通过一个端到端示例，综合运用本课程所学内容。


[Arrow pointing right](https://cursor.com/learn/putting-it-together)
