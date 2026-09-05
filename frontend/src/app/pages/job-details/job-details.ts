import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';

import {
  ActivatedRoute,
  RouterLink
} from '@angular/router';

import { JobService } from '../../services/job.service';
import { ApplicationService } from '../../services/application.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-details',
  imports: [RouterLink],
  templateUrl: './job-details.html',
  styleUrl: './job-details.css'
})
export class JobDetailsComponent implements OnInit {
  job: Job | null = null;

  message = '';
  error = '';

  constructor(
    private route: ActivatedRoute,
    private jobService: JobService,
    private applicationService: ApplicationService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    console.log('Job ID:', id);

    if (!id) {
      this.error = 'Job ID not found';
      this.changeDetector.detectChanges();
      return;
    }

    this.loadJob(id);
  }

  loadJob(id: string): void {
    console.log('Loading job:', id);

    this.jobService.getJobById(id).subscribe({
      next: (job) => {
        console.log('Job loaded:', job);

        this.job = job;

        this.changeDetector.detectChanges();
      },

      error: (error) => {
        console.error('Failed to load job:', error);

        this.error =
          error.error?.message || 'Failed to load job details';

        this.changeDetector.detectChanges();
      }
    });
  }

  applyForJob(): void {
    this.message = '';
    this.error = '';

    const token = localStorage.getItem('token');

    if (!token) {
      this.error = 'Please login to apply for this job';
      return;
    }

    if (!this.job) {
      this.error = 'Job details not available';
      return;
    }

    this.applicationService
      .applyForJob(this.job.id)
      .subscribe({
        next: (response) => {
          this.message = response.message;
          this.changeDetector.detectChanges();
        },

        error: (error) => {
          this.error =
            error.error?.message ||
            'Failed to apply for job';

          this.changeDetector.detectChanges();
        }
      });
  }
}