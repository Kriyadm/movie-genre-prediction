package com.moviegen;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;

@SpringBootApplication
@EnableCaching
public class MovieGenreApplication {
    public static void main(String[] args) {
        SpringApplication.run(MovieGenreApplication.class, args);
    }
} 