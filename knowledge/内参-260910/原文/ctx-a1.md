# 工具更多反而让 Copilot 代码审查变差，GitHub 如何修正

- 标题：工具更多反而让 Copilot 代码审查变差，GitHub 如何修正
- 来源：github.blog
- 原文：https://github.blog/ai-and-ml/github-copilot/better-tools-made-copilot-code-review-worse-heres-how-we-actually-improved-it/
- 作者：GitHub
- 类型：主题特刊
- 摘要：GitHub 用真实 benchmark trace 证明，工具更新与能力变多都可能让 Agent 更贵、更差；只有从 diff 出发、先收窄再读取，才把平均审查成本降了约 20%，同时维持审查质量。它把“最小充分上下文”从原则落到了工具工作流。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：7515
- 策展人按：Manus 和 Anthropic 教你删什么，这篇告诉你怎么判断哪一次工具调用不该留。建议插在原清单第 06 篇之后，作为从原理进入 Loop Engineering 的过桥。

---

- 原文标题：Better tools made Copilot code review worse. Here’s how we actually improved it.
- 作者：GitHub
- 内参日期：2026-07-12
- 来源类型：blog
- 原文：https://github.blog/ai-and-ml/github-copilot/better-tools-made-copilot-code-review-worse-heres-how-we-actually-improved-it/
- 标签：agentic engineering, agents

GitHub 发现给审查 Agent 增加工具并不会自动提升质量，反而可能扩大搜索与决策噪声。改进关键在任务分解、工具选择和反馈回路，而不是简单堆能力。

## 导读

代码审查

## 核心观点

- GitHub 把 Copilot code review 的专用代码探索工具换成维护更好、可被多个 Copilot 产品共享的 grep、glob、view 后，最初结果反而更差：平均审查成本上升，发现的有用问题减少。
- 回归并不是工具能力不足，而是工具说明把代码审查 agent 引向了通用 coding assistant 的工作姿势：广泛搜索、猜路径、读取大片代码、继续扩散探索，并把无关内容留在工作上下文里。
- 真正的修复是为“审查 pull request”重写工作流：从 diff 出发形成具体问题，先用廉价搜索收窄，再用 view 读取最小证据，并批量执行相互独立的搜索和聚焦读取。
- 经过 benchmark trace 的反复调试，新工作流在生产中把平均 review cost 降低约 20%，同时维持相同审查质量。这说明 agent 工具面不是实现细节；工具说明、任务姿势与反馈回路共同决定产品表现。
- 同一套指令放到 Copilot CLI 并没有取得同样收益，因为 CLI 面向宽泛、交互式、可转向的编码任务。可复用的是工具，不一定是围绕工具的工作流。

## 共享更好的工具，结果却更贵、更差

- Copilot code review 的任务是读取 pull request diff，并探索周边代码，在问题上线前找到真正重要的缺陷。
- 它原本使用专用探索工具：list_dir 负责列目录，search_file 和 search_dir 负责搜索，read_code 负责读取代码。这套工具受 SWE-agent 式仓库导航和 Copilot Autofix 等早期 agentic system 启发。
- 早期 coding model 工具调用更少，也不擅长主动补齐上下文，因此旧工具会在匹配行或指定范围之外，自动返回更多 surrounding code context。额外上下文更贵，却符合当时模型的需要。
- Copilot CLI harness 则提供 Unix 风格的共享工具：glob 发现候选路径，grep 搜索文本、符号和调用点，view 在路径或范围明确后读取代码。
- GitHub 希望减少重复工具实现，让 Copilot CLI、cloud agent、code review 等产品共享同一处基础设施改进。纸面上，旧工具到新工具的映射非常直接。
- 但离线 benchmark 显示，简单替换后 agent 效率和效果同时下降：平均成本增加，有用 review comment 数量减少。“工具更好，所以 agent 自然更好”的假设没有成立。

## trace 暴露了真正的问题：agent 陷入浏览循环

- 内部 benchmark 不只给最终分数，还记录 agent 走过的路径：调用了什么工具、返回多少内容、哪里报错、搜索是在收窄证据还是扩大范围。
- trace 显示，换用共享工具后，review agent 经常像在“理解整个仓库”，而不是“调查一个 pull request”：先广泛搜索，再猜可能路径，读取大片文件，又从新内容里找出更多搜索方向。
- 这形成 browsing loop。每轮探索都能找到看似相关的新线索，agent 因而继续扩散，却没有更接近 diff 中某个具体风险的证据。
- 这种行为对通用 coding assistant 并不荒谬。为了规划和修改代码，assistant 可能需要先绘制整个区域，避免破坏仓库其他角落。
- 但 reviewer 的典型动作不同：它从 diff 开始，问变更是否引入了问题，然后只查证确认或排除该问题所需的最窄上下文。

## 工具输出不是一次性打印，而是持续占用的工作上下文

- 广泛读取的代价不只是多一次工具调用。每个工具结果都会进入 agent 的 working context，并在后续推理中继续存在。
- 无关文件内容会同时增加 token 成本和注意力负担，让 review 更难围绕 diff 的证据保持聚焦。
- 因此，工具返回内容的大小和时机都属于 agent 设计问题。view 读取一个大文件并不是“先看看再说”的无成本动作，而是在为之后每一步推理增加上下文负载。
- 旧工具自动附带 surrounding context，是对早期少调用模型的适配；共享 CLI 工具更原子化后，agent 应当改变搜索节奏，而不是沿用原来的探索直觉。
- GitHub 最终确认：共享工具本身工作正常，错误来自 instructions。说明把 grep、glob、view 暗示成通用探索手段，而没有把它们约束到 review evidence workflow。

## 代码审查需要以 diff 为锚点的问题驱动工作流

- 人类 reviewer 通常从 diff 形成具体问题，例如：这个函数在哪里被调用？配置键是否在其他地方使用？有没有相同模式的测试或 helper？解释行为所需的最小附近代码是什么？
- 这些问题都以变更为锚点，不要求先打开仓库的大部分内容。目标是找到 minimal context，回答一个可验证的风险判断。
- GitHub 将 generic posture——“用可用工具检查可能相关的仓库上下文”——改成 review-shaped guidance：从 diff 开始，先用 grep 和 glob 收窄，再用 view 读取精确证据。
- 如果 diff 改了 authorization helper，合适的问题不是“显示所有调用者的完整文件”，而是“是否有 request-handling caller 依赖旧行为”。问题越具体，搜索范围越容易控制。
- 这一变化把 agent 的节奏从 “browse, read, search again” 改成 “ask, narrow, read, decide”。决定何时停止探索，也成为工作流的一部分。

## grep、glob、view 被重新分配了明确角色

- 新流程第一步是从 diff 形成 specific review questions，不从无边界的 repository context 开始。
- 路径不确定时用 glob，需要寻找 candidate file、symbol 或 call site 时用 grep。这两类 discovery 相对便宜，适合先批量执行。
- 只有当 agent 已知道需要哪个文件或哪段行范围时，才调用 view。读取不再承担“也许会有用”的探索职责，而是承担确认或否定假设的证据职责。
- 独立搜索应批量完成，聚焦读取也应批量完成，避免在“一次搜索—一次读取—再一次搜索”之间来回切换，减少每个中间结果引发新的扩散。
- 文章给出的理想路径很短：从 diff 中被修改的 helper 出发，grep 找 callers，glob 找可能的 route、handler、controller，view 最相关的调用范围，然后判断 caller 是否改变风险。

## 失败恢复规则阻止小错误演变成大探索

- 工具失败本身不是最危险的，危险的是失败后的错误恢复姿势。一次 grep 输入错误，如果引发多轮搜索和猜测，就会把局部问题扩大成 browsing loop。
- 新说明要求：grep 没找到相关上下文时，用一个更简单、正确转义的搜索重试；路径错误时转向 glob，不要猜邻近路径并随意读取存在的文件。
- 这种规则把失败限制在原问题附近。agent 修正查询，而不是把“不知道路径”解释成“需要探索更多仓库”。
- 失败恢复也是 tool instruction 的组成部分。说明不仅要告诉模型什么时候调用工具，还要规定错误、空结果和不确定性出现时如何收敛。

## benchmark trace 让行为可以被工程化调试

- 共享 harness 提供工具，内部 code review benchmark 提供反馈回路。团队可以在同一组 review example 上运行、比较 trace、修改 instructions，再次运行。
- 评估问题因此从模糊的“prompt 是否更好”变成可观察行为：agent 是否先收窄再读取？是否批量执行独立搜索？调用 view 时是否已有理由？tool error 是减少了还是被转移？trace 是否仍围绕 diff 证据？
- 最有价值的信号不是工具调用总数减少。调整后的 agent 调用次数大致相近，但更多调用被花在 relevant evidence 上，而不是反复扩大搜索。
- 这把产品结果连接到可解释的工程行为。团队不必只看最终 score 猜原因，而能看到成本和质量变化由哪一种调查路径产生。
- 在生产中，调优后相对 control 的平均 review cost 下降约 20%，且没有出现阻止发布的质量信号。收益来自工具、定制说明和 benchmark feedback loop 的组合。

## 工具说明是产品接口，不是附属文案

- 对 agent 来说，tool surface 会改变它注意什么、如何搜索、把多少内容带入上下文，以及何时认为证据已经足够。因此工具不能被当成可随意替换的 implementation detail。
- 文章把 tool description 和 system instruction 类比为 API documentation。API 文档含糊会让开发者低效或做错决策；工具提示含糊也会让 LLM 以错误姿势消费能力。
- 小的措辞变化可以改变成本、质量和调查形状，因为它改变了 agent 分配注意力的方式。工具能力相同，行为契约不同，产品结果就可能完全不同。
- 共享工具仍然有价值：统一维护可以让多个产品继承基础设施改进。但共享的是 capability layer，各产品仍需设计与任务相匹配的 workflow layer。

## 反例说明同一工作流不能跨产品照搬

- GitHub 也尝试把同样聚焦的工具说明应用到 Copilot CLI，却没有得到 code review 中同等的收益。
- code review 有明确 diff 和 review question 作为锚点；Copilot CLI 面向更宽的交互式编码任务，用户可能要求理解仓库、规划变更、编辑文件，并在多轮中改变方向。
- CLI 场景里，正确上下文可能一开始并不明确，广泛探索有时就是任务本身。把 reviewer 的收窄姿势强加给 CLI，会限制它完成开放任务所需的发现过程。
- 最终经验不是“所有 agent 都应少读文件”，而是 “same tools, different job”。工具可以共用，instructions 必须表达当前产品的任务边界、锚点、证据标准和停止条件。

## 概念网络

### 关键概念

### 工具—工作流适配

**context**：grep、glob、view 本身比旧工具更易维护、可共享，但简单替换后 review cost 上升、有效评论减少；只有为 reviewer 重写工作流后才转为收益。

**费曼一下**：好工具不会自动带来好结果。锤子很锋利，也要知道当前是在钉钉子还是拆墙；任务姿势不匹配，能力越强可能浪费越多。

### 共享 harness

**context**：Copilot CLI harness 的代码探索工具被 cloud agent 等多个产品使用。GitHub 希望用统一实现减少重复，并让工具改进跨产品传播。

**费曼一下**：harness 是多个 agent 共用的工具底盘。底盘可以统一维护，但不同车辆仍需要不同驾驶规则。

### 浏览循环

**context**：review agent 广泛搜索、猜路径、读取大量代码，再从新内容发起更多搜索，表现得像在理解整个仓库而不是验证 diff 风险。

**费曼一下**：每次搜索都发现一点新东西，于是 agent 永远觉得还该再看一点。它一直在移动，却没有更接近要回答的问题。

### Diff 锚定

**context**：代码审查的正确起点是 pull request diff。agent 应围绕变更提出具体问题，并把探索限制在确认或排除这些问题所需的范围内。

**费曼一下**：diff 像调查的案发现场。先看现场发生了什么，再去找相关证据，而不是先把整座城市翻一遍。

### 最小充分上下文

**context**：reviewer 只需要解释某个风险的最小附近代码。额外文件会进入 working context，增加成本并让后续推理失焦。

**费曼一下**：上下文不是越多越好，而是够回答问题就好。多带十本无关资料进考场，只会让你更难找到真正需要的那一页。

### 先收窄、后读取

**context**：新说明要求先用 grep 和 glob 找候选文件、符号、调用点，只有路径和行范围明确后才用 view 读取精确证据。

**费曼一下**：先查目录和索引，再翻到需要的页。不要为了找一句话，先从第一章开始通读整本书。

### 工具调用批处理

**context**：独立的廉价 discovery 应先批量执行，聚焦读取也批量执行，避免一搜一读交替造成上下文扩散和额外节奏成本。

**费曼一下**：把同类问题一次问完，再一起看答案。这样比每得到一个答案就临时改变方向更稳定。

### 收敛式失败恢复

**context**：grep 失败时用更简单、正确转义的查询重试；路径错误时用 glob，而不是猜附近路径并扩大读取范围。

**费曼一下**：走错门时，先确认门牌，而不是把整栋楼每个房间都打开。好的恢复策略让错误停在原地，不继续放大。

### Trace 驱动评估

**context**：benchmark 同时记录工具路径、输出量、错误和搜索方向。团队据此判断 agent 是否聚焦证据，而不只比较最终 score。

**费曼一下**：不仅看学生最后答对几题，也看他每一步怎么算。过程记录让你知道分数变化到底来自能力提升，还是偶然猜中。

### 任务特定工具说明

**context**：code review 的聚焦说明在 CLI 中没有同等收益，因为 CLI 的任务更开放、可多轮转向。相同工具必须按产品工作边界配置 instructions。

**费曼一下**：同一张地图，导游、快递员和消防员的使用方式不同。说明书要告诉 agent 它现在扮演什么角色，而不只是地图上有什么。

### 概念网络

![图片展示了GitHub在Copilot代码审查中解决工具—工作流适配问题的流程。从共享Harness开始，经工具—工作流错配，进入低效浏览循环，再通过Diff锚定、最小上下文、先收窄后读取等手段收敛，最终实现更可靠的代码审查，证明成本下降。该图与上下文紧密相关，直观呈现了GitHub为修正代码审查变差问题所采取的措施及效果。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=MGYxNjM3ZmVhNmE5MmJjNjMwOWY5Mzc2N2JlMWU5ODVfZjUwMDJmMDk1ZGU0OGRlZWI2OWMwZDQyZjU2OGY4YjVfSUQ6NzY2OTUxNjYzNTI3ODk1MzQ1MV8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

文章的起点是 **共享 harness**：GitHub 希望让多个 Copilot 产品复用 grep、glob、view，降低重复维护成本。但 capability layer 的统一暴露了 **工具—工作流适配** 问题：code review 沿用了面向通用 coding assistant 的探索直觉，于是进入 **浏览循环**。

浏览循环之所以昂贵，是因为工具输出会持续占用 working context。要打断它，工作流以 **Diff 锚定** 重新定义调查边界，再以 **最小充分上下文** 规定证据规模。具体执行上，agent 遵循 **先收窄、后读取**，把廉价搜索和聚焦读取组织成 **工具调用批处理**，并用 **收敛式失败恢复** 防止小错误扩张为全仓探索。

这些规则并非靠直觉一次写成，而是通过 **Trace 驱动评估** 迭代。trace 把最终成本和质量分解为可观察的搜索、读取、错误与收敛行为，使约 20% 的生产成本下降能够被解释，而不只是被测量。

最后，Copilot CLI 的反例把结论限制在正确边界内：真正可迁移的是共享工具能力和行为评估方法，不是 reviewer 的全部姿势。每个产品仍需要 **任务特定工具说明**，把角色、锚点、证据标准、失败恢复和停止条件写进工具周围的工作流。

---
