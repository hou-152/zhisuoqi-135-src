# 主题地图：AI 如何接触外部世界

> 生成于 2026-09-13｜分类 id：`external-access`｜图鉴站分类轴第 4 类

## 主题定义

这一块要回答的问题是：**AI 靠什么读取、计算或改变外部世界？**

本分类共 8 个概念，占 76 个概念的 11%。

## 核心问题单元

- [[QST-CAT-external-access_AI 靠什么读取、计算或改变外部世界？]]（整个分类的入口问题）
- [[QST-agent-tool-contract_能不能讲清「Agent 工具契约」]]
- [[QST-tool-schema-tax_能不能讲清「工具 Schema 税」]]
- [[QST-agent-action-space_能不能讲清「Agent 行动空间」]]
- [[QST-tool_能不能讲清「工具」]]
- [[QST-tool-scoping_能不能讲清「工具收窄」]]
- [[QST-model-context-protocol_能不能讲清「模型上下文协议」]]
- [[QST-code-execution_能不能讲清「代码执行」]]
- [[QST-tool-workflow-fit_能不能讲清「工具—工作流适配」]]


## 核心概念单元

- [[CON-agent-tool-contract_Agent 工具契约]]
- [[CON-tool-schema-tax_工具 Schema 税]]
- [[CON-agent-action-space_Agent 行动空间]]
- [[CON-tool_工具]]
- [[CON-tool-scoping_工具收窄]]
- [[CON-model-context-protocol_模型上下文协议]]
- [[CON-code-execution_代码执行]]
- [[CON-tool-workflow-fit_工具—工作流适配]]

## 核心观点单元

- [[OPI-CTX-04-05_六条局部最优：围绕 KV-cache 设计、掩码而非移除工具、把文件系统当上下文、通过复述操纵注…]] —— 六条局部最优：围绕 KV-cache 设计、掩码而非移除工具、把文件系统当上下文
- [[OPI-CTX-20-01_这是一份第三方抓取并公开的 Claude Opus 5 系统提示词副本，抓取时间标注为 2026…]] —— 这是一份第三方抓取并公开的 Claude Opus 5 系统提示词副本，抓取时间
- [[OPI-CTX-24-05_上下文工程的定义：设计并构建动态系统，在正确的时间、以正确的格式，提供正确的信息与工具，让 LL…]] —— 上下文工程的定义：设计并构建动态系统，在正确的时间、以正确的格式，提供正确的信息
- [[OPI-CTX-A1-01_GitHub 把 Copilot code review 的专用代码探索工具换成维护更好、可被多…]] —— GitHub 把 Copilot code review 的专用代码探索工具换成
- [[OPI-CTX-A1-02_回归并不是工具能力不足，而是工具说明把代码审查 agent 引向了通用 coding assis…]] —— 回归并不是工具能力不足，而是工具说明把代码审查 agent 引向了通用 codi
- [[OPI-CTX-A1-04_经过 benchmark trace 的反复调试，新工作流在生产中把平均 review cost…]] —— 经过 benchmark trace 的反复调试，新工作流在生产中把平均 rev
- [[OPI-CTX-A1-05_同一套指令放到 Copilot CLI 并没有取得同样收益，因为 CLI 面向宽泛、交互式、可转…]] —— 同一套指令放到 Copilot CLI 并没有取得同样收益，因为 CLI 面向宽
- [[OPI-HAR-01-02_核心判断：她认可 harness 这个词。OpenAI 那篇文章标题里挂着 harness，正文…]] —— 核心判断：她认可 harness 这个词。OpenAI 那篇文章标题里挂着 ha
- [[OPI-HAR-02-05_推导出的核心组件依次是：文件系统 → bash 与代码执行 → 沙箱与默认工具链 → 记忆与搜索…]] —— 推导出的核心组件依次是：文件系统 → bash 与代码执行 → 沙箱与默认工具链
- [[OPI-HAR-03-02_agent runtime 需要的正是这个东西。LLM 是引擎，工具是外设，memory 是存储…]] —— agent runtime 需要的正是这个东西。LLM 是引擎，工具是外设，me
- 另有 13 条，见 02-内容单元库/观点单元/

## 核心案例单元

- [[CAS-agent-tool-contract_Agent 工具契约：一个具体场景]]
- [[CAS-tool-schema-tax_工具 Schema 税：一个具体场景]]
- [[CAS-agent-action-space_Agent 行动空间：一个具体场景]]
- [[CAS-tool_工具：一个具体场景]]
- [[CAS-tool-scoping_工具收窄：一个具体场景]]
- [[CAS-model-context-protocol_模型上下文协议：一个具体场景]]
- 另有 2 个，见 02-内容单元库/案例单元/（全部为假设场景，见单元内 case_type）

## 核心方案单元

- [[SOL-agent-tool-contract_Agent 工具契约：可执行动作路径]]
- [[SOL-tool-schema-tax_工具 Schema 税：可执行动作路径]]
- [[SOL-agent-action-space_Agent 行动空间：可执行动作路径]]
- [[SOL-tool_工具：可执行动作路径]]
- [[SOL-tool-scoping_工具收窄：可执行动作路径]]
- [[SOL-model-context-protocol_模型上下文协议：可执行动作路径]]
- 另有 2 个，见 02-内容单元库/方案单元/

## 常见装配路径

1. 问题：[[QST-CAT-external-access_AI 靠什么读取、计算或改变外部世界？]]
2. 概念：[[CON-agent-tool-contract_Agent 工具契约]]
3. 观点：[[OPI-CTX-04-05_六条局部最优：围绕 KV-cache 设计、掩码而非移除工具、把文件系统当上下文、通过复述操纵注…]]
4. 案例：[[CAS-agent-tool-contract_Agent 工具契约：一个具体场景]]
5. 方案：[[SOL-agent-tool-contract_Agent 工具契约：可执行动作路径]]

## 相关主题

- 眼前真正有什么（`current-view`）：[[QST-CAT-current-view_模型此刻到底看见了什么，又能处理多少？]]
- 信息平时放在哪里（`information-storage`）：[[QST-CAT-information-storage_哪些信息会被保留，任务进度又记在哪里？]]
- AI 如何持续行动（`continuous-action`）：[[QST-CAT-continuous-action_为什么 AI 能连续做事，而不只回答一次？]]
- 人如何控制 AI（`human-control`）：[[QST-CAT-human-control_人怎样说明目标、复用方法并限制行动？]]
- 信息如何进入工作台（`context-delivery`）：[[QST-CAT-context-delivery_什么信息应在什么时候、以什么形式进入？]]
- 做完后凭什么相信（`result-trust`）：[[QST-CAT-result-trust_Agent 说做完之后，凭什么相信它真的完成？]]
