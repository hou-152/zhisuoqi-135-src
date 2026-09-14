# Phase 01 · edge-meta：681 条边的 strength/reason 进壳

**状态**：completed（2026-09-15 实跑验收后回填）

## 做了什么
- `scripts/build-shell.mjs` 新增 `loadEdgeMeta()`：读 `knowledge/概念地图-260913/dependencies.json`，产出 `payload.edgeMeta`＝`{ "topicId>prerequisiteId": { s: strength, r: reason } }`（只收 `kind==='prerequisite'`；681 条全带 strength＋reason，实测核对）。
- 不改 `evidence/cm-260913/05-shell-payload.json` 生成器，不动公共源数据（PRD 裁决）。

## 验收
- `node scripts/build-shell.mjs` 成功；产物里 `DATA.edgeMeta` 键数＝681；体积增量 ~80KB（5.31MB → 实测见工日志）。
- 抽查 3 条：key 与 `dependencies.json` 逐字一致。

## 取舍记录
- 边数组本身（`edges` 三元组）保持原样不换形状——模板里十几处消费它，附加字段零破坏。
