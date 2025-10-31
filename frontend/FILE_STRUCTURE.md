# Recommended File Structure for SmartTutor

This document explains the recommended file structure for your React + Vite + Supabase project.

## Directory Structure

```
frontend/src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Main layout wrapper
│   └── ProtectedRoute.tsx  # Route protection component
│
├── contexts/           # React Context providers
│   └── AuthContext.tsx # Authentication context
│
├── hooks/              # Custom React hooks
│   └── useAuth.ts      # Authentication hook
│
├── lib/                # Third-party library configurations
│   └── supabase/
│       └── client.ts   # Supabase client initialization
│
├── pages/              # Page components (routes)
│   ├── Login.tsx       # Login page
│   ├── Register.tsx    # Registration page
│   └── Dashboard.tsx   # Dashboard page
│
├── services/           # Business logic & API calls
│   ├── authService.ts  # Authentication service
│   └── dataService.ts  # Data CRUD operations
│
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared types
│
├── assets/             # Static assets (images, fonts, etc.)
├── App.tsx             # Main app component with routing
├── App.css             # App styles
├── main.tsx            # App entry point
└── index.css           # Global styles
```

## Directory Naming Conventions

### ✅ Use lowercase with hyphens for:
- Component files: `UserProfile.tsx`, `LoginForm.tsx`
- Service files: `authService.ts`, `dataService.ts`
- Utility files: `formatDate.ts`, `validation.ts`

### ✅ Use PascalCase for:
- React components: `UserProfile.tsx`, `Dashboard.tsx`
- Type definitions: `User`, `AuthResponse`

### ✅ Use camelCase for:
- Functions and variables: `getUserData()`, `handleSubmit`

## Directory Purposes

### `/components`
Reusable UI components that can be used across multiple pages.
- Examples: `Button.tsx`, `Input.tsx`, `Card.tsx`, `Navbar.tsx`

### `/pages` 
Top-level page components that represent routes.
- Examples: `Home.tsx`, `Profile.tsx`, `Settings.tsx`

### `/services`
Business logic and API communication layer.
- Separates data fetching from UI components
- Examples: `apiService.ts`, `storageService.ts`

### `/hooks`
Custom React hooks for shared logic.
- Examples: `useData.ts`, `useLocalStorage.ts`, `useDebounce.ts`

### `/contexts`
React Context providers for global state management.
- Examples: `ThemeContext.tsx`, `NotificationContext.tsx`

### `/lib`
Third-party library configurations and utilities.
- Examples: Supabase client, API clients, utility functions

### `/types`
TypeScript type definitions shared across the app.
- Examples: Database models, API response types

## Adding New Features

### Adding a new page:
1. Create file in `/pages` (e.g., `Settings.tsx`)
2. Add route in `App.tsx`

### Adding a new service:
1. Create file in `/services` (e.g., `settingsService.ts`)
2. Export functions for CRUD operations
3. Import in components/pages where needed

### Adding a new component:
1. Create file in `/components` (e.g., `SettingsForm.tsx`)
2. Import and use in pages

## Environment Variables

Create a `.env` file in the `frontend/` directory:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Note: All frontend environment variables must be prefixed with `VITE_` in Vite projects.

