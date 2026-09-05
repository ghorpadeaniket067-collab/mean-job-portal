import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';

import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-manage-applications',
  imports: [DatePipe],
  templateUrl: './manage-applications.html',
  styleUrl: './manage-applications.css'
})
export class ManageApplicationsComponent implements OnInit {
  applications: any[] = [];
  error = '';
  message = '';

  statuses = [
    'Applied',
    'Under Review',
    'Shortlisted',
    'Interview',
    'Rejected',
    'Selected'
  ];

  constructor(
    private applicationService: ApplicationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadApplications();
  }

  loadApplications(): void {
    this.error = '';

    this.applicationService.getApplications().subscribe({
      next: (applications) => {
        console.log('MANAGE APPLICATIONS:', applications);
        console.log('APPLICATION COUNT:', applications.length);

        this.applications = [...applications];

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('APPLICATION ERROR:', error);

        this.applications = [];

        this.error =
          error.error?.message ||
          'Failed to load applications';

        this.cdr.detectChanges();
      }
    });
  }

  updateStatus(application: any): void {
    this.message = '';
    this.error = '';

    this.applicationService
      .updateApplicationStatus(
        application._id,
        application.status
      )
      .subscribe({
        next: () => {
          this.message =
            'Application status updated successfully';

          this.cdr.detectChanges();

          setTimeout(() => {
            this.message = '';
            this.cdr.detectChanges();
          }, 2000);
        },

        error: (error) => {
          this.error =
            error.error?.message ||
            'Failed to update application status';

          this.cdr.detectChanges();
        }
      });
  }
}