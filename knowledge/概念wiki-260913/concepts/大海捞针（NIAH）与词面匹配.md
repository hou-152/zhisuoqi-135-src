---
id: cm_71ce4e8a
name: 大海捞针（NIAH）与词面匹配
type: REPRESENTATIONAL
subject: Context Engineering
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.017
depth: 0
origin: [context]
aliases: []
sources: 1
---

# 大海捞针（NIAH）与词面匹配

> 最广泛使用的长上下文基准：把已知事实埋进大量无关文本让模型找回，实质只考察词面匹配。

**领域** verification-eval ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.017

## 费曼一下

好比用「在一本书里找出你自己刚写下的那句话」来证明一个人读书能力强。找得到，只说明他会用 Ctrl+F。真实的阅读要求是：这本书里有没有回答我这个问题的东西——而问题和答案通常不共享同一批词。

## 原文 context

最广泛使用的长上下文基准：把一句已知事实（needle）埋进一大段无关文本（haystack），再让模型找回来。原文指出它本质考察的是 direct lexical matching——一种可扩展但很窄的能力。模型在它上面接近满分，直接催生了「长上下文基本已解决」的行业错觉。

## 掌握证据（做到这些才算会）

- 能说明它考察的是 direct lexical matching 这一窄能力
- 能解释它为何催生长上下文基本已解决的错觉

## 验收问句

> 为什么{{name}}拿高分不等于长上下文真的可用？

## 相关

- [[needle-question 语义相似度谱系]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[干扰项与无关内容之分]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[干扰项的非均匀影响]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[弃答与幻觉：两种失败姿态]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[needle-haystack 相似度]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[检索与推理的双任务负担]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[自回归下输出也是上下文]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[非尝试率与拒答模式]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[haystack 结构连贯性效应]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[噪声上下文]] · related-to（audit） — 噪声上下文用苹果同名的例子已把定义讲全，NIAH 只是并列的另一类基准；'看清补了什么'属帮助理解而非前提。
- [[输入长度与任务难度的混淆]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[长上下文评测协议]] · related-to（audit） — NIAH 只是该协议要针对的动机/反面案例，协议口径（位置不敏感、最坏最好差异小）本身自足，不懂 NIAH 也能懂协议；应降 soft 或踢出依赖图。
- [[上下文均匀处理假设]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[上下文腐烂 Context Rot]] · 同篇出现（co-occurrence） — 同篇出现：context-03
- [[上下文工程 context engineering]] · 同篇出现（co-occurrence） — 同篇出现：context-03

## 出场

- Context Engineering ｜ 《Chroma 实测上下文腐烂：输入越长，模型并非均匀地可靠》 ｜ https://research.trychroma.com/context-rot
## 反链

- [[上下文腐烂 Context Rot]]
- [[干扰项的非均匀影响]]
- [[干扰项与无关内容之分]]
- [[检索与推理的双任务负担]]
- [[上下文均匀处理假设]]
- [[输入长度与任务难度的混淆]]
- [[长上下文评测协议]]
- [[自回归下输出也是上下文]]
- [[needle-haystack 相似度]]
- [[needle-question 语义相似度谱系]]
- [[非尝试率与拒答模式]]
- [[弃答与幻觉：两种失败姿态]]
- [[噪声上下文]]
- [[haystack 结构连贯性效应]]
