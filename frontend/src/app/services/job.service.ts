import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, map } from 'rxjs';

import { Job } from '../models/job.model';

@Injectable({
  providedIn: 'root'
})
export class JobService {
  private apiUrl = 'https://mean-job-portal-api.onrender.com/api/jobs';

  constructor(private http: HttpClient) {}

  getJobs(): Observable<Job[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((jobs) =>
        jobs.map((job) => ({
          id: job._id,
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary,
          type: job.type,
          experience: job.experience || 'Fresher',
          description: job.description,
          skills: job.skills || [],
          postedDate: job.postedDate || 'Recently posted'
        }))
      )
    );
  }

  getJobById(id: string): Observable<Job> {
    const headers = new HttpHeaders({
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    });

    return this.http
      .get<any>(`${this.apiUrl}/${id}?t=${Date.now()}`, { headers })
      .pipe(
        map((job) => ({
          id: job._id,
          title: job.title,
          company: job.company,
          location: job.location,
          salary: job.salary,
          type: job.type,
          experience: job.experience || 'Fresher',
          description: job.description,
          skills: job.skills || [],
          postedDate: job.postedDate || 'Recently posted'
        }))
      );
  }

  createJob(job: Partial<Job>): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post<any>(this.apiUrl, job, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  deleteJob(id: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.delete<any>(`${this.apiUrl}/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
