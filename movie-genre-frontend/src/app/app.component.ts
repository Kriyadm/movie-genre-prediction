import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoviePredictorComponent } from './components/movie-predictor/movie-predictor.component';
import { HttpClientModule } from '@angular/common/http';
import 'animate.css';
import { MovieService } from './services/movie.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MoviePredictorComponent,
    HttpClientModule
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100">
      <app-movie-predictor></app-movie-predictor>
    </div>
  `,
  styles: []
})
export class AppComponent implements OnInit {
  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.movieService.testConnection().subscribe({
      next: () => console.log('Successfully connected to the ML service'),
      error: (error) => console.error('Failed to connect to the ML service:', error)
    });
  }
}
