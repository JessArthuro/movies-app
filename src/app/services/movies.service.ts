import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, map, of, catchError } from 'rxjs';
import { BillboardResponse, Movie } from '../interfaces/billboard-response';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  private baseUrl: string = 'https://api.themoviedb.org/3';
  private billboardPage = 1;
  public loading: boolean = false;

  constructor(private http: HttpClient) {}

  get params() {
    return {
      api_key: '9a10bd6865a9b065a40b366e85ab76fc',
      language: 'es-Es',
      page: this.billboardPage.toString(),
    };
  }

  resetBillboardPage() {
    this.billboardPage = 1;
  }

  getBillboard(): Observable<Movie[]> {
    if (this.loading) {
      return of([]);
    }

    this.loading = true;
    return this.http
      .get<BillboardResponse>(`${this.baseUrl}/movie/now_playing`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.results),
        tap(() => {
          this.billboardPage += 1;
          this.loading = false;
        })
      );
  }

  searchMovies(text: string): Observable<Movie[]> {
    const params = { ...this.params, page: '1', query: text };

    return this.http
      .get<BillboardResponse>(`${this.baseUrl}/search/movie`, {
        params,
      })
      .pipe(map((resp) => resp.results));
  }

  getMovieDetails(id: string) {
    return this.http
      .get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
        params: this.params,
      })
      .pipe(catchError((err) => of(null)));
  }

  getCast(id: string):Observable<Cast[]> {
    return this.http
      .get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.cast),
        catchError((err) => of([]))
      );
  }
}
