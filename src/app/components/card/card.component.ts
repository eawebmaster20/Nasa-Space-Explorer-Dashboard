import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataService } from '../../shared/services/data/data.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IRov } from '../../shared/models/rov.interface';
import { Store } from '@ngrx/store';
import { addFavorite, removeFavorite } from '../../shared/store/store.actions';
import { selectIsFavorite } from '../../shared/store/store.selectors';
import { take } from 'rxjs';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [FormsModule, CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent {
 @Input() photo!:IRov;
 @Input() bookmarked:boolean =false;
 @Output() toggleBookmarkState:EventEmitter<any> = new EventEmitter();
 isFavorite = selectIsFavorite          
 constructor(public dataService:DataService, public store: Store){}
 toggleBookmark():void {
  this.store.select(this.isFavorite(this.photo.id)).pipe(take(1)).subscribe({
    next: (isFavorite) => {
      console.log(isFavorite);
      
      if (isFavorite) {
        this.store.dispatch(removeFavorite({id: this.photo.id}));
      } else {
        this.store.dispatch(addFavorite({favorite: this.photo}));
      }
    }
  })
  this.toggleBookmarkState.emit(this.bookmarked)
 }
}
