-# 🍳 Recipe Stash

> A clean full-stack personal recipe manager to save recipe URLs and ingredients.

## 🌐 Live Deployment Links
- 🖥️ **Live Frontend Application:** [https://recipestash-web.onrender.com](https://recipestash-frontend.onrender.com)
- ⚙️ **Live Backend API (DRF):** [https://recipestash-api.onrender.com/api/](https://recipestash.onrender.com)

## 📌 Project Overview

**Recipe Stash** is a full-stack web application built using **Django REST Framework** and **React**. It provides an authenticated, isolated dashboard where users can store external recipe source URLs, document ingredients, and quickly manage their personal recipe collection.

### ✨ Key Features
- **JWT Authentication:** Secure user signup, login, and silent token refreshing via `djangorestframework-simplejwt`.
- **Private Data Scoping:** Each user interacts strictly with their own saved recipes via model owner scoping.
- **Card Grid Layout:** Visual grid displaying recipe cards with source links and ingredients.
- **Modal Submission:** Quick "Add Recipe" popup modal to save recipes without reloading.
- **Direct Source Links:** Single-click redirection to the original recipe website.

---

## 🛠️ Tech Stack

- **Backend:** Python, Django, Django REST Framework (DRF), SimpleJWT, Django-CORS-Headers, WhiteNoise, Gunicorn
- **Frontend:** React, React Router v6, Axios, JWT-Decode
- **Database:** SQLite (Local) / PostgreSQL (Production)

---

## 📂 Project Structure

```text
RecipeStash/
├── backend/                  # Django project configuration & settings
├── recipes/                  # Recipes app (models, serializers, views, URLs)
├── frontend/                 # React application
│   ├── src/
│   │   ├── api/axios.js      # Axios instance with JWT interceptors
│   │   ├── context/          # Global AuthContext state management
│   │   ├── components/       # Modal, ProtectedRoute, Cards
│   │   └── pages/            # Login, Register, Dashboard
├── requirements.txt          # Python dependencies
├── manage.py
└── .gitignore
