import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { POD } from '../../models/picOfDayRes.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = 'https://api.nasa.gov';

  constructor(private http: HttpClient) { }

  picOfTheDay(){
    return this.http.get<POD>(`${this.baseUrl}/planetary/apod`);
  }
  
  marsRoverPhotos(){
    return this.http.get(`${this.baseUrl}/mars-photos/api/v1/rovers/curiosity/photos?sol=1000`);
    // return this.http.get(`${this.baseUrl}/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3`);
  }

  getNeo(startDate:string, endDate:string){
    return this.http.get(`${this.baseUrl}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}`);
  }
}
