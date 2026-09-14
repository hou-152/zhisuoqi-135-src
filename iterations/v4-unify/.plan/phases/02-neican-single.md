# Phase 02 · neican-single：默认单期 + 翻期 + 已选行
**状态**：completed（2026-09-15）
- openNeicanHome 默认选中最新一期（单期不串期——串期感来自旧默认「全部」堆叠态，实测单期 days=1）；「全部」降级按钮。
- issueCard(iss, nav) 单期时期头带 ‹ ›（neiStep(±1)，按 NEI_ALL 倒序翻）。
- 已选行：neiShort() 短格式「已选 9月14日 周一 · 8 篇」；.cf 改上下两行 + nowrap/ellipsis——根因是 date+weekday 无空格直连且窄列 ~100px。
- 断言：check-public 内参三步改准（单期/翻期/回集合）。
