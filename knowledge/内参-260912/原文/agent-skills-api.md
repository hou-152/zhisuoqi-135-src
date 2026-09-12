# Using Agent Skills with the API（用 API 使用 Agent Skills）

- 来源：platform.claude.com
- 原文：https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
- 作者：Claude Platform Docs
- 摘要：Claude uses Skills, which are sets of instructions stored as files, to perform tasks by reading only the needed files on demand. Skills can be pre-built or custom, shared differently across Claude’s platforms, and require careful management for security. Users can create, upload, and use Skills via the API, claude.ai, or Claude Code, each with its own rules and capabilities.
- 抓取：Reader 快照（2026-09-12）
- 字数：12223

---

代理技能是扩展 Claude 功能的模块化功能。每个技能都包含指令、元数据和可选资源（脚本、模板），Claude 会在需要时自动使用这些资源。
技能是基于文件系统的可重用资源，赋予 Claude 特定领域的专业知识：工作流程、上下文和最佳实践，使通用代理转变为专家。与提示（针对一次性任务的对话级指令）不同，技能按需加载，因此您无需在不同的对话中重复相同的指导。
主要优势：
 
克劳德专精：针对特定领域任务定制功能 
减少重复：一次创建，自动使用 
组合能力：结合多种技能完成复杂的多步骤任务 
Anthropic 提供预置的代理技能，用于处理常见的文档任务（PowerPoint、Excel、Word、PDF），您也可以创建自定义技能。两者的工作方式相同：一旦技能在您的环境中可用，Claude 就会在与您的请求相关时自动使用它。
预构建的代理技能可在 claude.ai、Claude API、AWS 上的 Claude 平台和Microsoft Foundry上使用。在 Microsoft Foundry 上，代理技能需要部署在 Anthropic 上。请参阅“可用技能”以获取完整列表。
自定义技能可让您将领域专业知识和组织经验打包在一起。它们适用于 Claude 的所有产品：您可以在 Claude Code 中创建自定义技能，通过 Claude API 上传，或在 claude.ai 设置中添加。在AWS 上的 Claude Platform和Microsoft Foundry上，您可以通过技能 API 上传自定义技能。

Skills 利用 Claude 的虚拟机环境，提供仅凭提示无法实现的功能。Claude 在具有文件系统访问权限的虚拟机中运行，使得 Skills 可以以目录的形式存在，其中包含指令、可执行代码和参考资料，其组织方式类似于您为新团队成员创建的入职指南。
这种基于文件系统的架构实现了渐进式披露： Claude 根据需要分阶段加载信息，而不是预先获取上下文。
技能可以包含三种类型的内容，每种内容的加载时间都不同：
该技能的 YAML 前置元数据提供发现信息：
Claude 会在启动时加载此元数据并将其包含在系统提示符中。Claudedescription会根据此元数据来判断是否触发技能，因此它必须同时说明技能的功能和使用时机。这种轻量级方法意味着您可以安装多个技能而不会造成上下文开销：在技能被触发之前，只有技能名称和描述会占用上下文。
SKILL.md 的主体部分包含程序性知识：工作流程、最佳实践和指南：
# PDF Processing
## Quick start
Use pdfplumber to extract text from PDFs:
```python
import pdfplumber
with pdfplumber.open("document.pdf") as pdf:
 text = pdf.pages[0].extract_text()
```
For advanced form filling, see [FORMS.md](FORMS.md).
当您请求的内容与技能描述相符时，Claude 会使用 bash 从文件系统中读取 SKILL.md 文件。只有这样，该文件的内容才会显示在上下文窗口中。
技能可以捆绑其他材料：
 
pdf-processing/ 
SKILL.md（主要说明） 
FORMS.md（表格填写指南） 
REFERENCE.md（详细 API 参考） 
scripts/ 
fill_form.py（实用脚本） 
说明：包含专门指导和工作流程的附加 Markdown 文件（FORMS.md、REFERENCE.md）
代码： Claude 使用 bash 运行的可执行脚本（fill_form.py、validate.py），无需将代码加载到上下文中即可提供确定性操作。
Resources: Reference materials such as database schemas, API documentation, templates, or examples
Claude accesses these files only when referenced. The filesystem model means each content type has different strengths: instructions for flexible guidance, code for reliability, resources for factual lookup.
LevelWhen loadedToken costContent
Level 1: MetadataAlways (at startup)~100 tokens per Skillname and description from YAML frontmatter
Level 2: InstructionsWhen Skill is triggeredUnder 5k tokensSKILL.md body with instructions and guidance
Level 3+: ResourcesAs neededNone until accessedBundled files. Reference files load into context when read. Scripts run through bash, and only their output enters context
Progressive disclosure ensures only relevant content occupies the context window at any given time.
Skills run in a code execution environment where Claude has filesystem access, bash commands, and code execution capabilities. Skills exist as directories on a virtual machine, and Claude interacts with them using the same bash commands you'd use to navigate files on your computer.
How Claude accesses Skill content:
When a Skill is triggered, Claude uses bash to read SKILL.md from the filesystem, bringing its instructions into the context window. If those instructions reference other files (such as FORMS.md or a database schema), Claude reads those files too using additional bash commands. When instructions mention executable scripts, Claude runs them through bash and receives only the output (the script code itself never enters context).
What this architecture enables:
 
On-demand file access: Claude reads only the files each task needs. A Skill can include dozens of reference files, but if your task only needs the sales schema, that's the one file Claude loads. The rest stay on the filesystem and cost zero tokens. 
Efficient script execution: When Claude runs validate_form.py, the script's code never loads into the context window. Only its output (such as "Validation passed" or a specific error message) consumes tokens, which makes scripts far more efficient than having Claude generate equivalent code on the fly. 
No practical limit on bundled content: Files don't consume context until accessed, so Skills can include comprehensive API documentation, large datasets, or extensive examples. There's no context penalty for bundled content that isn't used. 
Here's how Claude loads and uses the custom pdf-processing Skill from the earlier examples (not the pre-built pdf Skill):
 
Startup: System prompt includes: pdf-processing - Extract text and tables from PDF files, fill forms, merge documents. Use when working with PDF files or when the user mentions PDFs, forms, or document extraction. 
User request: "Extract the text from this PDF and summarize it" 
Claude invokes: bash: cat pdf-processing/SKILL.md → Instructions loaded into context 
Claude determines: Form filling is not needed, so FORMS.md is not read 
Claude executes: Uses instructions from SKILL.md to complete the task 
Skills are available across Claude's agent products:

Claude Platform on AWS and Microsoft Foundry inherit the same Skills behavior as the Claude API in all following sections.
The Claude API supports both pre-built Agent Skills and custom Skills. Both work identically: specify the relevant skill_id in the container parameter along with the code execution tool.
Prerequisites: Using Skills through the API requires the code execution tool, whose container Skills run in.
Use pre-built Agent Skills by referencing their skill_id (pptx, xlsx, docx, or pdf), or create and upload your own through the Skills API (/v1/skills endpoints). Custom Skills are shared workspace-wide: all workspace members can access them.
Skills on the API run in a sandboxed container with no network access and no runtime package installation. See Limitations and constraints for details.
To learn more, see Using Agent Skills with the API.
Claude Code supports custom Skills. The pre-built document Skills (PowerPoint, Excel, Word, PDF) are not available in Claude Code, though the open-source Claude API skill comes bundled with it. See the full list of built-in commands and Skills that ship with Claude Code.
Custom Skills: Create Skills as directories with SKILL.md files. Claude discovers and uses them automatically.
Custom Skills in Claude Code are filesystem-based and don't require API uploads: place them in ~/.claude/skills/ (personal) or .claude/skills/ (project).
To learn more, see Use Skills in Claude Code.
claude.ai supports both pre-built Agent Skills and custom Skills.
Pre-built Agent Skills: These Skills are active when you create documents. Claude uses them with no setup required.
Custom Skills: Upload your own Skills as zip files through Settings > Features. Available on Pro, Max, Team, and Enterprise plans with code execution enabled. Custom Skills are individual to each user. They are not shared organization-wide and cannot be centrally managed by admins.
To learn more about using Skills in claude.ai, see the following resources in the Claude Help Center:
Every Skill requires a SKILL.md file with YAML frontmatter:
---
name: your-skill-name
description: Brief description of what this Skill does and when to use it
---
# Your Skill Name
## Instructions
[Clear, step-by-step guidance for Claude to follow]
## Examples
[Concrete examples of using this Skill]
Required fields: name and description
Field requirements:
name:
 
Maximum 64 characters 
Must contain only lowercase letters, numbers, and hyphens 
Cannot contain XML tags 
Cannot contain reserved words: "anthropic", "claude" 
description:
 
Must be non-empty 
Maximum 1024 characters 
Cannot contain XML tags 
The description must include both what the Skill does and when Claude should use it. For complete authoring guidance, see Skill authoring best practices.
Use Skills only from trusted sources: those you created yourself or obtained from Anthropic. Skills give Claude new capabilities through instructions and code, which also means a malicious Skill can direct Claude to invoke tools or execute code in ways that don't match the Skill's stated purpose.

If you must use a Skill from an untrusted or unknown source, exercise extreme caution and thoroughly audit it before use. Depending on what access Claude has when executing the Skill, malicious Skills could lead to data exfiltration, unauthorized system access, or other security risks.
Key security considerations:
 
Audit thoroughly: Review all files bundled in the Skill: SKILL.md, scripts, images, and other resources. Look for unusual patterns such as unexpected network calls, file access patterns, or operations that don't match the Skill's stated purpose 
External sources are risky: Skills that fetch data from external URLs pose particular risk, as fetched content may contain malicious instructions. Even trustworthy Skills can be compromised if their external dependencies change over time 
Tool misuse: Malicious Skills can invoke tools (file operations, bash commands, code execution) in harmful ways 
Data exposure: Skills with access to sensitive data could be designed to leak information to external systems 
Treat like installing software: Be especially careful when integrating Skills into production systems with access to sensitive data or critical operations 
For organization-scale governance, vetting, and deployment guidance, see Skills for enterprise. Claude Enterprise organizations can also turn on Skill content scanning for custom Skills uploaded in claude.ai and Claude Cowork. Scanning doesn't cover Skills uploaded through the Skills API or the Claude Console.
Available Skills
The following pre-built Agent Skills are available for immediate use:
 
PowerPoint (pptx): Create presentations, edit slides, analyze presentation content 
Excel (xlsx): Create spreadsheets, analyze data, generate reports with charts 
Word (docx): Create documents, edit content, format text 
PDF (pdf): Generate formatted PDF documents and reports 
These Skills are available on the Claude API, Claude Platform on AWS, Microsoft Foundry, and claude.ai. See the quickstart tutorial to start using them in the API.
Anthropic also publishes open-source Skills in the skills repository:
 
Claude API skill: Provides Claude with up-to-date API reference material, SDK documentation, and best practices for eight programming languages. Bundled with Claude Code and also available for installation from the skills repository. 
For complete examples of custom Skills, see the Skills cookbook.
Agent Skills is not covered by ZDR arrangements. Skill definitions and execution data are retained according to Anthropic's standard data retention policy.
For ZDR eligibility across all features, see API and data retention.
For audit logging of Skills API operations, see Audit logging in Using Agent Skills with the API.
Limitations and constraints
Claude Platform on AWS and Microsoft Foundry follow the same limitations as the Claude API in the following subsections.
Custom Skills do not sync across surfaces. Skills uploaded to one surface are not automatically available on others:
 
Skills uploaded to claude.ai must be separately uploaded to the API 
Skills uploaded through the API are not available on claude.ai 
Claude Code Skills are filesystem-based and separate from both claude.ai and API 
Manage and upload Skills separately for each surface where you want to use them.
Skills have different sharing models depending on where you use them:
 
claude.ai: Individual user only. Each team member must upload separately. 
Claude API: Workspace-wide. All workspace members can access uploaded Skills. 
Claude Code: Personal (~/.claude/skills/) or project-based (.claude/skills/). Can also be shared through Claude Code Plugins. 
claude.ai does not support centralized admin management or org-wide distribution of custom Skills.
The exact runtime environment available to your Skill depends on the product surface where you use it.
 
claude.ai: 
Varying network access: Depending on user/admin settings, Skills may have full, partial, or no network access. For more details, see the Create and Edit Files support article. 
Claude API: 
No network access: Skills cannot make external API calls or access the internet. 
No runtime package installation: Only pre-installed packages are available. You cannot install new packages during execution. 
仅预配置依赖项：请查看代码执行工具文档以获取可用软件包列表。 
克劳德代码： 
完全网络访问权限： Skills 与用户计算机上的任何其他程序具有相同的网络访问权限。 
不建议进行全局软件包安装： Skills 应该只在本地安装软件包，以避免干扰用户的计算机。 
规划你的技能，使其能够在这些限制条件下发挥作用。
