# 评审和测试代码

- 标题：评审和测试代码
- 来源：cursor.com
- 原文：https://cursor.com/cn/learn/reviewing-testing
- 作者：Cursor Documentation
- 类型：官方文档
- 摘要：AI can generate lots of code fast, but errors and technical debt may occur, so thorough code review is essential. Using small, clear commits and automated tools like Bugbot helps find and fix issues early. Strong tests and efficient workflows, including cloud agents, ensure high code quality and speed up development.
- 收藏于：2026/9/14 22:50:49
- 抓取：Reader 快照（2026/9/14）
- 字数：7462

---
代码Agent


编码智能体可以生成大量代码，这也意味着可能引入技术债。快速开发固然很好，但质量标准不能降低。无论代码是手写还是由智能体编写，合并标准都应一致。


AI 生成的代码看起来可能没问题，但实际上可能存在不易察觉的错误。它可能遵循现有模式、能够编译并通过您编写的测试，但仍可能遗漏边界情况、存在安全问题，或重复代码库其他位置已有的逻辑。


这正是代码评审如此重要的原因。您需要建立合适的流程，以确保代码库质量，并在问题进入生产环境前发现它们。作为工程师，您有责任投入精力，确保代码评审有效开展。


在请他人查看之前，您应先评审自己的代码。


**关注智能体的工作。** diff 视图会实时显示更改。如果发现智能体正朝错误的方向推进，请点击 **停止** 或按 Cmd Shift BackspaceCtrl Shift Backspace 取消并重新引导。无需等它完成。若需进行较大的调整，请先还原更改并完善方案，再次运行，如[开发功能](https://cursor.com/learn/creating-features#when-to-start-over)中所述。


**让智能体一次评审所有更改。** 在提示词中添加 [`@Branch`](https://cursor.com/docs/agent/prompting)，即可将当前分支的完整 diff 提供给智能体。您可以说“评审此分支上的更改”或“我现在正在做什么？”，为智能体提供丰富的上下文，并发现跨多个文件的问题。


例如，您可以让智能体评审自己的工作：


Ask mode example: 自我评审


评审我对折扣码功能所做的更改。查找缺陷、缺失的错误处理，以及任何不符合 src/services/PricingService.ts 中既有模式的内容


See Cursor's response


智能体可以一次生成大量代码更改，最终可能形成一次包含数百行改动的大型提交，任何人都难以评审。


我们建议使用小而语义明确、描述清晰的提交。每次提交只代表一项逻辑更改。人工审阅人可以逐个查看提交历史，而无需面对成片的代码改动。


手动整理提交很繁琐，但智能体很擅长处理。例如：


1. 自由开发功能。迭代过程中无需担心提交规范。
2. 一切正常后，让智能体将提交历史重新整理为便于评审的提交。
3. 智能体会重置到 `main`，通读所有更改，并规划合理的顺序，创建整洁且提交信息清晰的提交。
4. 它会验证最终 diff 与原始内容一致，确保不会丢失任何更改。


使用以下提示词创建一个[技能](https://cursor.com/docs/skills)，这样团队中的任何人完成一项功能后都可以运行 `/rework-commits`：


Create a skill file at .cursor/skills/rework-commits/SKILL.md with this content: # Split branch into reviewable commits Rework a branch into a sequence of small, semantic commits for review. ## Important - Prepend `GIT\_EDITOR=true` to all git commands you run, especially ones looking at diffs, so you avoid getting blocked ## Instructions 1. \*\*Check for uncommitted changes\*\*: Abort if there are any. 2. \*\*Check rebase status\*\*: Verify the branch is rebased on top of `main`. Abort if not. 3. \*\*Save recovery point\*\*: Tell the user the current commit hash in case we need to `git reset --hard` to it later. 4. \*\*Save the original diff\*\*: Save the full git diff to `/tmp/original-diff.patch` before making changes. 5. \*\*Reset to main\*\*: Run `git reset main` to unstage all changes. 6. \*\*Plan the commits\*\*: Read through ALL changes carefully. Plan a logical breakdown into small, sequential, semantic commits. Write a TODO for each in `/tmp/split-todos.md`. Order: database/schema changes first, backend second, frontend last. 7. \*\*Create the commits\*\*: Work through the TODOs one by one. Write excellent commit descriptions for human reviewers. 8. \*\*Validate\*\*: Compare the current diff against `/tmp/original-diff.patch` to ensure no changes were lost or altered. 9. \*\*Cleanup\*\*: Delete temporary files once validation passes. ## Notes - If validation fails, tell the user and provide the original commit hash for recovery - Each commit should be self-contained and represent a logical unit of work - Commit messages should explain the "why" behind the changes


[Try in Cursor](cursor://anysphere.cursor-deeplink/prompt?text=Create%20a%20skill%20file%20at%20.cursor%2Fskills%2Frework-commits%2FSKILL.md%20with%20this%20content%3A%0A%0A%23%20Split%20branch%20into%20reviewable%20commits%0A%0ARework%20a%20branch%20into%20a%20sequence%20of%20small%2C%20semantic%20commits%20for%20review.%0A%0A%23%23%20Important%0A%0A-%20Prepend%20%60GIT_EDITOR%3Dtrue%60%20to%20all%20git%20commands%20you%20run%2C%20especially%20ones%20looking%20at%20diffs%2C%20so%20you%20avoid%20getting%20blocked%0A%0A%23%23%20Instructions%0A%0A1.%20**Check%20for%20uncommitted%20changes**%3A%20Abort%20if%20there%20are%20any.%0A2.%20**Check%20rebase%20status**%3A%20Verify%20the%20branch%20is%20rebased%20on%20top%20of%20%60main%60.%20Abort%20if%20not.%0A3.%20**Save%20recovery%20point**%3A%20Tell%20the%20user%20the%20current%20commit%20hash%20in%20case%20we%20need%20to%20%60git%20reset%20--hard%60%20to%20it%20later.%0A4.%20**Save%20the%20original%20diff**%3A%20Save%20the%20full%20git%20diff%20to%20%60%2Ftmp%2Foriginal-diff.patch%60%20before%20making%20changes.%0A5.%20**Reset%20to%20main**%3A%20Run%20%60git%20reset%20main%60%20to%20unstage%20all%20changes.%0A6.%20**Plan%20the%20commits**%3A%20Read%20through%20ALL%20changes%20carefully.%20Plan%20a%20logical%20breakdown%20into%20small%2C%20sequential%2C%20semantic%20commits.%20Write%20a%20TODO%20for%20each%20in%20%60%2Ftmp%2Fsplit-todos.md%60.%20Order%3A%20database%2Fschema%20changes%20first%2C%20backend%20second%2C%20frontend%20last.%0A7.%20**Create%20the%20commits**%3A%20Work%20through%20the%20TODOs%20one%20by%20one.%20Write%20excellent%20commit%20descriptions%20for%20human%20reviewers.%0A8.%20**Validate**%3A%20Compare%20the%20current%20diff%20against%20%60%2Ftmp%2Foriginal-diff.patch%60%20to%20ensure%20no%20changes%20were%20lost%20or%20altered.%0A9.%20**Cleanup**%3A%20Delete%20temporary%20files%20once%20validation%20passes.%0A%0A%23%23%20Notes%0A%0A-%20If%20validation%20fails%2C%20tell%20the%20user%20and%20provide%20the%20original%20commit%20hash%20for%20recovery%0A-%20Each%20commit%20should%20be%20self-contained%20and%20represent%20a%20logical%20unit%20of%20work%0A-%20Commit%20messages%20should%20explain%20the%20%22why%22%20behind%20the%20changes)


智能体完成任务后，点击 **评审**，再点击 **查找问题**，即可运行专门的代码评审。智能体会逐行分析拟议的编辑，并标记潜在问题。


如需评审所有本地更改，请打开源代码控制标签页并运行 [智能体评审](https://cursor.com/docs/agent/agent-review)，将其与主分支进行比较。这能发现整组更改中的问题。



这与手动提示智能体评审更改类似。我们精心设计了提示词，使其能更有效地完成评审。


[Bugbot](https://cursor.com/docs/bugbot) 可与您的源代码控制服务商集成，自动评审 PR。它是日益增多的可直接在 PR 上提供反馈的工具之一。


每当您推送代码时，Bugbot 都会评审 PR。它会读取变更的完整上下文，包括修改后的代码与代码库其余部分的关联，并查找可能流入生产环境的缺陷。不同于只能发现格式问题的 linter，Bugbot 能找出空指针异常、竞态条件、缺少错误处理和安全问题等逻辑错误。


当 Bugbot 发现问题时，还可以提出修复方案。启用 [Autofix](https://cursor.com/docs/bugbot#autofix) 后，您可以直接在 PR 评论中提交修复。


您还可以通过添加[附加规则](https://cursor.com/docs/bugbot)来自定义 Bugbot，下一节将进一步介绍如何自定义 Agent。


为了帮助确保您的代码正确无误，您需要向智能体提供明确的验证信号，让它能够自行检查工作成果：


* **测试**可发现行为回归
* **类型检查**可发现结构性错误
* **Lint 检查**可发现风格和模式违规


这些检查越完善，您就越能放心地将工作委派给智能体。建议在使用智能体时，采用具备测试覆盖和 lint 规则的强类型语言。


过去，要实现全面的测试覆盖需要投入大量精力。大多数团队只会在出现问题后才补充测试，或者通过繁琐的流程来确保达到一定的覆盖率。


有了智能体，编写测试变得容易得多。您可以让智能体编写测试，再验证测试是否正确。智能体还可以通过[浏览器](https://cursor.com/docs/agent/tools/browser)为您进行手动测试，检查原本需要人工验证的 UI 状态或流程。


这很重要，因为高质量的测试能让您更放心地让智能体自主工作并进行更改，而不会引入回归问题。


适合生成测试的提示词：


* "规划如何为我们的结账流程实现 e2e 测试覆盖。我们应该测试哪些场景？"
* "为 payments API 设置集成测试。使用 `src/__tests__/` 中现有的测试基础设施。"
* "我们当前针对折扣功能的测试遗漏了哪些边界情况？"
* "为我们在 `PaymentService.ts` 中修复的缺陷编写回归测试。"


智能体还可以帮助您从零开始搭建测试基础设施。如果您尚未为网页应用配置 Playwright，可以让智能体设置项目、编写配置并创建第一个测试。


到目前为止，你使用的一直是在编辑器中本地运行的智能体。[云端代理](https://cursor.com/docs/cloud-agent) 在远程沙盒中运行，因此你可以合上笔记本电脑，稍后再查看结果。


工作方式如下：


1. 描述任务并提供相关上下文
2. 智能体克隆你的仓库并创建分支
3. 它会自主工作，完成后创建 PR
4. 评审更改，准备就绪后合并


云端代理非常适合处理原本会加入待办事项列表的任务：在处理其他工作时发现的缺陷、为现有代码补充测试覆盖、更新文档或重构。


一种高效的做法是利用云端代理并行测试多种情况。您可以启动多个云端代理，针对应用中的不同边界情况、错误条件和输入组合进行测试。


例如，假设您新增了折扣码功能。您可以启动云端代理，测试每种折扣类型、尝试无效输入、测试折扣叠加等组合，并验证边界值下的行为。


每个云端代理都会创建一个包含测试用例和结果的分支。随后，您可以将失败情况汇总为可在本地复现的测试用例，并在合并前修复。


随着您使用的编码智能体越来越多，瓶颈会转移到系统中最慢的环节。这往往是等待测试套件完成、在整个代码库中运行类型检查和 Lint 检查，或 CI 流水线中的其他步骤。


每次与智能体对话都要付出这些时间成本。如果测试运行需要 10 分钟，而您并行启动了 10 个智能体，等待时间就接近两小时。将测试速度提升 50%，每次就能节省近一小时。


这些改进会在每个会话、每个分支和每个智能体中持续带来收益。以下是一些高收益的改进示例：


* 加快测试套件运行速度
* 精简依赖树
* 优化 CI 流水线
* 加快类型检查
* 缩短构建时间


团队可能会将这类任务置于较低优先级，但当智能体每天数十次运行这些命令时，节省的时间会不断累积。投入一小时加快测试，长期可节省数百小时。


最棒的是，智能体可以代您完成这项工作。您可以让智能体分析测试性能，找出最慢的测试并修复。也可以让它审计依赖项，移除未使用的依赖。这些任务范围明确，输出清晰且可验证，正是智能体最擅长的工作。


测试通过并不意味着代码一定能正确运行。测试可能验证了错误的行为。智能体编写的代码或许能处理正常情况，却未考虑所有边界情况。


理解代码更改非常重要。如果更改规模过大，难以轻松评审，可以考虑将其拆分成更易于评审的小部分，方便你和智能体进行评审。


现在，你已经了解如何上线新功能、在出现问题时进行调试，以及评审代码以确保其质量。最后一步是自定义智能体，使其适配你的代码库，从而加快工作流程。


[Arrow pointing right](https://cursor.com/learn/customizing-agents)
