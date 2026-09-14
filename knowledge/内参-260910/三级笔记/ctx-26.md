# 什么是 Context？——从“提示词”到“工作记忆”的认知跃迁

## 一句话主旨
Context 是有限昂贵的工作记忆，个人上下文经工程化决定 AI 价值。

## 作者试图回答的问题
AI 交互中的 Context 是什么，为什么应从“提示词”升级为“工作记忆”？关联子问题：Context Window 的本质与局限；Context Engineering 的定义与实操框架；Personal Context 为何是个人 AI 的护城河；三者如何构成从原料到输出的链路。

## 三级论证骨架
### 一、Context Window：不是提示词，而是有限、昂贵、易分心的工作记忆
#### 1.1 核心定义与资源属性
- Context Window 是 LLM 的“工作记忆”，且是极其昂贵、有限的资源。
  - Karpathy 强调两点：token 越多，模型越容易被“分心”，反而降低准确性；Context 是“精贵资源”，应像管理稀缺注意力一样管理。
#### 1.2 更大窗口不等于更好结果
- Drew Breunig 提出“Context Distraction”：Context 超过阈值后，模型开始机械重复历史行为，而不是真正推理。
  - 例：Llama 3.1 的 32k。
  - 结论：“Context 的质量远比数量重要。”

### 二、Context Engineering：从“魔法咒语”到系统工程
#### 2.1 定义与范式转移
- LangChain 的精炼定义：“Context Engineering = 构建动态系统，在正确的时间，以正确的格式，将正确的信息和工具提供给 LLM，使任务有可能被完成。”
- Philipp Schmid：“Most agent failures are not model failures anymore, they are context failures.”
  - 范式转移：AI 表现不好，根本原因不再是模型不够聪明，而是 Context 给错了、给少了、或者给乱了。
#### 2.2 实操框架与战术
- 中文文章「上下文工程已经30岁了」：Context Engineering = Collection（收集）× Management（管理）× Usage（使用）。
  - 三个维度正交，可独立优化。
- Drew Breunig 六种核心战术：RAG、Tool Loadout（工具配置）、Context Quarantine（隔离）、Context Pruning（裁剪）、Context Summarization（压缩）、Context Offloading（外置存储）。

### 三、Personal Context：覆盖最少但战略价值最高
#### 3.1 从 PKM 到 AI Partner
- 一泽Eze 文章区分普通 RAG 与真正有价值的 Personal Context 系统。
  - 普通 RAG 只是“关键词匹配 → 片段召回”。
  - 有价值系统是“多步检索 → 时间线重建 → 结合 Persona 推理 → 给出连本人都没想到的洞察”。
#### 3.2 反向视角：AI 需要“自己的人生”
- 评论尸提出，AI 若有“认知记忆模块”（学习模块、日记模块、价值信念模块），可展现“连续的认知发展”，而非每次对话从零开始。
  - 迁移到用户侧：人的 Personal Context 越丰富，AI 越能理解你。
#### 3.3 产品实现线索
- Anthropic 关于 Claude Code context management 的推文提到 context editing 和 memory tool，是 Personal Context 在产品层面的实现形式。
  - 材料说明：这是三个概念里 Readwise 覆盖最少、但战略价值最高的一个。

### 四、综合判断：2026 年的战略意义与三者关系
#### 4.1 Context 是新的“操作系统层”
- 模型基础能力趋于同质化，GPT、Claude、Gemini 差距缩小，真正竞争发生在 Context 层。
  - 谁掌握优质 Context 组装能力，谁就掌握 AI 的真正价值。
#### 4.2 Personal Context 是个人 AI 的“护城河”
- AI 的泛化能力是共享的，但 Personal Context 是私有的、不可复制的。
  - 原料：过去积累的笔记、思考框架（Munger OS、Tolstoy OS）、教学经验、投资判断。谁先系统化接入，谁的 AI 越聪明。
#### 4.3 Context Engineering 是 2026 年最值得深耕的“元技能”
- Karpathy 说这是“非常难”的艺术与科学的结合；但它可学习、可系统化。
  - 对作者而言，既是学习工具，也是可教给学员的核心方法论。
#### 4.4 三者关系链
- Personal Context（原料）→ Context Engineering（方法/系统）→ Context Window（运行时/工作记忆）→ 真正有价值的 AI 输出。
  - 概念网络：Context Window 是运行时容器；Context Distraction 警示质量陷阱；Context Engineering 决定放什么、怎么放、何时放；Personal Context 是原料层，决定 Context 质量上限。

## 作者边界、反例与不确定性
- 明确反例：更大 Context Window 不等于更好结果；超过阈值（如 Llama 3.1 的 32k），模型开始机械重复历史行为，而不是真正推理。
- Personal Context 是全文覆盖最少的部分：材料只列三条线索，并承认其 Readwise 覆盖最少、但战略价值最高；未给出完整定义、验证方法或系统化实施细节。
- 2026 年四条“核心判断”被标为整理者“结合你的框架”的综合判断，而非外部文献一致结论；其中“操作系统层”“护城河”“元技能”为判断性命名。
- 六种战术与三维框架来自不同文章，材料未展开各自适用条件、失败边界及彼此冲突。
- 概念网络图是“Codex 据原文概念网络文字整理（非原文配图）”，其关系链为整理性表达。
