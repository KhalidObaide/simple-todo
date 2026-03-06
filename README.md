# Simple Todo App

A minimal todo app with a Flask + SQLite backend and React frontend, fully Dockerized.

## Quick Start

```sh
docker compose up --build
```

Then open [http://localhost:3000](http://localhost:3000).

## Stack

- **Backend:** Flask, SQLite, Gunicorn
- **Frontend:** React (Vite), Nginx
- **Infra:** Docker Compose

## Local Development (without Docker)

**Backend:**

```sh
cd backend
pip install -r requirements.txt
python app.py
```

**Frontend:**

```sh
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api` requests to `localhost:5000`.
