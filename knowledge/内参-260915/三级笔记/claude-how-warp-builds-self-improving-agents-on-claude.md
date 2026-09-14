# https://claude.com/blog/how-warp-builds-self-improving-agents-on-claude

## 一句话主旨
Warp 通过“内层基础技能+外层改进者技能+人类合并把关”的双技能架构，把日常会话中流失的反馈沉淀为自进化的文件级技能。

## 作者试图回答的问题
如何解决代码审查和任务分流等重复性场景中 Agent 输出质量不稳定、人工调提示词无法扩展，以及用户反馈在会话结束后即丢失的问题？

## 三级论证骨架

### 一、问题背景：反馈流失与权宜之计的极限
#### 1.1 首发提示词的噪音与工程反馈流失
- 如果第一次提示词只有 80% 的准确率，会对开发者造成极度嘈杂和烦躁的体验。
- 团队最初通过手动重写提示词或修补 AGENTS.md 上下文文件，虽然改善了单点表现，但无法规模化。
- 核心症结：无论用户的纠错反馈多么深刻，通常会在会话结束后消失，导致自我改进循环缺乏关键上下文。

### 二、双技能自改进架构机制
#### 2.1 内层基础技能（Inner/Base Skill）
- 编码领域知识与执行规范，针对单次触发（如 PR 打开或 Issue 提交）执行代码审查或分类任务。
- 不将所有规则硬编码在 Prompt 中，而是作为文件化技能供 Agent 动态查阅。
  - 原话：““File-based skills are a way of encoding knowledge for agents without putting that knowledge directly in the prompt, as something the agent can simply look up in the course of doing its job,” says Zach.”
#### 2.2 外层改进者技能（Outer/Improver Skill）
- 扮演观察者 Agent 角色，按定时计划（而非每个任务）运行。
  - 原话：“The outer/improver skill functions as an observer agent that runs on a schedule rather than per-task. It pulls the accumulated human feedback, compares what the agent suggested against how humans responded, and proposes a small, focused edit to the base skill.”
#### 2.3 基于 Git PR 的闭环控制
- 技能本质是纯文本文件，极易被模型修改。外层 Agent 提出修改并开启 GitHub PR，团队评审合并后即在下一次运行时生效。
  - 原话：“Because skills are plain files, agents are extremely good at updating them. These updates, which are reviewable, approvable, and mergeable, can flow through a normal PR/code-review workflow; once merged, the next run of the inner skill inherits the improvement.”

### 三、实战经验与设计原则
#### 3.1 编写自改进技能的黄金法则
- 写原则而非穷举规则：像指导聪明人一样组织技能。
  - 原话：“Write principles, not rules. "Construct the skill as though you're instructing a smart person, not like you're programming a computer,” Zach says. “Including direction in the skill like ’Look for repeated code’ provides better direction than exhaustive variable naming rules.””
- 解释背后的原因（Why），赋予模型泛化推理空间。
- 降低反馈摩擦，直接在员工已有工作界面（PR 评论区）捕获信号。
- 技能保持精简，利用渐进式披露（Progressive Disclosure）引用子脚本和资源文件。
#### 3.2 概念边界：技能（Skills）与记忆（Memory）的区别
- 技能是程序性的、稳定的“如何做某事”，独立于单次运行，需深思熟虑地变更；而记忆是在推理时由模型自动写入、持续快速变动的。
  - 原话：“Skills are procedural and stable—"how to do X," run-agnostic, changed deliberately. Memory is auto-written by the agent at inference time and never stops changing.”

## 作者边界、反例与不确定性
作者明确强调，不能假设所有人类反馈都是正确的：Agent 不能盲目采纳反馈，必须具备语境核验机制，严格筛选高权重专家的输入，并在最终合并环节保持人类严格把关；对于无法形式化验证的领域，必须依赖确定性 Golden Eval 或资深专家审查。
