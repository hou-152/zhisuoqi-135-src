---
id: cm_3c7b40a0
name: 确定性编译
nameEn: deterministic compilation
type: CONCEPTUAL
subject: AI 内参 260912
domain: verification-eval
learningStage: when-needed
verification: judge
centrality: 0.089
depth: 0
origin: [neican]
aliases: ["deterministic compilation"]
sources: 1
---

# 确定性编译 · deterministic compilation

> 同一份 IR 经 Archify 编译应得到相同结果，不依赖运行时代码或随机布局。

**领域** verification-eval ｜ **类型** CONCEPTUAL ｜ **什么时候学** 做到这里再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.089

## 费曼一下

同一份 IR 经过 Archify 编译，应当得到相同结果，不依赖运行时代码或随机布局。它把代理生成和最终渲染分开，使验证结果可复现、导出物可信任。

## 原文 context

Archify 确定性地将其编译为 HTML/SVG.

Typed JSON IR — every renderer-backed mode has a schema and reproducible source.

## 掌握证据（做到这些才算会）

- 能说明确定性编译把代理生成与最终渲染分开
- 能解释为何因此验证结果可复现、导出物可信任

## 验收问句

> {{name}} 为何能让验证结果可复现？

## 懂了它才能懂（解锁 1）

- [[原子验证与交付门 atomic validation before delivery]] — 不懂【确定性编译】，就做不了【原子验证与交付门】里的「候选原子替换目标」——同一份 IR 若每次编译出的布局/HTML 都可能不同，全过的检查结果贴不到实际交付物上，放行就等于没放行

## 出场

- AI 内参 260912 ｜ 《Archify》 ｜ https://github.com/tt-a1i/archify

## 别名

`deterministic compilation`

## 反链

- [[原子验证与交付门 atomic validation before delivery]]
