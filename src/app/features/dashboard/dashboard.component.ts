import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {MatSidenavModule} from '@angular/material/sidenav';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Store } from '@ngrx/store';
import { DataService } from '../../shared/services/data/data.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [RouterOutlet, MatSidenavModule, SidebarComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  constructor(public dataService: DataService, public store:Store){}

  ngOnInit(): void {
    this.dataService.fetchRoverPhotos('curiosity');
  }

}
