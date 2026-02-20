# Travel-Tips Web

A full-stack web application for managing reports about tips for traveling.

## Features

- **Reports Management**: Create, view, update, and delete reports.
- **Comments & Nested Replies**: Add comments to reports and reply to comments (including reply-to-reply).
- **File Uploads**: Support for main images and multiple images per report.
- **Responsive UI**: Clean, compact UI with right-aligned author/date metadata.

![Screenshot of homepage](C:\Users\ronfa\fullStackProjects\insurance_web\client\src\assets\images\homePage.png)

## Tech Stack

### Frontend
- React
- React Router
- Axios
- CSS Modules

### Backend
- Node.js
- Express
- MongoDB (Mongoose)
- Multer (file uploads)

## Project Structure

```
./
├─ .git/
├─ client/
│  ├─ public/
│  ├─ src/
│  │  ├─ assets/
│  │  ├─ components/
│  │  ├─ context/
│  │  ├─ pages/
│  │  ├─ services/
│  │  └─ styles/
│  ├─ .env
│  ├─ package.json
│  └─ package-lock.json
├─ server/
│  ├─ controllers/
│  ├─ models/
│  ├─ routes/
│  ├─ uploads/
│  ├─ .env
│  ├─ package.json
│  ├─ package-lock.json
│  └─ server.js
├─ README.md
├─ package.json
└─ package-lock.json
```

## Getting Started

### Prerequisites
- Node.js
- MongoDB

### Installation

1. Clone the repository
2. Install dependencies for both client and server:
   ```bash
   # In root
   npm install
   cd client && npm install
   cd ../server && npm install
   ```

3. Set up environment variables:
   - In `client/.env`: `REACT_APP_API_URL=http://localhost:5000/api`
   - In `server/.env`: configure MongoDB connection string

4. Start the application:
   ```bash
   # Terminal 1: server
   cd server && npm start

   # Terminal 2: client
   cd client && npm start
   ```

## API Endpoints

- `GET /api/reports` – Get all reports
- `GET /api/reports/:id` – Get a single report (with populated comments and replies)
- `POST /api/reports/create` – Create a new report (with file uploads)
- `PUT /api/reports/update-report/:id` – Update a report
- `DELETE /api/reports/delete-report/:id` – Delete a report
- `PUT /api/reports/add-comment-to-report/:id` – Add a comment or reply
  - Body: `{ newComment, parentCommentId? }`

## Data Models

### Report
- title
- content
- shortDescription
- writer
- category
- mainImage
- images
- comments (Array of ObjectId references)

### Comment
- text
- author
- email
- createdAt
- replies (Array of ObjectId references to other Comment documents)

## Comments & Replies

- Top-level comments are stored in `report.comments`.
- Replies are stored in `comment.replies` (self-referencing).
- UI supports unlimited nesting depth (server populates up to 3 levels by default; can be extended).

## Styling Notes

- All comment UI is in `client/src/components/Reports/commentReport/commentReport.module.css`.
- Replies are nested with indentation and a subtle border.
- Author and timestamp are right-aligned; Reply button on the left.

## License

Private. All rights reserved.
