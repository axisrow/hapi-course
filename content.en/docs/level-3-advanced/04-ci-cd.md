---
title: "Lesson 4. CI/CD and Automation in HAPI"
weight: 4
bookToc: true
---

# Lesson 4. CI/CD and Automation in HAPI

## Why This Matters

When a team works on a project, it's important to automate routine tasks: code checking, building, publishing. HAPI uses **GitHub Actions** — GitHub's built-in automation system — for this purpose.

> **CI/CD** (Continuous Integration / Continuous Delivery) is the practice of automatically checking and building code with every change.

> **GitHub Actions** is a GitHub service that runs tasks automatically on certain events (e.g., when someone pushes code or creates a pull request).

## What Automations HAPI Has

In the `.github/workflows/` directory, there are 6 files — each describes one automation:

### 1. 🧪 Tests (`test.yml`)

**When it runs:** on every push and pull request.

**What it does:**
1. Checks out the code
2. Installs Bun
3. Installs dependencies (`bun install`)
4. Checks types (`bun typecheck`)
5. Runs tests (`bun run test`)

**Why:** to make sure new code didn't break anything.

### 2. 🤖 AI PR Review (`codex-pr-review.yml`)

> **PR (Pull Request)** is a request to add changes to the project. Other members review the code before accepting.

**When it runs:** when a new PR is opened or a PR is moved from draft to ready.

**What it does:**
- The **Codex** AI model (GPT-5.2) automatically reviews code in the PR
- Leaves a comment with remarks and recommendations
- Doesn't review PRs from bots or PRs with the `bot-skip` label
- Doesn't duplicate reviews — if the bot already left a comment, it won't run again

**Why:** speeds up code review and catches common errors.

### 3. 💬 Auto-response to Issues (`issue-auto-response.yml`)

> **Issue** is a ticket/task in the repository: bug report, feature request, question.

**When it runs:** when a new issue is created or a label is added.

**What it does:**
- Codex analyzes the issue and responds automatically
- Skips duplicates (`duplicate`), spam (`spam`), and issues with the `bot-skip` label
- Responds only once

**Why:** users get a first response faster, and developers don't need to answer typical questions.

### 4. 🗣️ Responses to Mentions (`codex-mention-response.yml`)

**When it runs:** when someone mentions `@tiann` in a comment.

**What it does:**
- Codex responds to the question or comment
- Only works for users with write access
- Doesn't respond to its own comments or issues with the `bot-skip` label

**Why:** quick help for developers right in the discussion.

### 5. 📦 Release (`release.yml`)

> A **release** is publishing a new version of the software.

**When it runs:** when a new version tag is created (e.g., `v1.2.3`).

**What it does:**
1. Builds binary files for all platforms
2. Packages into archives (`.tar.gz` for macOS/Linux, `.zip` for Windows)
3. Calculates checksums
4. Creates a GitHub release with downloadable files
5. Updates the Homebrew formula (package manager for macOS)

### 6. 🌐 Web App Deploy (`webapp.yml`)

> **Deploy** is placing an application on a server so it becomes available to users.

**When it runs:** when changes are made to the `web/` directory in the `main` branch.

**What it does:**
1. Builds the web application
2. Publishes to GitHub Pages (free hosting from GitHub)
3. Available at `app.hapi.run`

## How It All Connects

```
Developer makes changes
         │
         ├─► Push to any branch
         │       └─► test.yml: code checks and tests
         │
         ├─► Opens a PR
         │       └─► codex-pr-review.yml: AI reviews code
         │
         ├─► PR merged to main + changes in web/
         │       └─► webapp.yml: website update
         │
         ├─► Creates tag v1.2.3
         │       └─► release.yml: build + publish
         │
         └─► New issue or comment
                 └─► issue-auto-response.yml / codex-mention-response.yml
```

## The `bot-skip` Label

If you don't want the bot to respond to a specific issue or PR, add the **`bot-skip`** label. All AI automations check this label and skip such tasks.

## Lesson Summary

- HAPI uses **6 automations** via GitHub Actions for routine tasks
- **Tests** run automatically with every code change
- **AI (Codex)** automatically reviews PRs, responds to issues and comments
- **Releases** are built for all platforms with a single command when a tag is created
- The **web application** is automatically published on changes
- The `bot-skip` label disables AI automations for a specific task
