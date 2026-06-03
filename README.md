# Garhwali AI Chat - Frontend

A React-based user interface featuring a modern cyber dot-matrix layout and smooth motion transitions for the Garhwali AI Assistant application.

## Prerequisites

This project requires **Node.js** (v16+ recommended) to manage dependencies and execute the development server.

## Getting Started

Follow these steps to set up and run the interface locally:

### 1. Install Dependencies
Navigate to the root directory `03_AI_CHAT` and run the following command to download the required npm packages:
```bash
npm install

### 2. Run the Development Server
Start the local webpack development server:
npm start

### 3. View the App
Once compiled successfully, access the application at:

Local Server: http://localhost:3000

Network Access: http://10.181.178.192:3000

### 4. Architecture Layout
src/components/ - Holds modular UI views (WelcomeView.jsx, ChatArea.jsx, MainPanel.jsx, Sidebar.jsx)

src/App.jsx - Component initialization and core state management

src/index.css - Global styling configurations backed by Tailwind CSS