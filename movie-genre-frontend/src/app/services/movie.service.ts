import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Movie {
  name: string;
  description: string;
  predictedGenre?: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private mlServiceUrl = 'http://localhost:8000';

  constructor(private http: HttpClient) { }

  testConnection(): Observable<any> {
    return this.http.get(`${this.mlServiceUrl}/health`);
  }

  predictGenre(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.mlServiceUrl}/predict`, movie).pipe(
      map(response => ({
        ...movie,
        predictedGenre: response.predictedGenre
      })),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    let errorMessage = 'An error occurred while predicting the genre.';
    
    if (error.status === 0) {
      errorMessage = 'Unable to connect to the server. Please check if the backend is running.';
    } else if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    
    return throwError(() => new Error(errorMessage));
  }

  getSampleMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.mlServiceUrl}/samples`);
  }

  getAllMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.mlServiceUrl}/movies`);
  }

  getMovieById(id: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.mlServiceUrl}/movies/${id}`);
  }
} 