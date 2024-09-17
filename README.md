
# Chillcan Soda API

Welcome to the Chillcan Soda API! This API is designed for the Chillcan Soda web app, providing essential backend functionalities using NestJS. 

## Table of Contents

- [About](#about)
- [Features](#features)
- [Getting Started](#getting-started)
- [API Endpoints](#api-endpoints)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)

## About

The Chillcan Soda API provides a robust backend for managing data related to the Chillcan Soda web app. Built with NestJS, it leverages modern TypeScript features and powerful libraries to deliver a high-quality API service.

## Features

- **User Management**: Registration, authentication, and role-based access control.
- **Product Management**: CRUD operations for managing soda products.
- **Order Management**: Handling customer orders and transactions.
- **Role-Based Permissions**: Secure access to different API endpoints based on user roles.
- **Integration with Frontend**: Seamless communication with the Chillcan Soda web app.

## Getting Started

To get started with the Chillcan Soda API, follow these steps:

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- A PostgreSQL database (or your preferred database)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/Padam7890/chill-can-api-nestjs
    cd chill-can-api-nestjs
    ```

2. Install the dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Configure your environment variables. Copy the `.env.example` file to `.env` and update the values as needed:

    ```bash
    cp .env.example .env
    ```

## API Endpoints

### Swagger API Documentation

`/api` 

## Setup

1. **Database Setup**

    Ensure your database is set up and accessible. Update your `.env` file with the database connection details.

2. **Migration**

    Apply the database migrations to set up the schema:

    ```bash
    npx prisma migrate dev
    ```

## Running the Application

To start the application in development mode:

```bash
npm run start:dev
# or
yarn start:dev
```

To build the application for production:

```bash
npm run build
# or
yarn build
```

Then, start the application:

```bash
npm run start
# or
yarn start
```

## Testing

Run the unit and e2e tests:

```bash
npm run test
# or
yarn test
```

## Contributing

We welcome contributions! If you have suggestions or improvements, please follow these steps:

1. Fork the repository
2. Create a new branch (`git checkout -b feature/YourFeature`)
3. Make your changes
4. Commit your changes (`git commit -am 'Add new feature'`)
5. Push to the branch (`git push origin feature/YourFeature`)
6. Create a new Pull Request

BY Padam Thapa: https://padamthapa.com.np/
