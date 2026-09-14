# Phase 01 — concept-card：概念卡重排＋人话

**Status**: `completed`（2026-09-15；未 commit）
**目标**: 概念卡信息架构重排（标题→一句定义→怎么算会了→讲一遍→关系→背景折叠→台账 data-*），枚举/层级/ID 下架。

## 验收判据
- 同一句解释只出现一次；CONCEPTUAL 等类型枚举、L0–L5、metrics 数字孤岛全部退出明面（转 data-type/data-level/data-pre/data-post）✅
- 人话文案：怎么算会了 / 讲一遍·我来挑漏 / 讲完了，挑漏 / 懂了它，才好懂这些 / 相关概念 / 换个讲法 / 原文里的说法 ✅
- 关系列表保留 hard/soft 理由（test-graph-view 口径不破）；marks 状态词人话化（讲过了/还没过）✅
- test-path 110 全过 · test-graph-view 38 全过 · test-learn 109 全过 · test-daobi 44 项中措辞类 3 条改准，真模型判定流 1 条（④）两次复跑不稳定＝模型判定波动（先例口径：记波动不记漂移），与本轮措辞改动无关（判定提示词未动）✅
- 截图 prototype/预览/60-概念体系-概念卡现状.png（新）✅

## Tasks
- [x] 重写 openPanel 的 #pbody 模板（新 IA）；n.type/层级/metrics 转 pbody-meta data 属性 (scripts/shell.template.html)
- [x] 措辞人话化（倒逼→讲一遍挑漏等）+ 删死代码 tags 变量 + 新增 .kbadge/.proven CSS
- [x] test-daobi 三条措辞断言改准（一条没删）
- [x] 重建＋回归＋截图

## Notes
- 真模型判定流 ④「能算的·说清机制才过」两次复跑结果不一致（fail/pass 间波动）→ 按仓内先例记模型判定波动；若负责人认为该答案应判 pass，属判据口径问题，另议。
