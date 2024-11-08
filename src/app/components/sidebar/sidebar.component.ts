import { Component } from '@angular/core';
import {MatListModule} from '@angular/material/list';
import { DataService } from '../../shared/services/data/data.service';
import { Router, RouterLink } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [MatListModule, RouterLink, MatIconModule, MatButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  constructor(public dataService: DataService, private router: Router){}

  isActive(param:string):boolean {
    return this.dataService.selectedCategory === param
  }

  logout(){
    localStorage.removeItem('fakeToken');
    this.router.navigateByUrl('/auth/login');
  }

  filterRoverPhotos(name: string): void {
    this.dataService.fetchRoverPhotos(name)
  }
}
