import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: [],
})
export class NavbarComponent {
  constructor(private router: Router) {}

  searchMovie(text: string) {
    text = text.trim(); // para borrar espacios adelante y atras de la cadena

    if (text.length === 0) {
      return;
    }

    this.router.navigate(['/search', text]);
  }
}
