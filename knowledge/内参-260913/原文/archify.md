# Archify

- 标题：Archify
- 来源：GitHub
- 原文：https://github.com/tt-a1i/archify
- 作者：https://github.com/tt-a1i/
- 类型：开源项目
- 摘要：Archify creates clear, validated architecture diagrams from source code and runtime data. It offers detailed views of components, paths, and dependencies with export and preview features. The tool ensures accuracy with schema checks and provides a portable, single-file output for sharing.
- 收藏于：2026/9/13 22:23:11
- 抓取：Reader 快照（2026/9/14）
- 字数：19616

---
**英文**·[简体中文](https://github.com/tt-a1i/archify/blob/main/README_ZH.md)


[![Archify on Trendshift](https://camo.githubusercontent.com/076a7614301992af3179632bf17cebe52312ee7150e86a876046a9136dcc6b75/68747470733a2f2f7472656e6473686966742e696f2f6170692f62616467652f7265706f7369746f726965732f3331333532)](https://trendshift.io/repositories/31352?utm_source=repository-badge&utm_medium=badge&utm_campaign=badge-repository-31352)
[![Archify 产品预览](https://github.com/tt-a1i/archify/raw/main/docs/assets/archify-readme-hero.png)](https://github.com/tt-a1i/archify/blob/main/docs/assets/archify-readme-hero.png)
Archify
=======


**直接在聊天中，将代码库或系统描述转换为精美、交互式的系统图。**


Archify 是一个适用于 Cursor、Claude Code、Codex CLI 和 OpenCode 的 Node.js 渲染和验证系统。代理生成类型化的 JSON IR；Archify 确定性地将其编译为 HTML/SVG。


* **打开即可演示**——五种图表类型、四种预设、深色/浅色主题、内置品牌标识和有限动态效果
* **合并前审查架构变更**——将两个已验证的快照（合并前/变更前/合并后）进行比较，并记录新增、删除、更改、移动和重新路由的确切信息。
* **每一次交互都基于现实**——搜索节点，可选择打开经过版本验证的源代码，追踪上游/下游作者的路径和确切的路由，比较角色，以及在不创建拓扑结构的情况下体验引导式故事。
* **一个文件，即可信任并共享**——类型化的 JSON IR 和确定性检查生成独立的 HTML 以及 PNG、SVG、WebM 和 1200×630 共享卡片。


[![执照](https://camo.githubusercontent.com/a0f40b25b57c232bb2c7d20d4cf621e44e70ede534e3d87a2c906ea06dc0546f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d3232633535653f7374796c653d666c61742d737175617265)](https://camo.githubusercontent.com/a0f40b25b57c232bb2c7d20d4cf621e44e70ede534e3d87a2c906ea06dc0546f/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f6c6963656e73652d4d49542d3232633535653f7374796c653d666c61742d737175617265)
[![特工技能](https://camo.githubusercontent.com/f4cc03d2a98c32b44a92868de3cff781ba16ec305a10b0888b6657b2246d4014/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4167656e742d536b696c6c2d3743334145443f7374796c653d666c61742d737175617265)](https://camo.githubusercontent.com/f4cc03d2a98c32b44a92868de3cff781ba16ec305a10b0888b6657b2246d4014/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f4167656e742d536b696c6c2d3743334145443f7374796c653d666c61742d737175617265)
[![开发版本](https://camo.githubusercontent.com/d8f5346440d94d8a8fdffb2b37aa5604559cf644c663790869f9a52d79ae0f04/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f76657273696f6e2d322e31372e302d2d6465762e312d3038393162323f7374796c653d666c61742d737175617265)](https://camo.githubusercontent.com/d8f5346440d94d8a8fdffb2b37aa5604559cf644c663790869f9a52d79ae0f04/68747470733a2f2f696d672e736869656c64732e696f2f62616467652f76657273696f6e2d322e31372e302d2d6465762e312d3038393162323f7374796c653d666c61742d737175617265)
**当前开发版本：** `v2.17.0-dev.1`。请参阅[更新日志](https://github.com/tt-a1i/archify/blob/main/CHANGELOG.md#unreleased)。


**[项目页面](https://tt-a1i.github.io/archify/)**·**[场景指南](https://tt-a1i.github.io/archify/guide.html)**·**[验证实验室](https://tt-a1i.github.io/archify/gallery.html)**



```
npx skills add tt-a1i/archify -g
```

使用 Cursor？打开[代理感知快速入门指南](https://tt-a1i.github.io/archify/start.html?agent=cursor&type=architecture)，了解精确的全局和项目命令。


**无需存储库：**在任何客服聊天中描述系统。


❤️赞助商
-----




|  |  |
| --- | --- |
| [超级代码](https://supercode.sh/?utm_source=archify)**[supercode.sh](https://supercode.sh/?utm_source=archify)** | [Supercode](https://supercode.sh/?utm_source=archify)赞助Archify，并通过令牌优化、精选技能和规范驱动开发增强Codex和Cursor的功能。Archify被[Supercode评为编辑精选](https://supercode.sh/en/skills/tt-a1i/archify/archify)技能。[Supercode 编辑之选 — Archify](https://supercode.sh/en/skills/tt-a1i/archify/archify) |



>  想赞助 Archify？[请通过电子邮件联系我们。](mailto:2801884530@qq.com)
> 
>  


观看 Archify 的实际应用
----------------


这些是 Archify 生成的工件，并非产品模型。点击框架即可打开其实时、可共享的状态。


[![Three verified Archify artifacts moving through Signal Flow, Blueprint, and Classic presets](https://github.com/tt-a1i/archify/raw/main/docs/assets/archify-live-proof.gif)](https://tt-a1i.github.io/archify/gallery.html)
  [![Three verified Archify artifacts moving through Signal Flow, Blueprint, and Classic presets](https://github.com/tt-a1i/archify/raw/main/docs/assets/archify-live-proof.gif)](https://tt-a1i.github.io/archify/gallery.html)    

**三个真实生成的工件。**信号流 · 蓝图 · 经典 ·[打开交互式验证实验室 ↗](https://tt-a1i.github.io/archify/gallery.html)




| 引导式故事 | 路径探测 | 语义透镜 |
| --- | --- | --- |
| [代理工作流程播放一个作者章节](https://tt-a1i.github.io/archify/gallery/artifacts/agent-tool-call.workflow.html?theme=dark&present=1&play=1#view=happy-path) | [缓存未命中序列显示了 Web 应用程序到 Postgres 的路由](https://tt-a1i.github.io/archify/gallery/artifacts/cache-miss.sequence.html?theme=dark&present=1#route=web~db) | [生产架构比较后端和数据库角色](https://tt-a1i.github.io/archify/gallery/artifacts/production-deployment.architecture.html?theme=dark&present=1#lens=backend~database) |
| Play one finite named chapter. | Inspect the shortest authored directed path. | Compare real traffic between semantic roles. |


The [Proof Lab](https://tt-a1i.github.io/archify/gallery.html) contains all 11 checked-in scenarios, their JSON sources, named views, and validation receipts.


### A real repository, mapped from source


[![MCO运行时架构由公共mco-org/mco存储库生成](https://github.com/tt-a1i/archify/raw/main/docs/assets/mco-runtime-share-card.png)](https://tt-a1i.github.io/archify/cases/mco-runtime.architecture.html?theme=dark&present=1#view=dispatch-path)
Archify traced [`mco-org/mco`](https://github.com/mco-org/mco) at `9f1a1cf` and produced this checked map. **[Open it ↗](https://tt-a1i.github.io/archify/cases/mco-runtime.architecture.html?theme=dark&present=1#view=dispatch-path)** · [trace reach ↗](https://tt-a1i.github.io/archify/cases/mco-runtime.architecture.html?theme=dark#focus=router&reach=downstream) · [typed source](https://github.com/tt-a1i/archify/blob/main/docs/cases/mco-runtime.architecture.json)


Preview
-------


Same diagram, two themes, one click to switch:




| Dark | Light |
| --- | --- |
| [深色主题](https://github.com/tt-a1i/archify/blob/main/docs/assets/archify-dark.png) | [浅色主题](https://github.com/tt-a1i/archify/blob/main/docs/assets/archify-light.png) |


The Export menu copies PNG to the clipboard and downloads static or motion formats:


[![导出菜单](https://github.com/tt-a1i/archify/raw/main/docs/assets/archify-menu.png)](https://github.com/tt-a1i/archify/blob/main/docs/assets/archify-menu.png)
Use **Copy Share Card** when you want a canonical 1200×630 image for a README, release, or social post.


After tracing a route, **Export → Route Share Card** downloads that authored path as a 1200×630 PNG with the full diagram retained for context.


[![路由共享卡显示了用户到 API 服务器的确切路径，并保留了完整的架构作为上下文信息。](https://github.com/tt-a1i/archify/raw/main/docs/assets/archify-route-share-card.png)](https://github.com/tt-a1i/archify/blob/main/docs/assets/archify-route-share-card.png)
After tracing authored `Upstream` or `Downstream` reach, **Export → Reach Share Card** captures that exact reading without claiming runtime impact.


[![MCO下游Reach共享卡显示了来自Command Router的作者关系](https://github.com/tt-a1i/archify/raw/main/docs/assets/mco-runtime-reach-share-card.png)](https://github.com/tt-a1i/archify/blob/main/docs/assets/mco-runtime-reach-share-card.png)
Open [`examples/web-app.html`](https://github.com/tt-a1i/archify/blob/main/examples/web-app.html) locally to try the complete viewer.


Quick start
-----------


### 1. Install



```
npx skills add tt-a1i/archify -g
```

For an explicit, non-interactive Cursor install:



```
npx -y skills add tt-a1i/archify --skill archify --agent cursor --global --copy --yes
```

To try without installing:



```
npx skills use tt-a1i/archify@archify --agent codex
```

[DSH community opt-in](https://github.com/tt-a1i/archify/blob/main/integrations/deepseek-harness/README.md): `dsh plugin --profile web add @tt-a1i/archify-dsh@0.1.0`


The [agent switcher](https://tt-a1i.github.io/archify/start.html?agent=cursor&type=architecture) covers `cursor`, `codex`, `claude-code`, and `opencode`. For Raven's manual ZIP install, extract [`archify.zip`](https://github.com/tt-a1i/archify/blob/main/archify.zip) into `~/.raven/workspace/skills`; it yields `~/.raven/workspace/skills/archify`. Raven is not a switcher target.


Archify may GET the fixed stable manifest solely to show an optional reminder; it never downloads or installs updates. Successful checks wait about 72 hours (±20%); active use retries failures after 6, then 24 hours. The server sees normal HTTP metadata (IP and time), but receives no version, Agent, project data, prompts, account/device ID, or ETag. You decide whether and when to update. Set `ARCHIFY_UPDATE_CHECK_DISABLED=1` to disable networking and reminder-state writes.


### 2. Start from a description — no repository required



```
Use Archify to draw: Browser -> API -> Redis cache -> PostgreSQL fallback.

```

For source evidence, open a repository and ask:



```
Analyze this repository, then use archify to create a high-level runtime architecture diagram.
Show 8–12 core components, one primary path, external dependencies, and trust boundaries.
Put supporting detail in cards instead of adding more edges.

```

### 3. Refine in chat


Continue with focused requests such as `add Redis`, `move auth to the left`, or `highlight the rollback path`. Archify keeps the typed source available for targeted iteration.


Choose the right diagram
------------------------




| Type | Best for | Include in your prompt |
| --- | --- | --- |
| **Architecture** | Components, services, storage, boundaries | Scope, core components, primary path |
| **Workflow** | CI/CD, approvals, tool calls, runbooks | Participants, order, branches, exceptions |
| **Sequence** | API calls, cache fallback, auth, async traces | Callers, callees, returns, timing |
| **Data Flow** | Pipelines, lineage, PII, consumers | Sources, transforms, stores, boundaries |
| **Lifecycle** | States, retries, waits, terminal outcomes | States, events, retry and cancellation paths |


Architecture's optional `deployment-ownership` profile fails closed when authored owners, region placement, private database scope, or named crossings are missing; it is never implicit and does not inspect live infrastructure. See the [checked deployment proof](https://tt-a1i.github.io/archify/gallery.html#proof-deployment-ownership).


For design or PR review, Architecture Delta compares validated Before / Delta / After snapshots with a machine receipt. Select an authored change or play one finite, viewer-only Review; it infers no impact, risk, or merge safety.


`node archify/bin/archify.mjs compare architecture base.json head.json architecture-delta.html --json`


[![建筑设计图表显示了新增、删除、更改和移动的作者信息](https://github.com/tt-a1i/archify/raw/main/docs/assets/architecture-delta-proof.jpg)](https://github.com/tt-a1i/archify/blob/main/examples/checkout-platform-delta.html)
Not sure which one fits? Use the [interactive scenario guide](https://tt-a1i.github.io/archify/guide.html), or ask the zero-dependency CLI:



```
node archify/bin/archify.mjs guide "Show an API request with Redis cache miss"
node archify/bin/archify.mjs guide "Map Kafka topics, consumer groups, replay, and DLQ" --json
```

Workflow keeps the happy path clear across lanes:


[![工作流程示例](https://github.com/tt-a1i/archify/raw/main/docs/assets/archify-workflow.png)](https://github.com/tt-a1i/archify/blob/main/docs/assets/archify-workflow.png)
Sequence explains one interaction over time:


[![序列示例](https://github.com/tt-a1i/archify/raw/main/docs/assets/archify-sequence.png)](https://github.com/tt-a1i/archify/blob/main/docs/assets/archify-sequence.png)
Data Flow makes movement and sensitivity boundaries explicit:


[![数据流示例](https://github.com/tt-a1i/archify/raw/main/docs/assets/archify-dataflow.png)](https://github.com/tt-a1i/archify/blob/main/docs/assets/archify-dataflow.png)
Lifecycle separates progress, waits, retries, and terminal outcomes:


[![生命周期示例](https://github.com/tt-a1i/archify/raw/main/docs/assets/archify-lifecycle.png)](https://github.com/tt-a1i/archify/blob/main/docs/assets/archify-lifecycle.png)
Architecture examples: [`web-app`](https://github.com/tt-a1i/archify/blob/main/examples/web-app.html) · [`Archify pipeline`](https://github.com/tt-a1i/archify/blob/main/examples/archify-repo.html) · [`grid placement`](https://github.com/tt-a1i/archify/blob/main/examples/archify-repo-grid.html) · [`desktop agent`](https://github.com/tt-a1i/archify/blob/main/examples/maka-architecture.html)


Why Archify
-----------


* **Layout judgment over generic auto-layout** — the agent chooses hierarchy, spacing, routes, and emphasis; shared automatic endpoints spread deterministically instead of piling arrows on one midpoint.
* **Typed JSON IR** — every renderer-backed mode has a schema and reproducible source.
* **Atomic validation before delivery** — schema, layout, HTML/SVG, route, and label-to-route clearance checks must all pass before a showcase artifact replaces the last known good output.
* **Failures come with a repair receipt** — `validate --json` and `deliver --json` return stable rule codes, the exact subject, measured evidence, and only supported repair controls instead of a Node stack or an unstructured retry guess.
* **Last-good live preview** — an optional desktop loop watches one JSON file, refreshes only after the latest candidate passes every gate, and keeps the previous verified diagram visible when a save is incomplete or invalid.
* **Truthful interaction** — focus, upstream/downstream reach, exact routes, role comparison, and stories reuse authored nodes and relationships instead of inventing topology or claiming runtime impact.
* **Source evidence, only when requested** — Evidence-backed Architecture nodes mark themselves `SRC n` and open Git-verified files and line ranges pinned to one public commit; ordinary artifacts stay source-free.
* **Portable by default** — the result is one HTML file; exports remain full-diagram and free of temporary viewer state.


Archify is not a general-purpose drawing editor or a Mermaid theme. It turns technical intent into a communication artifact.


How it works
------------




| Step | What happens |
| --- | --- |
| **Generate** | The agent creates typed JSON IR from your description. |
| **Validate** | Bundled validators and layout rules check the source; failures identify the exact local repair in machine-readable JSON. |
| **Preview (optional)** | A loopback-only desktop session watches one source and reloads only verified revisions; failures keep the last-good artifact. |
| **Deliver** | A same-directory candidate is rendered and checked; only a passing artifact atomically replaces the target, then optional `--open` launches that exact file. |
| **Iterate** | The agent updates the source while unrelated structure stays stable. |


Useful repository commands:



```
cd archify
node bin/archify.mjs doctor
node bin/archify.mjs demo /tmp/archify-demo
node bin/archify.mjs guide "Show CI/CD checks, approval, deploy, and rollback"
node bin/archify.mjs validate workflow examples/agent-tool-call.workflow.json --quality showcase --json
node bin/archify.mjs preview workflow examples/agent-tool-call.workflow.json /tmp/workflow.html --quality showcase
node bin/archify.mjs deliver workflow examples/agent-tool-call.workflow.json /tmp/workflow.html --quality showcase --open --json
```

`preview` is an explicit loopback-only desktop mode: it watches one JSON file on a random `127.0.0.1` port, keeps the last verified output through failures, stops with Ctrl-C, and adds no generated-HTML runtime. Use `--no-open` for tests or manual URL opening.


`deliver --open` is an opt-in one-shot handoff after commit. Opener failure preserves success; JSON remains on stdout and the absolute fallback path goes to stderr.


On failure, `validate --json` and `deliver --json` emit one JSON object. Apply only each `diagnostics[]` subject's `supportedFixes`, within the Skill's two correction rounds; visual review remains separate.


Settings:



```
{
  "meta": {
    "locale": "en",
    "animation": "trace",
    "visual_preset": "signal-flow"
  }
}
```

`meta.locale=en|zh-CN` localizes page title, Legend, states/errors, a11y, HTML/SVG `lang`—never authored content. Otherwise omit; preserve requested-language copy; disclose English fallback. Static omits `animation`; `classic` defaults.


Explore and share the output
----------------------------




| Action | Control |
| --- | --- |
| Open the factual Diagram Guide | ? |
| Find and focus a semantic node | / |
| Trace upstream/downstream authored reach | Focus a node → `Upstream` / `Downstream` |
| Probe a directed route and inspect its journey | R or `PATH` |
| Compare one or two semantic roles | L or `LENS` |
| Open the live overview radar | M or `MAP` |
| Play a guided story / change chapter | P / [ ] |
| Enter Presentation Stage | F |
| Choose visual style (`S` cycles) / toggle theme / open Export | S / T / E |
| Zoom or reset | + / - / 0 |


Stable links can restore `#focus=<id>`, `#focus=<id>&reach=upstream|downstream`, `#relation=<id>`, `#route=<source>~<target>`, `#lens=<kind>~<kind>`, and `#view=<view-id>`. Reader-driven motion is finite, respects `prefers-reduced-motion`, and never enters canonical exports.


The complete generation and viewer contract lives in [`archify/SKILL.md`](https://github.com/tt-a1i/archify/blob/main/archify/SKILL.md).


Installation options
--------------------




| Surface | Install location or method | Capability |
| --- | --- | --- |
| **Raven** | Manual ZIP into `~/.raven/workspace/skills` → `~/.raven/workspace/skills/archify` | Full renderer + validation workflow |
| **Claude Code** | `~/.claude/skills/` or `.claude/skills/` | Full renderer + validation workflow |
| **Codex CLI** | `~/.agents/skills/` or `.agents/skills/` | Full renderer + validation workflow |
| **opencode** | `~/.config/opencode/skills/`, `.opencode/skills/`, or `.agents/skills/` | Full renderer + validation workflow |
| **Claude.ai** | Upload `archify.zip` under Settings → Capabilities → Skills | Depends on Node.js access in the sandbox |
| **Project Knowledge** | Upload `archify.zip` to the project | Prompt-driven architecture fallback |
| **DeepSeek Harness** | Opt-in: `dsh plugin --profile web add @tt-a1i/archify-dsh@0.1.0`. Invoke: `Use the archify skill to map this repository's runtime architecture.` Remove: `dsh plugin --profile web remove @tt-a1i/archify-dsh`. | Community integration for developer-preview `@deepseek-ai/dsh@0.1.0-rc.6`; Node `^22.19.0 || >=24.0.0`; not an official DeepSeek product. No telemetry. Shell files need exact workspace paths, not Web Produced Files. [Details](https://github.com/tt-a1i/archify/blob/main/integrations/deepseek-harness/README.md). |


Reference and scope
-------------------


* [Schema reference](https://github.com/tt-a1i/archify/blob/main/archify/schemas/README.md) · [Skill](https://github.com/tt-a1i/archify/blob/main/archify/SKILL.md) · [Examples](https://github.com/tt-a1i/archify/blob/main/archify/examples) · [Agent cookbook](https://github.com/tt-a1i/archify/blob/main/docs/authoring-cookbook.md)
* [Changelog](https://github.com/tt-a1i/archify/blob/main/CHANGELOG.md)
* [Roadmap](https://github.com/tt-a1i/archify/blob/main/ROADMAP.md)
* [Generated Proof Lab](https://tt-a1i.github.io/archify/gallery.html)


自动 Mermaid 解析、通用自动布局、托管共享和 WYSIWYG 编辑功能有意不在当前范围内。


执照
--


[MIT 许可](https://github.com/tt-a1i/archify/blob/main/LICENSE)——可免费使用、修改和分发。


贡献
--


欢迎提交问题、拉取请求和实际应用图表。请先阅读[贡献指南](https://github.com/tt-a1i/archify/blob/main/CONTRIBUTING.md)，使用可复现错误报告表单提交故障，或通过[社区展示表单](https://github.com/tt-a1i/archify/issues/new?template=showcase.yml)提交已验证的图表。· [LINUX DO](https://linux.do)


星际历史
----


![星际历史](https://raw.githubusercontent.com/tt-a1i/archify/star-history/assets/star-history-light.svg)
