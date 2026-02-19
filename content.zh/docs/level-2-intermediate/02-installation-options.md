---
title: "第2课：HAPI安装选项"
weight: 2
bookToc: true
---

# 第2课：HAPI安装选项

## 为什么需要这个

在第一级课程中，你可能使用了最简单的方式安装HAPI。但HAPI支持多种连接方式——从"开箱即用"到完全自托管部署。本课将介绍每种方式，帮助你选择最适合的。

## 回顾：HAPI的三个组件

在选择安装方式之前，先回顾一下结构：

| 组件 | 功能 | 是否必需？ |
|-----------|-----------|-------------|
| **CLI** | 启动AI代理 | 是 |
| **Hub** | 中央服务器，存储数据 | 是 |
| **Runner** | 后台服务，用于远程启动会话 | 可选 |

---

## 安装CLI

有几种安装CLI的方式：

### 方式1：npm（推荐）

```bash
npm install -g @twsxtd/hapi
```

> **npm** 是JavaScript的包管理器。如果你安装了Node.js，npm已经在你的电脑上了。

### 方式2：Homebrew（macOS）

```bash
brew install tiann/tap/hapi
```

### 方式3：无需安装（npx）

```bash
npx @twsxtd/hapi
```

这种方式"即时"下载并运行HAPI——方便快速验证。

### 方式4：预编译文件（binary）

从 [GitHub Releases](https://github.com/tiann/hapi/releases) 下载文件并执行：

```bash
chmod +x ./hapi              # 允许执行
sudo mv ./hapi /usr/local/bin/  # 移动到系统目录
```

---

## Hub的四种连接方式

核心问题是：**你如何从手机连接到Hub？** 以下是四种方式：

---

### 方式1：Relay（默认） ⭐

**是什么：** 内置服务，自动通过互联网创建到Hub的安全隧道。

**适合谁：** 大多数用户。开箱即用。

**如何启动：**
```bash
hapi hub --relay
```

启动后终端会显示：
- 访问URL地址
- QR码——用手机扫描

**优点：**
- ✅ 无需配置——直接可用
- ✅ 可穿透NAT和防火墙（即使ISP"隐藏"了你的电脑）
- ✅ WireGuard + TLS加密
- ✅ 免费

**注意事项：**
- 默认使用UDP协议。如果连接有问题，启用TCP模式：

```bash
export HAPI_RELAY_FORCE_TCP=true
hapi hub --relay
```

> **UDP和TCP** 是互联网上传输数据的两种方式。UDP更快，但可能被某些网络阻止。TCP更可靠，几乎在任何地方都能工作。

---

### 方式2：Cloudflare Tunnel

**是什么：** Cloudflare公司提供的免费服务，为你的服务器创建安全隧道。

**适合谁：** 想要自定义域名（如 `hapi.你的网站.com`）并需要更多控制的用户。

**如何配置：**

1. 从 [Cloudflare网站](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/) 安装 `cloudflared`

2. 创建命名隧道：
```bash
cloudflared tunnel create hapi
cloudflared tunnel route dns hapi hapi.yourdomain.com
```

3. 启动隧道：
```bash
cloudflared tunnel --protocol http2 run hapi
```

4. 启动Hub（不加--relay）：
```bash
hapi hub
```

**优点：**
- ✅ 自定义域名
- ✅ 免费
- ✅ Cloudflare的可靠基础设施

**注意事项：**
- ⚠️ **不支持快速隧道（TryCloudflare）** ——它们不支持HAPI用于实时更新的SSE。需要"命名"（named）隧道。
- ⚠️ 使用 `--protocol http2` 标志——QUIC协议（默认）可能导致长连接问题。

---

### 方式3：Tailscale

**是什么：** VPN服务，将你的设备组成私有网络。所有设备获得特殊IP地址，像在同一个局域网中一样互相"可见"。

**适合谁：** 拥有多个设备且想要简单私有网络的用户。

**如何配置：**

1. 安装Tailscale：[tailscale.com/download](https://tailscale.com/download)
2. 连接：
```bash
sudo tailscale up
```
3. 启动Hub：
```bash
hapi hub
```
4. 在手机浏览器中打开（手机上也需要安装Tailscale）：
```
http://100.x.x.x:3006
```

> 地址 `100.x.x.x` 是你的Tailscale IP。可以通过 `tailscale ip` 命令查看。

**优点：**
- ✅ 完全私有网络——流量不经过他人服务器
- ✅ 配置简单
- ✅ 个人使用免费（最多100台设备）

**注意事项：**
- ⚠️ 需要在**所有**设备上安装Tailscale（电脑+手机）

---

### 方式4：自托管（Self-hosted）

**是什么：** 你在具有公网IP地址的服务器（VPS、云服务器）上部署Hub。

**适合谁：** 想要完全控制的高级用户。

**如何配置：**

1. 在服务器（VPS）上启动Hub：
```bash
hapi hub
```

2. 配置反向代理（Nginx、Caddy）以启用HTTPS：

> **反向代理**（reverse proxy）是一个程序，接收来自互联网的请求并将其转发到你的Hub。它还可以添加HTTPS加密。

3. 在你的工作电脑上配置CLI连接到服务器：
```bash
export HAPI_API_URL="https://你的服务器.com"
export CLI_API_TOKEN="你的令牌"
hapi
```

或使用交互式授权：
```bash
hapi auth login
```

**优点：**
- ✅ 完全控制一切
- ✅ 最小延迟（如果服务器距离近）
- ✅ 不依赖第三方服务

**注意事项：**
- ⚠️ 需要服务器（VPS）——约$5/月起
- ⚠️ 需要配置HTTPS（Let's Encrypt——免费）
- ⚠️ 需要关注安全性

---

## 对比表

| 标准 | Relay | Cloudflare | Tailscale | 自托管 |
|----------|-------|-----------|-----------|-------------|
| 难度 | ⭐ 简单 | ⭐⭐ 中等 | ⭐⭐ 中等 | ⭐⭐⭐ 复杂 |
| 费用 | 免费 | 免费 | 免费 | VPS约$5/月 |
| 自定义域名 | 否 | 是 | 否 | 是 |
| 加密 | WireGuard+TLS | TLS | WireGuard | 自行配置 |
| 隐私性 | 经过Relay服务器 | 经过Cloudflare | 完全私有 | 完全私有 |

---

## 配置Runner（后台服务）

无论选择哪种连接方式，你都可以配置 **Runner** ——后台服务，允许从手机启动会话：

```bash
hapi runner start      # 启动
hapi runner status     # 检查状态
hapi runner logs       # 查看日志
hapi runner stop       # 停止
```

启动Runner后：
- 你的电脑会出现在Web App的"机器"列表中
- 你可以远程启动新会话
- 关闭终端后会话仍继续运行

---

## 如何让HAPI持续运行

为了让Hub和Runner在关闭终端后不停止：

### 快速方式（nohup）：
```bash
nohup hapi hub --relay > ~/.hapi/logs/hub.log 2>&1 &
nohup hapi runner start --foreground > ~/.hapi/logs/runner.log 2>&1 &
```

### 可靠方式（pm2）：
```bash
npm install -g pm2
pm2 start "hapi hub --relay" --name hapi-hub
pm2 start "hapi runner start --foreground" --name hapi-runner
pm2 startup   # 开机自启
pm2 save
```

> **pm2** 是一个进程管理器，在崩溃和电脑重启时自动重新启动程序。

---

## 课程总结

- **Relay** 是最简单的方式，开箱即用，适合大多数人
- **Cloudflare Tunnel** ——如果你想要自定义域名和可靠的基础设施
- **Tailscale** ——如果你想要设备之间完全私有的网络
- **自托管** ——如果你想要完全控制且拥有自己的服务器
- **Runner** 允许从手机远程启动会话
- 使用 **pm2** 或 **systemd** 让HAPI持续运行
