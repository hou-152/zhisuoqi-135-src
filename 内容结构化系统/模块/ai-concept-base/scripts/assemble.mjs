#!/usr/bin/env node
// ai-concept-base · 装配：把一个课题装配成「问题 → 概念 → 观点 → 案例 → 方案」草稿
//
// 只挑真实单元、只做搬运，不新增内容。产物是 Markdown，可直接交给写作/课程/产品。
//
// 用法：
//   node scripts/assemble.mjs --qst QST-HAR-03          # 指定入口问题
//   node scripts/assemble.mjs --q "harness，不是又一个框架"   # 按关键词找入口问题
//   node scripts/assemble.mjs --q "熵减" --out /tmp/draft.md
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const DATA = path.join(HERE, '..', 'data');
const argv = process.argv.slice(2);
const arg = (k, d = null) => {
  const i = argv.indexOf('--' + k);
  return i >= 0 ? (argv[i + 1] && !argv[i + 1].startsWith('--') ? argv[i + 1] : true) : d;
};

const units = JSON.parse(fs.readFileSync(path.join(DATA, 'units.json'), 'utf8'));
const byId = new Map(units.map((u) => [u.id, u]));
const pick = (pred) => units.filter(pred);

// 1. 入口问题
let qst = arg('qst') ? byId.get(arg('qst')) : null;
if (!qst) {
  const q = String(arg('q', '') || '').toLowerCase();
  qst = pick((u) => u.type === '问题单元' && (u.title + u.id).toLowerCase().includes(q))[0];
}
if (!qst) { console.error('没找到入口问题：换个关键词，或先跑 query.mjs --type 问题单元'); process.exit(1); }

// 2. 从问题出发找概念：优先用关系，其次用同篇观点指向的概念，再次用标题关键词命中
const doc = (qst.id.match(/^QST-(CTX|HAR)-(.+)$/) || [])[1];
const label = qst.id.split('-')[2] || '';
const relCons = (qst.relationships || []).filter((r) => r.target.startsWith('CON-')).map((r) => r.target);
const opiCons = pick((u) => u.type === '观点单元' && doc && u.id.startsWith(`OPI-${doc}-${label}-`))
  .flatMap((o) => (o.relationships || []).map((r) => r.target))
  .filter((t) => t.startsWith('CON-'));
const kwCons = pick((u) => u.type === '概念单元'
  && [].concat(u.keywords).some((k) => k && k.length > 1 && qst.title.includes(k))).map((u) => u.id);
const ordered = [...new Set([...relCons, ...opiCons, ...kwCons])];
const cons = ordered.slice(0, 4).map((id) => byId.get(id)).filter(Boolean);

// 3. 观点：指向这些概念、或同一篇的
const conIds = new Set(cons.map((c) => c.id));
const opis = pick((u) => u.type === '观点单元' && (
  (u.relationships || []).some((r) => conIds.has(r.target))
  || (doc && u.id.startsWith(`OPI-${doc}-`) && qst.id.split('-')[2] === u.id.split('-')[2]))).slice(0, 4);

// 4. 案例与方案：取第一个概念的同名单元
const slug = cons.length ? cons[0].id.replace(/^CON-/, '') : null;
const cas = slug ? byId.get('CAS-' + slug) : null;
const sol = slug ? byId.get('SOL-' + slug) : null;
const selfCheck = slug ? byId.get('QST-' + slug) : null;

const L = (u) => (u ? `- **${u.title}**（\`${u.id}\`）` : '- （缺）');
const body = [
  `# 装配草稿：${qst.title}`,
  '',
  '> 由 ai-concept-base 自动装配：只搬运真实单元，未新增任何内容。',
  '> 引用对外时请回到 `source_documents` 指向的源文，不要引本库当一手证据。',
  '',
  '## 一、问题（入口）',
  L(qst),
  '',
  '> ' + String(qst.key_fields?.question_text || '').slice(0, 300),
  '',
  '## 二、概念',
  ...cons.map(L),
  '',
  ...cons.map((c) => `### ${c.title}\n\n${String(c.key_fields?.concept_definition || c.body).slice(0, 600)}\n`),
  '## 三、观点（费曼验收的判据）',
  ...opis.map(L),
  '',
  ...opis.map((o) => `> ${String(o.key_fields?.core_claim || '').slice(0, 300)}\n`),
  '## 四、案例（决策场用；注意 case_type）',
  L(cas),
  cas ? `\n> ${String(cas.key_fields?.case_summary || '').slice(0, 300)}\n> 来源依据：${String(cas.key_fields?.case_evidence || '').slice(0, 200)}\n` : '',
  '## 五、方案（实验台用）',
  L(sol),
  sol ? '\n' + [].concat(sol.key_fields?.action_steps || []).map((s, i) => `${i + 1}. ${s}`).join('\n') + '\n' : '',
  '## 六、自测（讲完答得出才算过）',
  L(selfCheck),
  selfCheck ? `\n> ${String(selfCheck.key_fields?.question_text || '')}\n` : '',
].join('\n');

const out = arg('out');
if (out && out !== true) { fs.writeFileSync(out, body); console.log('已写出 ' + out); }
else console.log(body);
