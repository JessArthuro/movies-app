import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest } from 'rxjs';
import { Cast } from 'src/app/interfaces/credits-response';
import { MovieResponse } from 'src/app/interfaces/movie-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styles: [],
})
export class MovieComponent implements OnInit {
  public movie: MovieResponse;
  public cast: Cast[] = [];

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MoviesService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const { id } = this.activatedRoute.snapshot.params;

    // Combinar observables - opcion #2 y mejor
    combineLatest([
      this.movieService.getMovieDetails(id),
      this.movieService.getCast(id),
    ]).subscribe(([movie, cast]) => {
      if (!movie) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.movie = movie;

      this.cast = cast.filter((actor) => actor.profile_path !== null); //filtrar los actores que no tengan foto
    });

    // Opcion #1 - se hacen 2 peticiones independientes...
    // this.movieService.getMovieDetails(id).subscribe((movie) => {
    // if (!movie) {
    //   this.router.navigateByUrl('/home');
    //   return;
    // }
    // this.movie = movie;
    // });

    // this.movieService.getCast(id).subscribe(
    //   (cast) =>
    // (this.cast = cast.filter((actor) => actor.profile_path !== null)) //filtrar los actores que no tengan foto
    // );
  }

  onBack() {
    this.location.back();
  }
}
