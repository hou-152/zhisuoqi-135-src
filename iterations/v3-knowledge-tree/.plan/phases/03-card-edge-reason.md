# Phase 03 · card-edge-reason：先懂这些/解锁带上强度与理由

**状态**：completed（2026-09-15 实跑验收后回填）

## 做了什么
- 概念卡「要理解它，先懂这些」「懂了它，才能懂这些」两列的每一行：`L{n}` 后追加 `· hard/soft`＋一句理由（`DATA.edgeMeta`，截 60 字）；没有 meta 的边照实不摆（保持原样）。
- 不重排卡片既有区块（PRD 裁决：BOK 内容卡上早已齐备，只做增量）。

## 验收
- `test-graph-view.mjs` 新增断言：挑一条 hard 边的两端 `openPanel`，`pbody` 含「hard」与理由片段。
- 手查：无前置的起点概念卡不出现空理由。

## 取舍记录
- 理由来自 `dependencies.json` 的 `reason` 字段（llm origin、audit=yes 的那批），与路径视图 `mapHard/mapSoft` 同源同口径。
