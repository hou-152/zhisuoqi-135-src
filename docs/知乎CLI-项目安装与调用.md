# 知乎 CLI：项目安装与调用

安装与验收日期：2026-09-10。

## 安装范围

用户授权仅在本项目安装。官方 Skill 与 CLI 版本均为 0.6.0。

- Skill：`.agents/skills/zhihu/`，本项目自动发现目录。
- CLI：`.local/zhihu-cli/current/zhihu-cli`，官方安装器完成归档大小、SHA-256 和版本检查。
- 入口：`scripts/zhihu`，从任意工作目录以绝对路径调用也可。
- 私密凭证：`.private/zhihu/access-secret`，文件权限 600，目录权限 700。
- `.private/` 和 `.local/` 已加入根目录 `.gitignore`；不打包、不上传、不部署。
- 不修改全局 PATH，不安装全局 Skill，不写系统钥匙串。启动器只向 CLI 子进程注入凭证，缺少项目凭证时停止。

官方 Skill 保留完整参考资料；SKILL.md 增加项目范围约束，setup.sh 与 run.sh 将 CLI 安装位置限制为本项目。认证使用项目启动器，替代官方默认的全局钥匙串配置流程。

## 已验证

- 状态检查：installed=true、compatible=true、next_action=ready。
- 在线认证：verification=valid，source=environment。
- 最小本人内容请求：`me contents --type all --limit 1` 成功，不保存个人内容。
- 知乎搜索：查询「AI 视频 运镜」，返回 Code=0、Message=success，获得 2 条文章结果。
- 搜索结果证明接口调用成功，不代表内容已经核实或具有教学效果。搜索摘要不是全文。

## 使用

在项目根目录执行：

```sh
./scripts/zhihu search zhihu --query 'AI 视频 运镜' --count 2
./scripts/zhihu search zhihu --help
```

每个新 Session 首次调用：

```sh
./scripts/zhihu status --skill-version 0.6.0 --min-cli-version 0.6.0
```

不要执行 `auth set`、`auth logout` 或 `init`，启动器会拒绝这些全局凭证操作。不要显示、复制进命令参数或提交凭证。

安装来源：https://developer-cdn.zhihu.com/zhihu-cli/releases/stable/skill/zhihu-cli-skill.zip

## 本次讨论记录

用户与群友讨论后认可 1＋3＋5 为方向：互动阅读器、案例决策场、技术实验台，以概念框架组织。具体产品形态继续由用户制作和决定，本次只完成工具接入，未修改或部署产品。

用户给出的 DDR 时间：2026-09-12 08:30，Asia/Shanghai。仅记录时间，未创建提醒。
