import { Component, OnInit } from '@angular/core';
import { CardComponent } from '../../../components/card/card.component';
import { AsyncPipe, CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DataService } from '../../../shared/services/data/data.service';

@Component({
  selector: 'app-mars-rover-photos',
  standalone: true,
  imports: [CardComponent, AsyncPipe],
  templateUrl: './mars-rover-photos.component.html',
  styleUrl: './mars-rover-photos.component.scss'
})
export class MarsRoverPhotosComponent implements OnInit {
  constructor(public dataService: DataService){}
  ngOnInit(): void {
    this.dataService.fetchRoverPhotos('curiosity');
  }
}
