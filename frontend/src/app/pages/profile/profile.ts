import {
  ChangeDetectorRef,
  Component,
  OnInit
} from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-profile',
  imports: [FormsModule],
  templateUrl: './profile.html',
  styleUrl: './profile.css'
})
export class ProfileComponent implements OnInit {
  profile = {
    name: '',
    email: '',
    location: '',
    phone: '',
    skills: [] as string[],
    education: '',
    experience: '',
    projects: [] as string[],
    resume: ''
  };

  editMode = false;
  message = '';
  error = '';
  selectedFile: File | null = null;
  uploadingResume = false;

  skillsText = '';
  projectsText = '';

  constructor(
    private profileService: ProfileService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.loadProfile();
  }

  loadProfile() {
    this.error = '';

    this.profileService.getProfile().subscribe({
      next: (user) => {
        console.log('PROFILE DATA:', user);

        this.profile = {
          name: user.name || '',
          email: user.email || '',
          location: user.location || '',
          phone: user.phone || '',
          skills: Array.isArray(user.skills)
            ? user.skills
            : [],
          education: user.education || '',
          experience: user.experience || '',
          projects: Array.isArray(user.projects)
            ? user.projects
            : [],
          resume: user.resume || ''
        };

        this.skillsText =
          this.profile.skills.join(', ');

        this.projectsText =
          this.profile.projects.join(', ');

        this.cdr.detectChanges();
      },

      error: (error) => {
        console.error('PROFILE ERROR:', error);

        this.error =
          error.error?.message ||
          'Failed to load profile';

        this.cdr.detectChanges();
      }
    });
  }

  editProfile() {
    this.editMode = true;
    this.message = '';
    this.error = '';
  }

  saveProfile() {
    const profileData = {
      name: this.profile.name,
      location: this.profile.location,
      phone: this.profile.phone,

      skills: this.skillsText
        .split(',')
        .map((skill) => skill.trim())
        .filter((skill) => skill),

      education: this.profile.education,
      experience: this.profile.experience,

      projects: this.projectsText
        .split(',')
        .map((project) => project.trim())
        .filter((project) => project),

      resume: this.profile.resume
    };

    this.profileService.updateProfile(profileData).subscribe({
      next: (response) => {
        this.profile = {
          ...this.profile,
          ...response.user
        };

        this.skillsText =
          this.profile.skills.join(', ');

        this.projectsText =
          this.profile.projects.join(', ');

        this.editMode = false;
        this.message = response.message;

        this.cdr.detectChanges();

        setTimeout(() => {
          this.message = '';
          this.cdr.detectChanges();
        }, 2000);
      },

      error: (error) => {
        this.error =
          error.error?.message ||
          'Failed to update profile';

        this.cdr.detectChanges();
      }
    });
  }

  cancelEdit() {
    this.editMode = false;
    this.loadProfile();
  }

  selectResume(event: Event) {
    const input = event.target as HTMLInputElement;

    if (!input.files || input.files.length === 0) {
      this.selectedFile = null;
      return;
    }

    const file = input.files[0];

    if (file.type !== 'application/pdf') {
      this.error = 'Only PDF files are allowed';
      this.selectedFile = null;
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      this.error = 'Resume must be smaller than 5 MB';
      this.selectedFile = null;
      return;
    }

    this.error = '';
    this.message = '';
    this.selectedFile = file;
  }

  uploadResume() {
    if (!this.selectedFile) {
      this.error = 'Please select a PDF resume';
      return;
    }

    this.uploadingResume = true;
    this.message = '';
    this.error = '';

    this.profileService
      .uploadResume(this.selectedFile)
      .subscribe({
        next: (response) => {
          this.profile.resume = response.resume;
          this.selectedFile = null;
          this.uploadingResume = false;
          this.message = response.message;

          this.cdr.detectChanges();
        },

        error: (error) => {
          this.uploadingResume = false;

          this.error =
            error.error?.message ||
            'Failed to upload resume';

          this.cdr.detectChanges();
        }
      });
  }
}