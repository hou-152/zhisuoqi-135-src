# 用 Skills 在 Claude Code 里搭建验证闭环

- 标题：用 Skills 在 Claude Code 里搭建验证闭环
- 来源：claude.com
- 原文：https://claude.com/blog/building-verification-loops-in-claude-code-with-skills
- 作者：Delba de Oliveira
- 类型：主题特刊
- 摘要：Anthropic 讲解如何把手动检查沉淀为 skill，让 Claude Code 自动完成自我验证的反馈循环。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：9449
- 策展人按：从这里往下五篇，镜头伸进 agent 内部。先从最容易上手的一层开始：把你的手动检查沉淀成 skill。

---

- 原文标题：Building verification loops in Claude Code with skills
- 作者：Claude
- 内参日期：2026-07-24
- 来源类型：blog
- 原文：https://claude.com/blog/building-verification-loops-in-claude-code-with-skills
- 标签：Anthropic

Anthropic 讲解如何把手动检查沉淀为 skill，让 Claude Code 自动完成自我验证的反馈循环。

## 导读

claude code 用法，来自 anthropic 官方

## 核心观点

- 每次做完一件事总要跟着做的那个检查——改完前端要跑的端到端验证、提交前的安全扫描、发 PR 前的无障碍审计——不该一直靠人记着做。最经济的做法是把它写成一个 skill，让 Claude 自己执行这个「验证闭环」（verification loop）。
- 写成 skill 只是第一步。真正的设计决策是「让检查匹配它运行的位置」：按你需要它触发的频率，从 standalone（独立调用）→ embedded（嵌入）→ chained（链式）→ on every PR（每个 PR 上）四种接入方式里选一种，这是一条由松到紧、由手动到自动的升级阶梯。
- 这条阶梯的终点，是验证从「个人基础设施」变成「团队基础设施」：你为省自己一周两分钟而写下的检查，最终会在每一次改动上、为团队里每个人省下两分钟。
- 全文由 Claude Code 团队成员 Delba de Oliviera 撰写，落点是一句方法论：你能为 Claude 编码下来的越多，它的回应就越经常在第一次就落在你想要的地方，而你被释放出来的注意力，可以投向那些没有任何 skill 能替你写下来的、专属于你的工作。

## 把验证步骤写成 skill

- 把重复步骤编码进验证闭环，最常见的方式就是写成一个 skill；而创建 skill 最快的方式，是装上 skill-creator 插件、让 Claude 反过来访谈你的工作流。
- 示例调用：/skill-creator Create a skill for verifying frontend changes end-to-end. Interview me about my workflow.
- 你也可以手写：在项目里的 .claude/skills/ 目录下丢一个 markdown 文件。
- 最简单的验证 skill＝几行 frontmatter＋一段 body。原文给的例子是 verify-log-hygiene（写在 .claude/skills/verify-log-hygiene/SKILL.md）：
- frontmatter 三件套：name；description（"Check that error logs include the request ID and never include the request body. Use when the diff touches error handling or logging."）；allowed-tools: [Read, Edit, Grep]。
- body 用大白话写清三件事：读当前 diff 里的错误处理路径；对每个错误路径上的 log 调用，确认它带了 request ID、且没有传 request body / headers / 任何用户提交的 payload；用 file:line 报告每一处违规，然后修复它（补上缺失的 request ID、从 log 调用里剥掉 payload）。
- description 里那句 "Use when..." 决定这个 skill 何时被自动拉进来，是后面 embedded 模式能否生效的关键开关。

## 让检查匹配它运行的位置

- 写完 skill 后，下一个要定的是验证闭环如何启动：standalone、embedded、chained，还是绑定到 PR。四者不是并列选项，而是同一条升级路径上的四级台阶，驱动力是「你多频繁需要这个检查」。

### 独立调用（Standalone）

- 你在产物已经存在之后，刻意地手动调用它。
- 它的价值在于那些「不必每次都做」的横切检查：提交前安全扫描、发 PR 前无障碍审计、整个 repo 的 license-header 校验。凡是你希望在很多工作流里都能用、但又不想在每次代码改动时都触发的检查，都属于这一类。
- 代价：每一次调用都仍是一个你得记着去做的回合（turn）。
- 「你已经超出 standalone」的信号，是你开始在每次改动后都跑它。到那时，这套流程就该有个永久的家——嵌入它，或链接它。

### 嵌入（Embedded）

- 作为「产出物的那个 skill」的一部分自动触发。检查从此归属于某个特定工作流，工作流现在不用你开口就会跑它。
- 最简单的版本，是在产出 skill 的 body 末尾加一行。原文例子 scaffold-component（在 src/components/ 下脚手架一个 React 组件，含组件文件 .tsx、同目录测试 .test.tsx、index.ts 导出）末尾追加：创建组件文件后，对它跑 eslint，并在报告完成之前处理掉所有 error。
- 如何确认嵌入生效：在一个全新任务上调用这个 skill，确认新步骤作为输出的一部分真的跑了。如果它没跑，说明 skill 的 description 或前面的指令没有把这段追加的检查「拉」进来。
- 硬边界：embedded 只对你能改的 skill 生效——你自己写的，或以项目级安装、SKILL.md 在你掌控下的那些。内置 skill 和插件托管的 skill（更新时会被覆盖）不适用这个模式；对那些，改用链式。
- 跨工作流的检查不要嵌入，那种应该保持 standalone，好让你在任何上下文里都能调用。

### 链式（Chained）

- 一个 skill 在自己结尾调用另一个，若干个「经过验证的交接」端到端跑下来。
- Anthropic 的 Claude Code 团队日常就用这个模式：/code-review 抓 bug，/simplify 清理 diff，一个 /verify skill 确认端到端行为，如果改动碰了 UI，一个自定义的 /design skill 会对照 DESIGN.md 里的规范做检查。
- 链式也是给「你改不了的 skill」加验证的办法：做一个自定义的包装（wrapper）skill，先调用原 skill，再调用你的验证 skill。原文例子 safe-refactor：先对当前 diff 跑 /simplify；/simplify 结束后，调用 /verify-no-public-api-changes。
- 从习惯到契约：原本是一个靠自觉维持的习惯（"我总在 /simplify 之后跑 /verify"），变成了由系统保证的契约（"/simplify 结束时总会跑 /verify"）。链条自己把整个开发循环跑完，只有当有东西升级回你这里时，你才介入。
- 何时不链：当各步骤足够独立、你有时想只跑其中一个而不跑别的时——链式是拿灵活性换自动化。而且链式验证闭环会增加 token 开销，所以最好在大范围部署之前，先测试这些闭环。

### 在每个 PR 上（On every PR）

- 一旦链条对你自己的改动足够稳，同一套流程就能放到每个 PR 上跑。队友的改动会过和你一样的门禁，不管他有没有记得调用那条链。
- 它的基础设施和你已经写好的链是同一种东西，只是更进一步：同样的 skills、同样的 rubrics、同样的标准，只是不再依赖作者本人的自觉。
- 这里就是验证「从个人基础设施变成团队基础设施」的那个点。你为省自己一周两分钟而写下的检查，现在在每一次改动上、为每个人省两分钟。
- 一个时机提醒：链条还在频繁变动时，先别上 PR 级门禁——因为每一次调整，都会变成一个全团队可见的事件。

## 循环工程：一套与场景无关的一致流程

- 流程走顺之后，你就可以扩展你的「循环工程」（loop engineering）。原文强调：无论你在自动化什么、在什么环境里，验证闭环的创建流程都是一致的六步：
- 挑出你这周做得最频繁的那个手动收尾动作。
- 先试内置的 /verify skill，看它对你的流程有没有帮助。
- 用大白话把流程写下来，就像第一天把它交给一个新队友那样。
- 交给 skill-creator，或者自己把 markdown 文件丢进 .claude/skills/。
- 在一个新任务上调用它，确认检查作为输出的一部分跑了，需要就迭代。
- 试验 skill 的链式化，做出一条端到端的验证流。
- 收尾判断：你能为 Claude 编码下来的越多，Claude 的回应就越经常在第一次就落在你想要的地方附近。那些你不再需要来回折腾的修正，会把你的注意力释放出来，去做那些没有任何 skill 能替你写下来的、只属于你个人的工作。

## 概念网络

### 关键概念

### 验证闭环（verification loop）

**context**：全文的核心对象。指把「产出某个东西之后总要做的那个检查」固化成可自动执行的一环，让 Claude 自己去验证自己的产物，而不是靠人每次记着做。文章开篇即以「把重复步骤编码进 verification loop 最常见的方式就是写成 skill」定义它，并以「验证闭环的创建流程是一致的」收尾。

**费曼一下**：就像工厂流水线末端的质检工位。以前每做完一件产品你都得亲自拿卡尺量一遍；验证闭环就是把这道质检工序标准化、装到流水线上，让它自动量、自动挑出次品，你只在它报警时才出面。

### 把重复步骤编码成 Skill

**context**：文章给出的、把验证闭环落地的基本手段。「把重复步骤编码进验证闭环，最常见的方式就是写成一个 skill。」skill 是承载这套可复用检查指令的单元，也是后面四种接入方式共同的底座。

**费曼一下**：把你脑子里「每次都要这么做」的那套动作，写成一张给助手看的工作卡片。写下来一次，以后助手照着卡片自己做，你不用每次都口头交代一遍。

### skill-creator 访谈式创建

**context**：创建 skill 最快的方式。装上 skill-creator 插件，让 Claude 反过来访谈你的工作流，例如 /skill-creator Create a skill for verifying frontend changes end-to-end. Interview me about my workflow.；在标准六步流程里，「交给 skill-creator」也被列为落地一步。

**费曼一下**：不用自己憋着写说明书，而是让一个懂行的编辑坐下来采访你「你平时这活儿到底怎么干」，他边问边帮你把流程整理成一份规范文档。

### SKILL.md：frontmatter＋body 契约

**context**：一个 skill 的最小结构。「最简单的验证 skill 就是几行 frontmatter 加一段 body。」frontmatter 声明 name、description、allowed-tools（如 [Read, Edit, Grep]），body 用大白话写清要做什么、怎么报告、怎么修。手写时就是往项目的 .claude/skills/ 丢一个这样的 SKILL.md。

**费曼一下**：一张工作卡片分两半。上半是「标签栏」（叫什么、什么时候用、能动用哪些工具），下半是「操作步骤」。标签栏让系统知道何时该翻出这张卡，步骤栏才是真正要干的活。

### description 作为触发条件

**context**：frontmatter 里最关键的一行。示例把 description 写成「…Use when the diff touches error handling or logging.」，用一句「什么时候用」决定这个 skill 何时被自动拉进来。文章排查嵌入失效时明确指出：如果追加的检查没跑，「就是 skill 的 description 或前面的指令没把它拉进来」。

**费曼一下**：相当于卡片上的「适用场景」贴纸。写清楚「碰到 X 情况就翻我出来」，系统才会在对的时刻主动想起这张卡；贴纸写得含糊，卡片就躺在抽屉里没人用。

### 独立调用（Standalone）

**context**：四种接入方式里最松的一种。你在产物已经存在之后，刻意手动调用它，适合那些「不必每次都做」的横切检查——提交前安全扫描、发 PR 前无障碍审计、整个 repo 的 license-header 校验。代价是每次都要你记着调用；当你开始「每次改动后都在跑它」，就该升级成嵌入或链式了。

**费曼一下**：像家里的体重秤，想称的时候自己走上去称。适合偶尔查一次的事；但如果你发现自己每顿饭后都要称，那就该换成「吃完自动记录」的机制了。

### 嵌入（Embedded）

**context**：第二种接入方式。检查作为「产出物的那个 skill」的一部分自动触发，不用你开口。最简单就是在产出 skill 的 body 末尾加一行，例如 scaffold-component 生成组件后自动跑 eslint 并在完成前修掉 error。验证方式：在一个全新任务上调用该 skill，看新步骤有没有作为输出的一部分跑出来。

**费曼一下**：把质检直接焊进生产工序里——工人组装完最后一步，顺手就把自检做了，不需要另派一个人在旁边喊「记得检查」。检查和生产变成同一个动作。

### 链式（Chained）

**context**：第三种接入方式。一个 skill 在结尾调用下一个，多个「经过验证的交接」端到端跑。Anthropic 的 Claude Code 团队日常这么用：/code-review 抓 bug → /simplify 清 diff → /verify 确认端到端行为 →（碰 UI 时）/design 对照 DESIGN.md。链式让「我总在某步之后做某检查」的习惯，变成 skill 之间的固定契约。

**费曼一下**：像接力赛，每一棒跑到终点会主动把接力棒递给下一棒，而不是停下来等裁判喊。一串工序被串成一条自动传送带，你只在传送带卡住时才伸手。

### PR 级门禁（On every PR）

**context**：第四种、也是最靠后的接入方式。链条对你自己的改动稳定后，同一套流程放到每个 PR 上跑，队友的改动过和你一样的门禁，「不管他有没有记得调用那条链」。基础设施和你写好的链是同一种东西，只是不再依赖作者的自觉。提醒：链条还在频繁变动时先别上，否则每次调整都成了全团队可见的事件。

**费曼一下**：把你个人的自检清单，升级成公司大门口的安检。以前只有你出门会自觉检查，现在每个人进出都得过同一道安检门，谁都绕不过去，也不靠谁「记得」。

### 可编辑性边界

**context**：决定该用嵌入还是链式的硬约束。嵌入只对你能改的 skill 生效：你自己写的，或以项目级安装、SKILL.md 在你掌控下的。内置 skill 和插件托管的 skill（更新时会被覆盖）不能嵌入——你改了也会被下次更新冲掉，所以那些要改用链式。

**费曼一下**：你只能在自己的笔记本上写批注；图书馆里随时会换新版的公共书不能乱涂，你涂的字下次借到新版就没了。想给公共书加备注，只能夹一张自己的便签（链式包装），而不是写在书页上。

### Wrapper skill（包装 skill）

**context**：链式的一个专门用法——给「你改不了的 skill」加验证。做一个自定义包装 skill，先调用原 skill，再调用你的验证 skill。原文例子 safe-refactor：先对当前 diff 跑 /simplify，结束后调用 /verify-no-public-api-changes。它是绕过「可编辑性边界」的正解。

**费曼一下**：你不能改别人做好的黑盒机器，但可以给它套一个自己的外壳：外壳先把东西喂进黑盒，黑盒吐出结果后，外壳再接一道你自己的检查。机器没动，验证却加上了。

### 习惯变契约（habit → contract）

**context**：链式在「人的行为」层面带来的关键转变。原本「我总在 /simplify 之后跑 /verify」是一个靠自觉维持的习惯；写进链条后就变成「/simplify 结束时总会跑 /verify」的契约，由系统保证执行。「链条自己把整个开发循环跑完，只有当有东西升级回你这里时你才介入。」

**费曼一下**：口头约定「我尽量记得锁门」和装一把「关门就自动上锁」的弹簧锁，是两回事。前者靠你自律，后者靠机制；链式就是把靠自律的习惯，换成靠机制兜底的契约。

### 个人基础设施 → 团队基础设施

**context**：整条升级路径的意义所在。PR 级门禁是「验证从个人基础设施变成团队基础设施的地方」：你为省自己一周两分钟而写下的检查，现在在每一次改动上为每个人省两分钟。同一份 skills、rubrics、标准，从服务你一个人，扩展到服务整个团队。

**费曼一下**：你在自家门口修的一段台阶，原本只方便你自己；哪天它被并进小区的公共通道，就成了所有人每天都在用的设施。同一份投入，受益人从一个变成一群。

### 循环工程（loop engineering）

**context**：文章对这套方法论的统称。流程走顺后「就可以扩展你的 loop engineering」，且这套创建流程「无论你在自动化什么、在什么环境里都是一致的」：挑最频繁的手动收尾 → 先试内置 /verify → 用大白话写下流程 → 交给 skill-creator 或手写 → 新任务上调用并迭代 → 试验链式化。

**费曼一下**：把「让机器自己检查自己」当成一门可以反复练的手艺，而不是一次性的小聪明。每次都用同一套固定招式：找到最烦人的重复动作，写成规则，装上，试跑，再串起来。招式不变，能自动化的东西越来越多。

### 灵活性与自动化的权衡

**context**：选择接入方式时必须持有的成本意识。「链式是拿灵活性换自动化」：当各步骤足够独立、你有时只想跑其中一个时，就别硬链。而且链式验证闭环会增加 token 开销，「最好在大范围部署前先测试」。standalone 保留灵活但要人记着，越往 chained / PR 走越自动，但也越死板。

**费曼一下**：自动挡和手动挡的取舍。全自动省心，但你没法临时只做半套动作；手动灵活，但事事得自己操心。而且越自动的档位越费油（token），所以铺开之前先小范围试一脚。

### 概念网络

![图片为概念网络图，展示了从人工到自动、从个人到团队的升级路径。起点是重复步骤，通过Skill实现验证闭环，再分为Standalone和Embedded两种形式。Standalone可形成个人习惯，进而产生可执行契约，最终形成团队基础设施；Embedded可形成Chained，再通过PR门禁形成团队基础设施。该图与上下文紧密相关，直观呈现了全文思想主轴上的概念关系。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=Mzg3MDQ1YmYwYjA2NjlkNDU5YTlkMWRjYzYwZjRiNTVfNjExNWJjZWNjZjk4Y2JlMjZlZGNiYzVhOWYwMmMxYjVfSUQ6NzY2OTUxNjYyNDQ0MDkwNDY4M18xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

全文的思想主轴是一条「从人工到自动、从个人到团队」的升级路径，所有概念都挂在这条主轴上。起点是「验证闭环」这个核心目标——让检查自动发生；而「把重复步骤编码成 Skill」是实现它的基本手段，「skill-creator 访谈式创建」和手写「[SKILL.md](http://skill.md/)（frontmatter＋body）」则是两条具体的落地路径。在 [SKILL.md](http://skill.md/) 内部，「description 作为触发条件」是一个承上启下的枢纽：它既是 frontmatter 的一部分，又直接决定了后面「嵌入」能否被自动拉起，是把一份静态文件接进动态工作流的开关。

四种接入方式——独立调用、嵌入、链式、PR 级门禁——不是并列的选项，而是同一条升级阶梯上由松到紧、由手动到自动的四级台阶，升级的驱动力是「你多频繁需要这个检查」：standalone 靠人记着调用，一旦「每次改动后都在跑」，就有压力往嵌入或链式走；链式稳定后又自然延伸成 PR 级门禁。「可编辑性边界」是这条阶梯上的一个分岔阀门：它决定你到底能不能走嵌入——能改的 skill 才能嵌入，改不了的（内置、插件托管）只能绕道链式，而「Wrapper skill（包装 skill）」正是这条绕行道的具体实现。

再往上，「习惯变契约」解释了链式在「人的行为」层面到底改变了什么：它把靠自觉维持的习惯，固化成由系统保证的契约；而「个人基础设施 → 团队基础设施」则是同一转变在「组织」层面的放大——PR 级门禁让这份契约从约束你一个人，扩展到约束整个团队，且不再依赖任何人的自觉。这两个概念一纵一横，共同回答了「为什么这条阶梯值得往上爬」。

贯穿始终的，是两组给这条看似「越自动越好」的路径踩刹车的张力。一是「灵活性与自动化的权衡」：越往链式 / PR 走越自动，但也越死板、越费 token，所以步骤够独立时不必硬链，铺开前要先测试。二是「何时升级」的判断：每一级都有明确的升级信号（如「每次改动后都在跑它」）和降级例外（如跨工作流的检查该留在 standalone、链条还在变动时先别上 PR）。最后，「循环工程」是对全文的统摄：它把上述所有概念收拢成一套「无论自动化什么都一致」的可复用流程，让读者把单个验证 skill 的经验，升维成一门可以反复施展的手艺。

---
