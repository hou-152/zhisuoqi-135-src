# Phase 02 — route-view：实践空间主区重构

**Status**: `completed`（2026-09-15 自测全过，未 commit——commit 由负责人执行）
**目标**: 实践空间主区从 83 行看板重构为 继续学 → 主线六章 → 七站路线 → 单篇 → 批量说明 → 折叠看板。
**前置**: Phase 01 ✅（payload 里有 DATA.practice.route）。

## 验收判据

- CDP 黑盒：路线卡 7 站头 + 76 行路线节点（.ru）；console 0 报错 ✅
- 锚点位 6 行，写「已被六章取代 → 去学六章这一章」，点击打开的是六章 ✅
- 开放单元可点进 #learn（同一套阅读器），未开放给「为什么不能学」 ✅
- route.status=draft → 页面照实标「顺序草案 · 待课程组长拍板」 ✅
- 看板折叠成 `<details>` 默认收起，openPracticeBoard 仍可用（既有看板断言全保留） ✅
- 九条回归全绿 ✅

## Tasks

- [x] shell.template.html practiceIndexHtml 重写（四区块；路线行用独立 .ru 类，「.pu 一行=六章/单篇」断言口径不破） (scripts/shell.template.html practiceIndexHtml/practiceRouteRow + CSS .ru/.rstation/.rdraft/.pfold)
- [x] 看板折叠化（原生 details，四类计数 chip 在折叠体，头部写「为什么有的还不能学」）
- [x] CDP 断言 ⑪b-3 九条（结构 / 草案标记 / 锚点位 / 进入 / chip / 折叠 / 继续学兜底） (scripts/test-path.mjs)
- [x] 截图：prototype/预览/45-实践空间-七站路线-首屏.png · 46-…-中段.png（真 Chrome）
- [x] 九条回归全绿（见 Notes）

## 回归数字（本轮终态）

check-graph 465/0 · test-graph 281/0 · test-graph-page 40/0 · test-learn-agent-loop 全过（连跑 2 次）· test-path **101**（88+4 路线数据+9 路线视图）· check-learning-materials 581/0 · check-batch-units 113/0 · test-batch-walk 16/0 · test-feynman-teaching-map 117/0

## Notes

- **并发实录**：编辑模板时两度撞上并行会话写入（03:32:44 落了 191 行后停笔）；等写入静止后按当前状态重读再改，未覆盖对方任何字节。并行会话期间还落了三个 commit（b1f3637 顶栏搬迁收尾 / d5ff24a 计划书 v0 / 46af186 工作日志第三十轮），其中 b1f3637 把 test-path 断言口径改到 90——我的路线断言与它共存无冲突。
- **一次偶发红**：九连跑中 test-learn-agent-loop 出现过一次 57 条 null 失败；同一壳连跑 2 次全绿 + 手工探针全过 → 判定为重建壳（3.5MB writeFileSync）与测试读取并发造成的撕读，不是产品问题。已在回归纪律里记：重建后等 1 秒再跑测试。
- 继续学区是 phase 02 的兜底态（文案+按钮写死第 1 章）；真实轨迹接线在 phase 03。
