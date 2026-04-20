# Pulse Logistics Smart Dashboard

![Laravel Version](https://img.shields.io/badge/Laravel-11-FF2D20?style=for-the-badge&logo=laravel)
![React Version](https://img.shields.io/badge/React-Vite%20%2B%20TS-61DAFB?style=for-the-badge&logo=react)
![Build Status](https://img.shields.io/github/actions/workflow/status/your-username/pulse-logistics/main.yml?style=for-the-badge)

A high-performance logistics management platform designed for real-time inventory tracking and automated vendor coordination.

---

## 📖 Table of Contents
* [Tech Stack](#tech-stack)
* [Key Features](#key-features)
* [Setup Instructions](#setup-instructions)
* [Testing & CI/CD](#testing--cicd)
* [The Greek Letter Section](#thisll-be-a-helpful-section-about-the-greek-letter-Θ)

---

## 🛠 Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Backend** | Laravel 11 | Robust PHP framework for API and Logic |
| **Frontend** | React (TS) | Type-safe UI built with Vite |
| **Database** | MySQL | Relational data storage |
| **Environment** | Vagrant | Virtualized development via VirtualBox |

---

## ✨ Key Features

* **Relational Data Modeling:** Specialized `Inventory <-> Vendor` schemas for seamless supply chain tracking.
* **Real-time Status Monitoring:** * Automated polling mechanism.
    * Instant dashboard updates without page reloads.
* **CI/CD Integration:** Automated workflows via GitHub Actions.

---

## 🚀 Setup Instructions

Follow these steps to replicate the development environment.

### 1. Prerequisites
Ensure you have the following installed:
- [VirtualBox](https://www.virtualbox.org/)
- [Vagrant](https://www.vagrantup.com/)

### 2. Environment Provisioning
Initialize the virtual machine:
```bash
vagrant up
vagrant ssh
```

### 3. Backend API Setup (Inside VM)
Navigate to the app directory and initialize the Laravel engine:
```bash
cd /vagrant/app
composer install
php artisan key:generate
```
### 4. Database Migration & Seeding:
Run the following to set up the relational tables and the initial vendor data:
```bash
php artisan migrate:fresh --seed
```

### 5. Start the API Server:
```bash
sudo php artisan serve --host=0.0.0.0 --port=80
```

### 6. Frontedn Setup (Host Machine)
Open a new terminal host:
```bash
cd frontend
npm install
npm run dev
```

The dashboard will be available at `http://localhost:8101`.

## Automated Testing
This project includes a Github Actions workflow located in `.github/workflows/main.yml`.
- **Triggers:** Every push to the main branch
- **Checks:** Environment setup, dependency installation, and `php artisan test` execution.