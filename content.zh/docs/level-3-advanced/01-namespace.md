---
title: "第1课：Namespace与团队协作"
weight: 1
bookToc: true
---

# 第1课：Namespace与团队协作

## 为什么需要这个

想象一下：你在一个三人团队中工作，共用一个HAPI hub（服务器中心）。如果没有特殊设置，所有人都能看到彼此的会话——这既不方便也不安全。**Namespace**（命名空间）解决了这个问题：每个团队成员在同一个hub上获得自己独立的"房间"。

> **Namespace**（读作"命名空间"）就像一栋公寓楼中的独立单元。楼只有一栋（hub），但每个住户（开发者）只能看到自己的公寓。

## 工作原理

Hub使用一个共享的访问令牌（`CLI_API_TOKEN`——连接用的密钥）。每个用户在令牌后面加上冒号和自己的名字——就获得了隔离的空间。

以下内容在namespace之间是隔离的：
- 🔒 会话（AI代理的工作会话）
- 🖥️ 机器（连接的电脑）
- 👤 用户

## 分步配置

### 第1步：配置Hub

在服务器（hub）上指定基础令牌，**不加**后缀：

```
CLI_API_TOKEN="my-team-secret-token"
```

⚠️ **重要：** hub上的令牌不应包含冒号。如果你不小心加了 `:什么`，hub会截断后缀并显示警告。

### 第2步：为团队分发令牌

每个成员获得带唯一名称的令牌：

| 成员 | 令牌 |
|----------|-------|
| Alice | `my-team-secret-token:alice` |
| Boris | `my-team-secret-token:boris` |
| Vika | `my-team-secret-token:vika` |

每人在HAPI设置中填写自己的令牌：

```bash
# Alice的电脑上
CLI_API_TOKEN="my-team-secret-token:alice"
```

### 第3步：通过Web和Telegram连接

通过Web界面登录或绑定Telegram时，使用带namespace的相同令牌：

```
my-team-secret-token:alice
```

## 重要限制

1. **一台电脑——一个namespace。** 不能在不同namespace中使用同一个机器ID。如果需要在同一台电脑上使用多个namespace——为每个使用单独的 `HAPI_HOME` 文件夹：

```bash
# 作为alice工作
HAPI_HOME=~/.hapi-alice hapi

# 作为boris工作
HAPI_HOME=~/.hapi-boris hapi
```

2. **切换namespace。** 在同一台机器上切换namespace前，先执行登出：

```bash
hapi auth logout
```

3. **远程启动（remote spawn）** 也按namespace隔离。要在同一台机器上使用多个namespace，需要为每个启动单独的runner（后台进程，用于远程任务）。

## 实际案例

三个自由职业者合租一台VPS（虚拟服务器）。每人从自己的笔记本连接：

```
VPS (hub) — 令牌："freelance-team-2025"
  ├── Alice (token: freelance-team-2025:alice) — 只看到自己的会话
  ├── Boris (token: freelance-team-2025:boris) — 只看到自己的会话
  └── Vika  (token: freelance-team-2025:vika)  — 只看到自己的会话
```

互不干扰，数据隔离，而且只需要为一台服务器付费。

## 课程总结

- **Namespace** 允许多人在同一个hub上安全工作
- 配置简单：基础令牌 + 冒号 + 用户名
- 会话、机器和用户在namespace之间完全隔离
- 要在同一台电脑上使用多个namespace，请使用单独的 `HAPI_HOME`
