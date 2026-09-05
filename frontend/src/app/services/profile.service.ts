import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private apiUrl = 'http://localhost:5000/api/auth/profile';

  constructor(private http: HttpClient) {}

  getProfile(): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.get<any>(this.apiUrl, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  updateProfile(profile: any): Observable<any> {
    const token = localStorage.getItem('token');

    return this.http.put<any>(this.apiUrl, profile, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  uploadResume(file: File): Observable<any> {
    const token = localStorage.getItem('token');
    const formData = new FormData();

    formData.append('resume', file);

    return this.http.post<any>(
      `${this.apiUrl}/resume`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
  }
}