# v4-unify · 命名统一 + 内参/路径/镜头 UX 收口 + 探索内嵌首页

> 文件位置：`iterations/v4-unify/.plan/plan.md` · PRD：[../PRD.md](../PRD.md)
> 状态跟踪在各 phase 文档（`phases/NN-*.md`）。

## 范围

**做：** 导航改回「知识体系」+ 探索置顶 · 内参默认单期+翻期+已选行短格式 · 顶栏更新面板（changelog 烘焙）· 系统视图撤 tab（hash 保留）· 镜头缓动 · 路径当前步视角 · 探索/AI 内嵌首页三步引导。
**不做：** 队友前端合并（07 占位，等源码）；AI 对话后端；系统视图内容改动。

## 阶段总览

| #  | 阶段 slug          | 一句话目标                                          | 状态        |
|----|--------------------|-----------------------------------------------------|-------------|
| 01 | naming-unify       | 一级导航改回知识体系；顶栏加探索（第一模块）        | completed |
| 02 | neican-single      | 内参默认单期+‹›翻期；已选行短格式两行               | completed |
| 03 | update-panel       | 更新面板（烘焙 changelog）+ 系统视图撤 tab          | completed |
| 04 | camera-tween       | 画布镜头缓动 420ms，四处套用，滚轮拖拽打断          | completed |
| 05 | path-current-step  | 路径默认当前步取景；看整条按钮                      | completed |
| 06 | explore-home       | AI 内嵌首页 + 三步引导（内参/知识体系/实践空间）    | completed |
| 07 | teammate-merge     | 队友前端合并（等源码；占位 phase）                  | blocked     |
| 08 | rebuild-verify     | 重建三产物 + 全套验收 + 文档同步                    | completed |

> 状态值：`not started` / `in progress` / `completed` / `blocked` / `skipped`

## 关键决策

- **2026-09-15**：v3 的「知识树」更名回退到模块层（导航/返回钮），**不动** slogan 与「我的树」视图名——统一的是模块名，不是叙事。
- **2026-09-15**：内参默认单期（最新一期），「全部」保留为按钮——串期感来自默认堆叠态，单期态实测本就不串（`renderNeicanHome` days=1）。
- **2026-09-15**：changelog 由 build-shell 扫 `iterations/*/PRD.md` 标题烘焙＋人工补「交卷版」一条，不手工维护两份。
- **2026-09-15**：系统视图数据层（graph.json / graph-runner / 学习门控）零改动，只撤展示入口——`test-graph-page` 改走 hash 直达。
- **2026-09-15**：镜头缓动 420ms + boot/断言路径 `instant`；测试 sleep 对齐到 ≥900ms（改准不放宽语义）。

## Open Questions

- [ ] 无——口径已由所有者给全（三词=内参/知识体系/实践空间；模块名统一队友前端）。

## PR Readiness Gate

**状态**：`completed`（2026-09-15 实跑后勾选）

- [x] 原始意图复核 / 主分支同步（并发会话警戒）/ 对抗式 review
- [ ] 全套验收跑绿（逐字记录数字）
- [ ] Evidence 汇总 → 工作日志第三十二轮
- [x] 文档同步：AGENTS.md 壳行 v4 前缀 + 命令注释项数 / 工日志第三十二轮 / phases 回填
