# 都承诺提供6GW的运维能力（六种已部署AI芯片架构的理念、扩展与软件栈）

## 一句话主旨
看懂AI芯片只需四问：数据住哪、如何流向计算、算什么、如何互联。

## 作者试图回答的问题
在计算机架构寒武纪式爆发的数十种AI芯片架构中，哪些真正部署了？它们各自的理念、架构、向上/向外扩展方法与软件堆栈有何不同——亦即每家如何解决内存墙、赢下数据搬运游戏？子问题：训练/预填充与解码的负载差异（GEMM 对 GEMV）如何决定架构取舍。

## 三级论证骨架

### 一、问题设定：AI 计算是矩阵乘法，瓶颈在数据搬运
#### 1.1 架构寒武纪已成现实，但实际部署的只有四类
- 2018 年 Hennessy/Patterson 图灵演讲预言需要特定领域架构（DSA）：单线程 CPU 性能年增长从 52% 跌至 3%，TPU v1 推理吞吐是 CPU 的 29 倍、能效高 80 倍。
  - 原话：“未来十年将迎来计算机架构的寒武纪式爆发。”如今 GPU、TPU、LPU、NPU、晶圆级引擎、可重构数据流、神经形态、光子、模拟计算等数十种在研。
  - 已实际部署的：GPU（NVIDIA、AMD）、脉动阵列加速器（TPU、Trainium）、Cerebras 晶圆级引擎、Groq LPU。
- 市场格局：英伟达遥遥领先；AMD 获 OpenAI 与 Meta 各 6GW 运维能力承诺；TPU 训练 Gemini、将为 Anthropic 提供至多一百万芯片，Anthropic 也在超一百万 Trainium 上跑 Claude；Cerebras 为 OpenAI 提供推理；Groq LPU 并入英伟达（性质见第七节与边界）。
#### 1.2 负载形状决定矩阵乘法形态
- 训练与预填充把大量词元堆叠到同一权重矩阵上：每层都是大规模 GEMM、算术强度高；解码自回归、一次一词元，矩阵乘退化为矩阵向量乘（GEMV），算术强度比预填充低几个数量级，且生成一个词元要完整遍历全部权重与 KV 缓存。
  - 推理系统靠堆叠词元恢复强度：连续批处理（多用户解码步骤叠一起）、推测解码（每次请求 K 个草拟词元一次验证）、多词元预测（同样技巧内建于模型）。
  - 连续批处理下，长上下文解码的带宽限制从权重带宽转为 KV 缓存带宽。
#### 1.3 内存墙与四个问题（全文的组织框架）
- 内存墙：计算能力指数增长，内存带宽没有相应提升。
- 理解一颗芯片归结为四问：数据住在哪、如何搬到计算单元、计算单元长什么样、规模上芯片之间如何对话。

### 二、NVIDIA：可编程大并行 + 硬件一致性
#### 2.1 万线程可编程机，矩阵乘越做越大、越做越轻
- 哲学：带数千线程的可编程芯片、由主机 CPU 编排、经 CUDA 暴露，是跑可并行负载的正确机器；同一颗芯片训练、推理、渲染、科学仿真。
  - SM 数量逐代增长：V100 80 → Rubin 224；transformer 块约 99% FLOPs 是矩阵乘，算力压倒性来自 Tensor Core。
- 六代 Tensor Core 的共同轨迹：矩阵乘始终活在 warp/线程层级里，但发射它所需的线程越来越少、发射与执行解耦——`mma.sync`（warp 32 线程集体同步）→ `wgmma`（128 线程 warp-group 异步、立即返回）→ `tcgen05.mma`（单线程发射、操作数全走共享内存描述符、累加器 D 落进 TMEM、`mbarrier` 通知完成）。
  - 解耦是 attention 内核高效的结构：矩阵乘在飞时 warp 可跑 softmax、打掩码、预取下一块（FlashAttention-3/FA4 依赖矩阵指令不阻塞 warp）。
- 内存层级：HBM → L2 → L1/SMEM → 寄存器文件，Blackwell 加第五层 TMEM（每 SM 256 KB、专存 MMA 累加器）；搬运逐代从 warp 卸下：同步 load → `cp.async`（绕过寄存器）→ TMA（专用 DMA 引擎、一个线程交多维 tile 描述符、支持集群组播）→ Blackwell 直载 TMEM。
  - Hopper 时代编程惯用法 warp specialization：生产者 warp 连发 TMA 加载，消费者 warp 对新到的 tile 发 `wgmma`，`mbarrier` 做 warp 粒度握手。
  - 精度逐代减半，每代买约 2× 每瓦吞吐：FP16（损失缩放）→ TF32/BF16/2:4 结构化稀疏 → FP8（Transformer Engine 逐层自动缩放）→ FP4 + MX 微缩放；B100/B200/B300 是两颗 reticle 极限 die 经约 10 TB/s NV-HBI 缝成一个逻辑 GPU。
- 五个赌注：可编程优先（负载是移动目标）；大线程过量藏延迟（每 SM 至多 64 常驻 warp）；矩阵乘包在 warp 抽象里（单 kernel 融合 matmul/softmax/逐元素）；内存层级显式交给程序员（SMEM/TMEM 具名 scratchpad + 异步机制）；接受并摊销 SIMT 税。
#### 2.2 向上 NVLink+NVSwitch（一致性），向外 InfiniBand/RDMA（不一致）
- NVLink 本身只是点对点；NVSwitch 交叉开关让每对 GPU 同时全带宽互通、硬件管地址转换与一致性：一块卡上的 load/store 可瞄准另一块卡的 HBM。
  - NVL72：72 GPU 位于一排 NVSwitch 之下，5,184 根无源铜缆盲插背板、约 130 TB/s all-to-all，与同等光纤方案相比省约 20 kW 收发器功耗；铜在 2 米内赢功耗/成本/信号完整性，"beyond that, the bits have to go on glass"。
  - 机架演进：GH200（Grace+H100 经 NVLink-C2C 900 GB/s，去掉 PCIe host-device 跳）→ GB200 NVL72（72 GPU + 36 Grace、13.5 TB HBM + 17 TB LPDDR5X 成一个平坦一致地址空间）→ NVL144（2026，同 Oberon 机架、铜缆不用加长只提速）→ NVL576/Kyber（2027，144 个四 die 封装 576 GPU die，Kyber 机架约两倍高，专为让每条 NVLink 路径留在无源铜可达范围）。
- 向外：购自 Mellanox 的 InfiniBand 栈，不一致——节点各持地址空间，数据只经软件发起的 RDMA（通常包在 NCCL 集合通信里）。
  - DGX SuperPOD：8 个 NVL72 机架经 Quantum-X800 成 576 GPU 单调度器；每 GPU 配 ConnectX-8 800 Gbps（比每 GPU NVLink 尾一个数量级带宽、延迟纳秒升微秒）+ BlueField DPU 卸载存储/网络/安全；要以太网有 Spectrum-X。
  - 铜转玻璃发生在机架边界：跨机架 800 Gbps 只能上 OSFP-RHS 可插拔光模块（数万个模块、仅激光就 tens of kW）；Rubin 把光收进交换 ASIC——Quantum-X/Spectrum-X Photonics 共封装光学（TSMC COUPE），宣称激光少约 4×、链路功耗低约 3.5×。
- NVLink Fusion 向第三方 CPU/XPU 开放向上扩展 fabric。
#### 2.3 护城河不在 CUDA 本身，在二十年第三方生态与人
- 2007 年以来抽象几乎未变：任何历史 CUDA kernel 都能在 Blackwell 上编译运行；连续性既是护城河也是约束——依赖代码太多，SM 不能推倒重来。
- 栈（cuBLAS/cuDNN/CUTLASS/TensorRT-LLM/PyTorch/Triton/JAX）大部分是英伟达不付钱的人写的；FlashAttention 四代每代都为最新硅手调、移植到别家滞后数月至数年。
- 英伟达还随硅一起出货人力：把自家工程师嵌进前沿实验室写 kernel、逐代调优。
  - 换掉 NVIDIA = 重写 kernel 与库 + 重训整个工程队伍的思维模型 + 失去坐在楼里的英伟达工程师。

### 三、Google TPU：矩阵乘机器 + 编译器即调度器
#### 3.1 脉动阵列与无缓存的芯片
- 哲学：不做万用可编程芯片，专注一个原语（大脉动阵列上的稠密矩阵乘），让 XLA 编译器提前规划每个周期、每个字节；无硬件调度器、无缓存、无线程/warp。
- MXU 权重驻留数据流：B 的值一格一权预载，激活从左缘流入、每周期推进一列、部分和向下进累加队列；数据进阵列后零访存。
  - 物理依据：乘法本身几皮焦，访存每笔贵 100–1000 倍能量——阵列用接线把复用焊进硅里，而不是靠缓存仲裁。
  - 代价是 underfill：256×256 阵列跑 128×128 浪费 75% 硅，XLA 按 128（v6e+ 为 256）的倍数 tile/pad，模型代码按这些量子写。
- 全芯片一个 VLIW 发射面：Scalar Unit 每周期拉一条 322-bit 束、本地执行两槽、把其余六槽分派给 VPU/访存 DMA/MXU 队列；无指令缓存缺失、无 warp 调度器、无乱序引擎、无分支预测器——编译器即调度器，省下的硅面积换成 MAC。
- 片上内存全软件管理：VMEM（喂 VPU 与 MXU 输入队列）/CMEM（HBM 与 VMEM 间的 SRAM 中转）/SMEM，张量编译期钉死在某层；硬件不预取、不逐出、不维护一致性——编译器排对了对列永不停摆，排错了没有退路。
  - 推理特化 v8i 把 VMEM 扩到 384 MiB，专为把整个 KV 缓存放片上。
- 阵列形状不对的负载旁路处理：SparseCore（v4 起）吸收 embedding 查找这类不规则 scatter/gather，embedding 重模型 5–7× 加速、只花约 5% 面积与功耗；v8i 删掉 SparseCore、在 I/O chiplet 上放 CAE 吸收自回归解码期的集合通信——同一思路换了个问题。
- 数值：v2 起 BF16 为训练标准格式（FP32 动态范围、一半内存、无需损失缩放）；Ironwood 加 FP8；v8 加 FP4 + MXU 内块缩放乘法（省掉 VPU 反量化开销）；所有现代 TensorCore 硬件支持随机舍入，保低精度长训的期望值。
#### 3.2 扩展：消息传递 + 环面 + 光路交换
- ICI 与 NVLink 相反：无远程 load 语义、无缓存一致性、无交叉开关，多芯片操作全是 XLA 编译的显式集合通信；向上扩展域不靠交换 fabric 而靠环面（芯片直连邻居 + 边回绕），效率芯片 2D、旗舰 3D 交替。
- Palomar OCS（3D-MEMS 光路交换）是英伟达没有的部件：微镜物理转动把任意输入光纤接到任意输出。
  - 重配置是毫秒级而非纳秒级，但 OCS 是电路交换：开工选好拓扑跑一周，再为下一负载重配。
  - 一个部件坍缩三个问题：按负载重配拓扑（扭曲环面 bisection 提升至多 70%）、按需切分子 pod、容错（芯片坏死时光路换入备用 cube，运行不丢 ICI 域）。
- 规模：superpod 是向上扩展单位，比 NVL72 大两个数量级——Ironwood 9,216 芯片（144 个 64 芯 cube）= 1.77 PB HBM（约 68 PB/s）、42.5 ExaFLOPS FP8；8t 拉到 9,600 芯片、121 ExaFLOPS FP4。
  - TPU 8i（Zebrafish）为 MoE 推理弃环面改 Boardfly 分层拓扑（4 芯环 → 8 板组 → 至多 36 组经 OCS 相连）：1,024 芯片 3D 环面 16 跳直径压到 7——环面擅长近邻集合通信，MoE expert routing 是 all-to-all、最坏情况。
- 光路交换原语从机架用到楼栋：Jupiter 数据中心 spine 自 2022 年起全光（Apollo OCS）——这是别家没有的架构签名。
  - 8t 起向外拆成两张网：东西向 TPU 流量走 Virgo（平坦两层非阻塞、任何 TPU 距任何 TPU 至多两个交换跳、13.4 万+ 芯片、47 Pb/s bisection），南北向（存储/通用计算/跨站）留在 Jupiter；各层可独立演进。
- Multislice + Pathways：一个 SPMD 程序跨多 pod 切片，编译器发射分层集合通信（片内 ring all-reduce、切片间高层 reduce）把慢 fabric 上的流量压到残差；Pathways 单客户端虚拟化多个 ICI 岛、gang 调度、弹性训练（切片坏了 OCS 重塑拓扑、从 checkpoint 恢复）。
  - Gemini Ultra 是首个跨多个数据中心训练的前沿模型。
#### 3.3 软件栈：编译器驱动的极端
- 编译路径 JAX → JAXpr → StableHLO → HLO → LLO → VLIW 束：算子融合（中间结果不落 HBM）、布局分配（2D 寄存器 + 2D 脉动输入，比 1D SIMD 难得多）、缓冲分配、SPMD 分区、VLIW 排程全归 XLA；没有硬件兜底。
  - 中心取舍：XLA 不手调就更接近理论上限，但关掉剩下的差距也更难。
- 多芯片是编译器问题：GSPMD（被 MLIR 系的 Shardy 取代，2026 年初成默认）按声明式注解传播分片、自动插集合通信；wrong 时 shard_map 落到手动 SPMD。与 PyTorch FSDP/DeepSpeed 的运行时包裹相反。
- 逃生舱 Pallas（TPU 版 Triton，经 Mosaic 后端）；上层库清一色 JAX 原生（Flax NNX/Optax/Orbax/MaxText/MaxDiffusion）；torch_xla 是二等公民（LazyTensor 追踪），vLLM TPU 干脆把所有模型统一降到 JAX→XLA 路径，TorchTPU（2026-04）在补原生体验。
- 生态集中而非蔓生：XLA/JAX/Pallas/MaxText/Pathways 几乎全由 Google 自己开源、与硅同步演进；第三方 kernel 远少于 CUDA——负载长得像 Gemini 时护城河深，长得怪时护城河薄。
- 哲学句：编译器是调度器、环面是拓扑、光交换是通用可重构基底——从机架到数据中心每一层。

### 四、AMD：保守计算单元 + 激进封装 + 开放标准
#### 4.1 CU 十余年不变，矩阵指令停在 wavefront 域
- 分工与 NVIDIA 相反：NVIDIA 的雄心在 SM 内部（逐代加新原语），AMD 自 GCN（2012）起保持 Compute Unit 保守，把再投资押在封装上（HBM 容量、3D 堆叠、CPU+GPU APU、开放生态）。
- MFMA 矩阵指令每代更快、格式更宽（FP32/FP16/BF16/INT8 → 全速率 FP64 矩阵 → FP8/2:4 稀疏 → FP4/FP6/OCP MX、可混 A/B 精度），但发行者始终是整条 wave64：操作数来自 wavefront 的寄存器文件，没有跟上 NVIDIA 的 warp → warp-group → 单线程异步轨迹。
  - 两个代价：发散（半空 wave64 空转 32 lane，warp32 只空 16）；重叠（发矩阵乘的那条 wave 无法同时干有意义的向量活，跨 wave 重叠要在软件里用手搭的 wavefront 屏障凑，更脆、更占 wave 槽与寄存器）。
  - 代价随负载而变：纯稠密 GEMM（大 batch 训练内循环）在矩阵乘期间本就没事可做，异步无益——AMD 在 exascale HPC 领先的恰是这类（Frontier/El Capitan）；attention 内核（FA3/FA4）把矩阵乘与 softmax/掩码/KV 读交织在一起、异步重叠就是内核结构本身，AMD 得手工重建流水线，因此落后；MoE dispatch、paged attention、speculative decode 同属这一营。
#### 4.2 内存与封装是主战场
- 内存赌容量：2021 年起 HBM 每代持平或超过当代英伟达旗舰（32→288 GB），赌推理越来越受容量约束；另加 256 MB Infinity Cache（约 12 TB/s 实测、超过 MI300X HBM 的 5.3 TB/s 两倍多）吸收 H100 必须打 HBM 的注意力 KV 与权重复用——NVIDIA 押更大 HBM 带宽，AMD 押缓存。
- 封装赌 3D：CDNA3 起八颗 XCD 经 TSMC SoIC 混合键合（亚微米 TSV、无微凸点）堆到 IOD 基底上（2023），比 NVIDIA 早一代（NVIDIA 到 B200 才走两颗 reticle 极限 die 的 2.5D 路线）。
  - MI300A APU 推得更远：把部分 XCD 换成 Zen 4 CCD，CPU 与 GPU 共享同一物理地址空间、硬件一致——无 host-device 拷贝、无 pinned memory、路径上无 PCIe；NVIDIA 的 Grace-Hopper 是桥接两个封装，MI300A 是一个封装；El Capitan（11,039 节点 × 4 MI300A）是买单者。
- CDNA4 分水岭：每 CU FP64 吞吐减半，MI355X 是 AI 芯片优先——原文 bet 1 的说法是 HPC 和 AI 是同一个赌注，直到不是为止。
#### 4.3 扩展补课与软件开放路线
- 到 MI355X 为止的向上扩展是 8 卡 OAM 全连接盒子（每卡 7 条 Infinity Fabric 链路互联、UBB 2.0 与 NVIDIA HGX 同机械插座）。
  - 容量赌的红利：8×MI350X 2.3 TB 让 405B FP8 装进单盒（权重+KV+余量），8×H100（640 GB）得小心分片——2024–2025 的推理 AMD 不必拼机架就有竞争力；训练要拼机架，这是当时没有答案的缺口。
  - Helios（2026 下半年，72×MI455X、约 31 TB HBM4、1.4 PB/s 聚合 HBM 带宽、2.9 ExaFLOPS FP4）补这一课；机架规格用 Meta 的 Open Rack Wide 而非私有底盘——凡标准化 ORW 的超大规模客户无需 bespoke 机房改造。
  - 妥协：首发 fabric 走 UALoE（Infinity Fabric 隧道过标准以太网），原生 UALink 交换芯片 2027 年才量产（随 MI500）——作者明示这是拿时间线换 2026 年出货的真实让步。
- 向外全以太网：UEC 1.0（2025-06）定义 UET——以太网上的新 RDMA 传输（包喷洒、SACK 选择性重传、现代拥塞控制），不是 RoCEv2 的封装；NIC 自家 Pensando（Pollara 400 → Vulcano 800），交换机与光层是伙伴硅（Broadcom Tomahawk 6 + 共封装光学）——开放标准+优选伙伴 vs 英伟达全栈自有。
  - Dell'Oro：2025 年以太网承接的 AI 向外扩展 fabric 出货量已是 InfiniBand 两倍多；AWS/Microsoft/Meta/Oracle/xAI 的 AMD 集群全用以太网。
- 软件：ROCm 是 CUDA 的开源对照物，库层按名字一一对标（rocBLAS/hipBLASLt/MIOpen/RCCL/Composable Kernel）；PyTorch 一等公民，Triton 成为跨厂商通用语是开放战略的地基（过 torch.compile 的 kernel 两边都能跑）。
  - 诚实的差距：ROCm 7.2 在标准 PyTorch/vLLM/SGLang 负载上比等价 CUDA 慢 10–25%（Phoronix 独立实测，同等精度同等硅）——特性对齐了，性能没对齐；FA4 无 ROCm 移植，吃 Blackwell 最新原语的研究长尾仍要 AMD 用户多付工程时间。
  - 部署验证：Azure ND MI300X v5 GA（OpenAI 在其上跑 GPT 推理）、Meta Llama 3/4 推理、Oracle OCI——真实服务集群而非试点。
  - 一句话对照：NVIDIA 派工程师进驻前沿实验室；AMD 经 GitHub 发 kernel。策略在常见负载上收敛，长尾新代码上不收敛。

### 五、Cerebras：不切晶圆，用几何替代层级
#### 5.1 平铺 90 万核，数据到达即调度
- 哲学：内存墙是切割晶圆的后果——行业把 300 mm 晶圆锯成 die，再用 HBM/NVLink/CoWoS/每机架 5,184 根铜缆把碎片接回去，带宽只有片上的零头；WSE 不锯：84 个 reticle 场经额外高层金属跨刻线缝拼接，对软件是一块 46,225 mm² 的均匀 2D 网格（缝间 2,880 GB/s/die，整个片间层只花约 97 W）。
- 良率用粒度解决（1980 年代晶圆级计算死于单体良率）：同样一个缺陷，H100 废掉整个约 6 mm² SM，WSE 只废一个 0.05 mm² 核；造约 97 万核、出货 90 万（约 7% 备份池 + 冗余链路重映射）。
- 无矩阵单元：NVIDIA/Google/AMD 都把 FLOPs 集中在专用矩阵引擎里再愁怎么喂，Cerebras 用 fabric 装配矩阵乘——权重沿持有激活的核行广播、每核对驻留切片做乘加、部分和在网格上归约；Tensor Core 从寄存器 tile、MXU 从接线得到的复用，WSE 从几何得到（激活不动，只有正在被乘的操作数在飞）。
- 数据流执行：核闲置到 wavelet 到达才触发处理任务，八个硬件微线程按操作数到达逐周期切换；44 个 DSR 让指令即张量描述符（基址/范围/步长至四维），一条 FMAC 指令对着到来的流算到张量尽头——NVIDIA 花五代把矩阵乘走成单条描述符命令，WSE 上张量指令没有别的形态。
  - 带宽账：每稠密 FP16 FLOP 约 1.3 字节片上 SRAM 带宽，B200 从 HBM 只拿到约 0.002——每个 GPU/TPU 都在挨饿，WSE 是唯一平衡的机器；而解码恰是纯带宽阶段（每 token 完整读一遍权重）。
#### 5.2 两层悬崖与不变的天花板
- 层级只有一层（44 GB SRAM 按 48 kB 切片分在核里、合计标称 21 PB/s 片上聚合——作者是 90 万个本地端口之和，不可与 HBM 点对点数字直接比）+ 晶圆边缘 12×100 GbE（1.2 Tb/s，只略多于一块 Blackwell 的 ConnectX-8）：内外差五个数量级；NVIDIA 的层级每层慢几倍缓缓下降，WSE 是两层之间一道悬崖。
  - 晶圆是岛：岛的超能力与牢笼是同一件事。
- SRAM 密度停止缩放：WSE-3 比 WSE-2 晶体管多 54%、SRAM 只多 10%——六管 SRAM 单元不随逻辑缩小；架构最稀缺的资源恰是下一个工艺节点不再买到的东西。
  - 向上扩展域因此是常量：NVIDIA 的域逐代变大（NVL72→NVL576），晶圆自 2019 年起就是 46,225 mm²，450 mm 转型已死，再无面积可挖。
- 训练倒转数据流：别家权重驻留、激活流过；WSE 激活驻留片上、权重逐层流过——主权重住在旁边的 MemoryX（DRAM+flash 一体机），晶圆连临时都不存权重，梯度回流、优化器步进在 MemoryX 的 CPU 上做（权重更新是无复用的逐元素活）。
  - 买到的是编程模型：一片晶圆装下一整层激活，于是没有张量并行、没有流水线并行、没有 FSDP 分片——70B 模型就是单设备程序；多机扩展只剩纯数据并行（SwarmX 广播/归约树）。GPU 训练的并行策略电子表在这里没有那一页。
#### 5.3 代价、利基与市场定价
- 规模证据的边界：规格上限 2,048 台 CS-3 从未建成，最大披露集群是 64（Condor Galaxy 3）；平台上最大的从头训练模型是 G42 的 Jais 2（70B 参数、2.6T tokens，Cerebras 工程师驻场）；GPU 实验室惯例公布的 MFU（35–45%）从未对任何 Cerebras 运行披露。
- FLOPs 账要小心：125 PFLOPS 是稀疏 FP16（按理想稀疏约 8× 跳零）；稠密约 15.8 PFLOPS（作者推导，官方无稠密数）；每瓦稠密 FLOPs 输给所有当代 GPU——它不是 FLOPs 机器，是带宽机器，FLOPs 是为了跟上 SRAM。
- 数值停在 16-bit（FP16/BF16 + FP32 累加；WSE-3 加 16 宽 8-bit 定点）：无 FP8、无 FP4、无微缩放；SRAM 容量是架构最稀缺资源而 8-bit 权重本可省一半晶圆——是数值信念还是数据通路路线图缺口是 open question。
  - 跳零是数据流的免费午餐（发送端过滤、接收核永远看不见零），却从未被旗舰模型使用：稀疏预训练结果（SPDF：1.3B 参数 75% 稀疏；后续 6.7B）是厂商自写且 <7B；最大的 Jais 2 是稠密训练。
- 推理是真实利基：训练的权重流在解码上算术上是致命的（70B 的 140 GB 每个词元经约 150 GB/s 流一遍≈每词元一秒），所以推理把权重泊进 SRAM、按层边界切到多片（Llama 70B 少至四片 CS-3、经以太网流水线并行）。
  - 速度真实且经独立验证：Artificial Analysis 实测 1,850 token/s（Llama 3.1 8B）、969（405B、首 token 240 ms）、2,522（Llama 4 Maverick，约为当时最佳 Blackwell 的 2.4×）；没有 GPU 供应商在单用户解码速度上接近。
- 经济性是锐边：44 GB/片意味着前沿模型要成舰队（SemiAnalysis 估 1.6T 级模型约 24 台 CS-3，单台 BOM 约 $45 万、标价 $2–3M）；per-token 定价约为 GPU 供应商的 3–5×；Llama 405B 从 API 静默下架；KV 与权重同住 44 GB 导致长上下文偷容量、API 封顶 131K（对手 256K–1M）；MoE 能做但是格式最坏情况（巨大参数足迹、每次只碰几个专家、占着最贵的内存）。
- 市场诚实定价了延迟：Mistral Le Chat、Perplexity Sonar、Meta Llama API 为速度付费；2026-01 OpenAI 签下至 2028 年 750 MW CS-3 产能（签约时报超 $10B、后破 $20B，晶圆级架构史上最大背书），首个旗舰是 2026-07 上线、标称 750 token/s 的 GPT-5.6 Sol。
- 软件窄门：编译器是 kernel 匹配器不是通用代码生成器（`cerebras.pytorch` 把子图匹配到手写 kernel 库，匹配不上落慢的自动生成）；约束对 GPU 人来说刺眼——只静态图、无动态形状、无数据依赖控制流、中途不可 eager 访问、PyTorch 版本被钉死。
  - 没有 kernel 逃生舱：CUDA 的答案是新 attention 变体就写 kernel，TPU 有 Pallas，ROCm 有 Triton，Cerebras 的 ML 栈没有用户 kernel 通道——匹配器错得离谱时，修法是叫 Cerebras 工程师；CSL 能摸裸机且出过 HPC 战绩（TotalEnergies stencil 约为 A100 的 228×），但与 PyTorch 流程互不相通。
  - 平台上每个旗舰模型（Jais、BTLM、Med42）都与驻场 Cerebras 人员共同开发。
  - 奇特的免疫：FlashAttention 是穿内存层级的 attention tiling，WSE 没有层级可 tile——让 AMD 追数年的移植滞后这类优化在此根本不适用；免疫与贫瘠是同一事实：CUDA 上复利的第三方 kernel 生态在这里没有附着面，平台史上每个 kernel 改进只有一个作者。
- 定位：拥有一个诚实赢来的真实利基——batch-one 解码速度，经独立验证，由把延迟看得比成本重的客户买单。

### 六、AWS Trainium：借 TPU 论题，赢在云内经济性
#### 6.1 NeuronCore＝专用引擎集群，不是单个大矩阵引擎
- 定位是快跟随：计算核拿 TPU 的成熟剧本（128×128 权重驻留脉动阵列、软件管理 scratchpad、全程序编译），干脆连 Google 的 XLA 编译器都共用；真正亚马逊的是窄而刻意的东西——专门的集合通信硅，以及只需在 AWS 内部击败 NVIDIA 的垂直整合定价权。
- NeuronCore 拆成 Tensor Engine（128×128 阵列）+ Vector Engine（跨元素归约）+ Scalar Engine（逐元素）+ 可编程 GPSIMD Engine（八个 512-bit 向量处理器兜底），外围绕 128 个 DMA 引擎与 Sync Engine；无 warp 无 wavefront，引擎按静态排程的数据流流水线跑。
  - 四引擎重叠良好时与 TPU/GPU attention 内核同款的生产者/消费者结构；长尾税：落不进任何专用引擎的算子掉到 GPSIMD 慢路径——非 GPU 加速器共同的新架构瓶颈点。
- 阵列物理尺寸三代不动（128×128、16,384 MAC），靠喂更窄的数涨有效算力：Trn2 把 FP8 双泵成有效 256×128（第一个真 2× 的 8-bit），Trn3 打包微缩放操作数呈 512×128、4× BF16 速率。
  - Trn3 的 FP4 无算力增益：OCP MXFP4 到达阵列前上转 MXFP8——只省内存与带宽。
  - 口径不一致（作者提醒）：AWS 宣传 4× FP8 稀疏峰值，其自家架构页只支持对稠密 FP8 的 2×（4× 是相对稠密 BF16）。
- 内存三层全软件管理：HBM（32→96→144 GB）→ SBUF 状态缓冲（每 NeuronCore 24/28/32 MiB、约 20× HBM 带宽、128 分区）→ PSUM（2 MiB 专用累加器）；每一跳由编译器发射，硬件不预取不逐出。
  - 绝对容量落后对手（Trn2 96 GB 低于 H200/B200；Trn3 144 GB 低于 B300 的 288 GB），所以 AWS 论证服务经济性时拉的不是内存领先而是价格——自建自租硅上的单位算力/单位 HBM 成本。
- 两个 Trainium 特有数值花样：可配置 FP8（指数偏置可调，E5M2/E4M3/E3M4，编译器按张量换范围与精度）；每代硬件随机舍入。
#### 6.2 集体通信进硅
- 分布式训练/推理的大头墙钟时间在集合通信（每步梯度 all-reduce、每层 MoE all-to-all）；GPU 上这些是 NCCL kernel、与数学抢同一批 SM，重叠要在软件里赢。
- Trainium 把功能凿成专硬件：Trn2 每芯片 20 个 CC-Cores 直连 NeuronLink 端口，在 Tensor/Vector 引擎继续跑的同时执行 all-reduce/all-gather/reduce-scatter/all-to-all——与 SparseCore、Cerebras 片外零值过滤同一招：主引擎形状不对的活，花小面积旁路掉，通信从停下来去做变成并发地在做。
#### 6.3 扩展：拓扑跟着负载走，网络复用云的
- 向上扩展域 NeuronLink 是消息传递而非一致共享内存（UltraServer 被营销成池化多 TB 内存，底下是点对点链路上的消息传递，精神上更近 TPU 的 ICI 而非 NVSwitch 交叉开关）。
  - Trn1/Trn2 抄 TPU 的环面（16 芯 4×4 2D 实例、64 芯 4×4×4 3D UltraServer：83 dense FP8 PF、约 6 TB HBM；第三条环轴刻意薄——环面的本性：近邻巨带宽、直径多跳）。
  - Trn3 弃环面改 NeuronSwitch 全连接交换（约翻倍带宽 + 直径压平成一跳；UltraServer 144 芯、362 dense FP8 PF、20.7 TB HBM3e）——动机与 Google 转 high-radix 同一个：MoE expert routing 是 all-to-all、环面最坏情况。
  - 作者评语：这是跟随剧本而非发明——先谷歌、后英伟达，环面用到负载是近邻为止，负载不是就换交叉开关。
- 向外不自建：每实例 EFA NIC 进数据中心网（Trn2 3.2 Tbps/实例），传输是 SRD（每消息喷洒至多 64 条并行路径、可靠但乱序送达、重组推给集合库、避开单拥塞路径的队头阻塞），卸载在 Nitro 卡上——AWS 给自家云建的传输，顺手复用给加速器 fabric。
  - 顶层 10p10u UltraCluster（约 10 Pbit/s、10 µs 内）连数十万芯片；证据是 Project Rainier：约 50 万 Trainium2 跨美国多个数据中心为 Anthropic 上线（2025 底），2026 年初 Claude 跑在超 100 万芯片上——外部实验室对非英伟达训练平台的最大承诺。
  - 经济闭环：AWS 自报 Trainium2 比其 Hopper 级 GPU 实例 price-performance 好 30–40%（对照上代而非 Blackwell）；从 Nitro 卡到 API 每层都归 Amazon，加价空间自己定。
#### 6.4 差距是成熟度不是设计
- Neuron SDK 编译器优先、与 TPU 同根的 OpenXLA 栈（neuronx-cc 吃 XLA HLO 出 NEFF 二进制；torch-neuronx 走 LazyTensor 追踪、jax-neuronx 走 StableHLO）；从 kernel 驱动的 CUDA 到全程序 XLA 的光谱上，Trainium 几乎坐在 TPU 正上方。
- 逃生舱 NKI（Python、tile 级、直接暴露四引擎与 SBUF/PSUM）＝它的 Pallas/Triton，但 2024 底仍在 beta；移植的模型只跑在 AWS、无跨厂商退路；vLLM 后端落后上游。
- 最清晰的信号是锚定客户的用法：Anthropic 不止经 PyTorch 打 Trainium，而是与 Annapurna 驻场共同工程、自写 NKI kernel、向 Neuron 栈上游修——前沿上是共同工程，不是 turnkey；编译器是继承来且优秀的，周边生态是年轻的。

### 七、Groq：确定性机器
#### 7.1 删掉一切反应式硬件，编译器排满每个周期
- 哲学：别的芯片花硅容忍不确定性（缓存藏访存延迟、调度器填坑、仲裁器解竞争），LPU 全删——无缓存、无分支预测器、无仲裁器、无重排缓冲、连片上 crossbar 都没有，把整个调度问题交给编译器把每条指令、每个字节放在精确周期上；剩下一颗运行前就知延迟的芯片。
  - 证据：BERT-Large 24,240 次运行落在约 75 µs 带内，编译器预测延迟与实测差 2% 以内。
- 结构：别家复制同一种核，LPU 把一颗常规核心拆开——指令控制、向量 ALU、矩阵单元、内存、网络各成一条全高的功能切片，并排跨 die；沿切片同质、跨切片异质；数据像流水线工件横穿切片（东/西向、每周期一跳寄存器），VLIW 指令自北而南迎上数据。
  - 320 lane 高、20 superlane；64 个流寄存器/lane；中央 VXM 16 ALU/lane 共 5,120 个 32-bit ALU；MXM 四个 320×320 乘加面共 409,600 乘法器（900 MHz 约 750 INT8 TOPS / 188 FP16 TFLOPS）；SXM 管移位/320-lane 排列/转置/片间链路。
  - 计算是空间的：操作数连串穿过 VXM ALU 链直进 MXM 面、中途不碰内存——GPU kernel 手写的算子融合在这里就是切片的物理顺序。
  - 数值上拒绝跳零：数据依赖的跳零会让执行时间依赖数据，与唯一不可交易的确定性冲突——所以 750 TOPS 没有稀疏星号。唯一的数值花样 TruePoint：320 元点积一次舍入 + FP32 累加，FP16 阵列逼近 FP32 精度（约 0.05% 最大误差）。
- 与 Cerebras 恰成互逆：WSE 是数据流、操作数到了就触发；LPU 按时钟准时。两台机器都删了调度器——一个用到达替代，一个用时钟替代。
  - 与 TPU 是同一直觉更进一步：TPU 编译器排一颗芯片，LPU 编译器排一个系统——确定性跨网络也成立。
#### 7.2 SRAM-only 的代价：模型摊进数百芯片，网络也要排程
- 层级一层：MEM 切片 230 MB SRAM（88 条、每字节距计算一片单周期、约 80 TB/s）——230 MB 装不下模型：Llama-2 70B FP16 是 140 GB，得切到数百芯片、权重摊满一机架以上聚合 SRAM（部署配置约 576 颗 LPU）。
  - 芯片数由容量决定而非算力；与 Cerebras 同一取舍、相反入口：Cerebras 保一片巨 die、放弃每晶圆容量；Groq 保常规尺寸 die、放弃单芯容纳模型。
  - 数值停在 FP16/INT8、从未出 FP8/FP4 硅：一台被容量饿着的机器最有理由要 8-bit却没拿到——与 Cerebras 同一个 open question（信念还是数据通路没更新，难与二代芯片从未出货分开）。
- 芯片即路由器：每 LPU 至多 16 条 RealScale 片间链路（卡上露出 11 条），同时是计算端点与路由器；节点 8 卡全连接（每卡 7 条连同伴、剩 4 条捆成 32 口虚拟路由器上行），无基板交换机、无一致地址空间——远端操作数不是被 load，而是被排程到指定周期准时到达、在落地的周期被消费。
  - 节点之上是 Dragonfly：9 节点一机架（第 9 节点热备、64 活跃），规格扩到 10,440 芯片、任意两颗 6 跳内；fabric 是软件排程的——"scheduled, not routed"，无背压无动态仲裁（编译器已证明接收方就绪），链路用前向纠错而非重传（重传会扰动时刻表）；独立时钟芯片间靠 plesiochronous 链路 + 每 256 周期经生成树交换 Hardware-Aligned Counters 保持全局共识时间。
  - 回报：Groq 报告 8 路 all-reduce 在大张量上追平 A100/NVSwitch 节点、小张量上胜出——排程 fabric 不付动态 fabric 的握手延迟。
#### 7.3 代价、转型与终局
- 物理代价写进内存赌：模型副本不是一台机器而是一个机架（或八个）——Llama-2 70B 跑在约 576 颗 LPU 上，按一份分析配了 144 个主机 CPU 与 144 TB 主机内存（8 卡 GPU 服务器只要 2 个 CPU）；晶圆本身便宜（14 nm GlobalFoundries，据报道不足 $6k，对 H100 级约 $16k），但解码期间大部分算力闲置、干活的是 SRAM。
  - SemiAnalysis 一句话：为延迟优化时 LPU 赢每 token BOM，一批起来吞吐每美元输 GPU 约一个数量级——它不比成本，比速度。
- 编程模型最纯粹地体现编译器即机器：没有 kernel 可写——把 PyTorch/TF/ONNX 模型递给编译器，它降到小张量算子集、静态排程每条指令每条流每次片间传输；没人写 `wgmma`、没人手调 tile，因为没有动态硬件可对着调。
  - Groq 的演示：不到十人、四天上线 LLaMA（同模型在 GPU 上手调 kernel 以月计）；GroqFlow 2025 年归档——公司停卖卡、改卖 token。
- 定位由转型点明：LPU 按构造推理 only（Ross 的框架：训练是本地游戏、推理是全球游戏）；单用户解码延迟无人能敌（Artificial Analysis 把 Groq 列为开放模型最快供应商之列）；与其余负载不匹配——装不进一机架 SRAM 的模型、要大批量换吞吐每美元的负载、静态排程表达不了的动态控制流；MoE 能做但数据依赖的专家路由与想预知一切的编译器别扭，Groq 对如何调和公开得很少。
- 终局：2025-12 英伟达取得 LPU 技术非独占许可并雇走 Ross 与大部分团队——不是收购（无产品、无客户合同、无股权易手，按英伟达 10-K），但交割约 $13B 让媒体称之为收购；GTC 2026 技术以 NVIDIA Groq 3 LPU 回归：256 颗 SRAM-only 推理芯片的机架与 Rubin NVL72 并肩，GPU 跑 attention、LPU 跑前馈与 MoE 层，Dynamo 编排交接——AI 里最确定的架构成了最可编程架构的延迟协处理器；GroqCloud 仍在原 14 nm 硅上服务。

### 八、横向结论：汇总表告诉我们什么
#### 8.1 单芯片已收敛，分歧在机架/pod 层
- 每 chip FP8 峰值收敛：B200（4.5 PF）、Ironwood（4.6 PF）、MI355X（10 PF）互相在约 2× 内；架构真正分道扬镳的是机架与 pod。
#### 8.2 各家的持久优势与代价
- HBM 容量是 AMD 的持续赢面（192→256→288 GB，2023–2025 每代持平或超过 NVIDIA；NVIDIA 到 B300 才追平、Rubin Ultra 2026 以 1 TB/封装夺回）。
- 机架级向上扩展 2026 年前是 NVIDIA 独有：NVL72 是 2024–2025 唯一在出货的相干机架级域；AMD 在盒子层面扩展、到 Helios 才到机架；TPU 用环面同时当机架与集群、绕开了这个问题。
- TPU pod 芯片数碾压任何 NVIDIA 机架：Ironwood 9,216 芯片 42.5 ExaFLOPS FP8，对 NVL576 的 576 GPU 约 5 ExaFLOPS FP8——平坦单芯片速率 × 巨型 pod 的配方换来更大聚合算力，代价是单芯片带宽。
- Cerebras 打破表格坐标轴：完全没有 HBM（44 GB 片上 SRAM、21 PB/s 聚合、每稠密 FLOP 1.3 字节对 GPU 的约 0.002）；同表里也可见成本——总容量低于一颗 H200、每瓦稠密 FLOPs 落后所有同类 GPU、相干域=晶圆本身导致扩展性一栏空白。
- Trainium 的优势在经济性不在规格：单芯片逊色（Trn2 1.3 PF FP8 约为 MI355X 四分之一），但 Trn2 UltraServer 2024 年就与 NVL72 同期做到 64 芯机架级（消息传递环面而非相干交叉开关），Trn3 转交换式；从 Nitro 卡到 API 每层自有，核心租户 Anthropic（超百万 Trainium2）已在前沿规模验证。
- Groq 用内存容量换 SRAM 带宽、再按芯片数扩池：GroqRack 64 活跃芯片共 14 GB；Groq 3 LPX 扩到 256 芯片 128 GB + 40 PB/s 聚合 SRAM；加 12 TB DDR5 层并与 Rubin 搭档——LPU 是大内存 GPU 机架的补充而非替代。
#### 8.3 功耗曲线与数字口径
- 单芯片功耗陡升：700 W（Hopper）→ 1,000 W（Blackwell、MI325X）→ 1,400 W（B300、MI355X）→ 约 1,800 W（Rubin Ultra，分析师值）；超过约 1,000 W 液冷成为强制，风冷实际终结于 Hopper。
- 向外 NIC 带宽每代翻倍（CX-7 400 G → CX-8 800 G → CX-9 1.6 T）；AMD 落后一代（Pollara 400 → Vulcano 800），反映 Pensando 装机量小、整合晚。
- 作者的口径警告：表中算术 figures 皆为标称峰值（除非厂商不公布口径才标 sparse）；内存带宽按各自原生层级（GPU/TPU/Trainium 记 HBM，Cerebras/Groq 记片上 SRAM 聚合）——不可直接比较；向上扩展带宽各家口径（单芯聚合/机架聚合/真 bisection）不一；带 * 是分析师推导或厂商聚合推算，n/d 为未披露。

## 作者边界、反例与不确定性
- 全文口径警告（作者在表后自声明）：所有算术 figures 是标称峰值；带宽数字口径不一、不可直接比较；`*` 标分析师推导/时代推断/厂商聚合推算。
- 原文内部口径不一：导语称 Groq 以 200 亿美元收购并入英伟达（链接标题亦然），正文结尾按 NVIDIA 10-K 说明是非独占技术许可 + 团队吸纳（约 $13B 交割）、不是收购。
- NVIDIA：Rubin/Rubin Ultra 一代参数多带 `*`（分析师推导）；TDP、带宽等含估算。
- TPU：Google 未公布 v5p 之后的 VPU 维度，lane 是否加宽到 256 是作者的"presumably"推断。
- Cerebras：16-bit-only 是数值信念还是数据通路路线图缺口是 open question，无一手 Cerebras 来源显示晶圆上有浮点 FP8；稠密 FLOPs 官方从未发布（15.8 PF 为作者推导）；稀疏预训练证据厂商自写且 <7B、无旗舰客户模型披露为稀疏训练；MFU 从未披露；2,048 系统上限从未建成（最大 64）；CS-1 七年来无人在其上训过 >70B 的模型。
- Groq：FP8 缺席是信念还是数据通路未更新难与二代芯片未出货分开；MoE 动态路由与静态编译如何调和，Groq publish 得很少。
- Trainium：4× 稀疏峰值的营销与其自家架构页（对稠密 FP8 为 2×）不一致；30–40% price-performance 是 AWS 自报、对照 Hopper 级而非 Blackwell。
- AMD：ROCm 10–25% 性能差距来自独立第三方基准（Phoronix），作者标为诚实差距（特性对齐、性能未对齐）；原生 UALink 2027 年才有量产硅，Helios 首发的 UALoE 被作者明示为时间线上的真实妥协。
- 反例（限定结论适用范围）：wavefront 域的两个代价不在所有负载成立——纯稠密 GEMM/大 batch 训练里异步化无益，AMD 领先的 exascale HPC 正是这类；确定性 fabric 并非只有代价——Groq 的 8 路 all-reduce 在小张量上胜过 A100/NVSwitch；FlashAttention 式优化对 WSE 根本不适用（无层级可 tile），移植滞后这类问题在 Cerebras 上不存在。
