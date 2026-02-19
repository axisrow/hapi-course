---
title: "第3课：从源码构建HAPI"
weight: 3
bookToc: true
---

# 第3课：从源码构建HAPI

## 为什么需要这个

通常HAPI通过现成命令安装（`npx @twsxtd/hapi`）。但有时需要从源代码自行构建——例如，要进行修改、测试新功能或为你的平台构建版本。

> **源代码（source code）** 是程序员编写的文本文件。**构建（build）** 是将这些文件转换为可运行程序的过程。

## 项目结构

HAPI组织为 **monorepo**（单一仓库）——一个仓库中包含多个相关项目：

```
hapi/
├── cli/          — 命令行（你作为 `hapi` 运行的部分）
├── hub/          — 服务器中心（管理会话和连接）
├── web/          — Web应用（浏览器界面/PWA）
├── shared/       — 共享代码，被其他部分使用
├── website/      — 项目网站（文档）
├── docs/         — 文档
└── package.json  — 项目的主配置文件
```

### 每个部分的作用

| 文件夹 | 用途 | 类比 |
|-------|-----------|----------|
| `cli/` | 终端程序 | 遥控器 |
| `hub/` | 服务器部分 | 调度室 |
| `web/` | 浏览器界面 | 墙上的屏幕 |
| `shared/` | 共享功能 | 公共图书馆 |
| `website/` | 文档网站 | 参考手册 |

## 构建所需工具

**Bun** 是一个快速的JavaScript/TypeScript运行工具。是HAPI使用的Node.js替代方案。

如果还没有安装Bun：

```bash
curl -fsSL https://bun.sh/install | bash
```

## 分步构建

### 第1步：下载源代码

```bash
git clone https://github.com/anthropics/hapi.git
cd hapi
```

### 第2步：安装依赖

> **依赖（dependencies）** 是项目运行所需的外部库。

```bash
bun install
```

此命令读取 `package.json` 并下载所有必需的库。由于HAPI是monorepo，`bun install` 会同时为所有部分（cli、hub、web等）安装依赖。

### 第3步：构建所有内容

有几种构建方式：

#### 方式A：分别构建各组件

```bash
bun run build          # 构建 cli + hub + web
```

或单独构建：

```bash
bun run build:cli      # 仅CLI
bun run build:hub      # 仅Hub
bun run build:web      # 仅Web应用
```

#### 方式B：构建单个可执行文件

> **可执行文件（executable）** 是一个无需额外工具即可运行的现成程序。

```bash
bun run build:single-exe
```

此命令：
1. 下载tunwg（WireGuard隧道组件）
2. 构建Web应用
3. 将Web资源嵌入Hub
4. 编译为单个文件

结果是一个包含CLI + Hub + Web应用 + SQLite数据库的单一二进制文件 `hapi`。

### 第4步：开发模式

用于开发（当你进行修改并想立即看到结果时）：

```bash
bun run dev
```

此命令同时以开发模式启动hub和web，修改时自动重新加载。

## 为所有平台构建

要创建所有平台的发布文件：

```bash
bun run build:single-exe:all
```

结果出现在 `cli/dist-exe/` 中——分别有macOS（ARM和x64）、Linux和Windows的文件。

## 代码检查

提交更改前运行检查很有用：

```bash
bun run typecheck    # 类型检查（TypeScript）
bun run test         # 运行测试
```

## 课程总结

- HAPI是由5个部分组成的 **monorepo**：cli、hub、web、shared、website
- 构建只需 **Bun**（`bun install` → `bun run build`）
- `bun run build:single-exe` 创建包含所有内容的单一文件
- `bun run dev` ——方便的开发模式，带自动重新加载
- 整个构建过程只需2-3条命令
