# 怎么调用 DBS Skill —— 三层调用路径（实测）

写这份是因为所有者 2026-09-12 08:0x 问了一句「怎么样去调用 DBS 的 skill 啊？」

答案不是一句话，因为项目里**同时存在三层**，每层调用方式不同，混起来就会以为「装了但没接上」。

---

## 一句话结论

| 你在哪 | 怎么调 | 实际发生了什么 |
|---|---|---|
| **① 在 Agent 会话里**（Codex / Claude Code / DSH） | 输入 `/dbs-learning-beta`，或直接说要干的事 | Agent 读 `.agents/skills/dbs-learning-beta/SKILL.md` 全文，**按里面写的流程走**。这是「真调用」。 |
| **② 在壳里**（`prototype/知所栖-壳.html`） | 底栏 `Agent` → 点一张卡 → 输入框回车 | 前端把 **SKILL.md 原文**当 `system` 发给 `/api/llm`，服务端读文件。已实测通。 |
| **③ 双击壳文件（`file://`）** | 同上，但**连不上** | 没有 `/api`，会显示「（离线）没连上本地服务」，**不会**假装回答。 |

---

## ① Agent 会话里

项目已经装了 15 个 skill 在 `.agents/skills/`：

```
dbs              dbs-chatroom      dbs-decision     dbs-deconstruct
dbs-diagnosis    dbs-good-question dbs-jtbd         dbs-knowledge
dbs-learning     dbs-learning-beta dbs-report       dbs-save
dbs-standard-answer  dbs-theory-grounding           zhihu
```

调用就是**说出 skill 名或触发语**。DBS skill 的 frontmatter 里写死了触发条件，例如：

| Skill | 什么时候会被触发 |
|---|---|
| `dbs-learning-beta` | 你问一个**第一人称、没有标准答案**的课题：「我要不要辞职去做独立开发」「潮汕牛肉怎么判断老没老」 |
| `dbs-standard-answer` | 你要**带条件的答案** + 历史同构（成功 / 失败 / 反例） |
| `dbs-learning` | 有可检验答案的知识型课题：「带我学奥派经济学」 |
| `dbs-knowledge` | 要搭 / 查 / 整理知识库 |
| `dbs-decision` | 要建长期跟踪的决策档案 |

**判据在 skill 自己手里**：`dbs-learning-beta` 的 SKILL.md 第一节就写「本 Skill 在产出之前先做一件事——判定课题属于哪一类」，判成知识型课题它会**主动交回** `dbs-learning`，不会硬答。

## ② 壳里（真接上了）

壳的左栏 → `对话` → 底栏 `Agent`。会看到：

- **三张固定卡**：`135 学习闭环`（本项目自有的，不是 dbs）· `dbs-learning-beta` · `dbs-standard-answer`
- **其余 12 个已装 skill**：从 `/api/skills` 实时读出来的，点一下直接用

点一张卡以后，输入框提示变成 `dbs-learning-beta · 我想学 ____（回车发送）`，回车走 `/api/llm`。

链路是：

```
壳前端  --POST {json:false, skill:'dbs-learning-beta', messages:[...]}-->  serve-135.mjs
                                                                              |
                                       读 .agents/skills/<skill>/SKILL.md   <--+
                                       当 system prompt 发给 DeepSeek
```

**为什么要在服务端读文件、而不是前端抄一份？** 因为抄一份就会漂移——`shell.template.html` 里原来那三行 `sys` 就是我手抄的摘要，SKILL.md 一改它就不对了。现在前端只传 skill 名，原文由服务端读。

实测回执（2026-09-12 08:2x，1440×900 无头 Chrome，截图 `prototype/预览/17-壳-真skill对话.png`）：

> 问：「我要不要辞掉现在的工作去做独立开发？」
> 答开头：`课题类型判定 / 类型：个人决策 / 交付物：判据 + 代价对照 + 裁决点`
> 答结尾：「没有替你决定辞或不辞；没有判断独立开发适不适合你……辞职与否的裁决权在你手上，本文只提供可对照的量。」

——这就是 `dbs-learning-beta` 的合同，一字不差地被执行了。

## ③ 相关代码位置

| 位置 | 作用 |
|---|---|
| `.agents/skills/<name>/SKILL.md` | skill 原文。**唯一真源** |
| `scripts/serve-135.mjs` → `GET /api/skills` | 列出已装 skill（name / description / bytes） |
| `scripts/serve-135.mjs` → `readSkill(name)` | 读 SKILL.md，带 `^[a-z0-9-]+$` 目录穿越防护 |
| `scripts/serve-135.mjs` → `POST /api/llm` 的 `skill` 字段 | 用 SKILL.md 覆盖 system prompt |
| `scripts/shell.template.html` → `pickAgent(label, file)` | `file` 非空 → 走真 SKILL.md；为空 → 用内置的 `135 学习闭环` |

## ④ 验证命令

```sh
curl -s localhost:5180/api/skills | head -c 300        # 应列出 15 个
curl -s -X POST localhost:5180/api/llm -H 'Content-Type: application/json' \
  -d '{"json":false,"skill":"dbs-learning-beta","messages":[{"role":"user","content":"我要不要辞职？"}]}' \
  | node -e "let d='';process.stdin.on('data',c=>d+=c).on('end',()=>{const j=JSON.parse(d);console.log(j.skill,j.tokens);console.log(j.content.slice(0,300))})"
```

## ⑤ 这一层**没做**的事（照实写）

- 壳里没有**多轮 skill 编排**——一次会话就一个 skill，不能中途换。
- 壳里**没有工具调用**：`dbs-standard-answer` 要求「核实来源」，但壳里没有联网检索这一步，只有 `/api/search`（知乎检索）没接进去。所以壳里跑 `dbs-standard-answer` 时，它会说「我无法核实」，这是**能力边界**不是 bug。
- `dbs-learning-beta` 的 SKILL.md 里写了产物应存到 `~/Documents/dbskill-open-learning/<课题>/01.md`，但壳里**没有写文件权限**，所以它会先说一句「当前会话没有文件写入能力，先直接贴出」。这也是照实说的，不是失败。
