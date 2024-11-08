import { Component } from '@angular/core';
import { DataService } from '../../../shared/services/data/data.service';
import { AsyncPipe } from '@angular/common';
import { selectIsFavorite } from '../../../shared/store/store.selectors';
import { Store } from '@ngrx/store';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe, MatIconModule, MatButtonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  isFavorite = selectIsFavorite
  constructor(public dataService: DataService, public store: Store){}
  ngOnInit(): void {
    this.dataService.fetchAstronomyPicOfDay();
  }

  toggleBookmark():void {
    // this.store.select(this.isFavorite(this.photo.id)).pipe(take(1)).subscribe({
    //   next: (isFavorite) => {
    //     console.log(isFavorite);
        
    //     if (isFavorite) {
    //       this.store.dispatch(removeFavorite({id: this.photo.id}));
    //     } else {
    //       this.store.dispatch(addFavorite({favorite: this.photo}));
    //     }
    //   }
    // })
  }
}
