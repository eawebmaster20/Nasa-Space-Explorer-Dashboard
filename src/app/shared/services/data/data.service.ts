import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { POD } from '../../models/picOfDayRes.interface';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  selectedCategory = ''
  picOfDay = new BehaviorSubject<POD>(
    {
      copyright: '',
      date: '',
      explanation: '',
      hdurl: '',
      media_type: '',
      service_version: '',
      title: '',
      url: '',
  }
  );
  mrp:any[]=[];
  favorites:any[]=[];
  constructor(private api:ApiService) { }
  userAuthenticated(): boolean {
    return localStorage.getItem('fakeToken') ? true : false
  }

  fetchAstronomyPicOfDay(){
    this.api.picOfTheDay().subscribe({
      next: (data: any) => {
        this.picOfDay.next(data)
        console.log('Astronomy Pic of the Day:', this.mrp);
      },
      error: (error) => {
        console.error('Error fetching Astronomy Pic of the Day:', error);
      }
    })
  }

  fetchRoverPhotos(){
    this.api.marsRoverPhotos().subscribe({
      next: (data: any) => {
        this.favorites= data
        console.log('Rov:', this.mrp);
      },
      error: (error) => {
        console.error('MRP:', error);
      }
    })
  }
}
