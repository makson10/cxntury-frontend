# cxntury-frontend

A small React + Vite frontend for the cxntury project.

## Key Functionality

This interactive worksheet application provides:

- **Task Management** — Fetches and displays multiple-choice tasks from the backend API
- **Session Handling** — Creates unique user sessions to track progress and answers
- **Interactive Quiz Interface** — Users can select answers with instant visual feedback
- **Real-time Validation** — Submits answers to the backend and shows whether the answer is correct or incorrect
- **Visual Feedback** — Color-coded responses (green for correct, red for incorrect) with smooth animations
- **Error Handling** — Graceful error screens with retry functionality
- **Loading States** — Elegant loading indicators during data fetching and submission
- **Responsive Design** — Built with Tailwind CSS for mobile-first responsive layouts

## Deployment

This project is deployed on **Vercel** and accessible at:

🔗 **https://cxntury-frontend.vercel.app/**

The deployment is automatically configured for Vite, with the build output served from the `dist` directory.

Note: Please note that the application may take a long time to respond (up to 30 seconds) due to backend hosting limitations (Render).

## Requirements

- Node.js (recommended 18+)
- npm (or yarn / pnpm)

## Install

From the `frontend` directory:

```bash
npm install
```

## Available scripts

- `npm run dev` — start the dev server (Vite)
- `npm run build` — compile TypeScript and build the production bundle (`tsc -b && vite build`)
- `npm run preview` — locally preview the production build

## Run locally

Start development server:

```bash
npm run dev
```

Build and preview production bundle:

```bash
npm run build
npm run preview
```
