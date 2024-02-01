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
    console.log("OffersComponent")
    this.loadTokenInformation();

  }


  loadTokenInformation() {
    this.route.queryParams.subscribe(params => {
        if (params["code"] !== undefined) {
          this.http.getToken(params["code"]).subscribe(result => {
            if (result) {
              this.backendHttpService.getPrivate("/offers").subscribe((data: any) => {
                this.getOffers();
                //: SAVE TOKEN IN LOCAL STORAGE WE NEED IT FOR THE NEXT REQUESTS
                localStorage.setItem("token", this.backendHttpService.token);
                //: REDIRECT TO THE OFFERS PAGE

                // this.router.navigate(["/applicant/dashboard"])
              });
            } else {
              // console.log("result", result)
              // console.log("redirect to login page")
              // this.router.navigate(["/applicant/auth/login"])
            }
          });
        } else {
          console.log("redirect to login page")
          this.router.navigate(["/applicant/auth/login"])
        }

      }
    );
  }

  getOffers() {
    this.offers = this.service.getAll().pipe(
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
