# Phase 05 — plain-and-spread：黑话下架＋七站铺开

**Status**: `completed`（2026-09-15 自测全过，未 commit；3 条红属并行会话 v4-unify 在途改动，见 Notes）
**目标**: 学习者明面说人话；七站每站独立成节、步骤卡片化、每步带一句人话简介。
**前置**: Phase 01-04 ✅。依据：负责人 09-15 反馈（维特根斯坦「语言游戏」——内部黑话外人看不懂，展示页是给外人的费曼场合；「全面铺开」＝一节太瘪；「表现力」＝排版）。

## 验收判据

- 实践空间明面（默认打开的 #reader 各卡可见文本）无内部 token：cm_/CON-/QST-/CAS-/OPI-/SOL-/sha256/indexOf/verdict/superseded（黑盒断言）✅
- 内部口径没删：审核对账整体移进 `#practice-qa-fold`（折叠，textContent 里全量保留：逐字三查 / 待验证区分度 / verdict=usable / 空数组≠满足）✅
- 七站铺开：7 张独立站卡（`.proute`，大站号＋站名＋那一问当标题＋步数）＋76 张步骤卡（`.rucard`：名称＋打底/用到再学/深挖 标签＋remember 一句话＋进入按钮）；重复主题占位卡改人话「在主线六章里 · 去学六章这一章」✅
- 学习阅读器明面撤五类 ID：材料标签改人话（这一章的问题/核心概念/场景/判断依据/怎么做），出处全部转 `data-src`/`data-basis`/`data-checks`/`data-case` 数据层；唯一白名单＝authored 正文一句「以 CON-agent 的行为口径为准」（负责人审过的材料文字，不静默改源材料——内容修单独列待裁决）✅
- 九条回归：数据层六条全绿（check-graph 465 · test-graph 281 · check-learning-materials 581 · check-batch-units **114**（⑩+C9 remember 校验）· test-batch-walk 16 · test-feynman 117）；test-learn **109 全过**；test-path 我流断言全过（仅剩 1 条红＝并行 v4-unify 导航数断言，非本流）✅
- 截图：prototype/预览/45（首屏）/46（七站铺开中段）/47（继续学）已刷新 ✅

## Tasks

- [x] 生成器给路线行加 remember（读卡 yaml `remember` 字段，纯搬运；76/76 张卡都有，check ⑩ C9 校验） (scripts/draft-practice-route.mjs)
- [x] 模板：路线改为「导语卡＋7 张站卡＋卡片网格」；主线 meta 人话化（去 cm_/CON-/负责人已确认）；批量说明改人话＋审核对账收进 details；单篇卡人话化 (scripts/shell.template.html)
- [x] 学习阅读器：read()/右栏材料/边界块/正文流引文/决策解析依据/候选案例块/要点 ID 行/重点补讲头与状态戳——全部 ID 转 data-*；标签人话化 (scripts/shell.template.html renderLearn 等)
- [x] 断言改准：test-path ⑪b-3 按新 DOM 重写＋新增明面无黑话断言＋批量卡断言改「人话在明面、对账在折叠」；test-learn 五类 ID 断言反转（明面不带、数据层在）＋显式白名单 1 处 (scripts/test-path.mjs / test-learn-agent-loop.mjs)
- [x] 重建＋截图＋回归

## Notes

- **顺手修了一个客观语法错误**：并行会话 v4-unify 04:51 写入模板的注释里含 `iterations/*/PRD.md`，`*/` 把注释块提前关闭导致整页 JS 语法崩（页面没初始化）。做了最小修复（注释内改写「iterations 各档的 PRD.md」），已如实记录——不是我的流，但不修谁都跑不了。
- **3 条红属并行流**：tab 板三格/一级导航数/返回条文案——是 v4-unify 在途改动引入（他们的半成品被我重建时烘进产物），未替他们改断言。
- 内容修订待裁决：authored 正文 1 处引用内部 ID（CON-agent 行为口径那句）；修语料要动 chapters/authored.json 并重跑材料体检，交负责人定。
- CONTEXT.md 可补一条「学习者明面 / 内部台账」双层口径——本轮先落在 phase 文档与代码注释里。
