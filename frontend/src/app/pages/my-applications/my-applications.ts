import { Component, OnInit, signal } from '@angular/core';
import { DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { ApplicationService } from '../../services/application.service';

@Component({
  selector: 'app-my-applications',
  imports: [DatePipe, RouterLink],
  templateUrl: './my-applications.html',
  styleUrl: './my-applications.css'
})
export class MyApplicationsComponent implements OnInit {
  applications = signal<any[]>([]);
  error = '';

  constructor(
    private applicationService: ApplicationService
  ) {}

  ngOnInit() {
    this.loadApplications();
  }

  loadApplications() {
    this.error = '';

    this.applicationService.getMyApplications().subscribe({
      next: (data) => {
        console.log('MY APPLICATIONS DATA:', data);

        this.applications.set(
          Array.isArray(data) ? data : []
        );

        console.log(
          'APPLICATIONS COUNT:',
          this.applications().length
        );
      },

      error: (error) => {
        console.error('MY APPLICATIONS ERROR:', error);

        this.applications.set([]);

        this.error =
          error.error?.message ||
          'Failed to load applications';
      }
    });
  }
}