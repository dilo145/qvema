# Qvema API Postman Collection

This repository contains a Postman collection for testing the Qvema API endpoints.

## Getting Started

### Prerequisites

- [Postman](https://www.postman.com/downloads/) installed on your computer
- Qvema API running locally or on a server

### Importing the Collection

1. Open Postman
2. Click on **Import** button in the top left corner
3. Select the `qvema-api-collection.json` file
4. Click **Import**

## Collection Structure

The collection is organized into the following folders:

- **App**: Basic root endpoint
- **Authentication**: Register and login endpoints
- **Users**: User management endpoints
- **Projects**: Project management endpoints
- **Investments**: Investment management endpoints
- **Interests**: Interest management endpoints
- **Admin**: Admin-specific endpoints

## Environment Variables

The collection uses the following variables that you should set in your Postman environment:

- `baseUrl`: The base URL of your API (default: `http://localhost:3000`)
- `token`: JWT token received after login
- `userId`: UUID of a user
- `projectId`: UUID of a project
- `investmentId`: UUID of an investment

### Setting Up the Environment

1. Click on the **Environments** tab in Postman
2. Click **Add** to create a new environment
3. Name it "Qvema API Environment"
4. Add the variables mentioned above
5. Click **Save**
6. Select your environment from the dropdown in the top right corner

## Authentication Flow

1. Use the **Register** endpoint to create a new user
2. Use the **Login** endpoint to authenticate and get a JWT token
3. The token will be automatically stored in the `token` variable
4. All authenticated endpoints will use this token

## Testing Routes

1. Start with public routes like **Get All Interests**
2. Register a new user and log in to get a token
3. Test authenticated routes using the saved token
4. For routes requiring specific IDs, make sure to set the corresponding variables

## Role-Based Access

Different routes require different user roles:

- **Admin**: Can access all endpoints
- **Entrepreneur**: Can create and manage projects
- **Investor**: Can create investments

Make sure to register users with appropriate roles to test all endpoints.

## Notes

- Some endpoints may return 403 Forbidden if your user doesn't have the required role
- Make sure your Qvema API server is running before testing the endpoints
- Check the console logs or network tab if you encounter any issues