# Archify

## 一句话主旨
让代理在聊天中把代码库或系统描述，确定性地编译成可信、可交互、可共享的系统图。

## 作者试图回答的问题
如何在聊天中把技术意图变成"打开即可演示、可审查、可信任"的系统图？
关联子问题：它和 Mermaid、通用自动布局、WYSIWYG 有何不同？输出凭什么可信？哪些事它明确不做？

## 三级论证骨架

### 一、定位：把技术意图变成沟通产物
#### 1.1 是什么
- 面向 Cursor、Claude Code、Codex CLI、OpenCode 的 Node.js 渲染和验证系统。
  - 机制："代理生成类型化的 JSON IR；Archify 确定性地将其编译为 HTML/SVG。"
- "无需存储库：在任何客服聊天中描述系统。"
- 明确划界："Archify is not a general-purpose drawing editor or a Mermaid theme."

#### 1.2 四条核心卖点（开篇主张）
- 打开即可演示——五种图表类型、四种预设、深色/浅色主题、内置品牌标识和有限动态效果。
- 合并前审查架构变更——比较两个已验证快照，记录新增、删除、更改、移动、重新路由的确切信息。
- 每一次交互都基于现实——不凭空创建拓扑、不声称 runtime impact。
- 一个文件即可信任并共享——类型化 JSON IR + 确定性检查生成独立 HTML 及 PNG、SVG、WebM、1200×630 共享卡。

### 二、核心工作流：先验证再交付
#### 2.1 五步流水线
- **Generate**：代理从描述生成类型化 JSON IR。
- **Validate**：内置验证器和布局规则检查源；失败以机器可读 JSON 指出精确的局部修复。
- **Preview（可选）**：仅 loopback 的桌面会话，监视单个源，仅在验证通过后重载，失败保留 last-good。
- **Deliver**：同目录候选先渲染并检查，"only a passing artifact atomically replaces the target"，之后可选 `--open` 打开该确切文件。
- **Iterate**：代理更新源，无关结构保持稳定。

#### 2.2 验证门槛与失败处理
- 原子验证：schema、layout、HTML/SVG、route、label-to-route clearance 必须全部通过，才替换 last-known-good。
- 失败带"修复收据"：`validate --json` 和 `deliver --json` 返回稳定规则码、精确 subject、测量证据、仅支持修复控制。
  - 限定：只应用各 `diagnostics[]` subject 的 `supportedFixes`，且在 Skill 的两轮修正内；"visual review remains separate"。
- `preview` 细节：随机 `127.0.0.1` 端口，监视一个 JSON，失败时保留最后验证输出，Ctrl-C 停止，不向生成 HTML 注入运行时。

### 三、差异化主张（Why Archify）
#### 3.1 布局判断优先于通用自动布局
- 代理自行选择层级、间距、路由、强调；共享的自动端点确定性地分散，而不是把箭头堆在同一个中点。

#### 3.2 可信性设计
- 类型化 JSON IR：每个 renderer-backed 模式都有 schema 和可复现源。
- 失败附带修复收据；last-good 实时预览在保存不完整或无效时保留上一张已验证图。
- 真实交互：focus、上下游 reach、精确路由、角色比较、故事都复用作者节点和关系。
- 按需源证据：Evidence-backed 的 Architecture 节点标记 `SRC n`，打开钉在一个公开 commit 的 Git-verified 文件与行范围；"ordinary artifacts stay source-free"。
- 默认可移植：结果是一个 HTML 文件；导出保持全图、不含临时 viewer 状态。

### 四、五种图表类型与专门模式
#### 4.1 类型—用途对照
- **Architecture**：组件、服务、存储、边界；提示含范围、核心组件、主路径。
- **Workflow**：CI/CD、审批、工具调用、runbook；含参与者、顺序、分支、异常。
- **Sequence**：API 调用、缓存回退、鉴权、异步追踪；含调用方、被调方、返回、时序。
- **Data Flow**：管道、血缘、PII、消费方；含源、转换、存储、边界。
- **Lifecycle**：状态、重试、等待、终态；含状态、事件、重试与取消路径。

#### 4.2 两个专门机制
- `deployment-ownership` profile（Architecture 可选）："fails closed"，当作者 owners、region placement、私有数据库范围或命名 crossing 缺失时失败；"never implicit and does not inspect live infrastructure"。
- Architecture Delta：用机器收据比较已验证的 Before / Delta / After 快照；可选择某个作者改动或播放有限的 viewer-only Review；"infers no impact, risk, or merge safety"。

### 五、交互与导出
#### 5.1 交互控制
- 事实性 Diagram Guide（?）、搜索聚焦节点（/）、追踪作者上下游 reach、探测有向路由（R/PATH）、比较语义角色（L/LENS）、live overview radar（M/MAP）、播放引导故事（P/[]）、Presentation Stage（F）、切风格（S）/主题（T）/导出（E）、缩放与重置。
- 稳定链接可恢复 `#focus`、`#relation`、`#route`、`#lens`、`#view` 等状态；读者驱动的动效有限、尊重 `prefers-reduced-motion`，且不进入 canonical 导出。

#### 5.2 导出
- Export 菜单复制 PNG 到剪贴板并下载静态或动态格式。
- Copy Share Card：规范化 1200×630 图，用于 README、发布或社交。
- Route Share Card：追踪路由后导出该路径为 1200×630 PNG，保留完整图作上下文。
- Reach Share Card：追踪作者 Upstream/Downstream reach 后导出，"without claiming runtime impact"。

### 六、安装、集成与更新
#### 6.1 安装
- 主命令 `npx skills add tt-a1i/archify -g`；提供显式非交互 Cursor 安装与免安装试用命令。
- Surface 覆盖：Cursor、Codex、claude-code、opencode；Raven 需手动解压 ZIP，且"Raven is not a switcher target"。
- 多 surface 能力表：Claude Code / Codex CLI / opencode / Raven 均为"Full renderer + validation workflow"；Claude.ai 上传 ZIP"Depends on Node.js access in the sandbox"；Project Knowledge 为"Prompt-driven architecture fallback"。
- DeepSeek Harness 为 opt-in 社区集成，"not an official DeepSeek product. No telemetry."

#### 6.2 更新检查与隐私
- 可能 GET 固定的 stable manifest 仅用于显示可选提醒，"it never downloads or installs updates"。
- 成功检查等待约 72 小时（±20%）；活跃使用失败后 6 小时、再 24 小时重试。
- 服务器看到常规 HTTP 元数据（IP 与时间），但不收到版本、Agent、项目数据、提示词、账户/设备 ID 或 ETag；可用 `ARCHIFY_UPDATE_CHECK_DISABLED=1` 关闭。

#### 6.3 设置
- `meta.locale=en|zh-CN` 仅本地化页面标题、Legend、状态/错误、a11y、HTML/SVG `lang`，"never authored content"。
- `animation`（静态省略）、`visual_preset`（`classic` 默认）。

### 七、明确的范围排除
- "自动 Mermaid 解析、通用自动布局、托管共享和 WYSIWYG 编辑功能有意不在当前范围内。"

## 作者边界、反例与不确定性
- **明确不做**：Mermaid 自动解析、通用自动布局、托管共享、WYSIWYG 编辑；不是通用绘图编辑器，不是 Mermaid 主题。
- **声明不越界**：交互不声称 runtime impact；Architecture Delta 不推断影响、风险或合并安全；deployment-ownership profile 不检查实时基础设施且 fail closed。
- **需要外部条件**：Claude.ai 安装依赖沙盒中的 Node.js 访问；DeepSeek Harness 需 Node `^22.19.0 || >=24.0.0`，Shell 文件需精确 workspace 路径而非 Web Produced Files。
- **版本状态**：当前开发版本 `v2.17.0-dev.1`（见"Unreleased"更新日志）。
- **商业化/生态披露**：含 Supercode 赞助与"编辑之选"标记、赞助邮箱、LINUX DO 链接。
- 材料未明确给出产品局限或失败率的量化数据。
