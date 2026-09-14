# Phase 05 · rebuild-verify：重建三产物 + 全套验收 + 文档同步

**状态**：completed（2026-09-15 实跑验收后回填）

## 做了什么
- 重建：`build-shell.mjs` → `知所栖-壳.html`；`build-public.mjs` → `deploy/zhisuoqi-135/index.html`（本地）；`build-app.mjs` → `app/dist`。
- 验收（serve 起在 5180）：`test-graph-view`（改准新版）· `test-path` · `test-daobi`（依赖 DeepSeek；超时照实记）· `test-learn-agent-loop` · `test-graph-page` · `check-public`（假域名 5199）· `shot-shell` · `test-app` · `check-concept-net`。
- 文档：AGENTS.md 产物行与命令注释项数、工作日志新条目、本迭代 phases 状态回填。

## 验收
- 全套脚本退出码 0（有例外逐字记录原因，不以「API 超时」凑绿）。

## 取舍记录
- 公网版本地重建**不 push**（改文件 ≠ 发布，线上要 push，所有者决定）。
