# Using Agent Skills with the API（用 API 使用 Agent Skills）

## 一句话主旨
Skills 文件系统按需加载；API 靠代码执行工具。

## 作者试图回答的问题
核心问题：Agent Skills 是什么、如何工作，以及如何在 Claude API 中使用。关联子问题：预置与自定义 Skill 如何编写/上传、在各产品面如何共享与受限；安全、数据留存和运行环境边界是什么。

## 三级论证骨架
### 一、Agent Skills 的定位与价值
#### 1.1 定义
- 每个 Skill 是模块化功能，包含指令、元数据和可选资源（脚本、模板）；Claude 在需要时自动使用。
  - 技能是文件系统上的可重用资源，赋予 Claude 特定领域专业知识：工作流程、上下文、最佳实践，使通用代理转变为专家。
#### 1.2 与提示的区别
- 提示是对话级、一次性任务指令；Skills 按需加载，无需在不同对话中重复相同指导。
#### 1.3 主要优势
- Claude 专精：针对特定领域任务定制功能。
- 减少重复：一次创建，自动使用。
- 组合能力：结合多种技能完成复杂多步骤任务。
#### 1.4 预置与自定义
- Anthropic 提供预置文档技能（PowerPoint、Excel、Word、PDF），也可创建自定义技能；两者工作方式相同：一旦在环境中可用，Claude 会在相关时自动使用。
  - 预置可用面：claude.ai、Claude API、AWS 上的 Claude Platform、Microsoft Foundry；在 Microsoft Foundry 上，Agent Skills 需部署在 Anthropic。
  - 自定义可打包领域专业知识和组织经验；可在 Claude Code 创建、通过 Claude API 上传，或在 claude.ai 设置中添加；AWS/Microsoft Foundry 通过 Skills API 上传。

### 二、工作原理：虚拟机 + 渐进式披露
#### 2.1 文件系统与虚拟机
- Skills 利用 Claude 的虚拟机环境，提供仅凭提示无法实现的功能；Claude 在具有文件系统访问权限的 VM 中运行，Skills 以目录形式存在，包含指令、可执行代码和参考资料，类似为新团队成员创建的入职指南。
#### 2.2 三类内容与加载时机
- YAML frontmatter：提供发现信息；启动时加载进系统提示。Claude 根据 `description` 判断是否触发技能，因此它必须说明技能功能和使用时机。
  - 轻量：技能触发前，只有名称和描述占用上下文，可安装多个技能而不造成上下文开销。
- SKILL.md 主体：包含程序性知识——工作流程、最佳实践、指南；当请求与技能描述相符时，Claude 用 bash 从文件系统读取，此时内容才进入上下文。
- 捆绑材料：附加 Markdown（如 FORMS.md、REFERENCE.md）、代码（如 fill_form.py、validate.py）、资源（数据库 schema、API 文档、模板、示例）；仅在引用时访问。
  - 文件系统模型下各有强项：instructions 用于灵活指导，code 用于可靠性，resources 用于事实查找。
#### 2.3 三级加载与 token 成本
- Level 1 Metadata：始终在启动时加载；约 100 tokens/技能；内容为 YAML frontmatter 的 name 和 description。
- Level 2 Instructions：技能触发时加载；低于 5k tokens；内容为 SKILL.md 主体。
- Level 3+ Resources：按需加载；访问前无成本；引用文件读入上下文；脚本通过 bash 运行，只有输出进入上下文。
- 渐进式披露保证任一时刻只有相关内容占用上下文窗口。
#### 2.4 访问机制与收益
- 触发后，Claude 用 bash 读 SKILL.md；若指令引用其他文件，再用 bash 读取；若提到可执行脚本，通过 bash 运行，只接收输出，脚本代码本身从不进入上下文。
  - 按需文件访问：只读任务所需文件；技能可含数十个参考文件，但若只需 sales schema，就只加载该文件，其余零 token。
  - 高效脚本执行：运行 validate_form.py 时代码不进入上下文，只有输出（如 "Validation passed" 或具体错误）消耗 token；比让 Claude 临时生成等效代码更高效。
  - 捆绑内容无实际限制：未访问不消耗上下文，可包含全面 API 文档、大数据集、大量示例；未使用无上下文惩罚。
#### 2.5 示例：自定义 pdf-processing
- 启动：系统提示包含描述 "pdf-processing - Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction."
- 用户请求："Extract the text from this PDF and summarize it"。
- Claude 调用：`bash: cat pdf-processing/SKILL.md` → 指令载入上下文。
- Claude 判断：不需要填表，因此不读取 FORMS.md。
- Claude 执行：用 SKILL.md 指令完成任务。

### 三、在 Claude API 与各产品面使用
#### 3.1 API 使用方式
- Claude API 支持预置和自定义 Skills，两者工作方式相同：在 `container` 参数指定相关 `skill_id`，并配合 code execution tool。
  - 前置条件：通过 API 使用 Skills 需要 code execution tool，Skills 在其容器中运行。
  - 预置：引用 `skill_id`（`pptx`、`xlsx`、`docx`、`pdf`）。
  - 自定义：通过 Skills API（`/v1/skills` endpoints）创建和上传；自定义 Skills 工作区范围共享，所有工作区成员可访问。
  - API 上的 Skills 运行在沙箱容器：无网络访问、无运行时包安装。
#### 3.2 其他产品面差异
- AWS 上的 Claude Platform 和 Microsoft Foundry 继承与 Claude API 相同的 Skills 行为。
- Claude Code：支持自定义 Skills；预置文档 Skills 不可用，但开源 Claude API skill 捆绑其中。
  - 自定义 Skills 以目录和 SKILL.md 存在，Claude 自动发现使用；文件系统型，无需 API 上传；放在 `~/.claude/skills/`（个人）或 `.claude/skills/`（项目）。
- claude.ai：支持预置和自定义。
  - 预置在创建文档时激活，无需设置。
  - 自定义通过 Settings > Features 以 zip 上传；需 Pro、Max、Team、Enterprise 计划且启用代码执行；自定义 Skills 个人独有，不组织级共享，管理员不能集中管理。

### 四、编写 Skill：文件格式与要求
- 每个 Skill 都需要 SKILL.md，含 YAML frontmatter：
  - 必需字段：`name` 和 `description`；正文可含 Instructions、Examples。
  - 示例结构：`--- name: your-skill-name description: Brief description... --- # Your Skill Name ## Instructions... ## Examples...`
- `name` 要求：最多 64 字符；只允许小写字母、数字和连字符；不能含 XML 标签；不能含保留词 "anthropic"、"claude"。
- `description` 要求：非空；最多 1024 字符；不能含 XML 标签。
- `description` 必须同时说明技能做什么和 Claude 何时使用它。完整编写指南见 Skill authoring best practices。

### 五、安全与治理
#### 5.1 来源原则
- 只使用可信来源的 Skills：自己创建或从 Anthropic 获得。
  - 原因：Skills 通过指令和代码给 Claude 新能力；恶意 Skill 可诱导 Claude 以不符合声明目的的方式调用工具或执行代码。
  - 若必须使用不可信或未知来源：极度谨慎，使用前彻底审计；视 Claude 执行时的访问权限，恶意 Skills 可能导致数据外泄、未授权系统访问等安全风险。
#### 5.2 关键安全考量
- 彻底审计：检查 Skill 内所有文件——SKILL.md、脚本、图片、资源；寻找异常模式，如意外网络调用、文件访问模式、不符合声明目的的操作。
- 外部来源风险：从外部 URL 取数据的 Skills 尤其危险，抓取内容可能含恶意指令；即使可信 Skills 也可能因外部依赖变化而被污染。
- 工具滥用：恶意 Skills 可以有害方式调用工具（文件操作、bash 命令、代码执行）。
- 数据暴露：能访问敏感数据的 Skills 可能被设计成向外部系统泄露信息。
- 像安装软件一样对待：集成到可访问敏感数据或关键操作的生产系统时尤其小心。
#### 5.3 企业治理与扫描
- 组织规模治理、审查、部署见 Skills for enterprise。
- Claude Enterprise 可开启 Skill content scanning，扫描 claude.ai 和 Claude Cowork 中上传的自定义 Skills；不覆盖通过 Skills API 或 Claude Console 上传的 Skills。

### 六、可用技能与数据留存
#### 6.1 可用预置技能
- PowerPoint（`pptx`）：创建演示文稿、编辑幻灯片、分析演示内容。
- Excel（`xlsx`）：创建电子表格、分析数据、生成带图报表。
- Word（`docx`）：创建文档、编辑内容、格式化文本。
- PDF（`pdf`）：生成格式化 PDF 文档和报告。
- 可用面：Claude API、Claude Platform on AWS、Microsoft Foundry、claude.ai；有 quickstart tutorial。
- 开源 Skills（skills repository）：
  - Claude API skill：提供最新 API 参考、SDK 文档和八种编程语言最佳实践；捆绑于 Claude Code，也可从 skills repository 安装。
  - 自定义完整示例见 Skills cookbook。
#### 6.2 数据留存
- Agent Skills 不在 ZDR 安排覆盖范围内；Skill 定义和执行数据按 Anthropic 标准数据留存政策保留。
- ZDR eligibility 见 API and data retention；Skills API 操作审计日志见 Audit logging in Using Agent Skills with the API。

## 作者边界、反例与不确定性
- 明确边界：自定义 Skills 不跨 surface 同步；共享模型按产品面不同；API 沙箱无网络、无运行时包安装；claude.ai 自定义 Skills 仅个人、不能集中管理或组织分发；扫描不覆盖 Skills API/Claude Console 上传；Agent Skills 不在 ZDR 覆盖范围；Microsoft Foundry 预置技能需部署在 Anthropic。
- 反例与风险：恶意 Skill、外部 URL 内容、外部依赖变化、工具滥用、数据暴露都可能改变 Skills 的安全适用范围；作者要求只从可信来源使用，并像安装软件一样对待。
- 未展开或需转指：API 端到端调用细节、预装包清单、扫描范围外治理、企业部署细节，原文均指向其他文档，未在本页完整给出。
