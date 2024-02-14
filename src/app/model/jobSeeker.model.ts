import {profile} from "./profile.module";

export interface JobSeeker {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  image: string | null;
  enabled: boolean;
  validated: boolean;
  lastExamPassedDate: Date | null;
  passedExams: number;
  profile: Profile | any | null;
}

export interface Profile {
  id: number | null;
  name: string;
  description: string;
  image: string;
}

export interface PageJobSeeker {
  content: Array<JobSeeker>;
  pageable: any;
  last: boolean;
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  sort: any;
  first: boolean;
  numberOfElements: boolean;
  empty: boolean;
}
