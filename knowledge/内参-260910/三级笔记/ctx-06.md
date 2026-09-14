# 12-Factor Agents：让 LLM 软件真能交付给生产用户的十二条原则

## 一句话主旨
好的 agent 大多不是 agent，生产可用靠可单点植入的工程原则。

## 作者试图回答的问题
核心问题：什么样的原则能让 LLM 驱动的软件好到敢交给生产客户？  
关联子问题：agent 承诺“扔掉 DAG”为何不成立？如何越过 70-80% 质量墙？哪些核心要素可以模块化植入既有产品？

## 三级论证骨架
### 一、核心判断：生产可用的 agent 大多是确定性软件，十二条是可植入的工程原则
#### 1.1 好的 agent 大多不是 agent
- 作者的中心问题只有一句：What are the principles we can use to build LLM-powered software that is actually good enough to put in the hands of production customers?
  - 他的经验结论：市面上自称 AI Agents 的产品 are not all that agentic，多数是确定性代码，只在恰当的点撒进几步 LLM。
  - 好的 agent 不遵循 here's your prompt, here's a bag of tools, loop until you hit the goal，而是 comprised of mostly just software。

#### 1.2 12-factor agents 定位为原则，不是框架
- 它是一组可拆解、可单点植入的工程原则。
  - 作者判断：即便 LLM continue to get exponentially more powerful，让 LLM 软件更可靠、可扩展、可维护的核心工程技法仍会存在。
  - 落地路径不是 greenfield rewrite，而是把 small, modular concepts 嵌进既有产品；多数熟练软件工程师没有 AI 背景也能定义和应用。

### 二、历史线索与 agent 循环：从有向图到“扔掉 DAG”，再到发现这不太行
#### 2.1 软件本身是有向图，DAG 编排器将其工业化
- 软件是有向图这一事实是演化起点。
  - 原话：There's a reason we used to represent programs as flow charts.
  - 约 20 年前 DAG 编排器流行：Airflow、Prefect、Dagster、Inngest、Windmill，提供可观测性、模块化、重试、管理。

#### 2.2 agent 的承诺是扔掉 DAG，但作者预告这不成立
- 承诺：不再逐步骤、逐边界情况写代码，而是给目标和一组可能转移，让 LLM 在运行时实时决策路径。
  - 诱惑：写更少的软件，从错误中恢复，甚至找到 novel solutions。
  - 转折：it turns out this doesn't quite work.

#### 2.3 agent 最小循环中，context 是全部状态
- 循环：LLM 输出结构化 json 决定下一步，确定性代码执行 tool call，结果 append 回 context window，直到 intent 为 done。
  - 初始 context 只是起始事件：用户消息、cron 触发、webhook。
  - 关键观察：context 就是 agent 的全部状态；谁掌握 context，谁就掌握 agent 的行为。

### 三、80% 墙：框架帮你快速到 70-80%，但越过它需要被框架藏起来的东西
#### 3.1 100+ SaaS builder 的旅程惊人一致
- 路径：决定做 agent → 产品设计/UX 映射 → 抓起框架 → 冲到 70-80% 质量水位 → 发现对面向客户功能不够好 → 反向工程框架、prompt、流程 → 推倒重来。
  - 关键数字：作者与至少 100 位技术型创始人聊过。
  - 越过 80% 的代价表达为 getting past 80% requires reverse-engineering the framework, prompts, flow, etc。

#### 3.2 为什么原则比框架更值钱
- 框架帮到 80%，但最后需要的恰是 prompt、context、控制流——这些正是框架替构建者藏起来的东西。
  - 因此原则的价值在于可单点植入，避免再次推倒重来。

#### 3.3 三条免责声明划定边界
- 不是对框架及其作者的贬低：BY NO MEANS meant to be a dig。
- 不谈 MCP：I'm sure you can see where it fits in.
- 示例主要用 TypeScript，但所有内容在 Python 或任何语言里同样成立。

### 四、设计判断：不是二选一，而是把模块化概念嵌入既有产品
#### 4.1 全押某个框架或做一次 greenfield rewrite 可能适得其反
- 作者翻遍数百个 AI 库、与数十位创始人合作后，得出结论：核心要素让 agent 优秀，但这些原则引入框架时大多也能顺带获得。
  - 最快路径是取出小而模块化的概念，融入既有产品。
  - 原文单独提为引述块：The fastest way I've seen for builders to get good AI software in the hands of customers is to take small, modular concepts from agent building, and incorporate them into their existing product。

#### 4.2 这些模块化概念不需要 AI 背景
- 作者强调：大多数熟练软件工程师都能定义和应用它们，即使没有 AI 背景。

### 五、十二条原则：清单、三条主线与一条荣誉提名
#### 5.1 十二条加上荣誉提名
- Factor 1: Natural Language to Tool Calls
- Factor 2: Own your prompts
- Factor 3: Own your context window
- Factor 4: Tools are just structured outputs
- Factor 5: Unify execution state and business state
- Factor 6: Launch/Pause/Resume with simple APIs
- Factor 7: Contact humans with tool calls
- Factor 8: Own your control flow
- Factor 9: Compact Errors into Context Window
- Factor 10: Small, Focused Agents
- Factor 11: Trigger from anywhere, meet users where they are
- Factor 12: Make your agent a stateless reducer
- 荣誉提名：Factor 13: Pre-fetch all the context you might need

#### 5.2 三条主线
- 所有权：Factor 2/3/8 三次重复 Own your prompts / context window / control flow。
- 状态与生命周期：Factor 5/6/12。
- 边界与外部世界：Factor 7/10/11。

#### 5.3 本次材料为索引页
- 每条 Factor 的详细论证在各自独立页面，本次原文只按标题原意呈现，不展开各条内部论证。

## 作者边界、反例与不确定性
- 作者明确三条免责声明：不贬低框架；不谈 MCP；示例用 TypeScript，但语言无关。
- 作者坦承团队自己 ignored all our own advice，为在 kubernetes 上运行分布式 agent 造了一个框架，形成自我反例。
- 本文为项目 README 索引页，十二条原则的逐条论证不在本次原文中；MCP 的适配位置也未展开。
- 80% 质量墙来自作者与至少 100 位构建者交流的个人观察，未给出进一步量化证据。
