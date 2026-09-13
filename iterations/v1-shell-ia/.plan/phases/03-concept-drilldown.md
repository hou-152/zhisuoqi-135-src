# Phase 03 — 概念下钻（三级）

**Status**: `completed`
**目标**: 点一条主题 → 中间栏换成**该主题下的概念列表**（L3），顶部带「← 全部主题」返回；概念因此默认是隐藏的。
**前置**: phase 02 完成

## 验收判据

phase 完成 = **下面所有判据全部满足**：

- [x] 默认态中间栏是 21 条主题；**936 条概念默认不出现**（「三级可以隐藏」成立）
- [x] 点一条主题 → 中间栏换成该主题下的概念列表，顶部出现「**← 全部主题**」面包屑
- [x] 标题位置显示当前主题名与概念数（如「上下文工程 169」）
- [x] 点「← 全部主题」→ 回到 21 条主题，**画布筛选同时清掉**（不出现「列表回全部、画布还只亮一列」的错位）
- [x] 概念行显示：概念名 + 依赖层级（L0–L5）+ 验收状态点
- [x] 点概念行 → 右侧面板打开该概念（`openPanel()` 行为不变）
- [x] 切到「内参」再切回「知识体系」→ 回到**主题态**（不记忆上次下钻的主题）
- [x] `shot-shell.mjs` → 0 JS 报错；`test-daobi.mjs` → 断言全过；`check-public.mjs` → 全过
- [x] 截图 `25b-主题-下钻概念.png` / `25c-主题-返回全部主题.png` 肉眼复核

## Tasks

- [x] `currentView` 增加第三态 `theme` + `themeId` 状态 (`scripts/shell.template.html:934`)
- [x] `renderList()` 增加 `theme` 分支：渲染该主题下的概念行（按 `level` 再按名称排序）(`scripts/shell.template.html:965-980`)
- [x] 中间栏顶部加面包屑按钮 `#lp-back`（`scripts/shell.template.html:266`）
- [x] 点主题行 → `setView('theme', tagId)`；标题与面包屑跟着层级走 (`scripts/shell.template.html:946-950`)
- [x] `setView(v, tid)` 支持带主题 id，并在回 `graph` 时清掉 `themeId` 与 `filter` (`scripts/shell.template.html:1003-1015`)
- [x] `refreshRail()` 的 `main-meta` 跟层级走：主题态显示「主题名 · N 个概念」(`scripts/shell.template.html:920-926`)
- [x] 重建壳 + 公网版 + `app/assets` 副本；跑三套验收

## Notes

- **顺手清掉一个冗余**：`lp-head` 右侧原来那个「全图」按钮，phase 03 把它的文案改成「全部主题」后，
  跟左侧面包屑**功能完全重复**，已删掉（`#lp-back` 一个就够）。
- **改了一处口径（重要）**：`matches()` 从 `(x.tags||[]).includes(filter)` 改成 `(x.tags||[])[0] === filter`
  （`scripts/shell.template.html:574-579`）。原因：中间栏数出来的条数、画布上那一列的点数、筛选后剩下的点数，
  **三个数字必须一致**——原来 `includes` 把「相关标签」也算进来，三个口径对不上。改完统一到**主标签**。
- **没做**：下钻态不记忆（切走再切回回到主题态）；单主题最多 169 条不虚拟滚动；主题态没有「只看不进去」的中间态。
- 新增截图 `25b-主题-下钻概念.png`（面包屑 + 概念列表 + 画布只亮一列）、
  `25c-主题-返回全部主题.png`。`shot-shell.mjs` 从 13 步变 **15 步**。
- **测试工装又踩一次同类坑**：`check()` 的 `want` 会被 `String()` 化比较，第一版把 `want` 写成 `null`，
  结果拿 `'null'` 去比实际值 `'45/45|OK'` → 假失败。**产品是对的，断言是错的**，已改成 `'OK'`。
