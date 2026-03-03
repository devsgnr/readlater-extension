# Readlater Extension

A Chrome extension for saving web content to read later. Built with React, TypeScript, and Vite.

## Tech Stack

- **React 19** + **TypeScript**
- **Vite** (using rolldown-vite for bundling)
- **Tailwind CSS v4** for styling
- **Shadow DOM** for CSS isolation
- **@mozilla/readability** for article extraction
- **Axios** for API calls
- **React Query** for state management

## Project Structure

```
src/
├── background.ts          # Service worker (handles extension events)
├── content.ts            # Content script (injected into web pages)
├── App.tsx               # Main React app entry point
├── api/
│   ├── index.ts         # Axios instance with auth interceptor
│   ├── mutations.ts     # CreateBookmark, CreateCollection
│   └── queries.ts       # GetCollections
├── components/          # React components
├── pages/              # Route pages (home, auth, create-collection)
└── routes/             # React Router configuration
```

## Build Process

The extension uses **three separate Vite configs** to build different parts:

1. **vite.config.ts** - Builds `background.js` (service worker)
2. **vite.content.config.ts** - Builds `content.js` (content script in IIFE format)
3. **vite.ui.config.ts** - Builds `app.js` (React UI as library)

```bash
npm run build
```

This runs:
1. Clean dist folder
2. TypeScript compilation
3. Build background script (ES modules)
4. Build content script (IIFE format to avoid chunks)
5. Build React UI (ES modules)

### Why IIFE for content.js?

Content scripts injected via `chrome.scripting.executeScript` need to be self-contained. IIFE format bundles everything (including `@mozilla/readability`) into a single file without external dependencies.

## How It Works

### 1. Background Script (`background.ts`)

Handles:
- Context menu creation ("Read later" on text selection)
- Extension icon clicks
- Dynamic content script injection
- Message passing between content scripts and background
- External messages from the web app for authentication

### 2. Content Script (`content.ts`)

Injected into web pages to:
- Extract page metadata (title, description, images)
- Use Readability to parse article content
- Inject React UI into Shadow DOM
- Handle messages from background script

**Message Types:**
- `PING` - Check if script is already injected
- `GET_HIGHLIGHT_DATA` - Extract selected text + metadata
- `GET_WHOLE_PAGE` - Extract full article using Readability

### 3. React UI (`App.tsx`)

Renders inside Shadow DOM with:
- Authentication flow
- Collection selection
- Quick bookmark creation
- Theme support (light/dark)

## API Integration

### Axios Instance (`src/api/index.ts`)

Configured with:
- Base URL from environment variables
- Request interceptor that adds auth token from `chrome.storage.local`
- Custom extension ID header

### Mutations (`src/api/mutations.ts`)

```typescript
CreateBookmark(data: CreateBookmarkInput)
CreateCollection(data: CreateCollectionSchemaType)
```

### Queries (`src/api/queries.ts`)

```typescript
GetCollections() // Fetches user's collections
```

## Authentication Flow

1. User clicks "Connect" in extension UI
2. Background script opens web app in new tab
3. Web app authenticates user and sends token via `chrome.runtime.sendMessage`
4. Background script stores token in `chrome.storage.local`
5. Axios interceptor automatically adds token to all API requests

## Shadow DOM Isolation

The extension UI is injected into a Shadow DOM to prevent CSS conflicts with host pages:

- Custom font loading via `chrome.runtime.getURL`
- Tailwind CSS scoped to shadow root
- Fixed `font-size: 16px` on `:host` to prevent rem unit issues

## Development

```bash
npm run dev    # Start Vite dev server (for UI development)
npm run build  # Build extension for production
npm run lint   # Run ESLint
```

### Loading the Extension

1. Run `npm run build`
2. Open Chrome → Extensions → Enable Developer Mode
3. Click "Load unpacked" → Select `dist` folder

## Environment Variables

Create `.env.local`:

```
VITE_BASE_URL=https://app.readlater.fyi
VITE_EXTENSION_ID=your-extension-id
```

## Manifest Configuration

Key permissions:
- `contextMenus` - Add "Read later" to right-click menu
- `storage` - Store auth token
- `activeTab` + `tabs` - Access current tab info
- `scripting` - Inject content scripts dynamically

Web accessible resources:
- `app.js` - React UI bundle
- `readlater-extension.css` - Styles
- Font files (Open Runde, TASA Orbiter)

## Blocked Domains

Extension is disabled on:
- `localhost:3000` (dev server)
- `app.readlater.fyi` (production app)

This prevents conflicts when developing or using the web app.
