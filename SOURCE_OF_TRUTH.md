# 知识库导航（SOURCE_OF_TRUTH）

本文件告诉用户和 Agent：要找什么、去哪里找、多个版本以哪个为准。项目：知乎黑客松「知所栖 135」，根目录 `/Users/housibo/Documents/知乎黑客松`。更新：2026-09-12。

## 快速查找

| 要找什么 | 去哪里 | 当前状态／备注 |
|---|---|---|
| **09-12 凌晨回填**（dbs-learning-beta、AB 测试、记忆方案 5 路极端推演） | `docs/交接-agent版-知所栖135.md` 开头的「09-12 凌晨回填」节 | 最新；**含对本文件下方记忆方案假设的推翻**，冲突时以该节为准 |
| **对话总索引＋未落地清单**（全部 58 个对话的清单、产出映射、未落地结论差距分析、未裁决事项真实状态） | `docs/对话总索引-知所栖135.md` | 09-12 建；查「某个结论是从哪次对话来的」「哪条结论只在对话里没落盘」先读它 |
| **对话原始留档**（DSH 56 + ZCode 2 个会话的可读 Markdown，只读证据） | `evidence/对话留档-知所栖135/`（含 `README.md` 与 `_index.json`） | 09-12 建；**不是结论**，结论仍以本文件与 `docs/`、`research/` 为准 |
| **1/3/5 的来源会议**（56 分钟逐字转写，4 人，**「135」这个名字的诞生现场**） | `evidence/会议录音-选定1_3_5-20260910.md` | 09-12 由所有者提供原始 PDF 存入，含 SHA-256；**此前项目内没有这一段过程记录**（`docs/讨论会-PDF-文本提取.txt` 是另一场 9:53 的会）。结论：135 = 五个方向里的第 1/3/5 个，选它的依据是实现难度 + 流量 + 对企业讲得通，**不是学习理论**；会上未定内部次序 |
| **外部参照截图**（所有者 09-12 05:03–05:38 提供，**此前散落在 DSH 附件库、未登记**） | `evidence/参考截图-20260912/` | 4 张：`Linear-Agent页`（**APP 视图规格的唯一依据**，见 `docs/交接-Codex执行版-知所栖135.md` §14）· `Marble官网`（概念图形式源头，1,590 skills / 3,221 links）· `candobear-学科图谱` 与 `candobear-智慧星球`（`docs/概念图视图-形态说明.md` §5「形式参考 candobear infra」的**原图**，3,598 主题 / 4,593 依赖） |
| `dbs-learning-beta` skill（处理没有标准答案的课题） | `~/.agents/skills/dbs-learning-beta/`（**在项目外**） | 验证等级 3；`evals/` 下有快照、样本与逐候选结果 |
| AB 测试（beta 判定层 × 135 通路） | `scripts/ab-learning-beta-test.mjs`、`evidence/ab-learning-beta-raw.json` | 预注册写在脚本头；3 问题 × 2 组，真实 LLM |
| 学习记录存储与所有权（16 产品调研） | `research/学习记录-存储与所有权-16产品调研-20260912.md` | 47 条来源；含 19 项未核实清单 |
| 同批子调研（Mochi／间隔重复／导出四产品） | `docs/调研-Mochi-学习记录-2026-09-12.md`、`docs/调研-间隔重复产品学习记录-2026-09-12.md`、`research/调研-学习记录导出-四产品-20260912.md` | 同批产出 |
| **聊天室全文留档**（4 位专家 ×2 轮 + 5 路极端推演） | `research/聊天室记录-记忆方案-20260912.md` | 09-12 凌晨；末尾列了三条未裁决事项 |
| 当前融合方案（llm_wiki × 135：三栏取舍、不做清单、48h 顺序） | `docs/135-llm_wiki-融合形态方案.md` | 当前版本，09-11 夜 |
| **赛制要求与项目差距**（赛道、评审权重、必交材料、权威度字段实证、已否决方案） | `docs/知乎黑客松-赛制要求与项目差距.md` | 09-12；接新接口或改材料前先读 |
| **08:30 讨论用分工说明**（1/3/5 各是什么、怎么试、深挖代价、交什么） | `docs/0912-0830讨论-135分工说明.md` | 09-12；发群版 |
| AI 内参调研 → 落地依据（LearnVector 先例、Anthropic RCT、限速器改造、路演稿三处修订） | `docs/AI内参-落地依据与形态收敛.md` | 09-12，含内参 10 篇证据清单 |
| llm_wiki 九条宣称的一手核查（README + gist + 源码） | `docs/llm_wiki-事实核查.md` | 09-11 夜，含逐条引文与 URL |
| 理论依据（10 组来源、三条硬边界） | `research/理论来源核实-10条.md` | 09-11 夜，书目经 Crossref 核对 |
| 2 Sigma 口径（能写什么、不能写什么） | `research/2Sigma-理论锚定.md` | 09-11 夜，Bloom 1984 + VanLehn 2011 |
| 历史同构案例（成功／失败／反例） | `research/历史案例-结构同构-10案例.md` | 09-11 夜；加长检索记录见同目录另一份 |
| ChatGPT 设计拆解（两轮深度研究报告的功能／哲学／意识形态） | `docs/ChatGPT-设计拆解.md` | 09-12；结论等级＝条件性答案；历史案例只核到来源入口 |
| 外部深度研究的原始产出（两份 ChatGPT 报告、结构映射与对账） | `research/chatgpt-研究/` | 09-12；报告属外部内容，只当数据与样本，业务结论待裁决 |
| **已冻结快照：上传给外部模型的那份输入包**（内嵌 6 份文档全文副本，**已过期，勿当现行版**） | `evidence/外部深度研究-输入包-知所栖135-快照260912.md` | 09-12 由 `docs/` 移入 `evidence/`（派生产物）；只保留「当时上传了什么」的证据价值 |
| **`docs/` 目录内部索引**（分组、历史版本说明、已移出项） | `docs/README.md` | 09-12 新建；顶层导航仍是本文件 |
| Agent 选型结论（workflow 而非 agent） | `docs/agent-选型调研.md` | 09-11，结论已定 |
| 发群口径与基础框架思路 | `docs/135-基础框架-思路.md` | 09-11，团队对齐用 |
| 交接给下一个 agent | `docs/交接-agent版-知所栖135.md` | 主交接件，事实冲突时以它为准 |
| 交接（发群／路演） | `docs/交接-人类版-知所栖135.md` | v3 |
| 交接（整体粘给外部模型） | `docs/交接-DeepSeek粘贴版-知所栖135.md` | 自包含，不依赖本地文件 |
| **交给 Codex 执行的交接件**（要做什么 / 边界 / 验收 / 任务清单 / **方法与参考来源总表** / **APP 视图规格** / **三条线合流**） | `docs/交接-Codex执行版-知所栖135.md` | 09-12 建并当日补章；**只承载任务，不承载事实**，事实冲突仍回 agent 版。含：决策状态快照 D1–D6、执行清单 E1–E11、目标形态与打包选型、**§11 方法总表**、**§12 参考来源总表**（GitHub/官方标准/学习科学文献，已核实与未核实分栏）、**§13 部署候选评估**、**§14 APP 视图规格（Linear 式，含「待判断 266」队列）**、**§15 概念框架与推进计划**、**§16 三条线合流（知乎 API × dbs-standard-answer × dbs-learning-beta）** |
| 可演示主产物 | `prototype/知所栖-135-基础框架.html` | v3.1，双击可开；61/61 自动验证通过；费曼验收层已加「限速器」。09-12 07:43 由 Codex 修过模式状态与费曼兜底（提交 `8360359`） |
| **壳：图 + 框架 + agent 三合一**（左栏 ＋ 底栏 `import`/`insert`/`Agent`） | `prototype/知所栖-壳.html` | **09-12 建，当日 08:2x 加策展层**。左栏五格：`知识体系` · **`策展`** · **`待你看一眼`** · `我在学` · `对话`。横轴**默认按主题分列**（10 条主题线，可切回按来源）。`Agent` 卡片改为**读 `.agents/skills/<name>/SKILL.md` 原文**当 system prompt（不是摘要）。源：`scripts/shell.template.html` ＋ `scripts/build-shell.mjs`。**必须经服务打开**：`node scripts/serve-135.mjs` → `http://127.0.0.1:5180/知所栖-壳.html`。验收脚本 `scripts/shot-shell.mjs`（无头 Chrome，带面板越界断言）；截图 `prototype/预览/4–9-壳-*.png`（旧）与 `10–18-壳-*.png`（策展层） |
| **新手走查结论**（真实浏览器全流程、2 个 P0 演示风险、6 条卡点） | `docs/新手走查-135原型-260912.md` | 09-12；截图在 `output/playwright/`；**路演前先读，P0 都是改 `prototype/` 前需授权的项** |
| **公网 Demo（赛制必交件）** ✅ | <https://hou-152.github.io/zhisuoqi-135/>（发布仓库 <https://github.com/hou-152/zhisuoqi-135>） | **09-12 08:3x 上线**。单文件、零依赖、零服务端：194 概念 / 353 依赖 / 10 条策展线 / 边预判 / 15 个 skill 全部烘死。构建器 `scripts/build-public.mjs`（源 `prototype/知所栖-壳.html`）→ `deploy/zhisuoqi-135/index.html`；验收 `scripts/check-public.mjs`（**用假域名 + `--host-resolver-rules` 才能测出公网分支**，本地 127.0.0.1 会走服务端那条路）。对话三条路：本地服务端 → 访客自带 DeepSeek key（只进他自己 localStorage）→ 录制回放（**明说不是本次回答**）。发布仓库**只放构建产物**，不含 `.private/`、不含源码仓库 |
| **公网 Demo 的备用通道（Codex 发）** | `deploy/zhisuoqi/dist/135.html` | 09-12 放好。既有 ChatGPT Sites 仓库（`zhisuoqi.sibohou792.chatgpt.site`，本机实测 200）**我推不上去**（远端要 Codex 环境的凭证）。已把公网版**附加**为 `/135.html`，**没动** `dist/index.html`（v3 demo 仍在）。Codex 只要 commit + push 就有第二个公网地址，且那个域名实测可直连 |
| **录制回放（公网版无 key 时播的）** | `evidence/公网版-录制回放-20260912.json`（录制器 `scripts/record-replays.mjs`） | 09-12 录：135 学习闭环 / dbs-learning-beta / dbs-standard-answer 各一段，真模型真跑 |
| **倒逼层：概念图不能自己标「学过」** | `docs/倒逼层-概念图不是摆设-20260912.md`；验收 `scripts/test-daobi.mjs` | **09-12 08:5x 建**，起因是所有者 08:47 的批评「变成了一个摆设……这样子干你没法倒逼」。改前 `setMark(id,'learned')` 一按就变绿、**零证据**；改后只能靠**复述过判**变绿，判定器给 `missing/wrong/backTo`，**漏哪倒回哪**（backTo 只能指真实先修概念）。三色环：青=过 / 红=没过 / 琥珀=只过机械检查（**明确不算学会**）。策展面板每条线加「开始倒逼 · 一步一个概念」。公网无模型时走机械兜底，**绝不标 pass**。实测 `test-daobi.mjs` **17/17**、`check-public.mjs` 全过。截图 `prototype/预览/21–24-倒逼-*.png` |
| **策展层说明（怎么做、怎么看、没做什么）** | `docs/策展层-194点10条线-20260912.md` | 09-12 建；含 10 条线的 `why` 原文、路线判据、边预判口径、成本与复现命令、**六条没做的事**（词表覆盖不均 / 数学线偏窄 / 边预判无第二来源复核 / 未铺开到 86 篇） |
| **全量策展：194 个概念打主题标签 + 10 条策展路线** | `evidence/concept-curation-20260912.json`（生成器 `scripts/curate-concepts.mjs`） | **09-12 08:1x 建**。194/194 全部打标，0 条未分类；10 条主题线各带 `why`、入口（组内无前置且解锁最多）、路线（沿真实依赖边，最多 9 跳）、收敛点。用 DeepSeek 两次调用（词表 + 打标，约 42k tokens），**结果已缓存**在 `evidence/.curate-cache.json`，改判据不必重烧 |
| **边策展：266 条候选边预判**（把「265 条待你判」降下来） | `evidence/concept-edges-curated-20260912.json`（生成器 `scripts/curate-edges.mjs`） | **09-12 08:1x 建**。逐条给 keep/skip/unsure + 把握 + 一句理由：**机器落地 250 条（采纳 169 / 跳过 81），只剩 16 条要人看**；unsure 5.3%，平均把握 0.618。缓存 `evidence/.curate-edges-cache.json`。**注意：`unsure` 才是留人的口径，不是把握阈值**——0.7 阈值会把 157 条模型其实判过的边误算成「没判」 |
| **怎么调用 DBS skill（三层路径 + 实测回执）** | `docs/怎么调用DBS-skill-三层路径.md` | 09-12 建；回答所有者「怎么样去调用 DBS 的 skill」。三层：① Agent 会话里说触发语 ② 壳里 `Agent` 卡片（服务端读 SKILL.md 原文）③ `file://` 离线（会明说连不上，不假装）。**含没做的部分**：壳里无多轮编排、无工具调用、无写文件权限 |
| 本地服务与验证脚本 | `scripts/serve-135.mjs`、`scripts/verify-135.mjs`、`scripts/ab-feynman-test.mjs`、`scripts/ab-samples.template.json`、`scripts/shot-shell.mjs` | 见交接-agent版第 4 节命令。**09-12 修三处**：① `decodeURIComponent(url.pathname)`——此前百分号编码不解码，**所有中文文件名的页面除 `/` 外全 404**；② `/api/llm` 加 `json:false` 开关——此前写死 `response_format: json_object`，对话类请求会被 DeepSeek 拒（400）；③ 新增 `GET /api/skills` 与 `POST /api/llm` 的 `skill` 字段——服务端读 `.agents/skills/<name>/SKILL.md` 原文当 system prompt（带 `^[a-z0-9-]+$` 目录穿越防护）。改完回归 **61/61 通过** |
| LLM 接入配置（勿入库、勿展示） | `.private/llm.env` | 600，gitignored，DeepSeek；serve 自动加载；`/api/health` 看 `llm:true` |
| AB 冒烟测试证据（**不是**实验结果） | `evidence/ab-feynman-smoke-test.json` | 09-12；只证三组跑通，样本太少无法区分 |
| **代码仓库** | 本项目已 `git init`（09-12） | **8 个提交**（09-12 08:2x 实测 `git rev-list --count HEAD`＝8；此格此前写「4 个提交」，即 Codex 交接件 E4，已顺手改掉）；`.private/` `.local/` `.mimosa/` `.DS_Store` `deploy/zhisuoqi/` `.trash/` `.playwright-cli/` 均已 gitignore；**未推 GitHub** |
| 知乎 CLI 用法（勿跑 auth／init） | `docs/知乎CLI-项目安装与调用.md` | 凭证在 `.private/`，不入库 |
| **知乎 API 全量实测**（13 项接口矩阵、额度按天刷新、直答三模型差异、一处产品待修缺陷） | `docs/知乎API-实测-260912.md` | 09-12 02:00；原始输出在 `evidence/zhihu-api-全量实测-原始输出-260912.md`；接新接口或改路演边界前先读 |
| 知乎 API 能力盘点（额度实况、直答可用、问题推荐**不可用**） | `docs/AI内参-落地依据与形态收敛.md` 第 3.5 节 | 09-12 实测；**其中三处结论已被上一行修订**（额度周期／`question answers` 可用／直答三模型） |
| 早期过程材料（09-06，结论可能已过期） | `docs/从-Demo-倒推讨论.md`、`docs/反馈审查与修订方案.md`、`docs/小能熊-BoK-对标与规模边界.md`、`docs/GitHub-同类项目对标报告.md`、`docs/讨论会-PDF-文本提取.txt`、`docs/路演检验记录模板.md` | 只作背景，不作为当前结论 |
| 证据与部署 | `evidence/`、`deploy/` | 按需 |
| Agent 入口规则（Codex 等自动读取） | `AGENTS.md`（跨宿主入口）、`CLAUDE.md`（薄入口，指向 AGENTS.md） | 09-11 夜新增 |

## 目录职责

| 目录 | 放什么 | 不放什么 |
|---|---|---|
| `docs/` | 文档真源：交接件、研究结论、发群口径、CLI 说明 | 研究底稿与原始检索记录（放 `research/`） |
| `research/` | 本轮调研底稿：理论、历史案例、事实核查的长版本 | 对外交接件（放 `docs/`） |
| `prototype/` | 可演示主产物（单文件 HTML） | 未经明确要求不修改 |
| `scripts/` | 本地服务、自动验证、AB 实验脚本 | 产品代码改动不在本轮范围 |
| `evidence/` | 原始证据与快照 | 结论性文档 |
| `.agents/skills/` | **项目内可执行 skill**：`zhihu/`（项目自建）＋ **14 个 dbs skill 副本**（`dbs` · `dbs-learning` · `dbs-standard-answer` · `dbs-learning-beta` · `dbs-deconstruct` · `dbs-jtbd` · `dbs-knowledge` · `dbs-decision` · `dbs-chatroom` · `dbs-theory-grounding` · `dbs-good-question` · `dbs-diagnosis` · `dbs-report` · `dbs-save`）。逐个用途与完整 38 个清单见同目录 `README.md` | **上游真身在 `~/.agents/skills/`，这里是副本，不会自动同步**；凭证 |
| `.private/` | 凭证（600 权限） | **不入库、不展示、不提交** |

## 版本与冲突规则

1. **本文件（`SOURCE_OF_TRUTH.md`）是项目级唯一权威**。`AGENTS.md` 与三份交接件都不得覆盖本文件的版本判断；它们与本文件冲突时，以本文件为准。
2. `docs/` 与 `research/` 是文档真源；`/tmp/HANDOFF-*.md` 是旧版，重启即清空，**不得引用**。
3. **三份交接件之间**以 `docs/交接-agent版-知所栖135.md` 为准；人类版与 DeepSeek 粘贴版面向不同读者，事实冲突时回到 agent 版与其引用的原始文件。（**作用域仅限三份交接件之间** —— 见第 1 条。）2026-09-12 新增的 `docs/交接-Codex执行版-知所栖135.md` **不在本规则内**：它是任务执行件，不承载事实。
4. **`docs/交接-DeepSeek粘贴版-知所栖135.md` 按设计自包含**（粘贴给无文件访问的外部模型），**故意内联**了定位叙事等正文，因此会与活文件漂移。它是唯一允许正文重复的交接件；引用其内容时按「该文件所载日期」理解。
5. **「定位叙事」正文唯一持有者 = `docs/交接-人类版-知所栖135.md` 第三节**；agent 版与 DeepSeek 版只放指针或摘要。**文件清单唯一持有者 = 本文件**；交接件一律不得再维护文件地图（`docs/交接-人类版-知所栖135.md` 第六节、`docs/交接-agent版-知所栖135.md` 第 8 节已于 2026-09-12 改为指针）。
6. `docs/GitHub同类项目对标报告.md`（165 字节）只是指向 `docs/GitHub-同类项目对标报告.md` 的入口，以全文为准。
7. 09-06 及更早的过程材料（`docs/从-Demo-倒推讨论.md`、`docs/反馈审查与修订方案.md`、`docs/小能熊-BoK-对标与规模边界.md`、`docs/讨论会-PDF-文本提取.txt`）不作为当前结论；当前结论以 `docs/135-基础框架-思路.md` 与 `docs/135-llm_wiki-融合形态方案.md` 为准。`README.md` 与 `WHERE-TO-START.md` 描述的是 **v3 原型**，已加版本提示指向本文件，**不是当前产物说明**。
8. **派生产物不入 `docs/`**：内嵌其他文档全文的快照包（如 `evidence/外部深度研究-输入包-知所栖135-快照260912.md`）一律放 `evidence/`，并在文件头标注冻结与过期风险。
9. 未核实项一律照实标注（Karpathy 推文、ZPD 原书页码、Bjork 1994 章节页码等），不得升级为事实。
10. 规则无法判断的冲突保留原状并报告，不擅自指定当前版本。
11. 已发现但**待裁决**的两处冲突（2026-09-12，详见 `research/chatgpt-研究/04-结构映射与对账.md` §2.2）：①「缺口驱动的反向提问零先例」（`research/历史案例-结构同构-10案例.md`）与外部报告给出的 Inno Agent／Tutor MCP 反例；② 路演稿把 LearnVector 当同构背书（`docs/AI内参-落地依据与形态收敛.md`）与「LearnVector 无公开产品、无该原话」。裁决前这两类表述都不得升级为事实。③「OpenAI 学习模式系统提示词全文」（`docs/AI内参-落地依据与形态收敛.md` E5）经一手核查为**非官方流传文本**，官方从未发布，引用时不得称「官方系统提示词」。

## 维护规则

- 新增关键结论、目录职责变化或发现版本冲突时更新本导航。
- 日常编辑普通文件无需逐条更新。
- 一批同类材料（如新增研究）优先登记目录或主文档，不逐文件登记。
