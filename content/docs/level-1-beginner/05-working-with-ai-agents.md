---
title: "Lesson 5. Working with AI Agents"
weight: 5
bookToc: true
---

# Lesson 5. Working with AI Agents

## Why This Matters

HAPI supports multiple AI agents — not just Claude Code. In this lesson, you'll learn how to launch different agents, switch between them, and approve their requests right from your phone.

## Supported AI Agents

| Agent | Company | Launch command |
|---|---|---|
| **Claude Code** | Anthropic | `hapi` |
| **Codex** | OpenAI | `hapi codex` |
| **Gemini CLI** | Google | `hapi gemini` |
| **OpenCode** | Open source | `hapi opencode` |

> 💡 By default (just `hapi`), Claude Code is launched. It's the most popular option.

## Launching Different Agents

### Preparation

Make sure the hub is already running (from lesson 3):

```bash
hapi hub --relay
```

### Launch Claude Code

```bash
hapi
```

This launches Claude Code with the HAPI wrapper. You work with it as usual in the terminal, but now the session is also visible from your phone.

### Launch Codex

```bash
hapi codex
```

### Launch Gemini

```bash
hapi gemini
```

### Launch OpenCode

```bash
hapi opencode
```

> ⚠️ Before launching, make sure the agent is installed. For example, for Claude Code: `claude --version`. If the command is not found — install the agent separately.

## Multiple Sessions Simultaneously

You can run **multiple agents** at the same time! Each in a separate terminal:

```
Terminal 1: hapi hub --relay     ← hub (always one)
Terminal 2: hapi                 ← Claude Code (session 1)
Terminal 3: hapi codex           ← Codex (session 2)
Terminal 4: hapi gemini          ← Gemini (session 3)
```

All sessions will appear in the list in the web interface. You can switch between them on your phone.

## Approving Requests from Your Phone

This is one of HAPI's key features. Here's how it works:

### What It Looks Like

1. The AI agent wants to perform an action (e.g., edit a file)
2. It sends a **permission request**
3. You receive a **notification on your phone** 🔔
4. You open HAPI and see the request:

```
Claude Code wants to:
📝 Edit file src/app.js

[✅ Approve]  [❌ Deny]
```

5. Press **"Approve"** — the agent continues working
6. Or **"Deny"** — the agent won't perform the action

### Why Approval Is Needed

AI agents are powerful but sometimes make mistakes. The approval system is your **control**:
- You see exactly what the agent wants to do before it does it
- You can stop unwanted changes
- You always know what's happening with your code

### Approval via Telegram

If you've set up a Telegram bot (a topic for the advanced course), notifications come directly to Telegram. You can approve without leaving the messenger.

## Seamless Handoff in Action

Here's a typical workday scenario with HAPI:

### Morning: Working at the Computer

```bash
hapi hub --relay    # in the first terminal
hapi                # in the second terminal
```

You work with Claude Code in the terminal as usual. Give tasks, discuss code.

### Lunch: Switching to Phone

You leave the computer. But Claude Code keeps working! From your phone, you:
- Monitor progress in the chat
- Approve requests with one tap
- Send additional instructions

The terminal on the computer shows: **"Remote mode — waiting for input"**.

### After Lunch: Returning to the Computer

You sit down at the computer and press **double space** in the terminal. Local control returns instantly. You continue working as if nothing happened.

## Remote Session Launch

Another useful feature: you can **launch new sessions** right from your phone, even when you're far from the computer.

For this, you need the **Runner** — a background service:

```bash
hapi runner start
```

After that:
1. Open HAPI on your phone
2. In the "Machines" list, you'll see your computer
3. Tap to create a new session
4. Choose an AI agent and start working

> 💡 Runner is useful when you want to start a task on your home computer while you're somewhere else.

## Diagnostics

If something isn't working, HAPI has built-in diagnostics:

```bash
hapi doctor
```

This command will check:
- Connection to the hub
- Token validity
- Presence of AI agents
- Overall system health

## Lesson Summary

- HAPI supports **4 AI agents**: Claude Code, Codex, Gemini, OpenCode
- You can run **multiple sessions** simultaneously in different terminals
- **Request approval** from your phone — your control over AI actions
- **Seamless Handoff** lets you smoothly switch between computer and phone
- **Runner** lets you launch sessions remotely
- The `hapi doctor` command helps find problems

## What's Next

Congratulations! 🎉 You've completed all 5 beginner lessons. Now you know how to:

1. ✅ Understand what HAPI is and how it differs from Happy
2. ✅ Install HAPI on your computer
3. ✅ Launch the hub and connect from your phone
4. ✅ Use the web interface and PWA
5. ✅ Work with different AI agents and approve requests remotely

In the next course level, we'll cover advanced topics: Telegram bot setup, self-hosting, voice control, and much more.
