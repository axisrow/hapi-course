---
title: "Lesson 3. Building HAPI from Source"
weight: 3
bookToc: true
---

# Lesson 3. Building HAPI from Source

## Why This Matters

Normally, HAPI is installed with a simple command (`npx @twsxtd/hapi`). But sometimes you need to build it yourself from source code — for example, to make changes, test a new feature, or build a version for your platform.

> **Source code** is the text files written by programmers. **Building** is the process of turning these files into a ready-to-run program.

## Project Structure

HAPI is organized as a **monorepo** — a single repository containing several related projects:

```
hapi/
├── cli/          — Command line (what you run as `hapi`)
├── hub/          — Hub server (manages sessions and connections)
├── web/          — Web application (browser interface / PWA)
├── shared/       — Shared code used by other parts
├── website/      — Project website (documentation)
├── docs/         — Documentation
└── package.json  — Main project configuration file
```

### What Each Part Does

| Directory | Purpose | Analogy |
|-------|-----------|----------|
| `cli/` | Terminal program | Remote control |
| `hub/` | Server side | Dispatch center |
| `web/` | Browser interface | Screen on the wall |
| `shared/` | Common functions | Shared library |
| `website/` | Documentation site | Reference manual |

## What You Need to Build

**Bun** — a fast tool for running JavaScript/TypeScript. It's an alternative to Node.js that HAPI uses.

Install Bun if you don't have it yet:

```bash
curl -fsSL https://bun.sh/install | bash
```

## Step-by-Step Build

### Step 1. Download the Source Code

```bash
git clone https://github.com/anthropics/hapi.git
cd hapi
```

### Step 2. Install Dependencies

> **Dependencies** are external libraries that the project needs to work.

```bash
bun install
```

This command reads `package.json` and downloads all required libraries. Since HAPI is a monorepo, `bun install` installs dependencies for all parts at once (cli, hub, web, etc.).

### Step 3. Build Everything

There are several build options:

#### Option A: Build Individual Components

```bash
bun run build          # build cli + hub + web
```

Or individually:

```bash
bun run build:cli      # CLI only
bun run build:hub      # Hub only
bun run build:web      # Web app only
```

#### Option B: Build a Single Executable

> An **executable** is a ready-to-run program that doesn't need additional tools.

```bash
bun run build:single-exe
```

This command:
1. Downloads tunwg (the WireGuard tunnel component)
2. Builds the web application
3. Embeds web resources into the hub
4. Compiles everything into a single file

The result is a single binary file `hapi` that contains CLI + Hub + Web App + SQLite database.

### Step 4. Development Mode

For development (when you make changes and want to see results immediately):

```bash
bun run dev
```

This command simultaneously runs the hub and web in development mode with automatic reloading on changes.

## Building for All Platforms

To create release files for all platforms:

```bash
bun run build:single-exe:all
```

The result will appear in `cli/dist-exe/` — separate files for macOS (ARM and x64), Linux, and Windows.

## Code Verification

Before submitting changes, it's useful to run checks:

```bash
bun run typecheck    # type checking (TypeScript)
bun run test         # run tests
```

## Lesson Summary

- HAPI is a **monorepo** of 5 parts: cli, hub, web, shared, website
- Building requires only **Bun** (`bun install` → `bun run build`)
- `bun run build:single-exe` creates a single file with everything built in
- `bun run dev` — convenient development mode with auto-reloading
- The entire build takes just 2-3 commands
