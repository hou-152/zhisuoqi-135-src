# 全链路 Graph 索引报告

构建时间：2026-09-13T22:58:21.764Z　版本：v1

> 本文件由 `node scripts/build-graph.mjs` 生成，**不要手改**。数字口径见文末《口径》。

## 一、总量

- 节点 **2002** · 边 **7563** · 缺口条目 **45**
- 可运行单元 **9** · 判据 **24** · 活动节点 **142** · 流程边（唯一能驱动跳转的边）**395**
- 待装配（scaffold）**297**（14.8%）· 阻塞（blocked）**0**

## 二、按层

| 层 | 节点 | 待装配 | 阻塞 | 装什么 kind |
|---|---|---|---|---|
| 材料与出处 `source` | 252 | 49 | 0 | SourceDocument SourceSpan DerivedAsset FiveDimAsset |
| 五类语义 `semantics` | 538 | 227 | 0 | SemanticUnit |
| 公共知识与关系 `knowledge` | 1020 | 0 | 0 | Concept Topic |
| 问题与课程编排 `curriculum` | 47 | 9 | 0 | LearningProblem Goal GapHypothesis Route RouteStep Unit Criterion |
| 学习活动 `activity` | 142 | 11 | 0 | Reading Formative Support Decision DecisionReview Summative ApplicationReview ExperimentReference |
| 运行与记录 `runtime` | 0 | 0 | 0 | Session Turn Attempt Checkpoint Evidence AssessmentRecord |
| 模型与规则 `ai` | 3 | 1 | 0 | SkillPolicy ModelAdapter App |

## 三、按 kind

| kind | 数量 |
|---|---|
| Concept | 999 |
| SemanticUnit | 538 |
| DerivedAsset | 130 |
| SourceDocument | 70 |
| SourceSpan | 41 |
| Support | 36 |
| Criterion | 24 |
| ApplicationReview | 24 |
| Decision | 23 |
| DecisionReview | 23 |
| Topic | 21 |
| FiveDimAsset | 11 |
| Unit | 9 |
| Reading | 9 |
| Formative | 9 |
| Summative | 9 |
| ExperimentReference | 9 |
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
| `knowledge` | 5725 | 不能 |
| `provenance` | 1165 | 不能 |
| `transition` | 395 | **能**（唯一） |
| `curriculum` | 278 | 不能（课程编排，不是运行时跳转） |

## 五、按审核状态（边的可信程度）

| reviewState | 数量 |
|---|---|
| unreviewed | 3666 |
| sourced | 3240 |
| curated | 499 |
| authored | 140 |
| owner-confirmed | 18 |

## 六、按状态（节点）

| status | 数量 |
|---|---|
| ready | 1705 |
| scaffold | 297 |

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
  "topics": 999,
  "clusters": 21,
  "dependencies": 632,
  "relations": 3410,
  "depUnreviewed": 311,
  "relUnreviewed": 3351,
  "depDuplicates": 2,
  "relDuplicates": 11,
  "depEdgesKept": 630,
  "relEdgesKept": 3399
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
  "issues": 2,
  "articles": 18,
  "fivedim": 10,
  "notes": 18,
  "dicts": 18,
  "feynmans": 18,
  "raws": 18
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
  "activities": 108
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

### pending（45）

- **概念依赖里有 2 条重复记录（已按稳定身份去重）** — 重复键：cm_30fb0c9b<-cm_34b33e00、cm_a0ca0f95<-cm_34b33e00　`knowledge/概念地图-260913/dependencies.json`　影响 2 个节点
- **概念关系里有 11 条重复记录（已按稳定身份去重）** — 重复键：cm_0a4ca4ce>cm_d9aa9fe0/used-with、cm_34b33e00>cm_7cd7335d/used-with、cm_c8798fb1>cm_01d6a01e/used-with、cm_b55ff5c3>cm_916d7db2/used-with、cm_30201f36>cm_01d6a01e/used-with　`knowledge/概念地图-260913/relations.json`　影响 3 个节点
- **图鉴卡分类 ↔ 概念地图主题 未建立映射** — 图鉴站用 7 个 category_id（external-access / continuous-action / human-control / context-delivery / current-view / result-trust / information-storage），概念地图用 21 个主题，两套分类没有逐条核对过的映射；本轮不按名字猜　`内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts`　影响 3 个节点
- **内参-260912 期资产清点** — 文章 10 篇；三级笔记 10 份；概念辞典 10 份；AI 费曼 10 份；真五维 10 份　`knowledge/内参-260912`
- **内参-260913 期资产清点** — 文章 8 篇；三级笔记 8 份；概念辞典 8 份；AI 费曼 8 份；真五维 0 份　`knowledge/内参-260913`
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
- **夹具题没有主案例与作答依据：fixture-agent-config** — 夹具只验证运行器复用与共享概念，没有配案例与依据；正式单元必须有，缺了就得标待装配　`docs/总图视图契约-20260914.md#§7`　影响 1 个节点
- **夹具题没有主案例与作答依据：fixture-harness-scope** — 夹具只验证运行器复用与共享概念，没有配案例与依据；正式单元必须有，缺了就得标待装配　`docs/总图视图契约-20260914.md#§7`　影响 1 个节点
- **开发夹具不是第二条正式课程** — 本库当前只有 1 条已审核路线（routes.json）。按任务书 §11，用明确标注的夹具验证运行器复用与共享概念，实际目录仍展示真实状态　`evidence/paths-260913/routes.json`　影响 1 个节点

## 十、构建来源（可核对基线）

| 文件 | sha256（前 16） | 说明 |
|---|---|---|
| `knowledge/概念地图-260913/topics.json` | `e2aa8f9af8e2bd08` | 概念唯一真源（只读） |
| `knowledge/概念地图-260913/clusters.json` | `7791caa52d7fa75e` |  |
| `knowledge/概念地图-260913/dependencies.json` | `5c9952d8fc0d1e0a` |  |
| `knowledge/概念地图-260913/relations.json` | `1d838d8a1759d176` |  |
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
| `evidence/paths-260913/routes.json` | `08f7eac6614d48df` | 人工策展路线（只读，不改顺序） |
| `evidence/agent-loop-260913/chapters.json` | `eca4944e029f97b3` | 六章已装配材料 |
| `evidence/agent-loop-260913/authored.json` | `7dc25beff7bd7bb2` | 人工撰写的题目与费曼判据 |
| `evidence/agent-loop-260913/pairings.json` | `ef6d743975e05554` | 六章 cm↔CON 配对与负责人裁决 |
| `evidence/feynman-teaching-map/agent-skills-api.json` | `176c751da7975a13` | 单篇费曼教学映射（C1–C4） |

## 口径

- **全量索引完成**：扫到的目录：knowledge/概念地图-260913（概念/主题/依赖/关系）· 内容结构化系统/模块/ai-concept-base/data/units.json（538 语义单元）· 内容结构化系统/01-原始素材区/完整副本/图鉴站产物/concepts/*.yaml（76 张卡）· knowledge/内参-*（三产物 + 真五维 + 原文）· evidence/paths-260913/routes.json · evidence/agent-loop-260913（六章）· evidence/feynman-teaching-map（单篇四判据）。全量可读资产都建了节点，一个都没静默丢。
- **全量课程可学**：能真正跑的单元：六章 4 个（同一份运行器）＋ 单篇 1 个（4 条判据全接入）＋ 明确标注的开发夹具 2 个（不是正式课程）。有材料但没有已确认正式章末门的单元按待装配显示，不借用别的单元的通过标准。
- `ready` 只表示**该节点所指范围内**材料齐、已审核；**不表示模型稳定、学习有效或已经上线**。
- 五类语义之间的关系（`relationships`）落在 `knowledge` 边：它们既不是出处、不是课程编排、也不驱动跳转。
- 图鉴卡与概念地图是**两套分类**（7 个 category_id vs 21 个主题），本轮不按名字猜映射，缺口已登记。
- 边上的 `reviewState`：`owner-confirmed` > `authored`/`curated` > `sourced` > `unreviewed`（候选，视图必须标注，且不能当先修）。
