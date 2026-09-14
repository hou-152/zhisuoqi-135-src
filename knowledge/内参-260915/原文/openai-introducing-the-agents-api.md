# 推出 Agents API | OpenAI

- 标题：推出 Agents API | OpenAI
- 来源：openai.com
- 原文：https://openai.com/zh-Hans-CN/index/introducing-the-agents-api/
- 作者：OpenAI
- 类型：文章
- 摘要：OpenAI launched the Agents API to help developers build and run cloud-based intelligent agents easily. The API uses the same Codex framework that powers ChatGPT, supporting long-running tasks and tool coordination. It offers flexible environments and improves efficiency by enabling multiple subagents to work in parallel.
- 收藏于：2026/9/15 03:26:05
- 抓取：Reader 快照（2026/9/15）
- 字数：8168

---
2026年9月10日


[产品](https://openai.com/zh-Hans-CN/news/product-releases/) [API](https://openai.com/zh-Hans-CN/stories/api/)


使用由 OpenAI 全面托管的 Codex 执行框架构建并运行云端智能体



00:0002:18


聆听文章6:04



分享


随着我们将 Codex 和“ChatGPT 工作”推广至全球数百万用户，我们逐渐掌握了让长期运行的智能体在实际应用中高效运作的关键。实用的智能体需要一个强大的执行框架，用于管理上下文、高效使用工具并协调子智能体。它们还需要可靠支持其连续运行数天的基础设施，以及能让它们处理文件、运行代码并保存中间结果的环境。


今天，我们推出公测版 [Agents API⁠](https://developers.openai.com/api/docs/guides/agents-api/overview)，通过简单灵活的 API，将支持 Codex 的同款执行框架和基础设施带给开发者。


执行框架由 OpenAI 托管和维护。智能体的计算环境由你选择：OpenAI 管理的沙箱、自有基础设施，或我们沙箱合作伙伴提供的环境。Agents API 以我们优化后的智能体执行框架和基础设施为基础，为构建智能体提供坚实根基，让你可以专注于打造智能体独有的工具、知识和工作流。



> “使用 Agents API 后，我们的评估分数从 0.71 提升至 0.85。API 提供的子智能体支持非常出色，大幅加快了我们的工作流。过去，在旧架构中观测和编排子智能体相当繁琐，而新 API 将延迟降至原来的四分之一。我们为优化这一点投入了大量时间，而开箱即用的子智能体工作流带来了巨大提升。”

Jack Weissenberger，Ciridae CTO
![应用向 Agents API 发送任务，并接收事件和输出。Agents API 运行托管的 Codex 执行框架，向沙箱发送工具调用并接收工具结果。应用控制自行托管的计算资源。](https://images.ctfassets.net/kftzwdyauwt9/7oiK2YZ2Dx7hujorDOOj6R/47ba63c3fc77253118db0dbba04e19e4/agents-api_16x9_light_1.png?w=3840&q=90&fm=webp)Agents API 采用支持 Codex 的同款执行框架和基础设施，为你的智能体赋能。


只需一次 API 调用，即可构建云端智能体
---------------------


借助 Agents API，只需指定任务、模型、工具和环境并进行一次 API 调用，即可创建可投入生产的智能体：


#### JavaScript



```
  
import OpenAI from "openai";  
  
const client = new OpenAI();  
  
const session = await client.beta.agents.sessions.create({  
  agent: {  
    model: "gpt-6-astra",  
    tools: [  
      {  
        type: "mcp",  
        server_label: "observability",  
        transport: {  
          type: "http",  
          server_url: "https://observability.example.com/mcp",  
        },  
      },  
    ],  
    multi_agent: { enabled: true, max_concurrent_subagents:   
  
  },  
  vault_ids: ["vault_YOUR_VAULT_ID"],  
  environment: {  
    type: "openai_hosted",  
    capability_directories: ["/workspace/capabilities/skills"],  
  },  
  input:  
    "Investigate service-api’s elevated 5xx rate over the last 30 minutes. " +  
    "Delegate deployment, error, and dependency analysis to subagents. " +  
    "Save findings, evidence, and recommended mitigation in /workspace/outputs.",  
});
```

听听客户如何评价 Agents API
-------------------


1 条/ 共 8 条



> “使用 Agents API 后，我们的评估分数从 0.71 提升至 0.85。API 提供的子智能体支持非常出色，大幅加快了我们的工作流。过去，在旧架构中观测和编排子智能体相当繁琐，而新 API 将延迟降至原来的四分之一。我们为优化这一点投入了大量时间，而开箱即用的子智能体工作流带来了巨大提升。”

Jack Weissenberger，Ciridae CTO

> “要推动现实世界中的企业转型，就必须将 AI 部署到各种各样的工作流中。Agents API 提供执行框架，而环境、上下文和用户体验仍由我们掌控。借助我们的 AI 平台 Nexus，如今我们只需数小时，就能在从住宅服务到建筑设计等各个行业部署智能体。”

Rasmus Wissmann，Long Lake CTO

> “Agents API 让我们能够以全新方式思考如何设计复杂的多步工作流。过去，我们需要编写提示词链并自行管理一组工具调用；现在，我们可以像 Codex 在笔记本电脑上运行那样，直接在代码中使用智能体。它已经帮助我们解决了多个问题，否则我们需要为此构建自定义智能体基础设施。”

Cole Striler，WithCoverage 工程总监

> “将案例审核工作流迁移到 Agents API 后，我们发现，在保持现有性能的同时，单个案例的成本降低了 60%，延迟有所下降，Token 效率也显著提升。”

Bhavyansh Sabharwal，SafetyKit 技术人员

> “在测试中，Agents API 应对突发性工作负载的自然流畅程度尤其令我们印象深刻。我们可以将工作分发给数百个智能体，让它们异步运行，随后再收集结果，而不必在负载高峰之间让基础设施闲置。”

Dmitry Khanukov，Dwelly 联合创始人兼 CTO

> “在金融服务领域，赢得客户信任至关重要。OpenAI 的 Agents API 让我们能够构建更可靠的智能体，增强客户在生产环境中使用它们的信心。通过将智能体执行框架与沙箱分离，我们使智能体响应失败的情况减少了 86%。”

Serhii Shchoholiev，Hypha 工程负责人

> “在一个真实且活跃的代码仓库中，Agents API 完成了代码实现、独立审查、问题修复，以及在真实浏览器中的验证。总体而言，智能体展现出了非常出色的工程质量。”

Maks Operlejn，deepsense.ai 高级机器学习工程师

> “在 Nash，我们部署了数千个长期运行的 AI 智能体，负责管理全球物流网络中数亿次配送。OpenAI 的 Agents API 为持续在生产环境中运行的智能体提供了我们所需的持久会话和编排层，用于管理上下文、恢复和多步执行；Nash 则提供工具和执行环境，将这些智能体与现实世界连接起来。这让我们的智能体能够在持续数小时乃至数天的复杂工作流中进行推理、采取行动、恢复并协作。这些智能体已成为生产基础设施，为我们的合作伙伴运行关键任务级物流业务。”

Aziz Alghunaim，Nash.ai 联合创始人兼 CTO
选择智能体环境
-------


不同工作负载需要不同的计算、存储和部署选项。Agents API 让你可以选择适合自身应用的沙箱。


我们正与 Blaxel、Cloudflare、Daytona、DigitalOcean、E2B、Modal、Oracle、Runloop 和 Vercel 等[生态系统提供商合作⁠](https://developers.openai.com/api/docs/guides/agents-api/sandbox-providers)，针对多种需求提供一流的集成方案：


* 全托管环境或在你的 VPC 内部署
* 特定的文件和机密信息存储机制
* 提供多种 CPU、GPU 和内存配置，在性能、冷启动表现和成本方面满足公司的工作流需求。


![沙箱合作伙伴：Modal、Cloudflare、Daytona、Blaxel、Runloop、Vercel、Oracle、E2B 和 DigitalOcean。](https://images.ctfassets.net/kftzwdyauwt9/7C7hj4p2tMhGIzv52HcvNR/f8f03bc716d9ad680b96dce7bfa66ab2/partners-light.png?w=3840&q=90&fm=webp)Agents API 与热门生态系统提供商实现一流集成。


OpenAI 托管的沙箱
------------


对于希望快速上手并高效扩展的开发者，我们还推出了 [OpenAI 托管的沙箱⁠](https://developers.openai.com/api/docs/guides/agents-api/openai-hosted-sandboxes)。它采用了为 Codex 和 ChatGPT 提供支持的同款沙箱基础设施。


OpenAI 负责配置和管理沙箱，为你的智能体提供安全、高性能的环境，以运行代码、处理文件并生成成果。这些沙箱可灵活配置你的文件、软件包、技能和插件，为智能体提供完成任务所需的一切。


借助持续演进的 Codex 执行框架进行构建
----------------------


要发挥模型的新能力，往往需要重新设计执行框架，挤占原本可用于改进应用的宝贵时间。每次发布新模型时，Agents API 都会以版本化方式提供这些能力。我们会与模型同步维护并持续改进执行框架，帮助你的智能体通过每次升级获得更出色的性能。例如，近期对执行框架的改进包括：


### 让智能体在长会话中持续工作


为了支持模型连续工作数小时，我们构建了上下文管理机制，帮助智能体在更长的会话中保留相关信息。当会话接近上下文上限时，Agents API 会[自动压缩⁠](https://developers.openai.com/api/docs/guides/compaction)较早的上下文，同时保留智能体继续工作所需的信息。开发者无需自行实现压缩逻辑，即可构建跨越多个上下文窗口的工作流。


### 帮助智能体高效使用更多工具


Agents API 可帮助智能体找到合适的工具并高效使用。[工具搜索⁠](https://developers.openai.com/api/docs/guides/tools-tool-search)会按需加载相关工具定义，在保留模型缓存的同时减少 Token 用量和成本。工具就绪后，[程序化工具调用⁠](https://developers.openai.com/api/docs/guides/tools-programmatic-tool-calling)可让智能体并行执行调用、串联相关操作，并通过代码筛选或合并结果，从而处理海量数据，同时只将相关结果送回上下文。Agents API 支持 MCP、自定义函数以及网页搜索等内置工具。


#### JSON



```
  
"agent": {  
  "tools": [  
    {  
      "type": "mcp",  
      "server_label": "openai_docs",  
      "transport": {  
        "type": "http",  
        "server_url": "https://developers.openai.com/mcp"  
      }  
    },  
  ]  
}
```

### 让智能体通过子智能体并行处理工作


借助[多智能体支持⁠](https://developers.openai.com/api/docs/guides/agents-api/multi-agent)，Agents API 可将复杂任务拆分为相互独立的部分，并委派给多个子智能体并行处理。每个子智能体都维护各自的上下文，以便专注于分配到的任务；主智能体则协调它们的工作并汇总结果。对于适合并行处理的研究、分析和编码任务，这可以提升速度，且无需你自行构建编排系统。


#### JSON



```
  
"agent": {  
  "model": "gpt-6-astra",  
  "multi_agent": {  
    "enabled": true,  
    "max_concurrent_subagents":   
,  
  }  
}
```

An open-source foundation
-------------------------


The Agents API is powered by the open-source Codex harness, giving developers visibility into the core logic that coordinates model calls, tools, and context. With the Agents API, OpenAI operates and maintains that harness while developers can inspect and learn from its [public codebase⁠](https://github.com/openai/codex).


Start building
--------------


Agents API is available in public beta today to all developers. There are no additional fees for using the Agents API – you simply pay for the tokens and tools your agents use, as outlined on our [pricing page⁠](https://developers.openai.com/api/docs/pricing).


Explore the[Agents API overview⁠](https://developers.openai.com/api/docs/guides/agents-api/overview) to learn more, or follow the[quickstart⁠](https://developers.openai.com/api/docs/guides/agents-api/quickstart) to get started and bring the harness behind Codex into your own agents.


During the public beta, we’ll iterate quickly based on your feedback as we work toward general availability. Let us know what’s working, where you’re running into friction, and what you need to build and run your agents in production.


* [API](https://openai.com/zh-Hans-CN/news/?tags=api)
* [Codex](https://openai.com/zh-Hans-CN/news/?tags=codex)
* [2026 年](https://openai.com/zh-Hans-CN/news/?tags=2026)


作者
--


OpenAI


继续阅读
----


[查看全部](https://openai.com/zh-Hans-CN/news/)


![Now everyone can put data to work — card image](https://images.ctfassets.net/kftzwdyauwt9/6FhMXOSe8XadGwEUev6QjJ/916a64d20bcc59b8619fea1827fa6bd3/put-data-to-work--cover-v001.png?w=3840&q=90&fm=webp)
[Now everyone can put data to work产品2026年9月10日](https://openai.com/index/put-data-to-work/)


![FinServ Blog - Art Card Texture Square](https://images.ctfassets.net/kftzwdyauwt9/6Bcg403pebiJhQdHUS17FK/572e478dc4579deca27c9700c662e908/finserv-art-card.png?w=3840&q=90&fm=webp)
[Introducing ChatGPT for Financial Services产品2026年9月10日](https://openai.com/index/introducing-chatgpt-financial-services/)


![GPT-Live-1 API | Green-blue cover | Option 038](https://images.ctfassets.net/kftzwdyauwt9/1uBabEULLfw3Vb2Gldmyyq/c19c1c121ca403ee8b2703cba18ef82d/introducing-gpt-live-1-green-cover.png?w=3840&q=90&fm=webp)
[Build more natural voice experiences with GPT‑Live‑1 in the API产品2026年9月10日](https://openai.com/index/introducing-gpt-live-1-in-the-api/)
