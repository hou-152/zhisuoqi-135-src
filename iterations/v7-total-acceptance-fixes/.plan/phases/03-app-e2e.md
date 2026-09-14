# Phase 03 · 桌面同步与全量验收
Status: completed

## Tasks
- [x] 校验源壳与 app/assets 同源
- [x] 重打 app
- [x] 跑桌面、移动、公网和主流程回归
- [x] 记录未修复的概念网络/Graph 数据风险

## Evidence
源壳与 app/assets SHA-256 一致；`build-app.mjs` 与 `test-app.mjs` 通过。

## 验收判据
同源校验通过，test-app、verify-135、test-mobile、check-public 通过；剩余失败项有明确风险记录。
