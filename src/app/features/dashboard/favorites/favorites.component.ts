import { Component } from '@angular/core';
import { selectAllFavorites, selectIsFavorite } from '../../../shared/store/store.selectors';
import { DataService } from '../../../shared/services/data/data.service';
import { Store } from '@ngrx/store';
import { CardComponent } from '../../../components/card/card.component';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CardComponent, AsyncPipe, MatIconModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  selectAll = selectAllFavorites
  isFavorite = selectIsFavorite   
  constructor(public dataService: DataService, public store:Store){}

}
