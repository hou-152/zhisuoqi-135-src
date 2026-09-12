# ai-concept-base · 模块说明（给人看）

一个**自带数据的 skill 模块**：拿走整个目录就能用，不依赖任何外部路径、不联网、不调用模型。

## 里面是什么

| 文件 | 内容 |
|---|---|
| `SKILL.md` | 给 agent 的用法（安装到 Agent 后，它按这份文件工作） |
| `data/index.json` | 538 条索引（id / 类型 / 标题 / 主题 / 关键词 / 摘要） |
| `data/units.json` | 538 个单元全文 |
| `data/lines.json` | 两条策展线：Context Engineering 34 概念 · Harness Engineering 42 概念 |
| `data/manifest.json` | 规模与三个来源 |
| `scripts/query.mjs` | 检索（按关键词 / 类型 / 主题，或看某条全文） |
| `scripts/assemble.mjs` | 把一个课题装配成「问题→概念→观点→案例→方案」草稿 |

五类单元：问题 141 · 概念 76 · 观点 169 · 案例 76 · 方案 76。

## 装到自己的 Agent 上

```sh
# 方式一：用 dbs-install-skill（一条命令装到本机所有已存在的 Agent）
bash ~/.agents/skills/dbs-install-skill/scripts/install-skill.sh link <这个目录的绝对路径>
bash ~/.agents/skills/dbs-install-skill/scripts/install-skill.sh status ai-concept-base

# 方式二：手动放到公共入口（Codex / Gemini CLI / Cursor 等读这个目录）
ln -s <这个目录的绝对路径> ~/.agents/skills/ai-concept-base
```

装完在任意 Agent 里说「用 ai-concept-base 查一下上下文腐烂」即可。

## 直接用（不装也能用）

```sh
node scripts/query.mjs --q "上下文腐烂"
node scripts/query.mjs --type 方案单元 --theme "AI 如何持续行动" --limit 10
node scripts/query.mjs --id CON-agent-harness
node scripts/assemble.mjs --qst QST-HAR-03 --out /tmp/draft.md
```

## 三个必须知道的边界

1. **不是原始来源。** 对外引用请回到 `source_documents`（飞书两份主题精选 / 图鉴站概念卡），不要引本库当一手证据。
2. **案例 76 条全是假设场景**（`case_type: 假设场景`），不是真实复盘。
3. **`status` 只到「待核对」**：没有人工逐条核对过，引用前抽查。

## 数据是怎么来的（可复现）

```
飞书《Context Engineering 26+2》28 篇 ┐
飞书《Harness Engineering 28+2》30 篇 ┤─ 确定性解析「导读」「核心观点」→ 问题 58 / 观点 169
「Context × Harness 图鉴」76 张概念卡 ┘─ 复用 remember/how_to/scenario/transfer_question
                                        → 概念 76 / 方案 76 / 案例 76 / 检验问题 76
分类轴 7 个 question ────────────────────→ 分类问题 7
```

**0 次 LLM 调用**。导出脚本：`../07-脚本与工具/export-module.py`（在 `内容结构化系统/` 里）。
上游更新后重跑导出即可刷新本模块，脚本不会增量合并，是整目录重写。
