#!/usr/bin/env node
// 只读验证：概念集合是否能收敛到一个案例决策场入口。
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '..');
const units = JSON.parse(fs.readFileSync(path.join(root, '内容结构化系统/模块/ai-concept-base/data/units.json'), 'utf8'));
const byId = new Map(units.map((u) => [u.id, u]));
const conceptIds = process.argv.slice(2).length ? process.argv.slice(2) : ['CON-context-rot', 'CON-context', 'CON-context-window'];
const concepts = conceptIds.map((id) => byId.get(id));
if (concepts.some((u) => !u || u.type !== '概念单元')) throw new Error('概念 ID 不存在或类型错误');
const cases = units.filter((u) => u.type === '案例单元');
const candidates = cases.filter((cas) => (cas.relationships || []).some((r) => conceptIds.includes(r.target)));
if (!candidates.length) throw new Error('没有找到与概念关系相连的案例');
const selected = byId.get('CAS-context-rot');
if (!selected || !candidates.some((u) => u.id === selected.id)) throw new Error('MVP 选定案例不在候选集中');

const out = [
  '# 案例决策场 1 · MVP 测试记录', '',
  '> 只验证“概念集合 → 单一案例 → 一个正确方向”。未启动服务、未调用 LLM。', '',
  '## 输入概念', ...concepts.map((u) => `- ${u.id}｜${u.title}`), '',
  `## 候选案例（${candidates.length}）`, ...candidates.map((u) => `- ${u.id}｜${u.title}`), '',
  `## 本轮选定案例`, `- ${selected.id}｜${selected.title}`, `- 类型：${selected.key_fields?.case_type || '未知'}`, `- 情境：${selected.key_fields?.case_summary || ''}`, '',
  '## 单一正确方向（本轮只测这一条）',
  '- 方向：固定任务难度、关键证据和评分方法，只分档增加无关输入，观察输入长度是否造成可靠性退化。',
  '- 依据：SOL-context-rot + OPI-CTX-03-03。',
  '- 暂不展开：其他概念、其他案例、其他判断方向。', '',
  '## 结论',
  '- 概念与案例不是按“一个概念只能有一个案例”处理；本轮从概念集合的候选集里选一个案例。',
  '- 当前 A 测试链路已收敛到一个可执行方向，适合接入案例决策场继续做 UI / AI roll 验证。'
].join('\n');
const outPath = path.join(root, 'docs/mvp-case-test-context-rot.md');
fs.writeFileSync(outPath, out);
console.log(`通过：${concepts.length} 个概念 → ${candidates.length} 个候选案例 → 选定 ${selected.id}`);
console.log(`已写出 ${outPath}`);
