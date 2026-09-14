# 什么是 Context？

- 标题：什么是 Context？
- 来源：AI 内参主题精选
- 原文：
- 作者：未署名
- 类型：主题特刊
- 摘要：将 AI 交互中的「Context」从「提示词」升级为「工作记忆」思维框架，帮助更系统地理解上下文窗口的本质与局限。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：4894
- 策展人按：最基础的一篇压到最后，是故意的。前面 25 篇都在讲怎么做，收尾这篇负责让你回头确认自己到底在做什么。

---

- 原文标题：一、什么是 Context？——从"提示词"到"工作记忆"的认知跃迁
- 作者：howie.serious
- 内参日期：2026-02-20
- 来源类型：blog
- 原文：https://readwise.io/reader/shared/01khwm8y8twkr9g7f66wh459qf
- 标签：工具技巧, ai 时代

将 AI 交互中的「Context」从「提示词」升级为「工作记忆」思维框架，帮助更系统地理解上下文窗口的本质与局限。



## 什么是 Context？——从"提示词"到"工作记忆"的认知跃迁

你的 Readwise 里收录了 Andrej Karpathy、Tobi Lutke（Shopify CEO）、Simon Willison 等人关于这个词的讨论，核心观点惊人一致：

**Context Window 是 LLM 的"工作记忆"**（Karpathy 语），而且是极其昂贵的、有限的资源。

Karpathy 特别强调两点：

1. Context 里的 token 越多，模型越容易被"分心"，反而降低准确性；
2. Context 是个"精贵资源"，应该像管理稀缺注意力一样管理它。

Drew Breunig 的文章则进一步揭示了一个反直觉的真相：**更大的 Context Window 不等于更好的结果**。他提出了"Context Distraction"这个概念——当 Context 超过某个阈值（比如 Llama 3.1 的 32k），模型开始机械重复历史行为，而不是真正推理。这意味着：Context 的质量远比数量重要。



## 什么是 Context Engineering？——从"魔法咒语"到"系统工程"

你收录的多篇文章都在讨论这个词的定义，最精炼的版本来自 LangChain：

**Context Engineering = 构建动态系统，在正确的时间，以正确的格式，将正确的信息和工具提供给 LLM，使任务有可能被完成。**

Philipp Schmid（Hugging Face）说得非常直接：

**"Most agent failures are not model failures anymore, they are context failures."**

这句话是一个重要的范式转移。以前我们认为 AI 表现不好是模型不够聪明，现在越来越清晰：**失败的根本原因是 Context 给错了、给少了、或者给乱了。**

你的库里还有一篇中文文章「上下文工程已经30岁了」，提出了一个非常系统的框架：

**Context Engineering = Collection（收集）× Management（管理）× Usage（使用）**

这三个维度是正交的，可以独立优化，非常适合作为实操框架。

Drew Breunig 还整理了六种核心战术：RAG、Tool Loadout（工具配置）、Context Quarantine（隔离）、Context Pruning（裁剪）、Context Summarization（压缩）、Context Offloading（外置存储）。



## 什么是 Personal Context？——这是你提出的最有价值的问题

这是三个概念里，**你的 Readwise 覆盖最少、但战略价值最高的一个**。

你库里有几条相关线索：

**线索1：从 PKM 到 AI Partner（一泽Eze 的文章）**

这篇文章描述了用个人笔记打造"专属 AI 助理"的实践，核心洞察是：普通 RAG 只是"关键词匹配 → 片段召回"，而真正有价值的 Personal Context 系统是"多步检索 → 时间线重建 → 结合 Persona 推理 → 给出连本人都没想到的洞察"。这正是 Personal Context 的潜力所在。

**线索2：AI 需要有自己的人生（评论尸）**

这篇文章从反向视角切入：如果 AI 有了自己的"认知记忆模块"（学习模块、日记模块、价值信念模块），它就能展现"连续的认知发展"，而不是每次对话从零开始。这个思路其实也适用于用户侧——**人的 Personal Context 越丰富，AI 越能理解你**。

**线索3：Claude 的 Memory System（即你现在正在使用的）**

你库里有 Anthropic 关于 Claude Code context management 的推文，提到了 context editing 和 memory tool——这正是 Personal Context 在产品层面的实现形式。



## 综合视角：2026 年的战略意义

结合你的框架，我的核心判断是：

**1. Context 是新的"操作系统层"**

模型的基础能力趋于同质化（GPT、Claude、Gemini 的差距在缩小），真正的竞争发生在 Context 层。谁掌握了优质的 Context 组装能力，谁就掌握了 AI 的真正价值。

**2. Personal Context 是个人 AI 的"护城河"**

你的判断非常准确——AI 的泛化能力是共享的，但 Personal Context 是私有的、不可复制的。你过去几年积累的笔记、思考框架（Munger OS、Tolstoy OS）、教学经验、投资判断，这些都是你独有的 Personal Context 原料。谁先把它系统化地接入 AI，谁的 AI 就越聪明。

**3. Context Engineering 是 2026 年最值得深耕的"元技能"**

就像 Karpathy 说的，这是"非常难"的艺术与科学的结合。但它也是可学习的、可系统化的。对你而言，这既是你自己的学习工具，也是你可以教给学员的核心方法论。

**4. 三者的关系**

**代码块：plain text**

Personal Context（原料）

    → Context Engineering（方法/系统）

        → Context Window（运行时/工作记忆）

            → 真正有价值的 AI 输出



这条链路，就是你所说的"让 AI 在个人手中发挥强大价值"的完整路径。



## 概念网络

### 核心概念解析

- **【Context Window】（上下文窗口）**
- **context**：

"Context Window 是 LLM 的'工作记忆'"（Karpathy 语），而且是极其昂贵的、有限的资源。Context 里的 token 越多，模型越容易被'分心'，反而降低准确性。

- **费曼一下**：Context Window 是 LLM 在一次对话中能"看到"的全部信息总量，相当于人类的工作记忆。它有上限，超出就会遗忘；它很昂贵，内容越多模型越容易分心。核心原则：Context 的质量远比数量重要。
- **【Context Distraction】（上下文分心效应）**
- **context**：

当 Context 超过某个阈值（比如 Llama 3.1 的 32k），模型开始机械重复历史行为，而不是真正推理。更大的 Context Window 不等于更好的结果。

- **费曼一下**：Context 塞得越多不等于越好。超过某个阈值后，模型反而被"淹没"，开始走捷径而非推理，出现退行行为。质量 > 数量。
- **【Context Engineering】（上下文工程）**
- **context**：

"Context Engineering = 构建动态系统，在正确的时间，以正确的格式，将正确的信息和工具提供给 LLM，使任务有可能被完成。"（LangChain）

"Most agent failures are not model failures anymore, they are context failures."（Philipp Schmid, Hugging Face）

- **费曼一下**：不是写提示词，而是设计一套系统，让正确的信息在正确的时刻送达 LLM。核心范式转移：AI 失败多数不是模型不够聪明，而是 Context 给错了、给少了、给乱了。可拆解为三维框架：Collection（收集）× Management（管理）× Usage（使用）。六种核心战术：RAG、Tool Loadout、Context Quarantine、Context Pruning、Context Summarization、Context Offloading。
- **【Personal Context】（个人上下文）**
- **context**：

AI 的泛化能力是共享的，但 Personal Context 是私有的、不可复制的。你过去几年积累的笔记、思考框架、教学经验、投资判断，这些都是你独有的 Personal Context 原料。谁先把它系统化地接入 AI，谁的 AI 就越聪明。

- **费曼一下**：个人长期积累的知识、经验、思维框架——这些构成你专属的 Context 原料库。与通用 AI 的本质区别在于：Personal Context 是私有的、不可复制的护城河。将其系统化接入 AI，是个人 AI 能力的核心杠杆。

### 概念网络

![图片展示了Context相关概念的流程图。Personal Context是原料层，经Context Engineering方法/系统处理，与Context Distraction共同作用于Context Window，后者再生成高质量AI输出。Context Distraction对Context Window有损害窗口质量的影响。该图与上下文紧密相关，直观呈现了Personal Context、Context Engineering、Context Distraction、Context Window及高质量AI输出之间的关系，是上下文对Context概念网络图的可视化呈现。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=NGE5YmZkN2ZkODIyN2MzNDVjMzAzMDZkYWYxM2YxOGFfOTc2NWRlZjYxZDg4NDJmZDE1MjljYzBhMmE5ZmY5MmZfSUQ6NzY2OTUxNjU4NzY5MDQxMzA0NF8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

- **Context Window** 是运行时容器——LLM 的工作记忆，有限且昂贵
- **Context Distraction** 是对"多即是好"的警示——揭示 Context Window 存在质量陷阱，超过阈值反而有害
- **Context Engineering** 是管理 Context Window 的方法论——决定往容器里放什么、怎么放、何时放
- **Personal Context** 是 Context Engineering 的原料层——个人知识库决定了 Context 的质量上限
- 四者关系链：**Personal Context**（原料）→ **Context Engineering**（方法/系统）→ **Context Window**（运行时容器）→ 高质量 AI 输出
