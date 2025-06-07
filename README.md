# RandomIdeas App

A full-stack application for sharing and managing creative ideas. Users can post, view, update, and delete ideas with associated tags and usernames.

## Tech Stack

- **Backend:**

  - Node.js
  - Express.js
  - MongoDB (with Mongoose)
  - REST API

- **Frontend:**
  - HTML/CSS
  - JavaScript

## Project Structure

```
randomideas-app/
├── config/
│   └── db.js          # Database configuration
├── models/
│   └── Idea.js        # Mongoose model for ideas
├── routes/
│   └── ideas.js       # API routes for ideas
├── server.js          # Main application file
└── .env              # Environment variables
```

## API Endpoints

| Method | Endpoint       | Description     |
| ------ | -------------- | --------------- |
| GET    | /api/ideas     | Get all ideas   |
| GET    | /api/ideas/:id | Get single idea |
| POST   | /api/ideas     | Create new idea |
| PUT    | /api/ideas/:id | Update idea     |
| DELETE | /api/ideas/:id | Delete idea     |

## Getting Started

1. Clone the repository

```bash
git clone [repository-url]
```

2. Install dependencies

```bash
npm install
```

3. Create .env file in the root directory and add:

```
MONGODB_URI=your_mongodb_connection_string
PORT=5001
```

4. Run the development server

```bash
npm run dev
```

## Environment Variables

- `PORT`: Server port (default: 5001)
- `MONGODB_URI`: MongoDB connection string

## Data Model

```javascript
{
  text: String,      // The idea description
  tag: String,       // Category/tag for the idea
  username: String,  // Author of the idea
  date: Date        // Creation date
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details
