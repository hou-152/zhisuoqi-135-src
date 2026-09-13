# Rethinking skills and prompts for GPT-6 Astra | OpenAI Developers

- 标题：Rethinking skills and prompts for GPT-6 Astra | OpenAI Developers
- 来源：openai.com
- 原文：https://developers.openai.com/blog/rethinking-skills-and-prompts-for-gpt-6-astra
- 作者：OpenAI Developers
- 类型：官方文档
- 摘要：GPT-6 Astra improves how models use skills and prompts by focusing on clear, short instructions and letting the model decide what to do safely. It works better when you update your skills and AGENTS.md files to give precise, relevant guidance without overloading context. Defining clear task boundaries and completion criteria helps Astra avoid stopping too early and ensures it finishes work thoroughly.
- 收藏于：2026/9/13 16:26:51
- 抓取：Reader 快照（2026/9/14）
- 字数：4275

---
![重新思考 GPT-6 Astra 的技能和提示](https://developers.openai.com/images/blog/rethinking-skills-and-prompts-for-gpt-6-astra/cover.webp) 
智能体编码技术已经取得了长足的进步，最佳实践也在快速变化。随着模型功能的增强，过去需要大量人工指导和搭建框架的工作现在已不再需要。


如果你过去一年一直在项目中使用像 Codex 这样的智能体，那么在引导模型取得良好结果的过程中，你可能已经积累了大量的指令。每次发布新版本，都值得重新审视这些假设，但对于 GPT-6 Astra 来说，这一点比以往任何时候都更加重要。


这些指令可以采取多种形式：技能、`AGENTS.md`任务提示等等，都在塑造模型完成工作的方式。


更好的技能
-----


这些指令可以以技能的形式呈现，本质上是存储为 Markdown 文件的提示，还可以与资源和捆绑脚本一起打包。通常，它们最适用于指导特定的工作流程或使用某些应用程序。


现在人们习惯在项目中打包大量技能，每个技能都有一个名称和描述，这些信息会被加载到模型的上下文中，以便模型知道何时使用它们。但是很多描述都太长了，当添加的技能过多时，Codex 会开始缩短它们的描述以适应上下文。最终，模型看到的每个描述信息减少，导致更难确定应该选择哪个技能。


更糟糕的是，描述往往相互矛盾，或者过分强调何时应该使用技能，导致模型加载实际上对任务没有帮助的指令。


A common workflow to create skills is to use the `$skill-creator` skill. We recently updated its guidance to help mitigate many of the failure modes we’ve seen in practice.


First, skill descriptions should be as short as possible while making it clear when the model should use them:


Be clear about when it appliesBadCreate and validate Postgres schema migrations. Use when working with databases, queries, models, or persistence.

GoodCreate and validate Postgres schema migrations. Use when adding or changing a migration, or reviewing its rollout.


*Here, the bad skill description can push the model to use it anytime it touches anything related to a database, rather than only when it has to handle a migration.*


Second, one of the key markers of a useful skill is progressive disclosure. Reading a skill takes up context, bringing you closer to compaction and introducing guidance that may not apply to the task. For skills with multiple workflows, make the root document a minimal router that points to supporting docs and scripts. Give the model enough guidance to know where to look without forcing it to read things that don’t matter in the moment.


Third, many skills were written as elaborate itineraries or recipes. Models have gotten much better at understanding nuance and ambiguity, so overly specific guidance can now hinder results where it previously helped.


Repository skills also guide other contributors’ agents, which may use different models. Guidance that helps Sol or Luna may overconstrain GPT-6 Astra, so consider which models will use the instructions you leave behind.


Up-to-date AGENTS.md
--------------------


Because [`AGENTS.md`](https://agents.md) applies whenever the model works in your repository, you should frequently revisit each instruction and ask yourself whether it’s still needed.


Requiring a stack of docs or a full repo map before every edit is excessive for a typo fix. GPT-6 Astra can work out what it needs to read without being pushed to review the whole project before every change.


Read what the task needsBadBefore every edit, read architecture.md, database.md, and deployment.md.

GoodUse architecture.md for service boundaries, database.md for schema changes, and deployment.md when preparing a deployment.


*Prompting the model to read files before every edit is a great way to burn context and slow work down. Pointing to some docs can still be helpful, however, so long as it is contextual. Be sure to keep your docs updated too!*


Previous models needed encouragement to run tests and check their work. GPT-6 Astra does that on its own, so the same instructions can lead to unnecessary testing.


GPT-6 Astra is thorough, but it can be more tentative about how far to take a task. Sometimes it needs a little push to keep going. You can use `AGENTS.md` to give it permission for a specific workflow you know is safe, such as a local test suite:



>  本地测试使用一次性测试用例，不涉及生产环境。运行测试，修复由请求的更改引起的故障，然后重新运行受影响的测试，无需每一步都请求批准。
> 
>  


决策边界
----


务必仔细定义边界。如果之前的模型未经许可擅自行动，您可能使用了较为强硬的措辞来要求它事先征求您的同意。这固然有用，但作为我们最契合的模型，GPT-6 Astra 的判断力要强得多，它只会在确信安全的情况下才会执行任务——因此，您应该以对待安全模型的方式来对待它。


如果你之前设定了界限，是为了防止其他模型走得太远，而现在你又要切换到 GPT-6 Astra，那么请考虑更新一下措辞：Astra 可能会过于认真对待，甚至在你希望它继续工作的情况下停止工作。


持久性
---


如果您习惯了 GPT-5.6 Sol 接受请求后长时间持续运行，那么 GPT-6 Astra 在何时停止方面可能会显得更加犹豫。它可能完成初步实现后，在仍有工作要做的情况下就返回给您进行审核。


这就是为什么在开始之前定义完成标准很有帮助的原因。你可能需要督促 Astra 继续执行，直到完全完成。如果任务包括运行实现、检查结果以及修复失败的问题，请将这些内容包含在请求中。如果在第一次实现后就要求停止进行审查，这将导致模型提前停止，因此请检查这是否是你真正需要做的决定。


如果你希望它在第一次探索之后继续探索，请说明你想探索什么以及它应该在哪里停止。


新模型是清理内部的好机会，但你不需要手动检查所有内容：让 GPT-6 Astra 根据本文讨论的内容进行审核，然后去构建一些你以前从未尝试过的东西！
