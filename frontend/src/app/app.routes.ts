import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home').then((m) => m.HomeComponent)
  },
  {
    path: 'jobs',
    loadComponent: () =>
      import('./pages/jobs/jobs').then((m) => m.JobsComponent)
  },
  {
    path: 'jobs/:id',
    loadComponent: () =>
      import('./pages/job-details/job-details').then(
        (m) => m.JobDetailsComponent
      )
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./pages/login/login').then((m) => m.LoginComponent)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./pages/register/register').then((m) => m.RegisterComponent)
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile').then((m) => m.ProfileComponent)
  },
  {
    path: 'my-applications',
    loadComponent: () =>
      import('./pages/my-applications/my-applications').then(
        (m) => m.MyApplicationsComponent
      )
  },
  {
    path: 'recruiter-dashboard',
    loadComponent: () =>
      import('./pages/recruiter-dashboard/recruiter-dashboard').then(
        (m) => m.RecruiterDashboardComponent
      )
  },
  {
    path: 'post-job',
    loadComponent: () =>
      import('./pages/post-job/post-job').then(
        (m) => m.PostJobComponent
      )
  },
  {
    path: 'manage-applications',
    loadComponent: () =>
      import('./pages/manage-applications/manage-applications').then(
        (m) => m.ManageApplicationsComponent
      )
  },
  {
    path: '**',
    redirectTo: ''
  }
];