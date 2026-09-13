---
id: cm_75dfab95
name: 嵌入式评估者
nameEn: embedded evaluators
type: PROCEDURAL
subject: AI 内参 260912
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.089
depth: 4
origin: [neican]
aliases: ["embedded evaluators"]
sources: 1
---

# 嵌入式评估者 · embedded evaluators

> 给第三方评估者类员工权限与工位，核查安全实践、上报事故、评估模型与训练流程。

**领域** verification-eval ｜ **类型** PROCEDURAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 费曼一下

概念实质是"把外部审查者当成员工来用"：办公室工位、门禁、公司笔记本，权限与内部风险评估团队大体相当，只排除法律、合同、客户与伙伴隐私所需的例外；审查对象不只是发布后的模型，还包括训练流程本身。这段最关键的是**边界**：Anthropic 保留的删节权是"窄"的，且限定在安全敏感、法律特权、商业敏感、第三方机密四类；不能因为结论不利就删；如果删掉了对结论重要的内容，评估者可以公开说出来。作者给它的三个作用是可验证性、透明度、第二意见。它承重，是因为作者承认任何 pacing 承诺都免不了"法条与法意之间"的模糊判断，没有能看细节的中立第三方，承诺就无法被核实——所以这是整个方案的地基，且 Anthropic 现在就单方面承诺。

## 原文 context

Each frontier AI company commits to giving ongoing, employee-like access to a team of embedded third-party evaluators (such as METR), whose role is to verify adherence to safety practices and commitments, report incidents, and help assess the alignment of not just completed AI models but training pipelines and processes. This is the key step for *verifiability* of any pacing commitments, and has precedent in the banking industry...

External reviewers should have the right to publish key findings about risk levels, incidents, practices, and the access they received or didn’t receive — without editorial control by Anthropic. We will have the narrow ability to redact security-sensitive, legally privileged, commercially sensitive, or third-party confidential information, but we can’t redact findings just because they are unfavorable. The reviewers can say publicly if a redaction removed something important to their conclusions.

## 掌握证据（做到这些才算会）

- 能列出保留删节的四类例外
- 能说出不能因结论不利删节，重要删节评估者可公开

## 验收问句

> 按 {{name}}，Anthropic 可以删掉哪些内容？

## 先懂这些（前置 1）

- [[Reasoning Trace Faithfulness faithfulness]] · **hard** — 不懂【Reasoning Trace Faithfulness】，就做不了【嵌入式评估者】的「评估模型与训练流程」——把可读的推理 trace 当成模型内部计算的忠实记录，评估结论就立不住

## 出场

- AI 内参 260912 ｜ 《我们必须加快开拓步伐》 ｜ https://darioamodei.com/post/we-must-pace-the-frontier

## 别名

`embedded evaluators`

## 反链

- [[Reasoning Trace Faithfulness faithfulness]]
