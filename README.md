# Recipe Garden 🍽️🌱  
A **full-stack** platform for discovering and managing delicious recipes — featuring **Google Auth**, **Supabase**, and **OpenAI** integration.

> Built using **React + Supabase + OpenAI + Tailwind CSS**, deployed on **GitHub Pages**.

🌐 **Live Demo:** [Click to Visit](https://davidraj1510.github.io/Recipe-Garden/)

---

## ✨ Features

- 🔐 **User Authentication** using **Supabase** (Email + Google OAuth)
- 🧠 **OpenAI API Integration** for recipe recommendations, suggestions, and more.
- ⚡ **Fast & Typed** frontend built with **React + TypeScript**
- 🧭 Seamless navigation with **React Router + HashRouter**
- 🎨 Beautiful UI using **Tailwind CSS + ShadCN UI**
- 💻 Backendless architecture powered by **Supabase**
- 📦 Deployed via **GitHub Pages** with proper routing support
- 🧩 Modular folder structure for scalable development

---

## 🛠️ Tech Stack

| Category      | Tech                                                  |
|---------------|--------------------------------------------------------|
| **Frontend**  | React, TypeScript, Vite, Tailwind CSS, ShadCN UI       |
| **Routing**   | React Router DOM with `HashRouter` (for GitHub Pages)  |
| **Icons**     | Lucide React                                           |
| **Backend**   | Supabase (Auth, DB, REST/Realtime)                     |
| **AI Integration** | OpenAI API (for recommendations, suggestions, etc.) |
| **Deployment**| GitHub Pages                                           |

---

## 🔐 Authentication

- Email/Password Sign Up & Sign In  
- Google OAuth via Supabase  
- Session persistence with Supabase Auth helpers  
- Auth state listener redirects automatically to homepage after login

---

## 🧠 OpenAI API Integration

Uses OpenAI's GPT API to:

- Recommend recipes based on user preferences
- Generate recipe descriptions
- Suggest meal plans and healthy options

> You'll need to set your `OPENAI_API_KEY` in a `.env` file or in your Supabase function backend, if applicable.

---

## 🧭 Routing

- Uses **`HashRouter`** so navigation works correctly even on GitHub Pages
- Sample routes:
  - `/recipe/:id` (View specific recipe)
  - `/category/:category` (Explore recipes by category)
  - `/profile` (For authenticated users)
  - `/auth` (Login & Register)

---
