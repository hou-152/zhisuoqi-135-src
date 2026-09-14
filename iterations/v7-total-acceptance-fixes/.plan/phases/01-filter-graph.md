# Phase 01 · 筛选与图谱联动
Status: completed

## Tasks
- [x] 按当前期/日期范围计算内参分类与策展计数 (scripts/shell.template.html:3336-3348, node scripts/build-shell.mjs)
- [x] 零结果筛选项禁用并提供清空反馈 (scripts/shell.template.html:3349-3362, node scripts/build-shell.mjs)
- [x] 点击概念后画布节点高亮且镜头避让右侧详情 (scripts/shell.template.html:2250-2258)
- [x] 为上述行为补充 Playwright 验收 (node scripts/test-path.mjs; node scripts/test-graph-view.mjs; node scripts/test-mobile.mjs)

## 验收判据
单期交叉筛选结果、计数、空态一致；点击概念后节点在可视区且详情同步；桌面与移动无 JS 错误。

## Evidence
Phase 01 自测：路径、图谱、移动端脚本均通过；原有 superseded 断言仍有既存 false，未因本 phase 改动恶化。
