# v6-responsive · 移动端根修 + 审计遗留收口

> PRD：[../PRD.md](../PRD.md)。状态在 phases/ 回填。

| # | 阶段 | 一句话 | 状态 |
|---|------|--------|------|
| 01 | drawer-nav      | ≤1100px 左栏抽屉化＋顶栏收纳     | not started |
| 02 | mobile-readable | 内参已选行/月历移动可读          | not started |
| 03 | boundary-afford | 翻期边界禁用态；面板点外关       | not started |
| 04 | exit-regression | 系统视图退出闭环断言入套件       | not started |
| 05 | mobile-suite    | 新增 test-mobile.mjs + 全套验收  | not started |

## 关键决策
- 2026-09-15：撤「≤1100px 直接 display:none #list」旧断点，抽屉为唯一下档形态。
- 2026-09-15：抽屉关闭走 lp-body 事件委托，不在业务函数里散布。
