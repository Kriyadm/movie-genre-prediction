package com.moviegen.service;

import com.moviegen.model.Movie;
import com.moviegen.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;

@Service
public class MovieService {
    
    @Autowired
    private MovieRepository movieRepository;
    
    @Autowired
    private RestTemplate restTemplate;
    
    private static final String ML_SERVICE_URL = "http://localhost:8000/predict";
    
    public Movie predictGenre(Movie movie) {
        // Call the ML service
        Movie response = restTemplate.postForObject(ML_SERVICE_URL, movie, Movie.class);
        
        if (response != null) {
            movie.setPredictedGenre(response.getPredictedGenre());
            movie.setPredicted(true);
            return movieRepository.save(movie);
        }
        
        throw new RuntimeException("Failed to get prediction from ML service");
    }
    
    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
    
    public Movie getMovieById(Long id) {
        return movieRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Movie not found"));
    }
} 