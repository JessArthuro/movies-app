import { AfterViewInit, Component, Input } from '@angular/core';
import { Movie } from 'src/app/interfaces/billboard-response';
import Swiper, { Autoplay } from 'swiper';
Swiper.use([Autoplay]); 

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements AfterViewInit {
  @Input() movies: Movie[];
  public swiper: Swiper;

  ngAfterViewInit(): void {
    this.swiper = new Swiper('.swiper', {
      loop: true,
      autoplay: {
        delay: 3500,
        disableOnInteraction: false,
      },
    });
  }

  onSlidePrev() {
    this.swiper.slidePrev();
  }

  onSlideNext() {
    this.swiper.slideNext();
  }
}
