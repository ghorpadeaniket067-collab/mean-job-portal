import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { JobCardComponent } from '../../components/job-card/job-card';
import { JobFilterComponent } from '../../components/job-filter/job-filter';
import { JobService } from '../../services/job.service';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-jobs',
  imports: [
    FormsModule,
    JobCardComponent,
    JobFilterComponent
  ],
  templateUrl: './jobs.html',
  styleUrl: './jobs.css'
})
export class JobsComponent implements OnInit {
  jobs: Job[] = [];
  filteredJobs: Job[] = [];

  searchText = '';

  loading = true;
  error = '';

  activeFilters = {
    location: '',
    jobType: 'All',
    experience: 'All'
  };

  constructor(
    private jobService: JobService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadJobs();
  }

  loadJobs() {
    this.loading = true;
    this.error = '';

    this.jobService.getJobs().subscribe({
      next: (jobs) => {
        this.jobs = jobs;
        this.filteredJobs = jobs;
        this.loading = false;

        this.changeDetector.detectChanges();
      },
      error: (error) => {
        console.error('Failed to load jobs', error);

        this.jobs = [];
        this.filteredJobs = [];
        this.loading = false;
        this.error = 'Unable to load jobs. Please try again.';

        this.changeDetector.detectChanges();
      }
    });
  }

  filterJobs(filters: {
    location: string;
    jobType: string;
    experience: string;
  }) {
    this.activeFilters = filters;
    this.applySearchAndFilters();
  }

  searchJobs() {
    this.applySearchAndFilters();
  }

  applySearchAndFilters() {
    const search = this.searchText.toLowerCase().trim();

    this.filteredJobs = this.jobs.filter((job) => {
      const searchMatch =
        !search ||
        job.title.toLowerCase().includes(search) ||
        job.company.toLowerCase().includes(search) ||
        job.skills.some((skill) =>
          skill.toLowerCase().includes(search)
        );

      const locationMatch =
        !this.activeFilters.location ||
        job.location
          .toLowerCase()
          .includes(this.activeFilters.location.toLowerCase());

      const typeMatch =
        this.activeFilters.jobType === 'All' ||
        job.type === this.activeFilters.jobType;

      const experienceMatch =
        this.activeFilters.experience === 'All' ||
        job.experience === this.activeFilters.experience;

      return (
        searchMatch &&
        locationMatch &&
        typeMatch &&
        experienceMatch
      );
    });
  }
}