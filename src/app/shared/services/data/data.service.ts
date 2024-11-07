import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, interval, Observable, switchMap, tap } from 'rxjs';
import { POD } from '../../models/picOfDayRes.interface';
import { IRov } from '../../models/rov.interface';
import { Store } from '@ngrx/store';
import { fetchRovsSuccess } from '../../store/store.actions';

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
  nameSubject = new BehaviorSubject<string>('');
  rovPics = new BehaviorSubject<IRov[] | null>(null);
  mrp:any[]=[];
  favorites:any[]=[];
  constructor(private api:ApiService, private store:Store) { }
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
    // console.log('Rover photos fetching');
    this.rovPics.next([])
    this.nameSubject.next(name);
    interval(10000) 
    .pipe(
      switchMap(() => this.nameSubject.pipe(
        debounceTime(500), 
        distinctUntilChanged(),
        switchMap((Name) => this.api.marsRoverPhotos(Name))
      ))
    ).subscribe({
      next: (data) => {
        this.store.dispatch(fetchRovsSuccess({rovs: data}))
      },
      error: (error) => {
        console.error('Error fetching rover photos:', error);
      }
    });
  }
}

