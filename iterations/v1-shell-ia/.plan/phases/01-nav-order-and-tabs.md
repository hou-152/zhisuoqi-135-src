# Phase 01 — 一级导航对调 + tab 归位

**Status**: `completed`
**目标**: 左栏一级导航变成「内参在上、知识体系在下」；`图谱 / 星球` 从三栏之上的全局顶栏移回**知识体系页内**（主区顶部）。
**前置**: 无

## 验收判据

phase 完成 = **下面所有判据全部满足**：

- [x] 打开 `http://127.0.0.1:5180/知所栖-壳.html`，左栏自上而下是：**品牌 → 搜索框 → 内参 → 知识体系**（内参在上）
- [x] `图谱 / 星球` 两个 tab 出现在**主区顶部**，只在主区范围内，不横跨列表栏、不占页面的第一行
- [x] 打开一个概念（右侧面板让位 412px）时，**tab 也跟着让位**，不被面板盖住
- [x] 页面第一行不再是那条 tab 板；品牌与列表栏标题在各自的栏内顶部
- [x] `node scripts/shot-shell.mjs` → **0 条 JS 报错**，13 步全过
- [x] `node scripts/test-daobi.mjs` → **断言全过、0 JS 报错**
- [x] 截图 `prototype/预览/25-主题-首屏.png` 与 `21-倒逼-输入框.png` 肉眼复核布局正确

## Tasks

- [x] 左栏导航顺序对调：`内参` 移到 `知识体系` 之前（默认选中保持「知识体系」）(`scripts/shell.template.html:274-275`)
- [x] 撤回上一轮的 grid 改动：`#app` 去掉 `grid-template-rows`、`#rail` 去掉 `grid-row:1/3`、`#list` / `#main` 去掉 `grid-column/grid-row`、窄屏 `@media` 里的 `#tabs` / `#main` 覆盖删掉 (`scripts/shell.template.html:27,30,69,93,207`)
- [x] `#tabs` 从 `#app` 直接子元素移回 `#main` 内部，恢复为 `.mtools`（`scripts/shell.template.html:103-106` 是样式定义，DOM 在 `#main` 内）
- [x] 恢复 `.mtools` 的 `position:absolute;top:0;left:0;right:0;height:44px` 与半透明渐变背景 + `backdrop-filter` (`scripts/shell.template.html:103-105`)
- [x] 恢复 `#main.pinned .mtools{right:412px}`（面板打开时 tab 让位）(`scripts/shell.template.html:96`)
- [x] `#hero-mini` 的 `top:0` 恢复为 `top:44px`（避开主区顶部的 tab 板）(`scripts/shell.template.html:112`)
- [x] `node scripts/build-shell.mjs` 重建 → `prototype/知所栖-壳.html` 721 KB；模板 JS `node --check` 通过
- [x] 跑 `shot-shell.mjs` + `test-daobi.mjs`：**0 JS 报错 / 断言全过**

## Notes

- 这一 phase **只动布局与顺序**，没碰列表栏内容。列表栏仍是 936 条概念——那是 phase 02/03 的事。
- 上一轮（09-13 03:5x）把 tab 提到三栏之上是所有者当时的要求（「内层的 tab 板要在更上方，优于知识体系」）；
  04:0x 他改口为「它不应该在顶栏，而是它在知识体系下面的那个 tab」。**这一 phase 执行后者**——
  两次要求都存在过，以最新的为准，理由记在这里供以后复盘。
- 断言跟着改了两处（导航顺序变了）：`scripts/test-daobi.mjs` ⑧ 那条改成 `内参|知识体系`；
  `scripts/check-public.mjs` 首屏那条同步。
- **默认入口**：仍选中「知识体系」（顺序只是顺序，不改默认）——plan.md 的 Open Questions 第 1 条据此关闭。
- **验收时踩到的路径坑（记下来免得再犯）**：所有者打开 `.../prototype/知所栖-壳.html` 拿到 **404**。
  服务的 `STATIC_ROOT` 就是 `prototype/`（`scripts/serve-lib.mjs:218-220`），所以壳的正确地址是
  **`http://127.0.0.1:5180/知所栖-壳.html`**，路径里**不能再带一层 `prototype/`**。
  另外根路径 `/` 走 `DEFAULT_PAGE`，打开的是**主产物「135 基础框架」，不是壳**——
  两个产物长得完全不一样，走错会以为改坏了。实测：`/` → 200（基础框架）、`/知所栖-壳.html` → 200（壳）、
  `/prototype/知所栖-壳.html` → 404、`/index.html` → 404。
