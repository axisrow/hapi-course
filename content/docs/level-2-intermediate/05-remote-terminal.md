---
title: "Lesson 5. Working with the Terminal Remotely"
weight: 5
bookToc: true
---

# Lesson 5. Working with the Terminal Remotely

## Why This Matters

You started a task on your work computer, but need to leave. With HAPI, you can **continue controlling the AI agent from your phone** — send commands, approve actions, and monitor progress. It's like a remote control for your terminal.

---

## Two Operating Modes

HAPI supports two modes that you can switch between instantly:

### Local Mode (in the terminal)

- You're sitting at the computer and working as usual
- Full terminal interface with syntax highlighting
- Instant response to key presses
- The AI agent runs directly on your machine

### Remote Mode (from phone/browser)

- Control via the Web App from anywhere in the world
- Approve permissions with one tap
- Monitor progress in real time
- The session continues running on your computer

---

## How to Switch Between Modes

### From Terminal → to Phone

Simply send a message from your phone (via the Web App). The terminal will automatically enter standby mode and show:

```
Remote mode - waiting for input
```

That's it! Control is now on the phone side.

### From Phone → to Terminal

Press **double space** in the terminal. You'll instantly regain local control — as if you never left.

> 💡 It's the same session — switching doesn't lose context, history, or state.

---

## Running Commands from Your Phone

### Step 1: Make sure Hub and Runner are running

```bash
hapi hub --relay           # Hub with internet access
hapi runner start          # Background service for remote launching
```

### Step 2: Open the Web App on your phone

Scan the QR code shown by the Hub, or navigate to the URL.

### Step 3: Manage sessions

In the Web App you can:

- **Open an existing session** — tap on it in the list
- **Create a new session** — tap the "New Session" button and select a machine
- **Send a message to the agent** — type in the input field, like in a regular messenger
- **Browse files** — open the session's file browser
- **View code changes** — git diffs right in the interface

---

## AFK Mode: "Away From Keyboard"

**AFK** (*Away From Keyboard*) is the scenario HAPI was built for:

### Typical Scenario

```
09:00  You're at the computer. Run: hapi
       Give a task: "Refactor the payment module"
       
09:10  You go for coffee ☕
       
09:12  Agent wants to modify payment.ts
       → Notification on your phone!
       → Open Web App → Press "Approve" ✅
       
09:15  Agent wants to run tests
       → Notification on your phone
       → "Approve" ✅
       
09:20  You return to the computer
       → Double space → back in the terminal
       → Agent already finished! 🎉
```

---

## Approving Actions

When an AI agent wants to perform a potentially dangerous action (modify a file, run a command), it requests your permission.

### What a Permission Request Looks Like

In the Web App you'll see:
- **What** the agent wants to do (e.g., "Edit file: src/payment.ts")
- **Details** — exactly what changes are proposed
- **Approve** and **Deny** buttons

### Approval Methods

| Method | How |
|--------|-----|
| Web App | Press the "Approve" or "Deny" button |
| Telegram | Receive a notification from the bot, respond |
| Voice | Say "yes" or "no" to the voice assistant |
| Terminal | If you're at the computer — confirm as usual |

---

## Remote Session Launch

With Runner, you can **create new sessions right from your phone**, even if no terminal is open on the computer.

### How It Works

1. Runner runs in the background on your computer
2. In the Web App, press **"+"** (new session)
3. Select a machine from the list
4. Choose an AI agent (Claude, Codex, Gemini)
5. Optionally: specify a working directory
6. The session starts on your computer — control it from your phone!

```
Phone → Web App → Hub → Runner → New CLI session
                                         │
                                    AI agent is working
                                    on your computer
```

---

## Practical Tips

### 1. Set Up Notifications

Connect a Telegram bot to receive push notifications:
```bash
export TELEGRAM_BOT_TOKEN="your-token"
hapi hub --relay
```

Now permission requests will come directly to Telegram — no need to keep the Web App open.

### 2. Install the PWA

Open the Web App in your mobile browser and "Add to Home Screen." The app will work like a regular app — with an icon, full-screen mode, and quick access.

### 3. Use pm2 for Reliability

```bash
pm2 start "hapi hub --relay" --name hapi-hub
pm2 start "hapi runner start --foreground" --name hapi-runner
pm2 save
```

This way the Hub and Runner will run permanently, even after a computer reboot.

### 4. Multiple Machines

If you have multiple computers (work + home), install CLI and Runner on each and connect them to a single Hub. In the Web App, you'll see all machines and can launch sessions on any of them.

---

## Lesson Summary

- HAPI lets you control the AI agent **from your phone** — send tasks and approve actions
- Switching between terminal and phone is **instant** (double space)
- **AFK mode** — leave the computer and the agent keeps working; you approve actions from your phone
- **Runner** lets you launch new sessions remotely
- Notifications can be received via **Telegram**, **Web App**, or **voice assistant**
- Install PWA and pm2 for the most convenient workflow
