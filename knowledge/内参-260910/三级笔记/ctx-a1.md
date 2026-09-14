# 工具更多反而让 Copilot 代码审查变差，GitHub 如何修正

## 一句话主旨
工具更好不一定改进审查；重写 diff 锚定工作流并靠 trace 迭代才修复。

## 作者试图回答的问题
核心问题：为什么给 Copilot code review 换上更易维护、可共享的工具后，审查质量反而下降？如何实际改进？
关联子问题：工具输出如何塑造 agent 的调查行为？什么才是适合代码审查的工作流？该工作流能否跨产品迁移？

## 三级论证骨架

### 一、共享更好的工具却导致审查成本上升、有效问题减少

#### 1.1 旧专用工具与共享工具的差异
- 代码审查原本使用专用探索工具：list_dir、search_file、search_dir、read_code。
  - 这套工具受 SWE-agent 式仓库导航和 Copilot Autofix 等早期 agentic system 启发。
  - 早期模型工具调用更少、不擅长主动补齐上下文，旧工具会在匹配行或指定范围外自动返回更多 surrounding code context；额外上下文更贵，但符合当时模型需要。
- Copilot CLI harness 提供 Unix 风格共享工具：glob 发现候选路径，grep 搜索文本、符号和调用点，view 在路径或范围明确后读取代码。
  - GitHub 希望减少重复工具实现，让多个产品共享同一处基础设施改进；纸面上旧到新的映射非常直接。

#### 1.2 简单替换带来反效果
- 离线 benchmark 显示，简单替换后 agent 效率和效果同时下降：平均成本增加，有用 review comment 数量减少。
- “工具更好，所以 agent 自然更好”的假设没有成立。

### 二、trace 诊断：工具说明把审查 agent 引向通用探索姿势

#### 2.1 trace 显示 agent 陷入浏览循环
- 内部 benchmark 记录 agent 路径：调用什么工具、返回多少内容、哪里报错、搜索是在收窄证据还是扩大范围。
- 换用共享工具后，review agent 经常像在“理解整个仓库”，而不是“调查一个 pull request”：先广泛搜索，再猜可能路径，读取大片文件，又从新内容里找出更多搜索方向。
  - 这形成 browsing loop：每轮探索都能找到看似相关的新线索，agent 继续扩散，却没有更接近 diff 中某个具体风险的证据。
- 这种行为对通用 coding assistant 不荒谬：为了规划和修改代码，可能需要先绘制整个区域。
  - 但 reviewer 的典型动作不同：从 diff 开始，问变更是否引入问题，然后只查证确认或排除该问题所需的最窄上下文。

#### 2.2 工具输出持续占用工作上下文，问题在 instructions
- 广泛读取的代价不只是多一次工具调用：每个工具结果都进入 working context，并在后续推理中持续存在。
  - 无关文件内容会同时增加 token 成本和注意力负担，让 review 更难围绕 diff 证据保持聚焦。
  - view 读取大文件并不是“先看看再说”的无成本动作，而是为之后每一步推理增加上下文负载。
- 旧工具自动附带 surrounding context，是对早期少调用模型的适配；共享 CLI 工具更原子化后，agent 应当改变搜索节奏。
- GitHub 最终确认：共享工具本身工作正常，错误来自 instructions——说明把 grep、glob、view 暗示成通用探索手段，而没有把它们约束到 review evidence workflow。

### 三、修复：以 diff 为锚点重写问题驱动工作流

#### 3.1 代码审查需要以 diff 为锚点的问题驱动工作流
- 人类 reviewer 通常从 diff 形成具体问题：这个函数在哪里被调用？配置键是否在其他地方使用？有没有相同模式的测试或 helper？解释行为所需的最小附近代码是什么？
  - 这些问题都以变更为锚点，目标是找到 minimal context，回答一个可验证的风险判断。
- GitHub 将 generic posture——“用可用工具检查可能相关的仓库上下文”——改成 review-shaped guidance：从 diff 开始，先用 grep 和 glob 收窄，再用 view 读取精确证据。
  - 如果 diff 改了 authorization helper，合适的问题不是“显示所有调用者的完整文件”，而是“是否有 request-handling caller 依赖旧行为”。
- 节奏从 “browse, read, search again” 改成 “ask, narrow, read, decide”；决定何时停止探索也成为工作流的一部分。

#### 3.2 grep、glob、view 被重新分配明确角色
- 新流程第一步是从 diff 形成 specific review questions，不从无边界的 repository context 开始。
  - 路径不确定时用 glob；寻找 candidate file、symbol 或 call site 时用 grep。这两类 discovery 相对便宜，适合先批量执行。
  - 只有知道需要哪个文件或哪段行范围时，才调用 view；读取不再承担“也许会有用”的探索职责，而是承担确认或否定假设的证据职责。
- 独立搜索应批量完成，聚焦读取也应批量完成，避免“一次搜索—一次读取—再一次搜索”之间来回切换。
- 理想路径很短：从 diff 中被修改的 helper 出发，grep 找 callers，glob 找可能的 route、handler、controller，view 最相关的调用范围，然后判断 caller 是否改变风险。

#### 3.3 失败恢复规则阻止小错误演变成大探索
- 工具失败本身不最危险，危险的是失败后的错误恢复姿势：一次 grep 输入错误，如果引发多轮搜索和猜测，就会把局部问题扩大成 browsing loop。
- 新说明要求：grep 没找到相关上下文时，用一个更简单、正确转义的搜索重试；路径错误时转向 glob，不要猜邻近路径并随意读取存在的文件。
  - 这种规则把失败限制在原问题附近：agent 修正查询，而不是把“不知道路径”解释成“需要探索更多仓库”。
- 失败恢复也是 tool instruction 的组成部分：说明要规定错误、空结果和不确定性出现时如何收敛。

### 四、验证与边界：trace 驱动调优与 CLI 反例

#### 4.1 benchmark trace 让行为可以被工程化调试
- 共享 harness 提供工具，内部 code review benchmark 提供反馈回路；团队可在同一组 review example 上运行、比较 trace、修改 instructions，再次运行。
- 评估问题从模糊的“prompt 是否更好”变成可观察行为：agent 是否先收窄再读取？是否批量执行独立搜索？调用 view 时是否已有理由？tool error 是减少还是被转移？trace 是否仍围绕 diff 证据？
- 最有价值的信号不是工具调用总数减少；调整后调用次数大致相近，但更多调用花在 relevant evidence 上，而不是反复扩大搜索。
- 生产中，调优后相对 control 的平均 review cost 下降约 20%，且没有出现阻止发布的质量信号；收益来自工具、定制说明和 benchmark feedback loop 的组合。

#### 4.2 工具说明是产品接口，不是附属文案
- 对 agent 来说，tool surface 会改变它注意什么、如何搜索、把多少内容带入上下文、何时认为证据已经足够；因此工具不能被当成可随意替换的 implementation detail。
- 文章把 tool description 和 system instruction 类比为 API documentation：API 文档含糊会让开发者低效或做错决策；工具提示含糊也会让 LLM 以错误姿势消费能力。
- 小的措辞变化可以改变成本、质量和调查形状，因为它改变了 agent 分配注意力的方式。
- 共享工具仍有价值：统一维护可以让多个产品继承基础设施改进，但共享的是 capability layer，各产品仍需设计与任务相匹配的 workflow layer。

#### 4.3 反例说明同一工作流不能跨产品照搬
- GitHub 也尝试把同样聚焦的工具说明应用到 Copilot CLI，却没有得到 code review 中同等的收益。
  - code review 有明确 diff 和 review question 作为锚点；Copilot CLI 面向更宽的交互式编码任务，用户可能要求理解仓库、规划变更、编辑文件，并在多轮中改变方向。
  - CLI 场景里，正确上下文可能一开始并不明确，广泛探索有时就是任务本身；把 reviewer 的收窄姿势强加给 CLI，会限制它完成开放任务所需的发现过程。
- 最终经验不是“所有 agent 都应少读文件”，而是 “same tools, different job”：工具可以共用，instructions 必须表达当前产品的任务边界、锚点、证据标准和停止条件。

## 作者边界、反例与不确定性
- 反例：Copilot CLI 应用相同聚焦说明未获得同等收益，说明 reviewer 工作流不可跨产品照搬。
- 边界：可复用的是工具能力层（capability layer）和 trace 评估方法，不是 reviewer 的全部姿势；每个产品需要任务特定工具说明。
- 明确否定“工具越好 agent 自然越好”的假设；并澄清“所有 agent 都应少读文件”不是结论。
- 原文未提及明确的未解决矛盾；作者将改进归因于工具、定制说明和 benchmark feedback loop 的组合，而非单一因素。
