#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""内容结构化系统 · 单元生成（确定性，不做 LLM 抽取）

输入（只读，01-原始素材区/完整副本/）：
  · 飞书-Context-Engineering-26+2.md   28 篇（AI 内参正文：导读 / 核心观点 / 概念网络 / 费曼 x3）
  · 飞书-Harness-Engineering-28+2.md   30 篇（同上）
  · 图鉴站产物/concepts/*.yaml         76 张已审计概念卡（remember / feynman / scenario / boundaries / how_to / transfer_question）
  · 图鉴站产物/relations.yaml          169 条正式关系
  · 图鉴站产物/categories.yaml 同源      7 个分类（各带一个真问题）

输出（02-内容单元库/）：
  CON-<slug>  概念单元  ← remember + feynman + boundaries      （复用图鉴站已审计产物）
  SOL-<slug>  方案单元  ← how_to（动作路径）                    （复用）
  CAS-<slug>  案例单元  ← scenario（假设场景）+ source_context（真实来源依据）（复用）
  QST-<slug>  问题单元  ← transfer_question（真问题）            （复用）
  QST-CAT-*   问题单元  ← 7 个分类问题                          （复用）
  QST-DOC-*   问题单元  ← 58 篇源文的「导读」                    （确定性解析）
  OPI-DOC-*   观点单元  ← 58 篇源文的「核心观点」逐条            （确定性解析）

不做的事：不调用 LLM、不新增任何源数据里没有的判断、不改写原文件。
证据等级：实测（字段逐条来自源数据；单元为机械映射，未经人工核对 → status: 待核对）
"""

import glob
import os
import re
import sys
import yaml

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = os.path.join(ROOT, '01-原始素材区', '完整副本')
ATLAS = os.path.join(SRC, '图鉴站产物')
LIB = os.path.join(ROOT, '02-内容单元库')
TODAY = '2026-09-13'

# 幂等：重跑前清掉上一次生成的单元文件（只清 02-内容单元库 下的 .md，不动规则、模板与原始副本）
if os.path.isdir(LIB):
    for d in sorted(os.listdir(LIB)):
        sub = os.path.join(LIB, d)
        if os.path.isdir(sub):
            for f in glob.glob(os.path.join(sub, '*.md')):
                os.remove(f)

SRC_ID = {
    'ctx': 'SRC-EXT-001',   # 飞书 Context Engineering 26+2
    'har': 'SRC-EXT-002',   # 飞书 Harness Engineering 28+2
    'atlas': 'SRC-EXT-003',  # 图鉴站产物（76 概念卡 / 169 关系 / 40 卡）
}
DOC_LABEL = {'ctx': 'Context Engineering 26+2', 'har': 'Harness Engineering 28+2'}
THEME = {'ctx': 'Context Engineering', 'har': 'Harness Engineering'}

# 图鉴站关系 kind → 本工程允许的 4 类关系（原始 kind 保留在 note 里，不丢证据）
REL_MAP = {'part-of': '解释', 'prerequisite': '解释', 'contrast': '冲突', 'used-with': '回应'}
STAGE_ZH = {'now': '现在就要懂', 'when-needed': '需要时再学', 'deep-dive': '深水区'}


def q(s):
    """YAML 标量：一律双引号并转义，避免冒号/引号破坏 frontmatter。"""
    s = '' if s is None else str(s)
    return '"' + s.replace('\\', '\\\\').replace('"', '\\"').replace('\n', ' ').strip() + '"'


def block(items, indent='  '):
    return '\n'.join(f'{indent}- {q(i)}' for i in items)


def write_unit(kind_dir, uid, fm_lines, body):
    os.makedirs(os.path.join(LIB, kind_dir), exist_ok=True)
    title = next((l for l in fm_lines if l.startswith('title:')), 'title: ""')
    name = re.sub(r'[/\\:*?"<>|]', '-', title.split(':', 1)[1].strip().strip('"'))[:60]
    path = os.path.join(LIB, kind_dir, f'{uid}_{name}.md')
    with open(path, 'w', encoding='utf-8') as f:
        f.write('---\n' + '\n'.join(fm_lines) + '\n---\n\n' + body.strip() + '\n')
    return path


def clean_md(t):
    t = t.replace('**', '').replace('`', '')
    return re.sub(r'\s+', ' ', t).strip()


# ── 1. 载入图鉴站产物 ───────────────────────────────────────────────────────
concepts = {}
for p in sorted(glob.glob(os.path.join(ATLAS, 'concepts', '*.yaml'))):
    c = yaml.safe_load(open(p, encoding='utf-8'))
    concepts[c['slug']] = c
relations = yaml.safe_load(open(os.path.join(ATLAS, 'relations.yaml'), encoding='utf-8'))
categories = {c['id']: c for c in yaml.safe_load(open(os.path.join(ATLAS, 'categories.yaml'), encoding='utf-8'))}

rel_out = {}   # slug -> [(type, target_slug, note)]
for r in relations:
    mapped = REL_MAP.get(r.get('kind'), '回应')
    rel_out.setdefault(r['from'], []).append((mapped, r['to'], f"原 kind={r.get('kind')}｜{r.get('note','')}".strip()))
    rel_out.setdefault(r['to'], []).append((mapped, r['from'], f"原 kind={r.get('kind')}（反向）｜{r.get('note','')}".strip()))

counts = {}

# ── 2. CON / SOL / CAS / QST（复用 76 张已审计概念卡） ──────────────────────
for slug, c in concepts.items():
    cat = categories.get(c.get('category_id'), {})
    theme = cat.get('label', '未分类')
    kw = [c.get('name_zh', ''), c.get('name_en', '')] + [cat.get('label', '')]
    base = [
        'source_documents:', f'  - "{SRC_ID["atlas"]}"', 'source_authors:',
        f'  - {q("图鉴站：「Context × Harness 图鉴」概念卡（已审计产物）")}',
        'themes:', f'  - {q(theme)}', f'  - {q(cat.get("label",""))}',
        'keywords:', block([k for k in kw if k]), 'status: "已核对（源：图鉴站已审计产物）"',
        'canonical: true', 'version: 1', f'created_at: {TODAY}', f'updated_at: {TODAY}',
    ]

    # CON
    rels = [f'  - type: {t}\n    target: CON-{tgt}\n    note: {q(n)}' for t, tgt, n in rel_out.get(slug, [])]
    fm = [f'id: CON-{slug}', 'type: 概念单元', f'title: {q(c["name_zh"])}'] + base + [
        f'concept_definition: {q(c.get("remember",""))}',
        f'concept_function: {q("解释「%s」是什么、边界在哪；分类：%s（%s）" % (c["name_zh"], cat.get("label",""), STAGE_ZH.get(c.get("learning_stage"), c.get("learning_stage",""))))}',
        'relationships:', *(rels or ['  []']),
    ]
    body = f"""## 核心内容

**定义（remember）**：{c.get('remember','')}

**费曼一下**：{c.get('feynman','')}

**边界（明确不成立的用法）**
{chr(10).join('- ' + b for b in c.get('boundaries', [])) or '- （源数据未给）'}

**迁移问题**：{c.get('transfer_question','')}

**分类问题**：{cat.get('question','')}

## 来源依据

- `{SRC_ID['atlas']}`：图鉴站概念卡 `concepts/{slug}.yaml`（name_en: {c.get('name_en','')}）
- 源证据范围（卡片自述）：{c.get('source_context','')}
- 定义状态：{c.get('definition_status','')}｜学习阶段：{STAGE_ZH.get(c.get('learning_stage'), c.get('learning_stage',''))}

## 使用场景

产品「知所栖 135」的入口 3 概念、以及概念图/依赖关系；也可作为「费曼验收」的判据来源（见同 slug 的方案单元与问题单元）。

## 关联单元

{chr(10).join(f'- [{t}] [[CON-{tgt}]] —— {n}' for t, tgt, n in rel_out.get(slug, [])) or '- （暂无）'}

## 备注

机械映射自图鉴站已审计产物，未做人工核对；`definition_status: evolving` 的概念（{sum(1 for x in concepts.values() if x.get('definition_status')=='evolving')}/76）本身仍在演化。
"""
    write_unit('概念单元', f'CON-{slug}', fm, body)
    counts['CON'] = counts.get('CON', 0) + 1

    # SOL
    steps = c.get('how_to', [])
    fm = [f'id: SOL-{slug}', 'type: 方案单元', f'title: {q(c["name_zh"] + "：可执行动作路径")}'] + base + [
        f'target_problem: {q("避免这个误区：" + (c.get("boundaries", [""])[0] if c.get("boundaries") else "（源数据未给）"))}',
        f'solution_summary: {q(steps[0] if steps else "")}',
        'action_steps:', block(steps) if steps else '  []',
        f'expected_result: {q("（源数据未给预期结果；动作路径来自图鉴站概念卡的 how_to）")}',
        'relationships:', f'  - type: 解释\n    target: CON-{slug}\n    note: {q("本方案是「%s」这个概念的落地动作" % c["name_zh"])}',
    ]
    body = f"""## 核心内容

**要解决的问题**：{c.get('boundaries', [''])[0] if c.get('boundaries') else ''}

**动作路径（how_to，逐条照抄源数据）**
{chr(10).join(f'{i+1}. {s}' for i, s in enumerate(steps))}

## 来源依据

- `{SRC_ID['atlas']}`：图鉴站概念卡 `concepts/{slug}.yaml` 的 `how_to` 字段

## 使用场景

产品里的「5 实验台」——每条动作路径都可以直接改写成一次可观察的实验（做什么 / 看什么 / 得出什么）。

## 关联单元

- [解释] [[CON-{slug}]] —— 本方案是「{c['name_zh']}」的落地动作

## 备注

源数据未给「预期结果」，实验的验收口径需要在使用时补。
"""
    write_unit('方案单元', f'SOL-{slug}', fm, body)
    counts['SOL'] = counts.get('SOL', 0) + 1

    # CAS
    sc = c.get('scenario') or {}
    fm = [f'id: CAS-{slug}', 'type: 案例单元', f'title: {q(c["name_zh"] + "：一个具体场景")}'] + base + [
        f'case_subject: {q(c.get("name_zh",""))}',
        f'case_summary: {q(sc.get("text",""))}',
        f'case_process: {q("（源数据未给过程——这是假设场景，不是真实复盘）") if sc.get("type")=="hypothetical" else ""}',
        f'case_result: {q("（源数据未给结果）")}',
        f'case_type: {q("假设场景" if sc.get("type")=="hypothetical" else "真实案例")}',
        f'case_evidence: {q(c.get("source_context",""))}',
        'relationships:', f'  - type: 解释\n    target: CON-{slug}\n    note: {q("本案例用来说明「%s」" % c["name_zh"])}',
    ]
    body = f"""## 核心内容

**场景（{('假设场景' if sc.get('type')=='hypothetical' else '真实案例')}）**：{sc.get('text','')}

**来源里的真实依据**：{c.get('source_context','')}

## 来源依据

- `{SRC_ID['atlas']}`：图鉴站概念卡 `concepts/{slug}.yaml` 的 `scenario` 与 `source_context`

## 使用场景

产品里的「3 决策场」。**注意**：76 张卡片的 scenario 全部标为 `hypothetical`（假设场景），
决策场要的是「先自己选，再看真实案例」——真实案例需要下一轮从 58 篇源文正文里单独抽取，
本单元只提供「假设情境 + 真实来源依据」这一层。

## 关联单元

- [解释] [[CON-{slug}]] —— 本案例用来说明「{c['name_zh']}」

## 备注

不要把假设场景当真实复盘引用。
"""
    write_unit('案例单元', f'CAS-{slug}', fm, body)
    counts['CAS'] = counts.get('CAS', 0) + 1

    # QST（概念的迁移问题）
    tq = c.get('transfer_question', '')
    if tq:
        fm = [f'id: QST-{slug}', 'type: 问题单元', f'title: {q("能不能讲清「" + c["name_zh"] + "」")}'] + base + [
            f'question_text: {q(tq)}', 'question_type: "检验问题"',
            f'user_stage: {q(STAGE_ZH.get(c.get("learning_stage"), ""))}',
            'applicable_topics:', f'  - {q(cat.get("label",""))}',
            'relationships:', f'  - type: 解释\n    target: CON-{slug}\n    note: {q("这个问题用来检验「%s」是否真的讲明白了" % c["name_zh"])}',
        ]
        body = f"""## 核心内容

**问题原句**：{tq}

这是图鉴站给「{c['name_zh']}」配的迁移问题：答得出，说明这个概念被讲明白了；答不出，回到 [[CON-{slug}]] 重讲。

## 来源依据

- `{SRC_ID['atlas']}`：图鉴站概念卡 `concepts/{slug}.yaml` 的 `transfer_question`

## 使用场景

产品里的「费曼验收」——这一类问题就是验收题面。

## 关联单元

- [解释] [[CON-{slug}]]

## 备注

源数据未标注难度与适用阶段，`user_stage` 取自概念卡的学习阶段。
"""
        write_unit('问题单元', f'QST-{slug}', fm, body)
        counts['QST-CON'] = counts.get('QST-CON', 0) + 1

# ── 3. QST-CAT（7 个分类问题） ──────────────────────────────────────────────
for cid, cat in categories.items():
    fm = ['id: QST-CAT-' + cid, 'type: 问题单元', f'title: {q(cat.get("question",""))}',
          'source_documents:', f'  - "{SRC_ID["atlas"]}"',
          'source_authors:', f'  - {q("图鉴站分类轴（7 个分类问题）")}',
          'themes:', f'  - {q(cat.get("label",""))}', 'keywords:', block([cat.get('label', '')]),
          'status: "已核对（源：图鉴站已审计产物）"', 'canonical: true', 'version: 1',
          f'created_at: {TODAY}', f'updated_at: {TODAY}',
          f'question_text: {q(cat.get("question",""))}', 'question_type: "分类问题"',
          'user_stage: "全阶段"', 'applicable_topics:', f'  - {q(cat.get("label",""))}',
          'relationships: []']
    members = [f'[[CON-{s}]]' for s, x in concepts.items() if x.get('category_id') == cid]
    body = f"""## 核心内容

**分类**：{cat.get('label','')}（第 {cat.get('order','')} 个分类）
**它要回答的问题**：{cat.get('question','')}

这个分类下的 {len(members)} 个概念：{'、'.join(members)}

## 来源依据

- `{SRC_ID['atlas']}`：图鉴站分类轴 `categories.yaml`

## 使用场景

作为主题地图的一级目录，也是「学这一块到底在回答什么」的入口问题。

## 关联单元

{chr(10).join('- ' + m for m in members)}

## 备注

分类问题由图鉴站定义，本工程只做搬运。
"""
    write_unit('问题单元', f'QST-CAT-{cid}', fm, body)
    counts['QST-CAT'] = counts.get('QST-CAT', 0) + 1

# ── 4. 解析 58 篇源文：QST-DOC（导读）+ OPI-DOC（核心观点） ──────────────────
def parse_doc(path, key):
    text = open(path, encoding='utf-8').read()
    marks = [m.start() for m in re.finditer(r'^# ', text, re.M)]
    arts = []
    for i, start in enumerate(marks):
        end = marks[i + 1] if i + 1 < len(marks) else len(text)
        lines = text[start:end].split('\n')
        title = clean_md(lines[0][2:])
        if title == '整理说明':                              # 文档说明，不是文章
            continue
        # 清单编号写在上一篇正文之后、本篇 H1 之前；按位置切片取，不用 .index（标题可能在别处先出现）
        head = text[(marks[i - 1] if i > 0 else 0):start]
        found = re.findall(r'(?:HOWIE 原清单|CODEX 补充推荐|Codex 补充推荐)\s*·\s*([0-9A-Za-z]+)', head)
        label = found[-1] if found else f'U{i:02d}'
        body = '\n'.join(lines[1:])
        secs = {}
        for m in re.finditer(r'^## (.+?)\s*$(.*?)(?=^## |\Z)', body, re.M | re.S):
            secs.setdefault(clean_md(m.group(1)), m.group(2).strip())
        lead = secs.get('导读', '')
        core = secs.get('核心观点') or secs.get('核心论点') or secs.get('核心观点/主旨') or ''
        bullets = []
        cur = None
        for ln in core.split('\n'):
            if re.match(r'^\s*[-*]\s+', ln):
                if cur:
                    bullets.append(clean_md(cur))
                cur = re.sub(r'^\s*[-*]\s+', '', ln)
            elif cur is not None and ln.strip():
                cur += ' ' + ln.strip()
        if cur:
            bullets.append(clean_md(cur))
        arts.append({'title': title, 'lead': lead, 'bullets': [b for b in bullets if len(b) >= 20],
                     'n': label, 'doc': key})
    return arts


articles = parse_doc(os.path.join(SRC, '飞书-Context-Engineering-26+2.md'), 'ctx') \
         + parse_doc(os.path.join(SRC, '飞书-Harness-Engineering-28+2.md'), 'har')
concept_names = sorted([(c['name_zh'], s) for s, c in concepts.items()], key=lambda x: -len(x[0]))

for a in articles:
    doc, n = a['doc'], a['n']
    uid = f'QST-{doc.upper()}-{n}'
    hits = [s for nm, s in concept_names if nm and nm in a['lead']]
    fm = [f'id: {uid}', 'type: 问题单元', f'title: {q(a["title"])}',
          'source_documents:', f'  - "{SRC_ID[doc]}"',
          'source_authors:', f'  - {q("AI 内参转述稿（策展人 Howie 清单）")}',
          'themes:', f'  - {q(THEME[doc])}', 'keywords:', block([a['title'][:24]] + [concepts[s]['name_zh'] for s in hits[:4]]),
          'status: "待核对（确定性解析自源文「导读」小节）"', 'canonical: true', 'version: 1',
          f'created_at: {TODAY}', f'updated_at: {TODAY}',
          f'question_text: {q(a["lead"])}', 'question_type: "文章定位"',
          'user_stage: "未标注"', 'applicable_topics:', f'  - {q(THEME[doc])}',
          'relationships:']
    fm += [f'  - type: 解释\n    target: CON-{s}\n    note: {q("本篇导读提到这个概念")}' for s in hits[:4]] or ['  []']
    body = f"""## 核心内容

**这篇从哪来、要解决什么（导读原文）**：{a['lead']}

**源文标题**：{a['title']}

## 来源依据

- `{SRC_ID[doc]}`：`飞书-{THEME[doc]}-{('26+2' if doc=='ctx' else '28+2')}.md` 清单编号 {n} 的「导读」小节（原文照抄）

## 使用场景

作为这一篇其余单元（概念 / 观点 / 案例 / 方案）的入口问题；也是产品里「一个问题 → 3 概念」的那个问题。

## 关联单元

{chr(10).join(f'- [解释] [[CON-{s}]] —— 导读提到「{concepts[s]["name_zh"]}」' for s in hits[:4]) or '- （导读未直接提到已收录概念）'}

## 备注

导读是策展人写的一句话定位，不是完整的问句；`question_type` 标为「文章定位」以区别于真正的检验问题。
"""
    write_unit('问题单元', uid, fm, body)
    counts['QST-DOC'] = counts.get('QST-DOC', 0) + 1

    for k, b in enumerate(a['bullets'], 1):
        ouid = f'OPI-{doc.upper()}-{n}-{k:02d}'
        hits = [s for nm, s in concept_names if nm and nm in b]
        fm = [f'id: {ouid}', 'type: 观点单元', f'title: {q(b[:48] + ("…" if len(b) > 48 else ""))}',
              'source_documents:', f'  - "{SRC_ID[doc]}"',
              'source_authors:', f'  - {q("AI 内参转述稿（策展人 Howie 清单）")}',
              'themes:', f'  - {q(THEME[doc])}', 'keywords:', block([concepts[s]['name_zh'] for s in hits[:5]] or [a['title'][:24]]),
              'status: "待核对（确定性解析自源文「核心观点」小节）"', 'canonical: true', 'version: 1',
              f'created_at: {TODAY}', f'updated_at: {TODAY}',
              f'core_claim: {q(b)}',
              f'claim_scope: {q("出自《%s》清单编号 %s 的第 %d 条核心观点；适用范围以原文为准，本工程未做二次判断" % (a["title"], n, k))}',
              f'why_it_matters: {q("它是这篇的论断之一；在 135 里用来当费曼验收的判据与决策场的立场")}',
              'relationships:']
        rel = [f'  - type: 回应\n    target: {uid}\n    note: {q("这一条是该篇核心观点之一")}']
        rel += [f'  - type: 证明\n    target: CON-{s}\n    note: {q("这条观点用到了「%s」" % concepts[s]["name_zh"])}' for s in hits[:3]]
        fm += rel
        body = f"""## 核心内容

**核心判断（原文照抄）**：{b}

## 来源依据

- `{SRC_ID[doc]}`：`{a['title']}` 的「核心观点」第 {k} 条

## 使用场景

- 费曼验收：讲完这篇，能不能复述出这一条；
- 决策场：这一条可以当「案例支持哪一种选择」的立场。

## 关联单元

{chr(10).join(f'- [证明] [[CON-{s}]] —— 用到「{concepts[s]["name_zh"]}」' for s in hits[:3]) or '- （未匹配到已收录概念）'}

## 备注

按「一条观点 = 一个单元」切分，标题是原句截断，完整判断看正文。
"""
        write_unit('观点单元', ouid, fm, body)
        counts['OPI-DOC'] = counts.get('OPI-DOC', 0) + 1

print('单元产出：', counts, '合计', sum(counts.values()))
print('文章数:', len(articles), '（ctx', sum(1 for a in articles if a['doc'] == 'ctx'), '· har',
      sum(1 for a in articles if a['doc'] == 'har'), '）')
