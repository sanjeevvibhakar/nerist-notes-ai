# Deployment Guide for NERIST Notes Portal 🚀

This guide explains how to deploy the **Django Backend** to Render and the **React Frontend** to Vercel (Free Tiers).

---

## 🏗️ 1. Prepare Backend (Django)

1.  **Repository:** Ensure this entire folder is pushed to a GitHub repository.
2.  **Platform:** Sign up at [Render.com](https://render.com).
3.  **New Web Service:**
    *   Click **New +** -> **Web Service**.
    *   Connect your GitHub repo.
    *   **Root Directory:** `.` (or leave empty)
    *   **Build Command:** `pip install -r requirements.txt && python manage.py migrate && python manage.py collectstatic --noinput`
    *   **Start Command:** `gunicorn nerist_portal.wsgi:application`
    *   **Environment Variables:**
        *   `PYTHON_VERSION`: `3.9.0` (or similar)
        *   `SECRET_KEY`: (Generate a random string)
        *   `DEBUG`: `False` (Important for security)
        *   `DATABASE_URL`: **See Step 1.1 below**

### 🛢️ 1.1 Database Setup (Important)
Render provides a free PostgreSQL instance.
1.  On Render.com dashboard, click **New +** -> **PostgreSQL**.
2.  Name it (e.g., `nerist-db`), choose a region (e.g., Singapore/US), and select **Free Plan**.
3.  Once created, copy the **Internal Database URL** (if deploying backend on Render) or **External Database URL**.
4.  Paste this URL into the `DATABASE_URL` environment variable in your Web Service settings.

---

## 🎨 2. Prepare Frontend (React)

1.  **Platform:** Sign up at [Vercel.com](https://vercel.com).
2.  **New Project:**
    *   Import the same GitHub repo.
    *   **Root Directory:** `nerist-frontend` (IMPORTANT: Edit this in Vercel settings immediately).
    *   **Framework:** Vite (Vercel should auto-detect).
    *   **Build Command:** `npm run build`
    *   **Output Directory:** `dist`
3.  **Environment Variables:**
    *   Vercel needs to know where the backend is.
    *   Edit `nerist-frontend/src/api/axios.js` to use an environment variable instead of `localhost`.
    *   In Vercel, set `VITE_API_URL` to your Render Backend URL (e.g., `https://nerist-portal-api.onrender.com/api/`).

---

## 🔗 3. Connecting Them

**Frontend -> Backend (API URL):**
Update `nerist-frontend/src/api/axios.js`:
```javascript
const baseURL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000/api/";
const instance = axios.create({ baseURL });
```

**Backend -> Frontend (CORS):**
In `nerist_portal/settings.py` (Production):
```python
CORS_ALLOWED_ORIGINS = [
    "https://your-vercel-app.vercel.app",
    "http://localhost:5173",
]
```

## 🏃 Run Locally
1. Backend: `venv\Scripts\python manage.py runserver`
2. Frontend: `cd nerist-frontend && npm run dev`
