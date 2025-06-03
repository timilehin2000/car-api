# Car Dealership API

Welcome to the **MCar DealershipSystem API**! This API allows users to register as both customer and manager, authenticate, and create cars, read, update and delete resources (all managed by the manager), . It is designed for efficiency, providing a robust and secure backend service.

## Table of Contents

-   [Features](#features)
-   [Technologies](#technologies)
-   [Prerequisites](#prerequisites)
-   [Installation](#installation)
-   [Configuration](#configuration)
-   [Running the Application](#running-the-application)
-   [API Documentation](#api-documentation)
-   [Testing](#testing)
-   [Contributing](#contributing)
-   [License](#license)

## Features

-   User registration and login
-   Secure authentication using JWT
-   CRUD functionalities

## Technologies

-   **Node.js**: JavaScript runtime for building server-side applications
-   **Express**: Web framework for Node.js
-   **TypeScript**: Typed superset of JavaScript
-   **MongoDB**: Non-Relational database management system
-   **Postman**: API testing interface

## Prerequisites

-   Node.js (>= 14.x)
-   MongoDB (>= 12.x)
-   npm or Yarn

## Installation

1. **Clone the repository**:

    ```bash
    git clone https://github.com/timilehin2000/car-api.git
    cd money-transfer-system-api
    ```

2. **Install dependencies**:

    ```bash
    npm install
    ```

3. **Set up your MongoDb database**:
    - Create a new database and user for your application.
    - Update the database connection details in the `.env` file.

## Configuration

Create a `.env` file in the root directory of the project and configure the following environment variables:

```env
DB_URL=your_mongodb_url
JWT_SECRET=your_jwt_secret
```

## Running the Application

To start the application, run the following command:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## API Documentation

The API documentation is available in Postman format:

### Postman

You can [view](https://documenter.getpostman.com/view/36399546/2sB2qi8HTd) the API collection or run in Postman using the button below:

## Testing

To run the tests for the application, use the following command:

```bash
npm run test
```

## Contributing

Contributions are welcome! If you would like to contribute to this project, please fork the repository and create a pull request.

## License

This project is licensed under the MIT License. See the LICENSE file for more information.
