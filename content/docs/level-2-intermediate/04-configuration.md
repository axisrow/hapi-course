---
title: "Lesson 4. HAPI Configuration"
weight: 4
bookToc: true
---

# Lesson 4. HAPI Configuration

## Why This Matters

HAPI works out of the box with default settings. But sometimes you need to change something: switch the port, set a public address, connect a Telegram bot. In this lesson, we'll cover how to configure the CLI and Hub to your needs.

---

## Where Settings Are Stored

All HAPI files are in one directory:

```
~/.hapi/
├── settings.json       # Main settings file
├── hapi.db            # Database (sessions, messages)
├── access.key         # CLI access key
├── runner.state.json  # Runner state
└── logs/              # Logs (activity journal)
```

> **`~`** is shorthand for your home directory. On macOS it's `/Users/your_name`, on Linux — `/home/your_name`.

To change the location of this directory:
```bash
export HAPI_HOME="~/my-custom-hapi-folder"
```

---

## Three Ways to Set Configuration

HAPI reads settings from three sources. If the same setting is defined in multiple places, the higher-priority source wins:

1. **Environment variables** (highest priority) — `export HAPI_LISTEN_PORT=4000`
2. **settings.json file** — `~/.hapi/settings.json`
3. **Default values** (lowest priority)

> 💡 If you set a value via an environment variable and it's not yet in settings.json, HAPI will automatically save it to the file for future launches.

---

## Hub Settings

The Hub is the server side of HAPI. Here are the main settings:

### Network and Access

| Environment variable | settings.json | Default | Description |
|---------------------|---------------|-------------|----------|
| `HAPI_LISTEN_HOST` | `listenHost` | `127.0.0.1` | Address the Hub listens on |
| `HAPI_LISTEN_PORT` | `listenPort` | `3006` | Hub port |
| `HAPI_PUBLIC_URL` | `publicUrl` | — | Public address for external access |
| `CORS_ORIGINS` | `corsOrigins` | — | Allowed request origins |

> A **port** is like an apartment number in a building. The IP address is the building's address, and the port specifies which program to connect to. By default, the Hub "lives" on port 3006.

> **`127.0.0.1`** (localhost) means the Hub accepts connections only from your computer. If you want the Hub accessible from the local network, change it to `0.0.0.0`.

**Example: change port to 8080**
```bash
export HAPI_LISTEN_PORT=8080
hapi hub
```

Or in `settings.json`:
```json
{
  "listenPort": 8080
}
```

**Example: open access from local network**
```json
{
  "listenHost": "0.0.0.0",
  "listenPort": 3006
}
```

### Authentication

| Variable | settings.json | Description |
|-----------|---------------|----------|
| `CLI_API_TOKEN` | `cliApiToken` | Shared secret key for CLI-Hub communication |

This token is generated automatically on first launch. It ensures only your CLI can connect to the Hub.

> ⚠️ If the token becomes known to others — delete it from `settings.json` and restart the Hub. A new one will be created.

### Telegram

| Variable | settings.json | Description |
|-----------|---------------|----------|
| `TELEGRAM_BOT_TOKEN` | `telegramBotToken` | Bot token from @BotFather |
| `TELEGRAM_NOTIFICATION` | `telegramNotification` | Enable notifications (`true`/`false`) |

### Relay

| Variable | Description |
|-----------|----------|
| `HAPI_RELAY_FORCE_TCP` | Force TCP mode (`true`/`false`) |

### Voice Assistant

| Variable | Description |
|-----------|----------|
| `ELEVENLABS_API_KEY` | ElevenLabs API key |
| `ELEVENLABS_AGENT_ID` | Custom ElevenLabs agent ID |

### Database

| Variable | Default | Description |
|-----------|-------------|----------|
| `DB_PATH` | `~/.hapi/hapi.db` | Path to the database file |

---

## CLI Settings

The CLI is the client side that launches the AI agent. It has fewer settings:

| Variable | settings.json | Default | Description |
|-----------|---------------|-------------|----------|
| `HAPI_API_URL` | `apiUrl` | `http://localhost:3006` | Hub address to connect to |
| `CLI_API_TOKEN` | `cliApiToken` | — | Authentication token |
| `HAPI_HOME` | — | `~/.hapi` | Settings directory |
| `HAPI_EXPERIMENTAL` | — | `false` | Enable experimental features |

**Example: connecting CLI to a remote Hub**
```bash
export HAPI_API_URL="https://my-server.com"
export CLI_API_TOKEN="my-secret-token"
hapi
```

Or use interactive authentication:
```bash
hapi auth login     # Log in
hapi auth status    # Check status
hapi auth logout    # Log out
```

---

## Example settings.json

Here's a complete example with comments:

```json
{
  "$schema": "https://hapi.run/docs/schemas/settings.schema.json",
  "listenHost": "0.0.0.0",
  "listenPort": 3006,
  "publicUrl": "https://hapi.example.com",
  "telegramBotToken": "123456:ABC-DEF...",
  "telegramNotification": true,
  "corsOrigins": "https://hapi.example.com"
}
```

> 💡 The `$schema` field is optional, but if your editor supports JSON Schema, it will suggest available settings and check for errors.

---

## Practical Scenarios

### Scenario 1: Local-only Usage

No changes needed! Default settings work:
```bash
hapi hub    # Hub on localhost:3006
hapi        # CLI connects automatically
```

### Scenario 2: Access via Relay + Telegram

```bash
export TELEGRAM_BOT_TOKEN="your-bot-token"
export ELEVENLABS_API_KEY="your-key"
hapi hub --relay
```

### Scenario 3: Multiple Computers Connected to One Hub

On the server:
```bash
hapi hub
```

On each workstation:
```bash
export HAPI_API_URL="http://server-address:3006"
export CLI_API_TOKEN="shared-token"
hapi
```

Each computer gets a unique ID — this is how the Hub tells machines apart.

---

## Lesson Summary

- Settings are stored in `~/.hapi/`, the main file is `settings.json`
- Three setting sources: environment variables > settings.json > default values
- Main Hub settings: port (`3006`), address (`127.0.0.1`), token, Telegram
- CLI is configured via `HAPI_API_URL` and `CLI_API_TOKEN`
- For most tasks, default settings work fine — changes are only needed for special scenarios
