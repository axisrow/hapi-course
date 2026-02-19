---
title: "第5课：使用AI代理"
weight: 5
bookToc: true
---

# 第5课：使用AI代理

## 为什么需要这个

HAPI支持多个AI代理——不仅仅是Claude Code。在本课中，你将学习如何启动不同的代理、在它们之间切换以及直接从手机审批请求。

## 支持哪些AI代理

| 代理 | 公司 | 启动命令 |
|---|---|---|
| **Claude Code** | Anthropic | `hapi` |
| **Codex** | OpenAI | `hapi codex` |
| **Gemini CLI** | Google | `hapi gemini` |
| **OpenCode** | 开源 | `hapi opencode` |

> 💡 默认情况下（只输入 `hapi`）启动的是Claude Code。这是最流行的选择。

## 启动不同的代理

### 准备工作

确保hub已经在运行（来自第3课）：

```bash
hapi hub --relay
```

### 启动Claude Code

```bash
hapi
```

这将在HAPI包装器中启动Claude Code。你在终端中像往常一样使用它，但现在会话在手机上也可见。

### 启动Codex

```bash
hapi codex
```

### 启动Gemini

```bash
hapi gemini
```

### 启动OpenCode

```bash
hapi opencode
```

> ⚠️ 启动前确保所需的代理已安装。例如，对于Claude Code：`claude --version`。如果命令未找到——需要单独安装该代理。

## 同时运行多个会话

你可以同时运行**多个代理**！每个在单独的终端中：

```
终端1：hapi hub --relay     ← hub（始终只有一个）
终端2：hapi                 ← Claude Code（会话1）
终端3：hapi codex           ← Codex（会话2）
终端4：hapi gemini          ← Gemini（会话3）
```

所有会话都会出现在Web界面的列表中。你可以在手机上在它们之间切换。

## 从手机审批请求

这是HAPI的核心功能之一。以下是工作原理：

### 界面展示

1. AI代理想执行一个操作（例如编辑文件）
2. 它发送一个**权限请求**
3. 你的手机收到**通知** 🔔
4. 打开HAPI，看到请求：

```
Claude Code想要：
📝 编辑文件 src/app.js

[✅ 批准]  [❌ 拒绝]
```

5. 点击**"批准"** ——代理继续工作
6. 或**"拒绝"** ——代理不会执行该操作

### 为什么需要审批

AI代理功能强大，但有时会犯错。审批系统是你的**控制手段**：
- 你可以在代理执行之前看到它想做什么
- 你可以阻止不需要的更改
- 你始终了解代码发生了什么

### 通过Telegram审批

如果你配置了Telegram机器人（这是高级课程的主题），通知会直接发送到Telegram。无需离开即时通讯工具即可审批。

## Seamless Handoff实战

以下是使用HAPI的典型工作日场景：

### 早上：在电脑前工作

```bash
hapi hub --relay    # 在第一个终端
hapi                # 在第二个终端
```

你像平常一样在终端中使用Claude Code。分配任务、讨论代码。

### 午餐：切换到手机

你离开电脑。但Claude Code继续工作！从手机你可以：
- 在聊天中跟踪进度
- 一键审批请求
- 发送额外指令

电脑终端显示：**"Remote mode — waiting for input"**。

### 午餐后：回到电脑

坐到电脑前，在终端中按**双空格**。立即恢复本地控制。继续工作，就像什么都没发生过一样。

## 远程启动会话

另一个有用的功能：即使你远离电脑，也可以从手机**启动新会话**。

为此需要 **Runner** ——后台服务：

```bash
hapi runner start
```

之后：
1. 在手机上打开HAPI
2. 在"Machines"（机器）列表中你会看到你的电脑
3. 点击创建新会话
4. 选择AI代理并开始工作

> 💡 当你想在家用电脑上启动任务而人在其他地方时，Runner很有用。

## 诊断

如果出现问题，HAPI有内置诊断功能：

```bash
hapi doctor
```

这条命令会检查：
- 与hub的连接
- 令牌是否正确
- AI代理是否存在
- 系统整体状态

## 课程总结

- HAPI支持 **4个AI代理**：Claude Code、Codex、Gemini、OpenCode
- 可以在不同终端中同时运行**多个会话**
- 从手机**审批请求** ——你对AI操作的控制
- **Seamless Handoff** 让你在电脑和手机之间平滑切换
- **Runner** 允许远程启动会话
- `hapi doctor` 命令帮助查找问题

## 接下来

恭喜！🎉 你已经完成了所有5节初级课程。现在你学会了：

1. ✅ 理解什么是HAPI以及它与Happy的区别
2. ✅ 在电脑上安装HAPI
3. ✅ 启动hub并从手机连接
4. ✅ 使用Web界面和PWA
5. ✅ 使用不同的AI代理并远程审批请求

在下一级课程中，我们将探讨高级主题：配置Telegram机器人、自托管、语音控制等等。
