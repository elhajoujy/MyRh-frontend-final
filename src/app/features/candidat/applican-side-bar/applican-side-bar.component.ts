import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/state/app.state';
import { JobSeeker } from '../../../model/jobSeeker.model';
import {applicantLogOut} from "../../../store/applicant/applicant.action";
import {Router} from "@angular/router";

@Component({
  selector: 'app-applican-side-bar',
  templateUrl: './applican-side-bar.component.html',
  styleUrls: ['./applican-side-bar.component.css'],
})
export class ApplicanSideBarComponent implements OnInit {
  applicant!: JobSeeker | null;
  isLogged!: boolean | null;
  constructor(
    private store: Store<AppState>,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.store.select('applicantAuth').subscribe(
      (state) => (
        (this.isLogged = state.isLogged),
        (this.applicant = state.applicant),
        // console.log('State :', state),
        console.log(
          'isLogged  : ',
          this.isLogged,
          ', Applicant :',
          this.applicant
        )
      )
    );
  }

  logout() {
    // this.store.dispatch(applicantLogOut());
    this.router.navigate(['/applicant/auth/login']).then(() => {
      window.location.reload();
    });
  }
}
