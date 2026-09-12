# 知所栖 135 · 桌面版

同一个壳，跑在本地窗口里。**和网页版共用一份服务代码**——`app/main.js` import 的就是
`scripts/serve-lib.mjs`，不是另写一遍。所以修一个不会漏一个。

## 为什么要有它

网页版做不到两件事，桌面版能：

| | 网页版 | 桌面版 |
|---|---|---|
| 学习记录 | 存浏览器 localStorage，清一次浏览器数据就没了 | 存 `~/Documents/知所栖-135/学习记录.json`，可备份、可搜索、可丢进别的工具 |
| skill 产物 | `dbs-learning-beta` 的 SKILL.md 写死了产物路径 `~/Documents/dbskill-open-learning/<课题>/01.md`，网页版只能回一句「当前会话没有文件写入能力，先直接贴出」 | **真写文件**，那条路径第一次被兑现 |
| 知乎实时检索 | 跑不了（CLI 不在浏览器里） | 能跑（本地有 `scripts/zhihu` 与 `.private/` 凭证） |
| LLM key | 要访问者自己填 | 读项目里的 `.private/llm.env`，访问者不用管 |

所有者 09-12 05:09 那句「一个全量的概念树和自己的概念树才有意思，**因为保留它本地嘛**」——
桌面版是这句话的落点。

## 跑起来

```sh
cd app
npm install      # 第一次会下 Electron 二进制（~124MB）
npm start
```

## 打包

```sh
cd app
npm run pack     # → app/dist/知所栖 135-darwin-arm64/知所栖 135.app
```

**未签名、未公证。** 别人机器上打开会被 Gatekeeper 拦（「无法验证开发者」），
需要右键 → 打开，或 `xattr -dr com.apple.quarantine "知所栖 135.app"`。
要正式分发得买 Apple Developer 账号做签名与公证 —— **本轮没做**。

## 数据在哪

```
~/Documents/知所栖-135/
├── 说明.md            ← 第一次启动自动生成
├── 学习记录.json      ← 「数据 → 把学习记录存成文件」或 ⌘S
└── 产物/              ← skill 跑出来的东西，「存到本地」写这里
```

菜单栏里 `数据 → 打开数据目录`（⌘⇧O）直接开 Finder。

## 验收

```sh
node scripts/test-app.mjs
```

真启动 Electron、连 CDP，验 12 条：桌面版自报、角标、按钮、真写文件、
**路径越界必须拒绝**（`../` 与非法后缀）、学习记录落盘、0 条 JS 报错。

## 边界（照实写）

1. **只打了 macOS arm64**。Windows / Linux / Intel Mac 都没打。
2. **没签名、没公证**，别人打开要绕过 Gatekeeper。
3. **没有自动更新**。
4. **没有 preload / IPC**：窗口直接走本地 HTTP 服务，所以 `contextIsolation` 开着、
   `nodeIntegration` 关着，页面拿不到 Node —— 这是有意的。
5. **服务端口是随机的**，每次启动不一样；菜单里的「数据」能看到当前端口。
