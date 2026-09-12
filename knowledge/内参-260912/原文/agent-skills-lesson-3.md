# Claude 官方课程 · 第 3 课：写好 name 与 description

- 来源：academy.claude.com
- 原文：https://academy.claude.com/courses/introduction-to-agent-skills/configuration-and-multi-file-skills
- 作者：Claude Academy
- 摘要：Agent skills need a clear name and description to tell Claude when and how to use them. Allowed-tools limit what Claude can do during skill use, improving security for sensitive tasks. Keeping skill files small and linking to extra resources helps Claude work efficiently without overloading the context.
- 抓取：Reader 快照（2026-09-12）
- 字数：1909

---

在 YouTube 上观看（在新标签页中打开） 
 
name是description必需的——allowed-tools也是model可选但功能强大的附加功能 
好的描述应该回答两个问题：这项技能有什么作用？克劳德应该在什么情况下使用它？ 
allowed-tools限制克劳德在技能激活时可以使用的工具——适用于只读或对安全性要求较高的工作流程。 
逐步披露：将 SKILL.md 文件控制在 500 行以内，并链接到 Claude 仅在需要时才阅读的支持文件（参考资料、脚本、资源）。 
脚本执行时无需将其内容加载到上下文中——只有输出会消耗令牌，从而保持上下文的高效性。 
基本技能只需名称和描述即可，但Claude Code中还有许多高级技巧可以显著提升技能的效用。接下来，我们将探讨关键字段、描述方面的最佳实践、工具限制以及如何构建更复杂的技能。
代理技能开放标准支持 SKILL.md 前置元数据中的多个字段。其中两个字段为必填项，其余字段为可选字段：
 
名称（必填）— 用于标识您的技能。仅使用小写字母、数字和连字符。最多 64 个字符。名称应与您的目录名称一致。 
描述（必填）— 告诉克劳德何时使用该技能。最多 1024 个字符。这是最重要的字段，因为克劳德会用它来进行匹配。 
allowed-tools（可选）— 限制克劳德在技能激活时可以使用的工具。 
模型（可选）— 指定要用于该技能的 Claude 模型。 
指示要明确。如果有人告诉你“你的工作是帮忙处理文件”，你肯定不知道该怎么做——克劳德也是这么想的。
好的描述应该回答两个问题：
如果你的技能没有在预期的时间触发，请尝试添加更多与你实际请求措辞相匹配的关键词。克劳德会根据描述来判断技能是否相关，所以措辞很重要。
有时，你只需要一种只能读取文件而不能修改文件的技能。这对于安全要求较高的工作流程、只读任务或任何需要设置安全防护措施的场景都非常有用。
在这个例子中，该allowed-tools字段被设置为“是Read, Grep, Glob, Bash”。当这项技能激活时，克劳德无需请求许可即可使用这些工具——不能编辑，也不能写作。
---
name: codebase-onboarding
description: Helps new developers understand the system works.
allowed-tools: Read, Grep, Glob, Bash
model: sonnet
---
如果完全省略allowed-tools，该技能不会限制任何内容。克劳德使用其正常的权限模型。
技能会与你的对话共享克劳德的上下文窗口。当克劳德激活一个技能时，它会将该技能的 SKILL.md 文件内容加载到上下文中。但有时你需要技能所依赖的参考资料、示例或实用脚本。
将所有内容塞进一个 2000 行的文件中有两个问题：它会占用大量的上下文窗口空间，而且维护起来很麻烦。
逐步披露可以解决这个问题。将必要的说明保留在 SKILL.md 文件中，并将详细的参考资料放在单独的文件中，Claude 只在需要时才阅读。
开放标准建议按以下方式组织您的技能目录：
 
assets/ — 图片、模板或其他数据文件 
然后在 SKILL.md 文件中，添加指向支持文件的链接，并附上关于何时加载这些文件的清晰说明：
在这个例子中，Claudearchitecture-guide.md只会在有人询问系统设计时才会读取文件。如果他们问的是在哪里添加组件，它就不会加载该文件。这就像在上下文窗口中显示的是目录，而不是整个文档。
一个好的经验法则是：SKILL.md 文件最好控制在 500 行以内。如果超过这个限制，请考虑是否将内容拆分成单独的参考文件。
技能目录中的脚本无需加载其内容即可运行。脚本执行后，只有输出会消耗令牌。SKILL.md 文件中的关键指令是告诉 Claude 运行脚本，而不是读取脚本。
这在以下情况下尤其有用：
 
设想一下，你想开发一项涉及多个文件的技能。你会如何组织 SKILL.md 文件以及相关的参考文件？ 
您的团队中是否存在某些工作流程，限制工具访问权限allowed-tools可以增加重要的安全保障？ 
在下一课中，我们将比较这些技能与您可以自定义 Claude Code 的其他方式——CLAUDE.md、子代理、钩子和 MCP 服务器——以便您可以为每种情况选择合适的工具。
这对您有帮助吗？
上一课创建你的第一个技能下一课技能与其他克劳德代码功能对比
