import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import { RouterLink } from '@angular/router';

import { JobService } from '../../services/job.service';
import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-recruiter-dashboard',
  imports: [RouterLink],
  templateUrl: './recruiter-dashboard.html',
  styleUrl: './recruiter-dashboard.css'
})
export class RecruiterDashboardComponent implements OnInit {
  stats = {
    jobs: 0,
    applications: 0,
    shortlisted: 0,
    interviews: 0
  };

  applications: any[] = [];
  error = '';

  constructor(
    private jobService: JobService,
    private applicationService: ApplicationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadJobs();
    this.loadApplications();
  }

  loadJobs() {
    this.jobService.getJobs().subscribe({
      next: (jobs) => {
        this.stats.jobs = jobs.length;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('JOBS ERROR:', error);

        this.error =
          error.error?.message ||
          'Failed to load dashboard data';

        this.cdr.detectChanges();
      }
    });
  }

  loadApplications() {
    this.applicationService.getApplications().subscribe({
      next: (applications) => {
        this.applications = applications;

        this.stats.applications = applications.length;

        this.stats.shortlisted = applications.filter(
          (application) =>
            application.status === 'Shortlisted'
        ).length;

        this.stats.interviews = applications.filter(
          (application) =>
            application.status === 'Interview'
        ).length;

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('APPLICATIONS ERROR:', error);

        this.error =
          error.error?.message ||
          'Failed to load applications';

        this.cdr.detectChanges();
      }
    });
  }
}