# 🚀 AI Web Forge — AI-Powered Website Builder

> **Describe your idea. Let AI build it. Deploy it in one click. 🤯**

AI Web Forge is a full-stack **AI-powered website builder SaaS** that allows users to generate complete websites using natural-language prompts and deploy them with a single click.

This project is being built with a **production-oriented SaaS architecture**, including authentication, credit management, Stripe payments, AI website generation, deployment automation, and cloud hosting.

---

## 🌐 Project Overview

Traditional website development requires writing code, configuring projects, and setting up deployment infrastructure.

**AI Web Forge simplifies this workflow:**

```text
User Idea
    ↓
AI Website Generation
    ↓
Generated Website
    ↓
Preview / Edit
    ↓
One-Click Deployment
    ↓
Live Website 🚀
```

Users can describe what they want to build, and the platform uses AI to generate the website automatically.

A **credit-based system** controls AI generations, while **Stripe Checkout** allows users to purchase additional credits.

---

## 🔥 Features

### 🤖 AI Website Generation

* Generate websites using natural-language prompts
* AI-powered website creation
* Automatically generate website structure and content
* Prompt-based development workflow
* Designed for rapid prototyping

### 🚀 One-Click Deployment

* Deploy generated websites directly from the platform
* Automated deployment workflow
* Production-ready deployment architecture
* Users don't need to manually configure deployment

### 💰 Credit-Based System

* Users receive credits for AI generations
* Each generation consumes credits
* Credit balance tracking
* Prevents unlimited resource consumption
* Designed for scalable SaaS monetization

### 💳 Stripe Payments

* Stripe Checkout integration
* Secure credit purchases
* Payment verification using webhooks
* Automatic credit updates after successful payment
* Server-side payment validation

### 🔐 Authentication & Security

* User authentication
* Protected routes
* Secure API architecture
* Backend authorization
* Protected credit and payment operations

### 🎞 Modern UI & Animations

* Responsive interface
* Tailwind CSS styling
* Smooth animations using Motion
* Modern SaaS dashboard experience
* Interactive user experience

### ☁️ Production Deployment

* Frontend deployed on Render
* Backend deployed on Render
* MongoDB cloud database
* Environment-based configuration
* Production-oriented architecture

---

# 🛠 Tech Stack

## Frontend

| Technology      | Purpose            |
| --------------- | ------------------ |
| ⚛️ React.js     | Frontend framework |
| 🎨 Tailwind CSS | Styling            |
| 🎞️ Motion      | UI animations      |
| 🔗 Axios        | API communication  |

## Backend

| Technology              | Purpose             |
| ----------------------- | ------------------- |
| 🟢 Node.js              | Backend runtime     |
| 🚂 Express.js           | REST API            |
| 🍃 MongoDB              | Database            |
| 🔐 JWT / Authentication | User authentication |

## Payments

| Technology         | Purpose              |
| ------------------ | -------------------- |
| 💳 Stripe Checkout | Payment processing   |
| 🔔 Stripe Webhooks | Payment verification |
| 💰 Credits         | SaaS billing system  |

## Deployment

| Technology       | Purpose                    |
| ---------------- | -------------------------- |
| ☁️ Render        | Frontend & backend hosting |
| 🍃 MongoDB Atlas | Cloud database             |

---

# 🏗️ Architecture

The application follows a full-stack SaaS architecture:

```text
                    ┌─────────────────────┐
                    │       User          │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │   Tailwind + Motion │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │      Node.js        │
                    └──────┬──────┬───────┘
                           │      │
                ┌──────────┘      └──────────┐
                ▼                             ▼
       ┌─────────────────┐          ┌─────────────────┐
       │    MongoDB      │          │   AI Service    │
       │ Users / Credits │          │ Website Gen.    │
       └─────────────────┘          └────────┬────────┘
                                             │
                                             ▼
                                   ┌─────────────────┐
                                   │ Generated Site  │
                                   └────────┬────────┘
                                            │
                                            ▼
                                   ┌─────────────────┐
                                   │   Deployment    │
                                   │    System 🚀    │
                                   └─────────────────┘

                     Payment Flow
                           │
                           ▼
                  ┌─────────────────┐
                  │ Stripe Checkout │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Stripe Webhook  │
                  └────────┬────────┘
                           │
                           ▼
                  ┌─────────────────┐
                  │ Update Credits  │
                  └─────────────────┘
```

---

# 📂 Project Structure

```text
AI-WEB-FORGE/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── context/
│   │   ├── assets/
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── services/
│   ├── config/
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md
```

> The structure may evolve as the project grows.

---

# 💳 Credit System

AI generations are controlled using a credit-based system.

Example:

```text
New User
   │
   ▼
Free Credits
   │
   ▼
Generate Website
   │
   ▼
Credits Deducted
   │
   ▼
Credits = 0
   │
   ▼
Purchase Credits
   │
   ▼
Stripe Checkout
   │
   ▼
Payment Successful
   │
   ▼
Stripe Webhook
   │
   ▼
Credits Added
```

This architecture allows the application to control AI usage while providing a foundation for SaaS monetization.

---

# 💰 Payment Flow

Stripe is integrated using **Checkout + Webhooks**.

```text
User
 │
 ▼
Select Credit Plan
 │
 ▼
Create Stripe Checkout Session
 │
 ▼
Stripe Checkout
 │
 ▼
Payment
 │
 ▼
Stripe Webhook
 │
 ▼
Verify Event
 │
 ▼
Update User Credits
```

The backend handles payment verification and credit updates rather than trusting the frontend.

---

# 🚀 Deployment Flow

The goal of the deployment system is to make website publishing as simple as possible.

```text
Generate Website
       │
       ▼
Generated Project
       │
       ▼
Deployment Process
       │
       ▼
Build Website
       │
       ▼
Production Deployment
       │
       ▼
Live URL 🚀
```

The long-term goal is to make deployment completely transparent to the user.

---

# 📈 Development Progress

I'm building this project incrementally and documenting the development process through Git commits.

### Current Progress

* [x] Project initialization
* [x] React frontend setup
* [x] Node.js backend setup
* [x] Express API setup
* [x] MongoDB integration
* [x] Tailwind CSS setup
* [x] Motion animation setup
* [x] Authentication system
* [ ] Protected routes
* [ ] AI website generation
* [ ] Credit management
* [ ] Stripe Checkout
* [ ] Stripe Webhooks
* [ ] Website preview
* [ ] One-click deployment
* [ ] Production optimization
* [ ] Complete SaaS workflow

> This checklist will be continuously updated as development progresses.

---

# 🗺️ Roadmap

### Phase 1 — Foundation

* [x] Initialize frontend
* [x] Initialize backend
* [x] Configure database
* [x] Setup Tailwind CSS
* [x] Setup animations
* [ ] Design core UI

### Phase 2 — Authentication

* [x] User registration
* [x] User login
* [ ] Authentication middleware
* [ ] Protected routes
* [ ] User dashboard

### Phase 3 — AI Website Generation

* [ ] Prompt input
* [ ] AI integration
* [ ] Website generation
* [ ] Generated code handling
* [ ] Website preview
* [ ] Regeneration workflow

### Phase 4 — Credit System

* [ ] User credit model
* [ ] Credit deduction
* [ ] Credit validation
* [ ] Transaction history
* [ ] Credit dashboard

### Phase 5 — Payments

* [ ] Stripe integration
* [ ] Checkout sessions
* [ ] Credit packages
* [ ] Stripe webhook
* [ ] Payment verification
* [ ] Automatic credit updates

### Phase 6 — Deployment

* [ ] Deployment API
* [ ] Generated project packaging
* [ ] Automated deployment
* [ ] Deployment status
* [ ] Live URL generation
* [ ] Deployment error handling

### Phase 7 — Production

* [ ] Production deployment
* [ ] Error handling
* [ ] Security improvements
* [ ] API optimization
* [ ] Performance optimization
* [ ] Responsive design
* [ ] Final testing

---

# 🎯 Learning Goals

Through this project, I am focusing on learning and implementing:

* Full-stack SaaS architecture
* AI integration in real-world applications
* REST API development
* Authentication and authorization
* Credit-based billing systems
* Stripe Checkout integration
* Stripe webhook handling
* Secure payment processing
* Automated deployment architecture
* Cloud deployment
* Database design
* Production backend architecture
* Frontend state management
* API security
* Error handling
* Scalable application design

---

# 📊 What Makes This Project Different?

This isn't just a CRUD application.

The goal is to build a **real-world SaaS product** that combines:

```text
AI
+
Full-Stack Development
+
Authentication
+
Credits
+
Payments
+
Automation
+
Deployment
=
AI SaaS Platform 🚀
```

The project is being developed incrementally with a focus on **real-world architecture, security, scalability, and deployment**.

---
# ⚙️ Getting Started

## 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/ai-web-forge.git
cd ai-web-forge
```

## 2. Install frontend dependencies

```bash
cd client
npm install
```

## 3. Install backend dependencies

```bash
cd ../server
npm install
```

## 4. Configure environment variables

Create `.env` files for the required credentials.

Example:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret
AI_API_KEY=your_ai_api_key
```

> Never commit `.env` files or secret API keys to GitHub.

## 5. Run the backend

```bash
npm run dev
```

## 6. Run the frontend

```bash
cd ../client
npm run dev
```

---

# 🔐 Security

Security is an important part of this project.

The application is designed to:

* Protect private API routes
* Validate authenticated users
* Keep API keys on the server
* Verify Stripe webhook events
* Prevent unauthorized credit modifications
* Keep sensitive environment variables outside the repository
* Validate user input
* Handle API errors safely

---

# ☁️ Deployment

The application is intended to run in a production environment using:

```text
Frontend
   ↓
Render

Backend
   ↓
Render

Database
   ↓
MongoDB Atlas

Payments
   ↓
Stripe
```

---

# 📌 Development Philosophy

I am building this project publicly to document the complete development journey—from the initial setup to a production-ready SaaS application.

Rather than building everything at once, the project is being developed through small, trackable iterations.

Each major feature will be reflected through:

* Git commits
* Feature branches
* README updates
* UI improvements
* Bug fixes
* Architecture improvements
* Production deployment updates

---


# 🤝 Contributions

This project is currently being developed as a personal learning and portfolio project.

Suggestions, feedback, and ideas are welcome.

---

# ⭐ Support

If you find this project interesting, consider giving the repository a ⭐.

It helps support the project and motivates further development.

---

## 👨‍💻 Developer

**Shiva Maurya**

B.Tech Computer Science & Engineering

Interested in:

`Full-Stack Development` • `AI` • `SaaS` • `DSA` • `Backend Engineering`

---

> 🚀 **Building in public. Learning by building. Turning ideas into products.**
