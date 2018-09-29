import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpHandler } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

import { FormsModule } from '@angular/forms';
import { Router } from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router: Router, private form: FormsModule, private httpClient: HttpClient) { }
  private apiURL = 'http://localhost:3000/api/';
  ngOnInit() {
  }

  username: string;
  password: string;
  userObj: any = { };
  loginUser(event) {
    event.preventDefault();
    this.userObj = { username: this.username, password: this.password };
    console.log(this.userObj);
    this.httpClient.post(this.apiURL + 'auth', JSON.stringify(this.userObj), httpOptions)
      .subscribe((data: any) => {
        console.log(data);
      });
  }

}
