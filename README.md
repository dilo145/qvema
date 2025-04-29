# QVEMA API - Entrepreneurs & Investors Platform

A NestJS API for connecting entrepreneurs and investors. This platform allows entrepreneurs to publish projects and investors to discover and support these projects based on their interests.

## Features

- **User Authentication** with JWT
- **Role-based Authorization** (entrepreneur, investor, admin)
- **Project Management** for entrepreneurs
- **Investment Management** for investors
- **Interest-based Project Recommendations**
- **Admin Dashboard** for platform management

## Tech Stack

- **NestJS**: Backend framework
- **MySQL**: Database
- **TypeORM**: ORM for database interactions
- **JWT**: For secure authentication
- **Swagger**: API documentation

## Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install
```

## Configuration

Create a `.env` file in the root directory with the following environment variables:

```
# Application
PORT=3000
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=root
DB_DATABASE=qvema

# JWT
JWT_SECRET=your_jwt_secret_key_here
```

## Running the Application

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## Using Docker

The project includes Docker configuration for easy setup:

```bash
# Start the application and database with Docker
docker-compose up
```

## API Documentation

Once the application is running, you can access the Swagger API documentation at:

```
http://localhost:3000/api
```

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## API Endpoints

### Authentication
- `POST /auth/register` - Register a new user
- `POST /auth/login` - Login and get JWT token

### Users
- `GET /users/profile` - Get user profile
- `PUT /users/profile` - Update user profile

### Projects
- `POST /projects` - Create a new project (entrepreneur only)
- `GET /projects` - Get all projects
- `GET /projects/:id` - Get a specific project
- `PUT /projects/:id` - Update a project (owner only)
- `DELETE /projects/:id` - Delete a project (owner or admin only)

### Interests
- `GET /interests` - Get all available interests
- `POST /users/interests` - Add interests to user profile
- `GET /projects/recommended` - Get recommended projects based on interests

### Investments
- `POST /investments` - Make an investment (investor only)
- `GET /investments` - Get user's investments
- `GET /investments/project/:id` - Get investments for a specific project
- `DELETE /investments/:id` - Cancel an investment

### Admin
- `GET /admin/users` - Get all users (admin only)
- `DELETE /admin/users/:id` - Delete a user (admin only)
- `GET /admin/investments` - Get all transactions (admin only)

## License

MIT
