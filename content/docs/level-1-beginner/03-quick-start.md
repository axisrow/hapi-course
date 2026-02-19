---
title: "Lesson 3. Quick Start"
weight: 3
bookToc: true
---

# Lesson 3. Quick Start

## Why This Matters

You've installed HAPI — time to launch it! In this lesson, we'll get HAPI running in 5 minutes, get a QR code, and connect from your phone. Just two commands.

## Step 1. Start the Hub

Open a terminal and type:

```bash
npx @twsxtd/hapi hub --relay
```

Or, if you installed HAPI globally:

```bash
hapi hub --relay
```

> 💡 `hapi server` also works — it's an alternative name for the same command.

**What happens:**
- The **hub** (control center) starts on your computer
- The `--relay` flag connects the relay for internet access
- Traffic is encrypted using WireGuard + TLS

**What you'll see in the terminal:**

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

Here:
- **Remote URL** — the address for connecting from your phone
- **QR code** — the same address as a scannable image
- **Access token** — the password for login (save it!)

> ⚠️ **Don't close this terminal!** The Hub must keep running. Open a new terminal for the next step.

## Step 2. Start the AI Agent

Open a **second** terminal and type:

```bash
npx @twsxtd/hapi
```

Or:

```bash
hapi
```

**What happens:**
- **Claude Code** (the default AI agent) starts with the HAPI wrapper
- The session is automatically registered with the hub
- You can work with Claude Code as usual

> 💡 For other AI agents, use:
> ```bash
> hapi codex      # OpenAI Codex
> hapi gemini     # Google Gemini
> hapi opencode   # OpenCode
> ```

## Step 3. Connect from Your Phone

Now the exciting part!

### Option A: Scan the QR Code

1. Open your phone camera (or any QR code scanner)
2. Point it at the QR code in the terminal
3. Follow the link

### Option B: Open the URL Manually

1. Copy the **Remote URL** from the terminal
2. Open it in the browser on your phone

### Enter the Token

On first connection, HAPI will ask for the **Access token** — the password that appeared in the terminal. Enter it and press "Login."

> 💡 You only need to enter the token once — the browser will remember it.

## Step 4. Verify the Connection

After logging in, you'll see the HAPI web interface with:

- **Session list** — your Claude Code session is already there
- **Chat** — you can send messages to the AI agent
- **Connection status** — a green indicator means everything is working

Try sending a message from your phone! You'll see the AI agent respond on both the phone and in the terminal.

## What Each Command Does

| Command | What it does |
|---|---|
| `hapi hub` | Starts the hub (local access) |
| `hapi hub --relay` | Starts the hub with internet access |
| `hapi` | Starts Claude Code with the HAPI wrapper |
| `hapi codex` | Starts Codex with the HAPI wrapper |
| `hapi gemini` | Starts Gemini with the HAPI wrapper |

## Typical Workflow

```
Terminal 1 (hub):          Terminal 2 (agent):        Phone:
                            
hapi hub --relay            hapi                       Scan QR
    │                          │                           │
    │◄─── connection ─────────►│                           │
    │                          │                           │
    │◄──────────── view / control ────────────────────────►│
```

## Troubleshooting

### "Connection refused"

The Hub is not running. Make sure the first terminal with `hapi hub --relay` is still active.

### QR code won't scan

Try enlarging the terminal window so the QR code displays fully. Or copy the URL manually.

### "Invalid token"

Make sure you're entering the correct token. You can find it in `~/.hapi/settings.json`:

```bash
cat ~/.hapi/settings.json
```

### Relay won't connect

If you're having trouble with UDP connections (some networks block UDP), try TCP mode:

```bash
HAPI_RELAY_FORCE_TCP=true hapi hub --relay
```

## Lesson Summary

- **Two commands** — that's all you need to start: `hapi hub --relay` and `hapi`
- The **QR code** lets you instantly connect from your phone
- **Access token** is your login password, entered only once
- The Hub must keep running in a separate terminal
- The entire connection is **encrypted** — the relay cannot see your data

In the next lesson, we'll turn the HAPI web interface into a full-fledged app on your phone.
