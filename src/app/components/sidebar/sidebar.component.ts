import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { DataService } from '../../shared/services/data/data.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(public dataService: DataService){}
  isActive(param:string):boolean {
    return this.dataService.selectedCategory === param
  }
}
