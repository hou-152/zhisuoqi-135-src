#!/usr/bin/env node
// 全链路 Graph 构建：真实资产 → 统一节点/边索引 → knowledge/graph-260914/
//
//   node scripts/build-graph.mjs            # 构建 graph.json + graph-report.md
//   node scripts/build-graph.mjs --quiet    # 只打印一行摘要
//
// 只读公共源数据，不写回任何 route / currentNode / passed 这类运行字段。

import fs from 'node:fs';
import path from 'node:path';
import { buildGraph, LAYERS } from './lib/graph-adapter.mjs';

const ROOT = path.resolve(import.meta.dirname, '..');
const OUT_DIR = path.join(ROOT, 'knowledge', 'graph-260914');
const QUIET = process.argv.includes('--quiet');

const g = buildGraph({ root: ROOT });

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, 'graph.json'), JSON.stringify(g, null, 1));

const pct = (n) => `${((n / g.stats.nodes) * 100).toFixed(1)}%`;
const lines = [];
lines.push('# 全链路 Graph 索引报告', '');
lines.push(`构建时间：${g.builtAt}　版本：${g.version}`, '');
lines.push('> 本文件由 `node scripts/build-graph.mjs` 生成，**不要手改**。数字口径见文末《口径》。', '');
lines.push('## 一、总量', '');
lines.push(`- 节点 **${g.stats.nodes}** · 边 **${g.stats.edges}** · 缺口条目 **${g.stats.gaps}**`);
lines.push(`- 可运行单元 **${g.stats.units}** · 判据 **${g.stats.criteria}** · 活动节点 **${g.stats.activities}** · 流程边（唯一能驱动跳转的边）**${g.stats.transitions}**`);
lines.push(`- 待装配（scaffold）**${g.stats.pendingAssembly}**（${pct(g.stats.pendingAssembly)}）· 阻塞（blocked）**${g.stats.blocked}**`, '');
lines.push('## 二、按层', '', '| 层 | 节点 | 待装配 | 阻塞 | 装什么 kind |', '|---|---|---|---|---|');
for (const l of g.layers) lines.push(`| ${l.label} \`${l.id}\` | ${l.count} | ${l.pending} | ${l.blocked} | ${l.kinds.join(' ')} |`);
lines.push('', '## 三、按 kind', '', '| kind | 数量 |', '|---|---|');
for (const [k, v] of Object.entries(g.stats.byKind).sort((a, b) => b[1] - a[1])) lines.push(`| ${k} | ${v} |`);
lines.push('', '## 四、按边类（五种边）', '', '| 边类 | 数量 | 能不能驱动跳转 |', '|---|---|---|');
const DRIVE = { transition: '**能**（唯一）', provenance: '不能', knowledge: '不能', curriculum: '不能（课程编排，不是运行时跳转）', evidence: '不能' };
for (const [k, v] of Object.entries(g.stats.byEdgeKind).sort((a, b) => b[1] - a[1])) lines.push(`| \`${k}\` | ${v} | ${DRIVE[k] || '不能'} |`);
lines.push('', '## 五、按审核状态（边的可信程度）', '', '| reviewState | 数量 |', '|---|---|');
for (const [k, v] of Object.entries(g.stats.byReviewState).sort((a, b) => b[1] - a[1])) lines.push(`| ${k} | ${v} |`);
lines.push('', '## 六、按状态（节点）', '', '| status | 数量 |', '|---|---|');
for (const [k, v] of Object.entries(g.stats.byStatus).sort((a, b) => b[1] - a[1])) lines.push(`| ${k} | ${v} |`);
lines.push('', '## 七、可运行入口', '', '| 入口 | 单元 | 状态 | 地址 |', '|---|---|---|---|');
for (const e of g.entries) lines.push(`| ${e.label} | \`${e.id}\` | ${e.status} | \`${e.entry || '(无)'}\` |`);
lines.push('', '## 八、适配器读到的真实数字', '', '```json', JSON.stringify(g.adapters, null, 1), '```');
lines.push('', '## 九、缺口清单（保留节点并写清原因，不把它变成 ready）', '');
const byGapKind = {};
for (const gp of g.gaps) (byGapKind[gp.kind] ||= []).push(gp);
for (const [k, list] of Object.entries(byGapKind)) {
  lines.push(`### ${k}（${list.length}）`, '');
  for (const gp of list.slice(0, 60)) lines.push(`- **${gp.label}** — ${gp.why}${gp.where ? `　\`${gp.where}\`` : ''}${gp.affects && gp.affects.length ? `　影响 ${gp.affects.length} 个节点` : ''}`);
  if (list.length > 60) lines.push(`- …另有 ${list.length - 60} 条同类缺口，全部在 \`graph.json#gaps\``);
  lines.push('');
}
lines.push('## 十、构建来源（可核对基线）', '', '| 文件 | sha256（前 16） | 说明 |', '|---|---|---|');
for (const s of g.sources) lines.push(`| \`${s.path}\` | \`${String(s.sha256).slice(0, 16)}\` | ${s.note || ''} |`);
if (g.warnings.length) { lines.push('', '## 十一、适配器告警', ''); for (const w of g.warnings) lines.push(`- ${w}`); }
lines.push('', '## 口径', '');
lines.push('- **全量索引完成**：' + g.coverage.fullIndex);
lines.push('- **全量课程可学**：' + g.coverage.playable);
lines.push('- `ready` 只表示**该节点所指范围内**材料齐、已审核；**不表示模型稳定、学习有效或已经上线**。');
lines.push('- 五类语义之间的关系（`relationships`）落在 `knowledge` 边：它们既不是出处、不是课程编排、也不驱动跳转。');
lines.push('- 图鉴卡与概念地图是**两套分类**（7 个 category_id vs 21 个主题），本轮不按名字猜映射，缺口已登记。');
lines.push('- 边上的 `reviewState`：`owner-confirmed` > `authored`/`curated` > `sourced` > `unreviewed`（候选，视图必须标注，且不能当先修）。');
lines.push('');

fs.writeFileSync(path.join(OUT_DIR, 'graph-report.md'), lines.join('\n'));

if (!QUIET) {
  console.log(`图已生成：${path.relative(ROOT, path.join(OUT_DIR, 'graph.json'))}`);
  console.log(`  节点 ${g.stats.nodes} · 边 ${g.stats.edges} · 缺口 ${g.stats.gaps}`);
  console.log(`  按层：` + g.layers.map((l) => `${l.label} ${l.count}`).join(' · '));
  console.log(`  按边：` + Object.entries(g.stats.byEdgeKind).map(([k, v]) => `${k} ${v}`).join(' · '));
  console.log(`  可运行单元 ${g.stats.units} · 判据 ${g.stats.criteria} · 流程边 ${g.stats.transitions} · 待装配 ${g.stats.pendingAssembly} · 阻塞 ${g.stats.blocked}`);
  if (g.warnings.length) { console.log('  ⚠ 告警：'); for (const w of g.warnings) console.log('    - ' + w); }
}
