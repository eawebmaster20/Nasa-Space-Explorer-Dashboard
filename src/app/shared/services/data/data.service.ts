import { Injectable } from '@angular/core';
import { ApiService } from '../api/api.service';
import { BehaviorSubject, debounceTime, distinctUntilChanged, interval, Observable, switchMap, tap } from 'rxjs';
import { POD } from '../../models/picOfDayRes.interface';
import { IRov } from '../../models/rov.interface';
import { Store } from '@ngrx/store';
import { fetchRovsSuccess } from '../../store/store.actions';
import { INeo } from '../../models/neo.interface';

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
  neoData = new BehaviorSubject<any>(
    {
      "2024-11-07": [
          {
              links: { self: "https://api.nasa.gov/neo/2024-11-07" },
              id: "12345",
              neo_reference_id: "54321",
              name: "Asteroid XYZ",
              nasa_jpl_url: "https://nasa.gov/xyz",
              absolute_magnitude_h: 22.1,
              estimated_diameter: {
                  kilometers: { estimated_diameter_min: 0.1, estimated_diameter_max: 0.3 },
                  meters: { estimated_diameter_min: 100, estimated_diameter_max: 300 },
                  miles: { estimated_diameter_min: 0.06, estimated_diameter_max: 0.18 },
                  feet: { estimated_diameter_min: 328, estimated_diameter_max: 984 },
              },
              is_potentially_hazardous_asteroid: true,
              close_approach_data: [
                  {
                      close_approach_date: "2024-11-07",
                      close_approach_date_full: "2024-Nov-07 00:00",
                      epoch_date_close_approach: 1700000000000,
                      relative_velocity: {
                          kilometers_per_second: "20.1",
                          kilometers_per_hour: "72360",
                          miles_per_hour: "44960",
                      },
                      miss_distance: {
                          astronomical: "0.05",
                          lunar: "19.5",
                          kilometers: "7500000",
                          miles: "4660000",
                      },
                      orbiting_body: "Earth",
                  },
              ],
              is_sentry_object: false,
          },
      ],
  }
  );
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

  fetchNeo(startDate:string, endDate:string){
    this.api.getNeo(startDate, endDate).subscribe({
      next: (data: any) => {
        this.neoData.next(data.near_earth_objects)
        console.log('neo results:', data);
      },
      error: (error) => {
        console.error('Error fetching neo data:', error);
      }
    })
  }
}

