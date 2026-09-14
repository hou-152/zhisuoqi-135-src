# v3-knowledge-tree · 知识树改版：slogan 落地 + 二级视图收敛

> 文件位置：`iterations/v3-knowledge-tree/.plan/plan.md`
> 配套 skill：first-flight-phases · PRD：[../PRD.md](../PRD.md)
> 状态跟踪在各 phase 文档（`phases/NN-*.md`），本表只做总览。

## 背景

slogan「将知识转化为属于你的知识树」（所有者 09-15）没被产品表现；知识体系五个二级视图（路径/图谱/关系/星球/总图）五种隐喻太乱。研究结论：os-taxonomy / llm_wiki / BOK 页三形态在数据层已齐备（节点字段有 feynman/evidence/ap/sourceContext；`dependencies.json` 681 条边全带 strength＋reason），缺的只是视图层收敛成树。

## 范围

**做：** tab 5→3（我的树默认｜路径｜系统视图小入口）· 树化渲染（脊线＋无判定降噪＋四态环）· 树头 slogan＋绝对数统计 · 概念卡前置/解锁带强度理由（`DATA.edgeMeta`）· 一级导航更名「知识树」· 既有断言逐条改准。

**不做：** 概念卡整体重排 · 学习入口去留（v2 范围）· 新布局算法 · 总图与 concept-net 改动 · 移动端。

## 阶段总览

| #  | 阶段 slug        | 一句话目标                                            | 状态        |
|----|------------------|-------------------------------------------------------|-------------|
| 01 | edge-meta        | build-shell 装入 681 条边的 strength/reason           | completed |
| 02 | tree-view        | tab 5→3 + 我的树视图（脊线/降噪/树头 slogan+统计）    | completed |
| 03 | card-edge-reason | 概念卡先懂这些/解锁带上强度与理由                     | completed |
| 04 | rename-entry     | 一级导航更名知识树；牵动的断言改准                    | completed |
| 05 | rebuild-verify   | 重建壳/公网版/app，全套验收跑绿，AGENTS/工日志同步    | completed |

> 状态值：`completed` / `in progress` / `completed` / `blocked` / `skipped`

## 关键决策

- **2026-09-15**：树＝分列坐标的**渲染变体**（路径就是这样做的），不写新布局——尺子/拖拽/吸附/滚轮锚全部白捡，28 项 graph-view 断言平移到树模式。
- **2026-09-15**：关系/星球撤入口**不删代码**（所有者拍板「代码留 git 不删」）；`setMode` 对旧模式名的兜底改为落树（旧 `#grid` hash 自动落到树，不白屏）。
- **2026-09-15**：`edgeMeta` 走 `build-shell.mjs` 附加字段（~80KB），不改 `05-shell-payload.json` 生成器，不动公共源数据。
- **2026-09-15**：统计只报绝对数（N 有判定 / M 过费曼 / K 倒回中），口径＝`zss135.proof.v2` 里 pass+mech+fail；`read` 不算「有判定」（不设验收的一类）。
- **2026-09-15**：更名只改**用户可见标签**，`data-view="graph"` / `setView('graph')` 等内部 id 一律不动（断言与 hash 不破）。

## Open Questions

- [ ] 无——所有者已拍板方案甲与 DAG 投影裁决；实施中的取舍记进各 phase 文档。

## PR Readiness Gate

> 只在本迭代准备交付 / 合并 / 上线前跑；不是每个 phase 都跑。

**状态**：`completed`（2026-09-15 全套验收实跑后勾选；例外照实记在 work log 第三十一轮④）

- [x] 原始意图复核：PRD / plan.md 已重读，实际完成范围没有偏离（公网版未 push 属裁决内：改文件 ≠ 发布）
- [x] 主分支同步：已检查 `git status`；**发现并恢复了一次对并发会话交卷版 index.html 的覆盖**（deploy 仓 `git checkout`，教训已入工日志）
- [x] 对抗式 review：断言改准清单逐条入工日志；check-concept-net 5 条既有失败判定为概念网络线数据问题，不属于本轮
- [x] 端到端测试：verify-135 61/61 · test-daobi 44（真 LLM）· test-path 104 · test-graph-view 38（改准重写）· test-graph-page 40 · test-learn 全过 · check-public 37（v3 口径）· test-app 全过 · shot-shell 全过
- [x] 前端真实层验证：CDP 真浏览器跑树视图关键路径，console 0 错误；像素级证明「有判定叶 499 vs 无判定 365」
- [x] Evidence 汇总：`docs/工作日志-知所栖135.md` 第三十一轮（文件:行号、命令、结果、截图路径）
- [x] 文档同步：AGENTS.md 壳产物行 + 命令注释项数 / 工作日志第三十一轮 / phases 状态回填
