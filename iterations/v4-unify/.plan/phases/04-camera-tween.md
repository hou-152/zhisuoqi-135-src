# Phase 04 · camera-tween：镜头缓动
**状态**：completed（2026-09-15）
- camTo/camTick/camApply/camStop：zoom/panX/panY easeOutCubic 420ms；render 每帧推进。
- 套用：focusGrid（点主题下钻/树切换）、fitAll、focusRoute；boot/resize/{instant}；滚轮与画布按下即断。
- 断言：test-graph-view §⑥ 点主题 panX -2168→-56 且起步未到位（动画非瞬移）；fitAll sleep 500→1000。
- 坑：shot-shell 命中偏移回归在缓动中取坐标会点空——eval 里 camStop() 冻结后再点。
