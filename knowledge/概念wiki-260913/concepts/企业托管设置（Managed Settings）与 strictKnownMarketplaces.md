---
id: cm_32e036a5
name: 企业托管设置（Managed Settings）与 strictKnownMarketplaces
type: REPRESENTATIONAL
subject: AI 内参 260912
domain: safety-governance
learningStage: deep-dive
verification: judge
centrality: 0.37
depth: 1
origin: [neican]
aliases: []
sources: 1
---

# 企业托管设置（Managed Settings）与 strictKnownMarketplaces

> 管理员用托管设置下发企业技能，并用 strictKnownMarketplaces 限定插件安装来源白名单

**领域** safety-governance ｜ **类型** REPRESENTATIONAL ｜ **什么时候学** 深入研究再懂 ｜ **怎么算会了** 能判 ｜ **中心度** 0.37

## 费曼一下

这条路的推动者不是使用者而是管理员：技能由托管设置统一下发到整个组织。它有两个机制要点：一是优先级最高（见下一条），二是 `strictKnownMarketplaces` 限定了插件只能从白名单来源安装——它管的不是技能内容，而是"允许从哪里拿插件"这道准入闸门。作者把判断标准压缩成一个词："必须"——只有强制性标准、安全要求、合规工作流程和编码实践才值得动用这一层。

## 原文 context

管理员可以通过托管设置在整个组织范围内部署技能。企业技能具有最高优先级——它们会覆盖同名的个人、项目和插件技能。

托管设置文件支持诸如 strictKnownMarketplaces 之类的功能，用于控制可以从哪里安装插件：

```

"strictKnownMarketplaces": [

{

"source": "github",

"repo": "acme-corp/approved-plugins"

},

{

"source": "npm",

"package": "@acme-corp/compliance-plugins"

}

]

```

对于必须在整个组织中保持一致的强制性标准、安全要求、合规工作流程和编码实践，这是正确的选择。这里的关键词是"必须"。

## 掌握证据（做到这些才算会）

- 能说出该机制的两个要点：组织范围下发与来源白名单
- 能判断只有强制性标准、安全与合规才用这一层

## 验收问句

> {{name}}管的是技能内容，还是插件安装来源？

## 先懂这些（前置 1）

- [[安全审计与受信任来源 Security Considerations Trusted Sources]] · **soft** — 不懂【安全审计与受信任来源】，就做不了【企业托管设置（Managed Settings）与 strictKnownMarketplaces】的 ⟨判定哪些 marketplace / 插件源有资格进白名单，并解释为什么限定来源白名单本身不等于安全、包内文件仍需逐一审计⟩

## 懂了它才能懂（解锁 1）

- [[企业技能的最高优先级]] — 不懂【企业托管设置（Managed Settings）与 strictKnownMarketplaces】，就做不了【企业技能的最高优先级】的 ⟨让企业版同名技能落到终端上并覆盖个人、项目与插件版本——企业技能本身就是靠托管设置下发、靠 strictKnownMarketplac

## 出场

- AI 内参 260912 ｜ 《Claude 官方课程 · 第 5 课：技能的分发与共享》 ｜ https://academy.claude.com/zh-CN/courses/introduction-to-agent-skills/sharing-skills
## 反链

- [[安全审计与受信任来源 Security Considerations Trusted Sources]]
- [[企业技能的最高优先级]]
