# Phase 03 — continue-learning：继续学接真实轨迹

**Status**: `completed`（2026-09-15 自测全过，未 commit——commit 由负责人执行）
**目标**: 「继续学」落点由 realHuman 真实轨迹驱动；当前步高亮、走过的打勾。
**前置**: Phase 02 ✅。

## 验收判据

- continuePoint 只认 `realHuman===true` 轨迹：页面显示「上次学到 1. Agent · 2026-09-15 · 2 轮」＋来源文件（截图 47）✅
- 「继续学」点击直接落进上次单元（#learn，learnCur=agent）✅
- 主线当前步：Agent 行带 .cur 外框 ＋「当前」徽标，唯一 ✅
- 反证：realHuman:false 轨迹驱动不了页面（回兜底文案）；探针 realHuman 指向批量单元时路线行 .cur 高亮，清理后无残留 ✅
- 九条回归全绿 ✅

## Tasks

- [x] build-shell attachPracticeTrajectory：读 trajectories-260914/trajectories.json，realHuman 过滤 ＋ lastAt 排序，算出 continuePoint（unitId 页面口径） (scripts/build-shell.mjs)
- [x] practiceContinuePoint() 页面侧再挡一道：realHuman!==true 或落点解析不到 → 兜底；继续学卡动态化 (scripts/shell.template.html)
- [x] 路线/主线当前步高亮：.cur 外框 ＋ .cur-tag「当前」徽标；章节完成标 ✓（chapterCleared） (scripts/shell.template.html + CSS)
- [x] test-path 断言：原兜底断言按新现实改准 ＋ 新增 6 条（真实落点 / 与 trajectories.json 逐字一致 / 唯一高亮 / 点击落点 / false 反证 / 批量探针与清理） (scripts/test-path.mjs)
- [x] 截图 prototype/预览/47-实践空间-继续学-真实轨迹.png；九条回归全绿

## 回归数字（本轮终态）

check-graph 465/0 · test-graph 281/0 · test-graph-page 40/0 · test-learn-agent-loop 全过 · test-path **107**（101+6）· check-learning-materials 581/0 · check-batch-units 113/0 · test-batch-walk 16/0 · test-feynman-teaching-map 117/0

## Notes

- 轨迹数据现状：trajectories.json 现有 2 条（1 realHuman：agent 章 2 轮，最后反馈 2026-09-15T01:29:59；1 合成 realHuman:false 已照实排除）。
- 「走完前进」的语义：continuePoint 是 build 时从 trajectories.json 算的快照；负责人走完新单元后需重建壳（或后续把轨迹上报接进 /api）才会前进——本轮照实标注来源文件，不装自动。
- 探针踩坑记录：PRACTICE 与 DATA.practice 是同一引用，「还原」必须先存原值再覆写，自我赋值等于没还原（第一次跑就抓出来了）。
