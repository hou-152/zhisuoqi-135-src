# Phase 01 · tab 边界与筛选状态
Status: completed

## Tasks
- [x] 固定四个一级 tab 及其内部视图名称 (scripts/shell.template.html:833-840)
- [x] 为探索、内参、知识体系、实践空间分离搜索与筛选状态 (scripts/shell.template.html:970-985, 2700-2728)
- [x] 修复 `agent` 等搜索词跨 tab 残留导致主题列表缩成一项 (scripts/shell.template.html:979-986, 3240-3260)
- [x] 为无结果和清空状态提供可见反馈 (scripts/shell.template.html:1283-1288, 2730-2732, 3360-3361)

## 验收判据
在任一 tab 输入筛选词，切换其他 tab 后其他内容集合不变；探索不再复用知识体系主题筛选；刷新和后退不白屏。

## Evidence
自测：`node scripts/build-shell.mjs` 成功；`node scripts/test-path.mjs` 全部通过、0 JS 报错。既有 test-daobi 的两个概念判定失败项仍属既有问题，未由本 phase 引入。
