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
| `knowledge/概念地图-260913/` | **概念唯一真源**。四源合并：Notion 概念库 509 ＋ 飞书 Context Engineering 28 篇 ＋ Harness Engineering 30 篇 ＋ AI 内参 260912 期 10 篇；AI 相关性过滤 1156 → 856，再并入内参 80 | **936 概念 / 604 依赖 / 3406 关系 / 21 领域** |
| `knowledge/概念wiki-260913/` | 概念链接层（llm_wiki 形态）：每概念一页 ＋ `[[双链]]` ＋ 反链 ＋ index/log | **936 页**，丢进 Obsidian 就能用 |
| `内容结构化系统/` | 按 `/dbs-content-system` 建的内容工程：把「AI 概念基本盘」拆成五类语义单元 | **538 个单元**（问题 141 · 概念 76 · 观点 169 · 案例 76 · 方案 76）＋ 7 张主题地图 ＋ 2 份选题装配稿 |
| `knowledge/内参-260912/` | AI 内参编辑流水线：原文快照 → 三级笔记 → 概念辞典 → AI 费曼示范 → 五维拆解 | **10 篇**，每篇五维资产齐全 |
| `prototype/知所栖-135-基础框架.html` | **主产物**：1 阅读 → 3 决策 → 5 实验 → 费曼验收 全流程，单文件 | `verify-135.mjs` 61 项 |
| `prototype/知所栖-壳.html` | 两栏壳：知识体系（936 概念 · 图谱/星球）＋ 内参 | `test-daobi.mjs` 30 项 · `shot-shell.mjs` 13 步 |
| `deploy/zhisuoqi-135/` | 公网发布仓库（**独立 git 仓库**）：`index.html` ＋ `units.html` | `check-public.mjs` 21 项 · `check-units-page.mjs` 10 项 |
| `app/` | 桌面版（Electron，本地数据落真文件） | `test-app.mjs` 12 项 |

## 二、跑起来

### 需要什么

- **Node ≥ 20.11**（脚本用了 `import.meta.dirname`；本机实测 v24 全通）。除桌面版外**零 npm 依赖**。
- 跑截图与浏览器验收需要本机有 **Google Chrome**（走 CDP，不装 Playwright）。
- 桌面版要 `npm install`（会下 Electron）。
- **不需要任何 API key** 也能跑：没有 key 时模型相关的功能退回机械兜底。

### 5 分钟上手（下面每条都在**全新克隆**里实测过）

```sh
git clone https://github.com/hou-152/zhisuoqi-135-src.git && cd zhisuoqi-135-src

# ① 概念地图体检 —— 应输出 936 概念 / 604 依赖 / 3406 关系 / 21 领域，并「全部通过」
node scripts/cm-validate.mjs

# ② 538 个语义单元能查（不需要装任何东西）
node 内容结构化系统/模块/ai-concept-base/scripts/query.mjs --q "护栏"

# ③ 起壳看界面（没 key 时 /api/health 返回 llm:false，交卷走机械兜底）
PORT=5300 node scripts/serve-135.mjs   # → http://127.0.0.1:5300/知所栖-壳.html

# ④ 重建三件产物（deploy/ 不在仓库里，是在本地生成的，它自己是另一个 git 仓库）
node scripts/build-shell.mjs && node scripts/build-public.mjs && node scripts/build-units-page.mjs

# ⑤ 验收（要 Chrome；用一个静态服务把刚生成的产物挂起来）
cd deploy/zhisuoqi-135 && python3 -m http.server 5205 &
cd - && node scripts/check-public.mjs http://zhisuoqi-135.test:5205/   # 21 项
node scripts/check-units-page.mjs http://127.0.0.1:5205/units.html     # 10 项
```

想接自己的模型：把 `LLM_API_KEY` / `LLM_API_BASE` 写进 `.private/llm.env`（目录 600，已 gitignore），
`serve-135.mjs` 启动时会自动加载。**永远不要把 key 写进任何会提交的文件。**

### 其余命令

```sh
# 桌面版（能写真文件）
cd app && npm install && npm start

# 更多验收（前三个要 serve 在跑）
node scripts/verify-135.mjs       # 主产物全流程，61 项
node scripts/test-daobi.mjs       # 倒逼层 + 分类层 + 两栏外壳（真 LLM）
node scripts/shot-shell.mjs       # 13 步截图 + 面板越界断言
node scripts/test-app.mjs         # 桌面版，12 项（自动起 Electron）

# 概念地图 v2 全链路重跑（要 LLM 凭证；两次 LLM 都有本地缓存，可断点续跑）
node scripts/cm-extract.mjs && node scripts/cm-merge.mjs && node scripts/cm-enrich.mjs \
  && node scripts/cm-edges.mjs --pass2 && node scripts/cm-build-map.mjs \
  && node scripts/cm-build-wiki.mjs && node scripts/cm-wire.mjs && node scripts/cm-validate.mjs
```


## 三、概念图 UI

壳默认打开「图谱」依赖视图，也可以切换到「关系」视图查看已接受的语义关系（`prerequisite`、`related-to`、`used-with`、`part-of`、`contrast`）。关系视图使用构建时生成的确定性坐标，边按关系类型区分；`co-article` 与 `rejected` 保留在知识库和审计记录中，但默认不绘制。

画布 hover 与点击统一使用画布本地坐标，节点名称以中心 callout 显示，窗口缩放或详情面板打开后仍能准确命中。相关回归由 `shot-shell.mjs` 覆盖。

## 三、怎么读这个仓库

1. **[`SOURCE_OF_TRUTH.md`](SOURCE_OF_TRUTH.md)** —— 项目级权威：找什么去哪、哪个版本为准、冲突怎么裁。
2. **[`docs/工作日志-知所栖135.md`](docs/工作日志-知所栖135.md)** —— 唯一工作日志：逐轮记「做了什么、凭什么说做完了、还没做什么」。
3. **[`docs/交接-agent版-知所栖135.md`](docs/交接-agent版-知所栖135.md)** —— 给下一个编码 agent 的入口（命令、已知坑、待办）。
4. [`docs/README.md`](docs/README.md) 是文档索引；[`AGENTS.md`](AGENTS.md) / [`CLAUDE.md`](CLAUDE.md) 是给 agent 的项目规则。

## 五、已知缺口（照实写，不粉饰）

- 概念地图仍有部分低度节点；wiki 有 **34 个无入链页**（`node scripts/cm-validate.mjs` 实测口径）。
- AI 相关性过滤丢掉 300 个概念，**没有物理删除**，逐条理由在 `evidence/cm-260913/07-ai-filter.json`。
- `内容结构化系统/` 的**去重候选 16,025 条＝失控**（阈值未调），这层索引目前不可用。
- 76 个案例单元**全是假设场景**（源卡 `scenario.type: hypothetical`），不是真实复盘。
- 内参十篇的**五维里只有两维上了页面**（概念、费曼）；阅读 / 决策 / 实验三维还没接页面。
- 内参配图是按 Anthropic Newsroom 已核实体系**程序化绘制的 SVG**，不是官方位图。
- AB 实验（费曼验收）**缺 10 份真人复述样本**，`ab-feynman-test.mjs` 现在还出不了正式结论。
- `deploy/zhisuoqi-135/` 是**独立 git 仓库**，本仓库的提交不会自动带上它的改动，要单独 push。

## 六、凭证与隐私边界

- `.private/`（600 权限，gitignored）**不入库、不展示、不打印**：LLM 凭证与知乎 CLI 凭证都在那里。
- 打包与发布产物有自检：`scripts/build-app.mjs` 扫到 key 形状即失败退出。
- `evidence/` 是冻结的原始证据与工作留档，里面含**内部工作记录**。

## 七、第三方内容与出处

- `内容结构化系统/` 的方法来自 **dontbesilent 的 dbskill**（`/dbs-content-system`），公开项目。
- 概念卡与语义单元的底料复用自 **「Context × Harness 图鉴」** 的已审计产物（76 张概念卡 / 169 条关系 / 7 个分类轴）。
- 内参内容来自「做中学 · AI」《serious AI 内参》260912 期，仅作参赛演示使用。
- 配图体系参考 **Anthropic Newsroom** 的公开视觉语言，为程序化仿绘，非官方素材。

## 八、许可

本仓库**自有的代码与文档**按 **MIT** 授权（见 [`LICENSE`](LICENSE)）。
上面那些第三方材料各有其权利人、**不适用 MIT**，逐项与移除方式见 **[`THIRD-PARTY.md`](THIRD-PARTY.md)**。
