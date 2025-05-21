package com.moviegen.controller;

import com.moviegen.model.Movie;
import com.moviegen.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/movies")
@CrossOrigin(origins = "http://localhost:4200")
public class MovieController {
    
    @Autowired
    private MovieService movieService;
    
    @PostMapping("/predict")
    public ResponseEntity<Movie> predictGenre(@RequestBody Movie movie) {
        Movie predictedMovie = movieService.predictGenre(movie);
        return ResponseEntity.ok(predictedMovie);
    }
    
    @GetMapping
    public ResponseEntity<List<Movie>> getAllMovies() {
        return ResponseEntity.ok(movieService.getAllMovies());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Movie> getMovieById(@PathVariable Long id) {
        return ResponseEntity.ok(movieService.getMovieById(id));
    }
} 