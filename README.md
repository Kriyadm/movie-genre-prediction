# Movie Genre Prediction & Recommendation System

[![Build Status](https://github.com/Kriyadm/movie-genre-prediction/actions/workflows/ci.yml/badge.svg)](https://github.com/Kriyadm/movie-genre-prediction/actions)

A machine learning-based system that predicts movie genres based on movie descriptions **and** recommends movies based on your input! Features a dynamic UI built with Angular.

## Features
- 🎬 **Genre Prediction:** Predicts multiple genres for a movie based on its description
- 🤖 **Movie Recommendation:** Suggests similar movies by name, description, or genre
- 🖥️ **Modern UI:** Built with Angular & Tailwind CSS
- 🚀 **RESTful API:** FastAPI backend for predictions and recommendations

## Project Structure
```
movie-genre-prediction/
├── ml-service/                # Machine Learning Backend (FastAPI)
│   ├── main.py                # FastAPI app
│   ├── recommender.py         # Recommendation logic
│   ├── model.pkl              # Trained genre model
│   ├── vectorizer.pkl         # Text vectorizer
│   ├── mlb.pkl                # MultiLabelBinarizer
│   ├── movies.csv             # Movie dataset
│   ├── requirements.txt       # Backend dependencies
│   └── ...
├── movie-genre-frontend/      # Angular Frontend
│   ├── src/
│   ├── package.json
│   └── ...
├── README.md
└── ...
```

## Setup & Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm

### Backend (FastAPI)
```bash
cd ml-service
python -m venv venv
venv\Scripts\activate  # On Windows
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend (Angular)
```bash
cd movie-genre-frontend
npm install
npm start
```

## API Usage

### Predict Genre
- **POST** `/predict`
- **Body:**
```json
{
  "name": "Movie Name",
  "description": "Movie Description"
}
```
- **Response:**
```json
{
  "name": "Movie Name",
  "description": "Movie Description",
  "predictedGenre": "Genre1, Genre2, ..."
}
```

### Get Recommendations
- **POST** `/recommend`
- **Body:** (any of the following)
```json
{
  "movie_name": "Jailer",
  "num_recommendations": 5
}
```
```json
{
  "description": "A retired jailer fights crime...",
  "num_recommendations": 5
}
```
```json
{
  "genre": "Action",
  "num_recommendations": 5
}
```
- **Response:**
```json
[
  {
    "movie_name": "Jawan",
    "genre": "Action, Thriller",
    "overview": "A man fights for justice..."
  },
  ...
]
```

## Contributing
1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to your branch
5. Create a Pull Request

## License
MIT License. See [LICENSE](LICENSE).

## Acknowledgments
- Dataset: IMDB Movie Dataset (2023-1951) by Deven Bhagtani
- Built with FastAPI, scikit-learn, Angular, and Tailwind CSS

## Contact
For queries or support, open an issue in the repository. 
