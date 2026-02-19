---
title: "Lesson 2. Installing HAPI"
weight: 2
bookToc: true
---

# Lesson 2. Installing HAPI

## Why This Matters

Before you can control AI agents from your phone, you need to install HAPI on your computer. The good news: it takes just one command. In this lesson, we'll walk through the entire process from start to finish.

## What You Need

### 1. A Computer with macOS, Linux, or Windows

HAPI works on any of these systems. A regular laptop or desktop computer will do.

### 2. Node.js (version 18 or newer)

**Node.js** is a platform that lets you run JavaScript programs. HAPI is written in JavaScript, so it needs Node.js.

**How to check if Node.js is installed:**

Open a terminal and type:

```bash
node --version
```

If you see something like `v22.22.0` — you're good. If the command is not found — you need to install it.

**How to open a terminal:**
- **macOS**: find "Terminal" via Spotlight (Cmd + Space) or in Applications → Utilities
- **Windows**: find "PowerShell" or "Command Prompt" in the Start menu
- **Linux**: usually Ctrl + Alt + T

**How to install Node.js:**

1. Go to [nodejs.org](https://nodejs.org)
2. Download the **LTS** version (Long Term Support — stable version)
3. Run the installer and follow the instructions

> 💡 **Alternative**: instead of Node.js, you can use **Bun** — a faster alternative. Download it at [bun.sh](https://bun.sh). But for beginners, we recommend Node.js — it's more widely used.

### 3. An AI Agent (at least one)

HAPI is a wrapper around AI agents, so you need at least one of them:

```bash
# Check Claude Code
claude --version

# Check Codex
codex --version

# Check Gemini
gemini --version
```

If you don't have an AI agent yet, the most popular option is **Claude Code**:

```bash
npm install -g @anthropic-ai/claude-code
```

## Installing HAPI

There are several methods. Choose whichever is most convenient.

### Method 1: npx (no installation) — the simplest

**npx** is a utility that comes with Node.js. It downloads and runs a program with one command, without installing it permanently.

```bash
npx @twsxtd/hapi
```

This method is great for a first look. Each time, npx will check for updates.

### Method 2: Global installation via npm

**npm** (Node Package Manager) is a package manager that also comes with Node.js. Global installation means the program will be available from any directory.

```bash
npm install -g @twsxtd/hapi
```

After this, you can simply type `hapi` instead of `npx @twsxtd/hapi`.

### Method 3: Homebrew (macOS and Linux only)

**Homebrew** is a popular package manager for macOS. If you have it installed:

```bash
brew install tiann/tap/hapi
```

## Verifying the Installation

After installation, run:

```bash
hapi --help
```

If everything went well, you'll see a list of available commands.

## What Gets Created on First Launch

When you first run HAPI, it will create a `~/.hapi/` directory with configuration:

```
~/.hapi/
├── settings.json      # Settings (access token, addresses)
├── hapi.db           # Database (stores sessions)
└── logs/             # Logs (activity journal)
```

> 💡 The `~` symbol means your home directory. On macOS it's `/Users/your_name/`, on Linux — `/home/your_name/`.

## System Requirements

| Requirement | Minimum | Recommended |
|---|---|---|
| OS | macOS, Linux, Windows | macOS or Linux |
| Node.js | 18+ | 22+ (LTS) |
| RAM | 512 MB | 2 GB |
| Disk | 100 MB | 500 MB |
| Internet | For relay connection | Stable internet |

## Troubleshooting

### "command not found: node"

Node.js is not installed. Go to [nodejs.org](https://nodejs.org) and install it.

### "permission denied" during installation

On macOS/Linux, try:
```bash
sudo npm install -g @twsxtd/hapi
```

`sudo` is a command that runs the following command with administrator privileges. The system will ask for your password.

### "EACCES" error

This is also a permissions issue. The best solution is to configure npm to work without sudo:

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
echo 'export PATH=~/.npm-global/bin:$PATH' >> ~/.bashrc
source ~/.bashrc
```

Then retry the installation without `sudo`.

## Lesson Summary

- HAPI requires **Node.js** (version 18+) and at least one **AI agent**
- The simplest way to try it: `npx @twsxtd/hapi`
- For permanent use: `npm install -g @twsxtd/hapi`
- On first launch, HAPI creates the `~/.hapi/` directory with settings
- If something doesn't work — check Node.js version and permissions

In the next lesson, we'll launch HAPI and connect to it from a phone.
