---
name: concept-net
description: >-
  为知所栖 135 生成「概念网络图」（节点＋带标签的有向边＋分层）并接进网站：
  内参单篇「概念网络」签与 Agent Loop 六章路线图。当用户要求「画概念网络／概念架构图」、
  「把这种图批量落地到网站」、「给某篇文章/某章生成概念网络」，或要求改这套图的
  生成器、渲染、体检时使用。产出规格与硬规则（R1—R8）见 docs/概念网络图-产出规格-20260915.md。
---

# 概念网络图产线（知所栖 135）

一张图 = `layers`（层，从基础到结果）+ `nodes`（概念，带 `layer` 与可选的 `ref` 指回概念地图）
+ `edges`（**只收 `basis:"quote"` 的边**，每条带 ≤14 字短语标签和逐字原文）+ `gaps`（照实列没做成的）。
形态来自所有者 2026-09-15 02:0x 给的两套样例（Bengio mermaid 分层架构 ＋ 端到端 agent 闭环）。

## 硬规则（体检逐条断言，不许放水）

1. 只有带逐字原文的边进图；引用必须能在原文里**逐字**找到（生成器结构上保证：模型只挑句子 ID，原文由机器填）。
2. 标签是短语（≤14 字），整句放 `sentence` 字段。
3. 层从基础到结果排；每层至少 1 个节点；节点 `layer` 必须命中某一层。
4. 概念地图对得上的节点填 `ref.id`，对不上留空，不硬凑。
5. `reviewStatus` 一律 `generated-unreviewed`——模型产的没经负责人审核，页面也照实写「机器生成，未经人工审核」。

## 产线命令（按顺序跑）

```sh
node scripts/build-concept-net.mjs --chapters          # 六章路线图（确定性，模型只写短语标签）
node scripts/build-concept-net.mjs --articles <期>      # 内参单篇（真 LLM：两段式——结构段＋挑引用段，带缓存断点重跑）
node scripts/build-concept-net.mjs --all               # 全部（三章期内参 ＋ 六章路线）
node scripts/check-concept-net.mjs                     # 体检：R1—R8 ＋ 布局断言；不需要 serve、不调模型
node scripts/build-shell.mjs                           # 把图装进壳（DATA.conceptNet.nets）
node scripts/test-concept-net-page.mjs                 # 真浏览器验收：内参签出图、章内路线图高亮本层、0 JS 报错（要 serve）
```

- 产物：`knowledge/概念网络-260915/<unitId>.json`；`unitId` = `route-agent-loop` ｜ `neican-<期>-<slug>`。
- 缓存：`evidence/concept-net-260915/cache/`（模型只回 ID 与短语，两段各自进缓存，断了重跑不烧二遍钱）。
- 改数据／改渲染前先读 `docs/概念网络图-产出规格-20260915.md`，改完重跑体检＋页面验收。

## 行为验证（宣称「做完了」的最低证据）

「行为验证」级＝下面三条**当场跑过、输出贴得出来**，不是「我看过代码应该行」：

1. `check-concept-net.mjs` 全过（结构层）；
2. `test-concept-net-page.mjs` 全过且 0 JS 报错（接线层，真浏览器）;
3. 壳里至少一张内参图＋一张章内路线图有截图为证（`output/concept-net-shots/`）。

## 边界

- 不改概念地图源数据、不改 `内参-页面数据.json`（那是另一条 LLM 管线的产物）。
- 不删概念卡列表/正文流——图在上，原有内容一个不删。
- 不因为「图上该有条边」就补一条没有原文依据的边；模型没给有效引用就落 `gaps`。
- LLM 凭证只从 `.private/llm.env` 读，不打印、不入库（同仓库其它产线口径）。
