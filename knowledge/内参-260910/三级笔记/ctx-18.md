# Claude Code 的 1M Context 让会话管理变成核心技能

## 一句话主旨
1M context 不放大理解力，session management 才是被放大的核心技能。

## 作者试图回答的问题
有了 1M context 之后，用户该如何管理 Claude Code 的 session（继续/回退/清空/压缩/交给 subagent）？为什么这件事比 prompt 技巧更决定输出质量？

## 三级论证骨架

### 一、1M context 反而让 session management 更重要
#### 1.1 大窗口改变的是用户行为的分布，不是问题本身
- Anthropic 更新 /usage 的背景：客户访谈发现不同用户管理 session 的方式差异很大。
- 作者把这些差异归结为一串选择，而非窗口大小：
  - 一直开一个长 session，还是每个任务都新开？
  - 何时继续、何时 /rewind、何时 /clear、何时 /compact、何时让 subagent 接手？
- 判断：这些选择本质都在管理同一件事——context window，且都影响输出质量。

#### 1.2 context window 是模型一次能看到的全部世界
- 构成：system prompt、当前对话历史、tool calls、tool outputs、已读取的文件。
- Claude Code 现在有 1M tokens 窗口，但仍是窗口，不是长期记忆。
- 反直觉判断：窗口越大不等于越聪明，反而越需要整理。

### 二、Context rot：长上下文自带代价
#### 2.1 上下文越长，噪音越拖慢模型
- 文章把 context 使用的代价称为 **context rot**：
  - 注意力被分散；
  - 旧的不相关信息干扰当前任务；
  - 长 session 后更容易忘记真正重要的约束。
- 由此推出：“继续聊下去”不总是最自然的正确选择。
- 限定：1M 只是让你更晚撞墙，没有取消“上下文会腐化”。

### 三、每一轮结束都是一个 branching point
#### 3.1 至少五条路径，而非只有“继续输入”
- **Continue**：同一 session 继续发消息。
- **/rewind**：跳回之前某条消息，从那里重新提示。
- **/clear**：新开 session，带自己提炼的 brief 重来。
- **Compact**：让 Claude 把当前 session 压成摘要再继续。
- **Subagents**：交给拥有干净上下文的新 agent，只带回结论。
- 作者的改写：把“下一步发什么 prompt”换成“下一步怎么处理 context”。

#### 3.2 新任务通常应新开 session
- 经验法则：**when you start a new task, you should also start a new session**。
- 1M context 让更长任务更可靠，例如从零构建一个 full-stack app。
- 任务已切换还沿用旧 session，往往带入不必要噪音。
- 例外：两任务相关且前一任务的部分 context 仍有价值，如刚实现 feature 接着写它的文档——开新 session 需重读刚改的文件，成本更高。

#### 3.3 Rewind 比“纠正”更干净
- 作者称：只选一个代表好 context management 的习惯，就是 **rewind**。
- 普通做法：Claude 读了 5 个文件、试方案 A 失败，你输入 “that didn’t work, try X instead.”
  - 代价：失败尝试和无效中间产物留在 context 里。
- 更好做法：rewind 到刚读完文件处，用刚学到的信息重新 prompt。
  - 例：“Don’t use approach A, the foo module doesn’t expose that — go straight to B.”
- 价值：保留有效发现，丢掉错误路径。

#### 3.4 Compact 与 clear 看似相似，实为两种减重
- **Compact**：模型自己总结对话，用摘要替换完整历史。
  - 优点：省力，可能记得你漏掉的细节；缺点：有损，由模型决定什么重要。
- **Clear**：自己写下真正重要的内容（当前目标、约束、相关文件、已排除方案）。
  - 优点：干净、可控；缺点：需要你亲自做抽象。
- 比喻：compact 是让 Claude 整理房间；clear 是你自己打包行李换房间。

#### 3.5 Bad compact 的根源：模型不知道你下一步去哪
- bad compact 常发生在模型无法预测工作方向时。
- 例：一段很长的 debugging 后，auto-compact 把重点总结成“刚才调试的主线”；你下一句却说 “now fix that other warning we saw in bar.ts.”——该 warning 非主线，可能已被摘要丢掉。
- 更麻烦：context rot 最严重时，往往正是需要做 compact 时。
- 推论：1M 的真正好处是给你更多时间**主动 compact**，并明确告诉它接下来要保留什么。

#### 3.6 Subagents 是 context management，不只是并行工具
- 价值不在“多一个 agent 干活”，而在它有独立的 fresh context window。
- 适合：会产生大量中间输出、但最终只需结论的任务。
- 心智测试：**will I need this tool output again, or just the conclusion?**
  - 只需结论，就让 subagent 读、查、验证、总结，把最终结果带回主 session。

### 四、总结性判断
- 每一轮交互本质上都是一次上下文治理决策。
- 1M context 降低爆窗频率，但没有取消 context rot。
- 好的使用者像管理项目一样管理 session：新任务新 session；错路用 rewind；长 session 主动 compact；复杂探索交给 subagent；关键 context 自己写 brief。
- 收尾判断：真正稀缺的不是 prompt 技巧，而是“这段上下文还值得继续带着吗？”

## 作者边界、反例与不确定性
- 明确反例：新任务新 session 并非绝对，相关任务且旧 context 仍有价值时（如刚实现 feature 接着写文档）沿用旧 session 成本更低。
- 明确限定：1M context“只是让你更晚撞墙”，并未改变 context rot 这一事实。
- 明确保留：compact 的缺点是“有损”，是否够用取决于模型能否预测你的下一步方向；bad compact 已被点出但作者未给出通用避免方法。
- 原文未给出的：1M 窗口在具体任务类型上的量化收益、五种路径的选择优先级（作者只给场景建议，未给排序规则）。
