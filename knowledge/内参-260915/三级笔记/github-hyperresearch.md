# jordan-gibbs/hyperresearch：基于智能体的研究知识库

## 一句话主旨
Hyperresearch 将 Claude Code 扩展为分层自适应的 16 步对抗研究流水线，以“只打补丁绝不重写”为铁律，并将每篇文献沉淀进持久可复用的 Markdown 知识库。

## 作者试图回答的问题
现有的自动化深度研究（Deep Research）系统为何频繁出现虚假引文、浮躁扫读与一次性研究成果无法复用的问题？如何构建具备同行评审级可信度的智能体研究工作流？

## 三级论证骨架

### 一、系统定位与跑赢基准的六大优势
#### 1.1 深度研究代理的核心能力
- 接收一个单一提示词，驱动 16 步分层自适应工作流，产出对抗性审计并附带完整出处的长篇报告。
  - 原话：“Hyperresearch 将 Claude Code 改造成一个深度研究代理：目前在 DeepResearch-Bench RACE 排行榜上名列前茅（内部基准测试）。一个分层自适应的 16 步流程只需接收一个提示，即可生成一份经过对抗性审计并包含完整源代码来源的报告。”
#### 1.2 解决引文造假与文献掠读
- 单次运行支持抓取 250+ 来源，联合发布的新闻稿去重归类，杜绝单一信源伪装共识。
- 独立引文核查员在报告发布前逐句验证引文是否真正支撑论点，彻底过滤捏造引文与撤稿论文。
- 穿透付费墙：通过合法开放获取渠道（Unpaywall、Europe PMC、CORE）拉取学术论文全文阅读，拒绝仅读 1500 字摘要。

### 二、16 步自适应流水线与两大承重原则
#### 2.1 阶梯（Tiers）与档位（Gears）
- 阶梯按查询路由：Light 快速通道（5 步，~30-40 分钟）；Full 默认完整模式（16 步 + 引文核查，~1.5-2.5 小时）；Dissertation 论文模式（4-10 章巨型运行，2.5 万-8 万字，300-450 个文献）。
- 档位（Gears）设定来源与深度预算（如 premier 档目标 100-130 个来源）。
#### 2.2 两大承重原则（Load-Bearing Principles）
- 第一原则：只打补丁，绝不重写（Patch, never regenerate）。
  - 原话：“Patch, never regenerate. After step 11 produces the synthesized report (or step 10 for light tier), the only modifications are surgical Edit hunks. The patcher and polish auditor are tool-locked to [Read, Edit] at the Claude Code allowlist level so they physically cannot Write a new draft.”
  - 修改者在工具层面被锁死为只读与局部编辑，物理上无法重写全篇，杜绝越修越乱。
- 第二原则：原始用户研究查询即圣经（Canonical research query is gospel）。
  - 原话：“Canonical research query is gospel. The verbatim user prompt is persisted to research/runs/<vault_tag>/query.md once and re-read by every subsequent step and every spawned subagent.”

### 三、持久可复用的知识库（The Vault）
#### 3.1 本地优先存储哲学
- 普通深度研究工具用完即丢，而 Hyperresearch 将读取的每篇文献永久沉淀在 SQLite 索引的知识库中，供未来会话优先检索复用。
- 核心存储架构：
  - 原话：“Markdown is truth, SQLite is cache. Notes live as plain markdown with YAML frontmatter in research/notes/. The SQLite index is fully rebuildable: delete it and hyperresearch sync reconstructs it from the markdown.”
#### 3.2 笔记生命周期治理（Curation Lifecycle）
- 严防知识库沦为垃圾场：
  - 原话：“Every session ends with a curation pass, and notes move through draft → review → evergreen, or stale → deprecated → archive as material ages out. That's what keeps a vault from turning into a landfill of half-read pages.”
- 支持 MCP 服务（13 种工具，打通 Claude Desktop 与 Cursor）及无依赖本地 Web 浏览界面。

## 作者边界、反例与不确定性
作者明确说明，排行榜名列前茅目前基于分层试点研究与 DeepResearch-Bench 的前瞻对比，第三方独立验证仍在进行中；16 步巨型运行在时间与 Token 成本上代价不菲（耗时从半小时到 8 小时不等），不适用于简单的单步事实问答。
