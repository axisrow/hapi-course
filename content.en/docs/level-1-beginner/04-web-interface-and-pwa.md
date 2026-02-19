---
title: "Lesson 4. Web Interface and PWA"
weight: 4
bookToc: true
---

# Lesson 4. Web Interface and PWA

## Why This Matters

In the last lesson, you opened HAPI in your phone's browser. But opening the browser and entering the address every time is inconvenient. In this lesson, we'll install HAPI as an **app** on your phone — with an icon on the home screen, just like a regular program.

## What is PWA

**PWA** (Progressive Web App) is a website that can be installed on your phone like a regular app. After installation:

- 📱 An HAPI **icon** appears on your home screen
- 🖥️ The app opens **full screen** (without the browser address bar)
- 🔔 You'll receive **notifications** (when the AI agent is waiting for your response)
- 🔄 The app **updates itself** — always the latest version

> 💡 PWA doesn't need to be downloaded from the App Store or Google Play. It's installed directly from the browser.

## Installation on Android

1. Open HAPI in **Chrome** or **Edge**
2. A banner **"Install HAPI"** will appear at the bottom — tap it
3. Confirm the installation
4. Done! The HAPI icon will appear on your home screen

> 💡 If the banner didn't appear: tap the **three dots** (⋮) in the top-right corner of Chrome → **"Install app"** or **"Add to Home screen"**.

## Installation on iPhone (iOS)

On iPhone, installation works **only through Safari** (not Chrome, not Firefox):

1. Open HAPI in **Safari**
2. Tap the **Share** button (square with an upward arrow ↑)
3. Scroll down and tap **"Add to Home Screen"**
4. Tap **"Add"** in the top-right corner
5. Done!

> ⚠️ On iOS, you must use Safari. Other browsers on iPhone don't support PWA installation.

## Installation on Desktop

HAPI can also be installed on a computer as a standalone app:

1. Open HAPI in **Chrome** or **Edge**
2. Click the install icon (⊕) on the right side of the address bar
3. Or in the menu: **"Install HAPI..."**
4. HAPI will open in a separate window

## Main Interface Features

### Session List

The main screen shows all your AI agent sessions:
- **Active** — marked in green, currently running
- **Completed** — gray, you can view the history

### Chat with AI Agent

Tap any session to open the chat:
- You see the entire conversation (your messages and AI responses)
- You can send a new message
- The AI agent responds in real time

### Request Approval

When an AI agent wants to do something (edit a file, run a command), it asks for permission. You'll see a notification and can:
- ✅ **Approve** — the agent continues working
- ❌ **Deny** — the agent won't perform the action

### File Viewer

In the "Files" tab you can:
- Browse project files
- See what the AI agent changed
- View the diff between old and new file versions

### Terminal

The "Terminal" tab is a remote terminal connected to your computer. You can run commands right from your phone.

## Notifications

HAPI can send push notifications to your phone:

1. On first launch, the app will ask for **notification permission** — tap "Allow"
2. Now you'll receive notifications when:
   - The AI agent asks to approve an action
   - The AI agent has finished and is waiting for input

> 💡 If push notifications don't work (for example, in China where Firebase is blocked), use a **Telegram bot** as an alternative.

## Offline Mode

PWA can work offline (without internet) in a limited mode:
- Shows cached session list
- Shows previously loaded messages
- Actions taken offline will be sent when internet returns

## Multiple Devices

HAPI can be installed on **multiple devices** simultaneously:
- Phone, tablet, second computer — all connect to the same hub
- Use the same access token
- Sessions sync between devices

## Removing the App

If you need to remove HAPI:

- **Android**: long-press the icon → "Uninstall"
- **iPhone**: long-press the icon → "Delete App"
- **Desktop**: open HAPI → menu (three dots) → "Uninstall HAPI"

## Lesson Summary

- **PWA** is a web application that installs like a regular program
- On **Android** it's installed through Chrome, on **iPhone** — only through Safari
- The interface includes: session list, chat, request approval, file viewer, terminal
- **Push notifications** let you know when the AI agent needs your attention
- You can install on **multiple devices** simultaneously

In the next lesson, we'll learn how to work with different AI agents through HAPI.
