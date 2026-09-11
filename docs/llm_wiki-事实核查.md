# nashsu/llm_wiki 九条宣称事实核查

核查日期：2026-09-11。方法：`web_fetch` 对 github.com / raw.githubusercontent.com 报 `URL hostname ... resolves to a non-public IP address`（本机 DNS 环境所致），改用 `curl` 抓取一手文件；另 `git clone --depth 1` 全仓库做代码级验证（代码本身即项目一手来源）。

### 仓库与 Karpathy 源头

| 项 | 值 | 来源 |
|---|---|---|
| 仓库 | https://github.com/nashsu/llm_wiki | 抓取 |
| Star | **18,494**（页面 `"stargazerCount":18494`、`aria-label="18494 users starred this repository"`） | GitHub 仓库页 HTML，2026-09-11 抓取 |
| License | **GPL-3.0**（README「This project is licensed under the **GNU General Public License v3.0**」；`LICENSE` 头部「GNU GENERAL PUBLIC LICENSE」，版权行 `LLM Wiki — Copyright (C) 2024-2026 Yong Su`） | README L506-508、`LICENSE` |
| 主要语言 | **TypeScript**（前端）+ **Rust**（Tauri 后端）。⚠️ 非 GitHub linguist 官方数字：`api.github.com` 返回 `API rate limit exceeded for 36.231.91.74`，仓库页 HTML 未含语言条；此为我自己按克隆仓库字节统计：`.ts` 2,426,672 B / `.tsx` 919,364 B vs `.rs` 1,206,640 B | 自测 |
| 最近提交 | `e8082119649e6a8e1cf85eaf289adcabfdf39d4e`，**Tue Aug 25 14:41:39 2026 +0800**，`release: v0.6.11`；最新 release **LLM Wiki v0.6.11**（`releases.atom` updated 2026-08-25T06:41:57Z） | git log / releases.atom |
| README 抓取 | `https://raw.githubusercontent.com/nashsu/llm_wiki/main/README.md`，HTTP 200，31,910 B / 508 行，与仓库 HEAD 的 `README.md` **逐字节一致**（`diff` 无输出）；另有 `README_CN.md`（中文） | curl + diff |
| Karpathy 原文 | gist `https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f`，文件 `llm-wiki.md`，**Created April 4, 2026 16:25**；raw `https://gist.githubusercontent.com/karpathy/442a6bf555914893e9891c11519de94f/raw`（11,985 B / 75 行） | gist 页 + raw |
| 关键佐证 | 仓库根目录自带 `llm-wiki.md`，与 Karpathy gist raw **逐字节相同**（`diff` 无输出 "VERBATIM IDENTICAL"） | clone |

**Karpathy 原话（gist `llm-wiki.md`）**
- L3：「A pattern for building personal knowledge bases using LLMs.」
- L5：「This is an idea file, it is designed to be copy pasted to your own LLM Agent (e.g. OpenAI Codex, Claude Code, OpenCode / Pi, or etc.).」
- L75：「This document is intentionally abstract. It describes the idea, not a specific implementation.」

### 九条宣称核查表

| # | 宣称 | 结论 | 原文引用（逐字） | 来源 URL |
|---|---|---|---|---|
| 1 | 桌面 app；栈为 Tauri/Electron；设计来自 Karpathy 公开 prompt/gist | **原文支持**（Tauri v2，**不是 Electron**；来源是 gist，但 gist 自称「idea file」非 prompt） | README L57「LLM Wiki is a cross-platform desktop application…」；L383「\| Desktop \| Tauri v2 (Rust backend) \|」；L59「This project is based on [Karpathy's LLM Wiki pattern](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f)」；L67「The foundational methodology comes from **Andrej Karpathy**'s [llm-wiki.md](…), which describes the pattern of using LLMs to incrementally build and maintain a personal wiki. The original document is an abstract design pattern; this project is a concrete implementation with substantial extensions.」 | [README](https://raw.githubusercontent.com/nashsu/llm_wiki/main/README.md) · [gist](https://gist.github.com/karpathy/442a6bf555914893e9891c11519de94f) |
| 2 | 知识编译一次、持续维护；对比 RAG 每次从零检索 | **原文支持**（README 与 gist 均有逐字对应） | README L57「Instead of traditional RAG (retrieve-and-answer from scratch every time), the LLM **incrementally builds and maintains a persistent wiki** from your sources. Knowledge is compiled once and kept current, not re-derived on every query.」；README_CN L57（中文）「与传统 RAG（每次查询都从头检索和回答）不同，LLM 会从你的资料中**增量构建并维护一个持久化的 Wiki**。知识只编译一次并持续更新，而非每次查询都重新推导。」；gist L11「The knowledge is compiled once and then *kept current*, not re-derived on every query.」 | README · [README_CN](https://raw.githubusercontent.com/nashsu/llm_wiki/main/README_CN.md) · gist |
| 3a | 原始材料不可变、由人策划、模型只读 | **原文支持** | README L73「- **Three-layer architecture**: Raw Sources (immutable) → Wiki (LLM-generated) → Schema (rules & config)」；L480「│   ├── sources/            # Uploaded documents (immutable)」；L80「- **Human curates, LLM maintains** — the fundamental role division」；gist L29「These are immutable — the LLM reads from them but never modifies them. This is your source of truth.」 | README · gist |
| 3b | wiki 页面由模型完全拥有、人只读 | **部分支持／app 实现相反**（Karpathy 模式如此说；llm_wiki 里人类可直接编辑 wiki 页并手动建页） | gist L31「The LLM owns this layer entirely… You read it; the LLM writes it.」；README L73 仅写「Wiki (LLM-generated)」。**但代码**：`src/components/layout/preview-panel.tsx` L128-134 对 `category === "markdown"` 渲染 `WikiEditor`（Milkdown WYSIWYG）并 `onSave={handleSave}` → `writeNow(selectedFile, markdown, true)`；`src/components/editor/page-links-panel.tsx` `createMissing` → `createMissingWikiPage`（人类可手动建页） | README · gist · 仓库代码 |
| 3c | 规则与意图层由人机共同演化 | **Karpathy 原文支持；项目 README 未用 "co-evolve"，只有间接对应** | gist L33「You and the LLM co-evolve this over time as you figure out what works for your domain.」；README §2 L103「- LLM can suggest updates based on usage patterns」（指 `purpose.md`）；`schema.md`/`purpose.md` 由人写（`create-project-dialog.tsx` L119-120 `writeFile(`${pp}/schema.md`, template.schema)`） | gist · README |
| 4 | 「共享同一份来源」权重高于「显式互相链接」 | **原文支持**（README 表格与代码常量一致） | README L149-150「\| Direct link \| ×3.0 \| Pages linked via `[[wikilinks]]` \|」「\| Source overlap \| ×4.0 \| Pages sharing the same raw source (via frontmatter `sources[]`) \|」；README_CN L149-150「\| 直接链接 \| ×3.0 \|」「\| 来源重叠 \| ×4.0 \|」；代码 `src/lib/graph-relevance.ts` L31-32「directLink: 3.0,」「sourceOverlap: 4.0,」 | README · README_CN · 代码 |
| 5 | 社区发现算法、凝聚力/模块度指标、是否已实现 | **原文支持且已实现**：算法 **Louvain**（`graphology-communities-louvain`）；有 **cohesion**（内聚度）；**无 modularity 指标** | README L164「Not in the original. Automatic discovery of knowledge clusters using the **Louvain algorithm** (graphology-communities-louvain):」；L168「- **Cohesion scoring** — each community scored by intra-edge density (actual edges / possible edges); low-cohesion clusters (< 0.15) flagged with warning」；代码 `src/lib/wiki-graph-analysis.ts` L2「import louvain from "graphology-communities-louvain"」、L24「const communityMap: Record<string, number> = louvain(graph, { resolution: 1 })」、L55「const cohesion = (intraEdgesByCommunity.get(communityId) ?? 0) / possibleEdges」；`grep -rni "modularity" src src-tauri` → **0 命中**。有单测 `src/lib/wiki-graph-analysis.test.ts` 与 UI 警示 `graph-view.tsx` L1471。**非 roadmap**（仓库无 docs/ 路线文档，仅 `plans/multimodal-images.md`） | README · 代码 |
| 6 | 图谱洞察：意外连接 + 知识缺口（degree ≤ 1 孤立页） | **原文支持** | README L41「- **Graph Insights** — surprising connections and knowledge gaps with one-click Deep Research」；L181「- Detects unexpected relationships: cross-community edges, cross-type links, peripheral↔hub couplings」；L186「- **Isolated pages** (degree ≤ 1) — pages with few or no connections to the rest of the wiki」；README_CN L186「- **孤立页面**（度 ≤ 1）—— 与 Wiki 其余部分缺少连接的页面」（中文标题作「**图谱洞察 —— 惊奇连接与知识空白**」）；代码 `src/lib/graph-insights.ts` L110/L123「Isolated nodes (degree ≤ 1)」 | README · README_CN · 代码 |
| 7 | 知识库反过来向用户提问 | **原文未明确提及**（只有间接对应；无「知识库主动提问」这一功能条目） | 最接近的一手文本：README L280「- LLM flags items needing human judgment during ingest」（Review 项）；`src/lib/ingest.ts` L2420（prompt）「- suggestion: a research question, source type, or comparison that would materially improve the wiki」；L2210「- Any open questions worth flagging for the user?」；`src/lib/lint.ts` L281「- suggestion: a question or source worth adding to the wiki」；gist L41「The LLM is good at suggesting new questions to investigate and new sources to look for.」。另有聊天 Agent 工具 `AskUserQuestion`（`src-tauri/src/agent/runtime.rs` L3167），README L254 描述为「skills can ask for structured user input…」——是**技能/Agent 向用户提问**，不是「知识库」 | README · 代码 · gist |
| 8 | 人的动作收窄为三个：建页/深挖/跳过 | **原文支持，但措辞是 "Create Page, Deep Research, Skip"（非 "dig deeper"）**；且 LLM 只能输出前两者，Deep Research 由系统自动加按钮 | README L281「- **Predefined action types**: Create Page, Deep Research, Skip — constrained to prevent LLM hallucination of arbitrary actions」；README_CN L281「- **预定义操作类型**：创建页面、深度研究、跳过 —— 约束操作防止 LLM 凭空生成任意操作」；代码 `src/lib/ingest.ts` L2343-2344「The user also has a 'Deep Research' button (auto-added by the system) that triggers web search.」「Do NOT invent custom option labels. Only use 'Create Page' and 'Skip'.」；L2337-2340「- contradiction: OPTIONS: Create Page \| Skip」（duplicate/missing-page/suggestion 同）；`review-view.tsx` L94 `if (action === "__deep_research__" && project)` | README · README_CN · 代码 |
| 9 | 人类在环的异步评审 + 深度研究 | **原文支持且已实现** | README L51「- **Async Review System** — LLM flags items for human judgment, predefined actions, pre-generated search queries」；§12 标题 L276「### 12. Review System (Async Human-in-the-Loop)」、L283「- User handles reviews at their convenience — doesn't block ingest」；§13 L285/L291「### 13. Deep Research」「Not in the original. When the LLM identifies knowledge gaps:」；L46「- **Deep Research** — LLM-optimized search topics, multi-query web search via Tavily, SerpApi, or SearXNG, auto-ingest results into wiki」；代码 `src/lib/deep-research.ts`（19,689 B）、`src/stores/review-store.ts`、`src/lib/review-create-page.ts`、`src/lib/review-batch-research.ts` | README · 代码 |

### 与转述不一致或夸大的地方

1. **「把 Karpathy 公开的一段 prompt 做成桌面 app」——不准确。** gist 自称 idea file 而非 prompt：L5「This is an idea file, it is designed to be copy pasted to your own LLM Agent…」、L75「This document is intentionally abstract. It describes the idea, not a specific implementation.」项目 README L67 亦称其为「an abstract design pattern」。它是方法论文档，不是一段可执行 prompt。
2. **「wiki 页面…人只读」——夸大。** 该说法来自 Karpathy 的模式描述（gist L15「You never (or rarely) write the wiki yourself」），但 llm_wiki 的 app 明确允许人类直接编辑与创建 wiki 页（Milkdown WYSIWYG 自动写盘 + `createMissingWikiPage`）。README 对 wiki 层只写「LLM-generated」，从未承诺「人类只读」。
3. **「深挖 / dig deeper」——术语不符。** 仓库一手术语是 **Deep Research**（README_CN：「深度研究」），无 "dig deeper" 字样。
4. **「模块度」——若转述提到 modularity，则属混淆。** 产品暴露的是 **cohesion**（内聚度 = 社区内部实际边/可能边），全仓库无 `modularity` 一词；Louvain 只在库内部以模块度为目标函数。README 对 cohesion 的阈值定义（< 0.15 报警）与代码一致。
5. **「意外连接 / 知识缺口」——意译。** 英文为 "surprising connections and knowledge gaps"，中文 README 作「惊奇连接与知识空白」；含义相符，非原文措辞。
6. **第 8 条「三个动作」的层级被拉平。** README 把三者并列为「Predefined action types」，但 ingest prompt 里 LLM 只被允许 `Create Page | Skip`，Deep Research 是系统自动追加的按钮——三个动作并非同一来源。
7. **社区发现/图谱洞察标注为「Not in the original」——是相对 Karpathy gist 而言，不是「未实现」。** 两处均有代码与测试，属已实现功能。
8. **Star 数**：一手仓库页为 18,494。搜索摘要中出现的 17.1k（star-history）为二手来源，未采信。

### 未能核实的项与原因

- **Karpathy 的推文**：未找到可验证的一手推文 URL。web_search 只返回二手转述（今日头条、聚合站），未抓取 X/Twitter；可核实的唯一一手来源是上述 gist。宣称「推文」部分**未核实**。
- **GitHub linguist 官方语言占比**：`api.github.com/repos/nashsu/llm_wiki` 返回 `API rate limit exceeded for 36.231.91.74`，仓库页 HTML 未暴露语言条；表中所列为我自己按克隆字节统计，非官方数字。
- **README 之外的设计文档**：仓库**没有 `docs/` 目录**，仅 `plans/multimodal-images.md`（与本 9 条无关）；更细的设计说明只存在于源码 prompt/常量中，已按代码逐字引用。
- **star 数、license、最近提交**均由 2026-09-11 单次抓取得到，会随时间变化。
- **抓取限制说明**：`web_fetch` 对 github.com 与 raw.githubusercontent.com 报 `URL hostname … resolves to a non-public IP address`（抓取失败，疑似本机 DNS/代理解析），全部改用 `curl` 完成；X/Twitter 未抓取。
