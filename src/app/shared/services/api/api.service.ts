import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { POD } from '../../models/picOfDayRes.interface';
import { IRov } from '../../models/rov.interface';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl: string = 'https://api.nasa.gov';

  constructor(private http: HttpClient) { }

  picOfTheDay(){
    return this.http.get<POD>(`${this.baseUrl}/planetary/apod`);
  }
  
  marsRoverPhotos(name: string){
    return this.http.get<{photos:IRov[]}>(`${this.baseUrl}/mars-photos/api/v1/rovers/${name}/photos?sol=1000`).pipe(map((res)=>res.photos));
    // return this.http.get(`${this.baseUrl}/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2015-6-3`);
  }

  getNeo(startDate:string, endDate:string){
    return this.http.get(`${this.baseUrl}/neo/rest/v1/feed?start_date=${startDate}&end_date=${endDate}`);
  }
}
