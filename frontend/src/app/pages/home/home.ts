import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { JobCardComponent } from '../../components/job-card/job-card';

@Component({
  selector: 'app-home',
  imports: [JobCardComponent],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  featuredJobs = [
    {
      id: '1',
      title: 'Frontend Developer',
      company: 'Tech Solutions',
      location: 'Pune',
      salary: '₹4 - ₹6 LPA',
      type: 'Full Time',
      experience: 'Fresher',
      description: 'Frontend development opportunity.',
      skills: ['HTML', 'CSS', 'JavaScript'],
      postedDate: '2 days ago'
    },
    {
      id: '2',
      title: 'MERN Stack Developer',
      company: 'Digital Works',
      location: 'Mumbai',
      salary: '₹5 - ₹8 LPA',
      type: 'Full Time',
      experience: 'Fresher',
      description: 'MERN stack development opportunity.',
      skills: ['MongoDB', 'Express', 'React', 'Node.js'],
      postedDate: '3 days ago'
    },
    {
      id: '3',
      title: 'Angular Developer',
      company: 'Code Labs',
      location: 'Bangalore',
      salary: '₹4 - ₹7 LPA',
      type: 'Full Time',
      experience: 'Fresher',
      description: 'Angular development opportunity.',
      skills: ['Angular', 'TypeScript', 'HTML'],
      postedDate: '4 days ago'
    }
  ];

  categories = [
    'IT & Software',
    'Design',
    'Marketing',
    'Finance',
    'Human Resources',
    'Sales'
  ];

  constructor(private router: Router) {}

  exploreJobs() {
    this.router.navigate(['/register']);
  }

  viewJobs() {
    this.router.navigate(['/jobs']);
  }
}
