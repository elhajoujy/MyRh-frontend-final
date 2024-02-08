import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { profile } from './../../model/profile.module';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private baseUrl = 'http://localhost:8080/api/v1/public/profiles';

  constructor(private http: HttpClient) { }

  getAllProfiles(): Observable<profile[]> {
    return this.http.get<profile[]>(this.baseUrl);
  }


}
