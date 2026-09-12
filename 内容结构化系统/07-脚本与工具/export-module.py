#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""把 538 个内容单元导出成**可安装模块**（模块 = 一个能独立拿走的目录）

输出的模块目录：`模块/ai-concept-base/`
  SKILL.md            给 agent 的用法（人写，不由本脚本生成）
  README.md           给人的用法（人写）
  data/units.json     538 个单元全文（结构化，程序消费）
  data/index.json     轻量索引（id/type/title/themes/keywords），给检索用
  data/lines.json     两条策展线（Context Engineering / Harness Engineering）
  scripts/*.mjs       查询与装配（人写）

设计约束：模块内**不写死任何绝对路径**——拿走整个目录即可用。
"""

import glob
import json
import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIB = os.path.join(ROOT, '02-内容单元库')
MAPS = os.path.join(ROOT, '05-主题地图')
MOD = os.path.join(ROOT, '模块', 'ai-concept-base')
TODAY = '2026-09-13'


def parse_front(text):
    m = re.match(r'^---\n(.*?)\n---\n(.*)$', text, re.S)
    if not m:
        return {}, text
    fm, body = m.group(1), m.group(2)
    out, key, buf = {}, None, []
    for line in fm.split('\n'):
        if re.match(r'^[a-z_]+:', line):
            if key:
                out[key] = buf
            key, buf = line.split(':', 1)[0], [line.split(':', 1)[1].strip().strip('"')]
        elif line.startswith('  - '):
            buf.append(line[4:].strip().strip('"'))
        elif line.startswith('  ') and line.strip():
            buf.append(line.strip().strip('"'))
        elif key:
            buf.append(line.strip())
    if key:
        out[key] = buf
    clean = {k: ([x for x in v if x] if len(v) > 1 else (v[0].strip('"') if v else '')) for k, v in out.items()}
    return clean, body.strip()


units, index = [], []
for d in sorted(os.listdir(LIB)):
    for p in sorted(glob.glob(os.path.join(LIB, d, '*.md'))):
        raw = open(p, encoding='utf-8').read()
        fm, body = parse_front(raw)
        uid = os.path.basename(p)[:-3].split('_')[0]
        rels = re.findall(r'^- \[(\S+?)\] \[\[([^\]]+)\]\]', body, re.M)
        u = {
            'id': uid,
            'type': fm.get('type', ''),
            'title': fm.get('title', ''),
            'source_documents': fm.get('source_documents', []),
            'themes': fm.get('themes', []),
            'keywords': fm.get('keywords', []),
            'status': fm.get('status', ''),
            'key_fields': {k: v for k, v in fm.items()
                           if k in ('concept_definition', 'concept_function', 'core_claim',
                                    'claim_scope', 'why_it_matters', 'case_summary', 'case_type',
                                    'case_evidence', 'target_problem', 'solution_summary',
                                    'action_steps', 'question_text', 'question_type')},
            'relationships': [{'type': t, 'target': tgt} for t, tgt in rels],
            'body': body,
        }
        units.append(u)
        index.append({'id': uid, 'type': u['type'], 'title': u['title'],
                      'themes': u['themes'], 'keywords': u['keywords'],
                      'gloss': (u['key_fields'].get('concept_definition')
                                or u['key_fields'].get('core_claim')
                                or u['key_fields'].get('question_text')
                                or u['key_fields'].get('case_summary')
                                or u['key_fields'].get('solution_summary') or '')[:140]})

lines_src = os.path.join(MAPS, '基本盘-工程范围轴.json')
lines = json.load(open(lines_src, encoding='utf-8')) if os.path.exists(lines_src) else {'lines': []}

os.makedirs(os.path.join(MOD, 'data'), exist_ok=True)
json.dump(units, open(os.path.join(MOD, 'data', 'units.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
json.dump(index, open(os.path.join(MOD, 'data', 'index.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)
json.dump(lines, open(os.path.join(MOD, 'data', 'lines.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)

kinds = {}
for u in units:
    kinds[u['type']] = kinds.get(u['type'], 0) + 1
json.dump({'generated': TODAY, 'count': len(units), 'byType': kinds,
           'sources': ['SRC-EXT-001 Context Engineering 26+2', 'SRC-EXT-002 Harness Engineering 28+2',
                       'SRC-EXT-003 「Context × Harness 图鉴」已审计概念卡']},
          open(os.path.join(MOD, 'data', 'manifest.json'), 'w', encoding='utf-8'),
          ensure_ascii=False, indent=1)

print('模块数据已导出：', os.path.relpath(MOD, ROOT), '｜单元', len(units), kinds)
for f in ('units.json', 'index.json', 'lines.json'):
    print('  ', f, round(os.path.getsize(os.path.join(MOD, 'data', f)) / 1024), 'KB')
