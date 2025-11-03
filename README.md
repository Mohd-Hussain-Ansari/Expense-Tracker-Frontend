# Expense Tracker Frontend

## How to Run

### 1. Install Dependencies
```bash
cd frontend
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

The application will run on **http://localhost:5173**

### 3. Available Commands
```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
```

### Requirements
- Backend API running on `http://localhost:3000`
- Node.js v22+ (or v20.19+)

---

**Happy coding! 🚀**

## API Integration

The frontend is configured to connect to the backend API:
- **API Base URL**: `http://localhost:3000`
- **Proxy Route**: `/api` → `http://localhost:3000` (configured in `vite.config.ts`)
