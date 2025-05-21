from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import joblib
from typing import Optional
import traceback
import numpy as np

app = FastAPI()

# Enable CORS with more permissive settings
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Load your trained model and vectorizer
try:
    print("Attempting to load model and vectorizer...")
    model = joblib.load("model.pkl")
    vectorizer = joblib.load("vectorizer.pkl")
    mlb = joblib.load("mlb.pkl")  # Load the MultiLabelBinarizer
    print("Model and vectorizer loaded successfully!")
    print(f"Available classes: {mlb.classes_}")
except Exception as e:
    print(f"Error loading model or vectorizer: {e}")
    print("Full error traceback:")
    print(traceback.format_exc())
    model = None
    vectorizer = None
    mlb = None

class MovieRequest(BaseModel):
    name: str
    description: str

class MovieResponse(BaseModel):
    name: str
    description: str
    predictedGenre: str

@app.post("/predict", response_model=MovieResponse)
async def predict_genre(movie: MovieRequest):
    if not model or not vectorizer or not mlb:
        print("Model, vectorizer, or mlb not loaded!")
        raise HTTPException(status_code=500, detail="Model not loaded")
    
    try:
        print(f"Received prediction request for movie: {movie.name}")
        print(f"Description: {movie.description}")
        
        # Transform the input
        X = vectorizer.transform([movie.description])
        print(f"Transformed input shape: {X.shape}")
        
        # Make prediction
        prediction = model.predict(X)[0]
        print(f"Raw prediction array: {prediction}")
        
        # Convert prediction to numpy array and reshape
        prediction_array = np.array(prediction).reshape(1, -1)
        print(f"Reshaped prediction array: {prediction_array}")
        print(f"Prediction array shape: {prediction_array.shape}")
        
        # Convert binary array to genre names
        try:
            genre_names = mlb.inverse_transform(prediction_array)[0]
            print(f"Decoded genre names: {genre_names}")
            predicted_genre = ", ".join(genre_names) if len(genre_names) > 0 else "Unknown"
            print(f"Final predicted genre: {predicted_genre}")
        except Exception as e:
            print(f"Error converting prediction to genre names: {e}")
            print("Full error traceback:")
            print(traceback.format_exc())
            predicted_genre = "Unknown"
        
        return MovieResponse(
            name=movie.name,
            description=movie.description,
            predictedGenre=predicted_genre
        )
    except Exception as e:
        print(f"Prediction error: {e}")
        print("Full error traceback:")
        print(traceback.format_exc())
        raise HTTPException(status_code=500, detail=str(e))

assert model is not None, "Model failed to load"
assert vectorizer is not None, "Vectorizer failed to load"
assert mlb is not None, "MultiLabelBinarizer failed to load"

@app.get("/health")
def health_check():
    return {"status": "healthy"} 