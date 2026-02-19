---
title: "Lesson 1. How HAPI Works"
weight: 1
bookToc: true
---

# Lesson 1. How HAPI Works

## Why This Matters

In the first level, you learned how to launch HAPI and work with it. Now let's understand **how it works under the hood**. This will help you understand what's happening behind the scenes, find problems faster, and customize the system to your needs.

## Four Main Components

HAPI consists of four parts that work together as a team:

```
┌──────────────────────────────────────────────────┐
│            Your Computer                         │
│                                                  │
│   CLI ◄──────► Hub ◄──────► Web App              │
│  (agent)      (server)      (browser)            │
│                  │                               │
└──────────────────┼───────────────────────────────┘
                   │
              Relay (tunnel)
                   │
              📱 Phone
```

Let's break down each one.

---

### 1. CLI — Wrapper Around the AI Agent

**CLI** (Command Line Interface) is the program you launch in the terminal with the `hapi` command.

What it does:
- **Launches the AI agent** (Claude Code, Codex, Gemini, or OpenCode) — the "smart assistant" that writes code
- **Connects to the Hub** — so you can manage the session remotely
- **Relays messages** between you and the agent
- **Sends permission requests** — when the agent wants to do something (e.g., edit a file), it asks you first

**Launch examples:**
```bash
hapi              # Start a session with Claude Code
hapi codex        # Start a session with OpenAI Codex
hapi gemini       # Start a session with Google Gemini
```

> 💡 **Simple analogy:** CLI is like a car driver. It controls the AI agent and communicates with the dispatcher (Hub).

---

### 2. Hub — Central Server

**Hub** is HAPI's "dispatch center." It runs on your computer and coordinates everything else.

What it does:
- **Stores data** in a SQLite database (all sessions, messages, permissions)
- **Serves the web interface** — the page you open in the browser
- **Links CLI and web app** in real time
- **Sends notifications** to Telegram

**Hub communication technologies:**

| Connection | Technology | What it is |
|-------|-----------|---------|
| Hub ↔ CLI | Socket.IO | Two-way real-time communication (like a chat) |
| Hub ↔ Browser | REST + SSE | REST — for actions (send a message), SSE — for instant updates |

> **REST** is a way programs communicate over the internet (like sending letters). **SSE** (*Server-Sent Events*) is a technology where the server pushes updates to the browser (like a radio broadcast). **Socket.IO** is a technology for two-way real-time communication (like a phone call).

**Starting the Hub:**
```bash
hapi hub           # Local mode
hapi hub --relay   # With internet access
```

---

### 3. Web App — Browser Interface

**Web App** is a React application (PWA) that opens in your phone's or computer's browser.

> **PWA** (*Progressive Web App*) is a website that can be "installed" on your phone like a regular app. It works even without a constant internet connection.

What you can do in the Web App:
- 📋 **View session list** — all active and past sessions
- 💬 **Send messages to the agent** — like in a regular chat
- ✅ **Approve or deny actions** — when the agent asks permission
- 📁 **Browse project files** — and see code changes
- 🚀 **Launch new sessions** — right from your phone

---

### 4. Relay — Tunnel for Remote Access

**Relay** is a service that lets you connect to your Hub over the internet, even if your computer is behind a router or firewall.

> **Firewall** is a protective barrier that blocks unwanted connections to your computer from the internet. **NAT** is a technology in your router that "hides" your computer from the outside world.

When you run `hapi hub --relay`, here's what happens:

1. The Hub connects to the Relay server
2. Relay creates a public address (URL) for your Hub
3. You get a QR code that you can scan with your phone
4. Your phone connects to the Hub through the Relay

---

## Encryption: WireGuard + TLS

HAPI takes security seriously. All traffic through the Relay is protected by **double encryption**:

1. **WireGuard** is a VPN protocol (a technology for creating a secure "tunnel" between two devices). It encrypts data so that nobody between you and your computer can read it.

2. **TLS** (*Transport Layer Security*) is the same type of encryption used on websites with the "lock" icon (https://). This is the second layer of protection.

> 💡 **Simple analogy:** Imagine you're sending a letter. WireGuard is a safe you put the letter in. TLS is an armored truck that transports the safe. Even if someone intercepts the truck, they can't get to the letter's contents.

```
Your phone → [TLS encryption] → [WireGuard tunnel] → Relay → Hub on your computer
```

---

## How Everything Works Together

### Scenario: You send a message from your phone

```
1. You write a message in the Web App on your phone
         │
2. The message reaches the Hub through the Relay
         │
3. Hub forwards the message to CLI via Socket.IO
         │
4. CLI passes the message to the AI agent
         │
5. The agent processes the request and responds
         │
6. The response goes back: CLI → Hub → SSE → Web App
         │
7. You see the response on your phone screen
```

### Scenario: The agent requests permission

```
1. The AI agent wants to edit a file
         │
2. CLI sends a permission request to the Hub
         │
3. Hub saves the request and notifies you (SSE + Telegram)
         │
4. You receive a notification on your phone
         │
5. You press "Approve" in the Web App
         │
6. Hub forwards the decision to CLI → the agent continues
```

---

## Switching Between Local and Remote Mode

One of HAPI's key features is the ability to switch between the terminal and phone **without losing the session**.

| Direction | How it works |
|-------------|-----------------|
| **Terminal → Phone** | Send a message from your phone — the terminal automatically enters standby mode |
| **Phone → Terminal** | Press double space in the terminal — instantly regain local control |

It's like a remote control: you can control the same TV from the couch or by walking up to it.

---

## Lesson Summary

- **CLI** — launches and controls the AI agent on your computer
- **Hub** — central server that links all parts together and stores data
- **Web App** — browser interface for management from any device
- **Relay** — secure tunnel for internet access
- Traffic is protected by double encryption: **WireGuard + TLS**
- You can freely switch between the terminal and phone without losing the session
