# Phase 02 · 探索与 Starlink 入口
Status: completed

## Tasks
- [x] 将队友首页视觉接入探索入口（当前先接入问题入口与模块入口，视觉资源合并待完成）
- [ ] 保留星链空间中的内参、知识体系、实践空间三个模块入口
- [x] 三个介绍面板分别连接 `#neican`、`#graph`、`#practice` (scripts/shell.template.html:1270-1283)
- [x] 增加问题入口：命中概念进入对应主题，未命中保留知识体系筛选 (scripts/shell.template.html:1277-1283)
- [ ] 增加返回探索空间、刷新和后退恢复
- [ ] 避免长期双 iframe，非当前视图不启动重型动画

## 验收判据
探索 → 星链 → 任一模块 → 返回探索空间完整可走；桌面、移动和静态版均无白屏；未接通的 AI 能力不做虚假承诺。

## Evidence
自测：`node scripts/build-shell.mjs` 成功；视觉合并和浏览器回归待继续。


Evidence: Explore includes three module cards and a question entry form; build-shell completed successfully. Commit `fcacdda`.
