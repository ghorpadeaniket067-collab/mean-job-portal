export interface User {
  id: string;
  name: string;
  email: string;
  password?: string;
  role: 'Job Seeker' | 'Recruiter';
  location?: string;
  phone?: string;
  skills?: string[];
  resume?: string;
}