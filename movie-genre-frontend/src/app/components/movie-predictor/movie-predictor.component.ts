import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MovieService, Movie } from '../../services/movie.service';
import { LoadingFactsComponent } from '../loading-facts/loading-facts.component';
import { catchError, of } from 'rxjs';
import 'animate.css';

@Component({
  selector: 'app-movie-predictor',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    LoadingFactsComponent
  ],
  template: `
    <div class="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-4xl mx-auto">
        <!-- Header Section -->
        <div class="text-center mb-12 animate__animated animate__fadeIn">
          <h1 class="text-4xl font-bold text-gray-900 mb-4">Movie Genre Predictor</h1>
          <p class="text-lg text-gray-600">Discover the genre of any movie through AI-powered analysis</p>
        </div>

        <!-- Main Card -->
        <div class="bg-white rounded-2xl shadow-xl overflow-hidden animate__animated animate__fadeInUp">
          <div class="p-8">
            <!-- Input Form -->
            <form (ngSubmit)="onSubmit()" #movieForm="ngForm" class="space-y-6">
              <div class="space-y-4">
                <div class="relative">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    [(ngModel)]="movie.name"
                    required
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter movie name..."
                    [class.animate__animated]="true"
                    [class.animate__shakeX]="showNameError"
                  >
                  <div *ngIf="showNameError" class="absolute -bottom-6 left-0 text-red-500 text-sm animate__animated animate__fadeIn">
                    Please enter a movie name
                  </div>
                </div>

                <div class="relative">
                  <textarea
                    id="description"
                    name="description"
                    [(ngModel)]="movie.description"
                    required
                    rows="4"
                    class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter movie description..."
                    [class.animate__animated]="true"
                    [class.animate__shakeX]="showDescError"
                  ></textarea>
                  <div *ngIf="showDescError" class="absolute -bottom-6 left-0 text-red-500 text-sm animate__animated animate__fadeIn">
                    Please enter a movie description
                  </div>
                </div>
              </div>

              <button
                type="submit"
                [disabled]="!movieForm.form.valid || isPredicting"
                class="w-full py-3 px-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg font-semibold shadow-lg hover:from-purple-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {{ isPredicting ? 'Predicting...' : 'Predict Genre' }}
              </button>
            </form>

            <!-- Loading Animation -->
            <div *ngIf="isPredicting" class="mt-8 text-center">
              <app-loading-facts></app-loading-facts>
            </div>

            <!-- Result Section -->
            <div *ngIf="prediction" class="mt-8 animate__animated animate__fadeIn">
              <div class="bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl p-6 border border-purple-100">
                <h3 class="text-2xl font-bold text-gray-900 mb-4">Prediction Result</h3>
                <div class="space-y-4">
                  <div class="flex items-center space-x-3">
                    <span class="text-purple-600 font-semibold">Genre:</span>
                    <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm font-medium">
                      {{ prediction }}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div *ngIf="error" class="mt-4 p-4 bg-red-100 text-red-700 rounded-md animate__animated animate__fadeIn">
              <div class="flex items-center">
                <svg class="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"/>
                </svg>
                {{ error }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
    }
  `]
})
export class MoviePredictorComponent {
  movie: Movie = {
    name: '',
    description: ''
  };
  prediction: string | null = null;
  error: string | null = null;
  isPredicting = false;
  showNameError = false;
  showDescError = false;

  constructor(private movieService: MovieService) {}

  onSubmit() {
    if (!this.movie.name) {
      this.showNameError = true;
      setTimeout(() => this.showNameError = false, 1000);
      return;
    }
    if (!this.movie.description) {
      this.showDescError = true;
      setTimeout(() => this.showDescError = false, 1000);
      return;
    }

    this.isPredicting = true;
    this.error = null;
    this.prediction = null;

    this.movieService.predictGenre(this.movie).pipe(
      catchError(err => {
        console.error('Prediction error:', err);
        this.error = err.status === 0 
          ? 'Unable to connect to the server. Please check if the backend is running.'
          : 'Failed to predict genre. Please try again.';
        this.isPredicting = false;
        // Return a default prediction in case of error
        return of({ ...this.movie, predictedGenre: 'Unknown' });
      })
    ).subscribe({
      next: (response) => {
        this.prediction = response.predictedGenre || 'Unknown';
        this.isPredicting = false;
      }
    });
  }
} 