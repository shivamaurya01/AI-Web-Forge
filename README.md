🚀 AI Web Forge — AI-Powered Website Builder

Describe your idea. Let AI build it. Preview it. Deploy it. 🤯

AI Web Forge is a full-stack AI-powered website builder SaaS that allows users to generate websites from natural-language prompts, preview and edit the generated code, and deploy websites from the platform.

The project combines AI website generation, authentication, credit-based usage, Stripe payments, code editing, live previews, and deployment into a single full-stack application.

🌐 Live Demo

Frontend: AI Web Forge

The application is deployed on Render. Some features may require authentication and available credits.

✨ Project Overview

AI Web Forge simplifies the website-building workflow:

User Idea
    ↓
Natural-Language Prompt
    ↓
AI Website Generation
    ↓
Code Editor + Live Preview
    ↓
Customize / Regenerate
    ↓
Deploy
    ↓
Live Website 🚀

Users can describe the website they want to create, and the application uses an AI model to generate website code. The generated website can then be viewed in a live preview, edited, and deployed.

A credit-based system controls AI usage, while Stripe Checkout is used for purchasing additional credits.

🔥 Features

🤖 AI Website Generation

Generate websites using natural-language prompts

AI-powered HTML/CSS/JavaScript website generation

Prompt-based development workflow

Generate and refine websites through conversational prompts

Structured AI responses for reliable code generation

🧑‍💻 Website Editor

Edit generated website code

Integrated code editor

Live website preview

Desktop, tablet, and mobile preview modes

Regenerate or improve the website using prompts

🚀 Website Deployment

Deploy generated websites from the platform

Automated deployment workflow

Deployment status handling

Access generated live URLs from the dashboard

💰 Credit-Based Usage

New users receive free credits

AI generations consume credits

Credit balance is stored and managed on the backend

Credit validation prevents generation without sufficient credits

Users can purchase additional credit packages

💳 Stripe Payments

Stripe Checkout integration

Test-mode payment support

Credit-based paid plans

Stripe webhook integration

Webhook signature verification

Automatic credit updates after successful payments

Server-side payment and credit handling

🔐 Authentication & Authorization

User authentication

Google authentication

JWT-based authentication

Protected routes

Backend authorization

User-specific website and credit management

🎨 Modern SaaS UI

Responsive React interface

Tailwind CSS styling

Motion-based animations

Modern dashboard

Interactive AI chat experience

Responsive preview modes

🛠 Tech Stack

Frontend

Technology

Purpose

⚛️ React.js

Frontend application

🎨 Tailwind CSS

Styling and responsive UI

🎞️ Motion

UI animations

🔗 Axios

API communication

🧑‍💻 Monaco Editor

Website code editing

🗃️ Redux

Client-side state management

🧩 React Router

Application routing

✨ Lucide React

Icons

Backend

Technology

Purpose

🟢 Node.js

Backend runtime

🚂 Express.js

REST API

🍃 MongoDB

Database

📦 Mongoose

MongoDB object modeling

🔐 JWT

Authentication

🍪 Cookie Parser

Cookie handling

AI & APIs

Technology

Purpose

🤖 OpenRouter API

AI model integration

🧠 DeepSeek Chat

Website/code generation

🔗 REST APIs

Frontend-backend communication

Payments

Technology

Purpose

💳 Stripe Checkout

Payment processing

🔔 Stripe Webhooks

Payment confirmation

💰 Credit System

Usage and billing management

Deployment

Technology

Purpose

☁️ Render

Frontend and backend hosting

🍃 MongoDB Atlas

Cloud database

🚀 Deployment Service

Generated website deployment

🏗️ System Design Architecture

                                  ┌──────────────────────┐
                                  │        CLIENT        │
                                  │   React + Tailwind   │
                                  │   Redux + Axios      │
                                  └──────────┬───────────┘
                                             │
                                      HTTPS / REST API
                                             │
                                             ▼
                              ┌──────────────────────────┐
                              │       API SERVER         │
                              │    Node.js + Express     │
                              │                          │
                              │ ┌──────────────────────┐ │
                              │ │ Authentication       │ │
                              │ │ Middleware / JWT     │ │
                              │ └──────────────────────┘ │
                              │                          │
                              │ ┌──────────────────────┐ │
                              │ │ Controllers           │ │
                              │ │ Auth / User / Website│ │
                              │ │ Billing               │ │
                              │ └──────────────────────┘ │
                              │                          │
                              │ ┌──────────────────────┐ │
                              │ │ Business Logic        │ │
                              │ │ Credits / Generation  │ │
                              │ │ Deployment            │ │
                              │ └──────────────────────┘ │
                              └────────────┬─────────────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
                    ▼                      ▼                      ▼
          ┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
          │    MongoDB      │    │  OpenRouter API  │    │     Stripe      │
          │                 │    │                  │    │                 │
          │ Users           │    │ AI Model         │    │ Checkout        │
          │ Websites        │    │                  │    │ Webhooks        │
          │ Credits         │    │ Code Generation  │    │ Payments        │
          │ Plans           │    └────────┬─────────┘    └────────┬────────┘
          └─────────────────┘             │                       │
                                          ▼                       ▼
                                ┌──────────────────┐    ┌──────────────────┐
                                │ Generated Website│    │ Payment Verified │
                                │      Code        │    │                  │
                                └────────┬─────────┘    │ Credit Update    │
                                         │              └────────┬─────────┘
                                         │                       │
                                         ▼                       ▼
                                ┌──────────────────┐    ┌──────────────────┐
                                │ Website Editor   │    │     MongoDB      │
                                │                  │    │                  │
                                │ Monaco Editor    │    │ credits += N     │
                                │ Live Preview     │    │ plan = selected  │
                                └────────┬─────────┘    └──────────────────┘
                                         │
                                         ▼
                                ┌──────────────────┐
                                │   Deployment     │
                                │                  │
                                │ Build / Package  │
                                │ Deploy           │
                                └────────┬─────────┘
                                         │
                                         ▼
                                ┌──────────────────┐
                                │   LIVE WEBSITE   │
                                │        🌐        │
                                └──────────────────┘

📂 Project Structure

AI-WEB-FORGE/
│
├── client/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── ...
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middlewares/
│   ├── config/
│   ├── utils/
│   ├── index.js
│   └── package.json
│
├── .gitignore
└── README.md

The project structure may evolve as new features are added.

💳 Credit & Payment System

AI Web Forge uses a credit-based system to control AI usage.

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
Low / No Credits
    │
    ▼
Choose Paid Plan
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
    │
    ▼
Continue Generating

The backend stores the user's credit balance and handles credit updates.

Stripe Webhook Flow

The webhook endpoint receives Stripe events using the raw request body so that the Stripe signature can be verified before updating the user's account.

Stripe
   ↓
checkout.session.completed
   ↓
Verify Stripe Signature
   ↓
Read Session Metadata
   ↓
Find User
   ↓
Add Purchased Credits
   ↓
Update Plan

This keeps payment-related credit updates on the server rather than trusting the frontend.

🤖 AI Generation Architecture

             User Prompt
                  │
                  ▼
          Frontend Request
                  │
                  ▼
           Authentication
                  │
                  ▼
           Credit Validation
                  │
          ┌───────┴───────┐
          │               │
     Credits > 0      Credits = 0
          │               │
          ▼               ▼
    OpenRouter API      Reject
          │
          ▼
      AI Model
          │
          ▼
    Structured Response
          │
          ▼
      JSON Parser
          │
          ▼
    Generated Website
          │
          ├──────────────► MongoDB
          │
          ▼
     Live Preview
          │
          ▼
      Code Editor

The application uses an AI API to transform natural-language requirements into website code and stores the generated website data for later editing and deployment.

🖥️ Website Editing & Preview

The editor provides a development workflow directly inside the application.

Users can:

View generated source code

Edit the generated code

Preview the result instantly

Switch between desktop, tablet, and mobile views

Send additional prompts to improve the website

Deploy the final result

🚀 Deployment Workflow

Generated Website
       │
       ▼
Website Editor
       │
       ▼
Deploy Request
       │
       ▼
Backend Deployment API
       │
       ▼
Build / Package
       │
       ▼
Production Deployment
       │
       ▼
Live Website URL 🚀

The deployment workflow is designed to reduce the manual configuration normally required to publish a website.


# 📈 Development Progress

AI Web Forge is being developed incrementally, with each major feature integrated and tested as part of the full-stack SaaS workflow.

### ✅ Completed

* [x] Project initialization and folder structure
* [x] React.js frontend setup
* [x] Node.js + Express.js backend
* [x] MongoDB + Mongoose integration
* [x] Tailwind CSS integration
* [x] Modern responsive UI
* [x] Motion-based animations
* [x] User authentication
* [x] Google authentication
* [x] JWT-based authentication
* [x] Protected routes
* [x] User dashboard
* [x] User profile management
* [x] AI-powered website generation
* [x] OpenRouter API integration
* [x] Natural-language website prompts
* [x] AI-generated website code handling
* [x] Website editor
* [x] Monaco code editor integration
* [x] Live website preview
* [x] Desktop / Tablet / Mobile preview modes
* [x] AI-powered website refinement
* [x] Website data persistence
* [x] Credit-based usage system
* [x] Credit deduction for AI generation
* [x] Credit validation
* [x] Pricing and credit plans
* [x] Stripe Checkout integration
* [x] Stripe test payment flow
* [x] Stripe webhook integration
* [x] Webhook signature verification
* [x] Automatic credit updates after successful payment
* [x] Plan updates after successful payment
* [x] Website deployment workflow
* [x] Live deployment URL handling
* [x] Frontend deployment on Render
* [x] Backend deployment on Render
* [x] MongoDB Atlas integration
* [x] Production environment configuration

---

# 🗺️ Roadmap

### 🔹 Phase 1 — Core Platform

* [x] Frontend and backend architecture
* [x] Database integration
* [x] Authentication system
* [x] User dashboard
* [x] Protected API routes

### 🔹 Phase 2 — AI Website Builder

* [x] Natural-language prompt system
* [x] AI API integration
* [x] Website code generation
* [x] Code parsing and handling
* [x] Website editor
* [x] Live preview
* [x] Responsive preview modes
* [x] AI-powered refinement

### 🔹 Phase 3 — Credit & Billing

* [x] Credit-based usage system
* [x] Credit deduction
* [x] Credit validation
* [x] Pricing plans
* [x] Stripe Checkout
* [x] Stripe webhooks
* [x] Payment verification
* [x] Automatic credit updates
* [ ] Transaction history
* [ ] Detailed usage analytics

### 🔹 Phase 4 — Deployment

* [x] Website deployment workflow
* [x] Deployment API
* [x] Deployment status handling
* [x] Live URL generation
* [x] Access deployed websites
* [x] Deployment history
* [x] Deployment logs
* [ ] Improved deployment error handling

### 🔹 Phase 5 — Production Improvements

* [x] Cloud deployment
* [x] Environment-based configuration
* [ ] Advanced error handling
* [ ] API rate limiting
* [ ] Improved input validation
* [ ] Performance optimization
* [ ] Database query optimization
* [ ] Monitoring and logging
* [ ] Automated testing
* [ ] Improved security

### 🔹 Phase 6 — Future Features

* [ ] Website templates
* [ ] Custom domains
* [ ] Website version history
* [ ] Website duplication
* [ ] Export generated projects
* [ ] Advanced AI editing
* [ ] Team collaboration
* [ ] Usage analytics dashboard
* [ ] Advanced subscription management
* [ ] Scalable background job processing


🎯 Learning Goals

This project provides practical experience with:

Full-stack SaaS architecture

AI integration in web applications

REST API development

Authentication and authorization

React state management

Database design

Credit-based usage systems

Stripe Checkout

Stripe webhook handling

Server-side payment verification

Secure API development

Code editor integration

Automated deployment workflows

Cloud deployment

Error handling

Production-oriented application development

⚙️ Getting Started

1. Clone the repository

git clone https://github.com/YOUR_USERNAME/ai-web-forge.git
cd ai-web-forge

2. Install frontend dependencies

cd client
npm install

3. Install backend dependencies

cd ../server
npm install

4. Configure environment variables

Create the required .env files.

Example:

MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

OPENROUTER_API_KEY=your_openrouter_api_key
FRONTEND_URL=your_frontend_url

Never commit .env files, Stripe secret keys, database credentials, or API keys to GitHub.

5. Run the backend

npm run dev

6. Run the frontend

Open another terminal:

cd client
npm run dev

🔐 Security

The application is designed with server-side validation and protected API operations.

Security-related implementation includes:

Protected API routes

JWT-based authentication

Backend authorization

Server-side API keys

Stripe webhook signature verification

Server-side credit updates

Environment variables for sensitive credentials

Input validation

Error handling for API operations

☁️ Deployment

The application is deployed using cloud services:

Frontend
   ↓
Render

Backend
   ↓
Render

Database
   ↓
MongoDB Atlas

AI
   ↓
OpenRouter

Payments
   ↓
Stripe

Live Application

🌐 Open AI Web Forge

📌 Development Philosophy

AI Web Forge is being developed as a practical full-stack SaaS project with a focus on learning and implementing real-world development concepts.

The project is developed incrementally through:

Feature implementation

Git commits

Bug fixing

API development

UI improvements

Integration testing

Cloud deployment

Production-oriented improvements

The goal is to understand how different parts of a modern SaaS application work together rather than building only a basic CRUD application.

🤝 Contributions

This is currently a personal learning and portfolio project.

Suggestions, feedback, and ideas are welcome.

⭐ Support

If you find the project interesting, consider giving the repository a ⭐.

👨‍💻 Developer

Shiva Maurya

B.Tech Computer Science & Engineering

Interests:

Full-Stack Development • AI • SaaS • DSA • Backend Engineering

🚀 Building in public. Learning by building. Turning ideas into products.
