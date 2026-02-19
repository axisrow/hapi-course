---
title: "Lesson 1. What is HAPI and Why You Need It"
weight: 1
bookToc: true
---

# Lesson 1. What is HAPI and Why You Need It

## Why This Matters

Imagine: you're working with an AI assistant (say, Claude Code) on your computer. It writes code, edits files, runs commands. But you need to step away — grab coffee, head to a meeting, take a walk. Without HAPI, your AI agent stops and waits for you at the computer. With HAPI, you pull out your phone and continue working right from it — without losing progress.

**HAPI** is a tool that lets you control AI agents remotely: from your phone, tablet, or any browser.

## What is an AI Agent?

An **AI agent** is a program with artificial intelligence that can perform tasks on your computer. For example:

- **Claude Code** (by Anthropic) — writes and edits code
- **Codex** (by OpenAI) — also helps with code
- **Gemini CLI** (by Google) — another AI assistant
- **OpenCode** — an open-source alternative

They all work in the **terminal** (command line) of your computer. HAPI doesn't replace them — it "wraps" them, adding the ability to control them remotely.

## The Key Feature: Seamless Handoff

**Seamless Handoff** is the ability to switch between your computer and phone without losing context.

How it works:

1. You're working with an AI agent in the terminal on your computer
2. You send a message from your phone — control automatically transfers to the phone
3. The terminal shows "Remote mode — waiting for input"
4. You return to the computer, press double space — and you're back to local control

No restarts, no data loss. The same session, the same state.

## How HAPI Differs from Happy

HAPI is inspired by the **Happy** project, but is fundamentally different:

| | Happy | HAPI |
|---|---|---|
| **Where data is stored** | On a cloud server (encrypted) | On your computer |
| **Architecture** | Centralized — one server for everyone | Decentralized — everyone runs their own hub |
| **What the server does** | Stores your encrypted data | Relay only forwards traffic, stores nothing |
| **Installation** | Multiple services (database, cache, server) | One command |

In simple terms:

- **Happy** is like Gmail: your emails sit on Google's servers (encrypted, but still there).
- **HAPI** is like running your own mail server: everything is on your machine, and the "postman" (relay) only delivers envelopes without looking inside.

### What are Hub and Relay?

- **Hub** is the "control center" running on your computer. It stores sessions, manages connections, and provides the web interface.
- **Relay** is an intermediary server that simply forwards encrypted traffic between your phone and computer. It cannot read your data — it's encrypted using WireGuard + TLS (military-grade encryption technologies).

## What HAPI Can Do

- 📱 **Control from your phone** — send commands to your AI agent from anywhere
- ✅ **Approve requests** — AI wants to edit a file? Approve with one tap from your phone
- 🔄 **Seamless switching** — computer ↔ phone without losing progress
- 🤖 **Any AI of your choice** — Claude Code, Codex, Gemini, OpenCode
- 🖥️ **Terminal anywhere** — run commands right from your phone
- 🎤 **Voice control** — talk to your AI agent by voice
- 🔒 **Security** — data never leaves your computer

## Lesson Summary

- **HAPI** is a tool for remotely controlling AI agents from your phone and browser
- The key feature is **Seamless Handoff**: switching between devices without losing context
- Unlike Happy, HAPI is **decentralized**: data stays on your computer
- **Relay** only forwards encrypted traffic — it cannot see your data
- HAPI supports Claude Code, Codex, Gemini, and OpenCode

In the next lesson, we'll install HAPI on your computer.
