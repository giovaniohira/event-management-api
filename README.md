---

# Event Management API

A RESTful API built with Express and PostgreSQL, designed to manage users, events, and subscriptions. This project features JWT-based authentication, role-based access control, CRUD operations with pagination, and automated database installation with seed data. The API is fully documented using Swagger.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
  - [Running the Server](#running-the-server)
  - [Database Installation](#database-installation)
  - [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Endpoints](#endpoints)
- [License](#license)

## Features

- JWT-based authentication and role-based access control.
- CRUD operations for users, events, and subscriptions with data validation.
- Pagination support for listing endpoints.
- Automated database setup and seeding.
- Comprehensive Swagger documentation for API endpoints.

## Technologies

- **Node.js**
- **Express**
- **Sequelize** (with PostgreSQL)
- **JWT** for authentication
- **Swagger** for API documentation

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v14.x or higher)
- [PostgreSQL](https://www.postgresql.org/) (v12 or higher)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/giovaniohira/event-management-api.git
   cd event-management-api
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory based on `.env.example` and update the variables as needed:

   ```bash
   cp .env.example .env
   ```

4. Configure the database:

   Ensure PostgreSQL is running and the database specified in `.env` is created.

## Usage

### Running the Server

Start the server with:

```bash
npm start
```

The server will run on `http://localhost:3000`.

### Database Installation

To install and populate the database, access the following route:

```bash
GET /install/
```

This will create tables, relationships, and seed the database with sample data.

### API Documentation

Access the Swagger documentation at:

```bash
GET /docs/
```

This route provides detailed documentation of all available endpoints.

## Project Structure

```
src/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── adminController.js
|   ├── eventController.js
|   ├── reportController.js
|   ├── subscriptionController.js
│   └── userController.js
│
├── middlewares/
│   └── authMiddleware.js
│
├── models/
│   ├── user.js
│   ├── event.js
│   ├── index.js.js
│   └── subscription.js
│
├── routes/
│   ├── adminRoutes.js
│   ├── eventRoutes.js
│   ├── reportRoutes.js
│   ├── installRoutes.js
│   ├── subscriptionRoutes.js
│   └── userRoutes.js
│
├── seeders/
│   ├── 20240818120000-demo-users.js
│   ├── 20240818120001-demo-events.js
│   ├── 20240818120002-create-default-admin.js
│   └── 20240819-create-subscriptions.js
│
├── migrations/
│
└── app.js
```

### Utility Endpoints

- `GET /install/` - Set up the database and seed with initial data
- `GET /docs/` - View API documentation

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---
