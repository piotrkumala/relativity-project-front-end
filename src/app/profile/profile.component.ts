import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ProfileType } from '../models/ProfileType';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  profile!: ProfileType;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getProfile();
  }

  getProfile(): void {
    this.http.get(environment.graphEndpoint).subscribe((profile) => {
      this.profile = profile;
    });
  }
}
