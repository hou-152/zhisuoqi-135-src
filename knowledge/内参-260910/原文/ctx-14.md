# Coding Agent 如何工作：工具循环与上下文工程

- 标题：Coding Agent 如何工作：工具循环与上下文工程
- 来源：simonwillison.net
- 原文：https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/
- 作者：Simon Willison
- 类型：主题特刊
- 摘要：和今天多篇 AI coding / skill / agent 工具文章呼应，适合补足 coding agent 的基本工作机制。
- 收藏于：—（主题特刊；清单更新于 2026-08-02）
- 抓取：飞书主题精选·图文版快照（evidence/概念源-260913，SHA256SUMS 冻结）
- 字数：7228
- 策展人按：概念讲完补机制。这篇没什么惊喜，属于你必须知道但没人愿意专门写的那类东西。

---

- 原文标题：How coding agents work
- 作者：Simon Willison
- 内参日期：2026-05-26
- 来源类型：blog
- 原文：https://simonwillison.net/guides/agentic-engineering-patterns/how-coding-agents-work/#atom-everything
- 标签：agentic engineering, context engineering

和今天多篇 AI coding / skill / agent 工具文章呼应，适合补足 coding agent 的基本工作机制。

## 导读

旧文重读，coding agent是如何运作的？

## 核心观点

coding agent 并不是某种神秘的新物种。它的基本结构是：一个 LLM，被一层 harness 包住，再通过 system prompt、工具调用、状态重放和推理预算，变成可以读写代码、运行命令、调试问题的软件代理。理解这层机制，能帮助使用者更准确地判断 coding agent 能做什么、为什么会变贵、为什么会出错，以及怎样更好地驱动它。

## coding agent 的底层仍然是 LLM

### LLM 是补全文本的模型

- 文章先把 LLM 降维到最朴素的定义：它是能根据已有文本预测后续内容的机器学习模型。
- 从简单句子补全到代码片段补全，能力差异来自模型规模、训练数据和上下文处理能力的增长。
- 这个解释有意把 coding agent 从“会写代码的助手”还原为“可被 prompt 驱动的文本补全机器”，后面的工具循环都建立在这个基础上。

### LLM 处理的是 token，不是自然语言中的词

- 文本会被转换为整数 token 序列，模型实际消费和生成的是这些 token。
- token 机制解释了两个关键约束：模型供应商按 token 计费；模型一次能处理的上下文也受 token 窗口限制。
- 对 coding agent 来说，这意味着每一次读文件、贴日志、追加对话，都会变成更长的输入成本。

### prompt 与 completion 是所有交互的基本单位

- 输入模型的是 prompt，模型返回的是 completion 或 response。
- 后来的聊天界面、工具调用、系统提示，本质上都只是更复杂的 prompt 编排。
- 用户看到的是“对话”，模型看到的是一段按特定格式拼好的输入文本。

## 聊天界面是一种模拟出来的状态

### chat template 只是 completion prompt 的特殊格式

- 早期模型更像纯补全引擎，后来为了易用性，产品把交互包装成 user / assistant 的聊天格式。
- 这种聊天并不改变模型本质：软件把历史消息拼成一个特殊格式的 prompt，然后让模型继续补全 assistant 的下一段内容。
- 所谓“模型在聊天”，其实是 harness 在持续重建一段模拟对话。

### LLM 是无状态的，状态由外部软件维护

- 每次调用模型时，模型都从空白状态开始。
- 为了维持连续对话，agent harness 必须把已有消息、工具结果和上下文重新发给模型。
- 这解释了为什么长对话越来越昂贵：输入 token 随历史增长，缓存命中也变成工程优化重点。

### cached input tokens 影响 coding agent 的设计

- 供应商通常会对近期重复的输入前缀提供更低价格，因为底层计算可以复用。
- coding agent 会尽量避免修改早期对话内容，以便最大化缓存命中。
- 因此，一些看起来笨重的上下文组织方式，背后其实是在为成本和延迟做折中。

## agent 的关键能力来自工具调用

### agent 与普通 LLM 的分界线是 tools

- 文章给出的定义很直接：agent 是能调用工具的 LLM 系统。
- 工具不是模型内部天然拥有的能力，而是 harness 提供给模型的可调用函数。
- 对 coding agent 来说，工具通常包括读取文件、修改文件、执行 shell、运行 Python、搜索项目、访问外部 API 等。

### 工具调用本质上是 prompt 协议

- harness 会在 system prompt 里告诉模型：什么时候可以调用什么工具，以及调用格式是什么。
- 模型输出一个符合约定的工具调用文本，harness 解析它、执行真实函数，再把结果塞回下一轮 prompt。
- 模型并不是自己运行命令；它是在“请求”外层软件运行命令。

### 工具结果会重新进入上下文循环

- 工具执行后的结果会被包装成一条新的上下文消息。
- 模型在下一轮看到这个结果，再决定回答用户、继续调用工具，还是调整方案。
- coding agent 的实际工作方式就是：模型提出下一步，harness 执行，结果返回模型，如此循环。

## system prompt 是 agent 行为的隐形操作手册

### system prompt 定义 agent 的角色、边界和工具协议

- 用户通常看不到 system prompt，但它会在每次会话开始时给模型注入一整套行为规则。
- 这些规则可以很长，覆盖语气、任务边界、工具调用方式、文件编辑策略、安全约束和最终汇报格式。
- coding agent 的“性格”和工作习惯，很大一部分来自这份隐形说明书。

### system prompt 与工具一起构成 harness 的核心

- 只给模型工具还不够，还需要告诉它怎样、何时、以什么格式使用工具。
- system prompt 把模型的自然语言能力导向一个可执行流程。
- 因此，coding agent 的产品差异不只在模型，也在 prompts、工具集合、权限模型和循环控制。

## reasoning 增加了 agent 处理复杂问题的能力

### reasoning 是让模型在回答前花更多 token 思考

- reasoning 或 thinking 指模型在给出最终答复前，用额外步骤分析问题、比较路径、推演解决方案。
- 它的价值不在于形式上像人思考，而在于给模型更多计算预算。
- 对复杂代码任务来说，更多预算通常意味着更好的路径搜索和错误排查。

### debugging 特别依赖 reasoning 与工具混合循环

- 调试代码时，模型需要跟踪函数调用、读取日志、运行测试、定位异常来源。
- reasoning 阶段可以帮助模型在多条线索之间维持假设，并决定下一次工具调用。
- 这也是 coding agent 往往提供 reasoning effort 档位的原因：难题需要更多“咀嚼”时间。

## LLM + system prompt + tools in a loop 就是基本 agent

### 简单 agent 的机械结构并不复杂

- 文章最后强调，搭出最小 agent 并不需要神秘技术。
- 一个 LLM API、一份 system prompt、一组可调用工具、一个把工具结果回灌给模型的循环，就能构成基础版本。
- 这个朴素描述很重要：它让使用者看到 agent 的可解释边界。

### 好的 tool loop 才是真正的工程难点

- 几十行代码可以做出简单工具循环，但可靠、可控、便宜、好用的循环要复杂得多。
- 真实产品还要处理权限、错误恢复、上下文压缩、缓存、并发、用户确认、安全边界、工具输出格式和失败回退。
- 所以 coding agent 的核心不是“模型会写代码”这一个点，而是整套 harness 工程。

## 关键概念/术语

- **harness**：包裹 LLM 的软件层，负责维护状态、注入提示、暴露工具、解析工具调用并把结果送回模型。
- **chat templated prompts**：把补全任务包装成聊天格式的 prompt，使模型像是在与用户对话。
- **stateless**：模型本身不记得上一轮，所有连续性都来自外部软件重放历史。
- **cached input tokens**：重复输入前缀被缓存后可以降低成本，影响 agent 的上下文设计。
- **tools**：harness 提供给模型请求调用的函数，是 agent 区别于普通聊天模型的核心。
- **system prompt**：隐藏的行为说明书，定义 agent 如何说话、如何用工具、如何遵守边界。
- **reasoning**：模型在最终回答前使用更多 token 进行分析，有助于复杂代码路径和调试任务。
- **tool loop**：模型请求工具、harness 执行、结果回灌、模型继续决策的循环。

## 概念网络

针对 *How coding agents work*（Simon Willison's Weblog, [simonwillison.net](http://simonwillison.net/)）的概念提取

### 核心概念解析（Core Concepts）

### coding agent（编码代理）

- **context**：

文章把它定义为由 harness 包住的 LLM，并通过工具获得额外能力。

- **费曼一下**：coding agent 不是“一个会写代码的模型”，而是一套把模型接到文件系统、终端、代码执行器和项目上下文上的软件系统。

### harness（代理外壳）

- **context**：

原文用 “harness” 指包裹 LLM 的软件层。

- **费曼一下**：harness 是真正把 LLM 变成 agent 的外层机器：它维护对话、注入规则、开放工具、解析工具请求，并把执行结果重新交给模型。

### LLM（Large Language Model）

- **context**：

文章先把 LLM 还原成文本补全模型。

- **费曼一下**：LLM 的基本能力是根据输入预测接下来最可能的 token；coding agent 的全部高级行为，都是建立在这个补全能力之上的工程编排。

### tokens（token 序列）

- **context**：

模型处理 token，而不是直接处理词。

- **费曼一下**：token 是模型真正看到的输入单位，也决定了成本、上下文长度和每次 agent 操作能塞进多少信息。

### prompt / completion（提示与补全）

- **context**：

输入叫 prompt，输出叫 completion 或 response。

- **费曼一下**：所有聊天、工具调用和 agent 步骤，归根到底都是在构造一个 prompt，然后让模型补全下一段。

### multimodal / Vision LLMs（多模态与视觉模型）

- **context**：

图像也会转成模型可处理的 token。

- **费曼一下**：多模态不是在旁边外挂一个 OCR 工具，而是把图片、截图、草图等输入纳入同一套模型 token 处理流程。

### chat templated prompts（聊天模板化提示）

- **context**：

聊天格式只是 completion prompt 的特殊包装。

- **费曼一下**：模型并没有天然“记住聊天”；产品把 user / assistant 的历史拼成模板，让模型继续补全下一条 assistant 消息。

### stateless（无状态）

- **context**：

每次调用模型都从空白状态开始。

- **费曼一下**：模型本身没有会话记忆；agent 的连续性来自外层软件每次把历史上下文重新发给模型。

### cached input tokens（缓存输入 token）

- **context**：

共同前缀可被缓存并降低处理成本。

- **费曼一下**：如果前面一大段上下文保持不变，供应商可以复用部分计算；所以 coding agent 会尽量不改早期上下文，以换取更低成本和更好延迟。

### tools（工具）

- **context**：

agent 的定义性特征是可以调用工具。

- **费曼一下**：工具是 harness 暴露给模型的函数入口。模型负责提出调用请求，真正的文件读取、命令执行或 API 调用由 harness 完成。

### system prompt（系统提示）

- **context**：

coding agent 会以用户不可见的系统提示开场。

- **费曼一下**：system prompt 是 agent 的隐形操作手册，规定它的角色、权限、工具格式、协作方式和安全边界。

### reasoning / thinking（推理/思考）

- **context**：

reasoning 让模型花更多时间和 token 推演问题。

- **费曼一下**：reasoning 是给模型更多计算预算，让它在回答前先整理假设、追踪代码路径、比较解决方案，尤其适合调试。

### reasoning effort（推理强度）

- **context**：

coding agents 可调高或调低 reasoning effort。

- **费曼一下**：这是 agent 在速度、成本和质量之间的旋钮；难题值得多花 token，简单任务不一定需要。

### tool loop（工具循环）

- **context**：

LLM、system prompt、tools 形成循环。

- **费曼一下**：tool loop 是 agent 的心跳：模型决定下一步，harness 执行工具，结果回到模型，模型再决定下一步。

### 概念网络（Concept Network）

![图片展示了Coding Agent工作流程中的概念网络图。左侧从System Prompt出发，经工具定义、模型决策、工具调用、执行后，进入观察回流；右侧从无状态LLM出发，经Harness重放历史，进入Coding Agent，再经执行、观察回流。箭头表示各环节的流程方向，如System Prompt到工具定义，Harness重放历史到Coding Agent等。该图与上下文紧密相关，直观呈现了Coding Agent的底层框架、主干逻辑链等关键内容。](https://internal-api-drive-stream.feishu.cn/space/api/box/stream/download/authcode/?code=ZGFmYTEzMmFiMGMwNDIzZmZjNzcxMTU1YzljYjY1NzZfYjIyYjFkM2U3ZmM3MjkyMmMwOWIzZWE4MTJiYzVhNDRfSUQ6NzY2OTUxNjYyMzA4MTk1MDE2NV8xNzg2NTU0ODg2OjE3ODY1NTg0ODZfVjM)

*概念网络图｜Codex 据原文概念网络文字整理（非原文配图）*

**底层框架**：coding agent = LLM 的补全能力 + harness 的状态管理 + system prompt 的行为规约 + tools 的外部行动能力 + reasoning 的计算预算。

**主干逻辑链**：

- **LLM** 提供语言与代码补全能力，但它只处理 **tokens**，并且每次调用都是 **stateless**。
- 因为模型无状态，harness 必须用 **chat templated prompts** 重放历史，让用户看到连续对话。
- 因为历史重放会增加 token 成本，agent 设计会利用 **cached input tokens**，尽量保持早期上下文稳定。
- **system prompt** 把模型的补全能力约束成可协作的角色，并说明可用 **tools** 与调用格式。
- **tools** 让模型的文本输出变成真实世界的动作请求；harness 执行后把结果送回上下文。
- **tool loop** 把以上机制连成循环，于是普通 LLM 被组织成 coding agent。
- **reasoning** 和 **reasoning effort** 决定 agent 在复杂代码路径、调试和方案选择上愿意花多少计算预算。

**辅助逻辑链**：

- **multimodal / Vision LLMs** 扩展了输入形态，但没有改变核心机制：不同输入最终仍要进入模型可处理的 token 流。
- 简单 tool loop 很容易搭出来，但可靠的 coding agent 要处理权限、错误恢复、上下文管理、成本、缓存、安全边界和用户确认。

**一句话总结概念网络**：

coding agent 的本质不是“更聪明的聊天框”，而是用 harness 把无状态 LLM、隐藏规则、工具执行和推理预算组织成一个可循环行动的软件系统。

---
