# Car Dealership Inventory System

A full-stack dealership inventory application with protected purchasing and role-based inventory management.

## Features

- User registration, login, JWT authentication, and role authorization
- Available-inventory listing, case-insensitive search, purchase, and atomic stock decrement
- Admin vehicle creation, update/delete API support, and restocking
- Responsive React/Tailwind UI with protected routes, filters, loading/error states, destructive-action confirmation, and stock-aware purchase actions
- Jest/Supertest automated backend tests using an isolated MongoDB test server

## Stack and architecture

React + Tailwind + Axios → Express REST API → controllers/services → Mongoose → MongoDB.

`backend/src` contains routes, thin controllers, services, models, and middleware. `frontend/src` contains route pages, shared layout/protected-route components, central API configuration, and auth context.

## Setup

Prerequisites: Node.js 20+, npm, a MongoDB Atlas/local MongoDB connection, and Git.

1. Copy `backend/.env.example` to `backend/.env` and provide `MONGODB_URI`, `JWT_SECRET`, `PORT`, and `CLIENT_URL`.
2. Copy `frontend/.env.example` to `frontend/.env` when a non-default API URL is needed.
3. Install dependencies:

```sh
npm install --prefix backend
npm install --prefix frontend
```

Run the API with `npm run backend`, the UI with `npm run frontend`, tests with `npm test`, and coverage with `npm run coverage`.

## API

All responses use `{ success, message, data }` (or `error` for failures). Bearer token is required for all vehicle routes.

| Method | URL | Access | Purpose |
| --- | --- | --- | --- |
| GET | `/api/health` | Public | Service health check |
| POST | `/api/auth/register` | Public | `{name,email,password}`; creates a user |
| POST | `/api/auth/login` | Public | `{email,password}`; returns token and safe user |
| GET | `/api/vehicles` | Authenticated | Available vehicles; optional `page`, `limit` |
| GET | `/api/vehicles/search` | Authenticated | `make`, `model`, `category`, `minPrice`, `maxPrice` |
| POST | `/api/vehicles` | Admin | Add vehicle including unique `vehicleId` |
| PUT | `/api/vehicles/:id` | Admin | Update vehicle fields |
| DELETE | `/api/vehicles/:id` | Admin | Delete vehicle |
| POST | `/api/vehicles/:id/purchase` | Authenticated | Decrement available stock atomically |
| POST | `/api/vehicles/:id/restock` | Admin | `{quantity: positive integer}` |

Typical error statuses: 400 validation, 401 missing/invalid authentication, 403 role restriction, 404 missing record, 409 duplicate/out-of-stock.

## Admin setup

Set `ADMIN_NAME`, `ADMIN_EMAIL`, and `ADMIN_PASSWORD` locally and run `npm --prefix backend run seed:admin`. Normal registration can only create `user` accounts.

## Testing and TDD

The test suite exercises auth, token rejection, role boundaries, validation, duplicate IDs, search, purchase stockouts, restocking, and available-inventory filtering. It uses the dedicated `TEST_MONGODB_URI` database when supplied (or `mongodb-memory-server` as a fallback); the running application uses the configured persistent MongoDB URI. Verified on this workspace: `npm --prefix backend run test` passed 7 of 7 tests. Run the coverage command above to generate the current report.

The intended workflow is Red → Green → Refactor: add a behavioral test, make the minimum implementation pass, then simplify while keeping tests green.

## Screenshots

Place manual screenshots in `screenshots/`: Login, Registration, Dashboard, Search, Admin dashboard, Add vehicle, Purchase, and Out-of-stock state.

## Git workflow

Commit logical steps after review (for example `test: add inventory operation coverage`, then `feat: implement inventory operations`). AI-assisted commits should include `Co-authored-by: Codex <AI@users.noreply.github.com>`. Never commit `.env`.

## AI usage

Codex was used to help develop the initial architecture, test structure, validation and inventory rules, React UI, and documentation. The generated work should be manually reviewed, understood, and tested before submission; AI accelerated implementation but does not replace that review. Paste the actual raw interactions into `PROMPTS.md` rather than creating a synthetic transcript.

## Future improvements

Vehicle images, pagination controls, purchase history/audit logs, refresh tokens, analytics, deployment, and stronger client-side form editing are sensible next steps.
