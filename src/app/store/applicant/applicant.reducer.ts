import { createReducer, on } from '@ngrx/store';
import { initialState } from './applicant.state';
import { applicantLoginSuccess } from './applicant.action';

const _authReducer = createReducer(
  initialState,
  on(applicantLoginSuccess, (state, action) => {
    console.log('applicantAuthReducer : action : ', action);
    console.log('applicantAuthReducer : state : ', state);
    return {
      ...state,
      applicant: action.jobSeeker,
      isLogged: action.isLogged,
    };
  })
);


export function applicantAuthReducer(state: any, action: any) {
  return _authReducer(state, action);
}


const _applicantLogOutReducer = createReducer(
  initialState,
  on(applicantLoginSuccess, (state, action) => {
    console.log('applicantAuthReducer : action : ', action);
    console.log('applicantAuthReducer : state : ', state);
    return {
      ...state,
      applicant: null,
      isLogged: false,
    };
  })
);


export function applicantLogOutReducer(state: any, action: any) {
  console.log('applicantLogOutReducer : action : ', action);
  return _applicantLogOutReducer(state, action);
}


