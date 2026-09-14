# 全链路 Graph 索引报告

构建时间：2026-09-14T16:51:19.575Z　版本：v1

> 本文件由 `node scripts/build-graph.mjs` 生成，**不要手改**。数字口径见文末《口径》。

## 一、总量

- 节点 **4591** · 边 **14487** · 缺口条目 **112**
- 可运行单元 **85** · 判据 **310** · 活动节点 **1622** · 流程边（唯一能驱动跳转的边）**4227**
- 待装配（scaffold）**601**（13.1%）· 阻塞（blocked）**0**

## 二、按层

| 层 | 节点 | 待装配 | 阻塞 | 装什么 kind |
|---|---|---|---|---|
| 材料与出处 `source` | 928 | 49 | 0 | SourceDocument SourceSpan DerivedAsset FiveDimAsset |
| 五类语义 `semantics` | 538 | 227 | 0 | SemanticUnit |
| 公共知识与关系 `knowledge` | 1091 | 0 | 0 | Concept Topic |
| 问题与课程编排 `curriculum` | 409 | 66 | 0 | LearningProblem Goal GapHypothesis Route RouteStep Unit Criterion |
| 学习活动 `activity` | 1622 | 258 | 0 | Reading Formative Support Decision DecisionReview Summative ApplicationReview ExperimentReference |
| 运行与记录 `runtime` | 0 | 0 | 0 | Session Turn Attempt Checkpoint Evidence AssessmentRecord |
| 模型与规则 `ai` | 3 | 1 | 0 | SkillPolicy ModelAdapter App |

## 三、按 kind

| kind | 数量 |
|---|---|
| Concept | 1070 |
| SourceSpan | 685 |
| SemanticUnit | 538 |
| ApplicationReview | 404 |
| Support | 340 |
| Criterion | 310 |
| Decision | 269 |
| DecisionReview | 269 |
| DerivedAsset | 154 |
| Unit | 85 |
| Reading | 85 |
| Formative | 85 |
| Summative | 85 |
| ExperimentReference | 85 |
| SourceDocument | 78 |
| Topic | 21 |
| FiveDimAsset | 11 |
| RouteStep | 8 |
| Goal | 2 |
| Route | 2 |
| LearningProblem | 1 |
| GapHypothesis | 1 |
| SkillPolicy | 1 |
| ModelAdapter | 1 |
| App | 1 |

## 四、按边类（五种边）

| 边类 | 数量 | 能不能驱动跳转 |
|---|---|---|
| `knowledge` | 5894 | 不能 |
| `transition` | 4227 | **能**（唯一） |
| `curriculum` | 2247 | 不能（课程编排，不是运行时跳转） |
| `provenance` | 2119 | 不能 |

## 五、按审核状态（边的可信程度）

| reviewState | 数量 |
|---|---|
| sourced | 6140 |
| curated | 4407 |
| unreviewed | 3764 |
| authored | 140 |
| owner-confirmed | 36 |

## 六、按状态（节点）

| status | 数量 |
|---|---|
| ready | 3990 |
| scaffold | 601 |

## 七、可运行入口

| 入口 | 单元 | 状态 | 地址 |
|---|---|---|---|
| 1. Agent | `unit:chapter-agent` | ready | `#learn=agent` |
| 2. 工具 | `unit:chapter-tool` | ready | `#learn=tool` |
| 3. Agent loop | `unit:chapter-agent-loop` | ready | `#learn=agent-loop` |
| 4. 状态子系统与进度持久化 | `unit:chapter-state-persistence` | ready | `#learn=state-persistence` |
| 5. Harness | `unit:chapter-harness` | ready | `#learn=harness` |
| 6. 验证闭环 | `unit:chapter-verification-loop` | ready | `#learn=verification-loop` |
| 单篇 · Agent Skills 渐进式披露 | `unit:agent-skills-api` | ready | `#neican=agent-skills-api` |

## 八、适配器读到的真实数字

```json
{
 "conceptMap": {
  "topics": 1070,
  "clusters": 21,
  "dependencies": 681,
  "relations": 3459,
  "depUnreviewed": 360,
  "relUnreviewed": 3400,
  "depDuplicates": 2,
  "relDuplicates": 11,
  "depEdgesKept": 679,
  "relEdgesKept": 3448
 },
 "semantic": {
  "total": 538,
  "byType": {
   "SOL": 76,
   "CAS": 76,
   "CON": 76,
   "OPI": 169,
   "QST": 141
  },
  "cardLinks": 304
 },
 "cards": {
  "files": 76,
  "byCategory": {
   "external-access": 8,
   "continuous-action": 14,
   "human-control": 14,
   "context-delivery": 15,
   "current-view": 8,
   "result-trust": 10,
   "information-storage": 7
  }
 },
 "chain": {
  "docs": 2,
  "sources": 49,
  "sourcesFoundInDocs": 49,
  "cards": 76,
  "cardsWithSources": 76,
  "cardsWithPrimarySource": 4,
  "cardsWithMissingSource": 0,
  "sourceTypeCount": {
   "article": 31,
   "paper": 2,
   "research": 1,
   "post": 10,
   "documentation": 5
  }
 },
 "neican": {
  "issues": 3,
  "articles": 26,
  "fivedim": 10,
  "notes": 26,
  "dicts": 26,
  "feynmans": 26,
  "raws": 26
 },
 "routeTail": {
  "routeId": "agent-continuous-action-v1",
  "lastUnit": "unit:chapter-verification-loop"
 },
 "single": {
  "unit": "unit:agent-skills-api",
  "criteria": 4,
  "criteriaVersion": "v3-20260914"
 },
 "course": {
  "routes": 1,
  "steps": 6,
  "units": 7,
  "criteria": 22,
  "activities": 144,
  "machineCriteria": 22
 },
 "batch": {
  "units": 76,
  "ready": 19,
  "scaffold": 57,
  "superseded": 6,
  "criteria": 264,
  "activities": 1216,
  "materials": 380,
  "decisionUnits": 76,
  "decisionQuestions": 228
 },
 "fixture": {
  "routeId": "fixture-shared-concept-v1",
  "units": 2,
  "sharedConcepts": [
   "cm_0608c405",
   "cm_0a4ca4ce"
  ]
 },
 "ai": {
  "skills": [
   "dbs",
   "dbs-chatroom",
   "dbs-decision",
   "dbs-deconstruct",
   "dbs-diagnosis",
   "dbs-good-question",
   "dbs-jtbd",
   "dbs-knowledge",
   "dbs-learning",
   "dbs-learning-beta",
   "dbs-report",
   "dbs-save",
   "dbs-standard-answer",
   "dbs-theory-grounding",
   "zhihu"
  ]
 }
}
```

## 九、缺口清单（保留节点并写清原因，不把它变成 ready）

### pending（112）

- **概念依赖里有 2 条重复记录（已按稳定身份去重）** — 重复键：cm_30fb0c9b<-cm_34b33e00、cm_a0ca0f95<-cm_34b33e00　`knowledge/概念地图-260913/dependencies.json`　影响 2 个节点
- **概念关系里有 11 条重复记录（已按稳定身份去重）** — 重复键：cm_0a4ca4ce>cm_d9aa9fe0/used-with、cm_34b33e00>cm_7cd7335d/used-with、cm_c8798fb1>cm_01d6a01e/used-with、cm_b55ff5c3>cm_916d7db2/used-with、cm_30201f36>cm_01d6a01e/used-with　`knowledge/概念地图-260913/relations.json`　影响 3 个节点
- **图鉴卡分类 ↔ 概念地图主题 未建立映射** — 图鉴站用 7 个 category_id（external-access / continuous-action / human-control / context-delivery / current-view / result-trust / information-storage），概念地图用 21 个主题，两套分类没有逐条核对过的映射；本轮不按名字猜　`内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts`　影响 3 个节点
- **内参-260912 期资产清点** — 文章 10 篇；三级笔记 10 份；概念辞典 10 份；AI 费曼 10 份；真五维 10 份　`knowledge/内参-260912`
- **内参-260913 期资产清点** — 文章 8 篇；三级笔记 8 份；概念辞典 8 份；AI 费曼 8 份；真五维 0 份　`knowledge/内参-260913`
- **内参-260914 期资产清点** — 文章 8 篇；三级笔记 8 份；概念辞典 8 份；AI 费曼 8 份；真五维 0 份　`knowledge/内参-260914`
- **Agent 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.agent.feynman.checks`　影响 1 个节点
- **Agent 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.agent.feynman.checks`　影响 1 个节点
- **Agent 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.agent.feynman.checks`　影响 1 个节点
- **Agent 章：材料侧已知问题** — 六章主案例全部是「假设场景」（源卡 scenario.type: hypothetical）——内容结构化系统 03-处理状态 已把这条记为已知问题：要真实案例得从 58 篇正文另抽一批。　`evidence/agent-loop-260913/chapters.json#gaps[0]`　影响 1 个节点
- **Agent 章：材料侧已知问题** — 每章经 relationships.target 找到的候选 CAS 都只有 1 个，没有可对比的第二候选；「允许一个概念多个候选案例」这条规则在本批材料上没被真正用上。　`evidence/agent-loop-260913/chapters.json#gaps[1]`　影响 1 个节点
- **Agent 章：材料侧已知问题** — CON-agent-loop 与 CON-verification-loop 没有 relationships 直连的 OPI，题目依据只能落在 SOL 动作路径上。　`evidence/agent-loop-260913/chapters.json#gaps[2]`　影响 1 个节点
- **工具 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.tool.feynman.checks`　影响 1 个节点
- **工具 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.tool.feynman.checks`　影响 1 个节点
- **工具 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.tool.feynman.checks`　影响 1 个节点
- **工具 章：材料侧已知问题** — 六章主案例全部是「假设场景」（源卡 scenario.type: hypothetical）——内容结构化系统 03-处理状态 已把这条记为已知问题：要真实案例得从 58 篇正文另抽一批。　`evidence/agent-loop-260913/chapters.json#gaps[0]`　影响 1 个节点
- **工具 章：材料侧已知问题** — 每章经 relationships.target 找到的候选 CAS 都只有 1 个，没有可对比的第二候选；「允许一个概念多个候选案例」这条规则在本批材料上没被真正用上。　`evidence/agent-loop-260913/chapters.json#gaps[1]`　影响 1 个节点
- **工具 章：材料侧已知问题** — CON-agent-loop 与 CON-verification-loop 没有 relationships 直连的 OPI，题目依据只能落在 SOL 动作路径上。　`evidence/agent-loop-260913/chapters.json#gaps[2]`　影响 1 个节点
- **Agent loop 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.agent-loop.feynman.checks`　影响 1 个节点
- **Agent loop 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.agent-loop.feynman.checks`　影响 1 个节点
- **Agent loop 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.agent-loop.feynman.checks`　影响 1 个节点
- **Agent loop 章：材料侧已知问题** — 六章主案例全部是「假设场景」（源卡 scenario.type: hypothetical）——内容结构化系统 03-处理状态 已把这条记为已知问题：要真实案例得从 58 篇正文另抽一批。　`evidence/agent-loop-260913/chapters.json#gaps[0]`　影响 1 个节点
- **Agent loop 章：材料侧已知问题** — 每章经 relationships.target 找到的候选 CAS 都只有 1 个，没有可对比的第二候选；「允许一个概念多个候选案例」这条规则在本批材料上没被真正用上。　`evidence/agent-loop-260913/chapters.json#gaps[1]`　影响 1 个节点
- **Agent loop 章：材料侧已知问题** — CON-agent-loop 与 CON-verification-loop 没有 relationships 直连的 OPI，题目依据只能落在 SOL 动作路径上。　`evidence/agent-loop-260913/chapters.json#gaps[2]`　影响 1 个节点
- **状态子系统与进度持久化 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.state-persistence.feynman.checks`　影响 1 个节点
- **状态子系统与进度持久化 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.state-persistence.feynman.checks`　影响 1 个节点
- **状态子系统与进度持久化 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.state-persistence.feynman.checks`　影响 1 个节点
- **状态子系统与进度持久化 章：材料侧已知问题** — 六章主案例全部是「假设场景」（源卡 scenario.type: hypothetical）——内容结构化系统 03-处理状态 已把这条记为已知问题：要真实案例得从 58 篇正文另抽一批。　`evidence/agent-loop-260913/chapters.json#gaps[0]`　影响 1 个节点
- **状态子系统与进度持久化 章：材料侧已知问题** — 每章经 relationships.target 找到的候选 CAS 都只有 1 个，没有可对比的第二候选；「允许一个概念多个候选案例」这条规则在本批材料上没被真正用上。　`evidence/agent-loop-260913/chapters.json#gaps[1]`　影响 1 个节点
- **状态子系统与进度持久化 章：材料侧已知问题** — CON-agent-loop 与 CON-verification-loop 没有 relationships 直连的 OPI，题目依据只能落在 SOL 动作路径上。　`evidence/agent-loop-260913/chapters.json#gaps[2]`　影响 1 个节点
- **Harness 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.harness.feynman.checks`　影响 1 个节点
- **Harness 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.harness.feynman.checks`　影响 1 个节点
- **Harness 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.harness.feynman.checks`　影响 1 个节点
- **Harness 章：材料侧已知问题** — 六章主案例全部是「假设场景」（源卡 scenario.type: hypothetical）——内容结构化系统 03-处理状态 已把这条记为已知问题：要真实案例得从 58 篇正文另抽一批。　`evidence/agent-loop-260913/chapters.json#gaps[0]`　影响 1 个节点
- **Harness 章：材料侧已知问题** — 每章经 relationships.target 找到的候选 CAS 都只有 1 个，没有可对比的第二候选；「允许一个概念多个候选案例」这条规则在本批材料上没被真正用上。　`evidence/agent-loop-260913/chapters.json#gaps[1]`　影响 1 个节点
- **Harness 章：材料侧已知问题** — CON-agent-loop 与 CON-verification-loop 没有 relationships 直连的 OPI，题目依据只能落在 SOL 动作路径上。　`evidence/agent-loop-260913/chapters.json#gaps[2]`　影响 1 个节点
- **验证闭环 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.verification-loop.feynman.checks`　影响 1 个节点
- **验证闭环 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.verification-loop.feynman.checks`　影响 1 个节点
- **验证闭环 章判据：补讲材料只绑到整章阅读梯度** — 单篇（agent-skills-api）有逐条指定的 material[ref]，六章目前没有这一层映射，补讲只能取本章阅读梯度；不按关键词猜段落　`evidence/agent-loop-260913/authored.json#chapters.verification-loop.feynman.checks`　影响 1 个节点
- **验证闭环 章：材料侧已知问题** — 六章主案例全部是「假设场景」（源卡 scenario.type: hypothetical）——内容结构化系统 03-处理状态 已把这条记为已知问题：要真实案例得从 58 篇正文另抽一批。　`evidence/agent-loop-260913/chapters.json#gaps[0]`　影响 1 个节点
- **验证闭环 章：材料侧已知问题** — 每章经 relationships.target 找到的候选 CAS 都只有 1 个，没有可对比的第二候选；「允许一个概念多个候选案例」这条规则在本批材料上没被真正用上。　`evidence/agent-loop-260913/chapters.json#gaps[1]`　影响 1 个节点
- **验证闭环 章：材料侧已知问题** — CON-agent-loop 与 CON-verification-loop 没有 relationships 直连的 OPI，题目依据只能落在 SOL 动作路径上。　`evidence/agent-loop-260913/chapters.json#gaps[2]`　影响 1 个节点
- **单篇的正式章末通过与解锁门待装配** — 单篇材料有 4 条判据与章末费曼，但没有像六章那样已确认的「正式通过标准 / 解锁规则」；本轮照实标待装配，不借用六章的门　`evidence/feynman-teaching-map/agent-skills-api.json#criteria`　影响 2 个节点
- **「AI Agent」已被手工章节取代（superseded）** — 同一个概念（CON-agent）已有负责人确认过的手工章节 unit:chapter-agent「Agent」，机器版本（本单元）不对外：保留数据与出处，不再作为独立可学单元，也不给页面入口。它的三道已复核决策题与卡片 boundaries 派生判据已并入该章节（人工内容优先 · 机器内容逐条标来源）。　`evidence/batch-units-260914/units.json#units[unitId=batch-agent].superseded`　影响 1 个节点
- **「Agent 行动空间」缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上** — 本单元（CON-agent-action-space）没有反向观点单元；决策题待装配时，依据只能落在 CAS 情境与 SOL 动作路径上　`evidence/batch-units-260914/units.json#units[unitId=batch-agent-action-space].statusReason`　影响 1 个节点
- **「Agent CLI 运行时」缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上** — 本单元（CON-agent-cli-runtime）没有反向观点单元；决策题待装配时，依据只能落在 CAS 情境与 SOL 动作路径上　`evidence/batch-units-260914/units.json#units[unitId=batch-agent-cli-runtime].statusReason`　影响 1 个节点
- **「Agent 信息引出」缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上** — 本单元（CON-agent-elicitation）没有反向观点单元；决策题待装配时，依据只能落在 CAS 情境与 SOL 动作路径上　`evidence/batch-units-260914/units.json#units[unitId=batch-agent-elicitation].statusReason`　影响 1 个节点
- **「Agent 交接」缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上** — 本单元（CON-agent-handoff）没有反向观点单元；决策题待装配时，依据只能落在 CAS 情境与 SOL 动作路径上　`evidence/batch-units-260914/units.json#units[unitId=batch-agent-handoff].statusReason`　影响 1 个节点
- **「Agent Harness」已被手工章节取代（superseded）** — 同一个概念（CON-agent-harness）已有负责人确认过的手工章节 unit:chapter-harness「Harness」，机器版本（本单元）不对外：保留数据与出处，不再作为独立可学单元，也不给页面入口。它的三道已复核决策题与卡片 boundaries 派生判据已并入该章节（人工内容优先 · 机器内容逐条标来源）。　`evidence/batch-units-260914/units.json#units[unitId=batch-agent-harness].superseded`　影响 1 个节点
- **「Agent 生命周期」缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上** — 本单元（CON-agent-lifecycle）没有反向观点单元；决策题待装配时，依据只能落在 CAS 情境与 SOL 动作路径上　`evidence/batch-units-260914/units.json#units[unitId=batch-agent-lifecycle].statusReason`　影响 1 个节点
- **「Agent 循环」已被手工章节取代（superseded）** — 同一个概念（CON-agent-loop）已有负责人确认过的手工章节 unit:chapter-agent-loop「Agent loop」，机器版本（本单元）不对外：保留数据与出处，不再作为独立可学单元，也不给页面入口。它的三道已复核决策题与卡片 boundaries 派生判据已并入该章节（人工内容优先 · 机器内容逐条标来源）。　`evidence/batch-units-260914/units.json#units[unitId=batch-agent-loop].superseded`　影响 1 个节点
- **「Agent 循环」缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上** — 本单元（CON-agent-loop）没有反向观点单元；决策题待装配时，依据只能落在 CAS 情境与 SOL 动作路径上　`evidence/batch-units-260914/units.json#units[unitId=batch-agent-loop].statusReason`　影响 1 个节点
- **「Agent 会话管理」缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上** — 本单元（CON-agent-session-management）没有反向观点单元；决策题待装配时，依据只能落在 CAS 情境与 SOL 动作路径上　`evidence/batch-units-260914/units.json#units[unitId=batch-agent-session-management].statusReason`　影响 1 个节点
- **「Agent 终止条件」缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上** — 本单元（CON-agent-stop-conditions）没有反向观点单元；决策题待装配时，依据只能落在 CAS 情境与 SOL 动作路径上　`evidence/batch-units-260914/units.json#units[unitId=batch-agent-stop-conditions].statusReason`　影响 1 个节点
- **「Agent 工具契约」缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上** — 本单元（CON-agent-tool-contract）没有反向观点单元；决策题待装配时，依据只能落在 CAS 情境与 SOL 动作路径上　`evidence/batch-units-260914/units.json#units[unitId=batch-agent-tool-contract].statusReason`　影响 1 个节点
- **「限界上下文」缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上** — 本单元（CON-bounded-context）没有反向观点单元；决策题待装配时，依据只能落在 CAS 情境与 SOL 动作路径上　`evidence/batch-units-260914/units.json#units[unitId=batch-bounded-context].statusReason`　影响 1 个节点
- **「浏览循环」缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上** — 本单元（CON-browsing-loop）没有反向观点单元；决策题待装配时，依据只能落在 CAS 情境与 SOL 动作路径上　`evidence/batch-units-260914/units.json#units[unitId=batch-browsing-loop].statusReason`　影响 1 个节点
- **「变更影响分析」缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上** — 本单元（CON-change-impact-analysis）没有反向观点单元；决策题待装配时，依据只能落在 CAS 情境与 SOL 动作路径上　`evidence/batch-units-260914/units.json#units[unitId=batch-change-impact-analysis].statusReason`　影响 1 个节点
- **「聊天模板」缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上** — 本单元（CON-chat-template）没有反向观点单元；决策题待装配时，依据只能落在 CAS 情境与 SOL 动作路径上　`evidence/batch-units-260914/units.json#units[unitId=batch-chat-template].statusReason`　影响 1 个节点
- **「上下文腐烂」缺 OPI：决策题依据只能落在 CAS 情境与 SOL 动作路径上** — 本单元（CON-context-rot）没有反向观点单元；决策题待装配时，依据只能落在 CAS 情境与 SOL 动作路径上　`evidence/batch-units-260914/units.json#units[unitId=batch-context-rot].statusReason`　影响 1 个节点
- …另有 52 条同类缺口，全部在 `graph.json#gaps`

## 十、构建来源（可核对基线）

| 文件 | sha256（前 16） | 说明 |
|---|---|---|
| `knowledge/概念地图-260913/topics.json` | `d51335b21db06d47` | 概念唯一真源（只读） |
| `knowledge/概念地图-260913/clusters.json` | `d6cd54fffc76fd3b` |  |
| `knowledge/概念地图-260913/dependencies.json` | `a03e0dd20063e661` |  |
| `knowledge/概念地图-260913/relations.json` | `a8d03d714b625f9c` |  |
| `内容结构化系统/模块/ai-concept-base/data/units.json` | `4d36dedb7f51303d` | 538 个语义单元（五类） |
| `内容结构化系统/01-原始素材区/完整副本/飞书-Context-Engineering-26+2.md` | `339f99811ad59817` |  |
| `内容结构化系统/01-原始素材区/完整副本/飞书-Harness-Engineering-28+2.md` | `ed545831b5b8da46` |  |
| `evidence/agent-loop-260913/source-chain.json` | `b2afd357cb3cc802` | 58 篇 → 49 原始来源 → 76 张卡 |
| `knowledge/内参-260912/内参-页面数据.json` | `a2e1bd6e347bbaca` | 内参-260912 期页面数据 |
| `knowledge/内参-260912/原文/agent-skills-api.md` | `a1a0643871fe2ec3` |  |
| `knowledge/内参-260912/三级笔记/agent-skills-api.md` | `66a4e894d05854f8` |  |
| `knowledge/内参-260912/概念辞典/agent-skills-api.md` | `2325346cb1ebadf3` |  |
| `knowledge/内参-260912/AI费曼/agent-skills-api.md` | `0ee658708b52bb70` |  |
| `knowledge/内参-260912/拆解五维/agent-skills-api.json` | `611d7b54b4f24509` | 内参-260912 真五维 |
| `knowledge/内参-260912/原文/openai-habitat-storage.md` | `365111de6792d994` |  |
| `knowledge/内参-260912/三级笔记/openai-habitat-storage.md` | `d11c76f146c781e7` |  |
| `knowledge/内参-260912/概念辞典/openai-habitat-storage.md` | `2a589de1e719b76e` |  |
| `knowledge/内参-260912/AI费曼/openai-habitat-storage.md` | `b2a5928305f46a61` |  |
| `knowledge/内参-260912/拆解五维/openai-habitat-storage.json` | `7fb1ce999d94933e` | 内参-260912 真五维 |
| `knowledge/内参-260912/原文/baoyu-ai-native-workflow.md` | `9963fb1baea7be2d` |  |
| `knowledge/内参-260912/三级笔记/baoyu-ai-native-workflow.md` | `e5ca57ee714dd82b` |  |
| `knowledge/内参-260912/概念辞典/baoyu-ai-native-workflow.md` | `616c49167b74c03d` |  |
| `knowledge/内参-260912/AI费曼/baoyu-ai-native-workflow.md` | `0e250df0d51d999e` |  |
| `knowledge/内参-260912/拆解五维/baoyu-ai-native-workflow.json` | `fe0649457048a32c` | 内参-260912 真五维 |
| `knowledge/内参-260912/原文/linear-principles.md` | `871b6f5205fc44ae` |  |
| `knowledge/内参-260912/三级笔记/linear-principles.md` | `5940e04221885b28` |  |
| `knowledge/内参-260912/概念辞典/linear-principles.md` | `c41347a5b307ff55` |  |
| `knowledge/内参-260912/AI费曼/linear-principles.md` | `56a0c973d4640a88` |  |
| `knowledge/内参-260912/拆解五维/linear-principles.json` | `069b56c46e78d19b` | 内参-260912 真五维 |
| `knowledge/内参-260912/原文/agent-skills-lesson-1.md` | `bc8e0225b549590a` |  |
| `knowledge/内参-260912/三级笔记/agent-skills-lesson-1.md` | `129f9d7c96c056cb` |  |
| `knowledge/内参-260912/概念辞典/agent-skills-lesson-1.md` | `9d65cc12492a49fe` |  |
| `knowledge/内参-260912/AI费曼/agent-skills-lesson-1.md` | `0d6aa11e6a4f59d1` |  |
| `knowledge/内参-260912/拆解五维/agent-skills-lesson-1.json` | `efbe0568cae9fb57` | 内参-260912 真五维 |
| `knowledge/内参-260912/原文/agent-skills-lesson-2.md` | `15ac52e9f0f61a06` |  |
| `knowledge/内参-260912/三级笔记/agent-skills-lesson-2.md` | `a09e489a25f15102` |  |
| `knowledge/内参-260912/概念辞典/agent-skills-lesson-2.md` | `1f13287e3b34c1d1` |  |
| `knowledge/内参-260912/AI费曼/agent-skills-lesson-2.md` | `7f4bb6d2d0cce871` |  |
| `knowledge/内参-260912/拆解五维/agent-skills-lesson-2.json` | `5883d17becbc86c9` | 内参-260912 真五维 |
| `knowledge/内参-260912/原文/agent-skills-lesson-3.md` | `df77cdc18ada2f9e` |  |
| `knowledge/内参-260912/三级笔记/agent-skills-lesson-3.md` | `573f208125ce40d6` |  |
| `knowledge/内参-260912/概念辞典/agent-skills-lesson-3.md` | `14e1268232760d87` |  |
| `knowledge/内参-260912/AI费曼/agent-skills-lesson-3.md` | `cef6e0423b22ab4f` |  |
| `knowledge/内参-260912/拆解五维/agent-skills-lesson-3.json` | `21f744c365a936a7` | 内参-260912 真五维 |
| `knowledge/内参-260912/原文/agent-skills-vs-features.md` | `5696c2c7ad2505f0` |  |
| `knowledge/内参-260912/三级笔记/agent-skills-vs-features.md` | `4178378778372580` |  |
| `knowledge/内参-260912/概念辞典/agent-skills-vs-features.md` | `0ed1545cd147476d` |  |
| `knowledge/内参-260912/AI费曼/agent-skills-vs-features.md` | `570620ba5e62d11c` |  |
| `knowledge/内参-260912/拆解五维/agent-skills-vs-features.json` | `ca31975b279ca8d5` | 内参-260912 真五维 |
| `knowledge/内参-260912/原文/agent-skills-lesson-5.md` | `4ac7e7c903795042` |  |
| `knowledge/内参-260912/三级笔记/agent-skills-lesson-5.md` | `1d267d7800449b35` |  |
| `knowledge/内参-260912/概念辞典/agent-skills-lesson-5.md` | `b3a1128cee06568f` |  |
| `knowledge/内参-260912/AI费曼/agent-skills-lesson-5.md` | `b77fbe7d28f2789f` |  |
| `knowledge/内参-260912/拆解五维/agent-skills-lesson-5.json` | `ca34c0d7d736c9c0` | 内参-260912 真五维 |
| `knowledge/内参-260912/原文/agent-skills-lesson-6.md` | `16b53ba33c7b37bd` |  |
| `knowledge/内参-260912/三级笔记/agent-skills-lesson-6.md` | `24f6217724b174bd` |  |
| `knowledge/内参-260912/概念辞典/agent-skills-lesson-6.md` | `962270f1fe85dc7a` |  |
| `knowledge/内参-260912/AI费曼/agent-skills-lesson-6.md` | `2e3008f50c278f5c` |  |
| `knowledge/内参-260912/拆解五维/agent-skills-lesson-6.json` | `8223e1d489157bf5` | 内参-260912 真五维 |
| `knowledge/内参-260913/内参-页面数据.json` | `11dfc7c65852e9dc` | 内参-260913 期页面数据 |
| `knowledge/内参-260913/原文/dario-pace-the-frontier.md` | `01936ec6bd0d24d1` |  |
| `knowledge/内参-260913/三级笔记/dario-pace-the-frontier.md` | `347fab3473c3b3c8` |  |
| `knowledge/内参-260913/概念辞典/dario-pace-the-frontier.md` | `0df3d6bbaf108a8a` |  |
| `knowledge/内参-260913/AI费曼/dario-pace-the-frontier.md` | `a46aaf3ffc108bef` |  |
| `knowledge/内参-260913/原文/openai-astra-skills-and-prompts.md` | `b187abe5e053a47d` |  |
| `knowledge/内参-260913/三级笔记/openai-astra-skills-and-prompts.md` | `4d0cd6c7c0760179` |  |
| `knowledge/内参-260913/概念辞典/openai-astra-skills-and-prompts.md` | `21723fe7275967f7` |  |
| `knowledge/内参-260913/AI费曼/openai-astra-skills-and-prompts.md` | `1b842ac3f87bd1da` |  |
| `knowledge/内参-260913/原文/apple-ceo-ternus.md` | `ec33081f9580c7cf` |  |
| `knowledge/内参-260913/三级笔记/apple-ceo-ternus.md` | `ebb508859f3d36cc` |  |
| `knowledge/内参-260913/概念辞典/apple-ceo-ternus.md` | `7454074f37d99b87` |  |
| `knowledge/内参-260913/AI费曼/apple-ceo-ternus.md` | `d78fdfa970a703dc` |  |
| `knowledge/内参-260913/原文/andrew-ng-ai-engineering-skills-map.md` | `ced3c9739acbcf39` |  |
| `knowledge/内参-260913/三级笔记/andrew-ng-ai-engineering-skills-map.md` | `8723e49fa31623b4` |  |
| `knowledge/内参-260913/概念辞典/andrew-ng-ai-engineering-skills-map.md` | `170072de27a0dc34` |  |
| `knowledge/内参-260913/AI费曼/andrew-ng-ai-engineering-skills-map.md` | `35344f8c92734048` |  |
| `knowledge/内参-260913/原文/archify.md` | `34f39a8859e690a4` |  |
| `knowledge/内参-260913/三级笔记/archify.md` | `803a32b55232ddb4` |  |
| `knowledge/内参-260913/概念辞典/archify.md` | `70d7dd85497a6201` |  |
| `knowledge/内参-260913/AI费曼/archify.md` | `119912f83becb771` |  |
| `knowledge/内参-260913/原文/raschka-gpt6-astra-looped-transformers.md` | `a7b0e3728cbeed2a` |  |
| `knowledge/内参-260913/三级笔记/raschka-gpt6-astra-looped-transformers.md` | `2d23c0b68ec2e86e` |  |
| `knowledge/内参-260913/概念辞典/raschka-gpt6-astra-looped-transformers.md` | `82ba37f1530c4dbc` |  |
| `knowledge/内参-260913/AI费曼/raschka-gpt6-astra-looped-transformers.md` | `f34c38bec8a25684` |  |
| `knowledge/内参-260913/原文/calnewport-ai-agent-civilizations.md` | `7d7a2e7587516300` |  |
| `knowledge/内参-260913/三级笔记/calnewport-ai-agent-civilizations.md` | `505e025a9d1cf295` |  |
| `knowledge/内参-260913/概念辞典/calnewport-ai-agent-civilizations.md` | `f9506f0046b47921` |  |
| `knowledge/内参-260913/AI费曼/calnewport-ai-agent-civilizations.md` | `101b5f28bf80c6d7` |  |
| `knowledge/内参-260913/原文/ai-apps-not-a-good-business.md` | `5374a8d44b92dd81` |  |
| `knowledge/内参-260913/三级笔记/ai-apps-not-a-good-business.md` | `18e80312f862a2f6` |  |
| `knowledge/内参-260913/概念辞典/ai-apps-not-a-good-business.md` | `68d57965b217a35c` |  |
| `knowledge/内参-260913/AI费曼/ai-apps-not-a-good-business.md` | `c54f29b9eb958c69` |  |
| `knowledge/内参-260914/内参-页面数据.json` | `18d97387256590be` | 内参-260914 期页面数据 |
| `knowledge/内参-260914/原文/yoshuabengio-why-are-ai-agents-lying-cheating-and-coordinati.md` | `54d1f2224f17a2cf` |  |
| `knowledge/内参-260914/三级笔记/yoshuabengio-why-are-ai-agents-lying-cheating-and-coordinati.md` | `57494c92c7dfb1df` |  |
| `knowledge/内参-260914/概念辞典/yoshuabengio-why-are-ai-agents-lying-cheating-and-coordinati.md` | `d02d4fce7bd87594` |  |
| `knowledge/内参-260914/AI费曼/yoshuabengio-why-are-ai-agents-lying-cheating-and-coordinati.md` | `c1a9f3e9a1e14edc` |  |
| `knowledge/内参-260914/原文/cursor-understanding-your-codebase.md` | `e7a834b345b38aca` |  |
| `knowledge/内参-260914/三级笔记/cursor-understanding-your-codebase.md` | `41df2e5b67bdea14` |  |
| `knowledge/内参-260914/概念辞典/cursor-understanding-your-codebase.md` | `52ba7116ae66e035` |  |
| `knowledge/内参-260914/AI费曼/cursor-understanding-your-codebase.md` | `56d4c3c1bc37f69a` |  |
| `knowledge/内参-260914/原文/cursor-working-with-agents.md` | `4b24b7e30650e3ea` |  |
| `knowledge/内参-260914/三级笔记/cursor-working-with-agents.md` | `7b5bbbbeacd0627c` |  |
| `knowledge/内参-260914/概念辞典/cursor-working-with-agents.md` | `615fcfc2815449ac` |  |
| `knowledge/内参-260914/AI费曼/cursor-working-with-agents.md` | `172d17564f1d000d` |  |
| `knowledge/内参-260914/原文/cursor-creating-features.md` | `2ca41196f32de472` |  |
| `knowledge/内参-260914/三级笔记/cursor-creating-features.md` | `9ae73639d4b59f01` |  |
| `knowledge/内参-260914/概念辞典/cursor-creating-features.md` | `938e9b815ed9aeb1` |  |
| `knowledge/内参-260914/AI费曼/cursor-creating-features.md` | `32e9d6281edd4fa0` |  |
| `knowledge/内参-260914/原文/cursor-finding-fixing-bugs.md` | `e7716bb1a2db6c0a` |  |
| `knowledge/内参-260914/三级笔记/cursor-finding-fixing-bugs.md` | `d7ede42ede0513c4` |  |
| `knowledge/内参-260914/概念辞典/cursor-finding-fixing-bugs.md` | `26312c3151598216` |  |
| `knowledge/内参-260914/AI费曼/cursor-finding-fixing-bugs.md` | `a7fe4c9431c875a5` |  |
| `knowledge/内参-260914/原文/cursor-reviewing-testing.md` | `beff2296ad8f6231` |  |
| `knowledge/内参-260914/三级笔记/cursor-reviewing-testing.md` | `3439cd33b76c18ab` |  |
| `knowledge/内参-260914/概念辞典/cursor-reviewing-testing.md` | `19e0a2b2bfd65c05` |  |
| `knowledge/内参-260914/AI费曼/cursor-reviewing-testing.md` | `8d511367d3842fff` |  |
| `knowledge/内参-260914/原文/cursor-customizing-agents.md` | `f513c667384fe0b8` |  |
| `knowledge/内参-260914/三级笔记/cursor-customizing-agents.md` | `cec9f1e1a116b155` |  |
| `knowledge/内参-260914/概念辞典/cursor-customizing-agents.md` | `120ade2dda77a5e2` |  |
| `knowledge/内参-260914/AI费曼/cursor-customizing-agents.md` | `719d44e0e127d507` |  |
| `knowledge/内参-260914/原文/cursor-putting-it-together.md` | `5927b3147755f592` |  |
| `knowledge/内参-260914/三级笔记/cursor-putting-it-together.md` | `8fd11ddc53b906e0` |  |
| `knowledge/内参-260914/概念辞典/cursor-putting-it-together.md` | `25bff9f8adc204e3` |  |
| `knowledge/内参-260914/AI费曼/cursor-putting-it-together.md` | `6d904f054aa331fd` |  |
| `evidence/paths-260913/routes.json` | `08f7eac6614d48df` | 人工策展路线（只读，不改顺序） |
| `evidence/agent-loop-260913/chapters.json` | `c274764631714c35` | 六章已装配材料 |
| `evidence/agent-loop-260913/authored.json` | `7dc25beff7bd7bb2` | 人工撰写的题目与费曼判据 |
| `evidence/agent-loop-260913/pairings.json` | `ef6d743975e05554` | 六章 cm↔CON 配对与负责人裁决 |
| `evidence/feynman-teaching-map/agent-skills-api.json` | `176c751da7975a13` | 单篇费曼教学映射（C1–C4） |
| `evidence/batch-units-260914/units.json` | `4a15ebc0279f44bb` | 76 个批量装配单元（逐字材料 + 出处 + 缺口） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/agent.yaml` | `be4cf0839d7f6fc0` | 图鉴卡（只读，逐字材料来源） |
| `evidence/gen-decisions-hybrid-v3-20260914.json` | `e2f0985c54220c10` | 决策题（确定性生成 v3 · 经独立复核 verdict=usable） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/agent-action-space.yaml` | `2660390f800f4b47` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/agent-cli-runtime.yaml` | `6ff3458c0bbf6a5d` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/agent-elicitation.yaml` | `32c544e7be69cb33` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/agent-handoff.yaml` | `0e7c2d53802bdc14` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/agent-harness.yaml` | `c5e1aebfe14580e8` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/agent-lifecycle.yaml` | `05f6b4c9dde8b896` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/agent-loop.yaml` | `8ecd9be0f8982eb5` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/agent-session-management.yaml` | `1a3a71b43220c820` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/agent-stop-conditions.yaml` | `e715b61bf2dadb32` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/agent-tool-contract.yaml` | `832f5fd3e1d3c5aa` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/attention-budget.yaml` | `46accecd8c75e055` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/bounded-context.yaml` | `af1d93e33a68e17e` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/browsing-loop.yaml` | `e8c7de02e54a44d7` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/change-impact-analysis.yaml` | `d3e766918b66afe7` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/chat-template.yaml` | `1738ca82e198fe72` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/code-execution.yaml` | `d91123a3409145dc` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/context.yaml` | `b7e5154e1d6b4cd0` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/context-compaction.yaml` | `4db9d9f9b4f63fed` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/context-engineering.yaml` | `9b953e7d27c76b41` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/context-rot.yaml` | `0c53cec46c11bd12` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/context-selection.yaml` | `48f5968eb44df08d` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/context-window.yaml` | `767782616ecc31eb` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/durable-execution.yaml` | `30a1131860a6c9dc` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/dynamic-context-assembly.yaml` | `8a6cd3a86078447c` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/error-handling.yaml` | `8c8367836200b1cb` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/event-driven-agent-automation.yaml` | `c0a76dc2d8102923` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/filesystem-workspace.yaml` | `273a128294e12bd8` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/guardrails.yaml` | `c7bd631c4c78b0aa` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/harness-compute-separation.yaml` | `2454024b437ceec8` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/harness-engineering.yaml` | `391a3df9e8dcae9c` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/harness-overfitting.yaml` | `18859e7474daa214` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/harness-token-floor.yaml` | `cc2e00fced40a226` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/human-escalation-tool-call.yaml` | `13b35e83ff002b68` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/instruction-locality.yaml` | `bc55a30fea301f30` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/just-in-time-retrieval.yaml` | `af3e3b9da27b66b0` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/large-language-model.yaml` | `22f2d6376b48c0c0` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/llm-statelessness.yaml` | `9bd31319c67ab609` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/llm-token.yaml` | `69f53b1a5390f7bc` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/lost-in-the-middle.yaml` | `2dc47288bce9e3b4` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/memory.yaml` | `215b51b377d5973c` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/minimal-sufficient-context.yaml` | `18ab78887cbc0c5b` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/model-context-protocol.yaml` | `dd57e6245e1efef8` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/multi-step-reliability-decay.yaml` | `a36f7b40d680d5f2` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/observability.yaml` | `2c6d07cff11a209b` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/observation-masking.yaml` | `f0793343c3a5655f` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/permission-boundary.yaml` | `91f6210db84dc41a` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/persistent-code-graph.yaml` | `c34b8cb8b76cbd36` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/progressive-disclosure.yaml` | `bd2996a5969592d2` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/prompt.yaml` | `6324f6905c0f842d` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/prompt-caching.yaml` | `01affabd7041c333` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/prompt-engineering.yaml` | `85ec5b4ee881502d` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/prompt-injection.yaml` | `1e6d2ffec6a15c23` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/reasoning-effort.yaml` | `004d692f30eb71d6` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/repository-source-of-truth.yaml` | `19fc5c6632c73e9b` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/restorable-compression.yaml` | `1f733fb776fe5936` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/retrieval-reasoning-dual-task-load.yaml` | `0871498c2f41ea4d` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/risk-tiered-autofixing.yaml` | `b5b2575e1b718109` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/runnable-evidence.yaml` | `c4d7bd5ced803bda` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/sandbox.yaml` | `985579a61db4d1d6` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/skill.yaml` | `bf2524d86e4168df` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/skill-chaining.yaml` | `079fdb2e5affc2d8` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/skill-trigger-condition.yaml` | `22822cedc72711ef` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/state-management.yaml` | `f1f39d4fb01fff59` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/subagent-orchestration.yaml` | `bd199e07998f2262` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/system-prompt.yaml` | `fe73124c513f4b3b` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/system-prompt-altitude.yaml` | `e79c9b0a5a1076f0` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/tacit-knowledge.yaml` | `a99be14bb06e7c48` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/tool.yaml` | `6b31942082e04015` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/tool-schema-tax.yaml` | `288a77d2f017893d` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/tool-scoping.yaml` | `00758ded9918fdcc` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/tool-workflow-fit.yaml` | `4d5e5fb1ac951dff` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/trace-based-evals.yaml` | `5055530991831166` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/ubiquitous-language.yaml` | `718eb3b82dece99c` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/verifiable-goal.yaml` | `a8fc81bb2776ac17` | 图鉴卡（只读，逐字材料来源） |
| `内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/verification-loop.yaml` | `fc59143402713210` | 图鉴卡（只读，逐字材料来源） |

## 口径

- **全量索引完成**：扫到的目录：knowledge/概念地图-260913（概念/主题/依赖/关系）· 内容结构化系统/模块/ai-concept-base/data/units.json（538 语义单元）· 内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/*.yaml（76 张卡）· knowledge/内参-*（三产物 + 真五维 + 原文）· evidence/paths-260913/routes.json · evidence/agent-loop-260913（六章）· evidence/feynman-teaching-map（单篇四判据）· evidence/batch-units-260914（76 个批量单元）。全量可读资产都建了节点，一个都没静默丢。
- **全量课程可学**：能真正跑的单元：六章 4 个（同一份运行器）＋ 单篇 1 个（4 条判据全接入）＋ 批量装配 76 个（同一份运行器逐个走通，但**决策题一个都没装配**、也没有页面入口：19 个四类齐的按 ready 显示、57 个缺 OPI 的按 scaffold 显示）＋ 明确标注的开发夹具 2 个（不是正式课程）。**「全量课程可学」不成立**：76 个批量单元都缺三道决策题，六章的 CAS 也仍全部是「假设场景」。有材料但没有已确认正式章末门的单元按待装配显示，不借用别的单元的通过标准。
- `ready` 只表示**该节点所指范围内**材料齐、已审核；**不表示模型稳定、学习有效或已经上线**。
- 五类语义之间的关系（`relationships`）落在 `knowledge` 边：它们既不是出处、不是课程编排、也不驱动跳转。
- 图鉴卡与概念地图是**两套分类**（7 个 category_id vs 21 个主题），本轮不按名字猜映射，缺口已登记。
- 边上的 `reviewState`：`owner-confirmed` > `authored`/`curated` > `sourced` > `unreviewed`（候选，视图必须标注，且不能当先修）。
