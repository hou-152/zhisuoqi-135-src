# 概念 wiki · 维护约定

本目录是 **LLM 写、人读** 的一层，落在原始源与产品之间。模式来自 nashsu/llm_wiki。

## 三层

| 层 | 在哪 | 谁能改 |
|---|---|---|
| 原始源 | `evidence/概念源-260913/`（Notion 概念库快照 + 两份飞书主题合集 + 已策展关系） | **不可变**，只读；改动只能新增快照 |
| 维基 | 本目录 `concepts/*.md`、`index.md`、`log.md` | Agent 生成的产物；由脚本从地图重建，**不要手改** |
| 模式 | 本文件 | 人与 Agent 共同演进 |

## 上游地图（唯一真源）

数据不是在这里编的，全部来自 `knowledge/概念地图-260913/`：

- `topics.json` — 概念节点（id / 领域 / 定义 / 掌握证据 / 验收问句 / 中心度）
- `dependencies.json` — 前置依赖 DAG（`topicId depends on prerequisiteId`，hard／soft + reason）
- `relations.json` — 非前置关联（组成 / 对照 / 常一起用）
- `clusters.json` — 领域分簇
- `manifest.json` — 计数与逐文件 SHA-256

要改内容 → 改地图的生成脚本（`scripts/cm-*.mjs`）→ 重跑 → 本目录自动重建。

## 页面格式

每页 YAML frontmatter + 五个固定小节：费曼一下 / 原文 context / 掌握证据 / 验收问句 / 关系（先懂这些 · 懂了它才能懂 · 相关）/ 出场 / 反链。
链接一律 `[[页名]]`，页名 = `中文名 英文名`，重名时补 id 短码。

## 操作

- **收录（ingest）**：新源 → 冻结进 `evidence/概念源-*/` 并记 SHA-256 → 重跑 `cm-extract → cm-merge → cm-enrich → cm-edges → cm-build-map → cm-build-wiki` → 在 `log.md` 追加一条。
- **查询（query）**：先读 `index.md` 定位领域，再进具体页；答案若值得留下，写成新页而不是停在对话里。
- **体检（lint）**：查无入链的孤页、有提及无页面的概念、被更新源推翻的旧断言、缺交叉引用的页。`scripts/cm-validate.mjs` 跑结构体检。
