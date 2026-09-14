# jordan-gibbs/hyperresearch：基于智能体的研究知识库。智能体收集、搜索并将网络研究成果整合到一个持久的、可搜索的维基中。

- 标题：jordan-gibbs/hyperresearch：基于智能体的研究知识库。智能体收集、搜索并将网络研究成果整合到一个持久的、可搜索的维基中。
- 来源：GitHub
- 原文：https://github.com/jordan-gibbs/hyperresearch
- 作者：https://github.com/jordan-gibbs/
- 类型：文章
- 摘要：Hyperresearch is a tool that collects, searches, and organizes research from the web into a lasting, searchable wiki. It uses multiple smart agents to fetch, analyze, draft, critique, and polish research notes automatically. All data is stored in markdown files with a rich system for quality scoring, source ranking, and safe web handling.
- 收藏于：2026/9/15 03:25:41
- 抓取：Reader 快照（2026/9/15）
- 字数：27591

---
[![复制预测-x0s9c24tqxrmw0d0j5ktty8nhw](https://github.com/user-attachments/assets/816434ad-080e-4165-abbc-af87d009aeb0)](https://github.com/user-attachments/assets/816434ad-080e-4165-abbc-af87d009aeb0)
### 最强大的深度研究工具


[![PyPI 版本](https://camo.githubusercontent.com/6e9e3515f53cf8974e896cd16ffb9af3d0fe6364387d5e9da6f73c94e5cb21cd/68747470733a2f2f696d672e736869656c64732e696f2f707970692f762f68797065727265736561726368)](https://pypi.org/project/hyperresearch/)
[![Python 3.11+](https://camo.githubusercontent.com/aaf15095ed0e9699b9395ca307297dd39ec3216e546d0d8d7b827a312e9aad9a/68747470733a2f2f696d672e736869656c64732e696f2f707970692f707976657273696f6e732f68797065727265736561726368)](https://pypi.org/project/hyperresearch/)
[![许可证：MIT](https://camo.githubusercontent.com/414f1c3a72fc22c390a27aad9eddfb867adfbd508656d0df4572231830cd1b0e/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f6c6963656e73652f6a6f7264616e2d67696262732f68797065727265736561726368)](https://github.com/jordan-gibbs/hyperresearch/blob/main/LICENSE)
[![GitHub 星标](https://camo.githubusercontent.com/0fc006217ef3ae58f57a9d2a2dd0ffe05a622ce373a288e3ff3206a0cf790cdd/68747470733a2f2f696d672e736869656c64732e696f2f6769746875622f73746172732f6a6f7264616e2d67696262732f687970657272657365617263683f7374796c653d736f6369616c)](https://github.com/jordan-gibbs/hyperresearch)
**Hyperresearch 将 Claude Code 改造成一个深度研究代理：目前在 DeepResearch-Bench RACE 排行榜上名列前茅（内部基准测试）。**一个分层自适应的 16 步流程只需接收一个提示，即可生成一份经过对抗性审计并包含完整源代码来源的报告。它读取的每个源代码都会被保存到一个持久的、可搜索的存储库中，因此每个会话都比上一个会话更加智能。


[![DeepResearch-Bench 排名前五的超深度研究领先于 Grep Deep Research、Cellcog Max、nvidia-aiq、Gemini Deep Research 和 OpenAI Deep Research。](https://github.com/jordan-gibbs/hyperresearch/raw/main/assets/benchmark.png)](https://github.com/jordan-gibbs/hyperresearch/blob/main/assets/benchmark.png)
基于分层试点研究的前瞻性预测，并与 DeepResearch-Bench 排行榜快照（<https://huggingface.co/spaces/muset-ai/DeepResearch-Bench-Leaderboard>）进行对比。第三方验证正在进行中。


它获胜的原因
------


* **单次运行即可获取 250 多个来源。**规模`premier`规划的目标是在宽度扫描中达到 100-130 个来源；通过引文追踪和填补空白，获取的来源数量是实际纳入语料库的两倍以上。
* **报告发布前，所有引文都会经过核实。**一位严谨的引文审核员会仔细审查每个引用的来源是否确实支持其论点。虚假引文和未经承认的撤稿声明都会被直接拒之门外。
* **联合发布并不等同于共识。**独立审计会将衍生版本归为一类，因此同一份新闻稿的五次转载与单一来源的可信度相悖。
* **从一开始就带有对抗性。**四位评论家同时对每一份草稿进行批判，而工具受限的修改者只能进行精准的修改，无法真正重写报告。
* **八个学术资源，一次查询。** `hpr scholar search`通过一个客户端层，即可访问 OpenAlex、Crossref、CORE、DOAB、ClinicalTrials.gov、SEC EDGAR 和 FRED 等数据库，并返回一个按 DOI 和标题去重后的单一列表。书籍、试验和文件与论文一同返回，每项内容都带有标签，以便流程识别。人文和社会科学领域的内容是特意纳入的，而非事后添加的。
* **付费论文会被仔细阅读，而不是略读。**通常情况下，一篇付费论文会以1500字的摘要形式进入数据库，然后报告引用该摘要，就好像已经阅读过全文一样。Hyperresearch 向 Unpaywall、Europe PMC 和 CORE 申请合法开放获取的副本，并存储全文，即使出版商完全阻止了获取。所有替换都会在注释、前言和命令行输出中披露。
* **所有数据都不会被丢弃。**每个资源都会被存储在一个可搜索的 Markdown 和 SQLite 存储库中，下次会话在获取新内容之前会重用该存储库。
* **崩溃后的运行会继续。**每次运行都会保留一份清单；`run resume`它会从崩溃时的步骤继续执行。
* **时长从 30 分钟到一篇论文不等。**限定查询会自动跳转到 5 步快速路径。自愿参与的论文写作服务可生成 2.5 万至 8 万字的论文，涵盖多个章节，参考 300 至 450 个文献。


安装
--



```
cd your-project
pip install hyperresearch && hyperresearch install
```

然后`/hyperresearch <anything>`是克劳德代码。



>  Python 3.11–3.13。（暂不支持 3.14。请使用`pyenv install 3.13`、`uv venv -p 3.13`或`py -3.13 -m venv .venv`。）
> 
>  高级用户：`hyperresearch install --global`可`/hyperresearch`从任何位置的任何 Claude Code 会话访问，代价是每个会话的系统提醒中大约增加 15 行信息。按项目安装（如上所述）可保持不相关的 CC 会话整洁。
> 
>  


16步研究流程
-------


入门技能是一个精简的路由工具。它确定了规范的研究查询，然后通过 Claude Code 的`Skill`工具，在每个阶段调用一个步骤技能。每个步骤的流程只有在实际运行时才会加载到上下文中。这可以防止冗长的流程在上下文失效时悄悄丢弃步骤。




| # | 步 | 它的作用 | 层级 |
| --- | --- | --- | --- |
| 1 | 分解 | 规范查询 → 原子项 + 覆盖矩阵 + 层级分类 | 全部 |
| 1.5 | 章节划分 | 将原子项分组为 4-10 个章节；执行步骤 2-10，然后按章节循环。 | 论文 |
| 2 | 宽度扫描 | 多视角搜索方案 + 并行抓取波 | 全部 |
| 3 | 矛盾图 | 将语料库中的矛盾配对，并按优先级进行聚类。 | 满的 |
| 4 | 位点分析 | 两个平行位点分析器 → 使用来源预算对位点进行评分 | 满的 |
| 5 | 深度调查 | K 并行深度调查员 → 具有既定立场的临时说明 | 满的 |
| 6 | 跨基因座调和 | 协调已承诺的持仓 → comparisons.md | 满的 |
| 7 | 源张力 | 提取专家分歧 → source-tensions.json | 满的 |
| 8 | 语料库批评家 | “什么来源会推翻这个结论？” + 有针对性的填补空白数据 | 满的 |
| 9 | 证据摘要 | 热门观点 + 原文引用 → evidence-digest.md | 满的 |
| 10 | 三重抽奖 | 按角度进行源管理 + 3 个并行草稿子编排器（轻量级：单稿） | 全部 |
| 11 | 合成 | 计划 + 大纲 + 生成合成器子代理 → final\_report.md | 满的 |
| 12 | 评论家 | 4 个对抗性评论家并行工作 → 结果 JSON | 满的 |
| 13 | 间隙取 | 针对评论家指出的金库缺口的定向获取波 | 满的 |
| 14 | 补丁程序 | 对草稿应用外科手术式编辑块（工具锁定阅读+编辑） | 满的 |
| 14.5 | 引文核查 | 核实引文与句子之间的联系；持怀疑态度的LLM抽查；第二次手术修补通过 | 满的 |
| 15 | 抛光 | 卫生 + 填充通过（工具锁定的读取+编辑子代理） | 全部 |
| 16 | Readability audit | Recommender writes JSON suggestions; orchestrator selectively applies | all |


### Tiers and gears: the two scale levers


**Tiers** route per query. Step 1 auto-classifies `light` vs `full`. `dissertation` is opt-in only; ask for it in your prompt.




| Tier | What runs | Typical time |
| --- | --- | --- |
| `light` | bounded factual queries, surveys, comparisons: 1 → 2 → 10 → 15 → 16 | ~30–40 min |
| `full` (default) | deep argumentative analysis with adversarial review: all 16 steps + cite-check | ~1.5–2.5 h at `full` gear |
| `dissertation` | chaptered mega-runs: 300–450 sources across 4–10 chapters, 25K–80K words | ~4–8 hours |


**Gears** set the scale of the standard pipeline: the source targets, depth budgets, and word targets rendered into the step skills.



```
hyperresearch profile list           # all profiles + descriptions + current gear
hyperresearch profile use premier    # 100–130 sources, doubled depth budget (~3–5 h)
hyperresearch profile use full       # back to the 55–80-source baseline
```

The gear persists per project and survives reinstalls. Custom gears: define `[profile.<name>]` in `.hyperresearch/config.toml` (any knob: source targets, loci caps, draft counts, word targets, per-agent models) and `profile use <name>`.


### Run levers: what voice the report is written in


Tiers and gears set how much work happens. Levers set what kind of report comes out, and step 1 picks them from your prompt's verb shape. An explicit directive in your prompt always wins.




| Lever | Values | What changes |
| --- | --- | --- |
| `register` | `teach` / `survey` / `analyze` / `advocate` | "Teach me X" gets a pedagogical explainer; "what's the landscape" gets a map of the field with no verdict; `analyze` (the default) gets the evaluative argument; `advocate` defends one named thesis |
| `domain_notes` | freeform | Sourcing strategy, evidence norms, recency window for the field in question |
| `inference_depth` | `surface` / `standard` / `deep` | The rabbithole dial. Step 4 can upgrade it after seeing what the corpus actually holds |


The levers render into role-scoped shim files that spawn templates paste verbatim into subagent prompts, so the critics move with the register instead of undoing it. In `survey` register the dialectic critic flags unfair representation rather than missing commitment, and the polish auditor stops striking hedges. In `advocate` all of them tighten instead.


The cite-checker and the ship gate receive no shim at all. Verification never softens by mode.



```
hyperresearch levers set <tag> inference_depth=deep --rerender   # go deeper mid-run
hyperresearch run status -j                                      # see what step 1 chose
```

### The two load-bearing principles


1. **Patch, never regenerate.** After step 11 produces the synthesized report (or step 10 for light tier), the only modifications are surgical Edit hunks. The patcher and polish auditor are tool-locked to `[Read, Edit]` at the Claude Code allowlist level so they physically cannot Write a new draft. Per-hunk caps make "just rewrite it" mechanically impossible. Critic findings that don't fit a small hunk escalate as structural issues.
2. **Canonical research query is gospel.** The verbatim user prompt is persisted to `research/runs/<vault_tag>/query.md` once and re-read by every subsequent step and every spawned subagent. Wrapper requirements (save paths, citation format, terminal sections) are a separate contract.


### Subagent roster


Models are profile config, not hardcode. The table shows the shipped defaults, and you can override any of them in `.hyperresearch/config.toml`: `[profile.full]` with `models = { fetcher = "haiku" }` swaps every fetcher to Haiku on the next install or `profile use`.




| Agent | Default model | Role |
| --- | --- | --- |
| `hyperresearch-fetcher` | Sonnet | URL fetching via crawl4ai; runs 8–12 in parallel per wave |
| `hyperresearch-source-analyst` | Sonnet | End-to-end digest of any single long source >5000 words |
| `hyperresearch-loci-analyst` | Sonnet | Reads the width corpus, returns 1–8 depth loci with rationale |
| `hyperresearch-depth-investigator` | Sonnet | Investigates one locus, writes one interim note with a committed position |
| `hyperresearch-corpus-critic` | Sonnet | "What source would overturn the current direction?" pre-draft gap analysis |
| `hyperresearch-draft-orchestrator` | Opus | One per draft angle; reads its curated source list and writes one draft |
| `hyperresearch-synthesizer` | Opus | Reads all 3 drafts, writes the final report (two-pass write, Read+Write locked) |
| `hyperresearch-dialectic-critic` | Opus | Counter-evidence the draft missed |
| `hyperresearch-depth-critic` | Opus | Shallow spots interim notes could fill |
| `hyperresearch-width-critic` | Opus | Topical corners the corpus supports but the draft ignores |
| `hyperresearch-instruction-critic` | Opus | Structural mismatches against the prompt's atomic items |
| `hyperresearch-patcher` | Opus | Tool-locked `[Read, Edit]`. Applies critic findings as surgical Edit hunks |
| `hyperresearch-cite-checker` | Sonnet | Skeptically verifies sampled citation-sentence bindings before ship |
| `hyperresearch-polish-auditor` | Opus | Tool-locked `[Read, Edit]`. Cuts filler, strips hygiene leaks |
| `hyperresearch-readability-recommender` | Opus | Writes JSON suggestions for paragraph rhythm and list/table conversion |
| `hyperresearch-browser-fetcher` | Sonnet | Drains the escalation queue by driving your real Chrome (Claude-in-Chrome) |


The vault: persistent, searchable, compounding
----------------------------------------------


Most deep research harnesses are one-shot: report out, everything else discarded. Hyperresearch keeps what it reads. Every fetched source lands in a SQLite-indexed vault that future sessions search before they fetch.



```
hyperresearch search "ion-trap gate fidelity" -j           # Full-text search
hyperresearch search "quantum" --include-body -j           # Full-body search
hyperresearch note show <id1> <id2> <id3> -j               # Batch-read notes
hyperresearch graph hubs -j                                # Most-connected notes
hyperresearch graph backlinks <id> -j                      # Reverse links
hyperresearch lint -j                                      # Health check (broken links, missing tags)
```

**Markdown is truth, SQLite is cache.** Notes live as plain markdown with YAML frontmatter in `research/notes/`. The SQLite index is fully rebuildable: delete it and `hyperresearch sync` reconstructs it from the markdown. Open the vault in any editor, version it in git. You don't need the tool installed to read your own research.


**PDFs fetch directly.** `hyperresearch fetch` auto-detects PDF URLs (arXiv, NBER, SSRN, direct `.pdf` links) and extracts full text via pymupdf. Raw PDFs land in `research/raw/<note-id>.pdf` and the note's `raw_file:` frontmatter links back.


**Provenance breadcrumbs.** Every fetched source carries a `--suggested-by` link back to whatever surfaced it. The chain forms a rooted tree from seed fetches; the `provenance` lint rule catches disconnected components.


**Semantic search, if you want it.** `hyperresearch embed sync` populates embeddings (provider-pluggable: `voyage`, `openai`, or the default `none`, which needs zero API keys) and `search --semantic` blends vector similarity with full-text ranking.


### Curation: notes have a lifecycle


Every session ends with a curation pass, and notes move through `draft` → `review` → `evergreen`, or `stale` → `deprecated` → `archive` as material ages out. That's what keeps a vault from turning into a landfill of half-read pages.



```
hyperresearch note update <id> --summary "..." --add-tag <t> -j   # promote a draft
hyperresearch dedup -j                                            # near-duplicate pairs by content similarity
hyperresearch topic tree -j                                       # the topic hierarchy
hyperresearch index build -j                                      # regenerate index pages
hyperresearch batch set-status stale --tag <t> -j                 # bulk lifecycle moves
hyperresearch link --note <id> --dry-run -j                       # wiki-links the linker would add
```

### You are not locked in


The vault is markdown in a directory. Everything below is a convenience on top of that, not a dependency.



```
hyperresearch export json -o out.json # every note as structured JSON
hyperresearch export vault <dir>      # a filtered subset to another directory
hyperresearch import <dir>            # pull an existing markdown collection in
hyperresearch git changed -j          # notes with uncommitted changes
hyperresearch git log -j              # notes touched by recent commits
hyperresearch watch                   # auto-sync while you edit in your own editor
```

Use the vault outside Claude Code
---------------------------------


**An MCP server.** `pip install hyperresearch[mcp]`, then `hyperresearch mcp` speaks stdio, so Claude Desktop, Cursor, or anything else that speaks MCP can work the same vault. Thirteen tools: `search_notes`, `read_note`, `read_many`, `list_notes`, `get_backlinks`, `get_hubs`, `vault_status`, `lint_vault`, `check_source`, `list_sources`, `fetch_url`, `create_note`, `update_note`.


**A local web UI.** `hyperresearch serve --open` starts a stdlib HTTP server on port 8080 with note browsing, tag pages, search, and an interactive link graph. No build step and no JavaScript dependencies.


Source ranking: quality is persistent, not vibes
------------------------------------------------


Every source accumulates a composite `quality_score` built from source-type tier, fetch-time utility, citation authority (from OpenAlex / Semantic Scholar, including **retraction flags**), and vault PageRank centrality:



```
hyperresearch sources score -j             # Enrich DOI-bearing notes: citations, venue, retractions
hyperresearch graph rank -j                # PageRank over the link + provenance graph
hyperresearch search "q" --ranked -j       # Quality-weighted full-text search
hyperresearch sources independence -j      # Cluster syndicated/derivative copies: 5 copies of one press release = 1 vote
hyperresearch claims search "q" -j         # Query extracted claims across all sources
```

Retracted sources are floored to near-zero quality, and a ship-time retraction sweep re-checks every cited DOI fresh, so a retraction published yesterday is caught today. Even on vault sources reused from old runs.


Runs: resumable, budgeted, verified
-----------------------------------


Every run owns an isolated workspace (`research/runs/<vault_tag>/`) and a manifest. Concurrent runs never collide, and a crashed run resumes exactly where it stopped:



```
hyperresearch run status -j          # Step-by-step status, spend, escalation queue depth
hyperresearch run resume -j          # Exact next step + Skill invocation to continue
hyperresearch run report -j          # Per-step wall-time / spend / source-yield telemetry
hyperresearch run verify <tag> -j    # Ship gate: headings, length, citation density, cite-check resolution
```

`run init --budget 50` caps estimated API-equivalent spend; crossing the cap blocks the run rather than letting it quietly balloon. And before any report ships, the verification battery runs: **quote-integrity** (every quoted span must exist verbatim in a vault note), **retracted-citations** (citing a retracted source unacknowledged blocks the ship), **numeric-consistency** (numbers untraceable to evidence get flagged), plus the cite-check step's per-citation binding audit.


What's structurally enforced
----------------------------


* **Verbatim prompt as gospel.** `scaffold-prompt` lint blocks if the scaffold doesn't open with the user's exact prompt
* **Locus coverage.** Every step 4 locus must have a step 5 interim note; missing interims flag as errors
* **Patch-only modification.** Steps 14, 15, 16 are tool-locked to `[Read, Edit]`. They cannot regenerate the draft
* **Critical findings never silently skip.** `patch-surgery` lint surfaces any critical finding the patcher couldn't apply
* **Quoted text must exist.** `quote-integrity` lint blocks any quoted span that doesn't appear verbatim in a vault note; hallucinated quotes cannot ship
* **Retractions block the ship.** Citing a retracted source without acknowledging the retraction is a hard error at the final gate
* **Schema integrity.** `tier`, `content_type`, and `type` are SQLite CHECK-constrained vocabularies; corrupted frontmatter cannot poison the index
* **Hygiene leaks caught on the way out.** Scaffold sections, YAML frontmatter, and prompt echoes are stripped by step 15 before ship
* **Fetched text is data, never instructions.** Web-fetched bodies are served inside an `<untrusted-source>` fence on both `note show` and `search`, so a page telling the agent to ignore its instructions is read as content


The web is hostile input
------------------------


A research agent reads hundreds of pages it did not choose, and any one of them can contain text addressed to the agent rather than to you.


Every body fetched from the web is served wrapped in `<untrusted-source url="...">` delimiters with an inline treat-as-data preamble, on both paths that serve bodies (`note show` in single, batch, and JSON forms, and `search` with bodies included). Notes your own pipeline subagents wrote pass through unwrapped. Forged fence tags inside a fetched body are neutralized and left visible for forensics, the `url` attribute is HTML-escaped with control characters stripped, and in `search` the wrapping happens after token-budget truncation so the closing fence can never be severed. The fetcher, depth-investigator, draft-orchestrator, and source-analyst prompts all carry a policy block telling them not to launder a fenced page's directives into trusted output.


Resolved URLs from third-party APIs get the same treatment. An open-access location arrives inside someone else's JSON, so it's checked for scheme, embedded credentials, and publicly-routable resolution before anything fetches it.


Web providers
-------------


The `[web] provider` setting in `.hyperresearch/config.toml` picks how pages are fetched and, for the providers that support it, how the web is searched. All are optional extras except the default.


* **`builtin`** (default) — plain HTTP fetch with no search. Zero extra dependencies; the starting point everything else improves on.
* **`crawl4ai`** — headless browser fetch with stealth, PDF extraction and the browser-escalation lane. The one the pipeline is tuned for. `pip install "hyperresearch[crawl4ai]"`.
* **`exa`** — neural web search and page extraction. Needs an API key. `pip install "hyperresearch[exa]"`.
* **`tavily`** — search and extraction built for agents. Needs an API key. `pip install "hyperresearch[tavily]"`.
* **`parallel`** — [Parallel](https://parallel.ai/)'s Search MCP endpoint, which needs no account or key. Search only — bulk fetch waves degrade to per-URL, so it is a good search provider rather than a replacement for the crawl4ai fetch path. Every request from one process carries a random session ID that Parallel uses for correlation and rate limiting on its side. `pip install "hyperresearch[parallel]"`.
* **`serply`** — [Serply](https://serply.io)'s Google search API, with page fetch through the same key ([API docs](https://serply.io/docs)). Search results are fetched to full page text, falling back to the snippet when a page cannot be fetched. Needs an API key; no extra install.



```
# .hyperresearch/config.toml
[web]
provider = "crawl4ai"
```

Authenticated crawling + the browser lane
-----------------------------------------


Fetch from LinkedIn, Twitter, paywalled sites or anything you can log into:



```
hyperresearch setup       # Browser opens. Log into your sites. Done.
```

LinkedIn, Twitter, Facebook, Instagram, and TikTok automatically use a visible browser to avoid session kills.


**Blocked fetches escalate instead of dying.** When headless crawling hits a login wall or bot wall mid-run, the URL queues as an escalation (`hyperresearch escalation list -j`). If you have the [Claude-in-Chrome](https://claude.com/chrome) extension, the browser-fetcher agent drains the queue by driving your real, logged-in Chrome. Hard boundary: **CAPTCHAs, 2FA, and logins are never solved automatically.** They're consolidated into one message and handed to you.


Scholarly discovery: eight sources, one query, one deduplicated list
--------------------------------------------------------------------


For any topic with a research literature, search the scholarly sources BEFORE web search. They return citation-ranked canonical works; web search returns derivative commentary. That advice used to be delivered as a list of URL templates the agent was trusted to assemble by hand — no retry, no rate limiting, no dedup, no tests. It is now a real client layer:



```
hpr scholar search "Byzantine iconoclasm" -j                # every available source, merged
hpr scholar search "GLP-1 cardiovascular outcomes" --scope papers -j
hpr scholar search "credit default swaps" -s edgar -s fred -j
hpr scholar sources                                          # what is wired, what each covers
```

One call queries every configured source, merges records that are the same work (by DOI first, then by normalized title and year), and returns one list. A work found by two providers carries both in `also_in`, with the higher citation count and the longer abstract. Every provider shares one cache, one per-host courtesy rate limiter, and one result shape.


**The literature sources:**


* **[OpenAlex](https://openalex.org/)** — ~250M works across every discipline, including books, book chapters and theses. The right default outside STEM, where the incumbent tools are weakest.
* **[Crossref](https://www.crossref.org/)** — the DOI registry itself. Authoritative metadata for ~160M registered works, including registrations too new for anything else to have indexed.
* **[CORE](https://core.ac.uk/)** — the largest open-access full-text aggregator. Hosts the text rather than linking to it, so it is also a full-text resolver (below). Needs a key: `CORE_API_KEY`.
* **[DOAB](https://directory.doabooks.org/)** — peer-reviewed open-access scholarly books and chapters. The only source here that finds *the book* rather than a review of it, which matters because in the humanities the book, not the article, is the unit of publication.
* **RePEc** — listed so the gap is visible rather than silent. Their API [has no search function](https://ideas.repec.org/api.html); `hpr scholar sources` says so and points at OpenAlex and Crossref for the DOI-bearing series.


**The specialist sources** — citable records that are not papers, tagged by `work_type` so the pipeline never mistakes one for literature:


* **[ClinicalTrials.gov](https://clinicaltrials.gov/)** — registered studies including the ones that never produced a paper. No key.
* **[SEC EDGAR](https://www.sec.gov/edgar)** — full-text search over filings. The SEC rejects any request without a contact address in the User-Agent, so set `HYPERRESEARCH_CONTACT_EMAIL`.
* **[FRED](https://fred.stlouisfed.org/)** — Federal Reserve economic series. Needs a key: `FRED_API_KEY`, which is never written to the cache.


设置`HYPERRESEARCH_CONTACT_EMAIL`后，您将被加入 OpenAlex 和 Crossref 的“礼貌流量池”，这些流量池的速率限制比匿名流量宽松得多。系统绝不会以您的名义发送任何占位符。


在进行学术检索之后，进行网络搜索，以获取背景信息、新闻、非学术角度，以及至少一次对抗性搜索（“对 X 的批评”、“X 的局限性”）。


开放获取全文：引用前请阅读此内容
----------------


否则，一篇付费论文会以摘要的形式进入存储库，然后流程会处理大约 1500 个字符的摘要，并像已阅读全文一样引用该作品。最后，当获取到一篇带有 DOI 的单页论文时，hyperresearch 会依次向[Unpaywall](https://unpaywall.org/)、[Europe PMC](https://europepmc.org/)和[CORE](https://core.ac.uk/)请求合法的开放获取副本，并将**该**文本存储在注释正文中。Unpaywall 需要联系地址，Europe PMC 仅涵盖生物医学领域；CORE 则覆盖范围更广，囊括所有其他领域，并且它直接托管文本，而不是指向可能返回 403 错误信息的存储库。


**备注`source:`仍然指向您请求的网址。正文可能来自其他地方。**这种替换在四处有说明，您应该了解所有这些说明：


1. 笔记正文顶部的横幅，标明文本实际来源的 URL 以及版本号。
2. `oa_url`/ `oa_source`/ `oa_version`/ `oa_license`/`oa_recovery_kind`在笔记的前言中。
3. 一个`oa`块在`hpr note show <id> --json`，携带`body_is_not_from_source: true`。
4. `hpr fetch`和的输出中的一行`hpr fetch-batch`。


### 抢救出来的笔记：其中没有任何内容来自源头。


**当资源完全**无法读取时（例如出现 403 错误、需要登录或机器人拦截），也会运行相同的查找过程。在这些情况下，付费论文最容易丢失，而且由于 DOI 标识的是作品本身而非托管网站，因此在其他地方最有可能找到合法副本。


以这种方式构建的注释比替代注释更有说服力，并且标记方式也不同：`oa_recovery_kind: rescued`，`nothing_from_source: true`在`note show`，以及一个横幅，表明从未读取过源 URL。请按字面意思理解。标题、作者和正文中的每个字都来自开放获取版本——没有从 URL 读取任何内容`source:`。如果您宁愿没有注释，也不愿使用完全由替代内容组成的注释，请设置`oa_rescue_blocked = false`。


有两个需要注意的限制。救援功能需要 DOI，而没有返回任何内容的源文件没有可供读取 DOI 的页面，因此它仅在 URL 本身（链接`doi.org`）或页面`citation_doi`元标签中包含 DOI 时才会触发。不包含 DOI 的纯出版商 URL 会像之前一样失败。此外，救援后的源文件不会**被**放入浏览器升级通道的队列中，因为论文已经获取——如果您需要出版商的页面，请自行通过该通道获取。


**版本不可互换。**如果已接收的稿件或已提交的预印本没有公开的版本，Unpaywall 会很乐意将其退还。hyperresearch 更倾向于使用最终版本，并记录其收到的版本。`oa_version`但如果版本信息显示为“已发布”`acceptedVersion`或“未发布`submittedVersion`”，请在报告发布前，将任何直接引用的内容与已发表的论文进行核对。正文横幅也对此有所说明。


`[scholar]`在以下位置进行配置`.hyperresearch/config.toml`：



```
[scholar]
oa_recovery = true              # set false to disable entirely
contact_email = ""              # REQUIRED by Unpaywall's terms — empty means Unpaywall is skipped
oa_min_full_text_chars = 6000   # bodies shorter than this trigger a lookup
oa_prefer_published = true      # version of record over preprints
oa_max_attempts = 3             # candidate copies to try before giving up
oa_rescue_blocked = true        # also run when the source can't be read at all
```

默认情况下`contact_email`是空的，因此仅支持欧洲 PMC，且检索范围仅限于其**开放获取子集中的**论文。请将其设置为真实地址以启用 Unpaywall——他们的条款要求必须使用真实地址，如果使用共享占位符，则会导致所有 HyperResearch 用户同时受到该占位符的访问速率限制。


出版商经常屏蔽自己的开放获取PDF文件，一次尝试远远不够，因此超搜索会遍历候选列表：首先是Unpaywall已知的所有PDF文件，然后是它们的着陆页，最后是Europe PMC的结构化全文（由JATS解析，在双栏PDF上优于pymupdf——具有真正的章节边界，没有页眉溢出，也没有列交错）。只有在Unpaywall的所有副本都用尽后，才会查询Europe PMC。


**恢复功能绝不会失败，也不会降低质量。**候选资源必须满足两个条件才能被接受：文本量要比现有资源多，*并且*文本量要足够多才能通过审核`oa_min_full_text_chars`。第二个条件就是防止存储库记录页面（标题、作者、200 字摘要）仅仅因为比出版商的摘要略长就被判定为全文。如果没有候选资源同时满足这两个条件，则保留摘要，并且不会`oa`显示任何阻止信息。恢复功能只会将失败的获取结果转换为注释，而不会反过来：当被阻止的资源没有开放获取的副本时，该命令会像往常一样失败。


它不做什么
-----


* 它并不能取代你对信息来源重要性的判断。经纪人挑选，你来引导。
* 它无法获取您未登录的付费墙后的内容。开放获取恢复功能会在存在合法免费副本时找到它——即使出版商完全阻止了获取——但如果不存在，您只能获得摘要，或者什么也得不到，注释中也说明了这一点。
* 它基于 Anthropic 模型，通过子代理名册运行（每个代理的分配来自配置文件的模型映射）。使用量随等级、装备和语料库规模而变化。如果有人想将其移植到 Codex，请提交 PR！
* 绒毛门可以检测出**结构性**缺陷（例如缺少脚手架、来源信息不完整、关键问题未解决）。但它无法保证事实的准确性，这仍然由您来判断。


要求
--


* Python 3.11+
* [克劳德·科德](https://claude.com/claude-code)


执照
--


[麻省理工学院](https://github.com/jordan-gibbs/hyperresearch/blob/main/LICENSE)


星际历史
----


 [![星空历史图表](https://camo.githubusercontent.com/b58903fd1f0edab6af31e6a10739aa749c063ae3212107c3bcb55b74ea44d02d/68747470733a2f2f6170692e737461722d686973746f72792e636f6d2f63686172743f7265706f733d6a6f7264616e2d67696262732f6879706572726573656172636826747970653d64617465266c6567656e643d746f702d6c656674267365616c65645f746f6b656e3d4f3135504a425a487363756e44436a516f7a3555792d4f7537554650734269365875593350686f6b3545415f644332574b554349366f673856744f43762d36624855504a5a7a35317770556f693672416d73517a473651546178615a35386b795a33477652624f4a762d76504a427447377a44346f77)](https://www.star-history.com/?repos=jordan-gibbs%2Fhyperresearch&type=date&legend=top-left)
