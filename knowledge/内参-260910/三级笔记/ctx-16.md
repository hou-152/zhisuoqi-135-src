# 用持久化代码图谱给 AI Review 精准上下文

## 一句话主旨
持久代码图谱按需给 AI 精准上下文，省 token 不降质量。

## 作者试图回答的问题
Claude Code 每次任务重读整个代码库造成低效与 token 浪费，能否用本地持续更新的代码图谱只读取相关部分？子问题包括：图谱如何构建、增量更新并暴露给 Claude；在 code review 与编码任务中实际能省多少 token、评审质量是否受损；如何安装、配置与扩展。

## 三级论证骨架

### 一、问题定位：整库重读浪费上下文，图谱是解法
#### 1.1 起点问题
- Claude Code 每个任务都要重新读取整个代码库（"re-reads your entire codebase on every task"），效率低、token 消耗大。
#### 1.2 解法与 headline
- 用 Tree-sitter 为代码库构建结构化图谱，增量追踪变化，让 Claude 只读取真正相关的部分（"reads only what matters"）。
- 三个生产级开源项目上：code review 场景平均节省 6.8 倍 token，编码任务平均节省 14.1 倍、峰值 49 倍。

### 二、核心机制：持久图谱 + 增量更新 + blast radius + MCP 工具层
#### 2.1 图谱映射与存储
- 图谱映射代码库里的每一个 function、class、import、call、继承关系和 test。
- 数据存在 .code-review-graph/ 目录下的 SQLite 文件里；不依赖外部数据库、无云端依赖。
#### 2.2 查询方式：先看图，再只读相关文件
- 用户要求 Claude 做 code review 或改动代码时，Claude 先查询图谱，判断什么变了以及这些变化依赖着什么（"what depends on those changes"）。
- 然后只读取相关文件及其 blast-radius 信息，而不是扫描全部代码；用户体验不变（"You continue using Claude Code exactly as before"），图谱后台自主运行。
- Blast-radius 分析精确显示任意改动影响到哪些 functions、classes、files；对应 MCP 工具 get_impact_radius_tool（变更文件的 blast radius）。
#### 2.3 增量更新与自动同步
- 增量更新只重新解析变化文件；后续更新在 2 秒内完成。
- 自动更新 hooks：每次文件编辑和 git commit 后自动更新图谱；Watch 模式持续在后台随代码变化更新。
- 构建速度：500 文件项目初次构建约 10 秒。
#### 2.4 三层接口
- Slash commands：/code-review-graph:build-graph（构建或重建）、/review-delta（评审自上次 commit 以来变化）、/review-pr（带 blast-radius 分析的完整 PR 评审）。
- CLI：install（注册 MCP server）、build、update（增量）、status、watch、visualize、serve。
- MCP 工具（图谱建好后 Claude 自动调用）：build_or_update_graph_tool、get_impact_radius_tool、get_review_context_tool、query_graph_tool、semantic_search_nodes_tool、embed_graph_tool、list_graph_stats_tool、get_docs_section_tool。
  - get_review_context_tool 产出 token 优化的评审上下文和结构化摘要，是 code review 场景核心产出。

### 三、验证一：Code Review 场景，平均 6.8x token 削减
#### 3.1 测试设计
- 基础：6 次真实 git commit。
- 图谱把读取整份源文件替换成一份 156～207 token 的紧凑结构化摘要，涵盖 blast radius、测试覆盖缺口、依赖链。
- 标准方式定义为读取全部改动文件加上 diff；评审质量按准确性、完整性、发现 bug 的潜力、可执行洞见打分（1～10 分制）。
#### 3.2 三仓库对比
- httpx（125 文件）：12,507 → 458 tokens，降低 26.2x；评审质量 9.0 vs 7.0。
- FastAPI（2,915 文件）：5,495 → 871 tokens，降低 8.1x；评审质量 8.5 vs 7.5。
- Next.js（27,732 文件）：21,614 → 4,457 tokens，降低 6.0x；评审质量 9.0 vs 7.0。
- 平均：13,205 → 1,928 tokens，降低 6.8x；评审质量 8.8 vs 7.2。

### 四、验证二：实际编码任务，平均 14.1x、峰值 49x
#### 4.1 测试设计
- 一个 agent 在同样三个仓库上执行 6 个真实编码任务（加功能、修 bug）。
- 图谱负责把 agent 指向正确文件、引导它避开无关文件。
#### 4.2 具体数据
- httpx 加限流器：14,090 vs 64,666 tokens，4.6x，跳过 58 个文件。
- httpx 修流式 bug：14,090 vs 64,666 tokens，4.6x，跳过 59 个文件。
- FastAPI 加限流器：37,217 vs 138,585 tokens，3.7x，跳过 1,120 个文件。
- FastAPI 修流式 bug：36,986 vs 138,585 tokens，3.7x，跳过 1,121 个文件。
- Next.js 加限流器：15,049 vs 739,352 tokens，49.1x，跳过约 16,000 个文件。
- Next.js 修流式 bug：16,135 vs 739,352 tokens，45.8x，跳过约 16,000 个文件。
#### 4.3 规模效应
- 图谱在每一个案例中都找到了正确文件。
- 节省幅度随仓库规模放大：125 文件项目约 4.6x，27,000+ 文件 monorepo 接近 49x。

### 五、落地、配置与可扩展路径
#### 5.1 安装与上手
- 两种安装：Claude Code Plugin（推荐）：claude plugin add tirth8205/code-review-graph；pip：pip install code-review-graph，再执行 code-review-graph install。
- 安装后需重启 Claude Code；依赖 Python 3.10+ 和 uv。
- 快速上手：在 Claude Code 中打开项目，说“Build the code review graph for this project”。
#### 5.2 支持语言与新增语言
- 支持 12 种语言：Python、TypeScript、JavaScript、Go、Rust、Java、C#、Ruby、Kotlin、Swift、PHP、C/C++。
- 新增语言：编辑 code_review_graph/parser.py，把新扩展名加入 EXTENSION_TO_LANGUAGE，并在 _CLASS_TYPES、_FUNCTION_TYPES、_IMPORT_TYPES、_CALL_TYPES 中加对应 node type 映射，附测试 fixture 后提交 PR。
#### 5.3 可选增强与排除
- 语义搜索为可选功能，通过 sentence-transformers 提供向量 embedding；安装可选依赖 pip install code-review-graph[embeddings]。
- 排除路径：仓库根目录创建 .code-review-graphignore，可排除 generated/**、*.generated.ts、vendor/**、node_modules/** 等。
- 交互式可视化：基于 D3.js 的力导向图，支持按 edge-type 切换和搜索。
- 许可协议：MIT License。

## 作者边界、反例与不确定性
- 基准范围：三个生产级开源项目、6 次真实 git commit、6 个真实编码任务；节省幅度随仓库规模放大，从 125 文件约 4.6x 到 27,000+ 文件接近 49x。
- 评审质量按准确性、完整性、发现 bug 潜力、可执行洞见（1～10）打分；原文未说明评分者、盲测方式或独立复现情况。
- 语义搜索是可选依赖；支持 12 种语言，新增语言需手动修改 parser.py 并提交 PR。
- 图谱本地存于 .code-review-graph/ SQLite，无云端依赖；.code-review-graphignore 可排除生成代码和第三方依赖。
- 原文未明确给出失败案例、不适用仓库类型、与其他 AI 编码工具或模型配合的边界。
