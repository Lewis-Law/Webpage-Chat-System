import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { Router } from "@angular/router";
@Component({
  selector: 'app-database',
  templateUrl: './database.component.html',
  styleUrls: ['./database.component.css']
})
export class DatabaseComponent implements OnInit {

  constructor(private router: Router, private httpClient: HttpClient) { }
  role: string;
  admin: boolean;
  private apiURL = 'http://localhost:3000/api/';
  userArr = [];
  groupArr = [];
  ngOnInit() {
    //determine if user logged in
    if (!sessionStorage.getItem('username')) {
      console.log('Not validated');
      sessionStorage.clear();
      alert("User not logged in");
      this.router.navigateByUrl('login');
    } else {
      this.role = sessionStorage.getItem('role');
      // determine if admin
      if (this.role == 'groupAdmin' || this.role == 'superAdmin') {
        this.admin = true;
      } else {
        this.admin = false;
      }
      // obtain user data
      this.httpClient.get(this.apiURL + 'user/read')
        .subscribe((data: any) => {
            this.userArr = data
        });
      // obtain group data
      this.httpClient.get(this.apiURL + 'group/read')
        .subscribe((data: any) => {
          this.groupArr = data;
        });
    }
  }

}
