/* 知所栖 135 · 前端离线开发用的 fetch 拦截器（真结构假内容）
 * 用法：在你的页面里，**在业务脚本之前**加一行
 *   <script src="evidence/mock/mock-fetch.js"></script>
 * 之后 /api/health /api/search /api/llm /api/save 全部走本地 fixtures，
 * 不需要 serve、不需要 API key。要接真接口：删掉这一行即可，业务代码一行不用改。
 * 生成：node scripts/make-mock.mjs [--record]   校验：node scripts/verify-mock.mjs
 */
(function () {
  var F = {
 "GET /api/health": {
  "ok": true,
  "body": {
   "ok": true,
   "llm": true,
   "app": false,
   "dataDir": null,
   "version": null,
   "packaged": false,
   "root": "/Users/housibo/Documents/知乎黑客松"
  }
 },
 "POST /api/search": {
  "ok": true,
  "body": {
   "items": [
    {
     "title": "DeepSeek Harness 首发实测 + 入门教程,夯爆了!梁神我错了 - 知乎",
     "author": "程序员鱼皮",
     "url": "https://zhuanlan.zhihu.com/p/2071615956632319784?utm_medium=openapi_platform&utm_source=cf621feb3f2d",
     "excerpt": "大家好，我是程序员鱼皮。 昨天注定是载入史册的魔幻一天，DeepSeek 同时放了两个大招！ 先是 DeepSeek V4 Pro 正式版上线，紧接着万众瞩目的 DeepSeek Harness 开源。 炸裂！炸裂！炸裂！ DeepSeek Harness 开源的 GitHub 仓库 上线不到 1 天，就冲到了 7 万多 Star，AI 届的顶流果然名不虚传。 这下搞不好 Codex、Claude"
    },
    {
     "title": "AI成功率从20%飙到100%!只需一个Harness文件 - 知乎",
     "author": "新智元",
     "url": "https://zhuanlan.zhihu.com/p/2042188746666370038?utm_medium=openapi_platform&utm_source=cf621feb3f2d",
     "excerpt": "【新智元导读】Anthropic实锤：Claude裸跑模型，9美元全废；但是套上Harness花200美元效果直接起飞。AI效果不好？别再纠结换模型了！OpenAI和Anthropic都在用的Harness工程，一文讲透。 最近，AI圈子里一个逃不开的话题就是Harness。 甚至，连DeepSeek最近也在开始招聘Harness工程师。 那么，到底什么是Harness？ Harness，围绕AI"
    },
    {
     "title": "刚刚,DeepSeek Harness震撼开源:一切皆插件 - 知乎",
     "author": "机器之心",
     "url": "https://zhuanlan.zhihu.com/p/2071362524507853656?utm_medium=openapi_platform&utm_source=cf621feb3f2d",
     "excerpt": "接下来，看看项目结构，非常惊人：仓库已经包含超过 230 个 workspace 成员，代码分布在 packages/、apps/、examples/、python/、native/、vendor/、website/ 等区域。文件系统、终端、子进程、PTY、语言服务器、网页访问、技能、子智能体、工作流、计划模式、会话持久化、设置、凭据、遥测，几乎每一项能力都有自己的包。 如果把普通的 Agent "
    }
   ]
  }
 },
 "POST /api/llm · 失败态": {
  "ok": false,
  "body": {
   "error": "llm-not-configured（设 LLM_API_BASE / LLM_API_KEY / LLM_MODEL）"
  },
  "_why": "服务端未配凭证时 /api/llm 的真实返回。前端照这个做失败态。"
 },
 "POST /api/llm · 1 阅读（skill=dbs-learning）": {
  "ok": true,
  "body": {
   "content": "先确认一下语境：我按「AI Agent 的 Harness」来理解 —— 包在语言模型外面的那层运行时，负责工具调用、上下文组装、权限边界和循环控制。如果你指的是 Harness.io 那类 CI/CD 平台，或者测试领域的 test harness，说一声，梯度会完全不同。\n\n---\n\n## L1｜直觉层：模型是发动机，Harness 是整台车\n\n三个可以直接感受到的锚点。\n\n**一、同一个模型，换一套 Harness 就像换了个物种。**\n\nClaude、GPT、Gemini 这些名字指的是模型。你日常用的 Claude Code、Cursor 的 Agent 模式、ChatGPT 的深度研究，指的是 Harness。\n\n前者是那颗大脑，后者是大脑外面的身体：手（改文件、跑命令）、眼睛（读代码库、看报错）、记忆（跨轮次保留什么、丢弃什么）、刹车（哪些动作要你点头）。\n\n同一颗大脑配不同的身体，干活能力的差距可以超过换模型。\n\n**二、Harness 回答四个问题。**\n\n- 它能碰什么？—— 工具集\n- 它此刻知道什么？—— 上下文\n- 它被允许做什么？—— 权限与沙箱\n- 它什么时候算干完了？—— 循环终止条件\n\n任何 agent 产品，拆开来都是这四个问题的不同答案。\n\n**三、判断标准很朴素：你说一句话，它能自己走多远、走多稳。**\n\n一次问答走 0 步。弱 Harness 走 2 步就要你重新解释一遍。强 Harness 能自己读代码、改代码、跑测试、看到失败、再改，最后把结果交给你。\n\n走多远靠工具和上下文，走多稳靠反馈回路和退出条件。\n\n---\n\n## L2｜机制层：那四个问题是怎么实现的\n\nL2 按一条真实的执行链讲，从模型吐出一个 token 开始，到这次任务结束为止。\n\n**1. 上下文是怎么拼出来的**\nSystem prompt、工具定义、项目文件、对话历史、压缩摘要 —— 它们争夺同一个窗口。窗口是最贵的资源，Harness 的很多设计动作都是在做取舍。\n\n**2. Agent loop 的骨架**\n模型输出 → 解析出工具调用 → 执行 → 结果回灌 → 再输出。这个循环为什么省不掉，以及循环的「退出条件」为什么是最容易写坏的地方。\n\n**3. 工具定义本身就是提示词**\n工具的命名、描述、参数 schema，会直接改变模型的调用行为。工具怎么切分，决定了模型能不能自己组合出复杂动作。\n\n**4. 权限层与失败恢复**\n哪些动作自动执行、哪些要人确认、工具报错之后往上下文里回灌什么。回灌信息的质量，直接决定模型下一步是纠偏还是原地打转。\n\n**5. 外部记忆**\n文件系统、状态文件、todo 列表 —— 窗口装不下的东西放哪，需要时怎么重新取回来。\n\n---\n\n## L3｜应用层：拿它判断和动手\n\n**1. 判断一个 AI 产品为什么「聪明」或「笨」**\n拆成那四个问题逐个看，通常能定位到具体是哪一环掉了。\n\n**2. 手搓一个最小 Harness**\n一个 while 循环 + 一个工具 + 一个退出条件，几十行就能跑起来。跑通了再往上加东西。\n\n**3. 设计自己的 Harness**\n给你的具体场景定工具集、上下文规则和权限边界。写作、研究、内容生产都可以有自己的 Harness。\n\n**4. 评估与迭代**\n怎么知道自己改的 Harness 变好了 —— 需要一组可重复的任务和可检查的产出，否则改动全靠感觉。\n\n---\n\n课题名我记为 `Harness`。开始之前两件事：\n\n1. 当前项目里如果有和 Harness 直接相关的材料（你自己写的、或改过并采用的），我先扫一遍，据此调整起点、压缩基础讲解。没有的话就从零开始搭框架。\n2. 存放位置：这看起来是项目目录的话，我放 `学习课题/Harness/`；否则放 `~/Documents/dbskill-learning/Harness/`。\n\n你回「按项目来」或「从零开始」，我就创建学习计划和 `01.md`。",
   "tokens": 7658,
   "model": "deepseek-flash",
   "skill": "dbs-learning"
  }
 },
 "POST /api/llm · 费曼判定（过）": {
  "ok": true,
  "body": {
   "content": "{\"result\":{\"cm_0a4ca4ce\":{\"pass\":true,\"covered\":[0,1]}}}",
   "tokens": 739,
   "model": "deepseek-flash"
  }
 },
 "POST /api/llm · 费曼判定（有漏点）": {
  "ok": true,
  "body": {
   "content": "{\"result\":{\"cm_0a4ca4ce\":{\"pass\":false,\"covered\":[]}}}",
   "tokens": 1010,
   "model": "deepseek-flash"
  }
 }
};
  var real = window.fetch.bind(window);
  var HIT = {
    'GET /api/health': 'GET /api/health',
    'POST /api/llm': 'POST /api/llm · 1 阅读（skill=dbs-learning）',
    'POST /api/search': 'POST /api/search',
  };
  window.__MOCK__ = F;
  // 想稳定地做出某个状态，就强制某一条样本：
  //   __MOCK__.force('POST /api/llm · 费曼判定（过）')   // 强制通过态
  //   __MOCK__.force('POST /api/llm · 失败态')           // 强制失败态
  //   __MOCK__.force(null)                               // 取消强制
  window.__mockForce = null;
  F.force = function (k) { window.__mockForce = k || null; return k ? 'forced: ' + k : 'cleared'; };
  window.fetch = function (input, init) {
    var url = typeof input === 'string' ? input : (input && input.url) || '';
    var method = ((init && init.method) || (input && input.method) || 'GET').toUpperCase();
    var p = url.split('?')[0];
    if (window.__mockForce && F[window.__mockForce]) {
      return Promise.resolve(json(F[window.__mockForce].body || F[window.__mockForce]));
    }
    if (p === '/api/save') return Promise.resolve(json({ ok: true, path: '(mock) 没有真写文件' }));
    var key = HIT[method + ' ' + p];
    if (key && F[key]) {
      // 费曼判定按复述长短挑「有漏点 / 过」两条样本，方便把两种状态都做出来
      if (method === 'POST' && p === '/api/llm') {
        try {
          var bodyStr = (init && init.body) || '';
          if (bodyStr.indexOf('费曼检验') >= 0 || bodyStr.indexOf('covered') >= 0) {
            key = bodyStr.length > 400 ? 'POST /api/llm · 费曼判定（过）' : 'POST /api/llm · 费曼判定（有漏点）';
          }
        } catch (e) {}
      }
      return Promise.resolve(json((F[key] && F[key].body) || F[key]));
    }
    return real(input, init);
  };
  function json(o) {
    return new Response(JSON.stringify(o), { status: 200, headers: { 'Content-Type': 'application/json' } });
  }
  console.log('[mock] 已接管 /api/*（真结构假内容）。接真接口请删掉 mock-fetch.js 这一行。');
})();
