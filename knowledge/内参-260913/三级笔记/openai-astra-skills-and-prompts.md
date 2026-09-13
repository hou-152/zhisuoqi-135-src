# 《Rethinking skills and prompts for GPT-6 Astra | OpenAI Developers》

## 一句话主旨
Astra 更强，旧技能与提示应精简、按需、重设边界。

## 作者试图回答的问题
GPT-6 Astra 能力提升后，过去为 Codex 等智能体积累的技能、`AGENTS.md`、任务提示和边界，哪些需要重新审视或删除？应如何写，才能让模型选对技能、按需读文件、正确停止或继续？

## 三级论证骨架

### 一、总论：模型增强，旧脚手架需重估
- 智能体编码最佳实践快速变化；过去需要大量人工指导和框架的工作，现在不再需要。
  - 对用 Codex 的项目：一年积累的指令应随新版本重审；GPT-6 Astra 尤其重要。
  - 指令形式包括技能、`AGENTS.md`、任务提示等。

### 二、更好的技能：短描述、渐进披露、避免过度具体
#### 2.1 技能过多/描述过长会破坏选择
- 人们习惯在项目中打包大量技能，名称和描述加载到上下文，供模型判断何时使用。
  - 技能太多时，Codex 会缩短描述以适应上下文；模型看到的每个描述信息减少，更难确定选哪个技能。
  - 描述还会互相矛盾，或过分强调“何时使用”，使模型加载实际上无帮助的指令。
  - 常见创建流程用 `$skill-creator`；其指导近期已更新，以缓解实践中这些失败模式。
#### 2.2 描述应尽可能短，同时清楚说明适用时机
- 坏例：`Create and validate Postgres schema migrations. Use when working with databases, queries, models, or persistence.`
- 好例：`Create and validate Postgres schema migrations. Use when adding or changing a migration, or reviewing its rollout.`
  - 坏描述会推动模型一碰数据库相关就用它，而不是只在处理迁移时用。
#### 2.3 有用技能的关键标志：progressive disclosure
- 读技能占上下文，接近 compaction，并引入可能不适用于当前任务的指导。
  - 多工作流技能应把根文档做成 minimal router，指向 supporting docs 和 scripts；给足“去哪里找”的指引，但不强迫读当下无关内容。
#### 2.4 少写“路线图/配方”，并考虑其他模型使用者
- 许多技能写成 elaborate itineraries 或 recipes；模型已更擅长理解细微和模糊，过度具体指导以前有帮助，现在可能阻碍结果。
  - 仓库技能也会指导其他贡献者的 agent，它们可能使用不同模型；帮助 Sol 或 Luna 的指导可能 overconstrain GPT-6 Astra，要考虑谁会使用留下的说明。

### 三、及时更新 `AGENTS.md`：按需读、别重复要求测试、给安全流程授权
#### 3.1 每条指令都要问是否仍需要
- `AGENTS.md` 在模型于仓库工作时生效，应频繁重访每条指令。
  - 为修一个 typo 就要求读一堆文档或完整 repo map 是过度的；Astra 能自己判断需要读什么，不必每次改动前 review 全项目。
#### 3.2 文档引用应情境化
- 坏例：`Before every edit, read architecture.md, database.md, and deployment.md.`
- 好例：`Use architecture.md for service boundaries, database.md for schema changes, and deployment.md when preparing a deployment.`
  - 每次编辑前提示读文件会 burn context、拖慢工作；情境化地指向文档仍有帮助，但文档要保持更新。
#### 3.3 旧模型需要鼓励测试，Astra 会自己做
- 以前需要鼓励模型运行测试、检查工作；GPT-6 Astra 会自行做，因此同样指令可能导致不必要的测试。
#### 3.4 Astra 彻底但可能过早停，可用 `AGENTS.md` 给安全流程许可
- Astra 很彻底，但对任务推进到多远更犹豫，有时需要一点推动继续。
  - 可给已知安全的具体工作流授权。原文示例：“本地测试使用一次性测试用例，不涉及生产环境。运行测试，修复由请求的更改引起的故障，然后重新运行受影响的测试，无需每一步都请求批准。”

### 四、决策边界：以对待安全模型的方式对待 Astra
- 必须仔细定义边界。过去模型未经许可擅自行动时，可能用强硬措辞要求事先征求同意。
  - 这有用，但 Astra 作为“最契合的模型”，判断力强得多，只在确信安全时执行任务；因此应以对待安全模型的方式对待它。
  - 若旧边界是为防止其他模型走得太远，切换到 Astra 时应更新措辞：Astra 可能过于认真，甚至在你希望它继续工作时停下来。

### 五、持久性：先定义完成标准，并明确继续/停止条件
- 习惯 GPT-5.6 Sol 接受请求后长时间运行的人，会觉得 Astra 在何时停止上更犹豫。
  - Astra 可能完成初步实现后、仍有工作要做时就返回审核。
- 开始前定义完成标准有帮助；可能需要督促 Astra 继续直到完全完成。
  - 若任务包括运行实现、检查结果、修复失败，要写进请求；若第一次实现后就要求停止审查，模型会提前停止，需检查这是否真是需要的决定。
  - 若希望第一次探索后继续探索，要说明探索什么、在哪里停止。

### 六、收尾：借新模型清理，并让 Astra 按本文审计
- 新模型是清理内部的好机会，但不必手动检查所有内容。
  - 让 GPT-6 Astra 根据本文讨论内容审核，然后去构建以前没尝试过的东西。

## 作者边界、反例与不确定性
- 明确边界集中在模型差异与任务条件：仓库技能可能被不同模型的 agent 使用；帮助 Sol/Luna 的指导可能 overconstrain GPT-6 Astra；旧边界措辞可能让 Astra 过早停止；若确实想首次实现后停下审查，需自行确认。
- 原文没有给出量化数据或系统性反例，也未明确列出未解决矛盾；主张主要来自实践经验、坏/好示例和模型行为描述。
