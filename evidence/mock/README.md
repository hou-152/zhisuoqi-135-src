# evidence/mock —— 前端离线开发包（边 1 的交付物）

**这份是给前端（肖力臣）的。** 拿它做界面，不用等后端、不用 serve、不用 API key。

## 怎么用（两步）

1. 页面里**在业务脚本之前**加一行：`<script src="evidence/mock/mock-fetch.js"></script>`
2. 改界面。`/api/health` `/api/search` `/api/llm` `/api/save` 全部返回本地样本。

**接真接口时删掉那一行就行，业务代码一行都不用改**（这是契约 §二 的意义）。

## 里面有什么

| 文件 | 是什么 |
|---|---|
| `mock-fetch.js` | 拦截器。覆盖四个端点，含「费曼判定：过 / 有漏点」两种样本 |
| `fixtures.json` | 原始样本。每个响应的**真结构**；标 `_mockStatus: unrecorded` 的是没录到的，别当真的用 |
| `screens.md` | 5 屏各吃什么数据（对着契约 §四 看） |

## 想稳定做出某个状态：force()

不靠「复述写长一点」这种碰运气的方式切状态，直接点名要哪一条：

```js
__MOCK__.force('POST /api/llm · 费曼判定（过）')   // 强制通过态
__MOCK__.force('POST /api/llm · 失败态')           // 强制失败态，做降级界面
__MOCK__.force(null)                               // 取消强制
```

## 怎么算通过（两条命令）

```sh
node scripts/verify-mock.mjs          # 60 项：断言 mock 的键与真实代码读的键一致（不需要 serve）
node scripts/verify-mock-browser.mjs  # 11 项：真无头 Chrome，在 about:blank 上验证「真的接管了」
```

第二条是关键：它先证明「没有 mock 时 fetch 到不了后端」，再证明注入后四个端点都通 ——
**「前端不连服务就能做 5 屏」是实跑出来的，不是我说的。**

**通过标准不是「看着对」，是这两条命令绿。**

## 重新生成

```sh
node scripts/make-mock.mjs            # 抽真结构；**已录到的真 LLM 响应会被保留**，不会冲掉
node scripts/make-mock.mjs --record   # 重新录 LLM 响应（需 serve-135 在跑 + 凭证）
```

## 边界（照实标）

- LLM 那两条若显示 `unrecorded`，说明生成时没连上服务；**形状是真的，内容是占位的**。
- 样本内容只用来做界面，**不要当产品输出、不要当实验证据**（AGENTS.md：不得伪造样本或把示例数据当实验结果）。
