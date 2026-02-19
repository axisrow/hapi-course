---
title: "第4课：CI/CD与HAPI自动化"
weight: 4
bookToc: true
---

# 第4课：CI/CD与HAPI自动化

## 为什么需要这个

当团队共同开发项目时，自动化日常任务很重要：代码检查、构建、发布。HAPI使用 **GitHub Actions** ——GitHub内置的自动化系统来完成这些工作。

> **CI/CD**（Continuous Integration / Continuous Delivery）——持续集成和持续交付。这是一种在每次代码更改时自动检查和构建的实践。

> **GitHub Actions** 是GitHub的服务，在特定事件（例如有人推送代码或创建pull request）时自动运行任务。

## HAPI有哪些自动化

在 `.github/workflows/` 文件夹中有6个文件——每个描述一种自动化：

### 1. 🧪 测试（`test.yml`）

**触发时机：** 每次push和pull request时。

**执行内容：**
1. 下载代码
2. 安装Bun
3. 安装依赖（`bun install`）
4. 类型检查（`bun typecheck`）
5. 运行测试（`bun run test`）

**目的：** 确保新代码没有破坏任何东西。

### 2. 🤖 AI审查PR（`codex-pr-review.yml`）

> **PR（Pull Request）** ——请求将更改合并到项目中。其他参与者在接受前审查代码。

**触发时机：** 当打开新PR或PR从草稿转为就绪状态时。

**执行内容：**
- AI模型 **Codex**（GPT-5.2）自动审查PR中的代码
- 留下评论，包含建议和推荐
- 不审查来自机器人的PR和带有 `bot-skip` 标签的PR
- 不重复审查——如果机器人已留过评论，不会再次触发

**目的：** 加速代码审查并捕获常见错误。

### 3. 💬 自动回复issues（`issue-auto-response.yml`）

> **Issue** ——仓库中的工单/任务：Bug报告、功能请求、问题。

**触发时机：** 当创建新issue或添加标签时。

**执行内容：**
- Codex分析issue并自动回复
- 跳过重复（`duplicate`）、垃圾邮件（`spam`）和带有 `bot-skip` 标签的issues
- 只回复一次

**目的：** 用户更快获得首次回复，开发者无需回答典型问题。

### 4. 🗣️ 回复提及（`codex-mention-response.yml`）

**触发时机：** 当有人在评论中提及 `@tiann` 时。

**执行内容：**
- Codex回答问题或评论
- 仅对具有写入权限（write access）的用户有效
- 不回复自己的评论和带有 `bot-skip` 标签的issues

**目的：** 在讨论中直接为开发者提供快速帮助。

### 5. 📦 发布（`release.yml`）

> **发布（Release）** ——发布程序的新版本。

**触发时机：** 当创建新版本标签时（例如 `v1.2.3`）。

**执行内容：**
1. 为所有平台构建二进制文件
2. 打包为归档文件（macOS/Linux用`.tar.gz`，Windows用`.zip`）
3. 计算校验和（checksums）
4. 在GitHub上创建包含下载文件的发布
5. 更新Homebrew formula（macOS包管理器）

### 6. 🌐 部署Web应用（`webapp.yml`）

> **部署（deploy）** ——将应用放到服务器上使其可供用户访问。

**触发时机：** 当 `main` 分支中 `web/` 文件夹有更改时。

**执行内容：**
1. 构建Web应用
2. 发布到GitHub Pages（GitHub的免费托管）
3. 通过 `app.hapi.run` 地址访问

## 所有这些如何关联

```
开发者提交更改
         │
         ├─► 推送到任何分支
         │       └─► test.yml：代码检查和测试
         │
         ├─► 打开PR
         │       └─► codex-pr-review.yml：AI审查代码
         │
         ├─► PR合并到main + web/有更改
         │       └─► webapp.yml：更新网站
         │
         ├─► 创建标签v1.2.3
         │       └─► release.yml：构建+发布
         │
         └─► 新issue或评论
                 └─► issue-auto-response.yml / codex-mention-response.yml
```

## `bot-skip` 标签

如果你不想让机器人回复特定的issue或PR，添加 **`bot-skip`** 标签。所有AI自动化都会检查此标签并跳过这些任务。

## 课程总结

- HAPI使用 **6种自动化** GitHub Actions来处理日常任务
- **测试** 在每次代码更改时自动运行
- **AI（Codex）** 自动审查PR、回复issues和评论
- **发布** 通过创建标签一条命令为所有平台构建
- **Web应用** 在更改时自动发布
- `bot-skip` 标签可以为特定任务禁用AI自动化
