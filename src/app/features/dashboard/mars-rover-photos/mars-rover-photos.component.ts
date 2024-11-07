import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../shared/services/data/data.service';
import { Store } from '@ngrx/store';
import { selectAllRovers, selectIsFavorite } from '../../../shared/store/store.selectors';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  selector: 'app-mars-rover-photos',
  standalone: true,
  imports: [CardComponent, AsyncPipe, MatButtonToggleModule, FormsModule],
  templateUrl: './mars-rover-photos.component.html',
  styleUrl: './mars-rover-photos.component.scss'
})
export class MarsRoverPhotosComponent implements OnInit {
  selectAll = selectAllRovers
  isFavorite = selectIsFavorite   
  constructor(public dataService: DataService, public store:Store){}
  ngOnInit(): void {
    // this.dataService.fetchRoverPhotos('curiosity');
  }

  filter(event:any):void {
    this.dataService.nameSubject.next(event)
  }
}
