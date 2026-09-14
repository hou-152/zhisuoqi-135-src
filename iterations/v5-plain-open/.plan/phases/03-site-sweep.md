# Phase 03 — site-sweep：全站黑话清扫＋黑名单断言

**Status**: `completed`（2026-09-15；未 commit）
**目标**: 明面/台账双层落地全站：黑话清单成文、可见 token 清扫、黑名单断言防回潮。

## 验收判据
- 黑话清单表：docs/黑话清单-明面台账-20260915.md（已下架 10 类 / 声明例外 4 类 / 残留待裁决 4 条）✅
- 黑名单断言 ⑬ 四面扫描（概念卡 / 实践空间 / 全书页 / 路径上下文）全 clean ✅
- 模板可见面清扫：edgeNote 强/弱、机器判据块、判据卡三条件与来源（路径→data-origin）✅
- 改准断言：test-graph-view hard→强（两条）；test-learn 机器判据块（出处转 data-origin）；更新面板计数改动态取值 ✅
- 回归：test-path **119** · test-graph-view 38 · test-learn 109 · test-concept-net 27 · check-graph 465 · check-learning-materials 581 · check-batch-units 114 · test-batch-walk 16 · test-feynman 117 · test-graph-page 40 全绿 ✅

## Tasks
- [x] edgeNote 强/弱；机器判据块与判据卡人话化（出处 data-origin）(scripts/shell.template.html)
- [x] test-graph-view / test-learn 受影响断言改准（一条没删）
- [x] ⑬ 黑名单断言（token 表挂 window.BL，四面扫 innerText）
- [x] 黑话清单文档 + CONTEXT.md「明面 / 台账」词条
- [x] 重建＋回归全绿

## Notes
- **公网版本轮未重建**：模板里并行会话 v4-unify 半成品会被烘进产物；等 v4-unify 落库后统一 build＋check-public（改文件 ≠ 发布）。
- 更新面板计数断言原写死 n=5，我加 v5 PRD 后自然漂到 6——改成动态取面板值，这类计数断言不该写死数字（已在断言名里注明）。
- 画布 L0–L5 层级尺：经 /dbs-standard-answer 研究后负责人拍板选项 C（2026-09-15）——符号保留＋钥匙文档化（钥匙语义与交接注记见 `docs/黑话清单-明面台账-20260915.md`），渲染层等知识树/系统视图定稿。authored 正文 1 处 CON-agent、v4-unify 在途区域：两处残留照实登记在黑话清单「待裁决」。
