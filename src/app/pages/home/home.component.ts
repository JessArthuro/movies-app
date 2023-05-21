import { Component, OnInit, OnDestroy , HostListener } from '@angular/core';
import { Movie } from 'src/app/interfaces/billboard-response';
import { MoviesService } from 'src/app/services/movies.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: [],
})
export class HomeComponent implements OnInit, OnDestroy {
  public moviesSlideshow: Movie[] = [];
  public movies: Movie[] = [];

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    // Posicion del scroll
    const position =
      (document.documentElement.scrollTop || document.body.scrollTop) + 1500;

    // Obtencion de la altura maxima de la pagina
    const max =
      document.documentElement.scrollHeight || document.body.scrollHeight;

    if (position > max) {
      // si esta cargando que no se haga una peticion mas...
      if (this.movieService.loading) {
        return;
      }

      this.movieService.getBillboard().subscribe((movies) => {
        this.movies.push(...movies);
      });
    }
  }

  constructor(private movieService: MoviesService) {}

  ngOnInit() {
    this.movieService.getBillboard().subscribe((movies) => {
      // console.log(resp.results);
      this.moviesSlideshow = movies;
      this.movies = movies;
    });
  }

  // resetear el numero de pagina cuando se destruye el componente
  ngOnDestroy(): void { 
    this.movieService.resetBillboardPage();
  }
}
