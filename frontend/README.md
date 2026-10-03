# PetClinic frontend

Modern React frontend for the Spring Boot PetClinic REST API in this repository. It replaces the legacy `client/` app (React 15 / webpack 1), which no longer builds.

**Stack:** Vite · React 19 · TypeScript · React Router · TanStack Query · React Hook Form + Zod

## Run it

You need Java 17+ and Node 20+.

1. Start the backend from the repository root (port 9966):
   ```
   ./mvnw spring-boot:run
   ```
2. In another terminal, start the frontend:
   ```
   cd frontend
   npm install
   npm run dev
   ```
3. Open http://localhost:5173

The Vite dev server proxies `/petclinic/*` to `http://localhost:9966`, so the browser talks to a single origin and no CORS setup is needed.

The backend uses an in-memory HSQLDB database by default, so data you add is reset when the backend restarts.

## Features

- Find owners by last name, view an owner with their pets and visits
- Add and edit owners
- Add and edit pets
- Add visits
- List veterinarians and their specialties

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server with hot reload |
| `npm run build` | Type-check and build for production into `dist/` |
| `npm run lint` | Lint with oxlint |
| `npm run preview` | Serve the production build locally |

## Project structure

```
src/
├── api/            fetch wrapper (client.ts) and server validation error mapping (formErrors.ts)
├── components/     shared UI: layout, form field, loading/error status
├── features/       one folder per feature: types, API hooks, schemas, pages
│   ├── home/
│   ├── owners/
│   ├── pets/
│   ├── visits/
│   └── vets/
├── utils/
├── App.tsx         route table
└── main.tsx        providers (TanStack Query, React Router)
```

Note: this backend reports validation errors in an `errors` response header rather than the response body; `api/client.ts` reads it so forms can show the messages next to the matching fields.
