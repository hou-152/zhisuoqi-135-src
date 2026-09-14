# Phase 05 — five-type-unfold：路线行铺开五类语义骨架

**Status**: `in progress`
**目标**: 路线上每一步可展开看到 QST 问题 / CON 概念 / CAS 案例 / OPI 观点 / SOL 方案的骨架——表现力铺到路线层，不再藏在点击背后。
**前置**: Phase 01-04 ✅。**added 2026-09-15: 负责人指令「全面铺开，表现力要有」（五类语义单元在路线层可见）**。

## 验收判据

- 可进入单元的路线行可展开：一行内可见 QST 问题句、CAS 案例名与类型、OPI 条数、SOL 方案与动作数，再点收起
- 数据来自既有阅读载荷（DATA.learning.batch），不新增数据源；不可进入单元不显示铺开钮（载荷未编译，照实）
- 展开不破坏 .ru 口径断言；test-path ⑪b-3 补展开/收起断言
- 九条回归全绿

## Tasks

- [ ] practiceSkeletonOf + practiceToggleSkeleton（模板）＋ .ru-skel/.sk CSS
- [ ] test-path 展开断言
- [ ] 截图 ＋ 回归
