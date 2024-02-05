import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {Token} from "../../model/token.model";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class BackendHttpService {
  token = '';
  url = environment.backendHost + '/api/v1';


  constructor(
    private http: HttpClient,
  ) {
  }

  get(endpoint: string): any {
    return this.http.get(this.url + endpoint);
  }


  getPrivate(endpoint: string, queries: Map<string, string> = new Map()): Observable<any> {
    console.log(this.token)
    return this.http.get(this.url + endpoint, {
      headers: new HttpHeaders(
        {"Authorization": "Bearer " + this.token},
      )
    });

  }

  getPublic(endpoint: string): any {
    return this.http.get(this.url + endpoint);
  }

  getToken(code: string): Observable<boolean> {
    return this.http.get<Token>(`${this.url}/auth/callback?code=` + code, {observe: "response"})
      .pipe(map((response: HttpResponse<Token>) => {
        if (response.status === 200 && response.body !== null) {
          this.token = response.body.token;
          console.log(response);
          return true;
        } else {
          return false;
        }
      }));
  }
}
