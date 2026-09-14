# Phase 04 — remove-learn-entry：撤知识体系学习入口

**Status**: `completed`（2026-09-15 自测全过，未 commit——commit 由负责人执行）
**目标**: 知识体系回归纯浏览：撤概念卡/路径条上下文的学习入口，内参入口保留。
**前置**: Phase 01-03 ✅（学习在实践空间有家，撤入口不断头路）。

## 验收判据

- 概念卡路径上下文（.pctx）：「学习这个 · 第 N 章」「学习空间 · 六章」两个按钮已撤，保留 01 决策场与前置理由 ✅
- 概念卡「学习空间」块改为「实践空间 · 课程入口」：只有「去实践空间学习 →」导航，无六章总览、无直接开课 ✅
- #pbody 无任何 openLearnFor/openLearnIndex 入口（openLearnFor 保留给实践空间 origin 卡） ✅
- test-path 新增 ⑪b-5 三条纯浏览断言，全过（总数 110） ✅
- test-learn 进入路径改准为实践空间进入；「返回知识体系恢复原路线/步骤/概念」旧语义随入口退役，改为「退回实践空间」 ✅
- 九条回归全绿 ✅

## Tasks

- [x] 撤 .pctx 两个学习按钮；loop-note 改口径说明（知识体系只浏览，课程在实践空间） (scripts/shell.template.html .acts/.loop-note)
- [x] 概念卡 caseMvpLink 改为「实践空间 · 课程入口」导航块 (scripts/shell.template.html caseMvpLink)
- [x] 删 learnEntryLabel（无引用死代码）；openLearnFor 保留（2805 实践空间 origin 卡在用）
- [x] test-learn 进入路径改准（实践空间 practiceEnter('unit:chapter-agent')）＋⑥ 返回语义改准 (scripts/test-learn-agent-loop.mjs)
- [x] test-path ⑪b-5 三条纯浏览断言 (scripts/test-path.mjs)
- [x] 重建壳 ＋ 九条回归全绿

## 改准的既有断言（一条没删，语义随入口迁移）

1. test-learn「路径第 1 步按钮=学习这个·第 1 章」→「实践空间主线第 1 章可进入」（入口换了，覆盖的进入语义不变）
2. test-learn ⑥ 段 6 条恢复断言 → 3 条「退回实践空间」断言（旧语义依附被撤的入口；#learn= 直达入口的复现语义在 ⑦ 不动）
3. test-path「路径条进来时的返回行为」断言原样保留（openLearnFor 函数行为没变，它现在服务实践空间 origin 卡）

## 回归数字（本轮终态）

check-graph 465/0 · test-graph 281/0 · test-graph-page 40/0 · test-learn-agent-loop 全过 · test-path **110**（107+3）· check-learning-materials 581/0 · check-batch-units 113/0 · test-batch-walk 16/0 · test-feynman-teaching-map 117/0

## Notes

- 学习入口现状：实践空间（主线/七站/继续学）＋ 内参文章页；#learn=<id>&review=1 直达保留（复现/审核用，⑦ 验着）。
- 概念卡上原来的「学习这个」（focusProof 滚到倒逼交卷框）是概念卡倒逼的原始交互，不是课程入口——保留，注释已写明区别。
