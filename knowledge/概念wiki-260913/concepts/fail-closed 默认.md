---
id: cm_558fd935
name: fail-closed 默认
type: CONCEPTUAL
subject: Context Engineering
domain: safety-governance
learningStage: now
verification: judge
centrality: 0.072
depth: 0
origin: [context]
aliases: []
sources: 1
---

# fail-closed 默认

> 不确定时默认拒绝或降级：宁可误伤少量无害请求，也不放过可能造成严重伤害的输出。

**领域** safety-governance ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.072

## 费曼一下

两类错误不对称时，就把默认值压向代价小的那一侧，并且接受由此产生的误伤。承认"我们会误伤，这是设计的一部分"，比声称"我们能精准区分"更诚实也更稳。

## 原文 context

安全路由被明说是刻意调保守的，会误伤无害请求，平均在不到 5% 的会话中触发；不确定要不要建议深度研究时选择不建议，理由是忍住一个建议是小损失而给别人的危机编档案是严重的；进食障碍迹象出现后，整场会话其他地方也不再给精确数字。

## 掌握证据（做到这些才算会）

- 能说明该准则下误伤率与漏放风险的取舍
- 能举出触发整场会话降级的例子（如进食障碍迹象后不再给数字）

## 验收问句

> 为什么 {{name}} 宁愿误伤也不愿放过？

## 懂了它才能懂（解锁 1）

- [[Guardrails]] — 护栏不通过即快速失败，其失败语义取自 fail-closed 默认

## 相关

- [[meaningful uplift 判据]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[上下文即不可信输入]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[stated 出处纪律]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[记忆须改变回答实质]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[首次匹配即停路由]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[版权合规硬上限]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[会话级累积判断]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[第三方连接器 opt-in]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[安全路由与能力分层]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[遗漏式隐私]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[preferences 写入过滤]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[默认帮助的高门槛拒绝]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[默认帮助的高门槛拒绝]] · related-to（audit） — fail-closed 与默认帮助的高门槛拒绝是对立的两种默认立场（一默认拒、一默认帮），属对照关系而非前置；不懂 fail-closed 完全能懂高门槛拒绝，最多靠反衬更清晰。
- [[跨会话记忆文件系统]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[判定程序化写法]] · 同篇出现（co-occurrence） — 同篇出现：context-20
- [[反自我合理化条款]] · 同篇出现（co-occurrence） — 同篇出现：context-20

## 出场

- Context Engineering ｜ 《Opus 5 系统提示词全文流出：一份近两万字的 agent 行为说明书》 ｜ https://github.com/Eversmile12/leaked-llm-prompts/blob/main/Anthropic/opus-5.md
## 反链

- [[Guardrails]]
- [[默认帮助的高门槛拒绝]]
- [[判定程序化写法]]
- [[上下文即不可信输入]]
- [[安全路由与能力分层]]
- [[第三方连接器 opt-in]]
- [[反自我合理化条款]]
- [[记忆须改变回答实质]]
- [[跨会话记忆文件系统]]
- [[meaningful uplift 判据]]
- [[stated 出处纪律]]
- [[版权合规硬上限]]
- [[会话级累积判断]]
- [[首次匹配即停路由]]
- [[遗漏式隐私]]
- [[preferences 写入过滤]]
