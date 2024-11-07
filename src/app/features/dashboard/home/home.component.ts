import { Component } from '@angular/core';
import { DataService } from '../../../shared/services/data/data.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(public dataService: DataService){}
  ngOnInit(): void {
    this.dataService.fetchAstronomyPicOfDay();
  }
}
