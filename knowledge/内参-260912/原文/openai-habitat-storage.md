# Rapidly scaling online storage to serve over 1 billion ChatGPT users（存储平台 Habitat 的扩容复盘）

- 来源：openai.com
- 原文：https://openai.com/index/scaling-storage-one-billion-users-part-one/
- 作者：OpenAI
- 摘要：OpenAI scaled its online storage to serve over 1 billion ChatGPT users by using Habitat, a simple NoSQL API that avoids costly queries. They switched from Python to Rust, making their service faster and more efficient. Habitat works with Azure Cosmos DB and Rockset to handle massive data and complex queries separately.
- 抓取：Reader 快照（2026-09-12）
- 字数：11481

---

2026年9月11日
工程
我们如何利用 Python 改造我们的应用存储平台 Habitat 以应对前所未有的增长。
作者：Jon Lee、Chaomin Yu 和 Ben Ries（技术人员）
加载中…
分享
OpenAI 的所有产品都依赖于快速可靠的数据访问，无论是用户登录、查看 Codex 设置，还是在 ChatGPT 中发起新的对话。这些操作都需要多次独立的数据查询才能使产品做出响应。如果这些请求速度慢，产品运行就会感觉缓慢。如果这些请求失败，产品将完全停止工作。
Habitat 是我们构建的在线存储平台，旨在让 OpenAI 产品能够快速可靠地访问所需信息。Habitat 目前每秒处理超过 7000 万个请求，为每周超过 10 亿用户使用的产品提供支持，覆盖近 40 个地理区域。Habitat 最初于 2023 年的 DevDay 大会上发布，旨在支持 GPT 模型，最初只是一个简单的 Python 客户端库，连接到单个数据库。如今，它已发展成为一个复杂的分布式系统，能够处理超过 500 PB 的数据。
图 01 · 什么是栖息地？
在线存储平台
Habitat 是我们构建的在线存储平台，以便 OpenAI 产品能够快速可靠地访问所需信息。玩
要求
回复
变化（美国疾病控制与预防中心）
客户
在线存储平台
存储资源
ChatGPT
API
法典
内部服务
还有更多
栖息地
缓存缓存
ACL 政策授权
部署和数据驻留数据驻留
加密数据安全
隔离多租户
限速请求整形
路由模式查找 · 数据驻留
Azure Cosmos DB在线存储
纳米基地在线存储
瓦尔基缓存
BLOB 存储存储资源
美国疾病控制与预防中心服务变更数据采集
数据砖
Rockset
卡夫卡
还有更多
构建和运营如此大规模的基础设施绝非易事，但也并非特别具有挑战性。我们面临的独特之处在于，为了支持用户和产品需求的惊人增长，我们必须以前所未有的速度进行扩展，同时还要构建一个成熟的平台。通常，系统工程师会以 10 倍的规模进行构建，并希望它能维持几年，同时为下一个 10 倍的增长做好准备。而我们，在过去三年中，每年都实现了超过 10 倍的增长。因此，构建和运营 Habitat 变成了一系列策略性决策和步骤：深入了解每个组件的底层运作，以最大限度地发挥现有技术栈的性能，同时应对存储和计算能力的瓶颈，为基础性投资争取时间。
7000万+
每秒请求数
1B+
每周都有人
500 PB+
数据
随着 OpenAI 的发展，Habitat 也必须随之成长：首先是要足够可靠，能够应对关键任务型产品的流量；其次是要足够快，能够满足全球用户的需求；最后，还要能够灵活地进行大规模部署。本文是关于我们如何扩展在线存储的两篇系列文章的第一篇。在本文中，我们将分享 Habitat 的演变历程，解释我们为何将其从一个库转变为一项服务，以及如何将一个用不常见的服务栈语言——Python——编写的服务扩展成一个可靠的存储平台层。
在后续的文章中，我们将详细介绍我们如何大规模地实现多租户可靠性、我们优化读取性能的分层策略，以及我们如何扩展与 Azure Cosmos DB 的合作关系，以可靠地应对前所未有的需求。
什么是栖息地？
Habitat 的诞生源于一个简单的理念：产品工程师不应该需要考虑数据库管理。Habitat 最初于 2023 年 DevDay 上发布，旨在为 GPT 提供支持。它是一个小型 Python 库，与 ChatGPT 的主服务器交互。它支持少量操作，这些操作在底层映射到数据库应用程序 Azure Cosmos DB。
该库的作用是为产品团队提供一种简单的方法来存储和检索数据，而无需掌握底层细节。Habitat 负责处理必要的工作：确定涉及的数据类型、数据的来源（或去向）、请求是否被允许等等。
产品工程师无需关心架构查找、路由、授权、加密、序列化、请求整形和连接池等问题。他们甚至无需考虑数据来源：Azure Cosmos DB、缓存或其他类型的存储。
图 02 · 栖息地服务
简化的栖息地申请流程
通过将存储逻辑解耦为一个独立的服务，我们建立了一个用于部署、可观测性和平台增强的单一控制点。玩
要求
回复
客户
OpenAI
Azure Cosmos DB
Habitat 客户端 SDK
使者
栖息地服务流程 1
栖息地服务流程 2
栖息地服务流程 3
栖息地使者
habitat-cosmos-db-us0
habitat-cosmos-db-us1
habitat-cosmos-db-eu0
尽管 OpenAI 并没有集中推动放弃使用自助式 Postgres 和 Azure Cosmos DB，但这个 Python 库运行良好，Habitat 在 OpenAI 的产品工程师中迅速得到采用。
随着产品需求的演变，产品开发人员甚至可以轻松地向共享库添加对客户端缓存、压缩或加密等功能的支持。
构建一个服务，以更好地支持多种复杂产品。
到 2025 年年中，Habitat 作为客户端实现已达到其极限。随着 Habitat 层变得越来越复杂，OpenAI 的服务数量也不断增加，向后兼容的协议变更已变得不可行。
在某个案例中，我们希望通过将最关键的数据集迁移到一组区域分布的 Azure Cosmos DB 帐户，来缩小单个区域中断对数据集的影响范围。要实现这一更改，需要在客户端引入额外的路由逻辑，并通过功能标志禁用该逻辑，确保所有客户端都已部署该更改，然后再启用该功能标志。
协调数十个服务的部署并与各个团队合作完成上线工作耗费了数天时间。在启用该功能之前，我们意识到需要引入一些影子机制来确保分片逻辑的正确性。这又花了几天时间才完成部署。修复我们发现的错误又耗费了几天时间。最终，我们准备启用该功能，却发现其中一个团队出于与之前存在缺陷的客户端无关的原因回滚了服务，导致了我们竭力避免的服务中断。
客户端库的变更需要数十个服务进行复杂的协调，而这一过程变得越来越脆弱、效率低下，且容易出现运行故障。为了减少未来部署中的这种运行分散性，我们决定将 Habitat 分离到一个独立的服务中。
通过将存储逻辑解耦为独立服务，我们建立了一个统一的控制点，用于部署、可观测性和平台增强。这样一来，我们无需管理分散的更新，而是可以集中实施改进，从而立即为每个 OpenAI 产品带来益处。
集中式服务为我们提供了一个统一的控制点，从而能够提供最强大的数据安全和隐私保护机制。通过 Habitat 服务，我们可以集中执行访问控制策略、执行审计日志记录，并限制对底层存储资源（例如 Azure Cosmos DB）的访问。Habitat 在保护用户数据、防止来自外部、内部和代理的未经授权访问方面发挥着至关重要的作用。
大规模部署 Python 服务
我们知道我们需要一个服务，但即使 Python 作为服务会带来额外的开销，我们也不想立即放弃 Python。与本地库执行相比，使用 Python 来运行高吞吐量服务会增加网络延迟，并显著增加 CPU 和内存扩展成本。此外，我们意识到 Python 的低效性在 100 倍规模下将无法接受，最终几乎肯定需要重写。
然而，我们当时将此视为一种战略性的技术债务承担。我们的首要目标并非成本或资源优化，而是为产品开发人员扫清障碍，实现平台稳定性。通过接受短期内Python服务带来的性能妥协，我们得以优先应对更为紧迫的挑战，建立核心API，并构建强大的基础设施。
我们还做出了一个经过深思熟虑的赌注：我们自身编码模型的快速发展将在未来简化技术路径。我们预测，到需要完全从 Python 迁移的时候，Codex 和 GPT 将会使这种迁移成为可能。最终，这个赌注被证明是正确的。
将 Habitat 作为 Python 服务运行，从性能角度来看并非最优，但却是必要的选择。Python 的确能让我们快速开发，但这并不意味着我们可以不顾一切地接受显著更高的延迟。当平均每个用户请求都会导致数百次数据库调用时，用户感受到的延迟往往是最慢的那次。我们发现，在这种规模下运行 Python 服务的主要挑战在于如何管理这些尾部延迟。
跟踪 asyncio 延迟
Asyncio 可以帮助 Python 并发执行 I/O 密集型工作负载，但无法绕过 Python 全局解释器锁 (GIL) 并提供 CPU 并行性。除了 I/O 密集型请求代理之外，Habitat 还处理许多 CPU 密集型任务和后台任务：路由、压缩、加密、校验和计算、下游健康检查、请求影子和对冲。
由于我们的服务中包含大量 CPU 密集型工作负载和后台任务，asyncio 调度延迟很容易导致尾部请求延迟过高。在初始服务上线前进行调优时，我们从延迟为 p99 及以上的请求跟踪中发现，虽然下游存储响应迅速，但请求经常会因为等待负责解析响应的协程重新调度而停滞。
图 03 · 跟踪 asyncio 延迟
并发性不等同于 CPU 并行性
Python 的 asyncio 允许并发处理请求，但每次 CPU 线程上只能执行一个请求。当需要处理大量 CPU 工作时，这会对请求延迟产生显著影响。重播暂停CPU请求/响应处理Python 网络读写等待宇宙的到来
低 CPU 占用率简要的 Python 步骤；I/O 等待重叠
高CPU占用率冗长的 Python 步骤会一直等待响应准备就绪。
对于 OpenAI 的 Python 服务，我们发现，除了测量内存、CPU、网络和磁盘使用情况的标准利用率和饱和度指标外，监控 asyncio 循环及其繁忙程度，然后进行相应的调整也至关重要。
通过定期调度后台任务并记录预期执行时间和实际执行时间之间的差异，我们可以实时地实证测量事件循环调度延迟。在高利用率且存在大量耗时任务的情况下，即使每个进程的并发请求数量不多，也足以产生显著的调度抖动，可达数百毫秒，在某些极端情况下甚至可达数秒。
因此，我们采取的办法是让每个进程只处理少量并发请求，然后大规模扩展 Python 工作进程的数量。
减少功能标志配置中的尾延迟
在我们最初的服务发布过程中，我们通过实时服务 CPU 分析发现，导致 asyncio 延迟高（以及由此产生的尾延迟高）的一个根本原因是：通过 Statsig（一个管理功能标志的工具，可用于运行 A/B 测试等）定期解析我们的功能标志配置的 JSON。
默认情况下，Statsig 配置为每分钟轮询一次更新的配置，且轮询频率无抖动，配置包含了所有服务的所有生产规则。此外，架构设计上决定每个 Pod 运行最多 8 个 Python 进程，以提高 CPU 使用率并降低延迟。综合来看，这意味着每个 Pod 每分钟都会出现某个时刻，所有工作进程停止处理正在进行的请求，转而将 CPU 周期用于解析一个庞大的配置文件。
CPU 分析帮助我们找到了问题的根本原因，修复方法也很简单：部署一个更小的目标配置，延长刷新间隔，并给后台任务（例如这些任务）添加一些抖动。
负载均衡和连接池管理
为了保持较低的 asyncio 延迟，保持服务器进程间请求的良好负载均衡也至关重要；如果不进行调整，连接池最终可能会与此背道而驰。
使用客户端连接池时，单个客户端进程即使发出大量并发请求，也可能只会建立少数几个服务器连接，从而将所有负载都分配给少数几个进程。在调整负载均衡方式之前，我们的服务利用率波动很大，一些尾部进程处理的并发请求数是平均水平的 5 到 10 倍。
我们在一次偶然事件中发现了这个问题：尽管我们停止了导致部分服务过载的客户端，但部分进程在突发流量过后仍然处于降级状态。事实上，我们注意到这些进程出现了失控降级，接收到的请求越来越多，直到我们重启它们为止。一旦某个 Pod 过载，某些行为就会将更多流量集中到过载的 Pod 上。我们的一些团队成员在之前的工作中已经熟悉这类故障：亚稳态故障。。
我们怀疑是连接池的问题，并通过限制最大连接重用持续时间来验证这一怀疑，结果确实有效缓解了性能下降，并证实了我们的调查方向。进一步调查发现，Python 的 aiohttp TCPConnector 默认采用后进先出 (LIFO) 的连接重用机制：即选择最近返回的连接用于下一个请求。这通常是一个合理的默认设置：重用最近的连接可以避免为处理突发流量而创建的额外连接超时，从而减少维护额外连接的开销。但在这种情况下，它却导致了我们遇到的亚稳态故障。在请求激增期间，对速度较慢、负载过重的服务器的请求会稍后才将连接返回到连接池，因此后续请求会更频繁地选择这些连接，从而逐渐将更多流量集中在已经不堪重负的 Pod 上。将连接池修改为使用先进先出 (FIFO) 的连接重用机制打破了这种反馈循环，甚至还降低了我们稳定状态下的请求波动。
图 04A · 客户端连接池
后进先出法（LIFO）将新工作送回慢速流程。
在请求激增之后，速度较慢的服务器会最后才将连接返回连接池。后进先出（LIFO）机制促使更多工作集中在这些速度较慢的服务器上进行。重播暂停
初始爆发到达 A、B 和较慢的过程 C。01初始爆发02重用连接03结果
图 04B · 客户端连接池
先进先出（FIFO）打破了连接重用反馈回路。
FIFO 在突发事件后能保持更多活跃连接，但能公平地在所有服务器上平衡工作负载。重播暂停
初始爆发到达 A、B 和较慢的过程 C。01初始爆发02重用连接03结果
如今，我们主要依靠 Istio 和 Envoy 在整个 OpenAI 基础设施中提供连接池和更好的服务器负载感知均衡策略，从而完全避免这个问题。
避免下游资源遭受洪水侵袭
调整为降低 asyncio 延迟并拥有如此多的 Python 进程的一个副作用是，很容易使下游依赖项被大量的连接压垮（被称为“雷霆之群”）。
A regular daily deployment—if not tuned to be slow—can cause significant CPU churn from connection cycling. Or a connection leak can take out the network by saturating the NAT gateway. These are not uncommon problems for other services too, but the threshold for triggering is lowered significantly by having an order of magnitude more processes, often saturating network related resources that clients are not expecting to need to handle in a steady state based on pure throughput alone.
We also rely on Envoy to maximize our connection fan-in. We use it to upgrade Python’s HTTP/1 connections to HTTP/2 to take advantage of multiplexing and then to pool those connections and extend connection lifetimes. Envoy also gives us a central place to implement rate limits and circuit breakers that would be less effective in each standalone Python process.
Figure 05 · Connection fan-in
The same requests, fewer connections
Connection pooling and HTTP/2 connection multiplexing help reduce connection load on downstreams.ReplayPauseRequestResponseIdle keep-alive
Why Habitat does less
One reason we could scale Python this far was Habitat’s constrained API, which keeps request cost predictable. Rather than allowing clients to construct arbitrary SQL queries that could result in large table scans or joins across many tables, Habitat exposes a simple NoSQL API. The lack of a powerful API is an explicit tradeoff in Habitat’s design.
We aim to optimize for simple, predictable, constant-work requests. In our experience, these systems are substantially easier to scale and difficult to get wrong or misuse. Requests with unpredictable fanout are operationally dangerous: they complicate isolation, load balancing, and introduce latency cliffs that are hard to scale for both the service and its clients.
Before we moved to Habitat and Azure Cosmos DB, most of OpenAI’s online data was stored on Postgres. At that time it was easy to review all query and schema changes to make sure they were well-behaved and operated against indexed data before shipping to production. As the team and products grew, this quickly became unmanageable and was a frequent cause of outages where a single expensive new query on a hot path took out the database.
The problem here is in cost imbalance: it is cheap and easy to write SQL queries that are expensive and hard to run. In Habitat, we avoid this and make expensive queries exceedingly obvious client-side. There are no unbounded queries that can overload Habitat and complex joins and graph traversals require product teams to do some of the heavy-lifting which helps overall optimize for more efficient designs.
Habitat exposes a NoSQL API modeled around client-defined object and edge types, inspired by TAO⁠. Clients predefine objects and edges and how they relate to each other, but not the content of each type. The resulting relationships resemble a graph, but Habitat itself does not support typical graph traversal queries outside of querying direct edges of a particular object.
We partition this graph so that each object and its corresponding edges are colocated in a storage-level partition, but we make no concerted database-level effort to colocate objects and the remote objects to which their edges point. The result is that the model easily partitions for horizontal scalability, but graph traversals are inefficient since any particular hop between objects may require fetching from two entirely different Azure Cosmos DB accounts stored in different regions.
For clients with more complex querying needs, we do provide an offline secondary view of Habitat exposed via Rockset. We use change data capture (CDC) to stream changes from the online storage out to isolated Rockset instances in near-real-time. Each client team is responsible for scaling their own Rockset instance for their complex querying needs.
This Rockset provisioning introduces extra friction to our clients, but we think is the right tradeoff to make at this particular moment: making simple queries the default while providing an escape hatch for those who need complex queries. This design isolates our online storage from read-heavy analytical and search workloads.
Migrate from Python to Rust
Deferring a Python rewrite for a year allowed us to focus on more urgent and impactful challenges during our hypergrowth. With the platform maturing and our growth continuing to accelerate, and being the second largest service by core count at OpenAI (and fourth for our Envoy footprint), it was finally time to move past Python. At its peak, Python helped us serve more than 20 million requests every second.
In Q2 2026, with just 2 engineers, Codex, and GPT‑5.5, we were able to rewrite the entire service in Rust. This new Rust service is now handling 95% of our production requests; we’ll be deprecating Python entirely in the coming weeks. Our data shows the Rust service is 6x more CPU efficient and 15x more memory efficient than the Python version, with significantly lower average and tail latencies. We plan to share more learnings in a future blog.
Optimizing our database layer, Azure Cosmos DB
The Python—and now Rust—service is only one facet of Habitat. In part II of this series explaining how we rapidly scaled our online storage to serve over 1 billion ChatGPT users, we’ll talk about the storage layer and how Habitat serves more than 500 petabytes and over 70 million requests every second.
If you want to work on OLTP systems at frontier scale and are interested in this kind of engineering, check out this open role on our team⁠.
2026
ChatGPT
Author
Jon Lee, Chaomin Yu, Ben Ries
Keep reading
View all
Jalapeño 的首批结果显示，其在人工智能推理方面拥有业界领先的速度和效率。
工程2026年8月25日
与 GPT Live 进行持续语音交互
工程2026年8月3日
GPT-5.6 如何将前沿智能与前沿效率融合
工程2026年7月29日
