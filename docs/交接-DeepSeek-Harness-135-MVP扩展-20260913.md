# DeepSeek Harness 执行件：知所栖 135 MVP → 学习路线

你接到的是一个已经跑通的单章 MVP。你的任务是沿用它的材料配对和状态门，逐步扩展 Agent Loop 六章；不要先批量生成 21 条路线。

## 0. 当前基线（先复现）

工作目录：`/Users/housibo/Documents/知乎黑客松`

先运行：

```sh
node scripts/test-mvp-learning.mjs
```

通过条件：输出 `✅ MVP 黑盒验收全过` 和 `✅ 0 条 JS 报错`。页面入口：

```text
http://127.0.0.1:5180/mvp-decision-context-rot.html
```

如果服务未运行，先在另一个终端执行 `node scripts/serve-135.mjs`。本地 MVP 只用当前概念材料和 `/api/llm` 的费曼判定，不调用知乎。

## 1. 必读文件

```text
AGENTS.md
SOURCE_OF_TRUTH.md
docs/五类语义单元-给队友-20260913.md
docs/五维拆解-给队友-20260913.md
docs/语义单元到135-MVP-傻瓜教程-20260913.md
docs/方法论-01案例决策场-MVP-20260913.md
docs/企划书-135-MVP到DeepSeek执行-20260913.md
evidence/paths-260913/routes.json
scripts/shell.template.html
prototype/mvp-decision-context-rot.html
内容结构化系统/模块/ai-concept-base/data/units.json
```

不要把外部网页、聊天记录或模型自报结果当成项目真源。`units.json` 中的 `source_documents`、`relationships` 和状态必须保留。

## 2. 材料装配规则

每个章节只有一个核心概念，但材料可以一对多：

```json
{
  "conceptId": "CON-...",
  "caseIds": ["CAS-...", "CAS-..."],
  "primaryCaseId": "CAS-...",
  "opinionIds": ["OPI-..."],
  "solutionIds": ["SOL-..."],
  "status": "ready"
}
```

按 `relationships.target` 找候选 CAS，不按标题猜。人工指定 `primaryCaseId`；它必须属于 `caseIds`。每张决策卡只挂一个 `primaryCaseId`。CAS 的 `case_type` 是“假设场景”时，页面必须显示“假设场景”。没有可靠候选就写 `status: 待装配`，停止生成该章题目。

五类单元的职责固定：QST 定义章节问题，CON 定义和边界，OPI 提供判断依据，CAS 提供场景，SOL 提供选对后的动作说明。不要把五类硬排成五步，也不要把多个原始单元压成一个没有来源的新事实。

## 3. 章节页面契约

每章装配成：

```text
一个核心概念
→ 一段当前概念 context（原文 context → 直觉 → 机制 → 边界）
→ 3 道决策题（每题 3 个选项，恰好 1 个正确）
→ 费曼复述
```

交互必须是一题一判：

- 选错后留在当前题，显示错误原因，可重选；
- 选对后才允许下一题；
- 三题全对才出现费曼；
- 费曼结果只允许 `通过`、`未通过`、`待人工复核`；请求失败、格式不对、来源缺失都不能变成通过；
- 当前 MVP 暂不解锁下一章，扩展六章时再把“通过”绑定到下一章解锁；
- 公网静态版不调用模型，使用预先生成的判定要点或机械兜底，并显示判定等级。

费曼请求只能把当前章节的定义、context、OPI 和用户复述传给本地 `/api/llm`。要求 JSON：

```json
{"covered":["变量","证据","边界"],"missing":[],"next":"一句下一步"}
```

不要让模型检索知乎，不要让模型重排路线，不要把自然语言长回答直接当通过。

## 4. Agent Loop 六章的目标数据

顺序来自 `evidence/paths-260913/routes.json` 的人工策展：

```text
Agent
→ 工具
→ Agent loop
→ 状态子系统与进度持久化
→ Harness
→ 验证闭环
```

对应 `conceptId`：

```text
cm_0608c405
cm_a72ef18d
cm_1973b1d3
cm_be951649
cm_0a4ca4ce
cm_7cd7335d
```

先为每章输出候选 `CAS`、人工指定 `primaryCaseId`、`OPI` 和 `SOL`，再生成题目。路线配置独立于概念图谱；不要修改 `knowledge/概念地图-260913/topics.json` 或 `dependencies.json`。这六步没有可声称的 hard 前置时，写 `curator: human`，不要把人工顺序说成图谱推导。

## 5. 允许修改和禁止修改

允许：

- `prototype/` 中的 MVP 页面或新的章节数据页面；
- `scripts/` 中与材料校验、黑盒验收直接有关的脚本；
- `docs/` 中的装配记录、状态和交付回执；
- 独立路线配置和材料索引（不回写概念地图源数据）。

禁止：

- `知乎 CLI auth set`、`auth logout`、`init`；
- 新增知乎 API 依赖；
- 读取、打印或提交 `.private/` 中的凭证；
- 未经材料依据生成真实复盘、统计结果或公网学习内容；
- 让 LLM 在运行时自由规划整条路线；
- 用删除断言或改测试期望制造通过；
- `git push`、公网发布或覆盖用户现有并行改动。

## 6. 执行顺序

1. 复现 MVP 黑盒验收并检查页面截图；
2. 建立 `CON → 候选 CAS → primary CAS → OPI → SOL` 配对索引；
3. 对每个 Agent Loop 章节做数据体检：ID 存在、类型正确、主案例属于候选、题目恰好 3 个选项且恰好 1 个正确、正确答案有 OPI 或 SOL；
4. 只对状态 `ready` 的章节生成页面材料；`待装配` 只显示缺口；
5. 用黑盒浏览器逐题验收，再接入独立学习空间；学习空间隐藏全图和主题列表，保留返回知识体系入口；
6. 回归现有路径、知识体系和公网检查；区分产品缺陷、测试环境问题和并行改动；
7. 最后才提交一份交付回执。

## 7. 命令验收

按实际改动运行，不得删断言：

```sh
node scripts/test-mvp-learning.mjs
node scripts/test-path.mjs
node scripts/test-case-mvp.mjs
node scripts/test-daobi.mjs
node scripts/shot-shell.mjs
node scripts/check-public.mjs
```

若修改桌面版，再运行：

```sh
node scripts/test-app.mjs
```

截图或页面状态要能从入口复现。`/api/health` 的 `llm:true` 只说明本机接口已配置，不代表用户学习已经通过。

## 8. 最终只回这份回执

```text
修改文件：
新增／更新的章节、材料索引和候选配对数量：
Agent Loop 六章逐章状态（ready / scaffold / blocked / 待装配）：
可复现入口和截图路径：
验收命令及逐条结果：
待装配章节及缺口：
未执行事项：
需要产品负责人裁决的事项：
```

没有可靠案例、来源范围不足或题目不能给出唯一正确答案时，停在“待装配”，把缺口交回负责人裁决。
