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
- **React Router** for navigation
- **Formik + Yup** for form handling

## Project Structure

```
src/
├── background.ts          # Service worker (handles extension events)
├── content.ts            # Content script (injected into web pages)
├── App.tsx               # Main React app entry point
├── main.tsx              # Entry point for standalone dev mode
├── api/
│   ├── index.ts         # Axios instance with auth interceptor
│   ├── mutations.ts     # CreateBookmark, CreateCollection
│   ├── queries.ts       # GetCollections
│   └── hooks/           # React Query hooks
│       ├── mutations.ts
│       └── queries.ts
├── components/          # React components
│   ├── ui/             # Reusable UI components (button, input, etc.)
│   ├── collection-list.tsx
│   ├── emoji-picker.tsx
│   ├── header.tsx
│   ├── profile.tsx
│   ├── quick-add.tsx
│   └── ...
├── pages/              # Route pages
│   ├── home.tsx        # Collection list + save button
│   ├── auth.tsx        # Authentication redirect
│   └── create-collection.tsx
├── routes/             # React Router configuration
│   └── AppRoutes.tsx
├── layouts/
│   └── AppLayout.tsx   # Main layout wrapper
├── provider/           # Context providers
│   ├── PayloadProvider.tsx
│   └── ShadowRootProvider.tsx
├── context/            # React contexts
│   ├── PayloadContext.tsx
│   └── ShadowRootContext.tsx
├── hooks/              # Custom hooks
├── lib/                # Utilities
│   └── utils.ts
├── types.ts            # TypeScript types
└── schema.ts           # Validation schemas
```

## Build Process

The extension uses **three separate Vite configs** to build different parts:

1. **vite.config.ts** - Builds `background.js` (service worker in ES module format)
2. **vite.content.config.ts** - Builds `content.js` (content script in IIFE format)
3. **vite.ui.config.ts** - Builds `app.js` (React UI as ES module library)

### Build Scripts

```bash
# Full production build
npm run build

# Individual builds
npm run build:background  # Build service worker only
npm run build:content     # Build content script only
npm run build:ui          # Build React UI only

# Environment-specific builds
npm run build:prod        # Production build (uses bun)
npm run build:dev         # Development build with NODE_ENV=development
```

### Build Pipeline

The `npm run build` command executes:
1. `rm -rf dist` - Clean dist folder
2. `tsc -b` - TypeScript compilation check
3. `vite build -c vite.config.ts` - Build background.js (ES modules)
4. `vite build -c vite.content.config.ts` - Build content.js (IIFE)
5. `vite build -c vite.ui.config.ts` - Build app.js + CSS (ES modules)

**Important:** All three configs have `emptyOutDir: false` to prevent overwriting previous builds. They accumulate in the `dist` folder.

### Why IIFE for content.js?

Content scripts injected via `chrome.scripting.executeScript` need to be self-contained. IIFE format bundles everything (including `@mozilla/readability`) into a single file without external dependencies or chunk splitting.

## How It Works

### 1. Background Script (`background.ts`)

Service worker that handles:
- Context menu creation ("Read later" on text selection)
- Extension icon clicks
- Dynamic content script injection
- Message passing between content scripts and UI
- External messages from the web app for authentication
- API calls for collections and bookmarks

**Internal Message Actions:**
- `OPEN_AUTH_TAB` - Opens authentication page in new tab
- `GET_READLATER_COLLECTIONS` - Fetches user's collections
- `CREATE_READLATER_BOOKMARK` - Creates a new bookmark
- `CREATE_READLATER_COLLECTION` - Creates a new collection

**External Message Actions (from web app):**
- `READLATER_AUTH` - Stores auth token in `chrome.storage.local`
- `READLATER_REVOKE` - Removes auth token from storage

### 2. Content Script (`content.ts`)

Dynamically injected into web pages to:
- Extract page metadata (title, description, OG tags, images)
- Use `@mozilla/readability` to parse article content
- Inject React UI into Shadow DOM for CSS isolation
- Sanitize HTML content and remove ads/scripts
- Handle messages from background script

**Message Types:**
- `PING` - Check if script is already injected (prevents duplicate injection)
- `GET_HIGHLIGHT_DATA` - Extract selected text + metadata when user right-clicks
- `GET_WHOLE_PAGE` - Extract full article using Readability when icon is clicked

**UI Injection:**
- Creates a fixed-position div (`readlater-root`) in top-right corner
- Attaches Shadow DOM for CSS isolation
- Loads fonts and styles dynamically via `chrome.runtime.getURL`
- Stores bookmark payload in `window.__READLATER_PAYLOAD__`
- Closes UI when clicking outside

### 3. React UI (`App.tsx`)

Renders inside Shadow DOM with:
- **Authentication flow** - Redirects to web app for login
- **Collection selection** - Multi-select with checkboxes
- **Create new collection** - Form with name, emoji, and visibility toggle
- **Save bookmark** - Saves to selected collections
- **User profile display** - Shows authenticated user info

**Routes:**
- `/` - Home page (collection list + save button)
- `/create` - Create new collection form
- `/auth` - Authentication redirect page

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
- `localhost:3002` (dev server)
- `*.readlater.fyi` (production domain)

This prevents conflicts when developing or using the web app.
