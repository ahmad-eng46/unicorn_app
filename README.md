# Unicorn Dashboard

A Vue.js application for managing unicorn data with CRUD operations via REST API.

## Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Install dependencies:**
```bash
npm install
```

2. **Configure environment:**
Create `.env` file with your CrudCrud endpoint:
```env
VITE_API_BASE_URL=https://crudcrud.com/api/YOUR_UNIQUE_ID
```

⚠️ **Note:** CrudCrud endpoints expire after 24 hours. Get a new ID from https://crudcrud.com/

3. **Start development server:**
```bash
npm run dev
```

App available at: `http://localhost:5173/`

## Tech Stack

- **Vue 3** - Composition API with TypeScript
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS
- **Pinia** - State management
- **Axios** - HTTP client

## Project Structure

```
src/
├── components/
│   ├── Sidebar.vue           # Navigation sidebar
│   ├── UnicornCard.vue       # Unicorn display card
│   ├── UnicornForm.vue       # Create/Edit modal
│   ├── Pagination.vue        # Pagination controls
│   └── Toast.vue             # Toast notifications
├── stores/
│   └── unicorn.ts            # Pinia store
├── services/
│   └── api.ts                # API service layer
├── types/
│   └── unicorn.ts            # TypeScript interfaces
└── App.vue                   # Main component
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/unicorns` | Get all unicorns |
| GET | `/unicorns/:id` | Get single unicorn |
| POST | `/unicorns` | Create unicorn |
| PUT | `/unicorns/:id` | Update unicorn |
| DELETE | `/unicorns/:id` | Delete unicorn |



## Live URL

```bash
https://unicorn-app-taupe.vercel.app/
```

