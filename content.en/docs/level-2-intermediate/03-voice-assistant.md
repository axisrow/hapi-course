---
title: "Lesson 3. Voice Assistant"
weight: 3
bookToc: true
---

# Lesson 3. Voice Assistant

## Why This Matters

Imagine: you're getting coffee while your AI agent is working on the computer. It asks permission to edit a file. Instead of pulling out your phone and typing, you simply say: **"Yes, approve."** Or dictate a new task by voice.

HAPI's voice assistant lets you **control the AI agent by voice** using ElevenLabs Conversational AI technology.

---

## What the Voice Assistant Can Do

- 🎤 **Talk to the agent** — give tasks, ask questions by voice
- ✅ **Approve actions by voice** — say "yes" or "no" instead of pressing buttons
- 📢 **Report results** — the assistant will tell you when a task is done or if an error occurred

---

## What You'll Need

- An account on [ElevenLabs](https://elevenlabs.io) with API access
- A running Hub with internet access (e.g., with `--relay`)

> **ElevenLabs** is a company that creates speech synthesis and recognition technologies. Their service converts your speech to text, and text to natural-sounding speech.

> **API** (*Application Programming Interface*) is a way programs communicate with each other. An API key is like a password confirming you have access to the service.

---

## Step-by-Step Setup

### Step 1. Get an ElevenLabs API Key

1. Go to [elevenlabs.io](https://elevenlabs.io) and register (or log in)
2. Go to settings: [API Keys](https://elevenlabs.io/app/settings/api-keys)
3. Click **Create API Key**
4. Copy the key — you'll need it in the next step

> ⚠️ Keep your API key secret! It's like a password — if someone finds it, they can use your account.

### Step 2. Configure the Hub

Before starting the Hub, set the environment variable with your key:

```bash
export ELEVENLABS_API_KEY="your-api-key"
hapi hub --relay
```

> An **environment variable** is a setting you pass to a program before launching it. The `export` command saves it for the duration of the current terminal session.

On first launch, the Hub will **automatically create** a voice agent "Hapi Voice Assistant" in your ElevenLabs account. No additional configuration needed!

### Step 3. Start a Voice Session

1. Open a session in the Web App (in your phone's browser)
2. Tap the **microphone button** 🎤 at the bottom of the screen (in the message input area)
3. Allow microphone access when the browser asks
4. Start talking!

---

## Voice Commands

You don't need to memorize special commands — speak naturally:

| What to say | What happens |
|-------------|---------------|
| "Ask Claude to refactor the auth module" | Your request is passed to the AI agent |
| "Create a new file for tests" | Request to create a file |
| "Yes" / "Approve" / "Go ahead" | Approves the pending permission |
| "No" / "Deny" / "Cancel" | Denies the permission |
| "What is the agent doing right now?" | The assistant will answer itself if it can |

---

## How It Works Internally

Voice communication goes through several stages:

```
Your voice → Microphone → Browser → WebRTC → ElevenLabs → Text
                                                          │
                                                     Hub → CLI → AI agent
                                                          │
Agent response ← Voice ← ElevenLabs ← Text ←─────────────┘
```

> **WebRTC** (*Web Real-Time Communication*) is a technology for transmitting audio and video in real time through the browser. It's the same technology used in video calls.

### Automatic Context Synchronization

The voice assistant automatically "knows" what's happening:

- When you open a session — the full history is loaded
- When the agent sends messages — the assistant receives updates
- When permission requests come in — the assistant can tell you about them
- When a task is complete — the assistant will notify you

You don't need to ask "what's new" — the assistant will proactively tell you about important changes.

---

## Helpful Tips

1. **Be specific** — the more precise your request, the better the result. Instead of "do something with the code," say "add error handling to the login function"

2. **Wait for completion** — while the agent is working, the assistant stays quiet. When the task is done, it will tell you the result

3. **Use headphones** — this reduces echo and improves speech recognition

4. **One session at a time** — for the clearest context, work with one session

---

## Advanced Configuration (optional)

If you want to use your **own** ElevenLabs agent (e.g., with a different voice or settings):

```bash
export ELEVENLABS_AGENT_ID="your-agent-id"
```

This is useful if you've configured an agent with a special voice or instructions on the ElevenLabs website.

---

## Troubleshooting

| Problem | Solution |
|----------|---------|
| "ElevenLabs API key not configured" | Make sure the `ELEVENLABS_API_KEY` variable is set and the Hub is restarted |
| Microphone not working | Check browser permissions, make sure the microphone isn't used by another program |
| Assistant not responding | Check the session connection (green dot in the status bar) |
| Poor audio quality | Use headphones, reduce background noise |
| "Failed to create ElevenLabs agent" | Check the API key and quota on your ElevenLabs account |

---

## Lesson Summary

- The voice assistant lets you control the AI agent **by voice** — no keyboard needed
- It requires an **ElevenLabs API key** and a Hub with internet access
- Setup takes 5 minutes: get the key → set the variable → start the Hub
- Speak naturally — there are no special commands
- The assistant monitors updates on its own and reports important events
