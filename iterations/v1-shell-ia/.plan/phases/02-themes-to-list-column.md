# Phase 02 — 主题搬进中间栏

**Status**: `completed`
**目标**: 21 条主题从**左栏**搬到**中间栏**，成为中间栏的默认态（L2）；左栏只剩品牌 + 搜索 + 两个一级导航项。
**前置**: phase 01 完成

## 验收判据

phase 完成 = **下面所有判据全部满足**：

- [x] 打开壳、停在「知识体系」，**中间栏列的是 21 条主题**（不是 936 条概念）
- [x] 每条主题显示：颜色点 + 主题名 + 该主题下的概念数
- [x] **左栏不再有主题列表**（`.r-sec` / `.r-lines` / `.lrow` 及其 CSS 已删，`buildLegend()` 不再存在）
- [x] 列表栏标题从「知识体系」变成「**主题**」（层级名称跟着走）
- [x] 点一条主题：**画布只亮这一列**（其余列变淡）+ 该行高亮，再点一次取消
- [x] 切到「内参」再切回来，中间栏仍正确显示主题（不残留概念列表）
- [x] `node scripts/shot-shell.mjs` → 0 JS 报错；`node scripts/test-daobi.mjs` → 断言全过
- [x] 截图 `prototype/预览/25-主题-首屏.png` 肉眼复核：左栏干净、中间栏 21 条主题带数字

## Tasks

- [x] `renderList()` 的 `graph` 分支改为渲染 21 条主题（复用 `groups()` / `groupCount()` / `setFilter()`）(`scripts/shell.template.html` 的 `renderList` graph 分支)
- [x] `VIEW_TITLE` 里 `graph` 的标题改为「主题」(`scripts/shell.template.html:955` 附近)
- [x] 移除左栏的主题列表 DOM（`.r-sec` / `.r-lines` / `#lrows`）与其 CSS（`.r-sec` / `.r-lines` / `.lrow` 全套，共 15 行）
- [x] 移除 `buildLegend()` 与 `boot()` 里的调用；`setFilter()` 保留但改为只做「改状态 → `computeLayout()` → `renderList()`」
- [x] 中间栏的主题行复用 `.row` 样式（颜色点用 `.rd`、名称 `.rn`、数字 `.rm`），选中态 `.row.on`
- [x] 重建 `prototype/知所栖-壳.html`（719 KB）+ 公网版 + `app/assets` 副本
- [x] `test-daobi.mjs` ⑧ 段按新层级改写（见 Notes），跑过

## Notes

- **本 phase 不做下钻**：点主题只筛选画布，中间栏内容不变（仍是 21 条主题）。下钻是 phase 03。
  分开的理由记在 plan.md 关键决策第 3 条。
- 左栏主题列表是 09-13 04:0x 按 candobear BoK 参考图做上去的（`.r-sec` + `.lrow`，8px 圆点 + 右对齐数字）。
  **那套视觉没白做**：同样的信息（颜色点 + 名称 + 数字）现在长在中间栏的 `.row` 结构里，视觉语言一致。
- `ST_COLOR` 与 `KIND` 在 `renderList` 里暂时没有调用方了（概念行搬去 phase 03），**故意保留没删**——
  phase 03 的概念行要原样用回来（层级 L0-L5 + 验收状态点）。
- **test-daobi ⑧ 段改写了 7 行**：`列表栏 936 行` → `中间栏 21 条主题`；`左栏主题分类 21 条` → `三级概念默认隐藏`；
  主题行的选择器从 `#lrows .lrow` 改成 `#lp-body .row`（圆点类名也从 `.dot` 改成 `.rd`）；
  「点一条主题」那条改成**从行文本反查 tag id**（不再依赖 `data-g`）。
- 模板 1136 → **1100 行**（删了左栏图例的 DOM + CSS + `buildLegend()`）。
