#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""内容结构化系统 · 基本盘两条策展线（工程范围轴）→ 壳用 JSON

轴口径来自图鉴站 ADR-0001 轴 01（`axis-map.yaml` 头部数据合同）：
  scope = prompt / context / harness，表示该概念的工程实践主要发生在哪一层的覆盖范围内。
本脚本把 scope 归成两条线：Context Engineering = prompt + context；Harness Engineering = harness。
不新增定义：线名、概念名、定义、分类、学习阶段全部照抄源数据。

输出：05-主题地图/基本盘-工程范围轴.json（供 scripts/build-shell.mjs 注入壳）
"""

import glob
import json
import os
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
BASE = os.path.join(ROOT, '01-原始素材区', '完整副本', '图鉴站产物')
OUT = os.path.join(ROOT, '05-主题地图', '基本盘-工程范围轴.json')

graph = json.load(open(os.path.join(BASE, 'graph.json'), encoding='utf-8'))
cards = {os.path.basename(p)[:-5]: yaml.safe_load(open(p, encoding='utf-8'))
         for p in glob.glob(os.path.join(BASE, 'concepts', '*.yaml'))}
cats = {c['id']: c for c in yaml.safe_load(open(os.path.join(BASE, 'categories.yaml'), encoding='utf-8'))}

nodes = {n['slug']: n for n in graph['nodes']}
edges = graph['edges']
LINES = [
    ('context', 'Context Engineering', ['prompt', 'context'],
     '工程范围轴的 prompt 层与 context 层：模型此刻看得见什么、信息以什么形式在什么时候进入工作台。'),
    ('harness', 'Harness Engineering', ['harness'],
     '工程范围轴的 harness 层：模型之外那套运行系统怎么搭——循环、工具、状态、权限、验证与证据。'),
]

out = {'source': '「Context × Harness 图鉴」', 'axis': 'ADR-0001 轴 01 · 工程范围轴（prompt / context / harness）',
       'site': 'https://hou-152.github.io/context-harness-atlas-site/', 'lines': []}

for key, name, scopes, why in LINES:
    members = [s for s, n in nodes.items() if (n.get('axis') or {}).get('scope') in scopes]
    inner = [e for e in edges if e['from'] in members and e['to'] in members]
    has_in = {e['to'] for e in inner if e.get('kind') in ('part-of', 'prerequisite')}
    entry = [s for s in members if s not in has_in]
    groups = []
    for cid in [c['id'] for c in sorted(cats.values(), key=lambda x: x.get('order', 99))]:
        cs = [s for s in members if nodes[s].get('category_id') == cid]
        if not cs:
            continue
        groups.append({'id': cid, 'label': cats[cid]['label'], 'question': cats[cid].get('question', ''),
                       'concepts': [{'slug': s, 'name': nodes[s]['name_zh'], 'en': nodes[s].get('name_en', ''),
                                     'stage': nodes[s].get('learning_stage', ''),
                                     'gloss': (cards.get(s, {}).get('remember') or '')[:160]} for s in sorted(cs)]})
    out['lines'].append({
        'key': key, 'name': name, 'why': why, 'count': len(members),
        'entry': [{'slug': s, 'name': nodes[s]['name_zh']} for s in sorted(entry)[:8]],
        'groups': groups,
        'note': f"这一线共 {len(members)} 个概念，其中 {len(inner)} 条线内关系；入口 = 线内没有前置依赖的概念。",
    })

json.dump(out, open(OUT, 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('写出', OUT, '｜两条线：', [(l['name'], l['count']) for l in out['lines']])
