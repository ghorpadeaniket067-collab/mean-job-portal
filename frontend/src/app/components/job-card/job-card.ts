import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Job } from '../../models/job.model';

@Component({
  selector: 'app-job-card',
  imports: [RouterLink],
  templateUrl: './job-card.html',
  styleUrl: './job-card.css'
})
export class JobCardComponent {
  @Input() job!: Job;
}