---
title: "Lesson 2. Security in HAPI"
weight: 2
bookToc: true
---

# Lesson 2. Security in HAPI

## Why This Matters

When you control an AI agent remotely (from a phone or browser), your data travels through the internet. It's important to understand how HAPI protects this data and how its approach differs from alternatives.

## Two Access Modes

HAPI offers two ways to remotely connect to your hub. The choice depends on your situation:

### Mode 1: Self-hosted

> **Self-hosted** means you control the server and the network path to it.

You connect through your own server, Cloudflare Tunnel, or Tailscale. The entire data path is under your control.

```
Your phone → HTTPS → Your server/tunnel → Hub on your computer
```

**Pros:** full control, no intermediaries
**Cons:** need to set up the server or tunnel

### Mode 2: Relay

> **Relay** is an intermediary server that forwards data between your phone and computer.

Launched with one command:

```bash
hapi hub --relay
```

Data is encrypted using **WireGuard + TLS** (a technology called **tunwg**):

```
Your phone ──[encrypted]──► Relay server ──[encrypted]──► Your computer
                                    │
                            Sees only "garbage",
                            cannot read the data
```

**Pros:** one command, nothing to configure
**Cons:** traffic goes through a third-party server (but it's encrypted)

## What is E2E Encryption

> **E2E (End-to-End)** encryption means data is encrypted on your device and decrypted only on your other device. Nobody in between can read it.

In HAPI relay mode, two technologies are used:

| Technology | What it does |
|-----------|-----------|
| **WireGuard** | Creates an encrypted "tunnel" between devices (like a VPN) |
| **TLS** | Additional encryption layer (the same thing that protects banking sites) |

Together they guarantee: the relay server forwards packets but **cannot** read their contents.

## HAPI vs Happy: Security Comparison

**Happy** is the project that inspired HAPI. They have fundamentally different approaches:

| Aspect | Happy | HAPI |
|--------|-------|------|
| **Where data is stored** | On a cloud server (encrypted) | On your computer |
| **Who stores the data** | Central server | Only you |
| **Encryption** | Application-level E2EE (client encrypts before sending) | WireGuard+TLS (relay) or HTTPS (self-hosted) |
| **What the server sees** | Encrypted "blobs" — can't read but stores them | Relay: stores nothing, only forwards |
| **Architecture** | Centralized (everyone on one cloud) | Decentralized (everyone runs their own hub) |

### The Key Difference

- **Happy** solves the "untrusted server" problem with complex encryption. The server stores your data but cannot read it.

- **HAPI** avoids this problem entirely: data never leaves your computer. The relay server simply forwards encrypted packets, saving nothing.

## Where Your Data Is Stored

```
Happy:
  Your computer → [encryption] → Cloud server (stores encrypted data)

HAPI:
  Your computer (data stays here) → [encrypted tunnel] → Your phone
```

In HAPI, data is stored in a local SQLite database on your computer in plain text. Security is ensured by:
- Only you have physical access to the data
- Remote access is protected by encryption (WireGuard+TLS or HTTPS)

## Security Recommendations

1. **Keep your token secret.** `CLI_API_TOKEN` is your access key. Don't publish it or send it in chats.

2. **Use relay for a quick start** — encryption is configured automatically.

3. **Use self-hosted for maximum control** — your traffic doesn't pass through any third-party servers at all.

4. **Protect your computer.** Since data is stored locally in plain text, it's important to have a password on your computer and disk encryption.

## Lesson Summary

- HAPI offers two modes: **self-hosted** (full control) and **relay** (ease of setup)
- In relay mode, data is protected by end-to-end **WireGuard + TLS** encryption
- The relay server **does not store** and **cannot read** your data
- Unlike Happy, HAPI stores data only on your computer — simpler and more secure
- HAPI's core principle: **your data stays with you**
