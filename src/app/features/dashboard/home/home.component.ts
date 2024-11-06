import { Component } from '@angular/core';
import { DataService } from '../../../shared/services/data/data.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  constructor(private dataService: DataService){}
  ngOnInit(): void {
    this.dataService.fetchAstronomyPicOfDay();
  }
}
