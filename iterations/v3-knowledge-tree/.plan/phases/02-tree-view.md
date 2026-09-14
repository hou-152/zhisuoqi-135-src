# Phase 02 · tree-view：tab 5→3 + 我的树视图

**状态**：completed（2026-09-15 实跑验收后回填）

## 做了什么（`scripts/shell.template.html`）
- tab 板：`路径|图谱|关系|星球|总图` → `我的树（默认）｜路径`＋右侧 `系统视图`（原总图，data-mode="graph" 不变）；关系/星球撤入口不删代码。
- 默认模式 `mode='tree'`；`MODES=['tree','path','graph']`；`setMode` 未知模式兜底落树；旧 hash `#grid/#relation/#sphere` 兼容映射到树。
- 树＝分列坐标的渲染变体：`computeLayout/project/滚轮/拖拽/两把尺子/列带` 的 `grid||path` 条件全部扩成含 `tree`；进树 `focusGrid(3)` 居中三列。
- 树化渲染：每主题一条主枝脊线（列中心竖线，主题色低透明）；无判定叶子降噪（alpha×0.28、半径×0.8，选中/悬停不降）；四态环照旧。
- `#tree-head`：slogan「将知识转化为属于你的知识树」＋统计（`treeStats()`：N 有判定＝pass+mech+fail · M 过费曼＝pass · K 倒回中＝fail；零判定时给引导语）＋四态图例；`refreshMarks/setMode` 时刷新；`#main.treeon` 控制显隐。
- 内部跳转改树：`gvSelectNode`、路径卡「回到全图」。

## 验收
- `test-graph-view.mjs` 改准重写（默认树/3 tab/树头统计与 marks 一致/尺子/拖拽/吸附/滚轮/卡上强度/0 报错），全绿；截图落 `prototype/预览/`。

## 取舍记录
- 脊线画在列带之上、边与点之下；不画全局依赖线（PRD 裁决 1）。
- `read`（紫环）算「读过」不算「有判定」，图例里单列。
