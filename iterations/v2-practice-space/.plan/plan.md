# v2-practice-space · 实践空间接线：主线 + 七站一条向前的路

> 文件位置：`iterations/v2-practice-space/.plan/plan.md`
> 配套 skill：first-flight-phases · PRD：[../PRD.md](../PRD.md)
> 状态跟踪在各 phase 文档（`phases/NN-*.md`），本表只做总览。

## 背景

实践空间现在是 83 行看板 + 76 个可进单元，但没有「路」：看不到顺序、看不到自己学到哪。负责人 09-15 定了形态（多邻国式 Agent Loop 循环、只保证反馈）与边界（知识体系＝浏览层，实践空间＝唯一学习层，两层不串联）。七站路线草案已生成待拍板（`docs/实践空间路线草案-20260915.md`）。不做的代价：76 个单元是一盘散沙，264 条判据永远等不到真实轨迹来激活。

## 范围

**做：**
- 路线配置文件化进壳（draft → 拍板 → 定稿，页面标「草案」）
- 实践空间主区重构：继续学区 / 主线六章区 / 七站路线区 / 折叠看板
- 「继续学」接 realHuman 真实轨迹，当前步高亮、走完前进
- 撤知识体系全部学习入口（概念卡、路径条），内参入口保留
- 新增黑盒断言；被牵动的既有断言逐条改准，不删凑绿

**不做：**
- 图谱排课 / 自动解锁（224 条已审前置与 76 单元交集为 0）
- 六章内容与判据撰写、Render 部署、只读 API 出口（另起线）
- 登录 / 多端 / 埋点 / 窄屏专门适配

## 阶段总览

| #  | 阶段 slug           | 一句话目标                                   | 状态        |
|----|---------------------|----------------------------------------------|-------------|
| 01 | route-data          | 路线配置进壳 payload，断言 76 单元一一对应    | completed   |
| 02 | route-view          | 实践空间主区重构为 主线+七站+折叠看板         | completed   |
| 03 | continue-learning   | 继续学接真实轨迹，当前步高亮、走完前进        | completed   |
| 04 | remove-learn-entry  | 撤知识体系学习入口，牵动断言逐条改准          | completed   |
| 05 | plain-and-spread    | 黑话下架＋七站铺开（负责人 09-15 表现形式反馈） | completed   |
| 05 | five-type-unfold    | 路线行铺开五类语义骨架（QST/CON/CAS/OPI/SOL）| in progress |

> 状态值：`not started` / `in progress` / `completed` / `blocked` / `skipped`

## 关键决策

- **2026-09-15**：顺序放独立配置文件（`evidence/practice-route-260915/route-draft.json`）而非烘进模板——拍板会多轮改，生成器可复算，改顺序不碰准入门逻辑。
- **2026-09-15**：撤学习入口放最后一个 phase——它牵动既有断言最多，先立（路线）后破（撤入口），每步可独立验收。
- **2026-09-15**：「继续学」只认 `realHuman: true` 轨迹，与 criteria-activation 同口径；脚本扮演的轨迹不驱动页面进度。
- **2026-09-15**：拍板前页面照实标「草案」；定稿动作＝负责人拍板后配置文件 `status` 字段转 `final`，页面标记随之消失。

## Open Questions

- [ ] 七站站内组内顺序待负责人拍板（草案序已给）——预期 phase 01 兼容 draft/final 两态，拍板随时可落
- [ ] 「继续学」在「只有第 1 章有轨迹」时的落点口径（回第 1 章下一步 vs 主线下一格）——预期 phase 03 用真实数据裁决

## PR Readiness Gate

> 只在本迭代准备交付 / 合并 / 上线前跑；不是每个 phase 都跑。

**状态**：`passed`（2026-09-15；commit 未执行——按项目规则由负责人提交）

- [x] 原始意图复核：PRD / plan.md 已重读，四 phase 与 PRD 范围一致，无 scope creep（图谱排课 / 部署 / API 出口确实没碰）
- [x] 主分支同步：`git status` 已核；并行会话（v3-knowledge-tree）改动一字未覆盖
- [x] 对抗式 review：撤入口后全库 grep 无残留引用；test-graph-view 38 项与 test-concept-net-page 27 项补跑全绿（防知识树/概念网络被概念卡区块改动牵连）；发现并记录 AGENTS.md 常用命令缺 check-batch-units 行（并行同步时掉的管理）
- [x] 端到端测试：九条回归全绿——check-graph 465 · test-graph 281 · test-graph-page 40 · test-learn-agent-loop 109 全过 · test-path 110 · check-learning-materials 581 · check-batch-units 113 · test-batch-walk 16 · test-feynman-teaching-map 117
- [x] 前端真实层验证：全程 CDP 真 Chrome，console 零错误；截图 45/46/47（实践空间三态）
- [x] Evidence 汇总：见各 phase 文档 Tasks 行尾与「回归数字」表
- [x] 文档同步：AGENTS.md（test-path 110 / test-learn 109 / 壳产物行 09-15 v2-practice-space 段）· 工作日志第三十二轮 · CONTEXT.md（知识体系/实践空间边界，本轮早先已记）
- [x] 静态检查：不适用（无 lint/build 链；构建＝build-shell，已跑）
- [x] PR 草稿：见下

**收口记录**：
- 原始意图：实践空间从看板变成「主线＋七站一条向前的路」，继续学接真实轨迹，知识体系回归纯浏览（两层不串联）。
- 实际完成：四 phase 全部；路线配置进壳（草案标记）、四区块主区、继续学接 realHuman 轨迹＋当前步高亮、知识体系撤学习入口（学习入口收敛＝实践空间＋内参＋#learn 直达）。
- 验证：上面九条回归 + 补跑两条＝11 条全绿；新增断言 22 条（9+4 改准+9 视图+6 继续学+3 纯浏览，含 2 条反证探针）；改准既有断言 8 条、删除 0。
- Evidence：`iterations/v2-practice-space/.plan/phases/01-04` 各文件 · 截图 `prototype/预览/45,46,47` · 路线配置 `evidence/practice-route-260915/route-draft.json`（校验和随生成器输出）。
- 风险 / 未决：① **build-shell.mjs 与 shell.template.html 的工作区 diff 混含 v3-knowledge-tree 两流改动**，commit 边界需负责人裁决（同文件两流，逐文件 add 分不开；建议等知识树会话先提交，或合并为一条提交并在 message 里两流分账）；② 七站顺序仍为草案，待拍板；③ continuePoint 是构建时快照；④ AGENTS.md 常用命令缺 check-batch-units 行（既有漂移，照实留裁）；⑤ check-public 未跑（deploy 产物是并行会话交卷版，本轮未重建 deploy——改文件 ≠ 发布）。
- PR 草稿：见对话（commit message 由负责人执行）。

## 关联

- 当前迭代 PRD：[../PRD.md](../PRD.md)
- 长期锚点（项目根）：[AGENTS.md](../../../AGENTS.md) / [SOURCE_OF_TRUTH.md](../../../SOURCE_OF_TRUTH.md) / [CONTEXT.md](../../../CONTEXT.md)
- 路线草案：[docs/实践空间路线草案-20260915.md](../../../docs/实践空间路线草案-20260915.md)
