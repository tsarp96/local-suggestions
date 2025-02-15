# Local Suggestions

A location-based suggestion system that allows users to create and vote on local suggestions in different categories.

## Features

- User authentication
- Create and browse local suggestions
- Category-based filtering
- Voting system
- Location-based search
- Interactive map interface

## Tech Stack

- **Frontend**: React, Redux
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: JWT
- **Container**: Docker

## Prerequisites

- Node.js (v14 or higher)
- Docker and Docker Compose
- Git

## Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd local-suggestions
```

2. Start MongoDB using Docker:
```bash
docker-compose up -d
```

3. Install backend dependencies:
```bash
cd backend
npm install
```

4. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

5. Create `.env` files:

Backend `.env`:
```
PORT=5000
MONGODB_URI=mongodb://root:example@localhost:27017/local-suggestions?authSource=admin
JWT_SECRET=your_jwt_secret
```

Frontend `.env`:
```
REACT_APP_API_URL=http://localhost:5000/api
```

## Running the Application

1. Start the backend server:
```bash
cd backend
npm run dev
```

2. Start the frontend development server:
```bash
cd frontend
npm start
```

3. Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- MongoDB Express: http://localhost:8081

## Development

- Backend runs on port 5000
- Frontend runs on port 3000
- MongoDB runs on port 27017
- Mongo Express runs on port 8081

## Project Structure

```
local-suggestions/
├── backend/
│   ├── src/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── middleware/
│   │   └── index.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── redux/
│   │   └── App.js
│   └── package.json
└── docker-compose.yml
```

## Contributing

1. Create a new branch for your feature
2. Make your changes
3. Create a pull request

## License

MIT
