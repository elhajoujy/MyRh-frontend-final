import {Component, OnInit} from '@angular/core';
import {PageOffers} from '../../model/offer.model';
import {Observable, catchError, throwError} from 'rxjs';
import {OfferService} from '../../service/offer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BackendHttpService} from "../../service/backend-http/backend-http.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/state/app.state";
import {JobSeeker} from "../../model/jobSeeker.model";

@Component({
  selector: 'offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css'],
})
export class OffersComponent implements OnInit {
  offers!: Observable<PageOffers>;
  applicant!: JobSeeker | null;

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
    private http: BackendHttpService,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    //TODO: LOADING O2AUTH2 TOKEN INFORMATION

    // this.loadTokenInformation();
    let params = new Map<string, string>();
    this.loadApplicantAuth();
    //TODO : afficher sur la dashboard du candidat seulement les offres d'emploi qui correspondent son profil validé,
    // si non le candidat recoit toutes les offres

    if (this.applicant && this.applicant.validated) {
      console.log('params :', this.applicant.profile.id);
      params.set("profile_id", this.applicant.profile.id.toString());
      console.log('params :', params);
      this.getOffers(params);
    } else {
      this.getOffers(params);
    }
  }


  loadTokenInformation() {
    this.route.queryParams.subscribe(params => {
        if (params["code"] !== undefined) {
          this.http.getToken(params["code"]).subscribe(result => {
            if (result) {
                let params = new Map<string, string>();
              this.backendHttpService.getPrivate("/offers").subscribe((data: any) => {
                //todo: get offers based on the user profile
                // this.getOffers(params);
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

  getOffers(params: Map<string, string>) {
    this.offers = this.service.getAll(params).pipe(
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

  private loadApplicantAuth() {
    console.log('loadApplicantAuth')
    this.store.select('applicantAuth').subscribe(
      (state) => (
        (this.applicant = state.applicant),
          // console.log('State :', state),
          console.log(
            'isLogged  : ',
            state.isLogged,
            ', Applicant :',
            this.applicant
          )
      )
    );
  }
}
