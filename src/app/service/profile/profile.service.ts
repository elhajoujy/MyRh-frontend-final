import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {profile} from './../../model/profile.module';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  // http://localhost:8080
  private baseUrl = `${environment.backendHost}/api/v1/public/profiles`;

  constructor(private http: HttpClient) {
  }

  getAllProfiles(): Observable<profile[]> {
    return this.http.get<profile[]>(this.baseUrl);
  }


}
