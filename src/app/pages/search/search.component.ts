import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/interfaces/billboard-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {
  public text: string = ''
  public movies: Movie[] = []

  constructor(private activatedRoute: ActivatedRoute, private movieService: MoviesService){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.text = params['text']

      this.movieService.searchMovies(params['text']).subscribe(movies => {
        // console.log(movies);
        this.movies = movies
      })
    })
  }
}
