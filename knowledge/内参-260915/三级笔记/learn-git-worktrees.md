# Worktrees | ChatGPT Learn

## 一句话主旨
Codex 利用底层 Git Worktree 机制为多会话提供独立工作区，实现前后台任务并行且互不干扰的代码开发与 Handoff 交接。

## 作者试图回答的问题
当开发者与 AI 智能体在同一个项目代码库中并发协作时，如何避免多对话之间的文件写入冲突、分支污染以及本地未提交修改的破坏？

## 三级论证骨架

### 一、什么是 Worktree 及其并行的核心优势
#### 1.1 核心定义与运行位置
- Worktree 让 Codex 能在同一个 Git 项目中运行多个独立的对话，彼此互不干扰。
  - 原话：“Worktrees let Codex run multiple independent chats in the same project without interfering with each other. The repository, worktree, and commands remain on the computer or remote development environment that contains the project.”
- 底层基于 Git worktrees：每个工作树拥有独立的检出文件副本，但共享全局的元数据（.git 目录）。
  - 原话：“Each worktree has its own copy of every file in your repo but they all share the same metadata (.git folder) about commits, branches, etc. This allows you to check out and work on multiple branches in parallel.”
#### 1.2 三大使用场景
- 与 Codex 并行协作而不打扰当前的 Local 本地环境。
- 将后台自动化或耗时任务排队，前台保持专注。
- 当准备就绪后，随时将后台会话交接（Handoff）到前台本地进行检查与调试。

### 二、前后台切换与工作流机制
#### 2.1 关键术语与角色定位
- Local（本地检出）：开发者当前所在的交互前台。
- Worktree（工作树）：从本地检出中派生出的后台独立沙盒。
- Handoff（交接）：在 Local 与 Worktree 之间双向移动会话与代码的安全流转机制。
  - 原话：“Under the hood, Handoff handles the Git operations required to move work between two checkouts safely. This matters because Git only allows a branch to be checked out in one place at a time.”
#### 2.2 两种常见实践路径
- 路径一：全量在 Worktree 上工作。利用本地环境初始化脚本运行依赖测试，并直接在工作树中转为正式分支并开 PR。
- 路径二：交接回 Local。当需要用习惯的本地 IDE 窗口、启动单实例开发服务时，交接到本地检出。

### 三、底层管理与限制处理
#### 3.1 游离头指针（Detached HEAD）与配置复制
- Codex 默认在 `$CODEX_HOME/worktrees` 下创建工作树，并处于 detached HEAD 状态，避免创建临时分支污染分支列表。
  - 原话：“The worktree isn't checked out as a branch. It's in a detached HEAD state. This lets Codex create several worktrees without polluting your branches.”
- 利用 `.worktreeinclude` 配置文件复制被 `.gitignore` 忽略的环境变量与凭据文件（如 `.env`、`secrets.json`）。
  - 原话：“If your repository ignores local setup files that a new worktree needs, add a .worktreeinclude file to the repository root and list the ignored paths or .gitignore-style patterns to copy when Codex creates a managed worktree.”
#### 3.2 为什么 Git 限制同一分支多处检出
- 分支是指向当前工作状态的可变引用（`refs/heads/<name>`）。若多个工作树同时检出，会导致并发提交和变基竞态。
  - 原话：“Git prevents the same branch from being checked out in more than one worktree at a time because a branch represents a single mutable reference (refs/heads/<name>) whose meaning is “the current checked-out state” of a working tree.”

## 作者边界、反例与不确定性
作者明确指出，Worktree 会成倍消耗本地磁盘空间（每个工作树携带全套文件、依赖与构建缓存），因此系统默认限制保留最近 15 个托管工作树；此外，通过 Handoff 迁移代码时，未纳入 `.worktreeinclude` 的未跟踪或忽略文件不会自动跟随转移。
