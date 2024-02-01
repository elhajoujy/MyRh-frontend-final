import {Component, OnInit} from '@angular/core';
import {PageOffers} from '../../model/offer.model';
import {Observable, catchError, throwError} from 'rxjs';
import {OfferService} from '../../service/offer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendHttpService} from "../../service/backend-http/backend-http.service";

@Component({
  selector: 'offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  offers!: Observable<PageOffers>;

  errorMsg!: string;
  currentPage!: number;
  size!: number;
  showModal = false;
  isNew = false;
  checkMember = false;

  constructor(
    private service: OfferService,
    private route: ActivatedRoute,
    private router: Router,
    private backendHttpService: BackendHttpService,
    private http: BackendHttpService
  ) {
  }

  ngOnInit(): void {
    // this.router.navigate([], {
    //   queryParams: {
    //     page: 1,
    //   },
    // });
    console.log("OffersComponent")
    this.loadTokenInformation();

    this.route.queryParams.subscribe((params) => {
      this.currentPage = params['page'] || 1;
      this.size = params['size'] || 5;
      let queries = new Map<string, string>();
      for (let key in params) {
        queries.set(key, params[key]);
      }
      this.getOffers(queries);
    });
  }

  loadTokenInformation() {
    this.route.queryParams
      .subscribe(params => {
          if (params["code"] !== undefined) {
            this.http.getToken(params["code"]).subscribe(result => {
              if (result === true) {
                console.log("result", result)
                //: GET PRIVATE INFORMATION ... FROM THE BACKEND ..
                this.backendHttpService.getPrivate("/private/message").subscribe((data: any) => {
                  console.log(data)
                });
              } else {
                console.log("result", result)
              }
            });
          }
        }
      );
  }

  getOffers(queries: Map<string, string>) {
    this.offers = this.service.getAll(queries).pipe(
      catchError((err) => {
        console.error('Error in get All Offers : ', err);
        this.errorMsg = err.message;
        return throwError(() => err);
      })
    );
  }

  navigateToAdminCompetitions(page: any): void {
    const queryParams = {page: page}; // Assuming this.page is your parameter value
    this.router.navigate([], {queryParams: queryParams});
  }

  getTotalPagesArray(listOffers: PageOffers): number[] {
    return Array.from(
      {length: listOffers.totalPages},
      (_, index) => index + 1
    );
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }
}
