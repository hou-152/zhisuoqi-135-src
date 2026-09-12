#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""内容结构化系统 · 主题地图与选题装配（确定性，基于已生成的 538 个单元）

输入：02-内容单元库/（build-units.py 的产出）、01-原始素材区/完整副本/图鉴站产物/categories.yaml
输出：05-主题地图/主题地图-<分类>.md（7 张）
      06-选题装配/装配-<主题>.md（2 份）

规则：正文里引用其他单元统一写 [[文件名]]（不含 .md），文件名从落盘结果反查，不手写。
"""

import glob
import os
import re
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
LIB = os.path.join(ROOT, '02-内容单元库')
ATLAS = os.path.join(ROOT, '01-原始素材区', '完整副本', '图鉴站产物')
MAPS = os.path.join(ROOT, '05-主题地图')
ASSEM = os.path.join(ROOT, '06-选题装配')
TODAY = '2026-09-13'

categories = {c['id']: c for c in yaml.safe_load(open(os.path.join(ATLAS, 'categories.yaml'), encoding='utf-8'))}
concepts = {os.path.basename(p)[:-5]: yaml.safe_load(open(p, encoding='utf-8'))
            for p in glob.glob(os.path.join(ATLAS, 'concepts', '*.yaml'))}

# id → 文件名（不含 .md），用于写 [[文件名]]
ID2FILE, FM = {}, {}
for d in sorted(os.listdir(LIB)):
    for p in sorted(glob.glob(os.path.join(LIB, d, '*.md'))):
        stem = os.path.basename(p)[:-3]
        uid = stem.split('_')[0]
        ID2FILE[uid] = stem
        txt = open(p, encoding='utf-8').read()
        fm = dict(re.findall(r'^(id|type|title|status):\s*"?(.*?)"?\s*$', txt, re.M))
        FM[uid] = {'title': fm.get('title', ''), 'type': fm.get('type', ''),
                   'rels': re.findall(r'target:\s*(\S+)', txt)}

link = lambda uid: f'[[{ID2FILE[uid]}]]' if uid in ID2FILE else f'`{uid}`（缺）'
by_kind = lambda k: [u for u in ID2FILE if u.startswith(k + '-')]
concepts_of = lambda cid: [s for s, c in concepts.items() if c.get('category_id') == cid]


def write(path, text):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    open(path, 'w', encoding='utf-8').write(text.strip() + '\n')


# ── 主题地图 ────────────────────────────────────────────────────────────────
for cid, cat in categories.items():
    slugs = concepts_of(cid)
    cons = [f'CON-{s}' for s in slugs]
    sols = [f'SOL-{s}' for s in slugs]
    cass = [f'CAS-{s}' for s in slugs]
    qsts = [f'QST-{s}' for s in slugs]
    # 观点：关系里指向本分类概念的
    opis = [u for u in by_kind('OPI') if any(t in cons for t in FM[u]['rels'])]
    others = [(c2['label'], c2['id']) for c2 in categories.values() if c2['id'] != cid]
    first = slugs[0]
    text = f"""# 主题地图：{cat['label']}

> 生成于 {TODAY}｜分类 id：`{cid}`｜图鉴站分类轴第 {cat.get('order','')} 类

## 主题定义

这一块要回答的问题是：**{cat.get('question','')}**

本分类共 {len(slugs)} 个概念，占 76 个概念的 {len(slugs)/76*100:.0f}%。

## 核心问题单元

- {link(f'QST-CAT-{cid}')}（整个分类的入口问题）
{chr(10).join('- ' + link(u) for u in qsts[:8])}
{(f'- 另有 {len(qsts)-8} 个概念的检验问题，见 02-内容单元库/问题单元/' if len(qsts) > 8 else '')}

## 核心概念单元

{chr(10).join('- ' + link(u) for u in cons)}

## 核心观点单元

{chr(10).join('- ' + link(u) + ' —— ' + FM[u]['title'][:40] for u in opis[:10]) or '- （本分类暂无直接对应的观点单元）'}
{(f'- 另有 {len(opis)-10} 条，见 02-内容单元库/观点单元/' if len(opis) > 10 else '')}

## 核心案例单元

{chr(10).join('- ' + link(u) for u in cass[:6])}
{(f'- 另有 {len(cass)-6} 个，见 02-内容单元库/案例单元/（全部为假设场景，见单元内 case_type）' if len(cass) > 6 else '')}

## 核心方案单元

{chr(10).join('- ' + link(u) for u in sols[:6])}
{(f'- 另有 {len(sols)-6} 个，见 02-内容单元库/方案单元/' if len(sols) > 6 else '')}

## 常见装配路径

1. 问题：{link(f'QST-CAT-{cid}')}
2. 概念：{link(f'CON-{first}')}
3. 观点：{link(opis[0]) if opis else '（待补）'}
4. 案例：{link(f'CAS-{first}')}
5. 方案：{link(f'SOL-{first}')}

## 相关主题

{chr(10).join(f'- {lab}（`{i}`）：' + link(f'QST-CAT-{i}') for lab, i in others)}
"""
    write(os.path.join(MAPS, f'主题地图-{cat["label"]}.md'), text)

# ── 选题装配 ────────────────────────────────────────────────────────────────
def find_qst(keyword):
    for u in by_kind('QST'):
        if keyword in FM[u]['title']:
            return u
    return None


assemblies = [
    {
        'file': '装配-你的 agent 需要的是 harness.md',
        'title': '你的 agent 需要的是 harness，不是又一个框架',
        'audience': '已经在写 agent、但一直在换框架的人；以及要给团队讲清「harness 工程是什么」的人',
        'why': '同一批源材料里，"框架"与"harness"被反复对照。这条装配线用一篇文章的入口问题，串起概念、观点、案例与动作路径，最后落到一次可观察的实验。',
        'qst_kw': 'harness，不是又一个框架',
        'con': 'CON-agent-harness',
        'extra_con': ['CON-harness-engineering', 'CON-agent-loop', 'CON-guardrails'],
        'extra_opi_kw': 'harness',
    },
    {
        'file': '装配-上下文工程的本质是熵减.md',
        'title': '上下文工程的本质是熵减',
        'audience': '把 context 当成"对话历史 + 系统提示词"的人；想给 agent 的上下文做工程但不知道从哪下手的人',
        'why': '这是 Context Engineering 专题第一篇的第一个论断，也是整份清单的立场：把高熵意图压缩成机器能读的低熵表示。用它当入口，能把 26+2 篇里的概念、观点、案例与动作路径收成一条线。',
        'qst_kw': '上下文工程 2.0',
        'con': 'CON-context-engineering',
        'extra_con': ['CON-bounded-context', 'CON-minimal-sufficient-context', 'CON-context-rot'],
        'extra_opi_kw': '熵减',
    },
]

for a in assemblies:
    q = find_qst(a['qst_kw'])
    con = a['con']
    slug = con[4:]
    doc = 'HAR' if q and q.startswith('QST-HAR') else 'CTX'
    label = q.split('-')[2] if q else ''
    opis = [u for u in by_kind('OPI') if q and u.startswith(f'OPI-{doc}-{label}-')]
    extra_opi = [u for u in by_kind('OPI') if a['extra_opi_kw'] in FM[u]['title']][:4]
    text = f"""# 选题装配：{a['title']}

> 生成于 {TODAY}｜按 06-选题装配 模板装配｜所有引用都是真实单元，未新增内容

## 目标受众

{a['audience']}

## 装配理由

{a['why']}

## 核心调用单元

### 问题

- {link(q) if q else '（未找到匹配的问题单元）'} —— {FM[q]['title'] if q else ''}

### 概念

- {link(con)}
{chr(10).join('- ' + link(c) for c in a['extra_con'] if c in ID2FILE)}

### 观点

{chr(10).join('- ' + link(u) + ' —— ' + FM[u]['title'][:44] for u in opis[:5]) or '- （待补）'}

### 案例

- {link(f'CAS-{slug}')}（假设场景，`case_type` 已标注）

### 方案

- {link(f'SOL-{slug}')}

## 可追加调用单元

- 补充问题：{link(f'QST-{slug}')}
- 补充概念：{'、'.join(link(c) for c in by_kind('CON')[:0]) or '（按需从主题地图取）'}
- 补充观点：{chr(10).join('  - ' + link(u) + ' —— ' + FM[u]['title'][:40] for u in extra_opi) or '（无）'}
- 补充案例：{link(f'CAS-{a["extra_con"][0][4:]}') if a['extra_con'][0] in ID2FILE else '（无）'}
- 补充方案：{link(f'SOL-{a["extra_con"][0][4:]}') if a['extra_con'][0] in ID2FILE else '（无）'}

## 建议结构

1. 痛点：{FM[q]['title'][:40] if q else ''}
2. 冲突：先用 {link(f'QST-{slug}')} 让人自己答一遍
3. 展开：{link(con)} 的定义与边界
4. 案例：{link(f'CAS-{slug}')}
5. 方法：{link(f'SOL-{slug}')} 的动作路径
6. 收束：回到 {link(f'QST-{slug}')} 重答一次

## 表达骨架

### 开头

直接抛问题：{FM[q]['title'] if q else ''}

### 中段 1

概念：把「{concepts[slug]['name_zh'] if slug in concepts else ''}」讲清楚 —— 定义、费曼、边界。

### 中段 2

观点：{FM[opis[0]]['title'][:44] if opis else '（待补）'}

### 中段 3

案例与方案：{link(f'CAS-{slug}')} + {link(f'SOL-{slug}')}

### 结尾

用 {link(f'QST-{slug}')} 做一次自测：答得出，说明这一轮讲明白了。
"""
    write(os.path.join(ASSEM, a['file']), text)

print('主题地图:', len(glob.glob(os.path.join(MAPS, '*.md'))), '｜选题装配:', len(glob.glob(os.path.join(ASSEM, '*.md'))))
print('单元总数:', len(ID2FILE))
