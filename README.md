# LocalServ - Phase 2 (Dynamic React App)

A marketplace for verified local home services. Phase 1 was static; Phase 2 is fully functional
using React + React Router + Context API, with **localStorage** as the data layer (no backend).

## Run

```bash
npm install
npm run dev        # opens http://localhost:5173
npm run build      # production build check
```

## Demo accounts (also shown inside the login popup)

| Role     | Email                | Password |
|----------|----------------------|----------|
| User     | user@localserv.in    | user123  |
| Provider | vikram@localserv.in  | pro123   |

You can also create new accounts with **Login -> Sign Up**.

## Demo flow for the instructor

1. Click **Login**, pick **User**, login with the demo user.
2. Open **Services**, search / filter / sort, then **Book Now** (form validation, price summary).
3. Go to **My Bookings**: track, reschedule, cancel, filter by tabs.
4. **Logout**, login as **Provider**: the booking appears under **Requests**. **Accept** it, then **Mark as Completed**.
5. Login as the user again: the booking shows *Confirmed* with the start OTP, then *Completed* with **Write Review**.
6. Open **Reviews**: filters, rating summary and the submit-review form. New reviews also appear on the Home page.
7. Refresh the page: everything is still there (localStorage).

To reset all data: DevTools -> Application -> Local Storage -> clear, or run `localStorage.clear()` in the console.

## localStorage keys

| Key           | What it stores                              |
|---------------|---------------------------------------------|
| `ls_users`    | All user + provider accounts                |
| `ls_session`  | Id of the logged-in account                 |
| `ls_bookings` | All bookings (shared by users & providers)  |
| `ls_reviews`  | All reviews                                 |

## Folder structure

```
src/
  main.jsx                 Providers wrap the app (Router, Toast, Auth, Data)
  App.jsx                  All routes + global popups
  context/                 AuthContext, DataContext, ToastContext   (Context API)
  hooks/useLocalStorage.js Custom hook (useState + useEffect)
  components/              Modal, FormFields, RatingPicker, ProtectedRoute, AuthModal, BookingModal
  layouts/                 Navbar, Footer
  pages/                   Home, Services, Bookings, Plans, Reviews, ConsumerProfile, ProviderDashboard, NotFound
  data/                    servicesData.js (catalogue), seedData.js (demo data)
  utils/                   validators.js, format.js
```

## React concepts used (mapped to the syllabus)

| Syllabus topic                          | Where it is used |
|-----------------------------------------|------------------|
| Components, props, JSX, lists, conditional rendering | every page, `Modal`, `FormFields` |
| `useState`                              | forms, tabs, filters, modals |
| `useEffect`                             | `useLocalStorage`, `Modal` (Esc key), `Navbar` (scroll), `ScrollToTop` |
| `useMemo`                               | search/filter/sort in `ServicesPage`, `ReviewsPage` |
| `useCallback`                           | `showToast` in `ToastContext` |
| Custom hooks                            | `useLocalStorage`, `useAuth`, `useData`, `useToast` |
| Lifting state up                        | filters and form values live in the page, children get props |
| React Router, nested/dynamic routes, 404 | `App.jsx`, `useNavigate`, `useLocation`, `useSearchParams`, `NavLink` |
| Protected routes                        | `ProtectedRoute` (user-only and provider-only pages) |
| Context API, global vs local state      | `AuthContext`, `DataContext`, `ToastContext` |
| Error / success handling in state       | toasts + login error messages in `AuthModal` (loading states are planned for Phase 3, when real API calls are added) |
| Controlled forms + validation strategies | `AuthModal`, `BookingModal`, review form, profile forms |
| Reusable input components               | `InputField`, `SelectField`, `TextareaField`, `RatingPicker` |
| Modal, tabs, toast, search/filter/sort  | `Modal`, dashboard & booking tabs, `ToastContext`, Services/Reviews pages |
| Browser storage, JSON                   | `useLocalStorage` |

> Note: passwords are stored as plain text in localStorage only because this is a front-end demo with no backend.
> A real app would hash passwords on a server.
