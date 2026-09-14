# Phase 01 — route-data：路线配置进壳

**Status**: `completed`（2026-09-15 自测全过，未 commit——commit 由负责人执行）
**目标**: 七站路线配置进壳 payload（DATA.practice.route），改顺序不碰模板逻辑。
**前置**: 路线草案已生成（evidence/practice-route-260915/route-draft.json，2026-09-15）。

## 验收判据

- `node scripts/build-shell.mjs` 重建成功，壳 payload 含 `DATA.practice.route`（7 站 · 76 单元 · 6 个主线锚点带 replacedBy）✅
- 新增路线断言全过（check-batch-units ⑩ 9 条 + test-path ⑪b-2 4 条）✅
- route 配置带 `status: draft-待负责人拍板`，页面侧可区分草案/定稿 ✅
- 九条回归全绿，一条没红 ✅

## Tasks

- [x] build-shell.mjs 读 route-draft.json 并装进 DATA.practice.route (scripts/build-shell.mjs attachPracticeRoute)
- [x] 新增路线校验断言（check-batch-units.mjs ⑩ C1-C9：与 units.json 对账——无重无漏 · 站序 · 锚点一致 · 配置不带 open 字段）
- [x] 重建壳，test-path ⑪b-2 黑盒断言读回 payload 校验结构（4 条）
- [x] 跑九条回归，记录前后数字（见 Notes）

**中途修正 (added 2026-09-15)**: unitId 口径错位——生成器最初写裸 `batch-*`，页面口径是 `unit:batch-*`；已统一为页面口径（配置即页面 id，下游不二次映射），generator + check ⑩ 同步改准。

## 回归数字（前 → 后）

| 回归 | 前 | 后 |
|---|---|---|
| check-graph | 465/0 | 465/0 |
| test-graph | 281/0 | 281/0 |
| test-graph-page | 40/0 | 40/0 |
| test-learn-agent-loop | 全过 | 全过 |
| test-path | 88 | **92**（+4 路线断言） |
| check-learning-materials | 581/0 | 581/0 |
| check-batch-units | 104/0 | **113/0**（+9 路线对照） |
| test-batch-walk | 16/0 | 16/0 |
| test-feynman-teaching-map | 117/0 | 117/0 |

## Notes

- serve 用 PORT=5391 起过，跑完已杀；5180 旧服务未动。
- AGENTS.md 里的断言计数（check-batch-units 104 / test-path 88 等）本轮未动——留到迭代收口（PR Readiness Gate 文档同步）一次改准，避免中途撞并行编辑。
- 定稿动作（负责人拍板后）：改 route-draft.json 的 status → final（或先改顺序重跑生成器再拍板），重建壳后页面草案标记消失；`status` 字段是唯一开关。
