#!/usr/bin/env node
// 知所栖-135 · AC 检索词来源对比测试
//
// 用法：在项目根目录 `node scripts/ac-zhihu-source-test.mjs`
// 产出：evidence/ac-zhihu-source-raw.json
//
// ============================================================
// 预注册（跑之前固定，跑完不改）
// ============================================================
// 问题：135 的案例检索，关键词从哪来能找到更好的案例？
//
// A 组：用户原话直接检索（外行话）
// C 组：AI 内参提炼的概念当检索词（内行话）
//
// 唯一变量：检索词。检索通道（知乎 CLI）、条数、时间、评分维度全部一致。
//
// C 组检索词的来源必须可查：全部取自 AI 内参文章《minimax design：给视频模型配一套 codex
// 式的工作流》（2026-08-21，id 3c3679b1-08ff-81b6-bfb0-fd2129b6f869）的概念区，逐条对应如下：
//   Q1 ← 「多镜头时间线编排」
//   Q2 ← 「抽卡与试错成本」
//   Q3 ← 「3D 导演台」（机位与走位调度）
//
// 评分维度（脚本自动统计，可复算）：
//   D1 第一人称经验：作者自己做过／踩过坑的证据密度
//   D2 具体细节：数字＋单位（秒、次、版、元、%）
//   D3 营销嫌疑：课程／训练营／加微／私信／免费领／扫码／优惠 —— 越低越好
//   D4 可改写为案例卡：需要具体处境＋约束＋做法，人工判（0/1）
//
// 决策规则（跑之前定死）：
//   1. C 在 D1／D2／D4 上优于 A 且 D3 不高于 A → 采用 C（内参概念做检索词）
//   2. 打平 → 采用 A（少一个外部依赖）
//   3. A 优于 C → 放弃 C
//   4. 样本量 6 次检索／30 条结果，只支持方向性判断，不宣称统计显著性
//
// 已知局限（写在前面）：
//   - 内参题材（AI 行业资讯）与 135 题材（AI 视频制作）交集窄，本次只找到 1 篇可用，
//     C 组检索词全部来自同一篇，可复制性存疑。
//   - D1–D3 是字符统计，不是语义判断；D4 是人工判断，已在结果中标注。
//   - 知乎检索结果随时效变化，本文件记录运行日期。
// ============================================================

import { spawn } from 'node:child_process';
import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(fileURLToPath(new URL('.', import.meta.url)), '..');
const COUNT = 5;

const CASES = [
  { id: 'Q1', theme: '像 PPT', a: '为什么 AI 生成的视频像 PPT 翻页', c: 'AI 视频 多镜头 时间线 编排' },
  { id: 'Q2', theme: '抽卡成本', a: 'AI 视频 生成 试错 成本 高', c: 'AI 视频 抽卡 试错成本' },
  { id: 'Q3', theme: '电影感', a: 'AI 视频 怎么做出电影感', c: 'AI 视频 导演台 机位 走位 运镜' },
];

function zhihuSearch(query) {
  return new Promise((resolve) => {
    const p = spawn(join(ROOT, 'scripts', 'zhihu'), ['search', 'zhihu', '--query', query, '--count', String(COUNT)], { cwd: ROOT });
    let out = '';
    p.stdout.on('data', d => out += d);
    p.on('error', () => resolve({ error: 'cli-spawn-failed' }));
    p.on('close', () => {
      try {
        const j = JSON.parse(out);
        const items = (j.Data?.Items || []).map(it => ({
          title: it.Title,
          author: it.AuthorName,
          votes: it.VoteUpCount,
          comments: it.CommentCount,
          url: it.Url,
          text: (it.ContentText || '').replace(/<[^>]+>/g, '').replace(/\s+/g, ' '),
        }));
        resolve({ items });
      } catch { resolve({ error: 'cli-parse-failed', raw: out.slice(0, 200) }); }
    });
  });
}

function score(items) {
  const all = items.map(i => i.text).join('\n');
  const firstPerson = (all.match(/我(试|做|测|踩|用|花|跑)|实测|我自己|我们(团队|试)|踩坑|翻车|亲测/g) || []).length;
  const numbers = (all.match(/\d+(\.\d+)?\s*(秒|分钟|小时|天|周|个月|年|次|版|条|张|元|块|%|帧|个)/g) || []).length;
  const marketing = (all.match(/课程|训练营|加微|私信|免费领|扫码|优惠|报名|咨询老师|限时/g) || []).length;
  return {
    n: items.length,
    D1_first_person: firstPerson,
    D2_concrete_numbers: numbers,
    D3_marketing: marketing,
    chars: all.length,
  };
}

async function main() {
  const runs = [];
  for (const c of CASES) {
    for (const [arm, query] of [['A', c.a], ['C', c.c]]) {
      process.stdout.write(`跑 ${c.id}-${arm}「${query}」… `);
      const r = await zhihuSearch(query);
      if (r.error) { runs.push({ label: `${c.id}-${arm}`, arm, query, error: r.error }); console.log('失败', r.error); continue; }
      const s = score(r.items);
      runs.push({ label: `${c.id}-${arm}`, qid: c.id, theme: c.theme, arm, query, score: s, items: r.items });
      console.log(`ok ${r.items.length} 条 · 首人称${s.D1_first_person} 数字${s.D2_concrete_numbers} 营销${s.D3_marketing}`);
    }
  }

  const sum = (arm, k) => runs.filter(r => r.arm === arm && r.score).reduce((a, r) => a + r.score[k], 0);
  const keys = ['n', 'D1_first_person', 'D2_concrete_numbers', 'D3_marketing'];
  const table = keys.map(k => ({ 维度: k, A: sum('A', k), C: sum('C', k) }));
  console.log('\n=== 汇总（3 问题合计）===');
  console.table(table);

  const verdict = [];
  const better = ['D1_first_person', 'D2_concrete_numbers'].filter(k => sum('C', k) > sum('A', k));
  if (sum('C', 'D3_marketing') > sum('A', 'D3_marketing')) verdict.push('C 的营销嫌疑高于 A → 需人工复核 D4 后再定');
  if (better.length >= 1) verdict.push(`C 在 ${better.join('、')} 上优于 A → 倾向采用 C（待 D4 人工判定）`);
  else if (better.length === 0) verdict.push('C 未在 D1/D2 上优于 A → 按规则倾向采用 A');
  console.log('\n=== 决策规则命中 ===');
  verdict.forEach(v => console.log(' - ' + v));

  mkdirSync(join(ROOT, 'evidence'), { recursive: true });
  const out = join(ROOT, 'evidence', 'ac-zhihu-source-raw.json');
  writeFileSync(out, JSON.stringify({
    generated_at: new Date().toISOString(),
    preregistration: {
      question: '135 的案例检索，关键词从哪来能找到更好的案例',
      arms: { A: '用户原话（外行话）', C: '内参概念（内行话）' },
      single_variable: '检索词；通道/条数/评分维度一致',
      c_keyword_source: 'AI 内参《minimax design：给视频模型配一套 codex 式的工作流》概念区（id 3c3679b1-08ff-81b6-bfb0-fd2129b6f869）',
      metrics: keys.concat(['D4_manual']),
      decision_rules: [
        'C 在 D1/D2/D4 优于 A 且 D3 不高于 A → 采用 C',
        '打平 → 采用 A',
        'A 优于 C → 放弃 C',
        '样本量 6 次检索，只支持方向性判断',
      ],
      known_limits: [
        '内参与 135 题材交集窄，C 组词全来自同一篇',
        'D1–D3 是字符统计；D4 人工',
        '知乎结果随时效变化',
      ],
    },
    summary: table,
    verdict,
    runs,
  }, null, 2));
  console.log(`\n原始产出：${out}`);
}

main().catch(e => { console.error(e); process.exit(1); });
