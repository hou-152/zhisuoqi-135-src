# 知乎开放平台 API 全量实测 · 原始输出

- 实测时间：2026-09-12 01:55:03 CST
- 凭证：`.private/zhihu/access-secret`（项目内，未变更）
- CLI：{"name":"zhihu-cli","version":"0.6.0","os":"darwin","arch":"arm64"} 
- 说明：本文件是**原始输出**，结论见 `docs/知乎API-实测-260912.md`

## 1. quota（本轮测试后，用于反推额度周期）
```json
{
  "Code": 0,
  "Data": [
    {
      "APIID": "global_search",
      "APIName": "全网搜",
      "RemainingQuota": 4999,
      "TotalQuota": 5000,
      "TotalUsed": 1
    },
    {
      "APIID": "zhihu_search",
      "APIName": "知乎搜索",
      "RemainingQuota": 4991,
      "TotalQuota": 5000,
      "TotalUsed": 9
    },
    {
      "APIID": "hot_list",
      "APIName": "热榜",
      "RemainingQuota": 99,
      "TotalQuota": 100,
      "TotalUsed": 1
    },
    {
      "APIID": "question_answers",
      "APIName": "知乎问题回答",
      "RemainingQuota": 99,
      "TotalQuota": 100,
      "TotalUsed": 1
    },
    {
      "APIID": "user_data",
      "APIName": "知乎用户数据",
      "RemainingQuota": 9999,
      "TotalQuota": 10000,
      "TotalUsed": 1
    },
    {
      "APIID": "creator",
      "APIName": "创作能力",
      "RemainingQuota": 100,
      "TotalQuota": 100,
      "TotalUsed": 0
    },
    {
      "APIID": "zhida_openai",
      "APIName": "直答",
      "RemainingQuota": 94,
      "TotalQuota": 100,
      "TotalUsed": 6
    },
    {
      "APIID": "knowledge",
      "APIName": "知识库",
      "RemainingQuota": 498,
      "TotalQuota": 500,
      "TotalUsed": 2
    },
    {
      "APIID": "tools",
      "APIName": "小工具",
      "RemainingQuota": 10,
      "TotalQuota": 10,
      "TotalUsed": 0
    }
  ],
  "Message": "success"
}
```

## 2. search zhihu（产品 /api/search 实际调用的接口）
```bash
./scripts/zhihu search zhihu --query "AI视频 运镜" --count 3
```
```json
{"Code":0,"Message":"success","Data":{"HasMore":false,"SearchHashId":"65747c976fb3551b94d9c6bf20c293f5","Items":[{"Title":"做AI视频还在拆盲盒?手把手教你导演级运镜(附教程) - 知乎","ContentType":"Article","ContentID":"-9080816893363128164","AuthorSignature":"canghecode","ContentText":"这是苍何的第 581 篇原创！\n大家好，我是苍何。\nAI 视频发展至今，早已完成一轮跨越式迭代。\n从早期只能生成3-5秒片段、无声无质感、全程靠疯狂抽卡碰运气，到如今支持30秒长视频、音画同步直出，整体成片效果与实用性，已经实现了质的飞跃。\n但当你看到 AI 视频的时候，几乎还是会马上区分出来是否 AI 生成，原因是 AI 视频的一个核心痛点始终没有被彻底解决：构图、人物姿态、空间布局的精准可控性。\n比如，坐在一张四方桌上对话的两个人，换个镜头，可能就变成一人坐着，一人站着了，也可能会变成分开在两张桌子坐着，又或者四方桌变成长方形的桌子等等，看着就很割裂，\n不过我最近发现了一个好东西，可以完美控制运动路径，运镜过程中空间布局�
```

## 3. search global（全网搜，首次实测）
```bash
./scripts/zhihu search global --query "费曼学习法 间隔重复" --count 3
```
```json
{"Code":0,"Message":"success","Data":{"HasMore":false,"SearchHashId":"51adf191cfa8d37e653aeaef38209fa4","Items":[{"Title":"如何高效有效学习? - 知乎","ContentType":"Answer","ContentID":"-7463044399384586398","ContentText":"它的核心算法十分简单：在你即将遗忘知识点时，及时安排复习。\n这套方法之所以能强化知识连接，是因为每一次“濒临遗忘却成功回忆”的过程，都会加固对应的神经连接。记忆不像硬盘文件，存储完毕就永久固定；记忆更像肌肉，每一次主动回忆，都等同于完成一次力量训练，强化后的神经联结会比之前更加牢固。\n思维导图、费曼学习法、间隔重复，三者都能帮助人搭建知识连接，但存在共同短板：所有连接都是静态、一次性的。\n你画完一张思维导图，文件静置存档，下个月学到全新知识，原图不会自动更新；你用费曼法吃透一个概念，三个月后该领域出现新研究，你的认知不会自动迭代；Anki能帮你记住知识点，却不会主动提醒你：三个月前背诵的概念，和今天学习的内容，是同一事物的两种解读角度。\n传统学�
```

## 4. hot（热榜，首次实测）
```json
{"Code":0,"Message":"success","Data":{"Total":5,"Items":[{"Title":"官方通报「男子称停止资助后遭受助学生质问催捐」为假消息，媒体曝该男子已被刑拘，哪些信息值得关注？","Url":"https://www.zhihu.com/question/2081793015459177603","ThumbnailUrl":"https://pic2.zhimg.com/v2-6b54ed717f4553ef7955c37f55cdb019.jpg","Summary":"姚某某（男，37岁）为博取网络关注、吸粉引流，自编自导、虚构伪造“停止资助某学生后遭对方威胁”不实内容，通过其个人网络账号对外发布，严重误导公众认知，扰乱网络公共秩序。 [图片] 【男子因女生生活奢靡停止助学资助反被威胁？大反转来了！】记者从有关方面获悉，昨天引爆网络关注，还引起多家媒体评论的“男子因女学生生活奢靡停止助学资助，反被女生威胁”的事件，是个假消息。该事件实为该男子自导自演编造，且性质恶劣，他也…"},{"Title":"打假网红铁头敲诈勒索案一审被判八年，伙同他人威胁曝黑料，向带货主播索要数百克黄金，哪些信息值得关注？","Url":"https://www.zhihu.com/question/2081779894636240979","Thumbn
```

## 5. question answers（问题回答，首次实测：可用）
```json
{"Code":0,"Message":"success","Data":{"Items":[{"ContentType":"answer","ContentToken":"2081810615971078356","Url":"https://www.zhihu.com/question/2081793015459177603/answer/2081810615971078356","Summary":"现在造谣成本还是太低了，赌的是大家不会较真，毕竟真介入还要调动很多社会资源，代价太大。 目前媒体报道称这件事是涉事男子自导自演编造的，该男子已被采取刑事强制措施，他也并非自己在社交账号上所宣称的“普通的高中数学老师”。 据悉，自称遭催捐的男子叫姚月茂，目前账号已经被禁止关注了，而且名下关联7家公司，包括一家教育公司，且关联公司税务异常多年0人参保。 [图片] 最近，姚月茂发文称，其常年资助的一位家境不好的学生…"},{"ContentType":"answer","ContentToken":"2081805669624291884","Url":"https://www.zhihu.com/question/2081793015459177603/answer/2081805669624291884","Summary":"破绽在「凹凸有致」。 这名博主名叫姚月茂，前两天这事刚出来的时候，我就鉴定为「茂一杯」。 打造的人设是一个有爱心的、长年捐助贫困学生的某机构名师，结果在聊�
```

## 6. knowledge bases（知识库，首次实测：默认知识库已存在）
```json
{"Code":0,"Message":"success","Data":{"Items":[{"KnowledgeBaseID":"7683722615476527217","Name":"默认知识库","Description":"系统自动创建的默认知识库","Relation":"created","IsDefault":true,"Visibility":"private","ContentCount":0,"UpdatedAt":1789006082}]}}

```

## 7. me contents（用户数据，首次实测：本账号无创作）
```json
{"Code":0,"Message":"success","Data":{"Items":[],"Paging":{"IsEnd":true,"Totals":0}}}

```

## 8. answer 直答：三模型跑同一条「费曼判定」提示词

**任务**：给 3 个概念各 3 条要点 + 一段只讲了「景别」的复述，要求逐概念判定 covered 下标并输出 JSON。
正确期望：shot-size pass=true covered=[0,1]；camera-move / shot-prompt pass=false。

### zhida-fast-1p5

- 响应 `model` 字段：`zhida-fast-1p5`
- `usage` 字段：`None`（直答不返回 usage，无法做 token 成本核算）
- 原始 content：

```
{"result":{"shot-size":{"pass":true,"covered":[0,1]},"camera-move":{"pass":false,"covered":[]},"shot-prompt":{"pass":false,"covered":[]}}}
```

### zhida-thinking-1p5

- 响应 `model` 字段：`zhida-thinking-1p5`
- `usage` 字段：`None`（直答不返回 usage，无法做 token 成本核算）
- 原始 content：

```
```json
{"result":{"shot-size":{"pass":true,"covered":[0,1]},"camera-move":{"pass":false,"covered":[]},"shot-prompt":{"pass":false,"covered":[]}}}
```
```

### zhida-agent

- 响应 `model` 字段：`zhida-agent`
- `usage` 字段：`None`（直答不返回 usage，无法做 token 成本核算）
- 原始 content：

```
{
  "result": {
    "shot-size": {
      "pass": true,
      "covered": [0, 1]
    },
    "camera-move": {
      "pass": false,
      "covered": []
    },
    "shot-prompt": {
      "pass": false,
      "covered": []
    }
  }
}
```

