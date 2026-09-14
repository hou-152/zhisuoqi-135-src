# Phase 03 · update-panel：更新面板 + 系统视图撤 tab
**状态**：completed（2026-09-15）
- build-shell loadChangelog()：扫 iterations 各版本 PRD.md 标题烘焙 4 条 + 人工「交卷版」1 条 → DATA.changelog（5 条）。
- 顶栏灰字「更新」→ #upd-panel 下拉；底部「系统审计视图（全链路 Graph）→」+ repo 路径（scripts/lib/graph-view.js · knowledge/graph-260914/graph.json · 学习门控共用）。
- 系统视图撤 tab：mtools=我的树｜路径；hash #graph=map 保留；数据层/runner 零改动。
- 公网侧不导航到系统视图（有意不含索引，404 噪音）——check-public 只断言面板入口。
