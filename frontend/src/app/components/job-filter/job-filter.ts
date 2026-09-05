import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-job-filter',
  imports: [FormsModule],
  templateUrl: './job-filter.html',
  styleUrl: './job-filter.css'
})
export class JobFilterComponent {
  @Output() filterChanged = new EventEmitter<{
    location: string;
    jobType: string;
    experience: string;
  }>();

  location = '';
  jobType = 'All';
  experience = 'All';

  applyFilter() {
    this.filterChanged.emit({
      location: this.location.trim(),
      jobType: this.jobType,
      experience: this.experience
    });
  }

  clearFilter() {
    this.location = '';
    this.jobType = 'All';
    this.experience = 'All';

    this.applyFilter();
  }
}