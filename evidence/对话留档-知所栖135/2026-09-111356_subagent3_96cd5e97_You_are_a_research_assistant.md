# session 96cd5e97-7c7f-4536-ba68-a18e1a67f7e6

- cwd: /Users/housibo/Documents/知乎黑客松
- origin: subagent depth:3
- parent: d3ec0418-35f3-48f1-bdaa-46fa4f1e850d
- createdAt: 2026-09-11T13:56:33.933Z
- agentPreset: standard

- subagent: Independent critique of mnemonic medium (deepseek-flash)


## 👤 USER

You are a research assistant doing evidence-first retrieval. Your job: find INDEPENDENT third-party (not the authors) evaluations, critiques, replications, or reviews of Andy Matuschak & Michael Nielsen's "mnemonic medium" and their "Quantum Country" essay (quantum.country), and of Matuschak's spaced-repetition system "Orbit".

CRITICAL TOOL NOTE: The `web_fetch` tool in this session FAILS on many domains with "resolves to a non-public IP address". Use `bash` with `curl` instead. Example:
  curl -sSL --max-time 45 -A "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0 Safari/537.36" URL -o /tmp/out.html
Then extract readable text. A helper already exists — use it:
  python3 /tmp/f.py "URL" 8000        # prints extracted text (also caches raw html in /tmp/res/)
If /tmp/f.py is missing, write your own python3 script using regex + html.unescape to strip tags.
The `web_search` tool works normally. Use it to find leads, then curl to read the actual pages.

Search directions to try (and others you think of):
- "Quantum Country" review / critique / criticism blog posts
- mnemonic medium criticism / evidence / "not convincing"
- Andy Matuschak spaced repetition critique
- Michael Nielsen "transformative tools for thought" critique
- Hacker News discussions of Quantum Country and of ttft (news.ycombinator.com item pages — these contain substantive expert criticism)
- Michael Nielsen's own blog (michaelnielsen.org) posts about Quantum Country and about the evidence
- Scott Alexander / Astral Codex Ten, LessWrong, or similar long-form reviews of spaced repetition / Quantum Country
- academic papers citing "mnemonic medium" (Google Scholar / Semantic Scholar / arXiv)
- the blog "issarice.com" (Rice Issa) which has detailed notes on Quantum Country
- anything about Orbit being shut down or its reception

For EVERY claim you report, you MUST have actually fetched the page and seen the text. Requirements:
- Give exact English quotes (verbatim) with the URL where you read them.
- Give the author name, publication/venue, and date if stated.
- Distinguish clearly: (a) verified direct quotes you actually read, (b) paraphrase, (c) things you could NOT verify.
- NEVER invent quotes, numbers, dates, or URLs. If you cannot verify something, say "UNVERIFIED" explicitly.
- Prefer named, identifiable critics over anonymous comments, but do include substantive Hacker News comments with their permalink and username.
- Note especially any critic who questions the STRENGTH OF EVIDENCE (e.g. small sample, no control group, self-selection, novelty effect) or who tried to replicate.

Return a structured markdown report in Chinese (中文), with each finding as:
- 【证据等级】说法 / claim —— 作者, 日期 —— URL —— 原文英文引语(if any)

Aim for at least 6 distinct independent sources. Be rigorous and honest about gaps.
Your parent agent id is "d3ec0418-35f3-48f1-bdaa-46fa4f1e850d". Before you finish, send your result to that agent with send_message({ agent_id: "d3ec0418-35f3-48f1-bdaa-46fa4f1e850d", message: "<self-contained result>" }). The parent shares your workspace but does not automatically receive your transcript, tool output, or reasoning. Send earlier messages as well when a finding changes what the parent should do next; sending a message does not end your turn.


## 👤 USER

Current runtime context. This snapshot supersedes earlier runtime-context snapshots.

Current DSH file policy: danger-full-access. The DSH file sandbox does not restrict file modifications by available operations.

Approval prompts are disabled in this session: actions that require approval are rejected automatically — do not request sandbox escalation (do not set `sandbox_permissions`).

You are a delegated subagent: your permission scope was fixed when you were started and cannot be widened from inside this session — operations that require approval are rejected automatically. When the task needs access beyond that scope, do not retry the denied operation; state the limitation in your reply so the delegating agent can handle it.


## 👤 USER

<system-reminder>
A skill is a reusable set of task-specific instructions. The following skills are available in this session:

<available_skills>
- `agent-ide`: Agent IDE CLI for TypeScript/JavaScript code intelligence and safe refactoring. Use when Codex needs to inspect or change TS/JS projects with agent-ide: cycles, impact, search/find-references, call-hierarchy, rename symbols, move files or members, change function signatures, clean dead code, update imports/call sites, or control index cache with --no-cache/--cache-dir.
- `ai-native-helpdesk`: 面向 AI／Agent／OpenClaw 社区的薄入口 Helpdesk Skill 导航中心。负责守门、判模并按需路由到子 skill（aihd-diagnosis / aihd-good-question / aihd-thinking / aihd-action / aihd-knowledge）。用户不知道该问谁、要查 AI/Agent/OpenClaw 相关经验或需要社区处理经验时使用。
- `ai-video-pipeline`: 一次调用接管 DBS 已确认并冻结的文案与可选语音包，自动完成环境预检、配音字幕、全时间线视觉覆盖、经确认的概念图、非信息图场景、对象接力转场、Remotion 三轮视觉迭代、低清 proof、QA 与用户确认后的正式成片。用于用户说“一键生成视频”“生产 AI 视频”“配音、配图和视频”“把交互式学习产物做成视频”“继续这个视频 run”“按之前的流水线制作”时。除声音权利、概念关系、proof 验收、正式导出授权，以及显式 director 模式下的 production shape 等明确人工门外自动推进并可中断续跑，适合 Claude Code、Codex 和 GLM 等低上下文成本环境。
- `aihd-action`: 当用户知道要推进什么但需要一个下一步时使用；执行、验证、等待、停止和无需行动都可以是合法去向。
- `aihd-diagnosis`: 当用户表现出心理或动机信号（做不动、拖延、反复换方向、情绪宣泄）时使用；识别并标记信号边界，不诊断不归因；执行问题交给 aihd-action。
- `aihd-good-question`: 当缺失语境会改变答案、适用边界、风险或下一步时，通过收敛式追问（每次 1 问、够用即停）帮用户把问题问清楚；默认不追问、直接回答。
- `aihd-knowledge`: 当用户查询 AI／Agent／OpenClaw 的具体事实或历史处理经验时使用；默认检索公开知识库（ai-native-knowledge-base）候选池，需要补全上下文时才回读私域原始对话。
- `aihd-safety`: 守门红线处理参考文档（非路由目标）。入口守门命中安全红线时，按本文件规则执行承接、转介、暂停确认；不由判模路由到本文件。
- `aihd-thinking`: 当用户需要分析假设、逻辑、事实或原因时使用；输出候选解释 + 验证设计（draft），结论由用户验收；保留未知，不用反复追问替代分析。
- `aihot`: AI HOT (aihot.virxact.com) 中文 AI 资讯查询 Skill。当用户想知道"今天 AI 圈有什么"、"AI 日报"、"AI HOT"、"AI 资讯"、"AI 热点"、"最近 AI"、"OpenAI/Anthropic/Google 最近发布了什么"、"AI hot today"、"AI news today"、"看一下 AI 行业动态"、"今天有什么大模型发布"、"昨天 AI 圈"、"看下精选条目"、"AI HOT 精选"、"最近一周的 AI 论文"、"AI 模型发布"、"AI 产品发布"、"AI 行业动态"、"AI 技巧与观点" 等任何中文 AI 资讯查询时使用。即使用户只说"AI 圈"、"AI 新闻"、"AI 日报"，或者只是问"今天发生了什么"且上下文是 AI / 大模型 / LLM / 创业领域，也应该触发本 Skill。Skill 会直接 curl 公开 REST API 拉数据并整理成中文 markdown 简报，不需要用户配置任何 API Key 或 MCP server。**不要 undertrigger**——用户问 AI 资讯而你不调...
- `anthropic-art`: Generate full-background editorial illustrations in Anthropic's hand-drawn visual language: warm or muted opaque color fields, irregular ivory carrier shapes, and bold black gestural linework. Use when the user asks for an Anthropic-style, Claude-style, hand-drawn AI editorial, newsroom, blog hero, social card, or conceptual illustration, especially when they explicitly require a colored background rather than a transparent icon.
- `audio-to-subtitles`: Convert local audio/video files or public media URLs into subtitle files by uploading local files to Cloudflare R2 and calling Volcengine AI MediaKit ASR subtitles API. Also supports MiniMax text-to-speech generation from text or text files, with optional subtitle generation from the produced audio. Supports batch processing, SRT/VTT/JSON output, language selection, speaker labels, configurable MiniMax voice ID and model. Use when the user asks to turn audio/video into subtitles, generate ASR...
- `capture-lessons`: 经验复利。只在用户明确要求复盘一段已经完成的真实任务时使用；只处理当前项目与用户指定的当前任务，不扫描其他项目、历史或共享记忆。流程：读项目入口与上下文 → 检查 LESSONS.md 索引 → 从任务中找带原始证据的真实纠正/返工/有效做法 → 过四道筛（本次效果/复用动作/普通智能/重复冲突）→ 先展示候选与被滤原因（允许零候选）→ 用户确认后才写入当前项目 LESSONS.md（每条只写一个位置）→ 读回验证。
- `code-review`: Review the changes since a fixed point (commit, branch, tag, or merge-base) along two axes: Standards (does the code follow this repo's documented coding standards?) and Spec (does the code match what the originating issue/spec asked for?). Runs both reviews in parallel sub-agents and reports them side by side. Use when the user wants to review a branch, a PR, work-in-progress changes, or asks to "review since X".
- `codebase-design`: Shared vocabulary for designing deep modules. Use when the user wants to design or improve a module's interface, find deepening opportunities, decide where a seam goes, make code more testable or AI-navigable, or when another skill needs the deep-module vocabulary.
- `codex-chatgpt-pro-engineering`: 使用 ChatGPT Pro 作为外部高级工程师，由 Codex 总控并在本地独立验收复杂代码任务。Use when the user asks Codex to command ChatGPT Pro, run a dual-agent engineering workflow, delegate deep research/design/coding through a logged-in browser, split independent complex work across Pro conversations, or iterate on external patches until repository gates pass. Do not use for simple edits that Codex can finish directly or when source transmission is not authorized.
- `codex-context-setup`: 检查和配置 Codex 的上下文窗口与自动压缩阈值，支持 Windows、macOS 和 Linux，以及新设备迁移、1M 设置、配置未生效和旧任务窗口偏小的排查。仅处理本地 Codex 上下文配置，不用于 ChatGPT 网页上下文设置。
- `codex-lesson-loop`: 把 Codex 本地 session 日志当错题本：增量扫描识别返工/失败信号，蒸馏成须主人批准的教训并入库 Nowledge，持续记账返工率与闭环数。用于「跑一圈」「错题 loop」「codex 复盘」「教训闭环」「开环报警」或分析近期 Codex 失败/返工时。
- `codex-self-optimization`: Codex 本地自我优化工作台，用于改进用户这台机器上的 Codex 外部行为系统。Use when the user wants Codex to become more useful, optimize itself, learn from failures, reduce fake completion, improve routing, improve skill triggers, audit recent Codex behavior, or run A-B-C self-improvement loops with diagnosis reports, Darwin-lite skill optimization, smoke tests, validation gates, run-through evidence, and user-approved replacement only.
- `codex-usage-meter`: Show local Codex token usage and rate-limit percentages from ~/.codex session logs. Use when the user asks about Codex token consumption, quota, usage, rate limits, "消耗多少 token", "额度", or "用量".
- `concept-learning`: 从长文章、课程稿、研报、演讲或转写材料中提取真正支撑论证的概念基石，为每个概念保留原文 context，并用费曼式语言解释，最后用 Mermaid 重建概念的分层架构。用户要求概念笔记、概念解析、概念辞典、费曼解释、概念网络或概念架构图时使用。
- `content-remix`: 把已经完成八部分拆解的抖音视频、小红书图文或小红书视频，迁移成泊舟自己的小红书图文、抖音口播或小红书视频内部草稿。用户说“做二创”“按这个爆款做我的版本”“参考这个机制重新创作”“把这个拆解写成小红书/抖音”“不要照抄地借鉴”时使用；先提炼可迁移机制、删除不可照搬内容、映射泊舟真实经历/案例/判断，再按目标平台重新组织。不用于爆款判级、原文拆解、普通润色、自动发布或发布后复盘。
- `context-bus`: 跨 Agent 交接协议（ZCode↔Codex 双边，共用 Nowledge Mem 总线）。会话开工接手任务时、跨工具派活或接活时、任务收尾交接时、用户说「交接/收工/存档/交给 Codex/从 Codex 接手/这事谁做」时、大型任务结束时使用。负责：开工仪式（读共享上下文+路由）、收工仪式（写交接线程+蒸馏教训）、记账规则（事实只写一处）。
- `course-feishu-pack`: 把一份课程稿、讲座转写或直播清洗稿，端到端做成「三级笔记 + 概念提取 + 飞书导入版 DOCX + 上传飞书 + 交付回执」的一条龙流水线。 当用户要求「课程整理上传飞书」「三级笔记概念提取上传」「整理这节课发飞书」「洗稿＋笔记＋概念＋飞书一条龙」等整链请求时使用； 材料已在中间阶段（清洗稿／三级笔记／概念提取）时从对应站点继续。 不负责单站笔记或单站概念（路由到 note-taking-pro / concept-learning）、Logseq／Notion 入库、视频制作。 触发方式：/course-feishu-pack、课程飞书、课程整理上传、这节课整理发飞书。
- `coze-agent-collaboration`: CRITICAL Coze project Agent collaboration protocol: use `coze agent at --mode request` to delegate to peer Agents and `coze agent at --mode response` to return a result for an inbound Agent-targeted request. A visible @mention never dispatches or responds. Also use this skill to discover Agent members, consume collaboration responses without creating a loop, or retry an unchanged call after an unknown transport outcome.
- `dbs`: dontbesilent 商业工具箱主入口，提供新手教程与单任务动态编排。用户第一次使用 dbskill、不知道该用哪个正式 Skill、带着真实任务寻求合适能力，或在一项任务完成后询问下一步时使用。
- `dbs-action`: 用阿德勒心理学框架诊断执行阻滞。用户知道该做什么却迟迟不做、反复拖延或行动中断时使用。
- `dbs-agent-migration`: 审计项目规则文件、识别真源、统一命名并生成桥接，把项目迁移成多端一致的 Agent 工作台。用户要求迁移 Claude Code、Codex、Grok、通用 Agents 或整理 AGENTS.md 时使用。
- `dbs-ai-check`: 扫描文案中的 AI 写作特征并输出检测报告，默认只诊断不改写。用户要求检查 AI 味、AI 痕迹或机器化表达时使用。
- `dbs-benchmark`: 用五重过滤法寻找值得模仿的对标，并排除主体差异造成的噪音。用户要求找对标、选择模仿对象或分析竞争参照时使用。
- `dbs-bridge`: 将单个 Skill 或 Skill 集合自动桥接到通用 Agents、Claude Code、Codex、WorkBuddy、Grok、Hermes Agent、Kiro、Qwen Code、Cline 等 Agent。用户要求跨 Agent 安装、同步、查看、去重或取消 Skill 链接时使用。
- `dbs-chatroom`: 根据话题推荐或接受用户指定的专家，模拟多角色对话并总结分歧。用户要求定向聊天室、专家讨论或继续当前聊天室时使用。
- `dbs-chatroom-austrian`: 由哈耶克、米塞斯与 Claude 从奥派经济学视角展开多角色讨论。用户要求进入奥派聊天室或用奥派分析问题时使用。
- `dbs-content`: 诊断如何把已经确定的选题做成好内容。用户要求设计内容、检查文案或改善内容表达时使用。
- `dbs-content-risk-check`: 面向创作者的内容发布风险检查。逐句检查自媒体、社交媒体和内容平台的标题、正文、图片文字、字幕、口播、评论、账号资料及视频画面，分别判断平台机器可能识别什么、内容本身存在什么实质问题，并给出具体位置和最小修改动作；需要明确视频语境边界时，额外生成真实准确的三行贴片小字。用户询问「检查敏感词」「发布前排雷」「这篇内容哪里可能违规」「这条小红书能不能发」「视频上放什么声明」时使用。保留强观点、情绪张力、个人风格和传播钩子。
- `dbs-content-system`: 把本地文稿、推文、选题、案例和课程稿整理成可持续生长、可重组复用的内容工程。用户要求结构化内容资产、整理旧素材或建立主题地图时使用。
- `dbs-decision`: 把需要长期跟踪的业务、关系、健康、职业、学习或投资问题建成本地决策知识工程。用户要求决策立案、结果回填、状态画像或长期复盘时使用。
- `dbs-deconstruct`: 用维特根斯坦与奥派经济学方法拆解模糊的商业概念。用户要求解释一个词、澄清概念边界或识别概念混用时使用。
- `dbs-diagnosis`: 自动识别用户是在解决具体商业问题，还是希望全面检查商业模式，并进入对应诊断流程。用户希望拆解业务、检查商业模式或消解具体商业困境时使用。
- `dbs-goal`: 提取已有约束，只追问影响执行或验收的信息，把模糊愿望和目标整理成可行动、可检查的交付物。用户要求澄清目标、检查任务是否说清或定义交付结果时使用。
- `dbs-good-question`: 把模糊问题改写成 Agent 可推理、可批评、可验证的问题说明书，并判断自动化解决程度。用户要求把问题说清、生成好问题或评估 Agent 可解性时使用。
- `dbs-hook`: 诊断短视频开头的问题并生成优化方案。用户要求修改开头、提高开场吸引力或降低开头流失时使用。
- `dbs-install-skill`: 将单个 Skill 或 Skill 集合安装到通用 Agents、Claude Code、Codex、WorkBuddy、Grok、Hermes Agent、Kiro、Qwen Code、Cline 等 Agent。用户要求跨 Agent 安装、同步、查看、去重或卸载 Skill 时使用。
- `dbs-jtbd`: dontbesilent JTBD 任务澄清。用 Jobs to Be Done 识别具体情境中用户想推进的进展、切换方案的力量与可观察的选择标准，据此优化产品、内容、服务、决策和 AI 提示词。调用名：/dbs-jtbd。用户问「到底要解决什么」「为什么会选择这个方案」「用 JTBD 重写提示词」时使用。
- `dbs-knowledge`: 把本地文件夹建成 Agent 可稳定查找、收录和维护的知识库，并支持导航、版本判断、健康检查及 SOT 分层治理。用户要求搭建、查询、更新、整理或瘦身知识库时使用。
- `dbs-learning`: 把课题拆成连续学习文章，并根据用户反馈调整后续深度、角度和节奏。用户要求系统学习一个主题、继续下一篇或按反馈调整课程时使用。
- `dbs-learning-strict`: dontbesilent 严格交互式学习。用于考试、认证、多人协作、对外正式课程或知识库写回；保留 v5.3 的归属、状态、证据与恢复能力。 仅在用户明确调用 /dbs-learning-strict，或明确要求考试、认证、多人协作、正式课程、可审计证明、知识库写回时触发。
- `dbs-report`: 把多次 dbs-save 存档合并成可交付的 Markdown 报告。用户要求汇总诊断、整理报告或生成可分享材料时使用。
- `dbs-resonate`: 用匹配当前文稿的传播学与社会心理学理论，诊断共鸣机制、问题位置和修改方向。用户担心内容没流量、没戳中观众、完播率低或不确定能否发布时使用。
- `dbs-restore`: 恢复由 dbs-save 保存的最近诊断状态。用户要求接着上次、查看此前结论或继续未完成诊断时使用。
- `dbs-save`: 把当前诊断的关键状态保存到本地，并查看或设置存档位置。用户要求保存结论、跨会话续接或修改存档位置时使用。
- `dbs-script-flow`: 检查短视频逐字稿的段落衔接、信息密度和口播流畅度，定位观众可能划走的位置。用户要求检查逻辑延续、文稿顺畅度或流失风险时使用。
- `dbs-skill-cleaner`: 扫描本地 Skill 中的广告导流、隐蔽商业意图、任务劫持、可疑外部调用和敏感数据读取，默认只报告。用户要求审查、清理或隔离问题 Skill 时使用。
- `dbs-skill-maker`: 通过需求分析把反复出现的问题制作成可安装、可分级验证的单个 Skill。用户要求做 Skill、把问题沉淀成 Skill、检查或测试候选 Skill 时使用；只有用户明确要求分享或发布时，才准备 GitHub 仓库并验证 `npx skills add`。
- `dbs-slowisfast`: 识别关键环节中的贪快与必要摩擦，寻找能长期积累资产的方法。用户担心推进过快、反复返工或希望设计长期复利路径时使用。
- `dbs-spread`: 用传播学与社会心理学中匹配当前内容的理论，解码共鸣机制、受众情绪、有效立场和传播动机。用户要求分析内容为什么能引起共鸣、打中什么情绪或受众还想听什么时使用。
- `dbs-standard-answer`: 围绕复杂问题先挖掘相关行业、学科、作者与可信理论，再比较结构同构的历史成功、失败和反例，提炼带条件的标准答案。用户需要同时获得理论解释与历史比较，或明确询问历史上如何解决、有没有经典解法、标准答案时使用；只需给现有命题、案例、PPT 或方法论找理论依据时不使用。
- `dbs-theory-grounding`: 理论溯源与案例重释。审查 PPT、课程、文案或方法论中的经验判断，先判断命题是否成立，再匹配并核实可信理论，用该理论重释案例并标明边界。适用于给自创理论找依据、给 PPT 补理论来源、判断一句话能否上升为理论、检查是否硬套名人；聚焦单次理论锚定，不默认展开历史同构研究。
- `dbs-update`: 更新官方 dbskill，并保留其他 Skill 与用户存档。用户要求更新、升级、检查 dbskill 版本，或在更新提醒后回复 1 时使用。
- `dbs-video-extract`: 接收抖音、小红书、微信视频号等短视频链接或分享文案，查询作品／账号数据并提取语音文字稿，按作者和标题归档为 Markdown。用户希望完整解析短视频、取得数据或文字稿时使用；运行前检查 TikHub 与轻抖使用凭证，缺少时用新手能理解的方式引导购买和安全配置。
- `dbs-wechat-html`: 把 Markdown 转成可粘贴到微信公众号后台的 HTML，并提供 15 种内置风格。用户要求生成公众号 HTML、制作微信版本或排版公众号文章时使用。
- `dbs-xhs-title`: 从 75 个经过验证的小红书标题公式中选择并生成合适标题。用户要求起小红书标题、改标题或选择标题公式时使用。
- `define-goal`: Help the user define a concrete, measurable goal before starting work, especially when they ask to use the goal tool, create a goal, set an objective, clarify success criteria, or turn a fuzzy intention into a quantitative outcome. Use this skill for goal creation and goal refinement only; it does not manage durable snapshots, decision logs, or long-running execution artifacts.
- `diagnosing-bugs`: Diagnosis loop for hard bugs and performance regressions. Use when the user says "diagnose"/"debug this", or reports something broken/throwing/failing/slow.
- `domain-modeling`: Build and sharpen a project's domain model. Use when the user wants to pin down domain terminology or a ubiquitous language, record an architectural decision, or when another skill needs to maintain the domain model.
- `domain-to-live`: Take an already-registered domain live on Cloudflare DNS plus Netlify, verify mainland China reachability with third-party telecom/unicom/mobile probes, and publish candidate-first with rollback. Use when a desktop agent must go from an owned domain to a recoverable public site. Do not use for buying domains, ICP filings, inland SLA claims, databases, payments, always-on servers, or chat-only web models.
- `douyin-cover`: 生成抖音、视频号、小红书等短视频封面图、视频标题图和合集封面，也能诊断和改版已有封面。用户说做封面、生成封面、抖音封面、视频封面、标题图、合集封面、3:4、4:3、1:1、短视频首图、动态封面首帧、给这期视频做图、这封面为什么没人点、帮我改封面、封面点击率怎么提升、诊断封面时都应使用。小白学AI系列封面除外：遇到“小白学AI封面/小白学AI第N集封面”时优先使用 xiaobai-ai-cover skill（系统内置 imagegen + 固定角色参考图）。这个 skill 会根据每次标题重新设计简约大方、有点击理由的封面，保留泊舟 IP 人物识别特征，内置「信息密度 × 视觉锚点」方法论和冲突型/数字型/截图型/情绪型可选模板参数，支持 3:4 竖版、4:3 横版和 1:1 正方形，默认必须使用系统内置 `imagegen` skill / `image_gen` 工具直接生成带准确标题文字的完整发布级封面；涉及泊舟 IP 或其它指定人物/IP 时，必须把对应参考图作为 identity reference 放入生图上下文，不能只靠文字描述；禁止用代码、Canvas、Pillo...
- `engineering-meta`: Engineering project meta-skill that routes a project or feature from idea/spec to execution, acceptance, and knowledge cleanup while guarding mode boundaries, domain contracts, context packs, rollback, artifact evidence, and learning loops. Use when the user asks to operate or improve engineering process, project kickoff, iteration planning, backlog/progress orchestration, phase execution, PM acceptance, cleanup, handoff, release README, context-loss repair, terminology drift, concept freeze,...
- `feynman-logseq-pipeline`: Turn articles, transcripts, saved pages, or learning materials into source-structure-first Feynman-style tertiary notes, concept extraction, optional concept-page ingestion, and Logseq Markdown pages. 触发方式：/feynman-logseq-pipeline、/三级笔记、/概念提取、/2w2h、/logseq入库。 Use when the user asks to do "三级笔记", "概念提取", "概念入库", "2W2H", "费曼学习法", or to place processed notes into a Logseq graph or Google Drive Logseq folder. Trigger: /feynman-logseq-pipeline, /三级笔记, /概念提取, /2w2h, /logseq-ingest.
- `first-flight`: First Flight 的总入口和流程导览——「建站元技能」plugin 里的核心 0→1 工作流，帮人从 0 到 1 把网站搭建出来的 spec-driven skill 系列。当用户说"我想做一个网站但不知道从哪开始"、"帮我搭一个个人 / 公司 / 产品网站"、"想用 AI 帮我把网站做出来"、"我有个网站的想法，怎么开始"、"want to build a website from scratch / start a new site"，或者用户描述了一个**尚未启动**的网站项目、需要先理清楚一系列文档才能让 AI 接手开发时，请务必使用这个 skill。First Flight **只服务于"第一次起飞"——从零搭起一个网站**，不处理已有项目的迭代。它会引导用户依次产出：Step 0 问题定义（双向钢人论证）→ BRIEF（长期纲领）→ PRD（首版功能与信息架构）→ DESIGN（视觉风格）→ ARCHITECTURE（技术选型）→ CONTENT（内容填充）→ AGENTS（AI 入口文档）。完成后用户复制这 6 份文档到自己的代码项目里，就可以让 AI 全自...
- `first-flight-agents`: First Flight 系列的第 6 步（最后一步）——基于已生成的长期文档（BRIEF / DESIGN / ARCHITECTURE）和当前迭代文档（iterations/v{N}-{slug}/PRD.md，v1 还需要 CONTENT.md）自动生成 AGENTS.md（通用 AI 入口文档，兼容 Codex / Claude 等 agent）+ CLAUDE.md（一句话指向 AGENTS.md）。当用户已经走完 CONTENT.md 准备进入最后一步、或者说"帮我生成 AGENTS.md / 让 AI 能上手这个项目 / wrap up the First Flight"时，请务必使用这个 skill。这是 First Flight 流程的第 6 步（BRIEF → PRD → DESIGN → ARCHITECTURE → CONTENT → **AGENTS**），但生成前必须先跑源文档发现和生成质量门禁。
- `first-flight-architecture`: First Flight 系列的第 4 步——通过结构化对话帮用户产出网站项目的 ARCHITECTURE.md，把"长什么样"落实成"用什么技术怎么搭"——框架选型、UI 库、样式方案、内容存储、第三方服务、部署、代码组织、性能 / a11y / 安全预算。**对小白用户提供整套推荐栈，让他们零决策也能往下走；对有经验用户保留选择权**。当用户已经有 DESIGN.md 准备进入技术决策、或者用户说"帮我选技术栈 / 框架 / 部署方式"、"create architecture spec for my site"、"我有 DESIGN 了下一步"时，请务必使用这个 skill。这是 First Flight 流程的第 4 步（BRIEF → PRD → DESIGN → **ARCHITECTURE** → CONTENT → AGENTS），输出会成为 AI 真正开始写代码的技术基础。
- `first-flight-brief`: First Flight 系列的第 1 步——通过结构化对话帮用户产出网站项目的 BRIEF.md（200-400 字的长期纲领）。当用户说"我想做一个个人网站 / 公司官网 / 作品集 / 落地页 / 博客但不知道怎么开始"、"帮我写网站的 brief / 简介 / 立项文档"、"我想让 AI 帮我做网站，但没头绪从哪里讲起"、"准备和 AI 协作做网站，第一步要写什么"、"create a website brief / project brief for a site / 网站立项"，或者用户描述了一个尚未启动的网站想法、显然需要先把"做什么、给谁、为什么"讲清楚才能往下走，请务必使用这个 skill，不要直接动手写代码或跳到技术选型。这是 First Flight（一套帮人从 0 到 1 把网站搭起来的 skill 系列）的入口：BRIEF → PRD → DESIGN → ARCHITECTURE → CONTENT → AGENTS。
- `first-flight-content`: First Flight 系列的**首次开发专属** skill——为 v1-launch 生成 CONTENT.md，把 PRD 信息架构里的每个内容槽（slogan / 副文案 / 作品列表 / etc.）用三种模式之一填上：📝 直接文案 / 🤖 AI 生成需求 / 📦 数据源。**只服务于首次开发**——后续迭代时**不要触发**这个 skill，因为迭代时新内容应该通过 CMS / JSON / API 等方式管理。当用户在首次开发流程中刚做完 ARCHITECTURE.md、或者用户说"帮我写网站文案 / 内容 / copywriting"、"create content spec for my site"、"我有 ARCHITECTURE 了下一步是 CONTENT"，且项目还没有 iterations/v1-launch/CONTENT.md 时，请使用这个 skill。这是 First Flight 首次流程的第 5 步（BRIEF → PRD → DESIGN → ARCHITECTURE → **CONTENT** → AGENTS → phases），...
- `first-flight-design`: First Flight 系列的第 3 步——通过结构化对话帮用户产出符合 Google DESIGN.md 标准的网站项目 DESIGN.md，定义视觉与 UX 风格（气质、色彩、字体、布局、阴影、形状、组件、Do's and Don'ts），并扩展 First Flight 独有内容（动效、响应式、a11y、UI 框架倾向、参考）。当用户已经有 PRD.md 准备进入"网站长什么样"层面、或者用户说"帮我定网站的风格 / 视觉 / 设计语言"、"create a design spec for my site"、"我有 PRD 了下一步是设计"时，请务必使用这个 skill。**只服务于第一次设计定义**，不处理重构。这是 First Flight 流程的第 3 步（BRIEF → PRD → **DESIGN** → ARCHITECTURE → CONTENT → AGENTS），输出会成为 ARCHITECTURE.md（UI 框架选型）的输入。
- `first-flight-grill`: First Flight 新增 Step 0：建站前先用双向钢人论证把"用户真正想解决的问题"问清楚，再进 BRIEF。
- `first-flight-phases`: 用 plan.md + phase 子文档管理复杂开发任务，强制 AI 边做边更新进度，每个 phase 完成后停下来让用户验收——避免 AI 一口气做完导致失控。当用户开始写代码、改动 ≥ 5 步骤 / 跨多文件 / 跨多次会话时务必触发这个 skill。当用户说"分阶段做"、"按 phase 管理"、"plan 一下再做"、"先列计划再开工"、"break this down into phases"，或者刚做完 First Flight 的 6 份 spec 文档准备进入开发实施阶段时，请使用这个 skill。**首次开发和后续新功能迭代都适用**——只要任务复杂到需要中途让用户看进度，就走这套。这是 First Flight 的开发实施层 skill，跟前 6 个 spec 文档 skill（greenfield only）不同，phases skill 可以反复使用。
- `first-flight-prd`: First Flight 系列的 PRD skill——帮用户产出某次迭代的 PRD.md（首版或后续新功能 / 重构）。**自动检测首次还是迭代**：项目里没有 iterations/ 目录走"首次"路径，写到 iterations/v1-launch/PRD.md；已有 iterations/ 走"迭代"路径，写到 iterations/v{N}-{slug}/PRD.md（N 自增、slug 用户给）。当用户说"帮我写 PRD / 产品需求文档"、"我有 BRIEF 了下一步该写什么"、"网站第一版要做什么"、"加新功能要写 PRD"、"做迭代规划"、"create a PRD for my new site / new feature"，或者刚用 first-flight-brief 产出了 BRIEF.md 准备进入页面 / 信息架构层面、或者已经完成首版要做下一轮迭代时，请使用这个 skill。**首次 + 迭代都用同一个 skill**，行为按检测结果分支。
- `gh-address-comments`: Help address review/issue comments on the open GitHub PR for the current branch using gh CLI; verify gh auth first and prompt the user to authenticate if not logged in.
- `gh-fix-ci`: Use when a user asks to debug or fix failing GitHub PR checks that run in GitHub Actions; use `gh` to inspect checks and logs, summarize failure context, draft a fix plan, and implement only after explicit approval. Treat external providers (for example Buildkite) as out of scope and report only the details URL.
- `google-drive-cloud-first`: Use this when working with the user's Google Drive under low local disk space, especially when Drive sync is blocked, LogseqAll may be only partially available locally, or the task should prefer the official Google Drive connector/MCP tools over local synced files.
- `grilling`: Grill the user relentlessly about a plan, decision, or idea. Use when the user wants to stress-test their thinking, or uses any 'grill' trigger phrases.
- `guizang-material-illustration`: Generate Guizang-style material illustrations, labeled explanatory visuals, material-styled chart illustrations, and data-first editorial images from articles, notes, product concepts, workplace reports, creator posts, tutorials, school materials, humanities topics, science explanations, screenshots, or chart data. Use when the user asks for 配图, 带字插图, 解释图, 图解插画, 概念拆解图, 图表美化, 数据图美化, 3D 图表, 汇报配图, 内容配图, 小学课文配图, 生物/化学/物理解释图, 人文类配图, process/loop/system diagrams, or wants GPT-Image / image generati...
- `hook-writing`: 为内容写钩子和开头，也可拆解爆款视频开头、逐字稿开头、文章、推文、小红书图文和短视频脚本里的钩子，并沉淀到钩子库。用于视频开头拆解、逐字稿开头分析、推文、文章、小红书图文、短视频脚本、标题和开头优化；当用户说“写个钩子”“开头不抓人”“第一句话怎么写”“标题不够抓人”“优化开头”“拆解这个视频开头”“拆解逐字稿开头”“拆解这个钩子”“把这个开头收进钩子库”时触发。
- `huashu-nuwa`: 女娲造人：输入人名/主题/甚至只是模糊需求，自动深度调研→思维框架提炼→生成可运行的人物Skill。 两种入口：(1)明确人名→直接蒸馏 (2)模糊需求→诊断推荐→再蒸馏。 触发词：「造skill」「蒸馏XX」「女娲」「造人」「XX的思维方式」「做个XX视角」「更新XX的skill」。 模糊需求也触发：「我想提升决策质量」「有没有一种思维方式能帮我...」「我需要一个思维顾问」。 English triggers: "distill [person]", "nuwa", "create a [person] perspective skill", "how does [person] think", "I need a thinking advisor".
- `human-writing`: 通用中文创作与改稿 Skill。用于知乎回答、论坛长帖、公众号文章、博客、评论、人物故事、历史叙事、新闻与行业解读、科普、教程、评测、个人叙事、小说、故事、对白、口播和演讲稿。默认写成一个见过事、查过材料、愿意把来龙去脉讲清楚的人在说话，重点保留中文互联网长回答与长帖的活人感和自然中文韵律，避免空泛的机构腔、喊口号式演说腔、营销腔和模型腔。非虚构长文先检查材料够不够，材料不足时研究、追问或缩短，绝不用重复解释灌字数。现实内容额外核验事实、引语、数据与用户亲历，虚构内容可以创造人物、场景、对白、心理与情节。成稿正文严禁冒号、破折号、“不是……而是……”及同类翻案句，并清除商业黑话和模型惯用黑话。不创建作者画像、个人规则库或个人写作 Skill。
- `hv-analysis`: 横纵分析法（Horizontal-Vertical Analysis）深度研究Skill。由数字生命卡兹克提出，融合了索绪尔的历时-共时分析、社会科学的纵向-横截面研究设计、商学院案例研究法与竞争战略分析的核心思想。 当用户想要系统性研究一个产品、公司、概念、技术或人物时使用。核心是双轴分析：纵轴追踪从诞生到当下的完整生命历程（以叙事故事呈现），横轴在当下时间截面上与竞品/同类进行系统性横向对比，最后交叉两条轴产出独到洞察。最终产出一份排版精美的PDF研究报告。 触发词包括但不限于：横纵分析、研究一下、帮我分析、深度研究、做个研究、调研一下、竞品分析、帮我看看这个东西怎么样、这个产品/公司/概念是怎么回事、帮我摸清楚、帮我搞懂、帮我做个deep research。 即使用户只是说"帮我了解一下XX"或"XX是什么来头"，只要上下文暗示需要系统性的深度研究（而非简单的概念解释），都应该触发。也适用于用户丢来一个产品名、公司名、技术名词说"帮我研究一下这个"的场景。 不要用于简单的名词解释（用户只是问"XX是什么"）、不要用于公众号写作（那个用khazix-writer）、不要用于纯...
- `hyperframes`: Mandatory entry point: read this first for any request to make, create, edit, animate, or render a video, animation, or motion graphic, including a promo, explainer, captioned clip, title card, overlay, slideshow or interactive deck, Remotion port, or any HyperFrames HTML composition. Also use it to inspect, diagnose, validate, preview, publish, or batch-render an existing HyperFrames project. Inputs may be a website URL, GitHub PR, Figma design or URL, text or brief, existing footage, or mus...
- `hyperframes-animation`: All animation knowledge for HyperFrames — atomic motion rules, multi-phase scene blueprints, scene transitions, broader motion-design techniques, AND the seven runtime adapters (GSAP default, plus Lottie, Three.js, Anime.js, CSS keyframes, Web Animations API, TypeGPU). Use for any motion or animation task: pick 2-4 rules and compose, or load a blueprint, or look up runtime-specific API (e.g. GSAP eases / Lottie player / Three.js mixer). Also covers auditing an existing composition's choreogra...
- `hyperframes-cli`: Use the HyperFrames CLI development loop: init, add, catalog, capture, lint, check, snapshot, compare, grade-compare, preview, play, present, beats, keyframes, single or batch render, publish, cloud, cloudrun, feedback, lambda, doctor, browser, info, upgrade, skills, compositions, docs, benchmark, telemetry, transcribe, auth, tts, and remove-background. Also use when diagnosing build or render failures. validate, inspect, and layout are deprecated aliases; use check. Covers local, HeyGen-host...
- `hyperframes-core`: The HyperFrames composition contract — build one renderable project. Use for composition structure, the `data-*` timing attributes, `class="clip"`, tracks, sub-compositions, variables, framework-owned media playback, deterministic-render rules, and validation. Also covers Tailwind projects and the STORYBOARD.md / SCRIPT.md plan formats. Read before writing composition HTML.
- `hyperframes-scene-animator`: 接管 talking-head-hyperframes 的 READY_FOR_EXECUTION 交接，由主 Agent 完成字幕分镜与具体导演，先交付全镜头最终静态页审核，批准后再用快速子 Agent 协助实现互不冲突的镜头与动效，最后完成 HyperFrames proof、四遍审查与 preview-v1。适用于口播镜头、语义动效、转场、声音 cue 和整改；TEMPLATE_ONLY 或路径/hash/合同不完整时精确拒绝，不用于创建固定模板。
- `jiangge-ai-era-advisor`: 姜哥5.28直播蒸馏出的 AI 时代个体生存顾问。用于分析个人在 AI 时代的职业、城市、实习、项目、组织、亲密关系、父母沟通和流动性选择。触发词：姜哥视角、AI时代怎么活、节点人生、结果买单、数字游民、流动性、选城市还是选专业、大厂小厂怎么选、用姜哥5.28直播判断。
- `jupyter-notebook`: Use when the user asks to create, scaffold, or edit Jupyter notebooks (`.ipynb`) for experiments, explorations, or tutorials; prefer the bundled templates and run the helper script `new_notebook.py` to generate a clean starting notebook.
- `khazix-writer`: 数字生命卡兹克（Khazix）的公众号长文写作skill。当用户需要撰写公众号文章、写稿子、续写文章、根据素材产出长文时使用。触发词包括但不限于：写文章、写稿子、帮我写、续写、扩写、公众号文章、长文、出稿、按我的风格写。即使用户只是说"帮我把这个写成文章"或"用我的风格写一下"，只要上下文涉及内容创作和公众号输出，都应该触发。也适用于用户丢过来一个PDF、brief、新闻链接、语音转文字或任何素材说"帮我写篇文章"的场景。不要用于短内容（小红书帖子、推特、朋友圈）或纯标题摘要生成（那个用wechat-title skill）。
- `knb-wechat-publisher`: 可能吧 Markdown to 微信公众号排版器发布优化。用于把公众号文章、样刊、长文 Markdown 优化成可粘贴到可能吧排版器的发布稿；适合用户提到“可能吧”“公众号排版”“Markdown 排版器”“微信发布”“待排版”“CTA”“复制到公众号后台”等场景。它不负责选题、对标、标题公式或重写文章，只负责在内容已基本确定后做发布前排版结构、容器语法、CTA 和复制流程优化。
- `lark-approval`: 飞书审批：查询和处理审批待办/已办/实例，搜索可发起审批定义、查看定义详情并发起原生审批实例。当用户要处理审批任务、查看审批实例、搜索或发起审批时使用。审批待办不是飞书任务；非审批类待办走 lark-task。不负责创建审批定义；三方审批定义不走原生提单。
- `lark-apps`: 妙搭（Spark/Miaoda）应用开发与托管：应用创建、本地全栈开发、云端生成迭代、创意设计（UI mockup / 可交互原型 / 线框图 / 落地页 / 仪表盘 / 幻灯片 deck / 视觉探索）、AI相关能力和飞书平台能力或者其他外部能力集成、日志/Trace/监控指标/PV/UV 查询、环境变量管理、应用协作者与协作权限设置、应用角色与成员管理、自动化触发器（定时/记录变更/Webhook/飞书审批）。当用户要开发/新建一个系统·工具·平台·应用，或要本地开发 / 云端开发 / 修改 / 部署 / 发布 / 上线 / 拿可分享链接，或用 HTML 做页面·网站·部署到妙搭，或要设计 / design / mockup / prototype / wireframe / 做 PPT / deck / 视觉探索，或提到妙搭/Spark/Miaoda（应用运行时域名形如 *.aiforce.cloud）、应用数据库、应用文件存储、开放 API Key、可见范围、应用协作者/开发权限、应用角色/角色成员、线上日志、接口请求量、错误量、延迟、访问量、环境变量、给妙搭应用配自动化...
- `lark-attendance`: 飞书考勤打卡：查询自己的考勤打卡记录
- `lark-base`: 飞书多维表格（Base）操作：建表、字段、记录、视图、统计、公式/lookup、表单、仪表盘、应用模式（BaseApp/AppMode 页面与组件）、Workspace 目录、workflow、角色权限、模板中心（多维表格模板分类/列表/搜索）；遇到 Base/多维表格/bitable、BaseApp/AppMode、/base/ 或 /app/ 链接时使用。BaseApp 不走 lark-apps；文件导入/导出转 lark-drive，认证/授权转 lark-shared。
- `lark-calendar`: 飞书日历：管理日历日程和会议室。查看/搜索日程、创建/更新日程、管理参会人、查询忙闲和推荐时段、预定会议室。当用户需要查看日程安排、创建/修改会议、查询/预定会议室时使用。不负责：查询过去的视频会议记录（走 lark-meeting）、待办任务（走 lark-task）。
- `lark-contact`: 飞书 / Lark 通讯录:按姓名 / 邮箱解析成 open_id,或按 open_id 反查姓名 / 部门 / 邮箱 / 联系方式 / 个人状态 / 签名,以及按关键词搜索当前用户可见的机器人 / 智能体(agent)。当用户提到一个名字要下一步发消息 / 排日程,或拿到 open_id 想查具体信息时使用。不负责部门树遍历、按部门列员工、组织架构图,这类需求走原生 OpenAPI。
- `lark-doc`: 飞书云文档（Docx / Wiki）内容操作：读取、创建、编辑文档，插入或下载图片附件，以及操作思维笔记。用户提供文档 URL/token（包括 doubao.com 的 /docx/、/wiki/）时使用；按 URL 路径/token 而非域名路由。文档内嵌资源按读取参考中的统一规则分流。独立评论操作走 lark-drive；随正文读取评论使用 docs +fetch。表格或 Base 内部数据操作不在本 skill。
- `lark-drive`: 飞书云空间（云盘/云存储）：管理 Drive 文件和文件夹，包含上传/下载、创建文件夹、复制/移动/删除、查看元数据、查询权限设置、评论/权限/订阅、标题、版本、飞书文档密级标签（secure labels）和本地文件导入。用户需要整理云盘目录、处理云空间资源 URL/token、判断链接类型/真实 token/标题，或导入 Word/Markdown/Excel/CSV/PPTX/.base 为 docx/sheet/bitable/slides 时使用；doubao.com 云空间 URL/token 也按资源路径和 token 路由，不回退 WebFetch。不负责：文档内容编辑（走 lark-doc）、表格/Base 表内数据操作（走 lark-sheets/lark-base）、知识空间节点/成员管理（走 lark-wiki）、原生 Markdown 文件读写/patch/diff（走 lark-markdown）。
- `lark-event`: Lark/Feishu real-time event listening / subscribing / consuming: stream events as NDJSON via `lark-cli event consume &lt;EventKey&gt;` (covers IM messages/reactions/chat changes, Approval status changes, Task updates, VC meeting started/joined/ended, Minutes generated, Whiteboard updated, etc.). Use for Lark bots, real-time message processing, long-running subscribers, streaming webhook/push handlers. Supports `--max-events` / `--timeout` bounded runs and a stderr ready-marker contract — designed f...
- `lark-im`: 飞书即时通讯：收发消息和管理群聊。发送和回复消息、搜索聊天记录、管理群聊成员、上传下载图片和文件、管理表情回复、发送应用内/短信/电话加急、发送和处理交互卡片（Interactive Card）、监听卡片按钮回调（card.action.trigger）。当用户需要发消息、查看或搜索聊天记录、下载聊天中的文件、查看群成员、搜索群、创建群聊或话题群、管理标记数据、管理 Feed 置顶（添加/移除/查询置顶会话）、管理标签数据、处理卡片回调时使用。
- `lark-mail`: 飞书邮箱：Use when user mentions 起草邮件、写邮件、草稿、发送/回复/转发邮件、查阅邮件、看邮件、搜索邮件、邮件文件夹、邮件标签、邮件联系人、监听新邮件、邮件收信规则等；use for mail/email intent only. Do not use for docs/sheets/calendar/auth setup/pure contact lookup/IM chat tasks.
- `lark-markdown`: 飞书 Markdown：查看、创建、上传、编辑和比较飞书中的原生 Markdown 文件。当用户要操作飞书 Markdown 文件，或比较其远端版本及本地草稿时使用。纯本地 Markdown 文件操作不触发本 skill。不负责将 Markdown 导入为飞书在线文档，也不负责文件搜索、权限、评论、移动、删除等云空间管理操作。
- `lark-meeting`: 飞书视频会议：查询会议记录与会议产物(纪要/逐字稿/妙记)、妙记搜索/上传/下载/编辑、机器人参与会议；查询进行中的会议、实时会议内容(发言/聊天/共享文档)问答(会上/会里)、发送会中聊天/表情；基于 meeting_id、meeting_no、event_id、note_id、minute_token、vc-node-id 或妙记 URL 查询相关信息。预约会议、忙闲和会议室管理走 lark-calendar。
- `lark-minutes`: 仅当用户或上游配置显式指定 lark-minutes 时使用，相关请求统一交由 lark-meeting 技能处理。
- `lark-note`: 仅当用户或上游配置显式指定 lark-note 时使用，相关请求统一交由 lark-meeting 技能处理。
- `lark-okr`: 飞书 OKR：管理目标与关键结果。查看和编辑 OKR 周期、目标、关键结果、对齐关系、量化指标和进展记录。当用户需要查看或创建 OKR、管理目标和关键结果、查看对齐关系时使用。不负责：待办任务管理（lark-task）、日程/会议安排（lark-calendar）、绩效评估
- `lark-openapi-explorer`: 飞书/Lark 原生 OpenAPI 探索：从官方文档库中挖掘未经 CLI 封装的原生 OpenAPI 接口。当用户的需求无法被现有 lark-* skill 或 lark-cli 已注册命令满足，需要查找并调用原生飞书 OpenAPI 时使用。
- `lark-shared`: Use for lark-cli setup/auth tasks: auth login/status/logout, user vs bot identity, business-domain permissions (--domain, including all/docs/drive), missing scopes, revoking authorization, or handling _notice JSON.
- `lark-sheets`: 飞书电子表格：创建和操作电子表格。支持创建表格、管理工作表与行列结构（增删/合并/调整尺寸/隐藏/冻结）、读写单元格（值/公式/样式/批注/单元格图片）、查找替换、多操作批量更新，以及图表、透视表、条件格式、筛选器、迷你图、浮动图片等对象的创建与维护。当用户需要创建电子表格、管理工作表、批量读写或编辑数据、统计汇总与可视化、表格美化、公式计算（含 Excel 公式迁移）、金融/财务建模（DCF、三张表、预算、Sensitivity 等）等任务时使用。若用户是想按名称或关键词搜索云空间（云盘/云存储）里的表格文件，请改用 lark-drive 的 drive +search 先定位资源。当用户给出 doubao.com 的 /sheets/ URL/token 时，也应直接使用本 skill，不要因为域名不是飞书而回退到 WebFetch；路由依据是 URL 路径模式和 token，而不是域名。
- `lark-skill-maker`: 创建 lark-cli 的自定义 Skill。当用户需要把飞书 API 操作封装成可复用的 Skill（包装原子 API 或编排多步流程）时使用。
- `lark-slides`: 飞书幻灯片：创建和编辑幻灯片。创建演示文稿、读取幻灯片内容、管理幻灯片页面（创建、删除、读取、局部替换）。当用户需要创建或编辑幻灯片、读取或修改单个页面时使用。当用户给出 doubao.com 的 /slides/ URL/token 时，也应直接使用本 skill，不要因为域名不是飞书而回退到 WebFetch；路由依据是 URL 路径模式和 token，而不是域名。不负责：云文档内容编辑（走 lark-doc）、云文档里的独立画板对象（走 lark-whiteboard）、上传或下载普通文件（走 lark-drive）。
- `lark-task`: 飞书任务：管理任务、清单和任务智能体。创建待办任务、查看和更新任务状态、拆分子任务、组织任务清单、分配协作成员、上传任务附件、注册或注销任务智能体、更新任务智能体的主页数据、写入智能体任务记录。当用户需要创建待办事项、查看任务列表、跟踪任务进度、管理项目清单或给他人分配任务、为任务上传附件文件、注册注销任务智能体、更新智能体主页数据、写入任务记录时使用。
- `lark-vc`: 仅当用户或上游配置显式指定 lark-vc 时使用，相关请求统一交由 lark-meeting 技能处理。
- `lark-vc-agent`: 仅当用户或上游配置显式指定 lark-vc-agent 时使用，相关请求统一交由 lark-meeting 技能处理。
- `lark-whiteboard`: 飞书画板：查询和编辑飞书云文档中的画板。支持导出画板为预览图片、导出原始节点结构、使用多种格式更新画板内容。 当用户需要查看画板内容、导出画板图片、编辑画板时使用此 skill。不负责：飞书云文档内容编辑（lark-doc）、文档内嵌电子表格/Base（lark-sheets / lark-base）。
- `lark-wiki`: 飞书知识库：管理知识空间、空间成员和文档节点。创建和查询知识空间、查看和管理空间成员、管理节点层级结构、在知识库中组织文档和快捷方式。当用户需要在知识库中查找或创建文档、浏览知识空间结构、查看或管理空间成员、移动或复制节点时使用。当用户给出 doubao.com 的 /wiki/ URL/token 时，也应直接使用本 skill，不要因为域名不是飞书而回退到 WebFetch；路由依据是 URL 路径模式和 token，而不是域名。不负责：上传文件到知识库节点下（走 lark-drive）、编辑文档/表格/Base 内容（走 lark-doc / lark-sheets / lark-base）。
- `lark-workflow-meeting-summary`: 会议纪要整理工作流：汇总指定时间范围内的会议纪要并生成结构化报告。当用户需要整理会议纪要、生成会议周报、回顾一段时间内的会议内容时使用。
- `lark-workflow-standup-report`: 日程待办摘要：编排 calendar +agenda 和 task +get-my-tasks，生成指定日期的日程与未完成任务摘要。适用于了解今天/明天/本周的安排。
- `leader`: 把一句话的想法拆成 AI agent 能独立跑完的目标任务书。用户说「帮我给 agent 写个目标」「帮我详细拆一下这个目标」「写个任务书/brief 给 agent」「写个 goal 提示词」「让 agent 自己跑这个项目」「把活分给几个 agent 并行」时使用。先进代码库实测、必要时联网调研，再一次性提问（≤5 个），产出一份 ≤4000 字符、直接粘进 /goal 就能跑的任务书，含实测数字、白名单地界、防作弊验收和断点续跑。执行型与探索型（调研/选型/找方案）自动分流。
- `linear`: Manage issues, projects &amp; team workflows in Linear. Use when the user wants to read, create or updates tickets in Linear.
- `lobster-daily`: 用于生成 用户 的“龙虾日报 / Readwise 日报 / 昨日收藏汇总”。当用户说“龙虾日报”“readwise 日报”“每日阅读”“昨日收藏汇总”“按主题日报”“生成今日日报”等类似指令时使用；从 Readwise Reader Inbox 读取昨日新增收藏，按 saved_at 严格过滤，生成主题日报，默认创建到 Notion serious AI 日报数据库，并自动调用 lobster-daily-layout 做页面排版。
- `lobster-daily-layout`: 用于排版 用户 的“龙虾日报 / Readwise 日报 / 昨日收藏汇总”Notion 页面。当用户说“排版这篇日报”“美化龙虾日报”“给龙虾日报做排版”“整理日报版式”，或 lobster-daily 创建日报后需要自动美化页面时使用；读取现有日报页面，按固定 Notion enhanced Markdown 样式整页重写并验证。
- `lobster-daily-orchestrate`: 龙虾日报 · 每日编排推送器（入口 skill）。串起全流程：采集 → 需求倒推 → 评分过滤 → 提炼 → 生成日报 → 推送到飞书云文档。当用户说"跑今天的龙虾日报""生成日报""执行每日流程""跑全流程"或类似指令时使用；也可配置 cron 定时触发。
- `lobster-distill`: 龙虾日报 · 提炼编排器。读取评分层入选 JSON，为每篇生成提炼任务清单（三级笔记 + 概念提取），分别调用 note-taking-pro 和 concept-learning skill 完成产物。当用户说"提炼入选内容""生成笔记和概念""跑提炼层"或类似指令时使用。零第三方依赖。
- `lobster-needs-extract`: 龙虾日报 · 需求倒推器。扫描对话记录，提取用户需求信号（显式 + 隐式），更新 user-profile.json 需求画像。当用户说"提取我的需求""更新画像""跑需求倒推""生成今日需求"或类似指令时使用；也可被其他 skill 作为需求层子步骤调用。零第三方依赖，开箱即用。
- `lobster-rss-collect`: 龙虾日报 · 统一 RSS 采集器。万物皆可 RSS：读取 config/sources.yaml 中的信息源配置，统一抓取 RSS feeds 和 API 源（如 GitHub 趋势），去重后输出候选 JSON。当用户说"采集今天的素材""抓取信息源""跑龙虾日报采集层""fetch sources"或类似指令时使用；也可被其他 skill 作为采集子步骤调用。零第三方依赖（Python 标准库），开箱即用。
- `lobster-score-filter`: 龙虾日报 · AI 评分过滤器。输入采集候选 JSON 和需求画像，按相关性 × 质量双评分，过滤并输出 Top N 入选内容。当用户说"给候选评分""过滤素材""跑评分层""选出今日 Top"或类似指令时使用；也可被其他 skill 作为评分子步骤调用。零第三方依赖，开箱即用。
- `loop-engine`: 把一次设计、制作或系统迭代变成可追溯、可复现、可回滚、可持续复利的受控 Loop。用于用户要求设计或迭代 Goal／Loop／workflow、复盘 bad case、治理多 Agent 执行、把真实失败沉淀为案例与回归测试、编写 AI／人类使用手册，或希望以后能重复调用同一套迭代引擎时；尤其适合存在多个版本、人工反馈、证据漂移、语义或审美边界的任务。
- `media-to-transcript`: Convert audio/video URLs or local media into corrected Markdown transcripts through Volcengine recording-file ASR 2.0. Reuses the existing video-transcript downloader for Bilibili, Douyin, Xiaohongshu, YouTube, extracts audio when input is video, uploads local audio to R2, splits media longer than 3 minutes into parallel AUC tasks, submits volc.seedasr.auc with compact source context, then performs AI correction with topic/context/glossary. Use when the user asks for "逐字稿", "提取逐字稿", "视频转文字", ...
- `migrate-to-codex`: Migrate supported instruction files, skills, agents, and MCP config into Codex project and global files.
- `minimax-voice-director`: 用 MiniMax 云端为视频制作可审批的声音导演稿，再生成、挑选和验收人声，最后以定稿音频产生字幕。用于用户明确选择 MiniMax 配音、继续已有 MiniMax 视频配音项目，或明确请求 MiniMax Voice ID/克隆/设计。泛指本地 TTS 或 IndexTTS 不使用本 skill；音乐、BGM、歌曲使用同级 music Skill。
- `music`: Generate music using ElevenLabs Music API. Use when creating instrumental tracks, songs with lyrics, background music, jingles, or any AI-generated music composition. Supports prompt-based generation, composition plans for granular control, and detailed output with metadata. For workspace video BGM, search the generated-music registry and reuse a suitable documented loop before spending credits on a new generation.
- `neat-freak`: End-of-session knowledge cleanup with OCD-level rigor — reconciles project docs (CLAUDE.md, README.md, docs/) and agent memory against the code so nothing rots. 会话结束后对项目文档和记忆进行洁癖级审查与同步。MUST trigger when the user says: "sync up", "tidy up docs", "update memory", "clean up docs", "/sync", "/neat", "同步一下", "整理文档", "整理一下", "更新记忆", "梳理一下", "收尾", "这个阶段做完了", "新人能直接上手", or any phrase suggesting a dev milestone where knowledge needs reconciliation. Also trigger when the user reports stale docs, confli...
- `neican`: 读取「做中学·AI」《serious AI 内参》的内容并陪用户思考——每日期次、文章搜索、 整篇正文（Markdown）、用户自己的收藏与划线笔记，以及围绕划线/笔记的思想对话。 当用户想「看今天的内参 / 搜内参文章 / 读某篇内参 / 回顾自己的收藏或笔记」， 或想「围绕某篇内参和自己的划线笔记打磨想法、聊聊自己的 idea」时使用。 思想对话默认打磨模式：把用户笔记里已有的想法收拢、澄清、命名成清晰命题， 不深挖、不连环追问；用户明确说「挑战我/深挖/找反例/问我一个问题」时才切换 苏格拉底深挖模式。禁止默认输出长篇总结或主题研究报告。只读接口。
- `neican-article-ingest`: 用于执行 用户 的“文章入库 / 精选入库 / 日报标记文章入库”流程。当用户说“执行文章入库”“把日报标记文章入库”“处理这篇日报的入库评论”“把 todo：入库 的文章纳入阅读库”等类似指令时使用；读取龙虾日报页面 comments，创建或更新 serious AI 阅读库条目，关联日报和 weeks，同步 Readwise 标签，并把阅读库链接写回日报。
- `neican-editing`: AI 内参编辑流水线 —— 从当期 Notion 日报页的「🏦 阅读库」relation 定位今日/指定日期的内参文章，读取 Readwise Reader 正文，生成三级笔记 + 概念提取，并分别写回每篇文章页面的「structure｜1️⃣ 三级笔记、思想框架」tab 和「concepts｜2️⃣ 关键概念、概念网络」tab。批量文章默认使用最多 6 个 sub-agents / worker 并行处理。当用户说“处理今日份的内参文章”“处理今日 AI 内参文章”“编辑今日内参”“处理今天的精选文章”“跑当日内参流水线”“给今天的内参文章做笔记和概念”“批量做三级笔记和概念提取”“编辑 [日期] 的内参”“处理 260511 期内参”“做 260501 期内参”“今天的阅读库精选文章笔记”时使用。
- `neican-reading-reminder`: 用于 用户 手动生成《serious AI 内参》今日阅读提醒。当用户说“生成今日阅读提醒”“生成阅读提醒”“生成开放阅读版”“给今天内参生成微信群提醒”或类似指令时使用；只读取 Notion 日报和阅读库数据，生成订阅者版与开放阅读版消息，不修改数据库、不自动发送。
- `note-taking-pro`: 把长文章、课程稿、演讲稿或转写材料整理成"骨架＋血肉"的三级笔记。通过 Agentic Reading 判断作者论证、主动分配注意力、按需回读，保留关键细节、原始表达、边界与不确定性。用户要求三级笔记、大纲笔记、长文拆解、完整阅读笔记，或强调不要把原文压成薄摘要时使用。
- `notion-knowledge-capture`: Capture conversations and decisions into structured Notion pages; use when turning chats/notes into wiki entries, how-tos, decisions, or FAQs with proper linking.
- `notion-meeting-intelligence`: Prepare meeting materials with Notion context and Codex research; use when gathering context, drafting agendas/pre-reads, and tailoring materials to attendees.
- `notion-research-documentation`: Research across Notion and synthesize into structured documentation; use when gathering info from multiple Notion sources to produce briefs, comparisons, or reports with citations.
- `notion-spec-to-implementation`: Turn Notion specs into implementation plans, tasks, and progress tracking; use when implementing PRDs/feature specs and creating Notion plans + tasks from them.
- `obsidian-bases`: Create and edit Obsidian Bases (.base files) with views, filters, formulas, and summaries. Use when working with .base files, creating database-like views of notes, or when the user mentions Bases, table views, card views, filters, or formulas in Obsidian.
- `pdf`: Use when tasks involve reading, creating, or reviewing PDF files where rendering and layout matter; prefer visual checks by rendering pages (Poppler) and use Python tools such as `reportlab`, `pdfplumber`, and `pypdf` for generation and extraction.
- `pixel-concept-series`: 知识概念系列 → 像素解说视频批量产线。吃下 N 份已确权的系列定稿（每集约 1.5 分钟口播），走「旁白标签→树林留声⑥档配音→SRT 句窗对齐→暗夜琥珀舞台→全量渲帧→终混」链路，一次产出 N 支成片。触发：「把定稿做成像素解说视频」「表达系列/知识概念系列批量出片」「第 N 集渲染成片」「系列片一把刷」。依赖本机像素财经视频工厂（配音系统）与 Chrome。
- `playwright`: Use when the task requires automating a real browser from the terminal (navigation, form filling, snapshots, screenshots, data extraction, UI-flow debugging) via `playwright-cli` or the bundled wrapper script.
- `playwright-interactive`: Persistent browser and Electron interaction through `js_repl` for fast iterative UI debugging.
- `prototype`: Build a throwaway prototype to answer a design question. Use when the user wants to sanity-check whether a state model or logic feels right, or explore what a UI should look like.
- `research`: Investigate a question against high-trust primary sources and capture the findings as a Markdown file in the repo. Use when the user wants a topic researched, docs or API facts gathered, or reading legwork delegated to a background agent.
- `resolving-merge-conflicts`: Use when you need to resolve an in-progress git merge/rebase conflict.
- `reverse-deconstruction`: Use when the user asks for "逆向拆解", reverse engineering, teardown, benchmark analysis, or wants to deconstruct text, images, prompts, videos, products, landing pages, workflows, skills, creators, peers, or cases into evidence, structure, mechanism, knowledge gaps, migration boundaries, reusable patterns, and a small reality-test action. Chinese by default.
- `right-size-agents`: 按任务实际难度选择单 Agent 或多 Agent，并控制 reasoning effort、上下文继承、委派轮次、ownership、活动依赖与结果回看。Use when the user mentions 多 Agent、并行调查、AI 团队、token／上下文成本、“够用就行”，when a task has multiple potentially independent work lanes, or immediately before delegating work to subagents. Preserve explicit user-requested Agent counts when safe; do not use merely because a task looks large.
- `screenshot`: Use when the user explicitly asks for a desktop or system screenshot (full screen, specific app or window, or a pixel region), or when tool-specific capture capabilities are unavailable and an OS-level capture is needed.
- `security-best-practices`: Perform language and framework specific security best-practice reviews and suggest improvements. Trigger only when the user explicitly requests security best practices guidance, a security review/report, or secure-by-default coding help. Trigger only for supported languages (python, javascript/typescript, go). Do not trigger for general code review, debugging, or non-security tasks.
- `security-ownership-map`: Analyze git repositories to build a security ownership topology (people-to-file), compute bus factor and sensitive-code ownership, and export CSV/JSON for graph databases and visualization. Trigger only when the user explicitly wants a security-oriented ownership or bus-factor analysis grounded in git history (for example: orphaned sensitive code, security maintainers, CODEOWNERS reality checks for risk, sensitive hotspots, or ownership clusters). Do not trigger for general maintainer lists o...
- `security-threat-model`: Repository-grounded threat modeling that enumerates trust boundaries, assets, attacker capabilities, abuse paths, and mitigations, and writes a concise Markdown threat model. Trigger only when the user explicitly asks to threat model a codebase or path, enumerate threats/abuse paths, or perform AppSec threat modeling. Do not trigger for general architecture summaries, code review, or non-security design work.
- `seeking-stars`: Operate and integrate the Seeking Stars job-search desktop app without confusing it with the personal decision system core.
- `shuorenhua`: 检查和清理中英文文本里的 AI 套路，适用于“去 AI 味”“说人话”“自然一点”“别像模板”“先标问题”这类改写和审稿需求；按场景控制力度，同时保留事实、术语、语域和责任主体。
- `skill-darwin-lite`: 受控的达尔文式 Skill 优化器，一次只优化一个可移植 Agent SKILL.md。用于用户要求优化、进化、评审、评分、改进、冻结或 Darwin-test 某个 skill；触发词包括 /达尔文、/skill-darwin-lite、/进化Skill、/Skill体检、SkillOpt、SkillLens、first-principles scale、长期主义、smoke tests、test prompts、validation gates、rollback、runtime neutrality、managed delegation、全程托管、直接覆盖，或需要带证据的 v2 候选和替换控制。
- `skill-meta`: 元Skill（skill 生命周期的守门与路由层）。设计时定合同，审计时出证据，迭代时走受控进化；自己不新造机制，路由到 skill-darwin-lite / loop-engine / nuwa-skill / ITERATION-HARNESS 等已有资产。用户说「帮我设计 / 审计 / 迭代一个 skill」「这个 skill 为什么触发错 / 跑不好」「把这次翻车变成修复方案」时使用。
- `speech`: Use when the user asks for text-to-speech narration or voiceover, accessibility reads, audio prompts, or batch speech generation via the OpenAI Audio API; run the bundled CLI (`scripts/text_to_speech.py`) with built-in voices and require `OPENAI_API_KEY` for live calls. Custom voice creation is out of scope.
- `storage-analyzer`: macOS / Windows 只读存储分析助手（自动识别系统）。扫描整机磁盘占用，找出 占空间大户，把每一项分成 🟢可自动清理 / 🟡需人工判断 / 🔴谨慎清理 三级并给出 可执行处置方案，生成排版精美、可折叠、命令可一键复制的交互式 HTML 报告，并可 起本地服务在网页上一键删除（移废纸篓/直接删）。扫描全程只读。务必在以下场景 使用：用户说"存储分析""磁盘满了""C盘/硬盘满了""空间不够""清理空间" "清理磁盘""占空间""哪些东西占地方""帮我看看存储""看一下电脑存储/空间" "存储空间""电脑空间不够""内存满了/不够/不足""看下内存/存储"（中文口语里 "内存"常指存储空间）"storage analysis""disk cleanup""清缓存""磁盘清理"； 或用户抱怨电脑没空间、想知道什么东西吃硬盘、想要清理建议时。注意：若用户明确 指运行内存/RAM（如"哪个进程吃内存""内存占用高"想看活动监视器），那是 RAM 不是存储，不属于本 skill。
- `talking-head-hyperframes`: 为 HyperFrames 口播或旁白项目创建、修复并验证固定舞台，锁定数字人 PIP 的区域、裁切、人物安全区和不透明背景，归档输入，生成 manifest 与 template handoff，并在就绪后按“字幕驱动的全镜头静态审核→动效”门禁路由到 hyperframes-scene-animator。适用于“新建 HyperFrames 口播模板”“准备或修复数字人/PIP”“导入音频字幕和制作资料”“检查模板能否开工”等请求；不负责镜头导演、内容场景、整片渲染或审片整改。
- `tdd`: Test-driven development. Use when the user wants to build features or fix bugs test-first, mentions "red-green-refactor", or wants integration tests.
- `thought-incubation-workflow`: Use when the user wants the 思想孵化助手 / thought-incubation assistant to turn Readwise comments, WeChat data, WeRead notes, de-noised Typeless fragments, AI conversation, or life-material fragments into Notion-oriented thought assets. Trigger on 思想孵化, 思维孵化, 思想孵化助手, 思想进化助手, Readwise 评论, Typeless 数据, 微信读书, 聊天判断句, 提醒, 有没有真的孵化出东西, or requests to package these materials into knowledge assets while preserving privacy.
- `tospec`: Use whenever the agent is asked to implement, build, fix, modify, recover, retry, continue an implementation, ship, or perform an execution task on code, configuration, or a project. Enforce the smallest task-complete change, no speculative features or hardening, no collateral docs/status/commentary, and nearest-scope verification. Especially use when the user says 绕弯子, 太肉, 东坡肉, 先做基本版, 别浪费时间, or 只做这一步. Do not use for read-only investigation, diagnosis, planning, a requested deep audit or secu...
- `transcribe`: Transcribe audio files to text with optional diarization and known-speaker hints. Use when a user asks to transcribe speech from audio/video, extract text from recordings, or label speakers in interviews or meetings.
- `transcript-knowledge-pack`: 把网课视频或转写稿整理成保真知识材料的固定五站流水线：浏览器插件下载、讯飞听悟转写（两个人工站，给交接说明）→ 内置洗稿（ASR 校订表法）→ V1 note-taking-pro 三级笔记 + V1 concept-learning 概念提取 → 引文逐字校验与源文件 SHA-256 验收。用于用户要求"转写知识包""课程视频整理""洗稿（+三级笔记／概念提取）"或等价整链；已有阶段产物时从下一站继续。不负责只转写、只做三级笔记或只做概念提取、Logseq／Notion 入库、DOCX／飞书交付、改写、发布或课程教学。
- `using-coze-cli`: Coze CLI（`coze` 命令）的使用规则。触发条件：用户明确要求使用 Coze CLI / coze 命令 / 扣子编程（Coze Coding）、扣子空间等 Coze 平台能力，或输入以 /coze-cli、/coze 开头（仅作路由）时加载本技能。覆盖范围：coze code—扣子编程项目创建/迭代（网页、Web App、App、小程序、Agent/工作流/skill）及发需求、预览、部署、环境变量/域名/数据库；coze generate—文生图/语音 TTS/视频；coze session（Claw）—对话、PPT、播客、长任务产物；coze file—本地文件转在线链接。判定边界：不要仅因为用户在做软件开发、修改/调试/运行代码，或请求中出现 CLI、文件读写、HTML、可视化、卡片、报告、图片等词就加载本技能或导流到扣子编程；本地工程开发默认走常规本地开发链路。
- `video-script`: 使用已经锁定的完整口播音频与带时间码字幕，把确认后的逐字稿转成管线无关的视频导演方案和 Beat Graph。适用于“根据最终配音做分镜”“按字幕设计整片画面”“规划 B-roll/证据/素材”“做 HyperFrames 或 Remotion 前的导演稿”等请求。面向短视频时，还要在镜头层承接上游已写入逐字稿的钩子、承诺、证据递进和结尾兑现，但不重新选题、改片头或重写正文。正式视频脚本必须发生在完整音频与字幕之后；只有逐字稿、草稿或试听音频时先回到上游，不凭预估语速编正式时间线。本 skill 负责导演规划，不写下游实现代码；导演稿确认后才进入制作规格和组件复用判断。
- `video-transcript`: Deprecated compatibility package. Do not use this skill for transcription. For any audio/video transcript, 逐字稿, 视频转文字, 音频转文字, 听写, or 提取视频文案 request, use media-to-transcript instead. The remaining scripts are kept only as downloader/probe helpers imported by media-to-transcript.
- `viral-video-benchmark`: 判断、扫描、拆解并归档抖音视频、小红书图文或小红书视频。实时读取用户同平台粉丝数并划分主对标池/跨级灵感池，用已登录浏览器读取目标作品和作者主页公开指标，再用确定性代码判定普通、小爆、爆款、现象级并扫描作者近 20 条候选；只对用户选中的爆款和现象级先构建可追溯证据包，再调用子 Agent 拆解，经确认后写入爆款库并合并或创建选题。用于“判断是不是爆款”“看看这个账号近20条有没有爆款”“拆解对标内容”“筛选同阶段对标”“爆款入库”“从爆款生成选题”“把同题内容归到一个选题”等请求；不用于自动监控。
- `wechat-relationship-corpus`: 微信关系语料库加工器。用于把微信聊天摘要、关系气候图、聊天片段加工成可长期复用的关系语料库对象、金句、关系协议和边界。触发方式：/wechat-relationship-corpus、/关系语料库、/微信金句、/关系金句、把这段微信摘要加工成语料库
- `weread-skills`: 微信读书助手 — 搜索书籍、管理书架、查看笔记划线、浏览书评、阅读统计、发现推荐好书
- `wizard`: Generate an interactive bash wizard that walks a human through steps only they can perform. Use when provisioning infrastructure, setting up credentials or CI secrets, walking an unfamiliar third-party dashboard, or running a one-off migration or cutover. Don't invoke this for steps the agent can perform itself.
- `workflow-router`: Personal workflow router for the user's Codex system. Use before choosing among the user's recurring workflows, skills, or automations when a request could map to Logseq/Feynman notes, concept extraction, concept maintenance, thought incubation, dbs tools, reverse deconstruction, Notion daily-report work, WeChat clawbot work, skill creation, Codex self-optimization, Darwin-lite skill evolution, controlled Loop Engine design and iteration, reminders, or local Mac operations. Trigger on ambiguo...
- `writing-for-agents`: Writing documents for agents. Use when creating or editing skills, or modifying AGENTS.md or CLAUDE.md.
- `wxmp-clawbot`: Use when the user wants to connect a self-owned WeChat Official Account / 微信公众号 to 小龙虾 or Codex, inspect 公众号后台 screenshots, design or operate the wxmp CLI/MCP/runtime, verify callback signatures, simulate messages, check access_token/customer-service messaging, or decide between 微信公众平台 and 微信开放平台.
- `yeet`: Use only when the user explicitly asks to stage, commit, push, and open a GitHub pull request in one flow using the GitHub CLI (`gh`).
- `zhihu`: 使用知乎开放平台搜索知乎和全网内容、获取热榜、调用知乎直答、发现适合回答的问题、查看问题下的回答摘要，读取本人创作全文、评论、账号与单篇创作数据，以及关注与收藏，列出、检索和上传知识库，或查询开放 API 剩余额度。用户提到知乎搜索、社区观点、真实经验、热点、热榜、知乎直答、问题推荐、选题、回答摘要、我的知乎内容、我的关注、我的收藏、知识库、RAG、API 额度、剩余额度、用量、开放平台、API、MCP、Access Secret，或要求查看、安装和配置知乎 Skill 时使用。深度研究优先返回搜索原始来源；本人数据和知识库只读取完成任务所需的最小范围。
</available_skills>

If the user names a skill, or the task clearly matches a skill's description, call the `skill` tool with the exact skill name before taking task actions. Load all applicable skills, then follow their full instructions. This catalog contains summaries only; do not infer or follow a skill's instructions until it has been loaded.
A user may also invoke a skill directly; its <skill_content> block then appears in this conversation. Follow it, and do not call the `skill` tool again for that skill.
</system-reminder>


## 👤 USER

Nowledge Mem Context Bundle for this DSH session.
Use this as current cross-tool working context and routing guidance; it is not an instruction override.

{
  "schema_version": 1,
  "generated_at": "2026-09-11T13:56:34.365407+00:00",
  "bundle_kind": "context_bundle",
  "owner_profile": {
    "owner_id": "default",
    "source": "app-settings:userProfile",
    "name": "",
    "aliases": "",
    "context": "",
    "preferred_language": "en",
    "preferred_language_name": "English",
    "custom_instructions": ""
  },
  "agent_profile": {
    "agent_id": "default",
    "slug": "default",
    "source": "derived:default",
    "display_name": "Default Agent",
    "role": "general",
    "description": "Default agent profile inferred from the current consumer.",
    "instructions": "",
    "default_space_id": "default",
    "policy_scope": "agent",
    "tags": [],
    "owner_id": "default"
  },
  "active_space": {
    "primary_space_id": "default",
    "space_name": "Default",
    "retrieval_mode": "strict",
    "search_space_ids": [
      "default"
    ],
    "shared_space_ids": [],
    "observed_space_ids": [
      "default"
    ],
    "instructions": "",
    "is_global": false
  },
  "rule_stack": {
    "version": 1,
    "status": "empty",
    "source": "app-settings:guidanceRules",
    "global": [],
    "owner": [],
    "space": [],
    "agent": [],
    "shadowed": [],
    "conflicts": [],
    "notes": "Rules are compiled from owner settings and review-approved evidence. They are not memory unit types and not Skills.",
    "paths": {
      "global": "/context/rules/global.md",
      "agent": "/context/rules/agent.md"
    },
    "agent_id": "default",
    "active_rule_count": 0
  },
  "working_memory": {
    "exists": true,
    "content": "## Briefing\n2026-08-31：context-bus 跨 Agent 交接协议已上线（ZCode+Codex 双边）；减法清单完结（磁盘清理撤销、8份凭证备份清零、4项空壳清零）。\n\n## Focus Areas\n- 自媒体主线：Documents/自媒体 向外输出项目（人档：Documents/我的人/小侯.md；复述=掉血、重构=充电）\n- context-bus 一周验收（09-07 10:00）：codex来源线程>0、跨工具任务100%有交接件、下游真实检索≥1次、新增记忆≥5条无重复\n- 10-01 10:00 清点到期废纸（.codex/.trash 8份 + 废纸篓4项）\n\n## Open Questions\n- Nowledge 本体（ontology）空置，是否配置领域词表待所有者拍板\n- Owner 档案语言仍是英文，需主人在 App 设置手动改中文",
    "space_id": "default",
    "path": "/Users/housibo/ai-now/memory.md",
    "updated_at": "2026-08-30T17:59:37.343082+00:00"
  },
  "kfs_roots": {
    "context": "/context",
    "bundle": "/context/bundle.md",
    "owner_profile": "/context/profiles/owner.md",
    "agent_profile": "/context/profiles/agent.md",
    "global_rules": "/context/rules/global.md",
    "agent_rules": "/context/rules/agent.md",
    "working_memory": "/working-memory/today.md",
    "memories_by_type": "/memories/by-type",
    "skills": "/skills",
    "threads": "/threads",
    "sources": "/sources",
    "wiki": "/wiki",
    "artifacts": "/artifacts"
  },
  "authorship": {
    "owner_id": "default",
    "agent_id": "default",
    "source_app": "deepseek-harness",
    "host_agent_id": ""
  },
  "warnings": [],
  "rendered_markdown": "# Nowledge Mem Context Bundle\n\nGenerated: 2026-09-11T13:56:34.365407+00:00\n\n## Owner Identity\n- Owner id: `default`\n- Preferred language: English\n\n## Agent Identity\n- Agent id: `default`\n- Name: Default Agent\n- Source: `derived:default`\n- Default space: `default`\n- Role: general\n- Description: Default agent profile inferred from the current consumer.\n\n## Active Space\n- Primary: `default`\n- Name: Default\n- Retrieval mode: `strict`\n- Search spaces: `default`\n\n## Rules\n- Status: `empty`\n- Active rules: 0\n- Everyone path: `/context/rules/global.md`\n- This AI path: `/context/rules/agent.md`\n\nRules are compiled from owner settings and review-approved evidence. They are not memory unit types and not Skills.\n\n## Working Memory\n- Space: `default`\n- Updated: 2026-08-30T17:59:37.343082+00:00\n\n## Briefing\n2026-08-31：context-bus 跨 Agent 交接协议已上线（ZCode+Codex 双边）；减法清单完结（磁盘清理撤销、8份凭证备份清零、4项空壳清零）。\n\n## Focus Areas\n- 自媒体主线：Documents/自媒体 向外输出项目（人档：Documents/我的人/小侯.md；复述=掉血、重构=充电）\n- context-bus 一周验收（09-07 10:00）：codex来源线程>0、跨工具任务100%有交接件、下游真实检索≥1次、新增记忆≥5条无重复\n- 10-01 10:00 清点到期废纸（.codex/.trash 8份 + 废纸篓4项）\n\n## Open Questions\n- Nowledge 本体（ontology）空置，是否配置领域词表待所有者拍板\n- Owner 档案语言仍是英文，需主人在 App 设置手动改中文\n\n## Explore Next\n- `/memories/by-type` for semantic memory lanes.\n- `/skills` for active procedural capabilities.\n- `/threads`, `/sources`, and `/wiki` for evidence.\n",
  "compiled_hash": "1915d5c003cc4604ba9ff40e491dc5804051884435df18eb4ebf765aa241d065"
}

- **title: You are a research assistant**


## 🤖 ASSISTANT

I'll start by verifying the helper script and running parallel searches to find leads.

- 🔧 bash: {"command": "ls -la /tmp/f.py 2>/dev/null && echo \"---EXISTS---\" || echo \"---MISSING---\"; ls /tmp/res 2>/dev/null | head -20", "description": "Check helper  …
- 🔧 web_search: {"queries": ["Quantum Country review critique mnemonic medium", "mnemonic medium criticism evidence not convincing", "Andy Matuschak spaced repetition Orbit shu …
- 🔧 bash: {"command": "cat /tmp/f.py", "description": "Inspect helper script"}
- 🔧 web_search: {"queries": ["Hacker News Quantum Country discussion mnemonic medium", "Quantum Country criticism blog post review", "\"mnemonic medium\" review replication stu …
- 🔧 bash: {"command": "python3 /tmp/f.py \"https://ajschumacher.github.io/20220622-nielsen_quantum_country/\" 12000 2>&1 | head -200", "description": "Fetch ajschumacher  …
- 🔧 bash: {"command": "python3 /tmp/f.py \"https://news.ycombinator.com/from?site=quantum.country\" 6000 2>&1 | head -120", "description": "Fetch HN submissions for quant …
- 🔧 bash: {"command": "cd /tmp && for q in \"quantum%20country\" \"mnemonic%20medium\" \"matuschak\" \"spaced%20repetition%20quantum\"; do echo \"=== $q ===\"; curl -sS - …
- 🔧 bash: {"command": "python3 /tmp/f.py \"https://github.com/andymatuschak/orbit\" 8000 2>&1 | head -150", "description": "Fetch Orbit GitHub repo page"}
- 🔧 bash: {"command": "cat > /tmp/hn.py <<'EOF'\nimport json,subprocess,html,re,sys,os\nUA='Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, lik …
- 🔧 bash: {"command": "cd /tmp && for i in 23561018 19426573 19684141 21519134 30467585; do echo \"########## $i\"; python3 /tmp/hn.py $i 700 2>&1 | head -120; done", "de …
- 🔧 web_search: {"queries": ["\"Why books work\" rebuttal Andy Matuschak", "Orbit andymatuschak discontinued shut down spaced repetition platform", "Quantum Country critique \" …
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 30 \"https://hn.algolia.com/api/v1/search?query=orbit%20matuschak&tags=story&hitsPerPage=15\" | python3 -c \"\nimpor …
- 🔧 bash: {"command": "python3 /tmp/f.py \"https://bernoff.com/blog/why-books-work-a-rebuttal-to-andy-matuschak\" 10000 2>&1 | head -160", "description": "Fetch Josh Bern …
- 🔧 bash: {"command": "python3 /tmp/f.py \"https://mek.fyi/posts/why-books-work-and-could-work-better\" 10000 2>&1 | head -160", "description": "Fetch mek.fyi blog post"}
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 40 \"https://api.semanticscholar.org/graph/v1/paper/search?query=mnemonic%20medium%20spaced%20repetition&limit=20&fi …
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 40 \"https://api.semanticscholar.org/graph/v1/paper/search?query=Quantum%20Country%20quantum%20computing%20essay%20r …
- 🔧 bash: {"command": "cd /tmp && for u in \"https://raw.githubusercontent.com/riceissa/issarice.com/master/wiki/Quantum%20Country%20-%20quantum%20teleportation%202023%20 …
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 40 \"https://api.github.com/search/code?q=Quantum+Country+repo:riceissa/issarice.com\" -H \"Accept: application/vnd. …
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 60 \"https://raw.githubusercontent.com/riceissa/issarice.com/master/README.md\" -o /dev/null -w \"%{http_code}\\n\"; …
- 🔧 web_search: {"queries": ["LessWrong Quantum Country mnemonic medium review", "Nintil spaced repetition Quantum Country critique", "SuperMemo Wozniak Quantum Country mnemoni …
- 🔧 bash: {"command": "python3 /tmp/f.py \"https://www.masterhowtolearn.com/2021-01-31-incremental-reading-reading-quantum-computing-for-the-very-curious-in-supermemo-i/\ …
- 🔧 bash: {"command": "cd /tmp && for q in \"transformative%20tools%20for%20thought\" \"why%20books%20don%27t%20work\" \"spaced%20repetition%20evidence\"; do echo \"=== $ …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/hn.py 24542224 900 2>&1 | head -250", "description": "Fetch HN Why books don't work thread"}
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/hn.py 32186351 2000 2>&1 | head -80", "description": "Fetch HN Constructivism over Transmissionism"}
- 🔧 web_search: {"queries": ["gwern spaced repetition Quantum Country mnemonic medium", "Zvi Mowshowitz spaced repetition Anki criticism evidence", "Quantum Country criticism q …
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 40 \"https://api.openalex.org/works?search=mnemonic%20medium%20spaced%20repetition&per-page=20\" | python3 -c \"\nim …
- 🔧 bash: {"command": "cd /tmp && echo \"=== reddit search ===\"; for q in \"quantum%20country\" \"mnemonic%20medium\"; do echo \"--- $q\"; curl -sS --max-time 30 -A \"Mo …
- 🔧 web_search: {"queries": ["\"mnemonic medium\" problems criticism blog", "Scott Aaronson Shtetl-Optimized Quantum Country", "\"Quantum Country\" \"does not\" work review blo …
- 🔧 bash: {"command": "cd /tmp && cat > /tmp/hnc.py <<'EOF'\nimport json,subprocess,sys,html,re\nUA='Mozilla/5.0'\ndef s(q,n=30,page=0):\n url='https://hn.algolia.com/api …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://www.lesswrong.com/search?query=Quantum%20Country\" 4000 2>&1 | head -60; echo \"===== ACX =====\"; python3 / …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/hnc.py \"mnemonic%20medium\" 25 2>&1 | sed -n '/Cybiote/,/^---/p' | head -80", "description": "Get full Cybiote comment"}
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/hn.py 21152542 3000 2>&1 | head -200", "description": "Fetch full TTFT HN thread"}
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 40 \"https://hn.algolia.com/api/v1/items/21154865\" | python3 -c \"\nimport json,sys,html,re\nd=json.load(sys.stdin) …
- 🔧 web_search: {"queries": ["masterhowtolearn Quantum Country mnemonic medium part II", "\"mnemonic medium\" considered harmful OR \"doesn't work\" OR failure", "andymatuschak …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://withorbit.com/\" 2500 2>&1 | head -40; echo \"===== orbit repo README =====\"; curl -sS --max-time 40 \"http …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://balajis.com/p/quantum-computing-and-proof-of-memory\" 8000 2>&1 | head -80", "description": "Fetch Balaji po …
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 40 \"https://api.github.com/repos/andymatuschak/orbit\" | python3 -c \"\nimport json,sys\nd=json.load(sys.stdin)\npr …
- 🔧 bash: {"command": "cd /tmp && echo \"=== HN orbit story ===\"; curl -sS --max-time 30 \"https://hn.algolia.com/api/v1/search?query=Orbit%20small%20tasks%20repeated%20 …
- 🔧 web_search: {"queries": ["forums.ankiweb.net Quantum Country mnemonic medium", "site:scottaaronson.blog \"quantum country\"", "\"Quantum Country\" review notes blog 2023",  …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/hn.py 27051468 1200 2>&1 | head -180", "description": "Fetch Orbit HN thread comments"}
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://hypothes.is/search?q=tag%3A%22mnemonic+media%22\" 6000 2>&1 | head -80", "description": "Fetch hypothes.is a …
- 🔧 bash: {"command": "cd /tmp && echo \"=== fulltext quantum.country ===\"; curl -sS --max-time 60 \"https://api.openalex.org/works?filter=fulltext.search:%22quantum.cou …
- 🔧 bash: {"command": "cd /tmp && echo \"=== fulltext mnemonic medium ===\"; curl -sS --max-time 60 \"https://api.openalex.org/works?filter=fulltext.search:%22mnemonic%20 …
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 40 \"http://export.arxiv.org/api/query?search_query=all:%22Quantum%20Country%22&max_results=20\" | python3 -c \"\nim …
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 40 \"http://export.arxiv.org/api/query?search_query=all:%22mnemonic+medium%22&max_results=20\" | python3 -c \"\nimpo …
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 40 -G \"http://export.arxiv.org/api/query\" --data-urlencode 'search_query=all:\"Quantum Country\"' --data-urlencode …
- 🔧 web_search: {"queries": ["arxiv \"quantum country\" learning spaced repetition evaluation study", "\"Quantum Country\" independent evaluation retention study results", "And …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://l-m-sherlock.github.io/ZhiHuArchive/691316536.html\" 12000 2>&1 | head -140", "description": "Fetch Jarrett  …
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 40 \"https://hn.algolia.com/api/v1/items/24556412\" | python3 -c \"\nimport json,sys,html,re\nd=json.load(sys.stdin) …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://l-m-sherlock.github.io/ZhiHuArchive/690758920.html\" 9000 2>&1 | head -100", "description": "Fetch ZhiHu art …
- 🔧 web_search: {"queries": ["Jarrett Ye FSRS Quantum Country critique forgetting curve", "\"Exponentials and forgetting in Quantum Country\" Patreon", "l-m-sherlock Quantum Co …
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 40 -G \"https://export.arxiv.org/api/query\" --data-urlencode 'search_query=ti:\"Quantum games and interactive tools …
- 🔧 web_search: {"queries": ["\"Quantum Country\" review quantum education literature critique pedagogy", "Thoughts Memo translation Quantum Country criticism", "\"mnemonic med …
- 🔧 bash: {"command": "cd /tmp && curl -sSL --max-time 60 -A \"Mozilla/5.0\" \"https://arxiv.org/abs/2202.07756\" -o /tmp/qc1.html -w \"HTTP %{http_code} size %{size_down …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://www.masterhowtolearn.com/2021-02-06-incremental-reading-reading-quantum-computing-for-the-very-curious-in-su …
- 🔧 bash: {"command": "cd /tmp && curl -sSL --max-time 90 -A \"Mozilla/5.0\" \"https://ar5iv.labs.arxiv.org/html/2202.07756\" -o /tmp/qc2.html -w \"HTTP %{http_code} size …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://www.masterhowtolearn.com/search/?q=quantum\" 3000 2>&1 | head -40; echo \"=== try sitemap ===\"; curl -sS -- …
- 🔧 bash: {"command": "cd /tmp && which pdftotext; curl -sSL --max-time 90 -A \"Mozilla/5.0\" \"https://arxiv.org/pdf/2202.07756v3\" -o /tmp/qc.pdf -w \"HTTP %{http_code} …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://www.masterhowtolearn.com/2021-01-31-incremental-reading-reading-quantum-computing-for-the-very-curious-in-su …
- 🔧 bash: {"command": "cd /tmp && python3 - <<'EOF'\nimport re,zlib\nd=open('/tmp/qc.pdf','rb').read()\ntxt=[]\nfor m in re.finditer(rb'stream\\r?\\n(.*?)endstream',d,re. …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/hn.py 38663733 800 2>&1 | head -60; echo \"###### 35512345\"; python3 /tmp/hn.py 35512345 700 2>&1 | head -60", "descriptio …
- 🔧 web_search: {"queries": ["commoncog Quantum Country mnemonic medium", "nintil spaced repetition review", "learningscientists.org spaced repetition blog retrieval practice", …
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 40 \"https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=%22mnemonic%20medium%22&format=json&srlimi …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://nintil.com/tools-for-knowledge\" 16000 2>&1 | head -180", "description": "Fetch Nintil tools for knowledge"}
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://github.com/andymatuschak/orbit\" 3000 2>&1 | grep -i -A2 -B2 \"archiv\\|sunset\\|deprecat\\|no longer\\|noti …
- 🔧 web_search: {"queries": ["site:nintil.com \"Quantum Country\"", "Orbit withorbit.com shutting down 2023 Matuschak announcement", "\"Orbit\" andymatuschak \"no longer\" OR \ …
- 🔧 bash: {"command": "cd /tmp && python3 - <<'EOF'\nimport re,json,html\ns=open('/tmp/orb.html',encoding='utf-8',errors='replace').read()\nfor m in re.finditer(r'\"notic …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://notes.andymatuschak.org/zQ8mo2kNTPoQZuYbXPZgpJW\" 2000 2>&1 | head -25; echo \"=== search site ===\"; curl - …
- 🔧 bash: {"command": "cd /tmp && curl -sSL --max-time 60 -A \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122.0 Safari/537.36\" \"https://g …
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 40 -A \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122.0 Safari/537.36\" \"https://ol …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/hn.py 24288480 700 2>&1 | grep -i -B3 -A6 \"spaced\\|quantum\\|mnemonic\\|skeptic\\|evidence\" | head -80", "description":  …
- 🔧 bash: {"command": "cd /tmp && curl -sS --max-time 40 -X POST \"https://www.lesswrong.com/graphql\" -H \"Content-Type: application/json\" -d '{\"query\":\"{ posts(inpu …
- 🔧 web_search: {"queries": ["site:lesswrong.com \"Quantum Country\"", "site:lesswrong.com mnemonic medium spaced repetition Matuschak", "Peter Hartree spaced repetition notes  …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://ajschumacher.github.io/about/\" 1500 2>&1 | head -20; echo \"======== masterhowtolearn about\"; python3 /tmp …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://notes.andymatuschak.org/z6sX7ZcYdPiya3SzQ5segaq\" 3000 2>&1 | head -40", "description": "Read Matuschak note …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://scholar.archive.org/search?q=%22Quantum+Country%22\" 6000 2>&1 | head -60", "description": "Search scholar.a …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://github.com/ajschumacher\" 1500 2>&1 | head -25; echo \"==== arxiv augmented math ====\"; curl -sS --max-time …
- 🔧 web_search: {"queries": ["\"Quantum Country\" blog review \"I don't recommend\" OR \"disappointing\" OR \"overhyped\"", "\"mnemonic medium\" Matuschak criticism \"novelty e …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://loufranco.com/blog/review-of-quantum-country\" 9000 2>&1 | head -120", "description": "Fetch loufranco Quant …
- 🔧 bash: {"command": "cd /tmp && python3 - <<'EOF'\nimport re,html\ns=open('/tmp/a2.xml',encoding='utf-8',errors='replace').read()\nfor m in re.finditer(r'<entry>(.*?)</ …
- 🔧 bash: {"command": "cd /tmp && curl -sSL --max-time 60 -A \"Mozilla/5.0\" \"https://arxiv.org/pdf/2307.16112v1\" -o /tmp/am.pdf -w \"HTTP %{http_code} size %{size_down …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://loufranco.com/blog/what-are-books-for\" 7000 2>&1 | head -90", "description": "Fetch Lou Franco books post"}
- 🔧 web_search: {"queries": ["\"Quantum Country\" randomized controlled experiment participants study learning outcomes", "\"mnemonic medium\" replication attempt results blog" …
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/f.py \"https://notes.andymatuschak.org/zQT9UFGCjoZ9RLPtuHzMGhd\" 2500 2>&1 | head -30; echo \"======= aggressive scaling\"; …
- 🔧 bash: {"command": "cd /tmp && curl -sSL --max-time 60 -A \"Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 Chrome/122.0 Safari/537.36\" \"https://a …
- 🔧 web_search: {"queries": ["Jarrett Ye FSRS Quantum Country data analysis blog", "\"Quantum Country\" data analysis critic independent researcher"]}
- 🔧 bash: {"command": "cd /tmp && python3 /tmp/hnc.py \"Quantum%20Country\" 30 2>&1 | head -140", "description": "Search HN comments mentioning Quantum Country"}