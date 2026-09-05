import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApplicationService {
  private apiUrl = 'http://localhost:5000/api/applications';

  constructor(private http: HttpClient) {}

  applyForJob(jobId: string): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.post<any>(
      this.apiUrl,
      { jobId },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }

  getMyApplications(): Observable<any[]> {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(
      `${this.apiUrl}/my?t=${Date.now()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache'
        }
      }
    );
  }

  getApplications(): Observable<any[]> {
    const token = localStorage.getItem('token');

    return this.http.get<any[]>(
      `${this.apiUrl}?t=${Date.now()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          Pragma: 'no-cache'
        }
      }
    );
  }

  updateApplicationStatus(
    id: string,
    status: string
  ): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.patch<any>(
      `${this.apiUrl}/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}