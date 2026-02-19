---
title: "Lesson 1. Namespace and Teamwork"
weight: 1
bookToc: true
---

# Lesson 1. Namespace and Teamwork

## Why This Matters

Imagine: you work in a team of three people, and you share one HAPI hub. Without special settings, everyone sees each other's sessions — that's inconvenient and insecure. **Namespace** solves this problem: each team member gets their own isolated "room" on the same hub.

> **Namespace** is like a separate apartment in an apartment building. The building is one (hub), but each tenant (developer) only sees their own apartment.

## How It Works

The hub uses a single shared access token (`CLI_API_TOKEN`). Each user appends their name to this token with a colon — and gets an isolated space.

Here's what is isolated between namespaces:
- 🔒 Sessions (AI agent work sessions)
- 🖥️ Machines (connected computers)
- 👤 Users

## Step-by-Step Setup

### Step 1. Configure the Hub

On the server (hub), set the base token **without** a suffix:

```
CLI_API_TOKEN="my-team-secret-token"
```

⚠️ **Important:** the token on the hub must NOT contain a colon. If you accidentally add `:something`, the hub will trim the suffix and display a warning.

### Step 2. Distribute Tokens to the Team

Each team member gets a token with a unique name:

| Member | Token |
|----------|-------|
| Alice | `my-team-secret-token:alice` |
| Bob | `my-team-secret-token:bob` |
| Vika | `my-team-secret-token:vika` |

Each person sets their token in the HAPI settings:

```bash
# On Alice's computer
CLI_API_TOKEN="my-team-secret-token:alice"
```

### Step 3. Web and Telegram Connection

When logging in through the web interface or linking Telegram, use the same token with namespace:

```
my-team-secret-token:alice
```

## Important Limitations

1. **One computer — one namespace.** You cannot use the same machine ID in different namespaces. If you need to work with multiple namespaces on one computer — use a separate `HAPI_HOME` directory for each:

```bash
# Working as alice
HAPI_HOME=~/.hapi-alice hapi

# Working as bob
HAPI_HOME=~/.hapi-bob hapi
```

2. **Switching namespaces.** Before changing namespace on the same machine, log out:

```bash
hapi auth logout
```

3. **Remote spawn** is also isolated by namespace. For multiple namespaces on one machine, run a separate runner for each.

## Real-World Example

A team of three freelancers rents one VPS (virtual private server). Each connects from their own laptop:

```
VPS (hub) — token: "freelance-team-2025"
  ├── Alice (token: freelance-team-2025:alice) — sees only her sessions
  ├── Bob   (token: freelance-team-2025:bob)   — sees only his sessions
  └── Vika  (token: freelance-team-2025:vika)  — sees only her sessions
```

Nobody interferes with each other, data is isolated, and you only pay for one server.

## Lesson Summary

- **Namespace** lets multiple people safely work on the same hub
- Setup is simple: base token + colon + username
- Sessions, machines, and users are fully isolated between namespaces
- To work with multiple namespaces on one computer, use separate `HAPI_HOME` directories
