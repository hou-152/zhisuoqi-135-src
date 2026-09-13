---
id: cm_a6d3f8f2
name: 非确定性
nameEn: nondeterminism
type: CONCEPTUAL
subject: Harness Engineering
domain: verification-eval
learningStage: now
verification: judge
centrality: 0.126
depth: 0
origin: [harness]
aliases: ["nondeterminism"]
sources: 1
---

# 非确定性 · nondeterminism

> 同一输入两次调用给出不同输出，差异虽小却足以让严格等值断言作废，抽掉质量策略的地板。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 现在先懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.126

## 费曼一下

普通程序像自动售货机，投同样的币出同样的货；模型像每次都重新讲一遍故事的人，意思大致相同，用词从不重复。你没法用「对不对得上」来验收一个每次都换说法的人。

## 原文 context

同一输入喂两次得到两个不同输出，差异可能只是几个词、一个调换顺序的从句，但「足以让严格的等值断言变成废纸」。作者说这不是小麻烦，而是「抽掉了整个质量策略的地板」。

## 掌握证据（做到这些才算会）

- 能说明为何不能做字符级等值断言
- 能设计容忍非确定性的评测方式

## 验收问句

> 面对{{name}}，你的测试怎么写才有意义？

## 懂了它才能懂（解锁 2）

- [[结构断言与不变量断言]] — 不懂【非确定性】，就做不了【结构断言与不变量断言】的「在等值断言失效后改用结构与规则断言」
- [[从单元测试到评估：置信度而非正确性证明]] — 不懂【非确定性】，就做不了【从单元测试到评估：置信度而非正确性证明】的「用重复运行分布给 rubric 置信度」

## 相关

- [[结构断言与不变量断言]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[从单元测试到评估：置信度而非正确性证明]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[静默的分级失败]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[差一点就通过的输出]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[调试散文：一个词就是 bug]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[示例强于规则]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[会自己重写的地基]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[测试是绿的，产品却在退化]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[昂贵的反馈回路与欠测试]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[不可见的劳动]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[让不可见变得可见]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[加法本能陷阱与过度约束]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[减法带来质量跃迁]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[提示词即行为程序]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[难度即护城河]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[「模型即产品」的幻觉]] · 同篇出现（co-occurrence） — 同篇出现：harness-22
- [[Harness]] · 同篇出现（co-occurrence） — 同篇出现：harness-22

## 出场

- Harness Engineering ｜ 《为什么 harness 工程这么难》 ｜ https://x.com/winterarc2125/status/2081042507471696318/?s=12

## 别名

`nondeterminism`

## 反链

- [[不可见的劳动]]
- [[静默的分级失败]]
- [[让不可见变得可见]]
- [[「模型即产品」的幻觉]]
- [[测试是绿的，产品却在退化]]
- [[差一点就通过的输出]]
- [[从单元测试到评估：置信度而非正确性证明]]
- [[会自己重写的地基]]
- [[加法本能陷阱与过度约束]]
- [[减法带来质量跃迁]]
- [[结构断言与不变量断言]]
- [[难度即护城河]]
- [[示例强于规则]]
- [[昂贵的反馈回路与欠测试]]
- [[调试散文：一个词就是 bug]]
- [[提示词即行为程序]]
