# 用 Skills 在 Claude Code 里搭建验证闭环

## 一句话主旨
把重复检查写成 skill，并逐级接入自动验证闭环。

## 作者试图回答的问题
如何把手动检查沉淀为 Claude Code 可自动执行的验证闭环？具体包括：怎样创建验证 skill；检查该以 standalone、embedded、chained、on every PR 哪种方式接入；怎样从个人检查升级为团队基础设施。

## 三级论证骨架
### 一、把验证步骤写成 skill：验证闭环的基本落点
#### 1.1 核心判断：重复检查应编码为 skill，让 Claude 自验证
- 开篇列举的典型场景：改完前端跑端到端验证、提交前安全扫描、发 PR 前无障碍审计。
  - 这些检查不该一直靠人记着做；最经济做法是写成 skill，让 Claude 执行「验证闭环」（verification loop）。
- 「验证闭环」指把产出后总要做的检查固化成可自动执行的一环，让 Claude 自己验证产物，而不是人每次手动补一回合。

#### 1.2 两条创建路径：skill-creator 访谈 / 手写 SKILL.md
- 最快方式：装 skill-creator 插件，让 Claude 反过来访谈工作流。
  - 示例调用：`/skill-creator Create a skill for verifying frontend changes end-to-end. Interview me about my workflow.`
- 也可手写：在项目 `.claude/skills/` 下丢一个 markdown 文件。
  - 最简单的验证 skill＝几行 frontmatter＋一段 body。
  - 例子 `verify-log-hygiene`，写在 `.claude/skills/verify-log-hygiene/SKILL.md`。
    - frontmatter：`name`；`description`（"Check that error logs include the request ID and never include the request body. Use when the diff touches error handling or logging."）；`allowed-tools: [Read, Edit, Grep]`。
    - body 用大白话写三件事：读当前 diff 的错误处理路径；确认每个 log 调用带 request ID，且不传 request body / headers / 任何用户提交的 payload；用 `file:line` 报告违规并修复——补缺失的 request ID、从 log 调用里剥掉 payload。
- `description` 里的 `Use when...` 决定 skill 何时被自动拉进来，是 embedded 模式能否生效的关键开关。

### 二、让检查匹配运行位置：由松到紧的四级升级阶梯
#### 2.1 总判断：四种接入方式不是并列选项，而是同一条升级路径
- standalone → embedded → chained → on every PR，由手动到自动、由松到紧。
- 驱动力是「你多频繁需要这个检查」。

#### 2.2 Standalone：产物存在后刻意手动调用
- 适合「不必每次都做」的横切检查：提交前安全扫描、发 PR 前无障碍审计、整个 repo 的 license-header 校验。
  - 这些检查希望在多个工作流里都能用，但不想每次代码改动都触发。
- 代价：每一次调用都仍是一个你得记着去做的回合（turn）。
- 升级信号：开始在每次改动后都跑它；到那时就该嵌入或链接。

#### 2.3 Embedded：作为产出 skill 的一部分自动触发
- 检查归属于某个特定工作流，工作流不用你开口就会跑它。
- 最简单的版本是在产出 skill 的 body 末尾加一行。
  - 例子 `scaffold-component`：在 `src/components/` 下脚手架一个 React 组件，含组件文件 `.tsx`、同目录测试 `.test.tsx`、`index.ts` 导出；末尾追加：创建组件文件后跑 eslint，并在报告完成前处理掉所有 error。
- 如何确认生效：在一个全新任务上调用该 skill，确认新步骤真的作为输出的一部分跑了。
  - 如果没跑，说明 skill 的 `description` 或前面的指令没有把这段追加检查「拉」进来。
- 硬边界：embedded 只对你能改的 skill 生效——自己写的，或项目级安装、`SKILL.md` 在你掌控下的。
  - 内置 skill 和插件托管的 skill（更新时会被覆盖）不适用，改用链式。
  - 跨工作流的检查不要嵌入，应保持 standalone。

#### 2.4 Chained：一个 skill 在自己结尾调用另一个
- 若干个「经过验证的交接」端到端跑下来。
- Anthropic 的 Claude Code 团队日常使用该模式：`/code-review` 抓 bug → `/simplify` 清理 diff → `/verify` 确认端到端行为；如果改动碰了 UI，自定义 `/design` 会对照 `DESIGN.md` 做检查。
- 也可给「你改不了的 skill」加验证：自定义包装（wrapper）skill，先调用原 skill，再调用验证 skill。
  - 例子 `safe-refactor`：先对当前 diff 跑 `/simplify`；`/simplify` 结束后，调用 `/verify-no-public-api-changes`。
- 从习惯到契约：原本靠自觉维持的"我总在 `/simplify` 之后跑 `/verify`"，变成由系统保证的"/simplify 结束时总会跑 `/verify`"。
  - 链条自己跑完整个开发循环，只有当有东西升级回你这里时，你才介入。
- 何时不链：当各步骤足够独立、你有时想只跑其中一个而不跑别的时——链式是拿灵活性换自动化。
  - 链式验证闭环会增加 token 开销，最好在大范围部署前先测试。

#### 2.5 On every PR：放到每个 PR 上，成为团队基础设施
- 一旦链条对自己的改动足够稳，同一套流程就能放到每个 PR 上跑。
  - 队友的改动会过和你一样的门禁，不管他有没有记得调用那条链。
- 基础设施和已写好的链是同一种东西：同样的 skills、同样的 rubrics、同样的标准，只是不再依赖作者本人的自觉。
- 这是验证「从个人基础设施变成团队基础设施」的点：你为省自己一周两分钟而写下的检查，现在在每一次改动上、为每个人省两分钟。
- 时机提醒：链条还在频繁变动时，先别上 PR 级门禁——每一次调整都会变成一个全团队可见的事件。

### 三、循环工程：一套与场景无关的一致流程
#### 3.1 统摄判断：无论自动化什么、在什么环境，验证闭环创建流程一致
- 六步：
  1. 挑出你这周做得最频繁的那个手动收尾动作。
  2. 先试内置 `/verify` skill，看它对流程有没有帮助。
  3. 用大白话把流程写下来，就像第一天把它交给一个新队友。
  4. 交给 skill-creator，或自己把 markdown 文件丢进 `.claude/skills/`。
  5. 在一个新任务上调用它，确认检查作为输出的一部分跑了，需要就迭代。
  6. 试验 skill 的链式化，做出一条端到端的验证流。

#### 3.2 收尾判断：编码越多，Claude 越容易第一次落在想要的地方
- 你能为 Claude 编码下来的越多，Claude 的回应就越经常在第一次就落在你想要的地方附近。
- 那些不再需要来回折腾的修正，会把注意力释放出来，去做那些没有任何 skill 能替你写下来的、只属于你个人的工作。

## 作者边界、反例与不确定性
- embedded 不适用于内置 skill 和插件托管 skill；跨工作流的检查应留在 standalone。
- 链式不适用时：各步骤足够独立、有时只想跑其中一个；链式增加 token 开销，部署前先测试。
- PR 级门禁的时机边界：链条仍频繁变动时先别上。
- 材料元数据存在不一致：页眉写作者为 Claude，正文核心观点写由 Claude Code 团队成员 Delba de Oliveira 撰写；原文未在正文澄清。
