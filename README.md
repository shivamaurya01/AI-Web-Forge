# 🚀 AI Web Forge

### AI-Powered Website Builder

**Describe your idea → Let AI build it → Edit → Preview → Deploy**

AI Web Forge is a full-stack AI website builder that converts natural-language prompts into functional websites. Users can generate, edit, preview, refine, and deploy websites from a single platform.

🌐 **Live Demo:** [AI Web Forge](https://ai-web-forge-1.onrender.com)

---

## ✨ Features

* 🤖 **AI Website Generation** — Create websites from natural-language prompts
* 💻 **Code Editor** — Edit generated code using Monaco Editor
* 👀 **Live Preview** — Instantly preview generated websites
* 📱 **Responsive Preview** — Desktop, tablet, and mobile modes
* ✨ **AI Refinement** — Improve websites using additional prompts
* 🔐 **Authentication** — JWT + Google authentication
* 💰 **Credit System** — Credits control AI generation usage
* 💳 **Stripe Payments** — Purchase credit-based plans
* 🔔 **Stripe Webhooks** — Automatically update credits after payment
* 🚀 **Deployment** — Deploy generated websites and access live URLs
* 📊 **Dashboard** — Manage websites, credits, and plans

---

## 🛠️ Tech Stack

| Layer          | Technologies                         |
| -------------- | ------------------------------------ |
| Frontend       | React.js, Tailwind CSS, Redux, Axios |
| Editor         | Monaco Editor                        |
| Backend        | Node.js, Express.js                  |
| Database       | MongoDB, Mongoose, MongoDB Atlas     |
| Authentication | JWT, Google Auth                     |
| AI             | OpenRouter API, DeepSeek Chat        |
| Payments       | Stripe Checkout, Stripe Webhooks     |
| Deployment     | Render                               |

---

# 🏗️ System Architecture

```text
                         ┌─────────────────────┐
                         │       USER          │
                         │  Browser / Client   │
                         └──────────┬──────────┘
                                    │
                             HTTPS / REST API
                                    │
                                    ▼
                    ┌────────────────────────────┐
                    │       REACT FRONTEND       │
                    │                            │
                    │ Tailwind • Redux • Axios   │
                    │ Monaco Editor • Preview    │
                    └─────────────┬──────────────┘
                                  │
                                  ▼
                    ┌────────────────────────────┐
                    │     NODE + EXPRESS API     │
                    │                            │
                    │ Auth • Users • Websites    │
                    │ Billing • AI • Deployment  │
                    └──────┬─────────┬───────────┘
                           │         │
             ┌─────────────┘         └──────────────┐
             ▼                                      ▼
   ┌──────────────────┐                   ┌──────────────────┐
   │     MongoDB      │                   │   OpenRouter     │
   │                  │                   │                  │
   │ Users            │                   │ DeepSeek Chat    │
   │ Websites         │                   │ Code Generation  │
   │ Credits          │                   └────────┬─────────┘
   │ Plans            │                            │
   └──────────────────┘                            ▼
                                      ┌─────────────────────┐
                                      │ Generated Website   │
                                      │ HTML/CSS/JS         │
                                      └──────────┬──────────┘
                                                 │
                              ┌──────────────────┴──────────────┐
                              ▼                                 ▼
                    ┌──────────────────┐              ┌─────────────────┐
                    │ Monaco Editor    │              │ Live Preview    │
                    │ Code Editing     │              │ Responsive UI   │
                    └────────┬─────────┘              └────────┬────────┘
                             │                                 │
                             └──────────────┬──────────────────┘
                                            ▼
                                  ┌────────────────────┐
                                  │    Deployment      │
                                  │                    │
                                  │ Build / Package    │
                                  │ Deploy             │
                                  └─────────┬──────────┘
                                            │
                                            ▼
                                  ┌────────────────────┐
                                  │   🌐 LIVE WEBSITE  │
                                  └────────────────────┘


                    ┌──────────────────────────────┐
                    │            STRIPE            │
                    │ Checkout + Webhooks         │
                    └──────────────┬───────────────┘
                                   │
                         Payment Confirmation
                                   │
                                   ▼
                          Stripe Webhook
                                   │
                                   ▼
                         Verify Signature
                                   │
                                   ▼
                           Update MongoDB
                         Credits + Plan
```

---

## 🔄 Core Workflow

```text
User Prompt
    ↓
Authentication
    ↓
Check Credits
    ↓
OpenRouter / AI Model
    ↓
Generate Website Code
    ↓
Save Website
    ↓
Live Preview
    ↓
Edit / AI Refinement
    ↓
Deploy
    ↓
Live Website 🚀
```

---

## 💳 Payment & Credit Flow

```text
Free Credits
     ↓
AI Generation
     ↓
Credits Deducted
     ↓
Credits Low / Empty
     ↓
Select Plan
     ↓
Stripe Checkout
     ↓
Successful Payment
     ↓
Stripe Webhook
     ↓
Verify Signature
     ↓
Update User Credits & Plan
```

Payment-related credit updates are handled **server-side** through Stripe webhooks rather than trusting the frontend.

---

## 📂 Project Structure

```text
AI-WEB-FORGE/
│
├── client/
│   └── src/
│       ├── components/
│       ├── pages/
│       ├── hooks/
│       ├── assets/
│       └── App.jsx
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   ├── utils/
│   └── index.js
│
├── .gitignore
└── README.md
```

---

# 📈 Development Progress

### ✅ Completed

* [x] Full-stack React + Node.js architecture
* [x] MongoDB database integration
* [x] JWT & Google authentication
* [x] Protected API routes
* [x] AI website generation
* [x] OpenRouter + DeepSeek integration
* [x] Monaco code editor
* [x] Live responsive preview
* [x] AI-powered website refinement
* [x] Credit-based usage system
* [x] Stripe Checkout
* [x] Stripe webhook verification
* [x] Automatic credit & plan updates
* [x] Website deployment workflow
* [x] Render deployment
* [x] MongoDB Atlas integration
* [x] Production environment setup

---

# 🗺️ Roadmap

### 🔹 Next

* [ ] Transaction history
* [ ] Deployment history & logs
* [ ] Better deployment error handling
* [ ] API rate limiting
* [ ] Automated testing
* [ ] Performance optimization
* [ ] Monitoring & logging

### 🔹 Future

* [ ] Custom domains
* [ ] Website templates
* [ ] Website version history
* [ ] Website duplication
* [ ] Project export
* [ ] Advanced AI editing
* [ ] Team collaboration
* [ ] Usage analytics
* [ ] Background job processing

---

## 🎯 What This Project Demonstrates

AI Web Forge combines several real-world engineering concepts:

**AI Integration • SaaS Architecture • REST APIs • Authentication • Database Design • State Management • Payment Webhooks • Credit Systems • Code Editing • Live Preview • Cloud Deployment**

---

## ⚙️ Run Locally

```bash
# Clone
git clone https://github.com/YOUR_USERNAME/ai-web-forge.git

cd ai-web-forge

# Frontend
cd client
npm install
npm run dev

# Backend
cd ../server
npm install
npm run dev
```

Create environment variables for MongoDB, JWT, OpenRouter, Stripe, and frontend configuration before running the application.

---

## 👨‍💻 Developer

**Shiva Maurya**

B.Tech Computer Science & Engineering

**Full-Stack Development • AI • SaaS • DSA**

> 🚀 Building real products to learn real engineering.

---
