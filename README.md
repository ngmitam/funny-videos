# Funny Videos

## Introduction

This is a web application that allows users to share funny video links on Youtube. Users can create an account, log in, and share Youtube links. They can also view, videos uploaded by other users. The application is built using the MERN stack (MongoDB, Express, React, Node.js).

## Prerequisites

-   Node.js
-   npm
-   MongoDB
-   Docker (optional for Backend developers)

## Installation & Configuration

Clone the repository and install the necessary dependencies.

```bash
git clone
cd funny-videos
npm install
```

Create a `.env` file in the root directory of the project and add the following environment variables.

```bash
MONGO_URL=your_mongo_url
```

### Frontend Setup

Instructions for setting up the frontend, including installing dependencies and running the development server.

```bash
cd client
npm install
npm start
```

### Backend Setup

Generate a new secret key for JWT authentication

```bash
npm run generate-key-pair-for-jwt
```

## Database Setup

Can use MongoDB Atlas or a local MongoDB instance.

## Running the Application

How to start the development server, access the application in a web browser

Build client

```bash
npm run build-client
```

Start the server

```bash
npm start
```

Access the application in a web browser at `http://localhost`

## Testing

### Setup database for testing

Create a new database for testing in local host MongoDB named `test_funny_videos`

### Run tests

```bash
npm test
```

### Test client

Start the server

```bash
npm start
```

Run tests

```bash
cd client
npm test
```

## Docker Deployment (optional for Backend developers)

Build the Docker image

```bash
docker compose build
```

Run the Docker container

```bash
docker compose up
```

## Usage

How to use the application, including any necessary user accounts and passwords.

## Troubleshooting

Common issues that may arise during setup and their potential solutions.
