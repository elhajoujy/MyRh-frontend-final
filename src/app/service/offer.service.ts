import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {JobSeekerOfferInsightsResponse, Offer, PageOffers} from '../model/offer.model';
import {Observable} from 'rxjs';
import {environment} from "../../environments/environment";
import {BackendHttpService} from "./backend-http/backend-http.service";

@Injectable({
  providedIn: 'root',
})
export class OfferService {
  private backend_host = environment.backendHost;
  private base_url = `${environment.backendHost}/myrh/api/v1/offers`;

  constructor(
    private http: HttpClient,
    private privateHttpBackend: BackendHttpService
  ) {
  }

  public save(offer: Offer) {
    const formData = new FormData();

    return this.http.post<Offer>(this.base_url, offer);
  }

  public search(data: Map<string, string>) {
    const params = new HttpParams();

    return this.http.post<Offer>(this.base_url, {
      params,
    });
  }

  public getAll(queries: Map<string, string>): Observable<PageOffers> {
    // let params = new HttpParams();
    // queries.forEach((value, key) => {
    //   params = params.append(key, value);
    // });
    return this.privateHttpBackend.getPrivate("/offers", queries);
    // return this.privateHttpBackend.getPublic("/offers", queries);
    //: SETUP THE AUTHORIZATION HEADER FROM THE TOKEN SERVICE HTTP INTERCEPTOR SO YOU CAN DO WHATEVER YOU WANT ....
    // return this.http.get<PageOffers>(this.base_url, {
    //   params,
    // });
  }

  public getOne(code: string): Observable<Offer> {
    return this.http.get<Offer>(this.base_url + '/' + code);
  }

  changeVisibility(offerId: number, value: string) {
    return this.http.patch(this.base_url + '/' + offerId + '/visibility/' + value, null);
  }

  getAllCandidatesOfferInsights(companyId: number): Observable<Array<JobSeekerOfferInsightsResponse>> {
    return this.http.get<Array<JobSeekerOfferInsightsResponse>>(this.base_url + '/insights/jobSeeker/company/' + companyId);
  }
}
