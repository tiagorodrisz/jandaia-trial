# Jandaia Mini Project

Early project for learning full-stack development, featuring a Python backend with FastAPI, a Next.js + TypeScript frontend, and end-to-end testing using Playwright.

## Features

* Backend with **FastAPI** and **SQLAlchemy** connected to **PostgreSQL**
* Frontend with **Next.js** and **TypeScript**
* CORS-enabled API for client-server communication
* Seed data for initial clients and licenses
* End-to-end tests with **Playwright**
* Full CRUD operations for clients and licenses

## Technologies Used

* Python 3.13
* FastAPI
* SQLAlchemy
* PostgreSQL
* Next.js
* TypeScript
* Playwright

## Project Structure

```
backend/
├─ app/
│  ├─ main.py
│  ├─ models.py
│  ├─ database.py
│  ├─ routers/
│     ├─ clientes.py
│     └─ licencas.py
frontend/
├─ pages/
│  ├─ clientes.tsx
e2e/
├─ tests/
│  ├─ licencas.spec.ts
```

## Setup Instructions

### Backend

1. Create a virtual environment and install dependencies:

```bash
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

2. Set up PostgreSQL database:

```sql
CREATE DATABASE jandaia;
```

3. Run FastAPI server:

```bash
uvicorn app.main:app --reload
```

### Frontend

1. Install dependencies:

```bash
npm install
```

2. Run Next.js development server:

```bash
npm run dev
```

3. Open `http://localhost:3000/clientes` in your browser.

### End-to-End Tests

Run Playwright tests:

```bash
npx playwright test
```

## License

This project is for educational purposes only.
