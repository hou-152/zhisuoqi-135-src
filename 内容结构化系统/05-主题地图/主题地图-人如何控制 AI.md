# 主题地图：人如何控制 AI

> 生成于 2026-09-13｜分类 id：`human-control`｜图鉴站分类轴第 5 类

## 主题定义

这一块要回答的问题是：**人怎样说明目标、复用方法并限制行动？**

本分类共 14 个概念，占 76 个概念的 18%。

## 核心问题单元

- [[QST-CAT-human-control_人怎样说明目标、复用方法并限制行动？]]（整个分类的入口问题）
- [[QST-human-escalation-tool-call_能不能讲清「人类升级工具调用」]]
- [[QST-agent-elicitation_能不能讲清「Agent 信息引出」]]
- [[QST-prompt-engineering_能不能讲清「提示词工程」]]
- [[QST-harness-compute-separation_能不能讲清「Harness 与计算分离」]]
- [[QST-system-prompt-altitude_能不能讲清「系统提示抽象高度」]]
- [[QST-prompt_能不能讲清「提示」]]
- [[QST-sandbox_能不能讲清「沙箱」]]
- [[QST-agent-stop-conditions_能不能讲清「Agent 终止条件」]]
- 另有 6 个概念的检验问题，见 02-内容单元库/问题单元/

## 核心概念单元

- [[CON-human-escalation-tool-call_人类升级工具调用]]
- [[CON-agent-elicitation_Agent 信息引出]]
- [[CON-prompt-engineering_提示词工程]]
- [[CON-harness-compute-separation_Harness 与计算分离]]
- [[CON-system-prompt-altitude_系统提示抽象高度]]
- [[CON-prompt_提示]]
- [[CON-sandbox_沙箱]]
- [[CON-agent-stop-conditions_Agent 终止条件]]
- [[CON-permission-boundary_权限边界]]
- [[CON-reasoning-effort_推理强度]]
- [[CON-skill_Agent Skill]]
- [[CON-system-prompt_系统提示]]
- [[CON-guardrails_护栏]]
- [[CON-instruction-locality_指令就近原则]]

## 核心观点单元

- [[OPI-CTX-01-06_今天把 context 窄化成--对话历史 - 系统提示词--，作者判定为一种倒退（a step b…]] —— 今天把 context 窄化成\"对话历史 / 系统提示词\"，作者判定为一种倒
- [[OPI-CTX-07-01_文章把 Loop Engineering 定义为 Prompt Engineering、Cont…]] —— 文章把 Loop Engineering 定义为 Prompt Engineer
- [[OPI-CTX-20-01_这是一份第三方抓取并公开的 Claude Opus 5 系统提示词副本，抓取时间标注为 2026…]] —— 这是一份第三方抓取并公开的 Claude Opus 5 系统提示词副本，抓取时间
- [[OPI-CTX-20-02_全文最重要的观察不是--泄露了什么秘密--，而是系统提示词的体裁已经变了：它不再是一份人格简介或语气…]] —— 全文最重要的观察不是\"泄露了什么秘密\"，而是系统提示词的体裁已经变了：它不再
- [[OPI-CTX-21-02_这些旧实践有一个共同的形状：用显式约束替模型做决定——给死规则、给示例、把一切前置、反复强调。它…]] —— 这些旧实践有一个共同的形状：用显式约束替模型做决定——给死规则、给示例、把一切前
- [[OPI-CTX-22-01_你发给 Claude 的那条 prompt，只是它实际拿到的上下文的一小部分。真正决定结果的，是…]] —— 你发给 Claude 的那条 prompt，只是它实际拿到的上下文的一小部分。真
- [[OPI-CTX-22-03_更棘手的是，这套指引会随着 Claude 自身能力进化而过时。Anthropic 团队最近发现了…]] —— 更棘手的是，这套指引会随着 Claude 自身能力进化而过时。Anthropic
- [[OPI-CTX-22-04_结论不是--提示词写得越细越好--，而是相反：过去那些为了兜住最坏情况而加的强约束，正在变成新一代模…]] —— 结论不是\"提示词写得越细越好\"，而是相反：过去那些为了兜住最坏情况而加的强约
- [[OPI-CTX-24-01_AI 领域的对话正在从「提示词工程」（prompt engineering）转向一个更宽、也更有…]] —— AI 领域的对话正在从「提示词工程」（prompt engineering）转向
- [[OPI-CTX-24-06_构建强大可靠的 agent，正在越来越少地关于「找到一个魔法提示词」或「等模型升级」，越来越多地…]] —— 构建强大可靠的 agent，正在越来越少地关于「找到一个魔法提示词」或「等模型升
- 另有 9 条，见 02-内容单元库/观点单元/

## 核心案例单元

- [[CAS-human-escalation-tool-call_人类升级工具调用：一个具体场景]]
- [[CAS-agent-elicitation_Agent 信息引出：一个具体场景]]
- [[CAS-prompt-engineering_提示词工程：一个具体场景]]
- [[CAS-harness-compute-separation_Harness 与计算分离：一个具体场景]]
- [[CAS-system-prompt-altitude_系统提示抽象高度：一个具体场景]]
- [[CAS-prompt_提示：一个具体场景]]
- 另有 8 个，见 02-内容单元库/案例单元/（全部为假设场景，见单元内 case_type）

## 核心方案单元

- [[SOL-human-escalation-tool-call_人类升级工具调用：可执行动作路径]]
- [[SOL-agent-elicitation_Agent 信息引出：可执行动作路径]]
- [[SOL-prompt-engineering_提示词工程：可执行动作路径]]
- [[SOL-harness-compute-separation_Harness 与计算分离：可执行动作路径]]
- [[SOL-system-prompt-altitude_系统提示抽象高度：可执行动作路径]]
- [[SOL-prompt_提示：可执行动作路径]]
- 另有 8 个，见 02-内容单元库/方案单元/

## 常见装配路径

1. 问题：[[QST-CAT-human-control_人怎样说明目标、复用方法并限制行动？]]
2. 概念：[[CON-human-escalation-tool-call_人类升级工具调用]]
3. 观点：[[OPI-CTX-01-06_今天把 context 窄化成--对话历史 - 系统提示词--，作者判定为一种倒退（a step b…]]
4. 案例：[[CAS-human-escalation-tool-call_人类升级工具调用：一个具体场景]]
5. 方案：[[SOL-human-escalation-tool-call_人类升级工具调用：可执行动作路径]]

## 相关主题

- 眼前真正有什么（`current-view`）：[[QST-CAT-current-view_模型此刻到底看见了什么，又能处理多少？]]
- 信息平时放在哪里（`information-storage`）：[[QST-CAT-information-storage_哪些信息会被保留，任务进度又记在哪里？]]
- AI 如何持续行动（`continuous-action`）：[[QST-CAT-continuous-action_为什么 AI 能连续做事，而不只回答一次？]]
- AI 如何接触外部世界（`external-access`）：[[QST-CAT-external-access_AI 靠什么读取、计算或改变外部世界？]]
- 信息如何进入工作台（`context-delivery`）：[[QST-CAT-context-delivery_什么信息应在什么时候、以什么形式进入？]]
- 做完后凭什么相信（`result-trust`）：[[QST-CAT-result-trust_Agent 说做完之后，凭什么相信它真的完成？]]
