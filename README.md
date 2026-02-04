# Real-Time Collaborative Code Editor

A **real-time collaborative code editor** built with **React**, **Monaco Editor**, and **Socket.IO**, featuring multi-user rooms, live code synchronization, language selection, and online code execution via a compiler API.

---

## Tech Stack

* **React**
* **Monaco Editor**
* **Socket.IO (WebSockets)**
* **Axios**
* **RapidAPI Online Code Compiler**
* **React Router**
* **Tailwind CSS**
* **Node.js (Socket backend)**

---

## Features

* 👥 Multi-user collaborative editing
* 🔗 Room-based collaboration using Room IDs
* 🔄 Real-time code synchronization
* 🌐 Language selection synced across users
* ▶️ Run code online with custom input
* 📋 Copy Room ID with one click
* 🧠 Host-aware state syncing
* 🖥 Monaco Editor (VS Code-like experience)

---

## How It Works

### Room System

* Each room is identified by a unique `roomId`
* Users join rooms via URL parameters
* Connected users are displayed in real time

---

### Real-Time Collaboration

* Code changes are broadcast using `socket.emit("text-change")`
* Remote updates are reflected instantly in Monaco Editor
* Uses debouncing to prevent excessive network calls

---

### Language Synchronization

* Programming language selection is synced across all users
* The first user acts as the source of truth for language state

---

### Code Execution

* Code is sent to an external compiler API
* Supports custom stdin input
* Displays output in real time

---

## UI Overview

### Left Panel

* Room ID (copyable)
* List of connected users

### Main Panel

* Monaco code editor
* Run button
* Input / Output consoles

---

## Component Overview

```jsx
<TextEditor />
```

### Key Responsibilities

* Socket connection lifecycle
* Editor state synchronization
* Compiler API integration
* UI state management

---

## Socket Events Used

| Event Name        | Direction       | Purpose                  |
| ----------------- | --------------- | ------------------------ |
| `join-room`       | Client → Server | Join collaboration room  |
| `user-joined`     | Server → Client | Notify when a user joins |
| `connected-users` | Server → Client | Sync users and language  |
| `text-change`     | Bi-directional  | Sync editor content      |
| `lang-select`     | Bi-directional  | Sync language            |

---

## Code Execution Flow

1. User clicks **Run**
2. Code + input + language sent to compiler API
3. Output returned and rendered
4. UI resets run state

---

## Environment Setup

### Install Dependencies

```bash
npm install
```

### Start Frontend

```bash
npm start
```

---

## Routing & URL Format

```
/room/:roomId?username=<your-name>
```

**Example**

```
/room/abc123?username=Aryan
```

---

## Limitations

* Single-file editing
* No cursor tracking
* No conflict resolution (last-write-wins)
* External compiler dependency
* No offline support

---

## Why This Project?

This project demonstrates:

* Real-time systems using WebSockets
* Collaborative application design
* Third-party API integration
* Advanced frontend state management
* Interview-relevant React architecture

---

## Future Enhancements

* Cursor & selection sharing
* File tree support
* Offline persistence
* Language-specific templates
* Execution logs & errors
* Self-hosted compiler backend
