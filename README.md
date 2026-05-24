# 🎬 CineTrack

A full-stack movie tracking web application that allows users to search, track, and manage their personal movie watchlist using real-time movie data.

🌐 **Live Demo:** [cine-track-eight.vercel.app](https://cine-track-eight.vercel.app)

---

## 🚀 Features

- 🔍 Search movies by title using a live movie API
- 📋 Add movies to your personal watchlist
- ✅ Mark movies as watched / unwatched
- 🗑️ Remove movies from your list
- 📱 Responsive design for all screen sizes

---

## 🛠️ Tech Stack

| Layer | Technology |
|-----------|------------------------|
| Frontend | React.js, CSS, HTML |
| Backend | Node.js, Express.js |
| API | Movie Database API |
| Deployment | Vercel |

---

## 📂 Project Structure

```
CineTrack/
│
├── movie-tracker-frontend/   # React.js frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│   └── package.json
│
└── movie-tracker-backend/    # Node.js + Express backend
    ├── routes/
    ├── controllers/
    ├── server.js
    └── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- Node.js v18+
- npm or yarn
- Movie API key (e.g. OMDB or TMDB)

### Installation

1. **Clone the repository:**

```bash
git clone https://github.com/nikhil-nextbyts/CineTrack.git
cd CineTrack
```

2. **Setup Backend:**

```bash
cd movie-tracker-backend
npm install
```

Create a `.env` file in the backend folder:

```
PORT=5000
MOVIE_API_KEY=your_api_key_here
```

```bash
npm start
```

3. **Setup Frontend:**

```bash
cd ../movie-tracker-frontend
npm install
npm start
```

4. Open your browser and visit `http://localhost:3000`

---

## 🌐 Environment Variables

Create a `.env` file in the `movie-tracker-backend` folder:

| Variable | Description |
|-----------------|-------------------------------|
| `PORT` | Port for the backend server |
| `MOVIE_API_KEY` | Your movie database API key |

---

## 📸 Screenshots

> _Add screenshots of your app here to make this README stand out!_
> Example: `![Home Page](./screenshots/home.png)`

---

## 🔮 Future Enhancements

- User authentication (login/signup)
- Movie ratings and reviews
- Genre-based filtering
- Recommendations based on watch history

---

## 👨‍💻 Author

**Nikhil Saini**
- GitHub: [@nikhil-nextbyts](https://github.com/nikhil-nextbyts)
- LinkedIn: [linkedin.com/in/nikhil-saini-0a0b59223](https://www.linkedin.com/in/nikhil-saini-0a0b59223)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
