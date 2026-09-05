import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { JobService } from '../../services/job.service';

@Component({
  selector: 'app-post-job',
  imports: [FormsModule],
  templateUrl: './post-job.html',
  styleUrl: './post-job.css'
})
export class PostJobComponent {
  job = {
    title: '',
    company: '',
    location: '',
    salary: '',
    type: 'Full Time',
    experience: 'Fresher',
    skills: '',
    description: ''
  };

  message = '';
  error = '';

  constructor(
    private jobService: JobService,
    private router: Router
  ) {}

  postJob() {
    this.message = '';
    this.error = '';

    const jobData = {
      ...this.job,
      skills: this.job.skills
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill)
    };

    this.jobService.createJob(jobData).subscribe({
      next: (response) => {
        this.message = response.message || 'Job posted successfully!';

        setTimeout(() => {
          this.router.navigate(['/jobs']);
        }, 1200);
      },
      error: (error) => {
        this.error = error.error?.message || 'Failed to post job';
      }
    });
  }
}