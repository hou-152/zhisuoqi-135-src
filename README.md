# 知所栖 135

一个问题 → **3 个概念** → **1 段阅读** → **3 个决策** → **5 个实验** → **费曼验收**（讲不出来，就倒回漏掉的那一维）。

知乎黑客松参赛作品。这个仓库里是**真的跑起来的东西**：概念地图、概念 wiki、538 个语义单元、一条内参编辑流水线、
两种壳（网页单文件 / Electron 桌面版），以及每个产物对应的验收脚本。

> 老的 `README.md`（2026-09-06 的 v3 原型路演稿）已另存为 [`docs/路演与评审说明-20260912.md`](docs/路演与评审说明-20260912.md)，
> 它描述的 Demo 早被取代，不要再当现状引用。

- 公网 Demo（单文件、零服务端）：<https://hou-152.github.io/zhisuoqi-135/>
- 538 个语义单元索引页：<https://hou-152.github.io/zhisuoqi-135/units.html>

---

## 一、现在有什么（数字都来自本机实测）

| 产物 | 是什么 | 数字 |
|---|---|---|
| `knowledge/概念地图-260913/` | **概念唯一真源**。四源合并：Notion 概念库 509 ＋ 飞书 Context Engineering 28 篇 ＋ Harness Engineering 30 篇 ＋ AI 内参 260912 期 10 篇；AI 相关性过滤 1156 → 856，再并入内参 80 | **936 概念 / 531 依赖 / 3333 关系 / 21 领域** |
| `knowledge/概念wiki-260913/` | 概念链接层（llm_wiki 形态）：每概念一页 ＋ `[[双链]]` ＋ 反链 ＋ index/log | **936 页**，丢进 Obsidian 就能用 |
| `内容结构化系统/` | 按 `/dbs-content-system` 建的内容工程：把「AI 概念基本盘」拆成五类语义单元 | **538 个单元**（问题 141 · 概念 76 · 观点 169 · 案例 76 · 方案 76）＋ 7 张主题地图 ＋ 2 份选题装配稿 |
| `knowledge/内参-260912/` | AI 内参编辑流水线：原文快照 → 三级笔记 → 概念辞典 → AI 费曼示范 → 五维拆解 | **10 篇**，每篇五维资产齐全 |
| `prototype/知所栖-135-基础框架.html` | **主产物**：1 阅读 → 3 决策 → 5 实验 → 费曼验收 全流程，单文件 | `verify-135.mjs` 61 项 |
| `prototype/知所栖-壳.html` | 两栏壳：知识体系（936 概念 · 图谱/星球）＋ 内参 | `test-daobi.mjs` 30 项 · `shot-shell.mjs` 13 步 |
| `deploy/zhisuoqi-135/` | 公网发布仓库（**独立 git 仓库**）：`index.html` ＋ `units.html` | `check-public.mjs` 21 项 · `check-units-page.mjs` 10 项 |
| `app/` | 桌面版（Electron，本地数据落真文件） | `test-app.mjs` 12 项 |

## 二、跑起来

```sh
# 网页壳（有服务端才通 /api/llm；没有则退回机械兜底）
node scripts/serve-135.mjs        # → http://127.0.0.1:5180/知所栖-壳.html
# 桌面版（能写真文件）
cd app && npm start

# 验收（前四个要 serve 在跑）
node scripts/verify-135.mjs       # 主产物全流程
node scripts/test-daobi.mjs       # 倒逼层 + 分类层 + 三栏外壳（真 LLM）
node scripts/shot-shell.mjs       # 13 步截图 + 面板越界断言
node scripts/check-public.mjs     # 公网版（**必须假域名**，127.0.0.1 会走错分支）
node scripts/check-units-page.mjs # 538 个语义单元索引页
node scripts/test-app.mjs         # 桌面版（自动起 Electron）

# 重新生成
node scripts/cm-extract.mjs && node scripts/cm-merge.mjs && node scripts/cm-enrich.mjs \
  && node scripts/cm-edges.mjs --pass2 && node scripts/cm-build-map.mjs \
  && node scripts/cm-build-wiki.mjs && node scripts/cm-wire.mjs && node scripts/cm-validate.mjs
node scripts/build-shell.mjs      # → prototype/知所栖-壳.html
node scripts/build-public.mjs     # → deploy/zhisuoqi-135/index.html
node scripts/build-units-page.mjs # → deploy/zhisuoqi-135/units.html
```

LLM 相关脚本读 `.private/llm.env`（**不入库**）。没有凭证时，判定类功能退回**机械兜底**：只标 `mech`，
并在页面上写明「没经语义判定」——**不冒充「过了」**。

## 三、怎么读这个仓库

1. **[`SOURCE_OF_TRUTH.md`](SOURCE_OF_TRUTH.md)** —— 项目级权威：找什么去哪、哪个版本为准、冲突怎么裁。
2. **[`docs/工作日志-知所栖135.md`](docs/工作日志-知所栖135.md)** —— 唯一工作日志：逐轮记「做了什么、凭什么说做完了、还没做什么」。
3. **[`docs/交接-agent版-知所栖135.md`](docs/交接-agent版-知所栖135.md)** —— 给下一个编码 agent 的入口（命令、已知坑、待办）。
4. [`docs/README.md`](docs/README.md) 是文档索引；[`AGENTS.md`](AGENTS.md) / [`CLAUDE.md`](CLAUDE.md) 是给 agent 的项目规则。

## 四、已知缺口（照实写，不粉饰）

- 概念地图有 **289 个孤立点**（没有任何依赖连边）、wiki 有 **39 个无入链页**（`node scripts/cm-validate.mjs` 实测口径）。
- AI 相关性过滤丢掉 300 个概念，**没有物理删除**，逐条理由在 `evidence/cm-260913/07-ai-filter.json`。
- `内容结构化系统/` 的**去重候选 16,025 条＝失控**（阈值未调），这层索引目前不可用。
- 76 个案例单元**全是假设场景**（源卡 `scenario.type: hypothetical`），不是真实复盘。
- 内参十篇的**五维里只有两维上了页面**（概念、费曼）；阅读 / 决策 / 实验三维还没接页面。
- 内参配图是按 Anthropic Newsroom 已核实体系**程序化绘制的 SVG**，不是官方位图。
- AB 实验（费曼验收）**缺 10 份真人复述样本**，`ab-feynman-test.mjs` 现在还出不了正式结论。
- `deploy/zhisuoqi-135/` 是**独立 git 仓库**，本仓库的提交不会自动带上它的改动，要单独 push。

## 五、凭证与隐私边界

- `.private/`（600 权限，gitignored）**不入库、不展示、不打印**：LLM 凭证与知乎 CLI 凭证都在那里。
- 打包与发布产物有自检：`scripts/build-app.mjs` 扫到 key 形状即失败退出。
- `evidence/` 是冻结的原始证据与工作留档，里面含**内部工作记录**。

## 六、第三方内容与出处

- `内容结构化系统/` 的方法来自 **dontbesilent 的 dbskill**（`/dbs-content-system`），公开项目。
- 概念卡与语义单元的底料复用自 **「Context × Harness 图鉴」** 的已审计产物（76 张概念卡 / 169 条关系 / 7 个分类轴）。
- 内参内容来自「做中学 · AI」《serious AI 内参》260912 期，仅作参赛演示使用。
- 配图体系参考 **Anthropic Newsroom** 的公开视觉语言，为程序化仿绘，非官方素材。

本仓库尚未选择开源许可证；上述第三方内容的版权归各自原作者，若原作者要求移除，删掉对应部分即可。
