---
title: "第4课：HAPI配置"
weight: 4
bookToc: true
---

# 第4课：HAPI配置

## 为什么需要这个

HAPI使用默认设置即可"开箱即用"。但有时你需要更改某些内容：更改端口、设置公共地址、连接Telegram机器人。本课将介绍如何根据自己的需求配置CLI和Hub。

---

## 配置文件存储位置

HAPI的所有文件都在一个文件夹中：

```
~/.hapi/
├── settings.json       # 主配置文件
├── hapi.db            # 数据库（会话、消息）
├── access.key         # CLI访问密钥
├── runner.state.json  # Runner状态
└── logs/              # 日志（工作记录）
```

> **`~`** 是你主目录的缩写。在macOS上是 `/Users/你的用户名`，在Linux上是 `/home/你的用户名`。

要更改此文件夹的位置：
```bash
export HAPI_HOME="~/my-custom-hapi-folder"
```

---

## 三种设置方式

HAPI从三个来源读取设置。如果同一设置在多处定义，列表中较高的来源优先：

1. **环境变量**（最高优先级）——`export HAPI_LISTEN_PORT=4000`
2. **settings.json文件** ——`~/.hapi/settings.json`
3. **默认值**（最低优先级）

> 💡 如果你通过环境变量设置了某项配置，而settings.json中还没有——HAPI会自动保存到文件中供以后使用。

---

## Hub设置

Hub是HAPI的服务器部分。以下是主要设置：

### 网络和访问

| 环境变量 | settings.json | 默认值 | 描述 |
|---------------------|---------------|-------------|----------|
| `HAPI_LISTEN_HOST` | `listenHost` | `127.0.0.1` | Hub监听连接的地址 |
| `HAPI_LISTEN_PORT` | `listenPort` | `3006` | Hub端口 |
| `HAPI_PUBLIC_URL` | `publicUrl` | — | 外部访问的公共地址 |
| `CORS_ORIGINS` | `corsOrigins` | — | 允许的请求来源 |

> **端口** 就像楼房中的门牌号。IP地址是楼房的地址，而端口指明要访问哪个具体程序。默认Hub"住在"3006端口。

> **`127.0.0.1`**（localhost）意味着Hub只接受来自你电脑的连接。如果你想让Hub在局域网中可访问，改为 `0.0.0.0`。

**示例：将端口改为8080**
```bash
export HAPI_LISTEN_PORT=8080
hapi hub
```

或在 `settings.json` 中：
```json
{
  "listenPort": 8080
}
```

**示例：开放局域网访问**
```json
{
  "listenHost": "0.0.0.0",
  "listenPort": 3006
}
```

### 认证

| 变量 | settings.json | 描述 |
|-----------|---------------|----------|
| `CLI_API_TOKEN` | `cliApiToken` | CLI与Hub之间通信的共享密钥 |

此令牌在首次启动时自动生成。它确保只有你的CLI能连接到Hub。

> ⚠️ 如果令牌被泄露——从 `settings.json` 中删除它并重启Hub。将生成新的令牌。

### Telegram

| 变量 | settings.json | 描述 |
|-----------|---------------|----------|
| `TELEGRAM_BOT_TOKEN` | `telegramBotToken` | @BotFather提供的机器人令牌 |
| `TELEGRAM_NOTIFICATION` | `telegramNotification` | 启用通知（`true`/`false`） |

### Relay

| 变量 | 描述 |
|-----------|----------|
| `HAPI_RELAY_FORCE_TCP` | 强制TCP模式（`true`/`false`） |

### 语音助手

| 变量 | 描述 |
|-----------|----------|
| `ELEVENLABS_API_KEY` | ElevenLabs API密钥 |
| `ELEVENLABS_AGENT_ID` | 自定义ElevenLabs代理ID |

### 数据库

| 变量 | 默认值 | 描述 |
|-----------|-------------|----------|
| `DB_PATH` | `~/.hapi/hapi.db` | 数据库文件路径 |

---

## CLI设置

CLI是客户端部分，用于启动AI代理。它的设置较少：

| 变量 | settings.json | 默认值 | 描述 |
|-----------|---------------|-------------|----------|
| `HAPI_API_URL` | `apiUrl` | `http://localhost:3006` | Hub连接地址 |
| `CLI_API_TOKEN` | `cliApiToken` | — | 认证令牌 |
| `HAPI_HOME` | — | `~/.hapi` | 配置文件夹 |
| `HAPI_EXPERIMENTAL` | — | `false` | 启用实验性功能 |

**示例：连接CLI到远程Hub**
```bash
export HAPI_API_URL="https://我的服务器.com"
export CLI_API_TOKEN="我的密钥令牌"
hapi
```

或使用交互式授权：
```bash
hapi auth login     # 登录
hapi auth status    # 检查状态
hapi auth logout    # 登出
```

---

## settings.json示例文件

完整示例及说明：

```json
{
  "$schema": "https://hapi.run/docs/schemas/settings.schema.json",
  "listenHost": "0.0.0.0",
  "listenPort": 3006,
  "publicUrl": "https://hapi.example.com",
  "telegramBotToken": "123456:ABC-DEF...",
  "telegramNotification": true,
  "corsOrigins": "https://hapi.example.com"
}
```

> 💡 `$schema` 字段是可选的，但如果你的编辑器支持JSON Schema，它会提示可用设置并检查错误。

---

## 实际场景

### 场景1：仅本地使用

无需更改任何设置！默认配置即可：
```bash
hapi hub    # Hub在localhost:3006
hapi        # CLI自动连接
```

### 场景2：通过Relay + Telegram访问

```bash
export TELEGRAM_BOT_TOKEN="你的机器人令牌"
export ELEVENLABS_API_KEY="你的密钥"
hapi hub --relay
```

### 场景3：多台电脑连接到同一Hub

在服务器上：
```bash
hapi hub
```

在每台工作电脑上：
```bash
export HAPI_API_URL="http://服务器地址:3006"
export CLI_API_TOKEN="共享令牌"
hapi
```

每台电脑获得唯一ID——Hub以此区分不同机器。

---

## 课程总结

- 设置存储在 `~/.hapi/` 文件夹中，主文件是 `settings.json`
- 三个设置来源：环境变量 > settings.json > 默认值
- Hub主要设置：端口（`3006`）、地址（`127.0.0.1`）、令牌、Telegram
- CLI通过 `HAPI_API_URL` 和 `CLI_API_TOKEN` 配置
- 大多数场景使用默认设置就够了——只在特殊场景才需要更改
