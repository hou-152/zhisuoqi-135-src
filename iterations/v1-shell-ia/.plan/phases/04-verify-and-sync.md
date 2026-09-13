# Phase 04 — 复验与文档同步

**Status**: `not started`
**目标**: 四套验收脚本按新层级更新并全部跑过；项目文档与代码一致；跑 PR Readiness Gate。
**前置**: phase 03 完成

## 验收判据

phase 完成 = **下面所有判据全部满足**：

- `node scripts/test-daobi.mjs` → 断言全过、0 JS 报错（断言已按新层级改写：左栏 2 项 / 中间栏 21 条主题 / 下钻 / 返回）
- `node scripts/shot-shell.mjs` → 13 步、0 JS 报错，截图序列覆盖「主题态 / 下钻态 / 内参 / 倒逼」
- `node scripts/check-public.mjs` → 全过（**必须假域名 + `--host-resolver-rules` + `--no-proxy-server`**）
- `node scripts/test-app.mjs` → 12/12（桌面版；`app/assets/prototype/知所栖-壳.html` 已同步）
- `prototype/知所栖-135-公网版.html` 与 `deploy/zhisuoqi-135/index.html` 已重建（**不 push**）
- `SOURCE_OF_TRUTH.md` 行 45（壳的描述）、`AGENTS.md` 产物表 + 命令注释、`docs/工作日志-知所栖135.md`（追加一节）、
  `docs/前端契约-知所栖135.md`（屏幕表第 0 行）四处已与新层级一致
- PR Readiness Gate 十项逐条给出结论，写进 `plan.md` 的收口记录

## Tasks

- [ ] 改写 `test-daobi.mjs` ⑧⑨ 断言：左栏两项顺序 / 中间栏 21 条主题 / 下钻 / 返回后 filter 清空
- [ ] 改写 `check-public.mjs` 首屏断言与主题相关断言（`#lrows` 已不存在）
- [ ] 更新 `shot-shell.mjs` 步骤与截图命名（主题态 / 下钻态各一张）
- [ ] 跑四套验收，贴完整结果
- [ ] 重建公网版 + 同步 `app/assets` 副本
- [ ] 同步四份项目文档
- [ ] 跑 PR Readiness Gate，把结论写进 `plan.md` 收口记录

## Notes

- **不 commit、不 push**：本仓库由所有者或并发会话提交（09-13 已有另一个会话在提交）。
  这一 phase 只准备 commit message 草稿，交给所有者。
