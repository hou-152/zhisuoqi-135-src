# 知识库导航（SOURCE_OF_TRUTH）

本文件告诉用户和 Agent：要找什么、去哪里找、多个版本以哪个为准。项目：知乎黑客松「知所栖 135」，根目录 `/Users/housibo/Documents/知乎黑客松`。更新：2026-09-13。

## 快速查找

| 要找什么 | 去哪里 | 当前状态／备注 |
|---|---|---|
| **全景：三场会 → 做到哪了 → 方向 → 时间线**（「把最近所有东西拉出来看」的入口）★ | `docs/全景-三场会与当前进展-知所栖135.md` | 09-13 02:1x 建。三场会逐场写「定了什么 / **没定的**」＋ 六轮建设对照 ＋ 方向（做什么、明确不做什么、评审权重怎么读）＋ 到 09-19 的**绝对**时间线 ＋ 四项提交材料现状 ＋ 11 条缺口。**三条最要紧的**：① 三场会**没有任何一场产出过分工**（09-10 原话「那我们就先不分工嘛」），现行 12 条边 RACI 是工程侧单方写的、**主负责人还没认领**；② 手上这张公网 Demo **是壳、不是 135 主流程**（线上 0 处「本次尚未验收」）；③ 02:0x–02:2x 之间 `SOURCE_OF_TRUTH.md` 行 9 被**另一个会话**整体改写过（1156/647/4554/22 → 856/491/3293/21）——**这个仓库有并发写**，引用数字前先现查数据文件 |
| **概念地图 v2（2026-09-13 全量替换旧 194 概念池；同日过完全量审核）** ★ | `knowledge/概念地图-260913/`（topics **856** · dependencies **491** · relations 3293 · clusters 21 · manifest · schema）＋ `knowledge/概念wiki-260913/`（856 页概念页 ＋ `[[双链]]` ＋ index/log/README） | **当前概念唯一真源**。三源＝用户 Notion 概念库 509（含逐页正文）＋ 飞书 Context Engineering 28 篇 ＋ Harness Engineering 30 篇；源快照冻结在 `evidence/概念源-260913/`（含 `SHA256SUMS.txt`），Notion 全程只读。地图照 <https://github.com/withmarbleapp/os-taxonomy>，链接层照 <https://github.com/nashsu/llm_wiki>。管线 `scripts/cm-*.mjs`（七步，两次 LLM 都带缓存可断点重跑）；体检 `node scripts/cm-validate.mjs`。**旧 194 概念池退役**，只在 `build-shell.mjs --legacy` 里留回退分支。**已按「只要 AI 的」过滤**：1156 → 856（删 300 条非 AI，逐条带理由留 `evidence/cm-260913/07-ai-filter.json`，没物理删除）。**每条依赖都带审核结论**（yes / weak 已降 soft / reversed-fixed；判否的边留 `rejected` 可翻案）。最终抽检：定义有原文支持 88%、**无编造**、领域 100%、依赖边成立 87.5%。已知缺口（264 个孤立点、14 个无入链页）见下两行 |
| **概念地图 v2 完整说明**（三源、管线、审核一轮、数字、验收、没做的） | `docs/概念地图v2-三源替换-20260913.md` | 09-13 建；查「概念从哪来」「为什么依赖边只剩 491 条」「Notion 里那些非 AI 概念为什么在」先读它 |
| **概念地图 v2 审核报告**（结构体检 + 分层抽检，给人看的那份） | `docs/概念地图v2-审核报告-20260913.md` | 09-13 建；**上线前的审核依据**。含 3 个已修 bug、可疑清单逐条带理由、审核前后对比。全量判决原始记录在 `evidence/cm-260913/06-audit-full.json`（**注意：该文件的 `concepts` 是空的 —— 全量概念审核的逐条记录没落盘，现存只有 `06-audit.json` 里的 60 条抽检；边的逐条判决在 `06-audit-full.json`，681 条：yes 315 / weak 320 / no 37 / reversed 9。2026-09-13 02:2x 实测**） |
| **五语义内容工程（问题/概念/观点/案例/方案）** ★ | `内容结构化系统/`（538 单元：概念 76 · 方案 76 · 案例 76 · 观点 169 · 问题 141；7 张主题地图 · 2 份选题装配稿） | 09-13 建，`dbs-content-system` 形态。**三源与概念地图 v2 同源**（两份飞书主题精选 ＋ 图鉴站 76 张已审计概念卡），但产物不同：这里拆的是「一鱼多吃」要用的五类语义单元，供决策场/实验台/费曼验收取用。**0 次 LLM 调用**（复用 + 确定性解析）。先读 `内容结构化系统/03-处理状态/处理状态总览.md`（含 5 条已知问题：去重候选 16,025 条失控、76 个案例全是假设场景等）。交付与调用入口见 `docs/交付包-基本盘与五语义-20260913.md` |
| **260912 期内参日报（倒推版，含五维拆解与统一概念池）** | `knowledge/内参-260912/`（日报 md/html · 三级笔记/概念辞典/AI费曼 ×10 篇 · 拆解五维 ×10）· `knowledge/llm-wiki/概念池-260912.json`（1830 唯一概念，四源合并） | 09-12 深夜建。流水线：Readwise 今日精选 → 三产物（note-taking-pro / concept-learning SOP）→ 五维拆解（3概念/1阅读梯度/3决策/5实验/费曼要点）。脚本 `scripts/build-daily-260912.mjs` · `build-deconstruct-260912.mjs` · `build-concept-pool.mjs` · `build-neican.mjs`（带缓存可断点重跑）。跳过记账 1 篇（The Information 反爬）。**这一期 10 篇已按「AI 内参」图文格式接进壳的第六格「内参」**（主题 / 重要等级 / 地址 / Claude 风格配图 / 原文子链接 / 简介 / 入选理由 / 三级笔记 / 概念网络 / 费曼 ×3，无收藏与公开笔记 —— 见 `docs/内参一栏-AI内参格式-20260912.md`）。**已上公网（所有者拍板：官网只放当日一期、可读、无归档索引）**：<https://hou-152.github.io/zhisuoqi-135/neican/260912.html>；全文/概念池只在私有 src 仓库（PR #1），不上公网 |
| **09-12 凌晨回填**（dbs-learning-beta、AB 测试、记忆方案 5 路极端推演） | `docs/交接-agent版-知所栖135.md` 开头的「09-12 凌晨回填」节 | 最新；**含对本文件下方记忆方案假设的推翻**，冲突时以该节为准 |
| **对话总索引＋未落地清单**（全部 58 个对话的清单、产出映射、未落地结论差距分析、未裁决事项真实状态） | `docs/对话总索引-知所栖135.md` | 09-12 建；查「某个结论是从哪次对话来的」「哪条结论只在对话里没落盘」先读它 |
| **对话原始留档**（DSH 56 + ZCode 2 个会话的可读 Markdown，只读证据） | `evidence/对话留档-知所栖135/`（含 `README.md` 与 `_index.json`） | 09-12 建；**不是结论**，结论仍以本文件与 `docs/`、`research/` 为准 |
| **1/3/5 的来源会议**（56 分钟逐字转写，4 人，**「135」这个名字的诞生现场**） | `evidence/会议录音-选定1_3_5-20260910.md` | 09-12 由所有者提供原始 PDF 存入，含 SHA-256；**此前项目内没有这一段过程记录**（`docs/讨论会-PDF-文本提取.txt` 是另一场 9:53 的会）。结论：135 = 五个方向里的第 1/3/5 个，选它的依据是实现难度 + 流量 + 对企业讲得通，**不是学习理论**；会上未定内部次序 |
| **外部参照截图**（所有者 09-12 05:03–05:38 提供，**此前散落在 DSH 附件库、未登记**） | `evidence/参考截图-20260912/` | 4 张：`Linear-Agent页`（**APP 视图规格的唯一依据**，见 `docs/交接-Codex执行版-知所栖135.md` §14）· `Marble官网`（概念图形式源头，1,590 skills / 3,221 links）· `candobear-学科图谱` 与 `candobear-智慧星球`（`docs/概念图视图-形态说明.md` §5「形式参考 candobear infra」的**原图**，3,598 主题 / 4,593 依赖） |
| `dbs-learning-beta` skill（处理没有标准答案的课题） | `~/.agents/skills/dbs-learning-beta/`（**在项目外**） | 验证等级 3；`evals/` 下有快照、样本与逐候选结果 |
| AB 测试（beta 判定层 × 135 通路） | `scripts/ab-learning-beta-test.mjs`、`evidence/ab-learning-beta-raw.json` | 预注册写在脚本头；3 问题 × 2 组，真实 LLM |
| 学习记录存储与所有权（16 产品调研） | `research/学习记录-存储与所有权-16产品调研-20260912.md` | **59 条**来源（`[XXn]` 标记去重实测，此前写 47 为过期数）；未核实清单 16 项 |
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
| **交给 Codex 的重构交接件** ★ | `docs/交接-Codex重构版-知所栖135.md` | **09-12 建，给「重构」用**（不是给继续加功能用）。只读这一份就能动手：代码真实形状（四个产物/三条构建链/两个 HTML 零共享代码/概念池解析重复 8 遍/LLM 样板重复 10 遍）· **重构要解决的 8 个问题（逐条带文件行号）** · 死件清单（`mcp.html` 263KB 零引用等）· 硬边界 · 改完必须跑过的 6 个验收 + 5 条铁律 · D1–D6 决策状态 · 已核实/未核实 · **7 条未决事项** · 建议的重构顺序（前两步零行为变更）。**注：`交接-Codex执行版` 写于 09-12 07:3x，代码部分已被第二轮覆盖，勿再当代码依据** |
| 交给 Codex 执行的交接件（**代码部分已过期**）（要做什么 / 边界 / 验收 / 任务清单 / **方法与参考来源总表** / **APP 视图规格** / **三条线合流**） | `docs/交接-Codex执行版-知所栖135.md` | 09-12 建并当日补章；**只承载任务，不承载事实**，事实冲突仍回 agent 版。含：决策状态快照 D1–D6、执行清单 E1–E11、目标形态与打包选型、**§11 方法总表**、**§12 参考来源总表**（GitHub/官方标准/学习科学文献，已核实与未核实分栏）、**§13 部署候选评估**、**§14 APP 视图规格（Linear 式，含「待判断 266」队列）**、**§15 概念框架与推进计划**、**§16 三条线合流（知乎 API × dbs-standard-answer × dbs-learning-beta）** |
| 可演示主产物 | `prototype/知所栖-135-基础框架.html` | v3.1，双击可开；61/61 自动验证通过；费曼验收层已加「限速器」。09-12 07:43 由 Codex 修过模式状态与费曼兜底（提交 `8360359`） |
| **壳：图 + 框架 + agent 三合一**（左栏 ＋ 底栏 `import`/`insert`/`Agent`） | `prototype/知所栖-壳.html` | **09-12 建；08:2x 加策展层，23:5x 加内参层；09-13 概念源整个换成「概念地图 v2」**（**856 点 / 491 依赖 / 21 条线**，旧 194 池见 `build-shell.mjs --legacy`）。左栏六格：`知识体系` · **`策展`** · **`内参`** · **`待你看一眼`** · `我在学` · `对话`。外壳 **09-12 09:4x 重做成 Linear 式三栏**（导航 224 / 列表 302 / 主区 / 详情 412 停靠让位）；横轴**默认按「要你怎么处理它」四列**，可切按主题（21 个领域）或按来源（Notion / Context / Harness / 跨源）。**「内参」一栏**：列表＝当期文章（主题 + ★），主区 `#reader` 是阅读页（三级笔记 / 概念网络 / 费曼 ×3 / 阅读原文四个分页签），数据由 `scripts/build-neican.mjs` 生成。概念面板加「深看」折叠块：掌握证据 / 验收问句 / 学习时机常显，费曼与原文 context 过验后才给。`Agent` 卡片改为**读 `.agents/skills/<name>/SKILL.md` 原文**当 system prompt（不是摘要）。源：`scripts/shell.template.html` ＋ `scripts/build-shell.mjs`。**必须经服务打开**：`node scripts/serve-135.mjs` → `http://127.0.0.1:5180/知所栖-壳.html`。验收 `scripts/shot-shell.mjs`、`scripts/test-daobi.mjs`；截图 `prototype/预览/` 下 `4–9-壳-*`（旧）·`10–18-壳-*`（策展层）·`21–24-倒逼-*`·`25–27-分类-*`·`28–31-Linear三栏-*`·`32-桌面版`·`33–38-内参-*` |
| **新手走查结论**（真实浏览器全流程、2 个 P0 演示风险、6 条卡点） | `docs/新手走查-135原型-260912.md` | 09-12；截图在 `output/playwright/`；**路演前先读，P0 都是改 `prototype/` 前需授权的项** |
| **每一轮做了什么、验过没有**（09-12 六层重做 → 09-12 内参一栏 → 09-13 概念地图 v2 + 审核 + AI 过滤 + 上线）**的总入口** | `docs/工作日志-知所栖135.md` | **先读这里再读下面**。每轮记起因（所有者原话）、做了什么、落点文件、**没做什么**、验收脚本总表、未决事项、技术债、铁律。各层细节：策展 `docs/策展层-194点10条线-20260912.md` · 倒逼 `docs/倒逼层-概念图不是摆设-20260912.md` · 分类 `docs/分类层-要你怎么处理它-20260912.md` · 外壳 `docs/外壳-Linear三栏-20260912.md` · 桌面 `docs/桌面版-为什么要有它-20260912.md` · 三层 skill 调用 `docs/怎么调用DBS-skill-三层路径.md` |
| **远程协作与接口机制**（时差怎么补 · 谁交给谁 · 卡住找谁 · 演示怎么走） | `docs/协作机制-远程时差版-知所栖135.md`（四条铁规 · 冻结线 · 班次交接件 5 行 · PR 规则 · 兜底人）· **`docs/接口机制-麦肯锡式-知所栖135.md`**（六个咨询业方法 → 本项目动作 · **12 条边 RACI** · 交接单/异步站会/事前验尸三个模板）· `docs/前端契约-知所栖135.md`（7 接口 · 3 数据源 · 5 屏 · 三个硬要求 · tokens）· `docs/演示脚本骨架-知所栖135.md`（30 秒开场 · 五幕 · 风险对答）· `docs/JTBD-填空版-知所栖135.md`（**6 个空待主负责人填**） | 09-13 建（**此四份此前都不在本导航里**）。**问「谁交给谁、几点前、卡住找谁」先读麦肯锡式那份**；问「字段名是什么」读契约（唯一冻结面：加可、改不可）；问「没有前后端经验怎么办」也从麦肯锡式那份起。**唯一硬缺口：mock 假数据（`evidence/mock/`）未产出**，死线今晚 24:00 |
| **公网 Demo（赛制必交件）** ✅ | **<https://hou-152.github.io/>**（裸域名，自动跳 135）→ <https://hou-152.github.io/zhisuoqi-135/>；**离线单文件** <https://github.com/hou-152/zhisuoqi-135/raw/main/index.html>（双击就开，不联网） | **09-13 换成「概念地图 v2」版本（856 概念 / 491 依赖 / 21 条线）并已线上核验**（页面内 stats ＋ 对线上地址跑 `check-public.mjs` 全过）。09-12 上线，单文件零依赖零服务端。构建 `scripts/build-public.mjs`（源 `prototype/知所栖-壳.html`）→ `deploy/zhisuoqi-135/`；验收 `scripts/check-public.mjs`（**必须假域名 + `--host-resolver-rules`**，用 127.0.0.1 会走服务端分支）。对话三条路：本地服务端 → 访客自带 key（只进他自己 localStorage）→ 录制回放（**明说不是本次回答**，`scripts/record-replays.mjs`）。**备用通道仍 404**：`deploy/zhisuoqi/dist/135.html` 已放好，要 Codex push 才有 `zhisuoqi.sibohou792.chatgpt.site/135.html`。根站仓库 `deploy/root-site/` 只为堵裸域名 404。**国内可达性**：阿里/DNSPod/360 三大国内 DNS 均返回真 IP（185.199.108-111.153，未被污染），但**无法从墙内直连验证 TCP** |
| **桌面版（Electron）：能写真文件的那一版** | `docs/桌面版-为什么要有它-20260912.md`；代码 `app/`；构建 `scripts/build-app.mjs`；验收 `scripts/test-app.mjs` | 09-12 建。网页版做不到的两件事：学习记录落 `~/Documents/知所栖-135/学习记录.json`（不是 localStorage）+ skill 产物落 `产物/<课题>.md`（**`dbs-learning-beta` 的 SKILL.md 写死的那条路径第一次被兑现**）。打包 macOS arm64 306MB 解包 / 122MB zip，**未签名未公证**。**不内置 key**（`/api/health` 回 `llm:false` 是对的），构建时自检扫 `.private/` 类文件，命中即失败 |
| **本地服务（唯一一份）+ 全部验收脚本** | 服务本体 `scripts/serve-lib.mjs`（**命令行壳与桌面版 import 同一份**）→ 壳 `scripts/serve-135.mjs`（5180）· `app/main.js`（随机端口）。验收：`scripts/verify-135.mjs`（61 项）· `test-daobi.mjs`（24）· `check-public.mjs`（17）· `shot-shell.mjs`（截图+越界断言）· `test-app.mjs`（12，桌面版）· `ab-feynman-test.mjs`（AB）。**概念地图 v2 管线**：`cm-fetch-notion.mjs` · `cm-extract.mjs` · `cm-merge.mjs` · `cm-enrich.mjs` · `cm-edges.mjs` · `cm-build-map.mjs` · `cm-build-wiki.mjs` · `cm-wire.mjs` · `cm-validate.mjs`。构建/生成：`build-shell.mjs` · `build-public.mjs` · `build-app.mjs` · `build-neican.mjs` · `record-replays.mjs`；（旧 194 池管线 `curate-concepts.mjs` · `curate-edges.mjs` · `classify-concepts.mjs` 保留但已不在主链上）。接口：`/api/health` `/api/skills` `/api/search` `/api/llm` `/api/save` `/api/data` | 见工作日志「验收脚本总表」。**09-12 修三处**：① `decodeURIComponent(url.pathname)`——此前百分号编码不解码，**所有中文文件名的页面除 `/` 外全 404**；② `/api/llm` 加 `json:false` 开关——此前写死 `response_format: json_object`，对话类请求会被 DeepSeek 拒（400）；③ 新增 `GET /api/skills` 与 `POST /api/llm` 的 `skill` 字段——服务端读 `.agents/skills/<name>/SKILL.md` 原文当 system prompt（带 `^[a-z0-9-]+$` 目录穿越防护）。改完回归 **61/61 通过**。**09-13 换概念源后**：上面五套验收全部重跑通过 |
| LLM 接入配置（勿入库、勿展示） | `.private/llm.env` | 600，gitignored，DeepSeek；serve 自动加载；`/api/health` 看 `llm:true` |
| AB 冒烟测试证据（**不是**实验结果） | `evidence/ab-feynman-smoke-test.json` | 09-12；只证三组跑通，样本太少无法区分 |
| **代码仓库** | **私有源仓库 <https://github.com/hou-152/zhisuoqi-135-src>**（09-12 推，19 个提交）；公网产物仓库 <https://github.com/hou-152/zhisuoqi-135>（只放构建产物） | **不写死提交数**（此前写「4 个」→ 实测 8 → 再实测 17，连续两次过期；要数字自己跑 `git rev-list --count HEAD`）。**推之前扫过：329 个跟踪文件里 0 处真 key**，远端 388 个文件无 `.private/` / `llm.env` / `access-secret` / `app/assets/` / `node_modules/`。**公开推送未做** —— 原先卡在「15 个 dbs skill 原文的再分发范围」，**该未决事项已于 2026-09-13 由所有者当场撤销**（原话：「DBS 的 Skill 本来就是公开的」；上游 dbskill 公开分发）。所以公开不再有内容障碍，只剩动作本身需要一句授权；`.private/` `.local/` `.mimosa/` `.DS_Store` `deploy/zhisuoqi/` `.trash/` `.playwright-cli/` 均已 gitignore；**未推 GitHub** |
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
| `knowledge/概念地图-260913/` | **当前概念唯一真源**：os-taxonomy 形态的 topics / dependencies / relations / clusters / manifest / schema | 手改（改内容要改生成脚本再重跑） |
| `knowledge/概念wiki-260913/` | llm_wiki 形态的维基层：一概念一页 ＋ `[[双链]]` ＋ index / log / README（模式层） | 手改（由 `cm-build-wiki.mjs` 重建） |
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
