---
title: "第3课：快速开始"
weight: 3
bookToc: true
---

# 第3课：快速开始

## 为什么需要这个

你已经安装了HAPI——是时候启动它了！在本课中，我们将在5分钟内启动HAPI，获取QR码并从手机连接。总共只需两条命令。

## 第1步：启动Hub

打开终端并输入：

```bash
npx @twsxtd/hapi hub --relay
```

或者，如果你全局安装了HAPI：

```bash
hapi hub --relay
```

> 💡 `hapi server` 也可以使用——这是同一命令的别名。

**发生了什么：**
- 在你的电脑上启动了 **hub**（控制中心）
- `--relay` 标志连接了中继器，以便通过互联网访问
- 流量使用WireGuard + TLS加密

**终端中你会看到：**

```
🚀 Hub started on http://localhost:3006
🔗 Remote URL: https://xxxx.relay.example.com
📱 Scan QR code to connect:

█████████████████████████
█████████████████████████
████ ▄▄▄▄▄ █▄█▄█ ▄▄▄▄▄ ████
████ █   █ █▀▀▀█ █   █ ████
...

🔑 Access token: abc123def456...
```

其中：
- **Remote URL** ——从手机连接的地址
- **QR码** ——同一地址，以图片形式方便扫描
- **Access token** ——登录密码（请保存好！）

> ⚠️ **不要关闭这个终端！** Hub必须持续运行。请打开新终端执行下一步。

## 第2步：启动AI代理

打开**第二个**终端并输入：

```bash
npx @twsxtd/hapi
```

或者：

```bash
hapi
```

**发生了什么：**
- 启动了带HAPI包装的 **Claude Code**（默认AI代理）
- 会话自动注册到hub
- 你可以像往常一样使用Claude Code

> 💡 使用其他AI代理：
> ```bash
> hapi codex      # OpenAI Codex
> hapi gemini     # Google Gemini
> hapi opencode   # OpenCode
> ```

## 第3步：从手机连接

现在是最精彩的部分！

### 方式A：扫描QR码

1. 打开手机相机（或任何QR码扫描器）
2. 对准终端中的QR码
3. 点击链接

### 方式B：手动打开URL

1. 从终端复制 **Remote URL**
2. 在手机浏览器中打开

### 输入令牌

首次连接时HAPI会要求输入 **Access token**——就是终端中显示的那个密码。输入后点击"登录"。

> 💡 令牌只需输入一次——浏览器会记住它。

## 第4步：验证连接

登录后你会看到HAPI的Web界面，包含：

- **会话列表** ——你的Claude Code会话已在其中
- **聊天** ——可以向AI代理发送消息
- **连接状态** ——绿色指示灯表示一切正常

试着从手机发送消息！你会看到AI代理在手机和终端上同时响应。

## 每条命令的含义

| 命令 | 功能 |
|---|---|
| `hapi hub` | 启动hub（本地访问） |
| `hapi hub --relay` | 启动hub并可通过互联网访问 |
| `hapi` | 启动带HAPI包装的Claude Code |
| `hapi codex` | 启动带HAPI包装的Codex |
| `hapi gemini` | 启动带HAPI包装的Gemini |

## 典型工作流程

```
终端1（hub）：              终端2（代理）：            手机：
                            
hapi hub --relay            hapi                       扫描QR码
    │                          │                           │
    │◄─── 连接 ──────────────►│                           │
    │                          │                           │
    │◄──────────── 查看/控制 ─────────────────────────────►│
```

## 问题排查

### "Connection refused"

Hub未运行。确认第一个终端中的 `hapi hub --relay` 仍在运行。

### QR码无法扫描

尝试放大终端窗口，使QR码完整显示。或者手动复制URL。

### "Invalid token"

检查令牌是否正确。可以在 `~/.hapi/settings.json` 中找到：

```bash
cat ~/.hapi/settings.json
```

### Relay无法连接

如果你的UDP连接有问题（某些网络会阻止UDP），尝试TCP模式：

```bash
HAPI_RELAY_FORCE_TCP=true hapi hub --relay
```

## 课程总结

- **两条命令** 就是启动所需的一切：`hapi hub --relay` 和 `hapi`
- **QR码** 可以即时从手机连接
- **Access token** 是你的登录密码，只需输入一次
- Hub必须在单独的终端中持续运行
- 所有连接都是**加密的** ——relay看不到你的数据

在下一课中，我们将把HAPI的Web界面变成手机上的完整应用。
