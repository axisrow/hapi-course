---
title: "第2课：安装HAPI"
weight: 2
bookToc: true
---

# 第2课：安装HAPI

## 为什么需要这个

在用手机控制AI代理之前，需要先在电脑上安装HAPI。好消息是：只需一条命令就能完成。本课将引导你完成从头到尾的整个过程。

## 安装前提条件

### 1. 运行macOS、Linux或Windows的电脑

HAPI可以在这些系统上运行。普通的笔记本电脑或台式机都可以。

### 2. Node.js（18版或更新版本）

**Node.js** 是一个允许运行JavaScript程序的平台。HAPI是用JavaScript编写的，所以需要Node.js。

**如何检查Node.js是否已安装：**

打开终端并输入：

```bash
node --version
```

如果看到类似 `v22.22.0` 的输出——一切正常。如果找不到命令——需要安装。

**如何打开终端：**
- **macOS**：通过Spotlight搜索"Terminal"（Cmd + 空格），或在"应用程序"→"实用工具"中找到
- **Windows**：在开始菜单中搜索"PowerShell"或"命令提示符"
- **Linux**：通常是 Ctrl + Alt + T

**如何安装Node.js：**

1. 访问 [nodejs.org](https://nodejs.org)
2. 下载 **LTS**（Long Term Support——长期支持版）
3. 运行安装程序并按照提示操作

> 💡 **替代方案**：可以使用 **Bun** 代替Node.js——它更快。可以从 [bun.sh](https://bun.sh) 下载。但对初学者来说，推荐使用Node.js——它更为普及。

### 3. AI代理（至少一个）

HAPI是AI代理的包装器，所以至少需要一个：

```bash
# 检查Claude Code
claude --version

# 检查Codex
codex --version

# 检查Gemini
gemini --version
```

如果你还没有AI代理，最流行的选择是 **Claude Code**：

```bash
npm install -g @anthropic-ai/claude-code
```

## 安装HAPI

有几种方式，选择最方便的。

### 方式1：npx（无需安装）——最简单

**npx** 是随Node.js一起安装的工具。它可以一条命令下载并运行程序，而无需"永久"安装。

```bash
npx @twsxtd/hapi
```

这种方式适合初次体验。每次npx都会检查更新。

### 方式2：通过npm全局安装

**npm**（Node Package Manager）是随Node.js一起提供的包管理器。全局安装意味着程序可以从任何目录访问。

```bash
npm install -g @twsxtd/hapi
```

之后只需输入 `hapi` 即可，无需 `npx @twsxtd/hapi`。

### 方式3：Homebrew（仅macOS和Linux）

**Homebrew** 是macOS上流行的包管理器。如果已安装：

```bash
brew install tiann/tap/hapi
```

## 验证安装

安装后执行：

```bash
hapi --help
```

如果一切顺利，你会看到可用命令列表。

## 首次启动时创建的内容

首次启动HAPI时，它会创建 `~/.hapi/` 文件夹及其配置：

```
~/.hapi/
├── settings.json      # 设置（访问令牌、地址）
├── hapi.db           # 数据库（存储会话）
└── logs/             # 日志（工作记录）
```

> 💡 符号 `~` 表示你的主目录。在macOS上是 `/Users/你的用户名/`，在Linux上是 `/home/你的用户名/`。

## 系统要求

| 要求 | 最低 | 推荐 |
|---|---|---|
| 操作系统 | macOS、Linux、Windows | macOS或Linux |
| Node.js | 18+ | 22+（LTS） |
| 内存 | 512 MB | 2 GB |
| 磁盘空间 | 100 MB | 500 MB |
| 网络 | 用于relay连接 | 稳定的网络连接 |

## 常见问题

### "command not found: node"

Node.js未安装。请访问 [nodejs.org](https://nodejs.org) 并安装。

### 安装时出现"permission denied"

在macOS/Linux上尝试：
```bash
sudo npm install -g @twsxtd/hapi
```

`sudo` 是一个以管理员权限运行后续命令的命令。系统会要求输入密码。

### "EACCES"错误

这也是权限问题。最好的解决方案是配置npm无需sudo运行：

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

之后无需 `sudo` 重新安装即可。

## 课程总结

- HAPI需要 **Node.js**（18+版本）和至少一个 **AI代理**
- 最简单的试用方式：`npx @twsxtd/hapi`
- 长期使用：`npm install -g @twsxtd/hapi`
- 首次启动时HAPI会创建 `~/.hapi/` 文件夹及配置
- 如果出现问题——检查Node.js版本和访问权限

在下一课中，我们将启动HAPI并从手机连接。
