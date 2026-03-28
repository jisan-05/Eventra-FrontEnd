# 🎉 Eventra — Frontend

**Eventra** is a modern, full-featured event management web application. Users can discover, create, and join events. Hosts manage participants and approvals. Admins oversee the entire platform — all within a clean, responsive UI.

---

## 🔗 Live URLs

| Resource | URL |
|---|---|
| 🌐 Frontend Live App | [https://eventra-frontend-one.vercel.app](https://eventra-frontend-one.vercel.app) |
| ⚙️ Backend Live API | [https://eventra-backend-two.vercel.app](https://eventra-backend-two.vercel.app) |

---

## 🛠️ Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| UI Components | Shadcn UI + Radix UI |
| Authentication | Better-Auth (client-side) |
| Payments | Stripe.js |
| Animations/Sliders | Swiper.js |
| Icons | Lucide React |
| Notifications | Sonner |

---

## ✨ Key Features

### 🏠 Homepage
- **Hero Section** — Featured event selected by Admin with title, date, and join button
- **Upcoming Events Slider** — 9 upcoming public events in a smooth Swiper carousel
- **Event Categories** — Filter by Public Free, Public Paid, Private Free, Private Paid
- **Call To Action** — Encourage users to create and join events
- **Navbar** — Home, Events, Login/Signup, Dashboard links
- **Footer** — About, Contact, Privacy Policy

### 🔍 Events Page
- Search events by **title** or **organizer**
- Filter by event type (Public/Private, Free/Paid)
- Event cards showing title, date, organizer, fee badge, and details button

### 📋 Event Details Page
- Full event info: title, date & time, venue/link, description, organizer, fee
- Smart action buttons based on event type:

| Event Type | Action |
|---|---|
| Public Free | **Join** |
| Public Paid | **Pay & Join** |
| Private Free | **Request to Join** |
| Private Paid | **Pay & Request** |

- **Owner Controls** — Approve/reject requests, ban participants, edit/delete event
- **Reviews & Ratings** — Rate events, write/edit/delete reviews

### 📊 User Dashboard
| Section | Features |
|---|---|
| My Events | Create, update, delete events; view participants; manage approvals |
| Invitations | Accept, decline, or Pay & Accept invitations |
| My Reviews | View, edit, delete reviews |
| Settings | Update profile and notification preferences |

### 🛡️ Admin Dashboard
- Monitor and manage all events
- View and manage all user accounts
- Delete inappropriate events or user accounts

---

## 📁 Project Structure

```
eventra-frontend/
├── public/              # Static assets
├── src/
│   ├── app/
│   │   ├── (CommonLayout)/     # Public pages (home, events, event details)
│   │   ├── (DashboardLayout)/  # Protected dashboard pages
│   │   │   ├── @user/          # User dashboard (parallel routes)
│   │   │   └── @admin/         # Admin dashboard (parallel routes)
│   │   ├── login/              # Auth pages
│   │   └── signup/
│   ├── components/      # Reusable UI components
│   ├── constants/       # App-wide constants
│   ├── lib/             # Utility & auth client setup
│   └── services/        # API service functions
├── .env.local           # Environment variables
├── next.config.ts
├── tailwind.config.ts
└── package.json
```

---

## ⚙️ Local Setup & Installation

### Prerequisites
- Node.js v18+
- Backend server running (see [Eventra Backend](https://github.com/jisan-05/eventra-backend))

### 1. Clone the repository
```bash
git clone https://github.com/jisan-05/Eventra-FrontEnd.git
cd Eventra-FrontEnd
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_APP_URL=http://localhost:5000
```

### 4. Start the development server
```bash
npm run dev
```

The app will be running at `http://localhost:3000`

---

## 🔑 Test Credentials

### Admin Account
```
Email    : admin@gmail.com
Password : 12345678
```

### Regular User
```
Register a new account via the Signup page
```

---

## 🎭 User Roles & Permissions

### 👤 User
- Register and log in
- Browse all public events
- Create, update, and delete own events
- Join events based on type (free/paid, public/private)
- Manage invitations
- Write and manage reviews

### 🔑 Admin
- All user permissions
- Access the Admin Dashboard
- Delete any event or user account
- Monitor platform activity

---

## 💳 Payment Flow

1. User clicks **Pay & Join** or **Pay & Accept** on a paid event
2. Stripe Checkout session is created via the backend
3. User completes payment on the Stripe-hosted page
4. On success, a **Pending** participation request is created
5. Event host **approves** the request to confirm the participant

---

## 🗺️ Pages & Routes

| Route | Description | Access |
|---|---|---|
| `/` | Homepage with hero, slider, categories | Public |
| `/events` | All events with search & filter | Public |
| `/events/[id]` | Event details & join actions | Public/User |
| `/login` | User login | Public |
| `/signup` | User registration | Public |
| `/dashboard` | User/Admin dashboard redirect | Protected |
| `/dashboard/my-events` | Manage own events | User |
| `/dashboard/invitations` | Manage invitations | User |
| `/dashboard/reviews` | Manage reviews | User |
| `/dashboard/settings` | Profile & notification settings | User |
| `/dashboard/admin/events` | Manage all events | Admin |
| `/dashboard/admin/users` | Manage all users | Admin |

---

## 🚀 Deployment

This project is deployed on **Vercel** with automatic deployments on push to `main`.

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 📦 Available Scripts

| Script | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm start` | Start production server |
| `npm run lint` | Run ESLint checks |
