---
title: "Lesson 2. HAPI Installation Options"
weight: 2
bookToc: true
---

# Lesson 2. HAPI Installation Options

## Why This Matters

In the first course level, you probably installed HAPI the simplest way. But HAPI supports several connection options — from "everything works out of the box" to fully self-managed deployment. In this lesson, we'll cover each option so you can choose the right one.

## Reminder: Three HAPI Components

Before choosing an installation option, let's recall the structure:

| Component | What it does | Required? |
|-----------|-----------|-------------|
| **CLI** | Launches the AI agent | Yes |
| **Hub** | Central server, stores data | Yes |
| **Runner** | Background service for remote session launching | Optional |

---

## Installing the CLI

There are several ways to install the CLI:

### Method 1: npm (recommended)

```bash
npm install -g @twsxtd/hapi
```

> **npm** is a package manager for JavaScript. If you have Node.js installed, npm is already on your computer.

### Method 2: Homebrew (for macOS)

```bash
brew install tiann/tap/hapi
```

### Method 3: Without installation (npx)

```bash
npx @twsxtd/hapi
```

This method downloads and runs HAPI on the fly — convenient for a quick check.

### Method 4: Pre-built binary

Download the file from [GitHub Releases](https://github.com/tiann/hapi/releases) and run:

```bash
chmod +x ./hapi              # Allow execution
sudo mv ./hapi /usr/local/bin/  # Move to system directory
```

---

## Four Hub Connection Options

The main question: **how will you connect to the Hub from your phone?** Here are four options:

---

### Option 1: Relay (default) ⭐

**What it is:** A built-in service that automatically creates a secure tunnel to your Hub over the internet.

**For whom:** Most users. Works out of the box.

**How to launch:**
```bash
hapi hub --relay
```

After launch, the terminal will show:
- A URL for access
- A QR code — scan with your phone

**Pros:**
- ✅ Zero configuration — just works
- ✅ Works behind NAT and firewalls (even if your provider "hides" your computer)
- ✅ WireGuard + TLS encryption
- ✅ Free

**Notes:**
- UDP protocol is used by default. If you have connection issues, enable TCP mode:

```bash
export HAPI_RELAY_FORCE_TCP=true
hapi hub --relay
```

> **UDP and TCP** are two ways of transmitting data over the internet. UDP is faster but may be blocked by some networks. TCP is more reliable and works virtually everywhere.

---

### Option 2: Cloudflare Tunnel

**What it is:** A free service from Cloudflare that creates a secure tunnel to your server.

**For whom:** Those who want their own domain (e.g., `hapi.yoursite.com`) and more control.

**How to set up:**

1. Install `cloudflared` from the [Cloudflare website](https://developers.cloudflare.com/cloudflare-one/connections/connect-networks/downloads/)

2. Create a named tunnel:
```bash
cloudflared tunnel create hapi
cloudflared tunnel route dns hapi hapi.yourdomain.com
```

3. Start the tunnel:
```bash
cloudflared tunnel --protocol http2 run hapi
```

4. Start the Hub (without --relay):
```bash
hapi hub
```

**Pros:**
- ✅ Your own custom domain
- ✅ Free
- ✅ Reliable Cloudflare infrastructure

**Notes:**
- ⚠️ **Quick tunnels (TryCloudflare) are not supported** — they don't work with SSE, which HAPI uses for real-time updates. You need a "named" tunnel.
- ⚠️ Use the `--protocol http2` flag — the QUIC protocol (default) may cause issues with long-lived connections.

---

### Option 3: Tailscale

**What it is:** A VPN service that joins your devices into a private network. All your devices get special IP addresses and "see" each other as if they were on the same local network.

**For whom:** Those with multiple devices who want a simple private network.

**How to set up:**

1. Install Tailscale: [tailscale.com/download](https://tailscale.com/download)
2. Connect:
```bash
sudo tailscale up
```
3. Start the Hub:
```bash
hapi hub
```
4. Open in your phone's browser (Tailscale must also be installed on the phone):
```
http://100.x.x.x:3006
```

> The `100.x.x.x` address is your Tailscale IP. Find it with the `tailscale ip` command.

**Pros:**
- ✅ Completely private network — traffic doesn't pass through third-party servers
- ✅ Simple setup
- ✅ Free for personal use (up to 100 devices)

**Notes:**
- ⚠️ Tailscale needs to be installed on **all** devices (computer + phone)

---

### Option 4: Self-hosted

**What it is:** You deploy the Hub on a server with a public IP address (VPS, cloud server).

**For whom:** Experienced users who want full control.

**How to set up:**

1. On the server (VPS), start the Hub:
```bash
hapi hub
```

2. Set up a reverse proxy (Nginx, Caddy) for HTTPS:

> A **reverse proxy** is a program that accepts requests from the internet and forwards them to your Hub. It can also add HTTPS encryption.

3. On your workstation, configure the CLI connection to the server:
```bash
export HAPI_API_URL="https://your-server.com"
export CLI_API_TOKEN="your-token"
hapi
```

Or use interactive authentication:
```bash
hapi auth login
```

**Pros:**
- ✅ Full control over everything
- ✅ Minimal latency (if the server is nearby)
- ✅ No dependency on third-party services

**Notes:**
- ⚠️ Requires a server (VPS) — from ~$5/month
- ⚠️ Need to set up HTTPS (Let's Encrypt — free)
- ⚠️ Need to monitor security

---

## Comparison Table

| Criteria | Relay | Cloudflare | Tailscale | Self-hosted |
|----------|-------|-----------|-----------|-------------|
| Difficulty | ⭐ Easy | ⭐⭐ Medium | ⭐⭐ Medium | ⭐⭐⭐ Hard |
| Cost | Free | Free | Free | VPS ~$5/mo |
| Custom domain | No | Yes | No | Yes |
| Encryption | WireGuard+TLS | TLS | WireGuard | Configure yourself |
| Privacy | Via Relay server | Via Cloudflare | Full | Full |

---

## Setting Up Runner (Background Service)

Regardless of the connection option, you can set up the **Runner** — a background service that lets you launch sessions from your phone:

```bash
hapi runner start      # Start
hapi runner status     # Check status
hapi runner logs       # View logs
hapi runner stop       # Stop
```

With Runner running:
- Your computer will appear in the "Machines" list in the Web App
- You can launch new sessions remotely
- Sessions continue running even after closing the terminal

---

## Keeping HAPI Running Permanently

To prevent the Hub and Runner from stopping when you close the terminal:

### Quick method (nohup):
```bash
nohup hapi hub --relay > ~/.hapi/logs/hub.log 2>&1 &
nohup hapi runner start --foreground > ~/.hapi/logs/runner.log 2>&1 &
```

### Reliable method (pm2):
```bash
npm install -g pm2
pm2 start "hapi hub --relay" --name hapi-hub
pm2 start "hapi runner start --foreground" --name hapi-runner
pm2 startup   # Auto-start on reboot
pm2 save
```

> **pm2** is a process manager that automatically restarts programs on crashes and system reboots.

---

## Lesson Summary

- **Relay** — the simplest option, works out of the box, suitable for most users
- **Cloudflare Tunnel** — if you want your own domain and reliable infrastructure
- **Tailscale** — if you want a completely private network between devices
- **Self-hosted** — if you want full control and have your own server
- **Runner** lets you launch sessions remotely from your phone
- Use **pm2** or **systemd** to keep HAPI running permanently
