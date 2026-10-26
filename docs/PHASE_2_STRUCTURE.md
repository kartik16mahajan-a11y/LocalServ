# LocalServ — Phase 2 Structure

This commit establishes the shared file/folder skeleton for parallel team development. Existing implemented files are preserved.

## Pages
- `src/pages/Home/` — Home page and sections
- `src/pages/Services/` — Services directory
- `src/pages/Bookings/` — Booking history
- `src/pages/Plans/` — Plans and combos
- `src/pages/Reviews/` — Reviews and ratings
- `src/pages/ConsumerProfile/` — Consumer account
- `src/pages/ProviderDashboard/` — Provider dashboard
- `src/pages/NotFound/` — Unknown routes

## Shared modules
- `src/components/` — reusable modals, fields, route guard, rating picker
- `src/context/` — auth, shared data, toast notifications
- `src/hooks/` — reusable React hooks
- `src/data/` — service catalog and seed data
- `src/utils/` — formatting and validation helpers
- `src/shared/styles/` — shared visual styles

## Team workflow
1. Work only on your assigned page/component and its required styles.
2. Pull the latest `main` before starting.
3. Commit focused changes with clear messages.
4. Avoid replacing shared files unless the team agrees on the change.
5. Coordinate changes to `src/App.jsx`, `src/index.css`, and shared layouts before merging.
