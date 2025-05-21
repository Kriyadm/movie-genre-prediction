# Movie Genre Prediction System

A machine learning-based system that predicts movie genres based on movie descriptions. The system uses natural language processing and multi-label classification to identify multiple genres for a given movie.

## Dataset

This project uses the IMDB Movie Dataset (2023-1951) curated by Deven Bhagtani. The dataset contains comprehensive information about Indian movies including:
- Movie titles and descriptions
- Release years
- Genres
- Cast and crew information
- Plot summaries

### Citation
```bibtex
@misc{yourusername/movie-dataset-2023,
  author = {Deven Bhagtani},
  title = {IMDB Movie Dataset(2023-1951)},
  year = {2023},
  publisher = {GitHub},
  journal = {GitHub repository},
  howpublished = {\url{https://github.com/devensinghbhagtani/Bollywood-Movie-Dataset}},
}
```

## Features

- Predicts multiple genres for a movie based on its description
- RESTful API for easy integration
- Real-time predictions
- Support for Indian and international movies
- High accuracy for genre prediction
- Easy to use and integrate

## Tech Stack

### Backend
- **FastAPI**: Modern, fast web framework for building APIs
- **Python**: Core programming language
- **scikit-learn**: Machine learning library
- **pandas**: Data manipulation and analysis
- **numpy**: Numerical computing
- **joblib**: Model persistence

### Frontend
- **Angular**: Frontend framework
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Axios**: HTTP client

## Project Structure

```
movieGEN/
├── ml-service/           # Machine Learning Service
│   ├── main.py          # FastAPI application
│   ├── model.pkl        # Trained model
│   ├── vectorizer.pkl   # Text vectorizer
│   ├── mlb.pkl          # Multi-label binarizer
│   └── movies.csv       # Training dataset
│
├── frontend/            # React Frontend
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── services/    # API services
│   │   └── App.tsx      # Main application
│   └── package.json     # Dependencies
│
└── README.md           # Project documentation
```

## Setup and Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm or yarn

### Backend Setup
1. Navigate to the ml-service directory:
   ```bash
   cd movieGEN/ml-service
   ```

2. Create a virtual environment:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Start the FastAPI server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd movieGEN/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

## API Documentation

### Predict Genre
- **Endpoint**: `/predict`
- **Method**: POST
- **Request Body**:
  ```json
  {
    "name": "Movie Name",
    "description": "Movie Description"
  }
  ```
- **Response**:
  ```json
  {
    "name": "Movie Name",
    "description": "Movie Description",
    "predictedGenre": "Genre1, Genre2, Genre3"
  }
  ```

## Model Details

The system uses a multi-label classification approach:
1. Text preprocessing and vectorization
2. Multi-label classification using scikit-learn
3. Genre prediction with probability thresholds

### Dataset Statistics
- Total Movies: 2,201
- Year Range: 1951-2023
- Primary Genres: Action, Drama, Comedy, Romance, Thriller
- Average Genres per Movie: 2.5

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Dataset sourced from [IMDB Movie Dataset (2023-1951)](https://github.com/devensinghbhagtani/Bollywood-Movie-Dataset) by Deven Bhagtani
- Built with modern web technologies
- Inspired by the need for automated genre classification

## Contact

For any queries or support, please open an issue in the repository. 
