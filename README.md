_This project is a demo for a particular assignment, some features is not suitable for real-world production use case._

---

# SatuCover | Demo

A customer portal for a insurance system.

## Overview

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Tech Stack

- Frontend: `Next.js`, `React`
- Authentication: `Google OAuth2` with `NextAuth`
- State Management: `Redux`
- API Integration: mock RESTful API [https://reqres.in]
- CSS Framework: `shadcn/ui`, `Tailwind CSS`

## Getting Started

### Dependencies & Environment Setup

```bash
pnpm i
```

Create and update `.env.local` follow the `.env.example` file.

```bash
# .env.local

# Getting NextAuth Secret: https://authjs.dev/getting-started/installation?framework=next-js#setup-environment
AUTH_SECRET={SECRET}

# Register Google OAuth 2.0: https://developers.google.com/identity/protocols/oauth2/
AUTH_GOOGLE_ID={CLIENT_ID}
AUTH_GOOGLE_SECRET={CLIENT_SECRET}

# Web App Env/Version
VERSION=development
```

### Start Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Additional Info

- NextAuth Provider with Google OAuth: https://authjs.dev/getting-started/authentication/oauth?framework=next-js
