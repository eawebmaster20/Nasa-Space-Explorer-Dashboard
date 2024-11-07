import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { POD } from '../../models/picOfDayRes.interface';
import { IRov } from '../../models/rov.interface';

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
  });
  rovPics = new BehaviorSubject<IRov[] | null>(null);
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
        // console.log('Astronomy Pic of the Day:', data);
      },
      error: (error) => {
        console.error('Error fetching Astronomy Pic of the Day:', error);
      }
    })
  }

  fetchRoverPhotos(name:string  ){
    this.api.marsRoverPhotos(name).subscribe({
      next: (data) => {
        this.rovPics.next(data)
        console.log('Rov:', data);
      },
      error: (error) => {
        console.error('MRP:', error);
      }
    })
  }
}

