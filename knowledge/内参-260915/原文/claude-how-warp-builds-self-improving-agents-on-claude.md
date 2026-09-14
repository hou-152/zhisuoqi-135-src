# https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude

- 标题：https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude
- 来源：claude.com
- 原文：https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude
- 作者：Claude
- 类型：文章
- 摘要：Warp builds AI agents that improve themselves by learning from user feedback over time. They use simple, file-based "skills" that the agents update through a review and approval process. This approach helps agents get better at tasks like code review and issue triage while keeping humans in control.
- 收藏于：2026/9/15 03:21:42
- 抓取：Reader 快照（2026/9/15）
- 字数：9576

---
*在本系列文章中，我们将重点介绍初创公司如何利用人工智能变革其所在行业。在本文中，我们将分享 Warp 如何将无状态的用户反馈转化为其智能体的自我改进循环。*




| 快速投球 |
| --- |
| 生长 | Warp 平台已融资 7300 万美元。每月有 80 万开发者使用 Warp 进行开发。财富 500 强企业中有 56% 使用 Warp。迄今为止，Warp 平台内已运行 1000 万次 Claude Code 会话，平均每周超过 40 万次。Warp Agent 的总对话次数已达 4000 万次。 |


代理需要可靠高效地处理重复性任务。如果第一次提示只能正确完成 80% 的任务，可能会给用户带来嘈杂且烦人的体验。Warp 就曾为此付出惨痛代价，并以此指导其产品策略，从而为全球近百万开发者打造了更佳的使用体验。


Warp 是一个基于人工智能的终端和智能体开发环境，它构建于 Claude 平台之上。团队在使用内部代码审查代理时遇到了“体验不佳”的问题。工程师们抱怨说，他们的代理会给出无用的评论，并且输出结果质量低下。


团队最初尝试了一些权宜之计，例如根据观察到的代码审查失败案例手动重写提示信息。这虽然提高了输出的可用性，但无法扩展。改进诸如 AGENTS.md 之类的上下文文件也有帮助，但这远非彻底的解决方案。


最终，他们意识到，真正的问题在于，无论反馈的目的是什么，它通常会在会话结束后消失，从而从智能体循环中移除关键的上下文信息。他们的解决方案是：一个基于[智能体技能的](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview)框架，用于创建自我改进的智能体，其中反馈会随着时间的推移而累积，从而不断改进和增强智能体的输出。


请继续阅读，了解他们如何利用 Claude 平台及其技术构建它。


**基于技能的代理人自我提升循环**
------------------


[**其核心技术是利用技能**](https://support.claude.com/en/articles/12512176-what-are-skills)进行自我改进循环，技能是基于文件的知识编码，它将指令从原始提示中剔除。Warp 开发了一种由两种技能组成的自我改进代理架构，并在两者之间辅以人工反馈。


![](https://cdn.prod.website-files.com/68a44d4040f98a4adf2207b6/6a8f1a9a1b33f40618a9d59a_selfimprove-loop.jpg)
内部**/基础技能**包含功能性领域知识和指令。例如，当一个 PR 被打开时，Warp 的代码代理会使用该基础技能和上下文来执行代码审查。


**Human feedback** on agent output is a critical component for the self-improvement loop. For code review this could be something as simple as a thumbs up, but the more explicit the better.


“A human could affirm, ‘this was a good, useful comment’,” Warp founder Zach Lloyd explains, “But the human could also give detailed reasons why a code review wasn't good. Specifics like ‘you suggested renaming this variable, but our code base convention is this type of global variable uses this particular naming context’ tell the agent how to do it right next time.”


The **outer/improver skill** functions as an observer agent that runs on a schedule rather than per-task. It pulls the accumulated human feedback, compares what the agent suggested against how humans responded, and proposes a small, focused edit to the base skill.


Because skills are plain files, agents are extremely good at updating them. These updates, which are reviewable, approvable, and mergeable, can flow through a normal PR/code-review workflow; once merged, the next run of the inner skill inherits the improvement.


Warp now runs this pattern across its entire open-source repo, with separate spec-writing, review, and triage agents, each carrying their own self-improvement loop.


“File-based skills are a way of encoding knowledge for agents without putting that knowledge directly in the prompt, as something the agent can simply look up in the course of doing its job,” says Zach. “The framework is really simple actually: there's the base domain-specific skill and then there's the improver skill that refines that domain-specific skill. This simplicity is the beauty of this approach.”


**How to write self-improving skills for agents**
-------------------------------------------------


Here are some of the Warp team’s tried and true tips for writing self-improving skills for agentic loops:


* **Write principles, not rules.** "Construct the skill as though you're instructing a smart person, not like you're programming a computer,” Zach says. “Including direction in the skill like ’Look for repeated code’ provides better direction than exhaustive variable naming rules.”
* **Explain the why.** Providing the rationale behind the rule lets the agent reason about the problem instead of following rigid instructions, again allowing for better generalization.
* **Make feedback effortless to give.** Capture it where people already work, like by commenting directly on a PR or issue. Also, make this happen automatically, with no extra submission step. “Low friction is what keeps signal flowing,” Zach notes. “If you make it too hard you're not going to get the feedback and you're not going to be able to improve the skill."
* **Keep skills small and use progressive disclosure.** [A good skill](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices) file isn't large; it references resource files and scripts rather than dumping everything into context at once.
* **Feedback quality > volume, but volume helps.** A small amount of detailed, domain-specific feedback from a senior engineer can be worth more than lots of cursory feedback because binary thumbs up/down doesn't say *why*. “You can get really good signal even from a relatively small sample size if it's very detailed feedback from a person around domain specific knowledge that the agent otherwise would have no way of getting,” Zach continues. “That said, the bigger the corpus of quality signal, the better. At Warp we're using a loop to manage our whole open source repo. We have hundreds of people contributing and we're doing thousands of code reviews.”
* **Put extra effort into the improver skill**. Putting extra effort into writing the improver skill (the observer agent) pays off beyond the immediate agent loop, because improver skills are very reusable across different use cases. “Outside of the domain specific knowledge component, this is a fairly reusable mechanism—the improver skill for a code review agent is not that different from the improver skill for any other agent.”


**The loop in action: Warp’s issue triage agent**
-------------------------------------------------


[Warp’s issue triage agent](https://github.com/warpdotdev/warp-agents-demo-github-issue-triage) demonstrates the self-improving agent skills framework. The pattern is triggered whenever someone files a new GitHub issue: a GitHub Action fires an agent that analyzes the issue for complexity and feasibility, assigns labels, and suggests a direction for the fix. That triage agent runs off an inner skill file holding the domain knowledge about what each label means and how to research the codebase before acting.


On a sample issue, the first-stage inner skill did a solid job but missed one label, ready to spec, which signals that a contributor can start building product and technical specs against the issue. A maintainer on the Warp team caught the gap and left feedback directly on the issue, exactly where the work was happening. Critically, he explained both what he expected and why he expected it: actionable feedback easy for the agent to absorb later.


The outer improver skill runs in [Oz, Warp's agent orchestration platform](https://docs.warp.dev/), as a scheduled “update triage” agent. The agent authenticated to GitHub, ran a Python script bundled with the skill to pull recent issues carrying feedback, summarized them into a JSON file, and read that back into context. The bundled script is itself a best practice; skills can reference resource files instead of writing fresh code on every run.


From there, the agent identified the concrete feedback signals in the maintainer comments and proposed the smallest edit that captured them. It opened a PR editing the inner skill to apply the "ready to spec" label when an issue describes a real problem, even though the exact UI or UX shape is not yet defined.


Because the whole update is a skill file, it moves through the normal code-review workflow. The PR arrived with a description explaining which signals prompted the change and what it altered. A human reviews, approves, and merges, and the next run of the triage skill inherits the new knowledge. That final human step closes the loop and keeps a person in control of what actually changes.


This is the same mechanism Warp now runs at scale across its open-source repo, where spec-writing agents, review agents, and triage agents each carry their own self-improvement loop.


Any agent, no matter what its task, gets better over time if you build one of these loops into it from the start to capture human feedback signals, turn them into skill updates, and expand agents from one-off helpers into capable systems that compound across your org.




| Best practices from the Warp team |
| --- |
| Are you conflating skills with memory? | Skills are procedural and stable—"how to do X," run-agnostic, changed deliberately. Memory is auto-written by the agent at inference time and never stops changing. |
| Do you need one improver loop, or one per agent? | Meet in the middle: a templated base loop captures the overlap across your agents, with domain-specific weights layered on. A handful of improvers can each own one; a hundred should share. |
| What happens when the feedback is wrong? | Assume it will be. Don't let the agent accept feedback blindly — give it context to sanity-check, filter whose input counts, and keep a human in the loop at either the filtering or final-review stage. |
| Is your domain verifiable? | Build the verification harness first, then let the agent tune against it: generate a reference corpus, compare output to reference, fix, repeat. |
| And if it isn't domain verifiable? | Lean on deterministic evals against golden outputs wherever they exist. Where you must use human feedback, restrict it to domain experts — don't open the floodgates. |
| How do you know the whole system is improving? | Track the global metrics humans already eyeball—time to merge, contributor count, cost—and feed them back into the improver agents. Go crawl-walk-run on deployment. |


[*View the full webinar*](https://www.anthropic.com/webinars/how-warp-builds-self-improving-agents-on-claude) *for a live demo and deeper discussion of how Warp uses Claude to build agents that learn from team feedback and improve themselves over time.*
