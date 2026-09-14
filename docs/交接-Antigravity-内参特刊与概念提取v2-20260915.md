# 交接：Antigravity（Gemini IDE）· 内参特刊 260910/260911 产线 ＋ 概念提取视图 v2（P1–P3）

交接时间：2026-09-15 晨（第二版；第一版给 DeepSeek Harness 的 `docs/交接-DeepSeek-内参特刊260910-260911-20260915.md` **已作废**——执行方换平台，且现场已有部分产物，以本文为准）。
执行方：Antigravity（Google Gemini IDE）。验收方：ZCode 会话。

> **2026-09-15 05:4x 状态**：DeepSeek 恢复，执行方**回切 DeepSeek**——现行版＝`docs/交接-DeepSeek-内参特刊260910-260911-20260915.md`（现场计数以那份为准）。本文转**备用**：再切 Antigravity 时仍按本文执行，现场计数先实测复核。

一句话：**原料已切好、产线脚本齐全、断点缓存有效；你把两个批量跑完、重建壳、自检登记，ZCode 做验收微调。**

## 〇、Antigravity 注意事项（与别的 IDE 不同处）

1. **本项目没有给 Antigravity 的内置 skill 机制**——`.agents/skills/` 不会被自动注入。SOP 与规格的位置清单（用到哪条读哪条）：
   - 项目入口规则：`AGENTS.md`（先读）→ `SOURCE_OF_TRUTH.md`（版本裁决）
   - 三产物 SOP：`~/.agents/skills/note-taking-pro/SKILL.md` ＋ `~/.agents/skills/concept-learning/SKILL.md`
     ——`build-neican-daily.mjs` **会自己读它们当 system prompt**，你不用手动喂；但要人工判质量时按这两个 SOP 读
   - 概念网络图 skill：`.agents/skills/concept-net/SKILL.md`（项目内）＋ 规格 `docs/概念网络图-产出规格-20260915.md`（R1—R8 硬规则）
   - 概念提取 v2 规划：`docs/概念提取视图v2-规划-20260915.md`（任务 B 的蓝图）
2. 外部 Node 脚本走 OpenAI 兼容 HTTP 端点（`scripts/lib/llm.mjs`）；**IDE 对话通道不能当批量推理端点**。
3. 凭证在 `.private/llm.env`（600，gitignored）。**只读来用，不改、不打印、不提交。**

## 一、现场状态（2026-09-15 05:2x 实测，接手前先复核一遍计数）

| 项 | 状态 |
|---|---|
| `knowledge/内参-260910/`（Context Engineering 特刊） | 原文 28 篇 ＋ issue.json ✅ · 三产物 **12/28**（ctx-01…ctx-12） |
| `knowledge/内参-260911/`（Harness Engineering 特刊） | 原文 30 篇 ＋ issue.json ✅ · 三产物 **14/30**（hn-01…hn-14） |
| 产线脚本 | `build-neican-daily.mjs`（三产物）· `build-neican.mjs`（页面数据）· `build-shell.mjs`（重建壳）——全部现成 |
| 断点缓存 | **有效**：产物 >200 字节即缓存，重跑命令只会补缺，不重烧 |
| 前史 | 此前 DeepSeek Harness 依所有者裁决用 v4-pro 跑了一部分后崩掉；flash（llm.env 默认）当晚多次实测挂起 |

## 二、模型裁决（照此执行，不要再问）

- 优先级：**① 所有者已在 `.private/llm.env` 配好的上游**（现状＝DeepSeek；若所有者换成了 Gemini OpenAI 兼容端点就用它）；**② deepseek-flash 恢复则用 flash**（llm.env 默认）；**③ v4-pro**（所有者 09-15 05:0x 已口头批准本轮特刊使用，DeepSeek 会话有实录）。
- 步骤 0 体检照做：60 秒探针 ping 当前配置模型。**flash 挂起 ≠ 停工**——所有者已批准 v4-pro（命令行环境变量覆盖，不改 `.private/llm.env` 一行字）；若 v4-pro 也不通，停下报告。
- 用了哪个模型、tokens 多少，如实写进工作日志与回报。
- 若所有者说要走 Gemini：把这三行放进 `.private/llm.env` 的活**归所有者**（执行方不碰凭证）：
  `LLM_API_BASE=https://generativelanguage.googleapis.com/v1beta/openai` · `LLM_API_KEY=…` · `LLM_MODEL=gemini-2.5-flash`（或所有者指定型号）

## 三、任务 A：特刊产线（260910 Context 28 篇 · 260911 Harness 30 篇）

```sh
# 步骤 0 · 体检（60s 探针，见「二」；顺带 curl -s localhost:5180/api/health，没 serve 就 node scripts/serve-135.mjs）
# 步骤 1 · 三产物补缺（两期并行后台；断点续跑，只补 260910 剩 16 篇 / 260911 剩 16 篇）
LLM_MODEL=<按「二」裁决> node scripts/build-neican-daily.mjs --issue 260910 --concurrency=3
LLM_MODEL=<按「二」裁决> node scripts/build-neican-daily.mjs --issue 260911 --concurrency=3
# 步骤 2 · 页面数据（真 LLM 元数据，带缓存）
node scripts/build-neican.mjs --issue 260910
node scripts/build-neican.mjs --issue 260911
# 步骤 3 · 重建壳
node scripts/build-shell.mjs
```

**步骤 4 · 自检（跑过再说话）**：
- 三产物计数：260910 ＝ 28/28/28，260911 ＝ 30/30/30；失败篇在日报 md **照实记账**，不静默吞；
- serve 开壳：9 月月历亮 **5 天（10–14）**；10 号卡＝Context Engineering 28 篇、11 号＝Harness 30 篇；抽开一篇看三签有内容；
- 回归（要 serve）：`node scripts/test-daobi.mjs` · `node scripts/shot-shell.mjs` · `node scripts/test-concept-net-page.mjs`。

**步骤 5 · 登记与回报**：工作日志 `docs/工作日志-知所栖135.md` 追加新一轮（第三十六轮起编；第三十五轮若未占用则从 35）：起因／做了什么／模型与 tokens／失败清单／没做什么。回报：篇数 · 模型 · tokens · 失败清单 · 月历与单篇截图。

**可选步骤 6（默认不跑）**：特刊概念网络图 `node scripts/build-concept-net.mjs --articles 260910` ＋ `--articles 260911`（约 230 次调用）。**所有者点头才跑**；不跑时特刊「概念网络」签只显示概念卡列表，是预期行为。

## 四、任务 B：概念提取视图 v2（P1–P3，零 LLM）

蓝图＝`docs/概念提取视图v2-规划-20260915.md`（先读，schema 与验收都在里面）：
- **P1** `scripts/build-concept-cards.mjs`：各期 概念辞典 md ＋ 页面数据 → 确定性重组 `knowledge/概念提取-260915/`（cards/byConcept/manifest）；`scripts/check-concept-cards.mjs` 体检（quotes 逐字回原文、ref 在地图、id 唯一、reviewStatus 照实）。
- **P2** 跨期聚合反链 ＋ 校验和。验收：抽 3 个跨期概念人工对账。
- **P3** 页面：概念网络签卡列表加「也出现在」反链 chips，跳地图统一走 v2 数据；重建壳；回归全绿。
- 边界：**零新 LLM 调用**；不改 `内参-页面数据.json` 原始产物与概念地图源数据；不 push。
- 时序：建议**先交任务 A 再做 B**（B 的 P4 要吃特刊三产物；P1–P3 不依赖 A，可先行）。

## 五、硬边界

1. **不许碰 `knowledge/内参-260915/`**——另一工作室的第四期（现 10 篇原文；壳不会显示它，保持这样）。
2. **不 push、不跑 build-public**——公网构建与发布由验收方统一做。
3. **不改 `.private/llm.env`、不在回报/日志里打印 key**。
4. 不删不改既有产物；`build-neican-special.mjs` 不要再 `--write`（原料已落盘，重跑会因目录已存在拒绝——这是保护）。
5. 仓库铁律照旧（AGENTS.md）：改完必须跑对应验收；判定/生成类 LLM 调用不固定 sleep；未核实项照实标注。
