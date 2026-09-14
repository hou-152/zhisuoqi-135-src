# Phase 02 — concept-book：概念全书 1070 页轻学习

**Status**: `completed`（2026-09-15；未 commit）
**目标**: 实践空间新增「概念全书」第三环：读一句定义 → 用自己的话讲一遍 → 有反馈。零模型调用出料；轻反馈复用判定口径。

## 验收判据
- 实践空间入口卡（页数＝DATA.nodes 实时数，不写死）✅
- 全书目录：搜索（名称/别名/定义）＋ 21 主题下拉收窄 + 前 60 条列表（讲过/有漏 状态标）✅
- 轻学页：定义 + 换个讲法（折叠）+ 怎么算会了 + 讲一遍框；只能认的类照实「不用讲一遍」✅
- 轻反馈：复用 judgeCall（与概念卡同一判定口径），固定响应断言——「漏了」照实显示、状态写独立键 zss135.book.v1、**不写掌握标记（marks）、不动解锁状态** ✅
- 明面无内部 token ✅
- test-path **115**（110 + ⑫ 5 条）全过 ✅
- 截图：prototype/预览/61-概念全书-目录.png · 62-概念全书-轻学页.png ✅

## Tasks
- [x] openPractice 面板分发扩展（book / bookpage）＋ 面包屑/标题/元信息人话 (scripts/shell.template.html)
- [x] practiceBookHtml（目录）＋ practiceBookPageHtml（轻学页）＋ bookJudge（复用 judgeCall，状态独立）＋ 入口卡 (scripts/shell.template.html)
- [x] test-path ⑫ 5 条断言（入口/搜索/开页/固定反馈/回目录） (scripts/test-path.mjs)
- [x] 重建＋截图＋回归

## Notes
- 料全部来自壳内已有数据（DATA.nodes 的 gloss/feynman/ap/evidence），无新管线、无模型调用；「怎么算会了」覆盖率在目录页照实显示（`withAp` 计数）。
- 轻反馈的判定质量＝概念卡同一套（真模型），波动口径同前（记波动不记漂移）。
- 全书学习不产生任何路线/解锁/掌握标记——它是「随便翻」的轻层，与主线/七站的验收链互不影响。
