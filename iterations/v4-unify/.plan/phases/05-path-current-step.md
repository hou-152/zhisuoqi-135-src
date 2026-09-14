# Phase 05 · path-current-step：路径当前步视角
**状态**：completed（2026-09-15）
- 根因：路线跨 8 列（固定列宽 264），整条入画缩到 ~0.35→「只显示一点点」（v3 之前就有，非 v3 回归）。
- routeFit=step（默认）：当前步为中心 zoom≈(W-282)/860∈[0.55,1.2]；「看整条」按钮（pr-kicker 内）切 full（原整条公式保留）。
- pickRouteStep/gotoRouteStep 跟随当前步 instant 对焦；setMode('path') 缓动入景。
