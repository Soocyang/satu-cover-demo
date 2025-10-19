export const CONFIGS = {
  BASE_API_URL: 'https://reqres.in/api',
  API_KEY: process.env.API_KEY || 'reqres-free-v1',
  WEB_API_URL:
    process.env.NEXT_PUBLIC_VERSION === 'development'
      ? 'http://localhost:3000/api'
      : 'https://satu-cover-demo.vercel.app/api',
  PER_PAGE_PER_FETCH_USERS: 5,
  PUBLIC_ROUTES: ['/login', '/unauthorized'],
} as const;
