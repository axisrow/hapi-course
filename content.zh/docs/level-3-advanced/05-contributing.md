---
title: "第5课：参与HAPI项目"
weight: 5
bookToc: true
---

# 第5课：参与HAPI项目

## 为什么需要这个

HAPI是一个开源项目。这意味着任何人都可以提出改进建议、修复错误或帮助编写文档。在本课中，你将学习如何正确地做出贡献。

## 社区规则

在开始之前，记住四条简单规则：

- 🤝 **友善和尊重** ——善待每一个人
- 🙋 **帮助他人** ——分享知识
- 💬 **给出建设性反馈** ——讨论代码，而不是人
- ⏳ **保持耐心** ——每个人的经验水平不同

## 你可以做什么

### 1. 报告Bug（Bug Report）

> **Bug（缺陷）** ——程序中的错误，当某些功能不按预期工作时。

如果你发现问题，在GitHub上创建 **issue** 并说明：

- 📝 问题的清晰描述
- 🔄 重现步骤（你具体做了什么）
- ✅ 你期望看到的结果
- ❌ 实际发生了什么
- 💻 你的环境（操作系统、Bun/Node版本）
- 📸 日志或截图（如果有）

### 2. 提出新功能建议（Feature Request）

有想法？创建一个issue描述：

- 什么功能
- 解决什么问题
- 你的实现思路（如果有）

### 3. 提交代码更改（Pull Request）

#### 第1步：Fork项目

> **Fork** 是你在GitHub上的仓库个人副本，你可以在其中进行修改。

在HAPI仓库页面点击 **Fork** 按钮。

#### 第2步：克隆并配置

```bash
git clone https://github.com/你的用户名/hapi.git
cd hapi
bun install
```

#### 第3步：以开发模式运行

```bash
bun run dev
```

#### 第4步：进行修改

编辑需要的文件，参考项目结构：

| 想修改什么 | 在哪里找 |
|--------------------|-----------|
| 终端命令 | `cli/src/` |
| 服务器逻辑 | `hub/src/` |
| Web界面 | `web/src/` |
| 共享代码 | `shared/src/` |
| 文档 | `docs/` |
| 网站 | `website/src/` |

#### 第5步：检查代码

```bash
bun run typecheck    # 类型检查
bun run test         # 运行测试
```

#### 第6步：提交PR

```bash
git add .
git commit -m "更改描述"
git push origin 你的分支
```

然后在GitHub上打开PR。

## Pull Request规则

### ❌ 不要提交"巨型PR"

不要在一个PR中发送大量更改。大型PR：
- 难以审查
- 容易遗漏错误
- 出问题时难以回滚

**如果你想添加大功能——先创建issue讨论方案。** 团队会帮你把任务拆分成小块。

### ✅ 好的PR

- 解决一个具体问题
- 有清晰的提交描述
- 包含测试（如果适用）
- 更新文档（如果需要）
- 链接到相关issue

## ⚠️ AI代码政策

HAPI有特殊政策：**只接受GPT-5.2-codex模型生成的代码**。

使用其他AI模型（其他GPT版本、Claude、Gemini等）生成代码的PR将被拒绝。这是为了确保代码的一致性和质量。

如果有疑问——先创建issue并询问。

## 示例：你的第一次贡献

假设你在文档中发现了一个错别字：

```bash
# 1. Fork并克隆
git clone https://github.com/你的用户名/hapi.git
cd hapi

# 2. 创建分支
git checkout -b fix/typo-in-docs

# 3. 修复需要的文件中的错别字
# （在文本编辑器中编辑文件）

# 4. 提交并推送
git add .
git commit -m "docs: fix typo in installation guide"
git push origin fix/typo-in-docs

# 5. 在GitHub上打开PR
```

这是一个很好的开始方式——即使是小修复也非常有价值！

## 有问题？

不要犹豫，创建一个带问题的issue。HAPI团队很友好，随时准备提供帮助。

## 课程总结

- HAPI是开源项目，**欢迎你的贡献**
- 可以通过三种方式帮助：报告Bug、提出功能建议、提交PR
- PR应该**小而专注** ——不要提交巨型PR
- AI代码**只接受GPT-5.2-codex**的
- 从小事做起：修复错别字也是贡献！
- 项目结构：`cli/`、`hub/`、`web/`、`shared/`、`website/`、`docs/`
