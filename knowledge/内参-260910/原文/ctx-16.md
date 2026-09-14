# 用持久化代码图谱给 AI Review 精准上下文

- 标题：用持久化代码图谱给 AI Review 精准上下文
- 来源：github.com
- 原文：https://github.com/tirth8205/code-review-graph
- 作者：GitHub
- 类型：主题特刊
- 摘要：code-review-graph 在本地建立可持续更新的代码库地图，让 MCP 与 CLI 按需取回相关结构，减少大型仓库评审中的上下文浪费。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：9528
- 策展人按：这组的落地收尾。前面讲 agent 该怎么看世界，这篇给了一个具体做法，还带代码。

---

- 原文标题：tirth8205/code-review-graph
- 作者：GitHub
- 内参日期：2026-07-18
- 来源类型：blog
- 原文：https://github.com/tirth8205/code-review-graph
- 标签：agent skills

code-review-graph 在本地建立可持续更新的代码库地图，让 MCP 与 CLI 按需取回相关结构，减少大型仓库评审中的上下文浪费。

## 导读

建立代码库地图。看起来对于理解代码库非常有用。

## 核心观点

Claude Code 每次任务都要重新读取整个代码库("re-reads your entire codebase on every task")，这是 code-review-graph 要解决的问题。它用 Tree-sitter 为代码库构建一个结构化图谱，增量追踪变化，让 Claude 只读取真正相关的部分而不是扫描一切。作者在三个生产级开源项目（httpx、FastAPI、Next.js）上做了基准测试：code review 场景平均节省 6.8 倍 token，实际编码任务平均节省 14.1 倍、峰值达到 49 倍，且节省幅度随仓库规模增大而放大——125 文件的小项目约 4.6x，27,000+ 文件的 monorepo 接近 49x。

## 问题与定位

- 起点问题：Claude Code 在每个任务上都要重新读一遍整个代码库，效率低、token 消耗大。
- code-review-graph 的解法：用 Tree-sitter 构建代码的结构化地图，增量追踪变化，给 Claude 精准上下文，使其"只读取真正重要的部分"（reads only what matters）。
- headline 数字：三个生产级开源项目上，code review 场景节省 6.8 倍 token，编码任务最高节省 49 倍 token。

## 安装与快速上手

- 两种安装方式：
- Claude Code Plugin（推荐）：claude plugin add tirth8205/code-review-graph
- pip：pip install code-review-graph，再执行 code-review-graph install
- 安装后需重启 Claude Code；依赖 Python 3.10+ 和 uv。
- 快速上手：在 Claude Code 中打开项目，直接说"Build the code review graph for this project"。
- 构建速度：500 文件项目初次构建约耗时 10 秒；此后图谱在每次文件编辑和 git commit 时自动更新。

## 工作原理

- 图谱映射代码库里的每一个 function、class、import、call、继承关系（inheritance relationship）和 test。
- 当用户要求 Claude 做 code review 或改动代码时，Claude 先查询图谱，判断"什么变了"以及"这些变化依赖着什么"（what depends on those changes），然后只读取相关文件及其 blast-radius 信息，而不是扫描全部代码。
- 用户体验不变（"You continue using Claude Code exactly as before"），图谱在后台自主运行，随写代码持续更新自身。

## 基准测试一：Code Review 场景，平均 6.8x token 削减

- 测试基础：6 次真实 git commit。
- 图谱把"读取整份源文件"替换成一份 156～207 token 的紧凑结构化摘要，涵盖 blast radius、测试覆盖缺口（test coverage gaps）、依赖链（dependency chains）。
- 三个仓库的对比数据：
- httpx（125 文件）：标准方式 12,507 tokens → 有图谱 458 tokens，降低 26.2x，评审质量 9.0 vs 7.0。
- FastAPI（2,915 文件）：5,495 tokens → 871 tokens，降低 8.1x，评审质量 8.5 vs 7.5。
- Next.js（27,732 文件）：21,614 tokens → 4,457 tokens，降低 6.0x，评审质量 9.0 vs 7.0。
- 平均：13,205 tokens → 1,928 tokens，降低 6.8x，评审质量 8.8 vs 7.2。
- "标准方式"定义为读取全部改动文件加上 diff；评审质量按准确性、完整性、发现 bug 的潜力、可执行洞见打分（1～10 分制）。

## 基准测试二：实际编码任务，平均 14.1x、峰值 49x

- 一个 agent 在同样三个仓库上执行了 6 个真实编码任务（加功能、修 bug）。
- 图谱负责把 agent 指向正确文件、引导它避开无关文件。
- 具体数据：
- httpx 加限流器：14,090 vs 64,666 tokens，4.6x，跳过 58 个文件。
- httpx 修流式 bug：14,090 vs 64,666 tokens，4.6x，跳过 59 个文件。
- FastAPI 加限流器：37,217 vs 138,585 tokens，3.7x，跳过 1,120 个文件。
- FastAPI 修流式 bug：36,986 vs 138,585 tokens，3.7x，跳过 1,121 个文件。
- Next.js 加限流器：15,049 vs 739,352 tokens，49.1x，跳过约 16,000 个文件。
- Next.js 修流式 bug：16,135 vs 739,352 tokens，45.8x，跳过约 16,000 个文件。
- 图谱在每一个案例中都找到了正确文件；节省幅度随仓库规模放大——125 文件项目约 4.6x 降低，27,000 文件的 monorepo 接近 49x。

## 使用方式：Slash Commands、CLI、MCP 工具三层接口

- Slash commands：/code-review-graph:build-graph（构建或重建图谱）、/code-review-graph:review-delta（评审自上次 commit 以来的变化）、/code-review-graph:review-pr（带 blast-radius 分析的完整 PR 评审）。
- CLI 命令：install（注册 MCP server）、build（解析整个代码库）、update（增量更新，只处理变化文件）、status（图谱统计）、watch（文件变化时自动更新）、visualize（生成交互式 HTML 图）、serve（启动 MCP server）。
- MCP 工具（图谱建好后 Claude 自动调用）：build_or_update_graph_tool、get_impact_radius_tool（变更文件的 blast radius）、get_review_context_tool（token 优化的评审上下文和结构化摘要）、query_graph_tool（调用者/被调用者/测试/import/继承查询）、semantic_search_nodes_tool（按名称或语义搜索代码实体）、embed_graph_tool（计算语义搜索用的向量 embedding）、list_graph_stats_tool（图谱规模和健康度）、get_docs_section_tool（检索文档章节）。

## 核心特性一览

- 增量更新：只重新解析变化文件，后续更新在 2 秒内完成。
- 支持 12 种语言：Python、TypeScript、JavaScript、Go、Rust、Java、C#、Ruby、Kotlin、Swift、PHP、C/C++。
- Blast-radius 分析：精确显示任意改动影响到哪些 functions、classes、files。
- 自动更新 hooks：每次文件编辑和 git commit 后自动更新图谱，无需手动干预。
- 语义搜索（semantic search）：可选功能，通过 sentence-transformers 提供向量 embedding。
- 交互式可视化：基于 D3.js 的力导向图（force-directed graph），支持按 edge-type 切换和搜索。
- 本地存储：数据存在 .code-review-graph/ 目录下的 SQLite 文件里，不依赖外部数据库、无云端依赖。
- Watch 模式：持续在后台随代码变化更新图谱。

## 配置与扩展

- 排除路径：在仓库根目录创建 .code-review-graphignore 文件，可以排除 generated/\*\*、\*.generated.ts、vendor/\*\*、node_modules/\*\* 等路径。
- 语义搜索的可选依赖：pip install code-review-graph[embeddings]。
- 贡献指南：clone 仓库、创建虚拟环境、pip install -e ".[dev]"、运行 pytest。
- 新增语言支持的路径：编辑 code_review_graph/parser.py，把新扩展名加入 EXTENSION_TO_LANGUAGE，并在 \_CLASS_TYPES、\_FUNCTION_TYPES、\_IMPORT_TYPES、\_CALL_TYPES 里加上对应的 node type 映射，附带测试 fixture 后提交 PR。
- 许可协议：MIT License。

## 概念网络

### 关键概念

### code-review-graph

**context**：文章标题工具本身，定位是解决"Claude Code re-reads your entire codebase on every task"的问题，用 Tree-sitter 构建结构化代码地图、增量追踪变化，给 Claude "precise context so it reads only what matters"。

**费曼一下**：给你的代码库先画一张随时更新的"结构地图"，这样 AI 每次帮你改代码或做评审时，不用把整个项目重新翻一遍，直接按图索骥找到该看的地方。

### Tree-sitter

**context**：文章开篇点明工具的解析基础——"It builds a structural map of your code with Tree-sitter"，后文提到支持 12 种语言的解析都依赖这套底层技术。

**费曼一下**：一个能把各种编程语言的源代码精确拆解成结构化"语法树"的解析引擎，是很多代码工具（包括这里的图谱）用来"读懂代码"的地基。

### 持久化代码图谱（structural map / graph）

**context**：图谱"maps every function, class, import, call, inheritance relationship, and test in your codebase"，一旦构建完成就持久保存在本地，供后续查询和增量更新使用，而不是每次任务临时生成。

**费曼一下**：不是每次都临时给代码拍一张快照，而是造一张一直存在、可以反复查阅、还会自己更新的"代码关系网地图"。

### 增量更新（incremental update）

**context**：文中反复强调这一机制——"tracks changes incrementally"，安装后"the graph updates automatically on every file edit and git commit"，CLI 里专门有 update 命令做"Incremental update (changed files only)"，特性表里注明"Subsequent updates complete in under 2 seconds"。

**费曼一下**：地图第一次画好之后，以后每次你只改了几个文件，系统只重新画这几处，而不是把整张地图推倒重来，所以更新特别快。

### Blast radius（爆炸半径 / 影响半径）

**context**：这是全文评审和编码场景共用的核心概念——查询图谱后"reads only the relevant files along with their blast-radius information"；MCP 工具里专门有 get_impact_radius_tool（"Blast radius of changed files"）；特性表里也称之为"Shows exactly which functions, classes, and files are affected by any change"。

**费曼一下**：你改了一行代码，这行代码会像水波一样影响到哪些函数、哪些文件、哪些测试——"影响半径"就是把这圈涟漪精确画出来，让 AI 知道除了你改的地方，还该关心哪些地方。

### Token 优化的评审上下文（get_review_context_tool）

**context**：这是图谱落地到 code review 场景的具体产出物——"a compact structural summary (156 to 207 tokens) covering blast radius, test coverage gaps, and dependency chains"，对应 MCP 工具里的 get_review_context_tool（"Token-optimised review context with structural summary"）。

**费曼一下**：不是把整个改动文件甩给 AI 去读，而是先浓缩成一份几百 token 的"体检报告"，告诉它这次改动影响了哪些地方、测试有没有覆盖、依赖链是什么样，AI 读这份报告就够了。

### Review Quality 评分方法

**context**：基准测试用来验证"用图谱省 token 是否会牺牲评审质量"的量化手段——"Quality scored on accuracy, completeness, bug-catching potential, and actionable insight (1 to 10 scale)"，结果显示用图谱后评审质量普遍不降反升（如 httpx 的 9.0 vs 7.0）。

**费曼一下**：光说"省了多少 token"没说服力，所以作者专门找了一套标准（准不准、全不全、能不能抓到 bug、给不给得出具体建议）给每次评审打分，证明省 token 的同时评审质量没有变差，反而更好。

### MCP 工具层

**context**：图谱建好后，Claude 通过一组 MCP 工具自动与图谱交互——"Claude uses these automatically once the graph is built"，包括 build_or_update_graph_tool、query_graph_tool（callers、callees、tests、imports、inheritance 查询）、semantic_search_nodes_tool、list_graph_stats_tool、get_docs_section_tool 等八个工具；CLI 里也有对应的 install（"Register MCP server with Claude Code"）和 serve（"Start MCP server"）命令。

**费曼一下**：图谱本身只是一堆数据，MCP 工具层就是把这些数据包装成 Claude 能直接调用的"接口菜单"，Claude 不需要理解图谱内部结构，只要按需调用对应工具就能拿到答案。

### 语义搜索（semantic search / embeddings）

**context**：作为可选特性出现两次——特性表里的"Semantic search: Optional vector embeddings via sentence-transformers"，以及配置章节的可选依赖"pip install code-review-graph[embeddings]"；对应 MCP 工具里的 embed_graph_tool（"Compute vector embeddings for semantic search"）和 semantic_search_nodes_tool（"Search code entities by name or meaning"）。

**费曼一下**：默认的图谱查询是按名字、按调用关系精确匹配；语义搜索是额外装一层"理解意思"的能力，让你可以用意思相近的描述去找代码，而不必记住确切的函数名。

### code-review-graphignore 排除配置

**context**：文中给出具体示例——"create a .code-review-graphignore file in your repository root"，可排除 generated/\*\*、\*.generated.ts、vendor/\*\*、node_modules/\*\* 等路径，避免图谱把生成代码、第三方依赖也纳入索引。

**费曼一下**：跟 .gitignore 是同一个思路，只不过这次排除的对象是"不需要被 AI 理解和索引的代码"，比如自动生成的文件和第三方库，省得图谱做无用功。

### Watch 模式与自动更新 hooks

**context**：CLI 中的 watch 命令对应"Auto-update on file changes"，特性表里同时列出"Auto-update hooks: Graph updates on every file edit and git commit without manual intervention"和"Watch mode: Continuous graph updates as you work"，两者共同保证图谱始终和代码库保持同步、无需用户手动触发。

**费曼一下**：图谱不是"手动按一下才更新"的死地图，而是像后台常驻的哨兵，你一保存文件、一提交 commit，它就自动把地图补上最新的那一块。

### 多语言结构化解析（12 languages / node type mappings）

**context**：特性表列出支持的 12 种语言——"Python, TypeScript, JavaScript, Go, Rust, Java, C#, Ruby, Kotlin, Swift, PHP, C/C++"；贡献指南里说明扩展新语言的具体路径——编辑 parser.py，把扩展名加入 EXTENSION_TO_LANGUAGE，并在 \_CLASS_TYPES、\_FUNCTION_TYPES、\_IMPORT_TYPES、\_CALL_TYPES 中补充对应的 node type 映射。

**费曼一下**：这个工具不是只认一种语言，而是给每种语言都配了一份"翻译词典"（哪种语法结构算类、哪种算函数、哪种算调用），想让它认识一门新语言，本质上就是往词典里加词条。

### 概念网络

![图片展示了code-review-graph概念网络图，从仓库反复重读开始，经Tree-sitter生成持久化代码图谱，再通过增量更新、MCP暴露图谱、Benchmark、Quality检查等环节，最终形成精准评审上下文。其中，Blast Radius与效果验证、精准评审上下文相连，MCP暴露图谱与Blast Radius相连，Benchmark与效果验证相连，Quality检查与效果验证相连。该图与上下文紧密相关，直观呈现了code-review-graph的工作流程。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NDI3ZTFmZTU2M2RiNWJmOWNkZjBhOWY1OGFkMzE4NDVfZGQxYzk2N2Y5ODkxNjg5YWNkYzk4ODA3ZWQwODJlZjBfSUQ6NzY2OTUxNjYxMTQ4ODg2MTE1Ml8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

这篇文章的概念网络围绕一条"从问题到解法、从解法到验证、从验证到落地"的链条展开。起点是"Claude Code 每次任务都重新读整个代码库"这个效率痛点，code-review-graph 用 Tree-sitter 作为底层解析引擎，把代码库转成一张持久化代码图谱，并靠增量更新机制（配合 Watch 模式与自动更新 hooks）让这张图始终和代码库保持同步而不必每次重建。图谱本身只是数据结构，真正让它对 Claude 可用的是 MCP 工具层——其中 blast radius 是贯穿全文最核心的中间产物：无论是 code review 场景里的 token 优化评审上下文，还是编码任务里"指向正确文件、避开无关文件"，都建立在准确计算出"这次改动影响了哪些函数、文件、测试"的基础之上。两组基准测试数据（code review 的 6.8x 平均削减、编码任务的 14.1x 平均 / 49x 峰值削减）共同验证了这条链路的有效性，而 Review Quality 评分方法则补上了关键的一环——证明省 token 并不是靠牺牲评审质量换来的，两个基准测试互为印证，节省幅度还随仓库规模（125 文件到 27,000+ 文件）呈现明显的正相关放大效应。语义搜索作为可选增强，为图谱补上"按意思查找"的能力，与按名称、按调用关系的精确查询互补；而 .code-review-graphignore 排除配置和多语言结构化解析则分别从"图谱该覆盖什么"和"图谱能理解多少种语言"两个维度，决定了这张持久化代码图谱的覆盖边界和可扩展性。

---
